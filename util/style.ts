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
        background-color: yellow;
    }
`

const headerPadding = "10px";
const headerHeight = "3rem";

const imageSize = `width: 90px;
height: 90px;
@media only screen and (max-width: 450px) {
     width: 50px;
     height: 50px;
};`;

const gameTopPadding = `5px`;

const gameTopFont = `1.3rem`;

const gameTopFontMin = `1rem`;

const gameTop = `(100px +  ${gameTopFont})`;

const gameTopMin = `(60px + ${gameTopFontMin})`;

const fullCalcTop = `${headerHeight} + ${headerPadding} + ${gameTop} + ${gameTopPadding}`;

const fullCalcTopMin = `${headerHeight} + ${headerPadding} + ${gameTopMin} + ${gameTopPadding}`;

export { mainStyles, tableInnerPadding, activeNav, headerHeight, headerPadding, imageSize, gameTop, gameTopMin, gameTopPadding, gameTopFont, gameTopFontMin, fullCalcTop, fullCalcTopMin };