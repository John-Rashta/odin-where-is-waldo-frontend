const scoreStuff = {
  gameid: "333",
  username: "obelix",
  time: "5:00:00",
  map: {
    id: "444",
    name: "test map",
  },
};

const useFetchImagesQuery = vi.fn(() => {
  return {
    isLoading: false,
    error: false,
    data: [
      {
        id: "555",
        name: "text image",
        url: "0",
      },
    ],
  };
});

const useStartGameMutation = vi.fn(() => {
  return [vi.fn, { gameInfo: "333" }];
});

const useGetScoreQuery = vi.fn(() => {
  return {
    isLoading: false,
    error: false,
    data: {
      scores: [scoreStuff],
    },
  };
});

const useGetScoreOfGameQuery = vi.fn(() => {
  return {
    gameScore: scoreStuff,
  };
});

const useUpdateGameMutation = vi.fn(() => {
  return [vi.fn];
});

const useGetCharactersQuery = vi.fn(() => {
  return {
    refetch: vi.fn,
    charsInfo: [
      {
        id: "54we",
        name: "garen",
        imageUrl: "sad",
        found: false,
      },
    ],
  };
});

const useAddScoreMutation = vi.fn(() => {
  return [vi.fn];
});

export {
  useFetchImagesQuery,
  useStartGameMutation,
  useGetScoreOfGameQuery,
  useGetScoreQuery,
  useUpdateGameMutation,
  useGetCharactersQuery,
  useAddScoreMutation,
};
