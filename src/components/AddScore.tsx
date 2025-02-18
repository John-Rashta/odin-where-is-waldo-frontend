import { useAddScoreMutation, useStartGameMutation } from "./game-api-slice";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { FormType } from "../../util/types";
import { useNavigate } from "react-router-dom";
import { selectOpenScoreState, setAddScore } from "./manager-slice";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { X } from "lucide-react";
import { StyledButtonClose } from "../../util/style";

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
            <StyledCloseButton onClick={closeModal}><X/></StyledCloseButton>
            <StyledForm onSubmit={(e) => {
               handleSubmit(e);
            }}> 
                <StyledFieldset>
                    <StyledLabel htmlFor="username">
                        Username for Leaderboard:
                    </StyledLabel>
                    <StyledInput type="text" name="username" id="username" />
                </StyledFieldset>
                <StyledAddButton type="submit">Add</StyledAddButton>
            </StyledForm>
        </StyledModal>

    )
};

const StyledModal = styled(Modal)`
    background: rgb(162, 212, 214);
    border: 3px solid rgb(95, 93, 93);
    overflow: auto;
    border-radius: 4px;
    outline: none;
    padding: 20px;
`;

const StyledCloseButton = styled(StyledButtonClose)`
    background-color: rgb(244, 252, 255);
    margin-bottom: 10px;
    border-width: 2px;
    &:hover {
        background-color: rgb(172, 172, 172);
    }
`;

const StyledAddButton = styled.button`
    font-size: 1rem;
    padding: 10px;
    border-radius: 10px;
    background-color: rgb(190, 212, 247);
    border: solid rgb(79, 194, 196) 3px;
    color:   rgb(0, 100, 84);
    font-weight: bold;
    &:hover {
        background-color:  rgb(52, 167, 202);
    };
`;

const StyledInput = styled.input`
    padding: 5px;
    font-size: 0.9rem;
    background-color: rgb(179, 225, 255);
`;

const StyledForm = styled.form`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const StyledFieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 15px;
    background-color: rgb(206, 247, 248);
    border: solid 2px rgb(167, 170, 170);
`;

const StyledLabel = styled.label`
    font-size: 1rem;
    font-weight: bold;
`;