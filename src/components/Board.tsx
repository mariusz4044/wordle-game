import type { WordInput } from "../views/App.tsx";
import Input from "./Input.tsx";

export default function Board({ wordsArray }: { wordsArray: WordInput[] }) {
  const boardItems = wordsArray.map((word, index) => {
    return <Input value={word.char || ""} status={word.status} key={index} />;
  });

  return <div className={"row"}>{boardItems}</div>;
}
