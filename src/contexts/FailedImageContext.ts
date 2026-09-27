import { createContext } from 'react';

interface FailedImageContextValue {
  failedImages?: Set<string>;
  fallbackImage: string;
  hasFailed?: boolean;
  notifyFailure: (imageId?: string) => void;
}

const FailedImageContext = createContext<FailedImageContextValue>({
  fallbackImage: '',
  hasFailed: false,
  notifyFailure: () => {},
});
export default FailedImageContext;
