import Button from './Button';
import CollapseContainer from './CollapseContainer';
import Grid from './Grid';
import Header from './Header';
import PagedList from './PagedList';
import Spliter from './Spliter';
import Subcaption from './Subcaption';
import Paragraf from './Paragraf';
import ToolButton from './ToolButton';
import ToolPanel from './ToolPanel';

export default function EgorsContainer({ children, header }) {
    return (
        <CollapseContainer header="Блоки Егора">
            <Header level="1">Заголовок 1</Header>
            <Header level="2">Заголовок 2</Header>
            <Header level="3">Заголовок 3</Header>
            <Header level="4">Заголовок 4</Header>
            <Header level="5">Заголовок 5</Header>
            <Header level="5" color="warning">Заголовок 5</Header>
            <Header level="6">Заголовок 6</Header>

            <Spliter />

            <Subcaption>Подзаголовок 1</Subcaption>
            <Subcaption level="2">Подзаголовок 2</Subcaption>
            <Subcaption level="2" color="primary">Подзаголовок 2</Subcaption>

            <Spliter height="50px" />

            <Paragraf>Нормальный текст Нормальный текст Нормальный текст Нормальный текст Нормальный текст
                Нормальный текст Нормальный текст Нормальный текст Нормальный текст Нормальный текст Нормальный текст
                Нормальный текст</Paragraf>
            <Spliter />
            <Paragraf fontSize="small">Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький
                текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст
                Маленький текст Маленький текст Маленький текст</Paragraf>
            <Spliter />
            <Paragraf fontSize="10px" color="accent">Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький
                текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст
                Маленький текст Маленький текст Маленький текст</Paragraf>

            <Spliter />

            <Grid desktopColumns="3" mobileColumns="1">
                <Button onClick={() => alert("Hello")}>Текст</Button>
                <Button color="secondary">Текст</Button>
                <Button color="warning">Текст</Button>
                <Button disabled>Текст</Button>
                <Button color="secondary" disabled>Текст</Button>
                <Button color="warning" disabled>Текст</Button>
            </Grid>

            <Spliter />
            <ToolPanel>
                <ToolButton text="Текст" icon="icon-picture" onClick={() => alert("Hello")}/>
                <ToolButton text="Текст" icon="icon-cross"/>
                <ToolButton text="Текст" icon="icon-picture" onClick={() => alert("Hello")}/>
                <ToolButton text="Текст" icon="icon-cross" />
                <ToolButton text="Текст" icon="icon-picture" onClick={() => alert("Hello")}/>
                <ToolButton text="Текст" icon="icon-cross" />
                <ToolButton text="Текст" icon="icon-picture" onClick={() => alert("Hello")}/>
                <ToolButton text="Текст" icon="icon-cross" />
                <ToolButton text="Текст" icon="img/left-arrow-l.png" />
                <ToolButton text="Текст" icon="none" />
                <ToolButton text="Текст" />
                <ToolButton />
                <ToolButton />
            </ToolPanel>

            <Spliter />

            <PagedList>
                test
            </PagedList>

            <Spliter />

        </CollapseContainer>
    );
}