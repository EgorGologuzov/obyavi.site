import UpDown from "./UpDown";
import ToolPanel from "./ToolPanel";

export default function PagedList() {
  return (
    <div className="paged-list">
        <ToolPanel>
            <UpDown min="1" max="10" value="2" onChange={(newValue) => console.log(newValue)}/>
        </ToolPanel>
        <div className="paged-list__content">
            Test
        </div>
    </div>
  )
}
