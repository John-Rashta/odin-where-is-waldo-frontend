import Modal from "react-modal";
import { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export default function NavMenu() {
    const [visible, setVisible] = useState(false);
    
    const openModal = () => setVisible(true);

    const closeModal = () => setVisible(false);
    return (
        <>
        <StyledButton
        onClick={openModal}
        >Open</StyledButton>
        <StyledModal
        isOpen={visible}
        onRequestClose={closeModal}
        >
            <button
            onClick={closeModal}
            >X</button>
            <h1>Find Waldo</h1>
            <NavLink onClick={closeModal} to="/">New Game</NavLink>
            <NavLink onClick={closeModal} to="/game">Game</NavLink>
            <NavLink onClick={closeModal} to="/scoreboard">Scoreboard</NavLink>
        </StyledModal>
        </>

    )
}

const StyledModal = styled(Modal)`
    background-color: purple;
    @media only screen and (min-width: 1022px) {
    display: none;
    }
`;

const StyledButton = styled.button`
    @media only screen and (min-width: 769px) {
    display: none;
    }
`;