import { mount } from "enzyme";
import { findByTestAttr } from "../../../test/testUtil";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import InputComponent from ".";
Enzyme.configure({ adapter: new EnzymeAdapter() });
const setup = (state = {}) => {
  const wrapper = mount(<InputComponent success={false} secretWord="party" />);
  // add value to input box
  const inputBox = findByTestAttr(wrapper, "input-box");
  // khi user onChange input với giá trị là "train"
  const mockEvent = { target: { value: "train" } };
  inputBox.simulate("change", mockEvent);
  // simulate click on submit button
  const submitButton = findByTestAttr(wrapper, "submit-button");
  // khi click vào button này, nếu là form phải thêm preventDefault()
  submitButton.simulate("click", { preventDefault() {} });
  return wrapper;
};
describe("no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: "party",
      success: false,
      guessedWords: [],
    });
  });
  test("creates GuessedWords table with one row", () => {
    const guessedWordRows = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordRows).toHaveLength(1);
  });
});
describe("some words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: "party",
      success: false,
      guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
    });
  });
  test("add row to guessedWords table", () => {
    const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordNodes).toHaveLength(2);
  });
});
describe("guess secret word", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: "party",
      success: false,
      guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
    });
    // add value to input box
    const inputBox = findByTestAttr(wrapper, "input-box");
    // khi user onChange input với giá trị là "train"
    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);
    // simulate click on submit button
    const submitButton = findByTestAttr(wrapper, "submit-button");
    // khi click vào button này, nếu là form phải thêm preventDefault()
    submitButton.simulate("click", { preventDefault() {} });
  });
  test("add row to guessedWords table", () => {
    const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordNodes).toHaveLength(3);
  });
  test("displays congrats component", () => {
    const congrats = findByTestAttr(wrapper, "component-congrats");
    expect(congrats.text().length).toBeGreaterThan(0);
  });
  test("does not display input component contents", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");
    expect(inputBox.exists()).toBe(false);
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.exists()).toBe(false);
  });
});
