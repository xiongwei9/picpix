import getPixelsRaw from "get-pixels";
import { NdArray } from "ndarray";

/**
 * 读取png/jpg图片文件为二进制
 */
function getPixels(path: string | Uint8Array, type = ""): Promise<NdArray<Uint8Array>> {
  return new Promise((res, rej) => {
    getPixelsRaw(path, type, (err, pixels) => {
      if (err) {
        rej(err);
        return;
      }
      res(pixels);
    });
  });
}

export { getPixels };
