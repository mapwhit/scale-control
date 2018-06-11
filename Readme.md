[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]
[![Dev Dependency Status][deps-dev-image]][deps-dev-url]

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

[npm-image]: https://img.shields.io/npm/v/map-scale-control.svg
[npm-url]: https://npmjs.org/package/map-scale-control

[travis-url]: https://travis-ci.org/furkot/map-scale-control
[travis-image]: https://img.shields.io/travis/furkot/map-scale-control.svg

[deps-image]: https://img.shields.io/david/furkot/map-scale-control.svg
[deps-url]: https://david-dm.org/furkot/map-scale-control

[deps-dev-image]: https://img.shields.io/david/dev/furkot/map-scale-control.svg
[deps-dev-url]: https://david-dm.org/furkot/map-scale-control?type=dev

[mapbox-gl-js]: https://github.com/mapbox/mapbox-gl-js
