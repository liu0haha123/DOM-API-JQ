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

//利用了构造函数的思想，不是常规意义中JS的构造函数，设计模式
//JQ对象指的是其构造出的对象
window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  var elements;

  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") {
      // 如果是标签形式就创建div
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
  } // api 可以操作elements


  var api = Object.create(jQuery.prototype); // 创建一个对象，这个对象的 __proto__ 为括号里面的东西,保证API中的函数储存在JQ对象的原型上，节约内存
  // 赋值操作

  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArrayOrTemplate.oldApi
  });
  return api;
};

jQuery.fn = jQuery.prototype = {
  // 保证构造函数
  constructor: jQuery,
  jquery: true,
  each: function each(fn) {
    // 遍历元素，调用回调函数
    for (var i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i);
    }

    return this;
  },
  get: function get(index) {
    // 按下标获取元素
    return this.elements[index];
  },
  appendTo: function appendTo(node) {
    // 如果是节点就直接插入，如果是JQ对象就先获取第一个元素作为节点再插入
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

    // 如果操作的HTML元素就直接找到节点插入
    if (children instanceof Element) {
      this.get(0).appendChild(children);
    } else if (children instanceof HTMLCollection) {
      // 如果插入的是HTML伪数组就逐个插入
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

    array.oldApi = this; // this 就是 旧 api

    return jQuery(array);
  },
  parent: function parent() {
    var array = [];
    this.each(function (node) {
      // 如果父节点不在数组中就插入，用JQ对象重新包装保证链式操作
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
  // 闭包：函数访问外部的变量
  addClass: function addClass(className) {
    for (var i = 0; i < this.elements.length; i++) {
      var element = this.elements[i];
      element.classList.add(className);
    }

    return this;
  },
  end: function end() {
    return this.oldApi; // this 就是新 api
  }
};
},{}]},{},["ZC2X"], null)
//# sourceMappingURL=jquery.20c6a14a.js.map