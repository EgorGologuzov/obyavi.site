import React, { useEffect } from 'react'
import { useAppContext } from '../../contexts/AppContext';
import './AdSearchPageClient.css'
import Button from '../../components/Button';
import SearchString from '../../components/SearchString';
import Subcaption from '../../components/Subcaption';
import { ScrollingList_withLoad } from '../../hoc/withLoad';
import { ListContextProvider,useNewListContext } from '../../contexts/ListContext';
import SortingDialogClient from '../../components/SortingDialogClient';
import Card from '../../components/Card';
import {useSearchService} from '../../data/SearchService';
import { useState } from 'react';
import { useAdService } from '../../data/AdService';
import Header from '../../components/Header';
import FilterDialogClient from '../../components/FilterDialogClient';
import { useNavigate } from 'react-router-dom';
import {Header_withOnClick} from '../../hoc/Header_withOnClick'
import ContextMenu from '../../components/ContextMenu';
import ContextMenuButton from '../../components/ContextMenuButton';
import { busyProcess } from '../../utils/utils';
import parse from 'html-react-parser'
import ToolButton from '../../components/ToolButton';

export default function AdSearchPageClient() {
    const appContext=useAppContext();
    const listContext = useNewListContext();
    const [searchRequest, setSearchRequest] = useState();
    const [searchHints, setSearchHints] = useState([]);
    const searchService=useSearchService();
    const adService=useAdService();
    const [ads, setAds] = useState([]);
    const [page, setPage] = useState();
    const [pageMax, setPageMax] = useState(0);
    const [isBusy, setIsBusy] = useState(false);

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

    const load = ({ page }) => {
        busyProcess(isBusy, setIsBusy, () => {
            setAds([]);
            setPage(page);
            return adService.getMyAds({ page, userId: appContext.loginedUser.id })
                .then((data) => {
                    setAds(data.list);
                    setPageMax(data.totalPages);
                })
                .catch((err) => appContext.showNotification(
                    '',
                    `Не удалось загрузить данные: ${err.message}`,
                    'critical'
                ))
        }
        )
    }

    const navigateToAd = (adId) => {
        window.open("/c/ad/" + adId, '_blank');
    }

    useEffect(()=>{
        load({page:1})
    },[])

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
            <Header_withOnClick level={3}>Найдено {ads.length} товаров из {ads.length}</Header_withOnClick>
            <ListContextProvider value={listContext}>
                <ScrollingList_withLoad
                listContext={listContext}
                isBusy={isBusy}
                hasItems={ads.length}
                onBottomReached={()=>console.log('wow')}
                >
                    {ads&&ads.map((ad, index) =>
                        <Card id={ad.id} key={ad.id}>
                            <div className="my-ads-list-client__card-content">
                                <div className="my-ads-list-client__up-content">
                                    <img className="my-ads-list-client__ad-avatar" src={ad.main.avatar} onClick={() => navigateToAd(ad.id)}/>
                                    <div className="my-ads-list-client__text-content">
                                        <div className="my-ads-list-client__card-header" onClick={() => navigateToAd(ad.id)}>
                                            <Header level={4}>{ ad.main.header }</Header>
                                        </div>
                                        <Subcaption level={2}>{ `г. ${ad.adress.city}, ${ad.adress.district}` }</Subcaption>
                                        <Header level={4}>{ `${Number(ad.price.value).toLocaleString(undefined, { minimumFractionDigits: 0 }) } ${ad.price.currency}` }</Header>
                                        <div className="my-ads-list-client__desc">{ ad.desc && parse(ad.desc) }</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}
                </ScrollingList_withLoad>
            </ListContextProvider>
        </div>
    )
}
