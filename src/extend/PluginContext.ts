import { createContext } from 'react';

const PluginContext = createContext<Record<string, any> | undefined>(undefined);

export default PluginContext;
