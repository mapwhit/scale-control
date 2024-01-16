const { describe, it, beforeEach } = require('node:test');
const assert = require('assert/strict');
const msc = require('../');

function dummyMap(document) {
  let lng = 0;

  function noop() { }

  function unproject() {
    lng += 1;
    return { lng, lat: 30 };
  }

  function getContainer() {
    return document.querySelector('#map-container');
  }

  return {
    on: noop,
    off: noop,
    unproject,
    getContainer
  };
}

describe('map-scale-control', () => {
  beforeEach(function () {
    document.body.innerHTML = '<div id="map-container"></div>';
    this.map = dummyMap(document);
  });

  it('must add and remove scale', function () {
    const scale = msc();
    const el = scale.onAdd(this.map);

    assert(el);
    assert.equal(el.className, 'mapboxgl-ctrl mapboxgl-ctrl-scale');
    assert.equal(el.innerHTML, '50km');
    assert.equal(el.style.width, '52px');


    scale.setUnit('imperial');
    assert.equal(el.innerHTML, '50mi');
    assert.equal(el.style.width, '84px');

    scale.onRemove();

    assert(!document.querySelector('mapboxgl-ctrl'));
  });


  it('must respect options', function () {
    const scale = msc({
      maxWidth: 200,
      unit: 'nautical'
    });
    const el = scale.onAdd(this.map);

    assert(el);
    assert.equal(el.className, 'mapboxgl-ctrl mapboxgl-ctrl-scale');
    assert.equal(el.innerHTML, '50nm');
    assert.equal(el.style.width, '192px');


    scale.setUnit('metrical');
    assert.equal(el.innerHTML, '50km');
    assert.equal(el.style.width, '104px');

    scale.onRemove();
  });

});
