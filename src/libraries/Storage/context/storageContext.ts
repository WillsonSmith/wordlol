import { createContext } from '@lit-labs/context';

import type { Storage } from '../Storage';

export const storage = createContext<Storage>(Symbol('storage'));
