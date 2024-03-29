import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import userEvent from "@testing-library/user-event";
import App, { replaceCamelWithSpaces } from "./App";
import { findByTestAttr } from "../test/testUtil";

Enzyme.configure({ adapter: new EnzymeAdapter() });
const wrapper = shallow(<App />);
// Đã xem
test("renders without error", () => {
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent).toHaveLength(1);
});
// ------------------------------------------------------
// Đã xem
test("renders without crashing", () => {
  // wrapper nào lỗi thì dùng lệnh này để debug
  console.log(wrapper.debug());
});
// ------------------------------------------------------
// Đã xem
test("renders non-empty component without crashing", () => {
  // === true là check xem component có tồn tại, === false là check xem component không tồn tại
  expect(wrapper.exists()).toBe(true);
});
// ------------------------------------------------------
// Đã xem
test("renders without error", async () => {
  // tìm trong component App có data-test nào = component-app hay không
  const appComponent = wrapper.find("[data-test='component-app']");
  // const appComponent = findByTestAttr(wrapper, "component-app");
  // với mong đợi độ dài của nó = 1 (tồn tại ít nhất 1 element có data-test = component-app)
  expect(appComponent.length).toBe(1);
});
// ------------------------------------------------------
// Đã xem
test("renders without error", async () => {
  // tìm trong component App có data-test nào = increment-button hay không
  // const appComponent = wrapper.find("[data-test='increment-button']");
  const button = findByTestAttr(wrapper, "increment-button");
  // với mong đợi độ dài của nó = 1
  expect(button.length).toBe(1);
});
// ------------------------------------------------------
// Đã xem
test("counter starts at 0", async () => {
  // tìm trong component App có data-test nào = count hay không
  const count = findByTestAttr(wrapper, "count").text();
  // có giá trị là 0
  expect(count).toBe("0");
});
// ------------------------------------------------------
// Đã xem
test("clicking on button increments counter display", async () => {
  // find the button
  const button = findByTestAttr(wrapper, "increment-button");
  // click the button
  button.simulate("click");
  // find the display, and test that the number has been incremented
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1");
});
// ------------------------------------------------------
// Đã xem
test("renders learn react link", async () => {
  render(<App />);
  // trong component App có tồn tại text "Test1" hay không
  // const linkElementText = screen.getByText("Test1");
  // toBeInTheDocument là tồn tại
  // expect(linkElementText).toBeInTheDocument();
  // kiểm tra các thẻ link (a) có text nào tên là "learn react" hay không
  const linkElement = screen.getByRole("link", { name: /learn react/i });
  // hiển thị kết quả test (thành công - thất bại)
  expect(linkElement).toBeInTheDocument();
  // throw new Error("test failed")
  // cách khác vs 2 dòng ở trên
  const valuelinkElementText = screen.queryByText(/Test1/i);
  // toBenull là không tồn tại
  expect(valuelinkElementText).toBeNull();
  // hoặc
  // not.toBeInTheDocument() là không tồn tại
  //expect(valuelinkElementText).not.toBeInTheDocument();
  // hover
  const termsAndConditions = screen.getByText(/terms and condition/i);
  userEvent.hover(termsAndConditions);
  // userEvent.unhover(termsAndConditions);
  // await waitForElementToBeRemoved(() =>
  //   screen.queryByText(/no ice cream will actually be delivered/i)
  // );
});
// ------------------------------------------------------
// Đã xem
test("button has correct initial color", () => {
  render(<App />);
  // btn này có text ban đầu là "Change to blue"
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  // backgroundColor ban đầu của btn này là "red"
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
  // khi click btn
  fireEvent.click(colorButton);
  // thì màu background của btn sẽ đổi thành "blue"
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
  // và cái text của btn sẽ đổi thành "Change to red"
  expect(colorButton.textContent).toBe("Change to red");
  // hoặc dòng trên thay thế = dòng này
  // expect(colorButton).toHaveTextContent("Change to red");
});
// ------------------------------------------------------
// Đã xem
test("initial conditions", () => {
  render(<App />);
  // có nhiều hơn 1 btn có text là: "Change to blue"
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  // btn này không bị disable -> nghĩa là đang enable (đang hoạt động)
  expect(colorButton).toBeEnabled();
  // có nhiều hơn 1 checkbox
  const checkbox = screen.getByRole("checkbox");
  // checkbox này chưa được check (tích chọn)
  expect(checkbox).not.toBeChecked();
});
// ------------------------------------------------------
// Đã xem
test("checkbox disable button on first click and enable on second click", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", {
    name: `Disable button "Change to blue"`,
  });
  const button = screen.getByRole("button", { name: "Change to blue" });
  // khi click vào checkbox lần đầu tiên
  fireEvent.click(checkbox);
  // thì cái btn này sẽ bị disable
  expect(button).toBeDisabled();
  // khi click vào checkbox lần thứ 2
  fireEvent.click(checkbox);
  // thì cái btn này sẽ enable trở lại
  expect(button).toBeEnabled();
});
// ------------------------------------------------------
test("Clicked disabled button has gray background and reverts to blue", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", {
    name: `Disable button "Change to blue"`,
  });
  const button = screen.getByRole("button", { name: "Change to blue" });
  fireEvent.click(button);
  fireEvent.click(checkbox);
  expect(button).toHaveStyle("background-color:gray");
  fireEvent.click(checkbox);
  expect(button).toHaveStyle("background-color:blue");
});
// test func
// Đã xem
describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    // tobe -> đổi thành
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("Works for one inner capital letters", () => {
    // tobe -> đổi thành
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("Works for multiple inner capital letters", () => {
    // tobe -> đổi thành
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
// ------------------------------------------------------
// Đã xem
test("displays image", async () => {
  render(<App />);
  // có 2 img có alt chứa text là: 'scoop'
  // nếu call api để get data chứa img thì phải dùng async-await và thay getAllByRole = findAllByRole
  const scoopImages = await screen.findAllByRole("img", {
    name: /scoop$/i,
  });
  expect(scoopImages).toHaveLength(2);
  // confirm alt text of images
  // Lấy ra list alt img chứa các text này
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
