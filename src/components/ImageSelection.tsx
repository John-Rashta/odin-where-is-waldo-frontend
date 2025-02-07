import { useFetchImagesQuery, useStartGameMutation } from "./game-api-slice";
import { setImage } from "./image-slice";
import { setGameState } from "./manager-slice";
import { ClickType } from "../../util/types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function ImageSelection() {
    const { data, error, isLoading} = useFetchImagesQuery();
    const [trigger] = useStartGameMutation({
        fixedCacheKey: "game-id-mutation"
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick =  function handleClickingImage(e: ClickType) {
        const target = e.target as HTMLElement;
        if (target.classList.contains("ImageOption")) {
            if (target.dataset.id && target.dataset.name && target.dataset.url && Number(target.dataset.id) > 0) {
                const selectedImage = Number(target.dataset.id);
                const selectedName = target.dataset.name;
                const selectedUrl = target.dataset.url;
                dispatch(setImage({id: selectedImage, name: selectedName, url: selectedUrl}));
                dispatch(setGameState(false));
                trigger(selectedImage).unwrap().then((result) => {
                    if (!result.game) {
                        return;
                    } else {
                        navigate("/game");
                    }
                });
                return;
            };
            return;
        } else {
            return;
        };
    };

    return (
        <main>
            { isLoading ? <div>Loading...</div> : error ? <div>Error Loading</div> : data && data.map((image) => {
                return (
                    <div
                    className="ImageOption"
                    data-id={image.id}
                    data-name={image.name}
                    data-url={image.url}
                    onClick={
                        (e) => {
                            handleClick(e);
                        }
                    }
                    key={image.id}>
                        {image.name}
                    </div>
                )
            })}
            
        </main>
    )
}