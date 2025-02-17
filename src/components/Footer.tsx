import styled from "styled-components"
import { useLocation } from "react-router-dom";
import  { fullCalcTop, fullCalcTopMin } from "../../util/style";

export default function Footer() {
    const location = useLocation();
    return (
        <StyledFooter $inGame={location.pathname === "/game"}>
            <div>Project for The Odin Project</div>
            <div>2025</div>
        </StyledFooter>
    )
};

const StyledFooter = styled.footer<{$inGame?: boolean;}>`
    display:flex;
    justify-content: space-between;
    padding: 10px;
    position: ${props => props.$inGame ? "relative" : "static"};
    top: calc(${fullCalcTop});
    @media only screen and (max-width: 450px) {
        top: calc(${fullCalcTopMin});
    }; 
`;