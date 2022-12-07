import {component$, HTMLAttributes, Slot, useStylesScoped$, QwikJSX, QwikIntrinsicElements} from '@builder.io/qwik';

import styles from './button.scss?inline';
import {ButtonType} from "../../../types/IElementType";
import {IElementsSize} from "../../../types/IElementsSize";
import {IColorIndex} from "../../../types/IColorIndex";


import IntrinsicElements = QwikJSX.IntrinsicElements;

type ElementType<P = any> =
    {
        [K in keyof QwikIntrinsicElements]: P extends QwikIntrinsicElements[K] ? K : never
    }[keyof QwikIntrinsicElements]


export const defaultElement = 'a'


type ButtonCustomProps<E extends ElementType = typeof defaultElement> = {
    type?: ButtonType;
    size?: IElementsSize;
    colorIndex?: IColorIndex;
    className?: string;
    as?: E;
}

type ButtonProps<E extends ElementType> = ButtonCustomProps<E> & QwikIntrinsicElements[E]


const component =  component$(<E extends ElementType = ElementType>(props:ButtonProps<E>) => {

    const {
        className,
        type = 'contained',
        size = 'medium',
        colorIndex = '0',
        as,
        ...rest
    } = props

    const Element = defaultElement || as;

    useStylesScoped$(styles);

    const classes = [
        className ? className : '',
        'container',
        type,
        size,
        `color_${colorIndex}_index`,
    ]

    return (
        <Element
            // onClick$={async () => {
            //     if (onClick$) await onClick$();
            // }}
            class={classes.join(' ')}
            {...rest}
        >
            <Slot/>
            <div
                class={'icon'}
            >
                <Slot
                    name={'icon'}
                />
            </div>
        </Element>
    )
})

export default component