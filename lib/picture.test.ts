import { getPixelsPromise } from "./picture";

test("test", async () => {
  const pixels = await getPixelsPromise("asset/bg.png");
  const [width, height] = pixels.shape;

  expect(width).toBe(860);
  expect(height).toBe(484);
});
