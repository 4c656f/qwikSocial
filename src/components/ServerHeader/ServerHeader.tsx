import {component$, Resource, useContext, useResource$} from '@builder.io/qwik';
import {isServer} from "@builder.io/qwik/build";
import {Link} from "@builder.io/qwik-city";
import HeaderItem from "../ui/HeaderItem/HeaderItem";
import HeaderSection from "../ui/HeaderSection/HeaderSection";
import HeaderSectionElement from "../ui/HeaderSectionElement/HeaderSectionElement";
import Button from "../ui/Button/Button";
import ArrowIcon from "../ui/icons/Arrow";
import Header from "../ui/header/header";
import {globalContext} from "../../routes/layout";
import CustomLink from "../ui/CustomLink/CustomLink";

type ServerHeaderProps = {}

export default component$((props: ServerHeaderProps) => {

    const {} = props

    const globalStore = useContext(globalContext)

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
                <CustomLink
                    href={'/create-post'}
                    // type={'contained'}
                    q:slot={'rightSection'}
                >
                    <span>
                        createPost
                    </span>
                </CustomLink>
            </Header>
        </>
    );
});
