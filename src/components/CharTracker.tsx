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
    
    const {charsInfo, refetch}  = useGetCharactersQuery(gameInfo || skipToken, {
            
            selectFromResult: ({data}) => ({
               charsInfo: data?.chars,
            })
    });

    return (
        <div>
            {charsInfo ? charsInfo.map((char) => {
                if (char.found) {
                    return <div key={char.id}>X</div>
                }
                return <CharCustom key={char.id} extraClass="CharTrackDiv" char={char} /> 
            }) :  <button
            onClick={() => refetch()}
            >Try Again</button> }
        </div>
    )
}