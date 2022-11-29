import {component$, Resource, useResource$} from '@builder.io/qwik';
import {RequestHandler, useEndpoint, useLocation} from "@builder.io/qwik-city";
import {isServer} from "@builder.io/qwik/build";
import type {Post} from '@prisma/client'
type IndexProps = {

}
export const onGet:RequestHandler<Post> = async ({request, response, params}) => {
    const id = params.postLink
    const {prisma} = await import('../../server/prisma')
    const post = await prisma.post.findUnique({where: {postLink: id}})
    if(!post) {
        throw response.redirect('/')
    }
    return post
}

export default component$((props:IndexProps) => {

    const {
        
    } = props
    const {params} = useLocation()

    const postResource = useEndpoint<typeof onGet>()


    return (
        <div>
            <Resource
                value={postResource}
                onPending={()=><h1>loading</h1>}
                onResolved={(data)=>{
                    return (
                        <div>
                            <h1>{data.title}</h1>
                            <div dangerouslySetInnerHTML={data.postContent}/>
                        </div>
                    )
                }}
            />
        </div>
    );
});
