import getPixelsRaw from "get-pixels";
import { NdArray } from "ndarray";

/**
 * 读取png/jpg图片文件为二进制
 */
function getPixels(path: string): Promise<NdArray<Uint8Array>> {
  return new Promise((res, rej) => {
    getPixelsRaw(path, (err, pixels) => {
      if (err) {
        rej(err);
        return;
      }
      res(pixels);
    });
  });
}

export { getPixels };
