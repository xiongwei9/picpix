import { getPixels } from "./utils/pix";
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
function compress(pixels: NdArray<Uint8Array>, width: number, height: number): NdArray<Uint8Array> {
  return pixels;
}

interface Pic2dOptions {
  width: number;
  height: number;
}

async function pic2d(path: string, options?: Pic2dOptions) {
  // 读取图片文件
  let pixels = await getPixels(path);
  // 按用户指定宽高压缩，减轻后续计算压力
  pixels = compress(pixels, options?.width || 100, options?.height || 100);

  //
  const [width, height] = pixels.shape;
  // for ()
}

export { pic2d };
