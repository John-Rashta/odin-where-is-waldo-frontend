import { useFetchImagesQuery, useLazyStartGameQuery } from "./game-api-slice";
import { setImage } from "./image-slice";
import { ClickType } from "../../util/types";

export default function ImageSelection() {
    const { data, error, isLoading} = useFetchImagesQuery();
    const [trigger] = useLazyStartGameQuery();

    const handleClick =  function handleClickingImage(e: ClickType) {
        const target = e.target as HTMLElement;
        if (target.classList.contains("ImageOption")) {
            if (target.dataset.id && target.dataset.name && target.dataset.url && Number(target.dataset.id) > 0) {
                const selectedImage = Number(target.dataset.id);
                const selectedName = target.dataset.name;
                const selectedUrl = target.dataset.url;
                setImage({id: selectedImage, name: selectedName, url: selectedUrl});
                trigger(selectedImage);
                return;
            }
            return;
        } else {
            return;
        }
    }

    return (
        <>
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
            
        </>
    )
}