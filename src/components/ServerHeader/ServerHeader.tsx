import {component$, Resource, useContext, useResource$} from '@builder.io/qwik';
import {isServer} from "@builder.io/qwik/build";
import {Link, RequestHandler} from "@builder.io/qwik-city";
import HeaderItem from "../ui/HeaderItem/HeaderItem";
import HeaderSection from "../ui/HeaderSection/HeaderSection";
import HeaderSectionElement from "../ui/HeaderSectionElement/HeaderSectionElement";
import Button from "../ui/Button/Button";
import ArrowIcon from "../ui/icons/Arrow";
import Header from "../ui/header/header";
import {globalContext} from "../../routes/layout";
import CustomLink from "../ui/CustomLink/CustomLink";

type ServerHeaderProps = {
    isAuth: boolean
}





export default component$((props: ServerHeaderProps) => {

    const {
        isAuth
    } = props

    const globalStore = useContext(globalContext)


    const headerResource = useResource$(({previous})=>{
        if(isServer){

            console.log('serverHeader', previous)
        }else{
            console.log('userRequestHEader')
        }

    })

    return (
        <>
            <Header>
                <li
                    q:slot={'logoSection'}
                >
                    <CustomLink
                        size={'small'}
                        type={'text'}
                        href={'/'}
                    >
                        <h4>Logo</h4>
                    </CustomLink>
                </li>
                <HeaderItem
                    q:slot={'mainSection'}
                    title={'Categories'}
                >

                    <HeaderSection

                    >
                        <span
                            q:slot={'title'}
                        >Categories</span>
                    </HeaderSection>

                </HeaderItem>
                <Button
                    onClick$={() => {
                        globalStore.isDark = !globalStore.isDark
                    }}
                    type={'contained'}
                    q:slot={'rightSection'}
                >
                    <span>
                        toggleTheme
                    </span>
                </Button>
                {isAuth?
                    <CustomLink
                        href={'/create-post'}
                        // type={'contained'}
                        q:slot={'rightSection'}
                    >
                    <span>
                        createPost
                    </span>
                    </CustomLink>:null

                }

            </Header>
        </>
    );
});
