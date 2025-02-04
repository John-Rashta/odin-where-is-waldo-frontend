import { ReactNode} from "react"
import { ClickType } from "../../util/types"
import { CoordsProp } from "../../util/interfaces"
import { useLazyStartGameQuery, useUpdateGameMutation } from "./game-api-slice"
import { selectId } from "./image-slice"
import { useSelector } from "react-redux"
import CharCustom from "./CharCustom"

export default function OptionBox({coordsProp} : {coordsProp: CoordsProp, children? : ReactNode }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const [ trigger, {charsInfo, gameInfo} ] = useLazyStartGameQuery({
        selectFromResult: ({data}) => ({
           charsInfo: data?.chars,
           gameInfo: data?.game
        })
    });

    const [updateGame] = useUpdateGameMutation();
    const currentImageId = useSelector(selectId);
    
   const handleSelection = function handleSelectionOfOption(e: ClickType) {
        const target = e.target as HTMLElement;
        if (target.classList.contains("charOption")) {
            ///TODO SAVE THE OPTION SELECTED
            if (gameInfo && target.dataset.id) {
                updateGame({gameid: gameInfo, imageid: currentImageId, body: {
                        coordX: coordsProp.adjustedX, coordY: coordsProp.adjustedY, char: target.dataset.id
                    } 
                }).unwrap();
            };
        };
   }

    return (
        <div className="optionBox" onClick={(e: ClickType) => {handleSelection(e)}} style={{position: "absolute", height: "20px", width: "20px", backgroundColor: "blue", ...coordsProp}}>
            {charsInfo ? charsInfo.map((char) => {
                return <CharCustom key={char.id} extraClass="charOption" char={char} />
            })  :  <div>No Characters Found.</div>  }
        </div>
    )
}