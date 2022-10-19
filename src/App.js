import "./App.css";
import { useState } from "react";
import { Popover } from "antd";
import Congats from "./components/congats";
import GuessComponent from "./components/guess";
import InputComponent from "./components/input";
import { getLetterMatchCount } from "./helpers";
export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
}
const content = (
  <div>
    <div>no ice cream will actually be delivered</div>
  </div>
);
export const TempComponent = () => {
  return <div className="componentChild"></div>;
};
function App() {
  const success = false;
  const secretWord = "party";
  const guessedWords = [];
  const [object, setObject] = useState({
    name: "ty",
    id: 1,
  });
  const [count, setCount] = useState(0);
  const [backgroundBtn, setBackgroundBtn] = useState("red");
  const [disableBtn, setDisableBtn] = useState(false);
  const [gender, setGender] = useState("male");
  const handleChangeColor = () => {
    if (backgroundBtn === "red") {
      setBackgroundBtn("blue");
    } else {
      setBackgroundBtn("red");
    }
  };
  const checkboxChecked = () => {
    return {
      id: 3,
    };
  };
  const handleCheckbox = (e) => {
    const { checked } = e.target;
    if (checked) {
      setDisableBtn(true);
      setBackgroundBtn("gray");
    } else {
      setDisableBtn(false);
      setBackgroundBtn("blue");
    }
  };
  const handleClick = (e) => {
    // không có promise
    // setGender(e.target.getAttribute("data-gender"));
    // có promise
    return new Promise((resolve) => {
      setTimeout(() => {
        setGender(e.target.getAttribute("data-gender"));
        resolve();
      }, 1000);
    });
  };
  return (
    <div className="App">
      {getLetterMatchCount("bones", "party")}
      <div className="click-1"></div>
      <div className={`click-${count}`}></div>
      <button className="buttonClick" onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <p className="pCount">{count}</p>
      <TempComponent />
      <div className="homecls">Welcome to home page</div>
      <div className="homecls2">Welcome to home page2</div>
      <div key="react" className="liCls"></div>
      <div key="angular" className="liCls"></div>
      <div key="vuejs" className="liCls"></div>
      <div className="class1 class2"></div>
      <div className="numbers">
        <span>123</span>
        <p>456</p>
      </div>
      <div data-test="component-app" className="App">
        <InputComponent success={success} secretWord={secretWord} />
        <h1 data-test="counter-display">
          The counter is currently&nbsp;
          <span data-test="count">{count}</span>
        </h1>
        <button
          data-test="increment-button"
          onClick={() => setCount(count + 1)}
        >
          Increment counter
        </button>
      </div>
      {/* <div>Test1</div> */}
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <Popover content={content}>
        <div>terms and condition</div>
      </Popover>
      <button
        disabled={disableBtn}
        onClick={handleChangeColor}
        style={{ backgroundColor: `${backgroundBtn}` }}
      >
        {backgroundBtn === "red" ? "Change to blue" : "Change to red"}
      </button>
      <input
        checked={disableBtn}
        id="disable-button-checkbox"
        onChange={(e) => handleCheckbox(e)}
        type="checkbox"
      />
      <label htmlFor="disable-button-checkbox">{`Disable button "Change to blue"`}</label>
      <Congats />
      <GuessComponent guessedWords={guessedWords} />
      <InputComponent />
      <button data-gender="male" onClick={handleClick}>
        male
      </button>
      <button data-gender="female" onClick={handleClick}>
        female
      </button>
      <div className={`box ${gender}`}>select {gender}</div>
      <img
        src="https://img.vn/uploads/thuvien/singa-png-20220719150401Tdj1WAJFQr.png"
        alt="Chocolate scoop"
      />
      <img
        src="https://img.vn/uploads/thuvien/singa-png-20220719150401Tdj1WAJFQr.png"
        alt="Vanilla scoop"
      />
    </div>
  );
}

export default App;
