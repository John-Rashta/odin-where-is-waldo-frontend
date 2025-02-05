import { useState, useCallback } from "react";
import { ClickType } from '../../util/types';
import { selectGameState } from "./image-slice";
import OptionBox from "./OptionBox";
import { useSelector } from "react-redux";
import AddScore from "./AddScore";

export default function Game() {
    const [showBox, setShowBox] = useState(false);
    const [coords, setCoords] = useState({coordX: 0, coordY: 0, adjustedX: 0, adjustedY:0});
    const isGameOver = useSelector(selectGameState);

    const closeShowBox = useCallback(() => setShowBox(false), []);

    function handleOnClick(event: ClickType) {
        /// MIGHT CHANGE IT SO THAT IT CLOSES WHEN IT GETS CLICKED AND SHOWBOX IS TRUE INSTEAD OF HAVING THE WHOLE CODE IN THE OTHER ONE
        const currentTarget = event.target as HTMLImageElement;
        if (!currentTarget.classList.contains("mainImage")) {
            return;
        }
        if (showBox) {
            setShowBox(false);
        } else {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const rect = currentTarget.getBoundingClientRect();
        const scaleX = currentTarget.naturalWidth / rect.width;
        const scaleY = currentTarget.naturalHeight / rect.height;
        const finalX = scaleX * (mouseX - rect.left);
        const finalY = scaleY * (mouseY - rect.top);
        setCoords({coordX: mouseX, coordY: mouseY, adjustedX: finalX, adjustedY: finalY});
        setShowBox(true);
        }
    }
    /// ADD IMAGE ELEMENT AND PUT THE CLICK EVENT THERE INSTEAD
    return (
        <main>
            <div
            onClick={(e: ClickType) => {
                handleOnClick(e);
            }}
            style={{width: "100vw", height:" 100vh", padding: "20%"}}
            >
                { isGameOver && <AddScore/>}

                <div style={{width: "600px", height: "600px", backgroundColor: "green"}}>
                    {showBox ? <OptionBox closeBox={closeShowBox} coordsProp={{top: coords.coordY, left: coords.coordX, adjustedX: coords.adjustedX, adjustedY: coords.adjustedY}}  > </OptionBox> : null}
                </div>
            </div>
        </main>
    )
}