import {PrismaClient} from '@prisma/client';
import {t} from '../trpc';
import {prductRouter} from './prductRouter';

export const appRouter = t.router({
    product: prductRouter,
});


export type AppRouter = typeof appRouter;

export const tServer = appRouter.createCaller({prisma: new PrismaClient()});
