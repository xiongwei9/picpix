import { getColor, colorDistance, newRGB } from "./color";

test("getColor", async () => {
  const color = await getColor("asset/bg.png");
  expect(color).toEqual({
    R: 73,
    G: 61,
    B: 75,
  });
});

test("colorDistanceLAB", () => {
  const rgb1 = newRGB("ffffff");
  const rgb2 = newRGB("ffffff");
  const dis = colorDistance(rgb1, rgb2);
  expect(dis).toBe(0);

  expect(() => newRGB("zzzzzz")).toThrow();
});
