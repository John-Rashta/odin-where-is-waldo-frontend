import { screen } from "@testing-library/react";
import ImageSelection from "../components/imageSelection/ImageSelection";
import { renderWithProviders } from "./setups/setupRedux";
import { useFetchImagesQuery } from "../features/game-api/game-api-slice";
import { Mock } from "vitest";

vi.mock("../features/game-api/game-api-slice");

vi.mock("react-router-dom", () => {
  return {
    useNavigate: vi.fn(),
  };
});

describe("Image Selection", () => {
  it("image shows in selection", () => {
    renderWithProviders(<ImageSelection />);
    expect(screen.getByText("text image")).toBeInTheDocument();
  });

  it("image has the data attributes", () => {
    const { container } = renderWithProviders(<ImageSelection />);
    const imageDiv = container.getElementsByClassName(
      "ImageOption",
    )[0] as HTMLElement;

    expect(imageDiv.dataset.id).toMatch("555");

    expect(imageDiv.dataset.name).toMatch("text image");

    expect(imageDiv.dataset.url).toMatch("0");
  });
});

///loading error checking only here since its similar in the rest
describe("Loading Error", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it("shows loading", () => {
    vi.mocked(useFetchImagesQuery).mockImplementation(
      vi.fn(() => {
        return {
          isLoading: true,
          error: false,
          data: [
            {
              id: "555",
              name: "text image",
              url: "0",
            },
          ],
        };
      }) as Mock,
    );
    renderWithProviders(<ImageSelection />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error loading", () => {
    vi.mocked(useFetchImagesQuery).mockImplementation(
      vi.fn(() => {
        return {
          isLoading: false,
          error: true,
          data: [
            {
              id: "555",
              name: "text image",
              url: "0",
            },
          ],
        };
      }) as Mock,
    );
    renderWithProviders(<ImageSelection />);
    expect(screen.getByText("Error Loading!")).toBeInTheDocument();
  });
});
