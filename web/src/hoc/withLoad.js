import PagedList from "../components/PagedList"
import { ListContextProvider } from "../contexts/ListContext"
import "./css/withLoad.css"

export function withLoad(List) {
    return function({ isBusy, hasItems, listContext, children, ...otherProps }) {

        return (
            <ListContextProvider value={listContext}>
                <List {...otherProps}>
                    {!hasItems && isBusy && <div className="with-load__placeholder">Загрузка...</div>}
                    {!hasItems && !isBusy && <div className="with-load__placeholder">Нет элементов...</div>}
                    {children}
                </List>
            </ListContextProvider>
            
        )
    }
}

export const PagedList_withLoad = withLoad(PagedList);