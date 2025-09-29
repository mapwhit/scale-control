[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# @mapwhit/scale-control

Scale control that can be used with vector map renderer: a simplified version of the `ScaleControl` implemented in [mapbox-gl-js]

## Install

```sh
$ npm install --save @mapwhit/scale-control
```

## Usage

```js
import scaleControl from '@mapwhit/scale-control';

const scale = scaleControl({
  maxWidth: 150,
  unit: 'imperial'
 });

 map.addControl(scale);
 scale.setUnit('metric');
```

## License

MIT © [Damian Krzeminski](https://pirxpilot.me)

[mapbox-gl-js]: https://github.com/mapbox/mapbox-gl-js

[npm-image]: https://img.shields.io/npm/v/@mapwhit/scale-control
[npm-url]: https://npmjs.org/package/@mapwhit/scale-control

[build-url]: https://github.com/mapwhit/scale-control/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/mapwhit/scale-control/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/@mapwhit/scale-control
[deps-url]: https://libraries.io/npm/@mapwhit%2Fscale-control
