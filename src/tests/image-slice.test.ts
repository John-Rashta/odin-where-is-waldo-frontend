import type { AppStore } from "../store/store"
import { makeStore } from "../store/store"
import type { nestState } from "../components/image-slice";
import { imageSlice, selectImage, selectId, selectName, selectUrl, setImage } from "../components/image-slice";

interface LocalTestContext {
  store: AppStore
}

describe<LocalTestContext>("image reducer", it => {
  beforeEach<LocalTestContext>(context => {
    const initialState: nestState = {
        image: {
            id: 3,
            name: "hol",
            url: "exampleurl"
        }
    };

    const store = makeStore({ image: initialState });

    context.store = store;
  })

  it("should handle initial state", () => {
    expect(imageSlice.reducer(undefined, { type: "unknown" })).toStrictEqual({
        image: {
            id: 0,
            name: "0",
            url: "0"
        }
    })
  });

  it("should select everything and set image", ({ store }) => {
    expect(selectImage(store.getState())).toStrictEqual(
        {
            id: 3,
            name: "hol",
            url: "exampleurl"
        }
    );
    expect(selectId(store.getState())).toBe(3);
    expect(selectName(store.getState())).toBe("hol");
    expect(selectUrl(store.getState())).toBe("exampleurl");

    store.dispatch(setImage({
        id: 10,
        name: "new",
        url: "anotherurl"
    }));

    expect(selectImage(store.getState())).toStrictEqual(
        {
            id: 10,
            name: "new",
            url: "anotherurl"
        }
    );
    expect(selectId(store.getState())).toBe(10);
    expect(selectName(store.getState())).toBe("new");
    expect(selectUrl(store.getState())).toBe("anotherurl");
  });
});