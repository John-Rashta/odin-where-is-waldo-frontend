import { NavLink, useLocation } from "react-router-dom";
import NavMenu from "./NavMenu";
import styled from "styled-components";
import {
  activeNav,
  headerHeight,
  headerPadding,
  navDisplayValue,
} from "../../../util/style";

export default function Header() {
  const location = useLocation();

  return (
    ///TODO ADD THE ROUTES HERE
    <StyledHeader $inGame={location.pathname === "/game"}>
      <StyledNav>
        <h1>Find Waldo</h1>
        <StyledNavGroup>
          <StyledNavLink to="/">New Game</StyledNavLink>
          <StyledNavLink to="/game">Game</StyledNavLink>
          <StyledNavLink to="/scoreboard">Scoreboard</StyledNavLink>
        </StyledNavGroup>
        <NavMenu />
      </StyledNav>
    </StyledHeader>
  );
}

const StyledNavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  @media only screen and (max-width: ${navDisplayValue}) {
    display: none;
  }
`;

const StyledHeader = styled.header<{ $inGame?: boolean }>`
  background-color: rgb(253, 255, 255);
  position: ${(props) => (props.$inGame ? "fixed" : "static")};
  padding: ${headerPadding};
  height: ${headerHeight};
  z-index: 5;
  left: 0;
  right: 0;
`;

const StyledNav = styled.nav`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  border: solid transparent 2px;
  border-radius: 5px;
  text-decoration: none;
  &:hover {
    border-color: black;
  }
  padding: 10px;
  ${activeNav};
`;
