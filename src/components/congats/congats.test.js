import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import Congats from "./index";
import { findByTestAttr } from "../../../test/testUtil";
Enzyme.configure({ adapter: new EnzymeAdapter() });
// Đã xem
const defaultProps = { success: false };
const setup = (props = {}) => {
  // mặc định props có key "success" vs value là "false"
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Congats {...setupProps} />);
  //return shallow(<Congats {...props} />);
};
test("renders without error", async () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-congrats");
  // kiểm tra có độ dài data-test="component-congrats" hay không
  expect(component.length).toBe(1);
});
// -----------------------------------------------------------------
// Đã xem
test("renders no text when `success` props is false", async () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  // kiểm tra text của data-test="component-congrats" phải = ""
  expect(component.text()).toBe("");
});
// -----------------------------------------------------------------
// Đã xem
test("renders non-empty congrats message when `success` prop is true", async () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, "congrats-message");
  expect(message.text().length).not.toBe(0);
});
// -----------------------------------------------------------------
describe("if there are no words guessed", () => {
  let wrapper;
  // beforeEach(() => {
  //   wrapper = setup({ guessedWords: [] });
  // });
  // test("renders without error", () => {
  //   const wrapper = setup({ guessedWords: [] });
  //   const component = findByTestAttr(wrapper, "component-guessed-words");
  //   expect(component.length).toBe(1);
  // });
  // test("renders instruction to guess a word", () => {
  //   const instruction = findByTestAttr(wrapper, "guess-instructions");
  //   expect(instruction.text().length).not.toBe(0);
  // });
});
