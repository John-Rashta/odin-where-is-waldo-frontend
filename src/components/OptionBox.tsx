import { ReactNode} from "react"
import { ClickType, SimpleFunctionType } from "../../util/types"
import { CoordsProp } from "../../util/interfaces"
import { useLazyStartGameQuery, useUpdateGameMutation } from "./game-api-slice"
import { selectId, selectGameState, setGameState } from "./image-slice"
import { useSelector } from "react-redux"
import CharCustom from "./CharCustom"

export default function OptionBox({coordsProp, closeBox} : {coordsProp: CoordsProp, closeBox: SimpleFunctionType , children? : ReactNode }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const [ trigger, {charsInfo, gameInfo} ] = useLazyStartGameQuery({
        selectFromResult: ({data}) => ({
           charsInfo: data?.chars,
           gameInfo: data?.game
        })
    });

    const [updateGame] = useUpdateGameMutation();
    const currentImageId = useSelector(selectId);
    const isGameOver = useSelector(selectGameState);
    
   const handleSelection = function handleSelectionOfOption(e: ClickType) {
        const target = e.target as HTMLElement;
        if (isGameOver) {
            return;
        }
        if (target.classList.contains("charOption") || target.parentElement && target.parentElement.classList.contains("charOption")) {
            ///TODO SAVE THE OPTION SELECTED
            if (gameInfo && target.dataset.id) {
                updateGame({gameid: gameInfo, imageid: currentImageId, body: {
                        coordX: coordsProp.adjustedX, coordY: coordsProp.adjustedY, char: target.dataset.id
                    } 
                }).unwrap().then((result) => {
                    if (result.message === "Game Finished") {
                        setGameState(true);
                    }
                }).finally(() => closeBox());

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