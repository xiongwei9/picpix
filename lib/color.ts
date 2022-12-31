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

/**
 * 提取主题色
 * - Google算法：
 *   - https://blog.csdn.net/rxie1/article/details/107635489
 *   - https://www.jianshu.com/p/a67a6d1b1844
 * - 算法介绍：https://www.zhihu.com/question/430895335
 * - 主题色算法介绍：
 *   - https://blog.csdn.net/shanglianlm/article/details/50051269
 *   - https://blog.csdn.net/qq_37340753/article/details/121140533
 */
function getThemeColor(rgbArr: RGB[]): RGB {
  return {
    R: 0,
    G: 0,
    B: 0,
  };
}

export { RGB, newRGB, colorDistanceLAB };
