import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App, { TempComponent, checkboxChecked } from "./App";
import { shallow } from "enzyme";
configure({ adapter: new Adapter() });
describe("Update home page", () => {
  it("Object check", () => {
    let wrapper = shallow(<App />);
    //console.log(wrapper.debug());
    // mong đợi component App có className là .homecls với kết quả trả về là true
    expect(wrapper.exists(".homecls")).toEqual(true);
  });
  it("Element check", () => {
    let wrapper = shallow(<App />);
    // .state() chỉ dùng cho bên class nên ẩn dòng dưới đi
    // expect(wrapper.state()).toEqual({ name: "ty", id: 1 });
    // check xem trong component App có element nào là div vs className là 'homecls' và có text là 'Welcome to home page' không
    expect(
      wrapper.contains(<div className="homecls2">Welcome to home page2</div>)
    ).toEqual(true);
  });
});
describe("App test", () => {
  it("find check", () => {
    let wrapper = shallow(<App />);
    // tìm className 'liCls' với số lần xuất hiện phải = đúng 3
    expect(wrapper.find(".liCls").length).toBe(3);
  });
  it("at & key check", () => {
    let wrapper = shallow(<App />);
    // lấy ra key của element có className là 'liCls' đầu tiên với giá trị mong muốn của key là 'react'
    expect(wrapper.find(".liCls").at(0).key()).toBe("react");
  });
  it("child check", () => {
    let wrapper = shallow(<App />);
    // lấy ra thằng con đầu tiên trong element cha có className là 'numbers' với element mong đợi của thằng con đầu tiên là 'span'
    expect(wrapper.find(".numbers").childAt(0).type()).toBe("span");
  });
  it("children length check", () => {
    let wrapper = shallow(<App />);
    // lấy ra element của thằng cha có className là 'numbers' với số lượng element con bên trong thằng cha này là 2 -> nghĩa là bên trong element cha này có 2 thằng con
    expect(wrapper.find(".numbers").children().length).toBe(2);
  });
  it("hasClass check", () => {
    let wrapper = shallow(<App />);
    // lấy ra element có className là 'class1' và element này phải có thêm 1 className là 'class2'. Example: className='class1 class2'
    expect(wrapper.find(".class1").hasClass("class2")).toBe(true);
  });
});
describe("button", () => {
  it("click button", () => {
    let wrapper = shallow(<App />);
    // lấy ra element có className là 'click-0' với số lượng element có className này là 1 lần
    // -> ban đầu biến count = 0 nên className là 'click-0'
    expect(wrapper.find(".click-0").length).toEqual(1);
    // click button setCount +1
    wrapper.find(".buttonClick").simulate("click");
    // lấy ra element có className là 'click-1' với số lượng element có className này là 1 lần và + với 1 element default có className là 'click-1' nữa là 2 lần
    // -> lúc này biến count = 1 nên className là 'click-1'
    expect(wrapper.find(".click-1").length).toEqual(2);
  });
  it("dive", () => {
    let wrapper = shallow(<App />);
    // lấy ra element có className là 'componentChild' nằm trong component TempComponent là con của component App
    expect(
      wrapper.find(TempComponent).dive().find(".componentChild").length
    ).toBe(1);
  });
  it("test state", () => {
    const wrapper = shallow(<App />);
    // lấy ra element có className là 'buttonClick' và bắt onClick vào element này
    // -> khi click button này state tăng từ 0 lên 1
    wrapper.find(".buttonClick").simulate("click");
    // sau khi click vào button ở trên lại lấy ra element có className là 'pCount' với text mong muốn là '1'
    // -> state thay đổi từ 0 -> 1 khi click button ở trên mà gán state ở trên vào text cho element có className là 'pCount' nên lúc này text nó là '1'
    expect(wrapper.find(".pCount").text()).toBe("1");
  });
  it("gender state", async () => {
    const wrapper = shallow(<App />);
    // lấy ra element button cuối cùng
    const btn = wrapper.find("button").last();
    // không có promise
    // click vào button cuối cùng này
    // btn.simulate("click", {
    //   target: {
    //     getAttribute: () => {
    //       // lấy ra value của attribute data-gender trong button cuối cùng này thông qua thuộc tính target.getAttribute
    //       return btn.props()["data-gender"];
    //     },
    //   },
    // });
    // mong đợi có 1 element có className là 'box female'
    // expect(wrapper.find(".box.female").length).toEqual(1);

    // có promise
    const events = {
      target: {
        getAttribute: () => {
          // lấy ra value của attribute data-gender trong button cuối cùng này thông qua thuộc tính target.getAttribute
          return btn.props()["data-gender"];
        },
      },
    };
    await btn.props().onClick(events);
    // mong đợi có 1 element có className là 'box female'
    expect(wrapper.find(".box.female").length).toEqual(1);
  });
});
