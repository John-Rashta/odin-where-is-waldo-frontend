import {
  RouterProvider,
  createMemoryRouter,
  MemoryRouter,
} from "react-router-dom";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./setups/setupRedux";
import routes from "../routes";

vi.mock("react-modal");

describe("Layout", () => {
  it("App matches snapshot", () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    const { container } = renderWithProviders(
      <MemoryRouter>
        <RouterProvider router={router} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
  it("renders basic layout with header and footer", () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    const { container } = renderWithProviders(
      <MemoryRouter>
        <RouterProvider router={router} />
      </MemoryRouter>,
    );

    expect(screen.getByText("2025")).toBeInTheDocument();
    expect(
      screen.getByText("Project for The Odin Project"),
    ).toBeInTheDocument();
    expect(screen.getByText("Find Waldo")).toBeInTheDocument();
    expect(screen.getByText("Scoreboard")).toBeInTheDocument();
    expect(screen.getByText("Game")).toBeInTheDocument();
    expect(screen.getByText("New Game")).toBeInTheDocument();
  });
});
