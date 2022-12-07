import {component$, Slot, useStylesScoped$, QwikJSX, QwikIntrinsicElements} from '@builder.io/qwik';
import styles from './button.scss?inline';
import {ButtonType} from "../../../types/IElementType";
import {IElementsSize} from "../../../types/IElementsSize";
import {IColorIndex} from "../../../types/IColorIndex";
import {ElementType} from "../../../types/IElemntType";




export const defaultElement = 'button'


type ButtonCustomProps = {
    type?: ButtonType;
    size?: IElementsSize;
    colorIndex?: IColorIndex;
    className?: string;
}

type ButtonProps<E extends ElementType> = ButtonCustomProps & Omit<QwikIntrinsicElements[typeof defaultElement], keyof ButtonCustomProps>


const component =  component$((props:ButtonProps<'button'>) => {

    const {
        className,
        type = 'contained',
        size = 'medium',
        colorIndex = '0',
        ...rest
    } = props

    useStylesScoped$(styles);

    const classes = [
        className ? className : '',
        'container',
        type,
        size,
        `color_${colorIndex}_index`,
    ]

    return (
        <button
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
        </button>
    )
})

export default component