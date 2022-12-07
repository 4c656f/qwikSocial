import {z} from 'zod';
import {t} from '../trpc';

export const postRouter = t.router({
    list: t.procedure.input(z.string()).query(
        async ({ctx, input}) => {
            const {prisma} = await import('../../prisma')
            const {res} = ctx

            if(res){
                res.headers.set('someHeader', 'fwefwefw')
            }

            const list = await prisma.post.findMany({
                include: {
                    author: {
                        select: {
                            userName: true,
                            userLink: true
                        }
                    },
                    _count: {
                        select: {
                            comments: true,
                            likes: true
                        }
                    }
                }

            })

            return list
        }
    ),
    getOnePost: t.procedure.input(z.string()).query(
        async ({input, ctx}) => {
            const {prisma} = await import('../../prisma')
            return await prisma.post.findUnique({
                where: {
                    link: input
                }
            })
        }
    )

});
