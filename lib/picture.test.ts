import { pic2d } from "./picture";

test("pic2d", () => {
  pic2d("asset/bg.png");
});

test("none", () => {
  expect(1 + 1).toBe(2);
});
