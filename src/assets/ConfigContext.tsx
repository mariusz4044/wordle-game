// ConfigContext.tsx
import { createContext } from "react";

export type Config = {
  wordsApi: string;
  wordLength: number;
  getRandomWorld: () => Promise<string>;
};

export const defaultConfig: Config = {
  wordsApi: "https://random-word-api.vercel.app/api?words=1&length=5",
  wordLength: 5,
  getRandomWorld: async function () {
    const res = await fetch(this.wordsApi, {
      method: "GET",
    });

    const jsonResponse = (await res.json()) as string[];
    return jsonResponse[0] as string;
  },
};

export const ConfigContext = createContext<Config>(defaultConfig);
