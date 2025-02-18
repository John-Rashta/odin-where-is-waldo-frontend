import { useGetCharactersQuery, useStartGameMutation } from "./game-api-slice";
import CharCustom from "./CharCustom";
import { skipToken } from "@reduxjs/toolkit/query";
import styled from "styled-components";
import { gameTopFont, gameTopFontMin, mediaGameValue, StyledButton } from "../../util/style";

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
            }) :  <StyledFetchButton
            onClick={() => refetch()}
            >Try Again</StyledFetchButton> }
        </StyledCharTrack>
    )
}

const StyledCharTrack = styled.div`
    display:flex;
    gap: 5px;
    font-size: ${gameTopFont};
    @media only screen and (max-width: ${mediaGameValue}) {
        font-size: ${gameTopFontMin};
    };
`;

const StyledFetchButton = styled(StyledButton)`
    align-self: center;
`;