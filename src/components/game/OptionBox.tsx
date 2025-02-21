import { ReactNode } from "react";
import { ClickType, SimpleFunctionType } from "../../../util/types";
import { CoordsProp } from "../../../util/interfaces";
import {
  useStartGameMutation,
  useUpdateGameMutation,
  useGetCharactersQuery,
} from "../../features/game-api/game-api-slice";
import {
  selectGameState,
  setGameState,
  setAddScore,
} from "../../features/manager/manager-slice";
import { useDispatch, useSelector } from "react-redux";
import CharCustom from "../util/CharCustom";
import { skipToken } from "@reduxjs/toolkit/query";
import { setEnd } from "../../features/timer/timer-slice";
import styled from "styled-components";

export default function OptionBox({
  coordsProp,
  closeBox,
  showWrong,
}: {
  coordsProp: CoordsProp;
  closeBox: SimpleFunctionType;
  showWrong: SimpleFunctionType;
  children?: ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [trigger, { gameInfo }] = useStartGameMutation({
    fixedCacheKey: "game-id-mutation",
    selectFromResult: ({ data }) => ({
      gameInfo: data?.game,
    }),
  });
  const { charsInfo } = useGetCharactersQuery(gameInfo || skipToken, {
    selectFromResult: ({ data }) => ({
      charsInfo: data?.chars,
    }),
  });

  const [updateGame] = useUpdateGameMutation();
  const isGameOver = useSelector(selectGameState);
  const dispatch = useDispatch();

  const handleSelection = function handleSelectionOfOption(e: ClickType) {
    const target = e.target as HTMLElement;
    if (isGameOver) {
      closeBox();
      return;
    }
    if (
      target.classList.contains("charOption") ||
      (target.parentElement &&
        target.parentElement.classList.contains("charOption"))
    ) {
      const charid =
        target.dataset.id ||
        (target.parentElement && target.parentElement.dataset.id);
      if (gameInfo && charid) {
        updateGame({
          gameid: gameInfo,
          body: {
            coordX: coordsProp.adjustedX,
            coordY: coordsProp.adjustedY,
            char: charid,
          },
        })
          .unwrap()
          .then((result) => {
            if (result.message === "Incorrect Coordinates") {
              showWrong();
            }
            if (result.message === "Game Finished") {
              dispatch(setEnd(Date.now()));
              dispatch(setGameState(true));
              dispatch(setAddScore(true));
            }
          })
          .catch((result) => {
            console.log(result.data.message);
          })
          .finally(() => {
            closeBox();
          });
      }
    }
  };

  return (
    <StyledOptionBox
      className="optionBox"
      onClick={(e: ClickType) => {
        handleSelection(e);
      }}
      style={{ position: "absolute", ...coordsProp }}
    >
      {charsInfo ? (
        charsInfo.map((char) => {
          return (
            <CharCustom key={char.id} extraClass="charOption" char={char} />
          );
        })
      ) : (
        <StyledErrorMessage>No Characters Found.</StyledErrorMessage>
      )}
    </StyledOptionBox>
  );
}

const StyledOptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: rgb(52, 177, 182);
  border: solid rgb(0, 66, 57) 3px;
`;

const StyledErrorMessage = styled.div`
  font-size: 1rem;
  padding: 10px;
`;
