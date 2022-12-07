import {component$, Slot, useStylesScoped$} from '@builder.io/qwik';
import styles from './header.scss?inline';



export default component$(() => {


    useStylesScoped$(styles);

    return (
        <header
            class={'container'}
        >
            <nav
                class={'nav'}
            >

                <ul
                    class={'sections'}
                >
                    <Slot name={'logoSection'}/>
                </ul>

                <ul
                    class={'sections'}
                >
                    <Slot name={'mainSection'}/>
                </ul>

                <ul
                    class={'sections'}
                >
                    <Slot name={'rightSection'}/>
                </ul>
            </nav>

        </header>
    );
});
