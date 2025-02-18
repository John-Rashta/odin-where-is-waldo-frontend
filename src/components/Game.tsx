import { useState, useCallback, useEffect } from "react";
import { ClickType } from '../../util/types';
import { selectUrl, selectName } from "./image-slice";
import OptionBox from "./OptionBox";
import { useSelector, useDispatch } from "react-redux";
import AddScore from "./AddScore";
import CharTracker from "./CharTracker";
import { useStartGameMutation } from "./game-api-slice";
import { useNavigate, Link } from "react-router-dom";
import { selectGameState, setAddScore } from "./manager-slice";
import Timer from "./Timer";
import styled, { createGlobalStyle } from "styled-components";
import { gameTop, gameTopMin, headerHeight, headerPadding, gameTopPadding, fullCalcTop, fullCalcTopMin, mediaGameValue, LoadingDivStyle, StyledButton } from "../../util/style";

const GlobalStyle = createGlobalStyle`
    .RootLayout {
        min-height: auto;
    }
`;
export default function Game() {
    const [showBox, setShowBox] = useState(false);
    const [coords, setCoords] = useState({coordX: 0, coordY: 0, adjustedX: 0, adjustedY:0});
    const [wrongAnswer, setWrongAnswer] = useState(false);
    const isGameOver = useSelector(selectGameState);
    const imageURL = useSelector(selectUrl);
    const imageName = useSelector(selectName);
    const navigate = useNavigate();
    const dispatch = useDispatch();
     // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
     const [trigger, {gameInfo}] = useStartGameMutation({
        fixedCacheKey: "game-id-mutation",
        selectFromResult: ({data}) => ({
            gameInfo: data?.game,
        })
    });
    const closeShowBox = useCallback(() => setShowBox(false), []);

    const showWrongAnswer = useCallback(() => {
        setWrongAnswer(true);
        setTimeout(() => setWrongAnswer(false), 15000);
    },[]);

    function handleOnClick(event: ClickType) {
        /// MIGHT CHANGE IT SO THAT IT CLOSES WHEN IT GETS CLICKED AND SHOWBOX IS TRUE INSTEAD OF HAVING THE WHOLE CODE IN THE OTHER ONE
        const currentTarget = event.target as HTMLImageElement;
        if (!currentTarget.classList.contains("mainImage")) {
            return;
        }
        if (showBox) {
            setShowBox(false);
        } else {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const rect = currentTarget.getBoundingClientRect();
        const scaleX = currentTarget.naturalWidth / rect.width;
        const scaleY = currentTarget.naturalHeight / rect.height;
        const absoluteX = mouseX - rect.left;
        const absoluteY = mouseY - rect.top;
        const finalX = Math.floor(scaleX * absoluteX);
        const finalY = Math.floor(scaleY * absoluteY);
        setCoords({coordX: absoluteX, coordY: absoluteY, adjustedX: finalX, adjustedY: finalY});
        setShowBox(true);
        }
    }
    
    useEffect(() => {
        if (!gameInfo) {
            navigate("/");
        };
    }, [gameInfo, navigate]);
    
    if (gameInfo) {
        return (
            <StyledMain>
                <GlobalStyle/>
                <StyledTop>
                    <CharTracker />
                    <StyledTimeScore>
                        <Timer />
                        {isGameOver && <StyledScoreButton onClick={() => {
                                dispatch(setAddScore(true));
                            }
                        }>Add Score</StyledScoreButton>}
                    </StyledTimeScore>
                    {wrongAnswer && <StyledWrongAnswer>Incorrect Coordinates!</StyledWrongAnswer>}
                </StyledTop>
                <div>
                    {(imageURL !== "0" && imageName !=="0") && <StyledImage src={imageURL} alt={imageName}
                    onClick={(e: ClickType) => {
                        handleOnClick(e);
                    }}
                    className="mainImage"
                    />}
                    <AddScore/>
                    {showBox ? <OptionBox showWrong={showWrongAnswer} closeBox={closeShowBox} coordsProp={{top: coords.coordY, left: coords.coordX, adjustedX: coords.adjustedX, adjustedY: coords.adjustedY}}  > </OptionBox> : null}
                </div>
            </StyledMain>
        )
    } else {
        return (
            <StyledFullErrorPage>Please start a game <Link to="/">Here</Link> </StyledFullErrorPage>
        )
    }
}

const StyledMain = styled.main`
    overflow: auto;
    grid-row: 1/3;
    position: relative;
    top: calc(${fullCalcTop});
    @media only screen and (max-width: ${mediaGameValue}) {
        top: calc(${fullCalcTopMin});
    };
`;

const StyledFullErrorPage = styled(LoadingDivStyle)`
    grid-row: 1/3;
    align-self: center;
    justify-self: center;
`;

const StyledTop = styled.div`
    background-color: rgb(88, 202, 236);
    position: fixed;
    display: flex;
    justify-content: space-between;
    z-index: 5;
    left: 0;
    right: 0;
    padding: ${gameTopPadding};
    height: calc(${gameTop});
    top: calc(${headerHeight} + ${headerPadding});
    @media only screen and (max-width: ${mediaGameValue}) {
        height: calc(${gameTopMin});
    };
`;

const StyledTimeScore = styled.div`
    align-items: center;
    display: flex;
    gap: 5px;
    padding: 5px;
`;

const StyledWrongAnswer = styled.div`
    position: absolute;
    bottom: -2.5rem;
    z-index: 5;
`;

const  StyledImage = styled.img`
    max-width: 150vw;
    display: block;
    @media only screen and (max-width: 750px) {
        max-width: 250vw;
    };
`;

const StyledScoreButton = styled(StyledButton)`
`;