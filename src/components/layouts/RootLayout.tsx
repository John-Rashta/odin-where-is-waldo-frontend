import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Modal from "react-modal";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0px;
    }
    #root {
        height: 100%;
    }

    html {
        height: 100%;
    }

    body {
        height: 100%;
        margin: 0px;
    }

    main,
    .RootLayout,
    body {
        background-color: #82dbf1;
    }

    .NavModal {
        z-index: 6;
        position: fixed;
        inset: 0px;
        transform: translate(-100%);
        transition: transform 500ms ease-in-out;
        background-color: rgba(255, 255, 255, 0.75);
    }

    .NavModal--after-open{
        transform: translate(0%);
    }

    .NavModal--before-close{
        transform: translate(-100%);
    }

    .scoreModal {
        z-index: 6;
        position: fixed;
        inset: 0px;
        transform: translateY(-100%);
        transition: transform 500ms ease-in-out;
        background-color: rgba(255, 255, 255, 0.75);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .scoreModal--after-open{
        transform: translateY(0%);
    }

    .scoreModal--before-close{
        transform: translateY(-100%);
    }
`;

Modal.setAppElement("#root");

export default function RootLayout() {

    return (
        <StyledDiv className="RootLayout">
            <GlobalStyle />
            <Header />
            <Outlet />
            <Footer />
        </StyledDiv>
    )
};

const StyledDiv = styled.div`
    min-height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
`;
