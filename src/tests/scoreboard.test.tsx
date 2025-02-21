import { screen } from "@testing-library/react";
import { renderWithProviders } from "./setups/setupRedux";
import Scoreboard from "../components/scoreboard/Scoreboard";
import { Mock } from "vitest";
import {
  useGetScoreOfGameQuery,
  useStartGameMutation,
} from "../features/game-api/game-api-slice";

vi.mock("../features/game-api/game-api-slice");

describe("Scoreboard", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it("scoreboard shows properly", () => {
    renderWithProviders(<Scoreboard />);
    const nameDiv = screen.getAllByText("obelix");
    const timeDiv = screen.getAllByText("5:00:00");
    const mapDiv = screen.getAllByText("test map");
    expect(nameDiv[0]).toBeInTheDocument();
    expect(nameDiv[1]).toBeInTheDocument();
    expect(timeDiv[0]).toBeInTheDocument();
    expect(timeDiv[1]).toBeInTheDocument();
    expect(mapDiv[0]).toBeInTheDocument();
    expect(mapDiv[1]).toBeInTheDocument();
  });

  it("doesnt show player score if none is given", () => {
    vi.mocked(useGetScoreOfGameQuery).mockImplementation(
      vi.fn(() => {
        return {
          gameScore: false,
        };
      }) as Mock,
    );
    renderWithProviders(<Scoreboard />);
    expect(screen.getByText("obelix")).toBeInTheDocument();
    expect(screen.getByText("5:00:00")).toBeInTheDocument();
    expect(screen.getByText("test map")).toBeInTheDocument();
  });

  it("Shows ?? if players doesnt match anyone from score data", () => {
    vi.mocked(useStartGameMutation).mockImplementation(
      vi.fn(() => {
        return [vi.fn(), { gameInfo: "888" }];
      }) as Mock,
    );
    vi.mocked(useGetScoreOfGameQuery).mockImplementation(
      vi.fn(() => {
        return {
          gameScore: {
            gameid: "888",
            username: "asterix",
            time: "2:00:00",
            map: {
              id: "999",
              name: "test map 2",
            },
          },
        };
      }) as Mock,
    );
    renderWithProviders(<Scoreboard />);
    expect(screen.getByText("asterix")).toBeInTheDocument();
    expect(screen.getByText("??")).toBeInTheDocument();
    expect(screen.getByText("2:00:00")).toBeInTheDocument();
    expect(screen.getByText("test map 2")).toBeInTheDocument();
  });
});
