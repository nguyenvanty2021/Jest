import { mount } from "enzyme";
import { findByTestAttr } from "../../../test/testUtil";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import InputComponent from ".";
Enzyme.configure({ adapter: new EnzymeAdapter() });
const setup = (state = {}) => {
  const wrapper = mount(
    <InputComponent success={state.success} secretWord={state.secretWord} />
  );
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
describe.skip("guess secret word", () => {
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
    // lỗi nè
    const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordNodes).toHaveLength(3);
  });
  test("displays congrats component", () => {
    // lỗi nè
    const congrats = findByTestAttr(wrapper, "component-congrats");
    expect(congrats.text().length).toBeGreaterThan(0);
  });
  test("does not display input component contents", () => {
    // lỗi nè
    const inputBox = findByTestAttr(wrapper, "input-box");
    expect(inputBox.exists()).toBe(false);
    // lỗi nè
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.exists()).toBe(false);
  });
});
describe("invalid word guessed", () => {
  // dùng .todo cho những test cần nhắc nhở -> test chuẩn bị làm,...
  test.todo("guessedWords table does not get another row");
});
// dùng .only cho những test bắt buộc phải thực thi, bắt buộc phải làm
describe.only("no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: "party",
      success: false,
      guessedWords: [],
    });
  });
  test("creates GuessedWords table with one row", () => {
    const guessedWordRows = findByTestAttr(wrapper, "component-input");
    expect(guessedWordRows).toHaveLength(1);
  });
});
// dùng .skip để bỏ qua các test mình muốn, test này sẽ không được thực thi và chạy -> vì đã bỏ qua k chạy test rồi, nên test này lỗi cũng không sao
describe.skip("some words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: "party",
      success: false,
      guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
    });
  });
  test("add row to guessedWords table", () => {
    const guessedWordNodes = findByTestAttr(wrapper, "component-input");
    expect(guessedWordNodes).toHaveLength(2);
  });
});
