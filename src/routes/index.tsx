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

export default component$(() => {


    const indexResource = useResource$(async () => {
        if (isServer) {
            return 'serverResource'
        }
        const {trpc} = await import('../client/trpc')
        return trpc.product.list.query('')
    })

    useClientEffect$(async ()=>{
        const {trpc} = await import('../client/trpc')
        const resp = await trpc.product.list.query('')
        console.log(resp)
    })
    return (
        <Resource
            value={indexResource}
            onPending={() => <div>loading</div>}
            onResolved={(data)=><div>{data}</div>}
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
