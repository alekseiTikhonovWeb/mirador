import {
  createRemoveUpdate,
  updateTree,
  getNodeAtPath,
  getOtherDirection,
  getPathToCorner,
  Corner,
  MosaicNode,
} from 'react-mosaic-component';
import dropRight from 'lodash/dropRight';

type MosaicKey = string | number;

/** */
export default class MosaicLayout {
  layout: MosaicNode<MosaicKey> | null;

  /** */
  constructor(layout: MosaicNode<MosaicKey> | null) {
    this.layout = layout;
  }

  /** */
  pathToCorner(corner = Corner.TOP_RIGHT) {
    return getPathToCorner(this.layout, corner);
  }

  /** */
  pathToParent(path) {
    return getNodeAtPath(this.layout, dropRight(path));
  }

  /** */
  nodeAtPath(path) {
    return getNodeAtPath(this.layout, path);
  }

  /**
   * addWindows - updates the layout with new windows using an algorithm ported
   * from the react-mosaic-components examples. Will always add to the Top Right
   * https://github.com/nomcopter/react-mosaic/blob/5081df8d1528d4c3b83a72763a46a30b3048fe95/demo/ExampleApp.tsx#L119-L154
   * @param {Array} addedWindowIds [description]
   */
  addWindows(addedWindowIds) {
    addedWindowIds.forEach((windowId, i) => {
      const path = this.pathToCorner();
      const parent = this.pathToParent(path);
      const destination = this.nodeAtPath(path);
      const direction = parent ? getOtherDirection((parent as any).direction) : 'row';
      let children;
      if (direction === 'row') {
        children = [destination, addedWindowIds[i]];
      } else {
        children = [addedWindowIds[i], destination];
      }
      const update = {
        path,
        spec: {
          $set: {
            type: 'split' as const,
            direction,
            children,
          },
        },
      };
      // We cannot batch the updates together because we need to recalculate
      // the new location for each new window
      this.layout = updateTree(this.layout, [update]);
    });
  }

  /**
   * removeWindows - Generate a set of "removeUpdates" to update layout binary
   * tree. Then update the layout.
   * @param  {Array} removedWindowIds
   * @param  {Object} windowPaths - a lookup table for window paths
   */
  removeWindows(removedWindowIds, windowPaths) {
    const removeUpdates = removedWindowIds.map((windowId) => createRemoveUpdate(this.layout, windowPaths[windowId]));
    this.layout = updateTree(this.layout, removeUpdates);
  }
}
