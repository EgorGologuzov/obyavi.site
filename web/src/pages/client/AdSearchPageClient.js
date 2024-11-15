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
import { useNavigate } from 'react-router-dom';
import {Header_withOnClick} from '../../hoc/Header_withOnClick'

export default function AdSearchPageClient() {
    const appContext=useAppContext();
    const listContext = useNewListContext();
    const [searchRequest, setSearchRequest] = useState();
    const [searchHints, setSearchHints] = useState([]);
    const searchService=useSearchService();
    const adService=useAdService();
    const adCount=adService.getAds().length;
    const userService=useUserService();
    const [adsInScrollingList,setAds] = useState(adService.getAds())
    const navigate=useNavigate();

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
                <Button color='secondary' onClick={()=>appContext.showModal('Выберите категорию',(<FilterDialogClient/>))}><img style={{width:'35px',height:'30px',content:'var(--icon-filter)',alignSelf:'center'}}/> <p>Фильтры</p></Button>
                <Button color='secondary' onClick={()=>appContext.showModal('Сортировка',(<SortingDialogClient/>))}><img style={{width:'40px',height:'30px',content:'var(--icon-sort)',alignSelf:'center'}}/> <p>Сортировка</p></Button>
            </div>
            <Header_withOnClick level={3}>Найдено {adsInScrollingList.length} товаров из {adCount}</Header_withOnClick>
            <ListContextProvider value={listContext}>
                <ScrollingList onBottomReached={()=>console.log('wow')}>
                    {adsInScrollingList.map((ad, index) =>
                        <Card id={ad.id} key={ad.id}>
                            <Ad user={userService.getUserById(ad.owner)}
                            img={ad.images[0]}
                            onTitleClick={()=>navigate("/c/ad/" + ad.id)}
                            onAvatarClick={()=>navigate('/c/profile')}
                            title={ad.main.header}
                            description={ad.main.shortDesc}
                            checked={appContext.loginedUser.favoriteAds?.includes(ad.id)}
                            price={ad.price.value}
                            />
                        </Card>
                    )}
                </ScrollingList>
            </ListContextProvider>
        </div>
    )
}
