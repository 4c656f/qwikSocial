import {component$, Resource, useResource$} from '@builder.io/qwik';
import {DocumentHead, RequestHandler, useEndpoint, useLocation, useNavigate} from "@builder.io/qwik-city";
import {isServer} from "@builder.io/qwik/build";
import type {Post} from '@prisma/client'
type IndexProps = {

}
export const onGet:RequestHandler<Post> = async ({request, response, params}) => {
    const id = params.postLink
    const {prisma} = await import('../../server/prisma')
    console.log('prismarequest')
    const post = await prisma.post.findUnique({where: {link: id}})
    if(!post) {
        throw response.redirect('/')
    }
    response.headers.set('Cache-Control', 'max-age=1000')
    return post
}

export default component$((props:IndexProps) => {

    const {
        
    } = props


    const {params} = useLocation()


    const router = useNavigate()

    // const postResource = useResource$(async ()=>{
    //     const id = params.postLink
    //     if(isServer){
    //         const {prisma} = await import('../../server/prisma')
    //         const post = await prisma.post.findUnique({where: {link: id}})
    //         if(!post)router.path = '/'
    //         return post
    //     }
    //
    //     const {trpc} = await import('../../client/trpc')
    //     const post = await trpc.product.getOnePost.query(id)
    //     if(!post)router.path = '/'
    //     return post
    // })
    const postResource = useEndpoint<typeof onGet>()


    return (
        <div>
            <Resource
                value={postResource}
                onPending={()=><h1>loading</h1>}
                onResolved={(data)=>{
                    return (
                        <div>
                            <h1>{data?.title}</h1>
                            <div dangerouslySetInnerHTML={data?.content}/>
                        </div>
                    )
                }}
            />
        </div>
    );
});

export const head: DocumentHead<typeof onGet> = ({ data }) => {
    return {
        title: `Post - ${data?.title}`
    };
};
