import styled from "styled-components";

const mainStyles = `
    display: flex;
    align-items: center;
    justify-content: center;
`;

const tableInnerPadding = `
    padding: 8px;
`;

const activeNav = `
    &.active {
        background-color: #c7e3f0;
    };
`

const headerPadding = "10px";
const headerHeight = "3rem";

const gameTopPadding = `5px`;

const gameTopFont = `1.3rem`;

const gameTopFontMin = `1rem`;

const gameTop = `(100px +  ${gameTopFont})`;

const gameTopMin = `(60px + ${gameTopFontMin})`;

const fullCalcTop = `${headerHeight} + ${headerPadding} + ${gameTop} + ${gameTopPadding}`;

const fullCalcTopMin = `${headerHeight} + ${headerPadding} + ${gameTopMin} + ${gameTopPadding}`;

const mediaGameValue = `490px`;

const navDisplayValue = `769px`;

const mediaForScoreTime = `400px`;

const LoadingDivStyle = styled.div`
    border-radius: 5px;
    padding: 20px;
    background-color: white;
    font-size: 2rem;
`;

const StyledButton = styled.button`
    padding: 10px;
    border: solid rgb(126, 153, 161) 2px;
    border-radius: 10px;
    background-color: rgb(252, 251, 200);
    font-weight: bold;
    font-size: 0.9rem;
    @media only screen and (max-width: ${mediaForScoreTime}) {
        padding: 5px;
    }; 
`;

const imageSize = `width: 90px;
height: 90px;
@media only screen and (max-width: ${mediaGameValue}) {
     width: 50px;
     height: 50px;
};`;

const StyledButtonClose = styled.button`
    display:flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 20px;
    border: solid black 1px;
    &:hover {
        background-color: rgb(172, 172, 172);
    };
`;
export { mainStyles, tableInnerPadding, activeNav, headerHeight, headerPadding, imageSize, gameTop, gameTopMin, gameTopPadding, gameTopFont, gameTopFontMin, fullCalcTop, fullCalcTopMin, mediaGameValue, navDisplayValue, LoadingDivStyle, StyledButton, mediaForScoreTime, StyledButtonClose };