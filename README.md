Dialog Emoji
------------

Installation
------------

```
npm install --save @dlghq/emoji
```

Usage
-----

```js
import {
  categories,
  getEmojiByChar,
  getEmojiByName
} from '@dlghq/emoji';
import AppleEmojiImage from '@dlghq/emoji/lib/apple.png';

const { x, y } = getEmojiByName('smile');
```

API
---

```js
type Emoji = {
  char: string,
  name: ?string,
  x: number,
  y: number,
  variations?: string[]
};
```

`categories: { [name: string]: string[] }`

Object where key is the category name and value is array of emoji chars

---

`getEmojiByChar: (char: string) => ?Emoji`
Function which resolve char to emoji. Returns null if emoji not found.

---

`getEmojiByName: (name: string) => ?Emoji`
Function which resolve emoji by short name. Returns null if emoji not found.


License
-------
[Apache-2.0](LICENSE)
