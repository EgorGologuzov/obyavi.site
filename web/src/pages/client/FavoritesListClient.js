import React from 'react'
import './FavoritesListClient.css'
import Header from '../../components/Header'
import PagedList from '../../components/PagedList';
import { ListContextProvider } from '../../contexts/ListContext'
import ToolButton from '../../components/ToolButton';
import { useNewListContext } from '../../contexts/ListContext';
import Ad from '../../components/Ad';
import Card from '../../components/Card';
import { useState } from 'react';
import { useUserService } from '../../data/UserService';
import { useAppContext } from '../../contexts/AppContext';
import { useAdService } from '../../data/AdServiceArtem';
import DropdownList from '../../components/DropdownList';
import { useNavigate } from 'react-router-dom';

export default function FavoritesListClient() {
    const appContext=useAppContext();
    const adService=useAdService();
    const listContext=useNewListContext();
    const [pageValue,setPageValue]=useState(1);
    const adsInPagedList = (adService.getAds())
    const currentPageAds=(pageValue===1?adsInPagedList.slice(1,6):adsInPagedList.slice(-1))
    const userService=useUserService();
    const dropdownSamples={'option_1':'Сначала новые','option_2':'Сначала старые'};
    const [dropdownValue,setDropdownValue]=useState('');
    const navigate=useNavigate();

    const handleOnPageValueChange=(event)=>{
        setPageValue(event.newValue);
    }

    const handleDropdownChange=(oldValue,newValue)=>{
        setDropdownValue(newValue);
        console.log(newValue);
    }

    return (
        <div className="favorites-list">
            <Header level={3} color={'text'}>Мои избранные</Header>
            <DropdownList 
            options={dropdownSamples}
            label='Сортировка:'
            value={dropdownValue}
            onChange={handleDropdownChange}
            comment=''
            />
            <ListContextProvider value={listContext}>
                <PagedList pageMax="2" pageValue={pageValue} onPageValueChange={handleOnPageValueChange}> 
                    {currentPageAds.map((ad)=>
                        <Card id={ad.id} key={ad.id}>
                            <Ad user={userService.getUserById(ad.owner)}
                            img={ad.images[0]}
                            onTitleClick={()=>navigate("/c/ad/" + ad.id)}
                            onAvatarClick={()=>navigate('/c/profile')}
                            title={ad.main.header}
                            description={ad.main.shortDesc}
                            checked={appContext.loginedUser.favoriteAds.includes(ad.id)}
                            price={ad.price.value}/>
                        </Card>
                    )}
                </PagedList>
            </ListContextProvider>
        </div>
    )
}
