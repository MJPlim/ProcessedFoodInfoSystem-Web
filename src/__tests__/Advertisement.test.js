import axios from "axios";

import "@testing-library/jest-dom/extend-expect";

import MockAdapter from "axios-mock-adapter";

describe("<JoinPage/>", () => {
  it("API call test", () => {
    var mock = new MockAdapter(axios);
    mock
      .onGet("http://3.38.97.234:8000/api/v1/advertisement/search", {
        size: "2",
      })
      .reply(200);
  });
});
