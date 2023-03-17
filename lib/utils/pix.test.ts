import { getPixels } from "./pix";

test("test", async () => {
  const pixels = await getPixels("asset/bg.png");
  const [width, height, channels] = pixels.shape;

  expect(width).toBe(860);
  expect(height).toBe(484);
  expect(channels).toBe(4);
});
