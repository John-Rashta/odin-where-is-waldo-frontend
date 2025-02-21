interface CoordsProp {
  left: number;
  top: number;
  adjustedX: number;
  adjustedY: number;
}

interface Image {
  id: number;
  name: string;
  url: string;
}

interface Character {
  id: string;
  name: string;
  imageUrl: string;
  found?: boolean;
}

export { CoordsProp, Image, Character };
