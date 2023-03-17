import ColorThief from "colorthief";

// const colorThief = new ColorThief()

/**
 * 关于主题色实现，一般分三大类
 * 1. 颜色量化算法：
 *   - 中位切分法（Median cut，MMCQ）最为常见，colorthief库底层就是用这个（https://github.com/lokesh/color-thief）
 *   - 八叉树算法 https://github.com/xiong35/color-extraction/blob/main/src/octree.ts
 * 2. 聚类：KMeans算法（https://github.com/ogus/kmeans-quantizer、https://github.com/dstein64/k-means-quantization-js）
 * 3. 色彩建模http://dl.acm.org/citation.cfm?id=2466424
 *
 * 参考链接：
 * - https://www.zhihu.com/question/430895335
 * - https://blog.csdn.net/qq_37340753/article/details/121140533
 * - https://blog.csdn.net/shanglianlm/article/details/50051269
 */

/**
 * 主题色
 * @param image 图片路径
 * @param quality 1-10整数，数字越小，质量越好
 * @returns
 */
async function getColor(image: string, quality = 10): Promise<RGB> {
  // return colorThief.getColor(image, quality)
  const color = await ColorThief.getColor(image, quality);
  return {
    R: color[0],
    G: color[1],
    B: color[2],
  };
}

interface RGB {
  R: number;
  G: number;
  B: number;
}

/**
 * 将16进制颜色值转换成 RGB 数值
 * @param color 颜色值，如 FFFFFF, FF00AA
 * @returns RGB对象
 */
function newRGB(color: string): RGB {
  if (typeof color !== "string" || !/^[0-9a-fA-F]{6}$/.test(color)) {
    throw new Error(`string: "${color}" is not a color`);
  }
  const r = color.substring(0, 2);
  const g = color.substring(2, 4);
  const b = color.substring(4, 6);
  return {
    R: Number.parseInt(`0x${r}`),
    G: Number.parseInt(`0x${g}`),
    B: Number.parseInt(`0x${b}`),
  };
}

/**
 * 使用LAB颜色空间计算色差
 * - https://www.compuphase.com/cmetric.htm
 * - https://blog.csdn.net/qq_16564093/article/details/80698479
 */
function colorDistanceLAB(rgb1: RGB, rgb2: RGB): number {
  const rmean = (rgb1.R + rgb2.R) / 2;
  const r = rgb1.R - rgb2.R;
  const g = rgb1.G - rgb2.G;
  const b = rgb1.B - rgb2.B;

  return Math.sqrt((2 + rmean / 256) * r ** 2 + 4 * g ** 2 + (2 + (255 - rmean) / 256) * b ** 2);
}

export { getColor, colorDistanceLAB, newRGB, RGB };
