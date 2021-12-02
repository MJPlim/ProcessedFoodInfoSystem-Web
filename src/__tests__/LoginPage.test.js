import axios from "axios";

import "@testing-library/jest-dom/extend-expect";

import MockAdapter from "axios-mock-adapter";

describe("<LoginPage/>", () => {
  it("API call test", () => {
    var mock = new MockAdapter(axios);
    mock
      .onPost("http://3.38.97.234:8000/core-service/login", {
        email: "cksgh3422@nate.com",
        password: "1234568",
      })
      .reply(200);
  });
});

// const mock = new MockAdapter(userLogin.userLoginApi);

// describe("test login api call", () => {
//   it("reply 200", async () => {
//     const data = {
//       email: "cksgh3422@nate.com",
//       password: "1234568",
//     };
//     mock.onPost("http://3.38.97.234:8000/core-service/login").reply(200);
//     cons
//   });
// });

//=-------------------------------------------------------------
//=--------------------------NEW--------------------------------
//=-------------------------------------------------------------

// jest.mock("axios");

// describe("Login Page Test", () => {
//   it("okok success 200", () => {
//     const data = {
//       email: "cksgh3422@nate.com",
//       password: "1234568",
//     };

//     const response = userLogin.userLoginApi(data);

//     expect(response).toHaveReturnedWith("headers");
//   });
// });

//=-------------------------------------------------------------
//=--------------------------NEW--------------------------------
//=-------------------------------------------------------------

// describe("login page test", () => {
//   test("success 200", (done) => {
//     var mock = new MockAdapter(axios);
//     const data = {
//       email: "cksgh3422@nate.com",
//       password: "1234568",
//     };
//     mock.onPost("http://3.38.97.234:8000/core-service/login").reply(200, data);
//   });
// });

//=-------------------------------------------------------------
//=--------------------------NEW--------------------------------
//=-------------------------------------------------------------

// jest.mock("axios");

// describe("Login Page Test", () => {
//   it("okok success 200", () => {
//     const data = {
//       email: "cksgh3422@nate.com",
//       password: "1234568",
//     };

//     expect(userLogin(data)).toHaveReturnedWith("authorization");
//   });
// });

//=-------------------------------------------------------------
//=--------------------------NEW--------------------------------
//=-------------------------------------------------------------

// describe("Login Page Test", () => {
//   it("success API call", async () => {
//     const data = {
//       email: "cksgh3422@nate.com",
//       password: "1234568",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     axios.post.mockImplementationOnce(() => Promise.resolve(data));

//     await expect(userLogin(data)).resolves.toEqual(data);

//     // expect(axios.post).toHaveReturned("authorization");
//     expect(axios.post).toHaveBeenCalledWith(
//       "http://3.38.97.234:8000/core-service/login"
//     );
//   });
// });

//=-------------------------------------------------------------
//=--------------------------NEW--------------------------------
//=-------------------------------------------------------------

// describe("fetchUsers", () => {
//   describe("when API call is successful", () => {
//     it("should return 200 or token", async () => {
//       const user = [
//         {
//           email: "cksgh3422@nate.com",
//           password: "1234568",
//         },
//       ];
//       axios.post.mockResolvedValueOnce(user);

//       const result = await userLogin(user);

//       expect(axios.post).toHaveBeenCalledWith(
//         "http://3.38.97.234:8000/core-service/login"
//       );
//       expect(result).toHaveProperty("authorization");
//     });
//   });
// });

//=-------------------------------------------------------------
//=--------------------------NEW--------------------------------
//=-------------------------------------------------------------

// describe("<LoginPage/>", () => {
//   const mock = new MockAdapter(axios, { delayResponse: 2000 });
//   mock
//     .onPost(
//       "http://3.38.97.234:8000/core-service/login",
//       { email: "cksgh3422@nate.com", password: "1234568" },
//       {
//         headers: {
//           "Content-Type": "Application/json",
//         },
//       }
//     )
//     .reply(200);
// });

//=-------------------------------------------------------------
//=--------------------------NEW--------------------------------
//=-------------------------------------------------------------

//=-------------------------------------------------------------
//=--------------------------NEW--------------------------------
//=-------------------------------------------------------------

// const { getByText, getByLabelText } = render(
//   <BrowserRouter>
//     <LoginPage />
//   </BrowserRouter>
// );

// const button = getByText("로그인");
// const email = getByLabelText("이메일");

// configure({ adapter: new Adapter() });

// describe("<LoginPage/>", () => {
//   let wrapper;
//   let email;

//   test("email check", () => {
//     wrapper = shallow(<LoginPage />);
//     email = wrapper.find('Input[type="email"]');
//     email.simulate("change", {
//       target: { name: "email", value: "cksgh3422@nate.com" },
//     });
//     // wrapper.find('Input[type="email"]').simulate("setEmail", {
//     //   target: { name: "email", value: "cksgh3422@nate.com" },
//     // });

//     // fireEvent.change(email, { target: { value: "cksgh3422@nate.com" } });

//     expect(email.value).toBe("cksgh3422@nate.com");
//   });
// });

//=-------------------------------------------------------------
//=--------------------------NEW--------------------------------
//=-------------------------------------------------------------

//=-------------------------------------------------------------
//=--------------------------NEW--------------------------------
//=-------------------------------------------------------------

//=-------------------------------------------------------------
//=--------------------------NEW--------------------------------
//=-------------------------------------------------------------

//=-------------------------------------------------------------
//=--------------------------NEW--------------------------------
//=-------------------------------------------------------------

//=-------------------------------------------------------------
//=--------------------------NEW--------------------------------
//=-------------------------------------------------------------

// configure({ adapter: new Adapter() });

// describe("LoginPage Test", () => {
//   let wrapper;

//   test("email check", () => {
//     wrapper = shallow(<LoginPage />);
//     wrapper.find('Input[type="email"]').simulate("setEmail", {
//       target: { name: "email", value: "cksgh3422@nate.com" },
//     });
//     expect(wrapper.state("email")).toEqual("cksgh3422@nate.com");
//   });

//   it("password check", () => {
//     wrapper = shallow(<LoginPage />);
//     wrapper.find('Input[type="password"]').simulate("setPassword", {
//       target: {
//         name: "password",
//         value: "1234568",
//       },
//     });
//     expect(wrapper.state("password")).toEqual("1234568");
//   });

//   it("login check with mock email", () => {
//     wrapper = shallow(<LoginPage />);
//     wrapper.find('Input[type="email"]').simulate("setEmail", {
//       target: { name: "email", value: "cksgh3422@nate.com" },
//     });
//     wrapper.find('Input[type="password"]').simulate("setPassword", {
//       target: {
//         name: "password",
//         value: "1234568",
//       },
//     });
//     wrapper.find("button").simulate("click");

//     expect(wrapper.state("okLogin")).toBe(true);
//   });
// });

//=-------------------------------------------------------------
//=--------------------------NEW--------------------------------
//=-------------------------------------------------------------
//=-------------------------------------------------------------
//=--------------------------NEW--------------------------------
//=-------------------------------------------------------------
//=-------------------------------------------------------------
//=--------------------------NEW--------------------------------
//=-------------------------------------------------------------
//=-------------------------------------------------------------
//=--------------------------NEW--------------------------------
//=-------------------------------------------------------------

// describe('<LoginPage>', () => {
//   it('check Login Page', () => {
//     const email = 'cksgh3422@nate.com';
//     const password = '1234568';
//     const wrapper = shallow(<LoginPage login)
//   })
// })

//=-------------------------------------------------------------
//=-------------------------------------------------------------
//=-------------------------NNNEEW------------------------------
//=-------------------------------------------------------------
//=-------------------------------------------------------------
// function setLoginEmail() {
//   return {
//     email: "cksgh3422@nate.com",
//     password: "1234568",
//   };
// }

// test("user Email Login Test", () => {
//   expect(setLoginEmail().toBe(200));
// });
//=-------------------------------------------------------------

// describe("<LoginPage />", () => {
//   it("renders Email", () => {
//     const onSubmitMock = jest.fn();

//     const { getByText, getByLabelText } = render(
//       <BrowserRouter>
//         <LoginPage />
//       </BrowserRouter>
//     );

//     const button = getByText("로그인");
//     const email = getByLabelText("이메일");
//     const password = getByLabelText("비밀번호");

//     fireEvent.change(email, { target: { value: "cksgh3422@nate.com" } });
//     fireEvent.change(password, { target: { value: "1234568" } });

//     fireEvent.click(button);

//     expect(onSubmitMock).toBeCalled();
//   });
// });
//=-------------------------------------------------------------
// jest.mock("axios");
//=-------------------------------------------------------------
//=-------------------------------------------------------------
//=-------------------------------------------------------------
//=--------------------------NEW--------------------------------
