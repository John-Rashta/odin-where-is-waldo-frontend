import {
  useFetchImagesQuery,
  useStartGameMutation,
} from "../../features/game-api/game-api-slice";
import { setImage } from "../../features/image/image-slice";
import { setGameState } from "../../features/manager/manager-slice";
import { ClickType } from "../../../util/types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStart, setEnd } from "../../features/timer/timer-slice";
import styled from "styled-components";
import { mainStyles, LoadingDivStyle } from "../../../util/style";

export default function ImageSelection() {
  const { data, error, isLoading } = useFetchImagesQuery();
  const [trigger] = useStartGameMutation({
    fixedCacheKey: "game-id-mutation",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = function handleClickingImage(e: ClickType) {
    const target = e.target as HTMLElement;
    if (target.classList.contains("ImageOption")) {
      if (
        target.dataset.id &&
        target.dataset.name &&
        target.dataset.url &&
        Number(target.dataset.id) > 0
      ) {
        const selectedImage = Number(target.dataset.id);
        const selectedName = target.dataset.name;
        const selectedUrl = target.dataset.url;
        dispatch(
          setImage({ id: selectedImage, name: selectedName, url: selectedUrl }),
        );
        dispatch(setGameState(false));
        trigger(selectedImage)
          .unwrap()
          .then((result) => {
            if (!result.game) {
              return;
            } else {
              dispatch(setStart(Date.now()));
              dispatch(setEnd(0));
              navigate("/game");
            }
          })
          .catch(() => {
            console.log("Game Start Failed");
          });
        return;
      }
      return;
    } else {
      return;
    }
  };

  return (
    <StyledMain>
      <StyledDivContainer $dataPresent={!!data}>
        {isLoading ? (
          <ImageLoadingDiv>Loading...</ImageLoadingDiv>
        ) : error ? (
          <ImageLoadingDiv>Error Loading!</ImageLoadingDiv>
        ) : (
          data &&
          data.map((image) => {
            return (
              <StyledOptions
                className="ImageOption"
                data-id={image.id}
                data-name={image.name}
                data-url={image.url}
                onClick={(e) => {
                  handleClick(e);
                }}
                key={image.id}
              >
                {image.name}
              </StyledOptions>
            );
          })
        )}
      </StyledDivContainer>
    </StyledMain>
  );
}

const StyledDivContainer = styled.div<{ $dataPresent?: boolean }>`
  width: min(500px, 80vw);
  gap: 10px;
  display: grid;
  grid-template-columns: ${(props) =>
    props.$dataPresent ? "repeat(auto-fill, 200px)" : "auto"};
  justify-content: center;
`;

const StyledMain = styled.main`
  ${mainStyles}
`;

const StyledOptions = styled.div`
  padding: 13px;
  text-align: center;
  user-select: none;
  background-color: white;
  border: solid 1px rgb(82, 74, 74);
  &:hover {
    background-color: rgb(108, 233, 216);
  }
`;

const ImageLoadingDiv = styled(LoadingDivStyle)``;
