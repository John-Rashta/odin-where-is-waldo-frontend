import type { AppStore } from "../store/store";
import { makeStore } from "../store/store";
import type { managerState } from "../features/manager/manager-slice";
import {
  managerSlice,
  selectGameState,
  selectOpenScoreState,
  setAddScore,
  setGameState,
} from "../features/manager/manager-slice";

interface LocalTestContext {
  store: AppStore;
}

describe<LocalTestContext>("image reducer", (it) => {
  beforeEach<LocalTestContext>((context) => {
    const initialState: managerState = {
      gameOver: false,
      openAddScore: true,
    };

    const store = makeStore({ manager: initialState });

    context.store = store;
  });

  it("should handle initial state", () => {
    expect(managerSlice.reducer(undefined, { type: "unknown" })).toStrictEqual({
      gameOver: true,
      openAddScore: false,
    });
  });

  it("should set Game State", ({ store }) => {
    expect(selectGameState(store.getState())).toBe(false);

    store.dispatch(setGameState(true));

    expect(selectGameState(store.getState())).toBe(true);
  });

  it("should set Add Score", ({ store }) => {
    expect(selectOpenScoreState(store.getState())).toBe(true);

    store.dispatch(setAddScore(false));

    expect(selectOpenScoreState(store.getState())).toBe(false);
  });
});
