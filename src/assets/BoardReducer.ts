import type { WordInput } from "../views/App.tsx";

type BoardAction =
  | { type: "SET_CHAR"; char: string }
  | { type: "REMOVE_LAST_CHAR" };

export function BoardReducer(
  state: WordInput[],
  action: BoardAction,
): WordInput[] {
  switch (action.type) {
    case "SET_CHAR": {
      const words = [...state];
      const firstEmptyCell = words.find((word) => word.char === null);
      if (!firstEmptyCell) return state;
      firstEmptyCell.char = action.char;
      return words;
    }
    case "REMOVE_LAST_CHAR": {
      const words = [...state.reverse()];
      const firstNotEmptyCall = words.find((word) => word.char != null);
      if (!firstNotEmptyCall) return state;
      firstNotEmptyCall.char = null;
      return words.reverse();
    }
  }
}
