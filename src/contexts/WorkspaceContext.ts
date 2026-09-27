import { createContext, RefObject } from 'react';

const WorkspaceContext = createContext<RefObject<HTMLElement | null>>({ current: document.body });

export default WorkspaceContext;
