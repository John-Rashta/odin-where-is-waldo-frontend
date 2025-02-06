import { useGetCharactersQuery, useStartGameMutation } from "./game-api-slice";
import CharCustom from "./CharCustom";
import { skipToken } from "@reduxjs/toolkit/query";

export default function CharTracker() {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const [trigger, {gameInfo}] = useStartGameMutation({
        fixedCacheKey: "game-id-mutation",
        selectFromResult: ({data}) => ({
            gameInfo: data?.game,
        })
    });
    
    const {charsInfo}  = useGetCharactersQuery(gameInfo || skipToken, {
            
            selectFromResult: ({data}) => ({
               charsInfo: data?.chars,
            })
    });

    return (
        <div>
            {charsInfo ? charsInfo.map((char) => {
                return <CharCustom key={char.id} extraClass="CharTrackDiv" char={char} /> 
            }) : <div>No Characters Found.</div> }
        </div>
    )
}