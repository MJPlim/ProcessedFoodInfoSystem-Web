import axios from "axios";

import "@testing-library/jest-dom/extend-expect";

import MockAdapter from "axios-mock-adapter";

describe("<JoinPage/>", () => {
  it("API call test", () => {
    var mock = new MockAdapter(axios);
    mock
      .onGet("http://3.38.97.234:8000/find-password", {
        email: "pjh951218@naver.com",
      })
      .reply(200);
  });
});
