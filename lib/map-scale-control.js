'use strict';

module.exports = scaleControl;


var CONVERSIONS = {
  metric: {
    factor: 1, unit: 'm',
    secondary: { factor: 1000, unit: 'km' }
  },
  imperial: {
    factor: 0.3048, unit: 'ft',
    secondary: { factor: 5280, unit: 'mi' }
  },
  nautical: { factor: 1852, unit: 'nm' }
};


/**
 * displays the ratio of a distance on the map to the corresponding distance on the ground.
 */
function scaleControl(options) {
  options = options || {};
  var maxWidth = options.maxWidth || 100;
  var unit = options.unit || 'metric';
  var map, el;

  function getDefaultPosition() {
    return 'bottom-left';
  }

  function appendElement(parent) {
    var div = document.createElement('div');
    div.className = 'mapboxgl-ctrl mapboxgl-ctrl-scale';
    parent.appendChild(div);
    return div;
  }

  function removeElement(el) {
    if (typeof el.remove === 'function') {
      el.remove();
    } else {
      el.parentNode.removeChild(el);
    }
  }

  function onAdd(_map) {
    map = _map;
    el = appendElement(map.getContainer());

    map.on('move', updateScale);
    updateScale();

    return el;
  }

  function onRemove() {
    removeElement(el);
    map.off('move', updateScale);
    map = undefined;
  }

  /**
   * Set the scale's unit of the distance
   *
   * @param unit Unit of the distance (`'imperial'`, `'metric'` or `'nautical'`).
   */
  function setUnit(_unit) {
      unit = _unit;
      updateScale();
  }

  function unproject(xy) {
    return map.unproject(xy);
  }

  function updateScale() {
    // A horizontal scale is imagined to be present at center of the map container with maximum length
    var y = map.getContainer().clientHeight / 2;
    var latlng1 = unproject([0, y]);
    var latlng2 = unproject([maxWidth, y]);
    var distance = getArcLen(latlng1.lat, latlng1.lng, latlng2.lng);

    var c = CONVERSIONS[unit] || CONVERSIONS.metric;
    var unitStr = c.unit;
    distance /= c.factor;
    if (c.secondary && distance > c.secondary.factor) {
      unitStr = c.secondary.unit;
      distance /= c.secondary.factor;
    }

    setScale(distance, unitStr);
  }

  function setScale(maxDistance, units) {
    var distance = getRoundNum(maxDistance);
    var ratio = distance / maxDistance;
    el.style.width = Math.round(maxWidth * ratio) + 'px';
    el.innerHTML = distance + units;
  }

  return {
    onAdd: onAdd,
    onRemove: onRemove,
    setUnit: setUnit,
    getDefaultPosition: getDefaultPosition
  };
}

var R = 6371000; // ~ Earh radius in meters
var EQUATOR_DEGREE_LEN = Math.PI * R / 180;

// len of a degree at lat === len of degree at equator multiplied by cos(lat)
function getArcLen(lat, lon1, lon2) {
  return EQUATOR_DEGREE_LEN * Math.cos(lat * Math.PI / 180) * (lon2 - lon1);
}

function getRoundNum(num) {
  var zeros = num.toFixed().length - 1;
  var pow10 = Math.pow(10, zeros);
  var d = num / pow10;

  d = d >= 10 ? 10 :
    d >= 5 ? 5 :
    d >= 3 ? 3 :
    d >= 2 ? 2 : 1;

  return pow10 * d;
}
