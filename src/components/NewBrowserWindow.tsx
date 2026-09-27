import { useRef, useEffect } from 'react';

interface NewBrowserWindowProps {
  depWindow?: Window | undefined;
  features?: string | undefined;
  name?: string | undefined;
  onClose: (url: string) => void;
  url: string;
}

export function NewBrowserWindow({ depWindow = undefined, features = undefined, name = undefined, onClose, url }: NewBrowserWindowProps) {
  const released = useRef(false);

  useEffect(() => {
    const newWindow = (depWindow || window).open(url, name, features);

    const checkIfWindowClosed = setInterval(() => {
      if (!released.current && (!newWindow || newWindow.closed)) {
        released.current = true;
        clearInterval(checkIfWindowClosed);
        onClose(url);
      }
    }, 250);

    return () => {
      clearInterval(checkIfWindowClosed);
      newWindow.close();
    };
  });

  return null;
}
