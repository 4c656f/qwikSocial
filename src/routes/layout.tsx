import {
    component$,
    createContext,
    Slot,
    useClientEffect$,
    useContext,
    useContextProvider,
    useStore
} from '@builder.io/qwik';
import ServerHeader from "../components/ServerHeader/ServerHeader";


type globalStore = {
    isDark: boolean;
}

export const globalContext = createContext<globalStore>('globalContext')

export default component$(() => {


    const globalStore = useStore<globalStore>({
        isDark: true
    })



    useClientEffect$(({track}) => {
        track(() => globalStore.isDark)
        document.body.dataset.theme = globalStore.isDark ? 'dark' : 'light'
    })




    useContextProvider(globalContext, globalStore)



    return (
        <>
            <main>
                <ServerHeader/>
                <section>
                    <Slot/>
                </section>
            </main>
            <footer>
            </footer>
        </>
    );
});
