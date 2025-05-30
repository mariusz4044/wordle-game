// ConfigContext.tsx
import { createContext } from "react";

export type Config = {
  words: string[];
  wordLength: number;
  getRandomWorld: () => string;
};

export const defaultConfig: Config = {
  words: [
    "jablo",
    "piase",
    "lampa",
    "mosty",
    "brzoz",
    "karty",
    "domki",
    "rzeka",
    "tynki",
    "wazon",
  ],
  wordLength: 5,
  getRandomWorld: function () {
    return this.words[Math.floor(Math.random() * this.words.length)];
  },
};

export const ConfigContext = createContext<Config>(defaultConfig);
