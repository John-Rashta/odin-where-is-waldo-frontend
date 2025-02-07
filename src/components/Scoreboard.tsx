 import { useGetScoreQuery, useStartGameMutation } from "./game-api-slice";

export default function Scoreboard() {
    const { data, error, isLoading } = useGetScoreQuery();
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const [trigger, {gameInfo}] = useStartGameMutation({
        fixedCacheKey: "game-id-mutation",
        selectFromResult: ({data}) => ({
            gameInfo: data?.game,
        })
    });

    return (
        <main>
            {isLoading ? <div>Loading...</div> : error ? <div>Error Loading!</div> : 
            (data && Array.isArray(data)) ? 
                <table>
                    <tr>
                        <th>Username</th>
                        <th>Image</th>
                        <th>time</th>
                    </tr>
                    {data.map((entry) => {
                        return (
                            <tr key={entry.username + entry.time + entry.map.id}>
                                <td>{entry.username}</td>
                                <td>{entry.time}</td>
                                <td>{entry.map.name}</td>
                            </tr>
                            )
                    })}
                </table>
            : <div>No entries in scoreboard yet.</div> }
        </main>
    )
};