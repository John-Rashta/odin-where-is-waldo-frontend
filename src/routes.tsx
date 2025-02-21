import RootLayout from "./components/layouts/RootLayout";
import { IndexRouteObject, NonIndexRouteObject } from "react-router-dom";
import ImageSelection from "./components/imageSelection/ImageSelection";
import Scoreboard from "./components/scoreboard/Scoreboard";
import Game from "./components/game/Game";

const routes: (IndexRouteObject | NonIndexRouteObject)[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ImageSelection />,
      },
      {
        path: "game",
        element: <Game />,
      },
      {
        path: "scoreboard",
        element: <Scoreboard />,
      },
    ],
  },
];

export default routes;
