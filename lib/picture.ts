import { getPixels } from "./utils/pix";
import { getPalette, nearestColor, RGB } from "./utils/color";
import { NdArray } from "ndarray";

// /**
//  * 图片格式
//  */
// type PictureFormat = "png" | "jpg" | "jpeg";
// interface Picture {
//   format: PictureFormat;
//   transformToPixel: () => void;
//   compress();
// }

/**
 * 压缩（采样）
 */
function compress(pixels: NdArray<Uint8Array>, quality = 10): Array<RGB> {
  const pixelCount = pixels.shape[0] * pixels.shape[1];
  const pixelsData = pixels.data;
  const rgbArray: Array<RGB> = [];

  for (let i = 0; i < pixelCount; i += quality) {
    // 每个颜色都有4个值，即RGBA
    const offset = i * 4;
    rgbArray.push({
      R: pixelsData[offset],
      G: pixelsData[offset + 1],
      B: pixelsData[offset + 2],
    });
  }
  return rgbArray;
}

interface Pic2dOptions {
  quality?: number;
}

async function pic2d(path: string, options?: Pic2dOptions) {
  // 读取图片文件
  const pixels = await getPixels(path);
  // 按用户指定宽高压缩，减轻后续计算压力
  const imagePixelColors = compress(pixels, options?.quality);
  // 提取调色板
  const colors = await getPalette(path, 3);

  // 从调色板中取最接近的颜色值
  return imagePixelColors.map((color) => {
    const c = nearestColor(color, colors);
    return c;
  });
}

export { pic2d };
