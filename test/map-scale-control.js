import { beforeEach, describe, it } from 'node:test';
import { JSDOM } from 'jsdom';

import msc from '../lib/map-scale-control.js';

const dom = new JSDOM('<div id="map-container"></div>');
globalThis.document = dom.window.document;

function dummyMap() {
  let lng = 0;

  function noop() {}

  function unproject() {
    lng += 1;
    return { lng, lat: 30 };
  }

  function getContainer() {
    return dom.window.document.querySelector('#map-container');
  }

  return {
    on: noop,
    off: noop,
    unproject,
    getContainer
  };
}

describe('map-scale-control', () => {
  let map;

  beforeEach(function () {
    map = dummyMap();
  });

  it('must add and remove scale', t => {
    const scale = msc();
    const el = scale.onAdd(map);

    t.assert.ok(el);
    t.assert.equal(el.className, 'mapboxgl-ctrl mapboxgl-ctrl-scale');
    t.assert.equal(el.innerHTML, '50km');
    t.assert.equal(el.style.width, '52px');

    scale.setUnit('imperial');
    t.assert.equal(el.innerHTML, '50mi');
    t.assert.equal(el.style.width, '84px');

    scale.onRemove();

    t.assert.ok(!document.querySelector('mapboxgl-ctrl'));
  });

  it('must respect options', t => {
    const scale = msc({
      maxWidth: 200,
      unit: 'nautical'
    });
    const el = scale.onAdd(map);

    t.assert.ok(el);
    t.assert.equal(el.className, 'mapboxgl-ctrl mapboxgl-ctrl-scale');
    t.assert.equal(el.innerHTML, '50nm');
    t.assert.equal(el.style.width, '192px');

    scale.setUnit('metrical');
    t.assert.equal(el.innerHTML, '50km');
    t.assert.equal(el.style.width, '104px');

    scale.onRemove();
  });
});
