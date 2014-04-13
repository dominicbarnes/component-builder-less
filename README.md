component-builder-less
======================

A component (v1.0.0+ only) builder
[plugin](https://github.com/component/builder2.js/blob/master/docs/builders.md#plugins)
for LESS to CSS conversion.

## Installation

```bash
npm i --save component-builder-less
```

## Usage

```js
var less = require("component-builder-less");

builder.use("styles", less({
    // options for the LESS parser here, but you usually don't need any
}));
```
