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
import { useAdService } from '../../data/AdServiceArtem';
import Avatar from '../../components/Avatar';
import StarsBar from '../../components/StarsBar';
import Header from '../../components/Header';
import FilterDialogClient from '../../components/FilterDialogClient';
import Switch from '../../components/Switch';
import Ad from '../../components/Ad';

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
                            <Ad user={userService.getUserById(ad.userId)}
                            img='https://alpinabook.ru/upload/resize_cache/iblock/8d9/550_800_1/8d9cd63476f15e85f0d8796555ab1e6b.jpg'
                            title={ad.title}
                            description={ad.description}
                            checked={appContext.loginedUser.favoriteAds.includes(ad.id)}
                            price={ad.price}
                            />
                        </Card>
                    )}
                </ScrollingList>
            </ListContextProvider>
        </div>
    )
}
