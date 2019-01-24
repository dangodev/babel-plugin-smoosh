# babel-plugin-smoosh

Lets intellectuals use `Array.prototype.smoosh()` and
`Array.prototype.smooshMap()` instead of `Array.prototype.flat()` and
`Array.prototype.flatMap()`.

### Installation

```
npm i --save-dev babel-plugin-smoosh
```

Add the following to your `.babelrc` or `.babelrc.js` file:

```json
{
  "plugins": ["smoosh"]
}
```

### Usage

```js
const myArray = [1, 2, [3, 4]];
myArray.smoosh(); // [1, 2, 3, 4]
```

```js
const myArray = [1, 2, [3, 4];
myArray.smooshMap(x => [x * 2]) // [2, 4, 6, 8]
```
