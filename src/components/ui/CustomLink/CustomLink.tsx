import {component$, Slot, useStylesScoped$, QwikJSX, QwikIntrinsicElements, useStyles$} from '@builder.io/qwik';
import styles from './customLink.module.scss?inline';
import classes from './customLink.module.scss';
import {ButtonType} from "../../../types/IElementType";
import {IElementsSize} from "../../../types/IElementsSize";
import {IColorIndex} from "../../../types/IColorIndex";
import {ElementType} from "../../../types/IElemntType";
import {Link} from "@builder.io/qwik-city";






type ButtonCustomProps = {
    type?: ButtonType;
    size?: IElementsSize;
    colorIndex?: IColorIndex;
    className?: string;
}

type ButtonProps<E extends ElementType> = ButtonCustomProps & Omit<QwikIntrinsicElements[E], keyof ButtonCustomProps>


const component =  component$((props:ButtonProps<'link'>) => {

    const {
        className,
        type = 'contained',
        size = 'medium',
        colorIndex = '0',
        ...rest
    } = props

    useStyles$(styles);

    const classesArr = [
        className ? className : '',
        classes.container,
        classes[type],
        classes[size],
        classes[`color_${colorIndex}_index`],
    ]

    return (
        <>
            <Link
                // className={classes.join(' ')}
                class={classesArr.join(' ')}
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
            </Link>
        </>
    )
})

export default component