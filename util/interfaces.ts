interface mainInfo {
    left: number,
    top: number,
    adjustedX: number,
    adjustedY: number,
    closeBox: () => void
};

interface Image {
    id: number,
    name: string,
    url: string
};

interface Character {
    id: string,
    name: string,
    imageUrl: string
    found? : boolean
};

export {mainInfo, Image, Character};