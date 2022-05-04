// lấy hàm sum từ file Sum.js
const objectFunc = require("./Sum");
const sum = require("./Sum");
describe("Update home page", () => {
  //   it("my second test case", () => {
  //     // mong đợi hàm sum tính toán trả về giá trị là 3
  //     expect(sum(1, 2)).toBe(3);
  //   });
  it("Object check", () => {
    // mong đợi hàm objectFunc trả về 1 object có key là name và value là 'ty'
    const data = objectFunc();
    expect(data).toEqual({ name: "ty" });
  });
  //   describe("Update home page", () => {
  //     it("my second test case", () => {
  //       // mong đợi hàm sum tính toán trả về giá trị nào cũng được miễn là khác 4
  //       expect(sum(1, 2)).not.toBe(4);
  //     });
  //   });
});
test("my first test case", () => {
  let data = 10;
  // mong đợi biến data có giá trị là 10
  expect(data).toBe(10);
});
it("my second test case", () => {
  let data = 13;
  // mong đợi biến data có giá trị là 13
  expect(data).toBe(13);
});
