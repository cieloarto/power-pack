export function toUpperCase(str: string): string {
  return str.toUpperCase();
}

export function toLowerCase(str: string): string {
  return str.toLowerCase();
}

import crypto = require("crypto");

/*
 ログファイル用random文字列生成
 */
export const createRandomString = (length: number): string => {
  const baseString = "0123456789abcdefghijklmnopqrstuvwxyz";
  const buffer: Buffer = crypto.randomBytes(length);

  return [...Array(length)].reduce((_, current, index) => {
    return (
      _ +
      baseString.charAt(Math.floor((buffer[index] / 256) * baseString.length))
    );
  }, "");
};
