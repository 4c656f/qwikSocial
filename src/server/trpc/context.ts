import * as trpc from '@trpc/server';

export const createContext = async () => ({});

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
