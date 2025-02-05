import { useAddScoreMutation, useLazyStartGameQuery } from "./game-api-slice";
import { useState } from "react";
import Modal from "react-modal";
import { FormType } from "../../util/types";

export default function AddScore() {
    const [modalState, setModalState] = useState(true);
    const [addToScore] = useAddScoreMutation();
     // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
     const [ trigger, {gameInfo} ] = useLazyStartGameQuery({
        selectFromResult: ({data}) => ({
           gameInfo: data?.game
        })
    });

    const closeModal = () => setModalState(false);

    const handleSubmit = function handleSubmitOfUsername(event: FormType ) {
        event.preventDefault();
        const currentTarget = event.target as HTMLFormElement;
        if (!currentTarget.username.value || currentTarget.username.value  === "") {
            return;
        }
        if (!gameInfo) {
            return;
        }
        addToScore({username: currentTarget.username.value as string, gameid: gameInfo});
        closeModal();
    };

    return (
        <Modal
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
        </Modal>

    )
};