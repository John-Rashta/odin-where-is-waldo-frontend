import { MemoryRouter } from "react-router-dom";
import Game from "../components/game/Game";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./setups/setupRedux";
import userEvent from "@testing-library/user-event";

vi.mock("../features/game-api/game-api-slice");

describe("Game", () => {
  it("Shows characters and timer on game", () => {
    renderWithProviders(
      <MemoryRouter>
        <Game />
      </MemoryRouter>,
    );
    expect(screen.getByText("garen")).toBeInTheDocument();

    expect(screen.getByText("00:00:000")).toBeInTheDocument();
  });

  it("Shows optionBox on click", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(
      <MemoryRouter>
        <Game />
      </MemoryRouter>,
      {
        preloadedState: {
          image: {
            image: {
              id: 5,
              name: "test image",
              url: "555",
            },
          },
        },
      },
    );

    const imageDiv = screen.getByTestId("main-game-image");

    await user.click(imageDiv);

    const boxOptions = container.getElementsByClassName(
      "charOption",
    )[0] as HTMLElement;
    expect(boxOptions).toBeInTheDocument();
  });
});
