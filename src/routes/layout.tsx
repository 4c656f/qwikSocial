import {
    component$,
    createContext,
    Resource,
    Slot,
    useClientEffect$,
    useContext,
    useContextProvider,
    useStore
} from '@builder.io/qwik';
import ServerHeader from "../components/ServerHeader/ServerHeader";
import {RequestHandler, useEndpoint} from "@builder.io/qwik-city";


type globalStore = {
    isDark: boolean;
}

export const globalContext = createContext<globalStore>('globalContext')


type onGetReturn = {
    isAuth: boolean
}


export const onGet:RequestHandler<onGetReturn> = async ({response, request,cookie}) => {
    if(request.url[request.url.length-1]!=='/')return


    const cookies = cookie.get('acesToken')
    if(!cookies){
        return {isAuth: false}
    }
    if(cookies.value='10'){
        return {isAuth: true}
    }
}

export default component$(() => {


    const globalStore = useStore<globalStore>({
        isDark: true
    })



    useClientEffect$(({track}) => {
        track(() => globalStore.isDark)
        document.body.dataset.theme = globalStore.isDark ? 'dark' : 'light'
    })

    const headerReq = useEndpoint<typeof onGet>()


    useContextProvider(globalContext, globalStore)



    return (
        <>
            <main>
                <Resource
                    value={headerReq}
                    onPending={()=><span>Loading...</span>}
                    onResolved={(data)=>(
                        <ServerHeader
                            isAuth={data.isAuth}
                        />
                    )}
                />

                <section
                    style={{
                        height: '1px',
                        minHeight: '100%'
                    }}
                >
                    <Slot/>
                </section>
            </main>
            <footer>
            </footer>
        </>
    );
});
