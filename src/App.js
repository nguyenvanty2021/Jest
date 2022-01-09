import "./App.css";
import { useState } from "react";
import { Popover } from "antd";
import Congats from "./components/congats";
export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
}
const content = (
  <div>
    <div>no ice cream will actually be delivered</div>
  </div>
);
function App() {
  const [count, setCount] = useState(0);
  const [backgroundBtn, setBackgroundBtn] = useState("red");
  const [disableBtn, setDisableBtn] = useState(false);
  const handleChangeColor = () => {
    if (backgroundBtn === "red") {
      setBackgroundBtn("blue");
    } else {
      setBackgroundBtn("red");
    }
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

  return (
    <div className="App">
      <div data-test="component-app" className="App">
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
        {" "}
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
    </div>
  );
}

export default App;
