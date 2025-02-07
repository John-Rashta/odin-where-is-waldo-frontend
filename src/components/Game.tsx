import { useState, useCallback, useEffect } from "react";
import { ClickType } from '../../util/types';
import { selectUrl, selectName } from "./image-slice";
import OptionBox from "./OptionBox";
import { useSelector } from "react-redux";
import AddScore from "./AddScore";
import CharTracker from "./CharTracker";
import { useStartGameMutation } from "./game-api-slice";
import { useNavigate } from "react-router-dom";
import { selectGameState } from "./manager-slice";

export default function Game() {
    const [showBox, setShowBox] = useState(false);
    const [coords, setCoords] = useState({coordX: 0, coordY: 0, adjustedX: 0, adjustedY:0});
    const [wrongAnswer, setWrongAnswer] = useState(false);
    const isGameOver = useSelector(selectGameState);
    const imageURL = useSelector(selectUrl);
    const imageName = useSelector(selectName);
    const navigate = useNavigate();
     // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
     const [trigger, {gameInfo}] = useStartGameMutation({
        fixedCacheKey: "game-id-mutation",
        selectFromResult: ({data}) => ({
            gameInfo: data?.game,
        })
    });
    const closeShowBox = useCallback(() => setShowBox(false), []);

    const showWrongAnswer = useCallback(() => {
        setWrongAnswer(true);
        setTimeout(() => setWrongAnswer(false), 15000);
    },[]);

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
        const finalX = Math.floor(scaleX * (mouseX - rect.left));
        const finalY = Math.floor(scaleY * (mouseY - rect.top));
        setCoords({coordX: event.pageX, coordY: event.pageY, adjustedX: finalX, adjustedY: finalY});
        setShowBox(true);
        }
    }
    /// ADD IMAGE ELEMENT AND PUT THE CLICK EVENT THERE INSTEAD
    useEffect(() => {
        if (!gameInfo) {
            navigate("/");
        };
    }, [gameInfo, navigate]);

    return (
        <main>
            <CharTracker />
            <div>{wrongAnswer && "Incorrect Coordinates!"}</div>
            <div>
                {(imageURL !== "0" && imageName !=="0") && <img src={imageURL} alt={imageName}
                onClick={(e: ClickType) => {
                    handleOnClick(e);
                }}
                className="mainImage"
                 />}
                { isGameOver && <AddScore/>}
                {showBox ? <OptionBox showWrong={showWrongAnswer} closeBox={closeShowBox} coordsProp={{top: coords.coordY, left: coords.coordX, adjustedX: coords.adjustedX, adjustedY: coords.adjustedY}}  > </OptionBox> : null}
            </div>
        </main>
    )
}