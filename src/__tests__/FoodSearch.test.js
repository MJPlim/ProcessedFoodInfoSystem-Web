import axios from "axios";

import "@testing-library/jest-dom/extend-expect";

import MockAdapter from "axios-mock-adapter";

describe("<JoinPage/>", () => {
  it("API call test", () => {
    var mock = new MockAdapter(axios);
    mock
      .onPost("http://3.38.97.234:8000/api/v1/food/findFood/barcode", {
        barcode: "8801045312316", //쇠고기 카레
      })
      .reply(200);
  });
});
