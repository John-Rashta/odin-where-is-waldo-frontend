import { ReactNode} from "react"
import { ClickType } from "../../util/types"
import { CoordsProp } from "../../util/interfaces"

export default function OptionBox({coordsProp} : {coordsProp: CoordsProp, children? : ReactNode }) {
    
   const handleSelection = function handleSelectionOfOption(e: ClickType) {
        const target = e.target as HTMLElement;
        if (target.classList.contains("charOption")) {
            ///TODO SAVE THE OPTION SELECTED
        }     
   }

    return (
        <div className="optionBox" onClick={(e: ClickType) => {handleSelection(e)}} style={{position: "absolute", height: "20px", width: "20px", backgroundColor: "blue", ...coordsProp}}></div>
    )

}