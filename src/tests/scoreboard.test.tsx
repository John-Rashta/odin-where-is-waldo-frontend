import { describe, it, expect, vi, Mock } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./setupRedux";
import Scoreboard from "../components/Scoreboard";

const scoreStuff = {
    gameid: "333",
    username: "obelix",
    time: "5:00:00",
    map: {
        id: "444",
        name: "test map"
    },
};
const mocks = vi.hoisted(() => {
    return {
        useGetScoreQuery: vi.fn(() => {
            return {
                isLoading: false,
                error: false,
                data: {
                    scores: [scoreStuff],
                }
            }
        }),
        useStartGameMutation: vi.fn(() => {
            return [vi.fn(), {gameInfo: "333"}];
        }),
        useGetScoreOfGameQuery: vi.fn(() => {
            return {
                gameScore: scoreStuff
            }
        }),
    }
});

vi.mock("../components/game-api-slice", () => {
    return {
        useGetScoreQuery: mocks.useGetScoreQuery,
        useStartGameMutation: mocks.useStartGameMutation,
        useGetScoreOfGameQuery: mocks.useGetScoreOfGameQuery,
    }
});

describe("Scoreboard", () => {
  it("scoreboard shows properly", () => {
    renderWithProviders(<Scoreboard />);
    const nameDiv =  screen.getAllByText("obelix");
    const timeDiv = screen.getAllByText("5:00:00");
    const mapDiv = screen.getAllByText("test map");
    expect(
        nameDiv[0]
    ).toBeInTheDocument();
    expect(
        nameDiv[1]
    ).toBeInTheDocument();
    expect(
        timeDiv[0]
    ).toBeInTheDocument();
    expect(
        timeDiv[1]
    ).toBeInTheDocument();
    expect(
        mapDiv[0]
    ).toBeInTheDocument();
    expect(
        mapDiv[1]
    ).toBeInTheDocument();
  });

  it("doesnt show player score if none is given", () => {
    mocks.useGetScoreOfGameQuery.mockImplementation(vi.fn(() => {
                return {
                    gameScore: false
                }
            }) as Mock)
    renderWithProviders(<Scoreboard />);
    expect(
        screen.getByText("obelix")
    ).toBeInTheDocument();
    expect(
        screen.getByText("5:00:00")
    ).toBeInTheDocument();
    expect(
        screen.getByText("test map")
    ).toBeInTheDocument();

    mocks.useGetScoreOfGameQuery.mockRestore();

  });

  it("Shows ?? if players doesnt match anyone from score data", () => {
    mocks.useStartGameMutation.mockImplementation(vi.fn(() => {
        return [vi.fn(), {gameInfo: "888"}];
            }) as Mock);
    mocks.useGetScoreOfGameQuery.mockImplementation(vi.fn(() => {
        return {
            gameScore: {
                gameid: "888",
                username: "asterix",
                time: "2:00:00",
                map: {
                    id: "999",
                    name: "test map 2"
                },
            }
        }
    }))
    renderWithProviders(<Scoreboard />);
    expect(
        screen.getByText("asterix")
    ).toBeInTheDocument();
    expect(
        screen.getByText("??")
    ).toBeInTheDocument();
    expect(
        screen.getByText("2:00:00")
    ).toBeInTheDocument();
    expect(
        screen.getByText("test map 2")
    ).toBeInTheDocument();
  });
});