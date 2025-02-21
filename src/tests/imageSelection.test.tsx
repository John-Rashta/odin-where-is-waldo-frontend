import { screen } from "@testing-library/react";
import ImageSelection from "../components/ImageSelection";
import { renderWithProviders } from "./setupRedux";

const mocks = vi.hoisted(() => {
    return {
        useFetchImagesQuery: vi.fn(() => {
            return {
                isLoading: false,
                error: false,
                data: [{
                    id: "555",
                    name: "text image",
                    url: "0"
                }],
            }
        }),
        useStartGameMutation: vi.fn(() => {
            return [vi.fn()];
        }),
    }
});

vi.mock("../components/game-api-slice", () => {
    return {
        useFetchImagesQuery: mocks.useFetchImagesQuery,
        useStartGameMutation: mocks.useStartGameMutation
    }
});

vi.mock("react-router-dom", () => {
    return {
        useNavigate: vi.fn()
    }
})

describe("Image Selection", () => {
  it("image shows in selection", () => {
    renderWithProviders(<ImageSelection />);
    expect(
        screen.getByText("text image")
    ).toBeInTheDocument()
  });

  it("image has the data attributes", () => {
    const { container } =  renderWithProviders(<ImageSelection />);
    const imageDiv = container.getElementsByClassName("ImageOption")[0] as HTMLElement;

    expect(
        imageDiv.dataset.id
    ).toMatch("555");

    expect(
        imageDiv.dataset.name
    ).toMatch("text image");

    expect(
        imageDiv.dataset.url
    ).toMatch("0");

  });
});

///loading error checking only here since its similar in the rest
describe("Loading Error", () => {
    it("shows loading", () => {
        mocks.useFetchImagesQuery.mockImplementation(vi.fn(() => {
            return {
                isLoading: true,
                error: false,
                data: [{
                    id: "555",
                    name: "text image",
                    url: "0"
                }],
            }
        }))
        renderWithProviders(<ImageSelection />);
        expect(
            screen.getByText("Loading...")
        ).toBeInTheDocument();

        mocks.useFetchImagesQuery.mockRestore();
    });

    it("shows error loading", () => {
        mocks.useFetchImagesQuery.mockImplementation(vi.fn(() => {
            return {
                isLoading: false,
                error: true,
                data: [{
                    id: "555",
                    name: "text image",
                    url: "0"
                }],
            }
        }))
        renderWithProviders(<ImageSelection />);
        expect(
            screen.getByText("Error Loading!")
        ).toBeInTheDocument();
        mocks.useFetchImagesQuery.mockRestore();
    });
  });