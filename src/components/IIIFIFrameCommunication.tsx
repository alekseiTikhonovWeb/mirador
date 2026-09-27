import { useEffect } from 'react';

const IIIFIFrameCommunicationDefaultProps = {
  'aria-hidden': true,
  frameBorder: 0,
  height: 1,
  name: undefined,
  scrolling: undefined,
  style: { visibility: 'hidden' as const },
  width: 1,
};

interface IIIFIFrameCommunicationProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  handleReceiveMessage?: (event: MessageEvent) => void;
  src: string;
}

export function IIIFIFrameCommunication({ handleReceiveMessage = undefined, ...props }: IIIFIFrameCommunicationProps) {
  useEffect(() => {
    if (!handleReceiveMessage) return undefined;
    window.addEventListener('message', handleReceiveMessage);
    return () => window.removeEventListener('message', handleReceiveMessage, false);
  }, [handleReceiveMessage]);

  return (
    /* eslint-disable jsx-a11y/iframe-has-title */
    <iframe {...IIIFIFrameCommunicationDefaultProps} {...props} />
  );
}
