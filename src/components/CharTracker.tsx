import { useLazyStartGameQuery } from "./game-api-slice";
import CharCustom from "./CharCustom";
export default function CharTracker() {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const [ trigger, {charsInfo} ] = useLazyStartGameQuery({
            selectFromResult: ({data}) => ({
               charsInfo: data?.chars,
            })
    });

    return (
        <>
            {charsInfo ? charsInfo.map((char) => {
                return <CharCustom key={char.id} extraClass="CharTrackDiv" char={char} /> 
            }) : <div>No Characters Found.</div> }
        </>
    )
}