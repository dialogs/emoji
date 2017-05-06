/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

export function isAppleEmojiSupports(): boolean {
  if (!window.navigator) {
    return false;
  }

  const isMacOS = /Mac OS X 10[._ ](?:[789]|1\d)/i;

  return isMacOS.test(navigator.userAgent);
}

export function isDigit(char: string): boolean {
  return (/[0-9]|#/).test(char);
}

export function escapeUTF8(text: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    if (char === '*') {
      result += '\\*';
    } else if (isDigit(char)) {
      result += char;
    } else {
      const code = text.charCodeAt(i);
      const hexadecimal = code.toString(16).toUpperCase();
      if (hexadecimal.length > 2) {
        result += '\\u' + hexadecimal;
      } else {
        result += '\\x' + hexadecimal;
      }
    }
  }

  return result;
}
