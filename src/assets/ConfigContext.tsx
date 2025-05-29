// ConfigContext.tsx
import { createContext } from "react";

export type Config = {
  words: string[];
  maxGuesses: number;
  wordLength: number;
  getRandomWorld: () => string;
};

export const defaultConfig: Config = {
  words: ["test1", "test3", "test4"],
  maxGuesses: 5,
  wordLength: 5,
  getRandomWorld: function () {
    return this.words[Math.floor(Math.random() * this.words.length)];
  },
};

export const ConfigContext = createContext<Config>(defaultConfig);
