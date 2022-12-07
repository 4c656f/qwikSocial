import {
    component$,
    useResource$,
    useSignal,
    useStylesScoped$,
    $,
    useClientEffect$,
    Signal,
    useStyles$
} from '@builder.io/qwik';
import styles from '../../styles/createPost.scss?inline'
import codeStyles from "../../styles/codeTheme.scss?inline";
import TextArea from "../../components/ui/TextArea/TextArea";
import {marked, Renderer} from 'marked'
import {isServer} from "@builder.io/qwik/build";
import {DocumentHead} from "@builder.io/qwik-city";
type IndexProps = {

}

export default component$(() => {


    // const globalStore = useContext(globalContext)

    useStylesScoped$(styles)
    useStyles$(codeStyles)


    const textAreaValue = useSignal('# title1 \n' +
        '## title2\n' +
        '### title3\n' +
        '#### title4\n' +
        '\n' +
        'some post content\n' +
        '\n' +
        '```typescript main.ts\n' +
        'type IVariableType = {\n' +
        '   param: string\n' +
        '```' +
        '')

    const textAreaRef = useSignal<HTMLTextAreaElement>() as Signal<HTMLTextAreaElement>
    const dragContainerRef = useSignal<HTMLDivElement>() as Signal<HTMLDivElement>


    const isUp = useSignal<boolean>(false)

    const isAdLanguage = useSignal<string | undefined>()
    const textAreaValueHtml = useSignal('')


    const handleMouseMove = $((e: MouseEvent) => {
        e.preventDefault()
        dragContainerRef.value.style.width = `${e.clientX}px`
    })

    const handleTouchMove = $((e: TouchEvent) => {

        dragContainerRef.value.style.width = `${e.targetTouches[0].pageX}px`
    })

    useResource$(async ({track}) => {
        track(() => isAdLanguage.value)
        if (isServer) return
        // @ts-ignore
        import('prismjs/components/prism-python')
        // @ts-ignore
        import('prismjs/components/prism-java')
        // @ts-ignore
        import('prismjs/components/prism-go')
        // @ts-ignore
        import('prismjs/components/prism-scss')
        // @ts-ignore
        await import('prismjs/components/prism-jsx')
        // @ts-ignore
        import('prismjs/components/prism-tsx')
    })


    //TEXT CHANGE
    useClientEffect$(async ({track}) => {
        track(() => textAreaValue.value)

        const Prism = await import('prismjs')
        // @ts-ignore
        await import('prismjs/components/prism-typescript')
        const renderer = new Renderer();
        renderer.code = function (code, params) {
            let codeHighlighted:string = ''
            let fileName
            let language
            const codeParams = params?.split(' ')

            if(codeParams){

                [language, fileName] = codeParams;

                if (Prism.languages[language]) {
                    codeHighlighted =  Prism.highlight(code, Prism.languages[language], language);
                }else{
                    isAdLanguage.value = language
                    codeHighlighted = Prism.highlight(code, Prism.languages.typescript, 'typescript');
                }

            }
            return `<pre class="language-${language}">${fileName?`<span class="file_name">${fileName}</span>`:''}<code class="language-${language}">${codeHighlighted?codeHighlighted:code}</code></pre>`
        }
        const html = marked(textAreaValue.value, {
            renderer: renderer,
        })
        textAreaValueHtml.value = html
    })


    //MOUSE EVENT START
    useClientEffect$(({track, cleanup}) => {
        track(() => isUp.value)
        cleanup(() => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('touchmove', handleTouchMove)
        })
        if (isUp.value) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('touchmove', handleTouchMove)
        }

    })
    const handleKeyDown = $((e: KeyboardEvent) => {
        const target = e.target as HTMLTextAreaElement

        if (e.key === 'Tab') {
            e.preventDefault()
            const value = textAreaValue.value
            const start = target.selectionStart
            const end = target.selectionEnd;
            textAreaRef.value.setRangeText('   ', start, end, 'end')
            textAreaValue.value = value.substring(0, start) + '   ' + value.substring(end)
            // textAreaRef.value.selectionStart = textAreaRef.value.selectionEnd = start + 3
        }

    })

    useClientEffect$(() => {
        textAreaRef.value.addEventListener('keydown', handleKeyDown)
    })


    return (
        <div
            class={'container'}
        >
            <div
                class={'editor_container'}
            >
                <div
                    ref={dragContainerRef}
                    class={'editor_container_item'}
                >
                    <TextArea
                        value={textAreaValue}
                        ref={textAreaRef}

                        onInput$={(e) => {
                            const target = e.target as HTMLTextAreaElement
                            textAreaValue.value = target.value
                        }}

                        colorIndex={'0'}
                    />


                    <div

                        preventdefault:drag
                        preventdefault:mousedown
                        class={'drag'}
                        document:onMouseUp$={() => {
                        isUp.value = false
                    }}
                        onMouseDown$={(e) => {
                            e.stopPropagation()
                            isUp.value = true
                        }}
                        onTouchStart$={() => {
                            isUp.value = true
                        }}
                        onTouchEnd$={() => {
                            isUp.value = false
                        }}
                        onTouchCancel$={() => {
                            isUp.value = false
                        }}

                    />
                </div>


                {textAreaValueHtml.value &&
                <div
                    class={'editor_container_item_md'}
                    dangerouslySetInnerHTML={textAreaValueHtml.value}
                />
                }


            </div>

        </div>
    );
});

export const head: DocumentHead = {
    title: 'Welcome to Qwik',
    meta: [
        {
            name: 'description',
            content: 'Qwik site description',
        },
    ],
};

