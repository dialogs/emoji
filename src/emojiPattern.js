/*
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */


const tones = ['🏻', '🏼', '🏽', '🏾', '🏿'];
const ranges = [
  '\ud83c[\udf00-\udfff]',
  '\ud83d[\udc00-\ude4f]',
  '\ud83d[\ude80-\udeff]'
];

const pattern = new RegExp(`(?:${ranges.join('|')})(?:${tones.join('|')})?`, 'g');

export default pattern;
