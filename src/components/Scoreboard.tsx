 import { skipToken } from "@reduxjs/toolkit/query";
import { useGetScoreQuery, useStartGameMutation, useGetScoreOfGameQuery } from "./game-api-slice";
import styled from "styled-components";
import { tableInnerPadding } from "../../util/style";

export default function Scoreboard() {
    const { data, error, isLoading } = useGetScoreQuery();
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const [trigger, {gameInfo}] = useStartGameMutation({
        fixedCacheKey: "game-id-mutation",
        selectFromResult: ({data}) => ({
            gameInfo: data?.game,
        })
    });

    const {gameScore} = useGetScoreOfGameQuery(gameInfo || skipToken,  {
        selectFromResult: ({data}) => ({
            gameScore: data?.score
        })
    });

    return (
        <StyledMain>
            {isLoading ? <CustomDiv>Loading...</CustomDiv> : error ? <CustomDiv>Error Loading!</CustomDiv> : 
            (data && Array.isArray(data.scores)) ? 
                <table>
                    <StyledHead>
                        <tr>
                            <StyledTh>Place</StyledTh>
                            <StyledTh>Username</StyledTh>
                            <StyledTh>Time</StyledTh>
                            <StyledTh>Image</StyledTh>
                        </tr>
                    </StyledHead>
                    <tbody>
                        {data.scores.map((entry, index) => {
                            return (
                                <tr key={entry.username + entry.time + entry.map.id}>
                                    <StyledTd>{index + 1}</StyledTd>
                                    <StyledTd>{entry.username}</StyledTd>
                                    <StyledTd>{entry.time}</StyledTd>
                                    <StyledTd>{entry.map.name}</StyledTd>
                                </tr>
                                )
                        })}
                        {gameScore && 
                            <tr>
                                <StyledTd>{data.scores.findIndex((entry) => {
                                    return entry.gameid === gameInfo;
                                }) + 1 || "??"}</StyledTd>
                                <StyledTd>{gameScore.username} </StyledTd>
                                <StyledTd>{gameScore.time} </StyledTd>
                                <StyledTd>{gameScore.map.name} </StyledTd>
                            </tr> 
                        }
                    </tbody>   
                </table>
            : <CustomDiv>No entries in scoreboard yet.</CustomDiv> }
        </StyledMain>
    )
};

const StyledMain = styled.main`
    display: flex;
    align-items: start;
    justify-content: center;
`;

const StyledTh = styled.th`
    ${tableInnerPadding}
`;

const StyledTd = styled.td`
    ${tableInnerPadding}
`;

const StyledHead = styled.thead`
    text-align: left;
`;

const CustomDiv = styled.div`
    align-self: center;
`;