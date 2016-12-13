/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

export function isEmojiSupports(): boolean {
  if (!window.navigator) {
    return false;
  }

  const isMacOS = /Mac OS X 10[._ ](?:[789]|1\d)/i;

  return isMacOS.test(navigator.userAgent);
}
