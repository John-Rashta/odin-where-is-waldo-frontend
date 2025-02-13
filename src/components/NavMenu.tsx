import Modal from "react-modal";
import { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { X, AlignJustify } from "lucide-react";

export default function NavMenu() {
    const [visible, setVisible] = useState(false);
    
    const openModal = () => setVisible(true);

    const closeModal = () => setVisible(false);
    return (
        <>
        <StyledButton
        onClick={openModal}
        ><AlignJustify/></StyledButton>
        <StyledModal 
        $visible={visible}
        isOpen={visible}
        onRequestClose={closeModal}
        closeTimeoutMS={1000}
        overlayClassName={{base: "NavModal", afterOpen:"NavModal--after-open", beforeClose:"NavModal--before-close"}}
        
        >
            <StyledNav>
                <h1>Find Waldo</h1>
                <NavLink onClick={closeModal} to="/">New Game</NavLink>
                <NavLink onClick={closeModal} to="/game">Game</NavLink>
                <NavLink onClick={closeModal} to="/scoreboard">Scoreboard</NavLink>
            </StyledNav>
            <StyledExtraSpace></StyledExtraSpace>
            <StyledButtonDiv>
                <StyledCloseButton
                onClick={closeModal}
                ><X /></StyledCloseButton>
            </StyledButtonDiv>
        </StyledModal>
        </>

    )
}

const StyledModal = styled(Modal)<{$visible?: boolean}>`
    display: flex;
    position: relative;
    max-width: 20rem;
    width: 100%;
`;

const StyledButton = styled.button`
    display: flex;
    padding: 5px;
    @media only screen and (min-width: 769px) {
    display: none;
    }
`;

const StyledNav = styled.nav`
    background-color: purple;
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
`;

const StyledCloseButton = styled.button`
    display:flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 20px;
    border: solid black 1px;
`

const StyledExtraSpace = styled.div`
    flex-shrink: 0;
    width: 3.5rem;
`;

const StyledButtonDiv = styled.div`
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
`;