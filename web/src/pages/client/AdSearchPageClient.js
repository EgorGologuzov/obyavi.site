import React, { useEffect } from 'react'
import { useAppContext } from '../../contexts/AppContext';
import './AdSearchPageClient.css'
import UserService, { useUserService } from '../../data/UserService';
import Button from '../../components/Button';
import SearchString from '../../components/SearchString';
import Subcaption from '../../components/Subcaption';
import ScrollingList from '../../components/ScrollingList';
import { ListContextProvider,useNewListContext } from '../../contexts/ListContext';
import SortingDialogClient from '../../components/SortingDialogClient';
import Card from '../../components/Card';
import {useSearchService} from '../../data/SearchService';
import { useState } from 'react';
import { useAdService } from '../../data/AdService';
import Avatar from '../../components/Avatar';
import StarsBar from '../../components/StarsBar';
import Header from '../../components/Header';
import FilterDialogClient from '../../components/FilterDialogClient';
import Switch from '../../components/Switch';

export default function AdSearchPageClient() {
    const appContext=useAppContext();
    const listContext = useNewListContext();
    const [searchRequest, setSearchRequest] = useState();
    const [searchHints, setSearchHints] = useState([]);
    const searchService=useSearchService();
    const adService=useAdService();
    const adCount=adService.getAds().length;
    const userService=useUserService();
    const userList=userService.getUsers();
    const [adsInScrollingList,setAds] = useState(adService.getAds())
    const dropdownSamples={'option_1':'White','option_2':'Red','option_3':'Green','option_4':'Blue','option_5':'Black'};
    const [isChecked,setIsChecked]=useState(false);

    const handleSearchRequestChanged = (oldValue, newValue) => {
        setSearchRequest(newValue);
        searchService.getHints(newValue)
            .then((hints) => setSearchHints(hints));
    }

    const handleSearch=(newValue)=>{
        if(newValue)
            setAds(adService.getAdsByTitle(newValue));
        else
            setAds(adService.getAds());
    }

    return (
        <div className="ad-search-page">
            <div className="ad-search-page__search-zone">
                <SearchString 
                    placeholder='Поиск по сайту' 
                    hints={searchHints}
                    onChange={handleSearchRequestChanged}
                    inputValue={searchRequest ?? ""}
                    onSearch={()=>handleSearch(searchRequest)}
                />
                <Button color='secondary' onClick={()=>appContext.showModal('Выберите категорию',(<FilterDialogClient/>))}>Фильтры</Button>
                <Button color='secondary' onClick={()=>appContext.showModal('Сортировка',(<SortingDialogClient/>))}>Сортировка</Button>
            </div>
            <Subcaption level={2}>Найдено {adsInScrollingList.length} товаров из {adCount}</Subcaption>
            <ListContextProvider value={listContext}>
                <ScrollingList onBottomReached={()=>console.log('wow')}>
                    {adsInScrollingList.map((ad, index) => 
                        <Card id={ad.id} key={ad.id}>
                            <div className="ad">
                                <div className="ad__img-presenter" style={{gridRow:'span 2'}}>
                                    <img src={ad.img} style={{width:'250px',height:'250px',borderRadius:'10%'}}/>
                                </div>
                                <div className="ad__text-info">
                                    <Header level={1}>{ad.title}</Header>
                                    <Subcaption level={2}>{userService.getUserById(ad.userId).location}</Subcaption>
                                    <Subcaption level={1} color={'text'}>{ad.description}</Subcaption>
                                </div>
                                <Switch checked={appContext.loginedUser.favoriteAds.includes(ad.id)}/>
                                <div className="ad__user-info">
                                    <Avatar src={userService.getUserById(ad.userId).avatar}/>
                                    <div className="ad__user-info__c2">
                                        <Header level={5}>{userService.getUserById(ad.userId).firstname} {userService.getUserById(ad.userId).lastname}</Header>
                                        <div className="ad__user-info__c2__r2">
                                            <StarsBar input_mode={false} value={userService.getUserById(ad.userId).rating}/>
                                            <Subcaption level={2} color={'secondary'}>Отзывы</Subcaption>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}
                </ScrollingList>
            </ListContextProvider>
        </div>
    )
}
