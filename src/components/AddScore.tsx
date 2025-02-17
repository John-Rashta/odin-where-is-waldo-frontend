import { useAddScoreMutation, useStartGameMutation } from "./game-api-slice";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { FormType } from "../../util/types";
import { useNavigate } from "react-router-dom";
import { selectOpenScoreState, setAddScore } from "./manager-slice";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

export default function AddScore() {
    const [modalState, setModalState] = useState(false);
    const currentOpenState = useSelector(selectOpenScoreState);
    const [addToScore] = useAddScoreMutation();
    const dispatch = useDispatch();
     // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
     const [ trigger, {gameInfo} ] = useStartGameMutation({
        fixedCacheKey: "game-id-mutation",
        selectFromResult: ({data}) => ({
           gameInfo: data?.game
        })
    });
    const navigate = useNavigate();
    useEffect(() => {
        setModalState(currentOpenState);

    },[currentOpenState]);

    const closeModal = () => {
        dispatch(setAddScore(false));
    };

    const handleSubmit = function handleSubmitOfUsername(event: FormType ) {
        event.preventDefault();
        const currentTarget = event.target as HTMLFormElement;
        if (!currentTarget.username.value || currentTarget.username.value  === "") {
            dispatch(setAddScore(false));
            return;
        }
        if (!gameInfo) {
            dispatch(setAddScore(false));
            return;
        }
        addToScore({username: currentTarget.username.value as string, gameid: gameInfo}).unwrap().then((result) => {
            if (result.message === "Added to Scoreboard") {
                navigate("/scoreboard");
            };
        }).catch((result) => {
            console.log(result.data.message)
        });
        dispatch(setAddScore(false));
    };

    return (
        <StyledModal
        closeTimeoutMS={500}
        overlayClassName={{base: "scoreModal", afterOpen:"scoreModal--after-open", beforeClose:"scoreModal--before-close"}}
        isOpen={modalState}
        onRequestClose={closeModal}
        >
            <button onClick={closeModal}>x</button>
            <form onSubmit={(e) => {
               handleSubmit(e);
            }}>
                <input type="text" name="username" />
                <button type="submit">Add</button>
            </form>
        </StyledModal>

    )
};

const StyledModal = styled(Modal)`
    background: rgb(255, 255, 255);
    border: 1px solid rgb(204, 204, 204);
    overflow: auto;
    border-radius: 4px;
    outline: none;
    padding: 20px;
`;