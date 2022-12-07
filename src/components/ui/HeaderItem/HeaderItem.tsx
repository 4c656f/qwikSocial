import Button from "../Button/Button";
import styles from './HeaderItem.scss?inline'
import {component$, Slot, useStylesScoped$} from "@builder.io/qwik";

export type HeaderItemProps = {
    title: string;

}

export default component$((props: HeaderItemProps) => {

    const {
        title
    } = props

    useStylesScoped$(styles)

    return (
        <li
            class={'container'}
        >
            <section
                class={'section'}
            >
                <Slot/>
            </section>
            <Button
                className={'button'}
                type={'text'}
                size={'medium'}
                colorIndex={'0'}
            >
                <span>
                    {title}
                </span>
            </Button>

        </li>
    );
})
