import { selectStartTime, selectEndTime } from "./timer-slice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { formatTime } from "../../util/formatTime";
import { selectGameState } from "./manager-slice";

export default function Timer() {
    const  [time, setTime] = useState(0);
    const currentStartTime = useSelector(selectStartTime);
    const currentEndTIme = useSelector(selectEndTime);
    const currentGameState = useSelector(selectGameState);


    useEffect(() => {
        let clearClock : number;

        if (currentStartTime !== 0 && currentEndTIme !== 0) {
            setTime(Math.abs(currentEndTIme - currentStartTime));
        } else if (!currentGameState && currentStartTime !== 0) {
            clearClock = window.setInterval(() => {
                setTime(Math.abs(Date.now() - currentStartTime));
            }, 100);
        };

        const stopClock = () => window.clearInterval(clearClock);
        
        return stopClock;
    }, [currentGameState, currentStartTime, currentEndTIme]);

    return (
        <h3>
            {formatTime(time)}
        </h3>
    );
};