import { validURL } from "../src/client/js/funcs";

describe("Testing the submit functionality", () => {
  test("Testing the validURL() function", () => {
    expect(validURL).toBeDefined();
  });
});
