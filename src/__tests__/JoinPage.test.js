import axios from "axios";

import "@testing-library/jest-dom/extend-expect";

import MockAdapter from "axios-mock-adapter";

describe("<JoinPage/>", () => {
  it("API call test", () => {
    var mock = new MockAdapter(axios);
    mock
      .onPost("http://3.38.97.234:8000/core-service/signup", {
        name: "AKASUTKI SARYUNAN",
        password: "1234568",
        address: "Seoul Metro City",
        birth: "1950-06-25",
        email: "pjh9512189@naver.com",
      })
      .reply(200);
  });
});
