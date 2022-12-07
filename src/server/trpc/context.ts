import * as trpc from '@trpc/server';
import {RequestContext, ResponseContext} from "@builder.io/qwik-city";




export const createTRPCContext = async (req?: RequestContext, res?:ResponseContext) => {



    return {
        req: req,
        res: res
    }
};

export type Context = trpc.inferAsyncReturnType<typeof createTRPCContext>;
