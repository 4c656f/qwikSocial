import {component$, Resource, useResource$} from '@builder.io/qwik';
import {DocumentHead, Link} from '@builder.io/qwik-city';
import {isServer} from "@builder.io/qwik/build";
import Button from "../components/ui/Button/Button";



export default component$(() => {


    const indexResource = useResource$(async () => {
        if (isServer) {
            const {tServer} = await import('../server/trpc/router/index')
            return tServer.product.list('')
        }
        const {trpc} = await import('../client/trpc')
        return trpc.product.list.query('')
    })
    return (
        <Resource
            value={indexResource}
            onPending={() => <span>loading</span>}
            onRejected={()=><div>error</div>}
            onResolved={(data) => (<>{data.map(value => {
                return (
                    <div>
                        <Link
                            href={`/${value.link}`}
                        >
                            <h3>{value.title}</h3>
                        </Link>
                        <span>{value._count.comments}</span>
                        <span>{value._count.likes}</span>
                        <span>{value.author.userName}</span>
                    </div>
                )
            })}</>)}
        />
    );
});

export const head: DocumentHead = {
    title: 'Home page',
    meta: [
        {
            name: 'description',
            content: 'social site description',
        },
    ],
};
