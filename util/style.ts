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

export { mainStyles, tableInnerPadding, activeNav, headerHeight, headerPadding, imageSize };