import type { WordInput } from "../views/App.tsx";

type BoardAction =
  | { type: "SET_CHAR"; char: string; randomWord: string }
  | { type: "REMOVE_LAST_CHAR" };

function checkWorlds(words: WordInput[], word: string): WordInput[] {
  word = word.toUpperCase();

  //get only last 5 chars
  const filtered = words.filter((item) => item.char !== null);
  const lastSix = filtered.slice(-5);

  for (let i = 0; i < lastSix.length; i++) {
    if (!lastSix[i].char) continue;
    const char = lastSix[i].char;

    if (char === word[i]) lastSix[i].status = "correct";
    else if (char && word.includes(char))
      lastSix[i].status = "incorrect-position";
    else lastSix[i].status = "incorrect";
  }

  //TODO add block user interact after win.
  //const correctChars = lastSix.filter((item) => item.status === "correct");
  // if (correctChars.length === 5)

  return words;
}

export function BoardReducer(
  state: WordInput[],
  action: BoardAction,
): WordInput[] {
  switch (action.type) {
    case "SET_CHAR": {
      const words = [...state];
      const firstEmptyCell = words.find(
        (word) => word.char === null && word.status === null,
      );

      if (!firstEmptyCell) return state;
      firstEmptyCell.char = action.char;

      if (firstEmptyCell.position % 5 === 0)
        return checkWorlds(words, action.randomWord);
      return words;
    }
    case "REMOVE_LAST_CHAR": {
      const words = [...state.reverse()];
      const firstNotEmptyCall = words.find(
        (word) => word.char != null && word.status === null,
      );

      if (!firstNotEmptyCall) return state.reverse();
      firstNotEmptyCall.char = null;
      firstNotEmptyCall.status = null;
      return words.reverse();
    }
  }
}
