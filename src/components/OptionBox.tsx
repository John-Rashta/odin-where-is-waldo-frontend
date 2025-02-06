import { ReactNode} from "react"
import { ClickType, SimpleFunctionType } from "../../util/types"
import { CoordsProp } from "../../util/interfaces"
import { useStartGameMutation, useUpdateGameMutation, useGetCharactersQuery  } from "./game-api-slice"
import { selectGameState, setGameState } from "./image-slice"
import { useDispatch, useSelector } from "react-redux"
import CharCustom from "./CharCustom"
import { skipToken } from "@reduxjs/toolkit/query"

export default function OptionBox({coordsProp, closeBox} : {coordsProp: CoordsProp, closeBox: SimpleFunctionType , children? : ReactNode }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const [trigger, {gameInfo}] = useStartGameMutation({
        fixedCacheKey: "game-id-mutation",
        selectFromResult: ({data}) => ({
            gameInfo: data?.game
        })
    });
    const {charsInfo} = useGetCharactersQuery(gameInfo || skipToken, {
        selectFromResult: ({data}) => ({
           charsInfo: data?.chars
        })
    });

    const [updateGame] = useUpdateGameMutation();
    const isGameOver = useSelector(selectGameState);
    const dispatch = useDispatch();
    
   const handleSelection = function handleSelectionOfOption(e: ClickType) {
        const target = e.target as HTMLElement;
        if (isGameOver) {
            closeBox();
            return;
        }
        if (target.classList.contains("charOption") || target.parentElement && target.parentElement.classList.contains("charOption")) {
            const charid = target.dataset.id || target.parentElement && target.parentElement.dataset.id;
            ///TODO SAVE THE OPTION SELECTED
            if (gameInfo && charid) {
                updateGame({gameid: gameInfo, body: {
                        coordX: coordsProp.adjustedX, coordY: coordsProp.adjustedY, char: charid
                    } 
                }).unwrap().then((result) => {
                    if (result.message === "Game Finished") {
                        dispatch(setGameState(true));
                    }
                }).finally(() => {
                    closeBox();
                });

            };
        };
   }

    return (
        <div className="optionBox" onClick={(e: ClickType) => {handleSelection(e)}} style={{position: "absolute", ...coordsProp}}>
            {charsInfo ? charsInfo.map((char) => {
                return <CharCustom key={char.id} extraClass="charOption" char={char} />
            })  :  <div>No Characters Found.</div>  }
        </div>
    )
}