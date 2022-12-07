import {PrismaClient} from '@prisma/client';
import {t} from '../trpc';
import {postRouter} from './postRouter';

export const appRouter = t.router({
    product: postRouter,
});


export type AppRouter = typeof appRouter;

export const tServer = appRouter.createCaller({req: undefined, res: undefined});
