import Button from './Button';
import CollapseContainer from './CollapseContainer';
import Header from './Header';
import Spliter from './Spliter';
import Subcaption from './Subcaption';
import TextNormal from './TextNormal';
import ToolButton from './ToolButton';

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

            <TextNormal>Нормальный текст Нормальный текст Нормальный текст Нормальный текст Нормальный текст
                Нормальный текст Нормальный текст Нормальный текст Нормальный текст Нормальный текст Нормальный текст
                Нормальный текст</TextNormal>
            <Spliter />
            <TextNormal fontSize="small">Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький
                текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст
                Маленький текст Маленький текст Маленький текст</TextNormal>
            <Spliter />
            <TextNormal fontSize="10px" color="accent">Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький
                текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст
                Маленький текст Маленький текст Маленький текст</TextNormal>

            <Spliter />

            <div class="grid-buttons">
                <Button onclick={() => alert("Hello")}>Текст</Button>
                <Button color="secondary">Текст</Button>
                <Button color="warning">Текст</Button>
                <Button disabled>Текст</Button>
                <Button color="secondary" disabled>Текст</Button>
                <Button color="warning" disabled>Текст</Button>
            </div>

            <Spliter />

            <div class="tool-panel">
                <ToolButton text="Текст" icon="icon-picture" onclick={() => alert("Hello")}/>
                <ToolButton text="Текст" icon="icon-cross" />
                <ToolButton text="Текст" icon="img/left-arrow-l.png" />
                <ToolButton text="Текст" icon="none" />
                <ToolButton text="Текст" />
                <ToolButton />
                <ToolButton />
            </div>

            <Spliter />

        </CollapseContainer>
    );
}