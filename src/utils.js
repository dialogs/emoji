/*
 * Copyright 2020 dialog LLC <info@dlg.im>
 * @flow
 */

export function isAppleEmojiSupports(): boolean {
  if (typeof navigator === 'undefined') {
    return false;
  }

  return (/MacIntel|iPhone|iPad|iPod/).test(navigator.platform);
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
