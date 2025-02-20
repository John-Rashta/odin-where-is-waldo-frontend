import type { AppStore } from "../store/store"
import { makeStore } from "../store/store"
import type { TimeState } from "../components/timer-slice";
import { timerSlice, setEnd, setStart, selectEndTime,selectStartTime } from "../components/timer-slice";

interface LocalTestContext {
  store: AppStore
}

describe<LocalTestContext>("timer reducer", it => {
  beforeEach<LocalTestContext>(context => {
    const initialState: TimeState = {
      startTime: 2,
      endTime: 0,
    }

    const store = makeStore({ timer: initialState })

    context.store = store
  })

  it("should handle initial state", () => {
    expect(timerSlice.reducer(undefined, { type: "unknown" })).toStrictEqual({
        startTime: 0,
        endTime: 0,
    })
  })

  it("should handle setting start time", ({ store }) => {
    expect(selectStartTime(store.getState())).toBe(2)

    store.dispatch(setStart(543))

    expect(selectStartTime(store.getState())).toBe(543)
  })

  it("should handle setting end time", ({ store }) => {
    expect(selectEndTime(store.getState())).toBe(0)

    store.dispatch(setEnd(908))

    expect(selectEndTime(store.getState())).toBe(908)
  })
})