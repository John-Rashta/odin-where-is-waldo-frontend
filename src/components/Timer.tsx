import { selectStartTime, selectEndTime } from "./timer-slice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { formatTime } from "../../util/formatTime";
import { selectGameState } from "./manager-slice";
import styled from "styled-components";
import { mediaForScoreTime } from "../../util/style";

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
        <StyledTimer>
            {formatTime(time)}
        </StyledTimer>
    );
};

const StyledTimer = styled.h3`
    border: solid 2px rgb(83, 95, 105);
    padding: 10px;
    border-radius: 5px;
    background-color: rgb(222, 235, 236);
    @media only screen and (max-width: ${mediaForScoreTime}) {
        padding: 5px;
        font-size: 1rem;
    }; 
`;