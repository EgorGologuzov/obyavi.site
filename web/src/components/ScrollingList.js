import ToolPanel from "./ToolPanel";
import ListView from "./ListView";
import ToolButton from "./ToolButton";
import { useListContext } from "../contexts/ListContext";

export default function ScrollingList({
    children,
    tools,
    toolsForSelectedMode}){
    const listContext = useListContext();

    return ( 
        <div class="scrolling-list">
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
            <div className="scrolling-list__content">
                <ListView desktopColumns="2" mobileColumns="1" >
                    {children}
                </ListView>
            </div>
        </div>
    );
}