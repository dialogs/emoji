/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import flow from 'lodash/fp/flow';
import filter from 'lodash/fp/filter';
import first from 'lodash/fp/first';
import emojis from './emoji.json';

export type Emoji = {
  code: string,
  char: string,
  name: string,
  keywords: string[]
};

export function findEmoji(query: string, limit: number = 10): Emoji[] {
  const search = flow(
    filter((emoji) => emoji.name.indexOf(query) !== -1),
    first(limit)
  );

  return search(emojis);
}
