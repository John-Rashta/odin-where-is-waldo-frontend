import { useState } from "react";
import { ClickType } from '../../util/types';
import OptionBox from "./OptionBox";

export default function Game() {
    const [showBox, setShowBox] = useState(false);
    const [coords, setCoords] = useState({coordX: 0, coordY: 0})

    function handleOnClick(event: ClickType) {
        /// MIGHT CHANGE IT SO THAT IT CLOSES WHEN IT GETS CLICKED AND SHOWBOX IS TRUE INSTEAD OF HAVING THE WHOLE CODE IN THE OTHER ONE
        if (showBox) {
            setShowBox(false);
        } else {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const currentTarget = event.target as HTMLElement;
        const offSetTop = currentTarget.offsetTop;
        const offSetLeft = currentTarget.offsetLeft;
        const rect = currentTarget.getBoundingClientRect();
        console.log(rect)
        console.log(mouseX)
        console.log(mouseY)
        console.log(mouseX - rect.left)
        console.log(mouseY - rect.top)
        setCoords({coordX: mouseX, coordY: mouseY});
        setShowBox(true);
        }
    }

    return (
        <div
        onClick={(e: ClickType) => {
            handleOnClick(e);
        }}
        style={{width: "100vw", height:" 100vh", padding: "20%"}}
        >
            <div style={{width: "600px", height: "600px", backgroundColor: "green"}}>
                {showBox ? <OptionBox coordsProp={{top: coords.coordY, left: coords.coordX}}  > </OptionBox> : null}
            </div>
        </div>
    )
}