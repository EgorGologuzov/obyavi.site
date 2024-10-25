import ToolPanel from './ToolPanel';
import ToolButton from './ToolButton';

const ScrollingList = ({children}) => {
    return ( 
        <div class="scrolling-list">
            <ToolPanel>
                <ToolButton text="Текст" icon="icon-picture" onClick={() => alert("Hello")}/>
                <ToolButton text="Текст" icon="icon-cross"/>
            </ToolPanel>
            <div class="content">
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}
 
export default ScrollingList;