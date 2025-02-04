 import { useGetScoreQuery } from "./game-api-slice";

export default function Scoreboard() {
    const { data, error, isLoading } = useGetScoreQuery();

    return (
        <>
            {isLoading ? <div>Loading...</div> : error ? <div>Error Loading!</div> : 
            data ? 
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
        </>
    )
};