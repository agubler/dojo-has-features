/*!
 * 
 * [Dojo](https://dojo.io/)
 * Copyright [JS Foundation](https://js.foundation/) & contributors
 * [New BSD license](https://github.com/dojo/meta/blob/master/LICENSE)
 * All rights reserved
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("features", [], factory);
	else if(typeof exports === 'object')
		exports["features"] = factory();
	else
		root["features"] = factory();
})(this, function() {
return dojoWebpackJsonpfeatures(["main"],{

/***/ "./node_modules/@dojo/framework/core/Destroyable.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lang__ = __webpack_require__("./node_modules/@dojo/framework/core/lang.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shim_Promise__ = __webpack_require__("./node_modules/@dojo/framework/shim/Promise.mjs");


/**
 * No operation function to replace own once instance is destoryed
 */
function noop() {
    return __WEBPACK_IMPORTED_MODULE_1__shim_Promise__["a" /* default */].resolve(false);
}
/**
 * No op function used to replace own, once instance has been destoryed
 */
function destroyed() {
    throw new Error('Call made to destroyed method');
}
class Destroyable {
    /**
     * @constructor
     */
    constructor() {
        this.handles = [];
    }
    /**
     * Register handles for the instance that will be destroyed when `this.destroy` is called
     *
     * @param {Handle} handle The handle to add for the instance
     * @returns {Handle} a handle for the handle, removes the handle for the instance and calls destroy
     */
    own(handles) {
        const handle = Array.isArray(handles) ? Object(__WEBPACK_IMPORTED_MODULE_0__lang__["b" /* createCompositeHandle */])(...handles) : handles;
        const { handles: _handles } = this;
        _handles.push(handle);
        return {
            destroy() {
                _handles.splice(_handles.indexOf(handle));
                handle.destroy();
            }
        };
    }
    /**
     * Destrpys all handers registered for the instance
     *
     * @returns {Promise<any} a promise that resolves once all handles have been destroyed
     */
    destroy() {
        return new __WEBPACK_IMPORTED_MODULE_1__shim_Promise__["a" /* default */]((resolve) => {
            this.handles.forEach((handle) => {
                handle && handle.destroy && handle.destroy();
            });
            this.destroy = noop;
            this.own = destroyed;
            resolve(true);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Destroyable;

/* unused harmony default export */ var _unused_webpack_default_export = (Destroyable);


/***/ }),

/***/ "./node_modules/@dojo/framework/core/Evented.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isGlobMatch */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shim_Map__ = __webpack_require__("./node_modules/@dojo/framework/shim/Map.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Destroyable__ = __webpack_require__("./node_modules/@dojo/framework/core/Destroyable.mjs");


/**
 * Map of computed regular expressions, keyed by string
 */
const regexMap = new __WEBPACK_IMPORTED_MODULE_0__shim_Map__["b" /* default */]();
/**
 * Determines is the event type glob has been matched
 *
 * @returns boolean that indicates if the glob is matched
 */
function isGlobMatch(globString, targetString) {
    if (typeof targetString === 'string' && typeof globString === 'string' && globString.indexOf('*') !== -1) {
        let regex;
        if (regexMap.has(globString)) {
            regex = regexMap.get(globString);
        }
        else {
            regex = new RegExp(`^${globString.replace(/\*/g, '.*')}$`);
            regexMap.set(globString, regex);
        }
        return regex.test(targetString);
    }
    else {
        return globString === targetString;
    }
}
/**
 * Event Class
 */
class Evented extends __WEBPACK_IMPORTED_MODULE_1__Destroyable__["a" /* Destroyable */] {
    constructor() {
        super(...arguments);
        /**
         * map of listeners keyed by event type
         */
        this.listenersMap = new __WEBPACK_IMPORTED_MODULE_0__shim_Map__["b" /* default */]();
    }
    emit(event) {
        this.listenersMap.forEach((methods, type) => {
            if (isGlobMatch(type, event.type)) {
                [...methods].forEach((method) => {
                    method.call(this, event);
                });
            }
        });
    }
    on(type, listener) {
        if (Array.isArray(listener)) {
            const handles = listener.map((listener) => this._addListener(type, listener));
            return {
                destroy() {
                    handles.forEach((handle) => handle.destroy());
                }
            };
        }
        return this._addListener(type, listener);
    }
    _addListener(type, listener) {
        const listeners = this.listenersMap.get(type) || [];
        listeners.push(listener);
        this.listenersMap.set(type, listeners);
        return {
            destroy: () => {
                const listeners = this.listenersMap.get(type) || [];
                listeners.splice(listeners.indexOf(listener), 1);
            }
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Evented;

/* unused harmony default export */ var _unused_webpack_default_export = (Evented);


/***/ }),

/***/ "./node_modules/@dojo/framework/core/has.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shim_global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shim_support_has__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/has.mjs");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "testCache", function() { return __WEBPACK_IMPORTED_MODULE_1__shim_support_has__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "testFunctions", function() { return __WEBPACK_IMPORTED_MODULE_1__shim_support_has__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "load", function() { return __WEBPACK_IMPORTED_MODULE_1__shim_support_has__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return __WEBPACK_IMPORTED_MODULE_1__shim_support_has__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "exists", function() { return __WEBPACK_IMPORTED_MODULE_1__shim_support_has__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "add", function() { return __WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a"]; });



/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["b" /* default */]);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('object-assign', typeof __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].Object.assign === 'function', true);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('arraybuffer', typeof __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].ArrayBuffer !== 'undefined', true);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('formdata', typeof __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].FormData !== 'undefined', true);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('filereader', typeof __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].FileReader !== 'undefined', true);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('xhr', typeof __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].XMLHttpRequest !== 'undefined', true);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('xhr2', true && 'responseType' in __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].XMLHttpRequest.prototype, true);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('blob', function () {
    if (false) {
        return false;
    }
    const request = new __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].XMLHttpRequest();
    request.open('GET', __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].location.protocol + '//www.google.com', true);
    request.responseType = 'blob';
    request.abort();
    return request.responseType === 'blob';
}, true);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('node-buffer', 'Buffer' in __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */] && typeof __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].Buffer === 'function', true);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('fetch', 'fetch' in __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */] && typeof __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].fetch === 'function', true);
Object(__WEBPACK_IMPORTED_MODULE_1__shim_support_has__["a" /* add */])('web-worker-xhr-upload', typeof __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].Promise !== 'undefined' &&
    new Promise((resolve) => {
        try {
            if (__WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].Worker !== undefined && __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].URL && __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].URL.createObjectURL) {
                const blob = new Blob([
                    `(function () {
self.addEventListener('message', function () {
	var xhr = new XMLHttpRequest();
	try {
		xhr.upload;
		postMessage('true');
	} catch (e) {
		postMessage('false');
	}
});
		})()`
                ], { type: 'application/javascript' });
                const worker = new Worker(URL.createObjectURL(blob));
                worker.addEventListener('message', ({ data: result }) => {
                    resolve(result === 'true');
                });
                worker.postMessage({});
            }
            else {
                resolve(false);
            }
        }
        catch (e) {
            // IE11 on Winodws 8.1 encounters a security error.
            resolve(false);
        }
    }), true);


/***/ }),

/***/ "./node_modules/@dojo/framework/core/lang.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export create */
/* unused harmony export deepAssign */
/* unused harmony export deepMixin */
/* unused harmony export duplicate */
/* unused harmony export isIdentical */
/* unused harmony export lateBind */
/* unused harmony export mixin */
/* unused harmony export partial */
/* unused harmony export createHandle */
/* harmony export (immutable) */ __webpack_exports__["b"] = createCompositeHandle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shim_object__ = __webpack_require__("./node_modules/@dojo/framework/shim/object.mjs");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__shim_object__["a"]; });


const slice = Array.prototype.slice;
const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Type guard that ensures that the value can be coerced to Object
 * to weed out host objects that do not derive from Object.
 * This function is used to check if we want to deep copy an object or not.
 * Note: In ES6 it is possible to modify an object's Symbol.toStringTag property, which will
 * change the value returned by `toString`. This is a rare edge case that is difficult to handle,
 * so it is not handled here.
 * @param  value The value to check
 * @return       If the value is coercible into an Object
 */
function shouldDeepCopyObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}
function copyArray(array, inherited) {
    return array.map(function (item) {
        if (Array.isArray(item)) {
            return copyArray(item, inherited);
        }
        return !shouldDeepCopyObject(item)
            ? item
            : _mixin({
                deep: true,
                inherited: inherited,
                sources: [item],
                target: {}
            });
    });
}
function _mixin(kwArgs) {
    const deep = kwArgs.deep;
    const inherited = kwArgs.inherited;
    const target = kwArgs.target;
    const copied = kwArgs.copied || [];
    const copiedClone = [...copied];
    for (let i = 0; i < kwArgs.sources.length; i++) {
        const source = kwArgs.sources[i];
        if (source === null || source === undefined) {
            continue;
        }
        for (let key in source) {
            if (inherited || hasOwnProperty.call(source, key)) {
                let value = source[key];
                if (copiedClone.indexOf(value) !== -1) {
                    continue;
                }
                if (deep) {
                    if (Array.isArray(value)) {
                        value = copyArray(value, inherited);
                    }
                    else if (shouldDeepCopyObject(value)) {
                        const targetValue = target[key] || {};
                        copied.push(source);
                        value = _mixin({
                            deep: true,
                            inherited: inherited,
                            sources: [value],
                            target: targetValue,
                            copied
                        });
                    }
                }
                target[key] = value;
            }
        }
    }
    return target;
}
function create(prototype, ...mixins) {
    if (!mixins.length) {
        throw new RangeError('lang.create requires at least one mixin object.');
    }
    const args = mixins.slice();
    args.unshift(Object.create(prototype));
    return __WEBPACK_IMPORTED_MODULE_0__shim_object__["a" /* assign */].apply(null, args);
}
function deepAssign(target, ...sources) {
    return _mixin({
        deep: true,
        inherited: false,
        sources: sources,
        target: target
    });
}
function deepMixin(target, ...sources) {
    return _mixin({
        deep: true,
        inherited: true,
        sources: sources,
        target: target
    });
}
/**
 * Creates a new object using the provided source's prototype as the prototype for the new object, and then
 * deep copies the provided source's values into the new target.
 *
 * @param source The object to duplicate
 * @return The new object
 */
function duplicate(source) {
    const target = Object.create(Object.getPrototypeOf(source));
    return deepMixin(target, source);
}
/**
 * Determines whether two values are the same value.
 *
 * @param a First value to compare
 * @param b Second value to compare
 * @return true if the values are the same; false otherwise
 */
function isIdentical(a, b) {
    return (a === b ||
        /* both values are NaN */
        (a !== a && b !== b));
}
/**
 * Returns a function that binds a method to the specified object at runtime. This is similar to
 * `Function.prototype.bind`, but instead of a function it takes the name of a method on an object.
 * As a result, the function returned by `lateBind` will always call the function currently assigned to
 * the specified property on the object as of the moment the function it returns is called.
 *
 * @param instance The context object
 * @param method The name of the method on the context object to bind to itself
 * @param suppliedArgs An optional array of values to prepend to the `instance[method]` arguments list
 * @return The bound function
 */
function lateBind(instance, method, ...suppliedArgs) {
    return suppliedArgs.length
        ? function () {
            const args = arguments.length ? suppliedArgs.concat(slice.call(arguments)) : suppliedArgs;
            // TS7017
            return instance[method].apply(instance, args);
        }
        : function () {
            // TS7017
            return instance[method].apply(instance, arguments);
        };
}
function mixin(target, ...sources) {
    return _mixin({
        deep: false,
        inherited: true,
        sources: sources,
        target: target
    });
}
/**
 * Returns a function which invokes the given function with the given arguments prepended to its argument list.
 * Like `Function.prototype.bind`, but does not alter execution context.
 *
 * @param targetFunction The function that needs to be bound
 * @param suppliedArgs An optional array of arguments to prepend to the `targetFunction` arguments list
 * @return The bound function
 */
function partial(targetFunction, ...suppliedArgs) {
    return function () {
        const args = arguments.length ? suppliedArgs.concat(slice.call(arguments)) : suppliedArgs;
        return targetFunction.apply(this, args);
    };
}
/**
 * Returns an object with a destroy method that, when called, calls the passed-in destructor.
 * This is intended to provide a unified interface for creating "remove" / "destroy" handlers for
 * event listeners, timers, etc.
 *
 * @param destructor A function that will be called when the handle's `destroy` method is invoked
 * @return The handle object
 */
function createHandle(destructor) {
    let called = false;
    return {
        destroy: function () {
            if (!called) {
                called = true;
                destructor();
            }
        }
    };
}
/**
 * Returns a single handle that can be used to destroy multiple handles simultaneously.
 *
 * @param handles An array of handles with `destroy` methods
 * @return The handle object
 */
function createCompositeHandle(...handles) {
    return createHandle(function () {
        for (let i = 0; i < handles.length; i++) {
            handles[i].destroy();
        }
    });
}


/***/ }),

/***/ "./node_modules/@dojo/framework/has/has.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {/* harmony export (immutable) */ __webpack_exports__["d"] = load;
/* harmony export (immutable) */ __webpack_exports__["e"] = normalize;
/* harmony export (immutable) */ __webpack_exports__["c"] = exists;
/* harmony export (immutable) */ __webpack_exports__["a"] = add;
/* harmony export (immutable) */ __webpack_exports__["b"] = has;
function isFeatureTestThenable(value) {
    return value && value.then;
}
/**
 * A cache of results of feature tests
 */
const testCache = {};
/* harmony export (immutable) */ __webpack_exports__["f"] = testCache;

/**
 * A cache of the un-resolved feature tests
 */
const testFunctions = {};
/* harmony export (immutable) */ __webpack_exports__["g"] = testFunctions;

/**
 * A cache of unresolved thenables (probably promises)
 * @type {{}}
 */
const testThenables = {};
/**
 * A reference to the global scope (`window` in a browser, `global` in NodeJS)
 */
const globalScope = (function () {
    /* istanbul ignore else */
    if (typeof window !== 'undefined') {
        // Browsers
        return window;
    }
    else if (typeof global !== 'undefined') {
        // Node
        return global;
    }
    else if (typeof self !== 'undefined') {
        // Web workers
        return self;
    }
    /* istanbul ignore next */
    return {};
})();
/* Grab the staticFeatures if there are available */
const { staticFeatures } = globalScope.DojoHasEnvironment || {};
/* Cleaning up the DojoHasEnviornment */
if ('DojoHasEnvironment' in globalScope) {
    delete globalScope.DojoHasEnvironment;
}
/**
 * Custom type guard to narrow the `staticFeatures` to either a map or a function that
 * returns a map.
 *
 * @param value The value to guard for
 */
function isStaticFeatureFunction(value) {
    return typeof value === 'function';
}
/**
 * The cache of asserted features that were available in the global scope when the
 * module loaded
 */
const staticCache = staticFeatures
    ? isStaticFeatureFunction(staticFeatures)
        ? staticFeatures.apply(globalScope)
        : staticFeatures
    : {}; /* Providing an empty cache, if none was in the environment

/**
* AMD plugin function.
*
* Conditional loads modules based on a has feature test value.
*
* @param resourceId Gives the resolved module id to load.
* @param require The loader require function with respect to the module that contained the plugin resource in its
*                dependency list.
* @param load Callback to loader that consumes result of plugin demand.
*/
function load(resourceId, require, load, config) {
    resourceId ? require([resourceId], load) : load();
}
/**
 * AMD plugin function.
 *
 * Resolves resourceId into a module id based on possibly-nested tenary expression that branches on has feature test
 * value(s).
 *
 * @param resourceId The id of the module
 * @param normalize Resolves a relative module id into an absolute module id
 */
function normalize(resourceId, normalize) {
    const tokens = resourceId.match(/[\?:]|[^:\?]*/g) || [];
    let i = 0;
    function get(skip) {
        const term = tokens[i++];
        if (term === ':') {
            // empty string module name, resolves to null
            return null;
        }
        else {
            // postfixed with a ? means it is a feature to branch on, the term is the name of the feature
            if (tokens[i++] === '?') {
                if (!skip && has(term)) {
                    // matched the feature, get the first value from the options
                    return get();
                }
                else {
                    // did not match, get the second value, passing over the first
                    get(true);
                    return get(skip);
                }
            }
            // a module
            return term;
        }
    }
    const id = get();
    return id && normalize(id);
}
/**
 * Check if a feature has already been registered
 *
 * @param feature the name of the feature
 */
function exists(feature) {
    const normalizedFeature = feature.toLowerCase();
    return Boolean(normalizedFeature in staticCache || normalizedFeature in testCache || testFunctions[normalizedFeature]);
}
/**
 * Register a new test for a named feature.
 *
 * @example
 * has.add('dom-addeventlistener', !!document.addEventListener);
 *
 * @example
 * has.add('touch-events', function () {
 *    return 'ontouchstart' in document
 * });
 *
 * @param feature the name of the feature
 * @param value the value reported of the feature, or a function that will be executed once on first test
 * @param overwrite if an existing value should be overwritten. Defaults to false.
 */
function add(feature, value, overwrite = false) {
    const normalizedFeature = feature.toLowerCase();
    if (exists(normalizedFeature) && !overwrite && !(normalizedFeature in staticCache)) {
        throw new TypeError(`Feature "${feature}" exists and overwrite not true.`);
    }
    if (typeof value === 'function') {
        testFunctions[normalizedFeature] = value;
    }
    else if (isFeatureTestThenable(value)) {
        testThenables[feature] = value.then((resolvedValue) => {
            testCache[feature] = resolvedValue;
            delete testThenables[feature];
        }, () => {
            delete testThenables[feature];
        });
    }
    else {
        testCache[normalizedFeature] = value;
        delete testFunctions[normalizedFeature];
    }
}
/**
 * Return the current value of a named feature.
 *
 * @param feature The name (if a string) or identifier (if an integer) of the feature to test.
 */
function has(feature) {
    let result;
    const normalizedFeature = feature.toLowerCase();
    if (normalizedFeature in staticCache) {
        result = staticCache[normalizedFeature];
    }
    else if (testFunctions[normalizedFeature]) {
        result = testCache[normalizedFeature] = testFunctions[normalizedFeature].call(null);
        delete testFunctions[normalizedFeature];
    }
    else if (normalizedFeature in testCache) {
        result = testCache[normalizedFeature];
    }
    else if (feature in testThenables) {
        return false;
    }
    else {
        throw new TypeError(`Attempt to detect unregistered has feature "${feature}"`);
    }
    return result;
}
/*
 * Out of the box feature tests
 */
/* Environments */
/* Used as a value to provide a debug only code path */
add('debug', true);
/* Detects if the environment is "browser like" */
add('host-browser', typeof document !== 'undefined' && typeof location !== 'undefined');
/* Detects if the environment appears to be NodeJS */
add('host-node', function () {
    if (typeof process === 'object' && process.versions && process.versions.node) {
        return process.versions.node;
    }
});

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/global.js"), __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/@dojo/framework/shim/Map.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Map; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iterator__ = __webpack_require__("./node_modules/@dojo/framework/shim/iterator.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__object__ = __webpack_require__("./node_modules/@dojo/framework/shim/object.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__support_has__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/has.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Symbol__ = __webpack_require__("./node_modules/@dojo/framework/shim/Symbol.mjs");





let Map = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Map;
if (false) {
    Map = (_a = class Map {
            constructor(iterable) {
                this._keys = [];
                this._values = [];
                this[Symbol.toStringTag] = 'Map';
                if (iterable) {
                    if (isArrayLike(iterable)) {
                        for (let i = 0; i < iterable.length; i++) {
                            const value = iterable[i];
                            this.set(value[0], value[1]);
                        }
                    }
                    else {
                        for (const value of iterable) {
                            this.set(value[0], value[1]);
                        }
                    }
                }
            }
            /**
             * An alternative to Array.prototype.indexOf using Object.is
             * to check for equality. See http://mzl.la/1zuKO2V
             */
            _indexOfKey(keys, key) {
                for (let i = 0, length = keys.length; i < length; i++) {
                    if (objectIs(keys[i], key)) {
                        return i;
                    }
                }
                return -1;
            }
            get size() {
                return this._keys.length;
            }
            clear() {
                this._keys.length = this._values.length = 0;
            }
            delete(key) {
                const index = this._indexOfKey(this._keys, key);
                if (index < 0) {
                    return false;
                }
                this._keys.splice(index, 1);
                this._values.splice(index, 1);
                return true;
            }
            entries() {
                const values = this._keys.map((key, i) => {
                    return [key, this._values[i]];
                });
                return new ShimIterator(values);
            }
            forEach(callback, context) {
                const keys = this._keys;
                const values = this._values;
                for (let i = 0, length = keys.length; i < length; i++) {
                    callback.call(context, values[i], keys[i], this);
                }
            }
            get(key) {
                const index = this._indexOfKey(this._keys, key);
                return index < 0 ? undefined : this._values[index];
            }
            has(key) {
                return this._indexOfKey(this._keys, key) > -1;
            }
            keys() {
                return new ShimIterator(this._keys);
            }
            set(key, value) {
                let index = this._indexOfKey(this._keys, key);
                index = index < 0 ? this._keys.length : index;
                this._keys[index] = key;
                this._values[index] = value;
                return this;
            }
            values() {
                return new ShimIterator(this._values);
            }
            [Symbol.iterator]() {
                return this.entries();
            }
        },
        _a[Symbol.species] = _a,
        _a);
}
/* harmony default export */ __webpack_exports__["b"] = (Map);
var _a;


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/Promise.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ShimPromise */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__support_queue__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/queue.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Symbol__ = __webpack_require__("./node_modules/@dojo/framework/shim/Symbol.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__support_has__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/has.mjs");




let ShimPromise = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Promise;
const isThenable = function isThenable(value) {
    return value && typeof value.then === 'function';
};
/* unused harmony export isThenable */

if (false) {
    global.Promise = ShimPromise = (_a = class Promise {
            /**
             * Creates a new Promise.
             *
             * @constructor
             *
             * @param executor
             * The executor function is called immediately when the Promise is instantiated. It is responsible for
             * starting the asynchronous operation when it is invoked.
             *
             * The executor must call either the passed `resolve` function when the asynchronous operation has completed
             * successfully, or the `reject` function when the operation fails.
             */
            constructor(executor) {
                /**
                 * The current state of this promise.
                 */
                this.state = 1 /* Pending */;
                this[Symbol.toStringTag] = 'Promise';
                /**
                 * If true, the resolution of this promise is chained ("locked in") to another promise.
                 */
                let isChained = false;
                /**
                 * Whether or not this promise is in a resolved state.
                 */
                const isResolved = () => {
                    return this.state !== 1 /* Pending */ || isChained;
                };
                /**
                 * Callbacks that should be invoked once the asynchronous operation has completed.
                 */
                let callbacks = [];
                /**
                 * Initially pushes callbacks onto a queue for execution once this promise settles. After the promise settles,
                 * enqueues callbacks for execution on the next event loop turn.
                 */
                let whenFinished = function (callback) {
                    if (callbacks) {
                        callbacks.push(callback);
                    }
                };
                /**
                 * Settles this promise.
                 *
                 * @param newState The resolved state for this promise.
                 * @param {T|any} value The resolved value for this promise.
                 */
                const settle = (newState, value) => {
                    // A promise can only be settled once.
                    if (this.state !== 1 /* Pending */) {
                        return;
                    }
                    this.state = newState;
                    this.resolvedValue = value;
                    whenFinished = queueMicroTask;
                    // Only enqueue a callback runner if there are callbacks so that initially fulfilled Promises don't have to
                    // wait an extra turn.
                    if (callbacks && callbacks.length > 0) {
                        queueMicroTask(function () {
                            if (callbacks) {
                                let count = callbacks.length;
                                for (let i = 0; i < count; ++i) {
                                    callbacks[i].call(null);
                                }
                                callbacks = null;
                            }
                        });
                    }
                };
                /**
                 * Resolves this promise.
                 *
                 * @param newState The resolved state for this promise.
                 * @param {T|any} value The resolved value for this promise.
                 */
                const resolve = (newState, value) => {
                    if (isResolved()) {
                        return;
                    }
                    if (isThenable(value)) {
                        value.then(settle.bind(null, 0 /* Fulfilled */), settle.bind(null, 2 /* Rejected */));
                        isChained = true;
                    }
                    else {
                        settle(newState, value);
                    }
                };
                this.then = (onFulfilled, onRejected) => {
                    return new Promise((resolve, reject) => {
                        // whenFinished initially queues up callbacks for execution after the promise has settled. Once the
                        // promise has settled, whenFinished will schedule callbacks for execution on the next turn through the
                        // event loop.
                        whenFinished(() => {
                            const callback = this.state === 2 /* Rejected */ ? onRejected : onFulfilled;
                            if (typeof callback === 'function') {
                                try {
                                    resolve(callback(this.resolvedValue));
                                }
                                catch (error) {
                                    reject(error);
                                }
                            }
                            else if (this.state === 2 /* Rejected */) {
                                reject(this.resolvedValue);
                            }
                            else {
                                resolve(this.resolvedValue);
                            }
                        });
                    });
                };
                try {
                    executor(resolve.bind(null, 0 /* Fulfilled */), resolve.bind(null, 2 /* Rejected */));
                }
                catch (error) {
                    settle(2 /* Rejected */, error);
                }
            }
            static all(iterable) {
                return new this(function (resolve, reject) {
                    const values = [];
                    let complete = 0;
                    let total = 0;
                    let populating = true;
                    function fulfill(index, value) {
                        values[index] = value;
                        ++complete;
                        finish();
                    }
                    function finish() {
                        if (populating || complete < total) {
                            return;
                        }
                        resolve(values);
                    }
                    function processItem(index, item) {
                        ++total;
                        if (isThenable(item)) {
                            // If an item Promise rejects, this Promise is immediately rejected with the item
                            // Promise's rejection error.
                            item.then(fulfill.bind(null, index), reject);
                        }
                        else {
                            Promise.resolve(item).then(fulfill.bind(null, index));
                        }
                    }
                    let i = 0;
                    for (const value of iterable) {
                        processItem(i, value);
                        i++;
                    }
                    populating = false;
                    finish();
                });
            }
            static race(iterable) {
                return new this(function (resolve, reject) {
                    for (const item of iterable) {
                        if (item instanceof Promise) {
                            // If a Promise item rejects, this Promise is immediately rejected with the item
                            // Promise's rejection error.
                            item.then(resolve, reject);
                        }
                        else {
                            Promise.resolve(item).then(resolve);
                        }
                    }
                });
            }
            static reject(reason) {
                return new this(function (resolve, reject) {
                    reject(reason);
                });
            }
            static resolve(value) {
                return new this(function (resolve) {
                    resolve(value);
                });
            }
            catch(onRejected) {
                return this.then(undefined, onRejected);
            }
        },
        _a[Symbol.species] = ShimPromise,
        _a);
}
/* harmony default export */ __webpack_exports__["a"] = (ShimPromise);
var _a;


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/Symbol.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Symbol */
/* unused harmony export isSymbol */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__support_has__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/has.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__support_util__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/util.mjs");



let Symbol = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Symbol;
if (false) {
    /**
     * Throws if the value is not a symbol, used internally within the Shim
     * @param  {any}    value The value to check
     * @return {symbol}       Returns the symbol or throws
     */
    const validateSymbol = function validateSymbol(value) {
        if (!isSymbol(value)) {
            throw new TypeError(value + ' is not a symbol');
        }
        return value;
    };
    const defineProperties = Object.defineProperties;
    const defineProperty = Object.defineProperty;
    const create = Object.create;
    const objPrototype = Object.prototype;
    const globalSymbols = {};
    const getSymbolName = (function () {
        const created = create(null);
        return function (desc) {
            let postfix = 0;
            let name;
            while (created[String(desc) + (postfix || '')]) {
                ++postfix;
            }
            desc += String(postfix || '');
            created[desc] = true;
            name = '@@' + desc;
            // FIXME: Temporary guard until the duplicate execution when testing can be
            // pinned down.
            if (!Object.getOwnPropertyDescriptor(objPrototype, name)) {
                defineProperty(objPrototype, name, {
                    set: function (value) {
                        defineProperty(this, name, getValueDescriptor(value));
                    }
                });
            }
            return name;
        };
    })();
    const InternalSymbol = function Symbol(description) {
        if (this instanceof InternalSymbol) {
            throw new TypeError('TypeError: Symbol is not a constructor');
        }
        return Symbol(description);
    };
    Symbol = global.Symbol = function Symbol(description) {
        if (this instanceof Symbol) {
            throw new TypeError('TypeError: Symbol is not a constructor');
        }
        const sym = Object.create(InternalSymbol.prototype);
        description = description === undefined ? '' : String(description);
        return defineProperties(sym, {
            __description__: getValueDescriptor(description),
            __name__: getValueDescriptor(getSymbolName(description))
        });
    };
    /* Decorate the Symbol function with the appropriate properties */
    defineProperty(Symbol, 'for', getValueDescriptor(function (key) {
        if (globalSymbols[key]) {
            return globalSymbols[key];
        }
        return (globalSymbols[key] = Symbol(String(key)));
    }));
    defineProperties(Symbol, {
        keyFor: getValueDescriptor(function (sym) {
            let key;
            validateSymbol(sym);
            for (key in globalSymbols) {
                if (globalSymbols[key] === sym) {
                    return key;
                }
            }
        }),
        hasInstance: getValueDescriptor(Symbol.for('hasInstance'), false, false),
        isConcatSpreadable: getValueDescriptor(Symbol.for('isConcatSpreadable'), false, false),
        iterator: getValueDescriptor(Symbol.for('iterator'), false, false),
        match: getValueDescriptor(Symbol.for('match'), false, false),
        observable: getValueDescriptor(Symbol.for('observable'), false, false),
        replace: getValueDescriptor(Symbol.for('replace'), false, false),
        search: getValueDescriptor(Symbol.for('search'), false, false),
        species: getValueDescriptor(Symbol.for('species'), false, false),
        split: getValueDescriptor(Symbol.for('split'), false, false),
        toPrimitive: getValueDescriptor(Symbol.for('toPrimitive'), false, false),
        toStringTag: getValueDescriptor(Symbol.for('toStringTag'), false, false),
        unscopables: getValueDescriptor(Symbol.for('unscopables'), false, false)
    });
    /* Decorate the InternalSymbol object */
    defineProperties(InternalSymbol.prototype, {
        constructor: getValueDescriptor(Symbol),
        toString: getValueDescriptor(function () {
            return this.__name__;
        }, false, false)
    });
    /* Decorate the Symbol.prototype */
    defineProperties(Symbol.prototype, {
        toString: getValueDescriptor(function () {
            return 'Symbol (' + validateSymbol(this).__description__ + ')';
        }),
        valueOf: getValueDescriptor(function () {
            return validateSymbol(this);
        })
    });
    defineProperty(Symbol.prototype, Symbol.toPrimitive, getValueDescriptor(function () {
        return validateSymbol(this);
    }));
    defineProperty(Symbol.prototype, Symbol.toStringTag, getValueDescriptor('Symbol', false, false, true));
    defineProperty(InternalSymbol.prototype, Symbol.toPrimitive, getValueDescriptor(Symbol.prototype[Symbol.toPrimitive], false, false, true));
    defineProperty(InternalSymbol.prototype, Symbol.toStringTag, getValueDescriptor(Symbol.prototype[Symbol.toStringTag], false, false, true));
}
/**
 * A custom guard function that determines if an object is a symbol or not
 * @param  {any}       value The value to check to see if it is a symbol or not
 * @return {is symbol}       Returns true if a symbol or not (and narrows the type guard)
 */
function isSymbol(value) {
    return (value && (typeof value === 'symbol' || value['@@toStringTag'] === 'Symbol')) || false;
}
/**
 * Fill any missing well known symbols if the native Symbol is missing them
 */
[
    'hasInstance',
    'isConcatSpreadable',
    'iterator',
    'species',
    'replace',
    'search',
    'split',
    'match',
    'toPrimitive',
    'toStringTag',
    'unscopables',
    'observable'
].forEach((wellKnown) => {
    if (!Symbol[wellKnown]) {
        Object.defineProperty(Symbol, wellKnown, Object(__WEBPACK_IMPORTED_MODULE_2__support_util__["a" /* getValueDescriptor */])(Symbol.for(wellKnown), false, false));
    }
});
/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/WeakMap.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export WeakMap */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iterator__ = __webpack_require__("./node_modules/@dojo/framework/shim/iterator.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__support_has__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/has.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Symbol__ = __webpack_require__("./node_modules/@dojo/framework/shim/Symbol.mjs");




let WeakMap = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].WeakMap;
if (false) {
    const DELETED = {};
    const getUID = function getUID() {
        return Math.floor(Math.random() * 100000000);
    };
    const generateName = (function () {
        let startId = Math.floor(Date.now() % 100000000);
        return function generateName() {
            return '__wm' + getUID() + (startId++ + '__');
        };
    })();
    WeakMap = class WeakMap {
        constructor(iterable) {
            this[Symbol.toStringTag] = 'WeakMap';
            this._name = generateName();
            this._frozenEntries = [];
            if (iterable) {
                if (isArrayLike(iterable)) {
                    for (let i = 0; i < iterable.length; i++) {
                        const item = iterable[i];
                        this.set(item[0], item[1]);
                    }
                }
                else {
                    for (const [key, value] of iterable) {
                        this.set(key, value);
                    }
                }
            }
        }
        _getFrozenEntryIndex(key) {
            for (let i = 0; i < this._frozenEntries.length; i++) {
                if (this._frozenEntries[i].key === key) {
                    return i;
                }
            }
            return -1;
        }
        delete(key) {
            if (key === undefined || key === null) {
                return false;
            }
            const entry = key[this._name];
            if (entry && entry.key === key && entry.value !== DELETED) {
                entry.value = DELETED;
                return true;
            }
            const frozenIndex = this._getFrozenEntryIndex(key);
            if (frozenIndex >= 0) {
                this._frozenEntries.splice(frozenIndex, 1);
                return true;
            }
            return false;
        }
        get(key) {
            if (key === undefined || key === null) {
                return undefined;
            }
            const entry = key[this._name];
            if (entry && entry.key === key && entry.value !== DELETED) {
                return entry.value;
            }
            const frozenIndex = this._getFrozenEntryIndex(key);
            if (frozenIndex >= 0) {
                return this._frozenEntries[frozenIndex].value;
            }
        }
        has(key) {
            if (key === undefined || key === null) {
                return false;
            }
            const entry = key[this._name];
            if (Boolean(entry && entry.key === key && entry.value !== DELETED)) {
                return true;
            }
            const frozenIndex = this._getFrozenEntryIndex(key);
            if (frozenIndex >= 0) {
                return true;
            }
            return false;
        }
        set(key, value) {
            if (!key || (typeof key !== 'object' && typeof key !== 'function')) {
                throw new TypeError('Invalid value used as weak map key');
            }
            let entry = key[this._name];
            if (!entry || entry.key !== key) {
                entry = Object.create(null, {
                    key: { value: key }
                });
                if (Object.isFrozen(key)) {
                    this._frozenEntries.push(entry);
                }
                else {
                    Object.defineProperty(key, this._name, {
                        value: entry
                    });
                }
            }
            entry.value = value;
            return this;
        }
    };
}
/* harmony default export */ __webpack_exports__["a"] = (WeakMap);


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/array.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return from; });
/* unused harmony export of */
/* unused harmony export copyWithin */
/* unused harmony export fill */
/* unused harmony export find */
/* unused harmony export findIndex */
/* unused harmony export includes */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iterator__ = __webpack_require__("./node_modules/@dojo/framework/shim/iterator.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__number__ = __webpack_require__("./node_modules/@dojo/framework/shim/number.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__support_has__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/has.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__support_util__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/util.mjs");





let from;
/**
 * Creates a new array from the function parameters.
 *
 * @param arguments Any number of arguments for the array
 * @return An array from the given arguments
 */
let of;
/* ES6 Array instance methods */
/**
 * Copies data internally within an array or array-like object.
 *
 * @param target The target array-like object
 * @param offset The index to start copying values to; if negative, it counts backwards from length
 * @param start The first (inclusive) index to copy; if negative, it counts backwards from length
 * @param end The last (exclusive) index to copy; if negative, it counts backwards from length
 * @return The target
 */
let copyWithin;
/**
 * Fills elements of an array-like object with the specified value.
 *
 * @param target The target to fill
 * @param value The value to fill each element of the target with
 * @param start The first index to fill
 * @param end The (exclusive) index at which to stop filling
 * @return The filled target
 */
let fill;
/**
 * Finds and returns the first instance matching the callback or undefined if one is not found.
 *
 * @param target An array-like object
 * @param callback A function returning if the current value matches a criteria
 * @param thisArg The execution context for the find function
 * @return The first element matching the callback, or undefined if one does not exist
 */
let find;
/**
 * Performs a linear search and returns the first index whose value satisfies the passed callback,
 * or -1 if no values satisfy it.
 *
 * @param target An array-like object
 * @param callback A function returning true if the current value satisfies its criteria
 * @param thisArg The execution context for the find function
 * @return The first index whose value satisfies the passed callback, or -1 if no values satisfy it
 */
let findIndex;
/* ES7 Array instance methods */
/**
 * Determines whether an array includes a given value
 *
 * @param target the target array-like object
 * @param searchElement the item to search for
 * @param fromIndex the starting index to search from
 * @return `true` if the array includes the element, otherwise `false`
 */
let includes;
if (true) {
    from = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Array.from;
    of = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Array.of;
    copyWithin = Object(__WEBPACK_IMPORTED_MODULE_4__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Array.prototype.copyWithin);
    fill = Object(__WEBPACK_IMPORTED_MODULE_4__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Array.prototype.fill);
    find = Object(__WEBPACK_IMPORTED_MODULE_4__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Array.prototype.find);
    findIndex = Object(__WEBPACK_IMPORTED_MODULE_4__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Array.prototype.findIndex);
}
else {
    // It is only older versions of Safari/iOS that have a bad fill implementation and so aren't in the wild
    // To make things easier, if there is a bad fill implementation, the whole set of functions will be filled
    /**
     * Ensures a non-negative, non-infinite, safe integer.
     *
     * @param length The number to validate
     * @return A proper length
     */
    const toLength = function toLength(length) {
        if (isNaN(length)) {
            return 0;
        }
        length = Number(length);
        if (isFinite(length)) {
            length = Math.floor(length);
        }
        // Ensure a non-negative, real, safe integer
        return Math.min(Math.max(length, 0), MAX_SAFE_INTEGER);
    };
    /**
     * From ES6 7.1.4 ToInteger()
     *
     * @param value A value to convert
     * @return An integer
     */
    const toInteger = function toInteger(value) {
        value = Number(value);
        if (isNaN(value)) {
            return 0;
        }
        if (value === 0 || !isFinite(value)) {
            return value;
        }
        return (value > 0 ? 1 : -1) * Math.floor(Math.abs(value));
    };
    /**
     * Normalizes an offset against a given length, wrapping it if negative.
     *
     * @param value The original offset
     * @param length The total length to normalize against
     * @return If negative, provide a distance from the end (length); otherwise provide a distance from 0
     */
    const normalizeOffset = function normalizeOffset(value, length) {
        return value < 0 ? Math.max(length + value, 0) : Math.min(value, length);
    };
    from = function from(arrayLike, mapFunction, thisArg) {
        if (arrayLike == null) {
            throw new TypeError('from: requires an array-like object');
        }
        if (mapFunction && thisArg) {
            mapFunction = mapFunction.bind(thisArg);
        }
        /* tslint:disable-next-line:variable-name */
        const Constructor = this;
        const length = toLength(arrayLike.length);
        // Support extension
        const array = typeof Constructor === 'function' ? Object(new Constructor(length)) : new Array(length);
        if (!isArrayLike(arrayLike) && !isIterable(arrayLike)) {
            return array;
        }
        // if this is an array and the normalized length is 0, just return an empty array. this prevents a problem
        // with the iteration on IE when using a NaN array length.
        if (isArrayLike(arrayLike)) {
            if (length === 0) {
                return [];
            }
            for (let i = 0; i < arrayLike.length; i++) {
                array[i] = mapFunction ? mapFunction(arrayLike[i], i) : arrayLike[i];
            }
        }
        else {
            let i = 0;
            for (const value of arrayLike) {
                array[i] = mapFunction ? mapFunction(value, i) : value;
                i++;
            }
        }
        if (arrayLike.length !== undefined) {
            array.length = length;
        }
        return array;
    };
    of = function of(...items) {
        return Array.prototype.slice.call(items);
    };
    copyWithin = function copyWithin(target, offset, start, end) {
        if (target == null) {
            throw new TypeError('copyWithin: target must be an array-like object');
        }
        const length = toLength(target.length);
        offset = normalizeOffset(toInteger(offset), length);
        start = normalizeOffset(toInteger(start), length);
        end = normalizeOffset(end === undefined ? length : toInteger(end), length);
        let count = Math.min(end - start, length - offset);
        let direction = 1;
        if (offset > start && offset < start + count) {
            direction = -1;
            start += count - 1;
            offset += count - 1;
        }
        while (count > 0) {
            if (start in target) {
                target[offset] = target[start];
            }
            else {
                delete target[offset];
            }
            offset += direction;
            start += direction;
            count--;
        }
        return target;
    };
    fill = function fill(target, value, start, end) {
        const length = toLength(target.length);
        let i = normalizeOffset(toInteger(start), length);
        end = normalizeOffset(end === undefined ? length : toInteger(end), length);
        while (i < end) {
            target[i++] = value;
        }
        return target;
    };
    find = function find(target, callback, thisArg) {
        const index = findIndex(target, callback, thisArg);
        return index !== -1 ? target[index] : undefined;
    };
    findIndex = function findIndex(target, callback, thisArg) {
        const length = toLength(target.length);
        if (!callback) {
            throw new TypeError('find: second argument must be a function');
        }
        if (thisArg) {
            callback = callback.bind(thisArg);
        }
        for (let i = 0; i < length; i++) {
            if (callback(target[i], i, target)) {
                return i;
            }
        }
        return -1;
    };
}
if (true) {
    includes = Object(__WEBPACK_IMPORTED_MODULE_4__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Array.prototype.includes);
}
else {
    /**
     * Ensures a non-negative, non-infinite, safe integer.
     *
     * @param length The number to validate
     * @return A proper length
     */
    const toLength = function toLength(length) {
        length = Number(length);
        if (isNaN(length)) {
            return 0;
        }
        if (isFinite(length)) {
            length = Math.floor(length);
        }
        // Ensure a non-negative, real, safe integer
        return Math.min(Math.max(length, 0), MAX_SAFE_INTEGER);
    };
    includes = function includes(target, searchElement, fromIndex = 0) {
        let len = toLength(target.length);
        for (let i = fromIndex; i < len; ++i) {
            const currentElement = target[i];
            if (searchElement === currentElement ||
                (searchElement !== searchElement && currentElement !== currentElement)) {
                return true;
            }
        }
        return false;
    };
}


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/global.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {const globalObject = (function () {
    // the only reliable means to get the global object is
    // `Function('return this')()`
    // However, this causes CSP violations in Chrome apps.
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
})();
/* harmony default export */ __webpack_exports__["a"] = (globalObject);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@dojo/framework/shim/iterator.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isIterable */
/* unused harmony export isArrayLike */
/* unused harmony export get */
/* unused harmony export forOf */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol__ = __webpack_require__("./node_modules/@dojo/framework/shim/Symbol.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__string__ = __webpack_require__("./node_modules/@dojo/framework/shim/string.mjs");


const staticDone = { done: true, value: undefined };
/**
 * A class that _shims_ an iterator interface on array like objects.
 */
class ShimIterator {
    constructor(list) {
        this._nextIndex = -1;
        if (isIterable(list)) {
            this._nativeIterator = list[Symbol.iterator]();
        }
        else {
            this._list = list;
        }
    }
    /**
     * Return the next iteration result for the Iterator
     */
    next() {
        if (this._nativeIterator) {
            return this._nativeIterator.next();
        }
        if (!this._list) {
            return staticDone;
        }
        if (++this._nextIndex < this._list.length) {
            return {
                done: false,
                value: this._list[this._nextIndex]
            };
        }
        return staticDone;
    }
    [Symbol.iterator]() {
        return this;
    }
}
/* unused harmony export ShimIterator */

/**
 * A type guard for checking if something has an Iterable interface
 *
 * @param value The value to type guard against
 */
function isIterable(value) {
    return value && typeof value[Symbol.iterator] === 'function';
}
/**
 * A type guard for checking if something is ArrayLike
 *
 * @param value The value to type guard against
 */
function isArrayLike(value) {
    return value && typeof value.length === 'number';
}
/**
 * Returns the iterator for an object
 *
 * @param iterable The iterable object to return the iterator for
 */
function get(iterable) {
    if (isIterable(iterable)) {
        return iterable[Symbol.iterator]();
    }
    else if (isArrayLike(iterable)) {
        return new ShimIterator(iterable);
    }
}
/**
 * Shims the functionality of `for ... of` blocks
 *
 * @param iterable The object the provides an interator interface
 * @param callback The callback which will be called for each item of the iterable
 * @param thisArg Optional scope to pass the callback
 */
function forOf(iterable, callback, thisArg) {
    let broken = false;
    function doBreak() {
        broken = true;
    }
    /* We need to handle iteration of double byte strings properly */
    if (isArrayLike(iterable) && typeof iterable === 'string') {
        const l = iterable.length;
        for (let i = 0; i < l; ++i) {
            let char = iterable[i];
            if (i + 1 < l) {
                const code = char.charCodeAt(0);
                if (code >= __WEBPACK_IMPORTED_MODULE_1__string__["b" /* HIGH_SURROGATE_MIN */] && code <= __WEBPACK_IMPORTED_MODULE_1__string__["a" /* HIGH_SURROGATE_MAX */]) {
                    char += iterable[++i];
                }
            }
            callback.call(thisArg, char, iterable, doBreak);
            if (broken) {
                return;
            }
        }
    }
    else {
        const iterator = get(iterable);
        if (iterator) {
            let result = iterator.next();
            while (!result.done) {
                callback.call(thisArg, result.value, iterable, doBreak);
                if (broken) {
                    return;
                }
                result = iterator.next();
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/number.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isNaN */
/* unused harmony export isFinite */
/* unused harmony export isInteger */
/* unused harmony export isSafeInteger */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");

/**
 * The smallest interval between two representable numbers.
 */
const EPSILON = 1;
/* unused harmony export EPSILON */

/**
 * The maximum safe integer in JavaScript
 */
const MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
/* unused harmony export MAX_SAFE_INTEGER */

/**
 * The minimum safe integer in JavaScript
 */
const MIN_SAFE_INTEGER = -MAX_SAFE_INTEGER;
/* unused harmony export MIN_SAFE_INTEGER */

/**
 * Determines whether the passed value is NaN without coersion.
 *
 * @param value The value to test
 * @return true if the value is NaN, false if it is not
 */
function isNaN(value) {
    return typeof value === 'number' && __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].isNaN(value);
}
/**
 * Determines whether the passed value is a finite number without coersion.
 *
 * @param value The value to test
 * @return true if the value is finite, false if it is not
 */
function isFinite(value) {
    return typeof value === 'number' && __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].isFinite(value);
}
/**
 * Determines whether the passed value is an integer.
 *
 * @param value The value to test
 * @return true if the value is an integer, false if it is not
 */
function isInteger(value) {
    return isFinite(value) && Math.floor(value) === value;
}
/**
 * Determines whether the passed value is an integer that is 'safe,' meaning:
 *   1. it can be expressed as an IEEE-754 double precision number
 *   2. it has a one-to-one mapping to a mathematical integer, meaning its
 *      IEEE-754 representation cannot be the result of rounding any other
 *      integer to fit the IEEE-754 representation
 *
 * @param value The value to test
 * @return true if the value is an integer, false if it is not
 */
function isSafeInteger(value) {
    return isInteger(value) && Math.abs(value) <= MAX_SAFE_INTEGER;
}


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/object.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return assign; });
/* unused harmony export getOwnPropertyDescriptor */
/* unused harmony export getOwnPropertyNames */
/* unused harmony export getOwnPropertySymbols */
/* unused harmony export is */
/* unused harmony export keys */
/* unused harmony export getOwnPropertyDescriptors */
/* unused harmony export entries */
/* unused harmony export values */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__support_has__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/has.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Symbol__ = __webpack_require__("./node_modules/@dojo/framework/shim/Symbol.mjs");



let assign;
/**
 * Gets the own property descriptor of the specified object.
 * An own property descriptor is one that is defined directly on the object and is not
 * inherited from the object's prototype.
 * @param o Object that contains the property.
 * @param p Name of the property.
 */
let getOwnPropertyDescriptor;
/**
 * Returns the names of the own properties of an object. The own properties of an object are those that are defined directly
 * on that object, and are not inherited from the object's prototype. The properties of an object include both fields (objects) and functions.
 * @param o Object that contains the own properties.
 */
let getOwnPropertyNames;
/**
 * Returns an array of all symbol properties found directly on object o.
 * @param o Object to retrieve the symbols from.
 */
let getOwnPropertySymbols;
/**
 * Returns true if the values are the same value, false otherwise.
 * @param value1 The first value.
 * @param value2 The second value.
 */
let is;
/**
 * Returns the names of the enumerable properties and methods of an object.
 * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 */
let keys;
/* ES7 Object static methods */
let getOwnPropertyDescriptors;
let entries;
let values;
if (true) {
    const globalObject = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Object;
    assign = globalObject.assign;
    getOwnPropertyDescriptor = globalObject.getOwnPropertyDescriptor;
    getOwnPropertyNames = globalObject.getOwnPropertyNames;
    getOwnPropertySymbols = globalObject.getOwnPropertySymbols;
    is = globalObject.is;
    keys = globalObject.keys;
}
else {
    keys = function symbolAwareKeys(o) {
        return Object.keys(o).filter((key) => !Boolean(key.match(/^@@.+/)));
    };
    assign = function assign(target, ...sources) {
        if (target == null) {
            // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }
        const to = Object(target);
        sources.forEach((nextSource) => {
            if (nextSource) {
                // Skip over if undefined or null
                keys(nextSource).forEach((nextKey) => {
                    to[nextKey] = nextSource[nextKey];
                });
            }
        });
        return to;
    };
    getOwnPropertyDescriptor = function getOwnPropertyDescriptor(o, prop) {
        if (isSymbol(prop)) {
            return Object.getOwnPropertyDescriptor(o, prop);
        }
        else {
            return Object.getOwnPropertyDescriptor(o, prop);
        }
    };
    getOwnPropertyNames = function getOwnPropertyNames(o) {
        return Object.getOwnPropertyNames(o).filter((key) => !Boolean(key.match(/^@@.+/)));
    };
    getOwnPropertySymbols = function getOwnPropertySymbols(o) {
        return Object.getOwnPropertyNames(o)
            .filter((key) => Boolean(key.match(/^@@.+/)))
            .map((key) => Symbol.for(key.substring(2)));
    };
    is = function is(value1, value2) {
        if (value1 === value2) {
            return value1 !== 0 || 1 / value1 === 1 / value2; // -0
        }
        return value1 !== value1 && value2 !== value2; // NaN
    };
}
if (true) {
    const globalObject = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Object;
    getOwnPropertyDescriptors = globalObject.getOwnPropertyDescriptors;
    entries = globalObject.entries;
    values = globalObject.values;
}
else {
    getOwnPropertyDescriptors = function getOwnPropertyDescriptors(o) {
        return getOwnPropertyNames(o).reduce((previous, key) => {
            previous[key] = getOwnPropertyDescriptor(o, key);
            return previous;
        }, {});
    };
    entries = function entries(o) {
        return keys(o).map((key) => [key, o[key]]);
    };
    values = function values(o) {
        return keys(o).map((key) => o[key]);
    };
}


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/string.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export fromCodePoint */
/* unused harmony export raw */
/* unused harmony export codePointAt */
/* unused harmony export endsWith */
/* unused harmony export includes */
/* unused harmony export normalize */
/* unused harmony export repeat */
/* unused harmony export startsWith */
/* unused harmony export padEnd */
/* unused harmony export padStart */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__support_has__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/has.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__support_util__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/util.mjs");



/**
 * The minimum location of high surrogates
 */
const HIGH_SURROGATE_MIN = 0xd800;
/* harmony export (immutable) */ __webpack_exports__["b"] = HIGH_SURROGATE_MIN;

/**
 * The maximum location of high surrogates
 */
const HIGH_SURROGATE_MAX = 0xdbff;
/* harmony export (immutable) */ __webpack_exports__["a"] = HIGH_SURROGATE_MAX;

/**
 * The minimum location of low surrogates
 */
const LOW_SURROGATE_MIN = 0xdc00;
/* unused harmony export LOW_SURROGATE_MIN */

/**
 * The maximum location of low surrogates
 */
const LOW_SURROGATE_MAX = 0xdfff;
/* unused harmony export LOW_SURROGATE_MAX */

/* ES6 static methods */
/**
 * Return the String value whose elements are, in order, the elements in the List elements.
 * If length is 0, the empty string is returned.
 * @param codePoints The code points to generate the string
 */
let fromCodePoint;
/**
 * `raw` is intended for use as a tag function of a Tagged Template String. When called
 * as such the first argument will be a well formed template call site object and the rest
 * parameter will contain the substitution values.
 * @param template A well-formed template string call site representation.
 * @param substitutions A set of substitution values.
 */
let raw;
/* ES6 instance methods */
/**
 * Returns a nonnegative integer Number less than 1114112 (0x110000) that is the code point
 * value of the UTF-16 encoded code point starting at the string element at position pos in
 * the String resulting from converting this object to a String.
 * If there is no element at that position, the result is undefined.
 * If a valid UTF-16 surrogate pair does not begin at pos, the result is the code unit at pos.
 */
let codePointAt;
/**
 * Returns true if the sequence of elements of searchString converted to a String is the
 * same as the corresponding elements of this object (converted to a String) starting at
 * endPosition – length(this). Otherwise returns false.
 */
let endsWith;
/**
 * Returns true if searchString appears as a substring of the result of converting this
 * object to a String, at one or more positions that are
 * greater than or equal to position; otherwise, returns false.
 * @param target The target string
 * @param searchString search string
 * @param position If position is undefined, 0 is assumed, so as to search all of the String.
 */
let includes;
/**
 * Returns the String value result of normalizing the string into the normalization form
 * named by form as specified in Unicode Standard Annex #15, Unicode Normalization Forms.
 * @param target The target string
 * @param form Applicable values: "NFC", "NFD", "NFKC", or "NFKD", If not specified default
 * is "NFC"
 */
let normalize;
/**
 * Returns a String value that is made from count copies appended together. If count is 0,
 * T is the empty String is returned.
 * @param count number of copies to append
 */
let repeat;
/**
 * Returns true if the sequence of elements of searchString converted to a String is the
 * same as the corresponding elements of this object (converted to a String) starting at
 * position. Otherwise returns false.
 */
let startsWith;
/* ES7 instance methods */
/**
 * Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.
 * The padding is applied from the end (right) of the current string.
 *
 * @param target The target string
 * @param maxLength The length of the resulting string once the current string has been padded.
 *        If this parameter is smaller than the current string's length, the current string will be returned as it is.
 *
 * @param fillString The string to pad the current string with.
 *        If this string is too long, it will be truncated and the left-most part will be applied.
 *        The default value for this parameter is " " (U+0020).
 */
let padEnd;
/**
 * Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.
 * The padding is applied from the start (left) of the current string.
 *
 * @param target The target string
 * @param maxLength The length of the resulting string once the current string has been padded.
 *        If this parameter is smaller than the current string's length, the current string will be returned as it is.
 *
 * @param fillString The string to pad the current string with.
 *        If this string is too long, it will be truncated and the left-most part will be applied.
 *        The default value for this parameter is " " (U+0020).
 */
let padStart;
if (true) {
    fromCodePoint = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.fromCodePoint;
    raw = __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.raw;
    codePointAt = Object(__WEBPACK_IMPORTED_MODULE_2__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.prototype.codePointAt);
    endsWith = Object(__WEBPACK_IMPORTED_MODULE_2__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.prototype.endsWith);
    includes = Object(__WEBPACK_IMPORTED_MODULE_2__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.prototype.includes);
    normalize = Object(__WEBPACK_IMPORTED_MODULE_2__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.prototype.normalize);
    repeat = Object(__WEBPACK_IMPORTED_MODULE_2__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.prototype.repeat);
    startsWith = Object(__WEBPACK_IMPORTED_MODULE_2__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.prototype.startsWith);
}
else {
    /**
     * Validates that text is defined, and normalizes position (based on the given default if the input is NaN).
     * Used by startsWith, includes, and endsWith.
     *
     * @return Normalized position.
     */
    const normalizeSubstringArgs = function (name, text, search, position, isEnd = false) {
        if (text == null) {
            throw new TypeError('string.' + name + ' requires a valid string to search against.');
        }
        const length = text.length;
        position = position !== position ? (isEnd ? length : 0) : position;
        return [text, String(search), Math.min(Math.max(position, 0), length)];
    };
    fromCodePoint = function fromCodePoint(...codePoints) {
        // Adapted from https://github.com/mathiasbynens/String.fromCodePoint
        const length = arguments.length;
        if (!length) {
            return '';
        }
        const fromCharCode = String.fromCharCode;
        const MAX_SIZE = 0x4000;
        let codeUnits = [];
        let index = -1;
        let result = '';
        while (++index < length) {
            let codePoint = Number(arguments[index]);
            // Code points must be finite integers within the valid range
            let isValid = isFinite(codePoint) && Math.floor(codePoint) === codePoint && codePoint >= 0 && codePoint <= 0x10ffff;
            if (!isValid) {
                throw RangeError('string.fromCodePoint: Invalid code point ' + codePoint);
            }
            if (codePoint <= 0xffff) {
                // BMP code point
                codeUnits.push(codePoint);
            }
            else {
                // Astral code point; split in surrogate halves
                // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                codePoint -= 0x10000;
                let highSurrogate = (codePoint >> 10) + HIGH_SURROGATE_MIN;
                let lowSurrogate = (codePoint % 0x400) + LOW_SURROGATE_MIN;
                codeUnits.push(highSurrogate, lowSurrogate);
            }
            if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                result += fromCharCode.apply(null, codeUnits);
                codeUnits.length = 0;
            }
        }
        return result;
    };
    raw = function raw(callSite, ...substitutions) {
        let rawStrings = callSite.raw;
        let result = '';
        let numSubstitutions = substitutions.length;
        if (callSite == null || callSite.raw == null) {
            throw new TypeError('string.raw requires a valid callSite object with a raw value');
        }
        for (let i = 0, length = rawStrings.length; i < length; i++) {
            result += rawStrings[i] + (i < numSubstitutions && i < length - 1 ? substitutions[i] : '');
        }
        return result;
    };
    codePointAt = function codePointAt(text, position = 0) {
        // Adapted from https://github.com/mathiasbynens/String.prototype.codePointAt
        if (text == null) {
            throw new TypeError('string.codePointAt requries a valid string.');
        }
        const length = text.length;
        if (position !== position) {
            position = 0;
        }
        if (position < 0 || position >= length) {
            return undefined;
        }
        // Get the first code unit
        const first = text.charCodeAt(position);
        if (first >= HIGH_SURROGATE_MIN && first <= HIGH_SURROGATE_MAX && length > position + 1) {
            // Start of a surrogate pair (high surrogate and there is a next code unit); check for low surrogate
            // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            const second = text.charCodeAt(position + 1);
            if (second >= LOW_SURROGATE_MIN && second <= LOW_SURROGATE_MAX) {
                return (first - HIGH_SURROGATE_MIN) * 0x400 + second - LOW_SURROGATE_MIN + 0x10000;
            }
        }
        return first;
    };
    endsWith = function endsWith(text, search, endPosition) {
        if (endPosition == null) {
            endPosition = text.length;
        }
        [text, search, endPosition] = normalizeSubstringArgs('endsWith', text, search, endPosition, true);
        const start = endPosition - search.length;
        if (start < 0) {
            return false;
        }
        return text.slice(start, endPosition) === search;
    };
    includes = function includes(text, search, position = 0) {
        [text, search, position] = normalizeSubstringArgs('includes', text, search, position);
        return text.indexOf(search, position) !== -1;
    };
    repeat = function repeat(text, count = 0) {
        // Adapted from https://github.com/mathiasbynens/String.prototype.repeat
        if (text == null) {
            throw new TypeError('string.repeat requires a valid string.');
        }
        if (count !== count) {
            count = 0;
        }
        if (count < 0 || count === Infinity) {
            throw new RangeError('string.repeat requires a non-negative finite count.');
        }
        let result = '';
        while (count) {
            if (count % 2) {
                result += text;
            }
            if (count > 1) {
                text += text;
            }
            count >>= 1;
        }
        return result;
    };
    startsWith = function startsWith(text, search, position = 0) {
        search = String(search);
        [text, search, position] = normalizeSubstringArgs('startsWith', text, search, position);
        const end = position + search.length;
        if (end > text.length) {
            return false;
        }
        return text.slice(position, end) === search;
    };
}
if (true) {
    padEnd = Object(__WEBPACK_IMPORTED_MODULE_2__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.prototype.padEnd);
    padStart = Object(__WEBPACK_IMPORTED_MODULE_2__support_util__["b" /* wrapNative */])(__WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].String.prototype.padStart);
}
else {
    padEnd = function padEnd(text, maxLength, fillString = ' ') {
        if (text === null || text === undefined) {
            throw new TypeError('string.repeat requires a valid string.');
        }
        if (maxLength === Infinity) {
            throw new RangeError('string.padEnd requires a non-negative finite count.');
        }
        if (maxLength === null || maxLength === undefined || maxLength < 0) {
            maxLength = 0;
        }
        let strText = String(text);
        const padding = maxLength - strText.length;
        if (padding > 0) {
            strText +=
                repeat(fillString, Math.floor(padding / fillString.length)) +
                    fillString.slice(0, padding % fillString.length);
        }
        return strText;
    };
    padStart = function padStart(text, maxLength, fillString = ' ') {
        if (text === null || text === undefined) {
            throw new TypeError('string.repeat requires a valid string.');
        }
        if (maxLength === Infinity) {
            throw new RangeError('string.padStart requires a non-negative finite count.');
        }
        if (maxLength === null || maxLength === undefined || maxLength < 0) {
            maxLength = 0;
        }
        let strText = String(text);
        const padding = maxLength - strText.length;
        if (padding > 0) {
            strText =
                repeat(fillString, Math.floor(padding / fillString.length)) +
                    fillString.slice(0, padding % fillString.length) +
                    strText;
        }
        return strText;
    };
}


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/support/has.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__has_has__ = __webpack_require__("./node_modules/@dojo/framework/has/has.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__has_has__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__has_has__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__has_has__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__has_has__["e"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__has_has__["f"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_0__has_has__["g"]; });


/* harmony default export */ __webpack_exports__["b"] = (__WEBPACK_IMPORTED_MODULE_0__has_has__["b" /* default */]);

/* ECMAScript 6 and 7 Features */
/* Array */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-array', () => {
    return (['from', 'of'].every((key) => key in __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Array) &&
        ['findIndex', 'find', 'copyWithin'].every((key) => key in __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Array.prototype));
}, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-array-fill', () => {
    if ('fill' in __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Array.prototype) {
        /* Some versions of Safari do not properly implement this */
        return [1].fill(9, Number.POSITIVE_INFINITY)[0] === 1;
    }
    return false;
}, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es7-array', () => 'includes' in __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Array.prototype, true);
/* Map */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-map', () => {
    if (typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Map === 'function') {
        /*
    IE11 and older versions of Safari are missing critical ES6 Map functionality
    We wrap this in a try/catch because sometimes the Map constructor exists, but does not
    take arguments (iOS 8.4)
     */
        try {
            const map = new __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Map([[0, 1]]);
            return map.has(0) &&
                typeof map.keys === 'function' &&
                true &&
                typeof map.values === 'function' &&
                typeof map.entries === 'function';
        }
        catch (e) {
            /* istanbul ignore next: not testing on iOS at the moment */
            return false;
        }
    }
    return false;
}, true);
/* Math */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-math', () => {
    return [
        'clz32',
        'sign',
        'log10',
        'log2',
        'log1p',
        'expm1',
        'cosh',
        'sinh',
        'tanh',
        'acosh',
        'asinh',
        'atanh',
        'trunc',
        'fround',
        'cbrt',
        'hypot'
    ].every((name) => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Math[name] === 'function');
}, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-math-imul', () => {
    if ('imul' in __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Math) {
        /* Some versions of Safari on ios do not properly implement this */
        return Math.imul(0xffffffff, 5) === -5;
    }
    return false;
}, true);
/* Object */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-object', () => {
    return true &&
        ['assign', 'is', 'getOwnPropertySymbols', 'setPrototypeOf'].every((name) => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Object[name] === 'function');
}, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es2017-object', () => {
    return ['values', 'entries', 'getOwnPropertyDescriptors'].every((name) => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Object[name] === 'function');
}, true);
/* Observable */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es-observable', () => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Observable !== 'undefined', true);
/* Promise */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-promise', () => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Promise !== 'undefined' && true, true);
/* Set */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-set', () => {
    if (typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Set === 'function') {
        /* IE11 and older versions of Safari are missing critical ES6 Set functionality */
        const set = new __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Set([1]);
        return set.has(1) && 'keys' in set && typeof set.keys === 'function' && true;
    }
    return false;
}, true);
/* String */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-string', () => {
    return ([
        /* static methods */
        'fromCodePoint'
    ].every((key) => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].String[key] === 'function') &&
        [
            /* instance methods */
            'codePointAt',
            'normalize',
            'repeat',
            'startsWith',
            'endsWith',
            'includes'
        ].every((key) => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].String.prototype[key] === 'function'));
}, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-string-raw', () => {
    function getCallSite(callSite, ...substitutions) {
        const result = [...callSite];
        result.raw = callSite.raw;
        return result;
    }
    if ('raw' in __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].String) {
        let b = 1;
        let callSite = getCallSite `a\n${b}`;
        callSite.raw = ['a\\n'];
        const supportsTrunc = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].String.raw(callSite, 42) === 'a:\\n';
        return supportsTrunc;
    }
    return false;
}, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es2017-string', () => {
    return ['padStart', 'padEnd'].every((key) => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].String.prototype[key] === 'function');
}, true);
/* Symbol */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-symbol', () => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Symbol !== 'undefined' && typeof Symbol() === 'symbol', true);
/* WeakMap */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('es6-weakmap', () => {
    if (typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].WeakMap !== 'undefined') {
        /* IE11 and older versions of Safari are missing critical ES6 Map functionality */
        const key1 = {};
        const key2 = {};
        const map = new __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].WeakMap([[key1, 1]]);
        Object.freeze(key1);
        return map.get(key1) === 1 && map.set(key2, 2) === map && true;
    }
    return false;
}, true);
/* Miscellaneous features */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('microtasks', () => true || false || true, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('postmessage', () => {
    // If window is undefined, and we have postMessage, it probably means we're in a web worker. Web workers have
    // post message but it doesn't work how we expect it to, so it's best just to pretend it doesn't exist.
    return typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].window !== 'undefined' && typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].postMessage === 'function';
}, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('raf', () => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].requestAnimationFrame === 'function', true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('setimmediate', () => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].setImmediate !== 'undefined', true);
/* DOM Features */
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('dom-mutationobserver', () => {
    if (true && Boolean(__WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].MutationObserver || __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].WebKitMutationObserver)) {
        // IE11 has an unreliable MutationObserver implementation where setProperty() does not
        // generate a mutation event, observers can crash, and the queue does not drain
        // reliably. The following feature test was adapted from
        // https://gist.github.com/t10ko/4aceb8c71681fdb275e33efe5e576b14
        const example = document.createElement('div');
        /* tslint:disable-next-line:variable-name */
        const HostMutationObserver = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].MutationObserver || __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].WebKitMutationObserver;
        const observer = new HostMutationObserver(function () { });
        observer.observe(example, { attributes: true });
        example.style.setProperty('display', 'block');
        return Boolean(observer.takeRecords().length);
    }
    return false;
}, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('dom-webanimation', () => true && __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].Animation !== undefined && __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].KeyframeEffect !== undefined, true);
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('abort-controller', () => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].AbortController !== 'undefined');
Object(__WEBPACK_IMPORTED_MODULE_0__has_has__["a" /* add */])('abort-signal', () => typeof __WEBPACK_IMPORTED_MODULE_1__global__["a" /* default */].AbortSignal !== 'undefined');


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/support/queue.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export queueMicroTask */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__has__ = __webpack_require__("./node_modules/@dojo/framework/shim/support/has.mjs");


function executeTask(item) {
    if (item && item.isActive && item.callback) {
        item.callback();
    }
}
function getQueueHandle(item, destructor) {
    return {
        destroy: function () {
            this.destroy = function () { };
            item.isActive = false;
            item.callback = null;
            if (destructor) {
                destructor();
            }
        }
    };
}
let checkMicroTaskQueue;
let microTasks;
/**
 * Schedules a callback to the macrotask queue.
 *
 * @param callback the function to be queued and later executed.
 * @returns An object with a `destroy` method that, when called, prevents the registered callback from executing.
 */
const queueTask = (function () {
    let destructor;
    let enqueue;
    // Since the IE implementation of `setImmediate` is not flawless, we will test for `postMessage` first.
    if (true) {
        const queue = [];
        __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].addEventListener('message', function (event) {
            // Confirm that the event was triggered by the current window and by this particular implementation.
            if (event.source === __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */] && event.data === 'dojo-queue-message') {
                event.stopPropagation();
                if (queue.length) {
                    executeTask(queue.shift());
                }
            }
        });
        enqueue = function (item) {
            queue.push(item);
            __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].postMessage('dojo-queue-message', '*');
        };
    }
    else if (false) {
        destructor = global.clearImmediate;
        enqueue = function (item) {
            return setImmediate(executeTask.bind(null, item));
        };
    }
    else {
        destructor = global.clearTimeout;
        enqueue = function (item) {
            return setTimeout(executeTask.bind(null, item), 0);
        };
    }
    function queueTask(callback) {
        const item = {
            isActive: true,
            callback: callback
        };
        const id = enqueue(item);
        return getQueueHandle(item, destructor &&
            function () {
                destructor(id);
            });
    }
    // TODO: Use aspect.before when it is available.
    return true
        ? queueTask
        : function (callback) {
            checkMicroTaskQueue();
            return queueTask(callback);
        };
})();
/* unused harmony export queueTask */

// When no mechanism for registering microtasks is exposed by the environment, microtasks will
// be queued and then executed in a single macrotask before the other macrotasks are executed.
if (false) {
    let isMicroTaskQueued = false;
    microTasks = [];
    checkMicroTaskQueue = function () {
        if (!isMicroTaskQueued) {
            isMicroTaskQueued = true;
            queueTask(function () {
                isMicroTaskQueued = false;
                if (microTasks.length) {
                    let item;
                    while ((item = microTasks.shift())) {
                        executeTask(item);
                    }
                }
            });
        }
    };
}
/**
 * Schedules an animation task with `window.requestAnimationFrame` if it exists, or with `queueTask` otherwise.
 *
 * Since requestAnimationFrame's behavior does not match that expected from `queueTask`, it is not used there.
 * However, at times it makes more sense to delegate to requestAnimationFrame; hence the following method.
 *
 * @param callback the function to be queued and later executed.
 * @returns An object with a `destroy` method that, when called, prevents the registered callback from executing.
 */
const queueAnimationTask = (function () {
    if (false) {
        return queueTask;
    }
    function queueAnimationTask(callback) {
        const item = {
            isActive: true,
            callback: callback
        };
        const rafId = requestAnimationFrame(executeTask.bind(null, item));
        return getQueueHandle(item, function () {
            cancelAnimationFrame(rafId);
        });
    }
    // TODO: Use aspect.before when it is available.
    return true
        ? queueAnimationTask
        : function (callback) {
            checkMicroTaskQueue();
            return queueAnimationTask(callback);
        };
})();
/* unused harmony export queueAnimationTask */

/**
 * Schedules a callback to the microtask queue.
 *
 * Any callbacks registered with `queueMicroTask` will be executed before the next macrotask. If no native
 * mechanism for scheduling macrotasks is exposed, then any callbacks will be fired before any macrotask
 * registered with `queueTask` or `queueAnimationTask`.
 *
 * @param callback the function to be queued and later executed.
 * @returns An object with a `destroy` method that, when called, prevents the registered callback from executing.
 */
let queueMicroTask = (function () {
    let enqueue;
    if (false) {
        enqueue = function (item) {
            global.process.nextTick(executeTask.bind(null, item));
        };
    }
    else if (true) {
        enqueue = function (item) {
            __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */].Promise.resolve(item).then(executeTask);
        };
    }
    else if (true) {
        /* tslint:disable-next-line:variable-name */
        const HostMutationObserver = global.MutationObserver || global.WebKitMutationObserver;
        const node = document.createElement('div');
        const queue = [];
        const observer = new HostMutationObserver(function () {
            while (queue.length > 0) {
                const item = queue.shift();
                if (item && item.isActive && item.callback) {
                    item.callback();
                }
            }
        });
        observer.observe(node, { attributes: true });
        enqueue = function (item) {
            queue.push(item);
            node.setAttribute('queueStatus', '1');
        };
    }
    else {
        enqueue = function (item) {
            checkMicroTaskQueue();
            microTasks.push(item);
        };
    }
    return function (callback) {
        const item = {
            isActive: true,
            callback: callback
        };
        enqueue(item);
        return getQueueHandle(item);
    };
})();


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/support/util.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getValueDescriptor;
/* harmony export (immutable) */ __webpack_exports__["b"] = wrapNative;
/**
 * Helper function to generate a value property descriptor
 *
 * @param value        The value the property descriptor should be set to
 * @param enumerable   If the property should be enumberable, defaults to false
 * @param writable     If the property should be writable, defaults to true
 * @param configurable If the property should be configurable, defaults to true
 * @return             The property descriptor object
 */
function getValueDescriptor(value, enumerable = false, writable = true, configurable = true) {
    return {
        value: value,
        enumerable: enumerable,
        writable: writable,
        configurable: configurable
    };
}
function wrapNative(nativeFunction) {
    return function (target, ...args) {
        return nativeFunction.apply(target, args);
    };
}


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/NodeHandler.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NodeEventType */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Evented__ = __webpack_require__("./node_modules/@dojo/framework/core/Evented.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shim_Map__ = __webpack_require__("./node_modules/@dojo/framework/shim/Map.mjs");


/**
 * Enum to identify the type of event.
 * Listening to 'Projector' will notify when projector is created or updated
 * Listening to 'Widget' will notify when widget root is created or updated
 */
var NodeEventType;
(function (NodeEventType) {
    NodeEventType["Projector"] = "Projector";
    NodeEventType["Widget"] = "Widget";
})(NodeEventType || (NodeEventType = {}));
class NodeHandler extends __WEBPACK_IMPORTED_MODULE_0__core_Evented__["a" /* Evented */] {
    constructor() {
        super(...arguments);
        this._nodeMap = new __WEBPACK_IMPORTED_MODULE_1__shim_Map__["b" /* default */]();
    }
    get(key) {
        return this._nodeMap.get(key);
    }
    has(key) {
        return this._nodeMap.has(key);
    }
    add(element, key) {
        this._nodeMap.set(key, element);
        this.emit({ type: key });
    }
    addRoot() {
        this.emit({ type: NodeEventType.Widget });
    }
    addProjector() {
        this.emit({ type: NodeEventType.Projector });
    }
    clear() {
        this._nodeMap.clear();
    }
}
/* unused harmony export NodeHandler */

/* harmony default export */ __webpack_exports__["a"] = (NodeHandler);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/Registry.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = isWidgetBaseConstructor;
/* unused harmony export isWidgetConstructorDefaultExport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shim_Promise__ = __webpack_require__("./node_modules/@dojo/framework/shim/Promise.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shim_Map__ = __webpack_require__("./node_modules/@dojo/framework/shim/Map.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shim_Symbol__ = __webpack_require__("./node_modules/@dojo/framework/shim/Symbol.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_Evented__ = __webpack_require__("./node_modules/@dojo/framework/core/Evented.mjs");




/**
 * Widget base symbol type
 */
const WIDGET_BASE_TYPE = Object(__WEBPACK_IMPORTED_MODULE_2__shim_Symbol__["a" /* default */])('Widget Base');
/* harmony export (immutable) */ __webpack_exports__["b"] = WIDGET_BASE_TYPE;

/**
 * Checks is the item is a subclass of WidgetBase (or a WidgetBase)
 *
 * @param item the item to check
 * @returns true/false indicating if the item is a WidgetBaseConstructor
 */
function isWidgetBaseConstructor(item) {
    return Boolean(item && item._type === WIDGET_BASE_TYPE);
}
function isWidgetConstructorDefaultExport(item) {
    return Boolean(item &&
        item.hasOwnProperty('__esModule') &&
        item.hasOwnProperty('default') &&
        isWidgetBaseConstructor(item.default));
}
/**
 * The Registry implementation
 */
class Registry extends __WEBPACK_IMPORTED_MODULE_3__core_Evented__["a" /* Evented */] {
    /**
     * Emit loaded event for registry label
     */
    emitLoadedEvent(widgetLabel, item) {
        this.emit({
            type: widgetLabel,
            action: 'loaded',
            item
        });
    }
    define(label, item) {
        if (this._widgetRegistry === undefined) {
            this._widgetRegistry = new __WEBPACK_IMPORTED_MODULE_1__shim_Map__["b" /* default */]();
        }
        if (this._widgetRegistry.has(label)) {
            throw new Error(`widget has already been registered for '${label.toString()}'`);
        }
        this._widgetRegistry.set(label, item);
        if (item instanceof __WEBPACK_IMPORTED_MODULE_0__shim_Promise__["a" /* default */]) {
            item.then((widgetCtor) => {
                this._widgetRegistry.set(label, widgetCtor);
                this.emitLoadedEvent(label, widgetCtor);
                return widgetCtor;
            }, (error) => {
                throw error;
            });
        }
        else if (isWidgetBaseConstructor(item)) {
            this.emitLoadedEvent(label, item);
        }
    }
    defineInjector(label, injectorFactory) {
        if (this._injectorRegistry === undefined) {
            this._injectorRegistry = new __WEBPACK_IMPORTED_MODULE_1__shim_Map__["b" /* default */]();
        }
        if (this._injectorRegistry.has(label)) {
            throw new Error(`injector has already been registered for '${label.toString()}'`);
        }
        const invalidator = new __WEBPACK_IMPORTED_MODULE_3__core_Evented__["a" /* Evented */]();
        const injectorItem = {
            injector: injectorFactory(() => invalidator.emit({ type: 'invalidate' })),
            invalidator
        };
        this._injectorRegistry.set(label, injectorItem);
        this.emitLoadedEvent(label, injectorItem);
    }
    get(label) {
        if (!this._widgetRegistry || !this.has(label)) {
            return null;
        }
        const item = this._widgetRegistry.get(label);
        if (isWidgetBaseConstructor(item)) {
            return item;
        }
        if (item instanceof __WEBPACK_IMPORTED_MODULE_0__shim_Promise__["a" /* default */]) {
            return null;
        }
        const promise = item();
        this._widgetRegistry.set(label, promise);
        promise.then((widgetCtor) => {
            if (isWidgetConstructorDefaultExport(widgetCtor)) {
                widgetCtor = widgetCtor.default;
            }
            this._widgetRegistry.set(label, widgetCtor);
            this.emitLoadedEvent(label, widgetCtor);
            return widgetCtor;
        }, (error) => {
            throw error;
        });
        return null;
    }
    getInjector(label) {
        if (!this._injectorRegistry || !this.hasInjector(label)) {
            return null;
        }
        return this._injectorRegistry.get(label);
    }
    has(label) {
        return Boolean(this._widgetRegistry && this._widgetRegistry.has(label));
    }
    hasInjector(label) {
        return Boolean(this._injectorRegistry && this._injectorRegistry.has(label));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Registry;

/* unused harmony default export */ var _unused_webpack_default_export = (Registry);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/RegistryHandler.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shim_Map__ = __webpack_require__("./node_modules/@dojo/framework/shim/Map.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Evented__ = __webpack_require__("./node_modules/@dojo/framework/core/Evented.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Registry__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/Registry.mjs");



class RegistryHandler extends __WEBPACK_IMPORTED_MODULE_1__core_Evented__["a" /* Evented */] {
    constructor() {
        super();
        this._registry = new __WEBPACK_IMPORTED_MODULE_2__Registry__["a" /* Registry */]();
        this._registryWidgetLabelMap = new __WEBPACK_IMPORTED_MODULE_0__shim_Map__["a" /* Map */]();
        this._registryInjectorLabelMap = new __WEBPACK_IMPORTED_MODULE_0__shim_Map__["a" /* Map */]();
        this.own(this._registry);
        const destroy = () => {
            if (this.baseRegistry) {
                this._registryWidgetLabelMap.delete(this.baseRegistry);
                this._registryInjectorLabelMap.delete(this.baseRegistry);
                this.baseRegistry = undefined;
            }
        };
        this.own({ destroy });
    }
    set base(baseRegistry) {
        if (this.baseRegistry) {
            this._registryWidgetLabelMap.delete(this.baseRegistry);
            this._registryInjectorLabelMap.delete(this.baseRegistry);
        }
        this.baseRegistry = baseRegistry;
    }
    define(label, widget) {
        this._registry.define(label, widget);
    }
    defineInjector(label, injector) {
        this._registry.defineInjector(label, injector);
    }
    has(label) {
        return this._registry.has(label) || Boolean(this.baseRegistry && this.baseRegistry.has(label));
    }
    hasInjector(label) {
        return this._registry.hasInjector(label) || Boolean(this.baseRegistry && this.baseRegistry.hasInjector(label));
    }
    get(label, globalPrecedence = false) {
        return this._get(label, globalPrecedence, 'get', this._registryWidgetLabelMap);
    }
    getInjector(label, globalPrecedence = false) {
        return this._get(label, globalPrecedence, 'getInjector', this._registryInjectorLabelMap);
    }
    _get(label, globalPrecedence, getFunctionName, labelMap) {
        const registries = globalPrecedence ? [this.baseRegistry, this._registry] : [this._registry, this.baseRegistry];
        for (let i = 0; i < registries.length; i++) {
            const registry = registries[i];
            if (!registry) {
                continue;
            }
            const item = registry[getFunctionName](label);
            const registeredLabels = labelMap.get(registry) || [];
            if (item) {
                return item;
            }
            else if (registeredLabels.indexOf(label) === -1) {
                const handle = registry.on(label, (event) => {
                    if (event.action === 'loaded' &&
                        this[getFunctionName](label, globalPrecedence) === event.item) {
                        this.emit({ type: 'invalidate' });
                    }
                });
                this.own(handle);
                labelMap.set(registry, [...registeredLabels, label]);
            }
        }
        return null;
    }
}
/* unused harmony export RegistryHandler */

/* harmony default export */ __webpack_exports__["a"] = (RegistryHandler);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/WidgetBase.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shim_Map__ = __webpack_require__("./node_modules/@dojo/framework/shim/Map.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shim_WeakMap__ = __webpack_require__("./node_modules/@dojo/framework/shim/WeakMap.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shim_Symbol__ = __webpack_require__("./node_modules/@dojo/framework/shim/Symbol.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__d__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/d.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__diff__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/diff.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__RegistryHandler__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/RegistryHandler.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__NodeHandler__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/NodeHandler.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__vdom__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/vdom.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Registry__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/Registry.mjs");









const decoratorMap = new __WEBPACK_IMPORTED_MODULE_0__shim_Map__["b" /* default */]();
const boundAuto = __WEBPACK_IMPORTED_MODULE_4__diff__["a" /* auto */].bind(null);
const noBind = __WEBPACK_IMPORTED_MODULE_2__shim_Symbol__["a" /* default */].for('dojoNoBind');
/* unused harmony export noBind */

/**
 * Main widget base for all widgets to extend
 */
class WidgetBase {
    /**
     * @constructor
     */
    constructor() {
        /**
         * Indicates if it is the initial set properties cycle
         */
        this._initialProperties = true;
        /**
         * Array of property keys considered changed from the previous set properties
         */
        this._changedPropertyKeys = [];
        this._nodeHandler = new __WEBPACK_IMPORTED_MODULE_6__NodeHandler__["a" /* default */]();
        this._handles = [];
        this._children = [];
        this._decoratorCache = new __WEBPACK_IMPORTED_MODULE_0__shim_Map__["b" /* default */]();
        this._properties = {};
        this._boundRenderFunc = this.render.bind(this);
        this._boundInvalidate = this.invalidate.bind(this);
        __WEBPACK_IMPORTED_MODULE_7__vdom__["b" /* widgetInstanceMap */].set(this, {
            dirty: true,
            onAttach: () => {
                this.onAttach();
            },
            onDetach: () => {
                this.onDetach();
                this.destroy();
            },
            nodeHandler: this._nodeHandler,
            registry: () => {
                return this.registry;
            },
            coreProperties: {},
            rendering: false,
            inputProperties: {}
        });
        this._runAfterConstructors();
    }
    meta(MetaType) {
        if (this._metaMap === undefined) {
            this._metaMap = new __WEBPACK_IMPORTED_MODULE_0__shim_Map__["b" /* default */]();
        }
        let cached = this._metaMap.get(MetaType);
        if (!cached) {
            cached = new MetaType({
                invalidate: this._boundInvalidate,
                nodeHandler: this._nodeHandler,
                bind: this
            });
            this.own(cached);
            this._metaMap.set(MetaType, cached);
        }
        return cached;
    }
    onAttach() {
        // Do nothing by default.
    }
    onDetach() {
        // Do nothing by default.
    }
    get properties() {
        return this._properties;
    }
    get changedPropertyKeys() {
        return [...this._changedPropertyKeys];
    }
    __setCoreProperties__(coreProperties) {
        const { baseRegistry } = coreProperties;
        const instanceData = __WEBPACK_IMPORTED_MODULE_7__vdom__["b" /* widgetInstanceMap */].get(this);
        if (instanceData.coreProperties.baseRegistry !== baseRegistry) {
            if (this._registry === undefined) {
                this._registry = new __WEBPACK_IMPORTED_MODULE_5__RegistryHandler__["a" /* default */]();
                this.own(this._registry);
                this.own(this._registry.on('invalidate', this._boundInvalidate));
            }
            this._registry.base = baseRegistry;
            this.invalidate();
        }
        instanceData.coreProperties = coreProperties;
    }
    __setProperties__(originalProperties) {
        const instanceData = __WEBPACK_IMPORTED_MODULE_7__vdom__["b" /* widgetInstanceMap */].get(this);
        instanceData.inputProperties = originalProperties;
        const properties = this._runBeforeProperties(originalProperties);
        const registeredDiffPropertyNames = this.getDecorator('registeredDiffProperty');
        const changedPropertyKeys = [];
        const propertyNames = Object.keys(properties);
        if (this._initialProperties === false || registeredDiffPropertyNames.length !== 0) {
            const allProperties = [...propertyNames, ...Object.keys(this._properties)];
            const checkedProperties = [];
            const diffPropertyResults = {};
            let runReactions = false;
            for (let i = 0; i < allProperties.length; i++) {
                const propertyName = allProperties[i];
                if (checkedProperties.indexOf(propertyName) !== -1) {
                    continue;
                }
                checkedProperties.push(propertyName);
                const previousProperty = this._properties[propertyName];
                const newProperty = this._bindFunctionProperty(properties[propertyName], instanceData.coreProperties.bind);
                if (registeredDiffPropertyNames.indexOf(propertyName) !== -1) {
                    runReactions = true;
                    const diffFunctions = this.getDecorator(`diffProperty:${propertyName}`);
                    for (let i = 0; i < diffFunctions.length; i++) {
                        const result = diffFunctions[i](previousProperty, newProperty);
                        if (result.changed && changedPropertyKeys.indexOf(propertyName) === -1) {
                            changedPropertyKeys.push(propertyName);
                        }
                        if (propertyName in properties) {
                            diffPropertyResults[propertyName] = result.value;
                        }
                    }
                }
                else {
                    const result = boundAuto(previousProperty, newProperty);
                    if (result.changed && changedPropertyKeys.indexOf(propertyName) === -1) {
                        changedPropertyKeys.push(propertyName);
                    }
                    if (propertyName in properties) {
                        diffPropertyResults[propertyName] = result.value;
                    }
                }
            }
            if (runReactions) {
                const reactionFunctions = this.getDecorator('diffReaction');
                const executedReactions = [];
                reactionFunctions.forEach(({ reaction, propertyName }) => {
                    const propertyChanged = changedPropertyKeys.indexOf(propertyName) !== -1;
                    const reactionRun = executedReactions.indexOf(reaction) !== -1;
                    if (propertyChanged && !reactionRun) {
                        reaction.call(this, this._properties, diffPropertyResults);
                        executedReactions.push(reaction);
                    }
                });
            }
            this._properties = diffPropertyResults;
            this._changedPropertyKeys = changedPropertyKeys;
        }
        else {
            this._initialProperties = false;
            for (let i = 0; i < propertyNames.length; i++) {
                const propertyName = propertyNames[i];
                if (typeof properties[propertyName] === 'function') {
                    properties[propertyName] = this._bindFunctionProperty(properties[propertyName], instanceData.coreProperties.bind);
                }
                else {
                    changedPropertyKeys.push(propertyName);
                }
            }
            this._changedPropertyKeys = changedPropertyKeys;
            this._properties = Object.assign({}, properties);
        }
        if (this._changedPropertyKeys.length > 0) {
            this.invalidate();
        }
    }
    get children() {
        return this._children;
    }
    __setChildren__(children) {
        if (this._children.length > 0 || children.length > 0) {
            this._children = children;
            this.invalidate();
        }
    }
    __render__() {
        const instanceData = __WEBPACK_IMPORTED_MODULE_7__vdom__["b" /* widgetInstanceMap */].get(this);
        instanceData.dirty = false;
        const render = this._runBeforeRenders();
        let dNode = render();
        dNode = this.runAfterRenders(dNode);
        this._nodeHandler.clear();
        return dNode;
    }
    invalidate() {
        const instanceData = __WEBPACK_IMPORTED_MODULE_7__vdom__["b" /* widgetInstanceMap */].get(this);
        if (instanceData.invalidate) {
            instanceData.invalidate();
        }
    }
    render() {
        return Object(__WEBPACK_IMPORTED_MODULE_3__d__["f" /* v */])('div', {}, this.children);
    }
    /**
     * Function to add decorators to WidgetBase
     *
     * @param decoratorKey The key of the decorator
     * @param value The value of the decorator
     */
    addDecorator(decoratorKey, value) {
        value = Array.isArray(value) ? value : [value];
        if (this.hasOwnProperty('constructor')) {
            let decoratorList = decoratorMap.get(this.constructor);
            if (!decoratorList) {
                decoratorList = new __WEBPACK_IMPORTED_MODULE_0__shim_Map__["b" /* default */]();
                decoratorMap.set(this.constructor, decoratorList);
            }
            let specificDecoratorList = decoratorList.get(decoratorKey);
            if (!specificDecoratorList) {
                specificDecoratorList = [];
                decoratorList.set(decoratorKey, specificDecoratorList);
            }
            specificDecoratorList.push(...value);
        }
        else {
            const decorators = this.getDecorator(decoratorKey);
            this._decoratorCache.set(decoratorKey, [...decorators, ...value]);
        }
    }
    /**
     * Function to build the list of decorators from the global decorator map.
     *
     * @param decoratorKey  The key of the decorator
     * @return An array of decorator values
     * @private
     */
    _buildDecoratorList(decoratorKey) {
        const allDecorators = [];
        let constructor = this.constructor;
        while (constructor) {
            const instanceMap = decoratorMap.get(constructor);
            if (instanceMap) {
                const decorators = instanceMap.get(decoratorKey);
                if (decorators) {
                    allDecorators.unshift(...decorators);
                }
            }
            constructor = Object.getPrototypeOf(constructor);
        }
        return allDecorators;
    }
    /**
     * Function to retrieve decorator values
     *
     * @param decoratorKey The key of the decorator
     * @returns An array of decorator values
     */
    getDecorator(decoratorKey) {
        let allDecorators = this._decoratorCache.get(decoratorKey);
        if (allDecorators !== undefined) {
            return allDecorators;
        }
        allDecorators = this._buildDecoratorList(decoratorKey);
        this._decoratorCache.set(decoratorKey, allDecorators);
        return allDecorators;
    }
    /**
     * Binds unbound property functions to the specified `bind` property
     *
     * @param properties properties to check for functions
     */
    _bindFunctionProperty(property, bind) {
        if (typeof property === 'function' && !property[noBind] && Object(__WEBPACK_IMPORTED_MODULE_8__Registry__["c" /* isWidgetBaseConstructor */])(property) === false) {
            if (this._bindFunctionPropertyMap === undefined) {
                this._bindFunctionPropertyMap = new __WEBPACK_IMPORTED_MODULE_1__shim_WeakMap__["a" /* default */]();
            }
            const bindInfo = this._bindFunctionPropertyMap.get(property) || {};
            let { boundFunc, scope } = bindInfo;
            if (boundFunc === undefined || scope !== bind) {
                boundFunc = property.bind(bind);
                this._bindFunctionPropertyMap.set(property, { boundFunc, scope: bind });
            }
            return boundFunc;
        }
        return property;
    }
    get registry() {
        if (this._registry === undefined) {
            this._registry = new __WEBPACK_IMPORTED_MODULE_5__RegistryHandler__["a" /* default */]();
            this.own(this._registry);
            this.own(this._registry.on('invalidate', this._boundInvalidate));
        }
        return this._registry;
    }
    _runBeforeProperties(properties) {
        const beforeProperties = this.getDecorator('beforeProperties');
        if (beforeProperties.length > 0) {
            return beforeProperties.reduce((properties, beforePropertiesFunction) => {
                return Object.assign({}, properties, beforePropertiesFunction.call(this, properties));
            }, Object.assign({}, properties));
        }
        return properties;
    }
    /**
     * Run all registered before renders and return the updated render method
     */
    _runBeforeRenders() {
        const beforeRenders = this.getDecorator('beforeRender');
        if (beforeRenders.length > 0) {
            return beforeRenders.reduce((render, beforeRenderFunction) => {
                const updatedRender = beforeRenderFunction.call(this, render, this._properties, this._children);
                if (!updatedRender) {
                    console.warn('Render function not returned from beforeRender, using previous render');
                    return render;
                }
                return updatedRender;
            }, this._boundRenderFunc);
        }
        return this._boundRenderFunc;
    }
    /**
     * Run all registered after renders and return the decorated DNodes
     *
     * @param dNode The DNodes to run through the after renders
     */
    runAfterRenders(dNode) {
        const afterRenders = this.getDecorator('afterRender');
        if (afterRenders.length > 0) {
            dNode = afterRenders.reduce((dNode, afterRenderFunction) => {
                return afterRenderFunction.call(this, dNode);
            }, dNode);
        }
        if (this._metaMap !== undefined) {
            this._metaMap.forEach((meta) => {
                meta.afterRender();
            });
        }
        return dNode;
    }
    _runAfterConstructors() {
        const afterConstructors = this.getDecorator('afterConstructor');
        if (afterConstructors.length > 0) {
            afterConstructors.forEach((afterConstructor) => afterConstructor.call(this));
        }
    }
    own(handle) {
        this._handles.push(handle);
    }
    destroy() {
        while (this._handles.length > 0) {
            const handle = this._handles.pop();
            if (handle) {
                handle.destroy();
            }
        }
    }
}
/* unused harmony export WidgetBase */

/**
 * static identifier
 */
WidgetBase._type = __WEBPACK_IMPORTED_MODULE_8__Registry__["b" /* WIDGET_BASE_TYPE */];
/* harmony default export */ __webpack_exports__["a"] = (WidgetBase);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/animations/cssTransitions.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let browserSpecificTransitionEndEventName = '';
let browserSpecificAnimationEndEventName = '';
function determineBrowserStyleNames(element) {
    if ('WebkitTransition' in element.style) {
        browserSpecificTransitionEndEventName = 'webkitTransitionEnd';
        browserSpecificAnimationEndEventName = 'webkitAnimationEnd';
    }
    else if ('transition' in element.style || 'MozTransition' in element.style) {
        browserSpecificTransitionEndEventName = 'transitionend';
        browserSpecificAnimationEndEventName = 'animationend';
    }
    else {
        throw new Error('Your browser is not supported');
    }
}
function initialize(element) {
    if (browserSpecificAnimationEndEventName === '') {
        determineBrowserStyleNames(element);
    }
}
function runAndCleanUp(element, startAnimation, finishAnimation) {
    initialize(element);
    let finished = false;
    let transitionEnd = function () {
        if (!finished) {
            finished = true;
            element.removeEventListener(browserSpecificTransitionEndEventName, transitionEnd);
            element.removeEventListener(browserSpecificAnimationEndEventName, transitionEnd);
            finishAnimation();
        }
    };
    startAnimation();
    element.addEventListener(browserSpecificAnimationEndEventName, transitionEnd);
    element.addEventListener(browserSpecificTransitionEndEventName, transitionEnd);
}
function exit(node, properties, exitAnimation, removeNode) {
    const activeClass = properties.exitAnimationActive || `${exitAnimation}-active`;
    runAndCleanUp(node, () => {
        node.classList.add(exitAnimation);
        requestAnimationFrame(function () {
            node.classList.add(activeClass);
        });
    }, () => {
        removeNode();
    });
}
function enter(node, properties, enterAnimation) {
    const activeClass = properties.enterAnimationActive || `${enterAnimation}-active`;
    runAndCleanUp(node, () => {
        node.classList.add(enterAnimation);
        requestAnimationFrame(function () {
            node.classList.add(activeClass);
        });
    }, () => {
        node.classList.remove(enterAnimation);
        node.classList.remove(activeClass);
    });
}
/* harmony default export */ __webpack_exports__["a"] = ({
    enter,
    exit
});


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/d.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = isWNode;
/* harmony export (immutable) */ __webpack_exports__["d"] = isVNode;
/* harmony export (immutable) */ __webpack_exports__["c"] = isDomVNode;
/* unused harmony export isElementNode */
/* unused harmony export decorate */
/* unused harmony export w */
/* harmony export (immutable) */ __webpack_exports__["f"] = v;
/* unused harmony export dom */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shim_Symbol__ = __webpack_require__("./node_modules/@dojo/framework/shim/Symbol.mjs");

/**
 * The symbol identifier for a WNode type
 */
const WNODE = Object(__WEBPACK_IMPORTED_MODULE_0__shim_Symbol__["a" /* default */])('Identifier for a WNode.');
/* harmony export (immutable) */ __webpack_exports__["b"] = WNODE;

/**
 * The symbol identifier for a VNode type
 */
const VNODE = Object(__WEBPACK_IMPORTED_MODULE_0__shim_Symbol__["a" /* default */])('Identifier for a VNode.');
/* harmony export (immutable) */ __webpack_exports__["a"] = VNODE;

/**
 * The symbol identifier for a VNode type created using dom()
 */
const DOMVNODE = Object(__WEBPACK_IMPORTED_MODULE_0__shim_Symbol__["a" /* default */])('Identifier for a VNode created using existing dom.');
/* unused harmony export DOMVNODE */

/**
 * Helper function that returns true if the `DNode` is a `WNode` using the `type` property
 */
function isWNode(child) {
    return Boolean(child && typeof child !== 'string' && child.type === WNODE);
}
/**
 * Helper function that returns true if the `DNode` is a `VNode` using the `type` property
 */
function isVNode(child) {
    return Boolean(child && typeof child !== 'string' && (child.type === VNODE || child.type === DOMVNODE));
}
/**
 * Helper function that returns true if the `DNode` is a `VNode` created with `dom()` using the `type` property
 */
function isDomVNode(child) {
    return Boolean(child && typeof child !== 'string' && child.type === DOMVNODE);
}
function isElementNode(value) {
    return !!value.tagName;
}
function decorate(dNodes, optionsOrModifier, predicate) {
    let shallow = false;
    let modifier;
    if (typeof optionsOrModifier === 'function') {
        modifier = optionsOrModifier;
    }
    else {
        modifier = optionsOrModifier.modifier;
        predicate = optionsOrModifier.predicate;
        shallow = optionsOrModifier.shallow || false;
    }
    let nodes = Array.isArray(dNodes) ? [...dNodes] : [dNodes];
    function breaker() {
        nodes = [];
    }
    while (nodes.length) {
        const node = nodes.shift();
        if (node) {
            if (!shallow && (isWNode(node) || isVNode(node)) && node.children) {
                nodes = [...nodes, ...node.children];
            }
            if (!predicate || predicate(node)) {
                modifier(node, breaker);
            }
        }
    }
    return dNodes;
}
/**
 * Wrapper function for calls to create a widget.
 */
function w(widgetConstructor, properties, children = []) {
    return {
        children,
        widgetConstructor,
        properties,
        type: WNODE
    };
}
function v(tag, propertiesOrChildren = {}, children = undefined) {
    let properties = propertiesOrChildren;
    let deferredPropertiesCallback;
    if (Array.isArray(propertiesOrChildren)) {
        children = propertiesOrChildren;
        properties = {};
    }
    if (typeof properties === 'function') {
        deferredPropertiesCallback = properties;
        properties = {};
    }
    return {
        tag,
        deferredPropertiesCallback,
        children,
        properties,
        type: VNODE
    };
}
/**
 * Create a VNode for an existing DOM Node.
 */
function dom({ node, attrs = {}, props = {}, on = {}, diffType = 'none' }, children) {
    return {
        tag: isElementNode(node) ? node.tagName.toLowerCase() : '',
        properties: props,
        attributes: attrs,
        events: on,
        children,
        type: DOMVNODE,
        domNode: node,
        text: isElementNode(node) ? undefined : node.data,
        diffType
    };
}


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/decorators/afterRender.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = afterRender;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handleDecorator__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/handleDecorator.mjs");

function afterRender(method) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__handleDecorator__["a" /* handleDecorator */])((target, propertyKey) => {
        target.addDecorator('afterRender', propertyKey ? target[propertyKey] : method);
    });
}
/* unused harmony default export */ var _unused_webpack_default_export = (afterRender);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/decorators/handleDecorator.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = handleDecorator;
/**
 * Generic decorator handler to take care of whether or not the decorator was called at the class level
 * or the method level.
 *
 * @param handler
 */
function handleDecorator(handler) {
    return function (target, propertyKey, descriptor) {
        if (typeof target === 'function') {
            handler(target.prototype, undefined);
        }
        else {
            handler(target, propertyKey);
        }
    };
}
/* unused harmony default export */ var _unused_webpack_default_export = (handleDecorator);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/diff.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export always */
/* unused harmony export ignore */
/* unused harmony export reference */
/* unused harmony export shallow */
/* harmony export (immutable) */ __webpack_exports__["a"] = auto;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Registry__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/Registry.mjs");

function isObjectOrArray(value) {
    return Object.prototype.toString.call(value) === '[object Object]' || Array.isArray(value);
}
function always(previousProperty, newProperty) {
    return {
        changed: true,
        value: newProperty
    };
}
function ignore(previousProperty, newProperty) {
    return {
        changed: false,
        value: newProperty
    };
}
function reference(previousProperty, newProperty) {
    return {
        changed: previousProperty !== newProperty,
        value: newProperty
    };
}
function shallow(previousProperty, newProperty) {
    let changed = false;
    const validOldProperty = previousProperty && isObjectOrArray(previousProperty);
    const validNewProperty = newProperty && isObjectOrArray(newProperty);
    if (!validOldProperty || !validNewProperty) {
        return {
            changed: true,
            value: newProperty
        };
    }
    const previousKeys = Object.keys(previousProperty);
    const newKeys = Object.keys(newProperty);
    if (previousKeys.length !== newKeys.length) {
        changed = true;
    }
    else {
        changed = newKeys.some((key) => {
            return newProperty[key] !== previousProperty[key];
        });
    }
    return {
        changed,
        value: newProperty
    };
}
function auto(previousProperty, newProperty) {
    let result;
    if (typeof newProperty === 'function') {
        if (newProperty._type === __WEBPACK_IMPORTED_MODULE_0__Registry__["b" /* WIDGET_BASE_TYPE */]) {
            result = reference(previousProperty, newProperty);
        }
        else {
            result = ignore(previousProperty, newProperty);
        }
    }
    else if (isObjectOrArray(newProperty)) {
        result = shallow(previousProperty, newProperty);
    }
    else {
        result = reference(previousProperty, newProperty);
    }
    return result;
}


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/mixins/Projector.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ProjectorAttachState */
/* unused harmony export AttachType */
/* harmony export (immutable) */ __webpack_exports__["a"] = ProjectorMixin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_lang__ = __webpack_require__("./node_modules/@dojo/framework/core/lang.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animations_cssTransitions__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/animations/cssTransitions.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__decorators_afterRender__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/decorators/afterRender.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__d__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/d.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__vdom__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/vdom.mjs");






/**
 * Represents the attach state of the projector
 */
var ProjectorAttachState;
(function (ProjectorAttachState) {
    ProjectorAttachState[ProjectorAttachState["Attached"] = 1] = "Attached";
    ProjectorAttachState[ProjectorAttachState["Detached"] = 2] = "Detached";
})(ProjectorAttachState || (ProjectorAttachState = {}));
/**
 * Attach type for the projector
 */
var AttachType;
(function (AttachType) {
    AttachType[AttachType["Append"] = 1] = "Append";
    AttachType[AttachType["Merge"] = 2] = "Merge";
})(AttachType || (AttachType = {}));
function ProjectorMixin(Base) {
    class Projector extends Base {
        constructor(...args) {
            super(...args);
            this._root = document.body;
            this._async = true;
            this._projectorProperties = {};
            this._projectionOptions = {
                transitions: __WEBPACK_IMPORTED_MODULE_2__animations_cssTransitions__["a" /* default */]
            };
            this.root = document.body;
            this.projectorState = ProjectorAttachState.Detached;
        }
        append(root) {
            const options = {
                type: AttachType.Append,
                root
            };
            return this._attach(options);
        }
        merge(root) {
            const options = {
                type: AttachType.Merge,
                root
            };
            return this._attach(options);
        }
        set root(root) {
            if (this.projectorState === ProjectorAttachState.Attached) {
                throw new Error('Projector already attached, cannot change root element');
            }
            this._root = root;
        }
        get root() {
            return this._root;
        }
        get async() {
            return this._async;
        }
        set async(async) {
            if (this.projectorState === ProjectorAttachState.Attached) {
                throw new Error('Projector already attached, cannot change async mode');
            }
            this._async = async;
        }
        sandbox(doc = document) {
            if (this.projectorState === ProjectorAttachState.Attached) {
                throw new Error('Projector already attached, cannot create sandbox');
            }
            this._async = false;
            const previousRoot = this.root;
            /* free up the document fragment for GC */
            this.own({
                destroy: () => {
                    this._root = previousRoot;
                }
            });
            this._attach({
                /* DocumentFragment is not assignable to Element, but provides everything needed to work */
                root: doc.createDocumentFragment(),
                type: AttachType.Append
            });
        }
        setChildren(children) {
            this.__setChildren__(children);
        }
        setProperties(properties) {
            this.__setProperties__(properties);
        }
        __setProperties__(properties) {
            if (this._projectorProperties && this._projectorProperties.registry !== properties.registry) {
                if (this._projectorProperties.registry) {
                    this._projectorProperties.registry.destroy();
                }
            }
            this._projectorProperties = Object(__WEBPACK_IMPORTED_MODULE_1__core_lang__["a" /* assign */])({}, properties);
            super.__setCoreProperties__({ bind: this, baseRegistry: properties.registry });
            super.__setProperties__(properties);
        }
        toHtml() {
            if (this.projectorState !== ProjectorAttachState.Attached || !this._projection) {
                throw new Error('Projector is not attached, cannot return an HTML string of projection.');
            }
            return this._projection.domNode.childNodes[0].outerHTML;
        }
        afterRender(result) {
            let node = result;
            if (typeof result === 'string' || result === null || result === undefined) {
                node = Object(__WEBPACK_IMPORTED_MODULE_4__d__["f" /* v */])('span', {}, [result]);
            }
            return node;
        }
        destroy() {
            super.destroy();
        }
        _attach({ type, root }) {
            if (root) {
                this.root = root;
            }
            if (this._attachHandle) {
                return this._attachHandle;
            }
            this.projectorState = ProjectorAttachState.Attached;
            const handle = {
                destroy: () => {
                    if (this.projectorState === ProjectorAttachState.Attached) {
                        this._projection = undefined;
                        this.projectorState = ProjectorAttachState.Detached;
                    }
                }
            };
            this.own(handle);
            this._attachHandle = handle;
            this._projectionOptions = Object.assign({}, this._projectionOptions, { sync: !this._async });
            switch (type) {
                case AttachType.Append:
                    this._projection = __WEBPACK_IMPORTED_MODULE_5__vdom__["a" /* dom */].append(this.root, this, this._projectionOptions);
                    break;
                case AttachType.Merge:
                    this._projection = __WEBPACK_IMPORTED_MODULE_5__vdom__["a" /* dom */].merge(this.root, this, this._projectionOptions);
                    break;
            }
            return this._attachHandle;
        }
    }
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
        Object(__WEBPACK_IMPORTED_MODULE_3__decorators_afterRender__["a" /* afterRender */])()
    ], Projector.prototype, "afterRender", null);
    return Projector;
}
/* unused harmony default export */ var _unused_webpack_default_export = (ProjectorMixin);


/***/ }),

/***/ "./node_modules/@dojo/framework/widget-core/vdom.mjs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export toParentVNode */
/* unused harmony export toTextVNode */
/* unused harmony export filterAndDecorateChildren */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shim_global__ = __webpack_require__("./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shim_array__ = __webpack_require__("./node_modules/@dojo/framework/shim/array.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__d__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/d.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Registry__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/Registry.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shim_WeakMap__ = __webpack_require__("./node_modules/@dojo/framework/shim/WeakMap.mjs");





const NAMESPACE_W3 = 'http://www.w3.org/';
const NAMESPACE_SVG = NAMESPACE_W3 + '2000/svg';
const NAMESPACE_XLINK = NAMESPACE_W3 + '1999/xlink';
const emptyArray = [];
const nodeOperations = ['focus', 'blur', 'scrollIntoView', 'click'];
const widgetInstanceMap = new __WEBPACK_IMPORTED_MODULE_4__shim_WeakMap__["a" /* default */]();
/* harmony export (immutable) */ __webpack_exports__["b"] = widgetInstanceMap;

const instanceMap = new __WEBPACK_IMPORTED_MODULE_4__shim_WeakMap__["a" /* default */]();
const nextSiblingMap = new __WEBPACK_IMPORTED_MODULE_4__shim_WeakMap__["a" /* default */]();
const projectorStateMap = new __WEBPACK_IMPORTED_MODULE_4__shim_WeakMap__["a" /* default */]();
function same(dnode1, dnode2) {
    if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["d" /* isVNode */])(dnode1) && Object(__WEBPACK_IMPORTED_MODULE_2__d__["d" /* isVNode */])(dnode2)) {
        if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["c" /* isDomVNode */])(dnode1) || Object(__WEBPACK_IMPORTED_MODULE_2__d__["c" /* isDomVNode */])(dnode2)) {
            if (dnode1.domNode !== dnode2.domNode) {
                return false;
            }
        }
        if (dnode1.tag !== dnode2.tag) {
            return false;
        }
        if (dnode1.properties.key !== dnode2.properties.key) {
            return false;
        }
        return true;
    }
    else if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["e" /* isWNode */])(dnode1) && Object(__WEBPACK_IMPORTED_MODULE_2__d__["e" /* isWNode */])(dnode2)) {
        if (dnode1.instance === undefined && typeof dnode2.widgetConstructor === 'string') {
            return false;
        }
        if (dnode1.widgetConstructor !== dnode2.widgetConstructor) {
            return false;
        }
        if (dnode1.properties.key !== dnode2.properties.key) {
            return false;
        }
        return true;
    }
    return false;
}
const missingTransition = function () {
    throw new Error('Provide a transitions object to the projectionOptions to do animations');
};
function getProjectionOptions(projectorOptions, projectorInstance) {
    const defaults = {
        namespace: undefined,
        styleApplyer: function (domNode, styleName, value) {
            domNode.style[styleName] = value;
        },
        transitions: {
            enter: missingTransition,
            exit: missingTransition
        },
        depth: 0,
        merge: false,
        sync: false,
        projectorInstance
    };
    return Object.assign({}, defaults, projectorOptions);
}
function checkStyleValue(styleValue) {
    if (typeof styleValue !== 'string') {
        throw new Error('Style values must be strings');
    }
}
function updateEvent(domNode, eventName, currentValue, projectionOptions, bind, previousValue) {
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    const eventMap = projectorState.nodeMap.get(domNode) || new __WEBPACK_IMPORTED_MODULE_4__shim_WeakMap__["a" /* default */]();
    if (previousValue) {
        const previousEvent = eventMap.get(previousValue);
        domNode.removeEventListener(eventName, previousEvent);
    }
    let callback = currentValue.bind(bind);
    if (eventName === 'input') {
        callback = function (evt) {
            currentValue.call(this, evt);
            evt.target['oninput-value'] = evt.target.value;
        }.bind(bind);
    }
    domNode.addEventListener(eventName, callback);
    eventMap.set(currentValue, callback);
    projectorState.nodeMap.set(domNode, eventMap);
}
function addClasses(domNode, classes) {
    if (classes) {
        const classNames = classes.split(' ');
        for (let i = 0; i < classNames.length; i++) {
            domNode.classList.add(classNames[i]);
        }
    }
}
function removeClasses(domNode, classes) {
    if (classes) {
        const classNames = classes.split(' ');
        for (let i = 0; i < classNames.length; i++) {
            domNode.classList.remove(classNames[i]);
        }
    }
}
function buildPreviousProperties(domNode, previous, current) {
    const { diffType, properties, attributes } = current;
    if (!diffType || diffType === 'vdom') {
        return { properties: previous.properties, attributes: previous.attributes, events: previous.events };
    }
    else if (diffType === 'none') {
        return { properties: {}, attributes: previous.attributes ? {} : undefined, events: previous.events };
    }
    let newProperties = {
        properties: {}
    };
    if (attributes) {
        newProperties.attributes = {};
        newProperties.events = previous.events;
        Object.keys(properties).forEach((propName) => {
            newProperties.properties[propName] = domNode[propName];
        });
        Object.keys(attributes).forEach((attrName) => {
            newProperties.attributes[attrName] = domNode.getAttribute(attrName);
        });
        return newProperties;
    }
    newProperties.properties = Object.keys(properties).reduce((props, property) => {
        props[property] = domNode.getAttribute(property) || domNode[property];
        return props;
    }, {});
    return newProperties;
}
function nodeOperation(propName, propValue, previousValue, domNode, projectionOptions) {
    let result;
    if (typeof propValue === 'function') {
        result = propValue();
    }
    else {
        result = propValue && !previousValue;
    }
    if (result === true) {
        const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
        projectorState.deferredRenderCallbacks.push(() => {
            domNode[propName]();
        });
    }
}
function removeOrphanedEvents(domNode, previousProperties, properties, projectionOptions, onlyEvents = false) {
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    const eventMap = projectorState.nodeMap.get(domNode);
    if (eventMap) {
        Object.keys(previousProperties).forEach((propName) => {
            const isEvent = propName.substr(0, 2) === 'on' || onlyEvents;
            const eventName = onlyEvents ? propName : propName.substr(2);
            if (isEvent && !properties[propName]) {
                const eventCallback = eventMap.get(previousProperties[propName]);
                if (eventCallback) {
                    domNode.removeEventListener(eventName, eventCallback);
                }
            }
        });
    }
}
function updateAttribute(domNode, attrName, attrValue, projectionOptions) {
    if (projectionOptions.namespace === NAMESPACE_SVG && attrName === 'href') {
        domNode.setAttributeNS(NAMESPACE_XLINK, attrName, attrValue);
    }
    else if ((attrName === 'role' && attrValue === '') || attrValue === undefined) {
        domNode.removeAttribute(attrName);
    }
    else {
        domNode.setAttribute(attrName, attrValue);
    }
}
function updateAttributes(domNode, previousAttributes, attributes, projectionOptions) {
    const attrNames = Object.keys(attributes);
    const attrCount = attrNames.length;
    for (let i = 0; i < attrCount; i++) {
        const attrName = attrNames[i];
        const attrValue = attributes[attrName];
        const previousAttrValue = previousAttributes[attrName];
        if (attrValue !== previousAttrValue) {
            updateAttribute(domNode, attrName, attrValue, projectionOptions);
        }
    }
}
function updateProperties(domNode, previousProperties, properties, projectionOptions, includesEventsAndAttributes = true) {
    let propertiesUpdated = false;
    const propNames = Object.keys(properties);
    const propCount = propNames.length;
    if (propNames.indexOf('classes') === -1 && previousProperties.classes) {
        if (Array.isArray(previousProperties.classes)) {
            for (let i = 0; i < previousProperties.classes.length; i++) {
                removeClasses(domNode, previousProperties.classes[i]);
            }
        }
        else {
            removeClasses(domNode, previousProperties.classes);
        }
    }
    includesEventsAndAttributes && removeOrphanedEvents(domNode, previousProperties, properties, projectionOptions);
    for (let i = 0; i < propCount; i++) {
        const propName = propNames[i];
        let propValue = properties[propName];
        const previousValue = previousProperties[propName];
        if (propName === 'classes') {
            const previousClasses = Array.isArray(previousValue) ? previousValue : [previousValue];
            const currentClasses = Array.isArray(propValue) ? propValue : [propValue];
            if (previousClasses && previousClasses.length > 0) {
                if (!propValue || propValue.length === 0) {
                    for (let i = 0; i < previousClasses.length; i++) {
                        removeClasses(domNode, previousClasses[i]);
                    }
                }
                else {
                    const newClasses = [...currentClasses];
                    for (let i = 0; i < previousClasses.length; i++) {
                        const previousClassName = previousClasses[i];
                        if (previousClassName) {
                            const classIndex = newClasses.indexOf(previousClassName);
                            if (classIndex === -1) {
                                removeClasses(domNode, previousClassName);
                            }
                            else {
                                newClasses.splice(classIndex, 1);
                            }
                        }
                    }
                    for (let i = 0; i < newClasses.length; i++) {
                        addClasses(domNode, newClasses[i]);
                    }
                }
            }
            else {
                for (let i = 0; i < currentClasses.length; i++) {
                    addClasses(domNode, currentClasses[i]);
                }
            }
        }
        else if (nodeOperations.indexOf(propName) !== -1) {
            nodeOperation(propName, propValue, previousValue, domNode, projectionOptions);
        }
        else if (propName === 'styles') {
            const styleNames = Object.keys(propValue);
            const styleCount = styleNames.length;
            for (let j = 0; j < styleCount; j++) {
                const styleName = styleNames[j];
                const newStyleValue = propValue[styleName];
                const oldStyleValue = previousValue && previousValue[styleName];
                if (newStyleValue === oldStyleValue) {
                    continue;
                }
                propertiesUpdated = true;
                if (newStyleValue) {
                    checkStyleValue(newStyleValue);
                    projectionOptions.styleApplyer(domNode, styleName, newStyleValue);
                }
                else {
                    projectionOptions.styleApplyer(domNode, styleName, '');
                }
            }
        }
        else {
            if (!propValue && typeof previousValue === 'string') {
                propValue = '';
            }
            if (propName === 'value') {
                const domValue = domNode[propName];
                if (domValue !== propValue &&
                    (domNode['oninput-value']
                        ? domValue === domNode['oninput-value']
                        : propValue !== previousValue)) {
                    domNode[propName] = propValue;
                    domNode['oninput-value'] = undefined;
                }
                if (propValue !== previousValue) {
                    propertiesUpdated = true;
                }
            }
            else if (propName !== 'key' && propValue !== previousValue) {
                const type = typeof propValue;
                if (type === 'function' && propName.lastIndexOf('on', 0) === 0 && includesEventsAndAttributes) {
                    updateEvent(domNode, propName.substr(2), propValue, projectionOptions, properties.bind, previousValue);
                }
                else if (type === 'string' && propName !== 'innerHTML' && includesEventsAndAttributes) {
                    updateAttribute(domNode, propName, propValue, projectionOptions);
                }
                else if (propName === 'scrollLeft' || propName === 'scrollTop') {
                    if (domNode[propName] !== propValue) {
                        domNode[propName] = propValue;
                    }
                }
                else {
                    domNode[propName] = propValue;
                }
                propertiesUpdated = true;
            }
        }
    }
    return propertiesUpdated;
}
function findIndexOfChild(children, sameAs, start) {
    for (let i = start; i < children.length; i++) {
        if (same(children[i], sameAs)) {
            return i;
        }
    }
    return -1;
}
function toParentVNode(domNode) {
    return {
        tag: '',
        properties: {},
        children: undefined,
        domNode,
        type: __WEBPACK_IMPORTED_MODULE_2__d__["a" /* VNODE */]
    };
}
function toTextVNode(data) {
    return {
        tag: '',
        properties: {},
        children: undefined,
        text: `${data}`,
        domNode: undefined,
        type: __WEBPACK_IMPORTED_MODULE_2__d__["a" /* VNODE */]
    };
}
function toInternalWNode(instance, instanceData) {
    return {
        instance,
        rendered: [],
        coreProperties: instanceData.coreProperties,
        children: instance.children,
        widgetConstructor: instance.constructor,
        properties: instanceData.inputProperties,
        type: __WEBPACK_IMPORTED_MODULE_2__d__["b" /* WNODE */]
    };
}
function filterAndDecorateChildren(children, instance) {
    if (children === undefined) {
        return emptyArray;
    }
    children = Array.isArray(children) ? children : [children];
    for (let i = 0; i < children.length;) {
        const child = children[i];
        if (child === undefined || child === null) {
            children.splice(i, 1);
            continue;
        }
        else if (typeof child === 'string') {
            children[i] = toTextVNode(child);
        }
        else {
            if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["d" /* isVNode */])(child)) {
                if (child.properties.bind === undefined) {
                    child.properties.bind = instance;
                    if (child.children && child.children.length > 0) {
                        filterAndDecorateChildren(child.children, instance);
                    }
                }
            }
            else {
                if (!child.coreProperties) {
                    const instanceData = widgetInstanceMap.get(instance);
                    child.coreProperties = {
                        bind: instance,
                        baseRegistry: instanceData.coreProperties.baseRegistry
                    };
                }
                if (child.children && child.children.length > 0) {
                    filterAndDecorateChildren(child.children, instance);
                }
            }
        }
        i++;
    }
    return children;
}
function nodeAdded(dnode, transitions) {
    if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["d" /* isVNode */])(dnode) && dnode.properties) {
        const enterAnimation = dnode.properties.enterAnimation;
        if (enterAnimation) {
            if (typeof enterAnimation === 'function') {
                enterAnimation(dnode.domNode, dnode.properties);
            }
            else {
                transitions.enter(dnode.domNode, dnode.properties, enterAnimation);
            }
        }
    }
}
function nodeToRemove(dnode, transitions, projectionOptions) {
    if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["e" /* isWNode */])(dnode)) {
        const item = instanceMap.get(dnode.instance);
        const rendered = (item ? item.dnode.rendered : dnode.rendered) || emptyArray;
        if (dnode.instance) {
            const instanceData = widgetInstanceMap.get(dnode.instance);
            instanceData.onDetach();
            instanceMap.delete(dnode.instance);
        }
        for (let i = 0; i < rendered.length; i++) {
            nodeToRemove(rendered[i], transitions, projectionOptions);
        }
    }
    else {
        const domNode = dnode.domNode;
        const properties = dnode.properties;
        if (dnode.children && dnode.children.length > 0) {
            for (let i = 0; i < dnode.children.length; i++) {
                nodeToRemove(dnode.children[i], transitions, projectionOptions);
            }
        }
        const exitAnimation = properties.exitAnimation;
        if (properties && exitAnimation) {
            domNode.style.pointerEvents = 'none';
            const removeDomNode = function () {
                domNode && domNode.parentNode && domNode.parentNode.removeChild(domNode);
                dnode.domNode = undefined;
            };
            if (typeof exitAnimation === 'function') {
                exitAnimation(domNode, removeDomNode, properties);
                return;
            }
            else {
                transitions.exit(dnode.domNode, properties, exitAnimation, removeDomNode);
                return;
            }
        }
        domNode && domNode.parentNode && domNode.parentNode.removeChild(domNode);
        dnode.domNode = undefined;
    }
}
function checkDistinguishable(childNodes, indexToCheck, parentInstance) {
    const childNode = childNodes[indexToCheck];
    if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["d" /* isVNode */])(childNode) && !childNode.tag) {
        return; // Text nodes need not be distinguishable
    }
    const { key } = childNode.properties;
    if (key === undefined || key === null) {
        for (let i = 0; i < childNodes.length; i++) {
            if (i !== indexToCheck) {
                const node = childNodes[i];
                if (same(node, childNode)) {
                    let nodeIdentifier;
                    const parentName = parentInstance.constructor.name || 'unknown';
                    if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["e" /* isWNode */])(childNode)) {
                        nodeIdentifier = childNode.widgetConstructor.name || 'unknown';
                    }
                    else {
                        nodeIdentifier = childNode.tag;
                    }
                    console.warn(`A widget (${parentName}) has had a child addded or removed, but they were not able to uniquely identified. It is recommended to provide a unique 'key' property when using the same widget or element (${nodeIdentifier}) multiple times as siblings`);
                    break;
                }
            }
        }
    }
}
function updateChildren(parentVNode, siblings, oldChildren, newChildren, parentInstance, projectionOptions) {
    oldChildren = oldChildren || emptyArray;
    newChildren = newChildren;
    const oldChildrenLength = oldChildren.length;
    const newChildrenLength = newChildren.length;
    const transitions = projectionOptions.transitions;
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    projectionOptions = Object.assign({}, projectionOptions, { depth: projectionOptions.depth + 1 });
    let oldIndex = 0;
    let newIndex = 0;
    let i;
    let textUpdated = false;
    while (newIndex < newChildrenLength) {
        let oldChild = oldIndex < oldChildrenLength ? oldChildren[oldIndex] : undefined;
        const newChild = newChildren[newIndex];
        if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["d" /* isVNode */])(newChild) && typeof newChild.deferredPropertiesCallback === 'function') {
            newChild.inserted = Object(__WEBPACK_IMPORTED_MODULE_2__d__["d" /* isVNode */])(oldChild) && oldChild.inserted;
            addDeferredProperties(newChild, projectionOptions);
        }
        if (oldChild !== undefined && same(oldChild, newChild)) {
            oldIndex++;
            newIndex++;
            textUpdated =
                updateDom(oldChild, newChild, projectionOptions, parentVNode, parentInstance, oldChildren.slice(oldIndex), newChildren.slice(newIndex)) || textUpdated;
            continue;
        }
        const findOldIndex = findIndexOfChild(oldChildren, newChild, oldIndex + 1);
        const addChild = () => {
            let insertBeforeDomNode = undefined;
            let childrenArray = oldChildren;
            let nextIndex = oldIndex + 1;
            let child = oldChildren[oldIndex];
            if (!child) {
                child = siblings[0];
                nextIndex = 1;
                childrenArray = siblings;
            }
            if (child) {
                let insertBeforeChildren = [child];
                while (insertBeforeChildren.length) {
                    const insertBefore = insertBeforeChildren.shift();
                    if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["e" /* isWNode */])(insertBefore)) {
                        const item = instanceMap.get(insertBefore.instance);
                        if (item && item.dnode.rendered) {
                            insertBeforeChildren.push(...item.dnode.rendered);
                        }
                    }
                    else {
                        if (insertBefore.domNode) {
                            if (insertBefore.domNode.parentElement !== parentVNode.domNode) {
                                break;
                            }
                            insertBeforeDomNode = insertBefore.domNode;
                            break;
                        }
                    }
                    if (insertBeforeChildren.length === 0 && childrenArray[nextIndex]) {
                        insertBeforeChildren.push(childrenArray[nextIndex]);
                        nextIndex++;
                    }
                }
            }
            createDom(newChild, parentVNode, newChildren.slice(newIndex + 1), insertBeforeDomNode, projectionOptions, parentInstance);
            nodeAdded(newChild, transitions);
            const indexToCheck = newIndex;
            projectorState.afterRenderCallbacks.push(() => {
                checkDistinguishable(newChildren, indexToCheck, parentInstance);
            });
        };
        if (!oldChild || findOldIndex === -1) {
            addChild();
            newIndex++;
            continue;
        }
        const removeChild = () => {
            const indexToCheck = oldIndex;
            projectorState.afterRenderCallbacks.push(() => {
                checkDistinguishable(oldChildren, indexToCheck, parentInstance);
            });
            if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["e" /* isWNode */])(oldChild)) {
                const item = instanceMap.get(oldChild.instance);
                if (item) {
                    oldChild = item.dnode;
                }
            }
            nodeToRemove(oldChild, transitions, projectionOptions);
        };
        const findNewIndex = findIndexOfChild(newChildren, oldChild, newIndex + 1);
        if (findNewIndex === -1) {
            removeChild();
            oldIndex++;
            continue;
        }
        addChild();
        removeChild();
        oldIndex++;
        newIndex++;
    }
    if (oldChildrenLength > oldIndex) {
        // Remove child fragments
        for (i = oldIndex; i < oldChildrenLength; i++) {
            const indexToCheck = i;
            projectorState.afterRenderCallbacks.push(() => {
                checkDistinguishable(oldChildren, indexToCheck, parentInstance);
            });
            let childToRemove = oldChildren[i];
            if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["e" /* isWNode */])(childToRemove)) {
                const item = instanceMap.get(childToRemove.instance);
                if (item) {
                    childToRemove = item.dnode;
                }
            }
            nodeToRemove(childToRemove, transitions, projectionOptions);
        }
    }
    return textUpdated;
}
function addChildren(parentVNode, children, projectionOptions, parentInstance, insertBefore = undefined, childNodes) {
    if (children === undefined) {
        return;
    }
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (projectorState.merge && childNodes === undefined) {
        childNodes = Object(__WEBPACK_IMPORTED_MODULE_1__shim_array__["a" /* from */])(parentVNode.domNode.childNodes);
    }
    const transitions = projectionOptions.transitions;
    projectionOptions = Object.assign({}, projectionOptions, { depth: projectionOptions.depth + 1 });
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const nextSiblings = children.slice(i + 1);
        if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["d" /* isVNode */])(child)) {
            if (projectorState.merge && childNodes) {
                let domElement = undefined;
                while (child.domNode === undefined && childNodes.length > 0) {
                    domElement = childNodes.shift();
                    if (domElement && domElement.tagName === (child.tag.toUpperCase() || undefined)) {
                        child.domNode = domElement;
                    }
                }
            }
            createDom(child, parentVNode, nextSiblings, insertBefore, projectionOptions, parentInstance);
        }
        else {
            createDom(child, parentVNode, nextSiblings, insertBefore, projectionOptions, parentInstance, childNodes);
        }
        nodeAdded(child, transitions);
    }
}
function initPropertiesAndChildren(domNode, dnode, parentInstance, projectionOptions) {
    addChildren(dnode, dnode.children, projectionOptions, parentInstance, undefined);
    if (typeof dnode.deferredPropertiesCallback === 'function' && dnode.inserted === undefined) {
        addDeferredProperties(dnode, projectionOptions);
    }
    if (dnode.attributes && dnode.events) {
        updateAttributes(domNode, {}, dnode.attributes, projectionOptions);
        updateProperties(domNode, {}, dnode.properties, projectionOptions, false);
        removeOrphanedEvents(domNode, {}, dnode.events, projectionOptions, true);
        const events = dnode.events;
        Object.keys(events).forEach((event) => {
            updateEvent(domNode, event, events[event], projectionOptions, dnode.properties.bind);
        });
    }
    else {
        updateProperties(domNode, {}, dnode.properties, projectionOptions);
    }
    if (dnode.properties.key !== null && dnode.properties.key !== undefined) {
        const instanceData = widgetInstanceMap.get(parentInstance);
        instanceData.nodeHandler.add(domNode, `${dnode.properties.key}`);
    }
    dnode.inserted = true;
}
function createDom(dnode, parentVNode, nextSiblings, insertBefore, projectionOptions, parentInstance, childNodes) {
    let domNode;
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["e" /* isWNode */])(dnode)) {
        let { widgetConstructor } = dnode;
        const parentInstanceData = widgetInstanceMap.get(parentInstance);
        if (!Object(__WEBPACK_IMPORTED_MODULE_3__Registry__["c" /* isWidgetBaseConstructor */])(widgetConstructor)) {
            const item = parentInstanceData.registry().get(widgetConstructor);
            if (item === null) {
                return;
            }
            widgetConstructor = item;
        }
        const instance = new widgetConstructor();
        dnode.instance = instance;
        nextSiblingMap.set(instance, nextSiblings);
        const instanceData = widgetInstanceMap.get(instance);
        instanceData.invalidate = () => {
            instanceData.dirty = true;
            if (instanceData.rendering === false) {
                projectorState.renderQueue.push({ instance, depth: projectionOptions.depth });
                scheduleRender(projectionOptions);
            }
        };
        instanceData.rendering = true;
        instance.__setCoreProperties__(dnode.coreProperties);
        instance.__setChildren__(dnode.children);
        instance.__setProperties__(dnode.properties);
        const rendered = instance.__render__();
        instanceData.rendering = false;
        if (rendered) {
            const filteredRendered = filterAndDecorateChildren(rendered, instance);
            dnode.rendered = filteredRendered;
            addChildren(parentVNode, filteredRendered, projectionOptions, instance, insertBefore, childNodes);
        }
        instanceMap.set(instance, { dnode, parentVNode });
        instanceData.nodeHandler.addRoot();
        projectorState.afterRenderCallbacks.push(() => {
            instanceData.onAttach();
        });
    }
    else {
        if (projectorState.merge && projectorState.mergeElement !== undefined) {
            domNode = dnode.domNode = projectionOptions.mergeElement;
            projectorState.mergeElement = undefined;
            initPropertiesAndChildren(domNode, dnode, parentInstance, projectionOptions);
            return;
        }
        const doc = parentVNode.domNode.ownerDocument;
        if (!dnode.tag && typeof dnode.text === 'string') {
            if (dnode.domNode !== undefined && parentVNode.domNode) {
                const newDomNode = dnode.domNode.ownerDocument.createTextNode(dnode.text);
                if (parentVNode.domNode === dnode.domNode.parentNode) {
                    parentVNode.domNode.replaceChild(newDomNode, dnode.domNode);
                }
                else {
                    parentVNode.domNode.appendChild(newDomNode);
                    dnode.domNode.parentNode && dnode.domNode.parentNode.removeChild(dnode.domNode);
                }
                dnode.domNode = newDomNode;
            }
            else {
                domNode = dnode.domNode = doc.createTextNode(dnode.text);
                if (insertBefore !== undefined) {
                    parentVNode.domNode.insertBefore(domNode, insertBefore);
                }
                else {
                    parentVNode.domNode.appendChild(domNode);
                }
            }
        }
        else {
            if (dnode.domNode === undefined) {
                if (dnode.tag === 'svg') {
                    projectionOptions = Object.assign({}, projectionOptions, { namespace: NAMESPACE_SVG });
                }
                if (projectionOptions.namespace !== undefined) {
                    domNode = dnode.domNode = doc.createElementNS(projectionOptions.namespace, dnode.tag);
                }
                else {
                    domNode = dnode.domNode = dnode.domNode || doc.createElement(dnode.tag);
                }
            }
            else {
                domNode = dnode.domNode;
            }
            initPropertiesAndChildren(domNode, dnode, parentInstance, projectionOptions);
            if (insertBefore !== undefined) {
                parentVNode.domNode.insertBefore(domNode, insertBefore);
            }
            else if (domNode.parentNode !== parentVNode.domNode) {
                parentVNode.domNode.appendChild(domNode);
            }
        }
    }
}
function updateDom(previous, dnode, projectionOptions, parentVNode, parentInstance, oldNextSiblings, nextSiblings) {
    if (Object(__WEBPACK_IMPORTED_MODULE_2__d__["e" /* isWNode */])(dnode)) {
        const { instance } = previous;
        const { parentVNode, dnode: node } = instanceMap.get(instance);
        const previousRendered = node ? node.rendered : previous.rendered;
        const instanceData = widgetInstanceMap.get(instance);
        instanceData.rendering = true;
        instance.__setCoreProperties__(dnode.coreProperties);
        instance.__setChildren__(dnode.children);
        instance.__setProperties__(dnode.properties);
        nextSiblingMap.set(instance, nextSiblings);
        dnode.instance = instance;
        if (instanceData.dirty === true) {
            const rendered = instance.__render__();
            instanceData.rendering = false;
            dnode.rendered = filterAndDecorateChildren(rendered, instance);
            updateChildren(parentVNode, oldNextSiblings, previousRendered, dnode.rendered, instance, projectionOptions);
        }
        else {
            instanceData.rendering = false;
            dnode.rendered = previousRendered;
        }
        instanceMap.set(instance, { dnode, parentVNode });
        instanceData.nodeHandler.addRoot();
    }
    else {
        if (previous === dnode) {
            return false;
        }
        const domNode = (dnode.domNode = previous.domNode);
        let textUpdated = false;
        let updated = false;
        if (!dnode.tag && typeof dnode.text === 'string') {
            if (dnode.text !== previous.text) {
                const newDomNode = domNode.ownerDocument.createTextNode(dnode.text);
                domNode.parentNode.replaceChild(newDomNode, domNode);
                dnode.domNode = newDomNode;
                textUpdated = true;
                return textUpdated;
            }
        }
        else {
            if (dnode.tag && dnode.tag.lastIndexOf('svg', 0) === 0) {
                projectionOptions = Object.assign({}, projectionOptions, { namespace: NAMESPACE_SVG });
            }
            if (previous.children !== dnode.children) {
                const children = filterAndDecorateChildren(dnode.children, parentInstance);
                dnode.children = children;
                updated =
                    updateChildren(dnode, oldNextSiblings, previous.children, children, parentInstance, projectionOptions) || updated;
            }
            const previousProperties = buildPreviousProperties(domNode, previous, dnode);
            if (dnode.attributes && dnode.events) {
                updateAttributes(domNode, previousProperties.attributes, dnode.attributes, projectionOptions);
                updated =
                    updateProperties(domNode, previousProperties.properties, dnode.properties, projectionOptions, false) || updated;
                removeOrphanedEvents(domNode, previousProperties.events, dnode.events, projectionOptions, true);
                const events = dnode.events;
                Object.keys(events).forEach((event) => {
                    updateEvent(domNode, event, events[event], projectionOptions, dnode.properties.bind, previousProperties.events[event]);
                });
            }
            else {
                updated =
                    updateProperties(domNode, previousProperties.properties, dnode.properties, projectionOptions) ||
                        updated;
            }
            if (dnode.properties.key !== null && dnode.properties.key !== undefined) {
                const instanceData = widgetInstanceMap.get(parentInstance);
                instanceData.nodeHandler.add(domNode, `${dnode.properties.key}`);
            }
        }
        if (updated && dnode.properties && dnode.properties.updateAnimation) {
            dnode.properties.updateAnimation(domNode, dnode.properties, previous.properties);
        }
    }
}
function addDeferredProperties(vnode, projectionOptions) {
    // transfer any properties that have been passed - as these must be decorated properties
    vnode.decoratedDeferredProperties = vnode.properties;
    const properties = vnode.deferredPropertiesCallback(!!vnode.inserted);
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    vnode.properties = Object.assign({}, properties, vnode.decoratedDeferredProperties);
    projectorState.deferredRenderCallbacks.push(() => {
        const properties = Object.assign({}, vnode.deferredPropertiesCallback(!!vnode.inserted), vnode.decoratedDeferredProperties);
        updateProperties(vnode.domNode, vnode.properties, properties, projectionOptions);
        vnode.properties = properties;
    });
}
function runDeferredRenderCallbacks(projectionOptions) {
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (projectorState.deferredRenderCallbacks.length) {
        if (projectionOptions.sync) {
            while (projectorState.deferredRenderCallbacks.length) {
                const callback = projectorState.deferredRenderCallbacks.shift();
                callback && callback();
            }
        }
        else {
            __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].requestAnimationFrame(() => {
                while (projectorState.deferredRenderCallbacks.length) {
                    const callback = projectorState.deferredRenderCallbacks.shift();
                    callback && callback();
                }
            });
        }
    }
}
function runAfterRenderCallbacks(projectionOptions) {
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (projectionOptions.sync) {
        while (projectorState.afterRenderCallbacks.length) {
            const callback = projectorState.afterRenderCallbacks.shift();
            callback && callback();
        }
    }
    else {
        if (__WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].requestIdleCallback) {
            __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].requestIdleCallback(() => {
                while (projectorState.afterRenderCallbacks.length) {
                    const callback = projectorState.afterRenderCallbacks.shift();
                    callback && callback();
                }
            });
        }
        else {
            setTimeout(() => {
                while (projectorState.afterRenderCallbacks.length) {
                    const callback = projectorState.afterRenderCallbacks.shift();
                    callback && callback();
                }
            });
        }
    }
}
function scheduleRender(projectionOptions) {
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (projectionOptions.sync) {
        render(projectionOptions);
    }
    else if (projectorState.renderScheduled === undefined) {
        projectorState.renderScheduled = __WEBPACK_IMPORTED_MODULE_0__shim_global__["a" /* default */].requestAnimationFrame(() => {
            render(projectionOptions);
        });
    }
}
function render(projectionOptions) {
    const projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    projectorState.renderScheduled = undefined;
    const renderQueue = projectorState.renderQueue;
    const renders = [...renderQueue];
    projectorState.renderQueue = [];
    renders.sort((a, b) => a.depth - b.depth);
    const previouslyRendered = [];
    while (renders.length) {
        const { instance } = renders.shift();
        if (instanceMap.has(instance) && previouslyRendered.indexOf(instance) === -1) {
            previouslyRendered.push(instance);
            const { parentVNode, dnode } = instanceMap.get(instance);
            const instanceData = widgetInstanceMap.get(instance);
            const nextSiblings = nextSiblingMap.get(instance);
            updateDom(dnode, toInternalWNode(instance, instanceData), projectionOptions, parentVNode, instance, nextSiblings, nextSiblings);
        }
    }
    runAfterRenderCallbacks(projectionOptions);
    runDeferredRenderCallbacks(projectionOptions);
}
const dom = {
    append: function (parentNode, instance, projectionOptions = {}) {
        const instanceData = widgetInstanceMap.get(instance);
        const finalProjectorOptions = getProjectionOptions(projectionOptions, instance);
        const projectorState = {
            afterRenderCallbacks: [],
            deferredRenderCallbacks: [],
            nodeMap: new __WEBPACK_IMPORTED_MODULE_4__shim_WeakMap__["a" /* default */](),
            renderScheduled: undefined,
            renderQueue: [],
            merge: projectionOptions.merge || false,
            mergeElement: projectionOptions.mergeElement
        };
        projectorStateMap.set(instance, projectorState);
        finalProjectorOptions.rootNode = parentNode;
        const parentVNode = toParentVNode(finalProjectorOptions.rootNode);
        const node = toInternalWNode(instance, instanceData);
        instanceMap.set(instance, { dnode: node, parentVNode });
        instanceData.invalidate = () => {
            instanceData.dirty = true;
            if (instanceData.rendering === false) {
                projectorState.renderQueue.push({ instance, depth: finalProjectorOptions.depth });
                scheduleRender(finalProjectorOptions);
            }
        };
        updateDom(node, node, finalProjectorOptions, parentVNode, instance, [], []);
        projectorState.afterRenderCallbacks.push(() => {
            instanceData.onAttach();
        });
        runDeferredRenderCallbacks(finalProjectorOptions);
        runAfterRenderCallbacks(finalProjectorOptions);
        return {
            domNode: finalProjectorOptions.rootNode
        };
    },
    create: function (instance, projectionOptions) {
        return this.append(document.createElement('div'), instance, projectionOptions);
    },
    merge: function (element, instance, projectionOptions = {}) {
        projectionOptions.merge = true;
        projectionOptions.mergeElement = element;
        const projection = this.append(element.parentNode, instance, projectionOptions);
        const projectorState = projectorStateMap.get(instance);
        projectorState.merge = false;
        return projection;
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = dom;



/***/ }),

/***/ "./node_modules/@dojo/webpack-contrib/build-time-render/hasBuildTimeRender.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable-next-line
var has = __webpack_require__("./node_modules/@dojo/framework/core/has.mjs");
if (!has.exists('build-time-render')) {
    has.add('build-time-render', false, false);
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export __extends */
/* unused harmony export __assign */
/* unused harmony export __rest */
/* harmony export (immutable) */ __webpack_exports__["a"] = __decorate;
/* unused harmony export __param */
/* unused harmony export __metadata */
/* unused harmony export __awaiter */
/* unused harmony export __generator */
/* unused harmony export __exportStar */
/* unused harmony export __values */
/* unused harmony export __read */
/* unused harmony export __spread */
/* unused harmony export __await */
/* unused harmony export __asyncGenerator */
/* unused harmony export __asyncDelegator */
/* unused harmony export __asyncValues */
/* unused harmony export __makeTemplateObject */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dojo_framework_has_has__ = __webpack_require__("./node_modules/@dojo/framework/has/has.mjs");

const host = "localhost:9999";
/* harmony export (immutable) */ __webpack_exports__["a"] = host;



/***/ }),

/***/ "./src/img/logo.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2ho78oCW.svg";

/***/ }),

/***/ "./src/main.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dojo_framework_widget_core_mixins_Projector__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/mixins/Projector.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__widgets_HelloWorld__ = __webpack_require__("./src/widgets/HelloWorld.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__("./src/config.ts");



const Projector = Object(__WEBPACK_IMPORTED_MODULE_0__dojo_framework_widget_core_mixins_Projector__["a" /* ProjectorMixin */])(__WEBPACK_IMPORTED_MODULE_1__widgets_HelloWorld__["a" /* default */]);
const projector = new Projector();
projector.setProperties({ name: __WEBPACK_IMPORTED_MODULE_2__config__["a" /* host */] });
projector.append();


/***/ }),

/***/ "./src/widgets/HelloWorld.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dojo_framework_widget_core_WidgetBase__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/WidgetBase.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_d__ = __webpack_require__("./node_modules/@dojo/framework/widget-core/d.mjs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__styles_helloWorld_m_css__ = __webpack_require__("./src/widgets/styles/helloWorld.m.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__styles_helloWorld_m_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__styles_helloWorld_m_css__);



const logo = __webpack_require__("./src/img/logo.svg");
/**
 * A "Hello World" widget that renders a spinning Dojo 2 logo and the text "Hello, Dojo 2 World!".
 *
 * Refer to the creating widgets tutorial for help: https://dojo.io/tutorials/003_creating_widgets/
 */
class HelloWorld extends __WEBPACK_IMPORTED_MODULE_0__dojo_framework_widget_core_WidgetBase__["a" /* default */] {
    render() {
        return Object(__WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_d__["f" /* v */])('div', { classes: __WEBPACK_IMPORTED_MODULE_2__styles_helloWorld_m_css__["root"] }, [
            Object(__WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_d__["f" /* v */])('img', { src: logo, classes: __WEBPACK_IMPORTED_MODULE_2__styles_helloWorld_m_css__["logo"] }),
            Object(__WEBPACK_IMPORTED_MODULE_1__dojo_framework_widget_core_d__["f" /* v */])('div', { classes: __WEBPACK_IMPORTED_MODULE_2__styles_helloWorld_m_css__["label"] }, [`Hello, ${this.properties.name}!`])
        ]);
    }
}
/* unused harmony export HelloWorld */

/* harmony default export */ __webpack_exports__["a"] = (HelloWorld);


/***/ }),

/***/ "./src/widgets/styles/helloWorld.m.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {" _key":"features/helloWorld","root":"helloWorld-m__root__3mLE4","logo":"helloWorld-m__logo__SNEWw","rotation":"helloWorld-m__rotation__12uyc","label":"helloWorld-m__label__1nYEu"};

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/@dojo/webpack-contrib/build-time-render/hasBuildTimeRender.js");
__webpack_require__("./src/main.css");
module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy9EZXN0cm95YWJsZS50cyIsIndlYnBhY2s6Ly8vRXZlbnRlZC50cyIsIndlYnBhY2s6Ly8vaGFzLnRzIiwid2VicGFjazovLy9sYW5nLnRzIiwid2VicGFjazovLy9NYXAudHMiLCJ3ZWJwYWNrOi8vL1Byb21pc2UudHMiLCJ3ZWJwYWNrOi8vL1N5bWJvbC50cyIsIndlYnBhY2s6Ly8vV2Vha01hcC50cyIsIndlYnBhY2s6Ly8vYXJyYXkudHMiLCJ3ZWJwYWNrOi8vL2dsb2JhbC50cyIsIndlYnBhY2s6Ly8vaXRlcmF0b3IudHMiLCJ3ZWJwYWNrOi8vL251bWJlci50cyIsIndlYnBhY2s6Ly8vb2JqZWN0LnRzIiwid2VicGFjazovLy9zdHJpbmcudHMiLCJ3ZWJwYWNrOi8vL3F1ZXVlLnRzIiwid2VicGFjazovLy91dGlsLnRzIiwid2VicGFjazovLy9Ob2RlSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vUmVnaXN0cnkudHMiLCJ3ZWJwYWNrOi8vL1JlZ2lzdHJ5SGFuZGxlci50cyIsIndlYnBhY2s6Ly8vV2lkZ2V0QmFzZS50cyIsIndlYnBhY2s6Ly8vY3NzVHJhbnNpdGlvbnMudHMiLCJ3ZWJwYWNrOi8vL2QudHMiLCJ3ZWJwYWNrOi8vL2FmdGVyUmVuZGVyLnRzIiwid2VicGFjazovLy9oYW5kbGVEZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vL2RpZmYudHMiLCJ3ZWJwYWNrOi8vL1Byb2plY3Rvci50cyIsIndlYnBhY2s6Ly8vdmRvbS50cyIsIndlYnBhY2s6Ly8vaGFzQnVpbGRUaW1lUmVuZGVyLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltZy9sb2dvLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5jc3M/ODQyMSIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2lkZ2V0cy9IZWxsb1dvcmxkLnRzIiwid2VicGFjazovLy8uL3NyYy93aWRnZXRzL3N0eWxlcy9oZWxsb1dvcmxkLm0uY3NzPzExYmQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7O0FDVEE7QUFBQTtBQUErQztBQUNUO0FBRXRDOztHQUVHO0FBQ0g7SUFDQyxNQUFNLENBQUMsOERBQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUVEOztHQUVHO0FBQ0g7SUFDQyxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFDbEQsQ0FBQztBQUVNO0lBTU47O09BRUc7SUFDSDtRQUNDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEdBQUcsQ0FBQyxPQUEwQjtRQUM3QixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyw0RUFBcUIsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDcEYsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUM7WUFDTixPQUFPO2dCQUNOLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxNQUFNLENB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Q2Q7QUFFRDtBQUVqRCxNQUFNLElBQUksR0FBRyxtQkFBTyxDQUFDLG9CQUFtQixDQUFDLENBQUM7QUFFMUM7Ozs7R0FJRztBQUNJLGdCQUFpQixTQUFRLHVGQUE0QjtJQUNqRCxNQUFNO1FBQ2YsTUFBTSxDQUFDLGdGQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLDhEQUFRLEVBQUUsRUFBRTtZQUN0QyxnRkFBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLDhEQUFRLEVBQUUsQ0FBQztZQUMxQyxnRkFBQyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSwrREFBUyxFQUFFLEVBQUUsQ0FBQyxVQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUNyRSxDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0Q7QUFBQTtBQUFBO0FBRWMsbUVBQVUsRUFBQzs7Ozs7Ozs7QUNyQjFCO0FBQ0Esa0JBQWtCLHFMIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImZlYXR1cmVzXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImZlYXR1cmVzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImZlYXR1cmVzXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsImltcG9ydCB7IEhhbmRsZSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBjcmVhdGVDb21wb3NpdGVIYW5kbGUgfSBmcm9tICcuL2xhbmcnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnLi4vc2hpbS9Qcm9taXNlJztcblxuLyoqXG4gKiBObyBvcGVyYXRpb24gZnVuY3Rpb24gdG8gcmVwbGFjZSBvd24gb25jZSBpbnN0YW5jZSBpcyBkZXN0b3J5ZWRcbiAqL1xuZnVuY3Rpb24gbm9vcCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG59XG5cbi8qKlxuICogTm8gb3AgZnVuY3Rpb24gdXNlZCB0byByZXBsYWNlIG93biwgb25jZSBpbnN0YW5jZSBoYXMgYmVlbiBkZXN0b3J5ZWRcbiAqL1xuZnVuY3Rpb24gZGVzdHJveWVkKCk6IG5ldmVyIHtcblx0dGhyb3cgbmV3IEVycm9yKCdDYWxsIG1hZGUgdG8gZGVzdHJveWVkIG1ldGhvZCcpO1xufVxuXG5leHBvcnQgY2xhc3MgRGVzdHJveWFibGUge1xuXHQvKipcblx0ICogcmVnaXN0ZXIgaGFuZGxlcyBmb3IgdGhlIGluc3RhbmNlXG5cdCAqL1xuXHRwcml2YXRlIGhhbmRsZXM6IEhhbmRsZVtdO1xuXG5cdC8qKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICovXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuaGFuZGxlcyA9IFtdO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlZ2lzdGVyIGhhbmRsZXMgZm9yIHRoZSBpbnN0YW5jZSB0aGF0IHdpbGwgYmUgZGVzdHJveWVkIHdoZW4gYHRoaXMuZGVzdHJveWAgaXMgY2FsbGVkXG5cdCAqXG5cdCAqIEBwYXJhbSB7SGFuZGxlfSBoYW5kbGUgVGhlIGhhbmRsZSB0byBhZGQgZm9yIHRoZSBpbnN0YW5jZVxuXHQgKiBAcmV0dXJucyB7SGFuZGxlfSBhIGhhbmRsZSBmb3IgdGhlIGhhbmRsZSwgcmVtb3ZlcyB0aGUgaGFuZGxlIGZvciB0aGUgaW5zdGFuY2UgYW5kIGNhbGxzIGRlc3Ryb3lcblx0ICovXG5cdG93bihoYW5kbGVzOiBIYW5kbGUgfCBIYW5kbGVbXSk6IEhhbmRsZSB7XG5cdFx0Y29uc3QgaGFuZGxlID0gQXJyYXkuaXNBcnJheShoYW5kbGVzKSA/IGNyZWF0ZUNvbXBvc2l0ZUhhbmRsZSguLi5oYW5kbGVzKSA6IGhhbmRsZXM7XG5cdFx0Y29uc3QgeyBoYW5kbGVzOiBfaGFuZGxlcyB9ID0gdGhpcztcblx0XHRfaGFuZGxlcy5wdXNoKGhhbmRsZSk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRlc3Ryb3koKSB7XG5cdFx0XHRcdF9oYW5kbGVzLnNwbGljZShfaGFuZGxlcy5pbmRleE9mKGhhbmRsZSkpO1xuXHRcdFx0XHRoYW5kbGUuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogRGVzdHJweXMgYWxsIGhhbmRlcnMgcmVnaXN0ZXJlZCBmb3IgdGhlIGluc3RhbmNlXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPGFueX0gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgb25jZSBhbGwgaGFuZGxlcyBoYXZlIGJlZW4gZGVzdHJveWVkXG5cdCAqL1xuXHRkZXN0cm95KCk6IFByb21pc2U8YW55PiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cdFx0XHR0aGlzLmhhbmRsZXMuZm9yRWFjaCgoaGFuZGxlKSA9PiB7XG5cdFx0XHRcdGhhbmRsZSAmJiBoYW5kbGUuZGVzdHJveSAmJiBoYW5kbGUuZGVzdHJveSgpO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLmRlc3Ryb3kgPSBub29wO1xuXHRcdFx0dGhpcy5vd24gPSBkZXN0cm95ZWQ7XG5cdFx0XHRyZXNvbHZlKHRydWUpO1xuXHRcdH0pO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERlc3Ryb3lhYmxlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIERlc3Ryb3lhYmxlLnRzIiwiaW1wb3J0IE1hcCBmcm9tICcuLi9zaGltL01hcCc7XG5pbXBvcnQgeyBIYW5kbGUsIEV2ZW50VHlwZSwgRXZlbnRPYmplY3QgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgRGVzdHJveWFibGUgfSBmcm9tICcuL0Rlc3Ryb3lhYmxlJztcblxuLyoqXG4gKiBNYXAgb2YgY29tcHV0ZWQgcmVndWxhciBleHByZXNzaW9ucywga2V5ZWQgYnkgc3RyaW5nXG4gKi9cbmNvbnN0IHJlZ2V4TWFwID0gbmV3IE1hcDxzdHJpbmcsIFJlZ0V4cD4oKTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlzIHRoZSBldmVudCB0eXBlIGdsb2IgaGFzIGJlZW4gbWF0Y2hlZFxuICpcbiAqIEByZXR1cm5zIGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgaWYgdGhlIGdsb2IgaXMgbWF0Y2hlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNHbG9iTWF0Y2goZ2xvYlN0cmluZzogc3RyaW5nIHwgc3ltYm9sLCB0YXJnZXRTdHJpbmc6IHN0cmluZyB8IHN5bWJvbCk6IGJvb2xlYW4ge1xuXHRpZiAodHlwZW9mIHRhcmdldFN0cmluZyA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIGdsb2JTdHJpbmcgPT09ICdzdHJpbmcnICYmIGdsb2JTdHJpbmcuaW5kZXhPZignKicpICE9PSAtMSkge1xuXHRcdGxldCByZWdleDogUmVnRXhwO1xuXHRcdGlmIChyZWdleE1hcC5oYXMoZ2xvYlN0cmluZykpIHtcblx0XHRcdHJlZ2V4ID0gcmVnZXhNYXAuZ2V0KGdsb2JTdHJpbmcpITtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVnZXggPSBuZXcgUmVnRXhwKGBeJHtnbG9iU3RyaW5nLnJlcGxhY2UoL1xcKi9nLCAnLionKX0kYCk7XG5cdFx0XHRyZWdleE1hcC5zZXQoZ2xvYlN0cmluZywgcmVnZXgpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVnZXgudGVzdCh0YXJnZXRTdHJpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBnbG9iU3RyaW5nID09PSB0YXJnZXRTdHJpbmc7XG5cdH1cbn1cblxuZXhwb3J0IHR5cGUgRXZlbnRlZENhbGxiYWNrPFQgPSBFdmVudFR5cGUsIEUgZXh0ZW5kcyBFdmVudE9iamVjdDxUPiA9IEV2ZW50T2JqZWN0PFQ+PiA9IHtcblx0LyoqXG5cdCAqIEEgY2FsbGJhY2sgdGhhdCB0YWtlcyBhbiBgZXZlbnRgIGFyZ3VtZW50XG5cdCAqXG5cdCAqIEBwYXJhbSBldmVudCBUaGUgZXZlbnQgb2JqZWN0XG5cdCAqL1xuXG5cdChldmVudDogRSk6IGJvb2xlYW4gfCB2b2lkO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBDdXN0b21FdmVudFR5cGVzPFQgZXh0ZW5kcyBFdmVudE9iamVjdDxhbnk+ID0gRXZlbnRPYmplY3Q8YW55Pj4ge1xuXHRbaW5kZXg6IHN0cmluZ106IFQ7XG59XG5cbi8qKlxuICogQSB0eXBlIHdoaWNoIGlzIGVpdGhlciBhIHRhcmdldGVkIGV2ZW50IGxpc3RlbmVyIG9yIGFuIGFycmF5IG9mIGxpc3RlbmVyc1xuICogQHRlbXBsYXRlIFQgVGhlIHR5cGUgb2YgdGFyZ2V0IGZvciB0aGUgZXZlbnRzXG4gKiBAdGVtcGxhdGUgRSBUaGUgZXZlbnQgdHlwZSBmb3IgdGhlIGV2ZW50c1xuICovXG5leHBvcnQgdHlwZSBFdmVudGVkQ2FsbGJhY2tPckFycmF5PFQgPSBFdmVudFR5cGUsIEUgZXh0ZW5kcyBFdmVudE9iamVjdDxUPiA9IEV2ZW50T2JqZWN0PFQ+PiA9XG5cdHwgRXZlbnRlZENhbGxiYWNrPFQsIEU+XG5cdHwgRXZlbnRlZENhbGxiYWNrPFQsIEU+W107XG5cbi8qKlxuICogRXZlbnQgQ2xhc3NcbiAqL1xuZXhwb3J0IGNsYXNzIEV2ZW50ZWQ8XG5cdE0gZXh0ZW5kcyBDdXN0b21FdmVudFR5cGVzID0ge30sXG5cdFQgPSBFdmVudFR5cGUsXG5cdE8gZXh0ZW5kcyBFdmVudE9iamVjdDxUPiA9IEV2ZW50T2JqZWN0PFQ+XG4+IGV4dGVuZHMgRGVzdHJveWFibGUge1xuXHQvLyBUaGUgZm9sbG93aW5nIG1lbWJlciBpcyBwdXJlbHkgc28gVHlwZVNjcmlwdCByZW1lbWJlcnMgdGhlIHR5cGUgb2YgYE1gIHdoZW4gZXh0ZW5kaW5nIHNvXG5cdC8vIHRoYXQgdGhlIHV0aWxpdGllcyBpbiBgb24udHNgIHdpbGwgd29yayBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzIwMzQ4XG5cdC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuXHRwcm90ZWN0ZWQgX190eXBlTWFwX18/OiBNO1xuXHQvKipcblx0ICogbWFwIG9mIGxpc3RlbmVycyBrZXllZCBieSBldmVudCB0eXBlXG5cdCAqL1xuXHRwcm90ZWN0ZWQgbGlzdGVuZXJzTWFwOiBNYXA8VCB8IGtleW9mIE0sIEV2ZW50ZWRDYWxsYmFjazxULCBPPltdPiA9IG5ldyBNYXAoKTtcblxuXHQvKipcblx0ICogRW1pdHMgdGhlIGV2ZW50IG9iamVjdCBmb3IgdGhlIHNwZWNpZmllZCB0eXBlXG5cdCAqXG5cdCAqIEBwYXJhbSBldmVudCB0aGUgZXZlbnQgdG8gZW1pdFxuXHQgKi9cblx0ZW1pdDxLIGV4dGVuZHMga2V5b2YgTT4oZXZlbnQ6IE1bS10pOiB2b2lkO1xuXHRlbWl0KGV2ZW50OiBPKTogdm9pZDtcblx0ZW1pdChldmVudDogYW55KTogdm9pZCB7XG5cdFx0dGhpcy5saXN0ZW5lcnNNYXAuZm9yRWFjaCgobWV0aG9kcywgdHlwZSkgPT4ge1xuXHRcdFx0aWYgKGlzR2xvYk1hdGNoKHR5cGUgYXMgYW55LCBldmVudC50eXBlKSkge1xuXHRcdFx0XHRbLi4ubWV0aG9kc10uZm9yRWFjaCgobWV0aG9kKSA9PiB7XG5cdFx0XHRcdFx0bWV0aG9kLmNhbGwodGhpcywgZXZlbnQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYXRjaCBhbGwgaGFuZGxlciBmb3IgdmFyaW91cyBjYWxsIHNpZ25hdHVyZXMuIFRoZSBzaWduYXR1cmVzIGFyZSBkZWZpbmVkIGluXG5cdCAqIGBCYXNlRXZlbnRlZEV2ZW50c2AuICBZb3UgY2FuIGFkZCB5b3VyIG93biBldmVudCB0eXBlIC0+IGhhbmRsZXIgdHlwZXMgYnkgZXh0ZW5kaW5nXG5cdCAqIGBCYXNlRXZlbnRlZEV2ZW50c2AuICBTZWUgZXhhbXBsZSBmb3IgZGV0YWlscy5cblx0ICpcblx0ICogQHBhcmFtIGFyZ3Ncblx0ICpcblx0ICogQGV4YW1wbGVcblx0ICpcblx0ICogaW50ZXJmYWNlIFdpZGdldEJhc2VFdmVudHMgZXh0ZW5kcyBCYXNlRXZlbnRlZEV2ZW50cyB7XG5cdCAqICAgICAodHlwZTogJ3Byb3BlcnRpZXM6Y2hhbmdlZCcsIGhhbmRsZXI6IFByb3BlcnRpZXNDaGFuZ2VkSGFuZGxlcik6IEhhbmRsZTtcblx0ICogfVxuXHQgKiBjbGFzcyBXaWRnZXRCYXNlIGV4dGVuZHMgRXZlbnRlZCB7XG5cdCAqICAgIG9uOiBXaWRnZXRCYXNlRXZlbnRzO1xuXHQgKiB9XG5cdCAqXG5cdCAqIEByZXR1cm4ge2FueX1cblx0ICovXG5cdG9uPEsgZXh0ZW5kcyBrZXlvZiBNPih0eXBlOiBLLCBsaXN0ZW5lcjogRXZlbnRlZENhbGxiYWNrT3JBcnJheTxLLCBNW0tdPik6IEhhbmRsZTtcblx0b24odHlwZTogVCwgbGlzdGVuZXI6IEV2ZW50ZWRDYWxsYmFja09yQXJyYXk8VCwgTz4pOiBIYW5kbGU7XG5cdG9uKHR5cGU6IGFueSwgbGlzdGVuZXI6IEV2ZW50ZWRDYWxsYmFja09yQXJyYXk8YW55LCBhbnk+KTogSGFuZGxlIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShsaXN0ZW5lcikpIHtcblx0XHRcdGNvbnN0IGhhbmRsZXMgPSBsaXN0ZW5lci5tYXAoKGxpc3RlbmVyKSA9PiB0aGlzLl9hZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikpO1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZGVzdHJveSgpIHtcblx0XHRcdFx0XHRoYW5kbGVzLmZvckVhY2goKGhhbmRsZSkgPT4gaGFuZGxlLmRlc3Ryb3koKSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9hZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG5cdH1cblxuXHRwcml2YXRlIF9hZGRMaXN0ZW5lcih0eXBlOiBUIHwga2V5b2YgTSwgbGlzdGVuZXI6IEV2ZW50ZWRDYWxsYmFjazxULCBPPikge1xuXHRcdGNvbnN0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzTWFwLmdldCh0eXBlKSB8fCBbXTtcblx0XHRsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cdFx0dGhpcy5saXN0ZW5lcnNNYXAuc2V0KHR5cGUsIGxpc3RlbmVycyk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRlc3Ryb3k6ICgpID0+IHtcblx0XHRcdFx0Y29uc3QgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNNYXAuZ2V0KHR5cGUpIHx8IFtdO1xuXHRcdFx0XHRsaXN0ZW5lcnMuc3BsaWNlKGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKSwgMSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudGVkO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIEV2ZW50ZWQudHMiLCJpbXBvcnQgaGFzLCB7IGFkZCB9IGZyb20gJy4uLy4uL2hhcy9oYXMnO1xuaW1wb3J0IGdsb2JhbCBmcm9tICcuLi9nbG9iYWwnO1xuXG5leHBvcnQgZGVmYXVsdCBoYXM7XG5leHBvcnQgKiBmcm9tICcuLi8uLi9oYXMvaGFzJztcblxuLyogRUNNQVNjcmlwdCA2IGFuZCA3IEZlYXR1cmVzICovXG5cbi8qIEFycmF5ICovXG5hZGQoXG5cdCdlczYtYXJyYXknLFxuXHQoKSA9PiB7XG5cdFx0cmV0dXJuIChcblx0XHRcdFsnZnJvbScsICdvZiddLmV2ZXJ5KChrZXkpID0+IGtleSBpbiBnbG9iYWwuQXJyYXkpICYmXG5cdFx0XHRbJ2ZpbmRJbmRleCcsICdmaW5kJywgJ2NvcHlXaXRoaW4nXS5ldmVyeSgoa2V5KSA9PiBrZXkgaW4gZ2xvYmFsLkFycmF5LnByb3RvdHlwZSlcblx0XHQpO1xuXHR9LFxuXHR0cnVlXG4pO1xuXG5hZGQoXG5cdCdlczYtYXJyYXktZmlsbCcsXG5cdCgpID0+IHtcblx0XHRpZiAoJ2ZpbGwnIGluIGdsb2JhbC5BcnJheS5wcm90b3R5cGUpIHtcblx0XHRcdC8qIFNvbWUgdmVyc2lvbnMgb2YgU2FmYXJpIGRvIG5vdCBwcm9wZXJseSBpbXBsZW1lbnQgdGhpcyAqL1xuXHRcdFx0cmV0dXJuICg8YW55PlsxXSkuZmlsbCg5LCBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkpWzBdID09PSAxO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdHRydWVcbik7XG5cbmFkZCgnZXM3LWFycmF5JywgKCkgPT4gJ2luY2x1ZGVzJyBpbiBnbG9iYWwuQXJyYXkucHJvdG90eXBlLCB0cnVlKTtcblxuLyogTWFwICovXG5hZGQoXG5cdCdlczYtbWFwJyxcblx0KCkgPT4ge1xuXHRcdGlmICh0eXBlb2YgZ2xvYmFsLk1hcCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Lypcblx0XHRJRTExIGFuZCBvbGRlciB2ZXJzaW9ucyBvZiBTYWZhcmkgYXJlIG1pc3NpbmcgY3JpdGljYWwgRVM2IE1hcCBmdW5jdGlvbmFsaXR5XG5cdFx0V2Ugd3JhcCB0aGlzIGluIGEgdHJ5L2NhdGNoIGJlY2F1c2Ugc29tZXRpbWVzIHRoZSBNYXAgY29uc3RydWN0b3IgZXhpc3RzLCBidXQgZG9lcyBub3Rcblx0XHR0YWtlIGFyZ3VtZW50cyAoaU9TIDguNClcblx0XHQgKi9cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IG1hcCA9IG5ldyBnbG9iYWwuTWFwKFtbMCwgMV1dKTtcblxuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdG1hcC5oYXMoMCkgJiZcblx0XHRcdFx0XHR0eXBlb2YgbWFwLmtleXMgPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdFx0XHRoYXMoJ2VzNi1zeW1ib2wnKSAmJlxuXHRcdFx0XHRcdHR5cGVvZiBtYXAudmFsdWVzID09PSAnZnVuY3Rpb24nICYmXG5cdFx0XHRcdFx0dHlwZW9mIG1hcC5lbnRyaWVzID09PSAnZnVuY3Rpb24nXG5cdFx0XHRcdCk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBub3QgdGVzdGluZyBvbiBpT1MgYXQgdGhlIG1vbWVudCAqL1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0dHJ1ZVxuKTtcblxuLyogTWF0aCAqL1xuYWRkKFxuXHQnZXM2LW1hdGgnLFxuXHQoKSA9PiB7XG5cdFx0cmV0dXJuIFtcblx0XHRcdCdjbHozMicsXG5cdFx0XHQnc2lnbicsXG5cdFx0XHQnbG9nMTAnLFxuXHRcdFx0J2xvZzInLFxuXHRcdFx0J2xvZzFwJyxcblx0XHRcdCdleHBtMScsXG5cdFx0XHQnY29zaCcsXG5cdFx0XHQnc2luaCcsXG5cdFx0XHQndGFuaCcsXG5cdFx0XHQnYWNvc2gnLFxuXHRcdFx0J2FzaW5oJyxcblx0XHRcdCdhdGFuaCcsXG5cdFx0XHQndHJ1bmMnLFxuXHRcdFx0J2Zyb3VuZCcsXG5cdFx0XHQnY2JydCcsXG5cdFx0XHQnaHlwb3QnXG5cdFx0XS5ldmVyeSgobmFtZSkgPT4gdHlwZW9mIGdsb2JhbC5NYXRoW25hbWVdID09PSAnZnVuY3Rpb24nKTtcblx0fSxcblx0dHJ1ZVxuKTtcblxuYWRkKFxuXHQnZXM2LW1hdGgtaW11bCcsXG5cdCgpID0+IHtcblx0XHRpZiAoJ2ltdWwnIGluIGdsb2JhbC5NYXRoKSB7XG5cdFx0XHQvKiBTb21lIHZlcnNpb25zIG9mIFNhZmFyaSBvbiBpb3MgZG8gbm90IHByb3Blcmx5IGltcGxlbWVudCB0aGlzICovXG5cdFx0XHRyZXR1cm4gKDxhbnk+TWF0aCkuaW11bCgweGZmZmZmZmZmLCA1KSA9PT0gLTU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0dHJ1ZVxuKTtcblxuLyogT2JqZWN0ICovXG5hZGQoXG5cdCdlczYtb2JqZWN0Jyxcblx0KCkgPT4ge1xuXHRcdHJldHVybiAoXG5cdFx0XHRoYXMoJ2VzNi1zeW1ib2wnKSAmJlxuXHRcdFx0Wydhc3NpZ24nLCAnaXMnLCAnZ2V0T3duUHJvcGVydHlTeW1ib2xzJywgJ3NldFByb3RvdHlwZU9mJ10uZXZlcnkoXG5cdFx0XHRcdChuYW1lKSA9PiB0eXBlb2YgZ2xvYmFsLk9iamVjdFtuYW1lXSA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdFx0KVxuXHRcdCk7XG5cdH0sXG5cdHRydWVcbik7XG5cbmFkZChcblx0J2VzMjAxNy1vYmplY3QnLFxuXHQoKSA9PiB7XG5cdFx0cmV0dXJuIFsndmFsdWVzJywgJ2VudHJpZXMnLCAnZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyddLmV2ZXJ5KFxuXHRcdFx0KG5hbWUpID0+IHR5cGVvZiBnbG9iYWwuT2JqZWN0W25hbWVdID09PSAnZnVuY3Rpb24nXG5cdFx0KTtcblx0fSxcblx0dHJ1ZVxuKTtcblxuLyogT2JzZXJ2YWJsZSAqL1xuYWRkKCdlcy1vYnNlcnZhYmxlJywgKCkgPT4gdHlwZW9mIGdsb2JhbC5PYnNlcnZhYmxlICE9PSAndW5kZWZpbmVkJywgdHJ1ZSk7XG5cbi8qIFByb21pc2UgKi9cbmFkZCgnZXM2LXByb21pc2UnLCAoKSA9PiB0eXBlb2YgZ2xvYmFsLlByb21pc2UgIT09ICd1bmRlZmluZWQnICYmIGhhcygnZXM2LXN5bWJvbCcpLCB0cnVlKTtcblxuLyogU2V0ICovXG5hZGQoXG5cdCdlczYtc2V0Jyxcblx0KCkgPT4ge1xuXHRcdGlmICh0eXBlb2YgZ2xvYmFsLlNldCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0LyogSUUxMSBhbmQgb2xkZXIgdmVyc2lvbnMgb2YgU2FmYXJpIGFyZSBtaXNzaW5nIGNyaXRpY2FsIEVTNiBTZXQgZnVuY3Rpb25hbGl0eSAqL1xuXHRcdFx0Y29uc3Qgc2V0ID0gbmV3IGdsb2JhbC5TZXQoWzFdKTtcblx0XHRcdHJldHVybiBzZXQuaGFzKDEpICYmICdrZXlzJyBpbiBzZXQgJiYgdHlwZW9mIHNldC5rZXlzID09PSAnZnVuY3Rpb24nICYmIGhhcygnZXM2LXN5bWJvbCcpO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdHRydWVcbik7XG5cbi8qIFN0cmluZyAqL1xuYWRkKFxuXHQnZXM2LXN0cmluZycsXG5cdCgpID0+IHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0W1xuXHRcdFx0XHQvKiBzdGF0aWMgbWV0aG9kcyAqL1xuXHRcdFx0XHQnZnJvbUNvZGVQb2ludCdcblx0XHRcdF0uZXZlcnkoKGtleSkgPT4gdHlwZW9mIGdsb2JhbC5TdHJpbmdba2V5XSA9PT0gJ2Z1bmN0aW9uJykgJiZcblx0XHRcdFtcblx0XHRcdFx0LyogaW5zdGFuY2UgbWV0aG9kcyAqL1xuXHRcdFx0XHQnY29kZVBvaW50QXQnLFxuXHRcdFx0XHQnbm9ybWFsaXplJyxcblx0XHRcdFx0J3JlcGVhdCcsXG5cdFx0XHRcdCdzdGFydHNXaXRoJyxcblx0XHRcdFx0J2VuZHNXaXRoJyxcblx0XHRcdFx0J2luY2x1ZGVzJ1xuXHRcdFx0XS5ldmVyeSgoa2V5KSA9PiB0eXBlb2YgZ2xvYmFsLlN0cmluZy5wcm90b3R5cGVba2V5XSA9PT0gJ2Z1bmN0aW9uJylcblx0XHQpO1xuXHR9LFxuXHR0cnVlXG4pO1xuXG5hZGQoXG5cdCdlczYtc3RyaW5nLXJhdycsXG5cdCgpID0+IHtcblx0XHRmdW5jdGlvbiBnZXRDYWxsU2l0ZShjYWxsU2l0ZTogVGVtcGxhdGVTdHJpbmdzQXJyYXksIC4uLnN1YnN0aXR1dGlvbnM6IGFueVtdKSB7XG5cdFx0XHRjb25zdCByZXN1bHQgPSBbLi4uY2FsbFNpdGVdO1xuXHRcdFx0KHJlc3VsdCBhcyBhbnkpLnJhdyA9IGNhbGxTaXRlLnJhdztcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0aWYgKCdyYXcnIGluIGdsb2JhbC5TdHJpbmcpIHtcblx0XHRcdGxldCBiID0gMTtcblx0XHRcdGxldCBjYWxsU2l0ZSA9IGdldENhbGxTaXRlYGFcXG4ke2J9YDtcblxuXHRcdFx0KGNhbGxTaXRlIGFzIGFueSkucmF3ID0gWydhXFxcXG4nXTtcblx0XHRcdGNvbnN0IHN1cHBvcnRzVHJ1bmMgPSBnbG9iYWwuU3RyaW5nLnJhdyhjYWxsU2l0ZSwgNDIpID09PSAnYTpcXFxcbic7XG5cblx0XHRcdHJldHVybiBzdXBwb3J0c1RydW5jO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0dHJ1ZVxuKTtcblxuYWRkKFxuXHQnZXMyMDE3LXN0cmluZycsXG5cdCgpID0+IHtcblx0XHRyZXR1cm4gWydwYWRTdGFydCcsICdwYWRFbmQnXS5ldmVyeSgoa2V5KSA9PiB0eXBlb2YgZ2xvYmFsLlN0cmluZy5wcm90b3R5cGVba2V5XSA9PT0gJ2Z1bmN0aW9uJyk7XG5cdH0sXG5cdHRydWVcbik7XG5cbi8qIFN5bWJvbCAqL1xuYWRkKCdlczYtc3ltYm9sJywgKCkgPT4gdHlwZW9mIGdsb2JhbC5TeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBTeW1ib2woKSA9PT0gJ3N5bWJvbCcsIHRydWUpO1xuXG4vKiBXZWFrTWFwICovXG5hZGQoXG5cdCdlczYtd2Vha21hcCcsXG5cdCgpID0+IHtcblx0XHRpZiAodHlwZW9mIGdsb2JhbC5XZWFrTWFwICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0LyogSUUxMSBhbmQgb2xkZXIgdmVyc2lvbnMgb2YgU2FmYXJpIGFyZSBtaXNzaW5nIGNyaXRpY2FsIEVTNiBNYXAgZnVuY3Rpb25hbGl0eSAqL1xuXHRcdFx0Y29uc3Qga2V5MSA9IHt9O1xuXHRcdFx0Y29uc3Qga2V5MiA9IHt9O1xuXHRcdFx0Y29uc3QgbWFwID0gbmV3IGdsb2JhbC5XZWFrTWFwKFtba2V5MSwgMV1dKTtcblx0XHRcdE9iamVjdC5mcmVlemUoa2V5MSk7XG5cdFx0XHRyZXR1cm4gbWFwLmdldChrZXkxKSA9PT0gMSAmJiBtYXAuc2V0KGtleTIsIDIpID09PSBtYXAgJiYgaGFzKCdlczYtc3ltYm9sJyk7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0dHJ1ZVxuKTtcblxuLyogTWlzY2VsbGFuZW91cyBmZWF0dXJlcyAqL1xuYWRkKCdtaWNyb3Rhc2tzJywgKCkgPT4gaGFzKCdlczYtcHJvbWlzZScpIHx8IGhhcygnaG9zdC1ub2RlJykgfHwgaGFzKCdkb20tbXV0YXRpb25vYnNlcnZlcicpLCB0cnVlKTtcbmFkZChcblx0J3Bvc3RtZXNzYWdlJyxcblx0KCkgPT4ge1xuXHRcdC8vIElmIHdpbmRvdyBpcyB1bmRlZmluZWQsIGFuZCB3ZSBoYXZlIHBvc3RNZXNzYWdlLCBpdCBwcm9iYWJseSBtZWFucyB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIuIFdlYiB3b3JrZXJzIGhhdmVcblx0XHQvLyBwb3N0IG1lc3NhZ2UgYnV0IGl0IGRvZXNuJ3Qgd29yayBob3cgd2UgZXhwZWN0IGl0IHRvLCBzbyBpdCdzIGJlc3QganVzdCB0byBwcmV0ZW5kIGl0IGRvZXNuJ3QgZXhpc3QuXG5cdFx0cmV0dXJuIHR5cGVvZiBnbG9iYWwud2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZ2xvYmFsLnBvc3RNZXNzYWdlID09PSAnZnVuY3Rpb24nO1xuXHR9LFxuXHR0cnVlXG4pO1xuYWRkKCdyYWYnLCAoKSA9PiB0eXBlb2YgZ2xvYmFsLnJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gJ2Z1bmN0aW9uJywgdHJ1ZSk7XG5hZGQoJ3NldGltbWVkaWF0ZScsICgpID0+IHR5cGVvZiBnbG9iYWwuc2V0SW1tZWRpYXRlICE9PSAndW5kZWZpbmVkJywgdHJ1ZSk7XG5cbi8qIERPTSBGZWF0dXJlcyAqL1xuXG5hZGQoXG5cdCdkb20tbXV0YXRpb25vYnNlcnZlcicsXG5cdCgpID0+IHtcblx0XHRpZiAoaGFzKCdob3N0LWJyb3dzZXInKSAmJiBCb29sZWFuKGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyKSkge1xuXHRcdFx0Ly8gSUUxMSBoYXMgYW4gdW5yZWxpYWJsZSBNdXRhdGlvbk9ic2VydmVyIGltcGxlbWVudGF0aW9uIHdoZXJlIHNldFByb3BlcnR5KCkgZG9lcyBub3Rcblx0XHRcdC8vIGdlbmVyYXRlIGEgbXV0YXRpb24gZXZlbnQsIG9ic2VydmVycyBjYW4gY3Jhc2gsIGFuZCB0aGUgcXVldWUgZG9lcyBub3QgZHJhaW5cblx0XHRcdC8vIHJlbGlhYmx5LiBUaGUgZm9sbG93aW5nIGZlYXR1cmUgdGVzdCB3YXMgYWRhcHRlZCBmcm9tXG5cdFx0XHQvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS90MTBrby80YWNlYjhjNzE2ODFmZGIyNzVlMzNlZmU1ZTU3NmIxNFxuXHRcdFx0Y29uc3QgZXhhbXBsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0LyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWUgKi9cblx0XHRcdGNvbnN0IEhvc3RNdXRhdGlvbk9ic2VydmVyID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG5cdFx0XHRjb25zdCBvYnNlcnZlciA9IG5ldyBIb3N0TXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbigpIHt9KTtcblx0XHRcdG9ic2VydmVyLm9ic2VydmUoZXhhbXBsZSwgeyBhdHRyaWJ1dGVzOiB0cnVlIH0pO1xuXG5cdFx0XHRleGFtcGxlLnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cblx0XHRcdHJldHVybiBCb29sZWFuKG9ic2VydmVyLnRha2VSZWNvcmRzKCkubGVuZ3RoKTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHR0cnVlXG4pO1xuXG5hZGQoXG5cdCdkb20td2ViYW5pbWF0aW9uJyxcblx0KCkgPT4gaGFzKCdob3N0LWJyb3dzZXInKSAmJiBnbG9iYWwuQW5pbWF0aW9uICE9PSB1bmRlZmluZWQgJiYgZ2xvYmFsLktleWZyYW1lRWZmZWN0ICE9PSB1bmRlZmluZWQsXG5cdHRydWVcbik7XG5cbmFkZCgnYWJvcnQtY29udHJvbGxlcicsICgpID0+IHR5cGVvZiBnbG9iYWwuQWJvcnRDb250cm9sbGVyICE9PSAndW5kZWZpbmVkJyk7XG5cbmFkZCgnYWJvcnQtc2lnbmFsJywgKCkgPT4gdHlwZW9mIGdsb2JhbC5BYm9ydFNpZ25hbCAhPT0gJ3VuZGVmaW5lZCcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGhhcy50cyIsImltcG9ydCB7IEhhbmRsZSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBhc3NpZ24gfSBmcm9tICcuLi9zaGltL29iamVjdCc7XG5cbmV4cG9ydCB7IGFzc2lnbiB9IGZyb20gJy4uL3NoaW0vb2JqZWN0JztcblxuY29uc3Qgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVHlwZSBndWFyZCB0aGF0IGVuc3VyZXMgdGhhdCB0aGUgdmFsdWUgY2FuIGJlIGNvZXJjZWQgdG8gT2JqZWN0XG4gKiB0byB3ZWVkIG91dCBob3N0IG9iamVjdHMgdGhhdCBkbyBub3QgZGVyaXZlIGZyb20gT2JqZWN0LlxuICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGNoZWNrIGlmIHdlIHdhbnQgdG8gZGVlcCBjb3B5IGFuIG9iamVjdCBvciBub3QuXG4gKiBOb3RlOiBJbiBFUzYgaXQgaXMgcG9zc2libGUgdG8gbW9kaWZ5IGFuIG9iamVjdCdzIFN5bWJvbC50b1N0cmluZ1RhZyBwcm9wZXJ0eSwgd2hpY2ggd2lsbFxuICogY2hhbmdlIHRoZSB2YWx1ZSByZXR1cm5lZCBieSBgdG9TdHJpbmdgLiBUaGlzIGlzIGEgcmFyZSBlZGdlIGNhc2UgdGhhdCBpcyBkaWZmaWN1bHQgdG8gaGFuZGxlLFxuICogc28gaXQgaXMgbm90IGhhbmRsZWQgaGVyZS5cbiAqIEBwYXJhbSAgdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrXG4gKiBAcmV0dXJuICAgICAgIElmIHRoZSB2YWx1ZSBpcyBjb2VyY2libGUgaW50byBhbiBPYmplY3RcbiAqL1xuZnVuY3Rpb24gc2hvdWxkRGVlcENvcHlPYmplY3QodmFsdWU6IGFueSk6IHZhbHVlIGlzIE9iamVjdCB7XG5cdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxuZnVuY3Rpb24gY29weUFycmF5PFQ+KGFycmF5OiBUW10sIGluaGVyaXRlZDogYm9vbGVhbik6IFRbXSB7XG5cdHJldHVybiBhcnJheS5tYXAoZnVuY3Rpb24oaXRlbTogVCk6IFQge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG5cdFx0XHRyZXR1cm4gPGFueT5jb3B5QXJyYXkoPGFueT5pdGVtLCBpbmhlcml0ZWQpO1xuXHRcdH1cblxuXHRcdHJldHVybiAhc2hvdWxkRGVlcENvcHlPYmplY3QoaXRlbSlcblx0XHRcdD8gaXRlbVxuXHRcdFx0OiBfbWl4aW4oe1xuXHRcdFx0XHRcdGRlZXA6IHRydWUsXG5cdFx0XHRcdFx0aW5oZXJpdGVkOiBpbmhlcml0ZWQsXG5cdFx0XHRcdFx0c291cmNlczogPEFycmF5PFQ+PltpdGVtXSxcblx0XHRcdFx0XHR0YXJnZXQ6IDxUPnt9XG5cdFx0XHQgIH0pO1xuXHR9KTtcbn1cblxuaW50ZXJmYWNlIE1peGluQXJnczxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fT4ge1xuXHRkZWVwOiBib29sZWFuO1xuXHRpbmhlcml0ZWQ6IGJvb2xlYW47XG5cdHNvdXJjZXM6IChVIHwgbnVsbCB8IHVuZGVmaW5lZClbXTtcblx0dGFyZ2V0OiBUO1xuXHRjb3BpZWQ/OiBhbnlbXTtcbn1cblxuZnVuY3Rpb24gX21peGluPFQgZXh0ZW5kcyB7fSwgVSBleHRlbmRzIHt9Pihrd0FyZ3M6IE1peGluQXJnczxULCBVPik6IFQgJiBVIHtcblx0Y29uc3QgZGVlcCA9IGt3QXJncy5kZWVwO1xuXHRjb25zdCBpbmhlcml0ZWQgPSBrd0FyZ3MuaW5oZXJpdGVkO1xuXHRjb25zdCB0YXJnZXQ6IGFueSA9IGt3QXJncy50YXJnZXQ7XG5cdGNvbnN0IGNvcGllZCA9IGt3QXJncy5jb3BpZWQgfHwgW107XG5cdGNvbnN0IGNvcGllZENsb25lID0gWy4uLmNvcGllZF07XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBrd0FyZ3Muc291cmNlcy5sZW5ndGg7IGkrKykge1xuXHRcdGNvbnN0IHNvdXJjZSA9IGt3QXJncy5zb3VyY2VzW2ldO1xuXG5cdFx0aWYgKHNvdXJjZSA9PT0gbnVsbCB8fCBzb3VyY2UgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXHRcdGZvciAobGV0IGtleSBpbiBzb3VyY2UpIHtcblx0XHRcdGlmIChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcblx0XHRcdFx0bGV0IHZhbHVlOiBhbnkgPSBzb3VyY2Vba2V5XTtcblxuXHRcdFx0XHRpZiAoY29waWVkQ2xvbmUuaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoZGVlcCkge1xuXHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdFx0XHRcdFx0dmFsdWUgPSBjb3B5QXJyYXkodmFsdWUsIGluaGVyaXRlZCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChzaG91bGREZWVwQ29weU9iamVjdCh2YWx1ZSkpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHRhcmdldFZhbHVlOiBhbnkgPSB0YXJnZXRba2V5XSB8fCB7fTtcblx0XHRcdFx0XHRcdGNvcGllZC5wdXNoKHNvdXJjZSk7XG5cdFx0XHRcdFx0XHR2YWx1ZSA9IF9taXhpbih7XG5cdFx0XHRcdFx0XHRcdGRlZXA6IHRydWUsXG5cdFx0XHRcdFx0XHRcdGluaGVyaXRlZDogaW5oZXJpdGVkLFxuXHRcdFx0XHRcdFx0XHRzb3VyY2VzOiBbdmFsdWVdLFxuXHRcdFx0XHRcdFx0XHR0YXJnZXQ6IHRhcmdldFZhbHVlLFxuXHRcdFx0XHRcdFx0XHRjb3BpZWRcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0YXJnZXRba2V5XSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiA8VCAmIFU+dGFyZ2V0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgb2JqZWN0IGZyb20gdGhlIGdpdmVuIHByb3RvdHlwZSwgYW5kIGNvcGllcyBhbGwgZW51bWVyYWJsZSBvd24gcHJvcGVydGllcyBvZiBvbmUgb3IgbW9yZVxuICogc291cmNlIG9iamVjdHMgdG8gdGhlIG5ld2x5IGNyZWF0ZWQgdGFyZ2V0IG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gcHJvdG90eXBlIFRoZSBwcm90b3R5cGUgdG8gY3JlYXRlIGEgbmV3IG9iamVjdCBmcm9tXG4gKiBAcGFyYW0gbWl4aW5zIEFueSBudW1iZXIgb2Ygb2JqZWN0cyB3aG9zZSBlbnVtZXJhYmxlIG93biBwcm9wZXJ0aWVzIHdpbGwgYmUgY29waWVkIHRvIHRoZSBjcmVhdGVkIG9iamVjdFxuICogQHJldHVybiBUaGUgbmV3IG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlPFxuXHRUIGV4dGVuZHMge30sXG5cdFUgZXh0ZW5kcyB7fSxcblx0ViBleHRlbmRzIHt9LFxuXHRXIGV4dGVuZHMge30sXG5cdFggZXh0ZW5kcyB7fSxcblx0WSBleHRlbmRzIHt9LFxuXHRaIGV4dGVuZHMge31cbj4ocHJvdG90eXBlOiBULCBtaXhpbjE6IFUsIG1peGluMjogViwgbWl4aW4zOiBXLCBtaXhpbjQ6IFgsIG1peGluNTogWSwgbWl4aW42OiBaKTogVCAmIFUgJiBWICYgVyAmIFggJiBZICYgWjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGU8VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fSwgVyBleHRlbmRzIHt9LCBYIGV4dGVuZHMge30sIFkgZXh0ZW5kcyB7fT4oXG5cdHByb3RvdHlwZTogVCxcblx0bWl4aW4xOiBVLFxuXHRtaXhpbjI6IFYsXG5cdG1peGluMzogVyxcblx0bWl4aW40OiBYLFxuXHRtaXhpbjU6IFlcbik6IFQgJiBVICYgViAmIFcgJiBYICYgWTtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGU8VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fSwgVyBleHRlbmRzIHt9LCBYIGV4dGVuZHMge30+KFxuXHRwcm90b3R5cGU6IFQsXG5cdG1peGluMTogVSxcblx0bWl4aW4yOiBWLFxuXHRtaXhpbjM6IFcsXG5cdG1peGluNDogWFxuKTogVCAmIFUgJiBWICYgVyAmIFg7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlPFQgZXh0ZW5kcyB7fSwgVSBleHRlbmRzIHt9LCBWIGV4dGVuZHMge30sIFcgZXh0ZW5kcyB7fT4oXG5cdHByb3RvdHlwZTogVCxcblx0bWl4aW4xOiBVLFxuXHRtaXhpbjI6IFYsXG5cdG1peGluMzogV1xuKTogVCAmIFUgJiBWICYgVztcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGU8VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fT4ocHJvdG90eXBlOiBULCBtaXhpbjE6IFUsIG1peGluMjogVik6IFQgJiBVICYgVjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGU8VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30+KHByb3RvdHlwZTogVCwgbWl4aW46IFUpOiBUICYgVTtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGU8VCBleHRlbmRzIHt9Pihwcm90b3R5cGU6IFQpOiBUO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZShwcm90b3R5cGU6IGFueSwgLi4ubWl4aW5zOiBhbnlbXSk6IGFueSB7XG5cdGlmICghbWl4aW5zLmxlbmd0aCkge1xuXHRcdHRocm93IG5ldyBSYW5nZUVycm9yKCdsYW5nLmNyZWF0ZSByZXF1aXJlcyBhdCBsZWFzdCBvbmUgbWl4aW4gb2JqZWN0LicpO1xuXHR9XG5cblx0Y29uc3QgYXJncyA9IG1peGlucy5zbGljZSgpO1xuXHRhcmdzLnVuc2hpZnQoT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpKTtcblxuXHRyZXR1cm4gYXNzaWduLmFwcGx5KG51bGwsIGFyZ3MpO1xufVxuXG4vKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGFsbCBlbnVtZXJhYmxlIG93biBwcm9wZXJ0aWVzIG9mIG9uZSBvciBtb3JlIHNvdXJjZSBvYmplY3RzIHRvIHRoZSB0YXJnZXQgb2JqZWN0LFxuICogcmVjdXJzaXZlbHkgY29weWluZyBhbGwgbmVzdGVkIG9iamVjdHMgYW5kIGFycmF5cyBhcyB3ZWxsLlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3QgdG8gcmVjZWl2ZSB2YWx1ZXMgZnJvbSBzb3VyY2Ugb2JqZWN0c1xuICogQHBhcmFtIHNvdXJjZXMgQW55IG51bWJlciBvZiBvYmplY3RzIHdob3NlIGVudW1lcmFibGUgb3duIHByb3BlcnRpZXMgd2lsbCBiZSBjb3BpZWQgdG8gdGhlIHRhcmdldCBvYmplY3RcbiAqIEByZXR1cm4gVGhlIG1vZGlmaWVkIHRhcmdldCBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBBc3NpZ248XG5cdFQgZXh0ZW5kcyB7fSxcblx0VSBleHRlbmRzIHt9LFxuXHRWIGV4dGVuZHMge30sXG5cdFcgZXh0ZW5kcyB7fSxcblx0WCBleHRlbmRzIHt9LFxuXHRZIGV4dGVuZHMge30sXG5cdFogZXh0ZW5kcyB7fVxuPih0YXJnZXQ6IFQsIHNvdXJjZTE6IFUsIHNvdXJjZTI6IFYsIHNvdXJjZTM6IFcsIHNvdXJjZTQ6IFgsIHNvdXJjZTU6IFksIHNvdXJjZTY6IFopOiBUICYgVSAmIFYgJiBXICYgWCAmIFkgJiBaO1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBBc3NpZ248VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fSwgVyBleHRlbmRzIHt9LCBYIGV4dGVuZHMge30sIFkgZXh0ZW5kcyB7fT4oXG5cdHRhcmdldDogVCxcblx0c291cmNlMTogVSxcblx0c291cmNlMjogVixcblx0c291cmNlMzogVyxcblx0c291cmNlNDogWCxcblx0c291cmNlNTogWVxuKTogVCAmIFUgJiBWICYgVyAmIFggJiBZO1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBBc3NpZ248VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fSwgVyBleHRlbmRzIHt9LCBYIGV4dGVuZHMge30+KFxuXHR0YXJnZXQ6IFQsXG5cdHNvdXJjZTE6IFUsXG5cdHNvdXJjZTI6IFYsXG5cdHNvdXJjZTM6IFcsXG5cdHNvdXJjZTQ6IFhcbik6IFQgJiBVICYgViAmIFcgJiBYO1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBBc3NpZ248VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fSwgVyBleHRlbmRzIHt9Pihcblx0dGFyZ2V0OiBULFxuXHRzb3VyY2UxOiBVLFxuXHRzb3VyY2UyOiBWLFxuXHRzb3VyY2UzOiBXXG4pOiBUICYgVSAmIFYgJiBXO1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBBc3NpZ248VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fT4odGFyZ2V0OiBULCBzb3VyY2UxOiBVLCBzb3VyY2UyOiBWKTogVCAmIFUgJiBWO1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBBc3NpZ248VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30+KHRhcmdldDogVCwgc291cmNlOiBVKTogVCAmIFU7XG5leHBvcnQgZnVuY3Rpb24gZGVlcEFzc2lnbih0YXJnZXQ6IGFueSwgLi4uc291cmNlczogYW55W10pOiBhbnkge1xuXHRyZXR1cm4gX21peGluKHtcblx0XHRkZWVwOiB0cnVlLFxuXHRcdGluaGVyaXRlZDogZmFsc2UsXG5cdFx0c291cmNlczogc291cmNlcyxcblx0XHR0YXJnZXQ6IHRhcmdldFxuXHR9KTtcbn1cblxuLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBhbGwgZW51bWVyYWJsZSAob3duIG9yIGluaGVyaXRlZCkgcHJvcGVydGllcyBvZiBvbmUgb3IgbW9yZSBzb3VyY2Ugb2JqZWN0cyB0byB0aGVcbiAqIHRhcmdldCBvYmplY3QsIHJlY3Vyc2l2ZWx5IGNvcHlpbmcgYWxsIG5lc3RlZCBvYmplY3RzIGFuZCBhcnJheXMgYXMgd2VsbC5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IHRvIHJlY2VpdmUgdmFsdWVzIGZyb20gc291cmNlIG9iamVjdHNcbiAqIEBwYXJhbSBzb3VyY2VzIEFueSBudW1iZXIgb2Ygb2JqZWN0cyB3aG9zZSBlbnVtZXJhYmxlIHByb3BlcnRpZXMgd2lsbCBiZSBjb3BpZWQgdG8gdGhlIHRhcmdldCBvYmplY3RcbiAqIEByZXR1cm4gVGhlIG1vZGlmaWVkIHRhcmdldCBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBNaXhpbjxcblx0VCBleHRlbmRzIHt9LFxuXHRVIGV4dGVuZHMge30sXG5cdFYgZXh0ZW5kcyB7fSxcblx0VyBleHRlbmRzIHt9LFxuXHRYIGV4dGVuZHMge30sXG5cdFkgZXh0ZW5kcyB7fSxcblx0WiBleHRlbmRzIHt9XG4+KHRhcmdldDogVCwgc291cmNlMTogVSwgc291cmNlMjogViwgc291cmNlMzogVywgc291cmNlNDogWCwgc291cmNlNTogWSwgc291cmNlNjogWik6IFQgJiBVICYgViAmIFcgJiBYICYgWSAmIFo7XG5leHBvcnQgZnVuY3Rpb24gZGVlcE1peGluPFQgZXh0ZW5kcyB7fSwgVSBleHRlbmRzIHt9LCBWIGV4dGVuZHMge30sIFcgZXh0ZW5kcyB7fSwgWCBleHRlbmRzIHt9LCBZIGV4dGVuZHMge30+KFxuXHR0YXJnZXQ6IFQsXG5cdHNvdXJjZTE6IFUsXG5cdHNvdXJjZTI6IFYsXG5cdHNvdXJjZTM6IFcsXG5cdHNvdXJjZTQ6IFgsXG5cdHNvdXJjZTU6IFlcbik6IFQgJiBVICYgViAmIFcgJiBYICYgWTtcbmV4cG9ydCBmdW5jdGlvbiBkZWVwTWl4aW48VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fSwgVyBleHRlbmRzIHt9LCBYIGV4dGVuZHMge30+KFxuXHR0YXJnZXQ6IFQsXG5cdHNvdXJjZTE6IFUsXG5cdHNvdXJjZTI6IFYsXG5cdHNvdXJjZTM6IFcsXG5cdHNvdXJjZTQ6IFhcbik6IFQgJiBVICYgViAmIFcgJiBYO1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBNaXhpbjxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fSwgViBleHRlbmRzIHt9LCBXIGV4dGVuZHMge30+KFxuXHR0YXJnZXQ6IFQsXG5cdHNvdXJjZTE6IFUsXG5cdHNvdXJjZTI6IFYsXG5cdHNvdXJjZTM6IFdcbik6IFQgJiBVICYgViAmIFc7XG5leHBvcnQgZnVuY3Rpb24gZGVlcE1peGluPFQgZXh0ZW5kcyB7fSwgVSBleHRlbmRzIHt9LCBWIGV4dGVuZHMge30+KHRhcmdldDogVCwgc291cmNlMTogVSwgc291cmNlMjogVik6IFQgJiBVICYgVjtcbmV4cG9ydCBmdW5jdGlvbiBkZWVwTWl4aW48VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30+KHRhcmdldDogVCwgc291cmNlOiBVKTogVCAmIFU7XG5leHBvcnQgZnVuY3Rpb24gZGVlcE1peGluKHRhcmdldDogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSk6IGFueSB7XG5cdHJldHVybiBfbWl4aW4oe1xuXHRcdGRlZXA6IHRydWUsXG5cdFx0aW5oZXJpdGVkOiB0cnVlLFxuXHRcdHNvdXJjZXM6IHNvdXJjZXMsXG5cdFx0dGFyZ2V0OiB0YXJnZXRcblx0fSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBvYmplY3QgdXNpbmcgdGhlIHByb3ZpZGVkIHNvdXJjZSdzIHByb3RvdHlwZSBhcyB0aGUgcHJvdG90eXBlIGZvciB0aGUgbmV3IG9iamVjdCwgYW5kIHRoZW5cbiAqIGRlZXAgY29waWVzIHRoZSBwcm92aWRlZCBzb3VyY2UncyB2YWx1ZXMgaW50byB0aGUgbmV3IHRhcmdldC5cbiAqXG4gKiBAcGFyYW0gc291cmNlIFRoZSBvYmplY3QgdG8gZHVwbGljYXRlXG4gKiBAcmV0dXJuIFRoZSBuZXcgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkdXBsaWNhdGU8VCBleHRlbmRzIHt9Pihzb3VyY2U6IFQpOiBUIHtcblx0Y29uc3QgdGFyZ2V0ID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc291cmNlKSk7XG5cblx0cmV0dXJuIGRlZXBNaXhpbih0YXJnZXQsIHNvdXJjZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHR3byB2YWx1ZXMgYXJlIHRoZSBzYW1lIHZhbHVlLlxuICpcbiAqIEBwYXJhbSBhIEZpcnN0IHZhbHVlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSBiIFNlY29uZCB2YWx1ZSB0byBjb21wYXJlXG4gKiBAcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlcyBhcmUgdGhlIHNhbWU7IGZhbHNlIG90aGVyd2lzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJZGVudGljYWwoYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHtcblx0cmV0dXJuIChcblx0XHRhID09PSBiIHx8XG5cdFx0LyogYm90aCB2YWx1ZXMgYXJlIE5hTiAqL1xuXHRcdChhICE9PSBhICYmIGIgIT09IGIpXG5cdCk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgYmluZHMgYSBtZXRob2QgdG8gdGhlIHNwZWNpZmllZCBvYmplY3QgYXQgcnVudGltZS4gVGhpcyBpcyBzaW1pbGFyIHRvXG4gKiBgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRgLCBidXQgaW5zdGVhZCBvZiBhIGZ1bmN0aW9uIGl0IHRha2VzIHRoZSBuYW1lIG9mIGEgbWV0aG9kIG9uIGFuIG9iamVjdC5cbiAqIEFzIGEgcmVzdWx0LCB0aGUgZnVuY3Rpb24gcmV0dXJuZWQgYnkgYGxhdGVCaW5kYCB3aWxsIGFsd2F5cyBjYWxsIHRoZSBmdW5jdGlvbiBjdXJyZW50bHkgYXNzaWduZWQgdG9cbiAqIHRoZSBzcGVjaWZpZWQgcHJvcGVydHkgb24gdGhlIG9iamVjdCBhcyBvZiB0aGUgbW9tZW50IHRoZSBmdW5jdGlvbiBpdCByZXR1cm5zIGlzIGNhbGxlZC5cbiAqXG4gKiBAcGFyYW0gaW5zdGFuY2UgVGhlIGNvbnRleHQgb2JqZWN0XG4gKiBAcGFyYW0gbWV0aG9kIFRoZSBuYW1lIG9mIHRoZSBtZXRob2Qgb24gdGhlIGNvbnRleHQgb2JqZWN0IHRvIGJpbmQgdG8gaXRzZWxmXG4gKiBAcGFyYW0gc3VwcGxpZWRBcmdzIEFuIG9wdGlvbmFsIGFycmF5IG9mIHZhbHVlcyB0byBwcmVwZW5kIHRvIHRoZSBgaW5zdGFuY2VbbWV0aG9kXWAgYXJndW1lbnRzIGxpc3RcbiAqIEByZXR1cm4gVGhlIGJvdW5kIGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXRlQmluZChpbnN0YW5jZToge30sIG1ldGhvZDogc3RyaW5nLCAuLi5zdXBwbGllZEFyZ3M6IGFueVtdKTogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkge1xuXHRyZXR1cm4gc3VwcGxpZWRBcmdzLmxlbmd0aFxuXHRcdD8gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNvbnN0IGFyZ3M6IGFueVtdID0gYXJndW1lbnRzLmxlbmd0aCA/IHN1cHBsaWVkQXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSA6IHN1cHBsaWVkQXJncztcblxuXHRcdFx0XHQvLyBUUzcwMTdcblx0XHRcdFx0cmV0dXJuICg8YW55Pmluc3RhbmNlKVttZXRob2RdLmFwcGx5KGluc3RhbmNlLCBhcmdzKTtcblx0XHQgIH1cblx0XHQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQvLyBUUzcwMTdcblx0XHRcdFx0cmV0dXJuICg8YW55Pmluc3RhbmNlKVttZXRob2RdLmFwcGx5KGluc3RhbmNlLCBhcmd1bWVudHMpO1xuXHRcdCAgfTtcbn1cblxuLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBhbGwgZW51bWVyYWJsZSAob3duIG9yIGluaGVyaXRlZCkgcHJvcGVydGllcyBvZiBvbmUgb3IgbW9yZSBzb3VyY2Ugb2JqZWN0cyB0byB0aGVcbiAqIHRhcmdldCBvYmplY3QuXG4gKlxuICogQHJldHVybiBUaGUgbW9kaWZpZWQgdGFyZ2V0IG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWl4aW48VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fSwgVyBleHRlbmRzIHt9LCBYIGV4dGVuZHMge30sIFkgZXh0ZW5kcyB7fSwgWiBleHRlbmRzIHt9Pihcblx0dGFyZ2V0OiBULFxuXHRzb3VyY2UxOiBVLFxuXHRzb3VyY2UyOiBWLFxuXHRzb3VyY2UzOiBXLFxuXHRzb3VyY2U0OiBYLFxuXHRzb3VyY2U1OiBZLFxuXHRzb3VyY2U2OiBaXG4pOiBUICYgVSAmIFYgJiBXICYgWCAmIFkgJiBaO1xuZXhwb3J0IGZ1bmN0aW9uIG1peGluPFQgZXh0ZW5kcyB7fSwgVSBleHRlbmRzIHt9LCBWIGV4dGVuZHMge30sIFcgZXh0ZW5kcyB7fSwgWCBleHRlbmRzIHt9LCBZIGV4dGVuZHMge30+KFxuXHR0YXJnZXQ6IFQsXG5cdHNvdXJjZTE6IFUsXG5cdHNvdXJjZTI6IFYsXG5cdHNvdXJjZTM6IFcsXG5cdHNvdXJjZTQ6IFgsXG5cdHNvdXJjZTU6IFlcbik6IFQgJiBVICYgViAmIFcgJiBYICYgWTtcbmV4cG9ydCBmdW5jdGlvbiBtaXhpbjxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fSwgViBleHRlbmRzIHt9LCBXIGV4dGVuZHMge30sIFggZXh0ZW5kcyB7fT4oXG5cdHRhcmdldDogVCxcblx0c291cmNlMTogVSxcblx0c291cmNlMjogVixcblx0c291cmNlMzogVyxcblx0c291cmNlNDogWFxuKTogVCAmIFUgJiBWICYgVyAmIFg7XG5leHBvcnQgZnVuY3Rpb24gbWl4aW48VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fSwgVyBleHRlbmRzIHt9Pihcblx0dGFyZ2V0OiBULFxuXHRzb3VyY2UxOiBVLFxuXHRzb3VyY2UyOiBWLFxuXHRzb3VyY2UzOiBXXG4pOiBUICYgVSAmIFYgJiBXO1xuZXhwb3J0IGZ1bmN0aW9uIG1peGluPFQgZXh0ZW5kcyB7fSwgVSBleHRlbmRzIHt9LCBWIGV4dGVuZHMge30+KHRhcmdldDogVCwgc291cmNlMTogVSwgc291cmNlMjogVik6IFQgJiBVICYgVjtcbmV4cG9ydCBmdW5jdGlvbiBtaXhpbjxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fT4odGFyZ2V0OiBULCBzb3VyY2U6IFUpOiBUICYgVTtcbmV4cG9ydCBmdW5jdGlvbiBtaXhpbih0YXJnZXQ6IGFueSwgLi4uc291cmNlczogYW55W10pOiBhbnkge1xuXHRyZXR1cm4gX21peGluKHtcblx0XHRkZWVwOiBmYWxzZSxcblx0XHRpbmhlcml0ZWQ6IHRydWUsXG5cdFx0c291cmNlczogc291cmNlcyxcblx0XHR0YXJnZXQ6IHRhcmdldFxuXHR9KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2ggaW52b2tlcyB0aGUgZ2l2ZW4gZnVuY3Rpb24gd2l0aCB0aGUgZ2l2ZW4gYXJndW1lbnRzIHByZXBlbmRlZCB0byBpdHMgYXJndW1lbnQgbGlzdC5cbiAqIExpa2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kYCwgYnV0IGRvZXMgbm90IGFsdGVyIGV4ZWN1dGlvbiBjb250ZXh0LlxuICpcbiAqIEBwYXJhbSB0YXJnZXRGdW5jdGlvbiBUaGUgZnVuY3Rpb24gdGhhdCBuZWVkcyB0byBiZSBib3VuZFxuICogQHBhcmFtIHN1cHBsaWVkQXJncyBBbiBvcHRpb25hbCBhcnJheSBvZiBhcmd1bWVudHMgdG8gcHJlcGVuZCB0byB0aGUgYHRhcmdldEZ1bmN0aW9uYCBhcmd1bWVudHMgbGlzdFxuICogQHJldHVybiBUaGUgYm91bmQgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnRpYWwodGFyZ2V0RnVuY3Rpb246ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55LCAuLi5zdXBwbGllZEFyZ3M6IGFueVtdKTogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkge1xuXHRyZXR1cm4gZnVuY3Rpb24odGhpczogYW55KSB7XG5cdFx0Y29uc3QgYXJnczogYW55W10gPSBhcmd1bWVudHMubGVuZ3RoID8gc3VwcGxpZWRBcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpIDogc3VwcGxpZWRBcmdzO1xuXG5cdFx0cmV0dXJuIHRhcmdldEZ1bmN0aW9uLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHdpdGggYSBkZXN0cm95IG1ldGhvZCB0aGF0LCB3aGVuIGNhbGxlZCwgY2FsbHMgdGhlIHBhc3NlZC1pbiBkZXN0cnVjdG9yLlxuICogVGhpcyBpcyBpbnRlbmRlZCB0byBwcm92aWRlIGEgdW5pZmllZCBpbnRlcmZhY2UgZm9yIGNyZWF0aW5nIFwicmVtb3ZlXCIgLyBcImRlc3Ryb3lcIiBoYW5kbGVycyBmb3JcbiAqIGV2ZW50IGxpc3RlbmVycywgdGltZXJzLCBldGMuXG4gKlxuICogQHBhcmFtIGRlc3RydWN0b3IgQSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGhhbmRsZSdzIGBkZXN0cm95YCBtZXRob2QgaXMgaW52b2tlZFxuICogQHJldHVybiBUaGUgaGFuZGxlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSGFuZGxlKGRlc3RydWN0b3I6ICgpID0+IHZvaWQpOiBIYW5kbGUge1xuXHRsZXQgY2FsbGVkID0gZmFsc2U7XG5cdHJldHVybiB7XG5cdFx0ZGVzdHJveTogZnVuY3Rpb24odGhpczogSGFuZGxlKSB7XG5cdFx0XHRpZiAoIWNhbGxlZCkge1xuXHRcdFx0XHRjYWxsZWQgPSB0cnVlO1xuXHRcdFx0XHRkZXN0cnVjdG9yKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBzaW5nbGUgaGFuZGxlIHRoYXQgY2FuIGJlIHVzZWQgdG8gZGVzdHJveSBtdWx0aXBsZSBoYW5kbGVzIHNpbXVsdGFuZW91c2x5LlxuICpcbiAqIEBwYXJhbSBoYW5kbGVzIEFuIGFycmF5IG9mIGhhbmRsZXMgd2l0aCBgZGVzdHJveWAgbWV0aG9kc1xuICogQHJldHVybiBUaGUgaGFuZGxlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29tcG9zaXRlSGFuZGxlKC4uLmhhbmRsZXM6IEhhbmRsZVtdKTogSGFuZGxlIHtcblx0cmV0dXJuIGNyZWF0ZUhhbmRsZShmdW5jdGlvbigpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGhhbmRsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGhhbmRsZXNbaV0uZGVzdHJveSgpO1xuXHRcdH1cblx0fSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGFuZy50cyIsImltcG9ydCB7IGlzQXJyYXlMaWtlLCBJdGVyYWJsZSwgSXRlcmFibGVJdGVyYXRvciwgU2hpbUl0ZXJhdG9yIH0gZnJvbSAnLi9pdGVyYXRvcic7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsJztcbmltcG9ydCB7IGlzIGFzIG9iamVjdElzIH0gZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IGhhcyBmcm9tICcuL3N1cHBvcnQvaGFzJztcbmltcG9ydCAnLi9TeW1ib2wnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1hcDxLLCBWPiB7XG5cdC8qKlxuXHQgKiBEZWxldGVzIGFsbCBrZXlzIGFuZCB0aGVpciBhc3NvY2lhdGVkIHZhbHVlcy5cblx0ICovXG5cdGNsZWFyKCk6IHZvaWQ7XG5cblx0LyoqXG5cdCAqIERlbGV0ZXMgYSBnaXZlbiBrZXkgYW5kIGl0cyBhc3NvY2lhdGVkIHZhbHVlLlxuXHQgKlxuXHQgKiBAcGFyYW0ga2V5IFRoZSBrZXkgdG8gZGVsZXRlXG5cdCAqIEByZXR1cm4gdHJ1ZSBpZiB0aGUga2V5IGV4aXN0cywgZmFsc2UgaWYgaXQgZG9lcyBub3Rcblx0ICovXG5cdGRlbGV0ZShrZXk6IEspOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFuIGl0ZXJhdG9yIHRoYXQgeWllbGRzIGVhY2gga2V5L3ZhbHVlIHBhaXIgYXMgYW4gYXJyYXkuXG5cdCAqXG5cdCAqIEByZXR1cm4gQW4gaXRlcmF0b3IgZm9yIGVhY2gga2V5L3ZhbHVlIHBhaXIgaW4gdGhlIGluc3RhbmNlLlxuXHQgKi9cblx0ZW50cmllcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFtLLCBWXT47XG5cblx0LyoqXG5cdCAqIEV4ZWN1dGVzIGEgZ2l2ZW4gZnVuY3Rpb24gZm9yIGVhY2ggbWFwIGVudHJ5LiBUaGUgZnVuY3Rpb25cblx0ICogaXMgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czogdGhlIGVsZW1lbnQgdmFsdWUsIHRoZVxuXHQgKiBlbGVtZW50IGtleSwgYW5kIHRoZSBhc3NvY2lhdGVkIE1hcCBpbnN0YW5jZS5cblx0ICpcblx0ICogQHBhcmFtIGNhbGxiYWNrZm4gVGhlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgZm9yIGVhY2ggbWFwIGVudHJ5LFxuXHQgKiBAcGFyYW0gdGhpc0FyZyBUaGUgdmFsdWUgdG8gdXNlIGZvciBgdGhpc2AgZm9yIGVhY2ggZXhlY3V0aW9uIG9mIHRoZSBjYWxiYWNrXG5cdCAqL1xuXHRmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogViwga2V5OiBLLCBtYXA6IE1hcDxLLCBWPikgPT4gdm9pZCwgdGhpc0FyZz86IGFueSk6IHZvaWQ7XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIGtleS5cblx0ICpcblx0ICogQHBhcmFtIGtleSBUaGUga2V5IHRvIGxvb2sgdXBcblx0ICogQHJldHVybiBUaGUgdmFsdWUgaWYgb25lIGV4aXN0cyBvciB1bmRlZmluZWRcblx0ICovXG5cdGdldChrZXk6IEspOiBWIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFuIGl0ZXJhdG9yIHRoYXQgeWllbGRzIGVhY2gga2V5IGluIHRoZSBtYXAuXG5cdCAqXG5cdCAqIEByZXR1cm4gQW4gaXRlcmF0b3IgY29udGFpbmluZyB0aGUgaW5zdGFuY2UncyBrZXlzLlxuXHQgKi9cblx0a2V5cygpOiBJdGVyYWJsZUl0ZXJhdG9yPEs+O1xuXG5cdC8qKlxuXHQgKiBDaGVja3MgZm9yIHRoZSBwcmVzZW5jZSBvZiBhIGdpdmVuIGtleS5cblx0ICpcblx0ICogQHBhcmFtIGtleSBUaGUga2V5IHRvIGNoZWNrIGZvclxuXHQgKiBAcmV0dXJuIHRydWUgaWYgdGhlIGtleSBleGlzdHMsIGZhbHNlIGlmIGl0IGRvZXMgbm90XG5cdCAqL1xuXHRoYXMoa2V5OiBLKTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogU2V0cyB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGEgZ2l2ZW4ga2V5LlxuXHQgKlxuXHQgKiBAcGFyYW0ga2V5IFRoZSBrZXkgdG8gZGVmaW5lIGEgdmFsdWUgdG9cblx0ICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ25cblx0ICogQHJldHVybiBUaGUgTWFwIGluc3RhbmNlXG5cdCAqL1xuXHRzZXQoa2V5OiBLLCB2YWx1ZTogVik6IHRoaXM7XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIG51bWJlciBvZiBrZXkgLyB2YWx1ZSBwYWlycyBpbiB0aGUgTWFwLlxuXHQgKi9cblx0cmVhZG9ubHkgc2l6ZTogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFuIGl0ZXJhdG9yIHRoYXQgeWllbGRzIGVhY2ggdmFsdWUgaW4gdGhlIG1hcC5cblx0ICpcblx0ICogQHJldHVybiBBbiBpdGVyYXRvciBjb250YWluaW5nIHRoZSBpbnN0YW5jZSdzIHZhbHVlcy5cblx0ICovXG5cdHZhbHVlcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFY+O1xuXG5cdC8qKiBSZXR1cm5zIGFuIGl0ZXJhYmxlIG9mIGVudHJpZXMgaW4gdGhlIG1hcC4gKi9cblx0W1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmFibGVJdGVyYXRvcjxbSywgVl0+O1xuXG5cdHJlYWRvbmx5IFtTeW1ib2wudG9TdHJpbmdUYWddOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFwQ29uc3RydWN0b3Ige1xuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBNYXBcblx0ICpcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqL1xuXHRuZXcgKCk6IE1hcDxhbnksIGFueT47XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgTWFwXG5cdCAqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKlxuXHQgKiBAcGFyYW0gaXRlcmF0b3Jcblx0ICogQXJyYXkgb3IgaXRlcmF0b3IgY29udGFpbmluZyB0d28taXRlbSB0dXBsZXMgdXNlZCB0byBpbml0aWFsbHkgcG9wdWxhdGUgdGhlIG1hcC5cblx0ICogVGhlIGZpcnN0IGl0ZW0gaW4gZWFjaCB0dXBsZSBjb3JyZXNwb25kcyB0byB0aGUga2V5IG9mIHRoZSBtYXAgZW50cnkuXG5cdCAqIFRoZSBzZWNvbmQgaXRlbSBjb3JyZXNwb25kcyB0byB0aGUgdmFsdWUgb2YgdGhlIG1hcCBlbnRyeS5cblx0ICovXG5cdG5ldyA8SywgVj4oaXRlcmF0b3I/OiBbSywgVl1bXSk6IE1hcDxLLCBWPjtcblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBNYXBcblx0ICpcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqXG5cdCAqIEBwYXJhbSBpdGVyYXRvclxuXHQgKiBBcnJheSBvciBpdGVyYXRvciBjb250YWluaW5nIHR3by1pdGVtIHR1cGxlcyB1c2VkIHRvIGluaXRpYWxseSBwb3B1bGF0ZSB0aGUgbWFwLlxuXHQgKiBUaGUgZmlyc3QgaXRlbSBpbiBlYWNoIHR1cGxlIGNvcnJlc3BvbmRzIHRvIHRoZSBrZXkgb2YgdGhlIG1hcCBlbnRyeS5cblx0ICogVGhlIHNlY29uZCBpdGVtIGNvcnJlc3BvbmRzIHRvIHRoZSB2YWx1ZSBvZiB0aGUgbWFwIGVudHJ5LlxuXHQgKi9cblx0bmV3IDxLLCBWPihpdGVyYXRvcjogSXRlcmFibGU8W0ssIFZdPik6IE1hcDxLLCBWPjtcblxuXHRyZWFkb25seSBwcm90b3R5cGU6IE1hcDxhbnksIGFueT47XG5cblx0cmVhZG9ubHkgW1N5bWJvbC5zcGVjaWVzXTogTWFwQ29uc3RydWN0b3I7XG59XG5cbmV4cG9ydCBsZXQgTWFwOiBNYXBDb25zdHJ1Y3RvciA9IGdsb2JhbC5NYXA7XG5cbmlmICghaGFzKCdlczYtbWFwJykpIHtcblx0TWFwID0gY2xhc3MgTWFwPEssIFY+IHtcblx0XHRwcm90ZWN0ZWQgcmVhZG9ubHkgX2tleXM6IEtbXSA9IFtdO1xuXHRcdHByb3RlY3RlZCByZWFkb25seSBfdmFsdWVzOiBWW10gPSBbXTtcblxuXHRcdC8qKlxuXHRcdCAqIEFuIGFsdGVybmF0aXZlIHRvIEFycmF5LnByb3RvdHlwZS5pbmRleE9mIHVzaW5nIE9iamVjdC5pc1xuXHRcdCAqIHRvIGNoZWNrIGZvciBlcXVhbGl0eS4gU2VlIGh0dHA6Ly9temwubGEvMXp1S08yVlxuXHRcdCAqL1xuXHRcdHByb3RlY3RlZCBfaW5kZXhPZktleShrZXlzOiBLW10sIGtleTogSyk6IG51bWJlciB7XG5cdFx0XHRmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAob2JqZWN0SXMoa2V5c1tpXSwga2V5KSkge1xuXHRcdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gLTE7XG5cdFx0fVxuXG5cdFx0c3RhdGljIFtTeW1ib2wuc3BlY2llc10gPSBNYXA7XG5cblx0XHRjb25zdHJ1Y3RvcihpdGVyYWJsZT86IEFycmF5TGlrZTxbSywgVl0+IHwgSXRlcmFibGU8W0ssIFZdPikge1xuXHRcdFx0aWYgKGl0ZXJhYmxlKSB7XG5cdFx0XHRcdGlmIChpc0FycmF5TGlrZShpdGVyYWJsZSkpIHtcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGl0ZXJhYmxlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuXHRcdFx0XHRcdFx0dGhpcy5zZXQodmFsdWVbMF0sIHZhbHVlWzFdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Zm9yIChjb25zdCB2YWx1ZSBvZiBpdGVyYWJsZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5zZXQodmFsdWVbMF0sIHZhbHVlWzFdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRnZXQgc2l6ZSgpOiBudW1iZXIge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2tleXMubGVuZ3RoO1xuXHRcdH1cblxuXHRcdGNsZWFyKCk6IHZvaWQge1xuXHRcdFx0dGhpcy5fa2V5cy5sZW5ndGggPSB0aGlzLl92YWx1ZXMubGVuZ3RoID0gMDtcblx0XHR9XG5cblx0XHRkZWxldGUoa2V5OiBLKTogYm9vbGVhbiB7XG5cdFx0XHRjb25zdCBpbmRleCA9IHRoaXMuX2luZGV4T2ZLZXkodGhpcy5fa2V5cywga2V5KTtcblx0XHRcdGlmIChpbmRleCA8IDApIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fa2V5cy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0dGhpcy5fdmFsdWVzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRlbnRyaWVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8W0ssIFZdPiB7XG5cdFx0XHRjb25zdCB2YWx1ZXMgPSB0aGlzLl9rZXlzLm1hcChcblx0XHRcdFx0KGtleTogSywgaTogbnVtYmVyKTogW0ssIFZdID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gW2tleSwgdGhpcy5fdmFsdWVzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0KTtcblxuXHRcdFx0cmV0dXJuIG5ldyBTaGltSXRlcmF0b3IodmFsdWVzKTtcblx0XHR9XG5cblx0XHRmb3JFYWNoKGNhbGxiYWNrOiAodmFsdWU6IFYsIGtleTogSywgbWFwSW5zdGFuY2U6IE1hcDxLLCBWPikgPT4gYW55LCBjb250ZXh0Pzoge30pIHtcblx0XHRcdGNvbnN0IGtleXMgPSB0aGlzLl9rZXlzO1xuXHRcdFx0Y29uc3QgdmFsdWVzID0gdGhpcy5fdmFsdWVzO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y2FsbGJhY2suY2FsbChjb250ZXh0LCB2YWx1ZXNbaV0sIGtleXNbaV0sIHRoaXMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGdldChrZXk6IEspOiBWIHwgdW5kZWZpbmVkIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy5faW5kZXhPZktleSh0aGlzLl9rZXlzLCBrZXkpO1xuXHRcdFx0cmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IHRoaXMuX3ZhbHVlc1tpbmRleF07XG5cdFx0fVxuXG5cdFx0aGFzKGtleTogSyk6IGJvb2xlYW4ge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2luZGV4T2ZLZXkodGhpcy5fa2V5cywga2V5KSA+IC0xO1xuXHRcdH1cblxuXHRcdGtleXMoKTogSXRlcmFibGVJdGVyYXRvcjxLPiB7XG5cdFx0XHRyZXR1cm4gbmV3IFNoaW1JdGVyYXRvcih0aGlzLl9rZXlzKTtcblx0XHR9XG5cblx0XHRzZXQoa2V5OiBLLCB2YWx1ZTogVik6IE1hcDxLLCBWPiB7XG5cdFx0XHRsZXQgaW5kZXggPSB0aGlzLl9pbmRleE9mS2V5KHRoaXMuX2tleXMsIGtleSk7XG5cdFx0XHRpbmRleCA9IGluZGV4IDwgMCA/IHRoaXMuX2tleXMubGVuZ3RoIDogaW5kZXg7XG5cdFx0XHR0aGlzLl9rZXlzW2luZGV4XSA9IGtleTtcblx0XHRcdHRoaXMuX3ZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHZhbHVlcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFY+IHtcblx0XHRcdHJldHVybiBuZXcgU2hpbUl0ZXJhdG9yKHRoaXMuX3ZhbHVlcyk7XG5cdFx0fVxuXG5cdFx0W1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmFibGVJdGVyYXRvcjxbSywgVl0+IHtcblx0XHRcdHJldHVybiB0aGlzLmVudHJpZXMoKTtcblx0XHR9XG5cblx0XHRbU3ltYm9sLnRvU3RyaW5nVGFnXTogJ01hcCcgPSAnTWFwJztcblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIE1hcC50cyIsImltcG9ydCB7IFRoZW5hYmxlIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuaW1wb3J0IHsgcXVldWVNaWNyb1Rhc2sgfSBmcm9tICcuL3N1cHBvcnQvcXVldWUnO1xuaW1wb3J0IHsgSXRlcmFibGUgfSBmcm9tICcuL2l0ZXJhdG9yJztcbmltcG9ydCAnLi9TeW1ib2wnO1xuaW1wb3J0IGhhcyBmcm9tICcuL3N1cHBvcnQvaGFzJztcblxuLyoqXG4gKiBFeGVjdXRvciBpcyB0aGUgaW50ZXJmYWNlIGZvciBmdW5jdGlvbnMgdXNlZCB0byBpbml0aWFsaXplIGEgUHJvbWlzZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFeGVjdXRvcjxUPiB7XG5cdC8qKlxuXHQgKiBUaGUgZXhlY3V0b3IgZm9yIHRoZSBwcm9taXNlXG5cdCAqXG5cdCAqIEBwYXJhbSByZXNvbHZlIFRoZSByZXNvbHZlciBjYWxsYmFjayBvZiB0aGUgcHJvbWlzZVxuXHQgKiBAcGFyYW0gcmVqZWN0IFRoZSByZWplY3RvciBjYWxsYmFjayBvZiB0aGUgcHJvbWlzZVxuXHQgKi9cblx0KHJlc29sdmU6ICh2YWx1ZT86IFQgfCBQcm9taXNlTGlrZTxUPikgPT4gdm9pZCwgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkKTogdm9pZDtcbn1cblxuZXhwb3J0IGxldCBTaGltUHJvbWlzZTogdHlwZW9mIFByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcblxuZXhwb3J0IGNvbnN0IGlzVGhlbmFibGUgPSBmdW5jdGlvbiBpc1RoZW5hYmxlPFQ+KHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBQcm9taXNlTGlrZTxUPiB7XG5cdHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cbmlmICghaGFzKCdlczYtcHJvbWlzZScpKSB7XG5cdGNvbnN0IGVudW0gU3RhdGUge1xuXHRcdEZ1bGZpbGxlZCxcblx0XHRQZW5kaW5nLFxuXHRcdFJlamVjdGVkXG5cdH1cblxuXHRnbG9iYWwuUHJvbWlzZSA9IFNoaW1Qcm9taXNlID0gY2xhc3MgUHJvbWlzZTxUPiBpbXBsZW1lbnRzIFRoZW5hYmxlPFQ+IHtcblx0XHRzdGF0aWMgYWxsKGl0ZXJhYmxlOiBJdGVyYWJsZTxhbnkgfCBQcm9taXNlTGlrZTxhbnk+PiB8IChhbnkgfCBQcm9taXNlTGlrZTxhbnk+KVtdKTogUHJvbWlzZTxhbnk+IHtcblx0XHRcdHJldHVybiBuZXcgdGhpcyhmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdFx0Y29uc3QgdmFsdWVzOiBhbnlbXSA9IFtdO1xuXHRcdFx0XHRsZXQgY29tcGxldGUgPSAwO1xuXHRcdFx0XHRsZXQgdG90YWwgPSAwO1xuXHRcdFx0XHRsZXQgcG9wdWxhdGluZyA9IHRydWU7XG5cblx0XHRcdFx0ZnVuY3Rpb24gZnVsZmlsbChpbmRleDogbnVtYmVyLCB2YWx1ZTogYW55KTogdm9pZCB7XG5cdFx0XHRcdFx0dmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuXHRcdFx0XHRcdCsrY29tcGxldGU7XG5cdFx0XHRcdFx0ZmluaXNoKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmdW5jdGlvbiBmaW5pc2goKTogdm9pZCB7XG5cdFx0XHRcdFx0aWYgKHBvcHVsYXRpbmcgfHwgY29tcGxldGUgPCB0b3RhbCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXNvbHZlKHZhbHVlcyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmdW5jdGlvbiBwcm9jZXNzSXRlbShpbmRleDogbnVtYmVyLCBpdGVtOiBhbnkpOiB2b2lkIHtcblx0XHRcdFx0XHQrK3RvdGFsO1xuXHRcdFx0XHRcdGlmIChpc1RoZW5hYmxlKGl0ZW0pKSB7XG5cdFx0XHRcdFx0XHQvLyBJZiBhbiBpdGVtIFByb21pc2UgcmVqZWN0cywgdGhpcyBQcm9taXNlIGlzIGltbWVkaWF0ZWx5IHJlamVjdGVkIHdpdGggdGhlIGl0ZW1cblx0XHRcdFx0XHRcdC8vIFByb21pc2UncyByZWplY3Rpb24gZXJyb3IuXG5cdFx0XHRcdFx0XHRpdGVtLnRoZW4oZnVsZmlsbC5iaW5kKG51bGwsIGluZGV4KSwgcmVqZWN0KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0UHJvbWlzZS5yZXNvbHZlKGl0ZW0pLnRoZW4oZnVsZmlsbC5iaW5kKG51bGwsIGluZGV4KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IGkgPSAwO1xuXHRcdFx0XHRmb3IgKGNvbnN0IHZhbHVlIG9mIGl0ZXJhYmxlKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc0l0ZW0oaSwgdmFsdWUpO1xuXHRcdFx0XHRcdGkrKztcblx0XHRcdFx0fVxuXHRcdFx0XHRwb3B1bGF0aW5nID0gZmFsc2U7XG5cblx0XHRcdFx0ZmluaXNoKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRzdGF0aWMgcmFjZTxUPihpdGVyYWJsZTogSXRlcmFibGU8VCB8IFByb21pc2VMaWtlPFQ+PiB8IChUIHwgUHJvbWlzZUxpa2U8VD4pW10pOiBQcm9taXNlPFRbXT4ge1xuXHRcdFx0cmV0dXJuIG5ldyB0aGlzKGZ1bmN0aW9uKHJlc29sdmU6ICh2YWx1ZT86IGFueSkgPT4gdm9pZCwgcmVqZWN0KSB7XG5cdFx0XHRcdGZvciAoY29uc3QgaXRlbSBvZiBpdGVyYWJsZSkge1xuXHRcdFx0XHRcdGlmIChpdGVtIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuXHRcdFx0XHRcdFx0Ly8gSWYgYSBQcm9taXNlIGl0ZW0gcmVqZWN0cywgdGhpcyBQcm9taXNlIGlzIGltbWVkaWF0ZWx5IHJlamVjdGVkIHdpdGggdGhlIGl0ZW1cblx0XHRcdFx0XHRcdC8vIFByb21pc2UncyByZWplY3Rpb24gZXJyb3IuXG5cdFx0XHRcdFx0XHRpdGVtLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0UHJvbWlzZS5yZXNvbHZlKGl0ZW0pLnRoZW4ocmVzb2x2ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRzdGF0aWMgcmVqZWN0KHJlYXNvbj86IGFueSk6IFByb21pc2U8bmV2ZXI+IHtcblx0XHRcdHJldHVybiBuZXcgdGhpcyhmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdFx0cmVqZWN0KHJlYXNvbik7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRzdGF0aWMgcmVzb2x2ZSgpOiBQcm9taXNlPHZvaWQ+O1xuXHRcdHN0YXRpYyByZXNvbHZlPFQ+KHZhbHVlOiBUIHwgUHJvbWlzZUxpa2U8VD4pOiBQcm9taXNlPFQ+O1xuXHRcdHN0YXRpYyByZXNvbHZlPFQ+KHZhbHVlPzogYW55KTogUHJvbWlzZTxUPiB7XG5cdFx0XHRyZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24ocmVzb2x2ZSkge1xuXHRcdFx0XHRyZXNvbHZlKDxUPnZhbHVlKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBbU3ltYm9sLnNwZWNpZXNdOiBQcm9taXNlQ29uc3RydWN0b3IgPSBTaGltUHJvbWlzZSBhcyBQcm9taXNlQ29uc3RydWN0b3I7XG5cblx0XHQvKipcblx0XHQgKiBDcmVhdGVzIGEgbmV3IFByb21pc2UuXG5cdFx0ICpcblx0XHQgKiBAY29uc3RydWN0b3Jcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBleGVjdXRvclxuXHRcdCAqIFRoZSBleGVjdXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgaW1tZWRpYXRlbHkgd2hlbiB0aGUgUHJvbWlzZSBpcyBpbnN0YW50aWF0ZWQuIEl0IGlzIHJlc3BvbnNpYmxlIGZvclxuXHRcdCAqIHN0YXJ0aW5nIHRoZSBhc3luY2hyb25vdXMgb3BlcmF0aW9uIHdoZW4gaXQgaXMgaW52b2tlZC5cblx0XHQgKlxuXHRcdCAqIFRoZSBleGVjdXRvciBtdXN0IGNhbGwgZWl0aGVyIHRoZSBwYXNzZWQgYHJlc29sdmVgIGZ1bmN0aW9uIHdoZW4gdGhlIGFzeW5jaHJvbm91cyBvcGVyYXRpb24gaGFzIGNvbXBsZXRlZFxuXHRcdCAqIHN1Y2Nlc3NmdWxseSwgb3IgdGhlIGByZWplY3RgIGZ1bmN0aW9uIHdoZW4gdGhlIG9wZXJhdGlvbiBmYWlscy5cblx0XHQgKi9cblx0XHRjb25zdHJ1Y3RvcihleGVjdXRvcjogRXhlY3V0b3I8VD4pIHtcblx0XHRcdC8qKlxuXHRcdFx0ICogSWYgdHJ1ZSwgdGhlIHJlc29sdXRpb24gb2YgdGhpcyBwcm9taXNlIGlzIGNoYWluZWQgKFwibG9ja2VkIGluXCIpIHRvIGFub3RoZXIgcHJvbWlzZS5cblx0XHRcdCAqL1xuXHRcdFx0bGV0IGlzQ2hhaW5lZCA9IGZhbHNlO1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIFdoZXRoZXIgb3Igbm90IHRoaXMgcHJvbWlzZSBpcyBpbiBhIHJlc29sdmVkIHN0YXRlLlxuXHRcdFx0ICovXG5cdFx0XHRjb25zdCBpc1Jlc29sdmVkID0gKCk6IGJvb2xlYW4gPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5zdGF0ZSAhPT0gU3RhdGUuUGVuZGluZyB8fCBpc0NoYWluZWQ7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIENhbGxiYWNrcyB0aGF0IHNob3VsZCBiZSBpbnZva2VkIG9uY2UgdGhlIGFzeW5jaHJvbm91cyBvcGVyYXRpb24gaGFzIGNvbXBsZXRlZC5cblx0XHRcdCAqL1xuXHRcdFx0bGV0IGNhbGxiYWNrczogbnVsbCB8IChBcnJheTwoKSA9PiB2b2lkPikgPSBbXTtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBJbml0aWFsbHkgcHVzaGVzIGNhbGxiYWNrcyBvbnRvIGEgcXVldWUgZm9yIGV4ZWN1dGlvbiBvbmNlIHRoaXMgcHJvbWlzZSBzZXR0bGVzLiBBZnRlciB0aGUgcHJvbWlzZSBzZXR0bGVzLFxuXHRcdFx0ICogZW5xdWV1ZXMgY2FsbGJhY2tzIGZvciBleGVjdXRpb24gb24gdGhlIG5leHQgZXZlbnQgbG9vcCB0dXJuLlxuXHRcdFx0ICovXG5cdFx0XHRsZXQgd2hlbkZpbmlzaGVkID0gZnVuY3Rpb24oY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcblx0XHRcdFx0aWYgKGNhbGxiYWNrcykge1xuXHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTZXR0bGVzIHRoaXMgcHJvbWlzZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gbmV3U3RhdGUgVGhlIHJlc29sdmVkIHN0YXRlIGZvciB0aGlzIHByb21pc2UuXG5cdFx0XHQgKiBAcGFyYW0ge1R8YW55fSB2YWx1ZSBUaGUgcmVzb2x2ZWQgdmFsdWUgZm9yIHRoaXMgcHJvbWlzZS5cblx0XHRcdCAqL1xuXHRcdFx0Y29uc3Qgc2V0dGxlID0gKG5ld1N0YXRlOiBTdGF0ZSwgdmFsdWU6IGFueSk6IHZvaWQgPT4ge1xuXHRcdFx0XHQvLyBBIHByb21pc2UgY2FuIG9ubHkgYmUgc2V0dGxlZCBvbmNlLlxuXHRcdFx0XHRpZiAodGhpcy5zdGF0ZSAhPT0gU3RhdGUuUGVuZGluZykge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuc3RhdGUgPSBuZXdTdGF0ZTtcblx0XHRcdFx0dGhpcy5yZXNvbHZlZFZhbHVlID0gdmFsdWU7XG5cdFx0XHRcdHdoZW5GaW5pc2hlZCA9IHF1ZXVlTWljcm9UYXNrO1xuXG5cdFx0XHRcdC8vIE9ubHkgZW5xdWV1ZSBhIGNhbGxiYWNrIHJ1bm5lciBpZiB0aGVyZSBhcmUgY2FsbGJhY2tzIHNvIHRoYXQgaW5pdGlhbGx5IGZ1bGZpbGxlZCBQcm9taXNlcyBkb24ndCBoYXZlIHRvXG5cdFx0XHRcdC8vIHdhaXQgYW4gZXh0cmEgdHVybi5cblx0XHRcdFx0aWYgKGNhbGxiYWNrcyAmJiBjYWxsYmFja3MubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHF1ZXVlTWljcm9UYXNrKGZ1bmN0aW9uKCk6IHZvaWQge1xuXHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcykge1xuXHRcdFx0XHRcdFx0XHRsZXQgY291bnQgPSBjYWxsYmFja3MubGVuZ3RoO1xuXHRcdFx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyArK2kpIHtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFja3NbaV0uY2FsbChudWxsKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MgPSBudWxsO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJlc29sdmVzIHRoaXMgcHJvbWlzZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gbmV3U3RhdGUgVGhlIHJlc29sdmVkIHN0YXRlIGZvciB0aGlzIHByb21pc2UuXG5cdFx0XHQgKiBAcGFyYW0ge1R8YW55fSB2YWx1ZSBUaGUgcmVzb2x2ZWQgdmFsdWUgZm9yIHRoaXMgcHJvbWlzZS5cblx0XHRcdCAqL1xuXHRcdFx0Y29uc3QgcmVzb2x2ZSA9IChuZXdTdGF0ZTogU3RhdGUsIHZhbHVlOiBhbnkpOiB2b2lkID0+IHtcblx0XHRcdFx0aWYgKGlzUmVzb2x2ZWQoKSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChpc1RoZW5hYmxlKHZhbHVlKSkge1xuXHRcdFx0XHRcdHZhbHVlLnRoZW4oc2V0dGxlLmJpbmQobnVsbCwgU3RhdGUuRnVsZmlsbGVkKSwgc2V0dGxlLmJpbmQobnVsbCwgU3RhdGUuUmVqZWN0ZWQpKTtcblx0XHRcdFx0XHRpc0NoYWluZWQgPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNldHRsZShuZXdTdGF0ZSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLnRoZW4gPSA8VFJlc3VsdDEgPSBULCBUUmVzdWx0MiA9IG5ldmVyPihcblx0XHRcdFx0b25GdWxmaWxsZWQ/OiAoKHZhbHVlOiBUKSA9PiBUUmVzdWx0MSB8IFByb21pc2VMaWtlPFRSZXN1bHQxPikgfCB1bmRlZmluZWQgfCBudWxsLFxuXHRcdFx0XHRvblJlamVjdGVkPzogKChyZWFzb246IGFueSkgPT4gVFJlc3VsdDIgfCBQcm9taXNlTGlrZTxUUmVzdWx0Mj4pIHwgdW5kZWZpbmVkIHwgbnVsbFxuXHRcdFx0KTogUHJvbWlzZTxUUmVzdWx0MSB8IFRSZXN1bHQyPiA9PiB7XG5cdFx0XHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdFx0Ly8gd2hlbkZpbmlzaGVkIGluaXRpYWxseSBxdWV1ZXMgdXAgY2FsbGJhY2tzIGZvciBleGVjdXRpb24gYWZ0ZXIgdGhlIHByb21pc2UgaGFzIHNldHRsZWQuIE9uY2UgdGhlXG5cdFx0XHRcdFx0Ly8gcHJvbWlzZSBoYXMgc2V0dGxlZCwgd2hlbkZpbmlzaGVkIHdpbGwgc2NoZWR1bGUgY2FsbGJhY2tzIGZvciBleGVjdXRpb24gb24gdGhlIG5leHQgdHVybiB0aHJvdWdoIHRoZVxuXHRcdFx0XHRcdC8vIGV2ZW50IGxvb3AuXG5cdFx0XHRcdFx0d2hlbkZpbmlzaGVkKCgpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IGNhbGxiYWNrOiAoKHZhbHVlPzogYW55KSA9PiBhbnkpIHwgdW5kZWZpbmVkIHwgbnVsbCA9XG5cdFx0XHRcdFx0XHRcdHRoaXMuc3RhdGUgPT09IFN0YXRlLlJlamVjdGVkID8gb25SZWplY3RlZCA6IG9uRnVsZmlsbGVkO1xuXG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZShjYWxsYmFjayh0aGlzLnJlc29sdmVkVmFsdWUpKTtcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuc3RhdGUgPT09IFN0YXRlLlJlamVjdGVkKSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdCh0aGlzLnJlc29sdmVkVmFsdWUpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZSh0aGlzLnJlc29sdmVkVmFsdWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGV4ZWN1dG9yKHJlc29sdmUuYmluZChudWxsLCBTdGF0ZS5GdWxmaWxsZWQpLCByZXNvbHZlLmJpbmQobnVsbCwgU3RhdGUuUmVqZWN0ZWQpKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdHNldHRsZShTdGF0ZS5SZWplY3RlZCwgZXJyb3IpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNhdGNoPFRSZXN1bHQgPSBuZXZlcj4oXG5cdFx0XHRvblJlamVjdGVkPzogKChyZWFzb246IGFueSkgPT4gVFJlc3VsdCB8IFByb21pc2VMaWtlPFRSZXN1bHQ+KSB8IHVuZGVmaW5lZCB8IG51bGxcblx0XHQpOiBQcm9taXNlPFQgfCBUUmVzdWx0PiB7XG5cdFx0XHRyZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogVGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhpcyBwcm9taXNlLlxuXHRcdCAqL1xuXHRcdHByaXZhdGUgc3RhdGUgPSBTdGF0ZS5QZW5kaW5nO1xuXG5cdFx0LyoqXG5cdFx0ICogVGhlIHJlc29sdmVkIHZhbHVlIGZvciB0aGlzIHByb21pc2UuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSB7VHxhbnl9XG5cdFx0ICovXG5cdFx0cHJpdmF0ZSByZXNvbHZlZFZhbHVlOiBhbnk7XG5cblx0XHR0aGVuOiA8VFJlc3VsdDEgPSBULCBUUmVzdWx0MiA9IG5ldmVyPihcblx0XHRcdG9uZnVsZmlsbGVkPzogKCh2YWx1ZTogVCkgPT4gVFJlc3VsdDEgfCBQcm9taXNlTGlrZTxUUmVzdWx0MT4pIHwgdW5kZWZpbmVkIHwgbnVsbCxcblx0XHRcdG9ucmVqZWN0ZWQ/OiAoKHJlYXNvbjogYW55KSA9PiBUUmVzdWx0MiB8IFByb21pc2VMaWtlPFRSZXN1bHQyPikgfCB1bmRlZmluZWQgfCBudWxsXG5cdFx0KSA9PiBQcm9taXNlPFRSZXN1bHQxIHwgVFJlc3VsdDI+O1xuXG5cdFx0W1N5bWJvbC50b1N0cmluZ1RhZ106ICdQcm9taXNlJyA9ICdQcm9taXNlJztcblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpbVByb21pc2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gUHJvbWlzZS50cyIsImltcG9ydCBoYXMgZnJvbSAnLi9zdXBwb3J0L2hhcyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsJztcbmltcG9ydCB7IGdldFZhbHVlRGVzY3JpcHRvciB9IGZyb20gJy4vc3VwcG9ydC91dGlsJztcblxuZGVjbGFyZSBnbG9iYWwge1xuXHRpbnRlcmZhY2UgU3ltYm9sQ29uc3RydWN0b3Ige1xuXHRcdG9ic2VydmFibGU6IHN5bWJvbDtcblx0fVxufVxuXG5leHBvcnQgbGV0IFN5bWJvbDogU3ltYm9sQ29uc3RydWN0b3IgPSBnbG9iYWwuU3ltYm9sO1xuXG5pZiAoIWhhcygnZXM2LXN5bWJvbCcpKSB7XG5cdC8qKlxuXHQgKiBUaHJvd3MgaWYgdGhlIHZhbHVlIGlzIG5vdCBhIHN5bWJvbCwgdXNlZCBpbnRlcm5hbGx5IHdpdGhpbiB0aGUgU2hpbVxuXHQgKiBAcGFyYW0gIHthbnl9ICAgIHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVja1xuXHQgKiBAcmV0dXJuIHtzeW1ib2x9ICAgICAgIFJldHVybnMgdGhlIHN5bWJvbCBvciB0aHJvd3Ncblx0ICovXG5cdGNvbnN0IHZhbGlkYXRlU3ltYm9sID0gZnVuY3Rpb24gdmFsaWRhdGVTeW1ib2wodmFsdWU6IGFueSk6IHN5bWJvbCB7XG5cdFx0aWYgKCFpc1N5bWJvbCh2YWx1ZSkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IodmFsdWUgKyAnIGlzIG5vdCBhIHN5bWJvbCcpO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWU7XG5cdH07XG5cblx0Y29uc3QgZGVmaW5lUHJvcGVydGllcyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzO1xuXHRjb25zdCBkZWZpbmVQcm9wZXJ0eTogKFxuXHRcdG86IGFueSxcblx0XHRwOiBzdHJpbmcgfCBzeW1ib2wsXG5cdFx0YXR0cmlidXRlczogUHJvcGVydHlEZXNjcmlwdG9yICYgVGhpc1R5cGU8YW55PlxuXHQpID0+IGFueSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBhcyBhbnk7XG5cdGNvbnN0IGNyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG5cblx0Y29uc3Qgb2JqUHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcblxuXHRjb25zdCBnbG9iYWxTeW1ib2xzOiB7IFtrZXk6IHN0cmluZ106IHN5bWJvbCB9ID0ge307XG5cblx0Y29uc3QgZ2V0U3ltYm9sTmFtZSA9IChmdW5jdGlvbigpIHtcblx0XHRjb25zdCBjcmVhdGVkID0gY3JlYXRlKG51bGwpO1xuXHRcdHJldHVybiBmdW5jdGlvbihkZXNjOiBzdHJpbmcgfCBudW1iZXIpOiBzdHJpbmcge1xuXHRcdFx0bGV0IHBvc3RmaXggPSAwO1xuXHRcdFx0bGV0IG5hbWU6IHN0cmluZztcblx0XHRcdHdoaWxlIChjcmVhdGVkW1N0cmluZyhkZXNjKSArIChwb3N0Zml4IHx8ICcnKV0pIHtcblx0XHRcdFx0Kytwb3N0Zml4O1xuXHRcdFx0fVxuXHRcdFx0ZGVzYyArPSBTdHJpbmcocG9zdGZpeCB8fCAnJyk7XG5cdFx0XHRjcmVhdGVkW2Rlc2NdID0gdHJ1ZTtcblx0XHRcdG5hbWUgPSAnQEAnICsgZGVzYztcblxuXHRcdFx0Ly8gRklYTUU6IFRlbXBvcmFyeSBndWFyZCB1bnRpbCB0aGUgZHVwbGljYXRlIGV4ZWN1dGlvbiB3aGVuIHRlc3RpbmcgY2FuIGJlXG5cdFx0XHQvLyBwaW5uZWQgZG93bi5cblx0XHRcdGlmICghT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmpQcm90b3R5cGUsIG5hbWUpKSB7XG5cdFx0XHRcdGRlZmluZVByb3BlcnR5KG9ialByb3RvdHlwZSwgbmFtZSwge1xuXHRcdFx0XHRcdHNldDogZnVuY3Rpb24odGhpczogU3ltYm9sLCB2YWx1ZTogYW55KSB7XG5cdFx0XHRcdFx0XHRkZWZpbmVQcm9wZXJ0eSh0aGlzLCBuYW1lLCBnZXRWYWx1ZURlc2NyaXB0b3IodmFsdWUpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbmFtZTtcblx0XHR9O1xuXHR9KSgpO1xuXG5cdGNvbnN0IEludGVybmFsU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKHRoaXM6IGFueSwgZGVzY3JpcHRpb24/OiBzdHJpbmcgfCBudW1iZXIpOiBzeW1ib2wge1xuXHRcdGlmICh0aGlzIGluc3RhbmNlb2YgSW50ZXJuYWxTeW1ib2wpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGVFcnJvcjogU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG5cdFx0fVxuXHRcdHJldHVybiBTeW1ib2woZGVzY3JpcHRpb24pO1xuXHR9O1xuXG5cdFN5bWJvbCA9IGdsb2JhbC5TeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2wodGhpczogU3ltYm9sLCBkZXNjcmlwdGlvbj86IHN0cmluZyB8IG51bWJlcik6IHN5bWJvbCB7XG5cdFx0aWYgKHRoaXMgaW5zdGFuY2VvZiBTeW1ib2wpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGVFcnJvcjogU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG5cdFx0fVxuXHRcdGNvbnN0IHN5bSA9IE9iamVjdC5jcmVhdGUoSW50ZXJuYWxTeW1ib2wucHJvdG90eXBlKTtcblx0XHRkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uID09PSB1bmRlZmluZWQgPyAnJyA6IFN0cmluZyhkZXNjcmlwdGlvbik7XG5cdFx0cmV0dXJuIGRlZmluZVByb3BlcnRpZXMoc3ltLCB7XG5cdFx0XHRfX2Rlc2NyaXB0aW9uX186IGdldFZhbHVlRGVzY3JpcHRvcihkZXNjcmlwdGlvbiksXG5cdFx0XHRfX25hbWVfXzogZ2V0VmFsdWVEZXNjcmlwdG9yKGdldFN5bWJvbE5hbWUoZGVzY3JpcHRpb24pKVxuXHRcdH0pO1xuXHR9IGFzIFN5bWJvbENvbnN0cnVjdG9yO1xuXG5cdC8qIERlY29yYXRlIHRoZSBTeW1ib2wgZnVuY3Rpb24gd2l0aCB0aGUgYXBwcm9wcmlhdGUgcHJvcGVydGllcyAqL1xuXHRkZWZpbmVQcm9wZXJ0eShcblx0XHRTeW1ib2wsXG5cdFx0J2ZvcicsXG5cdFx0Z2V0VmFsdWVEZXNjcmlwdG9yKGZ1bmN0aW9uKGtleTogc3RyaW5nKTogc3ltYm9sIHtcblx0XHRcdGlmIChnbG9iYWxTeW1ib2xzW2tleV0pIHtcblx0XHRcdFx0cmV0dXJuIGdsb2JhbFN5bWJvbHNba2V5XTtcblx0XHRcdH1cblx0XHRcdHJldHVybiAoZ2xvYmFsU3ltYm9sc1trZXldID0gU3ltYm9sKFN0cmluZyhrZXkpKSk7XG5cdFx0fSlcblx0KTtcblx0ZGVmaW5lUHJvcGVydGllcyhTeW1ib2wsIHtcblx0XHRrZXlGb3I6IGdldFZhbHVlRGVzY3JpcHRvcihmdW5jdGlvbihzeW06IHN5bWJvbCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG5cdFx0XHRsZXQga2V5OiBzdHJpbmc7XG5cdFx0XHR2YWxpZGF0ZVN5bWJvbChzeW0pO1xuXHRcdFx0Zm9yIChrZXkgaW4gZ2xvYmFsU3ltYm9scykge1xuXHRcdFx0XHRpZiAoZ2xvYmFsU3ltYm9sc1trZXldID09PSBzeW0pIHtcblx0XHRcdFx0XHRyZXR1cm4ga2V5O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSksXG5cdFx0aGFzSW5zdGFuY2U6IGdldFZhbHVlRGVzY3JpcHRvcihTeW1ib2wuZm9yKCdoYXNJbnN0YW5jZScpLCBmYWxzZSwgZmFsc2UpLFxuXHRcdGlzQ29uY2F0U3ByZWFkYWJsZTogZ2V0VmFsdWVEZXNjcmlwdG9yKFN5bWJvbC5mb3IoJ2lzQ29uY2F0U3ByZWFkYWJsZScpLCBmYWxzZSwgZmFsc2UpLFxuXHRcdGl0ZXJhdG9yOiBnZXRWYWx1ZURlc2NyaXB0b3IoU3ltYm9sLmZvcignaXRlcmF0b3InKSwgZmFsc2UsIGZhbHNlKSxcblx0XHRtYXRjaDogZ2V0VmFsdWVEZXNjcmlwdG9yKFN5bWJvbC5mb3IoJ21hdGNoJyksIGZhbHNlLCBmYWxzZSksXG5cdFx0b2JzZXJ2YWJsZTogZ2V0VmFsdWVEZXNjcmlwdG9yKFN5bWJvbC5mb3IoJ29ic2VydmFibGUnKSwgZmFsc2UsIGZhbHNlKSxcblx0XHRyZXBsYWNlOiBnZXRWYWx1ZURlc2NyaXB0b3IoU3ltYm9sLmZvcigncmVwbGFjZScpLCBmYWxzZSwgZmFsc2UpLFxuXHRcdHNlYXJjaDogZ2V0VmFsdWVEZXNjcmlwdG9yKFN5bWJvbC5mb3IoJ3NlYXJjaCcpLCBmYWxzZSwgZmFsc2UpLFxuXHRcdHNwZWNpZXM6IGdldFZhbHVlRGVzY3JpcHRvcihTeW1ib2wuZm9yKCdzcGVjaWVzJyksIGZhbHNlLCBmYWxzZSksXG5cdFx0c3BsaXQ6IGdldFZhbHVlRGVzY3JpcHRvcihTeW1ib2wuZm9yKCdzcGxpdCcpLCBmYWxzZSwgZmFsc2UpLFxuXHRcdHRvUHJpbWl0aXZlOiBnZXRWYWx1ZURlc2NyaXB0b3IoU3ltYm9sLmZvcigndG9QcmltaXRpdmUnKSwgZmFsc2UsIGZhbHNlKSxcblx0XHR0b1N0cmluZ1RhZzogZ2V0VmFsdWVEZXNjcmlwdG9yKFN5bWJvbC5mb3IoJ3RvU3RyaW5nVGFnJyksIGZhbHNlLCBmYWxzZSksXG5cdFx0dW5zY29wYWJsZXM6IGdldFZhbHVlRGVzY3JpcHRvcihTeW1ib2wuZm9yKCd1bnNjb3BhYmxlcycpLCBmYWxzZSwgZmFsc2UpXG5cdH0pO1xuXG5cdC8qIERlY29yYXRlIHRoZSBJbnRlcm5hbFN5bWJvbCBvYmplY3QgKi9cblx0ZGVmaW5lUHJvcGVydGllcyhJbnRlcm5hbFN5bWJvbC5wcm90b3R5cGUsIHtcblx0XHRjb25zdHJ1Y3RvcjogZ2V0VmFsdWVEZXNjcmlwdG9yKFN5bWJvbCksXG5cdFx0dG9TdHJpbmc6IGdldFZhbHVlRGVzY3JpcHRvcihcblx0XHRcdGZ1bmN0aW9uKHRoaXM6IHsgX19uYW1lX186IHN0cmluZyB9KSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9fbmFtZV9fO1xuXHRcdFx0fSxcblx0XHRcdGZhbHNlLFxuXHRcdFx0ZmFsc2Vcblx0XHQpXG5cdH0pO1xuXG5cdC8qIERlY29yYXRlIHRoZSBTeW1ib2wucHJvdG90eXBlICovXG5cdGRlZmluZVByb3BlcnRpZXMoU3ltYm9sLnByb3RvdHlwZSwge1xuXHRcdHRvU3RyaW5nOiBnZXRWYWx1ZURlc2NyaXB0b3IoZnVuY3Rpb24odGhpczogU3ltYm9sKSB7XG5cdFx0XHRyZXR1cm4gJ1N5bWJvbCAoJyArICg8YW55PnZhbGlkYXRlU3ltYm9sKHRoaXMpKS5fX2Rlc2NyaXB0aW9uX18gKyAnKSc7XG5cdFx0fSksXG5cdFx0dmFsdWVPZjogZ2V0VmFsdWVEZXNjcmlwdG9yKGZ1bmN0aW9uKHRoaXM6IFN5bWJvbCkge1xuXHRcdFx0cmV0dXJuIHZhbGlkYXRlU3ltYm9sKHRoaXMpO1xuXHRcdH0pXG5cdH0pO1xuXG5cdGRlZmluZVByb3BlcnR5KFxuXHRcdFN5bWJvbC5wcm90b3R5cGUsXG5cdFx0U3ltYm9sLnRvUHJpbWl0aXZlLFxuXHRcdGdldFZhbHVlRGVzY3JpcHRvcihmdW5jdGlvbih0aGlzOiBTeW1ib2wpIHtcblx0XHRcdHJldHVybiB2YWxpZGF0ZVN5bWJvbCh0aGlzKTtcblx0XHR9KVxuXHQpO1xuXHRkZWZpbmVQcm9wZXJ0eShTeW1ib2wucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIGdldFZhbHVlRGVzY3JpcHRvcignU3ltYm9sJywgZmFsc2UsIGZhbHNlLCB0cnVlKSk7XG5cblx0ZGVmaW5lUHJvcGVydHkoXG5cdFx0SW50ZXJuYWxTeW1ib2wucHJvdG90eXBlLFxuXHRcdFN5bWJvbC50b1ByaW1pdGl2ZSxcblx0XHRnZXRWYWx1ZURlc2NyaXB0b3IoKDxhbnk+U3ltYm9sKS5wcm90b3R5cGVbU3ltYm9sLnRvUHJpbWl0aXZlXSwgZmFsc2UsIGZhbHNlLCB0cnVlKVxuXHQpO1xuXHRkZWZpbmVQcm9wZXJ0eShcblx0XHRJbnRlcm5hbFN5bWJvbC5wcm90b3R5cGUsXG5cdFx0U3ltYm9sLnRvU3RyaW5nVGFnLFxuXHRcdGdldFZhbHVlRGVzY3JpcHRvcigoPGFueT5TeW1ib2wpLnByb3RvdHlwZVtTeW1ib2wudG9TdHJpbmdUYWddLCBmYWxzZSwgZmFsc2UsIHRydWUpXG5cdCk7XG59XG5cbi8qKlxuICogQSBjdXN0b20gZ3VhcmQgZnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIGlmIGFuIG9iamVjdCBpcyBhIHN5bWJvbCBvciBub3RcbiAqIEBwYXJhbSAge2FueX0gICAgICAgdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrIHRvIHNlZSBpZiBpdCBpcyBhIHN5bWJvbCBvciBub3RcbiAqIEByZXR1cm4ge2lzIHN5bWJvbH0gICAgICAgUmV0dXJucyB0cnVlIGlmIGEgc3ltYm9sIG9yIG5vdCAoYW5kIG5hcnJvd3MgdGhlIHR5cGUgZ3VhcmQpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZTogYW55KTogdmFsdWUgaXMgc3ltYm9sIHtcblx0cmV0dXJuICh2YWx1ZSAmJiAodHlwZW9mIHZhbHVlID09PSAnc3ltYm9sJyB8fCB2YWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykpIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEZpbGwgYW55IG1pc3Npbmcgd2VsbCBrbm93biBzeW1ib2xzIGlmIHRoZSBuYXRpdmUgU3ltYm9sIGlzIG1pc3NpbmcgdGhlbVxuICovXG5bXG5cdCdoYXNJbnN0YW5jZScsXG5cdCdpc0NvbmNhdFNwcmVhZGFibGUnLFxuXHQnaXRlcmF0b3InLFxuXHQnc3BlY2llcycsXG5cdCdyZXBsYWNlJyxcblx0J3NlYXJjaCcsXG5cdCdzcGxpdCcsXG5cdCdtYXRjaCcsXG5cdCd0b1ByaW1pdGl2ZScsXG5cdCd0b1N0cmluZ1RhZycsXG5cdCd1bnNjb3BhYmxlcycsXG5cdCdvYnNlcnZhYmxlJ1xuXS5mb3JFYWNoKCh3ZWxsS25vd24pID0+IHtcblx0aWYgKCEoU3ltYm9sIGFzIGFueSlbd2VsbEtub3duXSkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTeW1ib2wsIHdlbGxLbm93biwgZ2V0VmFsdWVEZXNjcmlwdG9yKFN5bWJvbC5mb3Iod2VsbEtub3duKSwgZmFsc2UsIGZhbHNlKSk7XG5cdH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBTeW1ib2w7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gU3ltYm9sLnRzIiwiaW1wb3J0IGdsb2JhbCBmcm9tICcuL2dsb2JhbCc7XG5pbXBvcnQgeyBpc0FycmF5TGlrZSwgSXRlcmFibGUgfSBmcm9tICcuL2l0ZXJhdG9yJztcbmltcG9ydCBoYXMgZnJvbSAnLi9zdXBwb3J0L2hhcyc7XG5pbXBvcnQgJy4vU3ltYm9sJztcblxuZXhwb3J0IGludGVyZmFjZSBXZWFrTWFwPEsgZXh0ZW5kcyBvYmplY3QsIFY+IHtcblx0LyoqXG5cdCAqIFJlbW92ZSBhIGBrZXlgIGZyb20gdGhlIG1hcFxuXHQgKlxuXHQgKiBAcGFyYW0ga2V5IFRoZSBrZXkgdG8gcmVtb3ZlXG5cdCAqIEByZXR1cm4gYHRydWVgIGlmIHRoZSB2YWx1ZSB3YXMgcmVtb3ZlZCwgb3RoZXJ3aXNlIGBmYWxzZWBcblx0ICovXG5cdGRlbGV0ZShrZXk6IEspOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZSB0aGUgdmFsdWUsIGJhc2VkIG9uIHRoZSBzdXBwbGllZCBga2V5YFxuXHQgKlxuXHQgKiBAcGFyYW0ga2V5IFRoZSBrZXkgdG8gcmV0cmlldmUgdGhlIGB2YWx1ZWAgZm9yXG5cdCAqIEByZXR1cm4gdGhlIGB2YWx1ZWAgYmFzZWQgb24gdGhlIGBrZXlgIGlmIGZvdW5kLCBvdGhlcndpc2UgYGZhbHNlYFxuXHQgKi9cblx0Z2V0KGtleTogSyk6IFYgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgaWYgYSBga2V5YCBpcyBwcmVzZW50IGluIHRoZSBtYXBcblx0ICpcblx0ICogQHBhcmFtIGtleSBUaGUgYGtleWAgdG8gY2hlY2tcblx0ICogQHJldHVybiBgdHJ1ZWAgaWYgdGhlIGtleSBpcyBwYXJ0IG9mIHRoZSBtYXAsIG90aGVyd2lzZSBgZmFsc2VgLlxuXHQgKi9cblx0aGFzKGtleTogSyk6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFNldCBhIGB2YWx1ZWAgZm9yIGEgcGFydGljdWxhciBga2V5YC5cblx0ICpcblx0ICogQHBhcmFtIGtleSBUaGUgYGtleWAgdG8gc2V0IHRoZSBgdmFsdWVgIGZvclxuXHQgKiBAcGFyYW0gdmFsdWUgVGhlIGB2YWx1ZWAgdG8gc2V0XG5cdCAqIEByZXR1cm4gdGhlIGluc3RhbmNlc1xuXHQgKi9cblx0c2V0KGtleTogSywgdmFsdWU6IFYpOiB0aGlzO1xuXG5cdHJlYWRvbmx5IFtTeW1ib2wudG9TdHJpbmdUYWddOiAnV2Vha01hcCc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2Vha01hcENvbnN0cnVjdG9yIHtcblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBhIGBXZWFrTWFwYFxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICovXG5cdG5ldyAoKTogV2Vha01hcDxvYmplY3QsIGFueT47XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBhIGBXZWFrTWFwYFxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICpcblx0ICogQHBhcmFtIGl0ZXJhYmxlIEFuIGl0ZXJhYmxlIHRoYXQgY29udGFpbnMgeWllbGRzIHVwIGtleS92YWx1ZSBwYWlyIGVudHJpZXNcblx0ICovXG5cdG5ldyA8SyBleHRlbmRzIG9iamVjdCwgVj4oaXRlcmFibGU/OiBbSywgVl1bXSk6IFdlYWtNYXA8SywgVj47XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBhIGBXZWFrTWFwYFxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICpcblx0ICogQHBhcmFtIGl0ZXJhYmxlIEFuIGl0ZXJhYmxlIHRoYXQgY29udGFpbnMgeWllbGRzIHVwIGtleS92YWx1ZSBwYWlyIGVudHJpZXNcblx0ICovXG5cdG5ldyA8SyBleHRlbmRzIG9iamVjdCwgVj4oaXRlcmFibGU6IEl0ZXJhYmxlPFtLLCBWXT4pOiBXZWFrTWFwPEssIFY+O1xuXG5cdHJlYWRvbmx5IHByb3RvdHlwZTogV2Vha01hcDxvYmplY3QsIGFueT47XG59XG5cbmV4cG9ydCBsZXQgV2Vha01hcDogV2Vha01hcENvbnN0cnVjdG9yID0gZ2xvYmFsLldlYWtNYXA7XG5cbmludGVyZmFjZSBFbnRyeTxLLCBWPiB7XG5cdGtleTogSztcblx0dmFsdWU6IFY7XG59XG5cbmlmICghaGFzKCdlczYtd2Vha21hcCcpKSB7XG5cdGNvbnN0IERFTEVURUQ6IGFueSA9IHt9O1xuXG5cdGNvbnN0IGdldFVJRCA9IGZ1bmN0aW9uIGdldFVJRCgpOiBudW1iZXIge1xuXHRcdHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDApO1xuXHR9O1xuXG5cdGNvbnN0IGdlbmVyYXRlTmFtZSA9IChmdW5jdGlvbigpIHtcblx0XHRsZXQgc3RhcnRJZCA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAlIDEwMDAwMDAwMCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gZ2VuZXJhdGVOYW1lKCk6IHN0cmluZyB7XG5cdFx0XHRyZXR1cm4gJ19fd20nICsgZ2V0VUlEKCkgKyAoc3RhcnRJZCsrICsgJ19fJyk7XG5cdFx0fTtcblx0fSkoKTtcblxuXHRXZWFrTWFwID0gY2xhc3MgV2Vha01hcDxLLCBWPiB7XG5cdFx0cHJpdmF0ZSByZWFkb25seSBfbmFtZTogc3RyaW5nO1xuXHRcdHByaXZhdGUgcmVhZG9ubHkgX2Zyb3plbkVudHJpZXM6IEVudHJ5PEssIFY+W107XG5cblx0XHRjb25zdHJ1Y3RvcihpdGVyYWJsZT86IEFycmF5TGlrZTxbSywgVl0+IHwgSXRlcmFibGU8W0ssIFZdPikge1xuXHRcdFx0dGhpcy5fbmFtZSA9IGdlbmVyYXRlTmFtZSgpO1xuXG5cdFx0XHR0aGlzLl9mcm96ZW5FbnRyaWVzID0gW107XG5cblx0XHRcdGlmIChpdGVyYWJsZSkge1xuXHRcdFx0XHRpZiAoaXNBcnJheUxpa2UoaXRlcmFibGUpKSB7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyYWJsZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGl0ZXJhYmxlW2ldO1xuXHRcdFx0XHRcdFx0dGhpcy5zZXQoaXRlbVswXSwgaXRlbVsxXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGl0ZXJhYmxlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNldChrZXksIHZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRwcml2YXRlIF9nZXRGcm96ZW5FbnRyeUluZGV4KGtleTogYW55KTogbnVtYmVyIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZnJvemVuRW50cmllcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAodGhpcy5fZnJvemVuRW50cmllc1tpXS5rZXkgPT09IGtleSkge1xuXHRcdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAtMTtcblx0XHR9XG5cblx0XHRkZWxldGUoa2V5OiBhbnkpOiBib29sZWFuIHtcblx0XHRcdGlmIChrZXkgPT09IHVuZGVmaW5lZCB8fCBrZXkgPT09IG51bGwpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBlbnRyeTogRW50cnk8SywgVj4gPSBrZXlbdGhpcy5fbmFtZV07XG5cdFx0XHRpZiAoZW50cnkgJiYgZW50cnkua2V5ID09PSBrZXkgJiYgZW50cnkudmFsdWUgIT09IERFTEVURUQpIHtcblx0XHRcdFx0ZW50cnkudmFsdWUgPSBERUxFVEVEO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZnJvemVuSW5kZXggPSB0aGlzLl9nZXRGcm96ZW5FbnRyeUluZGV4KGtleSk7XG5cdFx0XHRpZiAoZnJvemVuSW5kZXggPj0gMCkge1xuXHRcdFx0XHR0aGlzLl9mcm96ZW5FbnRyaWVzLnNwbGljZShmcm96ZW5JbmRleCwgMSk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Z2V0KGtleTogYW55KTogViB8IHVuZGVmaW5lZCB7XG5cdFx0XHRpZiAoa2V5ID09PSB1bmRlZmluZWQgfHwga2V5ID09PSBudWxsKSB7XG5cdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGVudHJ5OiBFbnRyeTxLLCBWPiA9IGtleVt0aGlzLl9uYW1lXTtcblx0XHRcdGlmIChlbnRyeSAmJiBlbnRyeS5rZXkgPT09IGtleSAmJiBlbnRyeS52YWx1ZSAhPT0gREVMRVRFRCkge1xuXHRcdFx0XHRyZXR1cm4gZW50cnkudmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGZyb3plbkluZGV4ID0gdGhpcy5fZ2V0RnJvemVuRW50cnlJbmRleChrZXkpO1xuXHRcdFx0aWYgKGZyb3plbkluZGV4ID49IDApIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2Zyb3plbkVudHJpZXNbZnJvemVuSW5kZXhdLnZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGhhcyhrZXk6IGFueSk6IGJvb2xlYW4ge1xuXHRcdFx0aWYgKGtleSA9PT0gdW5kZWZpbmVkIHx8IGtleSA9PT0gbnVsbCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGVudHJ5OiBFbnRyeTxLLCBWPiA9IGtleVt0aGlzLl9uYW1lXTtcblx0XHRcdGlmIChCb29sZWFuKGVudHJ5ICYmIGVudHJ5LmtleSA9PT0ga2V5ICYmIGVudHJ5LnZhbHVlICE9PSBERUxFVEVEKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZnJvemVuSW5kZXggPSB0aGlzLl9nZXRGcm96ZW5FbnRyeUluZGV4KGtleSk7XG5cdFx0XHRpZiAoZnJvemVuSW5kZXggPj0gMCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHNldChrZXk6IGFueSwgdmFsdWU/OiBhbnkpOiB0aGlzIHtcblx0XHRcdGlmICgha2V5IHx8ICh0eXBlb2Yga2V5ICE9PSAnb2JqZWN0JyAmJiB0eXBlb2Yga2V5ICE9PSAnZnVuY3Rpb24nKSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHZhbHVlIHVzZWQgYXMgd2VhayBtYXAga2V5Jyk7XG5cdFx0XHR9XG5cdFx0XHRsZXQgZW50cnk6IEVudHJ5PEssIFY+ID0ga2V5W3RoaXMuX25hbWVdO1xuXHRcdFx0aWYgKCFlbnRyeSB8fCBlbnRyeS5rZXkgIT09IGtleSkge1xuXHRcdFx0XHRlbnRyeSA9IE9iamVjdC5jcmVhdGUobnVsbCwge1xuXHRcdFx0XHRcdGtleTogeyB2YWx1ZToga2V5IH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYgKE9iamVjdC5pc0Zyb3plbihrZXkpKSB7XG5cdFx0XHRcdFx0dGhpcy5fZnJvemVuRW50cmllcy5wdXNoKGVudHJ5KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoa2V5LCB0aGlzLl9uYW1lLCB7XG5cdFx0XHRcdFx0XHR2YWx1ZTogZW50cnlcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZW50cnkudmFsdWUgPSB2YWx1ZTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdFtTeW1ib2wudG9TdHJpbmdUYWddOiAnV2Vha01hcCcgPSAnV2Vha01hcCc7XG5cdH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYWtNYXA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gV2Vha01hcC50cyIsImltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuaW1wb3J0IHsgaXNBcnJheUxpa2UsIGlzSXRlcmFibGUsIEl0ZXJhYmxlIH0gZnJvbSAnLi9pdGVyYXRvcic7XG5pbXBvcnQgeyBNQVhfU0FGRV9JTlRFR0VSIH0gZnJvbSAnLi9udW1iZXInO1xuaW1wb3J0IGhhcyBmcm9tICcuL3N1cHBvcnQvaGFzJztcbmltcG9ydCB7IHdyYXBOYXRpdmUgfSBmcm9tICcuL3N1cHBvcnQvdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFwQ2FsbGJhY2s8VCwgVT4ge1xuXHQvKipcblx0ICogQSBjYWxsYmFjayBmdW5jdGlvbiB3aGVuIG1hcHBpbmdcblx0ICpcblx0ICogQHBhcmFtIGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCBpcyBjdXJyZW50bHkgYmVpbmcgbWFwcGVkXG5cdCAqIEBwYXJhbSBpbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgZWxlbWVudFxuXHQgKi9cblx0KGVsZW1lbnQ6IFQsIGluZGV4OiBudW1iZXIpOiBVO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpbmRDYWxsYmFjazxUPiB7XG5cdC8qKlxuXHQgKiBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gdXNpbmcgZmluZFxuXHQgKlxuXHQgKiBAcGFyYW0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IGlzIGN1cnJlbnR5IGJlaW5nIGFuYWx5c2VkXG5cdCAqIEBwYXJhbSBpbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgZWxlbWVudCB0aGF0IGlzIGJlaW5nIGFuYWx5c2VkXG5cdCAqIEBwYXJhbSBhcnJheSBUaGUgc291cmNlIGFycmF5XG5cdCAqL1xuXHQoZWxlbWVudDogVCwgaW5kZXg6IG51bWJlciwgYXJyYXk6IEFycmF5TGlrZTxUPik6IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBXcml0YWJsZUFycmF5TGlrZTxUPiB7XG5cdHJlYWRvbmx5IGxlbmd0aDogbnVtYmVyO1xuXHRbbjogbnVtYmVyXTogVDtcbn1cblxuLyogRVM2IEFycmF5IHN0YXRpYyBtZXRob2RzICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgRnJvbSB7XG5cdC8qKlxuXHQgKiBUaGUgQXJyYXkuZnJvbSgpIG1ldGhvZCBjcmVhdGVzIGEgbmV3IEFycmF5IGluc3RhbmNlIGZyb20gYW4gYXJyYXktbGlrZSBvciBpdGVyYWJsZSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBzb3VyY2UgQW4gYXJyYXktbGlrZSBvciBpdGVyYWJsZSBvYmplY3QgdG8gY29udmVydCB0byBhbiBhcnJheVxuXHQgKiBAcGFyYW0gbWFwRnVuY3Rpb24gQSBtYXAgZnVuY3Rpb24gdG8gY2FsbCBvbiBlYWNoIGVsZW1lbnQgaW4gdGhlIGFycmF5XG5cdCAqIEBwYXJhbSB0aGlzQXJnIFRoZSBleGVjdXRpb24gY29udGV4dCBmb3IgdGhlIG1hcCBmdW5jdGlvblxuXHQgKiBAcmV0dXJuIFRoZSBuZXcgQXJyYXlcblx0ICovXG5cdDxULCBVPihzb3VyY2U6IEFycmF5TGlrZTxUPiB8IEl0ZXJhYmxlPFQ+LCBtYXBGdW5jdGlvbjogTWFwQ2FsbGJhY2s8VCwgVT4sIHRoaXNBcmc/OiBhbnkpOiBBcnJheTxVPjtcblxuXHQvKipcblx0ICogVGhlIEFycmF5LmZyb20oKSBtZXRob2QgY3JlYXRlcyBhIG5ldyBBcnJheSBpbnN0YW5jZSBmcm9tIGFuIGFycmF5LWxpa2Ugb3IgaXRlcmFibGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gc291cmNlIEFuIGFycmF5LWxpa2Ugb3IgaXRlcmFibGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gYW4gYXJyYXlcblx0ICogQHJldHVybiBUaGUgbmV3IEFycmF5XG5cdCAqL1xuXHQ8VD4oc291cmNlOiBBcnJheUxpa2U8VD4gfCBJdGVyYWJsZTxUPik6IEFycmF5PFQ+O1xufVxuXG5leHBvcnQgbGV0IGZyb206IEZyb207XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBhcnJheSBmcm9tIHRoZSBmdW5jdGlvbiBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSBhcmd1bWVudHMgQW55IG51bWJlciBvZiBhcmd1bWVudHMgZm9yIHRoZSBhcnJheVxuICogQHJldHVybiBBbiBhcnJheSBmcm9tIHRoZSBnaXZlbiBhcmd1bWVudHNcbiAqL1xuZXhwb3J0IGxldCBvZjogPFQ+KC4uLml0ZW1zOiBUW10pID0+IEFycmF5PFQ+O1xuXG4vKiBFUzYgQXJyYXkgaW5zdGFuY2UgbWV0aG9kcyAqL1xuXG4vKipcbiAqIENvcGllcyBkYXRhIGludGVybmFsbHkgd2l0aGluIGFuIGFycmF5IG9yIGFycmF5LWxpa2Ugb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBhcnJheS1saWtlIG9iamVjdFxuICogQHBhcmFtIG9mZnNldCBUaGUgaW5kZXggdG8gc3RhcnQgY29weWluZyB2YWx1ZXMgdG87IGlmIG5lZ2F0aXZlLCBpdCBjb3VudHMgYmFja3dhcmRzIGZyb20gbGVuZ3RoXG4gKiBAcGFyYW0gc3RhcnQgVGhlIGZpcnN0IChpbmNsdXNpdmUpIGluZGV4IHRvIGNvcHk7IGlmIG5lZ2F0aXZlLCBpdCBjb3VudHMgYmFja3dhcmRzIGZyb20gbGVuZ3RoXG4gKiBAcGFyYW0gZW5kIFRoZSBsYXN0IChleGNsdXNpdmUpIGluZGV4IHRvIGNvcHk7IGlmIG5lZ2F0aXZlLCBpdCBjb3VudHMgYmFja3dhcmRzIGZyb20gbGVuZ3RoXG4gKiBAcmV0dXJuIFRoZSB0YXJnZXRcbiAqL1xuZXhwb3J0IGxldCBjb3B5V2l0aGluOiA8VD4odGFyZ2V0OiBBcnJheUxpa2U8VD4sIG9mZnNldDogbnVtYmVyLCBzdGFydDogbnVtYmVyLCBlbmQ/OiBudW1iZXIpID0+IEFycmF5TGlrZTxUPjtcblxuLyoqXG4gKiBGaWxscyBlbGVtZW50cyBvZiBhbiBhcnJheS1saWtlIG9iamVjdCB3aXRoIHRoZSBzcGVjaWZpZWQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRvIGZpbGxcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gZmlsbCBlYWNoIGVsZW1lbnQgb2YgdGhlIHRhcmdldCB3aXRoXG4gKiBAcGFyYW0gc3RhcnQgVGhlIGZpcnN0IGluZGV4IHRvIGZpbGxcbiAqIEBwYXJhbSBlbmQgVGhlIChleGNsdXNpdmUpIGluZGV4IGF0IHdoaWNoIHRvIHN0b3AgZmlsbGluZ1xuICogQHJldHVybiBUaGUgZmlsbGVkIHRhcmdldFxuICovXG5leHBvcnQgbGV0IGZpbGw6IDxUPih0YXJnZXQ6IEFycmF5TGlrZTxUPiwgdmFsdWU6IFQsIHN0YXJ0PzogbnVtYmVyLCBlbmQ/OiBudW1iZXIpID0+IEFycmF5TGlrZTxUPjtcblxuLyoqXG4gKiBGaW5kcyBhbmQgcmV0dXJucyB0aGUgZmlyc3QgaW5zdGFuY2UgbWF0Y2hpbmcgdGhlIGNhbGxiYWNrIG9yIHVuZGVmaW5lZCBpZiBvbmUgaXMgbm90IGZvdW5kLlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgQW4gYXJyYXktbGlrZSBvYmplY3RcbiAqIEBwYXJhbSBjYWxsYmFjayBBIGZ1bmN0aW9uIHJldHVybmluZyBpZiB0aGUgY3VycmVudCB2YWx1ZSBtYXRjaGVzIGEgY3JpdGVyaWFcbiAqIEBwYXJhbSB0aGlzQXJnIFRoZSBleGVjdXRpb24gY29udGV4dCBmb3IgdGhlIGZpbmQgZnVuY3Rpb25cbiAqIEByZXR1cm4gVGhlIGZpcnN0IGVsZW1lbnQgbWF0Y2hpbmcgdGhlIGNhbGxiYWNrLCBvciB1bmRlZmluZWQgaWYgb25lIGRvZXMgbm90IGV4aXN0XG4gKi9cbmV4cG9ydCBsZXQgZmluZDogPFQ+KHRhcmdldDogQXJyYXlMaWtlPFQ+LCBjYWxsYmFjazogRmluZENhbGxiYWNrPFQ+LCB0aGlzQXJnPzoge30pID0+IFQgfCB1bmRlZmluZWQ7XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgc2VhcmNoIGFuZCByZXR1cm5zIHRoZSBmaXJzdCBpbmRleCB3aG9zZSB2YWx1ZSBzYXRpc2ZpZXMgdGhlIHBhc3NlZCBjYWxsYmFjayxcbiAqIG9yIC0xIGlmIG5vIHZhbHVlcyBzYXRpc2Z5IGl0LlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgQW4gYXJyYXktbGlrZSBvYmplY3RcbiAqIEBwYXJhbSBjYWxsYmFjayBBIGZ1bmN0aW9uIHJldHVybmluZyB0cnVlIGlmIHRoZSBjdXJyZW50IHZhbHVlIHNhdGlzZmllcyBpdHMgY3JpdGVyaWFcbiAqIEBwYXJhbSB0aGlzQXJnIFRoZSBleGVjdXRpb24gY29udGV4dCBmb3IgdGhlIGZpbmQgZnVuY3Rpb25cbiAqIEByZXR1cm4gVGhlIGZpcnN0IGluZGV4IHdob3NlIHZhbHVlIHNhdGlzZmllcyB0aGUgcGFzc2VkIGNhbGxiYWNrLCBvciAtMSBpZiBubyB2YWx1ZXMgc2F0aXNmeSBpdFxuICovXG5leHBvcnQgbGV0IGZpbmRJbmRleDogPFQ+KHRhcmdldDogQXJyYXlMaWtlPFQ+LCBjYWxsYmFjazogRmluZENhbGxiYWNrPFQ+LCB0aGlzQXJnPzoge30pID0+IG51bWJlcjtcblxuLyogRVM3IEFycmF5IGluc3RhbmNlIG1ldGhvZHMgKi9cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYW4gYXJyYXkgaW5jbHVkZXMgYSBnaXZlbiB2YWx1ZVxuICpcbiAqIEBwYXJhbSB0YXJnZXQgdGhlIHRhcmdldCBhcnJheS1saWtlIG9iamVjdFxuICogQHBhcmFtIHNlYXJjaEVsZW1lbnQgdGhlIGl0ZW0gdG8gc2VhcmNoIGZvclxuICogQHBhcmFtIGZyb21JbmRleCB0aGUgc3RhcnRpbmcgaW5kZXggdG8gc2VhcmNoIGZyb21cbiAqIEByZXR1cm4gYHRydWVgIGlmIHRoZSBhcnJheSBpbmNsdWRlcyB0aGUgZWxlbWVudCwgb3RoZXJ3aXNlIGBmYWxzZWBcbiAqL1xuZXhwb3J0IGxldCBpbmNsdWRlczogPFQ+KHRhcmdldDogQXJyYXlMaWtlPFQ+LCBzZWFyY2hFbGVtZW50OiBULCBmcm9tSW5kZXg/OiBudW1iZXIpID0+IGJvb2xlYW47XG5cbmlmIChoYXMoJ2VzNi1hcnJheScpICYmIGhhcygnZXM2LWFycmF5LWZpbGwnKSkge1xuXHRmcm9tID0gZ2xvYmFsLkFycmF5LmZyb207XG5cdG9mID0gZ2xvYmFsLkFycmF5Lm9mO1xuXHRjb3B5V2l0aGluID0gd3JhcE5hdGl2ZShnbG9iYWwuQXJyYXkucHJvdG90eXBlLmNvcHlXaXRoaW4pO1xuXHRmaWxsID0gd3JhcE5hdGl2ZShnbG9iYWwuQXJyYXkucHJvdG90eXBlLmZpbGwpO1xuXHRmaW5kID0gd3JhcE5hdGl2ZShnbG9iYWwuQXJyYXkucHJvdG90eXBlLmZpbmQpO1xuXHRmaW5kSW5kZXggPSB3cmFwTmF0aXZlKGdsb2JhbC5BcnJheS5wcm90b3R5cGUuZmluZEluZGV4KTtcbn0gZWxzZSB7XG5cdC8vIEl0IGlzIG9ubHkgb2xkZXIgdmVyc2lvbnMgb2YgU2FmYXJpL2lPUyB0aGF0IGhhdmUgYSBiYWQgZmlsbCBpbXBsZW1lbnRhdGlvbiBhbmQgc28gYXJlbid0IGluIHRoZSB3aWxkXG5cdC8vIFRvIG1ha2UgdGhpbmdzIGVhc2llciwgaWYgdGhlcmUgaXMgYSBiYWQgZmlsbCBpbXBsZW1lbnRhdGlvbiwgdGhlIHdob2xlIHNldCBvZiBmdW5jdGlvbnMgd2lsbCBiZSBmaWxsZWRcblxuXHQvKipcblx0ICogRW5zdXJlcyBhIG5vbi1uZWdhdGl2ZSwgbm9uLWluZmluaXRlLCBzYWZlIGludGVnZXIuXG5cdCAqXG5cdCAqIEBwYXJhbSBsZW5ndGggVGhlIG51bWJlciB0byB2YWxpZGF0ZVxuXHQgKiBAcmV0dXJuIEEgcHJvcGVyIGxlbmd0aFxuXHQgKi9cblx0Y29uc3QgdG9MZW5ndGggPSBmdW5jdGlvbiB0b0xlbmd0aChsZW5ndGg6IG51bWJlcik6IG51bWJlciB7XG5cdFx0aWYgKGlzTmFOKGxlbmd0aCkpIHtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblxuXHRcdGxlbmd0aCA9IE51bWJlcihsZW5ndGgpO1xuXHRcdGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG5cdFx0XHRsZW5ndGggPSBNYXRoLmZsb29yKGxlbmd0aCk7XG5cdFx0fVxuXHRcdC8vIEVuc3VyZSBhIG5vbi1uZWdhdGl2ZSwgcmVhbCwgc2FmZSBpbnRlZ2VyXG5cdFx0cmV0dXJuIE1hdGgubWluKE1hdGgubWF4KGxlbmd0aCwgMCksIE1BWF9TQUZFX0lOVEVHRVIpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBGcm9tIEVTNiA3LjEuNCBUb0ludGVnZXIoKVxuXHQgKlxuXHQgKiBAcGFyYW0gdmFsdWUgQSB2YWx1ZSB0byBjb252ZXJ0XG5cdCAqIEByZXR1cm4gQW4gaW50ZWdlclxuXHQgKi9cblx0Y29uc3QgdG9JbnRlZ2VyID0gZnVuY3Rpb24gdG9JbnRlZ2VyKHZhbHVlOiBhbnkpOiBudW1iZXIge1xuXHRcdHZhbHVlID0gTnVtYmVyKHZhbHVlKTtcblx0XHRpZiAoaXNOYU4odmFsdWUpKSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cdFx0aWYgKHZhbHVlID09PSAwIHx8ICFpc0Zpbml0ZSh2YWx1ZSkpIHtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gKHZhbHVlID4gMCA/IDEgOiAtMSkgKiBNYXRoLmZsb29yKE1hdGguYWJzKHZhbHVlKSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIE5vcm1hbGl6ZXMgYW4gb2Zmc2V0IGFnYWluc3QgYSBnaXZlbiBsZW5ndGgsIHdyYXBwaW5nIGl0IGlmIG5lZ2F0aXZlLlxuXHQgKlxuXHQgKiBAcGFyYW0gdmFsdWUgVGhlIG9yaWdpbmFsIG9mZnNldFxuXHQgKiBAcGFyYW0gbGVuZ3RoIFRoZSB0b3RhbCBsZW5ndGggdG8gbm9ybWFsaXplIGFnYWluc3Rcblx0ICogQHJldHVybiBJZiBuZWdhdGl2ZSwgcHJvdmlkZSBhIGRpc3RhbmNlIGZyb20gdGhlIGVuZCAobGVuZ3RoKTsgb3RoZXJ3aXNlIHByb3ZpZGUgYSBkaXN0YW5jZSBmcm9tIDBcblx0ICovXG5cdGNvbnN0IG5vcm1hbGl6ZU9mZnNldCA9IGZ1bmN0aW9uIG5vcm1hbGl6ZU9mZnNldCh2YWx1ZTogbnVtYmVyLCBsZW5ndGg6IG51bWJlcik6IG51bWJlciB7XG5cdFx0cmV0dXJuIHZhbHVlIDwgMCA/IE1hdGgubWF4KGxlbmd0aCArIHZhbHVlLCAwKSA6IE1hdGgubWluKHZhbHVlLCBsZW5ndGgpO1xuXHR9O1xuXG5cdGZyb20gPSBmdW5jdGlvbiBmcm9tKFxuXHRcdHRoaXM6IEFycmF5Q29uc3RydWN0b3IsXG5cdFx0YXJyYXlMaWtlOiBJdGVyYWJsZTxhbnk+IHwgQXJyYXlMaWtlPGFueT4sXG5cdFx0bWFwRnVuY3Rpb24/OiBNYXBDYWxsYmFjazxhbnksIGFueT4sXG5cdFx0dGhpc0FyZz86IGFueVxuXHQpOiBBcnJheTxhbnk+IHtcblx0XHRpZiAoYXJyYXlMaWtlID09IG51bGwpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2Zyb206IHJlcXVpcmVzIGFuIGFycmF5LWxpa2Ugb2JqZWN0Jyk7XG5cdFx0fVxuXG5cdFx0aWYgKG1hcEZ1bmN0aW9uICYmIHRoaXNBcmcpIHtcblx0XHRcdG1hcEZ1bmN0aW9uID0gbWFwRnVuY3Rpb24uYmluZCh0aGlzQXJnKTtcblx0XHR9XG5cblx0XHQvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZSAqL1xuXHRcdGNvbnN0IENvbnN0cnVjdG9yID0gdGhpcztcblx0XHRjb25zdCBsZW5ndGg6IG51bWJlciA9IHRvTGVuZ3RoKCg8YW55PmFycmF5TGlrZSkubGVuZ3RoKTtcblxuXHRcdC8vIFN1cHBvcnQgZXh0ZW5zaW9uXG5cdFx0Y29uc3QgYXJyYXk6IGFueVtdID1cblx0XHRcdHR5cGVvZiBDb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJyA/IDxhbnlbXT5PYmplY3QobmV3IENvbnN0cnVjdG9yKGxlbmd0aCkpIDogbmV3IEFycmF5KGxlbmd0aCk7XG5cblx0XHRpZiAoIWlzQXJyYXlMaWtlKGFycmF5TGlrZSkgJiYgIWlzSXRlcmFibGUoYXJyYXlMaWtlKSkge1xuXHRcdFx0cmV0dXJuIGFycmF5O1xuXHRcdH1cblxuXHRcdC8vIGlmIHRoaXMgaXMgYW4gYXJyYXkgYW5kIHRoZSBub3JtYWxpemVkIGxlbmd0aCBpcyAwLCBqdXN0IHJldHVybiBhbiBlbXB0eSBhcnJheS4gdGhpcyBwcmV2ZW50cyBhIHByb2JsZW1cblx0XHQvLyB3aXRoIHRoZSBpdGVyYXRpb24gb24gSUUgd2hlbiB1c2luZyBhIE5hTiBhcnJheSBsZW5ndGguXG5cdFx0aWYgKGlzQXJyYXlMaWtlKGFycmF5TGlrZSkpIHtcblx0XHRcdGlmIChsZW5ndGggPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5TGlrZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRhcnJheVtpXSA9IG1hcEZ1bmN0aW9uID8gbWFwRnVuY3Rpb24oYXJyYXlMaWtlW2ldLCBpKSA6IGFycmF5TGlrZVtpXTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGkgPSAwO1xuXHRcdFx0Zm9yIChjb25zdCB2YWx1ZSBvZiBhcnJheUxpa2UpIHtcblx0XHRcdFx0YXJyYXlbaV0gPSBtYXBGdW5jdGlvbiA/IG1hcEZ1bmN0aW9uKHZhbHVlLCBpKSA6IHZhbHVlO1xuXHRcdFx0XHRpKys7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCg8YW55PmFycmF5TGlrZSkubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGFycmF5Lmxlbmd0aCA9IGxlbmd0aDtcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJyYXk7XG5cdH07XG5cblx0b2YgPSBmdW5jdGlvbiBvZjxUPiguLi5pdGVtczogVFtdKTogQXJyYXk8VD4ge1xuXHRcdHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChpdGVtcyk7XG5cdH07XG5cblx0Y29weVdpdGhpbiA9IGZ1bmN0aW9uIGNvcHlXaXRoaW48VD4oXG5cdFx0dGFyZ2V0OiBBcnJheUxpa2U8VD4sXG5cdFx0b2Zmc2V0OiBudW1iZXIsXG5cdFx0c3RhcnQ6IG51bWJlcixcblx0XHRlbmQ/OiBudW1iZXJcblx0KTogQXJyYXlMaWtlPFQ+IHtcblx0XHRpZiAodGFyZ2V0ID09IG51bGwpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvcHlXaXRoaW46IHRhcmdldCBtdXN0IGJlIGFuIGFycmF5LWxpa2Ugb2JqZWN0Jyk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgbGVuZ3RoID0gdG9MZW5ndGgodGFyZ2V0Lmxlbmd0aCk7XG5cdFx0b2Zmc2V0ID0gbm9ybWFsaXplT2Zmc2V0KHRvSW50ZWdlcihvZmZzZXQpLCBsZW5ndGgpO1xuXHRcdHN0YXJ0ID0gbm9ybWFsaXplT2Zmc2V0KHRvSW50ZWdlcihzdGFydCksIGxlbmd0aCk7XG5cdFx0ZW5kID0gbm9ybWFsaXplT2Zmc2V0KGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuZ3RoIDogdG9JbnRlZ2VyKGVuZCksIGxlbmd0aCk7XG5cdFx0bGV0IGNvdW50ID0gTWF0aC5taW4oZW5kIC0gc3RhcnQsIGxlbmd0aCAtIG9mZnNldCk7XG5cblx0XHRsZXQgZGlyZWN0aW9uID0gMTtcblx0XHRpZiAob2Zmc2V0ID4gc3RhcnQgJiYgb2Zmc2V0IDwgc3RhcnQgKyBjb3VudCkge1xuXHRcdFx0ZGlyZWN0aW9uID0gLTE7XG5cdFx0XHRzdGFydCArPSBjb3VudCAtIDE7XG5cdFx0XHRvZmZzZXQgKz0gY291bnQgLSAxO1xuXHRcdH1cblxuXHRcdHdoaWxlIChjb3VudCA+IDApIHtcblx0XHRcdGlmIChzdGFydCBpbiB0YXJnZXQpIHtcblx0XHRcdFx0KHRhcmdldCBhcyBXcml0YWJsZUFycmF5TGlrZTxUPilbb2Zmc2V0XSA9IHRhcmdldFtzdGFydF07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWxldGUgKHRhcmdldCBhcyBXcml0YWJsZUFycmF5TGlrZTxUPilbb2Zmc2V0XTtcblx0XHRcdH1cblxuXHRcdFx0b2Zmc2V0ICs9IGRpcmVjdGlvbjtcblx0XHRcdHN0YXJ0ICs9IGRpcmVjdGlvbjtcblx0XHRcdGNvdW50LS07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fTtcblxuXHRmaWxsID0gZnVuY3Rpb24gZmlsbDxUPih0YXJnZXQ6IEFycmF5TGlrZTxUPiwgdmFsdWU6IGFueSwgc3RhcnQ/OiBudW1iZXIsIGVuZD86IG51bWJlcik6IEFycmF5TGlrZTxUPiB7XG5cdFx0Y29uc3QgbGVuZ3RoID0gdG9MZW5ndGgodGFyZ2V0Lmxlbmd0aCk7XG5cdFx0bGV0IGkgPSBub3JtYWxpemVPZmZzZXQodG9JbnRlZ2VyKHN0YXJ0KSwgbGVuZ3RoKTtcblx0XHRlbmQgPSBub3JtYWxpemVPZmZzZXQoZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiB0b0ludGVnZXIoZW5kKSwgbGVuZ3RoKTtcblxuXHRcdHdoaWxlIChpIDwgZW5kKSB7XG5cdFx0XHQodGFyZ2V0IGFzIFdyaXRhYmxlQXJyYXlMaWtlPFQ+KVtpKytdID0gdmFsdWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fTtcblxuXHRmaW5kID0gZnVuY3Rpb24gZmluZDxUPih0YXJnZXQ6IEFycmF5TGlrZTxUPiwgY2FsbGJhY2s6IEZpbmRDYWxsYmFjazxUPiwgdGhpc0FyZz86IHt9KTogVCB8IHVuZGVmaW5lZCB7XG5cdFx0Y29uc3QgaW5kZXggPSBmaW5kSW5kZXg8VD4odGFyZ2V0LCBjYWxsYmFjaywgdGhpc0FyZyk7XG5cdFx0cmV0dXJuIGluZGV4ICE9PSAtMSA/IHRhcmdldFtpbmRleF0gOiB1bmRlZmluZWQ7XG5cdH07XG5cblx0ZmluZEluZGV4ID0gZnVuY3Rpb24gZmluZEluZGV4PFQ+KHRhcmdldDogQXJyYXlMaWtlPFQ+LCBjYWxsYmFjazogRmluZENhbGxiYWNrPFQ+LCB0aGlzQXJnPzoge30pOiBudW1iZXIge1xuXHRcdGNvbnN0IGxlbmd0aCA9IHRvTGVuZ3RoKHRhcmdldC5sZW5ndGgpO1xuXG5cdFx0aWYgKCFjYWxsYmFjaykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignZmluZDogc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzQXJnKSB7XG5cdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrLmJpbmQodGhpc0FyZyk7XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKGNhbGxiYWNrKHRhcmdldFtpXSwgaSwgdGFyZ2V0KSkge1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gLTE7XG5cdH07XG59XG5cbmlmIChoYXMoJ2VzNy1hcnJheScpKSB7XG5cdGluY2x1ZGVzID0gd3JhcE5hdGl2ZShnbG9iYWwuQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzKTtcbn0gZWxzZSB7XG5cdC8qKlxuXHQgKiBFbnN1cmVzIGEgbm9uLW5lZ2F0aXZlLCBub24taW5maW5pdGUsIHNhZmUgaW50ZWdlci5cblx0ICpcblx0ICogQHBhcmFtIGxlbmd0aCBUaGUgbnVtYmVyIHRvIHZhbGlkYXRlXG5cdCAqIEByZXR1cm4gQSBwcm9wZXIgbGVuZ3RoXG5cdCAqL1xuXHRjb25zdCB0b0xlbmd0aCA9IGZ1bmN0aW9uIHRvTGVuZ3RoKGxlbmd0aDogbnVtYmVyKTogbnVtYmVyIHtcblx0XHRsZW5ndGggPSBOdW1iZXIobGVuZ3RoKTtcblx0XHRpZiAoaXNOYU4obGVuZ3RoKSkge1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXHRcdGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG5cdFx0XHRsZW5ndGggPSBNYXRoLmZsb29yKGxlbmd0aCk7XG5cdFx0fVxuXHRcdC8vIEVuc3VyZSBhIG5vbi1uZWdhdGl2ZSwgcmVhbCwgc2FmZSBpbnRlZ2VyXG5cdFx0cmV0dXJuIE1hdGgubWluKE1hdGgubWF4KGxlbmd0aCwgMCksIE1BWF9TQUZFX0lOVEVHRVIpO1xuXHR9O1xuXG5cdGluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXM8VD4odGFyZ2V0OiBBcnJheUxpa2U8VD4sIHNlYXJjaEVsZW1lbnQ6IFQsIGZyb21JbmRleDogbnVtYmVyID0gMCk6IGJvb2xlYW4ge1xuXHRcdGxldCBsZW4gPSB0b0xlbmd0aCh0YXJnZXQubGVuZ3RoKTtcblxuXHRcdGZvciAobGV0IGkgPSBmcm9tSW5kZXg7IGkgPCBsZW47ICsraSkge1xuXHRcdFx0Y29uc3QgY3VycmVudEVsZW1lbnQgPSB0YXJnZXRbaV07XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHNlYXJjaEVsZW1lbnQgPT09IGN1cnJlbnRFbGVtZW50IHx8XG5cdFx0XHRcdChzZWFyY2hFbGVtZW50ICE9PSBzZWFyY2hFbGVtZW50ICYmIGN1cnJlbnRFbGVtZW50ICE9PSBjdXJyZW50RWxlbWVudClcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gYXJyYXkudHMiLCJjb25zdCBnbG9iYWxPYmplY3Q6IGFueSA9IChmdW5jdGlvbigpOiBhbnkge1xuXHQvLyB0aGUgb25seSByZWxpYWJsZSBtZWFucyB0byBnZXQgdGhlIGdsb2JhbCBvYmplY3QgaXNcblx0Ly8gYEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKClgXG5cdC8vIEhvd2V2ZXIsIHRoaXMgY2F1c2VzIENTUCB2aW9sYXRpb25zIGluIENocm9tZSBhcHBzLlxuXHRpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuIHNlbGY7XG5cdH1cblx0aWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuIHdpbmRvdztcblx0fVxuXHRpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyZXR1cm4gZ2xvYmFsO1xuXHR9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBnbG9iYWxPYmplY3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZ2xvYmFsLnRzIiwiaW1wb3J0ICcuL1N5bWJvbCc7XG5pbXBvcnQgeyBISUdIX1NVUlJPR0FURV9NQVgsIEhJR0hfU1VSUk9HQVRFX01JTiB9IGZyb20gJy4vc3RyaW5nJztcblxuZXhwb3J0IGludGVyZmFjZSBJdGVyYXRvclJlc3VsdDxUPiB7XG5cdHJlYWRvbmx5IGRvbmU6IGJvb2xlYW47XG5cdHJlYWRvbmx5IHZhbHVlOiBUO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEl0ZXJhdG9yPFQ+IHtcblx0bmV4dCh2YWx1ZT86IGFueSk6IEl0ZXJhdG9yUmVzdWx0PFQ+O1xuXG5cdHJldHVybj8odmFsdWU/OiBhbnkpOiBJdGVyYXRvclJlc3VsdDxUPjtcblxuXHR0aHJvdz8oZT86IGFueSk6IEl0ZXJhdG9yUmVzdWx0PFQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEl0ZXJhYmxlPFQ+IHtcblx0W1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmF0b3I8VD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSXRlcmFibGVJdGVyYXRvcjxUPiBleHRlbmRzIEl0ZXJhdG9yPFQ+IHtcblx0W1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmFibGVJdGVyYXRvcjxUPjtcbn1cblxuY29uc3Qgc3RhdGljRG9uZTogSXRlcmF0b3JSZXN1bHQ8YW55PiA9IHsgZG9uZTogdHJ1ZSwgdmFsdWU6IHVuZGVmaW5lZCB9O1xuXG4vKipcbiAqIEEgY2xhc3MgdGhhdCBfc2hpbXNfIGFuIGl0ZXJhdG9yIGludGVyZmFjZSBvbiBhcnJheSBsaWtlIG9iamVjdHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBTaGltSXRlcmF0b3I8VD4ge1xuXHRwcml2YXRlIF9saXN0OiBBcnJheUxpa2U8VD4gfCB1bmRlZmluZWQ7XG5cdHByaXZhdGUgX25leHRJbmRleCA9IC0xO1xuXHRwcml2YXRlIF9uYXRpdmVJdGVyYXRvcjogSXRlcmF0b3I8VD4gfCB1bmRlZmluZWQ7XG5cblx0Y29uc3RydWN0b3IobGlzdDogQXJyYXlMaWtlPFQ+IHwgSXRlcmFibGU8VD4pIHtcblx0XHRpZiAoaXNJdGVyYWJsZShsaXN0KSkge1xuXHRcdFx0dGhpcy5fbmF0aXZlSXRlcmF0b3IgPSBsaXN0W1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fbGlzdCA9IGxpc3Q7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiB0aGUgbmV4dCBpdGVyYXRpb24gcmVzdWx0IGZvciB0aGUgSXRlcmF0b3Jcblx0ICovXG5cdG5leHQoKTogSXRlcmF0b3JSZXN1bHQ8VD4ge1xuXHRcdGlmICh0aGlzLl9uYXRpdmVJdGVyYXRvcikge1xuXHRcdFx0cmV0dXJuIHRoaXMuX25hdGl2ZUl0ZXJhdG9yLm5leHQoKTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLl9saXN0KSB7XG5cdFx0XHRyZXR1cm4gc3RhdGljRG9uZTtcblx0XHR9XG5cdFx0aWYgKCsrdGhpcy5fbmV4dEluZGV4IDwgdGhpcy5fbGlzdC5sZW5ndGgpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGRvbmU6IGZhbHNlLFxuXHRcdFx0XHR2YWx1ZTogdGhpcy5fbGlzdFt0aGlzLl9uZXh0SW5kZXhdXG5cdFx0XHR9O1xuXHRcdH1cblx0XHRyZXR1cm4gc3RhdGljRG9uZTtcblx0fVxuXG5cdFtTeW1ib2wuaXRlcmF0b3JdKCk6IEl0ZXJhYmxlSXRlcmF0b3I8VD4ge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5cbi8qKlxuICogQSB0eXBlIGd1YXJkIGZvciBjaGVja2luZyBpZiBzb21ldGhpbmcgaGFzIGFuIEl0ZXJhYmxlIGludGVyZmFjZVxuICpcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdHlwZSBndWFyZCBhZ2FpbnN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0l0ZXJhYmxlKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBJdGVyYWJsZTxhbnk+IHtcblx0cmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZVtTeW1ib2wuaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nO1xufVxuXG4vKipcbiAqIEEgdHlwZSBndWFyZCBmb3IgY2hlY2tpbmcgaWYgc29tZXRoaW5nIGlzIEFycmF5TGlrZVxuICpcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdHlwZSBndWFyZCBhZ2FpbnN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZTogYW55KTogdmFsdWUgaXMgQXJyYXlMaWtlPGFueT4ge1xuXHRyZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlLmxlbmd0aCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgaXRlcmF0b3IgZm9yIGFuIG9iamVjdFxuICpcbiAqIEBwYXJhbSBpdGVyYWJsZSBUaGUgaXRlcmFibGUgb2JqZWN0IHRvIHJldHVybiB0aGUgaXRlcmF0b3IgZm9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXQ8VD4oaXRlcmFibGU6IEl0ZXJhYmxlPFQ+IHwgQXJyYXlMaWtlPFQ+KTogSXRlcmF0b3I8VD4gfCB1bmRlZmluZWQge1xuXHRpZiAoaXNJdGVyYWJsZShpdGVyYWJsZSkpIHtcblx0XHRyZXR1cm4gaXRlcmFibGVbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHR9IGVsc2UgaWYgKGlzQXJyYXlMaWtlKGl0ZXJhYmxlKSkge1xuXHRcdHJldHVybiBuZXcgU2hpbUl0ZXJhdG9yKGl0ZXJhYmxlKTtcblx0fVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvck9mQ2FsbGJhY2s8VD4ge1xuXHQvKipcblx0ICogQSBjYWxsYmFjayBmdW5jdGlvbiBmb3IgYSBmb3JPZigpIGl0ZXJhdGlvblxuXHQgKlxuXHQgKiBAcGFyYW0gdmFsdWUgVGhlIGN1cnJlbnQgdmFsdWVcblx0ICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0IGJlaW5nIGl0ZXJhdGVkIG92ZXJcblx0ICogQHBhcmFtIGRvQnJlYWsgQSBmdW5jdGlvbiwgaWYgY2FsbGVkLCB3aWxsIHN0b3AgdGhlIGl0ZXJhdGlvblxuXHQgKi9cblx0KHZhbHVlOiBULCBvYmplY3Q6IEl0ZXJhYmxlPFQ+IHwgQXJyYXlMaWtlPFQ+IHwgc3RyaW5nLCBkb0JyZWFrOiAoKSA9PiB2b2lkKTogdm9pZDtcbn1cblxuLyoqXG4gKiBTaGltcyB0aGUgZnVuY3Rpb25hbGl0eSBvZiBgZm9yIC4uLiBvZmAgYmxvY2tzXG4gKlxuICogQHBhcmFtIGl0ZXJhYmxlIFRoZSBvYmplY3QgdGhlIHByb3ZpZGVzIGFuIGludGVyYXRvciBpbnRlcmZhY2VcbiAqIEBwYXJhbSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgd2hpY2ggd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2ggaXRlbSBvZiB0aGUgaXRlcmFibGVcbiAqIEBwYXJhbSB0aGlzQXJnIE9wdGlvbmFsIHNjb3BlIHRvIHBhc3MgdGhlIGNhbGxiYWNrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JPZjxUPihcblx0aXRlcmFibGU6IEl0ZXJhYmxlPFQ+IHwgQXJyYXlMaWtlPFQ+IHwgc3RyaW5nLFxuXHRjYWxsYmFjazogRm9yT2ZDYWxsYmFjazxUPixcblx0dGhpc0FyZz86IGFueVxuKTogdm9pZCB7XG5cdGxldCBicm9rZW4gPSBmYWxzZTtcblxuXHRmdW5jdGlvbiBkb0JyZWFrKCkge1xuXHRcdGJyb2tlbiA9IHRydWU7XG5cdH1cblxuXHQvKiBXZSBuZWVkIHRvIGhhbmRsZSBpdGVyYXRpb24gb2YgZG91YmxlIGJ5dGUgc3RyaW5ncyBwcm9wZXJseSAqL1xuXHRpZiAoaXNBcnJheUxpa2UoaXRlcmFibGUpICYmIHR5cGVvZiBpdGVyYWJsZSA9PT0gJ3N0cmluZycpIHtcblx0XHRjb25zdCBsID0gaXRlcmFibGUubGVuZ3RoO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbDsgKytpKSB7XG5cdFx0XHRsZXQgY2hhciA9IGl0ZXJhYmxlW2ldO1xuXHRcdFx0aWYgKGkgKyAxIDwgbCkge1xuXHRcdFx0XHRjb25zdCBjb2RlID0gY2hhci5jaGFyQ29kZUF0KDApO1xuXHRcdFx0XHRpZiAoY29kZSA+PSBISUdIX1NVUlJPR0FURV9NSU4gJiYgY29kZSA8PSBISUdIX1NVUlJPR0FURV9NQVgpIHtcblx0XHRcdFx0XHRjaGFyICs9IGl0ZXJhYmxlWysraV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNhbGxiYWNrLmNhbGwodGhpc0FyZywgY2hhciwgaXRlcmFibGUsIGRvQnJlYWspO1xuXHRcdFx0aWYgKGJyb2tlbikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IGl0ZXJhdG9yID0gZ2V0KGl0ZXJhYmxlKTtcblx0XHRpZiAoaXRlcmF0b3IpIHtcblx0XHRcdGxldCByZXN1bHQgPSBpdGVyYXRvci5uZXh0KCk7XG5cblx0XHRcdHdoaWxlICghcmVzdWx0LmRvbmUpIHtcblx0XHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzQXJnLCByZXN1bHQudmFsdWUsIGl0ZXJhYmxlLCBkb0JyZWFrKTtcblx0XHRcdFx0aWYgKGJyb2tlbikge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXN1bHQgPSBpdGVyYXRvci5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gaXRlcmF0b3IudHMiLCJpbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsJztcblxuLyoqXG4gKiBUaGUgc21hbGxlc3QgaW50ZXJ2YWwgYmV0d2VlbiB0d28gcmVwcmVzZW50YWJsZSBudW1iZXJzLlxuICovXG5leHBvcnQgY29uc3QgRVBTSUxPTiA9IDE7XG5cbi8qKlxuICogVGhlIG1heGltdW0gc2FmZSBpbnRlZ2VyIGluIEphdmFTY3JpcHRcbiAqL1xuZXhwb3J0IGNvbnN0IE1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG4vKipcbiAqIFRoZSBtaW5pbXVtIHNhZmUgaW50ZWdlciBpbiBKYXZhU2NyaXB0XG4gKi9cbmV4cG9ydCBjb25zdCBNSU5fU0FGRV9JTlRFR0VSID0gLU1BWF9TQUZFX0lOVEVHRVI7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXNzZWQgdmFsdWUgaXMgTmFOIHdpdGhvdXQgY29lcnNpb24uXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGlzIE5hTiwgZmFsc2UgaWYgaXQgaXMgbm90XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc05hTih2YWx1ZTogYW55KTogYm9vbGVhbiB7XG5cdHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIGdsb2JhbC5pc05hTih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXNzZWQgdmFsdWUgaXMgYSBmaW5pdGUgbnVtYmVyIHdpdGhvdXQgY29lcnNpb24uXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGlzIGZpbml0ZSwgZmFsc2UgaWYgaXQgaXMgbm90XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Zpbml0ZSh2YWx1ZTogYW55KTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgZ2xvYmFsLmlzRmluaXRlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLCBmYWxzZSBpZiBpdCBpcyBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogYW55KTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzRmluaXRlKHZhbHVlKSAmJiBNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWU7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXNzZWQgdmFsdWUgaXMgYW4gaW50ZWdlciB0aGF0IGlzICdzYWZlLCcgbWVhbmluZzpcbiAqICAgMS4gaXQgY2FuIGJlIGV4cHJlc3NlZCBhcyBhbiBJRUVFLTc1NCBkb3VibGUgcHJlY2lzaW9uIG51bWJlclxuICogICAyLiBpdCBoYXMgYSBvbmUtdG8tb25lIG1hcHBpbmcgdG8gYSBtYXRoZW1hdGljYWwgaW50ZWdlciwgbWVhbmluZyBpdHNcbiAqICAgICAgSUVFRS03NTQgcmVwcmVzZW50YXRpb24gY2Fubm90IGJlIHRoZSByZXN1bHQgb2Ygcm91bmRpbmcgYW55IG90aGVyXG4gKiAgICAgIGludGVnZXIgdG8gZml0IHRoZSBJRUVFLTc1NCByZXByZXNlbnRhdGlvblxuICpcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLCBmYWxzZSBpZiBpdCBpcyBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU2FmZUludGVnZXIodmFsdWU6IGFueSk6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc0ludGVnZXIodmFsdWUpICYmIE1hdGguYWJzKHZhbHVlKSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIG51bWJlci50cyIsImltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuaW1wb3J0IGhhcyBmcm9tICcuL3N1cHBvcnQvaGFzJztcbmltcG9ydCB7IGlzU3ltYm9sIH0gZnJvbSAnLi9TeW1ib2wnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE9iamVjdEFzc2lnbiB7XG5cdC8qKlxuXHQgKiBDb3B5IHRoZSB2YWx1ZXMgb2YgYWxsIG9mIHRoZSBlbnVtZXJhYmxlIG93biBwcm9wZXJ0aWVzIGZyb20gb25lIG9yIG1vcmUgc291cmNlIG9iamVjdHMgdG8gYVxuXHQgKiB0YXJnZXQgb2JqZWN0LiBSZXR1cm5zIHRoZSB0YXJnZXQgb2JqZWN0LlxuXHQgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IHRvIGNvcHkgdG8uXG5cdCAqIEBwYXJhbSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QgZnJvbSB3aGljaCB0byBjb3B5IHByb3BlcnRpZXMuXG5cdCAqL1xuXHQ8VCwgVT4odGFyZ2V0OiBULCBzb3VyY2U6IFUpOiBUICYgVTtcblxuXHQvKipcblx0ICogQ29weSB0aGUgdmFsdWVzIG9mIGFsbCBvZiB0aGUgZW51bWVyYWJsZSBvd24gcHJvcGVydGllcyBmcm9tIG9uZSBvciBtb3JlIHNvdXJjZSBvYmplY3RzIHRvIGFcblx0ICogdGFyZ2V0IG9iamVjdC4gUmV0dXJucyB0aGUgdGFyZ2V0IG9iamVjdC5cblx0ICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCB0byBjb3B5IHRvLlxuXHQgKiBAcGFyYW0gc291cmNlMSBUaGUgZmlyc3Qgc291cmNlIG9iamVjdCBmcm9tIHdoaWNoIHRvIGNvcHkgcHJvcGVydGllcy5cblx0ICogQHBhcmFtIHNvdXJjZTIgVGhlIHNlY29uZCBzb3VyY2Ugb2JqZWN0IGZyb20gd2hpY2ggdG8gY29weSBwcm9wZXJ0aWVzLlxuXHQgKi9cblx0PFQsIFUsIFY+KHRhcmdldDogVCwgc291cmNlMTogVSwgc291cmNlMjogVik6IFQgJiBVICYgVjtcblxuXHQvKipcblx0ICogQ29weSB0aGUgdmFsdWVzIG9mIGFsbCBvZiB0aGUgZW51bWVyYWJsZSBvd24gcHJvcGVydGllcyBmcm9tIG9uZSBvciBtb3JlIHNvdXJjZSBvYmplY3RzIHRvIGFcblx0ICogdGFyZ2V0IG9iamVjdC4gUmV0dXJucyB0aGUgdGFyZ2V0IG9iamVjdC5cblx0ICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCB0byBjb3B5IHRvLlxuXHQgKiBAcGFyYW0gc291cmNlMSBUaGUgZmlyc3Qgc291cmNlIG9iamVjdCBmcm9tIHdoaWNoIHRvIGNvcHkgcHJvcGVydGllcy5cblx0ICogQHBhcmFtIHNvdXJjZTIgVGhlIHNlY29uZCBzb3VyY2Ugb2JqZWN0IGZyb20gd2hpY2ggdG8gY29weSBwcm9wZXJ0aWVzLlxuXHQgKiBAcGFyYW0gc291cmNlMyBUaGUgdGhpcmQgc291cmNlIG9iamVjdCBmcm9tIHdoaWNoIHRvIGNvcHkgcHJvcGVydGllcy5cblx0ICovXG5cdDxULCBVLCBWLCBXPih0YXJnZXQ6IFQsIHNvdXJjZTE6IFUsIHNvdXJjZTI6IFYsIHNvdXJjZTM6IFcpOiBUICYgVSAmIFYgJiBXO1xuXG5cdC8qKlxuXHQgKiBDb3B5IHRoZSB2YWx1ZXMgb2YgYWxsIG9mIHRoZSBlbnVtZXJhYmxlIG93biBwcm9wZXJ0aWVzIGZyb20gb25lIG9yIG1vcmUgc291cmNlIG9iamVjdHMgdG8gYVxuXHQgKiB0YXJnZXQgb2JqZWN0LiBSZXR1cm5zIHRoZSB0YXJnZXQgb2JqZWN0LlxuXHQgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IHRvIGNvcHkgdG8uXG5cdCAqIEBwYXJhbSBzb3VyY2VzIE9uZSBvciBtb3JlIHNvdXJjZSBvYmplY3RzIGZyb20gd2hpY2ggdG8gY29weSBwcm9wZXJ0aWVzXG5cdCAqL1xuXHQodGFyZ2V0OiBvYmplY3QsIC4uLnNvdXJjZXM6IGFueVtdKTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9iamVjdEVudGVyaWVzIHtcblx0LyoqXG5cdCAqIFJldHVybnMgYW4gYXJyYXkgb2Yga2V5L3ZhbHVlcyBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdFxuXHQgKiBAcGFyYW0gbyBPYmplY3QgdGhhdCBjb250YWlucyB0aGUgcHJvcGVydGllcyBhbmQgbWV0aG9kcy4gVGhpcyBjYW4gYmUgYW4gb2JqZWN0IHRoYXQgeW91IGNyZWF0ZWQgb3IgYW4gZXhpc3RpbmcgRG9jdW1lbnQgT2JqZWN0IE1vZGVsIChET00pIG9iamVjdC5cblx0ICovXG5cdDxUIGV4dGVuZHMgeyBba2V5OiBzdHJpbmddOiBhbnkgfSwgSyBleHRlbmRzIGtleW9mIFQ+KG86IFQpOiBba2V5b2YgVCwgVFtLXV1bXTtcblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBhcnJheSBvZiBrZXkvdmFsdWVzIG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0XG5cdCAqIEBwYXJhbSBvIE9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZSBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzLiBUaGlzIGNhbiBiZSBhbiBvYmplY3QgdGhhdCB5b3UgY3JlYXRlZCBvciBhbiBleGlzdGluZyBEb2N1bWVudCBPYmplY3QgTW9kZWwgKERPTSkgb2JqZWN0LlxuXHQgKi9cblx0KG86IG9iamVjdCk6IFtzdHJpbmcsIGFueV1bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPYmplY3RHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIHtcblx0PFQ+KG86IFQpOiB7IFtLIGluIGtleW9mIFRdOiBQcm9wZXJ0eURlc2NyaXB0b3IgfTtcblx0KG86IGFueSk6IHsgW2tleTogc3RyaW5nXTogUHJvcGVydHlEZXNjcmlwdG9yIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT2JqZWN0VmFsdWVzIHtcblx0LyoqXG5cdCAqIFJldHVybnMgYW4gYXJyYXkgb2YgdmFsdWVzIG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0XG5cdCAqIEBwYXJhbSBvIE9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZSBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzLiBUaGlzIGNhbiBiZSBhbiBvYmplY3QgdGhhdCB5b3UgY3JlYXRlZCBvciBhbiBleGlzdGluZyBEb2N1bWVudCBPYmplY3QgTW9kZWwgKERPTSkgb2JqZWN0LlxuXHQgKi9cblx0PFQ+KG86IHsgW3M6IHN0cmluZ106IFQgfSk6IFRbXTtcblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBhcnJheSBvZiB2YWx1ZXMgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBhbiBvYmplY3Rcblx0ICogQHBhcmFtIG8gT2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMuIFRoaXMgY2FuIGJlIGFuIG9iamVjdCB0aGF0IHlvdSBjcmVhdGVkIG9yIGFuIGV4aXN0aW5nIERvY3VtZW50IE9iamVjdCBNb2RlbCAoRE9NKSBvYmplY3QuXG5cdCAqL1xuXHQobzogb2JqZWN0KTogYW55W107XG59XG5cbmV4cG9ydCBsZXQgYXNzaWduOiBPYmplY3RBc3NpZ247XG5cbi8qKlxuICogR2V0cyB0aGUgb3duIHByb3BlcnR5IGRlc2NyaXB0b3Igb2YgdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gKiBBbiBvd24gcHJvcGVydHkgZGVzY3JpcHRvciBpcyBvbmUgdGhhdCBpcyBkZWZpbmVkIGRpcmVjdGx5IG9uIHRoZSBvYmplY3QgYW5kIGlzIG5vdFxuICogaW5oZXJpdGVkIGZyb20gdGhlIG9iamVjdCdzIHByb3RvdHlwZS5cbiAqIEBwYXJhbSBvIE9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZSBwcm9wZXJ0eS5cbiAqIEBwYXJhbSBwIE5hbWUgb2YgdGhlIHByb3BlcnR5LlxuICovXG5leHBvcnQgbGV0IGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogPFQsIEsgZXh0ZW5kcyBrZXlvZiBUPihvOiBULCBwcm9wZXJ0eUtleTogSykgPT4gUHJvcGVydHlEZXNjcmlwdG9yIHwgdW5kZWZpbmVkO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG5hbWVzIG9mIHRoZSBvd24gcHJvcGVydGllcyBvZiBhbiBvYmplY3QuIFRoZSBvd24gcHJvcGVydGllcyBvZiBhbiBvYmplY3QgYXJlIHRob3NlIHRoYXQgYXJlIGRlZmluZWQgZGlyZWN0bHlcbiAqIG9uIHRoYXQgb2JqZWN0LCBhbmQgYXJlIG5vdCBpbmhlcml0ZWQgZnJvbSB0aGUgb2JqZWN0J3MgcHJvdG90eXBlLiBUaGUgcHJvcGVydGllcyBvZiBhbiBvYmplY3QgaW5jbHVkZSBib3RoIGZpZWxkcyAob2JqZWN0cykgYW5kIGZ1bmN0aW9ucy5cbiAqIEBwYXJhbSBvIE9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZSBvd24gcHJvcGVydGllcy5cbiAqL1xuZXhwb3J0IGxldCBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAobzogYW55KSA9PiBzdHJpbmdbXTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIGFsbCBzeW1ib2wgcHJvcGVydGllcyBmb3VuZCBkaXJlY3RseSBvbiBvYmplY3Qgby5cbiAqIEBwYXJhbSBvIE9iamVjdCB0byByZXRyaWV2ZSB0aGUgc3ltYm9scyBmcm9tLlxuICovXG5leHBvcnQgbGV0IGdldE93blByb3BlcnR5U3ltYm9sczogKG86IGFueSkgPT4gc3ltYm9sW107XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZXMgYXJlIHRoZSBzYW1lIHZhbHVlLCBmYWxzZSBvdGhlcndpc2UuXG4gKiBAcGFyYW0gdmFsdWUxIFRoZSBmaXJzdCB2YWx1ZS5cbiAqIEBwYXJhbSB2YWx1ZTIgVGhlIHNlY29uZCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGxldCBpczogKHZhbHVlMTogYW55LCB2YWx1ZTI6IGFueSkgPT4gYm9vbGVhbjtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBuYW1lcyBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIG9mIGFuIG9iamVjdC5cbiAqIEBwYXJhbSBvIE9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZSBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzLiBUaGlzIGNhbiBiZSBhbiBvYmplY3QgdGhhdCB5b3UgY3JlYXRlZCBvciBhbiBleGlzdGluZyBEb2N1bWVudCBPYmplY3QgTW9kZWwgKERPTSkgb2JqZWN0LlxuICovXG5leHBvcnQgbGV0IGtleXM6IChvOiBvYmplY3QpID0+IHN0cmluZ1tdO1xuXG4vKiBFUzcgT2JqZWN0IHN0YXRpYyBtZXRob2RzICovXG5cbmV4cG9ydCBsZXQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yczogT2JqZWN0R2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycztcblxuZXhwb3J0IGxldCBlbnRyaWVzOiBPYmplY3RFbnRlcmllcztcblxuZXhwb3J0IGxldCB2YWx1ZXM6IE9iamVjdFZhbHVlcztcblxuaWYgKGhhcygnZXM2LW9iamVjdCcpKSB7XG5cdGNvbnN0IGdsb2JhbE9iamVjdCA9IGdsb2JhbC5PYmplY3Q7XG5cdGFzc2lnbiA9IGdsb2JhbE9iamVjdC5hc3NpZ247XG5cdGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGdsb2JhbE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cdGdldE93blByb3BlcnR5TmFtZXMgPSBnbG9iYWxPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcblx0Z2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2xvYmFsT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblx0aXMgPSBnbG9iYWxPYmplY3QuaXM7XG5cdGtleXMgPSBnbG9iYWxPYmplY3Qua2V5cztcbn0gZWxzZSB7XG5cdGtleXMgPSBmdW5jdGlvbiBzeW1ib2xBd2FyZUtleXMobzogb2JqZWN0KTogc3RyaW5nW10ge1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyhvKS5maWx0ZXIoKGtleSkgPT4gIUJvb2xlYW4oa2V5Lm1hdGNoKC9eQEAuKy8pKSk7XG5cdH07XG5cblx0YXNzaWduID0gZnVuY3Rpb24gYXNzaWduKHRhcmdldDogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSkge1xuXHRcdGlmICh0YXJnZXQgPT0gbnVsbCkge1xuXHRcdFx0Ly8gVHlwZUVycm9yIGlmIHVuZGVmaW5lZCBvciBudWxsXG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcblx0XHR9XG5cblx0XHRjb25zdCB0byA9IE9iamVjdCh0YXJnZXQpO1xuXHRcdHNvdXJjZXMuZm9yRWFjaCgobmV4dFNvdXJjZSkgPT4ge1xuXHRcdFx0aWYgKG5leHRTb3VyY2UpIHtcblx0XHRcdFx0Ly8gU2tpcCBvdmVyIGlmIHVuZGVmaW5lZCBvciBudWxsXG5cdFx0XHRcdGtleXMobmV4dFNvdXJjZSkuZm9yRWFjaCgobmV4dEtleSkgPT4ge1xuXHRcdFx0XHRcdHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdG87XG5cdH07XG5cblx0Z2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFxuXHRcdG86IGFueSxcblx0XHRwcm9wOiBzdHJpbmcgfCBzeW1ib2xcblx0KTogUHJvcGVydHlEZXNjcmlwdG9yIHwgdW5kZWZpbmVkIHtcblx0XHRpZiAoaXNTeW1ib2wocHJvcCkpIHtcblx0XHRcdHJldHVybiAoPGFueT5PYmplY3QpLmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvLCBwcm9wKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobywgcHJvcCk7XG5cdFx0fVxuXHR9O1xuXG5cdGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKG86IGFueSk6IHN0cmluZ1tdIHtcblx0XHRyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobykuZmlsdGVyKChrZXkpID0+ICFCb29sZWFuKGtleS5tYXRjaCgvXkBALisvKSkpO1xuXHR9O1xuXG5cdGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhvOiBhbnkpOiBzeW1ib2xbXSB7XG5cdFx0cmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG8pXG5cdFx0XHQuZmlsdGVyKChrZXkpID0+IEJvb2xlYW4oa2V5Lm1hdGNoKC9eQEAuKy8pKSlcblx0XHRcdC5tYXAoKGtleSkgPT4gU3ltYm9sLmZvcihrZXkuc3Vic3RyaW5nKDIpKSk7XG5cdH07XG5cblx0aXMgPSBmdW5jdGlvbiBpcyh2YWx1ZTE6IGFueSwgdmFsdWUyOiBhbnkpOiBib29sZWFuIHtcblx0XHRpZiAodmFsdWUxID09PSB2YWx1ZTIpIHtcblx0XHRcdHJldHVybiB2YWx1ZTEgIT09IDAgfHwgMSAvIHZhbHVlMSA9PT0gMSAvIHZhbHVlMjsgLy8gLTBcblx0XHR9XG5cdFx0cmV0dXJuIHZhbHVlMSAhPT0gdmFsdWUxICYmIHZhbHVlMiAhPT0gdmFsdWUyOyAvLyBOYU5cblx0fTtcbn1cblxuaWYgKGhhcygnZXMyMDE3LW9iamVjdCcpKSB7XG5cdGNvbnN0IGdsb2JhbE9iamVjdCA9IGdsb2JhbC5PYmplY3Q7XG5cdGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPSBnbG9iYWxPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycztcblx0ZW50cmllcyA9IGdsb2JhbE9iamVjdC5lbnRyaWVzO1xuXHR2YWx1ZXMgPSBnbG9iYWxPYmplY3QudmFsdWVzO1xufSBlbHNlIHtcblx0Z2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMobzogYW55KSB7XG5cdFx0cmV0dXJuIGdldE93blByb3BlcnR5TmFtZXMobykucmVkdWNlKFxuXHRcdFx0KHByZXZpb3VzLCBrZXkpID0+IHtcblx0XHRcdFx0cHJldmlvdXNba2V5XSA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvLCBrZXkpITtcblx0XHRcdFx0cmV0dXJuIHByZXZpb3VzO1xuXHRcdFx0fSxcblx0XHRcdHt9IGFzIHsgW2tleTogc3RyaW5nXTogUHJvcGVydHlEZXNjcmlwdG9yIH1cblx0XHQpO1xuXHR9O1xuXG5cdGVudHJpZXMgPSBmdW5jdGlvbiBlbnRyaWVzKG86IGFueSk6IFtzdHJpbmcsIGFueV1bXSB7XG5cdFx0cmV0dXJuIGtleXMobykubWFwKChrZXkpID0+IFtrZXksIG9ba2V5XV0gYXMgW3N0cmluZywgYW55XSk7XG5cdH07XG5cblx0dmFsdWVzID0gZnVuY3Rpb24gdmFsdWVzKG86IGFueSk6IGFueVtdIHtcblx0XHRyZXR1cm4ga2V5cyhvKS5tYXAoKGtleSkgPT4gb1trZXldKTtcblx0fTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBvYmplY3QudHMiLCJpbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsJztcbmltcG9ydCBoYXMgZnJvbSAnLi9zdXBwb3J0L2hhcyc7XG5pbXBvcnQgeyB3cmFwTmF0aXZlIH0gZnJvbSAnLi9zdXBwb3J0L3V0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0cmluZ05vcm1hbGl6ZSB7XG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBTdHJpbmcgdmFsdWUgcmVzdWx0IG9mIG5vcm1hbGl6aW5nIHRoZSBzdHJpbmcgaW50byB0aGUgbm9ybWFsaXphdGlvbiBmb3JtXG5cdCAqIG5hbWVkIGJ5IGZvcm0gYXMgc3BlY2lmaWVkIGluIFVuaWNvZGUgU3RhbmRhcmQgQW5uZXggIzE1LCBVbmljb2RlIE5vcm1hbGl6YXRpb24gRm9ybXMuXG5cdCAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBzdHJpbmdcblx0ICogQHBhcmFtIGZvcm0gQXBwbGljYWJsZSB2YWx1ZXM6IFwiTkZDXCIsIFwiTkZEXCIsIFwiTkZLQ1wiLCBvciBcIk5GS0RcIiwgSWYgbm90IHNwZWNpZmllZCBkZWZhdWx0XG5cdCAqIGlzIFwiTkZDXCJcblx0ICovXG5cdCh0YXJnZXQ6IHN0cmluZywgZm9ybTogJ05GQycgfCAnTkZEJyB8ICdORktDJyB8ICdORktEJyk6IHN0cmluZztcblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgU3RyaW5nIHZhbHVlIHJlc3VsdCBvZiBub3JtYWxpemluZyB0aGUgc3RyaW5nIGludG8gdGhlIG5vcm1hbGl6YXRpb24gZm9ybVxuXHQgKiBuYW1lZCBieSBmb3JtIGFzIHNwZWNpZmllZCBpbiBVbmljb2RlIFN0YW5kYXJkIEFubmV4ICMxNSwgVW5pY29kZSBOb3JtYWxpemF0aW9uIEZvcm1zLlxuXHQgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgc3RyaW5nXG5cdCAqIEBwYXJhbSBmb3JtIEFwcGxpY2FibGUgdmFsdWVzOiBcIk5GQ1wiLCBcIk5GRFwiLCBcIk5GS0NcIiwgb3IgXCJORktEXCIsIElmIG5vdCBzcGVjaWZpZWQgZGVmYXVsdFxuXHQgKiBpcyBcIk5GQ1wiXG5cdCAqL1xuXHQodGFyZ2V0OiBzdHJpbmcsIGZvcm0/OiBzdHJpbmcpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogVGhlIG1pbmltdW0gbG9jYXRpb24gb2YgaGlnaCBzdXJyb2dhdGVzXG4gKi9cbmV4cG9ydCBjb25zdCBISUdIX1NVUlJPR0FURV9NSU4gPSAweGQ4MDA7XG5cbi8qKlxuICogVGhlIG1heGltdW0gbG9jYXRpb24gb2YgaGlnaCBzdXJyb2dhdGVzXG4gKi9cbmV4cG9ydCBjb25zdCBISUdIX1NVUlJPR0FURV9NQVggPSAweGRiZmY7XG5cbi8qKlxuICogVGhlIG1pbmltdW0gbG9jYXRpb24gb2YgbG93IHN1cnJvZ2F0ZXNcbiAqL1xuZXhwb3J0IGNvbnN0IExPV19TVVJST0dBVEVfTUlOID0gMHhkYzAwO1xuXG4vKipcbiAqIFRoZSBtYXhpbXVtIGxvY2F0aW9uIG9mIGxvdyBzdXJyb2dhdGVzXG4gKi9cbmV4cG9ydCBjb25zdCBMT1dfU1VSUk9HQVRFX01BWCA9IDB4ZGZmZjtcblxuLyogRVM2IHN0YXRpYyBtZXRob2RzICovXG5cbi8qKlxuICogUmV0dXJuIHRoZSBTdHJpbmcgdmFsdWUgd2hvc2UgZWxlbWVudHMgYXJlLCBpbiBvcmRlciwgdGhlIGVsZW1lbnRzIGluIHRoZSBMaXN0IGVsZW1lbnRzLlxuICogSWYgbGVuZ3RoIGlzIDAsIHRoZSBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQuXG4gKiBAcGFyYW0gY29kZVBvaW50cyBUaGUgY29kZSBwb2ludHMgdG8gZ2VuZXJhdGUgdGhlIHN0cmluZ1xuICovXG5leHBvcnQgbGV0IGZyb21Db2RlUG9pbnQ6ICguLi5jb2RlUG9pbnRzOiBudW1iZXJbXSkgPT4gc3RyaW5nO1xuXG4vKipcbiAqIGByYXdgIGlzIGludGVuZGVkIGZvciB1c2UgYXMgYSB0YWcgZnVuY3Rpb24gb2YgYSBUYWdnZWQgVGVtcGxhdGUgU3RyaW5nLiBXaGVuIGNhbGxlZFxuICogYXMgc3VjaCB0aGUgZmlyc3QgYXJndW1lbnQgd2lsbCBiZSBhIHdlbGwgZm9ybWVkIHRlbXBsYXRlIGNhbGwgc2l0ZSBvYmplY3QgYW5kIHRoZSByZXN0XG4gKiBwYXJhbWV0ZXIgd2lsbCBjb250YWluIHRoZSBzdWJzdGl0dXRpb24gdmFsdWVzLlxuICogQHBhcmFtIHRlbXBsYXRlIEEgd2VsbC1mb3JtZWQgdGVtcGxhdGUgc3RyaW5nIGNhbGwgc2l0ZSByZXByZXNlbnRhdGlvbi5cbiAqIEBwYXJhbSBzdWJzdGl0dXRpb25zIEEgc2V0IG9mIHN1YnN0aXR1dGlvbiB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBsZXQgcmF3OiAodGVtcGxhdGU6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5zdWJzdGl0dXRpb25zOiBhbnlbXSkgPT4gc3RyaW5nO1xuXG4vKiBFUzYgaW5zdGFuY2UgbWV0aG9kcyAqL1xuXG4vKipcbiAqIFJldHVybnMgYSBub25uZWdhdGl2ZSBpbnRlZ2VyIE51bWJlciBsZXNzIHRoYW4gMTExNDExMiAoMHgxMTAwMDApIHRoYXQgaXMgdGhlIGNvZGUgcG9pbnRcbiAqIHZhbHVlIG9mIHRoZSBVVEYtMTYgZW5jb2RlZCBjb2RlIHBvaW50IHN0YXJ0aW5nIGF0IHRoZSBzdHJpbmcgZWxlbWVudCBhdCBwb3NpdGlvbiBwb3MgaW5cbiAqIHRoZSBTdHJpbmcgcmVzdWx0aW5nIGZyb20gY29udmVydGluZyB0aGlzIG9iamVjdCB0byBhIFN0cmluZy5cbiAqIElmIHRoZXJlIGlzIG5vIGVsZW1lbnQgYXQgdGhhdCBwb3NpdGlvbiwgdGhlIHJlc3VsdCBpcyB1bmRlZmluZWQuXG4gKiBJZiBhIHZhbGlkIFVURi0xNiBzdXJyb2dhdGUgcGFpciBkb2VzIG5vdCBiZWdpbiBhdCBwb3MsIHRoZSByZXN1bHQgaXMgdGhlIGNvZGUgdW5pdCBhdCBwb3MuXG4gKi9cbmV4cG9ydCBsZXQgY29kZVBvaW50QXQ6ICh0YXJnZXQ6IHN0cmluZywgcG9zPzogbnVtYmVyKSA9PiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBzZXF1ZW5jZSBvZiBlbGVtZW50cyBvZiBzZWFyY2hTdHJpbmcgY29udmVydGVkIHRvIGEgU3RyaW5nIGlzIHRoZVxuICogc2FtZSBhcyB0aGUgY29ycmVzcG9uZGluZyBlbGVtZW50cyBvZiB0aGlzIG9iamVjdCAoY29udmVydGVkIHRvIGEgU3RyaW5nKSBzdGFydGluZyBhdFxuICogZW5kUG9zaXRpb24g4oCTIGxlbmd0aCh0aGlzKS4gT3RoZXJ3aXNlIHJldHVybnMgZmFsc2UuXG4gKi9cbmV4cG9ydCBsZXQgZW5kc1dpdGg6ICh0YXJnZXQ6IHN0cmluZywgc2VhcmNoU3RyaW5nOiBzdHJpbmcsIGVuZFBvc2l0aW9uPzogbnVtYmVyKSA9PiBib29sZWFuO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBzZWFyY2hTdHJpbmcgYXBwZWFycyBhcyBhIHN1YnN0cmluZyBvZiB0aGUgcmVzdWx0IG9mIGNvbnZlcnRpbmcgdGhpc1xuICogb2JqZWN0IHRvIGEgU3RyaW5nLCBhdCBvbmUgb3IgbW9yZSBwb3NpdGlvbnMgdGhhdCBhcmVcbiAqIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byBwb3NpdGlvbjsgb3RoZXJ3aXNlLCByZXR1cm5zIGZhbHNlLlxuICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHN0cmluZ1xuICogQHBhcmFtIHNlYXJjaFN0cmluZyBzZWFyY2ggc3RyaW5nXG4gKiBAcGFyYW0gcG9zaXRpb24gSWYgcG9zaXRpb24gaXMgdW5kZWZpbmVkLCAwIGlzIGFzc3VtZWQsIHNvIGFzIHRvIHNlYXJjaCBhbGwgb2YgdGhlIFN0cmluZy5cbiAqL1xuZXhwb3J0IGxldCBpbmNsdWRlczogKHRhcmdldDogc3RyaW5nLCBzZWFyY2hTdHJpbmc6IHN0cmluZywgcG9zaXRpb24/OiBudW1iZXIpID0+IGJvb2xlYW47XG5cbi8qKlxuICogUmV0dXJucyB0aGUgU3RyaW5nIHZhbHVlIHJlc3VsdCBvZiBub3JtYWxpemluZyB0aGUgc3RyaW5nIGludG8gdGhlIG5vcm1hbGl6YXRpb24gZm9ybVxuICogbmFtZWQgYnkgZm9ybSBhcyBzcGVjaWZpZWQgaW4gVW5pY29kZSBTdGFuZGFyZCBBbm5leCAjMTUsIFVuaWNvZGUgTm9ybWFsaXphdGlvbiBGb3Jtcy5cbiAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBzdHJpbmdcbiAqIEBwYXJhbSBmb3JtIEFwcGxpY2FibGUgdmFsdWVzOiBcIk5GQ1wiLCBcIk5GRFwiLCBcIk5GS0NcIiwgb3IgXCJORktEXCIsIElmIG5vdCBzcGVjaWZpZWQgZGVmYXVsdFxuICogaXMgXCJORkNcIlxuICovXG5leHBvcnQgbGV0IG5vcm1hbGl6ZTogU3RyaW5nTm9ybWFsaXplO1xuXG4vKipcbiAqIFJldHVybnMgYSBTdHJpbmcgdmFsdWUgdGhhdCBpcyBtYWRlIGZyb20gY291bnQgY29waWVzIGFwcGVuZGVkIHRvZ2V0aGVyLiBJZiBjb3VudCBpcyAwLFxuICogVCBpcyB0aGUgZW1wdHkgU3RyaW5nIGlzIHJldHVybmVkLlxuICogQHBhcmFtIGNvdW50IG51bWJlciBvZiBjb3BpZXMgdG8gYXBwZW5kXG4gKi9cbmV4cG9ydCBsZXQgcmVwZWF0OiAodGFyZ2V0OiBzdHJpbmcsIGNvdW50PzogbnVtYmVyKSA9PiBzdHJpbmc7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBzZXF1ZW5jZSBvZiBlbGVtZW50cyBvZiBzZWFyY2hTdHJpbmcgY29udmVydGVkIHRvIGEgU3RyaW5nIGlzIHRoZVxuICogc2FtZSBhcyB0aGUgY29ycmVzcG9uZGluZyBlbGVtZW50cyBvZiB0aGlzIG9iamVjdCAoY29udmVydGVkIHRvIGEgU3RyaW5nKSBzdGFydGluZyBhdFxuICogcG9zaXRpb24uIE90aGVyd2lzZSByZXR1cm5zIGZhbHNlLlxuICovXG5leHBvcnQgbGV0IHN0YXJ0c1dpdGg6ICh0YXJnZXQ6IHN0cmluZywgc2VhcmNoU3RyaW5nOiBzdHJpbmcsIHBvc2l0aW9uPzogbnVtYmVyKSA9PiBib29sZWFuO1xuXG4vKiBFUzcgaW5zdGFuY2UgbWV0aG9kcyAqL1xuXG4vKipcbiAqIFBhZHMgdGhlIGN1cnJlbnQgc3RyaW5nIHdpdGggYSBnaXZlbiBzdHJpbmcgKHBvc3NpYmx5IHJlcGVhdGVkKSBzbyB0aGF0IHRoZSByZXN1bHRpbmcgc3RyaW5nIHJlYWNoZXMgYSBnaXZlbiBsZW5ndGguXG4gKiBUaGUgcGFkZGluZyBpcyBhcHBsaWVkIGZyb20gdGhlIGVuZCAocmlnaHQpIG9mIHRoZSBjdXJyZW50IHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgc3RyaW5nXG4gKiBAcGFyYW0gbWF4TGVuZ3RoIFRoZSBsZW5ndGggb2YgdGhlIHJlc3VsdGluZyBzdHJpbmcgb25jZSB0aGUgY3VycmVudCBzdHJpbmcgaGFzIGJlZW4gcGFkZGVkLlxuICogICAgICAgIElmIHRoaXMgcGFyYW1ldGVyIGlzIHNtYWxsZXIgdGhhbiB0aGUgY3VycmVudCBzdHJpbmcncyBsZW5ndGgsIHRoZSBjdXJyZW50IHN0cmluZyB3aWxsIGJlIHJldHVybmVkIGFzIGl0IGlzLlxuICpcbiAqIEBwYXJhbSBmaWxsU3RyaW5nIFRoZSBzdHJpbmcgdG8gcGFkIHRoZSBjdXJyZW50IHN0cmluZyB3aXRoLlxuICogICAgICAgIElmIHRoaXMgc3RyaW5nIGlzIHRvbyBsb25nLCBpdCB3aWxsIGJlIHRydW5jYXRlZCBhbmQgdGhlIGxlZnQtbW9zdCBwYXJ0IHdpbGwgYmUgYXBwbGllZC5cbiAqICAgICAgICBUaGUgZGVmYXVsdCB2YWx1ZSBmb3IgdGhpcyBwYXJhbWV0ZXIgaXMgXCIgXCIgKFUrMDAyMCkuXG4gKi9cbmV4cG9ydCBsZXQgcGFkRW5kOiAodGFyZ2V0OiBzdHJpbmcsIG1heExlbmd0aDogbnVtYmVyLCBmaWxsU3RyaW5nPzogc3RyaW5nKSA9PiBzdHJpbmc7XG5cbi8qKlxuICogUGFkcyB0aGUgY3VycmVudCBzdHJpbmcgd2l0aCBhIGdpdmVuIHN0cmluZyAocG9zc2libHkgcmVwZWF0ZWQpIHNvIHRoYXQgdGhlIHJlc3VsdGluZyBzdHJpbmcgcmVhY2hlcyBhIGdpdmVuIGxlbmd0aC5cbiAqIFRoZSBwYWRkaW5nIGlzIGFwcGxpZWQgZnJvbSB0aGUgc3RhcnQgKGxlZnQpIG9mIHRoZSBjdXJyZW50IHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgc3RyaW5nXG4gKiBAcGFyYW0gbWF4TGVuZ3RoIFRoZSBsZW5ndGggb2YgdGhlIHJlc3VsdGluZyBzdHJpbmcgb25jZSB0aGUgY3VycmVudCBzdHJpbmcgaGFzIGJlZW4gcGFkZGVkLlxuICogICAgICAgIElmIHRoaXMgcGFyYW1ldGVyIGlzIHNtYWxsZXIgdGhhbiB0aGUgY3VycmVudCBzdHJpbmcncyBsZW5ndGgsIHRoZSBjdXJyZW50IHN0cmluZyB3aWxsIGJlIHJldHVybmVkIGFzIGl0IGlzLlxuICpcbiAqIEBwYXJhbSBmaWxsU3RyaW5nIFRoZSBzdHJpbmcgdG8gcGFkIHRoZSBjdXJyZW50IHN0cmluZyB3aXRoLlxuICogICAgICAgIElmIHRoaXMgc3RyaW5nIGlzIHRvbyBsb25nLCBpdCB3aWxsIGJlIHRydW5jYXRlZCBhbmQgdGhlIGxlZnQtbW9zdCBwYXJ0IHdpbGwgYmUgYXBwbGllZC5cbiAqICAgICAgICBUaGUgZGVmYXVsdCB2YWx1ZSBmb3IgdGhpcyBwYXJhbWV0ZXIgaXMgXCIgXCIgKFUrMDAyMCkuXG4gKi9cbmV4cG9ydCBsZXQgcGFkU3RhcnQ6ICh0YXJnZXQ6IHN0cmluZywgbWF4TGVuZ3RoOiBudW1iZXIsIGZpbGxTdHJpbmc/OiBzdHJpbmcpID0+IHN0cmluZztcblxuaWYgKGhhcygnZXM2LXN0cmluZycpICYmIGhhcygnZXM2LXN0cmluZy1yYXcnKSkge1xuXHRmcm9tQ29kZVBvaW50ID0gZ2xvYmFsLlN0cmluZy5mcm9tQ29kZVBvaW50O1xuXHRyYXcgPSBnbG9iYWwuU3RyaW5nLnJhdztcblxuXHRjb2RlUG9pbnRBdCA9IHdyYXBOYXRpdmUoZ2xvYmFsLlN0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXQpO1xuXHRlbmRzV2l0aCA9IHdyYXBOYXRpdmUoZ2xvYmFsLlN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGgpO1xuXHRpbmNsdWRlcyA9IHdyYXBOYXRpdmUoZ2xvYmFsLlN0cmluZy5wcm90b3R5cGUuaW5jbHVkZXMpO1xuXHRub3JtYWxpemUgPSB3cmFwTmF0aXZlKGdsb2JhbC5TdHJpbmcucHJvdG90eXBlLm5vcm1hbGl6ZSk7XG5cdHJlcGVhdCA9IHdyYXBOYXRpdmUoZ2xvYmFsLlN0cmluZy5wcm90b3R5cGUucmVwZWF0KTtcblx0c3RhcnRzV2l0aCA9IHdyYXBOYXRpdmUoZ2xvYmFsLlN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCk7XG59IGVsc2Uge1xuXHQvKipcblx0ICogVmFsaWRhdGVzIHRoYXQgdGV4dCBpcyBkZWZpbmVkLCBhbmQgbm9ybWFsaXplcyBwb3NpdGlvbiAoYmFzZWQgb24gdGhlIGdpdmVuIGRlZmF1bHQgaWYgdGhlIGlucHV0IGlzIE5hTikuXG5cdCAqIFVzZWQgYnkgc3RhcnRzV2l0aCwgaW5jbHVkZXMsIGFuZCBlbmRzV2l0aC5cblx0ICpcblx0ICogQHJldHVybiBOb3JtYWxpemVkIHBvc2l0aW9uLlxuXHQgKi9cblx0Y29uc3Qgbm9ybWFsaXplU3Vic3RyaW5nQXJncyA9IGZ1bmN0aW9uKFxuXHRcdG5hbWU6IHN0cmluZyxcblx0XHR0ZXh0OiBzdHJpbmcsXG5cdFx0c2VhcmNoOiBzdHJpbmcsXG5cdFx0cG9zaXRpb246IG51bWJlcixcblx0XHRpc0VuZDogYm9vbGVhbiA9IGZhbHNlXG5cdCk6IFtzdHJpbmcsIHN0cmluZywgbnVtYmVyXSB7XG5cdFx0aWYgKHRleHQgPT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignc3RyaW5nLicgKyBuYW1lICsgJyByZXF1aXJlcyBhIHZhbGlkIHN0cmluZyB0byBzZWFyY2ggYWdhaW5zdC4nKTtcblx0XHR9XG5cblx0XHRjb25zdCBsZW5ndGggPSB0ZXh0Lmxlbmd0aDtcblx0XHRwb3NpdGlvbiA9IHBvc2l0aW9uICE9PSBwb3NpdGlvbiA/IChpc0VuZCA/IGxlbmd0aCA6IDApIDogcG9zaXRpb247XG5cdFx0cmV0dXJuIFt0ZXh0LCBTdHJpbmcoc2VhcmNoKSwgTWF0aC5taW4oTWF0aC5tYXgocG9zaXRpb24sIDApLCBsZW5ndGgpXTtcblx0fTtcblxuXHRmcm9tQ29kZVBvaW50ID0gZnVuY3Rpb24gZnJvbUNvZGVQb2ludCguLi5jb2RlUG9pbnRzOiBudW1iZXJbXSk6IHN0cmluZyB7XG5cdFx0Ly8gQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5mcm9tQ29kZVBvaW50XG5cdFx0Y29uc3QgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRpZiAoIWxlbmd0aCkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGNvbnN0IGZyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG5cdFx0Y29uc3QgTUFYX1NJWkUgPSAweDQwMDA7XG5cdFx0bGV0IGNvZGVVbml0czogbnVtYmVyW10gPSBbXTtcblx0XHRsZXQgaW5kZXggPSAtMTtcblx0XHRsZXQgcmVzdWx0ID0gJyc7XG5cblx0XHR3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuXHRcdFx0bGV0IGNvZGVQb2ludCA9IE51bWJlcihhcmd1bWVudHNbaW5kZXhdKTtcblxuXHRcdFx0Ly8gQ29kZSBwb2ludHMgbXVzdCBiZSBmaW5pdGUgaW50ZWdlcnMgd2l0aGluIHRoZSB2YWxpZCByYW5nZVxuXHRcdFx0bGV0IGlzVmFsaWQgPVxuXHRcdFx0XHRpc0Zpbml0ZShjb2RlUG9pbnQpICYmIE1hdGguZmxvb3IoY29kZVBvaW50KSA9PT0gY29kZVBvaW50ICYmIGNvZGVQb2ludCA+PSAwICYmIGNvZGVQb2ludCA8PSAweDEwZmZmZjtcblx0XHRcdGlmICghaXNWYWxpZCkge1xuXHRcdFx0XHR0aHJvdyBSYW5nZUVycm9yKCdzdHJpbmcuZnJvbUNvZGVQb2ludDogSW52YWxpZCBjb2RlIHBvaW50ICcgKyBjb2RlUG9pbnQpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY29kZVBvaW50IDw9IDB4ZmZmZikge1xuXHRcdFx0XHQvLyBCTVAgY29kZSBwb2ludFxuXHRcdFx0XHRjb2RlVW5pdHMucHVzaChjb2RlUG9pbnQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gQXN0cmFsIGNvZGUgcG9pbnQ7IHNwbGl0IGluIHN1cnJvZ2F0ZSBoYWx2ZXNcblx0XHRcdFx0Ly8gaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmcjc3Vycm9nYXRlLWZvcm11bGFlXG5cdFx0XHRcdGNvZGVQb2ludCAtPSAweDEwMDAwO1xuXHRcdFx0XHRsZXQgaGlnaFN1cnJvZ2F0ZSA9IChjb2RlUG9pbnQgPj4gMTApICsgSElHSF9TVVJST0dBVEVfTUlOO1xuXHRcdFx0XHRsZXQgbG93U3Vycm9nYXRlID0gKGNvZGVQb2ludCAlIDB4NDAwKSArIExPV19TVVJST0dBVEVfTUlOO1xuXHRcdFx0XHRjb2RlVW5pdHMucHVzaChoaWdoU3Vycm9nYXRlLCBsb3dTdXJyb2dhdGUpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaW5kZXggKyAxID09PSBsZW5ndGggfHwgY29kZVVuaXRzLmxlbmd0aCA+IE1BWF9TSVpFKSB7XG5cdFx0XHRcdHJlc3VsdCArPSBmcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgY29kZVVuaXRzKTtcblx0XHRcdFx0Y29kZVVuaXRzLmxlbmd0aCA9IDA7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH07XG5cblx0cmF3ID0gZnVuY3Rpb24gcmF3KGNhbGxTaXRlOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uc3Vic3RpdHV0aW9uczogYW55W10pOiBzdHJpbmcge1xuXHRcdGxldCByYXdTdHJpbmdzID0gY2FsbFNpdGUucmF3O1xuXHRcdGxldCByZXN1bHQgPSAnJztcblx0XHRsZXQgbnVtU3Vic3RpdHV0aW9ucyA9IHN1YnN0aXR1dGlvbnMubGVuZ3RoO1xuXG5cdFx0aWYgKGNhbGxTaXRlID09IG51bGwgfHwgY2FsbFNpdGUucmF3ID09IG51bGwpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ3N0cmluZy5yYXcgcmVxdWlyZXMgYSB2YWxpZCBjYWxsU2l0ZSBvYmplY3Qgd2l0aCBhIHJhdyB2YWx1ZScpO1xuXHRcdH1cblxuXHRcdGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSByYXdTdHJpbmdzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRyZXN1bHQgKz0gcmF3U3RyaW5nc1tpXSArIChpIDwgbnVtU3Vic3RpdHV0aW9ucyAmJiBpIDwgbGVuZ3RoIC0gMSA/IHN1YnN0aXR1dGlvbnNbaV0gOiAnJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fTtcblxuXHRjb2RlUG9pbnRBdCA9IGZ1bmN0aW9uIGNvZGVQb2ludEF0KHRleHQ6IHN0cmluZywgcG9zaXRpb246IG51bWJlciA9IDApOiBudW1iZXIgfCB1bmRlZmluZWQge1xuXHRcdC8vIEFkYXB0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9TdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0XG5cdFx0aWYgKHRleHQgPT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignc3RyaW5nLmNvZGVQb2ludEF0IHJlcXVyaWVzIGEgdmFsaWQgc3RyaW5nLicpO1xuXHRcdH1cblx0XHRjb25zdCBsZW5ndGggPSB0ZXh0Lmxlbmd0aDtcblxuXHRcdGlmIChwb3NpdGlvbiAhPT0gcG9zaXRpb24pIHtcblx0XHRcdHBvc2l0aW9uID0gMDtcblx0XHR9XG5cdFx0aWYgKHBvc2l0aW9uIDwgMCB8fCBwb3NpdGlvbiA+PSBsZW5ndGgpIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0Ly8gR2V0IHRoZSBmaXJzdCBjb2RlIHVuaXRcblx0XHRjb25zdCBmaXJzdCA9IHRleHQuY2hhckNvZGVBdChwb3NpdGlvbik7XG5cdFx0aWYgKGZpcnN0ID49IEhJR0hfU1VSUk9HQVRFX01JTiAmJiBmaXJzdCA8PSBISUdIX1NVUlJPR0FURV9NQVggJiYgbGVuZ3RoID4gcG9zaXRpb24gKyAxKSB7XG5cdFx0XHQvLyBTdGFydCBvZiBhIHN1cnJvZ2F0ZSBwYWlyIChoaWdoIHN1cnJvZ2F0ZSBhbmQgdGhlcmUgaXMgYSBuZXh0IGNvZGUgdW5pdCk7IGNoZWNrIGZvciBsb3cgc3Vycm9nYXRlXG5cdFx0XHQvLyBodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZyNzdXJyb2dhdGUtZm9ybXVsYWVcblx0XHRcdGNvbnN0IHNlY29uZCA9IHRleHQuY2hhckNvZGVBdChwb3NpdGlvbiArIDEpO1xuXHRcdFx0aWYgKHNlY29uZCA+PSBMT1dfU1VSUk9HQVRFX01JTiAmJiBzZWNvbmQgPD0gTE9XX1NVUlJPR0FURV9NQVgpIHtcblx0XHRcdFx0cmV0dXJuIChmaXJzdCAtIEhJR0hfU1VSUk9HQVRFX01JTikgKiAweDQwMCArIHNlY29uZCAtIExPV19TVVJST0dBVEVfTUlOICsgMHgxMDAwMDtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZpcnN0O1xuXHR9O1xuXG5cdGVuZHNXaXRoID0gZnVuY3Rpb24gZW5kc1dpdGgodGV4dDogc3RyaW5nLCBzZWFyY2g6IHN0cmluZywgZW5kUG9zaXRpb24/OiBudW1iZXIpOiBib29sZWFuIHtcblx0XHRpZiAoZW5kUG9zaXRpb24gPT0gbnVsbCkge1xuXHRcdFx0ZW5kUG9zaXRpb24gPSB0ZXh0Lmxlbmd0aDtcblx0XHR9XG5cblx0XHRbdGV4dCwgc2VhcmNoLCBlbmRQb3NpdGlvbl0gPSBub3JtYWxpemVTdWJzdHJpbmdBcmdzKCdlbmRzV2l0aCcsIHRleHQsIHNlYXJjaCwgZW5kUG9zaXRpb24sIHRydWUpO1xuXG5cdFx0Y29uc3Qgc3RhcnQgPSBlbmRQb3NpdGlvbiAtIHNlYXJjaC5sZW5ndGg7XG5cdFx0aWYgKHN0YXJ0IDwgMCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0ZXh0LnNsaWNlKHN0YXJ0LCBlbmRQb3NpdGlvbikgPT09IHNlYXJjaDtcblx0fTtcblxuXHRpbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzKHRleHQ6IHN0cmluZywgc2VhcmNoOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIgPSAwKTogYm9vbGVhbiB7XG5cdFx0W3RleHQsIHNlYXJjaCwgcG9zaXRpb25dID0gbm9ybWFsaXplU3Vic3RyaW5nQXJncygnaW5jbHVkZXMnLCB0ZXh0LCBzZWFyY2gsIHBvc2l0aW9uKTtcblx0XHRyZXR1cm4gdGV4dC5pbmRleE9mKHNlYXJjaCwgcG9zaXRpb24pICE9PSAtMTtcblx0fTtcblxuXHRyZXBlYXQgPSBmdW5jdGlvbiByZXBlYXQodGV4dDogc3RyaW5nLCBjb3VudDogbnVtYmVyID0gMCk6IHN0cmluZyB7XG5cdFx0Ly8gQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5wcm90b3R5cGUucmVwZWF0XG5cdFx0aWYgKHRleHQgPT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignc3RyaW5nLnJlcGVhdCByZXF1aXJlcyBhIHZhbGlkIHN0cmluZy4nKTtcblx0XHR9XG5cdFx0aWYgKGNvdW50ICE9PSBjb3VudCkge1xuXHRcdFx0Y291bnQgPSAwO1xuXHRcdH1cblx0XHRpZiAoY291bnQgPCAwIHx8IGNvdW50ID09PSBJbmZpbml0eSkge1xuXHRcdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3N0cmluZy5yZXBlYXQgcmVxdWlyZXMgYSBub24tbmVnYXRpdmUgZmluaXRlIGNvdW50LicpO1xuXHRcdH1cblxuXHRcdGxldCByZXN1bHQgPSAnJztcblx0XHR3aGlsZSAoY291bnQpIHtcblx0XHRcdGlmIChjb3VudCAlIDIpIHtcblx0XHRcdFx0cmVzdWx0ICs9IHRleHQ7XG5cdFx0XHR9XG5cdFx0XHRpZiAoY291bnQgPiAxKSB7XG5cdFx0XHRcdHRleHQgKz0gdGV4dDtcblx0XHRcdH1cblx0XHRcdGNvdW50ID4+PSAxO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9O1xuXG5cdHN0YXJ0c1dpdGggPSBmdW5jdGlvbiBzdGFydHNXaXRoKHRleHQ6IHN0cmluZywgc2VhcmNoOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIgPSAwKTogYm9vbGVhbiB7XG5cdFx0c2VhcmNoID0gU3RyaW5nKHNlYXJjaCk7XG5cdFx0W3RleHQsIHNlYXJjaCwgcG9zaXRpb25dID0gbm9ybWFsaXplU3Vic3RyaW5nQXJncygnc3RhcnRzV2l0aCcsIHRleHQsIHNlYXJjaCwgcG9zaXRpb24pO1xuXG5cdFx0Y29uc3QgZW5kID0gcG9zaXRpb24gKyBzZWFyY2gubGVuZ3RoO1xuXHRcdGlmIChlbmQgPiB0ZXh0Lmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0ZXh0LnNsaWNlKHBvc2l0aW9uLCBlbmQpID09PSBzZWFyY2g7XG5cdH07XG59XG5cbmlmIChoYXMoJ2VzMjAxNy1zdHJpbmcnKSkge1xuXHRwYWRFbmQgPSB3cmFwTmF0aXZlKGdsb2JhbC5TdHJpbmcucHJvdG90eXBlLnBhZEVuZCk7XG5cdHBhZFN0YXJ0ID0gd3JhcE5hdGl2ZShnbG9iYWwuU3RyaW5nLnByb3RvdHlwZS5wYWRTdGFydCk7XG59IGVsc2Uge1xuXHRwYWRFbmQgPSBmdW5jdGlvbiBwYWRFbmQodGV4dDogc3RyaW5nLCBtYXhMZW5ndGg6IG51bWJlciwgZmlsbFN0cmluZzogc3RyaW5nID0gJyAnKTogc3RyaW5nIHtcblx0XHRpZiAodGV4dCA9PT0gbnVsbCB8fCB0ZXh0ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ3N0cmluZy5yZXBlYXQgcmVxdWlyZXMgYSB2YWxpZCBzdHJpbmcuJyk7XG5cdFx0fVxuXG5cdFx0aWYgKG1heExlbmd0aCA9PT0gSW5maW5pdHkpIHtcblx0XHRcdHRocm93IG5ldyBSYW5nZUVycm9yKCdzdHJpbmcucGFkRW5kIHJlcXVpcmVzIGEgbm9uLW5lZ2F0aXZlIGZpbml0ZSBjb3VudC4nKTtcblx0XHR9XG5cblx0XHRpZiAobWF4TGVuZ3RoID09PSBudWxsIHx8IG1heExlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IG1heExlbmd0aCA8IDApIHtcblx0XHRcdG1heExlbmd0aCA9IDA7XG5cdFx0fVxuXG5cdFx0bGV0IHN0clRleHQgPSBTdHJpbmcodGV4dCk7XG5cdFx0Y29uc3QgcGFkZGluZyA9IG1heExlbmd0aCAtIHN0clRleHQubGVuZ3RoO1xuXG5cdFx0aWYgKHBhZGRpbmcgPiAwKSB7XG5cdFx0XHRzdHJUZXh0ICs9XG5cdFx0XHRcdHJlcGVhdChmaWxsU3RyaW5nLCBNYXRoLmZsb29yKHBhZGRpbmcgLyBmaWxsU3RyaW5nLmxlbmd0aCkpICtcblx0XHRcdFx0ZmlsbFN0cmluZy5zbGljZSgwLCBwYWRkaW5nICUgZmlsbFN0cmluZy5sZW5ndGgpO1xuXHRcdH1cblxuXHRcdHJldHVybiBzdHJUZXh0O1xuXHR9O1xuXG5cdHBhZFN0YXJ0ID0gZnVuY3Rpb24gcGFkU3RhcnQodGV4dDogc3RyaW5nLCBtYXhMZW5ndGg6IG51bWJlciwgZmlsbFN0cmluZzogc3RyaW5nID0gJyAnKTogc3RyaW5nIHtcblx0XHRpZiAodGV4dCA9PT0gbnVsbCB8fCB0ZXh0ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ3N0cmluZy5yZXBlYXQgcmVxdWlyZXMgYSB2YWxpZCBzdHJpbmcuJyk7XG5cdFx0fVxuXG5cdFx0aWYgKG1heExlbmd0aCA9PT0gSW5maW5pdHkpIHtcblx0XHRcdHRocm93IG5ldyBSYW5nZUVycm9yKCdzdHJpbmcucGFkU3RhcnQgcmVxdWlyZXMgYSBub24tbmVnYXRpdmUgZmluaXRlIGNvdW50LicpO1xuXHRcdH1cblxuXHRcdGlmIChtYXhMZW5ndGggPT09IG51bGwgfHwgbWF4TGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbWF4TGVuZ3RoIDwgMCkge1xuXHRcdFx0bWF4TGVuZ3RoID0gMDtcblx0XHR9XG5cblx0XHRsZXQgc3RyVGV4dCA9IFN0cmluZyh0ZXh0KTtcblx0XHRjb25zdCBwYWRkaW5nID0gbWF4TGVuZ3RoIC0gc3RyVGV4dC5sZW5ndGg7XG5cblx0XHRpZiAocGFkZGluZyA+IDApIHtcblx0XHRcdHN0clRleHQgPVxuXHRcdFx0XHRyZXBlYXQoZmlsbFN0cmluZywgTWF0aC5mbG9vcihwYWRkaW5nIC8gZmlsbFN0cmluZy5sZW5ndGgpKSArXG5cdFx0XHRcdGZpbGxTdHJpbmcuc2xpY2UoMCwgcGFkZGluZyAlIGZpbGxTdHJpbmcubGVuZ3RoKSArXG5cdFx0XHRcdHN0clRleHQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHN0clRleHQ7XG5cdH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3RyaW5nLnRzIiwiaW1wb3J0IGdsb2JhbCBmcm9tICcuLi9nbG9iYWwnO1xuaW1wb3J0IGhhcyBmcm9tICcuL2hhcyc7XG5pbXBvcnQgeyBIYW5kbGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcblxuZnVuY3Rpb24gZXhlY3V0ZVRhc2soaXRlbTogUXVldWVJdGVtIHwgdW5kZWZpbmVkKTogdm9pZCB7XG5cdGlmIChpdGVtICYmIGl0ZW0uaXNBY3RpdmUgJiYgaXRlbS5jYWxsYmFjaykge1xuXHRcdGl0ZW0uY2FsbGJhY2soKTtcblx0fVxufVxuXG5mdW5jdGlvbiBnZXRRdWV1ZUhhbmRsZShpdGVtOiBRdWV1ZUl0ZW0sIGRlc3RydWN0b3I/OiAoLi4uYXJnczogYW55W10pID0+IGFueSk6IEhhbmRsZSB7XG5cdHJldHVybiB7XG5cdFx0ZGVzdHJveTogZnVuY3Rpb24odGhpczogSGFuZGxlKSB7XG5cdFx0XHR0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHt9O1xuXHRcdFx0aXRlbS5pc0FjdGl2ZSA9IGZhbHNlO1xuXHRcdFx0aXRlbS5jYWxsYmFjayA9IG51bGw7XG5cblx0XHRcdGlmIChkZXN0cnVjdG9yKSB7XG5cdFx0XHRcdGRlc3RydWN0b3IoKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cbmludGVyZmFjZSBQb3N0TWVzc2FnZUV2ZW50IGV4dGVuZHMgRXZlbnQge1xuXHRzb3VyY2U6IGFueTtcblx0ZGF0YTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXVlSXRlbSB7XG5cdGlzQWN0aXZlOiBib29sZWFuO1xuXHRjYWxsYmFjazogbnVsbCB8ICgoLi4uYXJnczogYW55W10pID0+IGFueSk7XG59XG5cbmxldCBjaGVja01pY3JvVGFza1F1ZXVlOiAoKSA9PiB2b2lkO1xubGV0IG1pY3JvVGFza3M6IFF1ZXVlSXRlbVtdO1xuXG4vKipcbiAqIFNjaGVkdWxlcyBhIGNhbGxiYWNrIHRvIHRoZSBtYWNyb3Rhc2sgcXVldWUuXG4gKlxuICogQHBhcmFtIGNhbGxiYWNrIHRoZSBmdW5jdGlvbiB0byBiZSBxdWV1ZWQgYW5kIGxhdGVyIGV4ZWN1dGVkLlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggYSBgZGVzdHJveWAgbWV0aG9kIHRoYXQsIHdoZW4gY2FsbGVkLCBwcmV2ZW50cyB0aGUgcmVnaXN0ZXJlZCBjYWxsYmFjayBmcm9tIGV4ZWN1dGluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXVlVGFzayA9IChmdW5jdGlvbigpIHtcblx0bGV0IGRlc3RydWN0b3I6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xuXHRsZXQgZW5xdWV1ZTogKGl0ZW06IFF1ZXVlSXRlbSkgPT4gdm9pZDtcblxuXHQvLyBTaW5jZSB0aGUgSUUgaW1wbGVtZW50YXRpb24gb2YgYHNldEltbWVkaWF0ZWAgaXMgbm90IGZsYXdsZXNzLCB3ZSB3aWxsIHRlc3QgZm9yIGBwb3N0TWVzc2FnZWAgZmlyc3QuXG5cdGlmIChoYXMoJ3Bvc3RtZXNzYWdlJykpIHtcblx0XHRjb25zdCBxdWV1ZTogUXVldWVJdGVtW10gPSBbXTtcblxuXHRcdGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24oZXZlbnQ6IFBvc3RNZXNzYWdlRXZlbnQpOiB2b2lkIHtcblx0XHRcdC8vIENvbmZpcm0gdGhhdCB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZCBieSB0aGUgY3VycmVudCB3aW5kb3cgYW5kIGJ5IHRoaXMgcGFydGljdWxhciBpbXBsZW1lbnRhdGlvbi5cblx0XHRcdGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJiBldmVudC5kYXRhID09PSAnZG9qby1xdWV1ZS1tZXNzYWdlJykge1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0XHRpZiAocXVldWUubGVuZ3RoKSB7XG5cdFx0XHRcdFx0ZXhlY3V0ZVRhc2socXVldWUuc2hpZnQoKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGVucXVldWUgPSBmdW5jdGlvbihpdGVtOiBRdWV1ZUl0ZW0pOiB2b2lkIHtcblx0XHRcdHF1ZXVlLnB1c2goaXRlbSk7XG5cdFx0XHRnbG9iYWwucG9zdE1lc3NhZ2UoJ2Rvam8tcXVldWUtbWVzc2FnZScsICcqJyk7XG5cdFx0fTtcblx0fSBlbHNlIGlmIChoYXMoJ3NldGltbWVkaWF0ZScpKSB7XG5cdFx0ZGVzdHJ1Y3RvciA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZTtcblx0XHRlbnF1ZXVlID0gZnVuY3Rpb24oaXRlbTogUXVldWVJdGVtKTogYW55IHtcblx0XHRcdHJldHVybiBzZXRJbW1lZGlhdGUoZXhlY3V0ZVRhc2suYmluZChudWxsLCBpdGVtKSk7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRkZXN0cnVjdG9yID0gZ2xvYmFsLmNsZWFyVGltZW91dDtcblx0XHRlbnF1ZXVlID0gZnVuY3Rpb24oaXRlbTogUXVldWVJdGVtKTogYW55IHtcblx0XHRcdHJldHVybiBzZXRUaW1lb3V0KGV4ZWN1dGVUYXNrLmJpbmQobnVsbCwgaXRlbSksIDApO1xuXHRcdH07XG5cdH1cblxuXHRmdW5jdGlvbiBxdWV1ZVRhc2soY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KTogSGFuZGxlIHtcblx0XHRjb25zdCBpdGVtOiBRdWV1ZUl0ZW0gPSB7XG5cdFx0XHRpc0FjdGl2ZTogdHJ1ZSxcblx0XHRcdGNhbGxiYWNrOiBjYWxsYmFja1xuXHRcdH07XG5cdFx0Y29uc3QgaWQ6IGFueSA9IGVucXVldWUoaXRlbSk7XG5cblx0XHRyZXR1cm4gZ2V0UXVldWVIYW5kbGUoXG5cdFx0XHRpdGVtLFxuXHRcdFx0ZGVzdHJ1Y3RvciAmJlxuXHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRkZXN0cnVjdG9yKGlkKTtcblx0XHRcdFx0fVxuXHRcdCk7XG5cdH1cblxuXHQvLyBUT0RPOiBVc2UgYXNwZWN0LmJlZm9yZSB3aGVuIGl0IGlzIGF2YWlsYWJsZS5cblx0cmV0dXJuIGhhcygnbWljcm90YXNrcycpXG5cdFx0PyBxdWV1ZVRhc2tcblx0XHQ6IGZ1bmN0aW9uKGNhbGxiYWNrOiAoLi4uYXJnczogYW55W10pID0+IGFueSk6IEhhbmRsZSB7XG5cdFx0XHRcdGNoZWNrTWljcm9UYXNrUXVldWUoKTtcblx0XHRcdFx0cmV0dXJuIHF1ZXVlVGFzayhjYWxsYmFjayk7XG5cdFx0ICB9O1xufSkoKTtcblxuLy8gV2hlbiBubyBtZWNoYW5pc20gZm9yIHJlZ2lzdGVyaW5nIG1pY3JvdGFza3MgaXMgZXhwb3NlZCBieSB0aGUgZW52aXJvbm1lbnQsIG1pY3JvdGFza3Mgd2lsbFxuLy8gYmUgcXVldWVkIGFuZCB0aGVuIGV4ZWN1dGVkIGluIGEgc2luZ2xlIG1hY3JvdGFzayBiZWZvcmUgdGhlIG90aGVyIG1hY3JvdGFza3MgYXJlIGV4ZWN1dGVkLlxuaWYgKCFoYXMoJ21pY3JvdGFza3MnKSkge1xuXHRsZXQgaXNNaWNyb1Rhc2tRdWV1ZWQgPSBmYWxzZTtcblxuXHRtaWNyb1Rhc2tzID0gW107XG5cdGNoZWNrTWljcm9UYXNrUXVldWUgPSBmdW5jdGlvbigpOiB2b2lkIHtcblx0XHRpZiAoIWlzTWljcm9UYXNrUXVldWVkKSB7XG5cdFx0XHRpc01pY3JvVGFza1F1ZXVlZCA9IHRydWU7XG5cdFx0XHRxdWV1ZVRhc2soZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlzTWljcm9UYXNrUXVldWVkID0gZmFsc2U7XG5cblx0XHRcdFx0aWYgKG1pY3JvVGFza3MubGVuZ3RoKSB7XG5cdFx0XHRcdFx0bGV0IGl0ZW06IFF1ZXVlSXRlbSB8IHVuZGVmaW5lZDtcblx0XHRcdFx0XHR3aGlsZSAoKGl0ZW0gPSBtaWNyb1Rhc2tzLnNoaWZ0KCkpKSB7XG5cdFx0XHRcdFx0XHRleGVjdXRlVGFzayhpdGVtKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fTtcbn1cblxuLyoqXG4gKiBTY2hlZHVsZXMgYW4gYW5pbWF0aW9uIHRhc2sgd2l0aCBgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZWAgaWYgaXQgZXhpc3RzLCBvciB3aXRoIGBxdWV1ZVRhc2tgIG90aGVyd2lzZS5cbiAqXG4gKiBTaW5jZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUncyBiZWhhdmlvciBkb2VzIG5vdCBtYXRjaCB0aGF0IGV4cGVjdGVkIGZyb20gYHF1ZXVlVGFza2AsIGl0IGlzIG5vdCB1c2VkIHRoZXJlLlxuICogSG93ZXZlciwgYXQgdGltZXMgaXQgbWFrZXMgbW9yZSBzZW5zZSB0byBkZWxlZ2F0ZSB0byByZXF1ZXN0QW5pbWF0aW9uRnJhbWU7IGhlbmNlIHRoZSBmb2xsb3dpbmcgbWV0aG9kLlxuICpcbiAqIEBwYXJhbSBjYWxsYmFjayB0aGUgZnVuY3Rpb24gdG8gYmUgcXVldWVkIGFuZCBsYXRlciBleGVjdXRlZC5cbiAqIEByZXR1cm5zIEFuIG9iamVjdCB3aXRoIGEgYGRlc3Ryb3lgIG1ldGhvZCB0aGF0LCB3aGVuIGNhbGxlZCwgcHJldmVudHMgdGhlIHJlZ2lzdGVyZWQgY2FsbGJhY2sgZnJvbSBleGVjdXRpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBxdWV1ZUFuaW1hdGlvblRhc2sgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICghaGFzKCdyYWYnKSkge1xuXHRcdHJldHVybiBxdWV1ZVRhc2s7XG5cdH1cblxuXHRmdW5jdGlvbiBxdWV1ZUFuaW1hdGlvblRhc2soY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KTogSGFuZGxlIHtcblx0XHRjb25zdCBpdGVtOiBRdWV1ZUl0ZW0gPSB7XG5cdFx0XHRpc0FjdGl2ZTogdHJ1ZSxcblx0XHRcdGNhbGxiYWNrOiBjYWxsYmFja1xuXHRcdH07XG5cdFx0Y29uc3QgcmFmSWQ6IG51bWJlciA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShleGVjdXRlVGFzay5iaW5kKG51bGwsIGl0ZW0pKTtcblxuXHRcdHJldHVybiBnZXRRdWV1ZUhhbmRsZShpdGVtLCBmdW5jdGlvbigpIHtcblx0XHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZklkKTtcblx0XHR9KTtcblx0fVxuXG5cdC8vIFRPRE86IFVzZSBhc3BlY3QuYmVmb3JlIHdoZW4gaXQgaXMgYXZhaWxhYmxlLlxuXHRyZXR1cm4gaGFzKCdtaWNyb3Rhc2tzJylcblx0XHQ/IHF1ZXVlQW5pbWF0aW9uVGFza1xuXHRcdDogZnVuY3Rpb24oY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KTogSGFuZGxlIHtcblx0XHRcdFx0Y2hlY2tNaWNyb1Rhc2tRdWV1ZSgpO1xuXHRcdFx0XHRyZXR1cm4gcXVldWVBbmltYXRpb25UYXNrKGNhbGxiYWNrKTtcblx0XHQgIH07XG59KSgpO1xuXG4vKipcbiAqIFNjaGVkdWxlcyBhIGNhbGxiYWNrIHRvIHRoZSBtaWNyb3Rhc2sgcXVldWUuXG4gKlxuICogQW55IGNhbGxiYWNrcyByZWdpc3RlcmVkIHdpdGggYHF1ZXVlTWljcm9UYXNrYCB3aWxsIGJlIGV4ZWN1dGVkIGJlZm9yZSB0aGUgbmV4dCBtYWNyb3Rhc2suIElmIG5vIG5hdGl2ZVxuICogbWVjaGFuaXNtIGZvciBzY2hlZHVsaW5nIG1hY3JvdGFza3MgaXMgZXhwb3NlZCwgdGhlbiBhbnkgY2FsbGJhY2tzIHdpbGwgYmUgZmlyZWQgYmVmb3JlIGFueSBtYWNyb3Rhc2tcbiAqIHJlZ2lzdGVyZWQgd2l0aCBgcXVldWVUYXNrYCBvciBgcXVldWVBbmltYXRpb25UYXNrYC5cbiAqXG4gKiBAcGFyYW0gY2FsbGJhY2sgdGhlIGZ1bmN0aW9uIHRvIGJlIHF1ZXVlZCBhbmQgbGF0ZXIgZXhlY3V0ZWQuXG4gKiBAcmV0dXJucyBBbiBvYmplY3Qgd2l0aCBhIGBkZXN0cm95YCBtZXRob2QgdGhhdCwgd2hlbiBjYWxsZWQsIHByZXZlbnRzIHRoZSByZWdpc3RlcmVkIGNhbGxiYWNrIGZyb20gZXhlY3V0aW5nLlxuICovXG5leHBvcnQgbGV0IHF1ZXVlTWljcm9UYXNrID0gKGZ1bmN0aW9uKCkge1xuXHRsZXQgZW5xdWV1ZTogKGl0ZW06IFF1ZXVlSXRlbSkgPT4gdm9pZDtcblxuXHRpZiAoaGFzKCdob3N0LW5vZGUnKSkge1xuXHRcdGVucXVldWUgPSBmdW5jdGlvbihpdGVtOiBRdWV1ZUl0ZW0pOiB2b2lkIHtcblx0XHRcdGdsb2JhbC5wcm9jZXNzLm5leHRUaWNrKGV4ZWN1dGVUYXNrLmJpbmQobnVsbCwgaXRlbSkpO1xuXHRcdH07XG5cdH0gZWxzZSBpZiAoaGFzKCdlczYtcHJvbWlzZScpKSB7XG5cdFx0ZW5xdWV1ZSA9IGZ1bmN0aW9uKGl0ZW06IFF1ZXVlSXRlbSk6IHZvaWQge1xuXHRcdFx0Z2xvYmFsLlByb21pc2UucmVzb2x2ZShpdGVtKS50aGVuKGV4ZWN1dGVUYXNrKTtcblx0XHR9O1xuXHR9IGVsc2UgaWYgKGhhcygnZG9tLW11dGF0aW9ub2JzZXJ2ZXInKSkge1xuXHRcdC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lICovXG5cdFx0Y29uc3QgSG9zdE11dGF0aW9uT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcblx0XHRjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0Y29uc3QgcXVldWU6IFF1ZXVlSXRlbVtdID0gW107XG5cdFx0Y29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSG9zdE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24oKTogdm9pZCB7XG5cdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRjb25zdCBpdGVtID0gcXVldWUuc2hpZnQoKTtcblx0XHRcdFx0aWYgKGl0ZW0gJiYgaXRlbS5pc0FjdGl2ZSAmJiBpdGVtLmNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0aXRlbS5jYWxsYmFjaygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRvYnNlcnZlci5vYnNlcnZlKG5vZGUsIHsgYXR0cmlidXRlczogdHJ1ZSB9KTtcblxuXHRcdGVucXVldWUgPSBmdW5jdGlvbihpdGVtOiBRdWV1ZUl0ZW0pOiB2b2lkIHtcblx0XHRcdHF1ZXVlLnB1c2goaXRlbSk7XG5cdFx0XHRub2RlLnNldEF0dHJpYnV0ZSgncXVldWVTdGF0dXMnLCAnMScpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0ZW5xdWV1ZSA9IGZ1bmN0aW9uKGl0ZW06IFF1ZXVlSXRlbSk6IHZvaWQge1xuXHRcdFx0Y2hlY2tNaWNyb1Rhc2tRdWV1ZSgpO1xuXHRcdFx0bWljcm9UYXNrcy5wdXNoKGl0ZW0pO1xuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4gZnVuY3Rpb24oY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KTogSGFuZGxlIHtcblx0XHRjb25zdCBpdGVtOiBRdWV1ZUl0ZW0gPSB7XG5cdFx0XHRpc0FjdGl2ZTogdHJ1ZSxcblx0XHRcdGNhbGxiYWNrOiBjYWxsYmFja1xuXHRcdH07XG5cblx0XHRlbnF1ZXVlKGl0ZW0pO1xuXG5cdFx0cmV0dXJuIGdldFF1ZXVlSGFuZGxlKGl0ZW0pO1xuXHR9O1xufSkoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBxdWV1ZS50cyIsIi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgdmFsdWUgcHJvcGVydHkgZGVzY3JpcHRvclxuICpcbiAqIEBwYXJhbSB2YWx1ZSAgICAgICAgVGhlIHZhbHVlIHRoZSBwcm9wZXJ0eSBkZXNjcmlwdG9yIHNob3VsZCBiZSBzZXQgdG9cbiAqIEBwYXJhbSBlbnVtZXJhYmxlICAgSWYgdGhlIHByb3BlcnR5IHNob3VsZCBiZSBlbnVtYmVyYWJsZSwgZGVmYXVsdHMgdG8gZmFsc2VcbiAqIEBwYXJhbSB3cml0YWJsZSAgICAgSWYgdGhlIHByb3BlcnR5IHNob3VsZCBiZSB3cml0YWJsZSwgZGVmYXVsdHMgdG8gdHJ1ZVxuICogQHBhcmFtIGNvbmZpZ3VyYWJsZSBJZiB0aGUgcHJvcGVydHkgc2hvdWxkIGJlIGNvbmZpZ3VyYWJsZSwgZGVmYXVsdHMgdG8gdHJ1ZVxuICogQHJldHVybiAgICAgICAgICAgICBUaGUgcHJvcGVydHkgZGVzY3JpcHRvciBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlRGVzY3JpcHRvcjxUPihcblx0dmFsdWU6IFQsXG5cdGVudW1lcmFibGU6IGJvb2xlYW4gPSBmYWxzZSxcblx0d3JpdGFibGU6IGJvb2xlYW4gPSB0cnVlLFxuXHRjb25maWd1cmFibGU6IGJvb2xlYW4gPSB0cnVlXG4pOiBUeXBlZFByb3BlcnR5RGVzY3JpcHRvcjxUPiB7XG5cdHJldHVybiB7XG5cdFx0dmFsdWU6IHZhbHVlLFxuXHRcdGVudW1lcmFibGU6IGVudW1lcmFibGUsXG5cdFx0d3JpdGFibGU6IHdyaXRhYmxlLFxuXHRcdGNvbmZpZ3VyYWJsZTogY29uZmlndXJhYmxlXG5cdH07XG59XG5cbi8qKlxuICogQSBoZWxwZXIgZnVuY3Rpb24gd2hpY2ggd3JhcHMgYSBmdW5jdGlvbiB3aGVyZSB0aGUgZmlyc3QgYXJndW1lbnQgYmVjb21lcyB0aGUgc2NvcGVcbiAqIG9mIHRoZSBjYWxsXG4gKlxuICogQHBhcmFtIG5hdGl2ZUZ1bmN0aW9uIFRoZSBzb3VyY2UgZnVuY3Rpb24gdG8gYmUgd3JhcHBlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gd3JhcE5hdGl2ZTxULCBVLCBSPihuYXRpdmVGdW5jdGlvbjogKGFyZzE6IFUpID0+IFIpOiAodGFyZ2V0OiBULCBhcmcxOiBVKSA9PiBSO1xuZXhwb3J0IGZ1bmN0aW9uIHdyYXBOYXRpdmU8VCwgVSwgViwgUj4obmF0aXZlRnVuY3Rpb246IChhcmcxOiBVLCBhcmcyOiBWKSA9PiBSKTogKHRhcmdldDogVCwgYXJnMTogVSwgYXJnMjogVikgPT4gUjtcbmV4cG9ydCBmdW5jdGlvbiB3cmFwTmF0aXZlPFQsIFUsIFYsIFcsIFI+KFxuXHRuYXRpdmVGdW5jdGlvbjogKGFyZzE6IFUsIGFyZzI6IFYsIGFyZzM6IFcpID0+IFJcbik6ICh0YXJnZXQ6IFQsIGFyZzE6IFUsIGFyZzI6IFYsIGFyZzM6IFcpID0+IFI7XG5leHBvcnQgZnVuY3Rpb24gd3JhcE5hdGl2ZTxULCBVLCBWLCBXLCBYLCBSPihcblx0bmF0aXZlRnVuY3Rpb246IChhcmcxOiBVLCBhcmcyOiBWLCBhcmczOiBXKSA9PiBSXG4pOiAodGFyZ2V0OiBULCBhcmcxOiBVLCBhcmcyOiBWLCBhcmczOiBXKSA9PiBSO1xuZXhwb3J0IGZ1bmN0aW9uIHdyYXBOYXRpdmU8VCwgVSwgViwgVywgWCwgWSwgUj4oXG5cdG5hdGl2ZUZ1bmN0aW9uOiAoYXJnMTogVSwgYXJnMjogViwgYXJnMzogVywgYXJnNDogWSkgPT4gUlxuKTogKHRhcmdldDogVCwgYXJnMTogVSwgYXJnMjogViwgYXJnMzogVywgYXJnNDogWSkgPT4gUjtcbmV4cG9ydCBmdW5jdGlvbiB3cmFwTmF0aXZlKG5hdGl2ZUZ1bmN0aW9uOiAoLi4uYXJnczogYW55W10pID0+IGFueSk6ICh0YXJnZXQ6IGFueSwgLi4uYXJnczogYW55W10pID0+IGFueSB7XG5cdHJldHVybiBmdW5jdGlvbih0YXJnZXQ6IGFueSwgLi4uYXJnczogYW55W10pOiBhbnkge1xuXHRcdHJldHVybiBuYXRpdmVGdW5jdGlvbi5hcHBseSh0YXJnZXQsIGFyZ3MpO1xuXHR9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHV0aWwudHMiLCJpbXBvcnQgeyBFdmVudGVkIH0gZnJvbSAnLi4vY29yZS9FdmVudGVkJztcbmltcG9ydCB7IEV2ZW50T2JqZWN0IH0gZnJvbSAnLi4vY29yZS9pbnRlcmZhY2VzJztcbmltcG9ydCBNYXAgZnJvbSAnLi4vc2hpbS9NYXAnO1xuaW1wb3J0IHsgTm9kZUhhbmRsZXJJbnRlcmZhY2UgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG4vKipcbiAqIEVudW0gdG8gaWRlbnRpZnkgdGhlIHR5cGUgb2YgZXZlbnQuXG4gKiBMaXN0ZW5pbmcgdG8gJ1Byb2plY3Rvcicgd2lsbCBub3RpZnkgd2hlbiBwcm9qZWN0b3IgaXMgY3JlYXRlZCBvciB1cGRhdGVkXG4gKiBMaXN0ZW5pbmcgdG8gJ1dpZGdldCcgd2lsbCBub3RpZnkgd2hlbiB3aWRnZXQgcm9vdCBpcyBjcmVhdGVkIG9yIHVwZGF0ZWRcbiAqL1xuZXhwb3J0IGVudW0gTm9kZUV2ZW50VHlwZSB7XG5cdFByb2plY3RvciA9ICdQcm9qZWN0b3InLFxuXHRXaWRnZXQgPSAnV2lkZ2V0J1xufVxuXG5leHBvcnQgdHlwZSBOb2RlSGFuZGxlckV2ZW50TWFwID0ge1xuXHRQcm9qZWN0b3I6IEV2ZW50T2JqZWN0PE5vZGVFdmVudFR5cGUuUHJvamVjdG9yPjtcblx0V2lkZ2V0OiBFdmVudE9iamVjdDxOb2RlRXZlbnRUeXBlLldpZGdldD47XG59O1xuXG5leHBvcnQgY2xhc3MgTm9kZUhhbmRsZXIgZXh0ZW5kcyBFdmVudGVkPE5vZGVIYW5kbGVyRXZlbnRNYXA+IGltcGxlbWVudHMgTm9kZUhhbmRsZXJJbnRlcmZhY2Uge1xuXHRwcml2YXRlIF9ub2RlTWFwID0gbmV3IE1hcDxzdHJpbmcsIEVsZW1lbnQ+KCk7XG5cblx0cHVibGljIGdldChrZXk6IHN0cmluZyk6IEVsZW1lbnQgfCB1bmRlZmluZWQge1xuXHRcdHJldHVybiB0aGlzLl9ub2RlTWFwLmdldChrZXkpO1xuXHR9XG5cblx0cHVibGljIGhhcyhrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9ub2RlTWFwLmhhcyhrZXkpO1xuXHR9XG5cblx0cHVibGljIGFkZChlbGVtZW50OiBFbGVtZW50LCBrZXk6IHN0cmluZyk6IHZvaWQge1xuXHRcdHRoaXMuX25vZGVNYXAuc2V0KGtleSwgZWxlbWVudCk7XG5cdFx0dGhpcy5lbWl0KHsgdHlwZToga2V5IH0pO1xuXHR9XG5cblx0cHVibGljIGFkZFJvb3QoKTogdm9pZCB7XG5cdFx0dGhpcy5lbWl0KHsgdHlwZTogTm9kZUV2ZW50VHlwZS5XaWRnZXQgfSk7XG5cdH1cblxuXHRwdWJsaWMgYWRkUHJvamVjdG9yKCk6IHZvaWQge1xuXHRcdHRoaXMuZW1pdCh7IHR5cGU6IE5vZGVFdmVudFR5cGUuUHJvamVjdG9yIH0pO1xuXHR9XG5cblx0cHVibGljIGNsZWFyKCk6IHZvaWQge1xuXHRcdHRoaXMuX25vZGVNYXAuY2xlYXIoKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBOb2RlSGFuZGxlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBOb2RlSGFuZGxlci50cyIsImltcG9ydCBQcm9taXNlIGZyb20gJy4uL3NoaW0vUHJvbWlzZSc7XG5pbXBvcnQgTWFwIGZyb20gJy4uL3NoaW0vTWFwJztcbmltcG9ydCBTeW1ib2wgZnJvbSAnLi4vc2hpbS9TeW1ib2wnO1xuaW1wb3J0IHsgRXZlbnRPYmplY3QgfSBmcm9tICcuLi9jb3JlL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgRXZlbnRlZCB9IGZyb20gJy4uL2NvcmUvRXZlbnRlZCc7XG5pbXBvcnQge1xuXHRDb25zdHJ1Y3Rvcixcblx0SW5qZWN0b3JGYWN0b3J5LFxuXHRJbmplY3Rvckl0ZW0sXG5cdFJlZ2lzdHJ5TGFiZWwsXG5cdFdpZGdldEJhc2VDb25zdHJ1Y3Rvcixcblx0V2lkZ2V0QmFzZUludGVyZmFjZVxufSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5leHBvcnQgdHlwZSBXaWRnZXRCYXNlQ29uc3RydWN0b3JGdW5jdGlvbiA9ICgpID0+IFByb21pc2U8V2lkZ2V0QmFzZUNvbnN0cnVjdG9yPjtcblxuZXhwb3J0IHR5cGUgRVNNRGVmYXVsdFdpZGdldEJhc2VGdW5jdGlvbiA9ICgpID0+IFByb21pc2U8RVNNRGVmYXVsdFdpZGdldEJhc2U8V2lkZ2V0QmFzZUludGVyZmFjZT4+O1xuXG5leHBvcnQgdHlwZSBSZWdpc3RyeUl0ZW0gPVxuXHR8IFdpZGdldEJhc2VDb25zdHJ1Y3RvclxuXHR8IFByb21pc2U8V2lkZ2V0QmFzZUNvbnN0cnVjdG9yPlxuXHR8IFdpZGdldEJhc2VDb25zdHJ1Y3RvckZ1bmN0aW9uXG5cdHwgRVNNRGVmYXVsdFdpZGdldEJhc2VGdW5jdGlvbjtcblxuLyoqXG4gKiBXaWRnZXQgYmFzZSBzeW1ib2wgdHlwZVxuICovXG5leHBvcnQgY29uc3QgV0lER0VUX0JBU0VfVFlQRSA9IFN5bWJvbCgnV2lkZ2V0IEJhc2UnKTtcblxuZXhwb3J0IGludGVyZmFjZSBSZWdpc3RyeUV2ZW50T2JqZWN0IGV4dGVuZHMgRXZlbnRPYmplY3Q8UmVnaXN0cnlMYWJlbD4ge1xuXHRhY3Rpb246IHN0cmluZztcblx0aXRlbTogV2lkZ2V0QmFzZUNvbnN0cnVjdG9yIHwgSW5qZWN0b3JGYWN0b3J5O1xufVxuLyoqXG4gKiBXaWRnZXQgUmVnaXN0cnkgSW50ZXJmYWNlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVnaXN0cnlJbnRlcmZhY2Uge1xuXHQvKipcblx0ICogRGVmaW5lIGEgV2lkZ2V0UmVnaXN0cnlJdGVtIGFnYWluc3QgYSBsYWJlbFxuXHQgKlxuXHQgKiBAcGFyYW0gbGFiZWwgVGhlIGxhYmVsIG9mIHRoZSB3aWRnZXQgdG8gcmVnaXN0ZXJcblx0ICogQHBhcmFtIHJlZ2lzdHJ5SXRlbSBUaGUgcmVnaXN0cnkgaXRlbSB0byBkZWZpbmVcblx0ICovXG5cdGRlZmluZShsYWJlbDogUmVnaXN0cnlMYWJlbCwgcmVnaXN0cnlJdGVtOiBSZWdpc3RyeUl0ZW0pOiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm4gYSBSZWdpc3RyeUl0ZW0gZm9yIHRoZSBnaXZlbiBsYWJlbCwgbnVsbCBpZiBhbiBlbnRyeSBkb2Vzbid0IGV4aXN0XG5cdCAqXG5cdCAqIEBwYXJhbSB3aWRnZXRMYWJlbCBUaGUgbGFiZWwgb2YgdGhlIHdpZGdldCB0byByZXR1cm5cblx0ICogQHJldHVybnMgVGhlIFJlZ2lzdHJ5SXRlbSBmb3IgdGhlIHdpZGdldExhYmVsLCBgbnVsbGAgaWYgbm8gZW50cnkgZXhpc3RzXG5cdCAqL1xuXHRnZXQ8VCBleHRlbmRzIFdpZGdldEJhc2VJbnRlcmZhY2UgPSBXaWRnZXRCYXNlSW50ZXJmYWNlPihsYWJlbDogUmVnaXN0cnlMYWJlbCk6IENvbnN0cnVjdG9yPFQ+IHwgbnVsbDtcblxuXHQvKipcblx0ICogUmV0dXJucyBhIGJvb2xlYW4gaWYgYW4gZW50cnkgZm9yIHRoZSBsYWJlbCBleGlzdHNcblx0ICpcblx0ICogQHBhcmFtIHdpZGdldExhYmVsIFRoZSBsYWJlbCB0byBzZWFyY2ggZm9yXG5cdCAqIEByZXR1cm5zIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBhIHdpZGdldCByZWdpc3RyeSBpdGVtIGV4aXN0c1xuXHQgKi9cblx0aGFzKGxhYmVsOiBSZWdpc3RyeUxhYmVsKTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRGVmaW5lIGFuIEluamVjdG9yIGFnYWluc3QgYSBsYWJlbFxuXHQgKlxuXHQgKiBAcGFyYW0gbGFiZWwgVGhlIGxhYmVsIG9mIHRoZSBpbmplY3RvciB0byByZWdpc3RlclxuXHQgKiBAcGFyYW0gcmVnaXN0cnlJdGVtIFRoZSBpbmplY3RvciBmYWN0b3J5XG5cdCAqL1xuXHRkZWZpbmVJbmplY3RvcihsYWJlbDogUmVnaXN0cnlMYWJlbCwgaW5qZWN0b3JGYWN0b3J5OiBJbmplY3RvckZhY3RvcnkpOiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm4gYW4gSW5qZWN0b3IgcmVnaXN0cnkgaXRlbSBmb3IgdGhlIGdpdmVuIGxhYmVsLCBudWxsIGlmIGFuIGVudHJ5IGRvZXNuJ3QgZXhpc3Rcblx0ICpcblx0ICogQHBhcmFtIGxhYmVsIFRoZSBsYWJlbCBvZiB0aGUgaW5qZWN0b3IgdG8gcmV0dXJuXG5cdCAqIEByZXR1cm5zIFRoZSBSZWdpc3RyeUl0ZW0gZm9yIHRoZSB3aWRnZXRMYWJlbCwgYG51bGxgIGlmIG5vIGVudHJ5IGV4aXN0c1xuXHQgKi9cblx0Z2V0SW5qZWN0b3I8VD4obGFiZWw6IFJlZ2lzdHJ5TGFiZWwpOiBJbmplY3Rvckl0ZW08VD4gfCBudWxsO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgYm9vbGVhbiBpZiBhbiBpbmplY3RvciBmb3IgdGhlIGxhYmVsIGV4aXN0c1xuXHQgKlxuXHQgKiBAcGFyYW0gd2lkZ2V0TGFiZWwgVGhlIGxhYmVsIHRvIHNlYXJjaCBmb3Jcblx0ICogQHJldHVybnMgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGEgaW5qZWN0b3IgcmVnaXN0cnkgaXRlbSBleGlzdHNcblx0ICovXG5cdGhhc0luamVjdG9yKGxhYmVsOiBSZWdpc3RyeUxhYmVsKTogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaXMgdGhlIGl0ZW0gaXMgYSBzdWJjbGFzcyBvZiBXaWRnZXRCYXNlIChvciBhIFdpZGdldEJhc2UpXG4gKlxuICogQHBhcmFtIGl0ZW0gdGhlIGl0ZW0gdG8gY2hlY2tcbiAqIEByZXR1cm5zIHRydWUvZmFsc2UgaW5kaWNhdGluZyBpZiB0aGUgaXRlbSBpcyBhIFdpZGdldEJhc2VDb25zdHJ1Y3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNXaWRnZXRCYXNlQ29uc3RydWN0b3I8VCBleHRlbmRzIFdpZGdldEJhc2VJbnRlcmZhY2U+KGl0ZW06IGFueSk6IGl0ZW0gaXMgQ29uc3RydWN0b3I8VD4ge1xuXHRyZXR1cm4gQm9vbGVhbihpdGVtICYmIGl0ZW0uX3R5cGUgPT09IFdJREdFVF9CQVNFX1RZUEUpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVTTURlZmF1bHRXaWRnZXRCYXNlPFQ+IHtcblx0ZGVmYXVsdDogQ29uc3RydWN0b3I8VD47XG5cdF9fZXNNb2R1bGU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNXaWRnZXRDb25zdHJ1Y3RvckRlZmF1bHRFeHBvcnQ8VD4oaXRlbTogYW55KTogaXRlbSBpcyBFU01EZWZhdWx0V2lkZ2V0QmFzZTxUPiB7XG5cdHJldHVybiBCb29sZWFuKFxuXHRcdGl0ZW0gJiZcblx0XHRcdGl0ZW0uaGFzT3duUHJvcGVydHkoJ19fZXNNb2R1bGUnKSAmJlxuXHRcdFx0aXRlbS5oYXNPd25Qcm9wZXJ0eSgnZGVmYXVsdCcpICYmXG5cdFx0XHRpc1dpZGdldEJhc2VDb25zdHJ1Y3RvcihpdGVtLmRlZmF1bHQpXG5cdCk7XG59XG5cbi8qKlxuICogVGhlIFJlZ2lzdHJ5IGltcGxlbWVudGF0aW9uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWdpc3RyeSBleHRlbmRzIEV2ZW50ZWQ8e30sIFJlZ2lzdHJ5TGFiZWwsIFJlZ2lzdHJ5RXZlbnRPYmplY3Q+IGltcGxlbWVudHMgUmVnaXN0cnlJbnRlcmZhY2Uge1xuXHQvKipcblx0ICogaW50ZXJuYWwgbWFwIG9mIGxhYmVscyBhbmQgUmVnaXN0cnlJdGVtXG5cdCAqL1xuXHRwcml2YXRlIF93aWRnZXRSZWdpc3RyeTogTWFwPFJlZ2lzdHJ5TGFiZWwsIFJlZ2lzdHJ5SXRlbT4gfCB1bmRlZmluZWQ7XG5cblx0cHJpdmF0ZSBfaW5qZWN0b3JSZWdpc3RyeTogTWFwPFJlZ2lzdHJ5TGFiZWwsIEluamVjdG9ySXRlbT4gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEVtaXQgbG9hZGVkIGV2ZW50IGZvciByZWdpc3RyeSBsYWJlbFxuXHQgKi9cblx0cHJpdmF0ZSBlbWl0TG9hZGVkRXZlbnQod2lkZ2V0TGFiZWw6IFJlZ2lzdHJ5TGFiZWwsIGl0ZW06IFdpZGdldEJhc2VDb25zdHJ1Y3RvciB8IEluamVjdG9ySXRlbSk6IHZvaWQge1xuXHRcdHRoaXMuZW1pdCh7XG5cdFx0XHR0eXBlOiB3aWRnZXRMYWJlbCxcblx0XHRcdGFjdGlvbjogJ2xvYWRlZCcsXG5cdFx0XHRpdGVtXG5cdFx0fSk7XG5cdH1cblxuXHRwdWJsaWMgZGVmaW5lKGxhYmVsOiBSZWdpc3RyeUxhYmVsLCBpdGVtOiBSZWdpc3RyeUl0ZW0pOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fd2lkZ2V0UmVnaXN0cnkgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5fd2lkZ2V0UmVnaXN0cnkgPSBuZXcgTWFwKCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3dpZGdldFJlZ2lzdHJ5LmhhcyhsYWJlbCkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgd2lkZ2V0IGhhcyBhbHJlYWR5IGJlZW4gcmVnaXN0ZXJlZCBmb3IgJyR7bGFiZWwudG9TdHJpbmcoKX0nYCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fd2lkZ2V0UmVnaXN0cnkuc2V0KGxhYmVsLCBpdGVtKTtcblxuXHRcdGlmIChpdGVtIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuXHRcdFx0aXRlbS50aGVuKFxuXHRcdFx0XHQod2lkZ2V0Q3RvcikgPT4ge1xuXHRcdFx0XHRcdHRoaXMuX3dpZGdldFJlZ2lzdHJ5IS5zZXQobGFiZWwsIHdpZGdldEN0b3IpO1xuXHRcdFx0XHRcdHRoaXMuZW1pdExvYWRlZEV2ZW50KGxhYmVsLCB3aWRnZXRDdG9yKTtcblx0XHRcdFx0XHRyZXR1cm4gd2lkZ2V0Q3Rvcjtcblx0XHRcdFx0fSxcblx0XHRcdFx0KGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChpc1dpZGdldEJhc2VDb25zdHJ1Y3RvcihpdGVtKSkge1xuXHRcdFx0dGhpcy5lbWl0TG9hZGVkRXZlbnQobGFiZWwsIGl0ZW0pO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBkZWZpbmVJbmplY3RvcihsYWJlbDogUmVnaXN0cnlMYWJlbCwgaW5qZWN0b3JGYWN0b3J5OiBJbmplY3RvckZhY3RvcnkpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5faW5qZWN0b3JSZWdpc3RyeSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9pbmplY3RvclJlZ2lzdHJ5ID0gbmV3IE1hcCgpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9pbmplY3RvclJlZ2lzdHJ5LmhhcyhsYWJlbCkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgaW5qZWN0b3IgaGFzIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkIGZvciAnJHtsYWJlbC50b1N0cmluZygpfSdgKTtcblx0XHR9XG5cblx0XHRjb25zdCBpbnZhbGlkYXRvciA9IG5ldyBFdmVudGVkKCk7XG5cblx0XHRjb25zdCBpbmplY3Rvckl0ZW06IEluamVjdG9ySXRlbSA9IHtcblx0XHRcdGluamVjdG9yOiBpbmplY3RvckZhY3RvcnkoKCkgPT4gaW52YWxpZGF0b3IuZW1pdCh7IHR5cGU6ICdpbnZhbGlkYXRlJyB9KSksXG5cdFx0XHRpbnZhbGlkYXRvclxuXHRcdH07XG5cblx0XHR0aGlzLl9pbmplY3RvclJlZ2lzdHJ5LnNldChsYWJlbCwgaW5qZWN0b3JJdGVtKTtcblx0XHR0aGlzLmVtaXRMb2FkZWRFdmVudChsYWJlbCwgaW5qZWN0b3JJdGVtKTtcblx0fVxuXG5cdHB1YmxpYyBnZXQ8VCBleHRlbmRzIFdpZGdldEJhc2VJbnRlcmZhY2UgPSBXaWRnZXRCYXNlSW50ZXJmYWNlPihsYWJlbDogUmVnaXN0cnlMYWJlbCk6IENvbnN0cnVjdG9yPFQ+IHwgbnVsbCB7XG5cdFx0aWYgKCF0aGlzLl93aWRnZXRSZWdpc3RyeSB8fCAhdGhpcy5oYXMobGFiZWwpKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRjb25zdCBpdGVtID0gdGhpcy5fd2lkZ2V0UmVnaXN0cnkuZ2V0KGxhYmVsKTtcblxuXHRcdGlmIChpc1dpZGdldEJhc2VDb25zdHJ1Y3RvcjxUPihpdGVtKSkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXG5cdFx0aWYgKGl0ZW0gaW5zdGFuY2VvZiBQcm9taXNlKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRjb25zdCBwcm9taXNlID0gKDxXaWRnZXRCYXNlQ29uc3RydWN0b3JGdW5jdGlvbj5pdGVtKSgpO1xuXHRcdHRoaXMuX3dpZGdldFJlZ2lzdHJ5LnNldChsYWJlbCwgcHJvbWlzZSk7XG5cblx0XHRwcm9taXNlLnRoZW4oXG5cdFx0XHQod2lkZ2V0Q3RvcikgPT4ge1xuXHRcdFx0XHRpZiAoaXNXaWRnZXRDb25zdHJ1Y3RvckRlZmF1bHRFeHBvcnQ8VD4od2lkZ2V0Q3RvcikpIHtcblx0XHRcdFx0XHR3aWRnZXRDdG9yID0gd2lkZ2V0Q3Rvci5kZWZhdWx0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fd2lkZ2V0UmVnaXN0cnkhLnNldChsYWJlbCwgd2lkZ2V0Q3Rvcik7XG5cdFx0XHRcdHRoaXMuZW1pdExvYWRlZEV2ZW50KGxhYmVsLCB3aWRnZXRDdG9yKTtcblx0XHRcdFx0cmV0dXJuIHdpZGdldEN0b3I7XG5cdFx0XHR9LFxuXHRcdFx0KGVycm9yKSA9PiB7XG5cdFx0XHRcdHRocm93IGVycm9yO1xuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHB1YmxpYyBnZXRJbmplY3RvcjxUPihsYWJlbDogUmVnaXN0cnlMYWJlbCk6IEluamVjdG9ySXRlbTxUPiB8IG51bGwge1xuXHRcdGlmICghdGhpcy5faW5qZWN0b3JSZWdpc3RyeSB8fCAhdGhpcy5oYXNJbmplY3RvcihsYWJlbCkpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLl9pbmplY3RvclJlZ2lzdHJ5LmdldChsYWJlbCkhO1xuXHR9XG5cblx0cHVibGljIGhhcyhsYWJlbDogUmVnaXN0cnlMYWJlbCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiBCb29sZWFuKHRoaXMuX3dpZGdldFJlZ2lzdHJ5ICYmIHRoaXMuX3dpZGdldFJlZ2lzdHJ5LmhhcyhsYWJlbCkpO1xuXHR9XG5cblx0cHVibGljIGhhc0luamVjdG9yKGxhYmVsOiBSZWdpc3RyeUxhYmVsKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIEJvb2xlYW4odGhpcy5faW5qZWN0b3JSZWdpc3RyeSAmJiB0aGlzLl9pbmplY3RvclJlZ2lzdHJ5LmhhcyhsYWJlbCkpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlZ2lzdHJ5O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIFJlZ2lzdHJ5LnRzIiwiaW1wb3J0IHsgTWFwIH0gZnJvbSAnLi4vc2hpbS9NYXAnO1xuaW1wb3J0IHsgRXZlbnRlZCB9IGZyb20gJy4uL2NvcmUvRXZlbnRlZCc7XG5pbXBvcnQgeyBFdmVudE9iamVjdCB9IGZyb20gJy4uL2NvcmUvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb25zdHJ1Y3RvciwgSW5qZWN0b3JGYWN0b3J5LCBJbmplY3Rvckl0ZW0sIFJlZ2lzdHJ5TGFiZWwsIFdpZGdldEJhc2VJbnRlcmZhY2UgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgUmVnaXN0cnksIFJlZ2lzdHJ5RXZlbnRPYmplY3QsIFJlZ2lzdHJ5SXRlbSB9IGZyb20gJy4vUmVnaXN0cnknO1xuXG5leHBvcnQgdHlwZSBSZWdpc3RyeUhhbmRsZXJFdmVudE1hcCA9IHtcblx0aW52YWxpZGF0ZTogRXZlbnRPYmplY3Q8J2ludmFsaWRhdGUnPjtcbn07XG5cbmV4cG9ydCBjbGFzcyBSZWdpc3RyeUhhbmRsZXIgZXh0ZW5kcyBFdmVudGVkPFJlZ2lzdHJ5SGFuZGxlckV2ZW50TWFwPiB7XG5cdHByaXZhdGUgX3JlZ2lzdHJ5ID0gbmV3IFJlZ2lzdHJ5KCk7XG5cdHByaXZhdGUgX3JlZ2lzdHJ5V2lkZ2V0TGFiZWxNYXA6IE1hcDxSZWdpc3RyeSwgUmVnaXN0cnlMYWJlbFtdPiA9IG5ldyBNYXAoKTtcblx0cHJpdmF0ZSBfcmVnaXN0cnlJbmplY3RvckxhYmVsTWFwOiBNYXA8UmVnaXN0cnksIFJlZ2lzdHJ5TGFiZWxbXT4gPSBuZXcgTWFwKCk7XG5cdHByb3RlY3RlZCBiYXNlUmVnaXN0cnk/OiBSZWdpc3RyeTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMub3duKHRoaXMuX3JlZ2lzdHJ5KTtcblx0XHRjb25zdCBkZXN0cm95ID0gKCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMuYmFzZVJlZ2lzdHJ5KSB7XG5cdFx0XHRcdHRoaXMuX3JlZ2lzdHJ5V2lkZ2V0TGFiZWxNYXAuZGVsZXRlKHRoaXMuYmFzZVJlZ2lzdHJ5KTtcblx0XHRcdFx0dGhpcy5fcmVnaXN0cnlJbmplY3RvckxhYmVsTWFwLmRlbGV0ZSh0aGlzLmJhc2VSZWdpc3RyeSk7XG5cdFx0XHRcdHRoaXMuYmFzZVJlZ2lzdHJ5ID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0dGhpcy5vd24oeyBkZXN0cm95IH0pO1xuXHR9XG5cblx0cHVibGljIHNldCBiYXNlKGJhc2VSZWdpc3RyeTogUmVnaXN0cnkpIHtcblx0XHRpZiAodGhpcy5iYXNlUmVnaXN0cnkpIHtcblx0XHRcdHRoaXMuX3JlZ2lzdHJ5V2lkZ2V0TGFiZWxNYXAuZGVsZXRlKHRoaXMuYmFzZVJlZ2lzdHJ5KTtcblx0XHRcdHRoaXMuX3JlZ2lzdHJ5SW5qZWN0b3JMYWJlbE1hcC5kZWxldGUodGhpcy5iYXNlUmVnaXN0cnkpO1xuXHRcdH1cblx0XHR0aGlzLmJhc2VSZWdpc3RyeSA9IGJhc2VSZWdpc3RyeTtcblx0fVxuXG5cdHB1YmxpYyBkZWZpbmUobGFiZWw6IFJlZ2lzdHJ5TGFiZWwsIHdpZGdldDogUmVnaXN0cnlJdGVtKTogdm9pZCB7XG5cdFx0dGhpcy5fcmVnaXN0cnkuZGVmaW5lKGxhYmVsLCB3aWRnZXQpO1xuXHR9XG5cblx0cHVibGljIGRlZmluZUluamVjdG9yKGxhYmVsOiBSZWdpc3RyeUxhYmVsLCBpbmplY3RvcjogSW5qZWN0b3JGYWN0b3J5KTogdm9pZCB7XG5cdFx0dGhpcy5fcmVnaXN0cnkuZGVmaW5lSW5qZWN0b3IobGFiZWwsIGluamVjdG9yKTtcblx0fVxuXG5cdHB1YmxpYyBoYXMobGFiZWw6IFJlZ2lzdHJ5TGFiZWwpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fcmVnaXN0cnkuaGFzKGxhYmVsKSB8fCBCb29sZWFuKHRoaXMuYmFzZVJlZ2lzdHJ5ICYmIHRoaXMuYmFzZVJlZ2lzdHJ5LmhhcyhsYWJlbCkpO1xuXHR9XG5cblx0cHVibGljIGhhc0luamVjdG9yKGxhYmVsOiBSZWdpc3RyeUxhYmVsKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX3JlZ2lzdHJ5Lmhhc0luamVjdG9yKGxhYmVsKSB8fCBCb29sZWFuKHRoaXMuYmFzZVJlZ2lzdHJ5ICYmIHRoaXMuYmFzZVJlZ2lzdHJ5Lmhhc0luamVjdG9yKGxhYmVsKSk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0PFQgZXh0ZW5kcyBXaWRnZXRCYXNlSW50ZXJmYWNlID0gV2lkZ2V0QmFzZUludGVyZmFjZT4oXG5cdFx0bGFiZWw6IFJlZ2lzdHJ5TGFiZWwsXG5cdFx0Z2xvYmFsUHJlY2VkZW5jZTogYm9vbGVhbiA9IGZhbHNlXG5cdCk6IENvbnN0cnVjdG9yPFQ+IHwgbnVsbCB7XG5cdFx0cmV0dXJuIHRoaXMuX2dldChsYWJlbCwgZ2xvYmFsUHJlY2VkZW5jZSwgJ2dldCcsIHRoaXMuX3JlZ2lzdHJ5V2lkZ2V0TGFiZWxNYXApO1xuXHR9XG5cblx0cHVibGljIGdldEluamVjdG9yPFQ+KGxhYmVsOiBSZWdpc3RyeUxhYmVsLCBnbG9iYWxQcmVjZWRlbmNlOiBib29sZWFuID0gZmFsc2UpOiBJbmplY3Rvckl0ZW08VD4gfCBudWxsIHtcblx0XHRyZXR1cm4gdGhpcy5fZ2V0KGxhYmVsLCBnbG9iYWxQcmVjZWRlbmNlLCAnZ2V0SW5qZWN0b3InLCB0aGlzLl9yZWdpc3RyeUluamVjdG9yTGFiZWxNYXApO1xuXHR9XG5cblx0cHJpdmF0ZSBfZ2V0KFxuXHRcdGxhYmVsOiBSZWdpc3RyeUxhYmVsLFxuXHRcdGdsb2JhbFByZWNlZGVuY2U6IGJvb2xlYW4sXG5cdFx0Z2V0RnVuY3Rpb25OYW1lOiAnZ2V0SW5qZWN0b3InIHwgJ2dldCcsXG5cdFx0bGFiZWxNYXA6IE1hcDxSZWdpc3RyeSwgUmVnaXN0cnlMYWJlbFtdPlxuXHQpOiBhbnkge1xuXHRcdGNvbnN0IHJlZ2lzdHJpZXMgPSBnbG9iYWxQcmVjZWRlbmNlID8gW3RoaXMuYmFzZVJlZ2lzdHJ5LCB0aGlzLl9yZWdpc3RyeV0gOiBbdGhpcy5fcmVnaXN0cnksIHRoaXMuYmFzZVJlZ2lzdHJ5XTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlZ2lzdHJpZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IHJlZ2lzdHJ5OiBhbnkgPSByZWdpc3RyaWVzW2ldO1xuXHRcdFx0aWYgKCFyZWdpc3RyeSkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGl0ZW0gPSByZWdpc3RyeVtnZXRGdW5jdGlvbk5hbWVdKGxhYmVsKTtcblx0XHRcdGNvbnN0IHJlZ2lzdGVyZWRMYWJlbHMgPSBsYWJlbE1hcC5nZXQocmVnaXN0cnkpIHx8IFtdO1xuXHRcdFx0aWYgKGl0ZW0pIHtcblx0XHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0XHR9IGVsc2UgaWYgKHJlZ2lzdGVyZWRMYWJlbHMuaW5kZXhPZihsYWJlbCkgPT09IC0xKSB7XG5cdFx0XHRcdGNvbnN0IGhhbmRsZSA9IHJlZ2lzdHJ5Lm9uKGxhYmVsLCAoZXZlbnQ6IFJlZ2lzdHJ5RXZlbnRPYmplY3QpID0+IHtcblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRldmVudC5hY3Rpb24gPT09ICdsb2FkZWQnICYmXG5cdFx0XHRcdFx0XHQodGhpcyBhcyBhbnkpW2dldEZ1bmN0aW9uTmFtZV0obGFiZWwsIGdsb2JhbFByZWNlZGVuY2UpID09PSBldmVudC5pdGVtXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmVtaXQoeyB0eXBlOiAnaW52YWxpZGF0ZScgfSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy5vd24oaGFuZGxlKTtcblx0XHRcdFx0bGFiZWxNYXAuc2V0KHJlZ2lzdHJ5LCBbLi4ucmVnaXN0ZXJlZExhYmVscywgbGFiZWxdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVnaXN0cnlIYW5kbGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIFJlZ2lzdHJ5SGFuZGxlci50cyIsImltcG9ydCBNYXAgZnJvbSAnLi4vc2hpbS9NYXAnO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLi4vc2hpbS9XZWFrTWFwJztcbmltcG9ydCBTeW1ib2wgZnJvbSAnLi4vc2hpbS9TeW1ib2wnO1xuaW1wb3J0IHsgSGFuZGxlIH0gZnJvbSAnLi4vY29yZS9pbnRlcmZhY2VzJztcbmltcG9ydCB7IHYgfSBmcm9tICcuL2QnO1xuaW1wb3J0IHsgYXV0byB9IGZyb20gJy4vZGlmZic7XG5pbXBvcnQge1xuXHRBZnRlclJlbmRlcixcblx0QmVmb3JlUHJvcGVydGllcyxcblx0QmVmb3JlUmVuZGVyLFxuXHRDb3JlUHJvcGVydGllcyxcblx0RGlmZlByb3BlcnR5UmVhY3Rpb24sXG5cdEROb2RlLFxuXHRSZW5kZXIsXG5cdFdpZGdldE1ldGFCYXNlLFxuXHRXaWRnZXRNZXRhQ29uc3RydWN0b3IsXG5cdFdpZGdldEJhc2VJbnRlcmZhY2UsXG5cdFdpZGdldFByb3BlcnRpZXNcbn0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCBSZWdpc3RyeUhhbmRsZXIgZnJvbSAnLi9SZWdpc3RyeUhhbmRsZXInO1xuaW1wb3J0IE5vZGVIYW5kbGVyIGZyb20gJy4vTm9kZUhhbmRsZXInO1xuaW1wb3J0IHsgd2lkZ2V0SW5zdGFuY2VNYXAgfSBmcm9tICcuL3Zkb20nO1xuaW1wb3J0IHsgaXNXaWRnZXRCYXNlQ29uc3RydWN0b3IsIFdJREdFVF9CQVNFX1RZUEUgfSBmcm9tICcuL1JlZ2lzdHJ5JztcblxuaW50ZXJmYWNlIFJlYWN0aW9uRnVuY3Rpb25Db25maWcge1xuXHRwcm9wZXJ0eU5hbWU6IHN0cmluZztcblx0cmVhY3Rpb246IERpZmZQcm9wZXJ0eVJlYWN0aW9uO1xufVxuXG5leHBvcnQgdHlwZSBCb3VuZEZ1bmN0aW9uRGF0YSA9IHsgYm91bmRGdW5jOiAoLi4uYXJnczogYW55W10pID0+IGFueTsgc2NvcGU6IGFueSB9O1xuXG5jb25zdCBkZWNvcmF0b3JNYXAgPSBuZXcgTWFwPEZ1bmN0aW9uLCBNYXA8c3RyaW5nLCBhbnlbXT4+KCk7XG5jb25zdCBib3VuZEF1dG8gPSBhdXRvLmJpbmQobnVsbCk7XG5cbmV4cG9ydCBjb25zdCBub0JpbmQgPSBTeW1ib2wuZm9yKCdkb2pvTm9CaW5kJyk7XG5cbi8qKlxuICogTWFpbiB3aWRnZXQgYmFzZSBmb3IgYWxsIHdpZGdldHMgdG8gZXh0ZW5kXG4gKi9cbmV4cG9ydCBjbGFzcyBXaWRnZXRCYXNlPFAgPSBXaWRnZXRQcm9wZXJ0aWVzLCBDIGV4dGVuZHMgRE5vZGUgPSBETm9kZT4gaW1wbGVtZW50cyBXaWRnZXRCYXNlSW50ZXJmYWNlPFAsIEM+IHtcblx0LyoqXG5cdCAqIHN0YXRpYyBpZGVudGlmaWVyXG5cdCAqL1xuXHRzdGF0aWMgX3R5cGU6IHN5bWJvbCA9IFdJREdFVF9CQVNFX1RZUEU7XG5cblx0LyoqXG5cdCAqIGNoaWxkcmVuIGFycmF5XG5cdCAqL1xuXHRwcml2YXRlIF9jaGlsZHJlbjogKEMgfCBudWxsKVtdO1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgaWYgaXQgaXMgdGhlIGluaXRpYWwgc2V0IHByb3BlcnRpZXMgY3ljbGVcblx0ICovXG5cdHByaXZhdGUgX2luaXRpYWxQcm9wZXJ0aWVzID0gdHJ1ZTtcblxuXHQvKipcblx0ICogaW50ZXJuYWwgd2lkZ2V0IHByb3BlcnRpZXNcblx0ICovXG5cdHByaXZhdGUgX3Byb3BlcnRpZXM6IFAgJiBXaWRnZXRQcm9wZXJ0aWVzICYgeyBbaW5kZXg6IHN0cmluZ106IGFueSB9O1xuXG5cdC8qKlxuXHQgKiBBcnJheSBvZiBwcm9wZXJ0eSBrZXlzIGNvbnNpZGVyZWQgY2hhbmdlZCBmcm9tIHRoZSBwcmV2aW91cyBzZXQgcHJvcGVydGllc1xuXHQgKi9cblx0cHJpdmF0ZSBfY2hhbmdlZFByb3BlcnR5S2V5czogc3RyaW5nW10gPSBbXTtcblxuXHQvKipcblx0ICogbWFwIG9mIGRlY29yYXRvcnMgdGhhdCBhcmUgYXBwbGllZCB0byB0aGlzIHdpZGdldFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVjb3JhdG9yQ2FjaGU6IE1hcDxzdHJpbmcsIGFueVtdPjtcblxuXHRwcml2YXRlIF9yZWdpc3RyeTogUmVnaXN0cnlIYW5kbGVyIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBNYXAgb2YgZnVuY3Rpb25zIHByb3BlcnRpZXMgZm9yIHRoZSBib3VuZCBmdW5jdGlvblxuXHQgKi9cblx0cHJpdmF0ZSBfYmluZEZ1bmN0aW9uUHJvcGVydHlNYXA6IFdlYWtNYXA8KC4uLmFyZ3M6IGFueVtdKSA9PiBhbnksIEJvdW5kRnVuY3Rpb25EYXRhPiB8IHVuZGVmaW5lZDtcblxuXHRwcml2YXRlIF9tZXRhTWFwOiBNYXA8V2lkZ2V0TWV0YUNvbnN0cnVjdG9yPGFueT4sIFdpZGdldE1ldGFCYXNlPiB8IHVuZGVmaW5lZDtcblxuXHRwcml2YXRlIF9ib3VuZFJlbmRlckZ1bmM6IFJlbmRlcjtcblxuXHRwcml2YXRlIF9ib3VuZEludmFsaWRhdGU6ICgpID0+IHZvaWQ7XG5cblx0cHJpdmF0ZSBfbm9kZUhhbmRsZXI6IE5vZGVIYW5kbGVyID0gbmV3IE5vZGVIYW5kbGVyKCk7XG5cblx0cHJpdmF0ZSBfaGFuZGxlczogSGFuZGxlW10gPSBbXTtcblxuXHQvKipcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLl9jaGlsZHJlbiA9IFtdO1xuXHRcdHRoaXMuX2RlY29yYXRvckNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIGFueVtdPigpO1xuXHRcdHRoaXMuX3Byb3BlcnRpZXMgPSA8UD57fTtcblx0XHR0aGlzLl9ib3VuZFJlbmRlckZ1bmMgPSB0aGlzLnJlbmRlci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuX2JvdW5kSW52YWxpZGF0ZSA9IHRoaXMuaW52YWxpZGF0ZS5iaW5kKHRoaXMpO1xuXG5cdFx0d2lkZ2V0SW5zdGFuY2VNYXAuc2V0KHRoaXMsIHtcblx0XHRcdGRpcnR5OiB0cnVlLFxuXHRcdFx0b25BdHRhY2g6ICgpOiB2b2lkID0+IHtcblx0XHRcdFx0dGhpcy5vbkF0dGFjaCgpO1xuXHRcdFx0fSxcblx0XHRcdG9uRGV0YWNoOiAoKTogdm9pZCA9PiB7XG5cdFx0XHRcdHRoaXMub25EZXRhY2goKTtcblx0XHRcdFx0dGhpcy5kZXN0cm95KCk7XG5cdFx0XHR9LFxuXHRcdFx0bm9kZUhhbmRsZXI6IHRoaXMuX25vZGVIYW5kbGVyLFxuXHRcdFx0cmVnaXN0cnk6ICgpID0+IHtcblx0XHRcdFx0cmV0dXJuIHRoaXMucmVnaXN0cnk7XG5cdFx0XHR9LFxuXHRcdFx0Y29yZVByb3BlcnRpZXM6IHt9IGFzIENvcmVQcm9wZXJ0aWVzLFxuXHRcdFx0cmVuZGVyaW5nOiBmYWxzZSxcblx0XHRcdGlucHV0UHJvcGVydGllczoge31cblx0XHR9KTtcblxuXHRcdHRoaXMuX3J1bkFmdGVyQ29uc3RydWN0b3JzKCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgbWV0YTxUIGV4dGVuZHMgV2lkZ2V0TWV0YUJhc2U+KE1ldGFUeXBlOiBXaWRnZXRNZXRhQ29uc3RydWN0b3I8VD4pOiBUIHtcblx0XHRpZiAodGhpcy5fbWV0YU1hcCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9tZXRhTWFwID0gbmV3IE1hcDxXaWRnZXRNZXRhQ29uc3RydWN0b3I8YW55PiwgV2lkZ2V0TWV0YUJhc2U+KCk7XG5cdFx0fVxuXHRcdGxldCBjYWNoZWQgPSB0aGlzLl9tZXRhTWFwLmdldChNZXRhVHlwZSk7XG5cdFx0aWYgKCFjYWNoZWQpIHtcblx0XHRcdGNhY2hlZCA9IG5ldyBNZXRhVHlwZSh7XG5cdFx0XHRcdGludmFsaWRhdGU6IHRoaXMuX2JvdW5kSW52YWxpZGF0ZSxcblx0XHRcdFx0bm9kZUhhbmRsZXI6IHRoaXMuX25vZGVIYW5kbGVyLFxuXHRcdFx0XHRiaW5kOiB0aGlzXG5cdFx0XHR9KTtcblx0XHRcdHRoaXMub3duKGNhY2hlZCk7XG5cdFx0XHR0aGlzLl9tZXRhTWFwLnNldChNZXRhVHlwZSwgY2FjaGVkKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY2FjaGVkIGFzIFQ7XG5cdH1cblxuXHRwcm90ZWN0ZWQgb25BdHRhY2goKTogdm9pZCB7XG5cdFx0Ly8gRG8gbm90aGluZyBieSBkZWZhdWx0LlxuXHR9XG5cblx0cHJvdGVjdGVkIG9uRGV0YWNoKCk6IHZvaWQge1xuXHRcdC8vIERvIG5vdGhpbmcgYnkgZGVmYXVsdC5cblx0fVxuXG5cdHB1YmxpYyBnZXQgcHJvcGVydGllcygpOiBSZWFkb25seTxQPiAmIFJlYWRvbmx5PFdpZGdldFByb3BlcnRpZXM+IHtcblx0XHRyZXR1cm4gdGhpcy5fcHJvcGVydGllcztcblx0fVxuXG5cdHB1YmxpYyBnZXQgY2hhbmdlZFByb3BlcnR5S2V5cygpOiBzdHJpbmdbXSB7XG5cdFx0cmV0dXJuIFsuLi50aGlzLl9jaGFuZ2VkUHJvcGVydHlLZXlzXTtcblx0fVxuXG5cdHB1YmxpYyBfX3NldENvcmVQcm9wZXJ0aWVzX18oY29yZVByb3BlcnRpZXM6IENvcmVQcm9wZXJ0aWVzKTogdm9pZCB7XG5cdFx0Y29uc3QgeyBiYXNlUmVnaXN0cnkgfSA9IGNvcmVQcm9wZXJ0aWVzO1xuXHRcdGNvbnN0IGluc3RhbmNlRGF0YSA9IHdpZGdldEluc3RhbmNlTWFwLmdldCh0aGlzKSE7XG5cblx0XHRpZiAoaW5zdGFuY2VEYXRhLmNvcmVQcm9wZXJ0aWVzLmJhc2VSZWdpc3RyeSAhPT0gYmFzZVJlZ2lzdHJ5KSB7XG5cdFx0XHRpZiAodGhpcy5fcmVnaXN0cnkgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHR0aGlzLl9yZWdpc3RyeSA9IG5ldyBSZWdpc3RyeUhhbmRsZXIoKTtcblx0XHRcdFx0dGhpcy5vd24odGhpcy5fcmVnaXN0cnkpO1xuXHRcdFx0XHR0aGlzLm93bih0aGlzLl9yZWdpc3RyeS5vbignaW52YWxpZGF0ZScsIHRoaXMuX2JvdW5kSW52YWxpZGF0ZSkpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fcmVnaXN0cnkuYmFzZSA9IGJhc2VSZWdpc3RyeTtcblx0XHRcdHRoaXMuaW52YWxpZGF0ZSgpO1xuXHRcdH1cblx0XHRpbnN0YW5jZURhdGEuY29yZVByb3BlcnRpZXMgPSBjb3JlUHJvcGVydGllcztcblx0fVxuXG5cdHB1YmxpYyBfX3NldFByb3BlcnRpZXNfXyhvcmlnaW5hbFByb3BlcnRpZXM6IHRoaXNbJ3Byb3BlcnRpZXMnXSk6IHZvaWQge1xuXHRcdGNvbnN0IGluc3RhbmNlRGF0YSA9IHdpZGdldEluc3RhbmNlTWFwLmdldCh0aGlzKSE7XG5cdFx0aW5zdGFuY2VEYXRhLmlucHV0UHJvcGVydGllcyA9IG9yaWdpbmFsUHJvcGVydGllcztcblx0XHRjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5fcnVuQmVmb3JlUHJvcGVydGllcyhvcmlnaW5hbFByb3BlcnRpZXMpO1xuXHRcdGNvbnN0IHJlZ2lzdGVyZWREaWZmUHJvcGVydHlOYW1lcyA9IHRoaXMuZ2V0RGVjb3JhdG9yKCdyZWdpc3RlcmVkRGlmZlByb3BlcnR5Jyk7XG5cdFx0Y29uc3QgY2hhbmdlZFByb3BlcnR5S2V5czogc3RyaW5nW10gPSBbXTtcblx0XHRjb25zdCBwcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyk7XG5cblx0XHRpZiAodGhpcy5faW5pdGlhbFByb3BlcnRpZXMgPT09IGZhbHNlIHx8IHJlZ2lzdGVyZWREaWZmUHJvcGVydHlOYW1lcy5sZW5ndGggIT09IDApIHtcblx0XHRcdGNvbnN0IGFsbFByb3BlcnRpZXMgPSBbLi4ucHJvcGVydHlOYW1lcywgLi4uT2JqZWN0LmtleXModGhpcy5fcHJvcGVydGllcyldO1xuXHRcdFx0Y29uc3QgY2hlY2tlZFByb3BlcnRpZXM6IChzdHJpbmcgfCBudW1iZXIpW10gPSBbXTtcblx0XHRcdGNvbnN0IGRpZmZQcm9wZXJ0eVJlc3VsdHM6IGFueSA9IHt9O1xuXHRcdFx0bGV0IHJ1blJlYWN0aW9ucyA9IGZhbHNlO1xuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFsbFByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y29uc3QgcHJvcGVydHlOYW1lID0gYWxsUHJvcGVydGllc1tpXTtcblx0XHRcdFx0aWYgKGNoZWNrZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcGVydHlOYW1lKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjaGVja2VkUHJvcGVydGllcy5wdXNoKHByb3BlcnR5TmFtZSk7XG5cdFx0XHRcdGNvbnN0IHByZXZpb3VzUHJvcGVydHkgPSB0aGlzLl9wcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV07XG5cdFx0XHRcdGNvbnN0IG5ld1Byb3BlcnR5ID0gdGhpcy5fYmluZEZ1bmN0aW9uUHJvcGVydHkoXG5cdFx0XHRcdFx0cHJvcGVydGllc1twcm9wZXJ0eU5hbWVdLFxuXHRcdFx0XHRcdGluc3RhbmNlRGF0YS5jb3JlUHJvcGVydGllcy5iaW5kXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGlmIChyZWdpc3RlcmVkRGlmZlByb3BlcnR5TmFtZXMuaW5kZXhPZihwcm9wZXJ0eU5hbWUpICE9PSAtMSkge1xuXHRcdFx0XHRcdHJ1blJlYWN0aW9ucyA9IHRydWU7XG5cdFx0XHRcdFx0Y29uc3QgZGlmZkZ1bmN0aW9ucyA9IHRoaXMuZ2V0RGVjb3JhdG9yKGBkaWZmUHJvcGVydHk6JHtwcm9wZXJ0eU5hbWV9YCk7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkaWZmRnVuY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRjb25zdCByZXN1bHQgPSBkaWZmRnVuY3Rpb25zW2ldKHByZXZpb3VzUHJvcGVydHksIG5ld1Byb3BlcnR5KTtcblx0XHRcdFx0XHRcdGlmIChyZXN1bHQuY2hhbmdlZCAmJiBjaGFuZ2VkUHJvcGVydHlLZXlzLmluZGV4T2YocHJvcGVydHlOYW1lKSA9PT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0Y2hhbmdlZFByb3BlcnR5S2V5cy5wdXNoKHByb3BlcnR5TmFtZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAocHJvcGVydHlOYW1lIGluIHByb3BlcnRpZXMpIHtcblx0XHRcdFx0XHRcdFx0ZGlmZlByb3BlcnR5UmVzdWx0c1twcm9wZXJ0eU5hbWVdID0gcmVzdWx0LnZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb25zdCByZXN1bHQgPSBib3VuZEF1dG8ocHJldmlvdXNQcm9wZXJ0eSwgbmV3UHJvcGVydHkpO1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuY2hhbmdlZCAmJiBjaGFuZ2VkUHJvcGVydHlLZXlzLmluZGV4T2YocHJvcGVydHlOYW1lKSA9PT0gLTEpIHtcblx0XHRcdFx0XHRcdGNoYW5nZWRQcm9wZXJ0eUtleXMucHVzaChwcm9wZXJ0eU5hbWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAocHJvcGVydHlOYW1lIGluIHByb3BlcnRpZXMpIHtcblx0XHRcdFx0XHRcdGRpZmZQcm9wZXJ0eVJlc3VsdHNbcHJvcGVydHlOYW1lXSA9IHJlc3VsdC52YWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKHJ1blJlYWN0aW9ucykge1xuXHRcdFx0XHRjb25zdCByZWFjdGlvbkZ1bmN0aW9uczogUmVhY3Rpb25GdW5jdGlvbkNvbmZpZ1tdID0gdGhpcy5nZXREZWNvcmF0b3IoJ2RpZmZSZWFjdGlvbicpO1xuXHRcdFx0XHRjb25zdCBleGVjdXRlZFJlYWN0aW9uczogRnVuY3Rpb25bXSA9IFtdO1xuXHRcdFx0XHRyZWFjdGlvbkZ1bmN0aW9ucy5mb3JFYWNoKCh7IHJlYWN0aW9uLCBwcm9wZXJ0eU5hbWUgfSkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHByb3BlcnR5Q2hhbmdlZCA9IGNoYW5nZWRQcm9wZXJ0eUtleXMuaW5kZXhPZihwcm9wZXJ0eU5hbWUpICE9PSAtMTtcblx0XHRcdFx0XHRjb25zdCByZWFjdGlvblJ1biA9IGV4ZWN1dGVkUmVhY3Rpb25zLmluZGV4T2YocmVhY3Rpb24pICE9PSAtMTtcblx0XHRcdFx0XHRpZiAocHJvcGVydHlDaGFuZ2VkICYmICFyZWFjdGlvblJ1bikge1xuXHRcdFx0XHRcdFx0cmVhY3Rpb24uY2FsbCh0aGlzLCB0aGlzLl9wcm9wZXJ0aWVzLCBkaWZmUHJvcGVydHlSZXN1bHRzKTtcblx0XHRcdFx0XHRcdGV4ZWN1dGVkUmVhY3Rpb25zLnB1c2gocmVhY3Rpb24pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9wcm9wZXJ0aWVzID0gZGlmZlByb3BlcnR5UmVzdWx0cztcblx0XHRcdHRoaXMuX2NoYW5nZWRQcm9wZXJ0eUtleXMgPSBjaGFuZ2VkUHJvcGVydHlLZXlzO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9pbml0aWFsUHJvcGVydGllcyA9IGZhbHNlO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0eU5hbWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNvbnN0IHByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZXNbaV07XG5cdFx0XHRcdGlmICh0eXBlb2YgcHJvcGVydGllc1twcm9wZXJ0eU5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0cHJvcGVydGllc1twcm9wZXJ0eU5hbWVdID0gdGhpcy5fYmluZEZ1bmN0aW9uUHJvcGVydHkoXG5cdFx0XHRcdFx0XHRwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0sXG5cdFx0XHRcdFx0XHRpbnN0YW5jZURhdGEuY29yZVByb3BlcnRpZXMuYmluZFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y2hhbmdlZFByb3BlcnR5S2V5cy5wdXNoKHByb3BlcnR5TmFtZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuX2NoYW5nZWRQcm9wZXJ0eUtleXMgPSBjaGFuZ2VkUHJvcGVydHlLZXlzO1xuXHRcdFx0dGhpcy5fcHJvcGVydGllcyA9IHsgLi4ucHJvcGVydGllcyB9O1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9jaGFuZ2VkUHJvcGVydHlLZXlzLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMuaW52YWxpZGF0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBnZXQgY2hpbGRyZW4oKTogKEMgfCBudWxsKVtdIHtcblx0XHRyZXR1cm4gdGhpcy5fY2hpbGRyZW47XG5cdH1cblxuXHRwdWJsaWMgX19zZXRDaGlsZHJlbl9fKGNoaWxkcmVuOiAoQyB8IG51bGwpW10pOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fY2hpbGRyZW4ubGVuZ3RoID4gMCB8fCBjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLl9jaGlsZHJlbiA9IGNoaWxkcmVuO1xuXHRcdFx0dGhpcy5pbnZhbGlkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIF9fcmVuZGVyX18oKTogRE5vZGUgfCBETm9kZVtdIHtcblx0XHRjb25zdCBpbnN0YW5jZURhdGEgPSB3aWRnZXRJbnN0YW5jZU1hcC5nZXQodGhpcykhO1xuXHRcdGluc3RhbmNlRGF0YS5kaXJ0eSA9IGZhbHNlO1xuXHRcdGNvbnN0IHJlbmRlciA9IHRoaXMuX3J1bkJlZm9yZVJlbmRlcnMoKTtcblx0XHRsZXQgZE5vZGUgPSByZW5kZXIoKTtcblx0XHRkTm9kZSA9IHRoaXMucnVuQWZ0ZXJSZW5kZXJzKGROb2RlKTtcblx0XHR0aGlzLl9ub2RlSGFuZGxlci5jbGVhcigpO1xuXHRcdHJldHVybiBkTm9kZTtcblx0fVxuXG5cdHB1YmxpYyBpbnZhbGlkYXRlKCk6IHZvaWQge1xuXHRcdGNvbnN0IGluc3RhbmNlRGF0YSA9IHdpZGdldEluc3RhbmNlTWFwLmdldCh0aGlzKSE7XG5cdFx0aWYgKGluc3RhbmNlRGF0YS5pbnZhbGlkYXRlKSB7XG5cdFx0XHRpbnN0YW5jZURhdGEuaW52YWxpZGF0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdHByb3RlY3RlZCByZW5kZXIoKTogRE5vZGUgfCBETm9kZVtdIHtcblx0XHRyZXR1cm4gdignZGl2Jywge30sIHRoaXMuY2hpbGRyZW4pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZ1bmN0aW9uIHRvIGFkZCBkZWNvcmF0b3JzIHRvIFdpZGdldEJhc2Vcblx0ICpcblx0ICogQHBhcmFtIGRlY29yYXRvcktleSBUaGUga2V5IG9mIHRoZSBkZWNvcmF0b3Jcblx0ICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSBvZiB0aGUgZGVjb3JhdG9yXG5cdCAqL1xuXHRwcm90ZWN0ZWQgYWRkRGVjb3JhdG9yKGRlY29yYXRvcktleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG5cdFx0dmFsdWUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXTtcblx0XHRpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eSgnY29uc3RydWN0b3InKSkge1xuXHRcdFx0bGV0IGRlY29yYXRvckxpc3QgPSBkZWNvcmF0b3JNYXAuZ2V0KHRoaXMuY29uc3RydWN0b3IpO1xuXHRcdFx0aWYgKCFkZWNvcmF0b3JMaXN0KSB7XG5cdFx0XHRcdGRlY29yYXRvckxpc3QgPSBuZXcgTWFwPHN0cmluZywgYW55W10+KCk7XG5cdFx0XHRcdGRlY29yYXRvck1hcC5zZXQodGhpcy5jb25zdHJ1Y3RvciwgZGVjb3JhdG9yTGlzdCk7XG5cdFx0XHR9XG5cblx0XHRcdGxldCBzcGVjaWZpY0RlY29yYXRvckxpc3QgPSBkZWNvcmF0b3JMaXN0LmdldChkZWNvcmF0b3JLZXkpO1xuXHRcdFx0aWYgKCFzcGVjaWZpY0RlY29yYXRvckxpc3QpIHtcblx0XHRcdFx0c3BlY2lmaWNEZWNvcmF0b3JMaXN0ID0gW107XG5cdFx0XHRcdGRlY29yYXRvckxpc3Quc2V0KGRlY29yYXRvcktleSwgc3BlY2lmaWNEZWNvcmF0b3JMaXN0KTtcblx0XHRcdH1cblx0XHRcdHNwZWNpZmljRGVjb3JhdG9yTGlzdC5wdXNoKC4uLnZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgZGVjb3JhdG9ycyA9IHRoaXMuZ2V0RGVjb3JhdG9yKGRlY29yYXRvcktleSk7XG5cdFx0XHR0aGlzLl9kZWNvcmF0b3JDYWNoZS5zZXQoZGVjb3JhdG9yS2V5LCBbLi4uZGVjb3JhdG9ycywgLi4udmFsdWVdKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRnVuY3Rpb24gdG8gYnVpbGQgdGhlIGxpc3Qgb2YgZGVjb3JhdG9ycyBmcm9tIHRoZSBnbG9iYWwgZGVjb3JhdG9yIG1hcC5cblx0ICpcblx0ICogQHBhcmFtIGRlY29yYXRvcktleSAgVGhlIGtleSBvZiB0aGUgZGVjb3JhdG9yXG5cdCAqIEByZXR1cm4gQW4gYXJyYXkgb2YgZGVjb3JhdG9yIHZhbHVlc1xuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBfYnVpbGREZWNvcmF0b3JMaXN0KGRlY29yYXRvcktleTogc3RyaW5nKTogYW55W10ge1xuXHRcdGNvbnN0IGFsbERlY29yYXRvcnMgPSBbXTtcblxuXHRcdGxldCBjb25zdHJ1Y3RvciA9IHRoaXMuY29uc3RydWN0b3I7XG5cblx0XHR3aGlsZSAoY29uc3RydWN0b3IpIHtcblx0XHRcdGNvbnN0IGluc3RhbmNlTWFwID0gZGVjb3JhdG9yTWFwLmdldChjb25zdHJ1Y3Rvcik7XG5cdFx0XHRpZiAoaW5zdGFuY2VNYXApIHtcblx0XHRcdFx0Y29uc3QgZGVjb3JhdG9ycyA9IGluc3RhbmNlTWFwLmdldChkZWNvcmF0b3JLZXkpO1xuXG5cdFx0XHRcdGlmIChkZWNvcmF0b3JzKSB7XG5cdFx0XHRcdFx0YWxsRGVjb3JhdG9ycy51bnNoaWZ0KC4uLmRlY29yYXRvcnMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0cnVjdG9yID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGNvbnN0cnVjdG9yKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYWxsRGVjb3JhdG9ycztcblx0fVxuXG5cdC8qKlxuXHQgKiBGdW5jdGlvbiB0byByZXRyaWV2ZSBkZWNvcmF0b3IgdmFsdWVzXG5cdCAqXG5cdCAqIEBwYXJhbSBkZWNvcmF0b3JLZXkgVGhlIGtleSBvZiB0aGUgZGVjb3JhdG9yXG5cdCAqIEByZXR1cm5zIEFuIGFycmF5IG9mIGRlY29yYXRvciB2YWx1ZXNcblx0ICovXG5cdHByb3RlY3RlZCBnZXREZWNvcmF0b3IoZGVjb3JhdG9yS2V5OiBzdHJpbmcpOiBhbnlbXSB7XG5cdFx0bGV0IGFsbERlY29yYXRvcnMgPSB0aGlzLl9kZWNvcmF0b3JDYWNoZS5nZXQoZGVjb3JhdG9yS2V5KTtcblxuXHRcdGlmIChhbGxEZWNvcmF0b3JzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiBhbGxEZWNvcmF0b3JzO1xuXHRcdH1cblxuXHRcdGFsbERlY29yYXRvcnMgPSB0aGlzLl9idWlsZERlY29yYXRvckxpc3QoZGVjb3JhdG9yS2V5KTtcblxuXHRcdHRoaXMuX2RlY29yYXRvckNhY2hlLnNldChkZWNvcmF0b3JLZXksIGFsbERlY29yYXRvcnMpO1xuXHRcdHJldHVybiBhbGxEZWNvcmF0b3JzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJpbmRzIHVuYm91bmQgcHJvcGVydHkgZnVuY3Rpb25zIHRvIHRoZSBzcGVjaWZpZWQgYGJpbmRgIHByb3BlcnR5XG5cdCAqXG5cdCAqIEBwYXJhbSBwcm9wZXJ0aWVzIHByb3BlcnRpZXMgdG8gY2hlY2sgZm9yIGZ1bmN0aW9uc1xuXHQgKi9cblx0cHJpdmF0ZSBfYmluZEZ1bmN0aW9uUHJvcGVydHkocHJvcGVydHk6IGFueSwgYmluZDogYW55KTogYW55IHtcblx0XHRpZiAodHlwZW9mIHByb3BlcnR5ID09PSAnZnVuY3Rpb24nICYmICFwcm9wZXJ0eVtub0JpbmRdICYmIGlzV2lkZ2V0QmFzZUNvbnN0cnVjdG9yKHByb3BlcnR5KSA9PT0gZmFsc2UpIHtcblx0XHRcdGlmICh0aGlzLl9iaW5kRnVuY3Rpb25Qcm9wZXJ0eU1hcCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHRoaXMuX2JpbmRGdW5jdGlvblByb3BlcnR5TWFwID0gbmV3IFdlYWtNYXA8XG5cdFx0XHRcdFx0KC4uLmFyZ3M6IGFueVtdKSA9PiBhbnksXG5cdFx0XHRcdFx0eyBib3VuZEZ1bmM6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55OyBzY29wZTogYW55IH1cblx0XHRcdFx0PigpO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgYmluZEluZm86IFBhcnRpYWw8Qm91bmRGdW5jdGlvbkRhdGE+ID0gdGhpcy5fYmluZEZ1bmN0aW9uUHJvcGVydHlNYXAuZ2V0KHByb3BlcnR5KSB8fCB7fTtcblx0XHRcdGxldCB7IGJvdW5kRnVuYywgc2NvcGUgfSA9IGJpbmRJbmZvO1xuXG5cdFx0XHRpZiAoYm91bmRGdW5jID09PSB1bmRlZmluZWQgfHwgc2NvcGUgIT09IGJpbmQpIHtcblx0XHRcdFx0Ym91bmRGdW5jID0gcHJvcGVydHkuYmluZChiaW5kKSBhcyAoLi4uYXJnczogYW55W10pID0+IGFueTtcblx0XHRcdFx0dGhpcy5fYmluZEZ1bmN0aW9uUHJvcGVydHlNYXAuc2V0KHByb3BlcnR5LCB7IGJvdW5kRnVuYywgc2NvcGU6IGJpbmQgfSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYm91bmRGdW5jO1xuXHRcdH1cblx0XHRyZXR1cm4gcHJvcGVydHk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHJlZ2lzdHJ5KCk6IFJlZ2lzdHJ5SGFuZGxlciB7XG5cdFx0aWYgKHRoaXMuX3JlZ2lzdHJ5ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX3JlZ2lzdHJ5ID0gbmV3IFJlZ2lzdHJ5SGFuZGxlcigpO1xuXHRcdFx0dGhpcy5vd24odGhpcy5fcmVnaXN0cnkpO1xuXHRcdFx0dGhpcy5vd24odGhpcy5fcmVnaXN0cnkub24oJ2ludmFsaWRhdGUnLCB0aGlzLl9ib3VuZEludmFsaWRhdGUpKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX3JlZ2lzdHJ5O1xuXHR9XG5cblx0cHJpdmF0ZSBfcnVuQmVmb3JlUHJvcGVydGllcyhwcm9wZXJ0aWVzOiBhbnkpIHtcblx0XHRjb25zdCBiZWZvcmVQcm9wZXJ0aWVzOiBCZWZvcmVQcm9wZXJ0aWVzW10gPSB0aGlzLmdldERlY29yYXRvcignYmVmb3JlUHJvcGVydGllcycpO1xuXHRcdGlmIChiZWZvcmVQcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcblx0XHRcdHJldHVybiBiZWZvcmVQcm9wZXJ0aWVzLnJlZHVjZShcblx0XHRcdFx0KHByb3BlcnRpZXMsIGJlZm9yZVByb3BlcnRpZXNGdW5jdGlvbikgPT4ge1xuXHRcdFx0XHRcdHJldHVybiB7IC4uLnByb3BlcnRpZXMsIC4uLmJlZm9yZVByb3BlcnRpZXNGdW5jdGlvbi5jYWxsKHRoaXMsIHByb3BlcnRpZXMpIH07XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHsgLi4ucHJvcGVydGllcyB9XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcHJvcGVydGllcztcblx0fVxuXG5cdC8qKlxuXHQgKiBSdW4gYWxsIHJlZ2lzdGVyZWQgYmVmb3JlIHJlbmRlcnMgYW5kIHJldHVybiB0aGUgdXBkYXRlZCByZW5kZXIgbWV0aG9kXG5cdCAqL1xuXHRwcml2YXRlIF9ydW5CZWZvcmVSZW5kZXJzKCk6IFJlbmRlciB7XG5cdFx0Y29uc3QgYmVmb3JlUmVuZGVycyA9IHRoaXMuZ2V0RGVjb3JhdG9yKCdiZWZvcmVSZW5kZXInKTtcblxuXHRcdGlmIChiZWZvcmVSZW5kZXJzLmxlbmd0aCA+IDApIHtcblx0XHRcdHJldHVybiBiZWZvcmVSZW5kZXJzLnJlZHVjZSgocmVuZGVyOiBSZW5kZXIsIGJlZm9yZVJlbmRlckZ1bmN0aW9uOiBCZWZvcmVSZW5kZXIpID0+IHtcblx0XHRcdFx0Y29uc3QgdXBkYXRlZFJlbmRlciA9IGJlZm9yZVJlbmRlckZ1bmN0aW9uLmNhbGwodGhpcywgcmVuZGVyLCB0aGlzLl9wcm9wZXJ0aWVzLCB0aGlzLl9jaGlsZHJlbik7XG5cdFx0XHRcdGlmICghdXBkYXRlZFJlbmRlcikge1xuXHRcdFx0XHRcdGNvbnNvbGUud2FybignUmVuZGVyIGZ1bmN0aW9uIG5vdCByZXR1cm5lZCBmcm9tIGJlZm9yZVJlbmRlciwgdXNpbmcgcHJldmlvdXMgcmVuZGVyJyk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlbmRlcjtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdXBkYXRlZFJlbmRlcjtcblx0XHRcdH0sIHRoaXMuX2JvdW5kUmVuZGVyRnVuYyk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9ib3VuZFJlbmRlckZ1bmM7XG5cdH1cblxuXHQvKipcblx0ICogUnVuIGFsbCByZWdpc3RlcmVkIGFmdGVyIHJlbmRlcnMgYW5kIHJldHVybiB0aGUgZGVjb3JhdGVkIEROb2Rlc1xuXHQgKlxuXHQgKiBAcGFyYW0gZE5vZGUgVGhlIEROb2RlcyB0byBydW4gdGhyb3VnaCB0aGUgYWZ0ZXIgcmVuZGVyc1xuXHQgKi9cblx0cHJvdGVjdGVkIHJ1bkFmdGVyUmVuZGVycyhkTm9kZTogRE5vZGUgfCBETm9kZVtdKTogRE5vZGUgfCBETm9kZVtdIHtcblx0XHRjb25zdCBhZnRlclJlbmRlcnMgPSB0aGlzLmdldERlY29yYXRvcignYWZ0ZXJSZW5kZXInKTtcblxuXHRcdGlmIChhZnRlclJlbmRlcnMubGVuZ3RoID4gMCkge1xuXHRcdFx0ZE5vZGUgPSBhZnRlclJlbmRlcnMucmVkdWNlKChkTm9kZTogRE5vZGUgfCBETm9kZVtdLCBhZnRlclJlbmRlckZ1bmN0aW9uOiBBZnRlclJlbmRlcikgPT4ge1xuXHRcdFx0XHRyZXR1cm4gYWZ0ZXJSZW5kZXJGdW5jdGlvbi5jYWxsKHRoaXMsIGROb2RlKTtcblx0XHRcdH0sIGROb2RlKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fbWV0YU1hcCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9tZXRhTWFwLmZvckVhY2goKG1ldGEpID0+IHtcblx0XHRcdFx0bWV0YS5hZnRlclJlbmRlcigpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGROb2RlO1xuXHR9XG5cblx0cHJpdmF0ZSBfcnVuQWZ0ZXJDb25zdHJ1Y3RvcnMoKTogdm9pZCB7XG5cdFx0Y29uc3QgYWZ0ZXJDb25zdHJ1Y3RvcnMgPSB0aGlzLmdldERlY29yYXRvcignYWZ0ZXJDb25zdHJ1Y3RvcicpO1xuXG5cdFx0aWYgKGFmdGVyQ29uc3RydWN0b3JzLmxlbmd0aCA+IDApIHtcblx0XHRcdGFmdGVyQ29uc3RydWN0b3JzLmZvckVhY2goKGFmdGVyQ29uc3RydWN0b3IpID0+IGFmdGVyQ29uc3RydWN0b3IuY2FsbCh0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0cHJvdGVjdGVkIG93bihoYW5kbGU6IEhhbmRsZSk6IHZvaWQge1xuXHRcdHRoaXMuX2hhbmRsZXMucHVzaChoYW5kbGUpO1xuXHR9XG5cblx0cHJvdGVjdGVkIGRlc3Ryb3koKSB7XG5cdFx0d2hpbGUgKHRoaXMuX2hhbmRsZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29uc3QgaGFuZGxlID0gdGhpcy5faGFuZGxlcy5wb3AoKTtcblx0XHRcdGlmIChoYW5kbGUpIHtcblx0XHRcdFx0aGFuZGxlLmRlc3Ryb3koKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2lkZ2V0QmFzZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBXaWRnZXRCYXNlLnRzIiwiaW1wb3J0IHsgVk5vZGVQcm9wZXJ0aWVzIH0gZnJvbSAnLi8uLi9pbnRlcmZhY2VzJztcblxubGV0IGJyb3dzZXJTcGVjaWZpY1RyYW5zaXRpb25FbmRFdmVudE5hbWUgPSAnJztcbmxldCBicm93c2VyU3BlY2lmaWNBbmltYXRpb25FbmRFdmVudE5hbWUgPSAnJztcblxuZnVuY3Rpb24gZGV0ZXJtaW5lQnJvd3NlclN0eWxlTmFtZXMoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcblx0aWYgKCdXZWJraXRUcmFuc2l0aW9uJyBpbiBlbGVtZW50LnN0eWxlKSB7XG5cdFx0YnJvd3NlclNwZWNpZmljVHJhbnNpdGlvbkVuZEV2ZW50TmFtZSA9ICd3ZWJraXRUcmFuc2l0aW9uRW5kJztcblx0XHRicm93c2VyU3BlY2lmaWNBbmltYXRpb25FbmRFdmVudE5hbWUgPSAnd2Via2l0QW5pbWF0aW9uRW5kJztcblx0fSBlbHNlIGlmICgndHJhbnNpdGlvbicgaW4gZWxlbWVudC5zdHlsZSB8fCAnTW96VHJhbnNpdGlvbicgaW4gZWxlbWVudC5zdHlsZSkge1xuXHRcdGJyb3dzZXJTcGVjaWZpY1RyYW5zaXRpb25FbmRFdmVudE5hbWUgPSAndHJhbnNpdGlvbmVuZCc7XG5cdFx0YnJvd3NlclNwZWNpZmljQW5pbWF0aW9uRW5kRXZlbnROYW1lID0gJ2FuaW1hdGlvbmVuZCc7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdZb3VyIGJyb3dzZXIgaXMgbm90IHN1cHBvcnRlZCcpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpemUoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcblx0aWYgKGJyb3dzZXJTcGVjaWZpY0FuaW1hdGlvbkVuZEV2ZW50TmFtZSA9PT0gJycpIHtcblx0XHRkZXRlcm1pbmVCcm93c2VyU3R5bGVOYW1lcyhlbGVtZW50KTtcblx0fVxufVxuXG5mdW5jdGlvbiBydW5BbmRDbGVhblVwKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzdGFydEFuaW1hdGlvbjogKCkgPT4gdm9pZCwgZmluaXNoQW5pbWF0aW9uOiAoKSA9PiB2b2lkKSB7XG5cdGluaXRpYWxpemUoZWxlbWVudCk7XG5cblx0bGV0IGZpbmlzaGVkID0gZmFsc2U7XG5cblx0bGV0IHRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbigpIHtcblx0XHRpZiAoIWZpbmlzaGVkKSB7XG5cdFx0XHRmaW5pc2hlZCA9IHRydWU7XG5cdFx0XHRlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoYnJvd3NlclNwZWNpZmljVHJhbnNpdGlvbkVuZEV2ZW50TmFtZSwgdHJhbnNpdGlvbkVuZCk7XG5cdFx0XHRlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoYnJvd3NlclNwZWNpZmljQW5pbWF0aW9uRW5kRXZlbnROYW1lLCB0cmFuc2l0aW9uRW5kKTtcblxuXHRcdFx0ZmluaXNoQW5pbWF0aW9uKCk7XG5cdFx0fVxuXHR9O1xuXG5cdHN0YXJ0QW5pbWF0aW9uKCk7XG5cblx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGJyb3dzZXJTcGVjaWZpY0FuaW1hdGlvbkVuZEV2ZW50TmFtZSwgdHJhbnNpdGlvbkVuZCk7XG5cdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihicm93c2VyU3BlY2lmaWNUcmFuc2l0aW9uRW5kRXZlbnROYW1lLCB0cmFuc2l0aW9uRW5kKTtcbn1cblxuZnVuY3Rpb24gZXhpdChub2RlOiBIVE1MRWxlbWVudCwgcHJvcGVydGllczogVk5vZGVQcm9wZXJ0aWVzLCBleGl0QW5pbWF0aW9uOiBzdHJpbmcsIHJlbW92ZU5vZGU6ICgpID0+IHZvaWQpIHtcblx0Y29uc3QgYWN0aXZlQ2xhc3MgPSBwcm9wZXJ0aWVzLmV4aXRBbmltYXRpb25BY3RpdmUgfHwgYCR7ZXhpdEFuaW1hdGlvbn0tYWN0aXZlYDtcblxuXHRydW5BbmRDbGVhblVwKFxuXHRcdG5vZGUsXG5cdFx0KCkgPT4ge1xuXHRcdFx0bm9kZS5jbGFzc0xpc3QuYWRkKGV4aXRBbmltYXRpb24pO1xuXG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdG5vZGUuY2xhc3NMaXN0LmFkZChhY3RpdmVDbGFzcyk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdCgpID0+IHtcblx0XHRcdHJlbW92ZU5vZGUoKTtcblx0XHR9XG5cdCk7XG59XG5cbmZ1bmN0aW9uIGVudGVyKG5vZGU6IEhUTUxFbGVtZW50LCBwcm9wZXJ0aWVzOiBWTm9kZVByb3BlcnRpZXMsIGVudGVyQW5pbWF0aW9uOiBzdHJpbmcpIHtcblx0Y29uc3QgYWN0aXZlQ2xhc3MgPSBwcm9wZXJ0aWVzLmVudGVyQW5pbWF0aW9uQWN0aXZlIHx8IGAke2VudGVyQW5pbWF0aW9ufS1hY3RpdmVgO1xuXG5cdHJ1bkFuZENsZWFuVXAoXG5cdFx0bm9kZSxcblx0XHQoKSA9PiB7XG5cdFx0XHRub2RlLmNsYXNzTGlzdC5hZGQoZW50ZXJBbmltYXRpb24pO1xuXG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdG5vZGUuY2xhc3NMaXN0LmFkZChhY3RpdmVDbGFzcyk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdCgpID0+IHtcblx0XHRcdG5vZGUuY2xhc3NMaXN0LnJlbW92ZShlbnRlckFuaW1hdGlvbik7XG5cdFx0XHRub2RlLmNsYXNzTGlzdC5yZW1vdmUoYWN0aXZlQ2xhc3MpO1xuXHRcdH1cblx0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRlbnRlcixcblx0ZXhpdFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBjc3NUcmFuc2l0aW9ucy50cyIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi4vc2hpbS9TeW1ib2wnO1xuaW1wb3J0IHtcblx0Q29uc3RydWN0b3IsXG5cdERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlLFxuXHREZWZlcnJlZFZpcnR1YWxQcm9wZXJ0aWVzLFxuXHRETm9kZSxcblx0Vk5vZGUsXG5cdFJlZ2lzdHJ5TGFiZWwsXG5cdFZOb2RlUHJvcGVydGllcyxcblx0V2lkZ2V0QmFzZUludGVyZmFjZSxcblx0V05vZGUsXG5cdERvbU9wdGlvbnNcbn0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEludGVybmFsVk5vZGUsIFJlbmRlclJlc3VsdCB9IGZyb20gJy4vdmRvbSc7XG5cbi8qKlxuICogVGhlIHN5bWJvbCBpZGVudGlmaWVyIGZvciBhIFdOb2RlIHR5cGVcbiAqL1xuZXhwb3J0IGNvbnN0IFdOT0RFID0gU3ltYm9sKCdJZGVudGlmaWVyIGZvciBhIFdOb2RlLicpO1xuXG4vKipcbiAqIFRoZSBzeW1ib2wgaWRlbnRpZmllciBmb3IgYSBWTm9kZSB0eXBlXG4gKi9cbmV4cG9ydCBjb25zdCBWTk9ERSA9IFN5bWJvbCgnSWRlbnRpZmllciBmb3IgYSBWTm9kZS4nKTtcblxuLyoqXG4gKiBUaGUgc3ltYm9sIGlkZW50aWZpZXIgZm9yIGEgVk5vZGUgdHlwZSBjcmVhdGVkIHVzaW5nIGRvbSgpXG4gKi9cbmV4cG9ydCBjb25zdCBET01WTk9ERSA9IFN5bWJvbCgnSWRlbnRpZmllciBmb3IgYSBWTm9kZSBjcmVhdGVkIHVzaW5nIGV4aXN0aW5nIGRvbS4nKTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRydWUgaWYgdGhlIGBETm9kZWAgaXMgYSBgV05vZGVgIHVzaW5nIHRoZSBgdHlwZWAgcHJvcGVydHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzV05vZGU8VyBleHRlbmRzIFdpZGdldEJhc2VJbnRlcmZhY2UgPSBEZWZhdWx0V2lkZ2V0QmFzZUludGVyZmFjZT4oXG5cdGNoaWxkOiBETm9kZTxXPlxuKTogY2hpbGQgaXMgV05vZGU8Vz4ge1xuXHRyZXR1cm4gQm9vbGVhbihjaGlsZCAmJiB0eXBlb2YgY2hpbGQgIT09ICdzdHJpbmcnICYmIGNoaWxkLnR5cGUgPT09IFdOT0RFKTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRydWUgaWYgdGhlIGBETm9kZWAgaXMgYSBgVk5vZGVgIHVzaW5nIHRoZSBgdHlwZWAgcHJvcGVydHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVk5vZGUoY2hpbGQ6IEROb2RlKTogY2hpbGQgaXMgVk5vZGUge1xuXHRyZXR1cm4gQm9vbGVhbihjaGlsZCAmJiB0eXBlb2YgY2hpbGQgIT09ICdzdHJpbmcnICYmIChjaGlsZC50eXBlID09PSBWTk9ERSB8fCBjaGlsZC50eXBlID09PSBET01WTk9ERSkpO1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IHJldHVybnMgdHJ1ZSBpZiB0aGUgYEROb2RlYCBpcyBhIGBWTm9kZWAgY3JlYXRlZCB3aXRoIGBkb20oKWAgdXNpbmcgdGhlIGB0eXBlYCBwcm9wZXJ0eVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNEb21WTm9kZShjaGlsZDogRE5vZGUpOiBjaGlsZCBpcyBWTm9kZSB7XG5cdHJldHVybiBCb29sZWFuKGNoaWxkICYmIHR5cGVvZiBjaGlsZCAhPT0gJ3N0cmluZycgJiYgY2hpbGQudHlwZSA9PT0gRE9NVk5PREUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFbGVtZW50Tm9kZSh2YWx1ZTogYW55KTogdmFsdWUgaXMgRWxlbWVudCB7XG5cdHJldHVybiAhIXZhbHVlLnRhZ05hbWU7XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGZvciB0aGUgZGVjb3JhdGUgbW9kaWZpZXJcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNb2RpZmllcjxUIGV4dGVuZHMgRE5vZGU+IHtcblx0KGROb2RlOiBULCBicmVha2VyOiAoKSA9PiB2b2lkKTogdm9pZDtcbn1cblxuLyoqXG4gKiBUaGUgcHJlZGljYXRlIGZ1bmN0aW9uIGZvciBkZWNvcmF0ZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFByZWRpY2F0ZTxUIGV4dGVuZHMgRE5vZGU+IHtcblx0KGROb2RlOiBETm9kZSk6IGROb2RlIGlzIFQ7XG59XG5cbi8qKlxuICogRGVjb3JhdG9yIG9wdGlvbnNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEZWNvcmF0ZU9wdGlvbnM8VCBleHRlbmRzIEROb2RlPiB7XG5cdG1vZGlmaWVyOiBNb2RpZmllcjxUPjtcblx0cHJlZGljYXRlPzogUHJlZGljYXRlPFQ+O1xuXHRzaGFsbG93PzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBHZW5lcmljIGRlY29yYXRlIGZ1bmN0aW9uIGZvciBETm9kZXMuIFRoZSBub2RlcyBhcmUgbW9kaWZpZWQgaW4gcGxhY2UgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHByZWRpY2F0ZVxuICogYW5kIG1vZGlmaWVyIGZ1bmN0aW9ucy5cbiAqXG4gKiBUaGUgY2hpbGRyZW4gb2YgZWFjaCBub2RlIGFyZSBmbGF0dGVuZWQgYW5kIGFkZGVkIHRvIHRoZSBhcnJheSBmb3IgZGVjb3JhdGlvbi5cbiAqXG4gKiBJZiBubyBwcmVkaWNhdGUgaXMgc3VwcGxpZWQgdGhlbiB0aGUgbW9kaWZpZXIgd2lsbCBiZSBleGVjdXRlZCBvbiBhbGwgbm9kZXMuIEEgYGJyZWFrZXJgIGZ1bmN0aW9uIGlzIHBhc3NlZCB0byB0aGVcbiAqIG1vZGlmaWVyIHdoaWNoIHdpbGwgZHJhaW4gdGhlIG5vZGVzIGFycmF5IGFuZCBleGl0IHRoZSBkZWNvcmF0aW9uLlxuICpcbiAqIFdoZW4gdGhlIGBzaGFsbG93YCBvcHRpb25zIGlzIHNldCB0byBgdHJ1ZWAgdGhlIG9ubHkgdGhlIHRvcCBub2RlIG9yIG5vZGVzIHdpbGwgYmUgZGVjb3JhdGVkIChvbmx5IHN1cHBvcnRlZCB1c2luZ1xuICogYERlY29yYXRlT3B0aW9uc2ApLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjb3JhdGU8VCBleHRlbmRzIEROb2RlPihkTm9kZXM6IEROb2RlLCBvcHRpb25zOiBEZWNvcmF0ZU9wdGlvbnM8VD4pOiBETm9kZTtcbmV4cG9ydCBmdW5jdGlvbiBkZWNvcmF0ZTxUIGV4dGVuZHMgRE5vZGU+KGROb2RlczogRE5vZGVbXSwgb3B0aW9uczogRGVjb3JhdGVPcHRpb25zPFQ+KTogRE5vZGVbXTtcbmV4cG9ydCBmdW5jdGlvbiBkZWNvcmF0ZTxUIGV4dGVuZHMgRE5vZGU+KGROb2RlczogRE5vZGUgfCBETm9kZVtdLCBvcHRpb25zOiBEZWNvcmF0ZU9wdGlvbnM8VD4pOiBETm9kZSB8IEROb2RlW107XG5leHBvcnQgZnVuY3Rpb24gZGVjb3JhdGU8VCBleHRlbmRzIEROb2RlPihkTm9kZXM6IEROb2RlLCBtb2RpZmllcjogTW9kaWZpZXI8VD4sIHByZWRpY2F0ZTogUHJlZGljYXRlPFQ+KTogRE5vZGU7XG5leHBvcnQgZnVuY3Rpb24gZGVjb3JhdGU8VCBleHRlbmRzIEROb2RlPihkTm9kZXM6IEROb2RlW10sIG1vZGlmaWVyOiBNb2RpZmllcjxUPiwgcHJlZGljYXRlOiBQcmVkaWNhdGU8VD4pOiBETm9kZVtdO1xuZXhwb3J0IGZ1bmN0aW9uIGRlY29yYXRlPFQgZXh0ZW5kcyBETm9kZT4oXG5cdGROb2RlczogUmVuZGVyUmVzdWx0LFxuXHRtb2RpZmllcjogTW9kaWZpZXI8VD4sXG5cdHByZWRpY2F0ZTogUHJlZGljYXRlPFQ+XG4pOiBSZW5kZXJSZXN1bHQ7XG5leHBvcnQgZnVuY3Rpb24gZGVjb3JhdGUoZE5vZGVzOiBETm9kZSwgbW9kaWZpZXI6IE1vZGlmaWVyPEROb2RlPik6IEROb2RlO1xuZXhwb3J0IGZ1bmN0aW9uIGRlY29yYXRlKGROb2RlczogRE5vZGVbXSwgbW9kaWZpZXI6IE1vZGlmaWVyPEROb2RlPik6IEROb2RlW107XG5leHBvcnQgZnVuY3Rpb24gZGVjb3JhdGUoZE5vZGVzOiBSZW5kZXJSZXN1bHQsIG1vZGlmaWVyOiBNb2RpZmllcjxETm9kZT4pOiBSZW5kZXJSZXN1bHQ7XG5leHBvcnQgZnVuY3Rpb24gZGVjb3JhdGUoXG5cdGROb2RlczogRE5vZGUgfCBETm9kZVtdLFxuXHRvcHRpb25zT3JNb2RpZmllcjogTW9kaWZpZXI8RE5vZGU+IHwgRGVjb3JhdGVPcHRpb25zPEROb2RlPixcblx0cHJlZGljYXRlPzogUHJlZGljYXRlPEROb2RlPlxuKTogRE5vZGUgfCBETm9kZVtdIHtcblx0bGV0IHNoYWxsb3cgPSBmYWxzZTtcblx0bGV0IG1vZGlmaWVyO1xuXHRpZiAodHlwZW9mIG9wdGlvbnNPck1vZGlmaWVyID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0bW9kaWZpZXIgPSBvcHRpb25zT3JNb2RpZmllcjtcblx0fSBlbHNlIHtcblx0XHRtb2RpZmllciA9IG9wdGlvbnNPck1vZGlmaWVyLm1vZGlmaWVyO1xuXHRcdHByZWRpY2F0ZSA9IG9wdGlvbnNPck1vZGlmaWVyLnByZWRpY2F0ZTtcblx0XHRzaGFsbG93ID0gb3B0aW9uc09yTW9kaWZpZXIuc2hhbGxvdyB8fCBmYWxzZTtcblx0fVxuXG5cdGxldCBub2RlcyA9IEFycmF5LmlzQXJyYXkoZE5vZGVzKSA/IFsuLi5kTm9kZXNdIDogW2ROb2Rlc107XG5cdGZ1bmN0aW9uIGJyZWFrZXIoKSB7XG5cdFx0bm9kZXMgPSBbXTtcblx0fVxuXHR3aGlsZSAobm9kZXMubGVuZ3RoKSB7XG5cdFx0Y29uc3Qgbm9kZSA9IG5vZGVzLnNoaWZ0KCk7XG5cdFx0aWYgKG5vZGUpIHtcblx0XHRcdGlmICghc2hhbGxvdyAmJiAoaXNXTm9kZShub2RlKSB8fCBpc1ZOb2RlKG5vZGUpKSAmJiBub2RlLmNoaWxkcmVuKSB7XG5cdFx0XHRcdG5vZGVzID0gWy4uLm5vZGVzLCAuLi5ub2RlLmNoaWxkcmVuXTtcblx0XHRcdH1cblx0XHRcdGlmICghcHJlZGljYXRlIHx8IHByZWRpY2F0ZShub2RlKSkge1xuXHRcdFx0XHRtb2RpZmllcihub2RlLCBicmVha2VyKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGROb2Rlcztcbn1cblxuLyoqXG4gKiBXcmFwcGVyIGZ1bmN0aW9uIGZvciBjYWxscyB0byBjcmVhdGUgYSB3aWRnZXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3PFcgZXh0ZW5kcyBXaWRnZXRCYXNlSW50ZXJmYWNlPihcblx0d2lkZ2V0Q29uc3RydWN0b3I6IENvbnN0cnVjdG9yPFc+IHwgUmVnaXN0cnlMYWJlbCxcblx0cHJvcGVydGllczogV1sncHJvcGVydGllcyddLFxuXHRjaGlsZHJlbjogV1snY2hpbGRyZW4nXSA9IFtdXG4pOiBXTm9kZTxXPiB7XG5cdHJldHVybiB7XG5cdFx0Y2hpbGRyZW4sXG5cdFx0d2lkZ2V0Q29uc3RydWN0b3IsXG5cdFx0cHJvcGVydGllcyxcblx0XHR0eXBlOiBXTk9ERVxuXHR9O1xufVxuXG4vKipcbiAqIFdyYXBwZXIgZnVuY3Rpb24gZm9yIGNhbGxzIHRvIGNyZWF0ZSBWTm9kZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2KHRhZzogc3RyaW5nLCBjaGlsZHJlbjogdW5kZWZpbmVkIHwgRE5vZGVbXSk6IFZOb2RlO1xuZXhwb3J0IGZ1bmN0aW9uIHYodGFnOiBzdHJpbmcsIHByb3BlcnRpZXM6IERlZmVycmVkVmlydHVhbFByb3BlcnRpZXMgfCBWTm9kZVByb3BlcnRpZXMsIGNoaWxkcmVuPzogRE5vZGVbXSk6IFZOb2RlO1xuZXhwb3J0IGZ1bmN0aW9uIHYodGFnOiBzdHJpbmcpOiBWTm9kZTtcbmV4cG9ydCBmdW5jdGlvbiB2KFxuXHR0YWc6IHN0cmluZyxcblx0cHJvcGVydGllc09yQ2hpbGRyZW46IFZOb2RlUHJvcGVydGllcyB8IERlZmVycmVkVmlydHVhbFByb3BlcnRpZXMgfCBETm9kZVtdID0ge30sXG5cdGNoaWxkcmVuOiB1bmRlZmluZWQgfCBETm9kZVtdID0gdW5kZWZpbmVkXG4pOiBWTm9kZSB7XG5cdGxldCBwcm9wZXJ0aWVzOiBWTm9kZVByb3BlcnRpZXMgfCBEZWZlcnJlZFZpcnR1YWxQcm9wZXJ0aWVzID0gcHJvcGVydGllc09yQ2hpbGRyZW47XG5cdGxldCBkZWZlcnJlZFByb3BlcnRpZXNDYWxsYmFjaztcblxuXHRpZiAoQXJyYXkuaXNBcnJheShwcm9wZXJ0aWVzT3JDaGlsZHJlbikpIHtcblx0XHRjaGlsZHJlbiA9IHByb3BlcnRpZXNPckNoaWxkcmVuO1xuXHRcdHByb3BlcnRpZXMgPSB7fTtcblx0fVxuXG5cdGlmICh0eXBlb2YgcHJvcGVydGllcyA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGRlZmVycmVkUHJvcGVydGllc0NhbGxiYWNrID0gcHJvcGVydGllcztcblx0XHRwcm9wZXJ0aWVzID0ge307XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHRhZyxcblx0XHRkZWZlcnJlZFByb3BlcnRpZXNDYWxsYmFjayxcblx0XHRjaGlsZHJlbixcblx0XHRwcm9wZXJ0aWVzLFxuXHRcdHR5cGU6IFZOT0RFXG5cdH07XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgVk5vZGUgZm9yIGFuIGV4aXN0aW5nIERPTSBOb2RlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZG9tKFxuXHR7IG5vZGUsIGF0dHJzID0ge30sIHByb3BzID0ge30sIG9uID0ge30sIGRpZmZUeXBlID0gJ25vbmUnIH06IERvbU9wdGlvbnMsXG5cdGNoaWxkcmVuPzogRE5vZGVbXVxuKTogVk5vZGUge1xuXHRyZXR1cm4ge1xuXHRcdHRhZzogaXNFbGVtZW50Tm9kZShub2RlKSA/IG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpIDogJycsXG5cdFx0cHJvcGVydGllczogcHJvcHMsXG5cdFx0YXR0cmlidXRlczogYXR0cnMsXG5cdFx0ZXZlbnRzOiBvbixcblx0XHRjaGlsZHJlbixcblx0XHR0eXBlOiBET01WTk9ERSxcblx0XHRkb21Ob2RlOiBub2RlLFxuXHRcdHRleHQ6IGlzRWxlbWVudE5vZGUobm9kZSkgPyB1bmRlZmluZWQgOiBub2RlLmRhdGEsXG5cdFx0ZGlmZlR5cGVcblx0fSBhcyBJbnRlcm5hbFZOb2RlO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGQudHMiLCJpbXBvcnQgeyBoYW5kbGVEZWNvcmF0b3IgfSBmcm9tICcuL2hhbmRsZURlY29yYXRvcic7XG5cbi8qKlxuICogRGVjb3JhdG9yIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVnaXN0ZXIgYSBmdW5jdGlvbiB0byBydW4gYXMgYW4gYXNwZWN0IHRvIGByZW5kZXJgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZnRlclJlbmRlcihtZXRob2Q6IEZ1bmN0aW9uKTogKHRhcmdldDogYW55KSA9PiB2b2lkO1xuZXhwb3J0IGZ1bmN0aW9uIGFmdGVyUmVuZGVyKCk6ICh0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZykgPT4gdm9pZDtcbmV4cG9ydCBmdW5jdGlvbiBhZnRlclJlbmRlcihtZXRob2Q/OiBGdW5jdGlvbikge1xuXHRyZXR1cm4gaGFuZGxlRGVjb3JhdG9yKCh0YXJnZXQsIHByb3BlcnR5S2V5KSA9PiB7XG5cdFx0dGFyZ2V0LmFkZERlY29yYXRvcignYWZ0ZXJSZW5kZXInLCBwcm9wZXJ0eUtleSA/IHRhcmdldFtwcm9wZXJ0eUtleV0gOiBtZXRob2QpO1xuXHR9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYWZ0ZXJSZW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gYWZ0ZXJSZW5kZXIudHMiLCJleHBvcnQgdHlwZSBEZWNvcmF0b3JIYW5kbGVyID0gKHRhcmdldDogYW55LCBwcm9wZXJ0eUtleT86IHN0cmluZykgPT4gdm9pZDtcblxuLyoqXG4gKiBHZW5lcmljIGRlY29yYXRvciBoYW5kbGVyIHRvIHRha2UgY2FyZSBvZiB3aGV0aGVyIG9yIG5vdCB0aGUgZGVjb3JhdG9yIHdhcyBjYWxsZWQgYXQgdGhlIGNsYXNzIGxldmVsXG4gKiBvciB0aGUgbWV0aG9kIGxldmVsLlxuICpcbiAqIEBwYXJhbSBoYW5kbGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVEZWNvcmF0b3IoaGFuZGxlcjogRGVjb3JhdG9ySGFuZGxlcikge1xuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0OiBhbnksIHByb3BlcnR5S2V5Pzogc3RyaW5nLCBkZXNjcmlwdG9yPzogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdGhhbmRsZXIodGFyZ2V0LnByb3RvdHlwZSwgdW5kZWZpbmVkKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aGFuZGxlcih0YXJnZXQsIHByb3BlcnR5S2V5KTtcblx0XHR9XG5cdH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZURlY29yYXRvcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBoYW5kbGVEZWNvcmF0b3IudHMiLCJpbXBvcnQgeyBQcm9wZXJ0eUNoYW5nZVJlY29yZCB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBXSURHRVRfQkFTRV9UWVBFIH0gZnJvbSAnLi9SZWdpc3RyeSc7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0T3JBcnJheSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG5cdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBPYmplY3RdJyB8fCBBcnJheS5pc0FycmF5KHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFsd2F5cyhwcmV2aW91c1Byb3BlcnR5OiBhbnksIG5ld1Byb3BlcnR5OiBhbnkpOiBQcm9wZXJ0eUNoYW5nZVJlY29yZCB7XG5cdHJldHVybiB7XG5cdFx0Y2hhbmdlZDogdHJ1ZSxcblx0XHR2YWx1ZTogbmV3UHJvcGVydHlcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlnbm9yZShwcmV2aW91c1Byb3BlcnR5OiBhbnksIG5ld1Byb3BlcnR5OiBhbnkpOiBQcm9wZXJ0eUNoYW5nZVJlY29yZCB7XG5cdHJldHVybiB7XG5cdFx0Y2hhbmdlZDogZmFsc2UsXG5cdFx0dmFsdWU6IG5ld1Byb3BlcnR5XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWZlcmVuY2UocHJldmlvdXNQcm9wZXJ0eTogYW55LCBuZXdQcm9wZXJ0eTogYW55KTogUHJvcGVydHlDaGFuZ2VSZWNvcmQge1xuXHRyZXR1cm4ge1xuXHRcdGNoYW5nZWQ6IHByZXZpb3VzUHJvcGVydHkgIT09IG5ld1Byb3BlcnR5LFxuXHRcdHZhbHVlOiBuZXdQcm9wZXJ0eVxuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hhbGxvdyhwcmV2aW91c1Byb3BlcnR5OiBhbnksIG5ld1Byb3BlcnR5OiBhbnkpOiBQcm9wZXJ0eUNoYW5nZVJlY29yZCB7XG5cdGxldCBjaGFuZ2VkID0gZmFsc2U7XG5cblx0Y29uc3QgdmFsaWRPbGRQcm9wZXJ0eSA9IHByZXZpb3VzUHJvcGVydHkgJiYgaXNPYmplY3RPckFycmF5KHByZXZpb3VzUHJvcGVydHkpO1xuXHRjb25zdCB2YWxpZE5ld1Byb3BlcnR5ID0gbmV3UHJvcGVydHkgJiYgaXNPYmplY3RPckFycmF5KG5ld1Byb3BlcnR5KTtcblxuXHRpZiAoIXZhbGlkT2xkUHJvcGVydHkgfHwgIXZhbGlkTmV3UHJvcGVydHkpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y2hhbmdlZDogdHJ1ZSxcblx0XHRcdHZhbHVlOiBuZXdQcm9wZXJ0eVxuXHRcdH07XG5cdH1cblxuXHRjb25zdCBwcmV2aW91c0tleXMgPSBPYmplY3Qua2V5cyhwcmV2aW91c1Byb3BlcnR5KTtcblx0Y29uc3QgbmV3S2V5cyA9IE9iamVjdC5rZXlzKG5ld1Byb3BlcnR5KTtcblxuXHRpZiAocHJldmlvdXNLZXlzLmxlbmd0aCAhPT0gbmV3S2V5cy5sZW5ndGgpIHtcblx0XHRjaGFuZ2VkID0gdHJ1ZTtcblx0fSBlbHNlIHtcblx0XHRjaGFuZ2VkID0gbmV3S2V5cy5zb21lKChrZXkpID0+IHtcblx0XHRcdHJldHVybiBuZXdQcm9wZXJ0eVtrZXldICE9PSBwcmV2aW91c1Byb3BlcnR5W2tleV07XG5cdFx0fSk7XG5cdH1cblx0cmV0dXJuIHtcblx0XHRjaGFuZ2VkLFxuXHRcdHZhbHVlOiBuZXdQcm9wZXJ0eVxuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXV0byhwcmV2aW91c1Byb3BlcnR5OiBhbnksIG5ld1Byb3BlcnR5OiBhbnkpOiBQcm9wZXJ0eUNoYW5nZVJlY29yZCB7XG5cdGxldCByZXN1bHQ7XG5cdGlmICh0eXBlb2YgbmV3UHJvcGVydHkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRpZiAobmV3UHJvcGVydHkuX3R5cGUgPT09IFdJREdFVF9CQVNFX1RZUEUpIHtcblx0XHRcdHJlc3VsdCA9IHJlZmVyZW5jZShwcmV2aW91c1Byb3BlcnR5LCBuZXdQcm9wZXJ0eSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdCA9IGlnbm9yZShwcmV2aW91c1Byb3BlcnR5LCBuZXdQcm9wZXJ0eSk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGlzT2JqZWN0T3JBcnJheShuZXdQcm9wZXJ0eSkpIHtcblx0XHRyZXN1bHQgPSBzaGFsbG93KHByZXZpb3VzUHJvcGVydHksIG5ld1Byb3BlcnR5KTtcblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSByZWZlcmVuY2UocHJldmlvdXNQcm9wZXJ0eSwgbmV3UHJvcGVydHkpO1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZGlmZi50cyIsImltcG9ydCB7IGFzc2lnbiB9IGZyb20gJy4uLy4uL2NvcmUvbGFuZyc7XG5pbXBvcnQgeyBIYW5kbGUgfSBmcm9tICcuLi8uLi9jb3JlL2ludGVyZmFjZXMnO1xuaW1wb3J0IGNzc1RyYW5zaXRpb25zIGZyb20gJy4uL2FuaW1hdGlvbnMvY3NzVHJhbnNpdGlvbnMnO1xuaW1wb3J0IHsgQ29uc3RydWN0b3IsIEROb2RlLCBQcm9qZWN0aW9uLCBQcm9qZWN0aW9uT3B0aW9ucyB9IGZyb20gJy4vLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBXaWRnZXRCYXNlIH0gZnJvbSAnLi8uLi9XaWRnZXRCYXNlJztcbmltcG9ydCB7IGFmdGVyUmVuZGVyIH0gZnJvbSAnLi8uLi9kZWNvcmF0b3JzL2FmdGVyUmVuZGVyJztcbmltcG9ydCB7IHYgfSBmcm9tICcuLy4uL2QnO1xuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tICcuLy4uL1JlZ2lzdHJ5JztcbmltcG9ydCB7IGRvbSB9IGZyb20gJy4vLi4vdmRvbSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgYXR0YWNoIHN0YXRlIG9mIHRoZSBwcm9qZWN0b3JcbiAqL1xuZXhwb3J0IGVudW0gUHJvamVjdG9yQXR0YWNoU3RhdGUge1xuXHRBdHRhY2hlZCA9IDEsXG5cdERldGFjaGVkXG59XG5cbi8qKlxuICogQXR0YWNoIHR5cGUgZm9yIHRoZSBwcm9qZWN0b3JcbiAqL1xuZXhwb3J0IGVudW0gQXR0YWNoVHlwZSB7XG5cdEFwcGVuZCA9IDEsXG5cdE1lcmdlID0gMlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEF0dGFjaE9wdGlvbnMge1xuXHQvKipcblx0ICogSWYgYCdhcHBlbmQnYCBpdCB3aWxsIGFwcGVuZGVkIHRvIHRoZSByb290LiBJZiBgJ21lcmdlJ2AgaXQgd2lsbCBtZXJnZWQgd2l0aCB0aGUgcm9vdC4gSWYgYCdyZXBsYWNlJ2AgaXQgd2lsbFxuXHQgKiByZXBsYWNlIHRoZSByb290LlxuXHQgKi9cblx0dHlwZTogQXR0YWNoVHlwZTtcblxuXHQvKipcblx0ICogRWxlbWVudCB0byBhdHRhY2ggdGhlIHByb2plY3Rvci5cblx0ICovXG5cdHJvb3Q/OiBFbGVtZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2plY3RvclByb3BlcnRpZXMge1xuXHRyZWdpc3RyeT86IFJlZ2lzdHJ5O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2plY3Rvck1peGluPFA+IHtcblx0cmVhZG9ubHkgcHJvcGVydGllczogUmVhZG9ubHk8UD4gJiBSZWFkb25seTxQcm9qZWN0b3JQcm9wZXJ0aWVzPjtcblxuXHQvKipcblx0ICogQXBwZW5kIHRoZSBwcm9qZWN0b3IgdG8gdGhlIHJvb3QuXG5cdCAqL1xuXHRhcHBlbmQocm9vdD86IEVsZW1lbnQpOiBIYW5kbGU7XG5cblx0LyoqXG5cdCAqIE1lcmdlIHRoZSBwcm9qZWN0b3Igb250byB0aGUgcm9vdC5cblx0ICpcblx0ICogVGhlIGByb290YCBhbmQgYW55IG9mIGl0cyBgY2hpbGRyZW5gIHdpbGwgYmUgcmUtdXNlZC4gIEFueSBleGNlc3MgRE9NIG5vZGVzIHdpbGwgYmUgaWdub3JlZCBhbmQgYW55IG1pc3NpbmcgRE9NIG5vZGVzXG5cdCAqIHdpbGwgYmUgY3JlYXRlZC5cblx0ICogQHBhcmFtIHJvb3QgVGhlIHJvb3QgZWxlbWVudCB0aGF0IHRoZSByb290IHZpcnR1YWwgRE9NIG5vZGUgd2lsbCBiZSBtZXJnZWQgd2l0aC4gIERlZmF1bHRzIHRvIGBkb2N1bWVudC5ib2R5YC5cblx0ICovXG5cdG1lcmdlKHJvb3Q/OiBFbGVtZW50KTogSGFuZGxlO1xuXG5cdC8qKlxuXHQgKiBBdHRhY2ggdGhlIHByb2plY3QgdG8gYSBfc2FuZGJveGVkXyBkb2N1bWVudCBmcmFnbWVudCB0aGF0IGlzIG5vdCBwYXJ0IG9mIHRoZSBET00uXG5cdCAqXG5cdCAqIFdoZW4gc2FuZGJveGVkLCB0aGUgYFByb2plY3RvcmAgd2lsbCBydW4gaW4gYSBzeW5jIG1hbm5lciwgd2hlcmUgcmVuZGVycyBhcmUgY29tcGxldGVkIHdpdGhpbiB0aGUgc2FtZSB0dXJuLlxuXHQgKiBUaGUgYFByb2plY3RvcmAgY3JlYXRlcyBhIGBEb2N1bWVudEZyYWdtZW50YCB3aGljaCByZXBsYWNlcyBhbnkgb3RoZXIgYHJvb3RgIHRoYXQgaGFzIGJlZW4gc2V0LlxuXHQgKiBAcGFyYW0gZG9jIFRoZSBgRG9jdW1lbnRgIHRvIHVzZSwgd2hpY2ggZGVmYXVsdHMgdG8gdGhlIGdsb2JhbCBgZG9jdW1lbnRgLlxuXHQgKi9cblx0c2FuZGJveChkb2M/OiBEb2N1bWVudCk6IHZvaWQ7XG5cblx0LyoqXG5cdCAqIFNldHMgdGhlIHByb3BlcnRpZXMgZm9yIHRoZSB3aWRnZXQuIFJlc3BvbnNpYmxlIGZvciBjYWxsaW5nIHRoZSBkaWZmaW5nIGZ1bmN0aW9ucyBmb3IgdGhlIHByb3BlcnRpZXMgYWdhaW5zdCB0aGVcblx0ICogcHJldmlvdXMgcHJvcGVydGllcy4gUnVucyB0aG91Z2ggYW55IHJlZ2lzdGVyZWQgc3BlY2lmaWMgcHJvcGVydHkgZGlmZiBmdW5jdGlvbnMgY29sbGVjdGluZyB0aGUgcmVzdWx0cyBhbmQgdGhlblxuXHQgKiBydW5zIHRoZSByZW1haW5kZXIgdGhyb3VnaCB0aGUgY2F0Y2ggYWxsIGRpZmYgZnVuY3Rpb24uIFRoZSBhZ2dyZWdhdGUgb2YgdGhlIHR3byBzZXRzIG9mIHRoZSByZXN1bHRzIGlzIHRoZW5cblx0ICogc2V0IGFzIHRoZSB3aWRnZXQncyBwcm9wZXJ0aWVzXG5cdCAqXG5cdCAqIEBwYXJhbSBwcm9wZXJ0aWVzIFRoZSBuZXcgd2lkZ2V0IHByb3BlcnRpZXNcblx0ICovXG5cdHNldFByb3BlcnRpZXMocHJvcGVydGllczogdGhpc1sncHJvcGVydGllcyddKTogdm9pZDtcblxuXHQvKipcblx0ICogU2V0cyB0aGUgd2lkZ2V0J3MgY2hpbGRyZW5cblx0ICovXG5cdHNldENoaWxkcmVuKGNoaWxkcmVuOiBETm9kZVtdKTogdm9pZDtcblxuXHQvKipcblx0ICogUmV0dXJuIGEgYHN0cmluZ2AgdGhhdCByZXByZXNlbnRzIHRoZSBIVE1MIG9mIHRoZSBjdXJyZW50IHByb2plY3Rpb24uICBUaGUgcHJvamVjdG9yIG5lZWRzIHRvIGJlIGF0dGFjaGVkLlxuXHQgKi9cblx0dG9IdG1sKCk6IHN0cmluZztcblxuXHQvKipcblx0ICogSW5kaWNhdGVzIGlmIHRoZSBwcm9qZWN0b3JzIGlzIGluIGFzeW5jIG1vZGUsIGNvbmZpZ3VyZWQgdG8gYHRydWVgIGJ5IGRlZmF1bHRzLlxuXHQgKi9cblx0YXN5bmM6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFJvb3QgZWxlbWVudCB0byBhdHRhY2ggdGhlIHByb2plY3RvclxuXHQgKi9cblx0cm9vdDogRWxlbWVudDtcblxuXHQvKipcblx0ICogVGhlIHN0YXR1cyBvZiB0aGUgcHJvamVjdG9yXG5cdCAqL1xuXHRyZWFkb25seSBwcm9qZWN0b3JTdGF0ZTogUHJvamVjdG9yQXR0YWNoU3RhdGU7XG5cblx0LyoqXG5cdCAqIFJ1bnMgcmVnaXN0ZXJlZCBkZXN0cm95IGhhbmRsZXNcblx0ICovXG5cdGRlc3Ryb3koKTogdm9pZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFByb2plY3Rvck1peGluPFAsIFQgZXh0ZW5kcyBDb25zdHJ1Y3RvcjxXaWRnZXRCYXNlPFA+Pj4oQmFzZTogVCk6IFQgJiBDb25zdHJ1Y3RvcjxQcm9qZWN0b3JNaXhpbjxQPj4ge1xuXHRhYnN0cmFjdCBjbGFzcyBQcm9qZWN0b3IgZXh0ZW5kcyBCYXNlIHtcblx0XHRwdWJsaWMgcHJvamVjdG9yU3RhdGU6IFByb2plY3RvckF0dGFjaFN0YXRlO1xuXG5cdFx0cHJpdmF0ZSBfcm9vdDogRWxlbWVudCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0cHJpdmF0ZSBfYXN5bmMgPSB0cnVlO1xuXHRcdHByaXZhdGUgX2F0dGFjaEhhbmRsZTogSGFuZGxlIHwgdW5kZWZpbmVkO1xuXHRcdHByaXZhdGUgX3Byb2plY3Rpb25PcHRpb25zOiBQYXJ0aWFsPFByb2plY3Rpb25PcHRpb25zPjtcblx0XHRwcml2YXRlIF9wcm9qZWN0aW9uOiBQcm9qZWN0aW9uIHwgdW5kZWZpbmVkO1xuXHRcdHByaXZhdGUgX3Byb2plY3RvclByb3BlcnRpZXM6IHRoaXNbJ3Byb3BlcnRpZXMnXSA9IHt9IGFzIHRoaXNbJ3Byb3BlcnRpZXMnXTtcblx0XHRwdWJsaWMgYWJzdHJhY3QgcHJvcGVydGllczogUmVhZG9ubHk8UD4gJiBSZWFkb25seTxQcm9qZWN0b3JQcm9wZXJ0aWVzPjtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3M6IGFueVtdKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblxuXHRcdFx0dGhpcy5fcHJvamVjdGlvbk9wdGlvbnMgPSB7XG5cdFx0XHRcdHRyYW5zaXRpb25zOiBjc3NUcmFuc2l0aW9uc1xuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5yb290ID0gZG9jdW1lbnQuYm9keTtcblx0XHRcdHRoaXMucHJvamVjdG9yU3RhdGUgPSBQcm9qZWN0b3JBdHRhY2hTdGF0ZS5EZXRhY2hlZDtcblx0XHR9XG5cblx0XHRwdWJsaWMgYXBwZW5kKHJvb3Q/OiBFbGVtZW50KTogSGFuZGxlIHtcblx0XHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRcdHR5cGU6IEF0dGFjaFR5cGUuQXBwZW5kLFxuXHRcdFx0XHRyb290XG5cdFx0XHR9O1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5fYXR0YWNoKG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdHB1YmxpYyBtZXJnZShyb290PzogRWxlbWVudCk6IEhhbmRsZSB7XG5cdFx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0XHR0eXBlOiBBdHRhY2hUeXBlLk1lcmdlLFxuXHRcdFx0XHRyb290XG5cdFx0XHR9O1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5fYXR0YWNoKG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdHB1YmxpYyBzZXQgcm9vdChyb290OiBFbGVtZW50KSB7XG5cdFx0XHRpZiAodGhpcy5wcm9qZWN0b3JTdGF0ZSA9PT0gUHJvamVjdG9yQXR0YWNoU3RhdGUuQXR0YWNoZWQpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdQcm9qZWN0b3IgYWxyZWFkeSBhdHRhY2hlZCwgY2Fubm90IGNoYW5nZSByb290IGVsZW1lbnQnKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX3Jvb3QgPSByb290O1xuXHRcdH1cblxuXHRcdHB1YmxpYyBnZXQgcm9vdCgpOiBFbGVtZW50IHtcblx0XHRcdHJldHVybiB0aGlzLl9yb290O1xuXHRcdH1cblxuXHRcdHB1YmxpYyBnZXQgYXN5bmMoKTogYm9vbGVhbiB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fYXN5bmM7XG5cdFx0fVxuXG5cdFx0cHVibGljIHNldCBhc3luYyhhc3luYzogYm9vbGVhbikge1xuXHRcdFx0aWYgKHRoaXMucHJvamVjdG9yU3RhdGUgPT09IFByb2plY3RvckF0dGFjaFN0YXRlLkF0dGFjaGVkKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignUHJvamVjdG9yIGFscmVhZHkgYXR0YWNoZWQsIGNhbm5vdCBjaGFuZ2UgYXN5bmMgbW9kZScpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fYXN5bmMgPSBhc3luYztcblx0XHR9XG5cblx0XHRwdWJsaWMgc2FuZGJveChkb2M6IERvY3VtZW50ID0gZG9jdW1lbnQpOiB2b2lkIHtcblx0XHRcdGlmICh0aGlzLnByb2plY3RvclN0YXRlID09PSBQcm9qZWN0b3JBdHRhY2hTdGF0ZS5BdHRhY2hlZCkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1Byb2plY3RvciBhbHJlYWR5IGF0dGFjaGVkLCBjYW5ub3QgY3JlYXRlIHNhbmRib3gnKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2FzeW5jID0gZmFsc2U7XG5cdFx0XHRjb25zdCBwcmV2aW91c1Jvb3QgPSB0aGlzLnJvb3Q7XG5cblx0XHRcdC8qIGZyZWUgdXAgdGhlIGRvY3VtZW50IGZyYWdtZW50IGZvciBHQyAqL1xuXHRcdFx0dGhpcy5vd24oe1xuXHRcdFx0XHRkZXN0cm95OiAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5fcm9vdCA9IHByZXZpb3VzUm9vdDtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuX2F0dGFjaCh7XG5cdFx0XHRcdC8qIERvY3VtZW50RnJhZ21lbnQgaXMgbm90IGFzc2lnbmFibGUgdG8gRWxlbWVudCwgYnV0IHByb3ZpZGVzIGV2ZXJ5dGhpbmcgbmVlZGVkIHRvIHdvcmsgKi9cblx0XHRcdFx0cm9vdDogZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSBhcyBhbnksXG5cdFx0XHRcdHR5cGU6IEF0dGFjaFR5cGUuQXBwZW5kXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRwdWJsaWMgc2V0Q2hpbGRyZW4oY2hpbGRyZW46IEROb2RlW10pOiB2b2lkIHtcblx0XHRcdHRoaXMuX19zZXRDaGlsZHJlbl9fKGNoaWxkcmVuKTtcblx0XHR9XG5cblx0XHRwdWJsaWMgc2V0UHJvcGVydGllcyhwcm9wZXJ0aWVzOiB0aGlzWydwcm9wZXJ0aWVzJ10pOiB2b2lkIHtcblx0XHRcdHRoaXMuX19zZXRQcm9wZXJ0aWVzX18ocHJvcGVydGllcyk7XG5cdFx0fVxuXG5cdFx0cHVibGljIF9fc2V0UHJvcGVydGllc19fKHByb3BlcnRpZXM6IHRoaXNbJ3Byb3BlcnRpZXMnXSk6IHZvaWQge1xuXHRcdFx0aWYgKHRoaXMuX3Byb2plY3RvclByb3BlcnRpZXMgJiYgdGhpcy5fcHJvamVjdG9yUHJvcGVydGllcy5yZWdpc3RyeSAhPT0gcHJvcGVydGllcy5yZWdpc3RyeSkge1xuXHRcdFx0XHRpZiAodGhpcy5fcHJvamVjdG9yUHJvcGVydGllcy5yZWdpc3RyeSkge1xuXHRcdFx0XHRcdHRoaXMuX3Byb2plY3RvclByb3BlcnRpZXMucmVnaXN0cnkuZGVzdHJveSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9wcm9qZWN0b3JQcm9wZXJ0aWVzID0gYXNzaWduKHt9LCBwcm9wZXJ0aWVzKTtcblx0XHRcdHN1cGVyLl9fc2V0Q29yZVByb3BlcnRpZXNfXyh7IGJpbmQ6IHRoaXMsIGJhc2VSZWdpc3RyeTogcHJvcGVydGllcy5yZWdpc3RyeSB9KTtcblx0XHRcdHN1cGVyLl9fc2V0UHJvcGVydGllc19fKHByb3BlcnRpZXMpO1xuXHRcdH1cblxuXHRcdHB1YmxpYyB0b0h0bWwoKTogc3RyaW5nIHtcblx0XHRcdGlmICh0aGlzLnByb2plY3RvclN0YXRlICE9PSBQcm9qZWN0b3JBdHRhY2hTdGF0ZS5BdHRhY2hlZCB8fCAhdGhpcy5fcHJvamVjdGlvbikge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1Byb2plY3RvciBpcyBub3QgYXR0YWNoZWQsIGNhbm5vdCByZXR1cm4gYW4gSFRNTCBzdHJpbmcgb2YgcHJvamVjdGlvbi4nKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiAodGhpcy5fcHJvamVjdGlvbi5kb21Ob2RlLmNoaWxkTm9kZXNbMF0gYXMgRWxlbWVudCkub3V0ZXJIVE1MO1xuXHRcdH1cblxuXHRcdEBhZnRlclJlbmRlcigpXG5cdFx0cHVibGljIGFmdGVyUmVuZGVyKHJlc3VsdDogRE5vZGUpIHtcblx0XHRcdGxldCBub2RlID0gcmVzdWx0O1xuXHRcdFx0aWYgKHR5cGVvZiByZXN1bHQgPT09ICdzdHJpbmcnIHx8IHJlc3VsdCA9PT0gbnVsbCB8fCByZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRub2RlID0gdignc3BhbicsIHt9LCBbcmVzdWx0XSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdHB1YmxpYyBkZXN0cm95KCkge1xuXHRcdFx0c3VwZXIuZGVzdHJveSgpO1xuXHRcdH1cblxuXHRcdHByaXZhdGUgX2F0dGFjaCh7IHR5cGUsIHJvb3QgfTogQXR0YWNoT3B0aW9ucyk6IEhhbmRsZSB7XG5cdFx0XHRpZiAocm9vdCkge1xuXHRcdFx0XHR0aGlzLnJvb3QgPSByb290O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fYXR0YWNoSGFuZGxlKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9hdHRhY2hIYW5kbGU7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMucHJvamVjdG9yU3RhdGUgPSBQcm9qZWN0b3JBdHRhY2hTdGF0ZS5BdHRhY2hlZDtcblxuXHRcdFx0Y29uc3QgaGFuZGxlID0ge1xuXHRcdFx0XHRkZXN0cm95OiAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHRoaXMucHJvamVjdG9yU3RhdGUgPT09IFByb2plY3RvckF0dGFjaFN0YXRlLkF0dGFjaGVkKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9wcm9qZWN0aW9uID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0dGhpcy5wcm9qZWN0b3JTdGF0ZSA9IFByb2plY3RvckF0dGFjaFN0YXRlLkRldGFjaGVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5vd24oaGFuZGxlKTtcblx0XHRcdHRoaXMuX2F0dGFjaEhhbmRsZSA9IGhhbmRsZTtcblxuXHRcdFx0dGhpcy5fcHJvamVjdGlvbk9wdGlvbnMgPSB7IC4uLnRoaXMuX3Byb2plY3Rpb25PcHRpb25zLCAuLi57IHN5bmM6ICF0aGlzLl9hc3luYyB9IH07XG5cblx0XHRcdHN3aXRjaCAodHlwZSkge1xuXHRcdFx0XHRjYXNlIEF0dGFjaFR5cGUuQXBwZW5kOlxuXHRcdFx0XHRcdHRoaXMuX3Byb2plY3Rpb24gPSBkb20uYXBwZW5kKHRoaXMucm9vdCwgdGhpcywgdGhpcy5fcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIEF0dGFjaFR5cGUuTWVyZ2U6XG5cdFx0XHRcdFx0dGhpcy5fcHJvamVjdGlvbiA9IGRvbS5tZXJnZSh0aGlzLnJvb3QsIHRoaXMsIHRoaXMuX3Byb2plY3Rpb25PcHRpb25zKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXMuX2F0dGFjaEhhbmRsZTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gUHJvamVjdG9yO1xufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0b3JNaXhpbjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBQcm9qZWN0b3IudHMiLCJpbXBvcnQgZ2xvYmFsIGZyb20gJy4uL3NoaW0vZ2xvYmFsJztcbmltcG9ydCB7XG5cdENvcmVQcm9wZXJ0aWVzLFxuXHREZWZhdWx0V2lkZ2V0QmFzZUludGVyZmFjZSxcblx0RE5vZGUsXG5cdFZOb2RlLFxuXHRXTm9kZSxcblx0UHJvamVjdGlvbk9wdGlvbnMsXG5cdFByb2plY3Rpb24sXG5cdFN1cHBvcnRlZENsYXNzTmFtZSxcblx0VHJhbnNpdGlvblN0cmF0ZWd5LFxuXHRWTm9kZVByb3BlcnRpZXNcbn0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IGZyb20gYXMgYXJyYXlGcm9tIH0gZnJvbSAnLi4vc2hpbS9hcnJheSc7XG5pbXBvcnQgeyBpc1dOb2RlLCBpc1ZOb2RlLCBpc0RvbVZOb2RlLCBWTk9ERSwgV05PREUgfSBmcm9tICcuL2QnO1xuaW1wb3J0IHsgaXNXaWRnZXRCYXNlQ29uc3RydWN0b3IgfSBmcm9tICcuL1JlZ2lzdHJ5JztcbmltcG9ydCBXZWFrTWFwIGZyb20gJy4uL3NoaW0vV2Vha01hcCc7XG5pbXBvcnQgTm9kZUhhbmRsZXIgZnJvbSAnLi9Ob2RlSGFuZGxlcic7XG5pbXBvcnQgUmVnaXN0cnlIYW5kbGVyIGZyb20gJy4vUmVnaXN0cnlIYW5kbGVyJztcblxuY29uc3QgTkFNRVNQQUNFX1czID0gJ2h0dHA6Ly93d3cudzMub3JnLyc7XG5jb25zdCBOQU1FU1BBQ0VfU1ZHID0gTkFNRVNQQUNFX1czICsgJzIwMDAvc3ZnJztcbmNvbnN0IE5BTUVTUEFDRV9YTElOSyA9IE5BTUVTUEFDRV9XMyArICcxOTk5L3hsaW5rJztcblxuY29uc3QgZW1wdHlBcnJheTogKEludGVybmFsV05vZGUgfCBJbnRlcm5hbFZOb2RlKVtdID0gW107XG5cbmNvbnN0IG5vZGVPcGVyYXRpb25zID0gWydmb2N1cycsICdibHVyJywgJ3Njcm9sbEludG9WaWV3JywgJ2NsaWNrJ107XG5cbmV4cG9ydCB0eXBlIFJlbmRlclJlc3VsdCA9IEROb2RlPGFueT4gfCBETm9kZTxhbnk+W107XG5cbmludGVyZmFjZSBJbnN0YW5jZU1hcERhdGEge1xuXHRwYXJlbnRWTm9kZTogSW50ZXJuYWxWTm9kZTtcblx0ZG5vZGU6IEludGVybmFsV05vZGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW50ZXJuYWxXTm9kZSBleHRlbmRzIFdOb2RlPERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlPiB7XG5cdC8qKlxuXHQgKiBUaGUgaW5zdGFuY2Ugb2YgdGhlIHdpZGdldFxuXHQgKi9cblx0aW5zdGFuY2U6IERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlO1xuXG5cdC8qKlxuXHQgKiBUaGUgcmVuZGVyZWQgRE5vZGVzIGZyb20gdGhlIGluc3RhbmNlXG5cdCAqL1xuXHRyZW5kZXJlZDogSW50ZXJuYWxETm9kZVtdO1xuXG5cdC8qKlxuXHQgKiBDb3JlIHByb3BlcnRpZXMgdGhhdCBhcmUgdXNlZCBieSB0aGUgd2lkZ2V0IGNvcmUgc3lzdGVtXG5cdCAqL1xuXHRjb3JlUHJvcGVydGllczogQ29yZVByb3BlcnRpZXM7XG5cblx0LyoqXG5cdCAqIENoaWxkcmVuIGZvciB0aGUgV05vZGVcblx0ICovXG5cdGNoaWxkcmVuOiBJbnRlcm5hbEROb2RlW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW50ZXJuYWxWTm9kZSBleHRlbmRzIFZOb2RlIHtcblx0LyoqXG5cdCAqIENoaWxkcmVuIGZvciB0aGUgVk5vZGVcblx0ICovXG5cdGNoaWxkcmVuPzogSW50ZXJuYWxETm9kZVtdO1xuXG5cdGluc2VydGVkPzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQmFnIHVzZWQgdG8gc3RpbGwgZGVjb3JhdGUgcHJvcGVydGllcyBvbiBhIGRlZmVycmVkIHByb3BlcnRpZXMgY2FsbGJhY2tcblx0ICovXG5cdGRlY29yYXRlZERlZmVycmVkUHJvcGVydGllcz86IFZOb2RlUHJvcGVydGllcztcblxuXHQvKipcblx0ICogRE9NIGVsZW1lbnRcblx0ICovXG5cdGRvbU5vZGU/OiBFbGVtZW50IHwgVGV4dDtcbn1cblxuZXhwb3J0IHR5cGUgSW50ZXJuYWxETm9kZSA9IEludGVybmFsVk5vZGUgfCBJbnRlcm5hbFdOb2RlO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlclF1ZXVlIHtcblx0aW5zdGFuY2U6IERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlO1xuXHRkZXB0aDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdpZGdldERhdGEge1xuXHRvbkRldGFjaDogKCkgPT4gdm9pZDtcblx0b25BdHRhY2g6ICgpID0+IHZvaWQ7XG5cdGRpcnR5OiBib29sZWFuO1xuXHRyZWdpc3RyeTogKCkgPT4gUmVnaXN0cnlIYW5kbGVyO1xuXHRub2RlSGFuZGxlcjogTm9kZUhhbmRsZXI7XG5cdGNvcmVQcm9wZXJ0aWVzOiBDb3JlUHJvcGVydGllcztcblx0aW52YWxpZGF0ZT86IEZ1bmN0aW9uO1xuXHRyZW5kZXJpbmc6IGJvb2xlYW47XG5cdGlucHV0UHJvcGVydGllczogYW55O1xufVxuXG5pbnRlcmZhY2UgUHJvamVjdG9yU3RhdGUge1xuXHRkZWZlcnJlZFJlbmRlckNhbGxiYWNrczogRnVuY3Rpb25bXTtcblx0YWZ0ZXJSZW5kZXJDYWxsYmFja3M6IEZ1bmN0aW9uW107XG5cdG5vZGVNYXA6IFdlYWtNYXA8Tm9kZSwgV2Vha01hcDxGdW5jdGlvbiwgRXZlbnRMaXN0ZW5lcj4+O1xuXHRyZW5kZXJTY2hlZHVsZWQ/OiBudW1iZXI7XG5cdHJlbmRlclF1ZXVlOiBSZW5kZXJRdWV1ZVtdO1xuXHRtZXJnZTogYm9vbGVhbjtcblx0bWVyZ2VFbGVtZW50PzogTm9kZTtcbn1cblxuZXhwb3J0IGNvbnN0IHdpZGdldEluc3RhbmNlTWFwID0gbmV3IFdlYWtNYXA8YW55LCBXaWRnZXREYXRhPigpO1xuXG5jb25zdCBpbnN0YW5jZU1hcCA9IG5ldyBXZWFrTWFwPERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlLCBJbnN0YW5jZU1hcERhdGE+KCk7XG5jb25zdCBuZXh0U2libGluZ01hcCA9IG5ldyBXZWFrTWFwPERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlLCBJbnRlcm5hbEROb2RlW10+KCk7XG5jb25zdCBwcm9qZWN0b3JTdGF0ZU1hcCA9IG5ldyBXZWFrTWFwPERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlLCBQcm9qZWN0b3JTdGF0ZT4oKTtcblxuZnVuY3Rpb24gc2FtZShkbm9kZTE6IEludGVybmFsRE5vZGUsIGRub2RlMjogSW50ZXJuYWxETm9kZSkge1xuXHRpZiAoaXNWTm9kZShkbm9kZTEpICYmIGlzVk5vZGUoZG5vZGUyKSkge1xuXHRcdGlmIChpc0RvbVZOb2RlKGRub2RlMSkgfHwgaXNEb21WTm9kZShkbm9kZTIpKSB7XG5cdFx0XHRpZiAoZG5vZGUxLmRvbU5vZGUgIT09IGRub2RlMi5kb21Ob2RlKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKGRub2RlMS50YWcgIT09IGRub2RlMi50YWcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0aWYgKGRub2RlMS5wcm9wZXJ0aWVzLmtleSAhPT0gZG5vZGUyLnByb3BlcnRpZXMua2V5KSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGVsc2UgaWYgKGlzV05vZGUoZG5vZGUxKSAmJiBpc1dOb2RlKGRub2RlMikpIHtcblx0XHRpZiAoZG5vZGUxLmluc3RhbmNlID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIGRub2RlMi53aWRnZXRDb25zdHJ1Y3RvciA9PT0gJ3N0cmluZycpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0aWYgKGRub2RlMS53aWRnZXRDb25zdHJ1Y3RvciAhPT0gZG5vZGUyLndpZGdldENvbnN0cnVjdG9yKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGlmIChkbm9kZTEucHJvcGVydGllcy5rZXkgIT09IGRub2RlMi5wcm9wZXJ0aWVzLmtleSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59XG5cbmNvbnN0IG1pc3NpbmdUcmFuc2l0aW9uID0gZnVuY3Rpb24oKSB7XG5cdHRocm93IG5ldyBFcnJvcignUHJvdmlkZSBhIHRyYW5zaXRpb25zIG9iamVjdCB0byB0aGUgcHJvamVjdGlvbk9wdGlvbnMgdG8gZG8gYW5pbWF0aW9ucycpO1xufTtcblxuZnVuY3Rpb24gZ2V0UHJvamVjdGlvbk9wdGlvbnMoXG5cdHByb2plY3Rvck9wdGlvbnM6IFBhcnRpYWw8UHJvamVjdGlvbk9wdGlvbnM+LFxuXHRwcm9qZWN0b3JJbnN0YW5jZTogRGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2Vcbik6IFByb2plY3Rpb25PcHRpb25zIHtcblx0Y29uc3QgZGVmYXVsdHM6IFBhcnRpYWw8UHJvamVjdGlvbk9wdGlvbnM+ID0ge1xuXHRcdG5hbWVzcGFjZTogdW5kZWZpbmVkLFxuXHRcdHN0eWxlQXBwbHllcjogZnVuY3Rpb24oZG9tTm9kZTogSFRNTEVsZW1lbnQsIHN0eWxlTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG5cdFx0XHQoZG9tTm9kZS5zdHlsZSBhcyBhbnkpW3N0eWxlTmFtZV0gPSB2YWx1ZTtcblx0XHR9LFxuXHRcdHRyYW5zaXRpb25zOiB7XG5cdFx0XHRlbnRlcjogbWlzc2luZ1RyYW5zaXRpb24sXG5cdFx0XHRleGl0OiBtaXNzaW5nVHJhbnNpdGlvblxuXHRcdH0sXG5cdFx0ZGVwdGg6IDAsXG5cdFx0bWVyZ2U6IGZhbHNlLFxuXHRcdHN5bmM6IGZhbHNlLFxuXHRcdHByb2plY3Rvckluc3RhbmNlXG5cdH07XG5cdHJldHVybiB7IC4uLmRlZmF1bHRzLCAuLi5wcm9qZWN0b3JPcHRpb25zIH0gYXMgUHJvamVjdGlvbk9wdGlvbnM7XG59XG5cbmZ1bmN0aW9uIGNoZWNrU3R5bGVWYWx1ZShzdHlsZVZhbHVlOiBPYmplY3QpIHtcblx0aWYgKHR5cGVvZiBzdHlsZVZhbHVlICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBFcnJvcignU3R5bGUgdmFsdWVzIG11c3QgYmUgc3RyaW5ncycpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUV2ZW50KFxuXHRkb21Ob2RlOiBOb2RlLFxuXHRldmVudE5hbWU6IHN0cmluZyxcblx0Y3VycmVudFZhbHVlOiBGdW5jdGlvbixcblx0cHJvamVjdGlvbk9wdGlvbnM6IFByb2plY3Rpb25PcHRpb25zLFxuXHRiaW5kOiBhbnksXG5cdHByZXZpb3VzVmFsdWU/OiBGdW5jdGlvblxuKSB7XG5cdGNvbnN0IHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKSE7XG5cdGNvbnN0IGV2ZW50TWFwID0gcHJvamVjdG9yU3RhdGUubm9kZU1hcC5nZXQoZG9tTm9kZSkgfHwgbmV3IFdlYWtNYXAoKTtcblxuXHRpZiAocHJldmlvdXNWYWx1ZSkge1xuXHRcdGNvbnN0IHByZXZpb3VzRXZlbnQgPSBldmVudE1hcC5nZXQocHJldmlvdXNWYWx1ZSk7XG5cdFx0ZG9tTm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgcHJldmlvdXNFdmVudCk7XG5cdH1cblxuXHRsZXQgY2FsbGJhY2sgPSBjdXJyZW50VmFsdWUuYmluZChiaW5kKTtcblxuXHRpZiAoZXZlbnROYW1lID09PSAnaW5wdXQnKSB7XG5cdFx0Y2FsbGJhY2sgPSBmdW5jdGlvbih0aGlzOiBhbnksIGV2dDogRXZlbnQpIHtcblx0XHRcdGN1cnJlbnRWYWx1ZS5jYWxsKHRoaXMsIGV2dCk7XG5cdFx0XHQoZXZ0LnRhcmdldCBhcyBhbnkpWydvbmlucHV0LXZhbHVlJ10gPSAoZXZ0LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcblx0XHR9LmJpbmQoYmluZCk7XG5cdH1cblxuXHRkb21Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjayk7XG5cdGV2ZW50TWFwLnNldChjdXJyZW50VmFsdWUsIGNhbGxiYWNrKTtcblx0cHJvamVjdG9yU3RhdGUubm9kZU1hcC5zZXQoZG9tTm9kZSwgZXZlbnRNYXApO1xufVxuXG5mdW5jdGlvbiBhZGRDbGFzc2VzKGRvbU5vZGU6IEVsZW1lbnQsIGNsYXNzZXM6IFN1cHBvcnRlZENsYXNzTmFtZSkge1xuXHRpZiAoY2xhc3Nlcykge1xuXHRcdGNvbnN0IGNsYXNzTmFtZXMgPSBjbGFzc2VzLnNwbGl0KCcgJyk7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjbGFzc05hbWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRkb21Ob2RlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lc1tpXSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzZXMoZG9tTm9kZTogRWxlbWVudCwgY2xhc3NlczogU3VwcG9ydGVkQ2xhc3NOYW1lKSB7XG5cdGlmIChjbGFzc2VzKSB7XG5cdFx0Y29uc3QgY2xhc3NOYW1lcyA9IGNsYXNzZXMuc3BsaXQoJyAnKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNsYXNzTmFtZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGRvbU5vZGUuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWVzW2ldKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYnVpbGRQcmV2aW91c1Byb3BlcnRpZXMoZG9tTm9kZTogYW55LCBwcmV2aW91czogSW50ZXJuYWxWTm9kZSwgY3VycmVudDogSW50ZXJuYWxWTm9kZSkge1xuXHRjb25zdCB7IGRpZmZUeXBlLCBwcm9wZXJ0aWVzLCBhdHRyaWJ1dGVzIH0gPSBjdXJyZW50O1xuXHRpZiAoIWRpZmZUeXBlIHx8IGRpZmZUeXBlID09PSAndmRvbScpIHtcblx0XHRyZXR1cm4geyBwcm9wZXJ0aWVzOiBwcmV2aW91cy5wcm9wZXJ0aWVzLCBhdHRyaWJ1dGVzOiBwcmV2aW91cy5hdHRyaWJ1dGVzLCBldmVudHM6IHByZXZpb3VzLmV2ZW50cyB9O1xuXHR9IGVsc2UgaWYgKGRpZmZUeXBlID09PSAnbm9uZScpIHtcblx0XHRyZXR1cm4geyBwcm9wZXJ0aWVzOiB7fSwgYXR0cmlidXRlczogcHJldmlvdXMuYXR0cmlidXRlcyA/IHt9IDogdW5kZWZpbmVkLCBldmVudHM6IHByZXZpb3VzLmV2ZW50cyB9O1xuXHR9XG5cdGxldCBuZXdQcm9wZXJ0aWVzOiBhbnkgPSB7XG5cdFx0cHJvcGVydGllczoge31cblx0fTtcblx0aWYgKGF0dHJpYnV0ZXMpIHtcblx0XHRuZXdQcm9wZXJ0aWVzLmF0dHJpYnV0ZXMgPSB7fTtcblx0XHRuZXdQcm9wZXJ0aWVzLmV2ZW50cyA9IHByZXZpb3VzLmV2ZW50cztcblx0XHRPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKS5mb3JFYWNoKChwcm9wTmFtZSkgPT4ge1xuXHRcdFx0bmV3UHJvcGVydGllcy5wcm9wZXJ0aWVzW3Byb3BOYW1lXSA9IGRvbU5vZGVbcHJvcE5hbWVdO1xuXHRcdH0pO1xuXHRcdE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goKGF0dHJOYW1lKSA9PiB7XG5cdFx0XHRuZXdQcm9wZXJ0aWVzLmF0dHJpYnV0ZXNbYXR0ck5hbWVdID0gZG9tTm9kZS5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuXHRcdH0pO1xuXHRcdHJldHVybiBuZXdQcm9wZXJ0aWVzO1xuXHR9XG5cdG5ld1Byb3BlcnRpZXMucHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLnJlZHVjZShcblx0XHQocHJvcHMsIHByb3BlcnR5KSA9PiB7XG5cdFx0XHRwcm9wc1twcm9wZXJ0eV0gPSBkb21Ob2RlLmdldEF0dHJpYnV0ZShwcm9wZXJ0eSkgfHwgZG9tTm9kZVtwcm9wZXJ0eV07XG5cdFx0XHRyZXR1cm4gcHJvcHM7XG5cdFx0fSxcblx0XHR7fSBhcyBhbnlcblx0KTtcblx0cmV0dXJuIG5ld1Byb3BlcnRpZXM7XG59XG5cbmZ1bmN0aW9uIG5vZGVPcGVyYXRpb24oXG5cdHByb3BOYW1lOiBzdHJpbmcsXG5cdHByb3BWYWx1ZTogYW55LFxuXHRwcmV2aW91c1ZhbHVlOiBhbnksXG5cdGRvbU5vZGU6IEVsZW1lbnQsXG5cdHByb2plY3Rpb25PcHRpb25zOiBQcm9qZWN0aW9uT3B0aW9uc1xuKTogdm9pZCB7XG5cdGxldCByZXN1bHQ7XG5cdGlmICh0eXBlb2YgcHJvcFZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmVzdWx0ID0gcHJvcFZhbHVlKCk7XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0ID0gcHJvcFZhbHVlICYmICFwcmV2aW91c1ZhbHVlO1xuXHR9XG5cdGlmIChyZXN1bHQgPT09IHRydWUpIHtcblx0XHRjb25zdCBwcm9qZWN0b3JTdGF0ZSA9IHByb2plY3RvclN0YXRlTWFwLmdldChwcm9qZWN0aW9uT3B0aW9ucy5wcm9qZWN0b3JJbnN0YW5jZSkhO1xuXHRcdHByb2plY3RvclN0YXRlLmRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzLnB1c2goKCkgPT4ge1xuXHRcdFx0KGRvbU5vZGUgYXMgYW55KVtwcm9wTmFtZV0oKTtcblx0XHR9KTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVPcnBoYW5lZEV2ZW50cyhcblx0ZG9tTm9kZTogRWxlbWVudCxcblx0cHJldmlvdXNQcm9wZXJ0aWVzOiBWTm9kZVByb3BlcnRpZXMsXG5cdHByb3BlcnRpZXM6IFZOb2RlUHJvcGVydGllcyxcblx0cHJvamVjdGlvbk9wdGlvbnM6IFByb2plY3Rpb25PcHRpb25zLFxuXHRvbmx5RXZlbnRzOiBib29sZWFuID0gZmFsc2Vcbikge1xuXHRjb25zdCBwcm9qZWN0b3JTdGF0ZSA9IHByb2plY3RvclN0YXRlTWFwLmdldChwcm9qZWN0aW9uT3B0aW9ucy5wcm9qZWN0b3JJbnN0YW5jZSkhO1xuXHRjb25zdCBldmVudE1hcCA9IHByb2plY3RvclN0YXRlLm5vZGVNYXAuZ2V0KGRvbU5vZGUpO1xuXHRpZiAoZXZlbnRNYXApIHtcblx0XHRPYmplY3Qua2V5cyhwcmV2aW91c1Byb3BlcnRpZXMpLmZvckVhY2goKHByb3BOYW1lKSA9PiB7XG5cdFx0XHRjb25zdCBpc0V2ZW50ID0gcHJvcE5hbWUuc3Vic3RyKDAsIDIpID09PSAnb24nIHx8IG9ubHlFdmVudHM7XG5cdFx0XHRjb25zdCBldmVudE5hbWUgPSBvbmx5RXZlbnRzID8gcHJvcE5hbWUgOiBwcm9wTmFtZS5zdWJzdHIoMik7XG5cdFx0XHRpZiAoaXNFdmVudCAmJiAhcHJvcGVydGllc1twcm9wTmFtZV0pIHtcblx0XHRcdFx0Y29uc3QgZXZlbnRDYWxsYmFjayA9IGV2ZW50TWFwLmdldChwcmV2aW91c1Byb3BlcnRpZXNbcHJvcE5hbWVdKTtcblx0XHRcdFx0aWYgKGV2ZW50Q2FsbGJhY2spIHtcblx0XHRcdFx0XHRkb21Ob2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudENhbGxiYWNrKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZShkb21Ob2RlOiBFbGVtZW50LCBhdHRyTmFtZTogc3RyaW5nLCBhdHRyVmFsdWU6IHN0cmluZywgcHJvamVjdGlvbk9wdGlvbnM6IFByb2plY3Rpb25PcHRpb25zKSB7XG5cdGlmIChwcm9qZWN0aW9uT3B0aW9ucy5uYW1lc3BhY2UgPT09IE5BTUVTUEFDRV9TVkcgJiYgYXR0ck5hbWUgPT09ICdocmVmJykge1xuXHRcdGRvbU5vZGUuc2V0QXR0cmlidXRlTlMoTkFNRVNQQUNFX1hMSU5LLCBhdHRyTmFtZSwgYXR0clZhbHVlKTtcblx0fSBlbHNlIGlmICgoYXR0ck5hbWUgPT09ICdyb2xlJyAmJiBhdHRyVmFsdWUgPT09ICcnKSB8fCBhdHRyVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdGRvbU5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcblx0fSBlbHNlIHtcblx0XHRkb21Ob2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVBdHRyaWJ1dGVzKFxuXHRkb21Ob2RlOiBFbGVtZW50LFxuXHRwcmV2aW91c0F0dHJpYnV0ZXM6IHsgW2luZGV4OiBzdHJpbmddOiBzdHJpbmcgfSxcblx0YXR0cmlidXRlczogeyBbaW5kZXg6IHN0cmluZ106IHN0cmluZyB9LFxuXHRwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnNcbikge1xuXHRjb25zdCBhdHRyTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKTtcblx0Y29uc3QgYXR0ckNvdW50ID0gYXR0ck5hbWVzLmxlbmd0aDtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyQ291bnQ7IGkrKykge1xuXHRcdGNvbnN0IGF0dHJOYW1lID0gYXR0ck5hbWVzW2ldO1xuXHRcdGNvbnN0IGF0dHJWYWx1ZSA9IGF0dHJpYnV0ZXNbYXR0ck5hbWVdO1xuXHRcdGNvbnN0IHByZXZpb3VzQXR0clZhbHVlID0gcHJldmlvdXNBdHRyaWJ1dGVzW2F0dHJOYW1lXTtcblx0XHRpZiAoYXR0clZhbHVlICE9PSBwcmV2aW91c0F0dHJWYWx1ZSkge1xuXHRcdFx0dXBkYXRlQXR0cmlidXRlKGRvbU5vZGUsIGF0dHJOYW1lLCBhdHRyVmFsdWUsIHByb2plY3Rpb25PcHRpb25zKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlUHJvcGVydGllcyhcblx0ZG9tTm9kZTogRWxlbWVudCxcblx0cHJldmlvdXNQcm9wZXJ0aWVzOiBWTm9kZVByb3BlcnRpZXMsXG5cdHByb3BlcnRpZXM6IFZOb2RlUHJvcGVydGllcyxcblx0cHJvamVjdGlvbk9wdGlvbnM6IFByb2plY3Rpb25PcHRpb25zLFxuXHRpbmNsdWRlc0V2ZW50c0FuZEF0dHJpYnV0ZXMgPSB0cnVlXG4pIHtcblx0bGV0IHByb3BlcnRpZXNVcGRhdGVkID0gZmFsc2U7XG5cdGNvbnN0IHByb3BOYW1lcyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xuXHRjb25zdCBwcm9wQ291bnQgPSBwcm9wTmFtZXMubGVuZ3RoO1xuXHRpZiAocHJvcE5hbWVzLmluZGV4T2YoJ2NsYXNzZXMnKSA9PT0gLTEgJiYgcHJldmlvdXNQcm9wZXJ0aWVzLmNsYXNzZXMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShwcmV2aW91c1Byb3BlcnRpZXMuY2xhc3NlcykpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcHJldmlvdXNQcm9wZXJ0aWVzLmNsYXNzZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0cmVtb3ZlQ2xhc3Nlcyhkb21Ob2RlLCBwcmV2aW91c1Byb3BlcnRpZXMuY2xhc3Nlc1tpXSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZUNsYXNzZXMoZG9tTm9kZSwgcHJldmlvdXNQcm9wZXJ0aWVzLmNsYXNzZXMpO1xuXHRcdH1cblx0fVxuXG5cdGluY2x1ZGVzRXZlbnRzQW5kQXR0cmlidXRlcyAmJiByZW1vdmVPcnBoYW5lZEV2ZW50cyhkb21Ob2RlLCBwcmV2aW91c1Byb3BlcnRpZXMsIHByb3BlcnRpZXMsIHByb2plY3Rpb25PcHRpb25zKTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHByb3BDb3VudDsgaSsrKSB7XG5cdFx0Y29uc3QgcHJvcE5hbWUgPSBwcm9wTmFtZXNbaV07XG5cdFx0bGV0IHByb3BWYWx1ZSA9IHByb3BlcnRpZXNbcHJvcE5hbWVdO1xuXHRcdGNvbnN0IHByZXZpb3VzVmFsdWUgPSBwcmV2aW91c1Byb3BlcnRpZXMhW3Byb3BOYW1lXTtcblx0XHRpZiAocHJvcE5hbWUgPT09ICdjbGFzc2VzJykge1xuXHRcdFx0Y29uc3QgcHJldmlvdXNDbGFzc2VzID0gQXJyYXkuaXNBcnJheShwcmV2aW91c1ZhbHVlKSA/IHByZXZpb3VzVmFsdWUgOiBbcHJldmlvdXNWYWx1ZV07XG5cdFx0XHRjb25zdCBjdXJyZW50Q2xhc3NlcyA9IEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSA/IHByb3BWYWx1ZSA6IFtwcm9wVmFsdWVdO1xuXHRcdFx0aWYgKHByZXZpb3VzQ2xhc3NlcyAmJiBwcmV2aW91c0NsYXNzZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRpZiAoIXByb3BWYWx1ZSB8fCBwcm9wVmFsdWUubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwcmV2aW91c0NsYXNzZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdHJlbW92ZUNsYXNzZXMoZG9tTm9kZSwgcHJldmlvdXNDbGFzc2VzW2ldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29uc3QgbmV3Q2xhc3NlczogKG51bGwgfCB1bmRlZmluZWQgfCBzdHJpbmcpW10gPSBbLi4uY3VycmVudENsYXNzZXNdO1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcHJldmlvdXNDbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBwcmV2aW91c0NsYXNzTmFtZSA9IHByZXZpb3VzQ2xhc3Nlc1tpXTtcblx0XHRcdFx0XHRcdGlmIChwcmV2aW91c0NsYXNzTmFtZSkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBjbGFzc0luZGV4ID0gbmV3Q2xhc3Nlcy5pbmRleE9mKHByZXZpb3VzQ2xhc3NOYW1lKTtcblx0XHRcdFx0XHRcdFx0aWYgKGNsYXNzSW5kZXggPT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVtb3ZlQ2xhc3Nlcyhkb21Ob2RlLCBwcmV2aW91c0NsYXNzTmFtZSk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0bmV3Q2xhc3Nlcy5zcGxpY2UoY2xhc3NJbmRleCwgMSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuZXdDbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRhZGRDbGFzc2VzKGRvbU5vZGUsIG5ld0NsYXNzZXNbaV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50Q2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGFkZENsYXNzZXMoZG9tTm9kZSwgY3VycmVudENsYXNzZXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChub2RlT3BlcmF0aW9ucy5pbmRleE9mKHByb3BOYW1lKSAhPT0gLTEpIHtcblx0XHRcdG5vZGVPcGVyYXRpb24ocHJvcE5hbWUsIHByb3BWYWx1ZSwgcHJldmlvdXNWYWx1ZSwgZG9tTm9kZSwgcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdH0gZWxzZSBpZiAocHJvcE5hbWUgPT09ICdzdHlsZXMnKSB7XG5cdFx0XHRjb25zdCBzdHlsZU5hbWVzID0gT2JqZWN0LmtleXMocHJvcFZhbHVlKTtcblx0XHRcdGNvbnN0IHN0eWxlQ291bnQgPSBzdHlsZU5hbWVzLmxlbmd0aDtcblx0XHRcdGZvciAobGV0IGogPSAwOyBqIDwgc3R5bGVDb3VudDsgaisrKSB7XG5cdFx0XHRcdGNvbnN0IHN0eWxlTmFtZSA9IHN0eWxlTmFtZXNbal07XG5cdFx0XHRcdGNvbnN0IG5ld1N0eWxlVmFsdWUgPSBwcm9wVmFsdWVbc3R5bGVOYW1lXTtcblx0XHRcdFx0Y29uc3Qgb2xkU3R5bGVWYWx1ZSA9IHByZXZpb3VzVmFsdWUgJiYgcHJldmlvdXNWYWx1ZVtzdHlsZU5hbWVdO1xuXHRcdFx0XHRpZiAobmV3U3R5bGVWYWx1ZSA9PT0gb2xkU3R5bGVWYWx1ZSkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHByb3BlcnRpZXNVcGRhdGVkID0gdHJ1ZTtcblx0XHRcdFx0aWYgKG5ld1N0eWxlVmFsdWUpIHtcblx0XHRcdFx0XHRjaGVja1N0eWxlVmFsdWUobmV3U3R5bGVWYWx1ZSk7XG5cdFx0XHRcdFx0cHJvamVjdGlvbk9wdGlvbnMuc3R5bGVBcHBseWVyIShkb21Ob2RlIGFzIEhUTUxFbGVtZW50LCBzdHlsZU5hbWUsIG5ld1N0eWxlVmFsdWUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHByb2plY3Rpb25PcHRpb25zLnN0eWxlQXBwbHllciEoZG9tTm9kZSBhcyBIVE1MRWxlbWVudCwgc3R5bGVOYW1lLCAnJyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKCFwcm9wVmFsdWUgJiYgdHlwZW9mIHByZXZpb3VzVmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHByb3BWYWx1ZSA9ICcnO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHByb3BOYW1lID09PSAndmFsdWUnKSB7XG5cdFx0XHRcdGNvbnN0IGRvbVZhbHVlID0gKGRvbU5vZGUgYXMgYW55KVtwcm9wTmFtZV07XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRkb21WYWx1ZSAhPT0gcHJvcFZhbHVlICYmXG5cdFx0XHRcdFx0KChkb21Ob2RlIGFzIGFueSlbJ29uaW5wdXQtdmFsdWUnXVxuXHRcdFx0XHRcdFx0PyBkb21WYWx1ZSA9PT0gKGRvbU5vZGUgYXMgYW55KVsnb25pbnB1dC12YWx1ZSddXG5cdFx0XHRcdFx0XHQ6IHByb3BWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSlcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0KGRvbU5vZGUgYXMgYW55KVtwcm9wTmFtZV0gPSBwcm9wVmFsdWU7XG5cdFx0XHRcdFx0KGRvbU5vZGUgYXMgYW55KVsnb25pbnB1dC12YWx1ZSddID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChwcm9wVmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcblx0XHRcdFx0XHRwcm9wZXJ0aWVzVXBkYXRlZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAocHJvcE5hbWUgIT09ICdrZXknICYmIHByb3BWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xuXHRcdFx0XHRjb25zdCB0eXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcblx0XHRcdFx0aWYgKHR5cGUgPT09ICdmdW5jdGlvbicgJiYgcHJvcE5hbWUubGFzdEluZGV4T2YoJ29uJywgMCkgPT09IDAgJiYgaW5jbHVkZXNFdmVudHNBbmRBdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdFx0dXBkYXRlRXZlbnQoXG5cdFx0XHRcdFx0XHRkb21Ob2RlLFxuXHRcdFx0XHRcdFx0cHJvcE5hbWUuc3Vic3RyKDIpLFxuXHRcdFx0XHRcdFx0cHJvcFZhbHVlLFxuXHRcdFx0XHRcdFx0cHJvamVjdGlvbk9wdGlvbnMsXG5cdFx0XHRcdFx0XHRwcm9wZXJ0aWVzLmJpbmQsXG5cdFx0XHRcdFx0XHRwcmV2aW91c1ZhbHVlXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiBwcm9wTmFtZSAhPT0gJ2lubmVySFRNTCcgJiYgaW5jbHVkZXNFdmVudHNBbmRBdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdFx0dXBkYXRlQXR0cmlidXRlKGRvbU5vZGUsIHByb3BOYW1lLCBwcm9wVmFsdWUsIHByb2plY3Rpb25PcHRpb25zKTtcblx0XHRcdFx0fSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gJ3Njcm9sbExlZnQnIHx8IHByb3BOYW1lID09PSAnc2Nyb2xsVG9wJykge1xuXHRcdFx0XHRcdGlmICgoZG9tTm9kZSBhcyBhbnkpW3Byb3BOYW1lXSAhPT0gcHJvcFZhbHVlKSB7XG5cdFx0XHRcdFx0XHQoZG9tTm9kZSBhcyBhbnkpW3Byb3BOYW1lXSA9IHByb3BWYWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0KGRvbU5vZGUgYXMgYW55KVtwcm9wTmFtZV0gPSBwcm9wVmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0cHJvcGVydGllc1VwZGF0ZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gcHJvcGVydGllc1VwZGF0ZWQ7XG59XG5cbmZ1bmN0aW9uIGZpbmRJbmRleE9mQ2hpbGQoY2hpbGRyZW46IEludGVybmFsRE5vZGVbXSwgc2FtZUFzOiBJbnRlcm5hbEROb2RlLCBzdGFydDogbnVtYmVyKSB7XG5cdGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKHNhbWUoY2hpbGRyZW5baV0sIHNhbWVBcykpIHtcblx0XHRcdHJldHVybiBpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gLTE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1BhcmVudFZOb2RlKGRvbU5vZGU6IEVsZW1lbnQpOiBJbnRlcm5hbFZOb2RlIHtcblx0cmV0dXJuIHtcblx0XHR0YWc6ICcnLFxuXHRcdHByb3BlcnRpZXM6IHt9LFxuXHRcdGNoaWxkcmVuOiB1bmRlZmluZWQsXG5cdFx0ZG9tTm9kZSxcblx0XHR0eXBlOiBWTk9ERVxuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9UZXh0Vk5vZGUoZGF0YTogYW55KTogSW50ZXJuYWxWTm9kZSB7XG5cdHJldHVybiB7XG5cdFx0dGFnOiAnJyxcblx0XHRwcm9wZXJ0aWVzOiB7fSxcblx0XHRjaGlsZHJlbjogdW5kZWZpbmVkLFxuXHRcdHRleHQ6IGAke2RhdGF9YCxcblx0XHRkb21Ob2RlOiB1bmRlZmluZWQsXG5cdFx0dHlwZTogVk5PREVcblx0fTtcbn1cblxuZnVuY3Rpb24gdG9JbnRlcm5hbFdOb2RlKGluc3RhbmNlOiBEZWZhdWx0V2lkZ2V0QmFzZUludGVyZmFjZSwgaW5zdGFuY2VEYXRhOiBXaWRnZXREYXRhKTogSW50ZXJuYWxXTm9kZSB7XG5cdHJldHVybiB7XG5cdFx0aW5zdGFuY2UsXG5cdFx0cmVuZGVyZWQ6IFtdLFxuXHRcdGNvcmVQcm9wZXJ0aWVzOiBpbnN0YW5jZURhdGEuY29yZVByb3BlcnRpZXMsXG5cdFx0Y2hpbGRyZW46IGluc3RhbmNlLmNoaWxkcmVuIGFzIGFueSxcblx0XHR3aWRnZXRDb25zdHJ1Y3RvcjogaW5zdGFuY2UuY29uc3RydWN0b3IgYXMgYW55LFxuXHRcdHByb3BlcnRpZXM6IGluc3RhbmNlRGF0YS5pbnB1dFByb3BlcnRpZXMsXG5cdFx0dHlwZTogV05PREVcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlckFuZERlY29yYXRlQ2hpbGRyZW4oXG5cdGNoaWxkcmVuOiB1bmRlZmluZWQgfCBETm9kZSB8IEROb2RlW10sXG5cdGluc3RhbmNlOiBEZWZhdWx0V2lkZ2V0QmFzZUludGVyZmFjZVxuKTogSW50ZXJuYWxETm9kZVtdIHtcblx0aWYgKGNoaWxkcmVuID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gZW1wdHlBcnJheTtcblx0fVxuXHRjaGlsZHJlbiA9IEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pID8gY2hpbGRyZW4gOiBbY2hpbGRyZW5dO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyApIHtcblx0XHRjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2ldIGFzIEludGVybmFsRE5vZGU7XG5cdFx0aWYgKGNoaWxkID09PSB1bmRlZmluZWQgfHwgY2hpbGQgPT09IG51bGwpIHtcblx0XHRcdGNoaWxkcmVuLnNwbGljZShpLCAxKTtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGNoaWxkID09PSAnc3RyaW5nJykge1xuXHRcdFx0Y2hpbGRyZW5baV0gPSB0b1RleHRWTm9kZShjaGlsZCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChpc1ZOb2RlKGNoaWxkKSkge1xuXHRcdFx0XHRpZiAoY2hpbGQucHJvcGVydGllcy5iaW5kID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHQoY2hpbGQucHJvcGVydGllcyBhcyBhbnkpLmJpbmQgPSBpbnN0YW5jZTtcblx0XHRcdFx0XHRpZiAoY2hpbGQuY2hpbGRyZW4gJiYgY2hpbGQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0ZmlsdGVyQW5kRGVjb3JhdGVDaGlsZHJlbihjaGlsZC5jaGlsZHJlbiwgaW5zdGFuY2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCFjaGlsZC5jb3JlUHJvcGVydGllcykge1xuXHRcdFx0XHRcdGNvbnN0IGluc3RhbmNlRGF0YSA9IHdpZGdldEluc3RhbmNlTWFwLmdldChpbnN0YW5jZSkhO1xuXHRcdFx0XHRcdGNoaWxkLmNvcmVQcm9wZXJ0aWVzID0ge1xuXHRcdFx0XHRcdFx0YmluZDogaW5zdGFuY2UsXG5cdFx0XHRcdFx0XHRiYXNlUmVnaXN0cnk6IGluc3RhbmNlRGF0YS5jb3JlUHJvcGVydGllcy5iYXNlUmVnaXN0cnlcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChjaGlsZC5jaGlsZHJlbiAmJiBjaGlsZC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0ZmlsdGVyQW5kRGVjb3JhdGVDaGlsZHJlbihjaGlsZC5jaGlsZHJlbiwgaW5zdGFuY2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGkrKztcblx0fVxuXHRyZXR1cm4gY2hpbGRyZW4gYXMgSW50ZXJuYWxETm9kZVtdO1xufVxuXG5mdW5jdGlvbiBub2RlQWRkZWQoZG5vZGU6IEludGVybmFsRE5vZGUsIHRyYW5zaXRpb25zOiBUcmFuc2l0aW9uU3RyYXRlZ3kpIHtcblx0aWYgKGlzVk5vZGUoZG5vZGUpICYmIGRub2RlLnByb3BlcnRpZXMpIHtcblx0XHRjb25zdCBlbnRlckFuaW1hdGlvbiA9IGRub2RlLnByb3BlcnRpZXMuZW50ZXJBbmltYXRpb247XG5cdFx0aWYgKGVudGVyQW5pbWF0aW9uKSB7XG5cdFx0XHRpZiAodHlwZW9mIGVudGVyQW5pbWF0aW9uID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdGVudGVyQW5pbWF0aW9uKGRub2RlLmRvbU5vZGUgYXMgRWxlbWVudCwgZG5vZGUucHJvcGVydGllcyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0cmFuc2l0aW9ucy5lbnRlcihkbm9kZS5kb21Ob2RlIGFzIEVsZW1lbnQsIGRub2RlLnByb3BlcnRpZXMsIGVudGVyQW5pbWF0aW9uIGFzIHN0cmluZyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIG5vZGVUb1JlbW92ZShkbm9kZTogSW50ZXJuYWxETm9kZSwgdHJhbnNpdGlvbnM6IFRyYW5zaXRpb25TdHJhdGVneSwgcHJvamVjdGlvbk9wdGlvbnM6IFByb2plY3Rpb25PcHRpb25zKSB7XG5cdGlmIChpc1dOb2RlKGRub2RlKSkge1xuXHRcdGNvbnN0IGl0ZW0gPSBpbnN0YW5jZU1hcC5nZXQoZG5vZGUuaW5zdGFuY2UpO1xuXHRcdGNvbnN0IHJlbmRlcmVkID0gKGl0ZW0gPyBpdGVtLmRub2RlLnJlbmRlcmVkIDogZG5vZGUucmVuZGVyZWQpIHx8IGVtcHR5QXJyYXk7XG5cdFx0aWYgKGRub2RlLmluc3RhbmNlKSB7XG5cdFx0XHRjb25zdCBpbnN0YW5jZURhdGEgPSB3aWRnZXRJbnN0YW5jZU1hcC5nZXQoZG5vZGUuaW5zdGFuY2UpITtcblx0XHRcdGluc3RhbmNlRGF0YS5vbkRldGFjaCgpO1xuXHRcdFx0aW5zdGFuY2VNYXAuZGVsZXRlKGRub2RlLmluc3RhbmNlKTtcblx0XHR9XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0bm9kZVRvUmVtb3ZlKHJlbmRlcmVkW2ldLCB0cmFuc2l0aW9ucywgcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRjb25zdCBkb21Ob2RlID0gZG5vZGUuZG9tTm9kZTtcblx0XHRjb25zdCBwcm9wZXJ0aWVzID0gZG5vZGUucHJvcGVydGllcztcblx0XHRpZiAoZG5vZGUuY2hpbGRyZW4gJiYgZG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRub2RlVG9SZW1vdmUoZG5vZGUuY2hpbGRyZW5baV0sIHRyYW5zaXRpb25zLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGNvbnN0IGV4aXRBbmltYXRpb24gPSBwcm9wZXJ0aWVzLmV4aXRBbmltYXRpb247XG5cdFx0aWYgKHByb3BlcnRpZXMgJiYgZXhpdEFuaW1hdGlvbikge1xuXHRcdFx0KGRvbU5vZGUgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG5cdFx0XHRjb25zdCByZW1vdmVEb21Ob2RlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGRvbU5vZGUgJiYgZG9tTm9kZS5wYXJlbnROb2RlICYmIGRvbU5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb21Ob2RlKTtcblx0XHRcdFx0ZG5vZGUuZG9tTm9kZSA9IHVuZGVmaW5lZDtcblx0XHRcdH07XG5cdFx0XHRpZiAodHlwZW9mIGV4aXRBbmltYXRpb24gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0ZXhpdEFuaW1hdGlvbihkb21Ob2RlIGFzIEVsZW1lbnQsIHJlbW92ZURvbU5vZGUsIHByb3BlcnRpZXMpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0cmFuc2l0aW9ucy5leGl0KGRub2RlLmRvbU5vZGUgYXMgRWxlbWVudCwgcHJvcGVydGllcywgZXhpdEFuaW1hdGlvbiBhcyBzdHJpbmcsIHJlbW92ZURvbU5vZGUpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGRvbU5vZGUgJiYgZG9tTm9kZS5wYXJlbnROb2RlICYmIGRvbU5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb21Ob2RlKTtcblx0XHRkbm9kZS5kb21Ob2RlID0gdW5kZWZpbmVkO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNoZWNrRGlzdGluZ3Vpc2hhYmxlKFxuXHRjaGlsZE5vZGVzOiBJbnRlcm5hbEROb2RlW10sXG5cdGluZGV4VG9DaGVjazogbnVtYmVyLFxuXHRwYXJlbnRJbnN0YW5jZTogRGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2Vcbikge1xuXHRjb25zdCBjaGlsZE5vZGUgPSBjaGlsZE5vZGVzW2luZGV4VG9DaGVja107XG5cdGlmIChpc1ZOb2RlKGNoaWxkTm9kZSkgJiYgIWNoaWxkTm9kZS50YWcpIHtcblx0XHRyZXR1cm47IC8vIFRleHQgbm9kZXMgbmVlZCBub3QgYmUgZGlzdGluZ3Vpc2hhYmxlXG5cdH1cblx0Y29uc3QgeyBrZXkgfSA9IGNoaWxkTm9kZS5wcm9wZXJ0aWVzO1xuXG5cdGlmIChrZXkgPT09IHVuZGVmaW5lZCB8fCBrZXkgPT09IG51bGwpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChpICE9PSBpbmRleFRvQ2hlY2spIHtcblx0XHRcdFx0Y29uc3Qgbm9kZSA9IGNoaWxkTm9kZXNbaV07XG5cdFx0XHRcdGlmIChzYW1lKG5vZGUsIGNoaWxkTm9kZSkpIHtcblx0XHRcdFx0XHRsZXQgbm9kZUlkZW50aWZpZXI6IHN0cmluZztcblx0XHRcdFx0XHRjb25zdCBwYXJlbnROYW1lID0gKHBhcmVudEluc3RhbmNlIGFzIGFueSkuY29uc3RydWN0b3IubmFtZSB8fCAndW5rbm93bic7XG5cdFx0XHRcdFx0aWYgKGlzV05vZGUoY2hpbGROb2RlKSkge1xuXHRcdFx0XHRcdFx0bm9kZUlkZW50aWZpZXIgPSAoY2hpbGROb2RlLndpZGdldENvbnN0cnVjdG9yIGFzIGFueSkubmFtZSB8fCAndW5rbm93bic7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG5vZGVJZGVudGlmaWVyID0gY2hpbGROb2RlLnRhZztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFx0XHRgQSB3aWRnZXQgKCR7cGFyZW50TmFtZX0pIGhhcyBoYWQgYSBjaGlsZCBhZGRkZWQgb3IgcmVtb3ZlZCwgYnV0IHRoZXkgd2VyZSBub3QgYWJsZSB0byB1bmlxdWVseSBpZGVudGlmaWVkLiBJdCBpcyByZWNvbW1lbmRlZCB0byBwcm92aWRlIGEgdW5pcXVlICdrZXknIHByb3BlcnR5IHdoZW4gdXNpbmcgdGhlIHNhbWUgd2lkZ2V0IG9yIGVsZW1lbnQgKCR7bm9kZUlkZW50aWZpZXJ9KSBtdWx0aXBsZSB0aW1lcyBhcyBzaWJsaW5nc2Bcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNoaWxkcmVuKFxuXHRwYXJlbnRWTm9kZTogSW50ZXJuYWxWTm9kZSxcblx0c2libGluZ3M6IEludGVybmFsRE5vZGVbXSxcblx0b2xkQ2hpbGRyZW46IEludGVybmFsRE5vZGVbXSxcblx0bmV3Q2hpbGRyZW46IEludGVybmFsRE5vZGVbXSxcblx0cGFyZW50SW5zdGFuY2U6IERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlLFxuXHRwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnNcbikge1xuXHRvbGRDaGlsZHJlbiA9IG9sZENoaWxkcmVuIHx8IGVtcHR5QXJyYXk7XG5cdG5ld0NoaWxkcmVuID0gbmV3Q2hpbGRyZW47XG5cdGNvbnN0IG9sZENoaWxkcmVuTGVuZ3RoID0gb2xkQ2hpbGRyZW4ubGVuZ3RoO1xuXHRjb25zdCBuZXdDaGlsZHJlbkxlbmd0aCA9IG5ld0NoaWxkcmVuLmxlbmd0aDtcblx0Y29uc3QgdHJhbnNpdGlvbnMgPSBwcm9qZWN0aW9uT3B0aW9ucy50cmFuc2l0aW9ucyE7XG5cdGNvbnN0IHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKSE7XG5cdHByb2plY3Rpb25PcHRpb25zID0geyAuLi5wcm9qZWN0aW9uT3B0aW9ucywgZGVwdGg6IHByb2plY3Rpb25PcHRpb25zLmRlcHRoICsgMSB9O1xuXHRsZXQgb2xkSW5kZXggPSAwO1xuXHRsZXQgbmV3SW5kZXggPSAwO1xuXHRsZXQgaTogbnVtYmVyO1xuXHRsZXQgdGV4dFVwZGF0ZWQgPSBmYWxzZTtcblx0d2hpbGUgKG5ld0luZGV4IDwgbmV3Q2hpbGRyZW5MZW5ndGgpIHtcblx0XHRsZXQgb2xkQ2hpbGQgPSBvbGRJbmRleCA8IG9sZENoaWxkcmVuTGVuZ3RoID8gb2xkQ2hpbGRyZW5bb2xkSW5kZXhdIDogdW5kZWZpbmVkO1xuXHRcdGNvbnN0IG5ld0NoaWxkID0gbmV3Q2hpbGRyZW5bbmV3SW5kZXhdO1xuXHRcdGlmIChpc1ZOb2RlKG5ld0NoaWxkKSAmJiB0eXBlb2YgbmV3Q2hpbGQuZGVmZXJyZWRQcm9wZXJ0aWVzQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdG5ld0NoaWxkLmluc2VydGVkID0gaXNWTm9kZShvbGRDaGlsZCkgJiYgb2xkQ2hpbGQuaW5zZXJ0ZWQ7XG5cdFx0XHRhZGREZWZlcnJlZFByb3BlcnRpZXMobmV3Q2hpbGQsIHByb2plY3Rpb25PcHRpb25zKTtcblx0XHR9XG5cdFx0aWYgKG9sZENoaWxkICE9PSB1bmRlZmluZWQgJiYgc2FtZShvbGRDaGlsZCwgbmV3Q2hpbGQpKSB7XG5cdFx0XHRvbGRJbmRleCsrO1xuXHRcdFx0bmV3SW5kZXgrKztcblx0XHRcdHRleHRVcGRhdGVkID1cblx0XHRcdFx0dXBkYXRlRG9tKFxuXHRcdFx0XHRcdG9sZENoaWxkLFxuXHRcdFx0XHRcdG5ld0NoaWxkLFxuXHRcdFx0XHRcdHByb2plY3Rpb25PcHRpb25zLFxuXHRcdFx0XHRcdHBhcmVudFZOb2RlLFxuXHRcdFx0XHRcdHBhcmVudEluc3RhbmNlLFxuXHRcdFx0XHRcdG9sZENoaWxkcmVuLnNsaWNlKG9sZEluZGV4KSxcblx0XHRcdFx0XHRuZXdDaGlsZHJlbi5zbGljZShuZXdJbmRleClcblx0XHRcdFx0KSB8fCB0ZXh0VXBkYXRlZDtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGNvbnN0IGZpbmRPbGRJbmRleCA9IGZpbmRJbmRleE9mQ2hpbGQob2xkQ2hpbGRyZW4sIG5ld0NoaWxkLCBvbGRJbmRleCArIDEpO1xuXHRcdGNvbnN0IGFkZENoaWxkID0gKCkgPT4ge1xuXHRcdFx0bGV0IGluc2VydEJlZm9yZURvbU5vZGU6IE5vZGUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgY2hpbGRyZW5BcnJheSA9IG9sZENoaWxkcmVuO1xuXHRcdFx0bGV0IG5leHRJbmRleCA9IG9sZEluZGV4ICsgMTtcblx0XHRcdGxldCBjaGlsZDogSW50ZXJuYWxETm9kZSA9IG9sZENoaWxkcmVuW29sZEluZGV4XTtcblx0XHRcdGlmICghY2hpbGQpIHtcblx0XHRcdFx0Y2hpbGQgPSBzaWJsaW5nc1swXTtcblx0XHRcdFx0bmV4dEluZGV4ID0gMTtcblx0XHRcdFx0Y2hpbGRyZW5BcnJheSA9IHNpYmxpbmdzO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGNoaWxkKSB7XG5cdFx0XHRcdGxldCBpbnNlcnRCZWZvcmVDaGlsZHJlbiA9IFtjaGlsZF07XG5cdFx0XHRcdHdoaWxlIChpbnNlcnRCZWZvcmVDaGlsZHJlbi5sZW5ndGgpIHtcblx0XHRcdFx0XHRjb25zdCBpbnNlcnRCZWZvcmUgPSBpbnNlcnRCZWZvcmVDaGlsZHJlbi5zaGlmdCgpITtcblx0XHRcdFx0XHRpZiAoaXNXTm9kZShpbnNlcnRCZWZvcmUpKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBpdGVtID0gaW5zdGFuY2VNYXAuZ2V0KGluc2VydEJlZm9yZS5pbnN0YW5jZSk7XG5cdFx0XHRcdFx0XHRpZiAoaXRlbSAmJiBpdGVtLmRub2RlLnJlbmRlcmVkKSB7XG5cdFx0XHRcdFx0XHRcdGluc2VydEJlZm9yZUNoaWxkcmVuLnB1c2goLi4uaXRlbS5kbm9kZS5yZW5kZXJlZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmIChpbnNlcnRCZWZvcmUuZG9tTm9kZSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoaW5zZXJ0QmVmb3JlLmRvbU5vZGUucGFyZW50RWxlbWVudCAhPT0gcGFyZW50Vk5vZGUuZG9tTm9kZSkge1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGluc2VydEJlZm9yZURvbU5vZGUgPSBpbnNlcnRCZWZvcmUuZG9tTm9kZTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChpbnNlcnRCZWZvcmVDaGlsZHJlbi5sZW5ndGggPT09IDAgJiYgY2hpbGRyZW5BcnJheVtuZXh0SW5kZXhdKSB7XG5cdFx0XHRcdFx0XHRpbnNlcnRCZWZvcmVDaGlsZHJlbi5wdXNoKGNoaWxkcmVuQXJyYXlbbmV4dEluZGV4XSk7XG5cdFx0XHRcdFx0XHRuZXh0SW5kZXgrKztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y3JlYXRlRG9tKFxuXHRcdFx0XHRuZXdDaGlsZCxcblx0XHRcdFx0cGFyZW50Vk5vZGUsXG5cdFx0XHRcdG5ld0NoaWxkcmVuLnNsaWNlKG5ld0luZGV4ICsgMSksXG5cdFx0XHRcdGluc2VydEJlZm9yZURvbU5vZGUsXG5cdFx0XHRcdHByb2plY3Rpb25PcHRpb25zLFxuXHRcdFx0XHRwYXJlbnRJbnN0YW5jZVxuXHRcdFx0KTtcblx0XHRcdG5vZGVBZGRlZChuZXdDaGlsZCwgdHJhbnNpdGlvbnMpO1xuXHRcdFx0Y29uc3QgaW5kZXhUb0NoZWNrID0gbmV3SW5kZXg7XG5cdFx0XHRwcm9qZWN0b3JTdGF0ZS5hZnRlclJlbmRlckNhbGxiYWNrcy5wdXNoKCgpID0+IHtcblx0XHRcdFx0Y2hlY2tEaXN0aW5ndWlzaGFibGUobmV3Q2hpbGRyZW4sIGluZGV4VG9DaGVjaywgcGFyZW50SW5zdGFuY2UpO1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdGlmICghb2xkQ2hpbGQgfHwgZmluZE9sZEluZGV4ID09PSAtMSkge1xuXHRcdFx0YWRkQ2hpbGQoKTtcblx0XHRcdG5ld0luZGV4Kys7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRjb25zdCByZW1vdmVDaGlsZCA9ICgpID0+IHtcblx0XHRcdGNvbnN0IGluZGV4VG9DaGVjayA9IG9sZEluZGV4O1xuXHRcdFx0cHJvamVjdG9yU3RhdGUuYWZ0ZXJSZW5kZXJDYWxsYmFja3MucHVzaCgoKSA9PiB7XG5cdFx0XHRcdGNoZWNrRGlzdGluZ3Vpc2hhYmxlKG9sZENoaWxkcmVuLCBpbmRleFRvQ2hlY2ssIHBhcmVudEluc3RhbmNlKTtcblx0XHRcdH0pO1xuXHRcdFx0aWYgKGlzV05vZGUob2xkQ2hpbGQpKSB7XG5cdFx0XHRcdGNvbnN0IGl0ZW0gPSBpbnN0YW5jZU1hcC5nZXQob2xkQ2hpbGQuaW5zdGFuY2UpO1xuXHRcdFx0XHRpZiAoaXRlbSkge1xuXHRcdFx0XHRcdG9sZENoaWxkID0gaXRlbS5kbm9kZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bm9kZVRvUmVtb3ZlKG9sZENoaWxkISwgdHJhbnNpdGlvbnMsIHByb2plY3Rpb25PcHRpb25zKTtcblx0XHR9O1xuXHRcdGNvbnN0IGZpbmROZXdJbmRleCA9IGZpbmRJbmRleE9mQ2hpbGQobmV3Q2hpbGRyZW4sIG9sZENoaWxkLCBuZXdJbmRleCArIDEpO1xuXG5cdFx0aWYgKGZpbmROZXdJbmRleCA9PT0gLTEpIHtcblx0XHRcdHJlbW92ZUNoaWxkKCk7XG5cdFx0XHRvbGRJbmRleCsrO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0YWRkQ2hpbGQoKTtcblx0XHRyZW1vdmVDaGlsZCgpO1xuXHRcdG9sZEluZGV4Kys7XG5cdFx0bmV3SW5kZXgrKztcblx0fVxuXHRpZiAob2xkQ2hpbGRyZW5MZW5ndGggPiBvbGRJbmRleCkge1xuXHRcdC8vIFJlbW92ZSBjaGlsZCBmcmFnbWVudHNcblx0XHRmb3IgKGkgPSBvbGRJbmRleDsgaSA8IG9sZENoaWxkcmVuTGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IGluZGV4VG9DaGVjayA9IGk7XG5cdFx0XHRwcm9qZWN0b3JTdGF0ZS5hZnRlclJlbmRlckNhbGxiYWNrcy5wdXNoKCgpID0+IHtcblx0XHRcdFx0Y2hlY2tEaXN0aW5ndWlzaGFibGUob2xkQ2hpbGRyZW4sIGluZGV4VG9DaGVjaywgcGFyZW50SW5zdGFuY2UpO1xuXHRcdFx0fSk7XG5cdFx0XHRsZXQgY2hpbGRUb1JlbW92ZSA9IG9sZENoaWxkcmVuW2ldO1xuXHRcdFx0aWYgKGlzV05vZGUoY2hpbGRUb1JlbW92ZSkpIHtcblx0XHRcdFx0Y29uc3QgaXRlbSA9IGluc3RhbmNlTWFwLmdldChjaGlsZFRvUmVtb3ZlLmluc3RhbmNlKTtcblx0XHRcdFx0aWYgKGl0ZW0pIHtcblx0XHRcdFx0XHRjaGlsZFRvUmVtb3ZlID0gaXRlbS5kbm9kZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bm9kZVRvUmVtb3ZlKGNoaWxkVG9SZW1vdmUsIHRyYW5zaXRpb25zLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0ZXh0VXBkYXRlZDtcbn1cblxuZnVuY3Rpb24gYWRkQ2hpbGRyZW4oXG5cdHBhcmVudFZOb2RlOiBJbnRlcm5hbFZOb2RlLFxuXHRjaGlsZHJlbjogSW50ZXJuYWxETm9kZVtdIHwgdW5kZWZpbmVkLFxuXHRwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnMsXG5cdHBhcmVudEluc3RhbmNlOiBEZWZhdWx0V2lkZ2V0QmFzZUludGVyZmFjZSxcblx0aW5zZXJ0QmVmb3JlOiBOb2RlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLFxuXHRjaGlsZE5vZGVzPzogKEVsZW1lbnQgfCBUZXh0KVtdXG4pIHtcblx0aWYgKGNoaWxkcmVuID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBwcm9qZWN0b3JTdGF0ZSA9IHByb2plY3RvclN0YXRlTWFwLmdldChwcm9qZWN0aW9uT3B0aW9ucy5wcm9qZWN0b3JJbnN0YW5jZSkhO1xuXHRpZiAocHJvamVjdG9yU3RhdGUubWVyZ2UgJiYgY2hpbGROb2RlcyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0Y2hpbGROb2RlcyA9IGFycmF5RnJvbShwYXJlbnRWTm9kZS5kb21Ob2RlIS5jaGlsZE5vZGVzKSBhcyAoRWxlbWVudCB8IFRleHQpW107XG5cdH1cblx0Y29uc3QgdHJhbnNpdGlvbnMgPSBwcm9qZWN0aW9uT3B0aW9ucy50cmFuc2l0aW9ucyE7XG5cdHByb2plY3Rpb25PcHRpb25zID0geyAuLi5wcm9qZWN0aW9uT3B0aW9ucywgZGVwdGg6IHByb2plY3Rpb25PcHRpb25zLmRlcHRoICsgMSB9O1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuXHRcdGNvbnN0IG5leHRTaWJsaW5ncyA9IGNoaWxkcmVuLnNsaWNlKGkgKyAxKTtcblxuXHRcdGlmIChpc1ZOb2RlKGNoaWxkKSkge1xuXHRcdFx0aWYgKHByb2plY3RvclN0YXRlLm1lcmdlICYmIGNoaWxkTm9kZXMpIHtcblx0XHRcdFx0bGV0IGRvbUVsZW1lbnQ6IEVsZW1lbnQgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHdoaWxlIChjaGlsZC5kb21Ob2RlID09PSB1bmRlZmluZWQgJiYgY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0ZG9tRWxlbWVudCA9IGNoaWxkTm9kZXMuc2hpZnQoKSBhcyBFbGVtZW50O1xuXHRcdFx0XHRcdGlmIChkb21FbGVtZW50ICYmIGRvbUVsZW1lbnQudGFnTmFtZSA9PT0gKGNoaWxkLnRhZy50b1VwcGVyQ2FzZSgpIHx8IHVuZGVmaW5lZCkpIHtcblx0XHRcdFx0XHRcdGNoaWxkLmRvbU5vZGUgPSBkb21FbGVtZW50O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y3JlYXRlRG9tKGNoaWxkLCBwYXJlbnRWTm9kZSwgbmV4dFNpYmxpbmdzLCBpbnNlcnRCZWZvcmUsIHByb2plY3Rpb25PcHRpb25zLCBwYXJlbnRJbnN0YW5jZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNyZWF0ZURvbShjaGlsZCwgcGFyZW50Vk5vZGUsIG5leHRTaWJsaW5ncywgaW5zZXJ0QmVmb3JlLCBwcm9qZWN0aW9uT3B0aW9ucywgcGFyZW50SW5zdGFuY2UsIGNoaWxkTm9kZXMpO1xuXHRcdH1cblx0XHRub2RlQWRkZWQoY2hpbGQsIHRyYW5zaXRpb25zKTtcblx0fVxufVxuXG5mdW5jdGlvbiBpbml0UHJvcGVydGllc0FuZENoaWxkcmVuKFxuXHRkb21Ob2RlOiBFbGVtZW50LFxuXHRkbm9kZTogSW50ZXJuYWxWTm9kZSxcblx0cGFyZW50SW5zdGFuY2U6IERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlLFxuXHRwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnNcbikge1xuXHRhZGRDaGlsZHJlbihkbm9kZSwgZG5vZGUuY2hpbGRyZW4sIHByb2plY3Rpb25PcHRpb25zLCBwYXJlbnRJbnN0YW5jZSwgdW5kZWZpbmVkKTtcblx0aWYgKHR5cGVvZiBkbm9kZS5kZWZlcnJlZFByb3BlcnRpZXNDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyAmJiBkbm9kZS5pbnNlcnRlZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0YWRkRGVmZXJyZWRQcm9wZXJ0aWVzKGRub2RlLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdH1cblxuXHRpZiAoZG5vZGUuYXR0cmlidXRlcyAmJiBkbm9kZS5ldmVudHMpIHtcblx0XHR1cGRhdGVBdHRyaWJ1dGVzKGRvbU5vZGUsIHt9LCBkbm9kZS5hdHRyaWJ1dGVzLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdFx0dXBkYXRlUHJvcGVydGllcyhkb21Ob2RlLCB7fSwgZG5vZGUucHJvcGVydGllcywgcHJvamVjdGlvbk9wdGlvbnMsIGZhbHNlKTtcblx0XHRyZW1vdmVPcnBoYW5lZEV2ZW50cyhkb21Ob2RlLCB7fSwgZG5vZGUuZXZlbnRzLCBwcm9qZWN0aW9uT3B0aW9ucywgdHJ1ZSk7XG5cdFx0Y29uc3QgZXZlbnRzID0gZG5vZGUuZXZlbnRzO1xuXHRcdE9iamVjdC5rZXlzKGV2ZW50cykuZm9yRWFjaCgoZXZlbnQpID0+IHtcblx0XHRcdHVwZGF0ZUV2ZW50KGRvbU5vZGUsIGV2ZW50LCBldmVudHNbZXZlbnRdLCBwcm9qZWN0aW9uT3B0aW9ucywgZG5vZGUucHJvcGVydGllcy5iaW5kKTtcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR1cGRhdGVQcm9wZXJ0aWVzKGRvbU5vZGUsIHt9LCBkbm9kZS5wcm9wZXJ0aWVzLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdH1cblx0aWYgKGRub2RlLnByb3BlcnRpZXMua2V5ICE9PSBudWxsICYmIGRub2RlLnByb3BlcnRpZXMua2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRjb25zdCBpbnN0YW5jZURhdGEgPSB3aWRnZXRJbnN0YW5jZU1hcC5nZXQocGFyZW50SW5zdGFuY2UpITtcblx0XHRpbnN0YW5jZURhdGEubm9kZUhhbmRsZXIuYWRkKGRvbU5vZGUgYXMgSFRNTEVsZW1lbnQsIGAke2Rub2RlLnByb3BlcnRpZXMua2V5fWApO1xuXHR9XG5cdGRub2RlLmluc2VydGVkID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRG9tKFxuXHRkbm9kZTogSW50ZXJuYWxETm9kZSxcblx0cGFyZW50Vk5vZGU6IEludGVybmFsVk5vZGUsXG5cdG5leHRTaWJsaW5nczogSW50ZXJuYWxETm9kZVtdLFxuXHRpbnNlcnRCZWZvcmU6IE5vZGUgfCB1bmRlZmluZWQsXG5cdHByb2plY3Rpb25PcHRpb25zOiBQcm9qZWN0aW9uT3B0aW9ucyxcblx0cGFyZW50SW5zdGFuY2U6IERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlLFxuXHRjaGlsZE5vZGVzPzogKEVsZW1lbnQgfCBUZXh0KVtdXG4pIHtcblx0bGV0IGRvbU5vZGU6IEVsZW1lbnQgfCBUZXh0IHwgdW5kZWZpbmVkO1xuXHRjb25zdCBwcm9qZWN0b3JTdGF0ZSA9IHByb2plY3RvclN0YXRlTWFwLmdldChwcm9qZWN0aW9uT3B0aW9ucy5wcm9qZWN0b3JJbnN0YW5jZSkhO1xuXHRpZiAoaXNXTm9kZShkbm9kZSkpIHtcblx0XHRsZXQgeyB3aWRnZXRDb25zdHJ1Y3RvciB9ID0gZG5vZGU7XG5cdFx0Y29uc3QgcGFyZW50SW5zdGFuY2VEYXRhID0gd2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KHBhcmVudEluc3RhbmNlKSE7XG5cdFx0aWYgKCFpc1dpZGdldEJhc2VDb25zdHJ1Y3RvcjxEZWZhdWx0V2lkZ2V0QmFzZUludGVyZmFjZT4od2lkZ2V0Q29uc3RydWN0b3IpKSB7XG5cdFx0XHRjb25zdCBpdGVtID0gcGFyZW50SW5zdGFuY2VEYXRhLnJlZ2lzdHJ5KCkuZ2V0PERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlPih3aWRnZXRDb25zdHJ1Y3Rvcik7XG5cdFx0XHRpZiAoaXRlbSA9PT0gbnVsbCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR3aWRnZXRDb25zdHJ1Y3RvciA9IGl0ZW07XG5cdFx0fVxuXHRcdGNvbnN0IGluc3RhbmNlID0gbmV3IHdpZGdldENvbnN0cnVjdG9yKCk7XG5cdFx0ZG5vZGUuaW5zdGFuY2UgPSBpbnN0YW5jZTtcblx0XHRuZXh0U2libGluZ01hcC5zZXQoaW5zdGFuY2UsIG5leHRTaWJsaW5ncyk7XG5cdFx0Y29uc3QgaW5zdGFuY2VEYXRhID0gd2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KGluc3RhbmNlKSE7XG5cdFx0aW5zdGFuY2VEYXRhLmludmFsaWRhdGUgPSAoKSA9PiB7XG5cdFx0XHRpbnN0YW5jZURhdGEuZGlydHkgPSB0cnVlO1xuXHRcdFx0aWYgKGluc3RhbmNlRGF0YS5yZW5kZXJpbmcgPT09IGZhbHNlKSB7XG5cdFx0XHRcdHByb2plY3RvclN0YXRlLnJlbmRlclF1ZXVlLnB1c2goeyBpbnN0YW5jZSwgZGVwdGg6IHByb2plY3Rpb25PcHRpb25zLmRlcHRoIH0pO1xuXHRcdFx0XHRzY2hlZHVsZVJlbmRlcihwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRpbnN0YW5jZURhdGEucmVuZGVyaW5nID0gdHJ1ZTtcblx0XHRpbnN0YW5jZS5fX3NldENvcmVQcm9wZXJ0aWVzX18oZG5vZGUuY29yZVByb3BlcnRpZXMpO1xuXHRcdGluc3RhbmNlLl9fc2V0Q2hpbGRyZW5fXyhkbm9kZS5jaGlsZHJlbik7XG5cdFx0aW5zdGFuY2UuX19zZXRQcm9wZXJ0aWVzX18oZG5vZGUucHJvcGVydGllcyk7XG5cdFx0Y29uc3QgcmVuZGVyZWQgPSBpbnN0YW5jZS5fX3JlbmRlcl9fKCk7XG5cdFx0aW5zdGFuY2VEYXRhLnJlbmRlcmluZyA9IGZhbHNlO1xuXHRcdGlmIChyZW5kZXJlZCkge1xuXHRcdFx0Y29uc3QgZmlsdGVyZWRSZW5kZXJlZCA9IGZpbHRlckFuZERlY29yYXRlQ2hpbGRyZW4ocmVuZGVyZWQsIGluc3RhbmNlKTtcblx0XHRcdGRub2RlLnJlbmRlcmVkID0gZmlsdGVyZWRSZW5kZXJlZDtcblx0XHRcdGFkZENoaWxkcmVuKHBhcmVudFZOb2RlLCBmaWx0ZXJlZFJlbmRlcmVkLCBwcm9qZWN0aW9uT3B0aW9ucywgaW5zdGFuY2UsIGluc2VydEJlZm9yZSwgY2hpbGROb2Rlcyk7XG5cdFx0fVxuXHRcdGluc3RhbmNlTWFwLnNldChpbnN0YW5jZSwgeyBkbm9kZSwgcGFyZW50Vk5vZGUgfSk7XG5cdFx0aW5zdGFuY2VEYXRhLm5vZGVIYW5kbGVyLmFkZFJvb3QoKTtcblx0XHRwcm9qZWN0b3JTdGF0ZS5hZnRlclJlbmRlckNhbGxiYWNrcy5wdXNoKCgpID0+IHtcblx0XHRcdGluc3RhbmNlRGF0YS5vbkF0dGFjaCgpO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdGlmIChwcm9qZWN0b3JTdGF0ZS5tZXJnZSAmJiBwcm9qZWN0b3JTdGF0ZS5tZXJnZUVsZW1lbnQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0ZG9tTm9kZSA9IGRub2RlLmRvbU5vZGUgPSBwcm9qZWN0aW9uT3B0aW9ucy5tZXJnZUVsZW1lbnQ7XG5cdFx0XHRwcm9qZWN0b3JTdGF0ZS5tZXJnZUVsZW1lbnQgPSB1bmRlZmluZWQ7XG5cdFx0XHRpbml0UHJvcGVydGllc0FuZENoaWxkcmVuKGRvbU5vZGUhLCBkbm9kZSwgcGFyZW50SW5zdGFuY2UsIHByb2plY3Rpb25PcHRpb25zKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3QgZG9jID0gcGFyZW50Vk5vZGUuZG9tTm9kZSEub3duZXJEb2N1bWVudDtcblx0XHRpZiAoIWRub2RlLnRhZyAmJiB0eXBlb2YgZG5vZGUudGV4dCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChkbm9kZS5kb21Ob2RlICE9PSB1bmRlZmluZWQgJiYgcGFyZW50Vk5vZGUuZG9tTm9kZSkge1xuXHRcdFx0XHRjb25zdCBuZXdEb21Ob2RlID0gZG5vZGUuZG9tTm9kZS5vd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRub2RlLnRleHQhKTtcblx0XHRcdFx0aWYgKHBhcmVudFZOb2RlLmRvbU5vZGUgPT09IGRub2RlLmRvbU5vZGUucGFyZW50Tm9kZSkge1xuXHRcdFx0XHRcdHBhcmVudFZOb2RlLmRvbU5vZGUucmVwbGFjZUNoaWxkKG5ld0RvbU5vZGUsIGRub2RlLmRvbU5vZGUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHBhcmVudFZOb2RlLmRvbU5vZGUuYXBwZW5kQ2hpbGQobmV3RG9tTm9kZSk7XG5cdFx0XHRcdFx0ZG5vZGUuZG9tTm9kZS5wYXJlbnROb2RlICYmIGRub2RlLmRvbU5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkbm9kZS5kb21Ob2RlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkbm9kZS5kb21Ob2RlID0gbmV3RG9tTm9kZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRvbU5vZGUgPSBkbm9kZS5kb21Ob2RlID0gZG9jLmNyZWF0ZVRleHROb2RlKGRub2RlLnRleHQhKTtcblx0XHRcdFx0aWYgKGluc2VydEJlZm9yZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0cGFyZW50Vk5vZGUuZG9tTm9kZSEuaW5zZXJ0QmVmb3JlKGRvbU5vZGUsIGluc2VydEJlZm9yZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cGFyZW50Vk5vZGUuZG9tTm9kZSEuYXBwZW5kQ2hpbGQoZG9tTm9kZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGRub2RlLmRvbU5vZGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRpZiAoZG5vZGUudGFnID09PSAnc3ZnJykge1xuXHRcdFx0XHRcdHByb2plY3Rpb25PcHRpb25zID0geyAuLi5wcm9qZWN0aW9uT3B0aW9ucywgLi4ueyBuYW1lc3BhY2U6IE5BTUVTUEFDRV9TVkcgfSB9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChwcm9qZWN0aW9uT3B0aW9ucy5uYW1lc3BhY2UgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGRvbU5vZGUgPSBkbm9kZS5kb21Ob2RlID0gZG9jLmNyZWF0ZUVsZW1lbnROUyhwcm9qZWN0aW9uT3B0aW9ucy5uYW1lc3BhY2UsIGRub2RlLnRhZyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZG9tTm9kZSA9IGRub2RlLmRvbU5vZGUgPSBkbm9kZS5kb21Ob2RlIHx8IGRvYy5jcmVhdGVFbGVtZW50KGRub2RlLnRhZyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRvbU5vZGUgPSBkbm9kZS5kb21Ob2RlO1xuXHRcdFx0fVxuXHRcdFx0aW5pdFByb3BlcnRpZXNBbmRDaGlsZHJlbihkb21Ob2RlISBhcyBFbGVtZW50LCBkbm9kZSwgcGFyZW50SW5zdGFuY2UsIHByb2plY3Rpb25PcHRpb25zKTtcblx0XHRcdGlmIChpbnNlcnRCZWZvcmUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRwYXJlbnRWTm9kZS5kb21Ob2RlIS5pbnNlcnRCZWZvcmUoZG9tTm9kZSwgaW5zZXJ0QmVmb3JlKTtcblx0XHRcdH0gZWxzZSBpZiAoZG9tTm9kZSEucGFyZW50Tm9kZSAhPT0gcGFyZW50Vk5vZGUuZG9tTm9kZSEpIHtcblx0XHRcdFx0cGFyZW50Vk5vZGUuZG9tTm9kZSEuYXBwZW5kQ2hpbGQoZG9tTm9kZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZURvbShcblx0cHJldmlvdXM6IGFueSxcblx0ZG5vZGU6IEludGVybmFsRE5vZGUsXG5cdHByb2plY3Rpb25PcHRpb25zOiBQcm9qZWN0aW9uT3B0aW9ucyxcblx0cGFyZW50Vk5vZGU6IEludGVybmFsVk5vZGUsXG5cdHBhcmVudEluc3RhbmNlOiBEZWZhdWx0V2lkZ2V0QmFzZUludGVyZmFjZSxcblx0b2xkTmV4dFNpYmxpbmdzOiBJbnRlcm5hbEROb2RlW10sXG5cdG5leHRTaWJsaW5nczogSW50ZXJuYWxETm9kZVtdXG4pIHtcblx0aWYgKGlzV05vZGUoZG5vZGUpKSB7XG5cdFx0Y29uc3QgeyBpbnN0YW5jZSB9ID0gcHJldmlvdXM7XG5cdFx0Y29uc3QgeyBwYXJlbnRWTm9kZSwgZG5vZGU6IG5vZGUgfSA9IGluc3RhbmNlTWFwLmdldChpbnN0YW5jZSkhO1xuXHRcdGNvbnN0IHByZXZpb3VzUmVuZGVyZWQgPSBub2RlID8gbm9kZS5yZW5kZXJlZCA6IHByZXZpb3VzLnJlbmRlcmVkO1xuXHRcdGNvbnN0IGluc3RhbmNlRGF0YSA9IHdpZGdldEluc3RhbmNlTWFwLmdldChpbnN0YW5jZSkhO1xuXHRcdGluc3RhbmNlRGF0YS5yZW5kZXJpbmcgPSB0cnVlO1xuXHRcdGluc3RhbmNlLl9fc2V0Q29yZVByb3BlcnRpZXNfXyhkbm9kZS5jb3JlUHJvcGVydGllcyk7XG5cdFx0aW5zdGFuY2UuX19zZXRDaGlsZHJlbl9fKGRub2RlLmNoaWxkcmVuKTtcblx0XHRpbnN0YW5jZS5fX3NldFByb3BlcnRpZXNfXyhkbm9kZS5wcm9wZXJ0aWVzKTtcblx0XHRuZXh0U2libGluZ01hcC5zZXQoaW5zdGFuY2UsIG5leHRTaWJsaW5ncyk7XG5cdFx0ZG5vZGUuaW5zdGFuY2UgPSBpbnN0YW5jZTtcblx0XHRpZiAoaW5zdGFuY2VEYXRhLmRpcnR5ID09PSB0cnVlKSB7XG5cdFx0XHRjb25zdCByZW5kZXJlZCA9IGluc3RhbmNlLl9fcmVuZGVyX18oKTtcblx0XHRcdGluc3RhbmNlRGF0YS5yZW5kZXJpbmcgPSBmYWxzZTtcblx0XHRcdGRub2RlLnJlbmRlcmVkID0gZmlsdGVyQW5kRGVjb3JhdGVDaGlsZHJlbihyZW5kZXJlZCwgaW5zdGFuY2UpO1xuXHRcdFx0dXBkYXRlQ2hpbGRyZW4ocGFyZW50Vk5vZGUsIG9sZE5leHRTaWJsaW5ncywgcHJldmlvdXNSZW5kZXJlZCwgZG5vZGUucmVuZGVyZWQsIGluc3RhbmNlLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGluc3RhbmNlRGF0YS5yZW5kZXJpbmcgPSBmYWxzZTtcblx0XHRcdGRub2RlLnJlbmRlcmVkID0gcHJldmlvdXNSZW5kZXJlZDtcblx0XHR9XG5cdFx0aW5zdGFuY2VNYXAuc2V0KGluc3RhbmNlLCB7IGRub2RlLCBwYXJlbnRWTm9kZSB9KTtcblx0XHRpbnN0YW5jZURhdGEubm9kZUhhbmRsZXIuYWRkUm9vdCgpO1xuXHR9IGVsc2Uge1xuXHRcdGlmIChwcmV2aW91cyA9PT0gZG5vZGUpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0Y29uc3QgZG9tTm9kZSA9IChkbm9kZS5kb21Ob2RlID0gcHJldmlvdXMuZG9tTm9kZSk7XG5cdFx0bGV0IHRleHRVcGRhdGVkID0gZmFsc2U7XG5cdFx0bGV0IHVwZGF0ZWQgPSBmYWxzZTtcblx0XHRpZiAoIWRub2RlLnRhZyAmJiB0eXBlb2YgZG5vZGUudGV4dCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChkbm9kZS50ZXh0ICE9PSBwcmV2aW91cy50ZXh0KSB7XG5cdFx0XHRcdGNvbnN0IG5ld0RvbU5vZGUgPSBkb21Ob2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZG5vZGUudGV4dCEpO1xuXHRcdFx0XHRkb21Ob2RlLnBhcmVudE5vZGUhLnJlcGxhY2VDaGlsZChuZXdEb21Ob2RlLCBkb21Ob2RlKTtcblx0XHRcdFx0ZG5vZGUuZG9tTm9kZSA9IG5ld0RvbU5vZGU7XG5cdFx0XHRcdHRleHRVcGRhdGVkID0gdHJ1ZTtcblx0XHRcdFx0cmV0dXJuIHRleHRVcGRhdGVkO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoZG5vZGUudGFnICYmIGRub2RlLnRhZy5sYXN0SW5kZXhPZignc3ZnJywgMCkgPT09IDApIHtcblx0XHRcdFx0cHJvamVjdGlvbk9wdGlvbnMgPSB7IC4uLnByb2plY3Rpb25PcHRpb25zLCAuLi57IG5hbWVzcGFjZTogTkFNRVNQQUNFX1NWRyB9IH07XG5cdFx0XHR9XG5cdFx0XHRpZiAocHJldmlvdXMuY2hpbGRyZW4gIT09IGRub2RlLmNoaWxkcmVuKSB7XG5cdFx0XHRcdGNvbnN0IGNoaWxkcmVuID0gZmlsdGVyQW5kRGVjb3JhdGVDaGlsZHJlbihkbm9kZS5jaGlsZHJlbiwgcGFyZW50SW5zdGFuY2UpO1xuXHRcdFx0XHRkbm9kZS5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuXHRcdFx0XHR1cGRhdGVkID1cblx0XHRcdFx0XHR1cGRhdGVDaGlsZHJlbihcblx0XHRcdFx0XHRcdGRub2RlLFxuXHRcdFx0XHRcdFx0b2xkTmV4dFNpYmxpbmdzLFxuXHRcdFx0XHRcdFx0cHJldmlvdXMuY2hpbGRyZW4sXG5cdFx0XHRcdFx0XHRjaGlsZHJlbixcblx0XHRcdFx0XHRcdHBhcmVudEluc3RhbmNlLFxuXHRcdFx0XHRcdFx0cHJvamVjdGlvbk9wdGlvbnNcblx0XHRcdFx0XHQpIHx8IHVwZGF0ZWQ7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHByZXZpb3VzUHJvcGVydGllcyA9IGJ1aWxkUHJldmlvdXNQcm9wZXJ0aWVzKGRvbU5vZGUsIHByZXZpb3VzLCBkbm9kZSk7XG5cdFx0XHRpZiAoZG5vZGUuYXR0cmlidXRlcyAmJiBkbm9kZS5ldmVudHMpIHtcblx0XHRcdFx0dXBkYXRlQXR0cmlidXRlcyhkb21Ob2RlLCBwcmV2aW91c1Byb3BlcnRpZXMuYXR0cmlidXRlcywgZG5vZGUuYXR0cmlidXRlcywgcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdFx0XHR1cGRhdGVkID1cblx0XHRcdFx0XHR1cGRhdGVQcm9wZXJ0aWVzKFxuXHRcdFx0XHRcdFx0ZG9tTm9kZSxcblx0XHRcdFx0XHRcdHByZXZpb3VzUHJvcGVydGllcy5wcm9wZXJ0aWVzLFxuXHRcdFx0XHRcdFx0ZG5vZGUucHJvcGVydGllcyxcblx0XHRcdFx0XHRcdHByb2plY3Rpb25PcHRpb25zLFxuXHRcdFx0XHRcdFx0ZmFsc2Vcblx0XHRcdFx0XHQpIHx8IHVwZGF0ZWQ7XG5cdFx0XHRcdHJlbW92ZU9ycGhhbmVkRXZlbnRzKGRvbU5vZGUsIHByZXZpb3VzUHJvcGVydGllcy5ldmVudHMsIGRub2RlLmV2ZW50cywgcHJvamVjdGlvbk9wdGlvbnMsIHRydWUpO1xuXHRcdFx0XHRjb25zdCBldmVudHMgPSBkbm9kZS5ldmVudHM7XG5cdFx0XHRcdE9iamVjdC5rZXlzKGV2ZW50cykuZm9yRWFjaCgoZXZlbnQpID0+IHtcblx0XHRcdFx0XHR1cGRhdGVFdmVudChcblx0XHRcdFx0XHRcdGRvbU5vZGUsXG5cdFx0XHRcdFx0XHRldmVudCxcblx0XHRcdFx0XHRcdGV2ZW50c1tldmVudF0sXG5cdFx0XHRcdFx0XHRwcm9qZWN0aW9uT3B0aW9ucyxcblx0XHRcdFx0XHRcdGRub2RlLnByb3BlcnRpZXMuYmluZCxcblx0XHRcdFx0XHRcdHByZXZpb3VzUHJvcGVydGllcy5ldmVudHNbZXZlbnRdXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR1cGRhdGVkID1cblx0XHRcdFx0XHR1cGRhdGVQcm9wZXJ0aWVzKGRvbU5vZGUsIHByZXZpb3VzUHJvcGVydGllcy5wcm9wZXJ0aWVzLCBkbm9kZS5wcm9wZXJ0aWVzLCBwcm9qZWN0aW9uT3B0aW9ucykgfHxcblx0XHRcdFx0XHR1cGRhdGVkO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZG5vZGUucHJvcGVydGllcy5rZXkgIT09IG51bGwgJiYgZG5vZGUucHJvcGVydGllcy5rZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb25zdCBpbnN0YW5jZURhdGEgPSB3aWRnZXRJbnN0YW5jZU1hcC5nZXQocGFyZW50SW5zdGFuY2UpITtcblx0XHRcdFx0aW5zdGFuY2VEYXRhLm5vZGVIYW5kbGVyLmFkZChkb21Ob2RlLCBgJHtkbm9kZS5wcm9wZXJ0aWVzLmtleX1gKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHVwZGF0ZWQgJiYgZG5vZGUucHJvcGVydGllcyAmJiBkbm9kZS5wcm9wZXJ0aWVzLnVwZGF0ZUFuaW1hdGlvbikge1xuXHRcdFx0ZG5vZGUucHJvcGVydGllcy51cGRhdGVBbmltYXRpb24oZG9tTm9kZSBhcyBFbGVtZW50LCBkbm9kZS5wcm9wZXJ0aWVzLCBwcmV2aW91cy5wcm9wZXJ0aWVzKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYWRkRGVmZXJyZWRQcm9wZXJ0aWVzKHZub2RlOiBJbnRlcm5hbFZOb2RlLCBwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnMpIHtcblx0Ly8gdHJhbnNmZXIgYW55IHByb3BlcnRpZXMgdGhhdCBoYXZlIGJlZW4gcGFzc2VkIC0gYXMgdGhlc2UgbXVzdCBiZSBkZWNvcmF0ZWQgcHJvcGVydGllc1xuXHR2bm9kZS5kZWNvcmF0ZWREZWZlcnJlZFByb3BlcnRpZXMgPSB2bm9kZS5wcm9wZXJ0aWVzO1xuXHRjb25zdCBwcm9wZXJ0aWVzID0gdm5vZGUuZGVmZXJyZWRQcm9wZXJ0aWVzQ2FsbGJhY2shKCEhdm5vZGUuaW5zZXJ0ZWQpO1xuXHRjb25zdCBwcm9qZWN0b3JTdGF0ZSA9IHByb2plY3RvclN0YXRlTWFwLmdldChwcm9qZWN0aW9uT3B0aW9ucy5wcm9qZWN0b3JJbnN0YW5jZSkhO1xuXHR2bm9kZS5wcm9wZXJ0aWVzID0geyAuLi5wcm9wZXJ0aWVzLCAuLi52bm9kZS5kZWNvcmF0ZWREZWZlcnJlZFByb3BlcnRpZXMgfTtcblx0cHJvamVjdG9yU3RhdGUuZGVmZXJyZWRSZW5kZXJDYWxsYmFja3MucHVzaCgoKSA9PiB7XG5cdFx0Y29uc3QgcHJvcGVydGllcyA9IHtcblx0XHRcdC4uLnZub2RlLmRlZmVycmVkUHJvcGVydGllc0NhbGxiYWNrISghIXZub2RlLmluc2VydGVkKSxcblx0XHRcdC4uLnZub2RlLmRlY29yYXRlZERlZmVycmVkUHJvcGVydGllc1xuXHRcdH07XG5cdFx0dXBkYXRlUHJvcGVydGllcyh2bm9kZS5kb21Ob2RlISBhcyBFbGVtZW50LCB2bm9kZS5wcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdFx0dm5vZGUucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBydW5EZWZlcnJlZFJlbmRlckNhbGxiYWNrcyhwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnMpIHtcblx0Y29uc3QgcHJvamVjdG9yU3RhdGUgPSBwcm9qZWN0b3JTdGF0ZU1hcC5nZXQocHJvamVjdGlvbk9wdGlvbnMucHJvamVjdG9ySW5zdGFuY2UpITtcblx0aWYgKHByb2plY3RvclN0YXRlLmRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzLmxlbmd0aCkge1xuXHRcdGlmIChwcm9qZWN0aW9uT3B0aW9ucy5zeW5jKSB7XG5cdFx0XHR3aGlsZSAocHJvamVjdG9yU3RhdGUuZGVmZXJyZWRSZW5kZXJDYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0XHRcdGNvbnN0IGNhbGxiYWNrID0gcHJvamVjdG9yU3RhdGUuZGVmZXJyZWRSZW5kZXJDYWxsYmFja3Muc2hpZnQoKTtcblx0XHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Z2xvYmFsLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG5cdFx0XHRcdHdoaWxlIChwcm9qZWN0b3JTdGF0ZS5kZWZlcnJlZFJlbmRlckNhbGxiYWNrcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRjb25zdCBjYWxsYmFjayA9IHByb2plY3RvclN0YXRlLmRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzLnNoaWZ0KCk7XG5cdFx0XHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHJ1bkFmdGVyUmVuZGVyQ2FsbGJhY2tzKHByb2plY3Rpb25PcHRpb25zOiBQcm9qZWN0aW9uT3B0aW9ucykge1xuXHRjb25zdCBwcm9qZWN0b3JTdGF0ZSA9IHByb2plY3RvclN0YXRlTWFwLmdldChwcm9qZWN0aW9uT3B0aW9ucy5wcm9qZWN0b3JJbnN0YW5jZSkhO1xuXHRpZiAocHJvamVjdGlvbk9wdGlvbnMuc3luYykge1xuXHRcdHdoaWxlIChwcm9qZWN0b3JTdGF0ZS5hZnRlclJlbmRlckNhbGxiYWNrcy5sZW5ndGgpIHtcblx0XHRcdGNvbnN0IGNhbGxiYWNrID0gcHJvamVjdG9yU3RhdGUuYWZ0ZXJSZW5kZXJDYWxsYmFja3Muc2hpZnQoKTtcblx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGlmIChnbG9iYWwucmVxdWVzdElkbGVDYWxsYmFjaykge1xuXHRcdFx0Z2xvYmFsLnJlcXVlc3RJZGxlQ2FsbGJhY2soKCkgPT4ge1xuXHRcdFx0XHR3aGlsZSAocHJvamVjdG9yU3RhdGUuYWZ0ZXJSZW5kZXJDYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0XHRcdFx0Y29uc3QgY2FsbGJhY2sgPSBwcm9qZWN0b3JTdGF0ZS5hZnRlclJlbmRlckNhbGxiYWNrcy5zaGlmdCgpO1xuXHRcdFx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0d2hpbGUgKHByb2plY3RvclN0YXRlLmFmdGVyUmVuZGVyQ2FsbGJhY2tzLmxlbmd0aCkge1xuXHRcdFx0XHRcdGNvbnN0IGNhbGxiYWNrID0gcHJvamVjdG9yU3RhdGUuYWZ0ZXJSZW5kZXJDYWxsYmFja3Muc2hpZnQoKTtcblx0XHRcdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gc2NoZWR1bGVSZW5kZXIocHJvamVjdGlvbk9wdGlvbnM6IFByb2plY3Rpb25PcHRpb25zKSB7XG5cdGNvbnN0IHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKSE7XG5cdGlmIChwcm9qZWN0aW9uT3B0aW9ucy5zeW5jKSB7XG5cdFx0cmVuZGVyKHByb2plY3Rpb25PcHRpb25zKTtcblx0fSBlbHNlIGlmIChwcm9qZWN0b3JTdGF0ZS5yZW5kZXJTY2hlZHVsZWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdHByb2plY3RvclN0YXRlLnJlbmRlclNjaGVkdWxlZCA9IGdsb2JhbC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuXHRcdFx0cmVuZGVyKHByb2plY3Rpb25PcHRpb25zKTtcblx0XHR9KTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW5kZXIocHJvamVjdGlvbk9wdGlvbnM6IFByb2plY3Rpb25PcHRpb25zKSB7XG5cdGNvbnN0IHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKSE7XG5cdHByb2plY3RvclN0YXRlLnJlbmRlclNjaGVkdWxlZCA9IHVuZGVmaW5lZDtcblx0Y29uc3QgcmVuZGVyUXVldWUgPSBwcm9qZWN0b3JTdGF0ZS5yZW5kZXJRdWV1ZTtcblx0Y29uc3QgcmVuZGVycyA9IFsuLi5yZW5kZXJRdWV1ZV07XG5cdHByb2plY3RvclN0YXRlLnJlbmRlclF1ZXVlID0gW107XG5cdHJlbmRlcnMuc29ydCgoYSwgYikgPT4gYS5kZXB0aCAtIGIuZGVwdGgpO1xuXHRjb25zdCBwcmV2aW91c2x5UmVuZGVyZWQgPSBbXTtcblx0d2hpbGUgKHJlbmRlcnMubGVuZ3RoKSB7XG5cdFx0Y29uc3QgeyBpbnN0YW5jZSB9ID0gcmVuZGVycy5zaGlmdCgpITtcblx0XHRpZiAoaW5zdGFuY2VNYXAuaGFzKGluc3RhbmNlKSAmJiBwcmV2aW91c2x5UmVuZGVyZWQuaW5kZXhPZihpbnN0YW5jZSkgPT09IC0xKSB7XG5cdFx0XHRwcmV2aW91c2x5UmVuZGVyZWQucHVzaChpbnN0YW5jZSk7XG5cdFx0XHRjb25zdCB7IHBhcmVudFZOb2RlLCBkbm9kZSB9ID0gaW5zdGFuY2VNYXAuZ2V0KGluc3RhbmNlKSE7XG5cdFx0XHRjb25zdCBpbnN0YW5jZURhdGEgPSB3aWRnZXRJbnN0YW5jZU1hcC5nZXQoaW5zdGFuY2UpITtcblx0XHRcdGNvbnN0IG5leHRTaWJsaW5ncyA9IG5leHRTaWJsaW5nTWFwLmdldChpbnN0YW5jZSkhO1xuXHRcdFx0dXBkYXRlRG9tKFxuXHRcdFx0XHRkbm9kZSxcblx0XHRcdFx0dG9JbnRlcm5hbFdOb2RlKGluc3RhbmNlLCBpbnN0YW5jZURhdGEpLFxuXHRcdFx0XHRwcm9qZWN0aW9uT3B0aW9ucyxcblx0XHRcdFx0cGFyZW50Vk5vZGUsXG5cdFx0XHRcdGluc3RhbmNlLFxuXHRcdFx0XHRuZXh0U2libGluZ3MsXG5cdFx0XHRcdG5leHRTaWJsaW5nc1xuXHRcdFx0KTtcblx0XHR9XG5cdH1cblx0cnVuQWZ0ZXJSZW5kZXJDYWxsYmFja3MocHJvamVjdGlvbk9wdGlvbnMpO1xuXHRydW5EZWZlcnJlZFJlbmRlckNhbGxiYWNrcyhwcm9qZWN0aW9uT3B0aW9ucyk7XG59XG5cbmV4cG9ydCBjb25zdCBkb20gPSB7XG5cdGFwcGVuZDogZnVuY3Rpb24oXG5cdFx0cGFyZW50Tm9kZTogRWxlbWVudCxcblx0XHRpbnN0YW5jZTogRGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2UsXG5cdFx0cHJvamVjdGlvbk9wdGlvbnM6IFBhcnRpYWw8UHJvamVjdGlvbk9wdGlvbnM+ID0ge31cblx0KTogUHJvamVjdGlvbiB7XG5cdFx0Y29uc3QgaW5zdGFuY2VEYXRhID0gd2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KGluc3RhbmNlKSE7XG5cdFx0Y29uc3QgZmluYWxQcm9qZWN0b3JPcHRpb25zID0gZ2V0UHJvamVjdGlvbk9wdGlvbnMocHJvamVjdGlvbk9wdGlvbnMsIGluc3RhbmNlKTtcblx0XHRjb25zdCBwcm9qZWN0b3JTdGF0ZTogUHJvamVjdG9yU3RhdGUgPSB7XG5cdFx0XHRhZnRlclJlbmRlckNhbGxiYWNrczogW10sXG5cdFx0XHRkZWZlcnJlZFJlbmRlckNhbGxiYWNrczogW10sXG5cdFx0XHRub2RlTWFwOiBuZXcgV2Vha01hcCgpLFxuXHRcdFx0cmVuZGVyU2NoZWR1bGVkOiB1bmRlZmluZWQsXG5cdFx0XHRyZW5kZXJRdWV1ZTogW10sXG5cdFx0XHRtZXJnZTogcHJvamVjdGlvbk9wdGlvbnMubWVyZ2UgfHwgZmFsc2UsXG5cdFx0XHRtZXJnZUVsZW1lbnQ6IHByb2plY3Rpb25PcHRpb25zLm1lcmdlRWxlbWVudFxuXHRcdH07XG5cdFx0cHJvamVjdG9yU3RhdGVNYXAuc2V0KGluc3RhbmNlLCBwcm9qZWN0b3JTdGF0ZSk7XG5cblx0XHRmaW5hbFByb2plY3Rvck9wdGlvbnMucm9vdE5vZGUgPSBwYXJlbnROb2RlO1xuXHRcdGNvbnN0IHBhcmVudFZOb2RlID0gdG9QYXJlbnRWTm9kZShmaW5hbFByb2plY3Rvck9wdGlvbnMucm9vdE5vZGUpO1xuXHRcdGNvbnN0IG5vZGUgPSB0b0ludGVybmFsV05vZGUoaW5zdGFuY2UsIGluc3RhbmNlRGF0YSk7XG5cdFx0aW5zdGFuY2VNYXAuc2V0KGluc3RhbmNlLCB7IGRub2RlOiBub2RlLCBwYXJlbnRWTm9kZSB9KTtcblx0XHRpbnN0YW5jZURhdGEuaW52YWxpZGF0ZSA9ICgpID0+IHtcblx0XHRcdGluc3RhbmNlRGF0YS5kaXJ0eSA9IHRydWU7XG5cdFx0XHRpZiAoaW5zdGFuY2VEYXRhLnJlbmRlcmluZyA9PT0gZmFsc2UpIHtcblx0XHRcdFx0cHJvamVjdG9yU3RhdGUucmVuZGVyUXVldWUucHVzaCh7IGluc3RhbmNlLCBkZXB0aDogZmluYWxQcm9qZWN0b3JPcHRpb25zLmRlcHRoIH0pO1xuXHRcdFx0XHRzY2hlZHVsZVJlbmRlcihmaW5hbFByb2plY3Rvck9wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0dXBkYXRlRG9tKG5vZGUsIG5vZGUsIGZpbmFsUHJvamVjdG9yT3B0aW9ucywgcGFyZW50Vk5vZGUsIGluc3RhbmNlLCBbXSwgW10pO1xuXHRcdHByb2plY3RvclN0YXRlLmFmdGVyUmVuZGVyQ2FsbGJhY2tzLnB1c2goKCkgPT4ge1xuXHRcdFx0aW5zdGFuY2VEYXRhLm9uQXR0YWNoKCk7XG5cdFx0fSk7XG5cdFx0cnVuRGVmZXJyZWRSZW5kZXJDYWxsYmFja3MoZmluYWxQcm9qZWN0b3JPcHRpb25zKTtcblx0XHRydW5BZnRlclJlbmRlckNhbGxiYWNrcyhmaW5hbFByb2plY3Rvck9wdGlvbnMpO1xuXHRcdHJldHVybiB7XG5cdFx0XHRkb21Ob2RlOiBmaW5hbFByb2plY3Rvck9wdGlvbnMucm9vdE5vZGVcblx0XHR9O1xuXHR9LFxuXHRjcmVhdGU6IGZ1bmN0aW9uKGluc3RhbmNlOiBEZWZhdWx0V2lkZ2V0QmFzZUludGVyZmFjZSwgcHJvamVjdGlvbk9wdGlvbnM/OiBQYXJ0aWFsPFByb2plY3Rpb25PcHRpb25zPik6IFByb2plY3Rpb24ge1xuXHRcdHJldHVybiB0aGlzLmFwcGVuZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSwgaW5zdGFuY2UsIHByb2plY3Rpb25PcHRpb25zKTtcblx0fSxcblx0bWVyZ2U6IGZ1bmN0aW9uKFxuXHRcdGVsZW1lbnQ6IEVsZW1lbnQsXG5cdFx0aW5zdGFuY2U6IERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlLFxuXHRcdHByb2plY3Rpb25PcHRpb25zOiBQYXJ0aWFsPFByb2plY3Rpb25PcHRpb25zPiA9IHt9XG5cdCk6IFByb2plY3Rpb24ge1xuXHRcdHByb2plY3Rpb25PcHRpb25zLm1lcmdlID0gdHJ1ZTtcblx0XHRwcm9qZWN0aW9uT3B0aW9ucy5tZXJnZUVsZW1lbnQgPSBlbGVtZW50O1xuXHRcdGNvbnN0IHByb2plY3Rpb24gPSB0aGlzLmFwcGVuZChlbGVtZW50LnBhcmVudE5vZGUgYXMgRWxlbWVudCwgaW5zdGFuY2UsIHByb2plY3Rpb25PcHRpb25zKTtcblx0XHRjb25zdCBwcm9qZWN0b3JTdGF0ZSA9IHByb2plY3RvclN0YXRlTWFwLmdldChpbnN0YW5jZSkhO1xuXHRcdHByb2plY3RvclN0YXRlLm1lcmdlID0gZmFsc2U7XG5cdFx0cmV0dXJuIHByb2plY3Rpb247XG5cdH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gdmRvbS50cyIsIi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxudmFyIGhhcyA9IHJlcXVpcmUoJ0Bkb2pvL2ZyYW1ld29yay9jb3JlL2hhcycpO1xuXG5pZiAoIWhhcy5leGlzdHMoJ2J1aWxkLXRpbWUtcmVuZGVyJykpIHtcblx0aGFzLmFkZCgnYnVpbGQtdGltZS1yZW5kZXInLCBmYWxzZSwgZmFsc2UpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGhhc0J1aWxkVGltZVJlbmRlci50cyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IHlbb3BbMF0gJiAyID8gXCJyZXR1cm5cIiA6IG9wWzBdID8gXCJ0aHJvd1wiIDogXCJuZXh0XCJdKSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFswLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyAgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKG9bbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH07IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl07XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXG5cdFx0ZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsImltcG9ydCBoYXMgZnJvbSAnQGRvam8vZnJhbWV3b3JrL2hhcy9oYXMnO1xuXG5leHBvcnQgY29uc3QgaG9zdCA9IGhhcygnYXBpLWhvc3QnKSBhcyBzdHJpbmc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vd2VicGFjay1jb250cmliL2Nzcy1tb2R1bGUtZHRzLWxvYWRlcj90eXBlPXRzJmluc3RhbmNlTmFtZT0wX2Rvam8hLi9zcmMvY29uZmlnLnRzIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiMmhvNzhvQ1cuc3ZnXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW1nL2xvZ28uc3ZnXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9pbWcvbG9nby5zdmdcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tYWluLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvbWFpbi5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiaW1wb3J0IHsgUHJvamVjdG9yTWl4aW4gfSBmcm9tICdAZG9qby9mcmFtZXdvcmsvd2lkZ2V0LWNvcmUvbWl4aW5zL1Byb2plY3Rvcic7XG5pbXBvcnQgSGVsbG9Xb3JsZCBmcm9tICcuL3dpZGdldHMvSGVsbG9Xb3JsZCc7XG5pbXBvcnQgeyBob3N0IH0gZnJvbSAnLi9jb25maWcnO1xuXG5jb25zdCBQcm9qZWN0b3IgPSBQcm9qZWN0b3JNaXhpbihIZWxsb1dvcmxkKTtcbmNvbnN0IHByb2plY3RvciA9IG5ldyBQcm9qZWN0b3IoKTtcbnByb2plY3Rvci5zZXRQcm9wZXJ0aWVzKHsgbmFtZTogaG9zdCB9KTtcblxucHJvamVjdG9yLmFwcGVuZCgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dlYnBhY2stY29udHJpYi9jc3MtbW9kdWxlLWR0cy1sb2FkZXI/dHlwZT10cyZpbnN0YW5jZU5hbWU9MF9kb2pvIS4vc3JjL21haW4udHMiLCJpbXBvcnQgV2lkZ2V0QmFzZSBmcm9tICdAZG9qby9mcmFtZXdvcmsvd2lkZ2V0LWNvcmUvV2lkZ2V0QmFzZSc7XG5pbXBvcnQgeyB2IH0gZnJvbSAnQGRvam8vZnJhbWV3b3JrL3dpZGdldC1jb3JlL2QnO1xuXG5pbXBvcnQgKiBhcyBjc3MgZnJvbSAnLi9zdHlsZXMvaGVsbG9Xb3JsZC5tLmNzcyc7XG5cbmNvbnN0IGxvZ28gPSByZXF1aXJlKCcuLy4uL2ltZy9sb2dvLnN2ZycpO1xuXG4vKipcbiAqIEEgXCJIZWxsbyBXb3JsZFwiIHdpZGdldCB0aGF0IHJlbmRlcnMgYSBzcGlubmluZyBEb2pvIDIgbG9nbyBhbmQgdGhlIHRleHQgXCJIZWxsbywgRG9qbyAyIFdvcmxkIVwiLlxuICpcbiAqIFJlZmVyIHRvIHRoZSBjcmVhdGluZyB3aWRnZXRzIHR1dG9yaWFsIGZvciBoZWxwOiBodHRwczovL2Rvam8uaW8vdHV0b3JpYWxzLzAwM19jcmVhdGluZ193aWRnZXRzL1xuICovXG5leHBvcnQgY2xhc3MgSGVsbG9Xb3JsZCBleHRlbmRzIFdpZGdldEJhc2U8eyBuYW1lOiBzdHJpbmcgfT4ge1xuXHRwcm90ZWN0ZWQgcmVuZGVyKCkge1xuXHRcdHJldHVybiB2KCdkaXYnLCB7IGNsYXNzZXM6IGNzcy5yb290IH0sIFtcblx0XHRcdHYoJ2ltZycsIHsgc3JjOiBsb2dvLCBjbGFzc2VzOiBjc3MubG9nbyB9KSxcblx0XHRcdHYoJ2RpdicsIHsgY2xhc3NlczogY3NzLmxhYmVsIH0sIFtgSGVsbG8sICR7dGhpcy5wcm9wZXJ0aWVzLm5hbWV9IWBdKVxuXHRcdF0pO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhlbGxvV29ybGQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vd2VicGFjay1jb250cmliL2Nzcy1tb2R1bGUtZHRzLWxvYWRlcj90eXBlPXRzJmluc3RhbmNlTmFtZT0wX2Rvam8hLi9zcmMvd2lkZ2V0cy9IZWxsb1dvcmxkLnRzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiIF9rZXlcIjpcImZlYXR1cmVzL2hlbGxvV29ybGRcIixcInJvb3RcIjpcImhlbGxvV29ybGQtbV9fcm9vdF9fM21MRTRcIixcImxvZ29cIjpcImhlbGxvV29ybGQtbV9fbG9nb19fU05FV3dcIixcInJvdGF0aW9uXCI6XCJoZWxsb1dvcmxkLW1fX3JvdGF0aW9uX18xMnV5Y1wiLFwibGFiZWxcIjpcImhlbGxvV29ybGQtbV9fbGFiZWxfXzFuWUV1XCJ9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dpZGdldHMvc3R5bGVzL2hlbGxvV29ybGQubS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vc3JjL3dpZGdldHMvc3R5bGVzL2hlbGxvV29ybGQubS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIl0sInNvdXJjZVJvb3QiOiIifQ==