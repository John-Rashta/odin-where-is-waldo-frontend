 import { skipToken } from "@reduxjs/toolkit/query";
import { useGetScoreQuery, useStartGameMutation, useGetScoreOfGameQuery } from "./game-api-slice";
import styled, { createGlobalStyle } from "styled-components";
import { tableInnerPadding, LoadingDivStyle } from "../../util/style";

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
            {isLoading ? <><GlobalStyle/><CustomDiv>Loading...</CustomDiv></> : error ? <><GlobalStyle/><CustomDiv>Error Loading!</CustomDiv></> : 
            (data && Array.isArray(data.scores)) ?
            <>
                <StyledTitle2>Leaderboard</StyledTitle2>
                <StyledTable>
                    <StyledHead>
                        <tr>
                            <StyledTh>Place</StyledTh>
                            <StyledTh>Username</StyledTh>
                            <StyledTh>Time</StyledTh>
                            <StyledTh>Image</StyledTh>
                        </tr>
                    </StyledHead>
                    <StyledBody>
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
                            <UserScoreRow>
                                <StyledTd>{data.scores.findIndex((entry) => {
                                    return entry.gameid === gameInfo;
                                }) + 1 || "??"}</StyledTd>
                                <StyledTd>{gameScore.username} </StyledTd>
                                <StyledTd>{gameScore.time} </StyledTd>
                                <StyledTd>{gameScore.map.name} </StyledTd>
                            </UserScoreRow> 
                        }
                    </StyledBody>   
                </StyledTable>
            </>
            : <><GlobalStyle/><CustomDiv>No entries in scoreboard yet.</CustomDiv></> }
        </StyledMain>
    )
};

const GlobalStyle = createGlobalStyle`
    main {
        justify-content: center !important;
    };
`;

const StyledMain = styled.main`
    display: flex;
    align-items: center;
    justify-content: start;
    user-select: none;
    flex-direction: column;
`;

const StyledTh = styled.th`
    ${tableInnerPadding}
    background-color: rgb(0, 131, 120);
    color: white;
`;

const StyledTd = styled.td`
    ${tableInnerPadding}
`;

const StyledHead = styled.thead`
    text-align: left;
`;

const CustomDiv = styled(LoadingDivStyle)`
    align-self: center;
`;

const StyledTable = styled.table`
    user-select: text;
    font-size: 1.1rem;
    border-color: black;
    border-spacing: 1px;
    background-color: rgb(0, 78, 102);
    @media only screen and (max-width: 470px) {
        font-size: 0.9rem;
    }; 
`;

const StyledBody = styled.tbody`
    tr:nth-child(odd) {
        background-color: rgb(50, 200, 211) ;
    };
    tr:nth-child(even) {
        background-color: white;
    };
`;

const StyledTitle2 = styled.h2`
    padding: 20px;
`;

const UserScoreRow = styled.tr`
    color:  rgb(0, 0, 0);
    font-weight: bold;
    background-color: rgb(94, 145, 238) !important;
    td {
        padding: 17px;
    }
`;