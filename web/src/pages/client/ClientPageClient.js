import React from 'react'
import { useState, useEffect } from 'react'
import './ClientPageClient.css'
import Avatar from '../../components/Avatar'
import Header from '../../components/Header'
import Subcaption from '../../components/Subcaption'
import StarsBar from '../../components/StarsBar'
import Button from '../../components/Button'
import { useUserService } from '../../data/UserService'
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { useNewListContext } from '../../contexts/ListContext'
import Card from '../../components/Card'
import { ListContextProvider } from '../../contexts/ListContext'
import { ScrollingList_withLoad } from '../../hoc/withLoad'
import { useAdService } from '../../data/AdService'



export default function ClientPageClient() {
    const appContext=useAppContext();
    const listContext=useNewListContext();
    const [isBusy, setIsBusy] = useState(false);
    const adService=useAdService();
    const userService=useUserService();
    const [user,setUser]=useState({});;
    const {id}=useParams()
    const navigate=useNavigate();
    const ratingList=[{
        text:'Text1 Text1 Text1 Text1 Text1 Text1 Text1 Text1 Text1 Text1 Text1 '
    },
    {
        text:'Text2 Text2 Text2 Text2 Text2 Text2 Text2 Text2 Text2 Text2 Text2 '
    },
    {
        text:'Text3 Text3 Text3 Text3 Text3 Text3 Text3 Text3 Text3 Text3 Text3 '
    }]

    useEffect(()=>{
        setUser(userService.getUserById(id));
    },[])

    return (
        <div className="client-page">
            <div className="client-page__client-zone">
                <div className="client-page__client-zone__header">
                    <Avatar src={user.avatar}/>
                    <Header level={2}>{user.lastname} {user.firstname} {user.patronym}</Header>
                    <Subcaption level={2} color='accent'>Онлайн</Subcaption>
                    <StarsBar value={4} input_mode={false}/>
                </div>
                <div className="client-page__client-zone__info">
                    <Subcaption level={2}>Местоположение</Subcaption>
                    <Subcaption level={2} color={'text'}>{user.location}</Subcaption>
                    <Subcaption level={2}>Дата регистрации</Subcaption>
                    <Subcaption level={2} color={'text'}>{user.regDate}</Subcaption>
                    <Subcaption level={2}>Описание</Subcaption>
                    <br/>
                    <Subcaption level={1} color={'text'}>{user.description}</Subcaption>
                    <div className="client-page__client-zone__info__buttons">
                        <Button color='primary'>
                            Написать
                        </Button>
                        <Button color='warning'>
                            Пожаловаться
                        </Button>
                        <Button color='secondary' onClick={()=>navigate(`../client/${id}/ads`)}>
                            Все объявления
                        </Button>
                    </div>
                </div>
            </div>
            <div className="client-page__rating-zone">
                <Subcaption level={2} color={'text'}>
                    Отзывы:
                </Subcaption>
                <ListContextProvider value={listContext}>
                    <ScrollingList_withLoad
                    listContext={listContext}
                    isBusy={isBusy}
                    hasItems={ratingList.length}
                    >
                        {ratingList&&ratingList.map((rating, index) =>
                            <Card id={rating.id} key={rating.id}>
                               <Subcaption level={1} color={'text'}>
                                    {rating.text}
                               </Subcaption>
                            </Card>
                        )}
                    </ScrollingList_withLoad>
                </ListContextProvider>
                <Button color='secondary' onClick={()=>navigate(`../client/${id}/reviews`)}>Все отзывы</Button>
            </div>
        </div>
    )
}
