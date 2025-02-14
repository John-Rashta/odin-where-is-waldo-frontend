import { useGetCharactersQuery, useStartGameMutation } from "./game-api-slice";
import CharCustom from "./CharCustom";
import { skipToken } from "@reduxjs/toolkit/query";
import styled from "styled-components";

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
        <StyledCharTrack>
            {charsInfo ? charsInfo.map((char) => {
                return <CharCustom key={char.id} extraClass="CharTrackDiv" char={char} namePresent={true} /> 
            }) :  <button
            onClick={() => refetch()}
            >Try Again</button> }
        </StyledCharTrack>
    )
}

const StyledCharTrack = styled.div`
    display:flex;
    gap: 5px;
`;