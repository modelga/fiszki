import ReactDOM from "react-dom";
import React, { useState } from "react";
import Numbers from "../data/numbers";
import { CardDefinition } from "../card";
import "./app.css";

const BoldareSentence = ({ sentence }: { sentence: string }): JSX.Element => {
  if (sentence.indexOf("*") === -1) {
    return <>{sentence}</>;
  }
  const firstIndex = sentence.indexOf("*");
  const secondIndex = sentence.indexOf("*", firstIndex + 1);
  if (secondIndex === -1) {
    return <>{sentence}</>;
  }
  const [pre, toBold, post] = [
    sentence.substring(0, firstIndex),
    sentence.substring(firstIndex + 1, secondIndex),
    sentence.substring(secondIndex + 1),
  ];
  return (
    <>
      {pre}
      <strong>{toBold}</strong>
      <BoldareSentence sentence={post} />
    </>
  );
};

const Card = ({ card, lang = "pl" }: { card: CardDefinition; lang: string }) => {
  return (
    <div className="card">
      <span className="category" />
      <span className="title">{card.word[lang]}</span>
      <span className="sentence">
        <BoldareSentence sentence={card.sentence[lang]} />
      </span>
      <span className="number">
        {card.id.set} / {card.id.number}
      </span>
    </div>
  );
  // - <a href={`https://www.dictionary.com/browse/${card.word.en}`}>{card.word.en}</a>
};

const Button = ({ action: roll, text }: { text: string; action: () => void }) => {
  return <span onClick={roll}>{text}</span>;
};

const App = () => {
  const [shuffled, setShuffle] = useState<number>(0);
  const [lang, setLang] = useState<string>("pl");
  const [phrase, setPhrase] = useState<string>("");
  // const [points, setShuffle] = useState<number>(0);

  const roll = () => {
    const rolled = Math.round(Math.random() * (Numbers.length - 1));
    setShuffle(rolled);
  };

  const toggleLang = () => {
    if (lang == "pl") {
      setLang("en");
    } else {
      setLang("pl");
    }
  };

  return (
    <div className="App">
      <p>
        <Button action={roll} text="losuj" />
      </p>
      <p>
        <Button action={toggleLang} text="zmień język" />{" "}
      </p>
      <Card card={Numbers[shuffled]} lang={lang}></Card>
      {/* <input type="text" value={phrase} onChange={(e) => setPhrase(e.target.value)} /> */}
      <div className="copyright">
        <p>Made by Franek &copy; 2020</p>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
