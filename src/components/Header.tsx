import { NavLink, useLocation } from "react-router-dom"
import NavMenu from "./NavMenu";
import styled from "styled-components";
import { activeNav, headerHeight, headerPadding } from "../../util/style";

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

const  StyledNavLink = styled(NavLink)`
    ${activeNav}
`;