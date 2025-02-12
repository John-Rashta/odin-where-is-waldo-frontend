import { NavLink, useLocation } from "react-router-dom"
import NavMenu from "./NavMenu";
import styled from "styled-components";

export default function Header() {
    const location = useLocation();

    return (
        ///TODO ADD THE ROUTES HERE
        <StyledHeader $inGame={location.pathname === "/game"}>
            <StyledNav>
                <h1>Find Waldo</h1>
                <StyledNavGroup>
                    <NavLink to="/">New Game</NavLink>
                    <NavLink to="/game">Game</NavLink>
                    <NavLink to="/scoreboard">Scoreboard</NavLink>
                </StyledNavGroup>
                <NavMenu />
            </StyledNav>
        </StyledHeader>
    )
};

const StyledNavGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    @media only screen and (max-width: 769px) {
    display: none;
    }
`;

const StyledHeader = styled.header<{$inGame?: boolean;}>`
    position: ${props => props.$inGame ? "fixed" : "static"};
    padding: 10px;
`;

const StyledNav = styled.nav`
    display: flex;
    justify-content: space-between;
`;