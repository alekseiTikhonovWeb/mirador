import { createContext, RefObject } from 'react';

const ViewerContext = createContext<RefObject<any> | undefined>(undefined);

export default ViewerContext;
