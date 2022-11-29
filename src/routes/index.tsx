import {
    component$,
    Resource,
    useClientEffect$,
    useClientEffectQrl,
    useClientMount$,
    useResource$
} from '@builder.io/qwik';
import type {DocumentHead} from '@builder.io/qwik-city';
import {isServer} from "@builder.io/qwik/build";
import {Link} from "@builder.io/qwik-city";

export default component$(() => {


    const indexResource = useResource$(async () => {
        if (isServer) {
            const {prisma} = await import('../server/prisma')
            return prisma.post.findMany()
        }
        const {trpc} = await import('../client/trpc')
        return trpc.product.list.query('')
    })
    return (
        <Resource
            value={indexResource}
            onPending={() => <div>loading</div>}
            onResolved={(data)=>(<>{data.map(value=>{
                return (
                    <div>
                        <h3>{value.title}</h3>
                        <Link href={`/${value.postLink}`}>goToPost</Link>
                    </div>
                )
            })}</>)}
        />
    );
});

export const head: DocumentHead = {
    title: 'Welcome to Qwik',
    meta: [
        {
            name: 'description',
            content: 'Qwik site description',
        },
    ],
};
