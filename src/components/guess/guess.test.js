import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { findByTestAttr } from "../../../test/testUtil";
import GuessComponent from "./index";
const defaultProps = {
  guessedWords: [{ guessedWord: "train", letterMatchCount: 3 }],
};
Enzyme.configure({ adapter: new EnzymeAdapter() });
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessComponent {...setupProps} />);
};
describe("if there are no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });
  test("renders without error", () => {
    // const wrapper = setup({ guessedWord: [] });
    const component = findByTestAttr(wrapper, "component-guessed-words");
    // tồn tại data-test="component-guessed-words"
    expect(component.length).toBe(1);
  });
  test("renders instructions to guess a word", () => {
    const instructions = findByTestAttr(wrapper, "guess-instructions");
    // độ dài text của instructions phải khác 0
    expect(instructions.text().length).not.toBe(0);
  });
});
describe("if there are words guessed", () => {
  let wrapper;
  const guessedWords = [
    { guessedWord: "train", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 1 },
    { guessedWord: "party", letterMatchCount: 5 },
  ];
  beforeEach(() => {
    wrapper = setup({ guessedWords });
  });
  test("renders without error", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });
  test("renders `guessed words` section", () => {
    const guessedWordsNode = findByTestAttr(wrapper, "guessed-words");
    expect(guessedWordsNode.length).toBe(1);
  });
  test("correct number of guessed words", () => {
    const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordNodes.length).toBe(guessedWords.length);
  });
});
