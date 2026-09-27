import { createContext } from 'react';

const LocaleContext = createContext<string | undefined>(undefined);

export default LocaleContext;
