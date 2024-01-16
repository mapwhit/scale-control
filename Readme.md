[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# map-scale-control

Scale control that can be used with vector map renderer: a simplified version of the `ScaleControl` implemented in [mapbox-gl-js]

## Install

```sh
$ npm install --save map-scale-control
```

## Usage

```js
var scaleControl = require('map-scale-control');

var scale = scaleControl({
  maxWidth: 150,
  unit: 'imperial'
 });

 map.addControl(scale);
 scale.setUnit('metric');
```

## License

MIT © [Damian Krzeminski](https://pirxpilot.me)

[npm-image]: https://img.shields.io/npm/v/map-scale-control
[npm-url]: https://npmjs.org/package/map-scale-control

[build-url]: https://github.com/furkot/map-scale-control/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/furkot/map-scale-control/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/map-scale-control
[deps-url]: https://libraries.io/npm/map-scale-control


[mapbox-gl-js]: https://github.com/mapbox/mapbox-gl-js
