import {z} from 'zod';
import {t} from '../trpc';

export const prductRouter = t.router({
    list: t.procedure.input(z.string()).query(
        async ({ctx, input}) => {
            const {prisma} = await import('../../prisma')
            const list = await prisma.user.findMany({

            })
            return 'trpcisWorking!'
        }
    ),

});
