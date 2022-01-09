import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import Congats from "./index";
Enzyme.configure({ adapter: new EnzymeAdapter() });
const setup = (props = {}) => {
  return shallow(<Congats {...props} />);
};
test("renders without error", async () => {});
