import Modal from "react-modal";
import { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { X, AlignJustify } from "lucide-react";
import { navDisplayValue, StyledButtonClose } from "../../../util/style";

export default function NavMenu() {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);

  const closeModal = () => setVisible(false);
  return (
    <>
      <StyledButton onClick={openModal}>
        <AlignJustify />
      </StyledButton>
      <StyledModal
        isOpen={visible}
        onRequestClose={closeModal}
        closeTimeoutMS={500}
        overlayClassName={{
          base: "NavModal",
          afterOpen: "NavModal--after-open",
          beforeClose: "NavModal--before-close",
        }}
      >
        <StyledNav>
          <StyledTitle>Find Waldo</StyledTitle>
          <StyledNavLink onClick={closeModal} to="/">
            New Game
          </StyledNavLink>
          <StyledNavLink onClick={closeModal} to="/game">
            Game
          </StyledNavLink>
          <StyledNavLink onClick={closeModal} to="/scoreboard">
            Scoreboard
          </StyledNavLink>
        </StyledNav>
        <StyledExtraSpace></StyledExtraSpace>
        <StyledButtonDiv>
          <StyledCloseButton onClick={closeModal}>
            <X />
          </StyledCloseButton>
        </StyledButtonDiv>
      </StyledModal>
    </>
  );
}

const StyledModal = styled(Modal)`
  display: flex;
  position: relative;
  max-width: 25rem;
  width: 100%;
`;

const StyledButton = styled.button`
  display: flex;
  padding: 5px;
  @media only screen and (min-width: ${navDisplayValue}) {
    display: none;
  }
`;

const StyledNav = styled.nav`
  background-color: rgb(255, 255, 255);
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`;

const StyledCloseButton = styled(StyledButtonClose)``;

const StyledExtraSpace = styled.div`
  flex-shrink: 0;
  width: 3.5rem;
`;

const StyledButtonDiv = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
`;

const StyledTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const StyledNavLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  padding: 10px;
  font-size: 1.2rem;
  &.active {
    background-color: rgb(185, 178, 178);
  }
  border-bottom: solid 3px transparent;
  &:hover {
    border-color: black;
  }
`;
