import { NavLink } from "react-router-dom"
import NavMenu from "./NavMenu";
import styled from "styled-components";

export default function Header() {
    return (
        ///TODO ADD THE ROUTES HERE
        <header>
            <nav>
                <h1>Find Waldo</h1>
                <StyledNavGroup>
                    <NavLink to="/">New Game</NavLink>
                    <NavLink to="/game">Game</NavLink>
                    <NavLink to="/scoreboard">Scoreboard</NavLink>
                </StyledNavGroup>
                <NavMenu />
            </nav>
        </header>
    )
};

const StyledNavGroup = styled.div`
    @media only screen and (max-width: 769px) {
    display: none;
    }
`;