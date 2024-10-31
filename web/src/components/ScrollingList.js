import ToolPanel from "./ToolPanel";
import ListView from "./ListView";
import ToolButton from "./ToolButton";
import { useListContext } from "../contexts/ListContext";

export default function ScrollingList({
    children,
    tools,
    toolsForSelectedMode,
    onBottomReached}){
    const listContext = useListContext();

    const handleScroll=(e)=>{
        const bottom=e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom)
            onBottomReached();
    }

    return ( 
        <div className="scrolling-list">
            <ToolPanel>
                {listContext.selectMode && (
                    <>
                    {toolsForSelectedMode}
                    <ToolButton text="Отмена" icon="icon-cross" onClick={() => {listContext.setSelectMode(false)}}/>
                    </>
                )}
                {!listContext.selectMode && (
                    <>
                    {tools}
                    </>
                )}
                
            </ToolPanel>
            <div className="scrolling-list__content" style={{maxHeight:'445px'}} onScroll={handleScroll}>
                <ListView desktopColumns="2" mobileColumns="1" >
                    {children}
                </ListView>
            </div>
        </div>
    );
}