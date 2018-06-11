var should = require('should');
var msc = require('../');

function dummyMap(document) {
  var lng = 0;

  function noop() {}

  function unproject() {
    lng += 1;
    return { lng: lng, lat: 30 };
  }

  function getContainer() {
    return document.querySelector('#map-container');
  }

  return {
    on: noop,
    off: noop,
    unproject: unproject,
    getContainer: getContainer
  };
}

describe('map-scale-control', function () {
  beforeEach(function () {
    document.body.innerHTML = '<div id="map-container"></div>';
    this.map = dummyMap(document);
  });

  it('must add and remove scale', function () {
    var scale = msc();
    var el = scale.onAdd(this.map);

    should.exist(el);
    el.className.should.be.eql('mapboxgl-ctrl mapboxgl-ctrl-scale');
    el.innerHTML.should.be.eql('50km');
    el.style.width.should.eql('52px');


    scale.setUnit('imperial');
    el.innerHTML.should.be.eql('50mi');
    el.style.width.should.eql('84px');

    scale.onRemove();

    should.not.exist(document.querySelector('mapboxgl-ctrl'));
  });


  it('must respect options', function () {
    var scale = msc({
      maxWidth: 200,
      unit: 'nautical'
    });
    var el = scale.onAdd(this.map);

    should.exist(el);
    el.className.should.be.eql('mapboxgl-ctrl mapboxgl-ctrl-scale');
    el.innerHTML.should.be.eql('50nm');
    el.style.width.should.eql('192px');


    scale.setUnit('metrical');
    el.innerHTML.should.be.eql('50km');
    el.style.width.should.eql('104px');

    scale.onRemove();
  });

});
