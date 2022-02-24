import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { findByTestAttr } from "../../../test/testUtil";
import InputComponent from "./index";
Enzyme.configure({ adapter: new EnzymeAdapter() });
const setup = (success = false, secretWord = "party") => {
  //const setupProps = { ...defaultProps, ...props };
  return shallow(<InputComponent success={success} secretWord={secretWord} />);
};
describe("render", () => {
  describe("success is true", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup(true);
    });
    test("Input renders without error", () => {
      // const wrapper = setup();
      const inputComponent = findByTestAttr(wrapper, "component-input-2");
      expect(inputComponent.length).toBe(1);
    });
    test("input box does not show", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      // khi success = true thì element này không tồn tại, nó đã bị ẩn đi rồi
      expect(inputBox.exists()).toBe(false);
    });
    test("submit button does not show", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      // khi success = true thì element này không tồn tại, nó đã bị ẩn đi rồi
      expect(submitButton.exists()).toBe(false);
    });
  });
  describe("success is false", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup(false);
    });
    test("Input renders without error", () => {
      // const wrapper = setup();
      const inputComponent = findByTestAttr(wrapper, "component-input");
      expect(inputComponent.length).toBe(1);
    });
    test("input box shows", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.exists()).toBe(true);
    });
    test("submit button shows", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.exists()).toBe(true);
    });
  });
});
test("Input renders without error", () => {
  const wrapper = setup();
  const inputComponent = findByTestAttr(wrapper, "component-input");
  expect(inputComponent.length).toBe(1);
});
// mock entire module for desctructuring useState on import //////
// const mockSetCurrentGuess = jest.fn();
// jest.mock("react", () => ({
//   ...jest.requireActual("react"),
//   useState: (initialState) => [initialState, mockSetCurrentGuess],
// }));
describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  let originalUseState;
  beforeEach(() => {
    // thay vì trên đầu mỗi thằng đều dùng 2 dòng này thì dùng beforeEach
    mockSetCurrentGuess.mockClear();
    originalUseState = React.useState;
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup();
  });
  afterEach(() => {
    React.useState = originalUseState;
  });
  test("state updates with value of input box upon change", () => {
    // const mockSetCurrentGuess = jest.fn();
    // React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    // const wrapper = setup();
    const inputBox = findByTestAttr(wrapper, "input-box");
    // khi user onChange input với giá trị là "train"
    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);
    // và lưu giá trị "train" này vào useState
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });
  test("field is cleared upon submit button click", () => {
    // const mockSetCurrentGuess = jest.fn();
    // React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    //const wrapper = setup();
    const submitButton = findByTestAttr(wrapper, "submit-button");
    // khi click vào button này, nếu là form phải thêm preventDefault()
    submitButton.simulate("click", { preventDefault() {} });
    // giá trị của useState sẽ bị reset về ""
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
