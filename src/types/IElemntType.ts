import {QwikIntrinsicElements} from "@builder.io/qwik";

export type ElementType<P = any> =
    {
        [K in keyof QwikIntrinsicElements]: P extends QwikIntrinsicElements[K] ? K : never
    }[keyof QwikIntrinsicElements]