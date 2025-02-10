 import { skipToken } from "@reduxjs/toolkit/query";
import { useGetScoreQuery, useStartGameMutation, useGetScoreOfGameQuery } from "./game-api-slice";

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
        <main>
            {isLoading ? <div>Loading...</div> : error ? <div>Error Loading!</div> : 
            (data && Array.isArray(data.scores)) ? 
                <table>
                    <thead>
                        <tr>
                            <th>Place</th>
                            <th>Username</th>
                            <th>Image</th>
                            <th>time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.scores.map((entry, index) => {
                            return (
                                <tr key={entry.username + entry.time + entry.map.id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.username}</td>
                                    <td>{entry.time}</td>
                                    <td>{entry.map.name}</td>
                                </tr>
                                )
                        })}
                        {gameScore && 
                            <tr>
                                <td>{data.scores.findIndex((entry) => {
                                    return entry.gameid === gameInfo;
                                }) + 1 || "??"}</td>
                                <td>{gameScore.username} </td>
                                <td>{gameScore.time} </td>
                                <td>{gameScore.map.name} </td>
                            </tr> 
                        }
                    </tbody>   
                </table>
            : <div>No entries in scoreboard yet.</div> }
        </main>
    )
};