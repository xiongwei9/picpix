import { colorDistanceLAB, newRGB } from "./color";

test("colorDistanceLAB", () => {
  const rgb1 = newRGB("ffffff");
  const rgb2 = newRGB("ffffff");
  const dis = colorDistanceLAB(rgb1, rgb2);
  expect(dis).toBe(0);
});
