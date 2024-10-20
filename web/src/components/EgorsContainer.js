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
import Card from './Card';
import ContextMenu from './ContextMenu';
import ContextMenuButton from './ContextMenuButton';
import React, { useState } from 'react';
import Modal from './Modal';
import { useNotification } from '../contexts/NotificationContext';

export default function EgorsContainer({ children, header }) {
    const fakeCardContentStyle = { width: "100%", height: "200px", backgroundColor: "transparent", borderRadius: "10px" };

    const [pagedListInSelectMode, setPagedListInSelectMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showOverflowModal, setShowOverflowModal] = useState(false);

    const handleChooseButtonClick = (event) => {
        setPagedListInSelectMode(true);
    }

    const handlePagedListSelectModeChange = (event) => {
        !event.value && setPagedListInSelectMode(false);
    };

    const showNotification = useNotification();

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
                <ToolButton text="Текст" icon="icon-picture" onClick={() => alert("Hello")} />
                <ToolButton text="Текст" icon="icon-cross" />
                <ToolButton text="Текст" icon="icon-picture" onClick={() => alert("Hello")} />
                <ToolButton text="Текст" icon="icon-cross" />
                <ToolButton text="Текст" icon="icon-picture" onClick={() => alert("Hello")} />
                <ToolButton text="Текст" icon="icon-cross" />
                <ToolButton text="Текст" icon="icon-picture" onClick={() => alert("Hello")} />
                <ToolButton text="Текст" icon="icon-cross" />
                <ToolButton text="Текст" icon="img/left-arrow-l.png" />
                <ToolButton text="Текст" icon="none" />
                <ToolButton text="Текст" />
                <ToolButton />
                <ToolButton />
            </ToolPanel>

            <Spliter />

            <PagedList
                inSelectMode={pagedListInSelectMode}
                onSelectModeChange={handlePagedListSelectModeChange}
                pageMax="10"
                onPageValueChange={(event) => console.log(event)}>
                <Card id={0}>
                    <div style={fakeCardContentStyle}>
                        <a href='/img/left-arrow-l.png'>Ссылка на /img/left-arrow-l.png</a>
                    </div>
                    <ContextMenu>
                        <ContextMenuButton onClick={handleChooseButtonClick}>Выбрать</ContextMenuButton>
                        <ContextMenuButton onClick={() => console.log(2)}>Text 2</ContextMenuButton>
                        <ContextMenuButton onClick={() => console.log(3)}>Text 3</ContextMenuButton>
                    </ContextMenu>
                </Card>
                <Card id={1}>
                    <div style={fakeCardContentStyle}>
                        <a href='/img/left-arrow-l.png'>Ссылка на /img/left-arrow-l.png</a>
                    </div>
                    <ContextMenu>
                        <ContextMenuButton onClick={handleChooseButtonClick}>Выбрать</ContextMenuButton>
                        <ContextMenuButton onClick={() => console.log(2)}>Text 2</ContextMenuButton>
                    </ContextMenu>
                </Card>
                <Card id={2}>
                    <div style={fakeCardContentStyle}>
                        <a href='/img/left-arrow-l.png'>Ссылка на /img/left-arrow-l.png</a>
                    </div>
                    <ContextMenu>
                        <ContextMenuButton onClick={handleChooseButtonClick}>Выбрать</ContextMenuButton>
                        <ContextMenuButton onClick={() => console.log(2)}>Text 2</ContextMenuButton>
                    </ContextMenu>
                </Card>
            </PagedList>

            <Spliter />

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                buttons={[
                    { color: "primary", text: "console.log(1)", onClick: () => console.log(1) }
                ]}>
                <div style={{ width: "100%", height: "500px", backgroundColor: "transparent" }}></div>
            </Modal>

            <Modal
                show={showOverflowModal}
                onClose={() => setShowOverflowModal(false)}
                buttons={[
                    { color: "primary", text: "console.log(1)", onClick: () => console.log(1) },
                    { color: "secondary", text: "console.log(2)", onClick: () => console.log(2) },
                    { color: "warning", text: "console.log(3)", onClick: () => console.log(3) }
                ]}>
                <div style={{ width: "1000px", height: "1000px", backgroundColor: "transparent" }}></div>
            </Modal>

            <Grid desktopColumns="2" mobileColumns="1">
                <Button color="secondary" onClick={() => setShowModal(true)}>Модальное окно</Button>
                <Button color="secondary" onClick={() => setShowOverflowModal(true)}>Перегруженное модальное окно</Button>
            </Grid>

            <Spliter />

            <Grid desktopColumns="3" mobileColumns="1">
                <Button color="secondary" onClick={() => 
                    showNotification('Заголовок уведомления', 'Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления', 'common', [
                        {text: "console.log(1)", onClick: () => console.log(1)}
                    ])}>
                    Показать уведомление common
                </Button>
                <Button color="primary" onClick={() => 
                    showNotification('Заголовок уведомления', 'Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления', 'important', [
                        {text: "console.log(2)", onClick: () => console.log(2)}
                    ])}>
                    Показать уведомление important
                </Button>
                <Button color="warning" onClick={() => 
                    showNotification('Заголовок уведомления', 'Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления', 'critical', [
                        {text: "console.log(3)", onClick: () => console.log(3)}
                    ])}>
                    Показать уведомление warning
                </Button>
            </Grid>

            <Spliter />

        </CollapseContainer>
    );
}