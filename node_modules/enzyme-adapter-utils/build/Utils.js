Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRenderWrapper = exports.createMountWrapper = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.mapNativeEventNames = mapNativeEventNames;
exports.propFromEvent = propFromEvent;
exports.withSetStateAllowed = withSetStateAllowed;
exports.assertDomAvailable = assertDomAvailable;
exports.nodeTypeFromType = nodeTypeFromType;
exports.isArrayLike = isArrayLike;
exports.flatten = flatten;
exports.elementToTree = elementToTree;
exports.propsWithKeysAndRef = propsWithKeysAndRef;

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _createMountWrapper = require('./createMountWrapper');

var _createMountWrapper2 = _interopRequireDefault(_createMountWrapper);

var _createRenderWrapper = require('./createRenderWrapper');

var _createRenderWrapper2 = _interopRequireDefault(_createRenderWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.createMountWrapper = _createMountWrapper2['default'];
exports.createRenderWrapper = _createRenderWrapper2['default'];
function mapNativeEventNames(event) {
  var nativeToReactEventMap = {
    compositionend: 'compositionEnd',
    compositionstart: 'compositionStart',
    compositionupdate: 'compositionUpdate',
    keydown: 'keyDown',
    keyup: 'keyUp',
    keypress: 'keyPress',
    contextmenu: 'contextMenu',
    dblclick: 'doubleClick',
    doubleclick: 'doubleClick', // kept for legacy. TODO: remove with next major.
    dragend: 'dragEnd',
    dragenter: 'dragEnter',
    dragexist: 'dragExit',
    dragleave: 'dragLeave',
    dragover: 'dragOver',
    dragstart: 'dragStart',
    mousedown: 'mouseDown',
    mousemove: 'mouseMove',
    mouseout: 'mouseOut',
    mouseover: 'mouseOver',
    mouseup: 'mouseUp',
    touchcancel: 'touchCancel',
    touchend: 'touchEnd',
    touchmove: 'touchMove',
    touchstart: 'touchStart',
    canplay: 'canPlay',
    canplaythrough: 'canPlayThrough',
    durationchange: 'durationChange',
    loadeddata: 'loadedData',
    loadedmetadata: 'loadedMetadata',
    loadstart: 'loadStart',
    ratechange: 'rateChange',
    timeupdate: 'timeUpdate',
    volumechange: 'volumeChange',
    beforeinput: 'beforeInput',
    mouseenter: 'mouseEnter',
    mouseleave: 'mouseLeave'
  };

  return nativeToReactEventMap[event] || event;
}

// 'click' => 'onClick'
// 'mouseEnter' => 'onMouseEnter'
function propFromEvent(event) {
  var nativeEvent = mapNativeEventNames(event);
  return 'on' + String(nativeEvent[0].toUpperCase()) + String(nativeEvent.slice(1));
}

function withSetStateAllowed(fn) {
  // NOTE(lmr):
  // this is currently here to circumvent a React bug where `setState()` is
  // not allowed without global being defined.
  var cleanup = false;
  if (typeof global.document === 'undefined') {
    cleanup = true;
    global.document = {};
  }
  var result = fn();
  if (cleanup) {
    // This works around a bug in node/jest in that developers aren't able to
    // delete things from global when running in a node vm.
    global.document = undefined;
    delete global.document;
  }
  return result;
}

function assertDomAvailable(feature) {
  if (!global || !global.document || !global.document.createElement) {
    throw new Error('Enzyme\'s ' + String(feature) + ' expects a DOM environment to be loaded, but found none');
  }
}

function nodeTypeFromType(type) {
  if (typeof type === 'string') {
    return 'host';
  }
  if (type && type.prototype && type.prototype.isReactComponent) {
    return 'class';
  }
  return 'function';
}

function isIterable(obj) {
  return obj != null && typeof Symbol === 'function' && _typeof(Symbol.iterator) === 'symbol' && typeof obj[Symbol.iterator] === 'function';
}

function isArrayLike(obj) {
  return Array.isArray(obj) || isIterable(obj) && typeof obj !== 'string';
}

function flatten(arrs) {
  return arrs.reduce(function (flattened, item) {
    return flattened.concat(isArrayLike(item) ? flatten([].concat(_toConsumableArray(item))) : item);
  }, []);
}

function elementToTree(el) {
  if (el === null || (typeof el === 'undefined' ? 'undefined' : _typeof(el)) !== 'object' || !('type' in el)) {
    return el;
  }
  var type = el.type,
      props = el.props,
      key = el.key,
      ref = el.ref;
  var children = props.children;

  var rendered = null;
  if (isArrayLike(children)) {
    rendered = flatten([].concat(_toConsumableArray(children)), true).map(elementToTree);
  } else if (typeof children !== 'undefined') {
    rendered = elementToTree(children);
  }
  return {
    nodeType: nodeTypeFromType(type),
    type: type,
    props: props,
    key: key || undefined,
    ref: ref,
    instance: null,
    rendered: rendered
  };
}

function propsWithKeysAndRef(node) {
  if (node.ref !== null || node.key !== null) {
    return (0, _object2['default'])({}, node.props, {
      key: node.key,
      ref: node.ref
    });
  }
  return node.props;
}