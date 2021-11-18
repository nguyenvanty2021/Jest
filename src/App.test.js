import { render, screen, fireEvent } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

test("renders learn react link", () => {
  render(<App />);
  // trong component App có tồn tại text "learn react" hay không
  // const linkElement = screen.getByText("Learn React");
  // kiểm tra các thẻ link (a) có text nào tên là "learn react" hay không
  const linkElement = screen.getByRole("link", { name: /learn react/i });
  // hiển thị kết quả test (thành công - thất bại)
  expect(linkElement).toBeInTheDocument();

  // throw new Error("test failed")
});
test("button has correct initial color", () => {
  render(<App />);
  // btn này có text ban đầu là "Change to blue"
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  // backgroundColor ban đầu của btn này là "red"
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
  // khi click btn
  fireEvent.click(colorButton);
  // thì màu của btn sẽ đổi thành "blue"
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
  // và cái text của btn sẽ đổi thành "Change to red"
  expect(colorButton.textContent).toBe("Change to red");
});
test("initial conditions", () => {
  render(<App />);
  // có nhiều hơn 1 btn có text là: "Change to blue"
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  // btn này không bị disable (đang hoạt động)
  expect(colorButton).toBeEnabled();
  // có nhiều hơn 1 checkbox
  const checkbox = screen.getByRole("checkbox");
  // checkbox này chưa được check (tích chọn)
  expect(checkbox).not.toBeChecked();
});
test("checkbox disable button on first click and enable on second click", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", {name: `Disable button "Change to blue"`});
  const button = screen.getByRole("button", {name: "Change to blue"});
  // khi click vào checkbox lần đầu tiên
  fireEvent.click(checkbox);
  // thì cái btn này sẽ bị disable
  expect(button).toBeDisabled();
  // khi click vào checkbox lần thứ 2
  fireEvent.click(checkbox);
  // thì cái btn này sẽ enable trở lại
  expect(button).toBeEnabled();
});
test("Clicked disabled button has gray background and reverts to blue", () => {
  render(<App/>);
  const checkbox = screen.getByRole("checkbox", {name: `Disable button "Change to blue"`});
  const button = screen.getByRole("button", {name: "Change to blue"})
  fireEvent.click(button);
  fireEvent.click(checkbox)
  expect(button).toHaveStyle("background-color:gray");
  fireEvent.click(checkbox)
  expect(button).toHaveStyle("background-color:blue");
})
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
})