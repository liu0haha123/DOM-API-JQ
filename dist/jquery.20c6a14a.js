// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ZC2X":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//??????????????????????????????????????????????????????JS??????????????????????????????
//JQ????????????????????????????????????
window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  var elements;

  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") {
      // ??????????????????????????????div
      elements = [createElement(selectorOrArrayOrTemplate)];
    } else {
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }

  function createElement(string) {
    var container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  } // api ????????????elements


  var api = Object.create(jQuery.prototype); // ???????????????????????????????????? __proto__ ????????????????????????,??????API?????????????????????JQ?????????????????????????????????
  // ????????????

  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArrayOrTemplate.oldApi
  });
  return api;
};

jQuery.fn = jQuery.prototype = {
  // ??????????????????
  constructor: jQuery,
  jquery: true,
  each: function each(fn) {
    // ?????????????????????????????????
    for (var i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i);
    }

    return this;
  },
  get: function get(index) {
    // ?????????????????????
    return this.elements[index];
  },
  appendTo: function appendTo(node) {
    // ??????????????????????????????????????????JQ??????????????????????????????????????????????????????
    if (node instanceof Element) {
      this.each(function (ele) {
        node.appendChild(ele);
      });
    } else if (node.jquery === true) {
      this.each(function (ele) {
        node.get(0).appendChild(ele);
      });
    }
  },
  append: function append(children) {
    var _this = this;

    // ???????????????HTML?????????????????????????????????
    if (children instanceof Element) {
      this.get(0).appendChild(children);
    } else if (children instanceof HTMLCollection) {
      // ??????????????????HTML????????????????????????
      for (var i = 0; i < children, length; i++) {
        this.get(0).appendChild(children[i]);
      }
    } else if (children.jquery === true) {
      children.each(function (node) {
        return _this.get(0).appendChild(node);
      });
    }
  },
  find: function find(selector) {
    var array = [];

    for (var i = 0; i < this.elements.length; i++) {
      var elements2 = Array.from(this.elements[i].querySelectorAll(selector));
      array = array.concat(elements2);
    }

    array.oldApi = this; // this ?????? ??? api

    return jQuery(array);
  },
  parent: function parent() {
    var array = [];
    this.each(function (node) {
      // ?????????????????????????????????????????????JQ????????????????????????????????????
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode);
      }
    });
    return jQuery(array);
  },
  children: function children() {
    var array = [];
    this.each(function (node) {
      if (array.indexOf(node.parentNode) === -1) {
        array.push.apply(array, _toConsumableArray(node.children));
      }
    });
    return jQuery(array);
  },
  print: function print() {
    console.log(this.elements);
  },
  // ????????????????????????????????????
  addClass: function addClass(className) {
    for (var i = 0; i < this.elements.length; i++) {
      var element = this.elements[i];
      element.classList.add(className);
    }

    return this;
  },
  end: function end() {
    return this.oldApi; // this ????????? api
  }
};
},{}]},{},["ZC2X"], null)
//# sourceMappingURL=jquery.20c6a14a.js.map