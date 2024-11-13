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

export default function FavoritesListClient() {
    const appContext=useAppContext();
    const adService=useAdService();
    const listContext=useNewListContext();
    const [pageValue,setPageValue]=useState(1);
    const adsInPagedList = (adService.getAds())
    const currentPageAds=([adsInPagedList[pageValue-1]])
    const userService=useUserService();
    const dropdownSamples={'option_1':'Сначала новые','option_2':'Сначала старые'};
    const [dropdownValue,setDropdownValue]=useState('');

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
                <PagedList pageMax="3" pageValue={pageValue} onPageValueChange={handleOnPageValueChange}> 
                    {currentPageAds.map((ad)=>
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
                </PagedList>
            </ListContextProvider>
        </div>
    )
}
