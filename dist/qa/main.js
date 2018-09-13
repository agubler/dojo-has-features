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

const host = "my-qa.com";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy9EZXN0cm95YWJsZS50cyIsIndlYnBhY2s6Ly8vRXZlbnRlZC50cyIsIndlYnBhY2s6Ly8vaGFzLnRzIiwid2VicGFjazovLy9sYW5nLnRzIiwid2VicGFjazovLy9NYXAudHMiLCJ3ZWJwYWNrOi8vL1Byb21pc2UudHMiLCJ3ZWJwYWNrOi8vL1N5bWJvbC50cyIsIndlYnBhY2s6Ly8vV2Vha01hcC50cyIsIndlYnBhY2s6Ly8vYXJyYXkudHMiLCJ3ZWJwYWNrOi8vL2dsb2JhbC50cyIsIndlYnBhY2s6Ly8vaXRlcmF0b3IudHMiLCJ3ZWJwYWNrOi8vL251bWJlci50cyIsIndlYnBhY2s6Ly8vb2JqZWN0LnRzIiwid2VicGFjazovLy9zdHJpbmcudHMiLCJ3ZWJwYWNrOi8vL3F1ZXVlLnRzIiwid2VicGFjazovLy91dGlsLnRzIiwid2VicGFjazovLy9Ob2RlSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vUmVnaXN0cnkudHMiLCJ3ZWJwYWNrOi8vL1JlZ2lzdHJ5SGFuZGxlci50cyIsIndlYnBhY2s6Ly8vV2lkZ2V0QmFzZS50cyIsIndlYnBhY2s6Ly8vY3NzVHJhbnNpdGlvbnMudHMiLCJ3ZWJwYWNrOi8vL2QudHMiLCJ3ZWJwYWNrOi8vL2FmdGVyUmVuZGVyLnRzIiwid2VicGFjazovLy9oYW5kbGVEZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vL2RpZmYudHMiLCJ3ZWJwYWNrOi8vL1Byb2plY3Rvci50cyIsIndlYnBhY2s6Ly8vdmRvbS50cyIsIndlYnBhY2s6Ly8vaGFzQnVpbGRUaW1lUmVuZGVyLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltZy9sb2dvLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5jc3M/ODQyMSIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2lkZ2V0cy9IZWxsb1dvcmxkLnRzIiwid2VicGFjazovLy8uL3NyYy93aWRnZXRzL3N0eWxlcy9oZWxsb1dvcmxkLm0uY3NzPzExYmQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7O0FDVEE7QUFBQTtBQUErQztBQUNUO0FBRXRDOztHQUVHO0FBQ0g7SUFDQyxNQUFNLENBQUMsOERBQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUVEOztHQUVHO0FBQ0g7SUFDQyxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFDbEQsQ0FBQztBQUVNO0lBTU47O09BRUc7SUFDSDtRQUNDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEdBQUcsQ0FBQyxPQUEwQjtRQUM3QixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyw0RUFBcUIsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDcEYsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUM7WUFDTixPQUFPO2dCQUNOLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbEIsQ0FBQztTQUNELENBQUM7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE9BQU87UUFDTixNQUFNLENBQUMsSUFBSSw4REFBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDL0IsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzlDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7WUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0Q7QUFBQTtBQUFBO0FBRWMscUZBQVcsRUFBQzs7Ozs7Ozs7O0FDbEUzQjtBQUFBO0FBQUE7QUFBOEI7QUFFYztBQUU1Qzs7O0FBR0EsTUFBTSxTQUFRLEVBQUcsSUFBSSwwREFBRyxFQUFrQjtBQUUxQzs7Ozs7QUFLTSxxQkFBc0IsVUFBMkIsRUFBRSxZQUE2QjtJQUNyRixHQUFHLENBQUMsT0FBTyxhQUFZLElBQUssU0FBUSxHQUFJLE9BQU8sV0FBVSxJQUFLLFNBQVEsR0FBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxJQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pHLElBQUksS0FBYTtRQUNqQixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM3QixNQUFLLEVBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUU7UUFDbEM7UUFBRSxLQUFLO1lBQ04sTUFBSyxFQUFHLElBQUksTUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUMxRCxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUM7UUFDaEM7UUFDQSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ2hDO0lBQUUsS0FBSztRQUNOLE9BQU8sV0FBVSxJQUFLLFlBQVk7SUFDbkM7QUFDRDtBQXlCQTs7O0FBR00sY0FJSixRQUFRLGtFQUFXO0lBSnJCOztRQVNDOzs7UUFHVSxrQkFBWSxFQUE4QyxJQUFJLDBEQUFHLEVBQUU7SUE4RDlFO0lBckRDLElBQUksQ0FBQyxLQUFVO1FBQ2QsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUU7WUFDM0MsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFXLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN6QyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUU7b0JBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztnQkFDekIsQ0FBQyxDQUFDO1lBQ0g7UUFDRCxDQUFDLENBQUM7SUFDSDtJQXNCQSxFQUFFLENBQUMsSUFBUyxFQUFFLFFBQTBDO1FBQ3ZELEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzVCLE1BQU0sUUFBTyxFQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM3RSxPQUFPO2dCQUNOLE9BQU87b0JBQ04sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDOUM7YUFDQTtRQUNGO1FBQ0EsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUM7SUFDekM7SUFFUSxZQUFZLENBQUMsSUFBaUIsRUFBRSxRQUErQjtRQUN0RSxNQUFNLFVBQVMsRUFBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUMsR0FBSSxFQUFFO1FBQ25ELFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUM7UUFDdEMsT0FBTztZQUNOLE9BQU8sRUFBRSxHQUFHLEdBQUU7Z0JBQ2IsTUFBTSxVQUFTLEVBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFDLEdBQUksRUFBRTtnQkFDbkQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqRDtTQUNBO0lBQ0Y7Ozs7QUFHYyxpRkFBTyxFQUFDOzs7Ozs7Ozs7QUNuSXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFvQztBQUNXO0FBRVg7QUFDckIsaUlBQUcsRUFBQztBQUVuQixzRUFBRyxDQUFDLGVBQWUsRUFBRSxPQUFPLDZEQUFNLENBQUMsTUFBTSxDQUFDLE9BQU0sSUFBSyxVQUFVLEVBQUUsSUFBSSxDQUFDO0FBRXRFLHNFQUFHLENBQUMsYUFBYSxFQUFFLE9BQU8sNkRBQU0sQ0FBQyxZQUFXLElBQUssV0FBVyxFQUFFLElBQUksQ0FBQztBQUNuRSxzRUFBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLDZEQUFNLENBQUMsU0FBUSxJQUFLLFdBQVcsRUFBRSxJQUFJLENBQUM7QUFDN0Qsc0VBQUcsQ0FBQyxZQUFZLEVBQUUsT0FBTyw2REFBTSxDQUFDLFdBQVUsSUFBSyxXQUFXLEVBQUUsSUFBSSxDQUFDO0FBQ2pFLHNFQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sNkRBQU0sQ0FBQyxlQUFjLElBQUssV0FBVyxFQUFFLElBQUksQ0FBQztBQUM5RCxzRUFBRyxDQUFDLE1BQU0sT0FBWSxHQUFJLGVBQWMsR0FBSSw2REFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO0FBQ2xGLHNFQUFHLENBQ0YsTUFBTSxFQUNOO0lBQ0MsR0FBRyxDQUFDLEtBQVksRUFBRTtRQUNqQixPQUFPLEtBQUs7SUFDYjtJQUVBLE1BQU0sUUFBTyxFQUFHLElBQUksNkRBQU0sQ0FBQyxjQUFjLEVBQUU7SUFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsNkRBQU0sQ0FBQyxRQUFRLENBQUMsU0FBUSxFQUFHLGtCQUFrQixFQUFFLElBQUksQ0FBQztJQUN4RSxPQUFPLENBQUMsYUFBWSxFQUFHLE1BQU07SUFDN0IsT0FBTyxDQUFDLEtBQUssRUFBRTtJQUNmLE9BQU8sT0FBTyxDQUFDLGFBQVksSUFBSyxNQUFNO0FBQ3ZDLENBQUMsRUFDRCxJQUFJLENBQ0o7QUFFRCxzRUFBRyxDQUFDLGFBQWEsRUFBRSxTQUFRLEdBQUksOERBQU0sR0FBSSxPQUFPLDZEQUFNLENBQUMsT0FBTSxJQUFLLFVBQVUsRUFBRSxJQUFJLENBQUM7QUFFbkYsc0VBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBTyxHQUFJLDhEQUFNLEdBQUksT0FBTyw2REFBTSxDQUFDLE1BQUssSUFBSyxVQUFVLEVBQUUsSUFBSSxDQUFDO0FBRTNFLHNFQUFHLENBQ0YsdUJBQXVCLEVBQ3ZCLE9BQU8sNkRBQU0sQ0FBQyxRQUFPLElBQUssWUFBVztJQUNwQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFFO1FBQ3ZCLElBQUk7WUFDSCxHQUFHLENBQUMsNkRBQU0sQ0FBQyxPQUFNLElBQUssVUFBUyxHQUFJLDZEQUFNLENBQUMsSUFBRyxHQUFJLDZEQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRTtnQkFDNUUsTUFBTSxLQUFJLEVBQUcsSUFBSSxJQUFJLENBQ3BCO29CQUNDOzs7Ozs7Ozs7O09BVUE7aUJBQ0EsRUFDRCxFQUFFLElBQUksRUFBRSx5QkFBd0IsQ0FBRSxDQUNsQztnQkFDRCxNQUFNLE9BQU0sRUFBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTSxDQUFFLEVBQUUsR0FBRTtvQkFDdkQsT0FBTyxDQUFDLE9BQU0sSUFBSyxNQUFNLENBQUM7Z0JBQzNCLENBQUMsQ0FBQztnQkFDRixNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztZQUN2QjtZQUFFLEtBQUs7Z0JBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNmO1FBQ0Q7UUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFO1lBQ1g7WUFDQSxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ2Y7SUFDRCxDQUFDLENBQUMsRUFDSCxJQUFJLENBQ0o7Ozs7Ozs7OztBQ3BFRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBd0M7QUFFQTtBQUV4QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztBQUNwQyxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztBQUV2RDs7Ozs7Ozs7O0dBU0c7QUFDSCw4QkFBOEIsS0FBVTtJQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLGlCQUFpQixDQUFDO0FBQ3BFLENBQUM7QUFFRCxtQkFBc0IsS0FBVSxFQUFFLFNBQWtCO0lBQ25ELE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVMsSUFBTztRQUNoQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQU0sU0FBUyxDQUFNLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBRUQsTUFBTSxDQUFDLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxJQUFJO1lBQ04sQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDUCxJQUFJLEVBQUUsSUFBSTtnQkFDVixTQUFTLEVBQUUsU0FBUztnQkFDcEIsT0FBTyxFQUFZLENBQUMsSUFBSSxDQUFDO2dCQUN6QixNQUFNLEVBQUssRUFBRTthQUNaLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQVVELGdCQUE0QyxNQUF1QjtJQUNsRSxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ3pCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkMsTUFBTSxNQUFNLEdBQVEsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUNuQyxNQUFNLFdBQVcsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFFaEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2hELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakMsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM3QyxRQUFRLENBQUM7UUFDVixDQUFDO1FBQ0QsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN4QixFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLEtBQUssR0FBUSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTdCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxRQUFRLENBQUM7Z0JBQ1YsQ0FBQztnQkFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNWLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMxQixLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDckMsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN4QyxNQUFNLFdBQVcsR0FBUSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNwQixLQUFLLEdBQUcsTUFBTSxDQUFDOzRCQUNkLElBQUksRUFBRSxJQUFJOzRCQUNWLFNBQVMsRUFBRSxTQUFTOzRCQUNwQixPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUM7NEJBQ2hCLE1BQU0sRUFBRSxXQUFXOzRCQUNuQixNQUFNO3lCQUNOLENBQUMsQ0FBQztvQkFDSixDQUFDO2dCQUNGLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUNyQixDQUFDO1FBQ0YsQ0FBQztJQUNGLENBQUM7SUFFRCxNQUFNLENBQVEsTUFBTSxDQUFDO0FBQ3RCLENBQUM7QUEyQ00sZ0JBQWdCLFNBQWMsRUFBRSxHQUFHLE1BQWE7SUFDdEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLElBQUksVUFBVSxDQUFDLGlEQUFpRCxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUV2QyxNQUFNLENBQUMsNERBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUEwQ00sb0JBQW9CLE1BQVcsRUFBRSxHQUFHLE9BQWM7SUFDeEQsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNiLElBQUksRUFBRSxJQUFJO1FBQ1YsU0FBUyxFQUFFLEtBQUs7UUFDaEIsT0FBTyxFQUFFLE9BQU87UUFDaEIsTUFBTSxFQUFFLE1BQU07S0FDZCxDQUFDLENBQUM7QUFDSixDQUFDO0FBMENNLG1CQUFtQixNQUFXLEVBQUUsR0FBRyxPQUFjO0lBQ3ZELE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDYixJQUFJLEVBQUUsSUFBSTtRQUNWLFNBQVMsRUFBRSxJQUFJO1FBQ2YsT0FBTyxFQUFFLE9BQU87UUFDaEIsTUFBTSxFQUFFLE1BQU07S0FDZCxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksbUJBQWlDLE1BQVM7SUFDaEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFFNUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNJLHFCQUFxQixDQUFNLEVBQUUsQ0FBTTtJQUN6QyxNQUFNLENBQUMsQ0FDTixDQUFDLEtBQUssQ0FBQztRQUNQLHlCQUF5QjtRQUN6QixDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUNwQixDQUFDO0FBQ0gsQ0FBQztBQUVEOzs7Ozs7Ozs7O0dBVUc7QUFDSSxrQkFBa0IsUUFBWSxFQUFFLE1BQWMsRUFBRSxHQUFHLFlBQW1CO0lBQzVFLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTTtRQUN6QixDQUFDLENBQUM7WUFDQSxNQUFNLElBQUksR0FBVSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1lBRWpHLFNBQVM7WUFDVCxNQUFNLENBQU8sUUFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUNILENBQUMsQ0FBQztZQUNBLFNBQVM7WUFDVCxNQUFNLENBQU8sUUFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQXdDTSxlQUFlLE1BQVcsRUFBRSxHQUFHLE9BQWM7SUFDbkQsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNiLElBQUksRUFBRSxLQUFLO1FBQ1gsU0FBUyxFQUFFLElBQUk7UUFDZixPQUFPLEVBQUUsT0FBTztRQUNoQixNQUFNLEVBQUUsTUFBTTtLQUNkLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0ksaUJBQWlCLGNBQXVDLEVBQUUsR0FBRyxZQUFtQjtJQUN0RixNQUFNLENBQUM7UUFDTixNQUFNLElBQUksR0FBVSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1FBRWpHLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUM7QUFDSCxDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNJLHNCQUFzQixVQUFzQjtJQUNsRCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDbkIsTUFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ1IsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ2QsVUFBVSxFQUFFLENBQUM7WUFDZCxDQUFDO1FBQ0YsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSSwrQkFBK0IsR0FBRyxPQUFpQjtJQUN6RCxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QixDQUFDO0lBQ0YsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDOzs7Ozs7Ozs7QUR2WEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLCtCQUErQixLQUFVO0lBQ3hDLE9BQU8sTUFBSyxHQUFJLEtBQUssQ0FBQyxJQUFJO0FBQzNCO0FBRUE7OztBQUdPLE1BQU0sVUFBUyxFQUE2QyxFQUFFLENBQUM7QUFBQTtBQUFBO0FBRXRFOzs7QUFHTyxNQUFNLGNBQWEsRUFBdUMsRUFBRSxDQUFDO0FBQUE7QUFBQTtBQUVwRTs7OztBQUlBLE1BQU0sY0FBYSxFQUErQyxFQUFFO0FBd0JwRTs7O0FBR0EsTUFBTSxZQUFXLEVBQUcsQ0FBQztJQUNwQjtJQUNBLEdBQUcsQ0FBQyxPQUFPLE9BQU0sSUFBSyxXQUFXLEVBQUU7UUFDbEM7UUFDQSxPQUFPLE1BQU07SUFDZDtJQUFFLEtBQUssR0FBRyxDQUFDLE9BQU8sT0FBTSxJQUFLLFdBQVcsRUFBRTtRQUN6QztRQUNBLE9BQU8sTUFBTTtJQUNkO0lBQUUsS0FBSyxHQUFHLENBQUMsT0FBTyxLQUFJLElBQUssV0FBVyxFQUFFO1FBQ3ZDO1FBQ0EsT0FBTyxJQUFJO0lBQ1o7SUFDQTtJQUNBLE9BQU8sRUFBRTtBQUNWLENBQUMsQ0FBQyxFQUFFO0FBRUo7QUFDQSxNQUFNLEVBQUUsZUFBYyxFQUFFLEVBQXVCLFdBQVcsQ0FBQyxtQkFBa0IsR0FBSSxFQUFFO0FBRW5GO0FBQ0EsR0FBRyxDQUFDLHFCQUFvQixHQUFJLFdBQVcsRUFBRTtJQUN4QyxPQUFPLFdBQVcsQ0FBQyxrQkFBa0I7QUFDdEM7QUFFQTs7Ozs7O0FBTUEsaUNBQWlDLEtBQVU7SUFDMUMsT0FBTyxPQUFPLE1BQUssSUFBSyxVQUFVO0FBQ25DO0FBRUE7Ozs7QUFJQSxNQUFNLFlBQVcsRUFBc0I7SUFDdEMsRUFBRSx1QkFBdUIsQ0FBQyxjQUFjO1FBQ3ZDLEVBQUUsY0FBYyxDQUFDLEtBQUssQ0FBQyxXQUFXO1FBQ2xDLEVBQUU7SUFDSCxFQUFFLEVBQUUsRUFBRTs7Ozs7Ozs7Ozs7O0FBWUQsY0FBZSxVQUFrQixFQUFFLE9BQWdCLEVBQUUsSUFBMkIsRUFBRSxNQUFlO0lBQ3RHLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUU7QUFDbEQ7QUFFQTs7Ozs7Ozs7O0FBU00sbUJBQW9CLFVBQWtCLEVBQUUsU0FBdUM7SUFDcEYsTUFBTSxPQUFNLEVBQXFCLFVBQVUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUMsR0FBSSxFQUFFO0lBQ3pFLElBQUksRUFBQyxFQUFHLENBQUM7SUFFVCxhQUFhLElBQWM7UUFDMUIsTUFBTSxLQUFJLEVBQUcsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxLQUFJLElBQUssR0FBRyxFQUFFO1lBQ2pCO1lBQ0EsT0FBTyxJQUFJO1FBQ1o7UUFBRSxLQUFLO1lBQ047WUFDQSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFDLElBQUssR0FBRyxFQUFFO2dCQUN4QixHQUFHLENBQUMsQ0FBQyxLQUFJLEdBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN2QjtvQkFDQSxPQUFPLEdBQUcsRUFBRTtnQkFDYjtnQkFBRSxLQUFLO29CQUNOO29CQUNBLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ1QsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNqQjtZQUNEO1lBQ0E7WUFDQSxPQUFPLElBQUk7UUFDWjtJQUNEO0lBRUEsTUFBTSxHQUFFLEVBQUcsR0FBRyxFQUFFO0lBRWhCLE9BQU8sR0FBRSxHQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDM0I7QUFFQTs7Ozs7QUFLTSxnQkFBaUIsT0FBZTtJQUNyQyxNQUFNLGtCQUFpQixFQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUU7SUFFL0MsT0FBTyxPQUFPLENBQ2Isa0JBQWlCLEdBQUksWUFBVyxHQUFJLGtCQUFpQixHQUFJLFVBQVMsR0FBSSxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FDdEc7QUFDRjtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7QUFlTSxhQUNMLE9BQWUsRUFDZixLQUE0RCxFQUM1RCxZQUFxQixLQUFLO0lBRTFCLE1BQU0sa0JBQWlCLEVBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRTtJQUUvQyxHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFDLEdBQUksQ0FBQyxVQUFTLEdBQUksQ0FBQyxDQUFDLGtCQUFpQixHQUFJLFdBQVcsQ0FBQyxFQUFFO1FBQ25GLE1BQU0sSUFBSSxTQUFTLENBQUMsWUFBWSxPQUFPLGtDQUFrQyxDQUFDO0lBQzNFO0lBRUEsR0FBRyxDQUFDLE9BQU8sTUFBSyxJQUFLLFVBQVUsRUFBRTtRQUNoQyxhQUFhLENBQUMsaUJBQWlCLEVBQUMsRUFBRyxLQUFLO0lBQ3pDO0lBQUUsS0FBSyxHQUFHLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDeEMsYUFBYSxDQUFDLE9BQU8sRUFBQyxFQUFHLEtBQUssQ0FBQyxJQUFJLENBQ2xDLENBQUMsYUFBZ0MsRUFBRSxHQUFFO1lBQ3BDLFNBQVMsQ0FBQyxPQUFPLEVBQUMsRUFBRyxhQUFhO1lBQ2xDLE9BQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQztRQUM5QixDQUFDLEVBQ0QsR0FBRyxHQUFFO1lBQ0osT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDO1FBQzlCLENBQUMsQ0FDRDtJQUNGO0lBQUUsS0FBSztRQUNOLFNBQVMsQ0FBQyxpQkFBaUIsRUFBQyxFQUFHLEtBQUs7UUFDcEMsT0FBTyxhQUFhLENBQUMsaUJBQWlCLENBQUM7SUFDeEM7QUFDRDtBQUVBOzs7OztBQUtjLGFBQWMsT0FBZTtJQUMxQyxJQUFJLE1BQXlCO0lBRTdCLE1BQU0sa0JBQWlCLEVBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRTtJQUUvQyxHQUFHLENBQUMsa0JBQWlCLEdBQUksV0FBVyxFQUFFO1FBQ3JDLE9BQU0sRUFBRyxXQUFXLENBQUMsaUJBQWlCLENBQUM7SUFDeEM7SUFBRSxLQUFLLEdBQUcsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsRUFBRTtRQUM1QyxPQUFNLEVBQUcsU0FBUyxDQUFDLGlCQUFpQixFQUFDLEVBQUcsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuRixPQUFPLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQztJQUN4QztJQUFFLEtBQUssR0FBRyxDQUFDLGtCQUFpQixHQUFJLFNBQVMsRUFBRTtRQUMxQyxPQUFNLEVBQUcsU0FBUyxDQUFDLGlCQUFpQixDQUFDO0lBQ3RDO0lBQUUsS0FBSyxHQUFHLENBQUMsUUFBTyxHQUFJLGFBQWEsRUFBRTtRQUNwQyxPQUFPLEtBQUs7SUFDYjtJQUFFLEtBQUs7UUFDTixNQUFNLElBQUksU0FBUyxDQUFDLCtDQUErQyxPQUFPLEdBQUcsQ0FBQztJQUMvRTtJQUVBLE9BQU8sTUFBTTtBQUNkO0FBRUE7OztBQUlBO0FBRUE7QUFDQSxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQztBQUVsQjtBQUNBLEdBQUcsQ0FBQyxjQUFjLEVBQUUsT0FBTyxTQUFRLElBQUssWUFBVyxHQUFJLE9BQU8sU0FBUSxJQUFLLFdBQVcsQ0FBQztBQUV2RjtBQUNBLEdBQUcsQ0FBQyxXQUFXLEVBQUU7SUFDaEIsR0FBRyxDQUFDLE9BQU8sUUFBTyxJQUFLLFNBQVEsR0FBSSxPQUFPLENBQUMsU0FBUSxHQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1FBQzdFLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJO0lBQzdCO0FBQ0QsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0FFalFGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFtRjtBQUNyRDtBQUNZO0FBQ1Y7QUFDZDtBQXdIWCxJQUFJLElBQUcsRUFBbUIsd0RBQU0sQ0FBQyxHQUFHO0FBRTNDLEdBQUcsQ0FBQyxLQUFlLEVBQUU7SUFDcEIsSUFBRyxRQUFHO1lBbUJMLFlBQVksUUFBK0M7Z0JBbEJ4QyxXQUFLLEVBQVEsRUFBRTtnQkFDZixhQUFPLEVBQVEsRUFBRTtnQkFpR3BDLEtBQUMsTUFBTSxDQUFDLFdBQVcsRUFBQyxFQUFVLEtBQUs7Z0JBL0VsQyxHQUFHLENBQUMsUUFBUSxFQUFFO29CQUNiLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUU7d0JBQzFCLElBQUksQ0FBQyxJQUFJLEVBQUMsRUFBRyxDQUFDLEVBQUUsRUFBQyxFQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7NEJBQ3pDLE1BQU0sTUFBSyxFQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7NEJBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0I7b0JBQ0Q7b0JBQUUsS0FBSzt3QkFDTixJQUFJLENBQUMsTUFBTSxNQUFLLEdBQUksUUFBUSxFQUFFOzRCQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdCO29CQUNEO2dCQUNEO1lBQ0Q7WUE1QkE7Ozs7WUFJVSxXQUFXLENBQUMsSUFBUyxFQUFFLEdBQU07Z0JBQ3RDLElBQUksQ0FBQyxJQUFJLEVBQUMsRUFBRyxDQUFDLEVBQUUsT0FBTSxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQyxFQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDdEQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7d0JBQzNCLE9BQU8sQ0FBQztvQkFDVDtnQkFDRDtnQkFDQSxPQUFPLENBQUMsQ0FBQztZQUNWO1lBbUJBLElBQUksSUFBSTtnQkFDUCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUN6QjtZQUVBLEtBQUs7Z0JBQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFNLEVBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFNLEVBQUcsQ0FBQztZQUM1QztZQUVBLE1BQU0sQ0FBQyxHQUFNO2dCQUNaLE1BQU0sTUFBSyxFQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7Z0JBQy9DLEdBQUcsQ0FBQyxNQUFLLEVBQUcsQ0FBQyxFQUFFO29CQUNkLE9BQU8sS0FBSztnQkFDYjtnQkFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUM3QixPQUFPLElBQUk7WUFDWjtZQUVBLE9BQU87Z0JBQ04sTUFBTSxPQUFNLEVBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzVCLENBQUMsR0FBTSxFQUFFLENBQVMsRUFBVSxHQUFFO29CQUM3QixPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FDRDtnQkFFRCxPQUFPLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQztZQUNoQztZQUVBLE9BQU8sQ0FBQyxRQUEyRCxFQUFFLE9BQVk7Z0JBQ2hGLE1BQU0sS0FBSSxFQUFHLElBQUksQ0FBQyxLQUFLO2dCQUN2QixNQUFNLE9BQU0sRUFBRyxJQUFJLENBQUMsT0FBTztnQkFDM0IsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFHLENBQUMsRUFBRSxPQUFNLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDLEVBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN0RCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQztnQkFDakQ7WUFDRDtZQUVBLEdBQUcsQ0FBQyxHQUFNO2dCQUNULE1BQU0sTUFBSyxFQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7Z0JBQy9DLE9BQU8sTUFBSyxFQUFHLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDbkQ7WUFFQSxHQUFHLENBQUMsR0FBTTtnQkFDVCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUMsRUFBRyxDQUFDLENBQUM7WUFDOUM7WUFFQSxJQUFJO2dCQUNILE9BQU8sSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNwQztZQUVBLEdBQUcsQ0FBQyxHQUFNLEVBQUUsS0FBUTtnQkFDbkIsSUFBSSxNQUFLLEVBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztnQkFDN0MsTUFBSyxFQUFHLE1BQUssRUFBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSztnQkFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUMsRUFBRyxHQUFHO2dCQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBQyxFQUFHLEtBQUs7Z0JBQzNCLE9BQU8sSUFBSTtZQUNaO1lBRUEsTUFBTTtnQkFDTCxPQUFPLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDdEM7WUFFQSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ2hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUN0QjtTQUdBO1FBbkZPLEdBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyxFQUFHLEVBQUk7V0FtRjlCO0FBQ0Y7QUFFZSw0REFBRyxFQUFDOzs7Ozs7Ozs7O0FDck9uQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThCO0FBQ21CO0FBRS9CO0FBQ2M7QUFlekIsSUFBSSxZQUFXLEVBQW1CLHdEQUFNLENBQUMsT0FBTztBQUVoRCxNQUFNLFdBQVUsRUFBRyxvQkFBdUIsS0FBVTtJQUMxRCxPQUFPLE1BQUssR0FBSSxPQUFPLEtBQUssQ0FBQyxLQUFJLElBQUssVUFBVTtBQUNqRCxDQUFDLENBQUM7QUFBQTtBQUFBO0FBRUYsR0FBRyxDQUFDLEtBQW1CLEVBQUU7SUFPeEIsTUFBTSxDQUFDLFFBQU8sRUFBRyxZQUFXLFFBQUc7WUF5RTlCOzs7Ozs7Ozs7Ozs7WUFZQSxZQUFZLFFBQXFCO2dCQXNIakM7OztnQkFHUSxXQUFLO2dCQWNiLEtBQUMsTUFBTSxDQUFDLFdBQVcsRUFBQyxFQUFjLFNBQVM7Z0JBdEkxQzs7O2dCQUdBLElBQUksVUFBUyxFQUFHLEtBQUs7Z0JBRXJCOzs7Z0JBR0EsTUFBTSxXQUFVLEVBQUcsR0FBWSxHQUFFO29CQUNoQyxPQUFPLElBQUksQ0FBQyxNQUFLLG9CQUFrQixHQUFJLFNBQVM7Z0JBQ2pELENBQUM7Z0JBRUQ7OztnQkFHQSxJQUFJLFVBQVMsRUFBK0IsRUFBRTtnQkFFOUM7Ozs7Z0JBSUEsSUFBSSxhQUFZLEVBQUcsVUFBUyxRQUFvQjtvQkFDL0MsR0FBRyxDQUFDLFNBQVMsRUFBRTt3QkFDZCxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDekI7Z0JBQ0QsQ0FBQztnQkFFRDs7Ozs7O2dCQU1BLE1BQU0sT0FBTSxFQUFHLENBQUMsUUFBZSxFQUFFLEtBQVUsRUFBUSxHQUFFO29CQUNwRDtvQkFDQSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQUssbUJBQWtCLEVBQUU7d0JBQ2pDLE1BQU07b0JBQ1A7b0JBRUEsSUFBSSxDQUFDLE1BQUssRUFBRyxRQUFRO29CQUNyQixJQUFJLENBQUMsY0FBYSxFQUFHLEtBQUs7b0JBQzFCLGFBQVksRUFBRyxjQUFjO29CQUU3QjtvQkFDQTtvQkFDQSxHQUFHLENBQUMsVUFBUyxHQUFJLFNBQVMsQ0FBQyxPQUFNLEVBQUcsQ0FBQyxFQUFFO3dCQUN0QyxjQUFjLENBQUM7NEJBQ2QsR0FBRyxDQUFDLFNBQVMsRUFBRTtnQ0FDZCxJQUFJLE1BQUssRUFBRyxTQUFTLENBQUMsTUFBTTtnQ0FDNUIsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFHLENBQUMsRUFBRSxFQUFDLEVBQUcsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO29DQUMvQixTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQ0FDeEI7Z0NBQ0EsVUFBUyxFQUFHLElBQUk7NEJBQ2pCO3dCQUNELENBQUMsQ0FBQztvQkFDSDtnQkFDRCxDQUFDO2dCQUVEOzs7Ozs7Z0JBTUEsTUFBTSxRQUFPLEVBQUcsQ0FBQyxRQUFlLEVBQUUsS0FBVSxFQUFRLEdBQUU7b0JBQ3JELEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBRTt3QkFDakIsTUFBTTtvQkFDUDtvQkFFQSxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUN0QixLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBa0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksbUJBQWlCLENBQUM7d0JBQ2pGLFVBQVMsRUFBRyxJQUFJO29CQUNqQjtvQkFBRSxLQUFLO3dCQUNOLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDO29CQUN4QjtnQkFDRCxDQUFDO2dCQUVELElBQUksQ0FBQyxLQUFJLEVBQUcsQ0FDWCxXQUFpRixFQUNqRixVQUFtRixFQUNwRCxHQUFFO29CQUNqQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFFO3dCQUN0Qzt3QkFDQTt3QkFDQTt3QkFDQSxZQUFZLENBQUMsR0FBRyxHQUFFOzRCQUNqQixNQUFNLFNBQVEsRUFDYixJQUFJLENBQUMsTUFBSyxxQkFBb0IsRUFBRSxXQUFXLEVBQUUsV0FBVzs0QkFFekQsR0FBRyxDQUFDLE9BQU8sU0FBUSxJQUFLLFVBQVUsRUFBRTtnQ0FDbkMsSUFBSTtvQ0FDSCxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQ0FDdEM7Z0NBQUUsTUFBTSxDQUFDLEtBQUssRUFBRTtvQ0FDZixNQUFNLENBQUMsS0FBSyxDQUFDO2dDQUNkOzRCQUNEOzRCQUFFLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFLLG9CQUFtQixFQUFFO2dDQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzs0QkFDM0I7NEJBQUUsS0FBSztnQ0FDTixPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzs0QkFDNUI7d0JBQ0QsQ0FBQyxDQUFDO29CQUNILENBQUMsQ0FBQztnQkFDSCxDQUFDO2dCQUVELElBQUk7b0JBQ0gsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBa0IsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksbUJBQWlCLENBQUM7Z0JBQ2xGO2dCQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUU7b0JBQ2YsTUFBTSxtQkFBaUIsS0FBSyxDQUFDO2dCQUM5QjtZQUNEO1lBbE1BLE9BQU8sR0FBRyxDQUFDLFFBQXVFO2dCQUNqRixPQUFPLElBQUksSUFBSSxDQUFDLFVBQVMsT0FBTyxFQUFFLE1BQU07b0JBQ3ZDLE1BQU0sT0FBTSxFQUFVLEVBQUU7b0JBQ3hCLElBQUksU0FBUSxFQUFHLENBQUM7b0JBQ2hCLElBQUksTUFBSyxFQUFHLENBQUM7b0JBQ2IsSUFBSSxXQUFVLEVBQUcsSUFBSTtvQkFFckIsaUJBQWlCLEtBQWEsRUFBRSxLQUFVO3dCQUN6QyxNQUFNLENBQUMsS0FBSyxFQUFDLEVBQUcsS0FBSzt3QkFDckIsRUFBRSxRQUFRO3dCQUNWLE1BQU0sRUFBRTtvQkFDVDtvQkFFQTt3QkFDQyxHQUFHLENBQUMsV0FBVSxHQUFJLFNBQVEsRUFBRyxLQUFLLEVBQUU7NEJBQ25DLE1BQU07d0JBQ1A7d0JBQ0EsT0FBTyxDQUFDLE1BQU0sQ0FBQztvQkFDaEI7b0JBRUEscUJBQXFCLEtBQWEsRUFBRSxJQUFTO3dCQUM1QyxFQUFFLEtBQUs7d0JBQ1AsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDckI7NEJBQ0E7NEJBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUM7d0JBQzdDO3dCQUFFLEtBQUs7NEJBQ04sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQ3REO29CQUNEO29CQUVBLElBQUksRUFBQyxFQUFHLENBQUM7b0JBQ1QsSUFBSSxDQUFDLE1BQU0sTUFBSyxHQUFJLFFBQVEsRUFBRTt3QkFDN0IsV0FBVyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUM7d0JBQ3JCLENBQUMsRUFBRTtvQkFDSjtvQkFDQSxXQUFVLEVBQUcsS0FBSztvQkFFbEIsTUFBTSxFQUFFO2dCQUNULENBQUMsQ0FBQztZQUNIO1lBRUEsT0FBTyxJQUFJLENBQUksUUFBK0Q7Z0JBQzdFLE9BQU8sSUFBSSxJQUFJLENBQUMsVUFBUyxPQUE4QixFQUFFLE1BQU07b0JBQzlELElBQUksQ0FBQyxNQUFNLEtBQUksR0FBSSxRQUFRLEVBQUU7d0JBQzVCLEdBQUcsQ0FBQyxLQUFJLFdBQVksT0FBTyxFQUFFOzRCQUM1Qjs0QkFDQTs0QkFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7d0JBQzNCO3dCQUFFLEtBQUs7NEJBQ04sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNwQztvQkFDRDtnQkFDRCxDQUFDLENBQUM7WUFDSDtZQUVBLE9BQU8sTUFBTSxDQUFDLE1BQVk7Z0JBQ3pCLE9BQU8sSUFBSSxJQUFJLENBQUMsVUFBUyxPQUFPLEVBQUUsTUFBTTtvQkFDdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDZixDQUFDLENBQUM7WUFDSDtZQUlBLE9BQU8sT0FBTyxDQUFJLEtBQVc7Z0JBQzVCLE9BQU8sSUFBSSxJQUFJLENBQUMsVUFBUyxPQUFPO29CQUMvQixPQUFPLENBQUksS0FBSyxDQUFDO2dCQUNsQixDQUFDLENBQUM7WUFDSDtZQWdJQSxLQUFLLENBQ0osVUFBaUY7Z0JBRWpGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDO1lBQ3hDO1NBb0JBO1FBdEpPLEdBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyxFQUF1QixXQUFrQztXQXNKaEY7QUFDRjtBQUVlLG9FQUFXLEVBQUM7Ozs7Ozs7Ozs7QUNqUTNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBZ0M7QUFDRjtBQUNzQjtBQVE3QyxJQUFJLE9BQU0sRUFBc0Isd0RBQU0sQ0FBQyxNQUFNO0FBRXBELEdBQUcsQ0FBQyxLQUFrQixFQUFFO0lBQ3ZCOzs7OztJQUtBLE1BQU0sZUFBYyxFQUFHLHdCQUF3QixLQUFVO1FBQ3hELEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQixNQUFNLElBQUksU0FBUyxDQUFDLE1BQUssRUFBRyxrQkFBa0IsQ0FBQztRQUNoRDtRQUNBLE9BQU8sS0FBSztJQUNiLENBQUM7SUFFRCxNQUFNLGlCQUFnQixFQUFHLE1BQU0sQ0FBQyxnQkFBZ0I7SUFDaEQsTUFBTSxlQUFjLEVBSVQsTUFBTSxDQUFDLGNBQXFCO0lBQ3ZDLE1BQU0sT0FBTSxFQUFHLE1BQU0sQ0FBQyxNQUFNO0lBRTVCLE1BQU0sYUFBWSxFQUFHLE1BQU0sQ0FBQyxTQUFTO0lBRXJDLE1BQU0sY0FBYSxFQUE4QixFQUFFO0lBRW5ELE1BQU0sY0FBYSxFQUFHLENBQUM7UUFDdEIsTUFBTSxRQUFPLEVBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUM1QixPQUFPLFVBQVMsSUFBcUI7WUFDcEMsSUFBSSxRQUFPLEVBQUcsQ0FBQztZQUNmLElBQUksSUFBWTtZQUNoQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLEVBQUcsQ0FBQyxRQUFPLEdBQUksRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDL0MsRUFBRSxPQUFPO1lBQ1Y7WUFDQSxLQUFJLEdBQUksTUFBTSxDQUFDLFFBQU8sR0FBSSxFQUFFLENBQUM7WUFDN0IsT0FBTyxDQUFDLElBQUksRUFBQyxFQUFHLElBQUk7WUFDcEIsS0FBSSxFQUFHLEtBQUksRUFBRyxJQUFJO1lBRWxCO1lBQ0E7WUFDQSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUN6RCxjQUFjLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRTtvQkFDbEMsR0FBRyxFQUFFLFVBQXVCLEtBQVU7d0JBQ3JDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN0RDtpQkFDQSxDQUFDO1lBQ0g7WUFFQSxPQUFPLElBQUk7UUFDWixDQUFDO0lBQ0YsQ0FBQyxDQUFDLEVBQUU7SUFFSixNQUFNLGVBQWMsRUFBRyxnQkFBMkIsV0FBNkI7UUFDOUUsR0FBRyxDQUFDLEtBQUksV0FBWSxjQUFjLEVBQUU7WUFDbkMsTUFBTSxJQUFJLFNBQVMsQ0FBQyx3Q0FBd0MsQ0FBQztRQUM5RDtRQUNBLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUMzQixDQUFDO0lBRUQsT0FBTSxFQUFHLE1BQU0sQ0FBQyxPQUFNLEVBQUcsZ0JBQThCLFdBQTZCO1FBQ25GLEdBQUcsQ0FBQyxLQUFJLFdBQVksTUFBTSxFQUFFO1lBQzNCLE1BQU0sSUFBSSxTQUFTLENBQUMsd0NBQXdDLENBQUM7UUFDOUQ7UUFDQSxNQUFNLElBQUcsRUFBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7UUFDbkQsWUFBVyxFQUFHLFlBQVcsSUFBSyxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDbEUsT0FBTyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUU7WUFDNUIsZUFBZSxFQUFFLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztZQUNoRCxRQUFRLEVBQUUsa0JBQWtCLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztTQUN2RCxDQUFDO0lBQ0gsQ0FBc0I7SUFFdEI7SUFDQSxjQUFjLENBQ2IsTUFBTSxFQUNOLEtBQUssRUFDTCxrQkFBa0IsQ0FBQyxVQUFTLEdBQVc7UUFDdEMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN2QixPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUM7UUFDMUI7UUFDQSxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBQyxFQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDLENBQUMsQ0FDRjtJQUNELGdCQUFnQixDQUFDLE1BQU0sRUFBRTtRQUN4QixNQUFNLEVBQUUsa0JBQWtCLENBQUMsVUFBUyxHQUFXO1lBQzlDLElBQUksR0FBVztZQUNmLGNBQWMsQ0FBQyxHQUFHLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUcsR0FBSSxhQUFhLEVBQUU7Z0JBQzFCLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFDLElBQUssR0FBRyxFQUFFO29CQUMvQixPQUFPLEdBQUc7Z0JBQ1g7WUFDRDtRQUNELENBQUMsQ0FBQztRQUNGLFdBQVcsRUFBRSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7UUFDeEUsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7UUFDdEYsUUFBUSxFQUFFLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztRQUNsRSxLQUFLLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO1FBQzVELFVBQVUsRUFBRSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7UUFDdEUsT0FBTyxFQUFFLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztRQUNoRSxNQUFNLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO1FBQzlELE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7UUFDaEUsS0FBSyxFQUFFLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztRQUM1RCxXQUFXLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO1FBQ3hFLFdBQVcsRUFBRSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7UUFDeEUsV0FBVyxFQUFFLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUs7S0FDdkUsQ0FBQztJQUVGO0lBQ0EsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRTtRQUMxQyxXQUFXLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLFFBQVEsRUFBRSxrQkFBa0IsQ0FDM0I7WUFDQyxPQUFPLElBQUksQ0FBQyxRQUFRO1FBQ3JCLENBQUMsRUFDRCxLQUFLLEVBQ0wsS0FBSztLQUVOLENBQUM7SUFFRjtJQUNBLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7UUFDbEMsUUFBUSxFQUFFLGtCQUFrQixDQUFDO1lBQzVCLE9BQU8sV0FBVSxFQUFTLGNBQWMsQ0FBQyxJQUFJLENBQUUsQ0FBQyxnQkFBZSxFQUFHLEdBQUc7UUFDdEUsQ0FBQyxDQUFDO1FBQ0YsT0FBTyxFQUFFLGtCQUFrQixDQUFDO1lBQzNCLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQztRQUM1QixDQUFDO0tBQ0QsQ0FBQztJQUVGLGNBQWMsQ0FDYixNQUFNLENBQUMsU0FBUyxFQUNoQixNQUFNLENBQUMsV0FBVyxFQUNsQixrQkFBa0IsQ0FBQztRQUNsQixPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUM7SUFDNUIsQ0FBQyxDQUFDLENBQ0Y7SUFDRCxjQUFjLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRXRHLGNBQWMsQ0FDYixjQUFjLENBQUMsU0FBUyxFQUN4QixNQUFNLENBQUMsV0FBVyxFQUNsQixrQkFBa0IsQ0FBTyxNQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUNuRjtJQUNELGNBQWMsQ0FDYixjQUFjLENBQUMsU0FBUyxFQUN4QixNQUFNLENBQUMsV0FBVyxFQUNsQixrQkFBa0IsQ0FBTyxNQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUNuRjtBQUNGO0FBRUE7Ozs7O0FBS00sa0JBQW1CLEtBQVU7SUFDbEMsT0FBTyxDQUFDLE1BQUssR0FBSSxDQUFDLE9BQU8sTUFBSyxJQUFLLFNBQVEsR0FBSSxLQUFLLENBQUMsZUFBZSxFQUFDLElBQUssUUFBUSxDQUFDLEVBQUMsR0FBSSxLQUFLO0FBQzlGO0FBRUE7OztBQUdBO0lBQ0MsYUFBYTtJQUNiLG9CQUFvQjtJQUNwQixVQUFVO0lBQ1YsU0FBUztJQUNULFNBQVM7SUFDVCxRQUFRO0lBQ1IsT0FBTztJQUNQLE9BQU87SUFDUCxhQUFhO0lBQ2IsYUFBYTtJQUNiLGFBQWE7SUFDYjtDQUNBLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUU7SUFDdkIsR0FBRyxDQUFDLENBQUUsTUFBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ2hDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxpRkFBa0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRztBQUNELENBQUMsQ0FBQztBQUVhLCtEQUFNLEVBQUM7Ozs7Ozs7OztBQy9MdEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE4QjtBQUNxQjtBQUNuQjtBQUNkO0FBb0VYLElBQUksUUFBTyxFQUF1Qix3REFBTSxDQUFDLE9BQU87QUFPdkQsR0FBRyxDQUFDLEtBQW1CLEVBQUU7SUFDeEIsTUFBTSxRQUFPLEVBQVEsRUFBRTtJQUV2QixNQUFNLE9BQU0sRUFBRztRQUNkLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFFLEVBQUcsU0FBUyxDQUFDO0lBQzdDLENBQUM7SUFFRCxNQUFNLGFBQVksRUFBRyxDQUFDO1FBQ3JCLElBQUksUUFBTyxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRSxFQUFHLFNBQVMsQ0FBQztRQUVoRCxPQUFPO1lBQ04sT0FBTyxPQUFNLEVBQUcsTUFBTSxHQUFFLEVBQUcsQ0FBQyxPQUFPLEdBQUUsRUFBRyxJQUFJLENBQUM7UUFDOUMsQ0FBQztJQUNGLENBQUMsQ0FBQyxFQUFFO0lBRUosUUFBTyxFQUFHO1FBSVQsWUFBWSxRQUErQztZQXlHM0QsS0FBQyxNQUFNLENBQUMsV0FBVyxFQUFDLEVBQWMsU0FBUztZQXhHMUMsSUFBSSxDQUFDLE1BQUssRUFBRyxZQUFZLEVBQUU7WUFFM0IsSUFBSSxDQUFDLGVBQWMsRUFBRyxFQUFFO1lBRXhCLEdBQUcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ2IsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDMUIsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFHLENBQUMsRUFBRSxFQUFDLEVBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDekMsTUFBTSxLQUFJLEVBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQjtnQkFDRDtnQkFBRSxLQUFLO29CQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBQyxHQUFJLFFBQVEsRUFBRTt3QkFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDO29CQUNyQjtnQkFDRDtZQUNEO1FBQ0Q7UUFFUSxvQkFBb0IsQ0FBQyxHQUFRO1lBQ3BDLElBQUksQ0FBQyxJQUFJLEVBQUMsRUFBRyxDQUFDLEVBQUUsRUFBQyxFQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwRCxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLElBQUssR0FBRyxFQUFFO29CQUN2QyxPQUFPLENBQUM7Z0JBQ1Q7WUFDRDtZQUVBLE9BQU8sQ0FBQyxDQUFDO1FBQ1Y7UUFFQSxNQUFNLENBQUMsR0FBUTtZQUNkLEdBQUcsQ0FBQyxJQUFHLElBQUssVUFBUyxHQUFJLElBQUcsSUFBSyxJQUFJLEVBQUU7Z0JBQ3RDLE9BQU8sS0FBSztZQUNiO1lBRUEsTUFBTSxNQUFLLEVBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzFDLEdBQUcsQ0FBQyxNQUFLLEdBQUksS0FBSyxDQUFDLElBQUcsSUFBSyxJQUFHLEdBQUksS0FBSyxDQUFDLE1BQUssSUFBSyxPQUFPLEVBQUU7Z0JBQzFELEtBQUssQ0FBQyxNQUFLLEVBQUcsT0FBTztnQkFDckIsT0FBTyxJQUFJO1lBQ1o7WUFFQSxNQUFNLFlBQVcsRUFBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDO1lBQ2xELEdBQUcsQ0FBQyxZQUFXLEdBQUksQ0FBQyxFQUFFO2dCQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLElBQUk7WUFDWjtZQUVBLE9BQU8sS0FBSztRQUNiO1FBRUEsR0FBRyxDQUFDLEdBQVE7WUFDWCxHQUFHLENBQUMsSUFBRyxJQUFLLFVBQVMsR0FBSSxJQUFHLElBQUssSUFBSSxFQUFFO2dCQUN0QyxPQUFPLFNBQVM7WUFDakI7WUFFQSxNQUFNLE1BQUssRUFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDMUMsR0FBRyxDQUFDLE1BQUssR0FBSSxLQUFLLENBQUMsSUFBRyxJQUFLLElBQUcsR0FBSSxLQUFLLENBQUMsTUFBSyxJQUFLLE9BQU8sRUFBRTtnQkFDMUQsT0FBTyxLQUFLLENBQUMsS0FBSztZQUNuQjtZQUVBLE1BQU0sWUFBVyxFQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUM7WUFDbEQsR0FBRyxDQUFDLFlBQVcsR0FBSSxDQUFDLEVBQUU7Z0JBQ3JCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLO1lBQzlDO1FBQ0Q7UUFFQSxHQUFHLENBQUMsR0FBUTtZQUNYLEdBQUcsQ0FBQyxJQUFHLElBQUssVUFBUyxHQUFJLElBQUcsSUFBSyxJQUFJLEVBQUU7Z0JBQ3RDLE9BQU8sS0FBSztZQUNiO1lBRUEsTUFBTSxNQUFLLEVBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBSyxHQUFJLEtBQUssQ0FBQyxJQUFHLElBQUssSUFBRyxHQUFJLEtBQUssQ0FBQyxNQUFLLElBQUssT0FBTyxDQUFDLEVBQUU7Z0JBQ25FLE9BQU8sSUFBSTtZQUNaO1lBRUEsTUFBTSxZQUFXLEVBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQztZQUNsRCxHQUFHLENBQUMsWUFBVyxHQUFJLENBQUMsRUFBRTtnQkFDckIsT0FBTyxJQUFJO1lBQ1o7WUFFQSxPQUFPLEtBQUs7UUFDYjtRQUVBLEdBQUcsQ0FBQyxHQUFRLEVBQUUsS0FBVztZQUN4QixHQUFHLENBQUMsQ0FBQyxJQUFHLEdBQUksQ0FBQyxPQUFPLElBQUcsSUFBSyxTQUFRLEdBQUksT0FBTyxJQUFHLElBQUssVUFBVSxDQUFDLEVBQUU7Z0JBQ25FLE1BQU0sSUFBSSxTQUFTLENBQUMsb0NBQW9DLENBQUM7WUFDMUQ7WUFDQSxJQUFJLE1BQUssRUFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDeEMsR0FBRyxDQUFDLENBQUMsTUFBSyxHQUFJLEtBQUssQ0FBQyxJQUFHLElBQUssR0FBRyxFQUFFO2dCQUNoQyxNQUFLLEVBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7b0JBQzNCLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFHO2lCQUNqQixDQUFDO2dCQUVGLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2hDO2dCQUFFLEtBQUs7b0JBQ04sTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDdEMsS0FBSyxFQUFFO3FCQUNQLENBQUM7Z0JBQ0g7WUFDRDtZQUNBLEtBQUssQ0FBQyxNQUFLLEVBQUcsS0FBSztZQUNuQixPQUFPLElBQUk7UUFDWjtLQUdBO0FBQ0Y7QUFFZSxnRUFBTyxFQUFDOzs7Ozs7Ozs7QUM5TXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE4QjtBQUNpQztBQUNuQjtBQUNaO0FBQ1k7QUFrRHJDLElBQUksSUFBVTtBQUVyQjs7Ozs7O0FBTU8sSUFBSSxFQUFrQztBQUU3QztBQUVBOzs7Ozs7Ozs7QUFTTyxJQUFJLFVBQWtHO0FBRTdHOzs7Ozs7Ozs7QUFTTyxJQUFJLElBQXVGO0FBRWxHOzs7Ozs7OztBQVFPLElBQUksSUFBeUY7QUFFcEc7Ozs7Ozs7OztBQVNPLElBQUksU0FBdUY7QUFFbEc7QUFFQTs7Ozs7Ozs7QUFRTyxJQUFJLFFBQW9GO0FBRS9GLEdBQUcsQ0FBQyxJQUF5QyxFQUFFO0lBQzlDLEtBQUksRUFBRyx3REFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJO0lBQ3hCLEdBQUUsRUFBRyx3REFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO0lBQ3BCLFdBQVUsRUFBRyx5RUFBVSxDQUFDLHdEQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7SUFDMUQsS0FBSSxFQUFHLHlFQUFVLENBQUMsd0RBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztJQUM5QyxLQUFJLEVBQUcseUVBQVUsQ0FBQyx3REFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQzlDLFVBQVMsRUFBRyx5RUFBVSxDQUFDLHdEQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7QUFDekQ7QUFBRSxLQUFLO0lBQ047SUFDQTtJQUVBOzs7Ozs7SUFNQSxNQUFNLFNBQVEsRUFBRyxrQkFBa0IsTUFBYztRQUNoRCxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2xCLE9BQU8sQ0FBQztRQUNUO1FBRUEsT0FBTSxFQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDdkIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNyQixPQUFNLEVBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDNUI7UUFDQTtRQUNBLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7Ozs7OztJQU1BLE1BQU0sVUFBUyxFQUFHLG1CQUFtQixLQUFVO1FBQzlDLE1BQUssRUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakIsT0FBTyxDQUFDO1FBQ1Q7UUFDQSxHQUFHLENBQUMsTUFBSyxJQUFLLEVBQUMsR0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwQyxPQUFPLEtBQUs7UUFDYjtRQUVBLE9BQU8sQ0FBQyxNQUFLLEVBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQ7Ozs7Ozs7SUFPQSxNQUFNLGdCQUFlLEVBQUcseUJBQXlCLEtBQWEsRUFBRSxNQUFjO1FBQzdFLE9BQU8sTUFBSyxFQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU0sRUFBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO0lBQ3pFLENBQUM7SUFFRCxLQUFJLEVBQUcsY0FFTixTQUF5QyxFQUN6QyxXQUFtQyxFQUNuQyxPQUFhO1FBRWIsR0FBRyxDQUFDLFVBQVMsR0FBSSxJQUFJLEVBQUU7WUFDdEIsTUFBTSxJQUFJLFNBQVMsQ0FBQyxxQ0FBcUMsQ0FBQztRQUMzRDtRQUVBLEdBQUcsQ0FBQyxZQUFXLEdBQUksT0FBTyxFQUFFO1lBQzNCLFlBQVcsRUFBRyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QztRQUVBO1FBQ0EsTUFBTSxZQUFXLEVBQUcsSUFBSTtRQUN4QixNQUFNLE9BQU0sRUFBVyxRQUFRLENBQU8sU0FBVSxDQUFDLE1BQU0sQ0FBQztRQUV4RDtRQUNBLE1BQU0sTUFBSyxFQUNWLE9BQU8sWUFBVyxJQUFLLFdBQVcsRUFBUyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFFL0YsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBQyxHQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3RELE9BQU8sS0FBSztRQUNiO1FBRUE7UUFDQTtRQUNBLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDM0IsR0FBRyxDQUFDLE9BQU0sSUFBSyxDQUFDLEVBQUU7Z0JBQ2pCLE9BQU8sRUFBRTtZQUNWO1lBRUEsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFHLENBQUMsRUFBRSxFQUFDLEVBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUMsS0FBSyxDQUFDLENBQUMsRUFBQyxFQUFHLFlBQVksRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDckU7UUFDRDtRQUFFLEtBQUs7WUFDTixJQUFJLEVBQUMsRUFBRyxDQUFDO1lBQ1QsSUFBSSxDQUFDLE1BQU0sTUFBSyxHQUFJLFNBQVMsRUFBRTtnQkFDOUIsS0FBSyxDQUFDLENBQUMsRUFBQyxFQUFHLFlBQVksRUFBRSxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUs7Z0JBQ3RELENBQUMsRUFBRTtZQUNKO1FBQ0Q7UUFFQSxHQUFHLENBQU8sU0FBVSxDQUFDLE9BQU0sSUFBSyxTQUFTLEVBQUU7WUFDMUMsS0FBSyxDQUFDLE9BQU0sRUFBRyxNQUFNO1FBQ3RCO1FBRUEsT0FBTyxLQUFLO0lBQ2IsQ0FBQztJQUVELEdBQUUsRUFBRyxZQUFlLEdBQUcsS0FBVTtRQUNoQyxPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDekMsQ0FBQztJQUVELFdBQVUsRUFBRyxvQkFDWixNQUFvQixFQUNwQixNQUFjLEVBQ2QsS0FBYSxFQUNiLEdBQVk7UUFFWixHQUFHLENBQUMsT0FBTSxHQUFJLElBQUksRUFBRTtZQUNuQixNQUFNLElBQUksU0FBUyxDQUFDLGlEQUFpRCxDQUFDO1FBQ3ZFO1FBRUEsTUFBTSxPQUFNLEVBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDdEMsT0FBTSxFQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDO1FBQ25ELE1BQUssRUFBRyxlQUFlLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sQ0FBQztRQUNqRCxJQUFHLEVBQUcsZUFBZSxDQUFDLElBQUcsSUFBSyxVQUFVLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUM7UUFDMUUsSUFBSSxNQUFLLEVBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFHLEVBQUcsS0FBSyxFQUFFLE9BQU0sRUFBRyxNQUFNLENBQUM7UUFFbEQsSUFBSSxVQUFTLEVBQUcsQ0FBQztRQUNqQixHQUFHLENBQUMsT0FBTSxFQUFHLE1BQUssR0FBSSxPQUFNLEVBQUcsTUFBSyxFQUFHLEtBQUssRUFBRTtZQUM3QyxVQUFTLEVBQUcsQ0FBQyxDQUFDO1lBQ2QsTUFBSyxHQUFJLE1BQUssRUFBRyxDQUFDO1lBQ2xCLE9BQU0sR0FBSSxNQUFLLEVBQUcsQ0FBQztRQUNwQjtRQUVBLE9BQU8sTUFBSyxFQUFHLENBQUMsRUFBRTtZQUNqQixHQUFHLENBQUMsTUFBSyxHQUFJLE1BQU0sRUFBRTtnQkFDbkIsTUFBK0IsQ0FBQyxNQUFNLEVBQUMsRUFBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ3pEO1lBQUUsS0FBSztnQkFDTixPQUFRLE1BQStCLENBQUMsTUFBTSxDQUFDO1lBQ2hEO1lBRUEsT0FBTSxHQUFJLFNBQVM7WUFDbkIsTUFBSyxHQUFJLFNBQVM7WUFDbEIsS0FBSyxFQUFFO1FBQ1I7UUFFQSxPQUFPLE1BQU07SUFDZCxDQUFDO0lBRUQsS0FBSSxFQUFHLGNBQWlCLE1BQW9CLEVBQUUsS0FBVSxFQUFFLEtBQWMsRUFBRSxHQUFZO1FBQ3JGLE1BQU0sT0FBTSxFQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ3RDLElBQUksRUFBQyxFQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxDQUFDO1FBQ2pELElBQUcsRUFBRyxlQUFlLENBQUMsSUFBRyxJQUFLLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQztRQUUxRSxPQUFPLEVBQUMsRUFBRyxHQUFHLEVBQUU7WUFDZCxNQUErQixDQUFDLENBQUMsRUFBRSxFQUFDLEVBQUcsS0FBSztRQUM5QztRQUVBLE9BQU8sTUFBTTtJQUNkLENBQUM7SUFFRCxLQUFJLEVBQUcsY0FBaUIsTUFBb0IsRUFBRSxRQUF5QixFQUFFLE9BQVk7UUFDcEYsTUFBTSxNQUFLLEVBQUcsU0FBUyxDQUFJLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO1FBQ3JELE9BQU8sTUFBSyxJQUFLLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxTQUFTO0lBQ2hELENBQUM7SUFFRCxVQUFTLEVBQUcsbUJBQXNCLE1BQW9CLEVBQUUsUUFBeUIsRUFBRSxPQUFZO1FBQzlGLE1BQU0sT0FBTSxFQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBRXRDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUNkLE1BQU0sSUFBSSxTQUFTLENBQUMsMENBQTBDLENBQUM7UUFDaEU7UUFFQSxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ1osU0FBUSxFQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2xDO1FBRUEsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFHLENBQUMsRUFBRSxFQUFDLEVBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2hDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDbkMsT0FBTyxDQUFDO1lBQ1Q7UUFDRDtRQUVBLE9BQU8sQ0FBQyxDQUFDO0lBQ1YsQ0FBQztBQUNGO0FBRUEsR0FBRyxLQUFpQixFQUFFO0lBQ3JCLFNBQVEsRUFBRyx5RUFBVSxDQUFDLHdEQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7QUFDdkQ7QUFBRSxLQUFLO0lBQ047Ozs7OztJQU1BLE1BQU0sU0FBUSxFQUFHLGtCQUFrQixNQUFjO1FBQ2hELE9BQU0sRUFBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbEIsT0FBTyxDQUFDO1FBQ1Q7UUFDQSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3JCLE9BQU0sRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM1QjtRQUNBO1FBQ0EsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixDQUFDO0lBQ3ZELENBQUM7SUFFRCxTQUFRLEVBQUcsa0JBQXFCLE1BQW9CLEVBQUUsYUFBZ0IsRUFBRSxZQUFvQixDQUFDO1FBQzVGLElBQUksSUFBRyxFQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBRWpDLElBQUksQ0FBQyxJQUFJLEVBQUMsRUFBRyxTQUFTLEVBQUUsRUFBQyxFQUFHLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUNyQyxNQUFNLGVBQWMsRUFBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLEdBQUcsQ0FDRixjQUFhLElBQUssZUFBYztnQkFDaEMsQ0FBQyxjQUFhLElBQUssY0FBYSxHQUFJLGVBQWMsSUFBSyxjQUFjLENBQ3RFLEVBQUU7Z0JBQ0QsT0FBTyxJQUFJO1lBQ1o7UUFDRDtRQUVBLE9BQU8sS0FBSztJQUNiLENBQUM7QUFDRjs7Ozs7Ozs7O0FDM1ZBLG9EQUFNLFlBQVksR0FBUSxDQUFDO0lBQzFCLHNEQUFzRDtJQUN0RCw4QkFBOEI7SUFDOUIsc0RBQXNEO0lBQ3RELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNiLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDZixDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNuQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2YsQ0FBQztBQUNGLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFVSxxRUFBWSxFQUFDOzs7Ozs7Ozs7O0FDZjVCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFrQjtBQUNnRDtBQXVCbEUsTUFBTSxVQUFVLEdBQXdCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUM7QUFFekU7O0dBRUc7QUFDSTtJQUtOLFlBQVksSUFBZ0M7UUFIcEMsZUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBSXZCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDaEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbkIsQ0FBQztJQUNGLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUk7UUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ25CLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQztnQkFDTixJQUFJLEVBQUUsS0FBSztnQkFDWCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQ2xDLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNuQixDQUFDO0lBRUQsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDYixDQUFDO0NBQ0Q7QUFBQTtBQUFBO0FBRUQ7Ozs7R0FJRztBQUNJLG9CQUFvQixLQUFVO0lBQ3BDLE1BQU0sQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLFVBQVUsQ0FBQztBQUM5RCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLHFCQUFxQixLQUFVO0lBQ3JDLE1BQU0sQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQztBQUNsRCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLGFBQWdCLFFBQW9DO0lBQzFELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7QUFDRixDQUFDO0FBYUQ7Ozs7OztHQU1HO0FBQ0ksZUFDTixRQUE2QyxFQUM3QyxRQUEwQixFQUMxQixPQUFhO0lBRWIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBRW5CO1FBQ0MsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNmLENBQUM7SUFFRCxpRUFBaUU7SUFDakUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUMxQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQzVCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLG1FQUFrQixJQUFJLElBQUksSUFBSSxtRUFBa0IsQ0FBQyxDQUFDLENBQUM7b0JBQzlELElBQUksSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdkIsQ0FBQztZQUNGLENBQUM7WUFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2hELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1osTUFBTSxDQUFDO1lBQ1IsQ0FBQztRQUNGLENBQUM7SUFDRixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDUCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0IsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUU3QixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNyQixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDeEQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDWixNQUFNLENBQUM7Z0JBQ1IsQ0FBQztnQkFDRCxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzFCLENBQUM7UUFDRixDQUFDO0lBQ0YsQ0FBQztBQUNGLENBQUM7Ozs7Ozs7OztBQzVKRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThCO0FBRTlCOztHQUVHO0FBQ0ksTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQUE7QUFBQTtBQUV6Qjs7R0FFRztBQUNJLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQUE7QUFBQTtBQUVwRDs7R0FFRztBQUNJLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztBQUFBO0FBQUE7QUFFbEQ7Ozs7O0dBS0c7QUFDSSxlQUFlLEtBQVU7SUFDL0IsTUFBTSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSx3REFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSSxrQkFBa0IsS0FBVTtJQUNsQyxNQUFNLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLHdEQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFFRDs7Ozs7R0FLRztBQUNJLG1CQUFtQixLQUFVO0lBQ25DLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUM7QUFDdkQsQ0FBQztBQUVEOzs7Ozs7Ozs7R0FTRztBQUNJLHVCQUF1QixLQUFVO0lBQ3ZDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQztBQUNoRSxDQUFDOzs7Ozs7Ozs7QUMzREQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThCO0FBQ0U7QUFDSTtBQXdFN0IsSUFBSSxNQUFvQjtBQUUvQjs7Ozs7OztBQU9PLElBQUksd0JBQXdHO0FBRW5IOzs7OztBQUtPLElBQUksbUJBQXlDO0FBRXBEOzs7O0FBSU8sSUFBSSxxQkFBMkM7QUFFdEQ7Ozs7O0FBS08sSUFBSSxFQUF5QztBQUVwRDs7OztBQUlPLElBQUksSUFBNkI7QUFFeEM7QUFFTyxJQUFJLHlCQUEwRDtBQUU5RCxJQUFJLE9BQXVCO0FBRTNCLElBQUksTUFBb0I7QUFFL0IsR0FBRyxLQUFrQixFQUFFO0lBQ3RCLE1BQU0sYUFBWSxFQUFHLHdEQUFNLENBQUMsTUFBTTtJQUNsQyxPQUFNLEVBQUcsWUFBWSxDQUFDLE1BQU07SUFDNUIseUJBQXdCLEVBQUcsWUFBWSxDQUFDLHdCQUF3QjtJQUNoRSxvQkFBbUIsRUFBRyxZQUFZLENBQUMsbUJBQW1CO0lBQ3RELHNCQUFxQixFQUFHLFlBQVksQ0FBQyxxQkFBcUI7SUFDMUQsR0FBRSxFQUFHLFlBQVksQ0FBQyxFQUFFO0lBQ3BCLEtBQUksRUFBRyxZQUFZLENBQUMsSUFBSTtBQUN6QjtBQUFFLEtBQUs7SUFDTixLQUFJLEVBQUcseUJBQXlCLENBQVM7UUFDeEMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsT0FBTSxFQUFHLGdCQUFnQixNQUFXLEVBQUUsR0FBRyxPQUFjO1FBQ3RELEdBQUcsQ0FBQyxPQUFNLEdBQUksSUFBSSxFQUFFO1lBQ25CO1lBQ0EsTUFBTSxJQUFJLFNBQVMsQ0FBQyw0Q0FBNEMsQ0FBQztRQUNsRTtRQUVBLE1BQU0sR0FBRSxFQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDekIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxHQUFFO1lBQzlCLEdBQUcsQ0FBQyxVQUFVLEVBQUU7Z0JBQ2Y7Z0JBQ0EsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFFO29CQUNwQyxFQUFFLENBQUMsT0FBTyxFQUFDLEVBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQkFDbEMsQ0FBQyxDQUFDO1lBQ0g7UUFDRCxDQUFDLENBQUM7UUFFRixPQUFPLEVBQUU7SUFDVixDQUFDO0lBRUQseUJBQXdCLEVBQUcsa0NBQzFCLENBQU0sRUFDTixJQUFxQjtRQUVyQixHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ25CLE9BQWEsTUFBTyxDQUFDLHdCQUF3QixDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7UUFDdkQ7UUFBRSxLQUFLO1lBQ04sT0FBTyxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQztRQUNoRDtJQUNELENBQUM7SUFFRCxvQkFBbUIsRUFBRyw2QkFBNkIsQ0FBTTtRQUN4RCxPQUFPLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELHNCQUFxQixFQUFHLCtCQUErQixDQUFNO1FBQzVELE9BQU8sTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFDakMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDM0MsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELEdBQUUsRUFBRyxZQUFZLE1BQVcsRUFBRSxNQUFXO1FBQ3hDLEdBQUcsQ0FBQyxPQUFNLElBQUssTUFBTSxFQUFFO1lBQ3RCLE9BQU8sT0FBTSxJQUFLLEVBQUMsR0FBSSxFQUFDLEVBQUcsT0FBTSxJQUFLLEVBQUMsRUFBRyxNQUFNLEVBQUU7UUFDbkQ7UUFDQSxPQUFPLE9BQU0sSUFBSyxPQUFNLEdBQUksT0FBTSxJQUFLLE1BQU0sRUFBRTtJQUNoRCxDQUFDO0FBQ0Y7QUFFQSxHQUFHLEtBQXFCLEVBQUU7SUFDekIsTUFBTSxhQUFZLEVBQUcsd0RBQU0sQ0FBQyxNQUFNO0lBQ2xDLDBCQUF5QixFQUFHLFlBQVksQ0FBQyx5QkFBeUI7SUFDbEUsUUFBTyxFQUFHLFlBQVksQ0FBQyxPQUFPO0lBQzlCLE9BQU0sRUFBRyxZQUFZLENBQUMsTUFBTTtBQUM3QjtBQUFFLEtBQUs7SUFDTiwwQkFBeUIsRUFBRyxtQ0FBbUMsQ0FBTTtRQUNwRSxPQUFPLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FDbkMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUU7WUFDakIsUUFBUSxDQUFDLEdBQUcsRUFBQyxFQUFHLHdCQUF3QixDQUFDLENBQUMsRUFBRSxHQUFHLENBQUU7WUFDakQsT0FBTyxRQUFRO1FBQ2hCLENBQUMsRUFDRCxFQUEyQyxDQUMzQztJQUNGLENBQUM7SUFFRCxRQUFPLEVBQUcsaUJBQWlCLENBQU07UUFDaEMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFrQixDQUFDO0lBQzVELENBQUM7SUFFRCxPQUFNLEVBQUcsZ0JBQWdCLENBQU07UUFDOUIsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7QUFDRjs7Ozs7Ozs7O0FDM01BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThCO0FBQ0U7QUFDWTtBQXNCNUM7OztBQUdPLE1BQU0sbUJBQWtCLEVBQUcsTUFBTSxDQUFDO0FBQUE7QUFBQTtBQUV6Qzs7O0FBR08sTUFBTSxtQkFBa0IsRUFBRyxNQUFNLENBQUM7QUFBQTtBQUFBO0FBRXpDOzs7QUFHTyxNQUFNLGtCQUFpQixFQUFHLE1BQU0sQ0FBQztBQUFBO0FBQUE7QUFFeEM7OztBQUdPLE1BQU0sa0JBQWlCLEVBQUcsTUFBTSxDQUFDO0FBQUE7QUFBQTtBQUV4QztBQUVBOzs7OztBQUtPLElBQUksYUFBa0Q7QUFFN0Q7Ozs7Ozs7QUFPTyxJQUFJLEdBQXdFO0FBRW5GO0FBRUE7Ozs7Ozs7QUFPTyxJQUFJLFdBQWlFO0FBRTVFOzs7OztBQUtPLElBQUksUUFBaUY7QUFFNUY7Ozs7Ozs7O0FBUU8sSUFBSSxRQUE4RTtBQUV6Rjs7Ozs7OztBQU9PLElBQUksU0FBMEI7QUFFckM7Ozs7O0FBS08sSUFBSSxNQUFrRDtBQUU3RDs7Ozs7QUFLTyxJQUFJLFVBQWdGO0FBRTNGO0FBRUE7Ozs7Ozs7Ozs7OztBQVlPLElBQUksTUFBMEU7QUFFckY7Ozs7Ozs7Ozs7OztBQVlPLElBQUksUUFBNEU7QUFFdkYsR0FBRyxDQUFDLElBQTBDLEVBQUU7SUFDL0MsY0FBYSxFQUFHLHdEQUFNLENBQUMsTUFBTSxDQUFDLGFBQWE7SUFDM0MsSUFBRyxFQUFHLHdEQUFNLENBQUMsTUFBTSxDQUFDLEdBQUc7SUFFdkIsWUFBVyxFQUFHLHlFQUFVLENBQUMsd0RBQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztJQUM3RCxTQUFRLEVBQUcseUVBQVUsQ0FBQyx3REFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO0lBQ3ZELFNBQVEsRUFBRyx5RUFBVSxDQUFDLHdEQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7SUFDdkQsVUFBUyxFQUFHLHlFQUFVLENBQUMsd0RBQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUN6RCxPQUFNLEVBQUcseUVBQVUsQ0FBQyx3REFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQ25ELFdBQVUsRUFBRyx5RUFBVSxDQUFDLHdEQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7QUFDNUQ7QUFBRSxLQUFLO0lBQ047Ozs7OztJQU1BLE1BQU0sdUJBQXNCLEVBQUcsVUFDOUIsSUFBWSxFQUNaLElBQVksRUFDWixNQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsUUFBaUIsS0FBSztRQUV0QixHQUFHLENBQUMsS0FBSSxHQUFJLElBQUksRUFBRTtZQUNqQixNQUFNLElBQUksU0FBUyxDQUFDLFVBQVMsRUFBRyxLQUFJLEVBQUcsNkNBQTZDLENBQUM7UUFDdEY7UUFFQSxNQUFNLE9BQU0sRUFBRyxJQUFJLENBQUMsTUFBTTtRQUMxQixTQUFRLEVBQUcsU0FBUSxJQUFLLFNBQVMsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUTtRQUNsRSxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxjQUFhLEVBQUcsdUJBQXVCLEdBQUcsVUFBb0I7UUFDN0Q7UUFDQSxNQUFNLE9BQU0sRUFBRyxTQUFTLENBQUMsTUFBTTtRQUMvQixHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDWixPQUFPLEVBQUU7UUFDVjtRQUVBLE1BQU0sYUFBWSxFQUFHLE1BQU0sQ0FBQyxZQUFZO1FBQ3hDLE1BQU0sU0FBUSxFQUFHLE1BQU07UUFDdkIsSUFBSSxVQUFTLEVBQWEsRUFBRTtRQUM1QixJQUFJLE1BQUssRUFBRyxDQUFDLENBQUM7UUFDZCxJQUFJLE9BQU0sRUFBRyxFQUFFO1FBRWYsT0FBTyxFQUFFLE1BQUssRUFBRyxNQUFNLEVBQUU7WUFDeEIsSUFBSSxVQUFTLEVBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV4QztZQUNBLElBQUksUUFBTyxFQUNWLFFBQVEsQ0FBQyxTQUFTLEVBQUMsR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBQyxJQUFLLFVBQVMsR0FBSSxVQUFTLEdBQUksRUFBQyxHQUFJLFVBQVMsR0FBSSxRQUFRO1lBQ3RHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRTtnQkFDYixNQUFNLFVBQVUsQ0FBQyw0Q0FBMkMsRUFBRyxTQUFTLENBQUM7WUFDMUU7WUFFQSxHQUFHLENBQUMsVUFBUyxHQUFJLE1BQU0sRUFBRTtnQkFDeEI7Z0JBQ0EsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUI7WUFBRSxLQUFLO2dCQUNOO2dCQUNBO2dCQUNBLFVBQVMsR0FBSSxPQUFPO2dCQUNwQixJQUFJLGNBQWEsRUFBRyxDQUFDLFVBQVMsR0FBSSxFQUFFLEVBQUMsRUFBRyxrQkFBa0I7Z0JBQzFELElBQUksYUFBWSxFQUFHLENBQUMsVUFBUyxFQUFHLEtBQUssRUFBQyxFQUFHLGlCQUFpQjtnQkFDMUQsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDO1lBQzVDO1lBRUEsR0FBRyxDQUFDLE1BQUssRUFBRyxFQUFDLElBQUssT0FBTSxHQUFJLFNBQVMsQ0FBQyxPQUFNLEVBQUcsUUFBUSxFQUFFO2dCQUN4RCxPQUFNLEdBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDO2dCQUM3QyxTQUFTLENBQUMsT0FBTSxFQUFHLENBQUM7WUFDckI7UUFDRDtRQUNBLE9BQU8sTUFBTTtJQUNkLENBQUM7SUFFRCxJQUFHLEVBQUcsYUFBYSxRQUE4QixFQUFFLEdBQUcsYUFBb0I7UUFDekUsSUFBSSxXQUFVLEVBQUcsUUFBUSxDQUFDLEdBQUc7UUFDN0IsSUFBSSxPQUFNLEVBQUcsRUFBRTtRQUNmLElBQUksaUJBQWdCLEVBQUcsYUFBYSxDQUFDLE1BQU07UUFFM0MsR0FBRyxDQUFDLFNBQVEsR0FBSSxLQUFJLEdBQUksUUFBUSxDQUFDLElBQUcsR0FBSSxJQUFJLEVBQUU7WUFDN0MsTUFBTSxJQUFJLFNBQVMsQ0FBQyw4REFBOEQsQ0FBQztRQUNwRjtRQUVBLElBQUksQ0FBQyxJQUFJLEVBQUMsRUFBRyxDQUFDLEVBQUUsT0FBTSxFQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsRUFBQyxFQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1RCxPQUFNLEdBQUksVUFBVSxDQUFDLENBQUMsRUFBQyxFQUFHLENBQUMsRUFBQyxFQUFHLGlCQUFnQixHQUFJLEVBQUMsRUFBRyxPQUFNLEVBQUcsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDM0Y7UUFFQSxPQUFPLE1BQU07SUFDZCxDQUFDO0lBRUQsWUFBVyxFQUFHLHFCQUFxQixJQUFZLEVBQUUsV0FBbUIsQ0FBQztRQUNwRTtRQUNBLEdBQUcsQ0FBQyxLQUFJLEdBQUksSUFBSSxFQUFFO1lBQ2pCLE1BQU0sSUFBSSxTQUFTLENBQUMsNkNBQTZDLENBQUM7UUFDbkU7UUFDQSxNQUFNLE9BQU0sRUFBRyxJQUFJLENBQUMsTUFBTTtRQUUxQixHQUFHLENBQUMsU0FBUSxJQUFLLFFBQVEsRUFBRTtZQUMxQixTQUFRLEVBQUcsQ0FBQztRQUNiO1FBQ0EsR0FBRyxDQUFDLFNBQVEsRUFBRyxFQUFDLEdBQUksU0FBUSxHQUFJLE1BQU0sRUFBRTtZQUN2QyxPQUFPLFNBQVM7UUFDakI7UUFFQTtRQUNBLE1BQU0sTUFBSyxFQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLEdBQUcsQ0FBQyxNQUFLLEdBQUksbUJBQWtCLEdBQUksTUFBSyxHQUFJLG1CQUFrQixHQUFJLE9BQU0sRUFBRyxTQUFRLEVBQUcsQ0FBQyxFQUFFO1lBQ3hGO1lBQ0E7WUFDQSxNQUFNLE9BQU0sRUFBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVEsRUFBRyxDQUFDLENBQUM7WUFDNUMsR0FBRyxDQUFDLE9BQU0sR0FBSSxrQkFBaUIsR0FBSSxPQUFNLEdBQUksaUJBQWlCLEVBQUU7Z0JBQy9ELE9BQU8sQ0FBQyxNQUFLLEVBQUcsa0JBQWtCLEVBQUMsRUFBRyxNQUFLLEVBQUcsT0FBTSxFQUFHLGtCQUFpQixFQUFHLE9BQU87WUFDbkY7UUFDRDtRQUNBLE9BQU8sS0FBSztJQUNiLENBQUM7SUFFRCxTQUFRLEVBQUcsa0JBQWtCLElBQVksRUFBRSxNQUFjLEVBQUUsV0FBb0I7UUFDOUUsR0FBRyxDQUFDLFlBQVcsR0FBSSxJQUFJLEVBQUU7WUFDeEIsWUFBVyxFQUFHLElBQUksQ0FBQyxNQUFNO1FBQzFCO1FBRUEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBQyxFQUFHLHNCQUFzQixDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUM7UUFFakcsTUFBTSxNQUFLLEVBQUcsWUFBVyxFQUFHLE1BQU0sQ0FBQyxNQUFNO1FBQ3pDLEdBQUcsQ0FBQyxNQUFLLEVBQUcsQ0FBQyxFQUFFO1lBQ2QsT0FBTyxLQUFLO1FBQ2I7UUFFQSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBQyxJQUFLLE1BQU07SUFDakQsQ0FBQztJQUVELFNBQVEsRUFBRyxrQkFBa0IsSUFBWSxFQUFFLE1BQWMsRUFBRSxXQUFtQixDQUFDO1FBQzlFLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUMsRUFBRyxzQkFBc0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUM7UUFDckYsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUMsSUFBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELE9BQU0sRUFBRyxnQkFBZ0IsSUFBWSxFQUFFLFFBQWdCLENBQUM7UUFDdkQ7UUFDQSxHQUFHLENBQUMsS0FBSSxHQUFJLElBQUksRUFBRTtZQUNqQixNQUFNLElBQUksU0FBUyxDQUFDLHdDQUF3QyxDQUFDO1FBQzlEO1FBQ0EsR0FBRyxDQUFDLE1BQUssSUFBSyxLQUFLLEVBQUU7WUFDcEIsTUFBSyxFQUFHLENBQUM7UUFDVjtRQUNBLEdBQUcsQ0FBQyxNQUFLLEVBQUcsRUFBQyxHQUFJLE1BQUssSUFBSyxRQUFRLEVBQUU7WUFDcEMsTUFBTSxJQUFJLFVBQVUsQ0FBQyxxREFBcUQsQ0FBQztRQUM1RTtRQUVBLElBQUksT0FBTSxFQUFHLEVBQUU7UUFDZixPQUFPLEtBQUssRUFBRTtZQUNiLEdBQUcsQ0FBQyxNQUFLLEVBQUcsQ0FBQyxFQUFFO2dCQUNkLE9BQU0sR0FBSSxJQUFJO1lBQ2Y7WUFDQSxHQUFHLENBQUMsTUFBSyxFQUFHLENBQUMsRUFBRTtnQkFDZCxLQUFJLEdBQUksSUFBSTtZQUNiO1lBQ0EsTUFBSyxJQUFLLENBQUM7UUFDWjtRQUNBLE9BQU8sTUFBTTtJQUNkLENBQUM7SUFFRCxXQUFVLEVBQUcsb0JBQW9CLElBQVksRUFBRSxNQUFjLEVBQUUsV0FBbUIsQ0FBQztRQUNsRixPQUFNLEVBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFDLEVBQUcsc0JBQXNCLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO1FBRXZGLE1BQU0sSUFBRyxFQUFHLFNBQVEsRUFBRyxNQUFNLENBQUMsTUFBTTtRQUNwQyxHQUFHLENBQUMsSUFBRyxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDdEIsT0FBTyxLQUFLO1FBQ2I7UUFFQSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBQyxJQUFLLE1BQU07SUFDNUMsQ0FBQztBQUNGO0FBRUEsR0FBRyxLQUFxQixFQUFFO0lBQ3pCLE9BQU0sRUFBRyx5RUFBVSxDQUFDLHdEQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFDbkQsU0FBUSxFQUFHLHlFQUFVLENBQUMsd0RBQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztBQUN4RDtBQUFFLEtBQUs7SUFDTixPQUFNLEVBQUcsZ0JBQWdCLElBQVksRUFBRSxTQUFpQixFQUFFLGFBQXFCLEdBQUc7UUFDakYsR0FBRyxDQUFDLEtBQUksSUFBSyxLQUFJLEdBQUksS0FBSSxJQUFLLFNBQVMsRUFBRTtZQUN4QyxNQUFNLElBQUksU0FBUyxDQUFDLHdDQUF3QyxDQUFDO1FBQzlEO1FBRUEsR0FBRyxDQUFDLFVBQVMsSUFBSyxRQUFRLEVBQUU7WUFDM0IsTUFBTSxJQUFJLFVBQVUsQ0FBQyxxREFBcUQsQ0FBQztRQUM1RTtRQUVBLEdBQUcsQ0FBQyxVQUFTLElBQUssS0FBSSxHQUFJLFVBQVMsSUFBSyxVQUFTLEdBQUksVUFBUyxFQUFHLENBQUMsRUFBRTtZQUNuRSxVQUFTLEVBQUcsQ0FBQztRQUNkO1FBRUEsSUFBSSxRQUFPLEVBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUMxQixNQUFNLFFBQU8sRUFBRyxVQUFTLEVBQUcsT0FBTyxDQUFDLE1BQU07UUFFMUMsR0FBRyxDQUFDLFFBQU8sRUFBRyxDQUFDLEVBQUU7WUFDaEIsUUFBTztnQkFDTixNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBTyxFQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBQztvQkFDM0QsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsUUFBTyxFQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDbEQ7UUFFQSxPQUFPLE9BQU87SUFDZixDQUFDO0lBRUQsU0FBUSxFQUFHLGtCQUFrQixJQUFZLEVBQUUsU0FBaUIsRUFBRSxhQUFxQixHQUFHO1FBQ3JGLEdBQUcsQ0FBQyxLQUFJLElBQUssS0FBSSxHQUFJLEtBQUksSUFBSyxTQUFTLEVBQUU7WUFDeEMsTUFBTSxJQUFJLFNBQVMsQ0FBQyx3Q0FBd0MsQ0FBQztRQUM5RDtRQUVBLEdBQUcsQ0FBQyxVQUFTLElBQUssUUFBUSxFQUFFO1lBQzNCLE1BQU0sSUFBSSxVQUFVLENBQUMsdURBQXVELENBQUM7UUFDOUU7UUFFQSxHQUFHLENBQUMsVUFBUyxJQUFLLEtBQUksR0FBSSxVQUFTLElBQUssVUFBUyxHQUFJLFVBQVMsRUFBRyxDQUFDLEVBQUU7WUFDbkUsVUFBUyxFQUFHLENBQUM7UUFDZDtRQUVBLElBQUksUUFBTyxFQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDMUIsTUFBTSxRQUFPLEVBQUcsVUFBUyxFQUFHLE9BQU8sQ0FBQyxNQUFNO1FBRTFDLEdBQUcsQ0FBQyxRQUFPLEVBQUcsQ0FBQyxFQUFFO1lBQ2hCLFFBQU87Z0JBQ04sTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQU8sRUFBRyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUM7b0JBQzNELFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFFBQU8sRUFBRyxVQUFVLENBQUMsTUFBTSxFQUFDO29CQUNoRCxPQUFPO1FBQ1Q7UUFFQSxPQUFPLE9BQU87SUFDZixDQUFDO0FBQ0Y7Ozs7Ozs7OztBWHRYQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXlDO0FBQ1Y7QUFFL0IseURBQWUseURBQUcsRUFBQztBQUNXO0FBRTlCO0FBRUE7QUFDQSw2REFBRyxDQUNGLFdBQVcsRUFDWCxHQUFHLEdBQUU7SUFDSixPQUFPLENBQ04sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBRyxHQUFJLHdEQUFNLENBQUMsS0FBSyxFQUFDO1FBQ2xELENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFHLEdBQUksd0RBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQ2pGO0FBQ0YsQ0FBQyxFQUNELElBQUksQ0FDSjtBQUVELDZEQUFHLENBQ0YsZ0JBQWdCLEVBQ2hCLEdBQUcsR0FBRTtJQUNKLEdBQUcsQ0FBQyxPQUFNLEdBQUksd0RBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO1FBQ3JDO1FBQ0EsT0FBYSxDQUFDLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUssQ0FBQztJQUM3RDtJQUNBLE9BQU8sS0FBSztBQUNiLENBQUMsRUFDRCxJQUFJLENBQ0o7QUFFRCw2REFBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsV0FBVSxHQUFJLHdEQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7QUFFbEU7QUFDQSw2REFBRyxDQUNGLFNBQVMsRUFDVCxHQUFHLEdBQUU7SUFDSixHQUFHLENBQUMsT0FBTyx3REFBTSxDQUFDLElBQUcsSUFBSyxVQUFVLEVBQUU7UUFDckM7Ozs7O1FBS0EsSUFBSTtZQUNILE1BQU0sSUFBRyxFQUFHLElBQUksd0RBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO21CQUduQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQztnQkFDVixPQUFPLEdBQUcsQ0FBQyxLQUFJLElBQUssV0FBVTtxQkFDYjtnQkFDakIsT0FBTyxHQUFHLENBQUMsT0FBTSxJQUFLLFdBQVU7Z0JBQ2hDLE9BQU8sR0FBRyxDQUFDLFFBQU8sSUFBSztRQUV6QjtRQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUU7WUFDWDtZQUNBLE9BQU8sS0FBSztRQUNiO0lBQ0Q7SUFDQSxPQUFPLEtBQUs7QUFDYixDQUFDLEVBQ0QsSUFBSSxDQUNKO0FBRUQ7QUFDQSw2REFBRyxDQUNGLFVBQVUsRUFDVixHQUFHLEdBQUU7SUFDSixPQUFPO1FBQ04sT0FBTztRQUNQLE1BQU07UUFDTixPQUFPO1FBQ1AsTUFBTTtRQUNOLE9BQU87UUFDUCxPQUFPO1FBQ1AsTUFBTTtRQUNOLE1BQU07UUFDTixNQUFNO1FBQ04sT0FBTztRQUNQLE9BQU87UUFDUCxPQUFPO1FBQ1AsT0FBTztRQUNQLFFBQVE7UUFDUixNQUFNO1FBQ047S0FDQSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLE9BQU8sd0RBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUssVUFBVSxDQUFDO0FBQzNELENBQUMsRUFDRCxJQUFJLENBQ0o7QUFFRCw2REFBRyxDQUNGLGVBQWUsRUFDZixHQUFHLEdBQUU7SUFDSixHQUFHLENBQUMsT0FBTSxHQUFJLHdEQUFNLENBQUMsSUFBSSxFQUFFO1FBQzFCO1FBQ0EsT0FBYSxJQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUMsSUFBSyxDQUFDLENBQUM7SUFDOUM7SUFDQSxPQUFPLEtBQUs7QUFDYixDQUFDLEVBQ0QsSUFBSSxDQUNKO0FBRUQ7QUFDQSw2REFBRyxDQUNGLFlBQVksRUFDWixHQUFHLEdBQUU7Z0JBRWM7UUFDakIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUNoRSxDQUFDLElBQUksRUFBRSxHQUFHLE9BQU8sd0RBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLElBQUssVUFBVTtBQUd0RCxDQUFDLEVBQ0QsSUFBSSxDQUNKO0FBRUQsNkRBQUcsQ0FDRixlQUFlLEVBQ2YsR0FBRyxHQUFFO0lBQ0osT0FBTyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsMkJBQTJCLENBQUMsQ0FBQyxLQUFLLENBQzlELENBQUMsSUFBSSxFQUFFLEdBQUcsT0FBTyx3REFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsSUFBSyxVQUFVLENBQ25EO0FBQ0YsQ0FBQyxFQUNELElBQUksQ0FDSjtBQUVEO0FBQ0EsNkRBQUcsQ0FBQyxlQUFlLEVBQUUsR0FBRyxHQUFHLE9BQU8sd0RBQU0sQ0FBQyxXQUFVLElBQUssV0FBVyxFQUFFLElBQUksQ0FBQztBQUUxRTtBQUNBLDZEQUFHLENBQUMsYUFBYSxFQUFFLEdBQUcsR0FBRyxPQUFPLHdEQUFNLENBQUMsUUFBTyxJQUFLLFlBQVcsT0FBcUIsRUFBRSxJQUFJLENBQUM7QUFFMUY7QUFDQSw2REFBRyxDQUNGLFNBQVMsRUFDVCxHQUFHLEdBQUU7SUFDSixHQUFHLENBQUMsT0FBTyx3REFBTSxDQUFDLElBQUcsSUFBSyxVQUFVLEVBQUU7UUFDckM7UUFDQSxNQUFNLElBQUcsRUFBRyxJQUFJLHdEQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7ZUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsR0FBSSxPQUFNLEdBQUksSUFBRyxHQUFJLE9BQU8sR0FBRyxDQUFDLEtBQUksSUFBSyxXQUFVO0lBQ3JFO0lBQ0EsT0FBTyxLQUFLO0FBQ2IsQ0FBQyxFQUNELElBQUksQ0FDSjtBQUVEO0FBQ0EsNkRBQUcsQ0FDRixZQUFZLEVBQ1osR0FBRyxHQUFFO0lBQ0osT0FBTyxDQUNOO1FBQ0M7UUFDQTtLQUNBLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyx3REFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUMsSUFBSyxVQUFVLEVBQUM7UUFDMUQ7WUFDQztZQUNBLGFBQWE7WUFDYixXQUFXO1lBQ1gsUUFBUTtZQUNSLFlBQVk7WUFDWixVQUFVO1lBQ1Y7U0FDQSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sd0RBQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBQyxJQUFLLFVBQVUsQ0FBQyxDQUNwRTtBQUNGLENBQUMsRUFDRCxJQUFJLENBQ0o7QUFFRCw2REFBRyxDQUNGLGdCQUFnQixFQUNoQixHQUFHLEdBQUU7SUFDSixxQkFBcUIsUUFBOEIsRUFBRSxHQUFHLGFBQW9CO1FBQzNFLE1BQU0sT0FBTSxFQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDM0IsTUFBYyxDQUFDLElBQUcsRUFBRyxRQUFRLENBQUMsR0FBRztRQUNsQyxPQUFPLE1BQU07SUFDZDtJQUVBLEdBQUcsQ0FBQyxNQUFLLEdBQUksd0RBQU0sQ0FBQyxNQUFNLEVBQUU7UUFDM0IsSUFBSSxFQUFDLEVBQUcsQ0FBQztRQUNULElBQUksU0FBUSxFQUFHLFlBQVcsTUFBTSxDQUFDLEVBQUU7UUFFbEMsUUFBZ0IsQ0FBQyxJQUFHLEVBQUcsQ0FBQyxNQUFNLENBQUM7UUFDaEMsTUFBTSxjQUFhLEVBQUcsd0RBQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUMsSUFBSyxPQUFPO1FBRWpFLE9BQU8sYUFBYTtJQUNyQjtJQUVBLE9BQU8sS0FBSztBQUNiLENBQUMsRUFDRCxJQUFJLENBQ0o7QUFFRCw2REFBRyxDQUNGLGVBQWUsRUFDZixHQUFHLEdBQUU7SUFDSixPQUFPLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sd0RBQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBQyxJQUFLLFVBQVUsQ0FBQztBQUNqRyxDQUFDLEVBQ0QsSUFBSSxDQUNKO0FBRUQ7QUFDQSw2REFBRyxDQUFDLFlBQVksRUFBRSxHQUFHLEdBQUcsT0FBTyx3REFBTSxDQUFDLE9BQU0sSUFBSyxZQUFXLEdBQUksT0FBTyxNQUFNLEdBQUUsSUFBSyxRQUFRLEVBQUUsSUFBSSxDQUFDO0FBRW5HO0FBQ0EsNkRBQUcsQ0FDRixhQUFhLEVBQ2IsR0FBRyxHQUFFO0lBQ0osR0FBRyxDQUFDLE9BQU8sd0RBQU0sQ0FBQyxRQUFPLElBQUssV0FBVyxFQUFFO1FBQzFDO1FBQ0EsTUFBTSxLQUFJLEVBQUcsRUFBRTtRQUNmLE1BQU0sS0FBSSxFQUFHLEVBQUU7UUFDZixNQUFNLElBQUcsRUFBRyxJQUFJLHdEQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztlQUNaLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFDLElBQUssRUFBQyxHQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBQyxJQUFLLElBQUc7SUFDdkQ7SUFDQSxPQUFPLEtBQUs7QUFDYixDQUFDLEVBQ0QsSUFBSSxDQUNKO0FBRUQ7QUFDQSw2REFBRyxDQUFDLFlBQVksRUFBRSxHQUFHLFFBQXFCLFNBQW9CLE9BQStCLEVBQUUsSUFBSSxDQUFDO0FBQ3BHLDZEQUFHLENBQ0YsYUFBYSxFQUNiLEdBQUcsR0FBRTtJQUNKO0lBQ0E7SUFDQSxPQUFPLE9BQU8sd0RBQU0sQ0FBQyxPQUFNLElBQUssWUFBVyxHQUFJLE9BQU8sd0RBQU0sQ0FBQyxZQUFXLElBQUssVUFBVTtBQUN4RixDQUFDLEVBQ0QsSUFBSSxDQUNKO0FBQ0QsNkRBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxHQUFHLE9BQU8sd0RBQU0sQ0FBQyxzQkFBcUIsSUFBSyxVQUFVLEVBQUUsSUFBSSxDQUFDO0FBQzFFLDZEQUFHLENBQUMsY0FBYyxFQUFFLEdBQUcsR0FBRyxPQUFPLHdEQUFNLENBQUMsYUFBWSxJQUFLLFdBQVcsRUFBRSxJQUFJLENBQUM7QUFFM0U7QUFFQSw2REFBRyxDQUNGLHNCQUFzQixFQUN0QixHQUFHLEdBQUU7SUFDSixHQUFHLE1BQW9CLEdBQUksT0FBTyxDQUFDLHdEQUFNLENBQUMsaUJBQWdCLEdBQUksd0RBQU0sQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1FBQzdGO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTSxRQUFPLEVBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDN0M7UUFDQSxNQUFNLHFCQUFvQixFQUFHLHdEQUFNLENBQUMsaUJBQWdCLEdBQUksd0RBQU0sQ0FBQyxzQkFBc0I7UUFDckYsTUFBTSxTQUFRLEVBQUcsSUFBSSxvQkFBb0IsQ0FBQyxjQUFZLENBQUMsQ0FBQztRQUN4RCxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxLQUFJLENBQUUsQ0FBQztRQUUvQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDO1FBRTdDLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDOUM7SUFDQSxPQUFPLEtBQUs7QUFDYixDQUFDLEVBQ0QsSUFBSSxDQUNKO0FBRUQsNkRBQUcsQ0FDRixrQkFBa0IsRUFDbEIsR0FBRyxRQUFzQixHQUFJLHdEQUFNLENBQUMsVUFBUyxJQUFLLFVBQVMsR0FBSSx3REFBTSxDQUFDLGVBQWMsSUFBSyxTQUFTLEVBQ2xHLElBQUksQ0FDSjtBQUVELDZEQUFHLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxHQUFHLE9BQU8sd0RBQU0sQ0FBQyxnQkFBZSxJQUFLLFdBQVcsQ0FBQztBQUU1RSw2REFBRyxDQUFDLGNBQWMsRUFBRSxHQUFHLEdBQUcsT0FBTyx3REFBTSxDQUFDLFlBQVcsSUFBSyxXQUFXLENBQUM7Ozs7Ozs7OztBWTVRcEU7QUFBQTtBQUFBO0FBQStCO0FBQ1A7QUFHeEIscUJBQXFCLElBQTJCO0lBQy9DLEdBQUcsQ0FBQyxLQUFJLEdBQUksSUFBSSxDQUFDLFNBQVEsR0FBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQzNDLElBQUksQ0FBQyxRQUFRLEVBQUU7SUFDaEI7QUFDRDtBQUVBLHdCQUF3QixJQUFlLEVBQUUsVUFBb0M7SUFDNUUsT0FBTztRQUNOLE9BQU8sRUFBRTtZQUNSLElBQUksQ0FBQyxRQUFPLEVBQUcsY0FBWSxDQUFDO1lBQzVCLElBQUksQ0FBQyxTQUFRLEVBQUcsS0FBSztZQUNyQixJQUFJLENBQUMsU0FBUSxFQUFHLElBQUk7WUFFcEIsR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDZixVQUFVLEVBQUU7WUFDYjtRQUNEO0tBQ0E7QUFDRjtBQVlBLElBQUksbUJBQStCO0FBQ25DLElBQUksVUFBdUI7QUFFM0I7Ozs7OztBQU1PLE1BQU0sVUFBUyxFQUFHLENBQUM7SUFDekIsSUFBSSxVQUFtQztJQUN2QyxJQUFJLE9BQWtDO0lBRXRDO0lBQ0EsR0FBRyxLQUFtQixFQUFFO1FBQ3ZCLE1BQU0sTUFBSyxFQUFnQixFQUFFO1FBRTdCLHdEQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQVMsS0FBdUI7WUFDbEU7WUFDQSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU0sSUFBSyx5REFBTSxHQUFJLEtBQUssQ0FBQyxLQUFJLElBQUssb0JBQW9CLEVBQUU7Z0JBQ25FLEtBQUssQ0FBQyxlQUFlLEVBQUU7Z0JBRXZCLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUNqQixXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUMzQjtZQUNEO1FBQ0QsQ0FBQyxDQUFDO1FBRUYsUUFBTyxFQUFHLFVBQVMsSUFBZTtZQUNqQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoQix3REFBTSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUM7UUFDOUMsQ0FBQztJQUNGO0lBQUUsS0FBSyxHQUFHLE1BQW9CLEVBQUU7UUFDL0IsV0FBVSxFQUFHLE1BQU0sQ0FBQyxjQUFjO1FBQ2xDLFFBQU8sRUFBRyxVQUFTLElBQWU7WUFDakMsT0FBTyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsQ0FBQztJQUNGO0lBQUUsS0FBSztRQUNOLFdBQVUsRUFBRyxNQUFNLENBQUMsWUFBWTtRQUNoQyxRQUFPLEVBQUcsVUFBUyxJQUFlO1lBQ2pDLE9BQU8sVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuRCxDQUFDO0lBQ0Y7SUFFQSxtQkFBbUIsUUFBaUM7UUFDbkQsTUFBTSxLQUFJLEVBQWM7WUFDdkIsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUU7U0FDVjtRQUNELE1BQU0sR0FBRSxFQUFRLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFFN0IsT0FBTyxjQUFjLENBQ3BCLElBQUksRUFDSixXQUFVO1lBQ1Q7Z0JBQ0MsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FDRjtJQUNGO0lBRUE7O1FBRUMsRUFBRTtRQUNGLEVBQUUsVUFBUyxRQUFpQztZQUMxQyxtQkFBbUIsRUFBRTtZQUNyQixPQUFPLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDMUI7QUFDSixDQUFDLENBQUMsRUFBRSxDQUFDO0FBQUE7QUFBQTtBQUVMO0FBQ0E7QUFDQSxHQUFHLENBQUMsS0FBa0IsRUFBRTtJQUN2QixJQUFJLGtCQUFpQixFQUFHLEtBQUs7SUFFN0IsV0FBVSxFQUFHLEVBQUU7SUFDZixvQkFBbUIsRUFBRztRQUNyQixHQUFHLENBQUMsQ0FBQyxpQkFBaUIsRUFBRTtZQUN2QixrQkFBaUIsRUFBRyxJQUFJO1lBQ3hCLFNBQVMsQ0FBQztnQkFDVCxrQkFBaUIsRUFBRyxLQUFLO2dCQUV6QixHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtvQkFDdEIsSUFBSSxJQUEyQjtvQkFDL0IsT0FBTyxDQUFDLEtBQUksRUFBRyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTt3QkFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQztvQkFDbEI7Z0JBQ0Q7WUFDRCxDQUFDLENBQUM7UUFDSDtJQUNELENBQUM7QUFDRjtBQUVBOzs7Ozs7Ozs7QUFTTyxNQUFNLG1CQUFrQixFQUFHLENBQUM7SUFDbEMsR0FBRyxDQUFDLEtBQVcsRUFBRTtRQUNoQixPQUFPLFNBQVM7SUFDakI7SUFFQSw0QkFBNEIsUUFBaUM7UUFDNUQsTUFBTSxLQUFJLEVBQWM7WUFDdkIsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUU7U0FDVjtRQUNELE1BQU0sTUFBSyxFQUFXLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXpFLE9BQU8sY0FBYyxDQUFDLElBQUksRUFBRTtZQUMzQixvQkFBb0IsQ0FBQyxLQUFLLENBQUM7UUFDNUIsQ0FBQyxDQUFDO0lBQ0g7SUFFQTs7UUFFQyxFQUFFO1FBQ0YsRUFBRSxVQUFTLFFBQWlDO1lBQzFDLG1CQUFtQixFQUFFO1lBQ3JCLE9BQU8sa0JBQWtCLENBQUMsUUFBUSxDQUFDO1FBQ25DO0FBQ0osQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUFBO0FBQUE7QUFFTDs7Ozs7Ozs7OztBQVVPLElBQUksZUFBYyxFQUFHLENBQUM7SUFDNUIsSUFBSSxPQUFrQztJQUV0QyxHQUFHLE1BQWlCLEVBQUU7UUFDckIsUUFBTyxFQUFHLFVBQVMsSUFBZTtZQUNqQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0RCxDQUFDO0lBQ0Y7SUFBRSxLQUFLLEdBQUcsS0FBbUIsRUFBRTtRQUM5QixRQUFPLEVBQUcsVUFBUyxJQUFlO1lBQ2pDLHdEQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQy9DLENBQUM7SUFDRjtJQUFFLEtBQUssR0FBRyxLQUE0QixFQUFFO1FBQ3ZDO1FBQ0EsTUFBTSxxQkFBb0IsRUFBRyxNQUFNLENBQUMsaUJBQWdCLEdBQUksTUFBTSxDQUFDLHNCQUFzQjtRQUNyRixNQUFNLEtBQUksRUFBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUMxQyxNQUFNLE1BQUssRUFBZ0IsRUFBRTtRQUM3QixNQUFNLFNBQVEsRUFBRyxJQUFJLG9CQUFvQixDQUFDO1lBQ3pDLE9BQU8sS0FBSyxDQUFDLE9BQU0sRUFBRyxDQUFDLEVBQUU7Z0JBQ3hCLE1BQU0sS0FBSSxFQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQzFCLEdBQUcsQ0FBQyxLQUFJLEdBQUksSUFBSSxDQUFDLFNBQVEsR0FBSSxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUMzQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNoQjtZQUNEO1FBQ0QsQ0FBQyxDQUFDO1FBRUYsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSSxDQUFFLENBQUM7UUFFNUMsUUFBTyxFQUFHLFVBQVMsSUFBZTtZQUNqQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUM7UUFDdEMsQ0FBQztJQUNGO0lBQUUsS0FBSztRQUNOLFFBQU8sRUFBRyxVQUFTLElBQWU7WUFDakMsbUJBQW1CLEVBQUU7WUFDckIsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsQ0FBQztJQUNGO0lBRUEsT0FBTyxVQUFTLFFBQWlDO1FBQ2hELE1BQU0sS0FBSSxFQUFjO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFO1NBQ1Y7UUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDO1FBRWIsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDO0lBQzVCLENBQUM7QUFDRixDQUFDLENBQUMsRUFBRTs7Ozs7Ozs7O0FDM05KO0FBQUE7QUFBQTs7Ozs7Ozs7R0FRRztBQUNJLDRCQUNOLEtBQVEsRUFDUixhQUFzQixLQUFLLEVBQzNCLFdBQW9CLElBQUksRUFDeEIsZUFBd0IsSUFBSTtJQUU1QixNQUFNLENBQUM7UUFDTixLQUFLLEVBQUUsS0FBSztRQUNaLFVBQVUsRUFBRSxVQUFVO1FBQ3RCLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFlBQVksRUFBRSxZQUFZO0tBQzFCLENBQUM7QUFDSCxDQUFDO0FBbUJNLG9CQUFvQixjQUF1QztJQUNqRSxNQUFNLENBQUMsVUFBUyxNQUFXLEVBQUUsR0FBRyxJQUFXO1FBQzFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUM7QUFDSCxDQUFDOzs7Ozs7Ozs7QUM1Q0Q7QUFBQTtBQUFBO0FBQTBDO0FBRVo7QUFHOUI7Ozs7O0FBS0EsSUFBWSxhQUdYO0FBSEQsV0FBWSxhQUFhO0lBQ3hCLHdDQUF1QjtJQUN2QixrQ0FBaUI7QUFDbEIsQ0FBQyxFQUhXLGNBQWEsSUFBYixjQUFhO0FBVW5CLGtCQUFtQixRQUFRLCtEQUE0QjtJQUE3RDs7UUFDUyxjQUFRLEVBQUcsSUFBSSwwREFBRyxFQUFtQjtJQTBCOUM7SUF4QlEsR0FBRyxDQUFDLEdBQVc7UUFDckIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7SUFDOUI7SUFFTyxHQUFHLENBQUMsR0FBVztRQUNyQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUM5QjtJQUVPLEdBQUcsQ0FBQyxPQUFnQixFQUFFLEdBQVc7UUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUcsQ0FBRSxDQUFDO0lBQ3pCO0lBRU8sT0FBTztRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLE9BQU0sQ0FBRSxDQUFDO0lBQzFDO0lBRU8sWUFBWTtRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxVQUFTLENBQUUsQ0FBQztJQUM3QztJQUVPLEtBQUs7UUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtJQUN0Qjs7OztBQUdjLG9FQUFXLEVBQUM7Ozs7Ozs7OztBQ2pEM0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXNDO0FBQ1I7QUFDTTtBQUVNO0FBb0IxQzs7O0FBR08sTUFBTSxpQkFBZ0IsRUFBRyxxRUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQUE7QUFBQTtBQTJEdEQ7Ozs7OztBQU1NLGlDQUFpRSxJQUFTO0lBQy9FLE9BQU8sT0FBTyxDQUFDLEtBQUksR0FBSSxJQUFJLENBQUMsTUFBSyxJQUFLLGdCQUFnQixDQUFDO0FBQ3hEO0FBT00sMENBQThDLElBQVM7SUFDNUQsT0FBTyxPQUFPLENBQ2IsS0FBSTtRQUNILElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFDO1FBQ2pDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFDO1FBQzlCLHVCQUF1QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FDdEM7QUFDRjtBQUVBOzs7QUFHTSxlQUFnQixRQUFRLCtEQUErQztJQVE1RTs7O0lBR1EsZUFBZSxDQUFDLFdBQTBCLEVBQUUsSUFBMEM7UUFDN0YsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNULElBQUksRUFBRSxXQUFXO1lBQ2pCLE1BQU0sRUFBRSxRQUFRO1lBQ2hCO1NBQ0EsQ0FBQztJQUNIO0lBRU8sTUFBTSxDQUFDLEtBQW9CLEVBQUUsSUFBa0I7UUFDckQsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZSxJQUFLLFNBQVMsRUFBRTtZQUN2QyxJQUFJLENBQUMsZ0JBQWUsRUFBRyxJQUFJLDBEQUFHLEVBQUU7UUFDakM7UUFFQSxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEMsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7UUFDaEY7UUFFQSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO1FBRXJDLEdBQUcsQ0FBQyxLQUFJLFdBQVksOERBQU8sRUFBRTtZQUM1QixJQUFJLENBQUMsSUFBSSxDQUNSLENBQUMsVUFBVSxFQUFFLEdBQUU7Z0JBQ2QsSUFBSSxDQUFDLGVBQWdCLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQztnQkFDdkMsT0FBTyxVQUFVO1lBQ2xCLENBQUMsRUFDRCxDQUFDLEtBQUssRUFBRSxHQUFFO2dCQUNULE1BQU0sS0FBSztZQUNaLENBQUMsQ0FDRDtRQUNGO1FBQUUsS0FBSyxHQUFHLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO1FBQ2xDO0lBQ0Q7SUFFTyxjQUFjLENBQUMsS0FBb0IsRUFBRSxlQUFnQztRQUMzRSxHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFpQixJQUFLLFNBQVMsRUFBRTtZQUN6QyxJQUFJLENBQUMsa0JBQWlCLEVBQUcsSUFBSSwwREFBRyxFQUFFO1FBQ25DO1FBRUEsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEMsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7UUFDbEY7UUFFQSxNQUFNLFlBQVcsRUFBRyxJQUFJLDhEQUFPLEVBQUU7UUFFakMsTUFBTSxhQUFZLEVBQWlCO1lBQ2xDLFFBQVEsRUFBRSxlQUFlLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBWSxDQUFFLENBQUMsQ0FBQztZQUN6RTtTQUNBO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDO1FBQy9DLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQztJQUMxQztJQUVPLEdBQUcsQ0FBc0QsS0FBb0I7UUFDbkYsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFlLEdBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlDLE9BQU8sSUFBSTtRQUNaO1FBRUEsTUFBTSxLQUFJLEVBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBRTVDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBSSxJQUFJLENBQUMsRUFBRTtZQUNyQyxPQUFPLElBQUk7UUFDWjtRQUVBLEdBQUcsQ0FBQyxLQUFJLFdBQVksOERBQU8sRUFBRTtZQUM1QixPQUFPLElBQUk7UUFDWjtRQUVBLE1BQU0sUUFBTyxFQUFtQyxJQUFLLEVBQUU7UUFDdkQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQztRQUV4QyxPQUFPLENBQUMsSUFBSSxDQUNYLENBQUMsVUFBVSxFQUFFLEdBQUU7WUFDZCxHQUFHLENBQUMsZ0NBQWdDLENBQUksVUFBVSxDQUFDLEVBQUU7Z0JBQ3BELFdBQVUsRUFBRyxVQUFVLENBQUMsT0FBTztZQUNoQztZQUVBLElBQUksQ0FBQyxlQUFnQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDO1lBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQztZQUN2QyxPQUFPLFVBQVU7UUFDbEIsQ0FBQyxFQUNELENBQUMsS0FBSyxFQUFFLEdBQUU7WUFDVCxNQUFNLEtBQUs7UUFDWixDQUFDLENBQ0Q7UUFFRCxPQUFPLElBQUk7SUFDWjtJQUVPLFdBQVcsQ0FBSSxLQUFvQjtRQUN6QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWlCLEdBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hELE9BQU8sSUFBSTtRQUNaO1FBRUEsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBRTtJQUMxQztJQUVPLEdBQUcsQ0FBQyxLQUFvQjtRQUM5QixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWUsR0FBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4RTtJQUVPLFdBQVcsQ0FBQyxLQUFvQjtRQUN0QyxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWlCLEdBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1RTs7OztBQUdjLGtGQUFRLEVBQUM7Ozs7Ozs7OztBQ3hPeEI7QUFBQTtBQUFBO0FBQWtDO0FBQ1E7QUFHK0I7QUFNbkUsc0JBQXVCLFFBQVEsK0RBQWdDO0lBTXBFO1FBQ0MsS0FBSyxFQUFFO1FBTkEsZUFBUyxFQUFHLElBQUksMkRBQVEsRUFBRTtRQUMxQiw2QkFBdUIsRUFBbUMsSUFBSSxzREFBRyxFQUFFO1FBQ25FLCtCQUF5QixFQUFtQyxJQUFJLHNEQUFHLEVBQUU7UUFLNUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLE1BQU0sUUFBTyxFQUFHLEdBQUcsR0FBRTtZQUNwQixHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDdEIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUN0RCxJQUFJLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxhQUFZLEVBQUcsU0FBUztZQUM5QjtRQUNELENBQUM7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBTyxDQUFFLENBQUM7SUFDdEI7SUFFQSxJQUFXLElBQUksQ0FBQyxZQUFzQjtRQUNyQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDdEQsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3pEO1FBQ0EsSUFBSSxDQUFDLGFBQVksRUFBRyxZQUFZO0lBQ2pDO0lBRU8sTUFBTSxDQUFDLEtBQW9CLEVBQUUsTUFBb0I7UUFDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztJQUNyQztJQUVPLGNBQWMsQ0FBQyxLQUFvQixFQUFFLFFBQXlCO1FBQ3BFLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUM7SUFDL0M7SUFFTyxHQUFHLENBQUMsS0FBb0I7UUFDOUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUMsR0FBSSxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQVksR0FBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvRjtJQUVPLFdBQVcsQ0FBQyxLQUFvQjtRQUN0QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBQyxHQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBWSxHQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9HO0lBRU8sR0FBRyxDQUNULEtBQW9CLEVBQ3BCLG1CQUE0QixLQUFLO1FBRWpDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztJQUMvRTtJQUVPLFdBQVcsQ0FBSSxLQUFvQixFQUFFLG1CQUE0QixLQUFLO1FBQzVFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQztJQUN6RjtJQUVRLElBQUksQ0FDWCxLQUFvQixFQUNwQixnQkFBeUIsRUFDekIsZUFBc0MsRUFDdEMsUUFBd0M7UUFFeEMsTUFBTSxXQUFVLEVBQUcsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMvRyxJQUFJLENBQUMsSUFBSSxFQUFDLEVBQUcsQ0FBQyxFQUFFLEVBQUMsRUFBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNDLE1BQU0sU0FBUSxFQUFRLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbkMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFO2dCQUNkLFFBQVE7WUFDVDtZQUNBLE1BQU0sS0FBSSxFQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDN0MsTUFBTSxpQkFBZ0IsRUFBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBQyxHQUFJLEVBQUU7WUFDckQsR0FBRyxDQUFDLElBQUksRUFBRTtnQkFDVCxPQUFPLElBQUk7WUFDWjtZQUFFLEtBQUssR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUMsSUFBSyxDQUFDLENBQUMsRUFBRTtnQkFDbEQsTUFBTSxPQUFNLEVBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUEwQixFQUFFLEdBQUU7b0JBQ2hFLEdBQUcsQ0FDRixLQUFLLENBQUMsT0FBTSxJQUFLLFNBQVE7d0JBQ3hCLElBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUMsSUFBSyxLQUFLLENBQUMsSUFDbkUsRUFBRTt3QkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQVksQ0FBRSxDQUFDO29CQUNsQztnQkFDRCxDQUFDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQ2hCLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNyRDtRQUNEO1FBQ0EsT0FBTyxJQUFJO0lBQ1o7Ozs7QUFHYyx3RUFBZSxFQUFDOzs7Ozs7Ozs7QUNqRy9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE4QjtBQUNRO0FBQ0Y7QUFFWjtBQUNNO0FBY2tCO0FBQ1I7QUFDRztBQUM0QjtBQVN2RSxNQUFNLFlBQVksR0FBRyxJQUFJLDBEQUFHLEVBQWdDLENBQUM7QUFDN0QsTUFBTSxTQUFTLEdBQUcsbURBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFM0IsTUFBTSxNQUFNLEdBQUcsNkRBQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFBQTtBQUFBO0FBRS9DOztHQUVHO0FBQ0k7SUFnRE47O09BRUc7SUFDSDtRQXhDQTs7V0FFRztRQUNLLHVCQUFrQixHQUFHLElBQUksQ0FBQztRQU9sQzs7V0FFRztRQUNLLHlCQUFvQixHQUFhLEVBQUUsQ0FBQztRQW9CcEMsaUJBQVksR0FBZ0IsSUFBSSw2REFBVyxFQUFFLENBQUM7UUFFOUMsYUFBUSxHQUFhLEVBQUUsQ0FBQztRQU0vQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksMERBQUcsRUFBaUIsQ0FBQztRQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFNLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRW5ELGdFQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7WUFDM0IsS0FBSyxFQUFFLElBQUk7WUFDWCxRQUFRLEVBQUUsR0FBUyxFQUFFO2dCQUNwQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDakIsQ0FBQztZQUNELFFBQVEsRUFBRSxHQUFTLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2hCLENBQUM7WUFDRCxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDOUIsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUN0QixDQUFDO1lBQ0QsY0FBYyxFQUFFLEVBQW9CO1lBQ3BDLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLGVBQWUsRUFBRSxFQUFFO1NBQ25CLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFUyxJQUFJLENBQTJCLFFBQWtDO1FBQzFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksMERBQUcsRUFBOEMsQ0FBQztRQUN2RSxDQUFDO1FBQ0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2IsTUFBTSxHQUFHLElBQUksUUFBUSxDQUFDO2dCQUNyQixVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtnQkFDakMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZO2dCQUM5QixJQUFJLEVBQUUsSUFBSTthQUNWLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFFRCxNQUFNLENBQUMsTUFBVyxDQUFDO0lBQ3BCLENBQUM7SUFFUyxRQUFRO1FBQ2pCLHlCQUF5QjtJQUMxQixDQUFDO0lBRVMsUUFBUTtRQUNqQix5QkFBeUI7SUFDMUIsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBVyxtQkFBbUI7UUFDN0IsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU0scUJBQXFCLENBQUMsY0FBOEI7UUFDMUQsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLGNBQWMsQ0FBQztRQUN4QyxNQUFNLFlBQVksR0FBRyxnRUFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFFLENBQUM7UUFFbEQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQztZQUMvRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxpRUFBZSxFQUFFLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLENBQUM7WUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7WUFDbkMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ25CLENBQUM7UUFDRCxZQUFZLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUM5QyxDQUFDO0lBRU0saUJBQWlCLENBQUMsa0JBQXNDO1FBQzlELE1BQU0sWUFBWSxHQUFHLGdFQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUUsQ0FBQztRQUNsRCxZQUFZLENBQUMsZUFBZSxHQUFHLGtCQUFrQixDQUFDO1FBQ2xELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sMkJBQTJCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ2hGLE1BQU0sbUJBQW1CLEdBQWEsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFOUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixLQUFLLEtBQUssSUFBSSwyQkFBMkIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRixNQUFNLGFBQWEsR0FBRyxDQUFDLEdBQUcsYUFBYSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMzRSxNQUFNLGlCQUFpQixHQUF3QixFQUFFLENBQUM7WUFDbEQsTUFBTSxtQkFBbUIsR0FBUSxFQUFFLENBQUM7WUFDcEMsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBRXpCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMvQyxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BELFFBQVEsQ0FBQztnQkFDVixDQUFDO2dCQUNELGlCQUFpQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDckMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN4RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQzdDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFDeEIsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ2hDLENBQUM7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsMkJBQTJCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUQsWUFBWSxHQUFHLElBQUksQ0FBQztvQkFDcEIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsWUFBWSxFQUFFLENBQUMsQ0FBQztvQkFDeEUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQy9DLE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLENBQUMsQ0FBQzt3QkFDL0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN4RSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ3hDLENBQUM7d0JBQ0QsRUFBRSxDQUFDLENBQUMsWUFBWSxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUM7NEJBQ2hDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7d0JBQ2xELENBQUM7b0JBQ0YsQ0FBQztnQkFDRixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNQLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFDeEQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN4RSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3hDLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsWUFBWSxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0JBQ2hDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBQ2xELENBQUM7Z0JBQ0YsQ0FBQztZQUNGLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixNQUFNLGlCQUFpQixHQUE2QixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUN0RixNQUFNLGlCQUFpQixHQUFlLEVBQUUsQ0FBQztnQkFDekMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRTtvQkFDeEQsTUFBTSxlQUFlLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUN6RSxNQUFNLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQy9ELEVBQUUsQ0FBQyxDQUFDLGVBQWUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQ3JDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsbUJBQW1CLENBQUMsQ0FBQzt3QkFDM0QsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNsQyxDQUFDO2dCQUNGLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQztZQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLENBQUM7WUFDdkMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG1CQUFtQixDQUFDO1FBQ2pELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7WUFDaEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQy9DLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsRUFBRSxDQUFDLENBQUMsT0FBTyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDcEQsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FDcEQsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUN4QixZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDaEMsQ0FBQztnQkFDSCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNQLG1CQUFtQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztZQUNGLENBQUM7WUFDRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsbUJBQW1CLENBQUM7WUFDaEQsSUFBSSxDQUFDLFdBQVcscUJBQVEsVUFBVSxDQUFFLENBQUM7UUFDdEMsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbkIsQ0FBQztJQUNGLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDdkIsQ0FBQztJQUVNLGVBQWUsQ0FBQyxRQUFzQjtRQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNuQixDQUFDO0lBQ0YsQ0FBQztJQUVNLFVBQVU7UUFDaEIsTUFBTSxZQUFZLEdBQUcsZ0VBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBRSxDQUFDO1FBQ2xELFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQzNCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3hDLElBQUksS0FBSyxHQUFHLE1BQU0sRUFBRSxDQUFDO1FBQ3JCLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNkLENBQUM7SUFFTSxVQUFVO1FBQ2hCLE1BQU0sWUFBWSxHQUFHLGdFQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUUsQ0FBQztRQUNsRCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUM3QixZQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDM0IsQ0FBQztJQUNGLENBQUM7SUFFUyxNQUFNO1FBQ2YsTUFBTSxDQUFDLHFEQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ08sWUFBWSxDQUFDLFlBQW9CLEVBQUUsS0FBVTtRQUN0RCxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksYUFBYSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZELEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsYUFBYSxHQUFHLElBQUksMERBQUcsRUFBaUIsQ0FBQztnQkFDekMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ25ELENBQUM7WUFFRCxJQUFJLHFCQUFxQixHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztnQkFDM0IsYUFBYSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUscUJBQXFCLENBQUMsQ0FBQztZQUN4RCxDQUFDO1lBQ0QscUJBQXFCLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbkUsQ0FBQztJQUNGLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyxtQkFBbUIsQ0FBQyxZQUFvQjtRQUMvQyxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFFekIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUVuQyxPQUFPLFdBQVcsRUFBRSxDQUFDO1lBQ3BCLE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbEQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDakIsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFFakQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDaEIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO1lBQ0YsQ0FBQztZQUVELFdBQVcsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFFRCxNQUFNLENBQUMsYUFBYSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNPLFlBQVksQ0FBQyxZQUFvQjtRQUMxQyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUzRCxFQUFFLENBQUMsQ0FBQyxhQUFhLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBQ3RCLENBQUM7UUFFRCxhQUFhLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXZELElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN0RCxNQUFNLENBQUMsYUFBYSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0sscUJBQXFCLENBQUMsUUFBYSxFQUFFLElBQVM7UUFDckQsRUFBRSxDQUFDLENBQUMsT0FBTyxRQUFRLEtBQUssVUFBVSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGtGQUF1QixDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDeEcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLDhEQUFPLEVBR3hDLENBQUM7WUFDTCxDQUFDO1lBQ0QsTUFBTSxRQUFRLEdBQStCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQy9GLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEdBQUcsUUFBUSxDQUFDO1lBRXBDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBNEIsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDekUsQ0FBQztZQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDakIsQ0FBQztJQUVELElBQVcsUUFBUTtRQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGlFQUFlLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2QixDQUFDO0lBRU8sb0JBQW9CLENBQUMsVUFBZTtRQUMzQyxNQUFNLGdCQUFnQixHQUF1QixJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbkYsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FDN0IsQ0FBQyxVQUFVLEVBQUUsd0JBQXdCLEVBQUUsRUFBRTtnQkFDeEMsTUFBTSxtQkFBTSxVQUFVLEVBQUssd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsRUFBRztZQUM5RSxDQUFDLG9CQUNJLFVBQVUsRUFDZixDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDbkIsQ0FBQztJQUVEOztPQUVHO0lBQ0ssaUJBQWlCO1FBQ3hCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFeEQsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBYyxFQUFFLG9CQUFrQyxFQUFFLEVBQUU7Z0JBQ2xGLE1BQU0sYUFBYSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNoRyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUVBQXVFLENBQUMsQ0FBQztvQkFDdEYsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDZixDQUFDO2dCQUNELE1BQU0sQ0FBQyxhQUFhLENBQUM7WUFDdEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQzlCLENBQUM7SUFFRDs7OztPQUlHO0lBQ08sZUFBZSxDQUFDLEtBQXNCO1FBQy9DLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFdEQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEtBQUssR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBc0IsRUFBRSxtQkFBZ0MsRUFBRSxFQUFFO2dCQUN4RixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM5QyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUM7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUVPLHFCQUFxQjtRQUM1QixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUVoRSxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUUsQ0FBQztJQUNGLENBQUM7SUFFUyxHQUFHLENBQUMsTUFBYztRQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRVMsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDWixNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbEIsQ0FBQztRQUNGLENBQUM7SUFDRixDQUFDOzs7O0FBMWFEOztHQUVHO0FBQ0ksZ0JBQUssR0FBVyxtRUFBZ0IsQ0FBQztBQTBhMUIsbUVBQVUsRUFBQzs7Ozs7Ozs7O0FDbmQxQixJQUFJLHFDQUFxQyxHQUFHLEVBQUUsQ0FBQztBQUMvQyxJQUFJLG9DQUFvQyxHQUFHLEVBQUUsQ0FBQztBQUU5QyxvQ0FBb0MsT0FBb0I7SUFDdkQsRUFBRSxDQUFDLENBQUMsa0JBQWtCLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDekMscUNBQXFDLEdBQUcscUJBQXFCLENBQUM7UUFDOUQsb0NBQW9DLEdBQUcsb0JBQW9CLENBQUM7SUFDN0QsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxlQUFlLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDOUUscUNBQXFDLEdBQUcsZUFBZSxDQUFDO1FBQ3hELG9DQUFvQyxHQUFHLGNBQWMsQ0FBQztJQUN2RCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDUCxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7SUFDbEQsQ0FBQztBQUNGLENBQUM7QUFFRCxvQkFBb0IsT0FBb0I7SUFDdkMsRUFBRSxDQUFDLENBQUMsb0NBQW9DLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRCwwQkFBMEIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDO0FBQ0YsQ0FBQztBQUVELHVCQUF1QixPQUFvQixFQUFFLGNBQTBCLEVBQUUsZUFBMkI7SUFDbkcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXBCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztJQUVyQixJQUFJLGFBQWEsR0FBRztRQUNuQixFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDZixRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxxQ0FBcUMsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUNsRixPQUFPLENBQUMsbUJBQW1CLENBQUMsb0NBQW9DLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFakYsZUFBZSxFQUFFLENBQUM7UUFDbkIsQ0FBQztJQUNGLENBQUMsQ0FBQztJQUVGLGNBQWMsRUFBRSxDQUFDO0lBRWpCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxvQ0FBb0MsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM5RSxPQUFPLENBQUMsZ0JBQWdCLENBQUMscUNBQXFDLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDaEYsQ0FBQztBQUVELGNBQWMsSUFBaUIsRUFBRSxVQUEyQixFQUFFLGFBQXFCLEVBQUUsVUFBc0I7SUFDMUcsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixJQUFJLEdBQUcsYUFBYSxTQUFTLENBQUM7SUFFaEYsYUFBYSxDQUNaLElBQUksRUFDSixHQUFHLEVBQUU7UUFDSixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVsQyxxQkFBcUIsQ0FBQztZQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUMsRUFDRCxHQUFHLEVBQUU7UUFDSixVQUFVLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FDRCxDQUFDO0FBQ0gsQ0FBQztBQUVELGVBQWUsSUFBaUIsRUFBRSxVQUEyQixFQUFFLGNBQXNCO0lBQ3BGLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxvQkFBb0IsSUFBSSxHQUFHLGNBQWMsU0FBUyxDQUFDO0lBRWxGLGFBQWEsQ0FDWixJQUFJLEVBQ0osR0FBRyxFQUFFO1FBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFbkMscUJBQXFCLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLEVBQ0QsR0FBRyxFQUFFO1FBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUNELENBQUM7QUFDSCxDQUFDO0FBRWM7SUFDZCxLQUFLO0lBQ0wsSUFBSTtDQUNKLEVBQUM7Ozs7Ozs7OztBQ3BGRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBb0M7QUFlcEM7O0dBRUc7QUFDSSxNQUFNLEtBQUssR0FBRyxxRUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFBQTtBQUFBO0FBRXZEOztHQUVHO0FBQ0ksTUFBTSxLQUFLLEdBQUcscUVBQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQUE7QUFBQTtBQUV2RDs7R0FFRztBQUNJLE1BQU0sUUFBUSxHQUFHLHFFQUFNLENBQUMsb0RBQW9ELENBQUMsQ0FBQztBQUFBO0FBQUE7QUFFckY7O0dBRUc7QUFDSSxpQkFDTixLQUFlO0lBRWYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUM7QUFDNUUsQ0FBQztBQUVEOztHQUVHO0FBQ0ksaUJBQWlCLEtBQVk7SUFDbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ3pHLENBQUM7QUFFRDs7R0FFRztBQUNJLG9CQUFvQixLQUFZO0lBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDO0FBQy9FLENBQUM7QUFFTSx1QkFBdUIsS0FBVTtJQUN2QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQztBQWtETSxrQkFDTixNQUF1QixFQUN2QixpQkFBMkQsRUFDM0QsU0FBNEI7SUFFNUIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLElBQUksUUFBUSxDQUFDO0lBQ2IsRUFBRSxDQUFDLENBQUMsT0FBTyxpQkFBaUIsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzdDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQztJQUM5QixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDUCxRQUFRLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxDQUFDO1FBQ3RDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7UUFDeEMsT0FBTyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUM7SUFDOUMsQ0FBQztJQUVELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzRDtRQUNDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQ0QsT0FBTyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDckIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDVixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbkUsS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDekIsQ0FBQztRQUNGLENBQUM7SUFDRixDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNmLENBQUM7QUFFRDs7R0FFRztBQUNJLFdBQ04saUJBQWlELEVBQ2pELFVBQTJCLEVBQzNCLFdBQTBCLEVBQUU7SUFFNUIsTUFBTSxDQUFDO1FBQ04sUUFBUTtRQUNSLGlCQUFpQjtRQUNqQixVQUFVO1FBQ1YsSUFBSSxFQUFFLEtBQUs7S0FDWCxDQUFDO0FBQ0gsQ0FBQztBQVFNLFdBQ04sR0FBVyxFQUNYLHVCQUE4RSxFQUFFLEVBQ2hGLFdBQWdDLFNBQVM7SUFFekMsSUFBSSxVQUFVLEdBQWdELG9CQUFvQixDQUFDO0lBQ25GLElBQUksMEJBQTBCLENBQUM7SUFFL0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxRQUFRLEdBQUcsb0JBQW9CLENBQUM7UUFDaEMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxVQUFVLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN0QywwQkFBMEIsR0FBRyxVQUFVLENBQUM7UUFDeEMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsTUFBTSxDQUFDO1FBQ04sR0FBRztRQUNILDBCQUEwQjtRQUMxQixRQUFRO1FBQ1IsVUFBVTtRQUNWLElBQUksRUFBRSxLQUFLO0tBQ1gsQ0FBQztBQUNILENBQUM7QUFFRDs7R0FFRztBQUNJLGFBQ04sRUFBRSxJQUFJLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBRSxLQUFLLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsUUFBUSxHQUFHLE1BQU0sRUFBYyxFQUN4RSxRQUFrQjtJQUVsQixNQUFNLENBQUM7UUFDTixHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzFELFVBQVUsRUFBRSxLQUFLO1FBQ2pCLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLE1BQU0sRUFBRSxFQUFFO1FBQ1YsUUFBUTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLElBQUk7UUFDYixJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJO1FBQ2pELFFBQVE7S0FDUyxDQUFDO0FBQ3BCLENBQUM7Ozs7Ozs7OztBQzdNRDtBQUFBO0FBQW9EO0FBTzdDLHFCQUFxQixNQUFpQjtJQUM1QyxNQUFNLENBQUMsaUZBQWUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRTtRQUM5QyxNQUFNLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEYsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBRWMscUZBQVcsRUFBQzs7Ozs7Ozs7O0FDWDNCO0FBQUE7Ozs7O0dBS0c7QUFDSSx5QkFBeUIsT0FBeUI7SUFDeEQsTUFBTSxDQUFDLFVBQVMsTUFBVyxFQUFFLFdBQW9CLEVBQUUsVUFBK0I7UUFDakYsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxPQUFPLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFDRixDQUFDLENBQUM7QUFDSCxDQUFDO0FBRWMseUZBQWUsRUFBQzs7Ozs7Ozs7O0FDakIvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEM7QUFFOUMseUJBQXlCLEtBQVU7SUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxpQkFBaUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzVGLENBQUM7QUFFTSxnQkFBZ0IsZ0JBQXFCLEVBQUUsV0FBZ0I7SUFDN0QsTUFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFLElBQUk7UUFDYixLQUFLLEVBQUUsV0FBVztLQUNsQixDQUFDO0FBQ0gsQ0FBQztBQUVNLGdCQUFnQixnQkFBcUIsRUFBRSxXQUFnQjtJQUM3RCxNQUFNLENBQUM7UUFDTixPQUFPLEVBQUUsS0FBSztRQUNkLEtBQUssRUFBRSxXQUFXO0tBQ2xCLENBQUM7QUFDSCxDQUFDO0FBRU0sbUJBQW1CLGdCQUFxQixFQUFFLFdBQWdCO0lBQ2hFLE1BQU0sQ0FBQztRQUNOLE9BQU8sRUFBRSxnQkFBZ0IsS0FBSyxXQUFXO1FBQ3pDLEtBQUssRUFBRSxXQUFXO0tBQ2xCLENBQUM7QUFDSCxDQUFDO0FBRU0saUJBQWlCLGdCQUFxQixFQUFFLFdBQWdCO0lBQzlELElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztJQUVwQixNQUFNLGdCQUFnQixHQUFHLGdCQUFnQixJQUFJLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQy9FLE1BQU0sZ0JBQWdCLEdBQUcsV0FBVyxJQUFJLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUVyRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQztZQUNOLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFLFdBQVc7U0FDbEIsQ0FBQztJQUNILENBQUM7SUFFRCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbkQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUV6QyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1AsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUM5QixNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNELE1BQU0sQ0FBQztRQUNOLE9BQU87UUFDUCxLQUFLLEVBQUUsV0FBVztLQUNsQixDQUFDO0FBQ0gsQ0FBQztBQUVNLGNBQWMsZ0JBQXFCLEVBQUUsV0FBZ0I7SUFDM0QsSUFBSSxNQUFNLENBQUM7SUFDWCxFQUFFLENBQUMsQ0FBQyxPQUFPLFdBQVcsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssbUVBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sR0FBRyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsTUFBTSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNoRCxDQUFDO0lBQ0YsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1AsTUFBTSxHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNmLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RXdDO0FBRWlCO0FBR0E7QUFDL0I7QUFFSztBQUVoQzs7R0FFRztBQUNILElBQVksb0JBR1g7QUFIRCxXQUFZLG9CQUFvQjtJQUMvQix1RUFBWTtJQUNaLHVFQUFRO0FBQ1QsQ0FBQyxFQUhXLG9CQUFvQixLQUFwQixvQkFBb0IsUUFHL0I7QUFFRDs7R0FFRztBQUNILElBQVksVUFHWDtBQUhELFdBQVksVUFBVTtJQUNyQiwrQ0FBVTtJQUNWLDZDQUFTO0FBQ1YsQ0FBQyxFQUhXLFVBQVUsS0FBVixVQUFVLFFBR3JCO0FBc0ZNLHdCQUFpRSxJQUFPO0lBQzlFLGVBQXlCLFNBQVEsSUFBSTtRQVdwQyxZQUFZLEdBQUcsSUFBVztZQUN6QixLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQVRSLFVBQUssR0FBWSxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQy9CLFdBQU0sR0FBRyxJQUFJLENBQUM7WUFJZCx5QkFBb0IsR0FBdUIsRUFBd0IsQ0FBQztZQU0zRSxJQUFJLENBQUMsa0JBQWtCLEdBQUc7Z0JBQ3pCLFdBQVcsRUFBRSwyRUFBYzthQUMzQixDQUFDO1lBRUYsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxDQUFDO1FBQ3JELENBQUM7UUFFTSxNQUFNLENBQUMsSUFBYztZQUMzQixNQUFNLE9BQU8sR0FBRztnQkFDZixJQUFJLEVBQUUsVUFBVSxDQUFDLE1BQU07Z0JBQ3ZCLElBQUk7YUFDSixDQUFDO1lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVNLEtBQUssQ0FBQyxJQUFjO1lBQzFCLE1BQU0sT0FBTyxHQUFHO2dCQUNmLElBQUksRUFBRSxVQUFVLENBQUMsS0FBSztnQkFDdEIsSUFBSTthQUNKLENBQUM7WUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRUQsSUFBVyxJQUFJLENBQUMsSUFBYTtZQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxLQUFLLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNELE1BQU0sSUFBSSxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztZQUMzRSxDQUFDO1lBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbkIsQ0FBQztRQUVELElBQVcsSUFBSTtZQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ25CLENBQUM7UUFFRCxJQUFXLEtBQUs7WUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNwQixDQUFDO1FBRUQsSUFBVyxLQUFLLENBQUMsS0FBYztZQUM5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxLQUFLLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNELE1BQU0sSUFBSSxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQztZQUN6RSxDQUFDO1lBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQztRQUVNLE9BQU8sQ0FBQyxNQUFnQixRQUFRO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEtBQUssb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDM0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO1lBQ3RFLENBQUM7WUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRS9CLDBDQUEwQztZQUMxQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNSLE9BQU8sRUFBRSxHQUFHLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7Z0JBQzNCLENBQUM7YUFDRCxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNaLDJGQUEyRjtnQkFDM0YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxzQkFBc0IsRUFBUztnQkFDekMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxNQUFNO2FBQ3ZCLENBQUMsQ0FBQztRQUNKLENBQUM7UUFFTSxXQUFXLENBQUMsUUFBaUI7WUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRU0sYUFBYSxDQUFDLFVBQThCO1lBQ2xELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBRU0saUJBQWlCLENBQUMsVUFBOEI7WUFDdEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzdGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM5QyxDQUFDO1lBQ0YsQ0FBQztZQUNELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxrRUFBTSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNuRCxLQUFLLENBQUMscUJBQXFCLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUMvRSxLQUFLLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUVNLE1BQU07WUFDWixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxLQUFLLG9CQUFvQixDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNoRixNQUFNLElBQUksS0FBSyxDQUFDLHdFQUF3RSxDQUFDLENBQUM7WUFDM0YsQ0FBQztZQUNELE1BQU0sQ0FBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFhLENBQUMsU0FBUyxDQUFDO1FBQ3RFLENBQUM7UUFHTSxXQUFXLENBQUMsTUFBYTtZQUMvQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUM7WUFDbEIsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sS0FBSyxJQUFJLElBQUksTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNFLElBQUksR0FBRyxxREFBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUVNLE9BQU87WUFDYixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUVPLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQWlCO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbEIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUMzQixDQUFDO1lBRUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUM7WUFFcEQsTUFBTSxNQUFNLEdBQUc7Z0JBQ2QsT0FBTyxFQUFFLEdBQUcsRUFBRTtvQkFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxLQUFLLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQzNELElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO3dCQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztvQkFDckQsQ0FBQztnQkFDRixDQUFDO2FBQ0QsQ0FBQztZQUVGLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFFNUIsSUFBSSxDQUFDLGtCQUFrQixxQkFBUSxJQUFJLENBQUMsa0JBQWtCLEVBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUUsQ0FBQztZQUVwRixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNkLEtBQUssVUFBVSxDQUFDLE1BQU07b0JBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsa0RBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7b0JBQ3hFLEtBQUssQ0FBQztnQkFDUCxLQUFLLFVBQVUsQ0FBQyxLQUFLO29CQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLGtEQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO29CQUN2RSxLQUFLLENBQUM7WUFDUixDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDM0IsQ0FBQztLQUNEO0lBakRBO1FBREMsb0ZBQVcsRUFBRTtnREFRYjtJQTRDRixNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ2xCLENBQUM7QUFFYyx3RkFBYyxFQUFDOzs7Ozs7Ozs7QUNuUjlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBb0M7QUFhYztBQUNlO0FBQ1o7QUFDZjtBQUl0QyxNQUFNLGFBQVksRUFBRyxvQkFBb0I7QUFDekMsTUFBTSxjQUFhLEVBQUcsYUFBWSxFQUFHLFVBQVU7QUFDL0MsTUFBTSxnQkFBZSxFQUFHLGFBQVksRUFBRyxZQUFZO0FBRW5ELE1BQU0sV0FBVSxFQUFzQyxFQUFFO0FBRXhELE1BQU0sZUFBYyxFQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLENBQUM7QUErRTVELE1BQU0sa0JBQWlCLEVBQUcsSUFBSSw4REFBTyxFQUFtQixDQUFDO0FBQUE7QUFBQTtBQUVoRSxNQUFNLFlBQVcsRUFBRyxJQUFJLDhEQUFPLEVBQStDO0FBQzlFLE1BQU0sZUFBYyxFQUFHLElBQUksOERBQU8sRUFBK0M7QUFDakYsTUFBTSxrQkFBaUIsRUFBRyxJQUFJLDhEQUFPLEVBQThDO0FBRW5GLGNBQWMsTUFBcUIsRUFBRSxNQUFxQjtJQUN6RCxHQUFHLENBQUMsMkRBQU8sQ0FBQyxNQUFNLEVBQUMsR0FBSSwyREFBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3ZDLEdBQUcsQ0FBQyw4REFBVSxDQUFDLE1BQU0sRUFBQyxHQUFJLDhEQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDN0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFPLElBQUssTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDdEMsT0FBTyxLQUFLO1lBQ2I7UUFDRDtRQUNBLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBRyxJQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDOUIsT0FBTyxLQUFLO1FBQ2I7UUFDQSxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFHLElBQUssTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDcEQsT0FBTyxLQUFLO1FBQ2I7UUFDQSxPQUFPLElBQUk7SUFDWjtJQUFFLEtBQUssR0FBRyxDQUFDLDJEQUFPLENBQUMsTUFBTSxFQUFDLEdBQUksMkRBQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUM5QyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVEsSUFBSyxVQUFTLEdBQUksT0FBTyxNQUFNLENBQUMsa0JBQWlCLElBQUssUUFBUSxFQUFFO1lBQ2xGLE9BQU8sS0FBSztRQUNiO1FBQ0EsR0FBRyxDQUFDLE1BQU0sQ0FBQyxrQkFBaUIsSUFBSyxNQUFNLENBQUMsaUJBQWlCLEVBQUU7WUFDMUQsT0FBTyxLQUFLO1FBQ2I7UUFDQSxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFHLElBQUssTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDcEQsT0FBTyxLQUFLO1FBQ2I7UUFDQSxPQUFPLElBQUk7SUFDWjtJQUNBLE9BQU8sS0FBSztBQUNiO0FBRUEsTUFBTSxrQkFBaUIsRUFBRztJQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLHdFQUF3RSxDQUFDO0FBQzFGLENBQUM7QUFFRCw4QkFDQyxnQkFBNEMsRUFDNUMsaUJBQTZDO0lBRTdDLE1BQU0sU0FBUSxFQUErQjtRQUM1QyxTQUFTLEVBQUUsU0FBUztRQUNwQixZQUFZLEVBQUUsVUFBUyxPQUFvQixFQUFFLFNBQWlCLEVBQUUsS0FBYTtZQUMzRSxPQUFPLENBQUMsS0FBYSxDQUFDLFNBQVMsRUFBQyxFQUFHLEtBQUs7UUFDMUMsQ0FBQztRQUNELFdBQVcsRUFBRTtZQUNaLEtBQUssRUFBRSxpQkFBaUI7WUFDeEIsSUFBSSxFQUFFO1NBQ047UUFDRCxLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFFLEtBQUs7UUFDWDtLQUNBO0lBQ0QsT0FBTyxrQkFBSyxRQUFRLEVBQUssZ0JBQWdCLENBQXVCO0FBQ2pFO0FBRUEseUJBQXlCLFVBQWtCO0lBQzFDLEdBQUcsQ0FBQyxPQUFPLFdBQVUsSUFBSyxRQUFRLEVBQUU7UUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQztJQUNoRDtBQUNEO0FBRUEscUJBQ0MsT0FBYSxFQUNiLFNBQWlCLEVBQ2pCLFlBQXNCLEVBQ3RCLGlCQUFvQyxFQUNwQyxJQUFTLEVBQ1QsYUFBd0I7SUFFeEIsTUFBTSxlQUFjLEVBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFFO0lBQ2xGLE1BQU0sU0FBUSxFQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBQyxHQUFJLElBQUksOERBQU8sRUFBRTtJQUVyRSxHQUFHLENBQUMsYUFBYSxFQUFFO1FBQ2xCLE1BQU0sY0FBYSxFQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDO0lBQ3REO0lBRUEsSUFBSSxTQUFRLEVBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFFdEMsR0FBRyxDQUFDLFVBQVMsSUFBSyxPQUFPLEVBQUU7UUFDMUIsU0FBUSxFQUFHLFVBQW9CLEdBQVU7WUFDeEMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO1lBQzNCLEdBQUcsQ0FBQyxNQUFjLENBQUMsZUFBZSxFQUFDLEVBQUksR0FBRyxDQUFDLE1BQTJCLENBQUMsS0FBSztRQUM5RSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNiO0lBRUEsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7SUFDN0MsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDO0lBQ3BDLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUM7QUFDOUM7QUFFQSxvQkFBb0IsT0FBZ0IsRUFBRSxPQUEyQjtJQUNoRSxHQUFHLENBQUMsT0FBTyxFQUFFO1FBQ1osTUFBTSxXQUFVLEVBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFHLENBQUMsRUFBRSxFQUFDLEVBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckM7SUFDRDtBQUNEO0FBRUEsdUJBQXVCLE9BQWdCLEVBQUUsT0FBMkI7SUFDbkUsR0FBRyxDQUFDLE9BQU8sRUFBRTtRQUNaLE1BQU0sV0FBVSxFQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLEVBQUMsRUFBRyxDQUFDLEVBQUUsRUFBQyxFQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDO0lBQ0Q7QUFDRDtBQUVBLGlDQUFpQyxPQUFZLEVBQUUsUUFBdUIsRUFBRSxPQUFzQjtJQUM3RixNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxXQUFVLEVBQUUsRUFBRyxPQUFPO0lBQ3BELEdBQUcsQ0FBQyxDQUFDLFNBQVEsR0FBSSxTQUFRLElBQUssTUFBTSxFQUFFO1FBQ3JDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLE9BQU0sQ0FBRTtJQUNyRztJQUFFLEtBQUssR0FBRyxDQUFDLFNBQVEsSUFBSyxNQUFNLEVBQUU7UUFDL0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLE9BQU0sQ0FBRTtJQUNyRztJQUNBLElBQUksY0FBYSxFQUFRO1FBQ3hCLFVBQVUsRUFBRTtLQUNaO0lBQ0QsR0FBRyxDQUFDLFVBQVUsRUFBRTtRQUNmLGFBQWEsQ0FBQyxXQUFVLEVBQUcsRUFBRTtRQUM3QixhQUFhLENBQUMsT0FBTSxFQUFHLFFBQVEsQ0FBQyxNQUFNO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUU7WUFDNUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUMsRUFBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3ZELENBQUMsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUU7WUFDNUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUMsRUFBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUNwRSxDQUFDLENBQUM7UUFDRixPQUFPLGFBQWE7SUFDckI7SUFDQSxhQUFhLENBQUMsV0FBVSxFQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUN4RCxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRTtRQUNuQixLQUFLLENBQUMsUUFBUSxFQUFDLEVBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsR0FBSSxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3JFLE9BQU8sS0FBSztJQUNiLENBQUMsRUFDRCxFQUFTLENBQ1Q7SUFDRCxPQUFPLGFBQWE7QUFDckI7QUFFQSx1QkFDQyxRQUFnQixFQUNoQixTQUFjLEVBQ2QsYUFBa0IsRUFDbEIsT0FBZ0IsRUFDaEIsaUJBQW9DO0lBRXBDLElBQUksTUFBTTtJQUNWLEdBQUcsQ0FBQyxPQUFPLFVBQVMsSUFBSyxVQUFVLEVBQUU7UUFDcEMsT0FBTSxFQUFHLFNBQVMsRUFBRTtJQUNyQjtJQUFFLEtBQUs7UUFDTixPQUFNLEVBQUcsVUFBUyxHQUFJLENBQUMsYUFBYTtJQUNyQztJQUNBLEdBQUcsQ0FBQyxPQUFNLElBQUssSUFBSSxFQUFFO1FBQ3BCLE1BQU0sZUFBYyxFQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBRTtRQUNsRixjQUFjLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRTtZQUMvQyxPQUFlLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDN0IsQ0FBQyxDQUFDO0lBQ0g7QUFDRDtBQUVBLDhCQUNDLE9BQWdCLEVBQ2hCLGtCQUFtQyxFQUNuQyxVQUEyQixFQUMzQixpQkFBb0MsRUFDcEMsYUFBc0IsS0FBSztJQUUzQixNQUFNLGVBQWMsRUFBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUU7SUFDbEYsTUFBTSxTQUFRLEVBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ3BELEdBQUcsQ0FBQyxRQUFRLEVBQUU7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUU7WUFDcEQsTUFBTSxRQUFPLEVBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLElBQUssS0FBSSxHQUFJLFVBQVU7WUFDNUQsTUFBTSxVQUFTLEVBQUcsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM1RCxHQUFHLENBQUMsUUFBTyxHQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNyQyxNQUFNLGNBQWEsRUFBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNoRSxHQUFHLENBQUMsYUFBYSxFQUFFO29CQUNsQixPQUFPLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQztnQkFDdEQ7WUFDRDtRQUNELENBQUMsQ0FBQztJQUNIO0FBQ0Q7QUFFQSx5QkFBeUIsT0FBZ0IsRUFBRSxRQUFnQixFQUFFLFNBQWlCLEVBQUUsaUJBQW9DO0lBQ25ILEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFTLElBQUssY0FBYSxHQUFJLFNBQVEsSUFBSyxNQUFNLEVBQUU7UUFDekUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztJQUM3RDtJQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsU0FBUSxJQUFLLE9BQU0sR0FBSSxVQUFTLElBQUssRUFBRSxFQUFDLEdBQUksVUFBUyxJQUFLLFNBQVMsRUFBRTtRQUNoRixPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQztJQUNsQztJQUFFLEtBQUs7UUFDTixPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7SUFDMUM7QUFDRDtBQUVBLDBCQUNDLE9BQWdCLEVBQ2hCLGtCQUErQyxFQUMvQyxVQUF1QyxFQUN2QyxpQkFBb0M7SUFFcEMsTUFBTSxVQUFTLEVBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekMsTUFBTSxVQUFTLEVBQUcsU0FBUyxDQUFDLE1BQU07SUFDbEMsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFHLENBQUMsRUFBRSxFQUFDLEVBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ25DLE1BQU0sU0FBUSxFQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsTUFBTSxVQUFTLEVBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUN0QyxNQUFNLGtCQUFpQixFQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQztRQUN0RCxHQUFHLENBQUMsVUFBUyxJQUFLLGlCQUFpQixFQUFFO1lBQ3BDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQztRQUNqRTtJQUNEO0FBQ0Q7QUFFQSwwQkFDQyxPQUFnQixFQUNoQixrQkFBbUMsRUFDbkMsVUFBMkIsRUFDM0IsaUJBQW9DLEVBQ3BDLDRCQUEyQixFQUFHLElBQUk7SUFFbEMsSUFBSSxrQkFBaUIsRUFBRyxLQUFLO0lBQzdCLE1BQU0sVUFBUyxFQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pDLE1BQU0sVUFBUyxFQUFHLFNBQVMsQ0FBQyxNQUFNO0lBQ2xDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBQyxJQUFLLENBQUMsRUFBQyxHQUFJLGtCQUFrQixDQUFDLE9BQU8sRUFBRTtRQUN0RSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM5QyxJQUFJLENBQUMsSUFBSSxFQUFDLEVBQUcsQ0FBQyxFQUFFLEVBQUMsRUFBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMzRCxhQUFhLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RDtRQUNEO1FBQUUsS0FBSztZQUNOLGFBQWEsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsT0FBTyxDQUFDO1FBQ25EO0lBQ0Q7SUFFQSw0QkFBMkIsR0FBSSxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixDQUFDO0lBRS9HLElBQUksQ0FBQyxJQUFJLEVBQUMsRUFBRyxDQUFDLEVBQUUsRUFBQyxFQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxNQUFNLFNBQVEsRUFBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksVUFBUyxFQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDcEMsTUFBTSxjQUFhLEVBQUcsa0JBQW1CLENBQUMsUUFBUSxDQUFDO1FBQ25ELEdBQUcsQ0FBQyxTQUFRLElBQUssU0FBUyxFQUFFO1lBQzNCLE1BQU0sZ0JBQWUsRUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLGNBQWMsRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUN0RixNQUFNLGVBQWMsRUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUN6RSxHQUFHLENBQUMsZ0JBQWUsR0FBSSxlQUFlLENBQUMsT0FBTSxFQUFHLENBQUMsRUFBRTtnQkFDbEQsR0FBRyxDQUFDLENBQUMsVUFBUyxHQUFJLFNBQVMsQ0FBQyxPQUFNLElBQUssQ0FBQyxFQUFFO29CQUN6QyxJQUFJLENBQUMsSUFBSSxFQUFDLEVBQUcsQ0FBQyxFQUFFLEVBQUMsRUFBRyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUNoRCxhQUFhLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0M7Z0JBQ0Q7Z0JBQUUsS0FBSztvQkFDTixNQUFNLFdBQVUsRUFBa0MsQ0FBQyxHQUFHLGNBQWMsQ0FBQztvQkFDckUsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFHLENBQUMsRUFBRSxFQUFDLEVBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDaEQsTUFBTSxrQkFBaUIsRUFBRyxlQUFlLENBQUMsQ0FBQyxDQUFDO3dCQUM1QyxHQUFHLENBQUMsaUJBQWlCLEVBQUU7NEJBQ3RCLE1BQU0sV0FBVSxFQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7NEJBQ3hELEdBQUcsQ0FBQyxXQUFVLElBQUssQ0FBQyxDQUFDLEVBQUU7Z0NBQ3RCLGFBQWEsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUM7NEJBQzFDOzRCQUFFLEtBQUs7Z0NBQ04sVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDOzRCQUNqQzt3QkFDRDtvQkFDRDtvQkFDQSxJQUFJLENBQUMsSUFBSSxFQUFDLEVBQUcsQ0FBQyxFQUFFLEVBQUMsRUFBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUMzQyxVQUFVLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbkM7Z0JBQ0Q7WUFDRDtZQUFFLEtBQUs7Z0JBQ04sSUFBSSxDQUFDLElBQUksRUFBQyxFQUFHLENBQUMsRUFBRSxFQUFDLEVBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDL0MsVUFBVSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDO1lBQ0Q7UUFDRDtRQUFFLEtBQUssR0FBRyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFDLElBQUssQ0FBQyxDQUFDLEVBQUU7WUFDbkQsYUFBYSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQztRQUM5RTtRQUFFLEtBQUssR0FBRyxDQUFDLFNBQVEsSUFBSyxRQUFRLEVBQUU7WUFDakMsTUFBTSxXQUFVLEVBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDekMsTUFBTSxXQUFVLEVBQUcsVUFBVSxDQUFDLE1BQU07WUFDcEMsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFHLENBQUMsRUFBRSxFQUFDLEVBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxNQUFNLFVBQVMsRUFBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixNQUFNLGNBQWEsRUFBRyxTQUFTLENBQUMsU0FBUyxDQUFDO2dCQUMxQyxNQUFNLGNBQWEsRUFBRyxjQUFhLEdBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQztnQkFDL0QsR0FBRyxDQUFDLGNBQWEsSUFBSyxhQUFhLEVBQUU7b0JBQ3BDLFFBQVE7Z0JBQ1Q7Z0JBQ0Esa0JBQWlCLEVBQUcsSUFBSTtnQkFDeEIsR0FBRyxDQUFDLGFBQWEsRUFBRTtvQkFDbEIsZUFBZSxDQUFDLGFBQWEsQ0FBQztvQkFDOUIsaUJBQWlCLENBQUMsWUFBYSxDQUFDLE9BQXNCLEVBQUUsU0FBUyxFQUFFLGFBQWEsQ0FBQztnQkFDbEY7Z0JBQUUsS0FBSztvQkFDTixpQkFBaUIsQ0FBQyxZQUFhLENBQUMsT0FBc0IsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDO2dCQUN2RTtZQUNEO1FBQ0Q7UUFBRSxLQUFLO1lBQ04sR0FBRyxDQUFDLENBQUMsVUFBUyxHQUFJLE9BQU8sY0FBYSxJQUFLLFFBQVEsRUFBRTtnQkFDcEQsVUFBUyxFQUFHLEVBQUU7WUFDZjtZQUNBLEdBQUcsQ0FBQyxTQUFRLElBQUssT0FBTyxFQUFFO2dCQUN6QixNQUFNLFNBQVEsRUFBSSxPQUFlLENBQUMsUUFBUSxDQUFDO2dCQUMzQyxHQUFHLENBQ0YsU0FBUSxJQUFLLFVBQVM7b0JBQ3RCLENBQUUsT0FBZSxDQUFDLGVBQWU7d0JBQ2hDLEVBQUUsU0FBUSxJQUFNLE9BQWUsQ0FBQyxlQUFlO3dCQUMvQyxFQUFFLFVBQVMsSUFBSyxhQUFhLENBQy9CLEVBQUU7b0JBQ0EsT0FBZSxDQUFDLFFBQVEsRUFBQyxFQUFHLFNBQVM7b0JBQ3JDLE9BQWUsQ0FBQyxlQUFlLEVBQUMsRUFBRyxTQUFTO2dCQUM5QztnQkFDQSxHQUFHLENBQUMsVUFBUyxJQUFLLGFBQWEsRUFBRTtvQkFDaEMsa0JBQWlCLEVBQUcsSUFBSTtnQkFDekI7WUFDRDtZQUFFLEtBQUssR0FBRyxDQUFDLFNBQVEsSUFBSyxNQUFLLEdBQUksVUFBUyxJQUFLLGFBQWEsRUFBRTtnQkFDN0QsTUFBTSxLQUFJLEVBQUcsT0FBTyxTQUFTO2dCQUM3QixHQUFHLENBQUMsS0FBSSxJQUFLLFdBQVUsR0FBSSxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUMsSUFBSyxFQUFDLEdBQUksMkJBQTJCLEVBQUU7b0JBQzlGLFdBQVcsQ0FDVixPQUFPLEVBQ1AsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDbEIsU0FBUyxFQUNULGlCQUFpQixFQUNqQixVQUFVLENBQUMsSUFBSSxFQUNmLGFBQWEsQ0FDYjtnQkFDRjtnQkFBRSxLQUFLLEdBQUcsQ0FBQyxLQUFJLElBQUssU0FBUSxHQUFJLFNBQVEsSUFBSyxZQUFXLEdBQUksMkJBQTJCLEVBQUU7b0JBQ3hGLGVBQWUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQztnQkFDakU7Z0JBQUUsS0FBSyxHQUFHLENBQUMsU0FBUSxJQUFLLGFBQVksR0FBSSxTQUFRLElBQUssV0FBVyxFQUFFO29CQUNqRSxHQUFHLENBQUUsT0FBZSxDQUFDLFFBQVEsRUFBQyxJQUFLLFNBQVMsRUFBRTt3QkFDNUMsT0FBZSxDQUFDLFFBQVEsRUFBQyxFQUFHLFNBQVM7b0JBQ3ZDO2dCQUNEO2dCQUFFLEtBQUs7b0JBQ0wsT0FBZSxDQUFDLFFBQVEsRUFBQyxFQUFHLFNBQVM7Z0JBQ3ZDO2dCQUNBLGtCQUFpQixFQUFHLElBQUk7WUFDekI7UUFDRDtJQUNEO0lBQ0EsT0FBTyxpQkFBaUI7QUFDekI7QUFFQSwwQkFBMEIsUUFBeUIsRUFBRSxNQUFxQixFQUFFLEtBQWE7SUFDeEYsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFHLEtBQUssRUFBRSxFQUFDLEVBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM3QyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUM5QixPQUFPLENBQUM7UUFDVDtJQUNEO0lBQ0EsT0FBTyxDQUFDLENBQUM7QUFDVjtBQUVNLHVCQUF3QixPQUFnQjtJQUM3QyxPQUFPO1FBQ04sR0FBRyxFQUFFLEVBQUU7UUFDUCxVQUFVLEVBQUUsRUFBRTtRQUNkLFFBQVEsRUFBRSxTQUFTO1FBQ25CLE9BQU87UUFDUCxJQUFJLEVBQUU7S0FDTjtBQUNGO0FBRU0scUJBQXNCLElBQVM7SUFDcEMsT0FBTztRQUNOLEdBQUcsRUFBRSxFQUFFO1FBQ1AsVUFBVSxFQUFFLEVBQUU7UUFDZCxRQUFRLEVBQUUsU0FBUztRQUNuQixJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUU7UUFDZixPQUFPLEVBQUUsU0FBUztRQUNsQixJQUFJLEVBQUU7S0FDTjtBQUNGO0FBRUEseUJBQXlCLFFBQW9DLEVBQUUsWUFBd0I7SUFDdEYsT0FBTztRQUNOLFFBQVE7UUFDUixRQUFRLEVBQUUsRUFBRTtRQUNaLGNBQWMsRUFBRSxZQUFZLENBQUMsY0FBYztRQUMzQyxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQWU7UUFDbEMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLFdBQWtCO1FBQzlDLFVBQVUsRUFBRSxZQUFZLENBQUMsZUFBZTtRQUN4QyxJQUFJLEVBQUU7S0FDTjtBQUNGO0FBRU0sbUNBQ0wsUUFBcUMsRUFDckMsUUFBb0M7SUFFcEMsR0FBRyxDQUFDLFNBQVEsSUFBSyxTQUFTLEVBQUU7UUFDM0IsT0FBTyxVQUFVO0lBQ2xCO0lBQ0EsU0FBUSxFQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO0lBRTFELElBQUksQ0FBQyxJQUFJLEVBQUMsRUFBRyxDQUFDLEVBQUUsRUFBQyxFQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUk7UUFDdEMsTUFBTSxNQUFLLEVBQUcsUUFBUSxDQUFDLENBQUMsQ0FBa0I7UUFDMUMsR0FBRyxDQUFDLE1BQUssSUFBSyxVQUFTLEdBQUksTUFBSyxJQUFLLElBQUksRUFBRTtZQUMxQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckIsUUFBUTtRQUNUO1FBQUUsS0FBSyxHQUFHLENBQUMsT0FBTyxNQUFLLElBQUssUUFBUSxFQUFFO1lBQ3JDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsRUFBRyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBQ2pDO1FBQUUsS0FBSztZQUNOLEdBQUcsQ0FBQywyREFBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNuQixHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFJLElBQUssU0FBUyxFQUFFO29CQUN2QyxLQUFLLENBQUMsVUFBa0IsQ0FBQyxLQUFJLEVBQUcsUUFBUTtvQkFDekMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFRLEdBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFNLEVBQUcsQ0FBQyxFQUFFO3dCQUNoRCx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztvQkFDcEQ7Z0JBQ0Q7WUFDRDtZQUFFLEtBQUs7Z0JBQ04sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRTtvQkFDMUIsTUFBTSxhQUFZLEVBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBRTtvQkFDckQsS0FBSyxDQUFDLGVBQWMsRUFBRzt3QkFDdEIsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsWUFBWSxFQUFFLFlBQVksQ0FBQyxjQUFjLENBQUM7cUJBQzFDO2dCQUNGO2dCQUNBLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUSxHQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTSxFQUFHLENBQUMsRUFBRTtvQkFDaEQseUJBQXlCLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7Z0JBQ3BEO1lBQ0Q7UUFDRDtRQUNBLENBQUMsRUFBRTtJQUNKO0lBQ0EsT0FBTyxRQUEyQjtBQUNuQztBQUVBLG1CQUFtQixLQUFvQixFQUFFLFdBQStCO0lBQ3ZFLEdBQUcsQ0FBQywyREFBTyxDQUFDLEtBQUssRUFBQyxHQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUU7UUFDdkMsTUFBTSxlQUFjLEVBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxjQUFjO1FBQ3RELEdBQUcsQ0FBQyxjQUFjLEVBQUU7WUFDbkIsR0FBRyxDQUFDLE9BQU8sZUFBYyxJQUFLLFVBQVUsRUFBRTtnQkFDekMsY0FBYyxDQUFDLEtBQUssQ0FBQyxPQUFrQixFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUM7WUFDM0Q7WUFBRSxLQUFLO2dCQUNOLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQWtCLEVBQUUsS0FBSyxDQUFDLFVBQVUsRUFBRSxjQUF3QixDQUFDO1lBQ3hGO1FBQ0Q7SUFDRDtBQUNEO0FBRUEsc0JBQXNCLEtBQW9CLEVBQUUsV0FBK0IsRUFBRSxpQkFBb0M7SUFDaEgsR0FBRyxDQUFDLDJEQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDbkIsTUFBTSxLQUFJLEVBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQzVDLE1BQU0sU0FBUSxFQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUMsR0FBSSxVQUFVO1FBQzVFLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ25CLE1BQU0sYUFBWSxFQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFO1lBQzNELFlBQVksQ0FBQyxRQUFRLEVBQUU7WUFDdkIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ25DO1FBQ0EsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFHLENBQUMsRUFBRSxFQUFDLEVBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQztRQUMxRDtJQUNEO0lBQUUsS0FBSztRQUNOLE1BQU0sUUFBTyxFQUFHLEtBQUssQ0FBQyxPQUFPO1FBQzdCLE1BQU0sV0FBVSxFQUFHLEtBQUssQ0FBQyxVQUFVO1FBQ25DLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUSxHQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTSxFQUFHLENBQUMsRUFBRTtZQUNoRCxJQUFJLENBQUMsSUFBSSxFQUFDLEVBQUcsQ0FBQyxFQUFFLEVBQUMsRUFBRyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDL0MsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixDQUFDO1lBQ2hFO1FBQ0Q7UUFDQSxNQUFNLGNBQWEsRUFBRyxVQUFVLENBQUMsYUFBYTtRQUM5QyxHQUFHLENBQUMsV0FBVSxHQUFJLGFBQWEsRUFBRTtZQUMvQixPQUF1QixDQUFDLEtBQUssQ0FBQyxjQUFhLEVBQUcsTUFBTTtZQUNyRCxNQUFNLGNBQWEsRUFBRztnQkFDckIsUUFBTyxHQUFJLE9BQU8sQ0FBQyxXQUFVLEdBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO2dCQUN4RSxLQUFLLENBQUMsUUFBTyxFQUFHLFNBQVM7WUFDMUIsQ0FBQztZQUNELEdBQUcsQ0FBQyxPQUFPLGNBQWEsSUFBSyxVQUFVLEVBQUU7Z0JBQ3hDLGFBQWEsQ0FBQyxPQUFrQixFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUM7Z0JBQzVELE1BQU07WUFDUDtZQUFFLEtBQUs7Z0JBQ04sV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBa0IsRUFBRSxVQUFVLEVBQUUsYUFBdUIsRUFBRSxhQUFhLENBQUM7Z0JBQzlGLE1BQU07WUFDUDtRQUNEO1FBQ0EsUUFBTyxHQUFJLE9BQU8sQ0FBQyxXQUFVLEdBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1FBQ3hFLEtBQUssQ0FBQyxRQUFPLEVBQUcsU0FBUztJQUMxQjtBQUNEO0FBRUEsOEJBQ0MsVUFBMkIsRUFDM0IsWUFBb0IsRUFDcEIsY0FBMEM7SUFFMUMsTUFBTSxVQUFTLEVBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQztJQUMxQyxHQUFHLENBQUMsMkRBQU8sQ0FBQyxTQUFTLEVBQUMsR0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDekMsTUFBTSxFQUFFO0lBQ1Q7SUFDQSxNQUFNLEVBQUUsSUFBRyxFQUFFLEVBQUcsU0FBUyxDQUFDLFVBQVU7SUFFcEMsR0FBRyxDQUFDLElBQUcsSUFBSyxVQUFTLEdBQUksSUFBRyxJQUFLLElBQUksRUFBRTtRQUN0QyxJQUFJLENBQUMsSUFBSSxFQUFDLEVBQUcsQ0FBQyxFQUFFLEVBQUMsRUFBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNDLEdBQUcsQ0FBQyxFQUFDLElBQUssWUFBWSxFQUFFO2dCQUN2QixNQUFNLEtBQUksRUFBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsRUFBRTtvQkFDMUIsSUFBSSxjQUFzQjtvQkFDMUIsTUFBTSxXQUFVLEVBQUksY0FBc0IsQ0FBQyxXQUFXLENBQUMsS0FBSSxHQUFJLFNBQVM7b0JBQ3hFLEdBQUcsQ0FBQywyREFBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO3dCQUN2QixlQUFjLEVBQUksU0FBUyxDQUFDLGlCQUF5QixDQUFDLEtBQUksR0FBSSxTQUFTO29CQUN4RTtvQkFBRSxLQUFLO3dCQUNOLGVBQWMsRUFBRyxTQUFTLENBQUMsR0FBRztvQkFDL0I7b0JBRUEsT0FBTyxDQUFDLElBQUksQ0FDWCxhQUFhLFVBQVUsbUxBQW1MLGNBQWMsOEJBQThCLENBQ3RQO29CQUNELEtBQUs7Z0JBQ047WUFDRDtRQUNEO0lBQ0Q7QUFDRDtBQUVBLHdCQUNDLFdBQTBCLEVBQzFCLFFBQXlCLEVBQ3pCLFdBQTRCLEVBQzVCLFdBQTRCLEVBQzVCLGNBQTBDLEVBQzFDLGlCQUFvQztJQUVwQyxZQUFXLEVBQUcsWUFBVyxHQUFJLFVBQVU7SUFDdkMsWUFBVyxFQUFHLFdBQVc7SUFDekIsTUFBTSxrQkFBaUIsRUFBRyxXQUFXLENBQUMsTUFBTTtJQUM1QyxNQUFNLGtCQUFpQixFQUFHLFdBQVcsQ0FBQyxNQUFNO0lBQzVDLE1BQU0sWUFBVyxFQUFHLGlCQUFpQixDQUFDLFdBQVk7SUFDbEQsTUFBTSxlQUFjLEVBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFFO0lBQ2xGLGtCQUFpQixvQkFBUSxpQkFBaUIsSUFBRSxLQUFLLEVBQUUsaUJBQWlCLENBQUMsTUFBSyxFQUFHLEVBQUMsRUFBRTtJQUNoRixJQUFJLFNBQVEsRUFBRyxDQUFDO0lBQ2hCLElBQUksU0FBUSxFQUFHLENBQUM7SUFDaEIsSUFBSSxDQUFTO0lBQ2IsSUFBSSxZQUFXLEVBQUcsS0FBSztJQUN2QixPQUFPLFNBQVEsRUFBRyxpQkFBaUIsRUFBRTtRQUNwQyxJQUFJLFNBQVEsRUFBRyxTQUFRLEVBQUcsa0JBQWtCLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVM7UUFDL0UsTUFBTSxTQUFRLEVBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUN0QyxHQUFHLENBQUMsMkRBQU8sQ0FBQyxRQUFRLEVBQUMsR0FBSSxPQUFPLFFBQVEsQ0FBQywyQkFBMEIsSUFBSyxVQUFVLEVBQUU7WUFDbkYsUUFBUSxDQUFDLFNBQVEsRUFBRywyREFBTyxDQUFDLFFBQVEsRUFBQyxHQUFJLFFBQVEsQ0FBQyxRQUFRO1lBQzFELHFCQUFxQixDQUFDLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQztRQUNuRDtRQUNBLEdBQUcsQ0FBQyxTQUFRLElBQUssVUFBUyxHQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUU7WUFDdkQsUUFBUSxFQUFFO1lBQ1YsUUFBUSxFQUFFO1lBQ1YsWUFBVztnQkFDVixTQUFTLENBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixpQkFBaUIsRUFDakIsV0FBVyxFQUNYLGNBQWMsRUFDZCxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUMzQixXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUMzQixHQUFJLFdBQVc7WUFDakIsUUFBUTtRQUNUO1FBRUEsTUFBTSxhQUFZLEVBQUcsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxTQUFRLEVBQUcsQ0FBQyxDQUFDO1FBQzFFLE1BQU0sU0FBUSxFQUFHLEdBQUcsR0FBRTtZQUNyQixJQUFJLG9CQUFtQixFQUFxQixTQUFTO1lBQ3JELElBQUksY0FBYSxFQUFHLFdBQVc7WUFDL0IsSUFBSSxVQUFTLEVBQUcsU0FBUSxFQUFHLENBQUM7WUFDNUIsSUFBSSxNQUFLLEVBQWtCLFdBQVcsQ0FBQyxRQUFRLENBQUM7WUFDaEQsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUNYLE1BQUssRUFBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixVQUFTLEVBQUcsQ0FBQztnQkFDYixjQUFhLEVBQUcsUUFBUTtZQUN6QjtZQUNBLEdBQUcsQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsSUFBSSxxQkFBb0IsRUFBRyxDQUFDLEtBQUssQ0FBQztnQkFDbEMsT0FBTyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUU7b0JBQ25DLE1BQU0sYUFBWSxFQUFHLG9CQUFvQixDQUFDLEtBQUssRUFBRztvQkFDbEQsR0FBRyxDQUFDLDJEQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7d0JBQzFCLE1BQU0sS0FBSSxFQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQzt3QkFDbkQsR0FBRyxDQUFDLEtBQUksR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTs0QkFDaEMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7d0JBQ2xEO29CQUNEO29CQUFFLEtBQUs7d0JBQ04sR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUU7NEJBQ3pCLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWEsSUFBSyxXQUFXLENBQUMsT0FBTyxFQUFFO2dDQUMvRCxLQUFLOzRCQUNOOzRCQUNBLG9CQUFtQixFQUFHLFlBQVksQ0FBQyxPQUFPOzRCQUMxQyxLQUFLO3dCQUNOO29CQUNEO29CQUNBLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFNLElBQUssRUFBQyxHQUFJLGFBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRTt3QkFDbEUsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDbkQsU0FBUyxFQUFFO29CQUNaO2dCQUNEO1lBQ0Q7WUFFQSxTQUFTLENBQ1IsUUFBUSxFQUNSLFdBQVcsRUFDWCxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVEsRUFBRyxDQUFDLENBQUMsRUFDL0IsbUJBQW1CLEVBQ25CLGlCQUFpQixFQUNqQixjQUFjLENBQ2Q7WUFDRCxTQUFTLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQztZQUNoQyxNQUFNLGFBQVksRUFBRyxRQUFRO1lBQzdCLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFFO2dCQUM3QyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQztZQUNoRSxDQUFDLENBQUM7UUFDSCxDQUFDO1FBRUQsR0FBRyxDQUFDLENBQUMsU0FBUSxHQUFJLGFBQVksSUFBSyxDQUFDLENBQUMsRUFBRTtZQUNyQyxRQUFRLEVBQUU7WUFDVixRQUFRLEVBQUU7WUFDVixRQUFRO1FBQ1Q7UUFFQSxNQUFNLFlBQVcsRUFBRyxHQUFHLEdBQUU7WUFDeEIsTUFBTSxhQUFZLEVBQUcsUUFBUTtZQUM3QixjQUFjLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRTtnQkFDN0Msb0JBQW9CLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUM7WUFDaEUsQ0FBQyxDQUFDO1lBQ0YsR0FBRyxDQUFDLDJEQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3RCLE1BQU0sS0FBSSxFQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztnQkFDL0MsR0FBRyxDQUFDLElBQUksRUFBRTtvQkFDVCxTQUFRLEVBQUcsSUFBSSxDQUFDLEtBQUs7Z0JBQ3RCO1lBQ0Q7WUFDQSxZQUFZLENBQUMsUUFBUyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQztRQUN4RCxDQUFDO1FBQ0QsTUFBTSxhQUFZLEVBQUcsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxTQUFRLEVBQUcsQ0FBQyxDQUFDO1FBRTFFLEdBQUcsQ0FBQyxhQUFZLElBQUssQ0FBQyxDQUFDLEVBQUU7WUFDeEIsV0FBVyxFQUFFO1lBQ2IsUUFBUSxFQUFFO1lBQ1YsUUFBUTtRQUNUO1FBRUEsUUFBUSxFQUFFO1FBQ1YsV0FBVyxFQUFFO1FBQ2IsUUFBUSxFQUFFO1FBQ1YsUUFBUSxFQUFFO0lBQ1g7SUFDQSxHQUFHLENBQUMsa0JBQWlCLEVBQUcsUUFBUSxFQUFFO1FBQ2pDO1FBQ0EsSUFBSSxDQUFDLEVBQUMsRUFBRyxRQUFRLEVBQUUsRUFBQyxFQUFHLGlCQUFpQixFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzlDLE1BQU0sYUFBWSxFQUFHLENBQUM7WUFDdEIsY0FBYyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUU7Z0JBQzdDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDO1lBQ2hFLENBQUMsQ0FBQztZQUNGLElBQUksY0FBYSxFQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbEMsR0FBRyxDQUFDLDJEQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQzNCLE1BQU0sS0FBSSxFQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztnQkFDcEQsR0FBRyxDQUFDLElBQUksRUFBRTtvQkFDVCxjQUFhLEVBQUcsSUFBSSxDQUFDLEtBQUs7Z0JBQzNCO1lBQ0Q7WUFDQSxZQUFZLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQztRQUM1RDtJQUNEO0lBQ0EsT0FBTyxXQUFXO0FBQ25CO0FBRUEscUJBQ0MsV0FBMEIsRUFDMUIsUUFBcUMsRUFDckMsaUJBQW9DLEVBQ3BDLGNBQTBDLEVBQzFDLGVBQWlDLFNBQVMsRUFDMUMsVUFBK0I7SUFFL0IsR0FBRyxDQUFDLFNBQVEsSUFBSyxTQUFTLEVBQUU7UUFDM0IsTUFBTTtJQUNQO0lBRUEsTUFBTSxlQUFjLEVBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFFO0lBQ2xGLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBSyxHQUFJLFdBQVUsSUFBSyxTQUFTLEVBQUU7UUFDckQsV0FBVSxFQUFHLGlFQUFTLENBQUMsV0FBVyxDQUFDLE9BQVEsQ0FBQyxVQUFVLENBQXVCO0lBQzlFO0lBQ0EsTUFBTSxZQUFXLEVBQUcsaUJBQWlCLENBQUMsV0FBWTtJQUNsRCxrQkFBaUIsb0JBQVEsaUJBQWlCLElBQUUsS0FBSyxFQUFFLGlCQUFpQixDQUFDLE1BQUssRUFBRyxFQUFDLEVBQUU7SUFFaEYsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFHLENBQUMsRUFBRSxFQUFDLEVBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN6QyxNQUFNLE1BQUssRUFBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sYUFBWSxFQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxFQUFHLENBQUMsQ0FBQztRQUUxQyxHQUFHLENBQUMsMkRBQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuQixHQUFHLENBQUMsY0FBYyxDQUFDLE1BQUssR0FBSSxVQUFVLEVBQUU7Z0JBQ3ZDLElBQUksV0FBVSxFQUF3QixTQUFTO2dCQUMvQyxPQUFPLEtBQUssQ0FBQyxRQUFPLElBQUssVUFBUyxHQUFJLFVBQVUsQ0FBQyxPQUFNLEVBQUcsQ0FBQyxFQUFFO29CQUM1RCxXQUFVLEVBQUcsVUFBVSxDQUFDLEtBQUssRUFBYTtvQkFDMUMsR0FBRyxDQUFDLFdBQVUsR0FBSSxVQUFVLENBQUMsUUFBTyxJQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUUsR0FBSSxTQUFTLENBQUMsRUFBRTt3QkFDaEYsS0FBSyxDQUFDLFFBQU8sRUFBRyxVQUFVO29CQUMzQjtnQkFDRDtZQUNEO1lBQ0EsU0FBUyxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxjQUFjLENBQUM7UUFDN0Y7UUFBRSxLQUFLO1lBQ04sU0FBUyxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDO1FBQ3pHO1FBQ0EsU0FBUyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUM7SUFDOUI7QUFDRDtBQUVBLG1DQUNDLE9BQWdCLEVBQ2hCLEtBQW9CLEVBQ3BCLGNBQTBDLEVBQzFDLGlCQUFvQztJQUVwQyxXQUFXLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQztJQUNoRixHQUFHLENBQUMsT0FBTyxLQUFLLENBQUMsMkJBQTBCLElBQUssV0FBVSxHQUFJLEtBQUssQ0FBQyxTQUFRLElBQUssU0FBUyxFQUFFO1FBQzNGLHFCQUFxQixDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQztJQUNoRDtJQUVBLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVSxHQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDckMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsVUFBVSxFQUFFLGlCQUFpQixDQUFDO1FBQ2xFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLENBQUM7UUFDekUsb0JBQW9CLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLElBQUksQ0FBQztRQUN4RSxNQUFNLE9BQU0sRUFBRyxLQUFLLENBQUMsTUFBTTtRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFFO1lBQ3JDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztRQUNyRixDQUFDLENBQUM7SUFDSDtJQUFFLEtBQUs7UUFDTixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUM7SUFDbkU7SUFDQSxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFHLElBQUssS0FBSSxHQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBRyxJQUFLLFNBQVMsRUFBRTtRQUN4RSxNQUFNLGFBQVksRUFBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFFO1FBQzNELFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQXNCLEVBQUUsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2hGO0lBQ0EsS0FBSyxDQUFDLFNBQVEsRUFBRyxJQUFJO0FBQ3RCO0FBRUEsbUJBQ0MsS0FBb0IsRUFDcEIsV0FBMEIsRUFDMUIsWUFBNkIsRUFDN0IsWUFBOEIsRUFDOUIsaUJBQW9DLEVBQ3BDLGNBQTBDLEVBQzFDLFVBQStCO0lBRS9CLElBQUksT0FBbUM7SUFDdkMsTUFBTSxlQUFjLEVBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFFO0lBQ2xGLEdBQUcsQ0FBQywyREFBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25CLElBQUksRUFBRSxrQkFBaUIsRUFBRSxFQUFHLEtBQUs7UUFDakMsTUFBTSxtQkFBa0IsRUFBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFFO1FBQ2pFLEdBQUcsQ0FBQyxDQUFDLGtGQUF1QixDQUE2QixpQkFBaUIsQ0FBQyxFQUFFO1lBQzVFLE1BQU0sS0FBSSxFQUFHLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBNkIsaUJBQWlCLENBQUM7WUFDN0YsR0FBRyxDQUFDLEtBQUksSUFBSyxJQUFJLEVBQUU7Z0JBQ2xCLE1BQU07WUFDUDtZQUNBLGtCQUFpQixFQUFHLElBQUk7UUFDekI7UUFDQSxNQUFNLFNBQVEsRUFBRyxJQUFJLGlCQUFpQixFQUFFO1FBQ3hDLEtBQUssQ0FBQyxTQUFRLEVBQUcsUUFBUTtRQUN6QixjQUFjLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUM7UUFDMUMsTUFBTSxhQUFZLEVBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBRTtRQUNyRCxZQUFZLENBQUMsV0FBVSxFQUFHLEdBQUcsR0FBRTtZQUM5QixZQUFZLENBQUMsTUFBSyxFQUFHLElBQUk7WUFDekIsR0FBRyxDQUFDLFlBQVksQ0FBQyxVQUFTLElBQUssS0FBSyxFQUFFO2dCQUNyQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLENBQUMsTUFBSyxDQUFFLENBQUM7Z0JBQzdFLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQztZQUNsQztRQUNELENBQUM7UUFDRCxZQUFZLENBQUMsVUFBUyxFQUFHLElBQUk7UUFDN0IsUUFBUSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUM7UUFDcEQsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ3hDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQzVDLE1BQU0sU0FBUSxFQUFHLFFBQVEsQ0FBQyxVQUFVLEVBQUU7UUFDdEMsWUFBWSxDQUFDLFVBQVMsRUFBRyxLQUFLO1FBQzlCLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDYixNQUFNLGlCQUFnQixFQUFHLHlCQUF5QixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7WUFDdEUsS0FBSyxDQUFDLFNBQVEsRUFBRyxnQkFBZ0I7WUFDakMsV0FBVyxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQztRQUNsRztRQUNBLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVcsQ0FBRSxDQUFDO1FBQ2pELFlBQVksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFO1FBQ2xDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFFO1lBQzdDLFlBQVksQ0FBQyxRQUFRLEVBQUU7UUFDeEIsQ0FBQyxDQUFDO0lBQ0g7SUFBRSxLQUFLO1FBQ04sR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFLLEdBQUksY0FBYyxDQUFDLGFBQVksSUFBSyxTQUFTLEVBQUU7WUFDdEUsUUFBTyxFQUFHLEtBQUssQ0FBQyxRQUFPLEVBQUcsaUJBQWlCLENBQUMsWUFBWTtZQUN4RCxjQUFjLENBQUMsYUFBWSxFQUFHLFNBQVM7WUFDdkMseUJBQXlCLENBQUMsT0FBUSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsaUJBQWlCLENBQUM7WUFDN0UsTUFBTTtRQUNQO1FBQ0EsTUFBTSxJQUFHLEVBQUcsV0FBVyxDQUFDLE9BQVEsQ0FBQyxhQUFhO1FBQzlDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFHLEdBQUksT0FBTyxLQUFLLENBQUMsS0FBSSxJQUFLLFFBQVEsRUFBRTtZQUNqRCxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQU8sSUFBSyxVQUFTLEdBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtnQkFDdkQsTUFBTSxXQUFVLEVBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFLLENBQUM7Z0JBQzFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBTyxJQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO29CQUNyRCxXQUFXLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQztnQkFDNUQ7Z0JBQUUsS0FBSztvQkFDTixXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7b0JBQzNDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVSxHQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2dCQUNoRjtnQkFDQSxLQUFLLENBQUMsUUFBTyxFQUFHLFVBQVU7WUFDM0I7WUFBRSxLQUFLO2dCQUNOLFFBQU8sRUFBRyxLQUFLLENBQUMsUUFBTyxFQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUssQ0FBQztnQkFDekQsR0FBRyxDQUFDLGFBQVksSUFBSyxTQUFTLEVBQUU7b0JBQy9CLFdBQVcsQ0FBQyxPQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7Z0JBQ3pEO2dCQUFFLEtBQUs7b0JBQ04sV0FBVyxDQUFDLE9BQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO2dCQUMxQztZQUNEO1FBQ0Q7UUFBRSxLQUFLO1lBQ04sR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFPLElBQUssU0FBUyxFQUFFO2dCQUNoQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUcsSUFBSyxLQUFLLEVBQUU7b0JBQ3hCLGtCQUFpQixvQkFBUSxpQkFBaUIsRUFBSyxFQUFFLFNBQVMsRUFBRSxjQUFhLENBQUUsQ0FBRTtnQkFDOUU7Z0JBQ0EsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFVBQVMsSUFBSyxTQUFTLEVBQUU7b0JBQzlDLFFBQU8sRUFBRyxLQUFLLENBQUMsUUFBTyxFQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQ3RGO2dCQUFFLEtBQUs7b0JBQ04sUUFBTyxFQUFHLEtBQUssQ0FBQyxRQUFPLEVBQUcsS0FBSyxDQUFDLFFBQU8sR0FBSSxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQ3hFO1lBQ0Q7WUFBRSxLQUFLO2dCQUNOLFFBQU8sRUFBRyxLQUFLLENBQUMsT0FBTztZQUN4QjtZQUNBLHlCQUF5QixDQUFDLE9BQW1CLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQztZQUN4RixHQUFHLENBQUMsYUFBWSxJQUFLLFNBQVMsRUFBRTtnQkFDL0IsV0FBVyxDQUFDLE9BQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQztZQUN6RDtZQUFFLEtBQUssR0FBRyxDQUFDLE9BQVEsQ0FBQyxXQUFVLElBQUssV0FBVyxDQUFDLE9BQVEsRUFBRTtnQkFDeEQsV0FBVyxDQUFDLE9BQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1lBQzFDO1FBQ0Q7SUFDRDtBQUNEO0FBRUEsbUJBQ0MsUUFBYSxFQUNiLEtBQW9CLEVBQ3BCLGlCQUFvQyxFQUNwQyxXQUEwQixFQUMxQixjQUEwQyxFQUMxQyxlQUFnQyxFQUNoQyxZQUE2QjtJQUU3QixHQUFHLENBQUMsMkRBQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNuQixNQUFNLEVBQUUsU0FBUSxFQUFFLEVBQUcsUUFBUTtRQUM3QixNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFJLEVBQUUsRUFBRyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBRTtRQUMvRCxNQUFNLGlCQUFnQixFQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxRQUFRO1FBQ2pFLE1BQU0sYUFBWSxFQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUU7UUFDckQsWUFBWSxDQUFDLFVBQVMsRUFBRyxJQUFJO1FBQzdCLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO1FBQ3BELFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUN4QyxRQUFRLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUM1QyxjQUFjLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUM7UUFDMUMsS0FBSyxDQUFDLFNBQVEsRUFBRyxRQUFRO1FBQ3pCLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBSyxJQUFLLElBQUksRUFBRTtZQUNoQyxNQUFNLFNBQVEsRUFBRyxRQUFRLENBQUMsVUFBVSxFQUFFO1lBQ3RDLFlBQVksQ0FBQyxVQUFTLEVBQUcsS0FBSztZQUM5QixLQUFLLENBQUMsU0FBUSxFQUFHLHlCQUF5QixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7WUFDOUQsY0FBYyxDQUFDLFdBQVcsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLENBQUM7UUFDNUc7UUFBRSxLQUFLO1lBQ04sWUFBWSxDQUFDLFVBQVMsRUFBRyxLQUFLO1lBQzlCLEtBQUssQ0FBQyxTQUFRLEVBQUcsZ0JBQWdCO1FBQ2xDO1FBQ0EsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBVyxDQUFFLENBQUM7UUFDakQsWUFBWSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7SUFDbkM7SUFBRSxLQUFLO1FBQ04sR0FBRyxDQUFDLFNBQVEsSUFBSyxLQUFLLEVBQUU7WUFDdkIsT0FBTyxLQUFLO1FBQ2I7UUFDQSxNQUFNLFFBQU8sRUFBRyxDQUFDLEtBQUssQ0FBQyxRQUFPLEVBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUNsRCxJQUFJLFlBQVcsRUFBRyxLQUFLO1FBQ3ZCLElBQUksUUFBTyxFQUFHLEtBQUs7UUFDbkIsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUcsR0FBSSxPQUFPLEtBQUssQ0FBQyxLQUFJLElBQUssUUFBUSxFQUFFO1lBQ2pELEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSSxJQUFLLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2pDLE1BQU0sV0FBVSxFQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFLLENBQUM7Z0JBQ3BFLE9BQU8sQ0FBQyxVQUFXLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7Z0JBQ3JELEtBQUssQ0FBQyxRQUFPLEVBQUcsVUFBVTtnQkFDMUIsWUFBVyxFQUFHLElBQUk7Z0JBQ2xCLE9BQU8sV0FBVztZQUNuQjtRQUNEO1FBQUUsS0FBSztZQUNOLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBRyxHQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUMsSUFBSyxDQUFDLEVBQUU7Z0JBQ3ZELGtCQUFpQixvQkFBUSxpQkFBaUIsRUFBSyxFQUFFLFNBQVMsRUFBRSxjQUFhLENBQUUsQ0FBRTtZQUM5RTtZQUNBLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUSxJQUFLLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ3pDLE1BQU0sU0FBUSxFQUFHLHlCQUF5QixDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDO2dCQUMxRSxLQUFLLENBQUMsU0FBUSxFQUFHLFFBQVE7Z0JBQ3pCLFFBQU87b0JBQ04sY0FBYyxDQUNiLEtBQUssRUFDTCxlQUFlLEVBQ2YsUUFBUSxDQUFDLFFBQVEsRUFDakIsUUFBUSxFQUNSLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsR0FBSSxPQUFPO1lBQ2Q7WUFFQSxNQUFNLG1CQUFrQixFQUFHLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDO1lBQzVFLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVSxHQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQztnQkFDN0YsUUFBTztvQkFDTixnQkFBZ0IsQ0FDZixPQUFPLEVBQ1Asa0JBQWtCLENBQUMsVUFBVSxFQUM3QixLQUFLLENBQUMsVUFBVSxFQUNoQixpQkFBaUIsRUFDakIsS0FBSyxFQUNMLEdBQUksT0FBTztnQkFDYixvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDO2dCQUMvRixNQUFNLE9BQU0sRUFBRyxLQUFLLENBQUMsTUFBTTtnQkFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRTtvQkFDckMsV0FBVyxDQUNWLE9BQU8sRUFDUCxLQUFLLEVBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUNiLGlCQUFpQixFQUNqQixLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksRUFDckIsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUNoQztnQkFDRixDQUFDLENBQUM7WUFDSDtZQUFFLEtBQUs7Z0JBQ04sUUFBTztvQkFDTixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLEVBQUM7d0JBQzdGLE9BQU87WUFDVDtZQUVBLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUcsSUFBSyxLQUFJLEdBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFHLElBQUssU0FBUyxFQUFFO2dCQUN4RSxNQUFNLGFBQVksRUFBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFFO2dCQUMzRCxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2pFO1FBQ0Q7UUFDQSxHQUFHLENBQUMsUUFBTyxHQUFJLEtBQUssQ0FBQyxXQUFVLEdBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUU7WUFDcEUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsT0FBa0IsRUFBRSxLQUFLLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDNUY7SUFDRDtBQUNEO0FBRUEsK0JBQStCLEtBQW9CLEVBQUUsaUJBQW9DO0lBQ3hGO0lBQ0EsS0FBSyxDQUFDLDRCQUEyQixFQUFHLEtBQUssQ0FBQyxVQUFVO0lBQ3BELE1BQU0sV0FBVSxFQUFHLEtBQUssQ0FBQywwQkFBMkIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUN0RSxNQUFNLGVBQWMsRUFBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUU7SUFDbEYsS0FBSyxDQUFDLFdBQVUsb0JBQVEsVUFBVSxFQUFLLEtBQUssQ0FBQywyQkFBMkIsQ0FBRTtJQUMxRSxjQUFjLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRTtRQUNoRCxNQUFNLFdBQVUsb0JBQ1osS0FBSyxDQUFDLDBCQUEyQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQ25ELEtBQUssQ0FBQywyQkFBMkIsQ0FDcEM7UUFDRCxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsT0FBbUIsRUFBRSxLQUFLLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQztRQUM1RixLQUFLLENBQUMsV0FBVSxFQUFHLFVBQVU7SUFDOUIsQ0FBQyxDQUFDO0FBQ0g7QUFFQSxvQ0FBb0MsaUJBQW9DO0lBQ3ZFLE1BQU0sZUFBYyxFQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBRTtJQUNsRixHQUFHLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRTtRQUNsRCxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFO1lBQzNCLE9BQU8sY0FBYyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRTtnQkFDckQsTUFBTSxTQUFRLEVBQUcsY0FBYyxDQUFDLHVCQUF1QixDQUFDLEtBQUssRUFBRTtnQkFDL0QsU0FBUSxHQUFJLFFBQVEsRUFBRTtZQUN2QjtRQUNEO1FBQUUsS0FBSztZQUNOLDZEQUFNLENBQUMscUJBQXFCLENBQUMsR0FBRyxHQUFFO2dCQUNqQyxPQUFPLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUU7b0JBQ3JELE1BQU0sU0FBUSxFQUFHLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLEVBQUU7b0JBQy9ELFNBQVEsR0FBSSxRQUFRLEVBQUU7Z0JBQ3ZCO1lBQ0QsQ0FBQyxDQUFDO1FBQ0g7SUFDRDtBQUNEO0FBRUEsaUNBQWlDLGlCQUFvQztJQUNwRSxNQUFNLGVBQWMsRUFBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUU7SUFDbEYsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRTtRQUMzQixPQUFPLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUU7WUFDbEQsTUFBTSxTQUFRLEVBQUcsY0FBYyxDQUFDLG9CQUFvQixDQUFDLEtBQUssRUFBRTtZQUM1RCxTQUFRLEdBQUksUUFBUSxFQUFFO1FBQ3ZCO0lBQ0Q7SUFBRSxLQUFLO1FBQ04sR0FBRyxDQUFDLDZEQUFNLENBQUMsbUJBQW1CLEVBQUU7WUFDL0IsNkRBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEdBQUU7Z0JBQy9CLE9BQU8sY0FBYyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRTtvQkFDbEQsTUFBTSxTQUFRLEVBQUcsY0FBYyxDQUFDLG9CQUFvQixDQUFDLEtBQUssRUFBRTtvQkFDNUQsU0FBUSxHQUFJLFFBQVEsRUFBRTtnQkFDdkI7WUFDRCxDQUFDLENBQUM7UUFDSDtRQUFFLEtBQUs7WUFDTixVQUFVLENBQUMsR0FBRyxHQUFFO2dCQUNmLE9BQU8sY0FBYyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRTtvQkFDbEQsTUFBTSxTQUFRLEVBQUcsY0FBYyxDQUFDLG9CQUFvQixDQUFDLEtBQUssRUFBRTtvQkFDNUQsU0FBUSxHQUFJLFFBQVEsRUFBRTtnQkFDdkI7WUFDRCxDQUFDLENBQUM7UUFDSDtJQUNEO0FBQ0Q7QUFFQSx3QkFBd0IsaUJBQW9DO0lBQzNELE1BQU0sZUFBYyxFQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBRTtJQUNsRixHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFO1FBQzNCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztJQUMxQjtJQUFFLEtBQUssR0FBRyxDQUFDLGNBQWMsQ0FBQyxnQkFBZSxJQUFLLFNBQVMsRUFBRTtRQUN4RCxjQUFjLENBQUMsZ0JBQWUsRUFBRyw2REFBTSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsR0FBRTtZQUNsRSxNQUFNLENBQUMsaUJBQWlCLENBQUM7UUFDMUIsQ0FBQyxDQUFDO0lBQ0g7QUFDRDtBQUVBLGdCQUFnQixpQkFBb0M7SUFDbkQsTUFBTSxlQUFjLEVBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFFO0lBQ2xGLGNBQWMsQ0FBQyxnQkFBZSxFQUFHLFNBQVM7SUFDMUMsTUFBTSxZQUFXLEVBQUcsY0FBYyxDQUFDLFdBQVc7SUFDOUMsTUFBTSxRQUFPLEVBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQztJQUNoQyxjQUFjLENBQUMsWUFBVyxFQUFHLEVBQUU7SUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBSyxFQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDekMsTUFBTSxtQkFBa0IsRUFBRyxFQUFFO0lBQzdCLE9BQU8sT0FBTyxDQUFDLE1BQU0sRUFBRTtRQUN0QixNQUFNLEVBQUUsU0FBUSxFQUFFLEVBQUcsT0FBTyxDQUFDLEtBQUssRUFBRztRQUNyQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUMsR0FBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFDLElBQUssQ0FBQyxDQUFDLEVBQUU7WUFDN0Usa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNqQyxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQUssRUFBRSxFQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFFO1lBQ3pELE1BQU0sYUFBWSxFQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUU7WUFDckQsTUFBTSxhQUFZLEVBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUU7WUFDbEQsU0FBUyxDQUNSLEtBQUssRUFDTCxlQUFlLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxFQUN2QyxpQkFBaUIsRUFDakIsV0FBVyxFQUNYLFFBQVEsRUFDUixZQUFZLEVBQ1osWUFBWSxDQUNaO1FBQ0Y7SUFDRDtJQUNBLHVCQUF1QixDQUFDLGlCQUFpQixDQUFDO0lBQzFDLDBCQUEwQixDQUFDLGlCQUFpQixDQUFDO0FBQzlDO0FBRU8sTUFBTSxJQUFHLEVBQUc7SUFDbEIsTUFBTSxFQUFFLFVBQ1AsVUFBbUIsRUFDbkIsUUFBb0MsRUFDcEMsb0JBQWdELEVBQUU7UUFFbEQsTUFBTSxhQUFZLEVBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBRTtRQUNyRCxNQUFNLHNCQUFxQixFQUFHLG9CQUFvQixDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQztRQUMvRSxNQUFNLGVBQWMsRUFBbUI7WUFDdEMsb0JBQW9CLEVBQUUsRUFBRTtZQUN4Qix1QkFBdUIsRUFBRSxFQUFFO1lBQzNCLE9BQU8sRUFBRSxJQUFJLDhEQUFPLEVBQUU7WUFDdEIsZUFBZSxFQUFFLFNBQVM7WUFDMUIsV0FBVyxFQUFFLEVBQUU7WUFDZixLQUFLLEVBQUUsaUJBQWlCLENBQUMsTUFBSyxHQUFJLEtBQUs7WUFDdkMsWUFBWSxFQUFFLGlCQUFpQixDQUFDO1NBQ2hDO1FBQ0QsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUM7UUFFL0MscUJBQXFCLENBQUMsU0FBUSxFQUFHLFVBQVU7UUFDM0MsTUFBTSxZQUFXLEVBQUcsYUFBYSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQztRQUNqRSxNQUFNLEtBQUksRUFBRyxlQUFlLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQztRQUNwRCxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsWUFBVyxDQUFFLENBQUM7UUFDdkQsWUFBWSxDQUFDLFdBQVUsRUFBRyxHQUFHLEdBQUU7WUFDOUIsWUFBWSxDQUFDLE1BQUssRUFBRyxJQUFJO1lBQ3pCLEdBQUcsQ0FBQyxZQUFZLENBQUMsVUFBUyxJQUFLLEtBQUssRUFBRTtnQkFDckMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixDQUFDLE1BQUssQ0FBRSxDQUFDO2dCQUNqRixjQUFjLENBQUMscUJBQXFCLENBQUM7WUFDdEM7UUFDRCxDQUFDO1FBQ0QsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQzNFLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFFO1lBQzdDLFlBQVksQ0FBQyxRQUFRLEVBQUU7UUFDeEIsQ0FBQyxDQUFDO1FBQ0YsMEJBQTBCLENBQUMscUJBQXFCLENBQUM7UUFDakQsdUJBQXVCLENBQUMscUJBQXFCLENBQUM7UUFDOUMsT0FBTztZQUNOLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQztTQUMvQjtJQUNGLENBQUM7SUFDRCxNQUFNLEVBQUUsVUFBUyxRQUFvQyxFQUFFLGlCQUE4QztRQUNwRyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLENBQUM7SUFDL0UsQ0FBQztJQUNELEtBQUssRUFBRSxVQUNOLE9BQWdCLEVBQ2hCLFFBQW9DLEVBQ3BDLG9CQUFnRCxFQUFFO1FBRWxELGlCQUFpQixDQUFDLE1BQUssRUFBRyxJQUFJO1FBQzlCLGlCQUFpQixDQUFDLGFBQVksRUFBRyxPQUFPO1FBQ3hDLE1BQU0sV0FBVSxFQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQXFCLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixDQUFDO1FBQzFGLE1BQU0sZUFBYyxFQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUU7UUFDdkQsY0FBYyxDQUFDLE1BQUssRUFBRyxLQUFLO1FBQzVCLE9BQU8sVUFBVTtJQUNsQjtDQUNBLENBQUM7QUFBQTtBQUFBOzs7Ozs7Ozs7O0FDbnFDRjtBQUNBLElBQUksSUFBRyxFQUFHLG1CQUFPLENBQUMsNkNBQTBCLENBQUM7QUFFN0MsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO0lBQ3JDLEdBQUcsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztBQUMzQzs7Ozs7Ozs7QUNMQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7QUN2THRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsK0RBQStEO0FBQy9EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDL0UscUJBQXFCLHVEQUF1RDs7QUFFckU7QUFDUDtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTs7QUFFTztBQUNQLDRDQUE0QyxPQUFPO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCxjQUFjO0FBQzFFO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSw0Q0FBNEMsUUFBUTtBQUNwRDtBQUNBOztBQUVPO0FBQ1AsbUNBQW1DLG9DQUFvQztBQUN2RTs7QUFFTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBLG1DQUFtQyxNQUFNLDZCQUE2QixFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ2pHLGtDQUFrQyxNQUFNLGlDQUFpQyxFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ3BHLCtCQUErQixpRUFBaUUsdUJBQXVCLEVBQUUsNEJBQTRCO0FBQ3JKO0FBQ0EsS0FBSztBQUNMOztBQUVPO0FBQ1AsYUFBYSw2QkFBNkIsMEJBQTBCLGFBQWEsRUFBRSxxQkFBcUI7QUFDeEcsZ0JBQWdCLHFEQUFxRCxvRUFBb0UsYUFBYSxFQUFFO0FBQ3hKLHNCQUFzQixzQkFBc0IscUJBQXFCLEdBQUc7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDLGtDQUFrQyxTQUFTO0FBQzNDLGtDQUFrQyxXQUFXLFVBQVU7QUFDdkQseUNBQXlDLGNBQWM7QUFDdkQ7QUFDQSw2R0FBNkcsT0FBTyxVQUFVO0FBQzlILGdGQUFnRixpQkFBaUIsT0FBTztBQUN4Ryx3REFBd0QsZ0JBQWdCLFFBQVEsT0FBTztBQUN2Riw4Q0FBOEMsZ0JBQWdCLGdCQUFnQixPQUFPO0FBQ3JGO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxTQUFTLFlBQVksYUFBYSxPQUFPLEVBQUUsVUFBVSxXQUFXO0FBQ2hFLG1DQUFtQyxTQUFTO0FBQzVDO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsTUFBTSxnQkFBZ0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFTztBQUNQLDRCQUE0QixzQkFBc0I7QUFDbEQ7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSxpQkFBaUIsc0ZBQXNGLGFBQWEsRUFBRTtBQUN0SCxzQkFBc0IsZ0NBQWdDLHFDQUFxQywwQ0FBMEMsRUFBRSxFQUFFLEdBQUc7QUFDNUksMkJBQTJCLE1BQU0sZUFBZSxFQUFFLFlBQVksb0JBQW9CLEVBQUU7QUFDcEYsc0JBQXNCLG9HQUFvRztBQUMxSCw2QkFBNkIsdUJBQXVCO0FBQ3BELDRCQUE0Qix3QkFBd0I7QUFDcEQsMkJBQTJCLHlEQUF5RDtBQUNwRjs7QUFFTztBQUNQO0FBQ0EsaUJBQWlCLDRDQUE0QyxTQUFTLEVBQUUscURBQXFELGFBQWEsRUFBRTtBQUM1SSx5QkFBeUIsZ0NBQWdDLG9CQUFvQixnREFBZ0QsZ0JBQWdCLEdBQUc7QUFDaEo7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQLGdDQUFnQyx1Q0FBdUMsYUFBYSxFQUFFLEVBQUUsT0FBTyxrQkFBa0I7QUFDakg7QUFDQTs7Ozs7Ozs7QUNyS0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7OztBQ3BCQTtBQUEwQztBQUVuQyxNQUFNLEtBQUksYUFBNEIsQ0FBQztBQUFBO0FBQUE7Ozs7Ozs7O0FDRjlDLGlCQUFpQixxQkFBdUIsa0I7Ozs7Ozs7QUNBeEMseUM7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEU7QUFDaEM7QUFDZDtBQUVoQyxNQUFNLFNBQVMsR0FBRyw0R0FBYyxDQUFDLG9FQUFVLENBQUMsQ0FBQztBQUM3QyxNQUFNLFNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQ2xDLFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUscURBQUksRUFBRSxDQUFDLENBQUM7QUFFeEMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7Ozs7QUNSbkI7QUFBQTtBQUFBO0FBQUE7QUFBZ0U7QUFDZDtBQUVEO0FBRWpELE1BQU0sSUFBSSxHQUFHLG1CQUFPLENBQUMsb0JBQW1CLENBQUMsQ0FBQztBQUUxQzs7OztHQUlHO0FBQ0ksZ0JBQWlCLFNBQVEsdUZBQTRCO0lBQ2pELE1BQU07UUFDZixNQUFNLENBQUMsZ0ZBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsOERBQVEsRUFBRSxFQUFFO1lBQ3RDLGdGQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsOERBQVEsRUFBRSxDQUFDO1lBQzFDLGdGQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLCtEQUFTLEVBQUUsRUFBRSxDQUFDLFVBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1NBQ3JFLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRDtBQUFBO0FBQUE7QUFFYyxtRUFBVSxFQUFDOzs7Ozs7OztBQ3JCMUI7QUFDQSxrQkFBa0IscUwiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiZmVhdHVyZXNcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZmVhdHVyZXNcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZmVhdHVyZXNcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiaW1wb3J0IHsgSGFuZGxlIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IGNyZWF0ZUNvbXBvc2l0ZUhhbmRsZSB9IGZyb20gJy4vbGFuZyc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICcuLi9zaGltL1Byb21pc2UnO1xuXG4vKipcbiAqIE5vIG9wZXJhdGlvbiBmdW5jdGlvbiB0byByZXBsYWNlIG93biBvbmNlIGluc3RhbmNlIGlzIGRlc3RvcnllZFxuICovXG5mdW5jdGlvbiBub29wKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbn1cblxuLyoqXG4gKiBObyBvcCBmdW5jdGlvbiB1c2VkIHRvIHJlcGxhY2Ugb3duLCBvbmNlIGluc3RhbmNlIGhhcyBiZWVuIGRlc3RvcnllZFxuICovXG5mdW5jdGlvbiBkZXN0cm95ZWQoKTogbmV2ZXIge1xuXHR0aHJvdyBuZXcgRXJyb3IoJ0NhbGwgbWFkZSB0byBkZXN0cm95ZWQgbWV0aG9kJyk7XG59XG5cbmV4cG9ydCBjbGFzcyBEZXN0cm95YWJsZSB7XG5cdC8qKlxuXHQgKiByZWdpc3RlciBoYW5kbGVzIGZvciB0aGUgaW5zdGFuY2Vcblx0ICovXG5cdHByaXZhdGUgaGFuZGxlczogSGFuZGxlW107XG5cblx0LyoqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKi9cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5oYW5kbGVzID0gW107XG5cdH1cblxuXHQvKipcblx0ICogUmVnaXN0ZXIgaGFuZGxlcyBmb3IgdGhlIGluc3RhbmNlIHRoYXQgd2lsbCBiZSBkZXN0cm95ZWQgd2hlbiBgdGhpcy5kZXN0cm95YCBpcyBjYWxsZWRcblx0ICpcblx0ICogQHBhcmFtIHtIYW5kbGV9IGhhbmRsZSBUaGUgaGFuZGxlIHRvIGFkZCBmb3IgdGhlIGluc3RhbmNlXG5cdCAqIEByZXR1cm5zIHtIYW5kbGV9IGEgaGFuZGxlIGZvciB0aGUgaGFuZGxlLCByZW1vdmVzIHRoZSBoYW5kbGUgZm9yIHRoZSBpbnN0YW5jZSBhbmQgY2FsbHMgZGVzdHJveVxuXHQgKi9cblx0b3duKGhhbmRsZXM6IEhhbmRsZSB8IEhhbmRsZVtdKTogSGFuZGxlIHtcblx0XHRjb25zdCBoYW5kbGUgPSBBcnJheS5pc0FycmF5KGhhbmRsZXMpID8gY3JlYXRlQ29tcG9zaXRlSGFuZGxlKC4uLmhhbmRsZXMpIDogaGFuZGxlcztcblx0XHRjb25zdCB7IGhhbmRsZXM6IF9oYW5kbGVzIH0gPSB0aGlzO1xuXHRcdF9oYW5kbGVzLnB1c2goaGFuZGxlKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZGVzdHJveSgpIHtcblx0XHRcdFx0X2hhbmRsZXMuc3BsaWNlKF9oYW5kbGVzLmluZGV4T2YoaGFuZGxlKSk7XG5cdFx0XHRcdGhhbmRsZS5kZXN0cm95KCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXN0cnB5cyBhbGwgaGFuZGVycyByZWdpc3RlcmVkIGZvciB0aGUgaW5zdGFuY2Vcblx0ICpcblx0ICogQHJldHVybnMge1Byb21pc2U8YW55fSBhIHByb21pc2UgdGhhdCByZXNvbHZlcyBvbmNlIGFsbCBoYW5kbGVzIGhhdmUgYmVlbiBkZXN0cm95ZWRcblx0ICovXG5cdGRlc3Ryb3koKTogUHJvbWlzZTxhbnk+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblx0XHRcdHRoaXMuaGFuZGxlcy5mb3JFYWNoKChoYW5kbGUpID0+IHtcblx0XHRcdFx0aGFuZGxlICYmIGhhbmRsZS5kZXN0cm95ICYmIGhhbmRsZS5kZXN0cm95KCk7XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuZGVzdHJveSA9IG5vb3A7XG5cdFx0XHR0aGlzLm93biA9IGRlc3Ryb3llZDtcblx0XHRcdHJlc29sdmUodHJ1ZSk7XG5cdFx0fSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGVzdHJveWFibGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gRGVzdHJveWFibGUudHMiLCJpbXBvcnQgTWFwIGZyb20gJy4uL3NoaW0vTWFwJztcbmltcG9ydCB7IEhhbmRsZSwgRXZlbnRUeXBlLCBFdmVudE9iamVjdCB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBEZXN0cm95YWJsZSB9IGZyb20gJy4vRGVzdHJveWFibGUnO1xuXG4vKipcbiAqIE1hcCBvZiBjb21wdXRlZCByZWd1bGFyIGV4cHJlc3Npb25zLCBrZXllZCBieSBzdHJpbmdcbiAqL1xuY29uc3QgcmVnZXhNYXAgPSBuZXcgTWFwPHN0cmluZywgUmVnRXhwPigpO1xuXG4vKipcbiAqIERldGVybWluZXMgaXMgdGhlIGV2ZW50IHR5cGUgZ2xvYiBoYXMgYmVlbiBtYXRjaGVkXG4gKlxuICogQHJldHVybnMgYm9vbGVhbiB0aGF0IGluZGljYXRlcyBpZiB0aGUgZ2xvYiBpcyBtYXRjaGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0dsb2JNYXRjaChnbG9iU3RyaW5nOiBzdHJpbmcgfCBzeW1ib2wsIHRhcmdldFN0cmluZzogc3RyaW5nIHwgc3ltYm9sKTogYm9vbGVhbiB7XG5cdGlmICh0eXBlb2YgdGFyZ2V0U3RyaW5nID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgZ2xvYlN0cmluZyA9PT0gJ3N0cmluZycgJiYgZ2xvYlN0cmluZy5pbmRleE9mKCcqJykgIT09IC0xKSB7XG5cdFx0bGV0IHJlZ2V4OiBSZWdFeHA7XG5cdFx0aWYgKHJlZ2V4TWFwLmhhcyhnbG9iU3RyaW5nKSkge1xuXHRcdFx0cmVnZXggPSByZWdleE1hcC5nZXQoZ2xvYlN0cmluZykhO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZWdleCA9IG5ldyBSZWdFeHAoYF4ke2dsb2JTdHJpbmcucmVwbGFjZSgvXFwqL2csICcuKicpfSRgKTtcblx0XHRcdHJlZ2V4TWFwLnNldChnbG9iU3RyaW5nLCByZWdleCk7XG5cdFx0fVxuXHRcdHJldHVybiByZWdleC50ZXN0KHRhcmdldFN0cmluZyk7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIGdsb2JTdHJpbmcgPT09IHRhcmdldFN0cmluZztcblx0fVxufVxuXG5leHBvcnQgdHlwZSBFdmVudGVkQ2FsbGJhY2s8VCA9IEV2ZW50VHlwZSwgRSBleHRlbmRzIEV2ZW50T2JqZWN0PFQ+ID0gRXZlbnRPYmplY3Q8VD4+ID0ge1xuXHQvKipcblx0ICogQSBjYWxsYmFjayB0aGF0IHRha2VzIGFuIGBldmVudGAgYXJndW1lbnRcblx0ICpcblx0ICogQHBhcmFtIGV2ZW50IFRoZSBldmVudCBvYmplY3Rcblx0ICovXG5cblx0KGV2ZW50OiBFKTogYm9vbGVhbiB8IHZvaWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbUV2ZW50VHlwZXM8VCBleHRlbmRzIEV2ZW50T2JqZWN0PGFueT4gPSBFdmVudE9iamVjdDxhbnk+PiB7XG5cdFtpbmRleDogc3RyaW5nXTogVDtcbn1cblxuLyoqXG4gKiBBIHR5cGUgd2hpY2ggaXMgZWl0aGVyIGEgdGFyZ2V0ZWQgZXZlbnQgbGlzdGVuZXIgb3IgYW4gYXJyYXkgb2YgbGlzdGVuZXJzXG4gKiBAdGVtcGxhdGUgVCBUaGUgdHlwZSBvZiB0YXJnZXQgZm9yIHRoZSBldmVudHNcbiAqIEB0ZW1wbGF0ZSBFIFRoZSBldmVudCB0eXBlIGZvciB0aGUgZXZlbnRzXG4gKi9cbmV4cG9ydCB0eXBlIEV2ZW50ZWRDYWxsYmFja09yQXJyYXk8VCA9IEV2ZW50VHlwZSwgRSBleHRlbmRzIEV2ZW50T2JqZWN0PFQ+ID0gRXZlbnRPYmplY3Q8VD4+ID1cblx0fCBFdmVudGVkQ2FsbGJhY2s8VCwgRT5cblx0fCBFdmVudGVkQ2FsbGJhY2s8VCwgRT5bXTtcblxuLyoqXG4gKiBFdmVudCBDbGFzc1xuICovXG5leHBvcnQgY2xhc3MgRXZlbnRlZDxcblx0TSBleHRlbmRzIEN1c3RvbUV2ZW50VHlwZXMgPSB7fSxcblx0VCA9IEV2ZW50VHlwZSxcblx0TyBleHRlbmRzIEV2ZW50T2JqZWN0PFQ+ID0gRXZlbnRPYmplY3Q8VD5cbj4gZXh0ZW5kcyBEZXN0cm95YWJsZSB7XG5cdC8vIFRoZSBmb2xsb3dpbmcgbWVtYmVyIGlzIHB1cmVseSBzbyBUeXBlU2NyaXB0IHJlbWVtYmVycyB0aGUgdHlwZSBvZiBgTWAgd2hlbiBleHRlbmRpbmcgc29cblx0Ly8gdGhhdCB0aGUgdXRpbGl0aWVzIGluIGBvbi50c2Agd2lsbCB3b3JrIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMjAzNDhcblx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG5cdHByb3RlY3RlZCBfX3R5cGVNYXBfXz86IE07XG5cdC8qKlxuXHQgKiBtYXAgb2YgbGlzdGVuZXJzIGtleWVkIGJ5IGV2ZW50IHR5cGVcblx0ICovXG5cdHByb3RlY3RlZCBsaXN0ZW5lcnNNYXA6IE1hcDxUIHwga2V5b2YgTSwgRXZlbnRlZENhbGxiYWNrPFQsIE8+W10+ID0gbmV3IE1hcCgpO1xuXG5cdC8qKlxuXHQgKiBFbWl0cyB0aGUgZXZlbnQgb2JqZWN0IGZvciB0aGUgc3BlY2lmaWVkIHR5cGVcblx0ICpcblx0ICogQHBhcmFtIGV2ZW50IHRoZSBldmVudCB0byBlbWl0XG5cdCAqL1xuXHRlbWl0PEsgZXh0ZW5kcyBrZXlvZiBNPihldmVudDogTVtLXSk6IHZvaWQ7XG5cdGVtaXQoZXZlbnQ6IE8pOiB2b2lkO1xuXHRlbWl0KGV2ZW50OiBhbnkpOiB2b2lkIHtcblx0XHR0aGlzLmxpc3RlbmVyc01hcC5mb3JFYWNoKChtZXRob2RzLCB0eXBlKSA9PiB7XG5cdFx0XHRpZiAoaXNHbG9iTWF0Y2godHlwZSBhcyBhbnksIGV2ZW50LnR5cGUpKSB7XG5cdFx0XHRcdFsuLi5tZXRob2RzXS5mb3JFYWNoKChtZXRob2QpID0+IHtcblx0XHRcdFx0XHRtZXRob2QuY2FsbCh0aGlzLCBldmVudCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhdGNoIGFsbCBoYW5kbGVyIGZvciB2YXJpb3VzIGNhbGwgc2lnbmF0dXJlcy4gVGhlIHNpZ25hdHVyZXMgYXJlIGRlZmluZWQgaW5cblx0ICogYEJhc2VFdmVudGVkRXZlbnRzYC4gIFlvdSBjYW4gYWRkIHlvdXIgb3duIGV2ZW50IHR5cGUgLT4gaGFuZGxlciB0eXBlcyBieSBleHRlbmRpbmdcblx0ICogYEJhc2VFdmVudGVkRXZlbnRzYC4gIFNlZSBleGFtcGxlIGZvciBkZXRhaWxzLlxuXHQgKlxuXHQgKiBAcGFyYW0gYXJnc1xuXHQgKlxuXHQgKiBAZXhhbXBsZVxuXHQgKlxuXHQgKiBpbnRlcmZhY2UgV2lkZ2V0QmFzZUV2ZW50cyBleHRlbmRzIEJhc2VFdmVudGVkRXZlbnRzIHtcblx0ICogICAgICh0eXBlOiAncHJvcGVydGllczpjaGFuZ2VkJywgaGFuZGxlcjogUHJvcGVydGllc0NoYW5nZWRIYW5kbGVyKTogSGFuZGxlO1xuXHQgKiB9XG5cdCAqIGNsYXNzIFdpZGdldEJhc2UgZXh0ZW5kcyBFdmVudGVkIHtcblx0ICogICAgb246IFdpZGdldEJhc2VFdmVudHM7XG5cdCAqIH1cblx0ICpcblx0ICogQHJldHVybiB7YW55fVxuXHQgKi9cblx0b248SyBleHRlbmRzIGtleW9mIE0+KHR5cGU6IEssIGxpc3RlbmVyOiBFdmVudGVkQ2FsbGJhY2tPckFycmF5PEssIE1bS10+KTogSGFuZGxlO1xuXHRvbih0eXBlOiBULCBsaXN0ZW5lcjogRXZlbnRlZENhbGxiYWNrT3JBcnJheTxULCBPPik6IEhhbmRsZTtcblx0b24odHlwZTogYW55LCBsaXN0ZW5lcjogRXZlbnRlZENhbGxiYWNrT3JBcnJheTxhbnksIGFueT4pOiBIYW5kbGUge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGxpc3RlbmVyKSkge1xuXHRcdFx0Y29uc3QgaGFuZGxlcyA9IGxpc3RlbmVyLm1hcCgobGlzdGVuZXIpID0+IHRoaXMuX2FkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSk7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRkZXN0cm95KCkge1xuXHRcdFx0XHRcdGhhbmRsZXMuZm9yRWFjaCgoaGFuZGxlKSA9PiBoYW5kbGUuZGVzdHJveSgpKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2FkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcblx0fVxuXG5cdHByaXZhdGUgX2FkZExpc3RlbmVyKHR5cGU6IFQgfCBrZXlvZiBNLCBsaXN0ZW5lcjogRXZlbnRlZENhbGxiYWNrPFQsIE8+KSB7XG5cdFx0Y29uc3QgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNNYXAuZ2V0KHR5cGUpIHx8IFtdO1xuXHRcdGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblx0XHR0aGlzLmxpc3RlbmVyc01hcC5zZXQodHlwZSwgbGlzdGVuZXJzKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZGVzdHJveTogKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc01hcC5nZXQodHlwZSkgfHwgW107XG5cdFx0XHRcdGxpc3RlbmVycy5zcGxpY2UobGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpLCAxKTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50ZWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gRXZlbnRlZC50cyIsImltcG9ydCBoYXMsIHsgYWRkIH0gZnJvbSAnLi4vLi4vaGFzL2hhcyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4uL2dsb2JhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGhhcztcbmV4cG9ydCAqIGZyb20gJy4uLy4uL2hhcy9oYXMnO1xuXG4vKiBFQ01BU2NyaXB0IDYgYW5kIDcgRmVhdHVyZXMgKi9cblxuLyogQXJyYXkgKi9cbmFkZChcblx0J2VzNi1hcnJheScsXG5cdCgpID0+IHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Wydmcm9tJywgJ29mJ10uZXZlcnkoKGtleSkgPT4ga2V5IGluIGdsb2JhbC5BcnJheSkgJiZcblx0XHRcdFsnZmluZEluZGV4JywgJ2ZpbmQnLCAnY29weVdpdGhpbiddLmV2ZXJ5KChrZXkpID0+IGtleSBpbiBnbG9iYWwuQXJyYXkucHJvdG90eXBlKVxuXHRcdCk7XG5cdH0sXG5cdHRydWVcbik7XG5cbmFkZChcblx0J2VzNi1hcnJheS1maWxsJyxcblx0KCkgPT4ge1xuXHRcdGlmICgnZmlsbCcgaW4gZ2xvYmFsLkFycmF5LnByb3RvdHlwZSkge1xuXHRcdFx0LyogU29tZSB2ZXJzaW9ucyBvZiBTYWZhcmkgZG8gbm90IHByb3Blcmx5IGltcGxlbWVudCB0aGlzICovXG5cdFx0XHRyZXR1cm4gKDxhbnk+WzFdKS5maWxsKDksIE51bWJlci5QT1NJVElWRV9JTkZJTklUWSlbMF0gPT09IDE7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0dHJ1ZVxuKTtcblxuYWRkKCdlczctYXJyYXknLCAoKSA9PiAnaW5jbHVkZXMnIGluIGdsb2JhbC5BcnJheS5wcm90b3R5cGUsIHRydWUpO1xuXG4vKiBNYXAgKi9cbmFkZChcblx0J2VzNi1tYXAnLFxuXHQoKSA9PiB7XG5cdFx0aWYgKHR5cGVvZiBnbG9iYWwuTWFwID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHQvKlxuXHRcdElFMTEgYW5kIG9sZGVyIHZlcnNpb25zIG9mIFNhZmFyaSBhcmUgbWlzc2luZyBjcml0aWNhbCBFUzYgTWFwIGZ1bmN0aW9uYWxpdHlcblx0XHRXZSB3cmFwIHRoaXMgaW4gYSB0cnkvY2F0Y2ggYmVjYXVzZSBzb21ldGltZXMgdGhlIE1hcCBjb25zdHJ1Y3RvciBleGlzdHMsIGJ1dCBkb2VzIG5vdFxuXHRcdHRha2UgYXJndW1lbnRzIChpT1MgOC40KVxuXHRcdCAqL1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgbWFwID0gbmV3IGdsb2JhbC5NYXAoW1swLCAxXV0pO1xuXG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0bWFwLmhhcygwKSAmJlxuXHRcdFx0XHRcdHR5cGVvZiBtYXAua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0XHRcdGhhcygnZXM2LXN5bWJvbCcpICYmXG5cdFx0XHRcdFx0dHlwZW9mIG1hcC52YWx1ZXMgPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdFx0XHR0eXBlb2YgbWFwLmVudHJpZXMgPT09ICdmdW5jdGlvbidcblx0XHRcdFx0KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0LyogaXN0YW5idWwgaWdub3JlIG5leHQ6IG5vdCB0ZXN0aW5nIG9uIGlPUyBhdCB0aGUgbW9tZW50ICovXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHR0cnVlXG4pO1xuXG4vKiBNYXRoICovXG5hZGQoXG5cdCdlczYtbWF0aCcsXG5cdCgpID0+IHtcblx0XHRyZXR1cm4gW1xuXHRcdFx0J2NsejMyJyxcblx0XHRcdCdzaWduJyxcblx0XHRcdCdsb2cxMCcsXG5cdFx0XHQnbG9nMicsXG5cdFx0XHQnbG9nMXAnLFxuXHRcdFx0J2V4cG0xJyxcblx0XHRcdCdjb3NoJyxcblx0XHRcdCdzaW5oJyxcblx0XHRcdCd0YW5oJyxcblx0XHRcdCdhY29zaCcsXG5cdFx0XHQnYXNpbmgnLFxuXHRcdFx0J2F0YW5oJyxcblx0XHRcdCd0cnVuYycsXG5cdFx0XHQnZnJvdW5kJyxcblx0XHRcdCdjYnJ0Jyxcblx0XHRcdCdoeXBvdCdcblx0XHRdLmV2ZXJ5KChuYW1lKSA9PiB0eXBlb2YgZ2xvYmFsLk1hdGhbbmFtZV0gPT09ICdmdW5jdGlvbicpO1xuXHR9LFxuXHR0cnVlXG4pO1xuXG5hZGQoXG5cdCdlczYtbWF0aC1pbXVsJyxcblx0KCkgPT4ge1xuXHRcdGlmICgnaW11bCcgaW4gZ2xvYmFsLk1hdGgpIHtcblx0XHRcdC8qIFNvbWUgdmVyc2lvbnMgb2YgU2FmYXJpIG9uIGlvcyBkbyBub3QgcHJvcGVybHkgaW1wbGVtZW50IHRoaXMgKi9cblx0XHRcdHJldHVybiAoPGFueT5NYXRoKS5pbXVsKDB4ZmZmZmZmZmYsIDUpID09PSAtNTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHR0cnVlXG4pO1xuXG4vKiBPYmplY3QgKi9cbmFkZChcblx0J2VzNi1vYmplY3QnLFxuXHQoKSA9PiB7XG5cdFx0cmV0dXJuIChcblx0XHRcdGhhcygnZXM2LXN5bWJvbCcpICYmXG5cdFx0XHRbJ2Fzc2lnbicsICdpcycsICdnZXRPd25Qcm9wZXJ0eVN5bWJvbHMnLCAnc2V0UHJvdG90eXBlT2YnXS5ldmVyeShcblx0XHRcdFx0KG5hbWUpID0+IHR5cGVvZiBnbG9iYWwuT2JqZWN0W25hbWVdID09PSAnZnVuY3Rpb24nXG5cdFx0XHQpXG5cdFx0KTtcblx0fSxcblx0dHJ1ZVxuKTtcblxuYWRkKFxuXHQnZXMyMDE3LW9iamVjdCcsXG5cdCgpID0+IHtcblx0XHRyZXR1cm4gWyd2YWx1ZXMnLCAnZW50cmllcycsICdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzJ10uZXZlcnkoXG5cdFx0XHQobmFtZSkgPT4gdHlwZW9mIGdsb2JhbC5PYmplY3RbbmFtZV0gPT09ICdmdW5jdGlvbidcblx0XHQpO1xuXHR9LFxuXHR0cnVlXG4pO1xuXG4vKiBPYnNlcnZhYmxlICovXG5hZGQoJ2VzLW9ic2VydmFibGUnLCAoKSA9PiB0eXBlb2YgZ2xvYmFsLk9ic2VydmFibGUgIT09ICd1bmRlZmluZWQnLCB0cnVlKTtcblxuLyogUHJvbWlzZSAqL1xuYWRkKCdlczYtcHJvbWlzZScsICgpID0+IHR5cGVvZiBnbG9iYWwuUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcgJiYgaGFzKCdlczYtc3ltYm9sJyksIHRydWUpO1xuXG4vKiBTZXQgKi9cbmFkZChcblx0J2VzNi1zZXQnLFxuXHQoKSA9PiB7XG5cdFx0aWYgKHR5cGVvZiBnbG9iYWwuU2V0ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHQvKiBJRTExIGFuZCBvbGRlciB2ZXJzaW9ucyBvZiBTYWZhcmkgYXJlIG1pc3NpbmcgY3JpdGljYWwgRVM2IFNldCBmdW5jdGlvbmFsaXR5ICovXG5cdFx0XHRjb25zdCBzZXQgPSBuZXcgZ2xvYmFsLlNldChbMV0pO1xuXHRcdFx0cmV0dXJuIHNldC5oYXMoMSkgJiYgJ2tleXMnIGluIHNldCAmJiB0eXBlb2Ygc2V0LmtleXMgPT09ICdmdW5jdGlvbicgJiYgaGFzKCdlczYtc3ltYm9sJyk7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0dHJ1ZVxuKTtcblxuLyogU3RyaW5nICovXG5hZGQoXG5cdCdlczYtc3RyaW5nJyxcblx0KCkgPT4ge1xuXHRcdHJldHVybiAoXG5cdFx0XHRbXG5cdFx0XHRcdC8qIHN0YXRpYyBtZXRob2RzICovXG5cdFx0XHRcdCdmcm9tQ29kZVBvaW50J1xuXHRcdFx0XS5ldmVyeSgoa2V5KSA9PiB0eXBlb2YgZ2xvYmFsLlN0cmluZ1trZXldID09PSAnZnVuY3Rpb24nKSAmJlxuXHRcdFx0W1xuXHRcdFx0XHQvKiBpbnN0YW5jZSBtZXRob2RzICovXG5cdFx0XHRcdCdjb2RlUG9pbnRBdCcsXG5cdFx0XHRcdCdub3JtYWxpemUnLFxuXHRcdFx0XHQncmVwZWF0Jyxcblx0XHRcdFx0J3N0YXJ0c1dpdGgnLFxuXHRcdFx0XHQnZW5kc1dpdGgnLFxuXHRcdFx0XHQnaW5jbHVkZXMnXG5cdFx0XHRdLmV2ZXJ5KChrZXkpID0+IHR5cGVvZiBnbG9iYWwuU3RyaW5nLnByb3RvdHlwZVtrZXldID09PSAnZnVuY3Rpb24nKVxuXHRcdCk7XG5cdH0sXG5cdHRydWVcbik7XG5cbmFkZChcblx0J2VzNi1zdHJpbmctcmF3Jyxcblx0KCkgPT4ge1xuXHRcdGZ1bmN0aW9uIGdldENhbGxTaXRlKGNhbGxTaXRlOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uc3Vic3RpdHV0aW9uczogYW55W10pIHtcblx0XHRcdGNvbnN0IHJlc3VsdCA9IFsuLi5jYWxsU2l0ZV07XG5cdFx0XHQocmVzdWx0IGFzIGFueSkucmF3ID0gY2FsbFNpdGUucmF3O1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHRpZiAoJ3JhdycgaW4gZ2xvYmFsLlN0cmluZykge1xuXHRcdFx0bGV0IGIgPSAxO1xuXHRcdFx0bGV0IGNhbGxTaXRlID0gZ2V0Q2FsbFNpdGVgYVxcbiR7Yn1gO1xuXG5cdFx0XHQoY2FsbFNpdGUgYXMgYW55KS5yYXcgPSBbJ2FcXFxcbiddO1xuXHRcdFx0Y29uc3Qgc3VwcG9ydHNUcnVuYyA9IGdsb2JhbC5TdHJpbmcucmF3KGNhbGxTaXRlLCA0MikgPT09ICdhOlxcXFxuJztcblxuXHRcdFx0cmV0dXJuIHN1cHBvcnRzVHJ1bmM7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHR0cnVlXG4pO1xuXG5hZGQoXG5cdCdlczIwMTctc3RyaW5nJyxcblx0KCkgPT4ge1xuXHRcdHJldHVybiBbJ3BhZFN0YXJ0JywgJ3BhZEVuZCddLmV2ZXJ5KChrZXkpID0+IHR5cGVvZiBnbG9iYWwuU3RyaW5nLnByb3RvdHlwZVtrZXldID09PSAnZnVuY3Rpb24nKTtcblx0fSxcblx0dHJ1ZVxuKTtcblxuLyogU3ltYm9sICovXG5hZGQoJ2VzNi1zeW1ib2wnLCAoKSA9PiB0eXBlb2YgZ2xvYmFsLlN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIFN5bWJvbCgpID09PSAnc3ltYm9sJywgdHJ1ZSk7XG5cbi8qIFdlYWtNYXAgKi9cbmFkZChcblx0J2VzNi13ZWFrbWFwJyxcblx0KCkgPT4ge1xuXHRcdGlmICh0eXBlb2YgZ2xvYmFsLldlYWtNYXAgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHQvKiBJRTExIGFuZCBvbGRlciB2ZXJzaW9ucyBvZiBTYWZhcmkgYXJlIG1pc3NpbmcgY3JpdGljYWwgRVM2IE1hcCBmdW5jdGlvbmFsaXR5ICovXG5cdFx0XHRjb25zdCBrZXkxID0ge307XG5cdFx0XHRjb25zdCBrZXkyID0ge307XG5cdFx0XHRjb25zdCBtYXAgPSBuZXcgZ2xvYmFsLldlYWtNYXAoW1trZXkxLCAxXV0pO1xuXHRcdFx0T2JqZWN0LmZyZWV6ZShrZXkxKTtcblx0XHRcdHJldHVybiBtYXAuZ2V0KGtleTEpID09PSAxICYmIG1hcC5zZXQoa2V5MiwgMikgPT09IG1hcCAmJiBoYXMoJ2VzNi1zeW1ib2wnKTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHR0cnVlXG4pO1xuXG4vKiBNaXNjZWxsYW5lb3VzIGZlYXR1cmVzICovXG5hZGQoJ21pY3JvdGFza3MnLCAoKSA9PiBoYXMoJ2VzNi1wcm9taXNlJykgfHwgaGFzKCdob3N0LW5vZGUnKSB8fCBoYXMoJ2RvbS1tdXRhdGlvbm9ic2VydmVyJyksIHRydWUpO1xuYWRkKFxuXHQncG9zdG1lc3NhZ2UnLFxuXHQoKSA9PiB7XG5cdFx0Ly8gSWYgd2luZG93IGlzIHVuZGVmaW5lZCwgYW5kIHdlIGhhdmUgcG9zdE1lc3NhZ2UsIGl0IHByb2JhYmx5IG1lYW5zIHdlJ3JlIGluIGEgd2ViIHdvcmtlci4gV2ViIHdvcmtlcnMgaGF2ZVxuXHRcdC8vIHBvc3QgbWVzc2FnZSBidXQgaXQgZG9lc24ndCB3b3JrIGhvdyB3ZSBleHBlY3QgaXQgdG8sIHNvIGl0J3MgYmVzdCBqdXN0IHRvIHByZXRlbmQgaXQgZG9lc24ndCBleGlzdC5cblx0XHRyZXR1cm4gdHlwZW9mIGdsb2JhbC53aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBnbG9iYWwucG9zdE1lc3NhZ2UgPT09ICdmdW5jdGlvbic7XG5cdH0sXG5cdHRydWVcbik7XG5hZGQoJ3JhZicsICgpID0+IHR5cGVvZiBnbG9iYWwucmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSAnZnVuY3Rpb24nLCB0cnVlKTtcbmFkZCgnc2V0aW1tZWRpYXRlJywgKCkgPT4gdHlwZW9mIGdsb2JhbC5zZXRJbW1lZGlhdGUgIT09ICd1bmRlZmluZWQnLCB0cnVlKTtcblxuLyogRE9NIEZlYXR1cmVzICovXG5cbmFkZChcblx0J2RvbS1tdXRhdGlvbm9ic2VydmVyJyxcblx0KCkgPT4ge1xuXHRcdGlmIChoYXMoJ2hvc3QtYnJvd3NlcicpICYmIEJvb2xlYW4oZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXIpKSB7XG5cdFx0XHQvLyBJRTExIGhhcyBhbiB1bnJlbGlhYmxlIE11dGF0aW9uT2JzZXJ2ZXIgaW1wbGVtZW50YXRpb24gd2hlcmUgc2V0UHJvcGVydHkoKSBkb2VzIG5vdFxuXHRcdFx0Ly8gZ2VuZXJhdGUgYSBtdXRhdGlvbiBldmVudCwgb2JzZXJ2ZXJzIGNhbiBjcmFzaCwgYW5kIHRoZSBxdWV1ZSBkb2VzIG5vdCBkcmFpblxuXHRcdFx0Ly8gcmVsaWFibHkuIFRoZSBmb2xsb3dpbmcgZmVhdHVyZSB0ZXN0IHdhcyBhZGFwdGVkIGZyb21cblx0XHRcdC8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3QxMGtvLzRhY2ViOGM3MTY4MWZkYjI3NWUzM2VmZTVlNTc2YjE0XG5cdFx0XHRjb25zdCBleGFtcGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHQvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZSAqL1xuXHRcdFx0Y29uc3QgSG9zdE11dGF0aW9uT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcblx0XHRcdGNvbnN0IG9ic2VydmVyID0gbmV3IEhvc3RNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKCkge30pO1xuXHRcdFx0b2JzZXJ2ZXIub2JzZXJ2ZShleGFtcGxlLCB7IGF0dHJpYnV0ZXM6IHRydWUgfSk7XG5cblx0XHRcdGV4YW1wbGUuc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuXHRcdFx0cmV0dXJuIEJvb2xlYW4ob2JzZXJ2ZXIudGFrZVJlY29yZHMoKS5sZW5ndGgpO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdHRydWVcbik7XG5cbmFkZChcblx0J2RvbS13ZWJhbmltYXRpb24nLFxuXHQoKSA9PiBoYXMoJ2hvc3QtYnJvd3NlcicpICYmIGdsb2JhbC5BbmltYXRpb24gIT09IHVuZGVmaW5lZCAmJiBnbG9iYWwuS2V5ZnJhbWVFZmZlY3QgIT09IHVuZGVmaW5lZCxcblx0dHJ1ZVxuKTtcblxuYWRkKCdhYm9ydC1jb250cm9sbGVyJywgKCkgPT4gdHlwZW9mIGdsb2JhbC5BYm9ydENvbnRyb2xsZXIgIT09ICd1bmRlZmluZWQnKTtcblxuYWRkKCdhYm9ydC1zaWduYWwnLCAoKSA9PiB0eXBlb2YgZ2xvYmFsLkFib3J0U2lnbmFsICE9PSAndW5kZWZpbmVkJyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gaGFzLnRzIiwiaW1wb3J0IHsgSGFuZGxlIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IGFzc2lnbiB9IGZyb20gJy4uL3NoaW0vb2JqZWN0JztcblxuZXhwb3J0IHsgYXNzaWduIH0gZnJvbSAnLi4vc2hpbS9vYmplY3QnO1xuXG5jb25zdCBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbmNvbnN0IGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBUeXBlIGd1YXJkIHRoYXQgZW5zdXJlcyB0aGF0IHRoZSB2YWx1ZSBjYW4gYmUgY29lcmNlZCB0byBPYmplY3RcbiAqIHRvIHdlZWQgb3V0IGhvc3Qgb2JqZWN0cyB0aGF0IGRvIG5vdCBkZXJpdmUgZnJvbSBPYmplY3QuXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gY2hlY2sgaWYgd2Ugd2FudCB0byBkZWVwIGNvcHkgYW4gb2JqZWN0IG9yIG5vdC5cbiAqIE5vdGU6IEluIEVTNiBpdCBpcyBwb3NzaWJsZSB0byBtb2RpZnkgYW4gb2JqZWN0J3MgU3ltYm9sLnRvU3RyaW5nVGFnIHByb3BlcnR5LCB3aGljaCB3aWxsXG4gKiBjaGFuZ2UgdGhlIHZhbHVlIHJldHVybmVkIGJ5IGB0b1N0cmluZ2AuIFRoaXMgaXMgYSByYXJlIGVkZ2UgY2FzZSB0aGF0IGlzIGRpZmZpY3VsdCB0byBoYW5kbGUsXG4gKiBzbyBpdCBpcyBub3QgaGFuZGxlZCBoZXJlLlxuICogQHBhcmFtICB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2tcbiAqIEByZXR1cm4gICAgICAgSWYgdGhlIHZhbHVlIGlzIGNvZXJjaWJsZSBpbnRvIGFuIE9iamVjdFxuICovXG5mdW5jdGlvbiBzaG91bGREZWVwQ29weU9iamVjdCh2YWx1ZTogYW55KTogdmFsdWUgaXMgT2JqZWN0IHtcblx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufVxuXG5mdW5jdGlvbiBjb3B5QXJyYXk8VD4oYXJyYXk6IFRbXSwgaW5oZXJpdGVkOiBib29sZWFuKTogVFtdIHtcblx0cmV0dXJuIGFycmF5Lm1hcChmdW5jdGlvbihpdGVtOiBUKTogVCB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcblx0XHRcdHJldHVybiA8YW55PmNvcHlBcnJheSg8YW55Pml0ZW0sIGluaGVyaXRlZCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICFzaG91bGREZWVwQ29weU9iamVjdChpdGVtKVxuXHRcdFx0PyBpdGVtXG5cdFx0XHQ6IF9taXhpbih7XG5cdFx0XHRcdFx0ZGVlcDogdHJ1ZSxcblx0XHRcdFx0XHRpbmhlcml0ZWQ6IGluaGVyaXRlZCxcblx0XHRcdFx0XHRzb3VyY2VzOiA8QXJyYXk8VD4+W2l0ZW1dLFxuXHRcdFx0XHRcdHRhcmdldDogPFQ+e31cblx0XHRcdCAgfSk7XG5cdH0pO1xufVxuXG5pbnRlcmZhY2UgTWl4aW5BcmdzPFQgZXh0ZW5kcyB7fSwgVSBleHRlbmRzIHt9PiB7XG5cdGRlZXA6IGJvb2xlYW47XG5cdGluaGVyaXRlZDogYm9vbGVhbjtcblx0c291cmNlczogKFUgfCBudWxsIHwgdW5kZWZpbmVkKVtdO1xuXHR0YXJnZXQ6IFQ7XG5cdGNvcGllZD86IGFueVtdO1xufVxuXG5mdW5jdGlvbiBfbWl4aW48VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30+KGt3QXJnczogTWl4aW5BcmdzPFQsIFU+KTogVCAmIFUge1xuXHRjb25zdCBkZWVwID0ga3dBcmdzLmRlZXA7XG5cdGNvbnN0IGluaGVyaXRlZCA9IGt3QXJncy5pbmhlcml0ZWQ7XG5cdGNvbnN0IHRhcmdldDogYW55ID0ga3dBcmdzLnRhcmdldDtcblx0Y29uc3QgY29waWVkID0ga3dBcmdzLmNvcGllZCB8fCBbXTtcblx0Y29uc3QgY29waWVkQ2xvbmUgPSBbLi4uY29waWVkXTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGt3QXJncy5zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3Qgc291cmNlID0ga3dBcmdzLnNvdXJjZXNbaV07XG5cblx0XHRpZiAoc291cmNlID09PSBudWxsIHx8IHNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cdFx0Zm9yIChsZXQga2V5IGluIHNvdXJjZSkge1xuXHRcdFx0aWYgKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuXHRcdFx0XHRsZXQgdmFsdWU6IGFueSA9IHNvdXJjZVtrZXldO1xuXG5cdFx0XHRcdGlmIChjb3BpZWRDbG9uZS5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChkZWVwKSB7XG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRcdFx0XHR2YWx1ZSA9IGNvcHlBcnJheSh2YWx1ZSwgaW5oZXJpdGVkKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHNob3VsZERlZXBDb3B5T2JqZWN0KHZhbHVlKSkge1xuXHRcdFx0XHRcdFx0Y29uc3QgdGFyZ2V0VmFsdWU6IGFueSA9IHRhcmdldFtrZXldIHx8IHt9O1xuXHRcdFx0XHRcdFx0Y29waWVkLnB1c2goc291cmNlKTtcblx0XHRcdFx0XHRcdHZhbHVlID0gX21peGluKHtcblx0XHRcdFx0XHRcdFx0ZGVlcDogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0aW5oZXJpdGVkOiBpbmhlcml0ZWQsXG5cdFx0XHRcdFx0XHRcdHNvdXJjZXM6IFt2YWx1ZV0sXG5cdFx0XHRcdFx0XHRcdHRhcmdldDogdGFyZ2V0VmFsdWUsXG5cdFx0XHRcdFx0XHRcdGNvcGllZFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRhcmdldFtrZXldID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIDxUICYgVT50YXJnZXQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gcHJvdG90eXBlLCBhbmQgY29waWVzIGFsbCBlbnVtZXJhYmxlIG93biBwcm9wZXJ0aWVzIG9mIG9uZSBvciBtb3JlXG4gKiBzb3VyY2Ugb2JqZWN0cyB0byB0aGUgbmV3bHkgY3JlYXRlZCB0YXJnZXQgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSBwcm90b3R5cGUgVGhlIHByb3RvdHlwZSB0byBjcmVhdGUgYSBuZXcgb2JqZWN0IGZyb21cbiAqIEBwYXJhbSBtaXhpbnMgQW55IG51bWJlciBvZiBvYmplY3RzIHdob3NlIGVudW1lcmFibGUgb3duIHByb3BlcnRpZXMgd2lsbCBiZSBjb3BpZWQgdG8gdGhlIGNyZWF0ZWQgb2JqZWN0XG4gKiBAcmV0dXJuIFRoZSBuZXcgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGU8XG5cdFQgZXh0ZW5kcyB7fSxcblx0VSBleHRlbmRzIHt9LFxuXHRWIGV4dGVuZHMge30sXG5cdFcgZXh0ZW5kcyB7fSxcblx0WCBleHRlbmRzIHt9LFxuXHRZIGV4dGVuZHMge30sXG5cdFogZXh0ZW5kcyB7fVxuPihwcm90b3R5cGU6IFQsIG1peGluMTogVSwgbWl4aW4yOiBWLCBtaXhpbjM6IFcsIG1peGluNDogWCwgbWl4aW41OiBZLCBtaXhpbjY6IFopOiBUICYgVSAmIFYgJiBXICYgWCAmIFkgJiBaO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZTxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fSwgViBleHRlbmRzIHt9LCBXIGV4dGVuZHMge30sIFggZXh0ZW5kcyB7fSwgWSBleHRlbmRzIHt9Pihcblx0cHJvdG90eXBlOiBULFxuXHRtaXhpbjE6IFUsXG5cdG1peGluMjogVixcblx0bWl4aW4zOiBXLFxuXHRtaXhpbjQ6IFgsXG5cdG1peGluNTogWVxuKTogVCAmIFUgJiBWICYgVyAmIFggJiBZO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZTxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fSwgViBleHRlbmRzIHt9LCBXIGV4dGVuZHMge30sIFggZXh0ZW5kcyB7fT4oXG5cdHByb3RvdHlwZTogVCxcblx0bWl4aW4xOiBVLFxuXHRtaXhpbjI6IFYsXG5cdG1peGluMzogVyxcblx0bWl4aW40OiBYXG4pOiBUICYgVSAmIFYgJiBXICYgWDtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGU8VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fSwgVyBleHRlbmRzIHt9Pihcblx0cHJvdG90eXBlOiBULFxuXHRtaXhpbjE6IFUsXG5cdG1peGluMjogVixcblx0bWl4aW4zOiBXXG4pOiBUICYgVSAmIFYgJiBXO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZTxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fSwgViBleHRlbmRzIHt9Pihwcm90b3R5cGU6IFQsIG1peGluMTogVSwgbWl4aW4yOiBWKTogVCAmIFUgJiBWO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZTxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fT4ocHJvdG90eXBlOiBULCBtaXhpbjogVSk6IFQgJiBVO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZTxUIGV4dGVuZHMge30+KHByb3RvdHlwZTogVCk6IFQ7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKHByb3RvdHlwZTogYW55LCAuLi5taXhpbnM6IGFueVtdKTogYW55IHtcblx0aWYgKCFtaXhpbnMubGVuZ3RoKSB7XG5cdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2xhbmcuY3JlYXRlIHJlcXVpcmVzIGF0IGxlYXN0IG9uZSBtaXhpbiBvYmplY3QuJyk7XG5cdH1cblxuXHRjb25zdCBhcmdzID0gbWl4aW5zLnNsaWNlKCk7XG5cdGFyZ3MudW5zaGlmdChPYmplY3QuY3JlYXRlKHByb3RvdHlwZSkpO1xuXG5cdHJldHVybiBhc3NpZ24uYXBwbHkobnVsbCwgYXJncyk7XG59XG5cbi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYWxsIGVudW1lcmFibGUgb3duIHByb3BlcnRpZXMgb2Ygb25lIG9yIG1vcmUgc291cmNlIG9iamVjdHMgdG8gdGhlIHRhcmdldCBvYmplY3QsXG4gKiByZWN1cnNpdmVseSBjb3B5aW5nIGFsbCBuZXN0ZWQgb2JqZWN0cyBhbmQgYXJyYXlzIGFzIHdlbGwuXG4gKlxuICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCB0byByZWNlaXZlIHZhbHVlcyBmcm9tIHNvdXJjZSBvYmplY3RzXG4gKiBAcGFyYW0gc291cmNlcyBBbnkgbnVtYmVyIG9mIG9iamVjdHMgd2hvc2UgZW51bWVyYWJsZSBvd24gcHJvcGVydGllcyB3aWxsIGJlIGNvcGllZCB0byB0aGUgdGFyZ2V0IG9iamVjdFxuICogQHJldHVybiBUaGUgbW9kaWZpZWQgdGFyZ2V0IG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVlcEFzc2lnbjxcblx0VCBleHRlbmRzIHt9LFxuXHRVIGV4dGVuZHMge30sXG5cdFYgZXh0ZW5kcyB7fSxcblx0VyBleHRlbmRzIHt9LFxuXHRYIGV4dGVuZHMge30sXG5cdFkgZXh0ZW5kcyB7fSxcblx0WiBleHRlbmRzIHt9XG4+KHRhcmdldDogVCwgc291cmNlMTogVSwgc291cmNlMjogViwgc291cmNlMzogVywgc291cmNlNDogWCwgc291cmNlNTogWSwgc291cmNlNjogWik6IFQgJiBVICYgViAmIFcgJiBYICYgWSAmIFo7XG5leHBvcnQgZnVuY3Rpb24gZGVlcEFzc2lnbjxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fSwgViBleHRlbmRzIHt9LCBXIGV4dGVuZHMge30sIFggZXh0ZW5kcyB7fSwgWSBleHRlbmRzIHt9Pihcblx0dGFyZ2V0OiBULFxuXHRzb3VyY2UxOiBVLFxuXHRzb3VyY2UyOiBWLFxuXHRzb3VyY2UzOiBXLFxuXHRzb3VyY2U0OiBYLFxuXHRzb3VyY2U1OiBZXG4pOiBUICYgVSAmIFYgJiBXICYgWCAmIFk7XG5leHBvcnQgZnVuY3Rpb24gZGVlcEFzc2lnbjxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fSwgViBleHRlbmRzIHt9LCBXIGV4dGVuZHMge30sIFggZXh0ZW5kcyB7fT4oXG5cdHRhcmdldDogVCxcblx0c291cmNlMTogVSxcblx0c291cmNlMjogVixcblx0c291cmNlMzogVyxcblx0c291cmNlNDogWFxuKTogVCAmIFUgJiBWICYgVyAmIFg7XG5leHBvcnQgZnVuY3Rpb24gZGVlcEFzc2lnbjxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fSwgViBleHRlbmRzIHt9LCBXIGV4dGVuZHMge30+KFxuXHR0YXJnZXQ6IFQsXG5cdHNvdXJjZTE6IFUsXG5cdHNvdXJjZTI6IFYsXG5cdHNvdXJjZTM6IFdcbik6IFQgJiBVICYgViAmIFc7XG5leHBvcnQgZnVuY3Rpb24gZGVlcEFzc2lnbjxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fSwgViBleHRlbmRzIHt9Pih0YXJnZXQ6IFQsIHNvdXJjZTE6IFUsIHNvdXJjZTI6IFYpOiBUICYgVSAmIFY7XG5leHBvcnQgZnVuY3Rpb24gZGVlcEFzc2lnbjxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fT4odGFyZ2V0OiBULCBzb3VyY2U6IFUpOiBUICYgVTtcbmV4cG9ydCBmdW5jdGlvbiBkZWVwQXNzaWduKHRhcmdldDogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSk6IGFueSB7XG5cdHJldHVybiBfbWl4aW4oe1xuXHRcdGRlZXA6IHRydWUsXG5cdFx0aW5oZXJpdGVkOiBmYWxzZSxcblx0XHRzb3VyY2VzOiBzb3VyY2VzLFxuXHRcdHRhcmdldDogdGFyZ2V0XG5cdH0pO1xufVxuXG4vKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGFsbCBlbnVtZXJhYmxlIChvd24gb3IgaW5oZXJpdGVkKSBwcm9wZXJ0aWVzIG9mIG9uZSBvciBtb3JlIHNvdXJjZSBvYmplY3RzIHRvIHRoZVxuICogdGFyZ2V0IG9iamVjdCwgcmVjdXJzaXZlbHkgY29weWluZyBhbGwgbmVzdGVkIG9iamVjdHMgYW5kIGFycmF5cyBhcyB3ZWxsLlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3QgdG8gcmVjZWl2ZSB2YWx1ZXMgZnJvbSBzb3VyY2Ugb2JqZWN0c1xuICogQHBhcmFtIHNvdXJjZXMgQW55IG51bWJlciBvZiBvYmplY3RzIHdob3NlIGVudW1lcmFibGUgcHJvcGVydGllcyB3aWxsIGJlIGNvcGllZCB0byB0aGUgdGFyZ2V0IG9iamVjdFxuICogQHJldHVybiBUaGUgbW9kaWZpZWQgdGFyZ2V0IG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVlcE1peGluPFxuXHRUIGV4dGVuZHMge30sXG5cdFUgZXh0ZW5kcyB7fSxcblx0ViBleHRlbmRzIHt9LFxuXHRXIGV4dGVuZHMge30sXG5cdFggZXh0ZW5kcyB7fSxcblx0WSBleHRlbmRzIHt9LFxuXHRaIGV4dGVuZHMge31cbj4odGFyZ2V0OiBULCBzb3VyY2UxOiBVLCBzb3VyY2UyOiBWLCBzb3VyY2UzOiBXLCBzb3VyY2U0OiBYLCBzb3VyY2U1OiBZLCBzb3VyY2U2OiBaKTogVCAmIFUgJiBWICYgVyAmIFggJiBZICYgWjtcbmV4cG9ydCBmdW5jdGlvbiBkZWVwTWl4aW48VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fSwgVyBleHRlbmRzIHt9LCBYIGV4dGVuZHMge30sIFkgZXh0ZW5kcyB7fT4oXG5cdHRhcmdldDogVCxcblx0c291cmNlMTogVSxcblx0c291cmNlMjogVixcblx0c291cmNlMzogVyxcblx0c291cmNlNDogWCxcblx0c291cmNlNTogWVxuKTogVCAmIFUgJiBWICYgVyAmIFggJiBZO1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBNaXhpbjxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fSwgViBleHRlbmRzIHt9LCBXIGV4dGVuZHMge30sIFggZXh0ZW5kcyB7fT4oXG5cdHRhcmdldDogVCxcblx0c291cmNlMTogVSxcblx0c291cmNlMjogVixcblx0c291cmNlMzogVyxcblx0c291cmNlNDogWFxuKTogVCAmIFUgJiBWICYgVyAmIFg7XG5leHBvcnQgZnVuY3Rpb24gZGVlcE1peGluPFQgZXh0ZW5kcyB7fSwgVSBleHRlbmRzIHt9LCBWIGV4dGVuZHMge30sIFcgZXh0ZW5kcyB7fT4oXG5cdHRhcmdldDogVCxcblx0c291cmNlMTogVSxcblx0c291cmNlMjogVixcblx0c291cmNlMzogV1xuKTogVCAmIFUgJiBWICYgVztcbmV4cG9ydCBmdW5jdGlvbiBkZWVwTWl4aW48VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fT4odGFyZ2V0OiBULCBzb3VyY2UxOiBVLCBzb3VyY2UyOiBWKTogVCAmIFUgJiBWO1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBNaXhpbjxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fT4odGFyZ2V0OiBULCBzb3VyY2U6IFUpOiBUICYgVTtcbmV4cG9ydCBmdW5jdGlvbiBkZWVwTWl4aW4odGFyZ2V0OiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogYW55IHtcblx0cmV0dXJuIF9taXhpbih7XG5cdFx0ZGVlcDogdHJ1ZSxcblx0XHRpbmhlcml0ZWQ6IHRydWUsXG5cdFx0c291cmNlczogc291cmNlcyxcblx0XHR0YXJnZXQ6IHRhcmdldFxuXHR9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG9iamVjdCB1c2luZyB0aGUgcHJvdmlkZWQgc291cmNlJ3MgcHJvdG90eXBlIGFzIHRoZSBwcm90b3R5cGUgZm9yIHRoZSBuZXcgb2JqZWN0LCBhbmQgdGhlblxuICogZGVlcCBjb3BpZXMgdGhlIHByb3ZpZGVkIHNvdXJjZSdzIHZhbHVlcyBpbnRvIHRoZSBuZXcgdGFyZ2V0LlxuICpcbiAqIEBwYXJhbSBzb3VyY2UgVGhlIG9iamVjdCB0byBkdXBsaWNhdGVcbiAqIEByZXR1cm4gVGhlIG5ldyBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGR1cGxpY2F0ZTxUIGV4dGVuZHMge30+KHNvdXJjZTogVCk6IFQge1xuXHRjb25zdCB0YXJnZXQgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5nZXRQcm90b3R5cGVPZihzb3VyY2UpKTtcblxuXHRyZXR1cm4gZGVlcE1peGluKHRhcmdldCwgc291cmNlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdHdvIHZhbHVlcyBhcmUgdGhlIHNhbWUgdmFsdWUuXG4gKlxuICogQHBhcmFtIGEgRmlyc3QgdmFsdWUgdG8gY29tcGFyZVxuICogQHBhcmFtIGIgU2Vjb25kIHZhbHVlIHRvIGNvbXBhcmVcbiAqIEByZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWVzIGFyZSB0aGUgc2FtZTsgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0lkZW50aWNhbChhOiBhbnksIGI6IGFueSk6IGJvb2xlYW4ge1xuXHRyZXR1cm4gKFxuXHRcdGEgPT09IGIgfHxcblx0XHQvKiBib3RoIHZhbHVlcyBhcmUgTmFOICovXG5cdFx0KGEgIT09IGEgJiYgYiAhPT0gYilcblx0KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBiaW5kcyBhIG1ldGhvZCB0byB0aGUgc3BlY2lmaWVkIG9iamVjdCBhdCBydW50aW1lLiBUaGlzIGlzIHNpbWlsYXIgdG9cbiAqIGBGdW5jdGlvbi5wcm90b3R5cGUuYmluZGAsIGJ1dCBpbnN0ZWFkIG9mIGEgZnVuY3Rpb24gaXQgdGFrZXMgdGhlIG5hbWUgb2YgYSBtZXRob2Qgb24gYW4gb2JqZWN0LlxuICogQXMgYSByZXN1bHQsIHRoZSBmdW5jdGlvbiByZXR1cm5lZCBieSBgbGF0ZUJpbmRgIHdpbGwgYWx3YXlzIGNhbGwgdGhlIGZ1bmN0aW9uIGN1cnJlbnRseSBhc3NpZ25lZCB0b1xuICogdGhlIHNwZWNpZmllZCBwcm9wZXJ0eSBvbiB0aGUgb2JqZWN0IGFzIG9mIHRoZSBtb21lbnQgdGhlIGZ1bmN0aW9uIGl0IHJldHVybnMgaXMgY2FsbGVkLlxuICpcbiAqIEBwYXJhbSBpbnN0YW5jZSBUaGUgY29udGV4dCBvYmplY3RcbiAqIEBwYXJhbSBtZXRob2QgVGhlIG5hbWUgb2YgdGhlIG1ldGhvZCBvbiB0aGUgY29udGV4dCBvYmplY3QgdG8gYmluZCB0byBpdHNlbGZcbiAqIEBwYXJhbSBzdXBwbGllZEFyZ3MgQW4gb3B0aW9uYWwgYXJyYXkgb2YgdmFsdWVzIHRvIHByZXBlbmQgdG8gdGhlIGBpbnN0YW5jZVttZXRob2RdYCBhcmd1bWVudHMgbGlzdFxuICogQHJldHVybiBUaGUgYm91bmQgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxhdGVCaW5kKGluc3RhbmNlOiB7fSwgbWV0aG9kOiBzdHJpbmcsIC4uLnN1cHBsaWVkQXJnczogYW55W10pOiAoLi4uYXJnczogYW55W10pID0+IGFueSB7XG5cdHJldHVybiBzdXBwbGllZEFyZ3MubGVuZ3RoXG5cdFx0PyBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y29uc3QgYXJnczogYW55W10gPSBhcmd1bWVudHMubGVuZ3RoID8gc3VwcGxpZWRBcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpIDogc3VwcGxpZWRBcmdzO1xuXG5cdFx0XHRcdC8vIFRTNzAxN1xuXHRcdFx0XHRyZXR1cm4gKDxhbnk+aW5zdGFuY2UpW21ldGhvZF0uYXBwbHkoaW5zdGFuY2UsIGFyZ3MpO1xuXHRcdCAgfVxuXHRcdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdC8vIFRTNzAxN1xuXHRcdFx0XHRyZXR1cm4gKDxhbnk+aW5zdGFuY2UpW21ldGhvZF0uYXBwbHkoaW5zdGFuY2UsIGFyZ3VtZW50cyk7XG5cdFx0ICB9O1xufVxuXG4vKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGFsbCBlbnVtZXJhYmxlIChvd24gb3IgaW5oZXJpdGVkKSBwcm9wZXJ0aWVzIG9mIG9uZSBvciBtb3JlIHNvdXJjZSBvYmplY3RzIHRvIHRoZVxuICogdGFyZ2V0IG9iamVjdC5cbiAqXG4gKiBAcmV0dXJuIFRoZSBtb2RpZmllZCB0YXJnZXQgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtaXhpbjxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fSwgViBleHRlbmRzIHt9LCBXIGV4dGVuZHMge30sIFggZXh0ZW5kcyB7fSwgWSBleHRlbmRzIHt9LCBaIGV4dGVuZHMge30+KFxuXHR0YXJnZXQ6IFQsXG5cdHNvdXJjZTE6IFUsXG5cdHNvdXJjZTI6IFYsXG5cdHNvdXJjZTM6IFcsXG5cdHNvdXJjZTQ6IFgsXG5cdHNvdXJjZTU6IFksXG5cdHNvdXJjZTY6IFpcbik6IFQgJiBVICYgViAmIFcgJiBYICYgWSAmIFo7XG5leHBvcnQgZnVuY3Rpb24gbWl4aW48VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fSwgVyBleHRlbmRzIHt9LCBYIGV4dGVuZHMge30sIFkgZXh0ZW5kcyB7fT4oXG5cdHRhcmdldDogVCxcblx0c291cmNlMTogVSxcblx0c291cmNlMjogVixcblx0c291cmNlMzogVyxcblx0c291cmNlNDogWCxcblx0c291cmNlNTogWVxuKTogVCAmIFUgJiBWICYgVyAmIFggJiBZO1xuZXhwb3J0IGZ1bmN0aW9uIG1peGluPFQgZXh0ZW5kcyB7fSwgVSBleHRlbmRzIHt9LCBWIGV4dGVuZHMge30sIFcgZXh0ZW5kcyB7fSwgWCBleHRlbmRzIHt9Pihcblx0dGFyZ2V0OiBULFxuXHRzb3VyY2UxOiBVLFxuXHRzb3VyY2UyOiBWLFxuXHRzb3VyY2UzOiBXLFxuXHRzb3VyY2U0OiBYXG4pOiBUICYgVSAmIFYgJiBXICYgWDtcbmV4cG9ydCBmdW5jdGlvbiBtaXhpbjxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fSwgViBleHRlbmRzIHt9LCBXIGV4dGVuZHMge30+KFxuXHR0YXJnZXQ6IFQsXG5cdHNvdXJjZTE6IFUsXG5cdHNvdXJjZTI6IFYsXG5cdHNvdXJjZTM6IFdcbik6IFQgJiBVICYgViAmIFc7XG5leHBvcnQgZnVuY3Rpb24gbWl4aW48VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fT4odGFyZ2V0OiBULCBzb3VyY2UxOiBVLCBzb3VyY2UyOiBWKTogVCAmIFUgJiBWO1xuZXhwb3J0IGZ1bmN0aW9uIG1peGluPFQgZXh0ZW5kcyB7fSwgVSBleHRlbmRzIHt9Pih0YXJnZXQ6IFQsIHNvdXJjZTogVSk6IFQgJiBVO1xuZXhwb3J0IGZ1bmN0aW9uIG1peGluKHRhcmdldDogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSk6IGFueSB7XG5cdHJldHVybiBfbWl4aW4oe1xuXHRcdGRlZXA6IGZhbHNlLFxuXHRcdGluaGVyaXRlZDogdHJ1ZSxcblx0XHRzb3VyY2VzOiBzb3VyY2VzLFxuXHRcdHRhcmdldDogdGFyZ2V0XG5cdH0pO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB3aGljaCBpbnZva2VzIHRoZSBnaXZlbiBmdW5jdGlvbiB3aXRoIHRoZSBnaXZlbiBhcmd1bWVudHMgcHJlcGVuZGVkIHRvIGl0cyBhcmd1bWVudCBsaXN0LlxuICogTGlrZSBgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRgLCBidXQgZG9lcyBub3QgYWx0ZXIgZXhlY3V0aW9uIGNvbnRleHQuXG4gKlxuICogQHBhcmFtIHRhcmdldEZ1bmN0aW9uIFRoZSBmdW5jdGlvbiB0aGF0IG5lZWRzIHRvIGJlIGJvdW5kXG4gKiBAcGFyYW0gc3VwcGxpZWRBcmdzIEFuIG9wdGlvbmFsIGFycmF5IG9mIGFyZ3VtZW50cyB0byBwcmVwZW5kIHRvIHRoZSBgdGFyZ2V0RnVuY3Rpb25gIGFyZ3VtZW50cyBsaXN0XG4gKiBAcmV0dXJuIFRoZSBib3VuZCBmdW5jdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFydGlhbCh0YXJnZXRGdW5jdGlvbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnksIC4uLnN1cHBsaWVkQXJnczogYW55W10pOiAoLi4uYXJnczogYW55W10pID0+IGFueSB7XG5cdHJldHVybiBmdW5jdGlvbih0aGlzOiBhbnkpIHtcblx0XHRjb25zdCBhcmdzOiBhbnlbXSA9IGFyZ3VtZW50cy5sZW5ndGggPyBzdXBwbGllZEFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkgOiBzdXBwbGllZEFyZ3M7XG5cblx0XHRyZXR1cm4gdGFyZ2V0RnVuY3Rpb24uYXBwbHkodGhpcywgYXJncyk7XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBhIGRlc3Ryb3kgbWV0aG9kIHRoYXQsIHdoZW4gY2FsbGVkLCBjYWxscyB0aGUgcGFzc2VkLWluIGRlc3RydWN0b3IuXG4gKiBUaGlzIGlzIGludGVuZGVkIHRvIHByb3ZpZGUgYSB1bmlmaWVkIGludGVyZmFjZSBmb3IgY3JlYXRpbmcgXCJyZW1vdmVcIiAvIFwiZGVzdHJveVwiIGhhbmRsZXJzIGZvclxuICogZXZlbnQgbGlzdGVuZXJzLCB0aW1lcnMsIGV0Yy5cbiAqXG4gKiBAcGFyYW0gZGVzdHJ1Y3RvciBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgaGFuZGxlJ3MgYGRlc3Ryb3lgIG1ldGhvZCBpcyBpbnZva2VkXG4gKiBAcmV0dXJuIFRoZSBoYW5kbGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIYW5kbGUoZGVzdHJ1Y3RvcjogKCkgPT4gdm9pZCk6IEhhbmRsZSB7XG5cdGxldCBjYWxsZWQgPSBmYWxzZTtcblx0cmV0dXJuIHtcblx0XHRkZXN0cm95OiBmdW5jdGlvbih0aGlzOiBIYW5kbGUpIHtcblx0XHRcdGlmICghY2FsbGVkKSB7XG5cdFx0XHRcdGNhbGxlZCA9IHRydWU7XG5cdFx0XHRcdGRlc3RydWN0b3IoKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhIHNpbmdsZSBoYW5kbGUgdGhhdCBjYW4gYmUgdXNlZCB0byBkZXN0cm95IG11bHRpcGxlIGhhbmRsZXMgc2ltdWx0YW5lb3VzbHkuXG4gKlxuICogQHBhcmFtIGhhbmRsZXMgQW4gYXJyYXkgb2YgaGFuZGxlcyB3aXRoIGBkZXN0cm95YCBtZXRob2RzXG4gKiBAcmV0dXJuIFRoZSBoYW5kbGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb21wb3NpdGVIYW5kbGUoLi4uaGFuZGxlczogSGFuZGxlW10pOiBIYW5kbGUge1xuXHRyZXR1cm4gY3JlYXRlSGFuZGxlKGZ1bmN0aW9uKCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaGFuZGxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aGFuZGxlc1tpXS5kZXN0cm95KCk7XG5cdFx0fVxuXHR9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsYW5nLnRzIiwiaW1wb3J0IHsgaXNBcnJheUxpa2UsIEl0ZXJhYmxlLCBJdGVyYWJsZUl0ZXJhdG9yLCBTaGltSXRlcmF0b3IgfSBmcm9tICcuL2l0ZXJhdG9yJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuaW1wb3J0IHsgaXMgYXMgb2JqZWN0SXMgfSBmcm9tICcuL29iamVjdCc7XG5pbXBvcnQgaGFzIGZyb20gJy4vc3VwcG9ydC9oYXMnO1xuaW1wb3J0ICcuL1N5bWJvbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFwPEssIFY+IHtcblx0LyoqXG5cdCAqIERlbGV0ZXMgYWxsIGtleXMgYW5kIHRoZWlyIGFzc29jaWF0ZWQgdmFsdWVzLlxuXHQgKi9cblx0Y2xlYXIoKTogdm9pZDtcblxuXHQvKipcblx0ICogRGVsZXRlcyBhIGdpdmVuIGtleSBhbmQgaXRzIGFzc29jaWF0ZWQgdmFsdWUuXG5cdCAqXG5cdCAqIEBwYXJhbSBrZXkgVGhlIGtleSB0byBkZWxldGVcblx0ICogQHJldHVybiB0cnVlIGlmIHRoZSBrZXkgZXhpc3RzLCBmYWxzZSBpZiBpdCBkb2VzIG5vdFxuXHQgKi9cblx0ZGVsZXRlKGtleTogSyk6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYW4gaXRlcmF0b3IgdGhhdCB5aWVsZHMgZWFjaCBrZXkvdmFsdWUgcGFpciBhcyBhbiBhcnJheS5cblx0ICpcblx0ICogQHJldHVybiBBbiBpdGVyYXRvciBmb3IgZWFjaCBrZXkvdmFsdWUgcGFpciBpbiB0aGUgaW5zdGFuY2UuXG5cdCAqL1xuXHRlbnRyaWVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8W0ssIFZdPjtcblxuXHQvKipcblx0ICogRXhlY3V0ZXMgYSBnaXZlbiBmdW5jdGlvbiBmb3IgZWFjaCBtYXAgZW50cnkuIFRoZSBmdW5jdGlvblxuXHQgKiBpcyBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOiB0aGUgZWxlbWVudCB2YWx1ZSwgdGhlXG5cdCAqIGVsZW1lbnQga2V5LCBhbmQgdGhlIGFzc29jaWF0ZWQgTWFwIGluc3RhbmNlLlxuXHQgKlxuXHQgKiBAcGFyYW0gY2FsbGJhY2tmbiBUaGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSBmb3IgZWFjaCBtYXAgZW50cnksXG5cdCAqIEBwYXJhbSB0aGlzQXJnIFRoZSB2YWx1ZSB0byB1c2UgZm9yIGB0aGlzYCBmb3IgZWFjaCBleGVjdXRpb24gb2YgdGhlIGNhbGJhY2tcblx0ICovXG5cdGZvckVhY2goY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBrZXk6IEssIG1hcDogTWFwPEssIFY+KSA9PiB2b2lkLCB0aGlzQXJnPzogYW55KTogdm9pZDtcblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGEgZ2l2ZW4ga2V5LlxuXHQgKlxuXHQgKiBAcGFyYW0ga2V5IFRoZSBrZXkgdG8gbG9vayB1cFxuXHQgKiBAcmV0dXJuIFRoZSB2YWx1ZSBpZiBvbmUgZXhpc3RzIG9yIHVuZGVmaW5lZFxuXHQgKi9cblx0Z2V0KGtleTogSyk6IFYgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYW4gaXRlcmF0b3IgdGhhdCB5aWVsZHMgZWFjaCBrZXkgaW4gdGhlIG1hcC5cblx0ICpcblx0ICogQHJldHVybiBBbiBpdGVyYXRvciBjb250YWluaW5nIHRoZSBpbnN0YW5jZSdzIGtleXMuXG5cdCAqL1xuXHRrZXlzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Sz47XG5cblx0LyoqXG5cdCAqIENoZWNrcyBmb3IgdGhlIHByZXNlbmNlIG9mIGEgZ2l2ZW4ga2V5LlxuXHQgKlxuXHQgKiBAcGFyYW0ga2V5IFRoZSBrZXkgdG8gY2hlY2sgZm9yXG5cdCAqIEByZXR1cm4gdHJ1ZSBpZiB0aGUga2V5IGV4aXN0cywgZmFsc2UgaWYgaXQgZG9lcyBub3Rcblx0ICovXG5cdGhhcyhrZXk6IEspOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggYSBnaXZlbiBrZXkuXG5cdCAqXG5cdCAqIEBwYXJhbSBrZXkgVGhlIGtleSB0byBkZWZpbmUgYSB2YWx1ZSB0b1xuXHQgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnblxuXHQgKiBAcmV0dXJuIFRoZSBNYXAgaW5zdGFuY2Vcblx0ICovXG5cdHNldChrZXk6IEssIHZhbHVlOiBWKTogdGhpcztcblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGtleSAvIHZhbHVlIHBhaXJzIGluIHRoZSBNYXAuXG5cdCAqL1xuXHRyZWFkb25seSBzaXplOiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYW4gaXRlcmF0b3IgdGhhdCB5aWVsZHMgZWFjaCB2YWx1ZSBpbiB0aGUgbWFwLlxuXHQgKlxuXHQgKiBAcmV0dXJuIEFuIGl0ZXJhdG9yIGNvbnRhaW5pbmcgdGhlIGluc3RhbmNlJ3MgdmFsdWVzLlxuXHQgKi9cblx0dmFsdWVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Vj47XG5cblx0LyoqIFJldHVybnMgYW4gaXRlcmFibGUgb2YgZW50cmllcyBpbiB0aGUgbWFwLiAqL1xuXHRbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYWJsZUl0ZXJhdG9yPFtLLCBWXT47XG5cblx0cmVhZG9ubHkgW1N5bWJvbC50b1N0cmluZ1RhZ106IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYXBDb25zdHJ1Y3RvciB7XG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IE1hcFxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICovXG5cdG5ldyAoKTogTWFwPGFueSwgYW55PjtcblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBNYXBcblx0ICpcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqXG5cdCAqIEBwYXJhbSBpdGVyYXRvclxuXHQgKiBBcnJheSBvciBpdGVyYXRvciBjb250YWluaW5nIHR3by1pdGVtIHR1cGxlcyB1c2VkIHRvIGluaXRpYWxseSBwb3B1bGF0ZSB0aGUgbWFwLlxuXHQgKiBUaGUgZmlyc3QgaXRlbSBpbiBlYWNoIHR1cGxlIGNvcnJlc3BvbmRzIHRvIHRoZSBrZXkgb2YgdGhlIG1hcCBlbnRyeS5cblx0ICogVGhlIHNlY29uZCBpdGVtIGNvcnJlc3BvbmRzIHRvIHRoZSB2YWx1ZSBvZiB0aGUgbWFwIGVudHJ5LlxuXHQgKi9cblx0bmV3IDxLLCBWPihpdGVyYXRvcj86IFtLLCBWXVtdKTogTWFwPEssIFY+O1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IE1hcFxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICpcblx0ICogQHBhcmFtIGl0ZXJhdG9yXG5cdCAqIEFycmF5IG9yIGl0ZXJhdG9yIGNvbnRhaW5pbmcgdHdvLWl0ZW0gdHVwbGVzIHVzZWQgdG8gaW5pdGlhbGx5IHBvcHVsYXRlIHRoZSBtYXAuXG5cdCAqIFRoZSBmaXJzdCBpdGVtIGluIGVhY2ggdHVwbGUgY29ycmVzcG9uZHMgdG8gdGhlIGtleSBvZiB0aGUgbWFwIGVudHJ5LlxuXHQgKiBUaGUgc2Vjb25kIGl0ZW0gY29ycmVzcG9uZHMgdG8gdGhlIHZhbHVlIG9mIHRoZSBtYXAgZW50cnkuXG5cdCAqL1xuXHRuZXcgPEssIFY+KGl0ZXJhdG9yOiBJdGVyYWJsZTxbSywgVl0+KTogTWFwPEssIFY+O1xuXG5cdHJlYWRvbmx5IHByb3RvdHlwZTogTWFwPGFueSwgYW55PjtcblxuXHRyZWFkb25seSBbU3ltYm9sLnNwZWNpZXNdOiBNYXBDb25zdHJ1Y3Rvcjtcbn1cblxuZXhwb3J0IGxldCBNYXA6IE1hcENvbnN0cnVjdG9yID0gZ2xvYmFsLk1hcDtcblxuaWYgKCFoYXMoJ2VzNi1tYXAnKSkge1xuXHRNYXAgPSBjbGFzcyBNYXA8SywgVj4ge1xuXHRcdHByb3RlY3RlZCByZWFkb25seSBfa2V5czogS1tdID0gW107XG5cdFx0cHJvdGVjdGVkIHJlYWRvbmx5IF92YWx1ZXM6IFZbXSA9IFtdO1xuXG5cdFx0LyoqXG5cdFx0ICogQW4gYWx0ZXJuYXRpdmUgdG8gQXJyYXkucHJvdG90eXBlLmluZGV4T2YgdXNpbmcgT2JqZWN0LmlzXG5cdFx0ICogdG8gY2hlY2sgZm9yIGVxdWFsaXR5LiBTZWUgaHR0cDovL216bC5sYS8xenVLTzJWXG5cdFx0ICovXG5cdFx0cHJvdGVjdGVkIF9pbmRleE9mS2V5KGtleXM6IEtbXSwga2V5OiBLKTogbnVtYmVyIHtcblx0XHRcdGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChvYmplY3RJcyhrZXlzW2ldLCBrZXkpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiAtMTtcblx0XHR9XG5cblx0XHRzdGF0aWMgW1N5bWJvbC5zcGVjaWVzXSA9IE1hcDtcblxuXHRcdGNvbnN0cnVjdG9yKGl0ZXJhYmxlPzogQXJyYXlMaWtlPFtLLCBWXT4gfCBJdGVyYWJsZTxbSywgVl0+KSB7XG5cdFx0XHRpZiAoaXRlcmFibGUpIHtcblx0XHRcdFx0aWYgKGlzQXJyYXlMaWtlKGl0ZXJhYmxlKSkge1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaXRlcmFibGUubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gaXRlcmFibGVbaV07XG5cdFx0XHRcdFx0XHR0aGlzLnNldCh2YWx1ZVswXSwgdmFsdWVbMV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRmb3IgKGNvbnN0IHZhbHVlIG9mIGl0ZXJhYmxlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNldCh2YWx1ZVswXSwgdmFsdWVbMV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGdldCBzaXplKCk6IG51bWJlciB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fa2V5cy5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0Y2xlYXIoKTogdm9pZCB7XG5cdFx0XHR0aGlzLl9rZXlzLmxlbmd0aCA9IHRoaXMuX3ZhbHVlcy5sZW5ndGggPSAwO1xuXHRcdH1cblxuXHRcdGRlbGV0ZShrZXk6IEspOiBib29sZWFuIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy5faW5kZXhPZktleSh0aGlzLl9rZXlzLCBrZXkpO1xuXHRcdFx0aWYgKGluZGV4IDwgMCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9rZXlzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHR0aGlzLl92YWx1ZXMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGVudHJpZXMoKTogSXRlcmFibGVJdGVyYXRvcjxbSywgVl0+IHtcblx0XHRcdGNvbnN0IHZhbHVlcyA9IHRoaXMuX2tleXMubWFwKFxuXHRcdFx0XHQoa2V5OiBLLCBpOiBudW1iZXIpOiBbSywgVl0gPT4ge1xuXHRcdFx0XHRcdHJldHVybiBba2V5LCB0aGlzLl92YWx1ZXNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXG5cdFx0XHRyZXR1cm4gbmV3IFNoaW1JdGVyYXRvcih2YWx1ZXMpO1xuXHRcdH1cblxuXHRcdGZvckVhY2goY2FsbGJhY2s6ICh2YWx1ZTogViwga2V5OiBLLCBtYXBJbnN0YW5jZTogTWFwPEssIFY+KSA9PiBhbnksIGNvbnRleHQ/OiB7fSkge1xuXHRcdFx0Y29uc3Qga2V5cyA9IHRoaXMuX2tleXM7XG5cdFx0XHRjb25zdCB2YWx1ZXMgPSB0aGlzLl92YWx1ZXM7XG5cdFx0XHRmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjYWxsYmFjay5jYWxsKGNvbnRleHQsIHZhbHVlc1tpXSwga2V5c1tpXSwgdGhpcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Z2V0KGtleTogSyk6IFYgfCB1bmRlZmluZWQge1xuXHRcdFx0Y29uc3QgaW5kZXggPSB0aGlzLl9pbmRleE9mS2V5KHRoaXMuX2tleXMsIGtleSk7XG5cdFx0XHRyZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogdGhpcy5fdmFsdWVzW2luZGV4XTtcblx0XHR9XG5cblx0XHRoYXMoa2V5OiBLKTogYm9vbGVhbiB7XG5cdFx0XHRyZXR1cm4gdGhpcy5faW5kZXhPZktleSh0aGlzLl9rZXlzLCBrZXkpID4gLTE7XG5cdFx0fVxuXG5cdFx0a2V5cygpOiBJdGVyYWJsZUl0ZXJhdG9yPEs+IHtcblx0XHRcdHJldHVybiBuZXcgU2hpbUl0ZXJhdG9yKHRoaXMuX2tleXMpO1xuXHRcdH1cblxuXHRcdHNldChrZXk6IEssIHZhbHVlOiBWKTogTWFwPEssIFY+IHtcblx0XHRcdGxldCBpbmRleCA9IHRoaXMuX2luZGV4T2ZLZXkodGhpcy5fa2V5cywga2V5KTtcblx0XHRcdGluZGV4ID0gaW5kZXggPCAwID8gdGhpcy5fa2V5cy5sZW5ndGggOiBpbmRleDtcblx0XHRcdHRoaXMuX2tleXNbaW5kZXhdID0ga2V5O1xuXHRcdFx0dGhpcy5fdmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0dmFsdWVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Vj4ge1xuXHRcdFx0cmV0dXJuIG5ldyBTaGltSXRlcmF0b3IodGhpcy5fdmFsdWVzKTtcblx0XHR9XG5cblx0XHRbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYWJsZUl0ZXJhdG9yPFtLLCBWXT4ge1xuXHRcdFx0cmV0dXJuIHRoaXMuZW50cmllcygpO1xuXHRcdH1cblxuXHRcdFtTeW1ib2wudG9TdHJpbmdUYWddOiAnTWFwJyA9ICdNYXAnO1xuXHR9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBNYXA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gTWFwLnRzIiwiaW1wb3J0IHsgVGhlbmFibGUgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IGdsb2JhbCBmcm9tICcuL2dsb2JhbCc7XG5pbXBvcnQgeyBxdWV1ZU1pY3JvVGFzayB9IGZyb20gJy4vc3VwcG9ydC9xdWV1ZSc7XG5pbXBvcnQgeyBJdGVyYWJsZSB9IGZyb20gJy4vaXRlcmF0b3InO1xuaW1wb3J0ICcuL1N5bWJvbCc7XG5pbXBvcnQgaGFzIGZyb20gJy4vc3VwcG9ydC9oYXMnO1xuXG4vKipcbiAqIEV4ZWN1dG9yIGlzIHRoZSBpbnRlcmZhY2UgZm9yIGZ1bmN0aW9ucyB1c2VkIHRvIGluaXRpYWxpemUgYSBQcm9taXNlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEV4ZWN1dG9yPFQ+IHtcblx0LyoqXG5cdCAqIFRoZSBleGVjdXRvciBmb3IgdGhlIHByb21pc2Vcblx0ICpcblx0ICogQHBhcmFtIHJlc29sdmUgVGhlIHJlc29sdmVyIGNhbGxiYWNrIG9mIHRoZSBwcm9taXNlXG5cdCAqIEBwYXJhbSByZWplY3QgVGhlIHJlamVjdG9yIGNhbGxiYWNrIG9mIHRoZSBwcm9taXNlXG5cdCAqL1xuXHQocmVzb2x2ZTogKHZhbHVlPzogVCB8IFByb21pc2VMaWtlPFQ+KSA9PiB2b2lkLCByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQpOiB2b2lkO1xufVxuXG5leHBvcnQgbGV0IFNoaW1Qcm9taXNlOiB0eXBlb2YgUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xuXG5leHBvcnQgY29uc3QgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uIGlzVGhlbmFibGU8VD4odmFsdWU6IGFueSk6IHZhbHVlIGlzIFByb21pc2VMaWtlPFQ+IHtcblx0cmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nO1xufTtcblxuaWYgKCFoYXMoJ2VzNi1wcm9taXNlJykpIHtcblx0Y29uc3QgZW51bSBTdGF0ZSB7XG5cdFx0RnVsZmlsbGVkLFxuXHRcdFBlbmRpbmcsXG5cdFx0UmVqZWN0ZWRcblx0fVxuXG5cdGdsb2JhbC5Qcm9taXNlID0gU2hpbVByb21pc2UgPSBjbGFzcyBQcm9taXNlPFQ+IGltcGxlbWVudHMgVGhlbmFibGU8VD4ge1xuXHRcdHN0YXRpYyBhbGwoaXRlcmFibGU6IEl0ZXJhYmxlPGFueSB8IFByb21pc2VMaWtlPGFueT4+IHwgKGFueSB8IFByb21pc2VMaWtlPGFueT4pW10pOiBQcm9taXNlPGFueT4ge1xuXHRcdFx0cmV0dXJuIG5ldyB0aGlzKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0XHRjb25zdCB2YWx1ZXM6IGFueVtdID0gW107XG5cdFx0XHRcdGxldCBjb21wbGV0ZSA9IDA7XG5cdFx0XHRcdGxldCB0b3RhbCA9IDA7XG5cdFx0XHRcdGxldCBwb3B1bGF0aW5nID0gdHJ1ZTtcblxuXHRcdFx0XHRmdW5jdGlvbiBmdWxmaWxsKGluZGV4OiBudW1iZXIsIHZhbHVlOiBhbnkpOiB2b2lkIHtcblx0XHRcdFx0XHR2YWx1ZXNbaW5kZXhdID0gdmFsdWU7XG5cdFx0XHRcdFx0Kytjb21wbGV0ZTtcblx0XHRcdFx0XHRmaW5pc2goKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZ1bmN0aW9uIGZpbmlzaCgpOiB2b2lkIHtcblx0XHRcdFx0XHRpZiAocG9wdWxhdGluZyB8fCBjb21wbGV0ZSA8IHRvdGFsKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJlc29sdmUodmFsdWVzKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZ1bmN0aW9uIHByb2Nlc3NJdGVtKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSk6IHZvaWQge1xuXHRcdFx0XHRcdCsrdG90YWw7XG5cdFx0XHRcdFx0aWYgKGlzVGhlbmFibGUoaXRlbSkpIHtcblx0XHRcdFx0XHRcdC8vIElmIGFuIGl0ZW0gUHJvbWlzZSByZWplY3RzLCB0aGlzIFByb21pc2UgaXMgaW1tZWRpYXRlbHkgcmVqZWN0ZWQgd2l0aCB0aGUgaXRlbVxuXHRcdFx0XHRcdFx0Ly8gUHJvbWlzZSdzIHJlamVjdGlvbiBlcnJvci5cblx0XHRcdFx0XHRcdGl0ZW0udGhlbihmdWxmaWxsLmJpbmQobnVsbCwgaW5kZXgpLCByZWplY3QpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRQcm9taXNlLnJlc29sdmUoaXRlbSkudGhlbihmdWxmaWxsLmJpbmQobnVsbCwgaW5kZXgpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgaSA9IDA7XG5cdFx0XHRcdGZvciAoY29uc3QgdmFsdWUgb2YgaXRlcmFibGUpIHtcblx0XHRcdFx0XHRwcm9jZXNzSXRlbShpLCB2YWx1ZSk7XG5cdFx0XHRcdFx0aSsrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHBvcHVsYXRpbmcgPSBmYWxzZTtcblxuXHRcdFx0XHRmaW5pc2goKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHN0YXRpYyByYWNlPFQ+KGl0ZXJhYmxlOiBJdGVyYWJsZTxUIHwgUHJvbWlzZUxpa2U8VD4+IHwgKFQgfCBQcm9taXNlTGlrZTxUPilbXSk6IFByb21pc2U8VFtdPiB7XG5cdFx0XHRyZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24ocmVzb2x2ZTogKHZhbHVlPzogYW55KSA9PiB2b2lkLCByZWplY3QpIHtcblx0XHRcdFx0Zm9yIChjb25zdCBpdGVtIG9mIGl0ZXJhYmxlKSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW0gaW5zdGFuY2VvZiBQcm9taXNlKSB7XG5cdFx0XHRcdFx0XHQvLyBJZiBhIFByb21pc2UgaXRlbSByZWplY3RzLCB0aGlzIFByb21pc2UgaXMgaW1tZWRpYXRlbHkgcmVqZWN0ZWQgd2l0aCB0aGUgaXRlbVxuXHRcdFx0XHRcdFx0Ly8gUHJvbWlzZSdzIHJlamVjdGlvbiBlcnJvci5cblx0XHRcdFx0XHRcdGl0ZW0udGhlbihyZXNvbHZlLCByZWplY3QpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRQcm9taXNlLnJlc29sdmUoaXRlbSkudGhlbihyZXNvbHZlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHN0YXRpYyByZWplY3QocmVhc29uPzogYW55KTogUHJvbWlzZTxuZXZlcj4ge1xuXHRcdFx0cmV0dXJuIG5ldyB0aGlzKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0XHRyZWplY3QocmVhc29uKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHN0YXRpYyByZXNvbHZlKCk6IFByb21pc2U8dm9pZD47XG5cdFx0c3RhdGljIHJlc29sdmU8VD4odmFsdWU6IFQgfCBQcm9taXNlTGlrZTxUPik6IFByb21pc2U8VD47XG5cdFx0c3RhdGljIHJlc29sdmU8VD4odmFsdWU/OiBhbnkpOiBQcm9taXNlPFQ+IHtcblx0XHRcdHJldHVybiBuZXcgdGhpcyhmdW5jdGlvbihyZXNvbHZlKSB7XG5cdFx0XHRcdHJlc29sdmUoPFQ+dmFsdWUpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0c3RhdGljIFtTeW1ib2wuc3BlY2llc106IFByb21pc2VDb25zdHJ1Y3RvciA9IFNoaW1Qcm9taXNlIGFzIFByb21pc2VDb25zdHJ1Y3RvcjtcblxuXHRcdC8qKlxuXHRcdCAqIENyZWF0ZXMgYSBuZXcgUHJvbWlzZS5cblx0XHQgKlxuXHRcdCAqIEBjb25zdHJ1Y3RvclxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIGV4ZWN1dG9yXG5cdFx0ICogVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBpbW1lZGlhdGVseSB3aGVuIHRoZSBQcm9taXNlIGlzIGluc3RhbnRpYXRlZC4gSXQgaXMgcmVzcG9uc2libGUgZm9yXG5cdFx0ICogc3RhcnRpbmcgdGhlIGFzeW5jaHJvbm91cyBvcGVyYXRpb24gd2hlbiBpdCBpcyBpbnZva2VkLlxuXHRcdCAqXG5cdFx0ICogVGhlIGV4ZWN1dG9yIG11c3QgY2FsbCBlaXRoZXIgdGhlIHBhc3NlZCBgcmVzb2x2ZWAgZnVuY3Rpb24gd2hlbiB0aGUgYXN5bmNocm9ub3VzIG9wZXJhdGlvbiBoYXMgY29tcGxldGVkXG5cdFx0ICogc3VjY2Vzc2Z1bGx5LCBvciB0aGUgYHJlamVjdGAgZnVuY3Rpb24gd2hlbiB0aGUgb3BlcmF0aW9uIGZhaWxzLlxuXHRcdCAqL1xuXHRcdGNvbnN0cnVjdG9yKGV4ZWN1dG9yOiBFeGVjdXRvcjxUPikge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBJZiB0cnVlLCB0aGUgcmVzb2x1dGlvbiBvZiB0aGlzIHByb21pc2UgaXMgY2hhaW5lZCAoXCJsb2NrZWQgaW5cIikgdG8gYW5vdGhlciBwcm9taXNlLlxuXHRcdFx0ICovXG5cdFx0XHRsZXQgaXNDaGFpbmVkID0gZmFsc2U7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogV2hldGhlciBvciBub3QgdGhpcyBwcm9taXNlIGlzIGluIGEgcmVzb2x2ZWQgc3RhdGUuXG5cdFx0XHQgKi9cblx0XHRcdGNvbnN0IGlzUmVzb2x2ZWQgPSAoKTogYm9vbGVhbiA9PiB7XG5cdFx0XHRcdHJldHVybiB0aGlzLnN0YXRlICE9PSBTdGF0ZS5QZW5kaW5nIHx8IGlzQ2hhaW5lZDtcblx0XHRcdH07XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQ2FsbGJhY2tzIHRoYXQgc2hvdWxkIGJlIGludm9rZWQgb25jZSB0aGUgYXN5bmNocm9ub3VzIG9wZXJhdGlvbiBoYXMgY29tcGxldGVkLlxuXHRcdFx0ICovXG5cdFx0XHRsZXQgY2FsbGJhY2tzOiBudWxsIHwgKEFycmF5PCgpID0+IHZvaWQ+KSA9IFtdO1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIEluaXRpYWxseSBwdXNoZXMgY2FsbGJhY2tzIG9udG8gYSBxdWV1ZSBmb3IgZXhlY3V0aW9uIG9uY2UgdGhpcyBwcm9taXNlIHNldHRsZXMuIEFmdGVyIHRoZSBwcm9taXNlIHNldHRsZXMsXG5cdFx0XHQgKiBlbnF1ZXVlcyBjYWxsYmFja3MgZm9yIGV4ZWN1dGlvbiBvbiB0aGUgbmV4dCBldmVudCBsb29wIHR1cm4uXG5cdFx0XHQgKi9cblx0XHRcdGxldCB3aGVuRmluaXNoZWQgPSBmdW5jdGlvbihjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xuXHRcdFx0XHRpZiAoY2FsbGJhY2tzKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNldHRsZXMgdGhpcyBwcm9taXNlLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBuZXdTdGF0ZSBUaGUgcmVzb2x2ZWQgc3RhdGUgZm9yIHRoaXMgcHJvbWlzZS5cblx0XHRcdCAqIEBwYXJhbSB7VHxhbnl9IHZhbHVlIFRoZSByZXNvbHZlZCB2YWx1ZSBmb3IgdGhpcyBwcm9taXNlLlxuXHRcdFx0ICovXG5cdFx0XHRjb25zdCBzZXR0bGUgPSAobmV3U3RhdGU6IFN0YXRlLCB2YWx1ZTogYW55KTogdm9pZCA9PiB7XG5cdFx0XHRcdC8vIEEgcHJvbWlzZSBjYW4gb25seSBiZSBzZXR0bGVkIG9uY2UuXG5cdFx0XHRcdGlmICh0aGlzLnN0YXRlICE9PSBTdGF0ZS5QZW5kaW5nKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5zdGF0ZSA9IG5ld1N0YXRlO1xuXHRcdFx0XHR0aGlzLnJlc29sdmVkVmFsdWUgPSB2YWx1ZTtcblx0XHRcdFx0d2hlbkZpbmlzaGVkID0gcXVldWVNaWNyb1Rhc2s7XG5cblx0XHRcdFx0Ly8gT25seSBlbnF1ZXVlIGEgY2FsbGJhY2sgcnVubmVyIGlmIHRoZXJlIGFyZSBjYWxsYmFja3Mgc28gdGhhdCBpbml0aWFsbHkgZnVsZmlsbGVkIFByb21pc2VzIGRvbid0IGhhdmUgdG9cblx0XHRcdFx0Ly8gd2FpdCBhbiBleHRyYSB0dXJuLlxuXHRcdFx0XHRpZiAoY2FsbGJhY2tzICYmIGNhbGxiYWNrcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0cXVldWVNaWNyb1Rhc2soZnVuY3Rpb24oKTogdm9pZCB7XG5cdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzKSB7XG5cdFx0XHRcdFx0XHRcdGxldCBjb3VudCA9IGNhbGxiYWNrcy5sZW5ndGg7XG5cdFx0XHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7ICsraSkge1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrc1tpXS5jYWxsKG51bGwpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrcyA9IG51bGw7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUmVzb2x2ZXMgdGhpcyBwcm9taXNlLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBuZXdTdGF0ZSBUaGUgcmVzb2x2ZWQgc3RhdGUgZm9yIHRoaXMgcHJvbWlzZS5cblx0XHRcdCAqIEBwYXJhbSB7VHxhbnl9IHZhbHVlIFRoZSByZXNvbHZlZCB2YWx1ZSBmb3IgdGhpcyBwcm9taXNlLlxuXHRcdFx0ICovXG5cdFx0XHRjb25zdCByZXNvbHZlID0gKG5ld1N0YXRlOiBTdGF0ZSwgdmFsdWU6IGFueSk6IHZvaWQgPT4ge1xuXHRcdFx0XHRpZiAoaXNSZXNvbHZlZCgpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGlzVGhlbmFibGUodmFsdWUpKSB7XG5cdFx0XHRcdFx0dmFsdWUudGhlbihzZXR0bGUuYmluZChudWxsLCBTdGF0ZS5GdWxmaWxsZWQpLCBzZXR0bGUuYmluZChudWxsLCBTdGF0ZS5SZWplY3RlZCkpO1xuXHRcdFx0XHRcdGlzQ2hhaW5lZCA9IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c2V0dGxlKG5ld1N0YXRlLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdHRoaXMudGhlbiA9IDxUUmVzdWx0MSA9IFQsIFRSZXN1bHQyID0gbmV2ZXI+KFxuXHRcdFx0XHRvbkZ1bGZpbGxlZD86ICgodmFsdWU6IFQpID0+IFRSZXN1bHQxIHwgUHJvbWlzZUxpa2U8VFJlc3VsdDE+KSB8IHVuZGVmaW5lZCB8IG51bGwsXG5cdFx0XHRcdG9uUmVqZWN0ZWQ/OiAoKHJlYXNvbjogYW55KSA9PiBUUmVzdWx0MiB8IFByb21pc2VMaWtlPFRSZXN1bHQyPikgfCB1bmRlZmluZWQgfCBudWxsXG5cdFx0XHQpOiBQcm9taXNlPFRSZXN1bHQxIHwgVFJlc3VsdDI+ID0+IHtcblx0XHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0XHQvLyB3aGVuRmluaXNoZWQgaW5pdGlhbGx5IHF1ZXVlcyB1cCBjYWxsYmFja3MgZm9yIGV4ZWN1dGlvbiBhZnRlciB0aGUgcHJvbWlzZSBoYXMgc2V0dGxlZC4gT25jZSB0aGVcblx0XHRcdFx0XHQvLyBwcm9taXNlIGhhcyBzZXR0bGVkLCB3aGVuRmluaXNoZWQgd2lsbCBzY2hlZHVsZSBjYWxsYmFja3MgZm9yIGV4ZWN1dGlvbiBvbiB0aGUgbmV4dCB0dXJuIHRocm91Z2ggdGhlXG5cdFx0XHRcdFx0Ly8gZXZlbnQgbG9vcC5cblx0XHRcdFx0XHR3aGVuRmluaXNoZWQoKCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgY2FsbGJhY2s6ICgodmFsdWU/OiBhbnkpID0+IGFueSkgfCB1bmRlZmluZWQgfCBudWxsID1cblx0XHRcdFx0XHRcdFx0dGhpcy5zdGF0ZSA9PT0gU3RhdGUuUmVqZWN0ZWQgPyBvblJlamVjdGVkIDogb25GdWxmaWxsZWQ7XG5cblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKGNhbGxiYWNrKHRoaXMucmVzb2x2ZWRWYWx1ZSkpO1xuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5zdGF0ZSA9PT0gU3RhdGUuUmVqZWN0ZWQpIHtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KHRoaXMucmVzb2x2ZWRWYWx1ZSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKHRoaXMucmVzb2x2ZWRWYWx1ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZXhlY3V0b3IocmVzb2x2ZS5iaW5kKG51bGwsIFN0YXRlLkZ1bGZpbGxlZCksIHJlc29sdmUuYmluZChudWxsLCBTdGF0ZS5SZWplY3RlZCkpO1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0c2V0dGxlKFN0YXRlLlJlamVjdGVkLCBlcnJvcik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y2F0Y2g8VFJlc3VsdCA9IG5ldmVyPihcblx0XHRcdG9uUmVqZWN0ZWQ/OiAoKHJlYXNvbjogYW55KSA9PiBUUmVzdWx0IHwgUHJvbWlzZUxpa2U8VFJlc3VsdD4pIHwgdW5kZWZpbmVkIHwgbnVsbFxuXHRcdCk6IFByb21pc2U8VCB8IFRSZXN1bHQ+IHtcblx0XHRcdHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBUaGUgY3VycmVudCBzdGF0ZSBvZiB0aGlzIHByb21pc2UuXG5cdFx0ICovXG5cdFx0cHJpdmF0ZSBzdGF0ZSA9IFN0YXRlLlBlbmRpbmc7XG5cblx0XHQvKipcblx0XHQgKiBUaGUgcmVzb2x2ZWQgdmFsdWUgZm9yIHRoaXMgcHJvbWlzZS5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIHtUfGFueX1cblx0XHQgKi9cblx0XHRwcml2YXRlIHJlc29sdmVkVmFsdWU6IGFueTtcblxuXHRcdHRoZW46IDxUUmVzdWx0MSA9IFQsIFRSZXN1bHQyID0gbmV2ZXI+KFxuXHRcdFx0b25mdWxmaWxsZWQ/OiAoKHZhbHVlOiBUKSA9PiBUUmVzdWx0MSB8IFByb21pc2VMaWtlPFRSZXN1bHQxPikgfCB1bmRlZmluZWQgfCBudWxsLFxuXHRcdFx0b25yZWplY3RlZD86ICgocmVhc29uOiBhbnkpID0+IFRSZXN1bHQyIHwgUHJvbWlzZUxpa2U8VFJlc3VsdDI+KSB8IHVuZGVmaW5lZCB8IG51bGxcblx0XHQpID0+IFByb21pc2U8VFJlc3VsdDEgfCBUUmVzdWx0Mj47XG5cblx0XHRbU3ltYm9sLnRvU3RyaW5nVGFnXTogJ1Byb21pc2UnID0gJ1Byb21pc2UnO1xuXHR9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBTaGltUHJvbWlzZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBQcm9taXNlLnRzIiwiaW1wb3J0IGhhcyBmcm9tICcuL3N1cHBvcnQvaGFzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuaW1wb3J0IHsgZ2V0VmFsdWVEZXNjcmlwdG9yIH0gZnJvbSAnLi9zdXBwb3J0L3V0aWwnO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG5cdGludGVyZmFjZSBTeW1ib2xDb25zdHJ1Y3RvciB7XG5cdFx0b2JzZXJ2YWJsZTogc3ltYm9sO1xuXHR9XG59XG5cbmV4cG9ydCBsZXQgU3ltYm9sOiBTeW1ib2xDb25zdHJ1Y3RvciA9IGdsb2JhbC5TeW1ib2w7XG5cbmlmICghaGFzKCdlczYtc3ltYm9sJykpIHtcblx0LyoqXG5cdCAqIFRocm93cyBpZiB0aGUgdmFsdWUgaXMgbm90IGEgc3ltYm9sLCB1c2VkIGludGVybmFsbHkgd2l0aGluIHRoZSBTaGltXG5cdCAqIEBwYXJhbSAge2FueX0gICAgdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrXG5cdCAqIEByZXR1cm4ge3N5bWJvbH0gICAgICAgUmV0dXJucyB0aGUgc3ltYm9sIG9yIHRocm93c1xuXHQgKi9cblx0Y29uc3QgdmFsaWRhdGVTeW1ib2wgPSBmdW5jdGlvbiB2YWxpZGF0ZVN5bWJvbCh2YWx1ZTogYW55KTogc3ltYm9sIHtcblx0XHRpZiAoIWlzU3ltYm9sKHZhbHVlKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcih2YWx1ZSArICcgaXMgbm90IGEgc3ltYm9sJyk7XG5cdFx0fVxuXHRcdHJldHVybiB2YWx1ZTtcblx0fTtcblxuXHRjb25zdCBkZWZpbmVQcm9wZXJ0aWVzID0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXM7XG5cdGNvbnN0IGRlZmluZVByb3BlcnR5OiAoXG5cdFx0bzogYW55LFxuXHRcdHA6IHN0cmluZyB8IHN5bWJvbCxcblx0XHRhdHRyaWJ1dGVzOiBQcm9wZXJ0eURlc2NyaXB0b3IgJiBUaGlzVHlwZTxhbnk+XG5cdCkgPT4gYW55ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5IGFzIGFueTtcblx0Y29uc3QgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcblxuXHRjb25zdCBvYmpQcm90b3R5cGUgPSBPYmplY3QucHJvdG90eXBlO1xuXG5cdGNvbnN0IGdsb2JhbFN5bWJvbHM6IHsgW2tleTogc3RyaW5nXTogc3ltYm9sIH0gPSB7fTtcblxuXHRjb25zdCBnZXRTeW1ib2xOYW1lID0gKGZ1bmN0aW9uKCkge1xuXHRcdGNvbnN0IGNyZWF0ZWQgPSBjcmVhdGUobnVsbCk7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGRlc2M6IHN0cmluZyB8IG51bWJlcik6IHN0cmluZyB7XG5cdFx0XHRsZXQgcG9zdGZpeCA9IDA7XG5cdFx0XHRsZXQgbmFtZTogc3RyaW5nO1xuXHRcdFx0d2hpbGUgKGNyZWF0ZWRbU3RyaW5nKGRlc2MpICsgKHBvc3RmaXggfHwgJycpXSkge1xuXHRcdFx0XHQrK3Bvc3RmaXg7XG5cdFx0XHR9XG5cdFx0XHRkZXNjICs9IFN0cmluZyhwb3N0Zml4IHx8ICcnKTtcblx0XHRcdGNyZWF0ZWRbZGVzY10gPSB0cnVlO1xuXHRcdFx0bmFtZSA9ICdAQCcgKyBkZXNjO1xuXG5cdFx0XHQvLyBGSVhNRTogVGVtcG9yYXJ5IGd1YXJkIHVudGlsIHRoZSBkdXBsaWNhdGUgZXhlY3V0aW9uIHdoZW4gdGVzdGluZyBjYW4gYmVcblx0XHRcdC8vIHBpbm5lZCBkb3duLlxuXHRcdFx0aWYgKCFPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9ialByb3RvdHlwZSwgbmFtZSkpIHtcblx0XHRcdFx0ZGVmaW5lUHJvcGVydHkob2JqUHJvdG90eXBlLCBuYW1lLCB7XG5cdFx0XHRcdFx0c2V0OiBmdW5jdGlvbih0aGlzOiBTeW1ib2wsIHZhbHVlOiBhbnkpIHtcblx0XHRcdFx0XHRcdGRlZmluZVByb3BlcnR5KHRoaXMsIG5hbWUsIGdldFZhbHVlRGVzY3JpcHRvcih2YWx1ZSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBuYW1lO1xuXHRcdH07XG5cdH0pKCk7XG5cblx0Y29uc3QgSW50ZXJuYWxTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2wodGhpczogYW55LCBkZXNjcmlwdGlvbj86IHN0cmluZyB8IG51bWJlcik6IHN5bWJvbCB7XG5cdFx0aWYgKHRoaXMgaW5zdGFuY2VvZiBJbnRlcm5hbFN5bWJvbCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignVHlwZUVycm9yOiBTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3InKTtcblx0XHR9XG5cdFx0cmV0dXJuIFN5bWJvbChkZXNjcmlwdGlvbik7XG5cdH07XG5cblx0U3ltYm9sID0gZ2xvYmFsLlN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCh0aGlzOiBTeW1ib2wsIGRlc2NyaXB0aW9uPzogc3RyaW5nIHwgbnVtYmVyKTogc3ltYm9sIHtcblx0XHRpZiAodGhpcyBpbnN0YW5jZW9mIFN5bWJvbCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignVHlwZUVycm9yOiBTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3InKTtcblx0XHR9XG5cdFx0Y29uc3Qgc3ltID0gT2JqZWN0LmNyZWF0ZShJbnRlcm5hbFN5bWJvbC5wcm90b3R5cGUpO1xuXHRcdGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24gPT09IHVuZGVmaW5lZCA/ICcnIDogU3RyaW5nKGRlc2NyaXB0aW9uKTtcblx0XHRyZXR1cm4gZGVmaW5lUHJvcGVydGllcyhzeW0sIHtcblx0XHRcdF9fZGVzY3JpcHRpb25fXzogZ2V0VmFsdWVEZXNjcmlwdG9yKGRlc2NyaXB0aW9uKSxcblx0XHRcdF9fbmFtZV9fOiBnZXRWYWx1ZURlc2NyaXB0b3IoZ2V0U3ltYm9sTmFtZShkZXNjcmlwdGlvbikpXG5cdFx0fSk7XG5cdH0gYXMgU3ltYm9sQ29uc3RydWN0b3I7XG5cblx0LyogRGVjb3JhdGUgdGhlIFN5bWJvbCBmdW5jdGlvbiB3aXRoIHRoZSBhcHByb3ByaWF0ZSBwcm9wZXJ0aWVzICovXG5cdGRlZmluZVByb3BlcnR5KFxuXHRcdFN5bWJvbCxcblx0XHQnZm9yJyxcblx0XHRnZXRWYWx1ZURlc2NyaXB0b3IoZnVuY3Rpb24oa2V5OiBzdHJpbmcpOiBzeW1ib2wge1xuXHRcdFx0aWYgKGdsb2JhbFN5bWJvbHNba2V5XSkge1xuXHRcdFx0XHRyZXR1cm4gZ2xvYmFsU3ltYm9sc1trZXldO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIChnbG9iYWxTeW1ib2xzW2tleV0gPSBTeW1ib2woU3RyaW5nKGtleSkpKTtcblx0XHR9KVxuXHQpO1xuXHRkZWZpbmVQcm9wZXJ0aWVzKFN5bWJvbCwge1xuXHRcdGtleUZvcjogZ2V0VmFsdWVEZXNjcmlwdG9yKGZ1bmN0aW9uKHN5bTogc3ltYm9sKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0XHRcdGxldCBrZXk6IHN0cmluZztcblx0XHRcdHZhbGlkYXRlU3ltYm9sKHN5bSk7XG5cdFx0XHRmb3IgKGtleSBpbiBnbG9iYWxTeW1ib2xzKSB7XG5cdFx0XHRcdGlmIChnbG9iYWxTeW1ib2xzW2tleV0gPT09IHN5bSkge1xuXHRcdFx0XHRcdHJldHVybiBrZXk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KSxcblx0XHRoYXNJbnN0YW5jZTogZ2V0VmFsdWVEZXNjcmlwdG9yKFN5bWJvbC5mb3IoJ2hhc0luc3RhbmNlJyksIGZhbHNlLCBmYWxzZSksXG5cdFx0aXNDb25jYXRTcHJlYWRhYmxlOiBnZXRWYWx1ZURlc2NyaXB0b3IoU3ltYm9sLmZvcignaXNDb25jYXRTcHJlYWRhYmxlJyksIGZhbHNlLCBmYWxzZSksXG5cdFx0aXRlcmF0b3I6IGdldFZhbHVlRGVzY3JpcHRvcihTeW1ib2wuZm9yKCdpdGVyYXRvcicpLCBmYWxzZSwgZmFsc2UpLFxuXHRcdG1hdGNoOiBnZXRWYWx1ZURlc2NyaXB0b3IoU3ltYm9sLmZvcignbWF0Y2gnKSwgZmFsc2UsIGZhbHNlKSxcblx0XHRvYnNlcnZhYmxlOiBnZXRWYWx1ZURlc2NyaXB0b3IoU3ltYm9sLmZvcignb2JzZXJ2YWJsZScpLCBmYWxzZSwgZmFsc2UpLFxuXHRcdHJlcGxhY2U6IGdldFZhbHVlRGVzY3JpcHRvcihTeW1ib2wuZm9yKCdyZXBsYWNlJyksIGZhbHNlLCBmYWxzZSksXG5cdFx0c2VhcmNoOiBnZXRWYWx1ZURlc2NyaXB0b3IoU3ltYm9sLmZvcignc2VhcmNoJyksIGZhbHNlLCBmYWxzZSksXG5cdFx0c3BlY2llczogZ2V0VmFsdWVEZXNjcmlwdG9yKFN5bWJvbC5mb3IoJ3NwZWNpZXMnKSwgZmFsc2UsIGZhbHNlKSxcblx0XHRzcGxpdDogZ2V0VmFsdWVEZXNjcmlwdG9yKFN5bWJvbC5mb3IoJ3NwbGl0JyksIGZhbHNlLCBmYWxzZSksXG5cdFx0dG9QcmltaXRpdmU6IGdldFZhbHVlRGVzY3JpcHRvcihTeW1ib2wuZm9yKCd0b1ByaW1pdGl2ZScpLCBmYWxzZSwgZmFsc2UpLFxuXHRcdHRvU3RyaW5nVGFnOiBnZXRWYWx1ZURlc2NyaXB0b3IoU3ltYm9sLmZvcigndG9TdHJpbmdUYWcnKSwgZmFsc2UsIGZhbHNlKSxcblx0XHR1bnNjb3BhYmxlczogZ2V0VmFsdWVEZXNjcmlwdG9yKFN5bWJvbC5mb3IoJ3Vuc2NvcGFibGVzJyksIGZhbHNlLCBmYWxzZSlcblx0fSk7XG5cblx0LyogRGVjb3JhdGUgdGhlIEludGVybmFsU3ltYm9sIG9iamVjdCAqL1xuXHRkZWZpbmVQcm9wZXJ0aWVzKEludGVybmFsU3ltYm9sLnByb3RvdHlwZSwge1xuXHRcdGNvbnN0cnVjdG9yOiBnZXRWYWx1ZURlc2NyaXB0b3IoU3ltYm9sKSxcblx0XHR0b1N0cmluZzogZ2V0VmFsdWVEZXNjcmlwdG9yKFxuXHRcdFx0ZnVuY3Rpb24odGhpczogeyBfX25hbWVfXzogc3RyaW5nIH0pIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX19uYW1lX187XG5cdFx0XHR9LFxuXHRcdFx0ZmFsc2UsXG5cdFx0XHRmYWxzZVxuXHRcdClcblx0fSk7XG5cblx0LyogRGVjb3JhdGUgdGhlIFN5bWJvbC5wcm90b3R5cGUgKi9cblx0ZGVmaW5lUHJvcGVydGllcyhTeW1ib2wucHJvdG90eXBlLCB7XG5cdFx0dG9TdHJpbmc6IGdldFZhbHVlRGVzY3JpcHRvcihmdW5jdGlvbih0aGlzOiBTeW1ib2wpIHtcblx0XHRcdHJldHVybiAnU3ltYm9sICgnICsgKDxhbnk+dmFsaWRhdGVTeW1ib2wodGhpcykpLl9fZGVzY3JpcHRpb25fXyArICcpJztcblx0XHR9KSxcblx0XHR2YWx1ZU9mOiBnZXRWYWx1ZURlc2NyaXB0b3IoZnVuY3Rpb24odGhpczogU3ltYm9sKSB7XG5cdFx0XHRyZXR1cm4gdmFsaWRhdGVTeW1ib2wodGhpcyk7XG5cdFx0fSlcblx0fSk7XG5cblx0ZGVmaW5lUHJvcGVydHkoXG5cdFx0U3ltYm9sLnByb3RvdHlwZSxcblx0XHRTeW1ib2wudG9QcmltaXRpdmUsXG5cdFx0Z2V0VmFsdWVEZXNjcmlwdG9yKGZ1bmN0aW9uKHRoaXM6IFN5bWJvbCkge1xuXHRcdFx0cmV0dXJuIHZhbGlkYXRlU3ltYm9sKHRoaXMpO1xuXHRcdH0pXG5cdCk7XG5cdGRlZmluZVByb3BlcnR5KFN5bWJvbC5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywgZ2V0VmFsdWVEZXNjcmlwdG9yKCdTeW1ib2wnLCBmYWxzZSwgZmFsc2UsIHRydWUpKTtcblxuXHRkZWZpbmVQcm9wZXJ0eShcblx0XHRJbnRlcm5hbFN5bWJvbC5wcm90b3R5cGUsXG5cdFx0U3ltYm9sLnRvUHJpbWl0aXZlLFxuXHRcdGdldFZhbHVlRGVzY3JpcHRvcigoPGFueT5TeW1ib2wpLnByb3RvdHlwZVtTeW1ib2wudG9QcmltaXRpdmVdLCBmYWxzZSwgZmFsc2UsIHRydWUpXG5cdCk7XG5cdGRlZmluZVByb3BlcnR5KFxuXHRcdEludGVybmFsU3ltYm9sLnByb3RvdHlwZSxcblx0XHRTeW1ib2wudG9TdHJpbmdUYWcsXG5cdFx0Z2V0VmFsdWVEZXNjcmlwdG9yKCg8YW55PlN5bWJvbCkucHJvdG90eXBlW1N5bWJvbC50b1N0cmluZ1RhZ10sIGZhbHNlLCBmYWxzZSwgdHJ1ZSlcblx0KTtcbn1cblxuLyoqXG4gKiBBIGN1c3RvbSBndWFyZCBmdW5jdGlvbiB0aGF0IGRldGVybWluZXMgaWYgYW4gb2JqZWN0IGlzIGEgc3ltYm9sIG9yIG5vdFxuICogQHBhcmFtICB7YW55fSAgICAgICB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2sgdG8gc2VlIGlmIGl0IGlzIGEgc3ltYm9sIG9yIG5vdFxuICogQHJldHVybiB7aXMgc3ltYm9sfSAgICAgICBSZXR1cm5zIHRydWUgaWYgYSBzeW1ib2wgb3Igbm90IChhbmQgbmFycm93cyB0aGUgdHlwZSBndWFyZClcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBzeW1ib2wge1xuXHRyZXR1cm4gKHZhbHVlICYmICh0eXBlb2YgdmFsdWUgPT09ICdzeW1ib2wnIHx8IHZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSkgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogRmlsbCBhbnkgbWlzc2luZyB3ZWxsIGtub3duIHN5bWJvbHMgaWYgdGhlIG5hdGl2ZSBTeW1ib2wgaXMgbWlzc2luZyB0aGVtXG4gKi9cbltcblx0J2hhc0luc3RhbmNlJyxcblx0J2lzQ29uY2F0U3ByZWFkYWJsZScsXG5cdCdpdGVyYXRvcicsXG5cdCdzcGVjaWVzJyxcblx0J3JlcGxhY2UnLFxuXHQnc2VhcmNoJyxcblx0J3NwbGl0Jyxcblx0J21hdGNoJyxcblx0J3RvUHJpbWl0aXZlJyxcblx0J3RvU3RyaW5nVGFnJyxcblx0J3Vuc2NvcGFibGVzJyxcblx0J29ic2VydmFibGUnXG5dLmZvckVhY2goKHdlbGxLbm93bikgPT4ge1xuXHRpZiAoIShTeW1ib2wgYXMgYW55KVt3ZWxsS25vd25dKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KFN5bWJvbCwgd2VsbEtub3duLCBnZXRWYWx1ZURlc2NyaXB0b3IoU3ltYm9sLmZvcih3ZWxsS25vd24pLCBmYWxzZSwgZmFsc2UpKTtcblx0fVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFN5bWJvbDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBTeW1ib2wudHMiLCJpbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsJztcbmltcG9ydCB7IGlzQXJyYXlMaWtlLCBJdGVyYWJsZSB9IGZyb20gJy4vaXRlcmF0b3InO1xuaW1wb3J0IGhhcyBmcm9tICcuL3N1cHBvcnQvaGFzJztcbmltcG9ydCAnLi9TeW1ib2wnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFdlYWtNYXA8SyBleHRlbmRzIG9iamVjdCwgVj4ge1xuXHQvKipcblx0ICogUmVtb3ZlIGEgYGtleWAgZnJvbSB0aGUgbWFwXG5cdCAqXG5cdCAqIEBwYXJhbSBrZXkgVGhlIGtleSB0byByZW1vdmVcblx0ICogQHJldHVybiBgdHJ1ZWAgaWYgdGhlIHZhbHVlIHdhcyByZW1vdmVkLCBvdGhlcndpc2UgYGZhbHNlYFxuXHQgKi9cblx0ZGVsZXRlKGtleTogSyk6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFJldHJpZXZlIHRoZSB2YWx1ZSwgYmFzZWQgb24gdGhlIHN1cHBsaWVkIGBrZXlgXG5cdCAqXG5cdCAqIEBwYXJhbSBrZXkgVGhlIGtleSB0byByZXRyaWV2ZSB0aGUgYHZhbHVlYCBmb3Jcblx0ICogQHJldHVybiB0aGUgYHZhbHVlYCBiYXNlZCBvbiB0aGUgYGtleWAgaWYgZm91bmQsIG90aGVyd2lzZSBgZmFsc2VgXG5cdCAqL1xuXHRnZXQoa2V5OiBLKTogViB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogRGV0ZXJtaW5lcyBpZiBhIGBrZXlgIGlzIHByZXNlbnQgaW4gdGhlIG1hcFxuXHQgKlxuXHQgKiBAcGFyYW0ga2V5IFRoZSBga2V5YCB0byBjaGVja1xuXHQgKiBAcmV0dXJuIGB0cnVlYCBpZiB0aGUga2V5IGlzIHBhcnQgb2YgdGhlIG1hcCwgb3RoZXJ3aXNlIGBmYWxzZWAuXG5cdCAqL1xuXHRoYXMoa2V5OiBLKTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogU2V0IGEgYHZhbHVlYCBmb3IgYSBwYXJ0aWN1bGFyIGBrZXlgLlxuXHQgKlxuXHQgKiBAcGFyYW0ga2V5IFRoZSBga2V5YCB0byBzZXQgdGhlIGB2YWx1ZWAgZm9yXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgYHZhbHVlYCB0byBzZXRcblx0ICogQHJldHVybiB0aGUgaW5zdGFuY2VzXG5cdCAqL1xuXHRzZXQoa2V5OiBLLCB2YWx1ZTogVik6IHRoaXM7XG5cblx0cmVhZG9ubHkgW1N5bWJvbC50b1N0cmluZ1RhZ106ICdXZWFrTWFwJztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXZWFrTWFwQ29uc3RydWN0b3Ige1xuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIGEgYFdlYWtNYXBgXG5cdCAqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKi9cblx0bmV3ICgpOiBXZWFrTWFwPG9iamVjdCwgYW55PjtcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIGEgYFdlYWtNYXBgXG5cdCAqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKlxuXHQgKiBAcGFyYW0gaXRlcmFibGUgQW4gaXRlcmFibGUgdGhhdCBjb250YWlucyB5aWVsZHMgdXAga2V5L3ZhbHVlIHBhaXIgZW50cmllc1xuXHQgKi9cblx0bmV3IDxLIGV4dGVuZHMgb2JqZWN0LCBWPihpdGVyYWJsZT86IFtLLCBWXVtdKTogV2Vha01hcDxLLCBWPjtcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIGEgYFdlYWtNYXBgXG5cdCAqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKlxuXHQgKiBAcGFyYW0gaXRlcmFibGUgQW4gaXRlcmFibGUgdGhhdCBjb250YWlucyB5aWVsZHMgdXAga2V5L3ZhbHVlIHBhaXIgZW50cmllc1xuXHQgKi9cblx0bmV3IDxLIGV4dGVuZHMgb2JqZWN0LCBWPihpdGVyYWJsZTogSXRlcmFibGU8W0ssIFZdPik6IFdlYWtNYXA8SywgVj47XG5cblx0cmVhZG9ubHkgcHJvdG90eXBlOiBXZWFrTWFwPG9iamVjdCwgYW55Pjtcbn1cblxuZXhwb3J0IGxldCBXZWFrTWFwOiBXZWFrTWFwQ29uc3RydWN0b3IgPSBnbG9iYWwuV2Vha01hcDtcblxuaW50ZXJmYWNlIEVudHJ5PEssIFY+IHtcblx0a2V5OiBLO1xuXHR2YWx1ZTogVjtcbn1cblxuaWYgKCFoYXMoJ2VzNi13ZWFrbWFwJykpIHtcblx0Y29uc3QgREVMRVRFRDogYW55ID0ge307XG5cblx0Y29uc3QgZ2V0VUlEID0gZnVuY3Rpb24gZ2V0VUlEKCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMCk7XG5cdH07XG5cblx0Y29uc3QgZ2VuZXJhdGVOYW1lID0gKGZ1bmN0aW9uKCkge1xuXHRcdGxldCBzdGFydElkID0gTWF0aC5mbG9vcihEYXRlLm5vdygpICUgMTAwMDAwMDAwKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiBnZW5lcmF0ZU5hbWUoKTogc3RyaW5nIHtcblx0XHRcdHJldHVybiAnX193bScgKyBnZXRVSUQoKSArIChzdGFydElkKysgKyAnX18nKTtcblx0XHR9O1xuXHR9KSgpO1xuXG5cdFdlYWtNYXAgPSBjbGFzcyBXZWFrTWFwPEssIFY+IHtcblx0XHRwcml2YXRlIHJlYWRvbmx5IF9uYW1lOiBzdHJpbmc7XG5cdFx0cHJpdmF0ZSByZWFkb25seSBfZnJvemVuRW50cmllczogRW50cnk8SywgVj5bXTtcblxuXHRcdGNvbnN0cnVjdG9yKGl0ZXJhYmxlPzogQXJyYXlMaWtlPFtLLCBWXT4gfCBJdGVyYWJsZTxbSywgVl0+KSB7XG5cdFx0XHR0aGlzLl9uYW1lID0gZ2VuZXJhdGVOYW1lKCk7XG5cblx0XHRcdHRoaXMuX2Zyb3plbkVudHJpZXMgPSBbXTtcblxuXHRcdFx0aWYgKGl0ZXJhYmxlKSB7XG5cdFx0XHRcdGlmIChpc0FycmF5TGlrZShpdGVyYWJsZSkpIHtcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGl0ZXJhYmxlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBpdGVtID0gaXRlcmFibGVbaV07XG5cdFx0XHRcdFx0XHR0aGlzLnNldChpdGVtWzBdLCBpdGVtWzFdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgaXRlcmFibGUpIHtcblx0XHRcdFx0XHRcdHRoaXMuc2V0KGtleSwgdmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHByaXZhdGUgX2dldEZyb3plbkVudHJ5SW5kZXgoa2V5OiBhbnkpOiBudW1iZXIge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9mcm96ZW5FbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9mcm96ZW5FbnRyaWVzW2ldLmtleSA9PT0ga2V5KSB7XG5cdFx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH1cblxuXHRcdGRlbGV0ZShrZXk6IGFueSk6IGJvb2xlYW4ge1xuXHRcdFx0aWYgKGtleSA9PT0gdW5kZWZpbmVkIHx8IGtleSA9PT0gbnVsbCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGVudHJ5OiBFbnRyeTxLLCBWPiA9IGtleVt0aGlzLl9uYW1lXTtcblx0XHRcdGlmIChlbnRyeSAmJiBlbnRyeS5rZXkgPT09IGtleSAmJiBlbnRyeS52YWx1ZSAhPT0gREVMRVRFRCkge1xuXHRcdFx0XHRlbnRyeS52YWx1ZSA9IERFTEVURUQ7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBmcm96ZW5JbmRleCA9IHRoaXMuX2dldEZyb3plbkVudHJ5SW5kZXgoa2V5KTtcblx0XHRcdGlmIChmcm96ZW5JbmRleCA+PSAwKSB7XG5cdFx0XHRcdHRoaXMuX2Zyb3plbkVudHJpZXMuc3BsaWNlKGZyb3plbkluZGV4LCAxKTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRnZXQoa2V5OiBhbnkpOiBWIHwgdW5kZWZpbmVkIHtcblx0XHRcdGlmIChrZXkgPT09IHVuZGVmaW5lZCB8fCBrZXkgPT09IG51bGwpIHtcblx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZW50cnk6IEVudHJ5PEssIFY+ID0ga2V5W3RoaXMuX25hbWVdO1xuXHRcdFx0aWYgKGVudHJ5ICYmIGVudHJ5LmtleSA9PT0ga2V5ICYmIGVudHJ5LnZhbHVlICE9PSBERUxFVEVEKSB7XG5cdFx0XHRcdHJldHVybiBlbnRyeS52YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZnJvemVuSW5kZXggPSB0aGlzLl9nZXRGcm96ZW5FbnRyeUluZGV4KGtleSk7XG5cdFx0XHRpZiAoZnJvemVuSW5kZXggPj0gMCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZnJvemVuRW50cmllc1tmcm96ZW5JbmRleF0udmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aGFzKGtleTogYW55KTogYm9vbGVhbiB7XG5cdFx0XHRpZiAoa2V5ID09PSB1bmRlZmluZWQgfHwga2V5ID09PSBudWxsKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZW50cnk6IEVudHJ5PEssIFY+ID0ga2V5W3RoaXMuX25hbWVdO1xuXHRcdFx0aWYgKEJvb2xlYW4oZW50cnkgJiYgZW50cnkua2V5ID09PSBrZXkgJiYgZW50cnkudmFsdWUgIT09IERFTEVURUQpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBmcm96ZW5JbmRleCA9IHRoaXMuX2dldEZyb3plbkVudHJ5SW5kZXgoa2V5KTtcblx0XHRcdGlmIChmcm96ZW5JbmRleCA+PSAwKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0c2V0KGtleTogYW55LCB2YWx1ZT86IGFueSk6IHRoaXMge1xuXHRcdFx0aWYgKCFrZXkgfHwgKHR5cGVvZiBrZXkgIT09ICdvYmplY3QnICYmIHR5cGVvZiBrZXkgIT09ICdmdW5jdGlvbicpKSB7XG5cdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgdmFsdWUgdXNlZCBhcyB3ZWFrIG1hcCBrZXknKTtcblx0XHRcdH1cblx0XHRcdGxldCBlbnRyeTogRW50cnk8SywgVj4gPSBrZXlbdGhpcy5fbmFtZV07XG5cdFx0XHRpZiAoIWVudHJ5IHx8IGVudHJ5LmtleSAhPT0ga2V5KSB7XG5cdFx0XHRcdGVudHJ5ID0gT2JqZWN0LmNyZWF0ZShudWxsLCB7XG5cdFx0XHRcdFx0a2V5OiB7IHZhbHVlOiBrZXkgfVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAoT2JqZWN0LmlzRnJvemVuKGtleSkpIHtcblx0XHRcdFx0XHR0aGlzLl9mcm96ZW5FbnRyaWVzLnB1c2goZW50cnkpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShrZXksIHRoaXMuX25hbWUsIHtcblx0XHRcdFx0XHRcdHZhbHVlOiBlbnRyeVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbnRyeS52YWx1ZSA9IHZhbHVlO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0W1N5bWJvbC50b1N0cmluZ1RhZ106ICdXZWFrTWFwJyA9ICdXZWFrTWFwJztcblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgV2Vha01hcDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBXZWFrTWFwLnRzIiwiaW1wb3J0IGdsb2JhbCBmcm9tICcuL2dsb2JhbCc7XG5pbXBvcnQgeyBpc0FycmF5TGlrZSwgaXNJdGVyYWJsZSwgSXRlcmFibGUgfSBmcm9tICcuL2l0ZXJhdG9yJztcbmltcG9ydCB7IE1BWF9TQUZFX0lOVEVHRVIgfSBmcm9tICcuL251bWJlcic7XG5pbXBvcnQgaGFzIGZyb20gJy4vc3VwcG9ydC9oYXMnO1xuaW1wb3J0IHsgd3JhcE5hdGl2ZSB9IGZyb20gJy4vc3VwcG9ydC91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBNYXBDYWxsYmFjazxULCBVPiB7XG5cdC8qKlxuXHQgKiBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gbWFwcGluZ1xuXHQgKlxuXHQgKiBAcGFyYW0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IGlzIGN1cnJlbnRseSBiZWluZyBtYXBwZWRcblx0ICogQHBhcmFtIGluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBlbGVtZW50XG5cdCAqL1xuXHQoZWxlbWVudDogVCwgaW5kZXg6IG51bWJlcik6IFU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmluZENhbGxiYWNrPFQ+IHtcblx0LyoqXG5cdCAqIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2hlbiB1c2luZyBmaW5kXG5cdCAqXG5cdCAqIEBwYXJhbSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgaXMgY3VycmVudHkgYmVpbmcgYW5hbHlzZWRcblx0ICogQHBhcmFtIGluZGV4IFRoZSBjdXJyZW50IGluZGV4IG9mIHRoZSBlbGVtZW50IHRoYXQgaXMgYmVpbmcgYW5hbHlzZWRcblx0ICogQHBhcmFtIGFycmF5IFRoZSBzb3VyY2UgYXJyYXlcblx0ICovXG5cdChlbGVtZW50OiBULCBpbmRleDogbnVtYmVyLCBhcnJheTogQXJyYXlMaWtlPFQ+KTogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIFdyaXRhYmxlQXJyYXlMaWtlPFQ+IHtcblx0cmVhZG9ubHkgbGVuZ3RoOiBudW1iZXI7XG5cdFtuOiBudW1iZXJdOiBUO1xufVxuXG4vKiBFUzYgQXJyYXkgc3RhdGljIG1ldGhvZHMgKi9cblxuZXhwb3J0IGludGVyZmFjZSBGcm9tIHtcblx0LyoqXG5cdCAqIFRoZSBBcnJheS5mcm9tKCkgbWV0aG9kIGNyZWF0ZXMgYSBuZXcgQXJyYXkgaW5zdGFuY2UgZnJvbSBhbiBhcnJheS1saWtlIG9yIGl0ZXJhYmxlIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHNvdXJjZSBBbiBhcnJheS1saWtlIG9yIGl0ZXJhYmxlIG9iamVjdCB0byBjb252ZXJ0IHRvIGFuIGFycmF5XG5cdCAqIEBwYXJhbSBtYXBGdW5jdGlvbiBBIG1hcCBmdW5jdGlvbiB0byBjYWxsIG9uIGVhY2ggZWxlbWVudCBpbiB0aGUgYXJyYXlcblx0ICogQHBhcmFtIHRoaXNBcmcgVGhlIGV4ZWN1dGlvbiBjb250ZXh0IGZvciB0aGUgbWFwIGZ1bmN0aW9uXG5cdCAqIEByZXR1cm4gVGhlIG5ldyBBcnJheVxuXHQgKi9cblx0PFQsIFU+KHNvdXJjZTogQXJyYXlMaWtlPFQ+IHwgSXRlcmFibGU8VD4sIG1hcEZ1bmN0aW9uOiBNYXBDYWxsYmFjazxULCBVPiwgdGhpc0FyZz86IGFueSk6IEFycmF5PFU+O1xuXG5cdC8qKlxuXHQgKiBUaGUgQXJyYXkuZnJvbSgpIG1ldGhvZCBjcmVhdGVzIGEgbmV3IEFycmF5IGluc3RhbmNlIGZyb20gYW4gYXJyYXktbGlrZSBvciBpdGVyYWJsZSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBzb3VyY2UgQW4gYXJyYXktbGlrZSBvciBpdGVyYWJsZSBvYmplY3QgdG8gY29udmVydCB0byBhbiBhcnJheVxuXHQgKiBAcmV0dXJuIFRoZSBuZXcgQXJyYXlcblx0ICovXG5cdDxUPihzb3VyY2U6IEFycmF5TGlrZTxUPiB8IEl0ZXJhYmxlPFQ+KTogQXJyYXk8VD47XG59XG5cbmV4cG9ydCBsZXQgZnJvbTogRnJvbTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGFycmF5IGZyb20gdGhlIGZ1bmN0aW9uIHBhcmFtZXRlcnMuXG4gKlxuICogQHBhcmFtIGFyZ3VtZW50cyBBbnkgbnVtYmVyIG9mIGFyZ3VtZW50cyBmb3IgdGhlIGFycmF5XG4gKiBAcmV0dXJuIEFuIGFycmF5IGZyb20gdGhlIGdpdmVuIGFyZ3VtZW50c1xuICovXG5leHBvcnQgbGV0IG9mOiA8VD4oLi4uaXRlbXM6IFRbXSkgPT4gQXJyYXk8VD47XG5cbi8qIEVTNiBBcnJheSBpbnN0YW5jZSBtZXRob2RzICovXG5cbi8qKlxuICogQ29waWVzIGRhdGEgaW50ZXJuYWxseSB3aXRoaW4gYW4gYXJyYXkgb3IgYXJyYXktbGlrZSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IGFycmF5LWxpa2Ugb2JqZWN0XG4gKiBAcGFyYW0gb2Zmc2V0IFRoZSBpbmRleCB0byBzdGFydCBjb3B5aW5nIHZhbHVlcyB0bzsgaWYgbmVnYXRpdmUsIGl0IGNvdW50cyBiYWNrd2FyZHMgZnJvbSBsZW5ndGhcbiAqIEBwYXJhbSBzdGFydCBUaGUgZmlyc3QgKGluY2x1c2l2ZSkgaW5kZXggdG8gY29weTsgaWYgbmVnYXRpdmUsIGl0IGNvdW50cyBiYWNrd2FyZHMgZnJvbSBsZW5ndGhcbiAqIEBwYXJhbSBlbmQgVGhlIGxhc3QgKGV4Y2x1c2l2ZSkgaW5kZXggdG8gY29weTsgaWYgbmVnYXRpdmUsIGl0IGNvdW50cyBiYWNrd2FyZHMgZnJvbSBsZW5ndGhcbiAqIEByZXR1cm4gVGhlIHRhcmdldFxuICovXG5leHBvcnQgbGV0IGNvcHlXaXRoaW46IDxUPih0YXJnZXQ6IEFycmF5TGlrZTxUPiwgb2Zmc2V0OiBudW1iZXIsIHN0YXJ0OiBudW1iZXIsIGVuZD86IG51bWJlcikgPT4gQXJyYXlMaWtlPFQ+O1xuXG4vKipcbiAqIEZpbGxzIGVsZW1lbnRzIG9mIGFuIGFycmF5LWxpa2Ugb2JqZWN0IHdpdGggdGhlIHNwZWNpZmllZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdG8gZmlsbFxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBmaWxsIGVhY2ggZWxlbWVudCBvZiB0aGUgdGFyZ2V0IHdpdGhcbiAqIEBwYXJhbSBzdGFydCBUaGUgZmlyc3QgaW5kZXggdG8gZmlsbFxuICogQHBhcmFtIGVuZCBUaGUgKGV4Y2x1c2l2ZSkgaW5kZXggYXQgd2hpY2ggdG8gc3RvcCBmaWxsaW5nXG4gKiBAcmV0dXJuIFRoZSBmaWxsZWQgdGFyZ2V0XG4gKi9cbmV4cG9ydCBsZXQgZmlsbDogPFQ+KHRhcmdldDogQXJyYXlMaWtlPFQ+LCB2YWx1ZTogVCwgc3RhcnQ/OiBudW1iZXIsIGVuZD86IG51bWJlcikgPT4gQXJyYXlMaWtlPFQ+O1xuXG4vKipcbiAqIEZpbmRzIGFuZCByZXR1cm5zIHRoZSBmaXJzdCBpbnN0YW5jZSBtYXRjaGluZyB0aGUgY2FsbGJhY2sgb3IgdW5kZWZpbmVkIGlmIG9uZSBpcyBub3QgZm91bmQuXG4gKlxuICogQHBhcmFtIHRhcmdldCBBbiBhcnJheS1saWtlIG9iamVjdFxuICogQHBhcmFtIGNhbGxiYWNrIEEgZnVuY3Rpb24gcmV0dXJuaW5nIGlmIHRoZSBjdXJyZW50IHZhbHVlIG1hdGNoZXMgYSBjcml0ZXJpYVxuICogQHBhcmFtIHRoaXNBcmcgVGhlIGV4ZWN1dGlvbiBjb250ZXh0IGZvciB0aGUgZmluZCBmdW5jdGlvblxuICogQHJldHVybiBUaGUgZmlyc3QgZWxlbWVudCBtYXRjaGluZyB0aGUgY2FsbGJhY2ssIG9yIHVuZGVmaW5lZCBpZiBvbmUgZG9lcyBub3QgZXhpc3RcbiAqL1xuZXhwb3J0IGxldCBmaW5kOiA8VD4odGFyZ2V0OiBBcnJheUxpa2U8VD4sIGNhbGxiYWNrOiBGaW5kQ2FsbGJhY2s8VD4sIHRoaXNBcmc/OiB7fSkgPT4gVCB8IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBzZWFyY2ggYW5kIHJldHVybnMgdGhlIGZpcnN0IGluZGV4IHdob3NlIHZhbHVlIHNhdGlzZmllcyB0aGUgcGFzc2VkIGNhbGxiYWNrLFxuICogb3IgLTEgaWYgbm8gdmFsdWVzIHNhdGlzZnkgaXQuXG4gKlxuICogQHBhcmFtIHRhcmdldCBBbiBhcnJheS1saWtlIG9iamVjdFxuICogQHBhcmFtIGNhbGxiYWNrIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRydWUgaWYgdGhlIGN1cnJlbnQgdmFsdWUgc2F0aXNmaWVzIGl0cyBjcml0ZXJpYVxuICogQHBhcmFtIHRoaXNBcmcgVGhlIGV4ZWN1dGlvbiBjb250ZXh0IGZvciB0aGUgZmluZCBmdW5jdGlvblxuICogQHJldHVybiBUaGUgZmlyc3QgaW5kZXggd2hvc2UgdmFsdWUgc2F0aXNmaWVzIHRoZSBwYXNzZWQgY2FsbGJhY2ssIG9yIC0xIGlmIG5vIHZhbHVlcyBzYXRpc2Z5IGl0XG4gKi9cbmV4cG9ydCBsZXQgZmluZEluZGV4OiA8VD4odGFyZ2V0OiBBcnJheUxpa2U8VD4sIGNhbGxiYWNrOiBGaW5kQ2FsbGJhY2s8VD4sIHRoaXNBcmc/OiB7fSkgPT4gbnVtYmVyO1xuXG4vKiBFUzcgQXJyYXkgaW5zdGFuY2UgbWV0aG9kcyAqL1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhbiBhcnJheSBpbmNsdWRlcyBhIGdpdmVuIHZhbHVlXG4gKlxuICogQHBhcmFtIHRhcmdldCB0aGUgdGFyZ2V0IGFycmF5LWxpa2Ugb2JqZWN0XG4gKiBAcGFyYW0gc2VhcmNoRWxlbWVudCB0aGUgaXRlbSB0byBzZWFyY2ggZm9yXG4gKiBAcGFyYW0gZnJvbUluZGV4IHRoZSBzdGFydGluZyBpbmRleCB0byBzZWFyY2ggZnJvbVxuICogQHJldHVybiBgdHJ1ZWAgaWYgdGhlIGFycmF5IGluY2x1ZGVzIHRoZSBlbGVtZW50LCBvdGhlcndpc2UgYGZhbHNlYFxuICovXG5leHBvcnQgbGV0IGluY2x1ZGVzOiA8VD4odGFyZ2V0OiBBcnJheUxpa2U8VD4sIHNlYXJjaEVsZW1lbnQ6IFQsIGZyb21JbmRleD86IG51bWJlcikgPT4gYm9vbGVhbjtcblxuaWYgKGhhcygnZXM2LWFycmF5JykgJiYgaGFzKCdlczYtYXJyYXktZmlsbCcpKSB7XG5cdGZyb20gPSBnbG9iYWwuQXJyYXkuZnJvbTtcblx0b2YgPSBnbG9iYWwuQXJyYXkub2Y7XG5cdGNvcHlXaXRoaW4gPSB3cmFwTmF0aXZlKGdsb2JhbC5BcnJheS5wcm90b3R5cGUuY29weVdpdGhpbik7XG5cdGZpbGwgPSB3cmFwTmF0aXZlKGdsb2JhbC5BcnJheS5wcm90b3R5cGUuZmlsbCk7XG5cdGZpbmQgPSB3cmFwTmF0aXZlKGdsb2JhbC5BcnJheS5wcm90b3R5cGUuZmluZCk7XG5cdGZpbmRJbmRleCA9IHdyYXBOYXRpdmUoZ2xvYmFsLkFycmF5LnByb3RvdHlwZS5maW5kSW5kZXgpO1xufSBlbHNlIHtcblx0Ly8gSXQgaXMgb25seSBvbGRlciB2ZXJzaW9ucyBvZiBTYWZhcmkvaU9TIHRoYXQgaGF2ZSBhIGJhZCBmaWxsIGltcGxlbWVudGF0aW9uIGFuZCBzbyBhcmVuJ3QgaW4gdGhlIHdpbGRcblx0Ly8gVG8gbWFrZSB0aGluZ3MgZWFzaWVyLCBpZiB0aGVyZSBpcyBhIGJhZCBmaWxsIGltcGxlbWVudGF0aW9uLCB0aGUgd2hvbGUgc2V0IG9mIGZ1bmN0aW9ucyB3aWxsIGJlIGZpbGxlZFxuXG5cdC8qKlxuXHQgKiBFbnN1cmVzIGEgbm9uLW5lZ2F0aXZlLCBub24taW5maW5pdGUsIHNhZmUgaW50ZWdlci5cblx0ICpcblx0ICogQHBhcmFtIGxlbmd0aCBUaGUgbnVtYmVyIHRvIHZhbGlkYXRlXG5cdCAqIEByZXR1cm4gQSBwcm9wZXIgbGVuZ3RoXG5cdCAqL1xuXHRjb25zdCB0b0xlbmd0aCA9IGZ1bmN0aW9uIHRvTGVuZ3RoKGxlbmd0aDogbnVtYmVyKTogbnVtYmVyIHtcblx0XHRpZiAoaXNOYU4obGVuZ3RoKSkge1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdFx0bGVuZ3RoID0gTnVtYmVyKGxlbmd0aCk7XG5cdFx0aWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcblx0XHRcdGxlbmd0aCA9IE1hdGguZmxvb3IobGVuZ3RoKTtcblx0XHR9XG5cdFx0Ly8gRW5zdXJlIGEgbm9uLW5lZ2F0aXZlLCByZWFsLCBzYWZlIGludGVnZXJcblx0XHRyZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobGVuZ3RoLCAwKSwgTUFYX1NBRkVfSU5URUdFUik7XG5cdH07XG5cblx0LyoqXG5cdCAqIEZyb20gRVM2IDcuMS40IFRvSW50ZWdlcigpXG5cdCAqXG5cdCAqIEBwYXJhbSB2YWx1ZSBBIHZhbHVlIHRvIGNvbnZlcnRcblx0ICogQHJldHVybiBBbiBpbnRlZ2VyXG5cdCAqL1xuXHRjb25zdCB0b0ludGVnZXIgPSBmdW5jdGlvbiB0b0ludGVnZXIodmFsdWU6IGFueSk6IG51bWJlciB7XG5cdFx0dmFsdWUgPSBOdW1iZXIodmFsdWUpO1xuXHRcdGlmIChpc05hTih2YWx1ZSkpIHtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblx0XHRpZiAodmFsdWUgPT09IDAgfHwgIWlzRmluaXRlKHZhbHVlKSkge1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH1cblxuXHRcdHJldHVybiAodmFsdWUgPiAwID8gMSA6IC0xKSAqIE1hdGguZmxvb3IoTWF0aC5hYnModmFsdWUpKTtcblx0fTtcblxuXHQvKipcblx0ICogTm9ybWFsaXplcyBhbiBvZmZzZXQgYWdhaW5zdCBhIGdpdmVuIGxlbmd0aCwgd3JhcHBpbmcgaXQgaWYgbmVnYXRpdmUuXG5cdCAqXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgb3JpZ2luYWwgb2Zmc2V0XG5cdCAqIEBwYXJhbSBsZW5ndGggVGhlIHRvdGFsIGxlbmd0aCB0byBub3JtYWxpemUgYWdhaW5zdFxuXHQgKiBAcmV0dXJuIElmIG5lZ2F0aXZlLCBwcm92aWRlIGEgZGlzdGFuY2UgZnJvbSB0aGUgZW5kIChsZW5ndGgpOyBvdGhlcndpc2UgcHJvdmlkZSBhIGRpc3RhbmNlIGZyb20gMFxuXHQgKi9cblx0Y29uc3Qgbm9ybWFsaXplT2Zmc2V0ID0gZnVuY3Rpb24gbm9ybWFsaXplT2Zmc2V0KHZhbHVlOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdmFsdWUgPCAwID8gTWF0aC5tYXgobGVuZ3RoICsgdmFsdWUsIDApIDogTWF0aC5taW4odmFsdWUsIGxlbmd0aCk7XG5cdH07XG5cblx0ZnJvbSA9IGZ1bmN0aW9uIGZyb20oXG5cdFx0dGhpczogQXJyYXlDb25zdHJ1Y3Rvcixcblx0XHRhcnJheUxpa2U6IEl0ZXJhYmxlPGFueT4gfCBBcnJheUxpa2U8YW55Pixcblx0XHRtYXBGdW5jdGlvbj86IE1hcENhbGxiYWNrPGFueSwgYW55Pixcblx0XHR0aGlzQXJnPzogYW55XG5cdCk6IEFycmF5PGFueT4ge1xuXHRcdGlmIChhcnJheUxpa2UgPT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignZnJvbTogcmVxdWlyZXMgYW4gYXJyYXktbGlrZSBvYmplY3QnKTtcblx0XHR9XG5cblx0XHRpZiAobWFwRnVuY3Rpb24gJiYgdGhpc0FyZykge1xuXHRcdFx0bWFwRnVuY3Rpb24gPSBtYXBGdW5jdGlvbi5iaW5kKHRoaXNBcmcpO1xuXHRcdH1cblxuXHRcdC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lICovXG5cdFx0Y29uc3QgQ29uc3RydWN0b3IgPSB0aGlzO1xuXHRcdGNvbnN0IGxlbmd0aDogbnVtYmVyID0gdG9MZW5ndGgoKDxhbnk+YXJyYXlMaWtlKS5sZW5ndGgpO1xuXG5cdFx0Ly8gU3VwcG9ydCBleHRlbnNpb25cblx0XHRjb25zdCBhcnJheTogYW55W10gPVxuXHRcdFx0dHlwZW9mIENvbnN0cnVjdG9yID09PSAnZnVuY3Rpb24nID8gPGFueVtdPk9iamVjdChuZXcgQ29uc3RydWN0b3IobGVuZ3RoKSkgOiBuZXcgQXJyYXkobGVuZ3RoKTtcblxuXHRcdGlmICghaXNBcnJheUxpa2UoYXJyYXlMaWtlKSAmJiAhaXNJdGVyYWJsZShhcnJheUxpa2UpKSB7XG5cdFx0XHRyZXR1cm4gYXJyYXk7XG5cdFx0fVxuXG5cdFx0Ly8gaWYgdGhpcyBpcyBhbiBhcnJheSBhbmQgdGhlIG5vcm1hbGl6ZWQgbGVuZ3RoIGlzIDAsIGp1c3QgcmV0dXJuIGFuIGVtcHR5IGFycmF5LiB0aGlzIHByZXZlbnRzIGEgcHJvYmxlbVxuXHRcdC8vIHdpdGggdGhlIGl0ZXJhdGlvbiBvbiBJRSB3aGVuIHVzaW5nIGEgTmFOIGFycmF5IGxlbmd0aC5cblx0XHRpZiAoaXNBcnJheUxpa2UoYXJyYXlMaWtlKSkge1xuXHRcdFx0aWYgKGxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlMaWtlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGFycmF5W2ldID0gbWFwRnVuY3Rpb24gPyBtYXBGdW5jdGlvbihhcnJheUxpa2VbaV0sIGkpIDogYXJyYXlMaWtlW2ldO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgaSA9IDA7XG5cdFx0XHRmb3IgKGNvbnN0IHZhbHVlIG9mIGFycmF5TGlrZSkge1xuXHRcdFx0XHRhcnJheVtpXSA9IG1hcEZ1bmN0aW9uID8gbWFwRnVuY3Rpb24odmFsdWUsIGkpIDogdmFsdWU7XG5cdFx0XHRcdGkrKztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoKDxhbnk+YXJyYXlMaWtlKS5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0YXJyYXkubGVuZ3RoID0gbGVuZ3RoO1xuXHRcdH1cblxuXHRcdHJldHVybiBhcnJheTtcblx0fTtcblxuXHRvZiA9IGZ1bmN0aW9uIG9mPFQ+KC4uLml0ZW1zOiBUW10pOiBBcnJheTxUPiB7XG5cdFx0cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGl0ZW1zKTtcblx0fTtcblxuXHRjb3B5V2l0aGluID0gZnVuY3Rpb24gY29weVdpdGhpbjxUPihcblx0XHR0YXJnZXQ6IEFycmF5TGlrZTxUPixcblx0XHRvZmZzZXQ6IG51bWJlcixcblx0XHRzdGFydDogbnVtYmVyLFxuXHRcdGVuZD86IG51bWJlclxuXHQpOiBBcnJheUxpa2U8VD4ge1xuXHRcdGlmICh0YXJnZXQgPT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignY29weVdpdGhpbjogdGFyZ2V0IG11c3QgYmUgYW4gYXJyYXktbGlrZSBvYmplY3QnKTtcblx0XHR9XG5cblx0XHRjb25zdCBsZW5ndGggPSB0b0xlbmd0aCh0YXJnZXQubGVuZ3RoKTtcblx0XHRvZmZzZXQgPSBub3JtYWxpemVPZmZzZXQodG9JbnRlZ2VyKG9mZnNldCksIGxlbmd0aCk7XG5cdFx0c3RhcnQgPSBub3JtYWxpemVPZmZzZXQodG9JbnRlZ2VyKHN0YXJ0KSwgbGVuZ3RoKTtcblx0XHRlbmQgPSBub3JtYWxpemVPZmZzZXQoZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiB0b0ludGVnZXIoZW5kKSwgbGVuZ3RoKTtcblx0XHRsZXQgY291bnQgPSBNYXRoLm1pbihlbmQgLSBzdGFydCwgbGVuZ3RoIC0gb2Zmc2V0KTtcblxuXHRcdGxldCBkaXJlY3Rpb24gPSAxO1xuXHRcdGlmIChvZmZzZXQgPiBzdGFydCAmJiBvZmZzZXQgPCBzdGFydCArIGNvdW50KSB7XG5cdFx0XHRkaXJlY3Rpb24gPSAtMTtcblx0XHRcdHN0YXJ0ICs9IGNvdW50IC0gMTtcblx0XHRcdG9mZnNldCArPSBjb3VudCAtIDE7XG5cdFx0fVxuXG5cdFx0d2hpbGUgKGNvdW50ID4gMCkge1xuXHRcdFx0aWYgKHN0YXJ0IGluIHRhcmdldCkge1xuXHRcdFx0XHQodGFyZ2V0IGFzIFdyaXRhYmxlQXJyYXlMaWtlPFQ+KVtvZmZzZXRdID0gdGFyZ2V0W3N0YXJ0XTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlbGV0ZSAodGFyZ2V0IGFzIFdyaXRhYmxlQXJyYXlMaWtlPFQ+KVtvZmZzZXRdO1xuXHRcdFx0fVxuXG5cdFx0XHRvZmZzZXQgKz0gZGlyZWN0aW9uO1xuXHRcdFx0c3RhcnQgKz0gZGlyZWN0aW9uO1xuXHRcdFx0Y291bnQtLTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGFyZ2V0O1xuXHR9O1xuXG5cdGZpbGwgPSBmdW5jdGlvbiBmaWxsPFQ+KHRhcmdldDogQXJyYXlMaWtlPFQ+LCB2YWx1ZTogYW55LCBzdGFydD86IG51bWJlciwgZW5kPzogbnVtYmVyKTogQXJyYXlMaWtlPFQ+IHtcblx0XHRjb25zdCBsZW5ndGggPSB0b0xlbmd0aCh0YXJnZXQubGVuZ3RoKTtcblx0XHRsZXQgaSA9IG5vcm1hbGl6ZU9mZnNldCh0b0ludGVnZXIoc3RhcnQpLCBsZW5ndGgpO1xuXHRcdGVuZCA9IG5vcm1hbGl6ZU9mZnNldChlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IHRvSW50ZWdlcihlbmQpLCBsZW5ndGgpO1xuXG5cdFx0d2hpbGUgKGkgPCBlbmQpIHtcblx0XHRcdCh0YXJnZXQgYXMgV3JpdGFibGVBcnJheUxpa2U8VD4pW2krK10gPSB2YWx1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGFyZ2V0O1xuXHR9O1xuXG5cdGZpbmQgPSBmdW5jdGlvbiBmaW5kPFQ+KHRhcmdldDogQXJyYXlMaWtlPFQ+LCBjYWxsYmFjazogRmluZENhbGxiYWNrPFQ+LCB0aGlzQXJnPzoge30pOiBUIHwgdW5kZWZpbmVkIHtcblx0XHRjb25zdCBpbmRleCA9IGZpbmRJbmRleDxUPih0YXJnZXQsIGNhbGxiYWNrLCB0aGlzQXJnKTtcblx0XHRyZXR1cm4gaW5kZXggIT09IC0xID8gdGFyZ2V0W2luZGV4XSA6IHVuZGVmaW5lZDtcblx0fTtcblxuXHRmaW5kSW5kZXggPSBmdW5jdGlvbiBmaW5kSW5kZXg8VD4odGFyZ2V0OiBBcnJheUxpa2U8VD4sIGNhbGxiYWNrOiBGaW5kQ2FsbGJhY2s8VD4sIHRoaXNBcmc/OiB7fSk6IG51bWJlciB7XG5cdFx0Y29uc3QgbGVuZ3RoID0gdG9MZW5ndGgodGFyZ2V0Lmxlbmd0aCk7XG5cblx0XHRpZiAoIWNhbGxiYWNrKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdmaW5kOiBzZWNvbmQgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXNBcmcpIHtcblx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2suYmluZCh0aGlzQXJnKTtcblx0XHR9XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoY2FsbGJhY2sodGFyZ2V0W2ldLCBpLCB0YXJnZXQpKSB7XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiAtMTtcblx0fTtcbn1cblxuaWYgKGhhcygnZXM3LWFycmF5JykpIHtcblx0aW5jbHVkZXMgPSB3cmFwTmF0aXZlKGdsb2JhbC5BcnJheS5wcm90b3R5cGUuaW5jbHVkZXMpO1xufSBlbHNlIHtcblx0LyoqXG5cdCAqIEVuc3VyZXMgYSBub24tbmVnYXRpdmUsIG5vbi1pbmZpbml0ZSwgc2FmZSBpbnRlZ2VyLlxuXHQgKlxuXHQgKiBAcGFyYW0gbGVuZ3RoIFRoZSBudW1iZXIgdG8gdmFsaWRhdGVcblx0ICogQHJldHVybiBBIHByb3BlciBsZW5ndGhcblx0ICovXG5cdGNvbnN0IHRvTGVuZ3RoID0gZnVuY3Rpb24gdG9MZW5ndGgobGVuZ3RoOiBudW1iZXIpOiBudW1iZXIge1xuXHRcdGxlbmd0aCA9IE51bWJlcihsZW5ndGgpO1xuXHRcdGlmIChpc05hTihsZW5ndGgpKSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cdFx0aWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcblx0XHRcdGxlbmd0aCA9IE1hdGguZmxvb3IobGVuZ3RoKTtcblx0XHR9XG5cdFx0Ly8gRW5zdXJlIGEgbm9uLW5lZ2F0aXZlLCByZWFsLCBzYWZlIGludGVnZXJcblx0XHRyZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobGVuZ3RoLCAwKSwgTUFYX1NBRkVfSU5URUdFUik7XG5cdH07XG5cblx0aW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlczxUPih0YXJnZXQ6IEFycmF5TGlrZTxUPiwgc2VhcmNoRWxlbWVudDogVCwgZnJvbUluZGV4OiBudW1iZXIgPSAwKTogYm9vbGVhbiB7XG5cdFx0bGV0IGxlbiA9IHRvTGVuZ3RoKHRhcmdldC5sZW5ndGgpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IGZyb21JbmRleDsgaSA8IGxlbjsgKytpKSB7XG5cdFx0XHRjb25zdCBjdXJyZW50RWxlbWVudCA9IHRhcmdldFtpXTtcblx0XHRcdGlmIChcblx0XHRcdFx0c2VhcmNoRWxlbWVudCA9PT0gY3VycmVudEVsZW1lbnQgfHxcblx0XHRcdFx0KHNlYXJjaEVsZW1lbnQgIT09IHNlYXJjaEVsZW1lbnQgJiYgY3VycmVudEVsZW1lbnQgIT09IGN1cnJlbnRFbGVtZW50KVxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBhcnJheS50cyIsImNvbnN0IGdsb2JhbE9iamVjdDogYW55ID0gKGZ1bmN0aW9uKCk6IGFueSB7XG5cdC8vIHRoZSBvbmx5IHJlbGlhYmxlIG1lYW5zIHRvIGdldCB0aGUgZ2xvYmFsIG9iamVjdCBpc1xuXHQvLyBgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKWBcblx0Ly8gSG93ZXZlciwgdGhpcyBjYXVzZXMgQ1NQIHZpb2xhdGlvbnMgaW4gQ2hyb21lIGFwcHMuXG5cdGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyZXR1cm4gc2VsZjtcblx0fVxuXHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyZXR1cm4gd2luZG93O1xuXHR9XG5cdGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuXHRcdHJldHVybiBnbG9iYWw7XG5cdH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdsb2JhbE9iamVjdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBnbG9iYWwudHMiLCJpbXBvcnQgJy4vU3ltYm9sJztcbmltcG9ydCB7IEhJR0hfU1VSUk9HQVRFX01BWCwgSElHSF9TVVJST0dBVEVfTUlOIH0gZnJvbSAnLi9zdHJpbmcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEl0ZXJhdG9yUmVzdWx0PFQ+IHtcblx0cmVhZG9ubHkgZG9uZTogYm9vbGVhbjtcblx0cmVhZG9ubHkgdmFsdWU6IFQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSXRlcmF0b3I8VD4ge1xuXHRuZXh0KHZhbHVlPzogYW55KTogSXRlcmF0b3JSZXN1bHQ8VD47XG5cblx0cmV0dXJuPyh2YWx1ZT86IGFueSk6IEl0ZXJhdG9yUmVzdWx0PFQ+O1xuXG5cdHRocm93PyhlPzogYW55KTogSXRlcmF0b3JSZXN1bHQ8VD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSXRlcmFibGU8VD4ge1xuXHRbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYXRvcjxUPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJdGVyYWJsZUl0ZXJhdG9yPFQ+IGV4dGVuZHMgSXRlcmF0b3I8VD4ge1xuXHRbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYWJsZUl0ZXJhdG9yPFQ+O1xufVxuXG5jb25zdCBzdGF0aWNEb25lOiBJdGVyYXRvclJlc3VsdDxhbnk+ID0geyBkb25lOiB0cnVlLCB2YWx1ZTogdW5kZWZpbmVkIH07XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IF9zaGltc18gYW4gaXRlcmF0b3IgaW50ZXJmYWNlIG9uIGFycmF5IGxpa2Ugb2JqZWN0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNoaW1JdGVyYXRvcjxUPiB7XG5cdHByaXZhdGUgX2xpc3Q6IEFycmF5TGlrZTxUPiB8IHVuZGVmaW5lZDtcblx0cHJpdmF0ZSBfbmV4dEluZGV4ID0gLTE7XG5cdHByaXZhdGUgX25hdGl2ZUl0ZXJhdG9yOiBJdGVyYXRvcjxUPiB8IHVuZGVmaW5lZDtcblxuXHRjb25zdHJ1Y3RvcihsaXN0OiBBcnJheUxpa2U8VD4gfCBJdGVyYWJsZTxUPikge1xuXHRcdGlmIChpc0l0ZXJhYmxlKGxpc3QpKSB7XG5cdFx0XHR0aGlzLl9uYXRpdmVJdGVyYXRvciA9IGxpc3RbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9saXN0ID0gbGlzdDtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHRoZSBuZXh0IGl0ZXJhdGlvbiByZXN1bHQgZm9yIHRoZSBJdGVyYXRvclxuXHQgKi9cblx0bmV4dCgpOiBJdGVyYXRvclJlc3VsdDxUPiB7XG5cdFx0aWYgKHRoaXMuX25hdGl2ZUl0ZXJhdG9yKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fbmF0aXZlSXRlcmF0b3IubmV4dCgpO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuX2xpc3QpIHtcblx0XHRcdHJldHVybiBzdGF0aWNEb25lO1xuXHRcdH1cblx0XHRpZiAoKyt0aGlzLl9uZXh0SW5kZXggPCB0aGlzLl9saXN0Lmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZG9uZTogZmFsc2UsXG5cdFx0XHRcdHZhbHVlOiB0aGlzLl9saXN0W3RoaXMuX25leHRJbmRleF1cblx0XHRcdH07XG5cdFx0fVxuXHRcdHJldHVybiBzdGF0aWNEb25lO1xuXHR9XG5cblx0W1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmFibGVJdGVyYXRvcjxUPiB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cblxuLyoqXG4gKiBBIHR5cGUgZ3VhcmQgZm9yIGNoZWNraW5nIGlmIHNvbWV0aGluZyBoYXMgYW4gSXRlcmFibGUgaW50ZXJmYWNlXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0eXBlIGd1YXJkIGFnYWluc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSXRlcmFibGUodmFsdWU6IGFueSk6IHZhbHVlIGlzIEl0ZXJhYmxlPGFueT4ge1xuXHRyZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlW1N5bWJvbC5pdGVyYXRvcl0gPT09ICdmdW5jdGlvbic7XG59XG5cbi8qKlxuICogQSB0eXBlIGd1YXJkIGZvciBjaGVja2luZyBpZiBzb21ldGhpbmcgaXMgQXJyYXlMaWtlXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0eXBlIGd1YXJkIGFnYWluc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBBcnJheUxpa2U8YW55PiB7XG5cdHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUubGVuZ3RoID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBmb3IgYW4gb2JqZWN0XG4gKlxuICogQHBhcmFtIGl0ZXJhYmxlIFRoZSBpdGVyYWJsZSBvYmplY3QgdG8gcmV0dXJuIHRoZSBpdGVyYXRvciBmb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldDxUPihpdGVyYWJsZTogSXRlcmFibGU8VD4gfCBBcnJheUxpa2U8VD4pOiBJdGVyYXRvcjxUPiB8IHVuZGVmaW5lZCB7XG5cdGlmIChpc0l0ZXJhYmxlKGl0ZXJhYmxlKSkge1xuXHRcdHJldHVybiBpdGVyYWJsZVtTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdH0gZWxzZSBpZiAoaXNBcnJheUxpa2UoaXRlcmFibGUpKSB7XG5cdFx0cmV0dXJuIG5ldyBTaGltSXRlcmF0b3IoaXRlcmFibGUpO1xuXHR9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9yT2ZDYWxsYmFjazxUPiB7XG5cdC8qKlxuXHQgKiBBIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciBhIGZvck9mKCkgaXRlcmF0aW9uXG5cdCAqXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgY3VycmVudCB2YWx1ZVxuXHQgKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3QgYmVpbmcgaXRlcmF0ZWQgb3ZlclxuXHQgKiBAcGFyYW0gZG9CcmVhayBBIGZ1bmN0aW9uLCBpZiBjYWxsZWQsIHdpbGwgc3RvcCB0aGUgaXRlcmF0aW9uXG5cdCAqL1xuXHQodmFsdWU6IFQsIG9iamVjdDogSXRlcmFibGU8VD4gfCBBcnJheUxpa2U8VD4gfCBzdHJpbmcsIGRvQnJlYWs6ICgpID0+IHZvaWQpOiB2b2lkO1xufVxuXG4vKipcbiAqIFNoaW1zIHRoZSBmdW5jdGlvbmFsaXR5IG9mIGBmb3IgLi4uIG9mYCBibG9ja3NcbiAqXG4gKiBAcGFyYW0gaXRlcmFibGUgVGhlIG9iamVjdCB0aGUgcHJvdmlkZXMgYW4gaW50ZXJhdG9yIGludGVyZmFjZVxuICogQHBhcmFtIGNhbGxiYWNrIFRoZSBjYWxsYmFjayB3aGljaCB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaCBpdGVtIG9mIHRoZSBpdGVyYWJsZVxuICogQHBhcmFtIHRoaXNBcmcgT3B0aW9uYWwgc2NvcGUgdG8gcGFzcyB0aGUgY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvck9mPFQ+KFxuXHRpdGVyYWJsZTogSXRlcmFibGU8VD4gfCBBcnJheUxpa2U8VD4gfCBzdHJpbmcsXG5cdGNhbGxiYWNrOiBGb3JPZkNhbGxiYWNrPFQ+LFxuXHR0aGlzQXJnPzogYW55XG4pOiB2b2lkIHtcblx0bGV0IGJyb2tlbiA9IGZhbHNlO1xuXG5cdGZ1bmN0aW9uIGRvQnJlYWsoKSB7XG5cdFx0YnJva2VuID0gdHJ1ZTtcblx0fVxuXG5cdC8qIFdlIG5lZWQgdG8gaGFuZGxlIGl0ZXJhdGlvbiBvZiBkb3VibGUgYnl0ZSBzdHJpbmdzIHByb3Blcmx5ICovXG5cdGlmIChpc0FycmF5TGlrZShpdGVyYWJsZSkgJiYgdHlwZW9mIGl0ZXJhYmxlID09PSAnc3RyaW5nJykge1xuXHRcdGNvbnN0IGwgPSBpdGVyYWJsZS5sZW5ndGg7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsOyArK2kpIHtcblx0XHRcdGxldCBjaGFyID0gaXRlcmFibGVbaV07XG5cdFx0XHRpZiAoaSArIDEgPCBsKSB7XG5cdFx0XHRcdGNvbnN0IGNvZGUgPSBjaGFyLmNoYXJDb2RlQXQoMCk7XG5cdFx0XHRcdGlmIChjb2RlID49IEhJR0hfU1VSUk9HQVRFX01JTiAmJiBjb2RlIDw9IEhJR0hfU1VSUk9HQVRFX01BWCkge1xuXHRcdFx0XHRcdGNoYXIgKz0gaXRlcmFibGVbKytpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzQXJnLCBjaGFyLCBpdGVyYWJsZSwgZG9CcmVhayk7XG5cdFx0XHRpZiAoYnJva2VuKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgaXRlcmF0b3IgPSBnZXQoaXRlcmFibGUpO1xuXHRcdGlmIChpdGVyYXRvcikge1xuXHRcdFx0bGV0IHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcblxuXHRcdFx0d2hpbGUgKCFyZXN1bHQuZG9uZSkge1xuXHRcdFx0XHRjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHJlc3VsdC52YWx1ZSwgaXRlcmFibGUsIGRvQnJlYWspO1xuXHRcdFx0XHRpZiAoYnJva2VuKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBpdGVyYXRvci50cyIsImltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuXG4vKipcbiAqIFRoZSBzbWFsbGVzdCBpbnRlcnZhbCBiZXR3ZWVuIHR3byByZXByZXNlbnRhYmxlIG51bWJlcnMuXG4gKi9cbmV4cG9ydCBjb25zdCBFUFNJTE9OID0gMTtcblxuLyoqXG4gKiBUaGUgbWF4aW11bSBzYWZlIGludGVnZXIgaW4gSmF2YVNjcmlwdFxuICovXG5leHBvcnQgY29uc3QgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogVGhlIG1pbmltdW0gc2FmZSBpbnRlZ2VyIGluIEphdmFTY3JpcHRcbiAqL1xuZXhwb3J0IGNvbnN0IE1JTl9TQUZFX0lOVEVHRVIgPSAtTUFYX1NBRkVfSU5URUdFUjtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBhc3NlZCB2YWx1ZSBpcyBOYU4gd2l0aG91dCBjb2Vyc2lvbi5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgTmFOLCBmYWxzZSBpZiBpdCBpcyBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTmFOKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcblx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgZ2xvYmFsLmlzTmFOKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhIGZpbml0ZSBudW1iZXIgd2l0aG91dCBjb2Vyc2lvbi5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgZmluaXRlLCBmYWxzZSBpZiBpdCBpcyBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRmluaXRlKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiBnbG9iYWwuaXNGaW5pdGUodmFsdWUpO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGFzc2VkIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIsIGZhbHNlIGlmIGl0IGlzIG5vdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNGaW5pdGUodmFsdWUpICYmIE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhbiBpbnRlZ2VyIHRoYXQgaXMgJ3NhZmUsJyBtZWFuaW5nOlxuICogICAxLiBpdCBjYW4gYmUgZXhwcmVzc2VkIGFzIGFuIElFRUUtNzU0IGRvdWJsZSBwcmVjaXNpb24gbnVtYmVyXG4gKiAgIDIuIGl0IGhhcyBhIG9uZS10by1vbmUgbWFwcGluZyB0byBhIG1hdGhlbWF0aWNhbCBpbnRlZ2VyLCBtZWFuaW5nIGl0c1xuICogICAgICBJRUVFLTc1NCByZXByZXNlbnRhdGlvbiBjYW5ub3QgYmUgdGhlIHJlc3VsdCBvZiByb3VuZGluZyBhbnkgb3RoZXJcbiAqICAgICAgaW50ZWdlciB0byBmaXQgdGhlIElFRUUtNzU0IHJlcHJlc2VudGF0aW9uXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIsIGZhbHNlIGlmIGl0IGlzIG5vdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTYWZlSW50ZWdlcih2YWx1ZTogYW55KTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzSW50ZWdlcih2YWx1ZSkgJiYgTWF0aC5hYnModmFsdWUpIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbnVtYmVyLnRzIiwiaW1wb3J0IGdsb2JhbCBmcm9tICcuL2dsb2JhbCc7XG5pbXBvcnQgaGFzIGZyb20gJy4vc3VwcG9ydC9oYXMnO1xuaW1wb3J0IHsgaXNTeW1ib2wgfSBmcm9tICcuL1N5bWJvbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT2JqZWN0QXNzaWduIHtcblx0LyoqXG5cdCAqIENvcHkgdGhlIHZhbHVlcyBvZiBhbGwgb2YgdGhlIGVudW1lcmFibGUgb3duIHByb3BlcnRpZXMgZnJvbSBvbmUgb3IgbW9yZSBzb3VyY2Ugb2JqZWN0cyB0byBhXG5cdCAqIHRhcmdldCBvYmplY3QuIFJldHVybnMgdGhlIHRhcmdldCBvYmplY3QuXG5cdCAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3QgdG8gY29weSB0by5cblx0ICogQHBhcmFtIHNvdXJjZSBUaGUgc291cmNlIG9iamVjdCBmcm9tIHdoaWNoIHRvIGNvcHkgcHJvcGVydGllcy5cblx0ICovXG5cdDxULCBVPih0YXJnZXQ6IFQsIHNvdXJjZTogVSk6IFQgJiBVO1xuXG5cdC8qKlxuXHQgKiBDb3B5IHRoZSB2YWx1ZXMgb2YgYWxsIG9mIHRoZSBlbnVtZXJhYmxlIG93biBwcm9wZXJ0aWVzIGZyb20gb25lIG9yIG1vcmUgc291cmNlIG9iamVjdHMgdG8gYVxuXHQgKiB0YXJnZXQgb2JqZWN0LiBSZXR1cm5zIHRoZSB0YXJnZXQgb2JqZWN0LlxuXHQgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IHRvIGNvcHkgdG8uXG5cdCAqIEBwYXJhbSBzb3VyY2UxIFRoZSBmaXJzdCBzb3VyY2Ugb2JqZWN0IGZyb20gd2hpY2ggdG8gY29weSBwcm9wZXJ0aWVzLlxuXHQgKiBAcGFyYW0gc291cmNlMiBUaGUgc2Vjb25kIHNvdXJjZSBvYmplY3QgZnJvbSB3aGljaCB0byBjb3B5IHByb3BlcnRpZXMuXG5cdCAqL1xuXHQ8VCwgVSwgVj4odGFyZ2V0OiBULCBzb3VyY2UxOiBVLCBzb3VyY2UyOiBWKTogVCAmIFUgJiBWO1xuXG5cdC8qKlxuXHQgKiBDb3B5IHRoZSB2YWx1ZXMgb2YgYWxsIG9mIHRoZSBlbnVtZXJhYmxlIG93biBwcm9wZXJ0aWVzIGZyb20gb25lIG9yIG1vcmUgc291cmNlIG9iamVjdHMgdG8gYVxuXHQgKiB0YXJnZXQgb2JqZWN0LiBSZXR1cm5zIHRoZSB0YXJnZXQgb2JqZWN0LlxuXHQgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IHRvIGNvcHkgdG8uXG5cdCAqIEBwYXJhbSBzb3VyY2UxIFRoZSBmaXJzdCBzb3VyY2Ugb2JqZWN0IGZyb20gd2hpY2ggdG8gY29weSBwcm9wZXJ0aWVzLlxuXHQgKiBAcGFyYW0gc291cmNlMiBUaGUgc2Vjb25kIHNvdXJjZSBvYmplY3QgZnJvbSB3aGljaCB0byBjb3B5IHByb3BlcnRpZXMuXG5cdCAqIEBwYXJhbSBzb3VyY2UzIFRoZSB0aGlyZCBzb3VyY2Ugb2JqZWN0IGZyb20gd2hpY2ggdG8gY29weSBwcm9wZXJ0aWVzLlxuXHQgKi9cblx0PFQsIFUsIFYsIFc+KHRhcmdldDogVCwgc291cmNlMTogVSwgc291cmNlMjogViwgc291cmNlMzogVyk6IFQgJiBVICYgViAmIFc7XG5cblx0LyoqXG5cdCAqIENvcHkgdGhlIHZhbHVlcyBvZiBhbGwgb2YgdGhlIGVudW1lcmFibGUgb3duIHByb3BlcnRpZXMgZnJvbSBvbmUgb3IgbW9yZSBzb3VyY2Ugb2JqZWN0cyB0byBhXG5cdCAqIHRhcmdldCBvYmplY3QuIFJldHVybnMgdGhlIHRhcmdldCBvYmplY3QuXG5cdCAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3QgdG8gY29weSB0by5cblx0ICogQHBhcmFtIHNvdXJjZXMgT25lIG9yIG1vcmUgc291cmNlIG9iamVjdHMgZnJvbSB3aGljaCB0byBjb3B5IHByb3BlcnRpZXNcblx0ICovXG5cdCh0YXJnZXQ6IG9iamVjdCwgLi4uc291cmNlczogYW55W10pOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT2JqZWN0RW50ZXJpZXMge1xuXHQvKipcblx0ICogUmV0dXJucyBhbiBhcnJheSBvZiBrZXkvdmFsdWVzIG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0XG5cdCAqIEBwYXJhbSBvIE9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZSBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzLiBUaGlzIGNhbiBiZSBhbiBvYmplY3QgdGhhdCB5b3UgY3JlYXRlZCBvciBhbiBleGlzdGluZyBEb2N1bWVudCBPYmplY3QgTW9kZWwgKERPTSkgb2JqZWN0LlxuXHQgKi9cblx0PFQgZXh0ZW5kcyB7IFtrZXk6IHN0cmluZ106IGFueSB9LCBLIGV4dGVuZHMga2V5b2YgVD4obzogVCk6IFtrZXlvZiBULCBUW0tdXVtdO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGtleS92YWx1ZXMgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBhbiBvYmplY3Rcblx0ICogQHBhcmFtIG8gT2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMuIFRoaXMgY2FuIGJlIGFuIG9iamVjdCB0aGF0IHlvdSBjcmVhdGVkIG9yIGFuIGV4aXN0aW5nIERvY3VtZW50IE9iamVjdCBNb2RlbCAoRE9NKSBvYmplY3QuXG5cdCAqL1xuXHQobzogb2JqZWN0KTogW3N0cmluZywgYW55XVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9iamVjdEdldE93blByb3BlcnR5RGVzY3JpcHRvcnMge1xuXHQ8VD4obzogVCk6IHsgW0sgaW4ga2V5b2YgVF06IFByb3BlcnR5RGVzY3JpcHRvciB9O1xuXHQobzogYW55KTogeyBba2V5OiBzdHJpbmddOiBQcm9wZXJ0eURlc2NyaXB0b3IgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPYmplY3RWYWx1ZXMge1xuXHQvKipcblx0ICogUmV0dXJucyBhbiBhcnJheSBvZiB2YWx1ZXMgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBhbiBvYmplY3Rcblx0ICogQHBhcmFtIG8gT2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMuIFRoaXMgY2FuIGJlIGFuIG9iamVjdCB0aGF0IHlvdSBjcmVhdGVkIG9yIGFuIGV4aXN0aW5nIERvY3VtZW50IE9iamVjdCBNb2RlbCAoRE9NKSBvYmplY3QuXG5cdCAqL1xuXHQ8VD4obzogeyBbczogc3RyaW5nXTogVCB9KTogVFtdO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHZhbHVlcyBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdFxuXHQgKiBAcGFyYW0gbyBPYmplY3QgdGhhdCBjb250YWlucyB0aGUgcHJvcGVydGllcyBhbmQgbWV0aG9kcy4gVGhpcyBjYW4gYmUgYW4gb2JqZWN0IHRoYXQgeW91IGNyZWF0ZWQgb3IgYW4gZXhpc3RpbmcgRG9jdW1lbnQgT2JqZWN0IE1vZGVsIChET00pIG9iamVjdC5cblx0ICovXG5cdChvOiBvYmplY3QpOiBhbnlbXTtcbn1cblxuZXhwb3J0IGxldCBhc3NpZ246IE9iamVjdEFzc2lnbjtcblxuLyoqXG4gKiBHZXRzIHRoZSBvd24gcHJvcGVydHkgZGVzY3JpcHRvciBvZiB0aGUgc3BlY2lmaWVkIG9iamVjdC5cbiAqIEFuIG93biBwcm9wZXJ0eSBkZXNjcmlwdG9yIGlzIG9uZSB0aGF0IGlzIGRlZmluZWQgZGlyZWN0bHkgb24gdGhlIG9iamVjdCBhbmQgaXMgbm90XG4gKiBpbmhlcml0ZWQgZnJvbSB0aGUgb2JqZWN0J3MgcHJvdG90eXBlLlxuICogQHBhcmFtIG8gT2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIHByb3BlcnR5LlxuICogQHBhcmFtIHAgTmFtZSBvZiB0aGUgcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBsZXQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiA8VCwgSyBleHRlbmRzIGtleW9mIFQ+KG86IFQsIHByb3BlcnR5S2V5OiBLKSA9PiBQcm9wZXJ0eURlc2NyaXB0b3IgfCB1bmRlZmluZWQ7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbmFtZXMgb2YgdGhlIG93biBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdC4gVGhlIG93biBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdCBhcmUgdGhvc2UgdGhhdCBhcmUgZGVmaW5lZCBkaXJlY3RseVxuICogb24gdGhhdCBvYmplY3QsIGFuZCBhcmUgbm90IGluaGVyaXRlZCBmcm9tIHRoZSBvYmplY3QncyBwcm90b3R5cGUuIFRoZSBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdCBpbmNsdWRlIGJvdGggZmllbGRzIChvYmplY3RzKSBhbmQgZnVuY3Rpb25zLlxuICogQHBhcmFtIG8gT2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIG93biBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnQgbGV0IGdldE93blByb3BlcnR5TmFtZXM6IChvOiBhbnkpID0+IHN0cmluZ1tdO1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgYWxsIHN5bWJvbCBwcm9wZXJ0aWVzIGZvdW5kIGRpcmVjdGx5IG9uIG9iamVjdCBvLlxuICogQHBhcmFtIG8gT2JqZWN0IHRvIHJldHJpZXZlIHRoZSBzeW1ib2xzIGZyb20uXG4gKi9cbmV4cG9ydCBsZXQgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAobzogYW55KSA9PiBzeW1ib2xbXTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlcyBhcmUgdGhlIHNhbWUgdmFsdWUsIGZhbHNlIG90aGVyd2lzZS5cbiAqIEBwYXJhbSB2YWx1ZTEgVGhlIGZpcnN0IHZhbHVlLlxuICogQHBhcmFtIHZhbHVlMiBUaGUgc2Vjb25kIHZhbHVlLlxuICovXG5leHBvcnQgbGV0IGlzOiAodmFsdWUxOiBhbnksIHZhbHVlMjogYW55KSA9PiBib29sZWFuO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG5hbWVzIG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgb2YgYW4gb2JqZWN0LlxuICogQHBhcmFtIG8gT2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMuIFRoaXMgY2FuIGJlIGFuIG9iamVjdCB0aGF0IHlvdSBjcmVhdGVkIG9yIGFuIGV4aXN0aW5nIERvY3VtZW50IE9iamVjdCBNb2RlbCAoRE9NKSBvYmplY3QuXG4gKi9cbmV4cG9ydCBsZXQga2V5czogKG86IG9iamVjdCkgPT4gc3RyaW5nW107XG5cbi8qIEVTNyBPYmplY3Qgc3RhdGljIG1ldGhvZHMgKi9cblxuZXhwb3J0IGxldCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzOiBPYmplY3RHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzO1xuXG5leHBvcnQgbGV0IGVudHJpZXM6IE9iamVjdEVudGVyaWVzO1xuXG5leHBvcnQgbGV0IHZhbHVlczogT2JqZWN0VmFsdWVzO1xuXG5pZiAoaGFzKCdlczYtb2JqZWN0JykpIHtcblx0Y29uc3QgZ2xvYmFsT2JqZWN0ID0gZ2xvYmFsLk9iamVjdDtcblx0YXNzaWduID0gZ2xvYmFsT2JqZWN0LmFzc2lnbjtcblx0Z2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2xvYmFsT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblx0Z2V0T3duUHJvcGVydHlOYW1lcyA9IGdsb2JhbE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xuXHRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnbG9iYWxPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXHRpcyA9IGdsb2JhbE9iamVjdC5pcztcblx0a2V5cyA9IGdsb2JhbE9iamVjdC5rZXlzO1xufSBlbHNlIHtcblx0a2V5cyA9IGZ1bmN0aW9uIHN5bWJvbEF3YXJlS2V5cyhvOiBvYmplY3QpOiBzdHJpbmdbXSB7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKG8pLmZpbHRlcigoa2V5KSA9PiAhQm9vbGVhbihrZXkubWF0Y2goL15AQC4rLykpKTtcblx0fTtcblxuXHRhc3NpZ24gPSBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0OiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKSB7XG5cdFx0aWYgKHRhcmdldCA9PSBudWxsKSB7XG5cdFx0XHQvLyBUeXBlRXJyb3IgaWYgdW5kZWZpbmVkIG9yIG51bGxcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHRvID0gT2JqZWN0KHRhcmdldCk7XG5cdFx0c291cmNlcy5mb3JFYWNoKChuZXh0U291cmNlKSA9PiB7XG5cdFx0XHRpZiAobmV4dFNvdXJjZSkge1xuXHRcdFx0XHQvLyBTa2lwIG92ZXIgaWYgdW5kZWZpbmVkIG9yIG51bGxcblx0XHRcdFx0a2V5cyhuZXh0U291cmNlKS5mb3JFYWNoKChuZXh0S2V5KSA9PiB7XG5cdFx0XHRcdFx0dG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiB0bztcblx0fTtcblxuXHRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoXG5cdFx0bzogYW55LFxuXHRcdHByb3A6IHN0cmluZyB8IHN5bWJvbFxuXHQpOiBQcm9wZXJ0eURlc2NyaXB0b3IgfCB1bmRlZmluZWQge1xuXHRcdGlmIChpc1N5bWJvbChwcm9wKSkge1xuXHRcdFx0cmV0dXJuICg8YW55Pk9iamVjdCkuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG8sIHByb3ApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvLCBwcm9wKTtcblx0XHR9XG5cdH07XG5cblx0Z2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMobzogYW55KTogc3RyaW5nW10ge1xuXHRcdHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvKS5maWx0ZXIoKGtleSkgPT4gIUJvb2xlYW4oa2V5Lm1hdGNoKC9eQEAuKy8pKSk7XG5cdH07XG5cblx0Z2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKG86IGFueSk6IHN5bWJvbFtdIHtcblx0XHRyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobylcblx0XHRcdC5maWx0ZXIoKGtleSkgPT4gQm9vbGVhbihrZXkubWF0Y2goL15AQC4rLykpKVxuXHRcdFx0Lm1hcCgoa2V5KSA9PiBTeW1ib2wuZm9yKGtleS5zdWJzdHJpbmcoMikpKTtcblx0fTtcblxuXHRpcyA9IGZ1bmN0aW9uIGlzKHZhbHVlMTogYW55LCB2YWx1ZTI6IGFueSk6IGJvb2xlYW4ge1xuXHRcdGlmICh2YWx1ZTEgPT09IHZhbHVlMikge1xuXHRcdFx0cmV0dXJuIHZhbHVlMSAhPT0gMCB8fCAxIC8gdmFsdWUxID09PSAxIC8gdmFsdWUyOyAvLyAtMFxuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWUxICE9PSB2YWx1ZTEgJiYgdmFsdWUyICE9PSB2YWx1ZTI7IC8vIE5hTlxuXHR9O1xufVxuXG5pZiAoaGFzKCdlczIwMTctb2JqZWN0JykpIHtcblx0Y29uc3QgZ2xvYmFsT2JqZWN0ID0gZ2xvYmFsLk9iamVjdDtcblx0Z2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA9IGdsb2JhbE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzO1xuXHRlbnRyaWVzID0gZ2xvYmFsT2JqZWN0LmVudHJpZXM7XG5cdHZhbHVlcyA9IGdsb2JhbE9iamVjdC52YWx1ZXM7XG59IGVsc2Uge1xuXHRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvOiBhbnkpIHtcblx0XHRyZXR1cm4gZ2V0T3duUHJvcGVydHlOYW1lcyhvKS5yZWR1Y2UoXG5cdFx0XHQocHJldmlvdXMsIGtleSkgPT4ge1xuXHRcdFx0XHRwcmV2aW91c1trZXldID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG8sIGtleSkhO1xuXHRcdFx0XHRyZXR1cm4gcHJldmlvdXM7XG5cdFx0XHR9LFxuXHRcdFx0e30gYXMgeyBba2V5OiBzdHJpbmddOiBQcm9wZXJ0eURlc2NyaXB0b3IgfVxuXHRcdCk7XG5cdH07XG5cblx0ZW50cmllcyA9IGZ1bmN0aW9uIGVudHJpZXMobzogYW55KTogW3N0cmluZywgYW55XVtdIHtcblx0XHRyZXR1cm4ga2V5cyhvKS5tYXAoKGtleSkgPT4gW2tleSwgb1trZXldXSBhcyBbc3RyaW5nLCBhbnldKTtcblx0fTtcblxuXHR2YWx1ZXMgPSBmdW5jdGlvbiB2YWx1ZXMobzogYW55KTogYW55W10ge1xuXHRcdHJldHVybiBrZXlzKG8pLm1hcCgoa2V5KSA9PiBvW2tleV0pO1xuXHR9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIG9iamVjdC50cyIsImltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuaW1wb3J0IGhhcyBmcm9tICcuL3N1cHBvcnQvaGFzJztcbmltcG9ydCB7IHdyYXBOYXRpdmUgfSBmcm9tICcuL3N1cHBvcnQvdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RyaW5nTm9ybWFsaXplIHtcblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIFN0cmluZyB2YWx1ZSByZXN1bHQgb2Ygbm9ybWFsaXppbmcgdGhlIHN0cmluZyBpbnRvIHRoZSBub3JtYWxpemF0aW9uIGZvcm1cblx0ICogbmFtZWQgYnkgZm9ybSBhcyBzcGVjaWZpZWQgaW4gVW5pY29kZSBTdGFuZGFyZCBBbm5leCAjMTUsIFVuaWNvZGUgTm9ybWFsaXphdGlvbiBGb3Jtcy5cblx0ICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHN0cmluZ1xuXHQgKiBAcGFyYW0gZm9ybSBBcHBsaWNhYmxlIHZhbHVlczogXCJORkNcIiwgXCJORkRcIiwgXCJORktDXCIsIG9yIFwiTkZLRFwiLCBJZiBub3Qgc3BlY2lmaWVkIGRlZmF1bHRcblx0ICogaXMgXCJORkNcIlxuXHQgKi9cblx0KHRhcmdldDogc3RyaW5nLCBmb3JtOiAnTkZDJyB8ICdORkQnIHwgJ05GS0MnIHwgJ05GS0QnKTogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBTdHJpbmcgdmFsdWUgcmVzdWx0IG9mIG5vcm1hbGl6aW5nIHRoZSBzdHJpbmcgaW50byB0aGUgbm9ybWFsaXphdGlvbiBmb3JtXG5cdCAqIG5hbWVkIGJ5IGZvcm0gYXMgc3BlY2lmaWVkIGluIFVuaWNvZGUgU3RhbmRhcmQgQW5uZXggIzE1LCBVbmljb2RlIE5vcm1hbGl6YXRpb24gRm9ybXMuXG5cdCAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBzdHJpbmdcblx0ICogQHBhcmFtIGZvcm0gQXBwbGljYWJsZSB2YWx1ZXM6IFwiTkZDXCIsIFwiTkZEXCIsIFwiTkZLQ1wiLCBvciBcIk5GS0RcIiwgSWYgbm90IHNwZWNpZmllZCBkZWZhdWx0XG5cdCAqIGlzIFwiTkZDXCJcblx0ICovXG5cdCh0YXJnZXQ6IHN0cmluZywgZm9ybT86IHN0cmluZyk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBUaGUgbWluaW11bSBsb2NhdGlvbiBvZiBoaWdoIHN1cnJvZ2F0ZXNcbiAqL1xuZXhwb3J0IGNvbnN0IEhJR0hfU1VSUk9HQVRFX01JTiA9IDB4ZDgwMDtcblxuLyoqXG4gKiBUaGUgbWF4aW11bSBsb2NhdGlvbiBvZiBoaWdoIHN1cnJvZ2F0ZXNcbiAqL1xuZXhwb3J0IGNvbnN0IEhJR0hfU1VSUk9HQVRFX01BWCA9IDB4ZGJmZjtcblxuLyoqXG4gKiBUaGUgbWluaW11bSBsb2NhdGlvbiBvZiBsb3cgc3Vycm9nYXRlc1xuICovXG5leHBvcnQgY29uc3QgTE9XX1NVUlJPR0FURV9NSU4gPSAweGRjMDA7XG5cbi8qKlxuICogVGhlIG1heGltdW0gbG9jYXRpb24gb2YgbG93IHN1cnJvZ2F0ZXNcbiAqL1xuZXhwb3J0IGNvbnN0IExPV19TVVJST0dBVEVfTUFYID0gMHhkZmZmO1xuXG4vKiBFUzYgc3RhdGljIG1ldGhvZHMgKi9cblxuLyoqXG4gKiBSZXR1cm4gdGhlIFN0cmluZyB2YWx1ZSB3aG9zZSBlbGVtZW50cyBhcmUsIGluIG9yZGVyLCB0aGUgZWxlbWVudHMgaW4gdGhlIExpc3QgZWxlbWVudHMuXG4gKiBJZiBsZW5ndGggaXMgMCwgdGhlIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZC5cbiAqIEBwYXJhbSBjb2RlUG9pbnRzIFRoZSBjb2RlIHBvaW50cyB0byBnZW5lcmF0ZSB0aGUgc3RyaW5nXG4gKi9cbmV4cG9ydCBsZXQgZnJvbUNvZGVQb2ludDogKC4uLmNvZGVQb2ludHM6IG51bWJlcltdKSA9PiBzdHJpbmc7XG5cbi8qKlxuICogYHJhd2AgaXMgaW50ZW5kZWQgZm9yIHVzZSBhcyBhIHRhZyBmdW5jdGlvbiBvZiBhIFRhZ2dlZCBUZW1wbGF0ZSBTdHJpbmcuIFdoZW4gY2FsbGVkXG4gKiBhcyBzdWNoIHRoZSBmaXJzdCBhcmd1bWVudCB3aWxsIGJlIGEgd2VsbCBmb3JtZWQgdGVtcGxhdGUgY2FsbCBzaXRlIG9iamVjdCBhbmQgdGhlIHJlc3RcbiAqIHBhcmFtZXRlciB3aWxsIGNvbnRhaW4gdGhlIHN1YnN0aXR1dGlvbiB2YWx1ZXMuXG4gKiBAcGFyYW0gdGVtcGxhdGUgQSB3ZWxsLWZvcm1lZCB0ZW1wbGF0ZSBzdHJpbmcgY2FsbCBzaXRlIHJlcHJlc2VudGF0aW9uLlxuICogQHBhcmFtIHN1YnN0aXR1dGlvbnMgQSBzZXQgb2Ygc3Vic3RpdHV0aW9uIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGxldCByYXc6ICh0ZW1wbGF0ZTogVGVtcGxhdGVTdHJpbmdzQXJyYXksIC4uLnN1YnN0aXR1dGlvbnM6IGFueVtdKSA9PiBzdHJpbmc7XG5cbi8qIEVTNiBpbnN0YW5jZSBtZXRob2RzICovXG5cbi8qKlxuICogUmV0dXJucyBhIG5vbm5lZ2F0aXZlIGludGVnZXIgTnVtYmVyIGxlc3MgdGhhbiAxMTE0MTEyICgweDExMDAwMCkgdGhhdCBpcyB0aGUgY29kZSBwb2ludFxuICogdmFsdWUgb2YgdGhlIFVURi0xNiBlbmNvZGVkIGNvZGUgcG9pbnQgc3RhcnRpbmcgYXQgdGhlIHN0cmluZyBlbGVtZW50IGF0IHBvc2l0aW9uIHBvcyBpblxuICogdGhlIFN0cmluZyByZXN1bHRpbmcgZnJvbSBjb252ZXJ0aW5nIHRoaXMgb2JqZWN0IHRvIGEgU3RyaW5nLlxuICogSWYgdGhlcmUgaXMgbm8gZWxlbWVudCBhdCB0aGF0IHBvc2l0aW9uLCB0aGUgcmVzdWx0IGlzIHVuZGVmaW5lZC5cbiAqIElmIGEgdmFsaWQgVVRGLTE2IHN1cnJvZ2F0ZSBwYWlyIGRvZXMgbm90IGJlZ2luIGF0IHBvcywgdGhlIHJlc3VsdCBpcyB0aGUgY29kZSB1bml0IGF0IHBvcy5cbiAqL1xuZXhwb3J0IGxldCBjb2RlUG9pbnRBdDogKHRhcmdldDogc3RyaW5nLCBwb3M/OiBudW1iZXIpID0+IG51bWJlciB8IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHNlcXVlbmNlIG9mIGVsZW1lbnRzIG9mIHNlYXJjaFN0cmluZyBjb252ZXJ0ZWQgdG8gYSBTdHJpbmcgaXMgdGhlXG4gKiBzYW1lIGFzIHRoZSBjb3JyZXNwb25kaW5nIGVsZW1lbnRzIG9mIHRoaXMgb2JqZWN0IChjb252ZXJ0ZWQgdG8gYSBTdHJpbmcpIHN0YXJ0aW5nIGF0XG4gKiBlbmRQb3NpdGlvbiDigJMgbGVuZ3RoKHRoaXMpLiBPdGhlcndpc2UgcmV0dXJucyBmYWxzZS5cbiAqL1xuZXhwb3J0IGxldCBlbmRzV2l0aDogKHRhcmdldDogc3RyaW5nLCBzZWFyY2hTdHJpbmc6IHN0cmluZywgZW5kUG9zaXRpb24/OiBudW1iZXIpID0+IGJvb2xlYW47XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHNlYXJjaFN0cmluZyBhcHBlYXJzIGFzIGEgc3Vic3RyaW5nIG9mIHRoZSByZXN1bHQgb2YgY29udmVydGluZyB0aGlzXG4gKiBvYmplY3QgdG8gYSBTdHJpbmcsIGF0IG9uZSBvciBtb3JlIHBvc2l0aW9ucyB0aGF0IGFyZVxuICogZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHBvc2l0aW9uOyBvdGhlcndpc2UsIHJldHVybnMgZmFsc2UuXG4gKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgc3RyaW5nXG4gKiBAcGFyYW0gc2VhcmNoU3RyaW5nIHNlYXJjaCBzdHJpbmdcbiAqIEBwYXJhbSBwb3NpdGlvbiBJZiBwb3NpdGlvbiBpcyB1bmRlZmluZWQsIDAgaXMgYXNzdW1lZCwgc28gYXMgdG8gc2VhcmNoIGFsbCBvZiB0aGUgU3RyaW5nLlxuICovXG5leHBvcnQgbGV0IGluY2x1ZGVzOiAodGFyZ2V0OiBzdHJpbmcsIHNlYXJjaFN0cmluZzogc3RyaW5nLCBwb3NpdGlvbj86IG51bWJlcikgPT4gYm9vbGVhbjtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBTdHJpbmcgdmFsdWUgcmVzdWx0IG9mIG5vcm1hbGl6aW5nIHRoZSBzdHJpbmcgaW50byB0aGUgbm9ybWFsaXphdGlvbiBmb3JtXG4gKiBuYW1lZCBieSBmb3JtIGFzIHNwZWNpZmllZCBpbiBVbmljb2RlIFN0YW5kYXJkIEFubmV4ICMxNSwgVW5pY29kZSBOb3JtYWxpemF0aW9uIEZvcm1zLlxuICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHN0cmluZ1xuICogQHBhcmFtIGZvcm0gQXBwbGljYWJsZSB2YWx1ZXM6IFwiTkZDXCIsIFwiTkZEXCIsIFwiTkZLQ1wiLCBvciBcIk5GS0RcIiwgSWYgbm90IHNwZWNpZmllZCBkZWZhdWx0XG4gKiBpcyBcIk5GQ1wiXG4gKi9cbmV4cG9ydCBsZXQgbm9ybWFsaXplOiBTdHJpbmdOb3JtYWxpemU7XG5cbi8qKlxuICogUmV0dXJucyBhIFN0cmluZyB2YWx1ZSB0aGF0IGlzIG1hZGUgZnJvbSBjb3VudCBjb3BpZXMgYXBwZW5kZWQgdG9nZXRoZXIuIElmIGNvdW50IGlzIDAsXG4gKiBUIGlzIHRoZSBlbXB0eSBTdHJpbmcgaXMgcmV0dXJuZWQuXG4gKiBAcGFyYW0gY291bnQgbnVtYmVyIG9mIGNvcGllcyB0byBhcHBlbmRcbiAqL1xuZXhwb3J0IGxldCByZXBlYXQ6ICh0YXJnZXQ6IHN0cmluZywgY291bnQ/OiBudW1iZXIpID0+IHN0cmluZztcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHNlcXVlbmNlIG9mIGVsZW1lbnRzIG9mIHNlYXJjaFN0cmluZyBjb252ZXJ0ZWQgdG8gYSBTdHJpbmcgaXMgdGhlXG4gKiBzYW1lIGFzIHRoZSBjb3JyZXNwb25kaW5nIGVsZW1lbnRzIG9mIHRoaXMgb2JqZWN0IChjb252ZXJ0ZWQgdG8gYSBTdHJpbmcpIHN0YXJ0aW5nIGF0XG4gKiBwb3NpdGlvbi4gT3RoZXJ3aXNlIHJldHVybnMgZmFsc2UuXG4gKi9cbmV4cG9ydCBsZXQgc3RhcnRzV2l0aDogKHRhcmdldDogc3RyaW5nLCBzZWFyY2hTdHJpbmc6IHN0cmluZywgcG9zaXRpb24/OiBudW1iZXIpID0+IGJvb2xlYW47XG5cbi8qIEVTNyBpbnN0YW5jZSBtZXRob2RzICovXG5cbi8qKlxuICogUGFkcyB0aGUgY3VycmVudCBzdHJpbmcgd2l0aCBhIGdpdmVuIHN0cmluZyAocG9zc2libHkgcmVwZWF0ZWQpIHNvIHRoYXQgdGhlIHJlc3VsdGluZyBzdHJpbmcgcmVhY2hlcyBhIGdpdmVuIGxlbmd0aC5cbiAqIFRoZSBwYWRkaW5nIGlzIGFwcGxpZWQgZnJvbSB0aGUgZW5kIChyaWdodCkgb2YgdGhlIGN1cnJlbnQgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBzdHJpbmdcbiAqIEBwYXJhbSBtYXhMZW5ndGggVGhlIGxlbmd0aCBvZiB0aGUgcmVzdWx0aW5nIHN0cmluZyBvbmNlIHRoZSBjdXJyZW50IHN0cmluZyBoYXMgYmVlbiBwYWRkZWQuXG4gKiAgICAgICAgSWYgdGhpcyBwYXJhbWV0ZXIgaXMgc21hbGxlciB0aGFuIHRoZSBjdXJyZW50IHN0cmluZydzIGxlbmd0aCwgdGhlIGN1cnJlbnQgc3RyaW5nIHdpbGwgYmUgcmV0dXJuZWQgYXMgaXQgaXMuXG4gKlxuICogQHBhcmFtIGZpbGxTdHJpbmcgVGhlIHN0cmluZyB0byBwYWQgdGhlIGN1cnJlbnQgc3RyaW5nIHdpdGguXG4gKiAgICAgICAgSWYgdGhpcyBzdHJpbmcgaXMgdG9vIGxvbmcsIGl0IHdpbGwgYmUgdHJ1bmNhdGVkIGFuZCB0aGUgbGVmdC1tb3N0IHBhcnQgd2lsbCBiZSBhcHBsaWVkLlxuICogICAgICAgIFRoZSBkZWZhdWx0IHZhbHVlIGZvciB0aGlzIHBhcmFtZXRlciBpcyBcIiBcIiAoVSswMDIwKS5cbiAqL1xuZXhwb3J0IGxldCBwYWRFbmQ6ICh0YXJnZXQ6IHN0cmluZywgbWF4TGVuZ3RoOiBudW1iZXIsIGZpbGxTdHJpbmc/OiBzdHJpbmcpID0+IHN0cmluZztcblxuLyoqXG4gKiBQYWRzIHRoZSBjdXJyZW50IHN0cmluZyB3aXRoIGEgZ2l2ZW4gc3RyaW5nIChwb3NzaWJseSByZXBlYXRlZCkgc28gdGhhdCB0aGUgcmVzdWx0aW5nIHN0cmluZyByZWFjaGVzIGEgZ2l2ZW4gbGVuZ3RoLlxuICogVGhlIHBhZGRpbmcgaXMgYXBwbGllZCBmcm9tIHRoZSBzdGFydCAobGVmdCkgb2YgdGhlIGN1cnJlbnQgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBzdHJpbmdcbiAqIEBwYXJhbSBtYXhMZW5ndGggVGhlIGxlbmd0aCBvZiB0aGUgcmVzdWx0aW5nIHN0cmluZyBvbmNlIHRoZSBjdXJyZW50IHN0cmluZyBoYXMgYmVlbiBwYWRkZWQuXG4gKiAgICAgICAgSWYgdGhpcyBwYXJhbWV0ZXIgaXMgc21hbGxlciB0aGFuIHRoZSBjdXJyZW50IHN0cmluZydzIGxlbmd0aCwgdGhlIGN1cnJlbnQgc3RyaW5nIHdpbGwgYmUgcmV0dXJuZWQgYXMgaXQgaXMuXG4gKlxuICogQHBhcmFtIGZpbGxTdHJpbmcgVGhlIHN0cmluZyB0byBwYWQgdGhlIGN1cnJlbnQgc3RyaW5nIHdpdGguXG4gKiAgICAgICAgSWYgdGhpcyBzdHJpbmcgaXMgdG9vIGxvbmcsIGl0IHdpbGwgYmUgdHJ1bmNhdGVkIGFuZCB0aGUgbGVmdC1tb3N0IHBhcnQgd2lsbCBiZSBhcHBsaWVkLlxuICogICAgICAgIFRoZSBkZWZhdWx0IHZhbHVlIGZvciB0aGlzIHBhcmFtZXRlciBpcyBcIiBcIiAoVSswMDIwKS5cbiAqL1xuZXhwb3J0IGxldCBwYWRTdGFydDogKHRhcmdldDogc3RyaW5nLCBtYXhMZW5ndGg6IG51bWJlciwgZmlsbFN0cmluZz86IHN0cmluZykgPT4gc3RyaW5nO1xuXG5pZiAoaGFzKCdlczYtc3RyaW5nJykgJiYgaGFzKCdlczYtc3RyaW5nLXJhdycpKSB7XG5cdGZyb21Db2RlUG9pbnQgPSBnbG9iYWwuU3RyaW5nLmZyb21Db2RlUG9pbnQ7XG5cdHJhdyA9IGdsb2JhbC5TdHJpbmcucmF3O1xuXG5cdGNvZGVQb2ludEF0ID0gd3JhcE5hdGl2ZShnbG9iYWwuU3RyaW5nLnByb3RvdHlwZS5jb2RlUG9pbnRBdCk7XG5cdGVuZHNXaXRoID0gd3JhcE5hdGl2ZShnbG9iYWwuU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCk7XG5cdGluY2x1ZGVzID0gd3JhcE5hdGl2ZShnbG9iYWwuU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlcyk7XG5cdG5vcm1hbGl6ZSA9IHdyYXBOYXRpdmUoZ2xvYmFsLlN0cmluZy5wcm90b3R5cGUubm9ybWFsaXplKTtcblx0cmVwZWF0ID0gd3JhcE5hdGl2ZShnbG9iYWwuU3RyaW5nLnByb3RvdHlwZS5yZXBlYXQpO1xuXHRzdGFydHNXaXRoID0gd3JhcE5hdGl2ZShnbG9iYWwuU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoKTtcbn0gZWxzZSB7XG5cdC8qKlxuXHQgKiBWYWxpZGF0ZXMgdGhhdCB0ZXh0IGlzIGRlZmluZWQsIGFuZCBub3JtYWxpemVzIHBvc2l0aW9uIChiYXNlZCBvbiB0aGUgZ2l2ZW4gZGVmYXVsdCBpZiB0aGUgaW5wdXQgaXMgTmFOKS5cblx0ICogVXNlZCBieSBzdGFydHNXaXRoLCBpbmNsdWRlcywgYW5kIGVuZHNXaXRoLlxuXHQgKlxuXHQgKiBAcmV0dXJuIE5vcm1hbGl6ZWQgcG9zaXRpb24uXG5cdCAqL1xuXHRjb25zdCBub3JtYWxpemVTdWJzdHJpbmdBcmdzID0gZnVuY3Rpb24oXG5cdFx0bmFtZTogc3RyaW5nLFxuXHRcdHRleHQ6IHN0cmluZyxcblx0XHRzZWFyY2g6IHN0cmluZyxcblx0XHRwb3NpdGlvbjogbnVtYmVyLFxuXHRcdGlzRW5kOiBib29sZWFuID0gZmFsc2Vcblx0KTogW3N0cmluZywgc3RyaW5nLCBudW1iZXJdIHtcblx0XHRpZiAodGV4dCA9PSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdzdHJpbmcuJyArIG5hbWUgKyAnIHJlcXVpcmVzIGEgdmFsaWQgc3RyaW5nIHRvIHNlYXJjaCBhZ2FpbnN0LicpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGxlbmd0aCA9IHRleHQubGVuZ3RoO1xuXHRcdHBvc2l0aW9uID0gcG9zaXRpb24gIT09IHBvc2l0aW9uID8gKGlzRW5kID8gbGVuZ3RoIDogMCkgOiBwb3NpdGlvbjtcblx0XHRyZXR1cm4gW3RleHQsIFN0cmluZyhzZWFyY2gpLCBNYXRoLm1pbihNYXRoLm1heChwb3NpdGlvbiwgMCksIGxlbmd0aCldO1xuXHR9O1xuXG5cdGZyb21Db2RlUG9pbnQgPSBmdW5jdGlvbiBmcm9tQ29kZVBvaW50KC4uLmNvZGVQb2ludHM6IG51bWJlcltdKTogc3RyaW5nIHtcblx0XHQvLyBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLmZyb21Db2RlUG9pbnRcblx0XHRjb25zdCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuXHRcdGlmICghbGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcblx0XHRjb25zdCBNQVhfU0laRSA9IDB4NDAwMDtcblx0XHRsZXQgY29kZVVuaXRzOiBudW1iZXJbXSA9IFtdO1xuXHRcdGxldCBpbmRleCA9IC0xO1xuXHRcdGxldCByZXN1bHQgPSAnJztcblxuXHRcdHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG5cdFx0XHRsZXQgY29kZVBvaW50ID0gTnVtYmVyKGFyZ3VtZW50c1tpbmRleF0pO1xuXG5cdFx0XHQvLyBDb2RlIHBvaW50cyBtdXN0IGJlIGZpbml0ZSBpbnRlZ2VycyB3aXRoaW4gdGhlIHZhbGlkIHJhbmdlXG5cdFx0XHRsZXQgaXNWYWxpZCA9XG5cdFx0XHRcdGlzRmluaXRlKGNvZGVQb2ludCkgJiYgTWF0aC5mbG9vcihjb2RlUG9pbnQpID09PSBjb2RlUG9pbnQgJiYgY29kZVBvaW50ID49IDAgJiYgY29kZVBvaW50IDw9IDB4MTBmZmZmO1xuXHRcdFx0aWYgKCFpc1ZhbGlkKSB7XG5cdFx0XHRcdHRocm93IFJhbmdlRXJyb3IoJ3N0cmluZy5mcm9tQ29kZVBvaW50OiBJbnZhbGlkIGNvZGUgcG9pbnQgJyArIGNvZGVQb2ludCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjb2RlUG9pbnQgPD0gMHhmZmZmKSB7XG5cdFx0XHRcdC8vIEJNUCBjb2RlIHBvaW50XG5cdFx0XHRcdGNvZGVVbml0cy5wdXNoKGNvZGVQb2ludCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBBc3RyYWwgY29kZSBwb2ludDsgc3BsaXQgaW4gc3Vycm9nYXRlIGhhbHZlc1xuXHRcdFx0XHQvLyBodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZyNzdXJyb2dhdGUtZm9ybXVsYWVcblx0XHRcdFx0Y29kZVBvaW50IC09IDB4MTAwMDA7XG5cdFx0XHRcdGxldCBoaWdoU3Vycm9nYXRlID0gKGNvZGVQb2ludCA+PiAxMCkgKyBISUdIX1NVUlJPR0FURV9NSU47XG5cdFx0XHRcdGxldCBsb3dTdXJyb2dhdGUgPSAoY29kZVBvaW50ICUgMHg0MDApICsgTE9XX1NVUlJPR0FURV9NSU47XG5cdFx0XHRcdGNvZGVVbml0cy5wdXNoKGhpZ2hTdXJyb2dhdGUsIGxvd1N1cnJvZ2F0ZSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpbmRleCArIDEgPT09IGxlbmd0aCB8fCBjb2RlVW5pdHMubGVuZ3RoID4gTUFYX1NJWkUpIHtcblx0XHRcdFx0cmVzdWx0ICs9IGZyb21DaGFyQ29kZS5hcHBseShudWxsLCBjb2RlVW5pdHMpO1xuXHRcdFx0XHRjb2RlVW5pdHMubGVuZ3RoID0gMDtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fTtcblxuXHRyYXcgPSBmdW5jdGlvbiByYXcoY2FsbFNpdGU6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5zdWJzdGl0dXRpb25zOiBhbnlbXSk6IHN0cmluZyB7XG5cdFx0bGV0IHJhd1N0cmluZ3MgPSBjYWxsU2l0ZS5yYXc7XG5cdFx0bGV0IHJlc3VsdCA9ICcnO1xuXHRcdGxldCBudW1TdWJzdGl0dXRpb25zID0gc3Vic3RpdHV0aW9ucy5sZW5ndGg7XG5cblx0XHRpZiAoY2FsbFNpdGUgPT0gbnVsbCB8fCBjYWxsU2l0ZS5yYXcgPT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignc3RyaW5nLnJhdyByZXF1aXJlcyBhIHZhbGlkIGNhbGxTaXRlIG9iamVjdCB3aXRoIGEgcmF3IHZhbHVlJyk7XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IHJhd1N0cmluZ3MubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdHJlc3VsdCArPSByYXdTdHJpbmdzW2ldICsgKGkgPCBudW1TdWJzdGl0dXRpb25zICYmIGkgPCBsZW5ndGggLSAxID8gc3Vic3RpdHV0aW9uc1tpXSA6ICcnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9O1xuXG5cdGNvZGVQb2ludEF0ID0gZnVuY3Rpb24gY29kZVBvaW50QXQodGV4dDogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyID0gMCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG5cdFx0Ly8gQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXRcblx0XHRpZiAodGV4dCA9PSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdzdHJpbmcuY29kZVBvaW50QXQgcmVxdXJpZXMgYSB2YWxpZCBzdHJpbmcuJyk7XG5cdFx0fVxuXHRcdGNvbnN0IGxlbmd0aCA9IHRleHQubGVuZ3RoO1xuXG5cdFx0aWYgKHBvc2l0aW9uICE9PSBwb3NpdGlvbikge1xuXHRcdFx0cG9zaXRpb24gPSAwO1xuXHRcdH1cblx0XHRpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IGxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHQvLyBHZXQgdGhlIGZpcnN0IGNvZGUgdW5pdFxuXHRcdGNvbnN0IGZpcnN0ID0gdGV4dC5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcblx0XHRpZiAoZmlyc3QgPj0gSElHSF9TVVJST0dBVEVfTUlOICYmIGZpcnN0IDw9IEhJR0hfU1VSUk9HQVRFX01BWCAmJiBsZW5ndGggPiBwb3NpdGlvbiArIDEpIHtcblx0XHRcdC8vIFN0YXJ0IG9mIGEgc3Vycm9nYXRlIHBhaXIgKGhpZ2ggc3Vycm9nYXRlIGFuZCB0aGVyZSBpcyBhIG5leHQgY29kZSB1bml0KTsgY2hlY2sgZm9yIGxvdyBzdXJyb2dhdGVcblx0XHRcdC8vIGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nI3N1cnJvZ2F0ZS1mb3JtdWxhZVxuXHRcdFx0Y29uc3Qgc2Vjb25kID0gdGV4dC5jaGFyQ29kZUF0KHBvc2l0aW9uICsgMSk7XG5cdFx0XHRpZiAoc2Vjb25kID49IExPV19TVVJST0dBVEVfTUlOICYmIHNlY29uZCA8PSBMT1dfU1VSUk9HQVRFX01BWCkge1xuXHRcdFx0XHRyZXR1cm4gKGZpcnN0IC0gSElHSF9TVVJST0dBVEVfTUlOKSAqIDB4NDAwICsgc2Vjb25kIC0gTE9XX1NVUlJPR0FURV9NSU4gKyAweDEwMDAwO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmlyc3Q7XG5cdH07XG5cblx0ZW5kc1dpdGggPSBmdW5jdGlvbiBlbmRzV2l0aCh0ZXh0OiBzdHJpbmcsIHNlYXJjaDogc3RyaW5nLCBlbmRQb3NpdGlvbj86IG51bWJlcik6IGJvb2xlYW4ge1xuXHRcdGlmIChlbmRQb3NpdGlvbiA9PSBudWxsKSB7XG5cdFx0XHRlbmRQb3NpdGlvbiA9IHRleHQubGVuZ3RoO1xuXHRcdH1cblxuXHRcdFt0ZXh0LCBzZWFyY2gsIGVuZFBvc2l0aW9uXSA9IG5vcm1hbGl6ZVN1YnN0cmluZ0FyZ3MoJ2VuZHNXaXRoJywgdGV4dCwgc2VhcmNoLCBlbmRQb3NpdGlvbiwgdHJ1ZSk7XG5cblx0XHRjb25zdCBzdGFydCA9IGVuZFBvc2l0aW9uIC0gc2VhcmNoLmxlbmd0aDtcblx0XHRpZiAoc3RhcnQgPCAwKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRleHQuc2xpY2Uoc3RhcnQsIGVuZFBvc2l0aW9uKSA9PT0gc2VhcmNoO1xuXHR9O1xuXG5cdGluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXModGV4dDogc3RyaW5nLCBzZWFyY2g6IHN0cmluZywgcG9zaXRpb246IG51bWJlciA9IDApOiBib29sZWFuIHtcblx0XHRbdGV4dCwgc2VhcmNoLCBwb3NpdGlvbl0gPSBub3JtYWxpemVTdWJzdHJpbmdBcmdzKCdpbmNsdWRlcycsIHRleHQsIHNlYXJjaCwgcG9zaXRpb24pO1xuXHRcdHJldHVybiB0ZXh0LmluZGV4T2Yoc2VhcmNoLCBwb3NpdGlvbikgIT09IC0xO1xuXHR9O1xuXG5cdHJlcGVhdCA9IGZ1bmN0aW9uIHJlcGVhdCh0ZXh0OiBzdHJpbmcsIGNvdW50OiBudW1iZXIgPSAwKTogc3RyaW5nIHtcblx0XHQvLyBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLnByb3RvdHlwZS5yZXBlYXRcblx0XHRpZiAodGV4dCA9PSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdzdHJpbmcucmVwZWF0IHJlcXVpcmVzIGEgdmFsaWQgc3RyaW5nLicpO1xuXHRcdH1cblx0XHRpZiAoY291bnQgIT09IGNvdW50KSB7XG5cdFx0XHRjb3VudCA9IDA7XG5cdFx0fVxuXHRcdGlmIChjb3VudCA8IDAgfHwgY291bnQgPT09IEluZmluaXR5KSB7XG5cdFx0XHR0aHJvdyBuZXcgUmFuZ2VFcnJvcignc3RyaW5nLnJlcGVhdCByZXF1aXJlcyBhIG5vbi1uZWdhdGl2ZSBmaW5pdGUgY291bnQuJyk7XG5cdFx0fVxuXG5cdFx0bGV0IHJlc3VsdCA9ICcnO1xuXHRcdHdoaWxlIChjb3VudCkge1xuXHRcdFx0aWYgKGNvdW50ICUgMikge1xuXHRcdFx0XHRyZXN1bHQgKz0gdGV4dDtcblx0XHRcdH1cblx0XHRcdGlmIChjb3VudCA+IDEpIHtcblx0XHRcdFx0dGV4dCArPSB0ZXh0O1xuXHRcdFx0fVxuXHRcdFx0Y291bnQgPj49IDE7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH07XG5cblx0c3RhcnRzV2l0aCA9IGZ1bmN0aW9uIHN0YXJ0c1dpdGgodGV4dDogc3RyaW5nLCBzZWFyY2g6IHN0cmluZywgcG9zaXRpb246IG51bWJlciA9IDApOiBib29sZWFuIHtcblx0XHRzZWFyY2ggPSBTdHJpbmcoc2VhcmNoKTtcblx0XHRbdGV4dCwgc2VhcmNoLCBwb3NpdGlvbl0gPSBub3JtYWxpemVTdWJzdHJpbmdBcmdzKCdzdGFydHNXaXRoJywgdGV4dCwgc2VhcmNoLCBwb3NpdGlvbik7XG5cblx0XHRjb25zdCBlbmQgPSBwb3NpdGlvbiArIHNlYXJjaC5sZW5ndGg7XG5cdFx0aWYgKGVuZCA+IHRleHQubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRleHQuc2xpY2UocG9zaXRpb24sIGVuZCkgPT09IHNlYXJjaDtcblx0fTtcbn1cblxuaWYgKGhhcygnZXMyMDE3LXN0cmluZycpKSB7XG5cdHBhZEVuZCA9IHdyYXBOYXRpdmUoZ2xvYmFsLlN0cmluZy5wcm90b3R5cGUucGFkRW5kKTtcblx0cGFkU3RhcnQgPSB3cmFwTmF0aXZlKGdsb2JhbC5TdHJpbmcucHJvdG90eXBlLnBhZFN0YXJ0KTtcbn0gZWxzZSB7XG5cdHBhZEVuZCA9IGZ1bmN0aW9uIHBhZEVuZCh0ZXh0OiBzdHJpbmcsIG1heExlbmd0aDogbnVtYmVyLCBmaWxsU3RyaW5nOiBzdHJpbmcgPSAnICcpOiBzdHJpbmcge1xuXHRcdGlmICh0ZXh0ID09PSBudWxsIHx8IHRleHQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignc3RyaW5nLnJlcGVhdCByZXF1aXJlcyBhIHZhbGlkIHN0cmluZy4nKTtcblx0XHR9XG5cblx0XHRpZiAobWF4TGVuZ3RoID09PSBJbmZpbml0eSkge1xuXHRcdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3N0cmluZy5wYWRFbmQgcmVxdWlyZXMgYSBub24tbmVnYXRpdmUgZmluaXRlIGNvdW50LicpO1xuXHRcdH1cblxuXHRcdGlmIChtYXhMZW5ndGggPT09IG51bGwgfHwgbWF4TGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbWF4TGVuZ3RoIDwgMCkge1xuXHRcdFx0bWF4TGVuZ3RoID0gMDtcblx0XHR9XG5cblx0XHRsZXQgc3RyVGV4dCA9IFN0cmluZyh0ZXh0KTtcblx0XHRjb25zdCBwYWRkaW5nID0gbWF4TGVuZ3RoIC0gc3RyVGV4dC5sZW5ndGg7XG5cblx0XHRpZiAocGFkZGluZyA+IDApIHtcblx0XHRcdHN0clRleHQgKz1cblx0XHRcdFx0cmVwZWF0KGZpbGxTdHJpbmcsIE1hdGguZmxvb3IocGFkZGluZyAvIGZpbGxTdHJpbmcubGVuZ3RoKSkgK1xuXHRcdFx0XHRmaWxsU3RyaW5nLnNsaWNlKDAsIHBhZGRpbmcgJSBmaWxsU3RyaW5nLmxlbmd0aCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHN0clRleHQ7XG5cdH07XG5cblx0cGFkU3RhcnQgPSBmdW5jdGlvbiBwYWRTdGFydCh0ZXh0OiBzdHJpbmcsIG1heExlbmd0aDogbnVtYmVyLCBmaWxsU3RyaW5nOiBzdHJpbmcgPSAnICcpOiBzdHJpbmcge1xuXHRcdGlmICh0ZXh0ID09PSBudWxsIHx8IHRleHQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignc3RyaW5nLnJlcGVhdCByZXF1aXJlcyBhIHZhbGlkIHN0cmluZy4nKTtcblx0XHR9XG5cblx0XHRpZiAobWF4TGVuZ3RoID09PSBJbmZpbml0eSkge1xuXHRcdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3N0cmluZy5wYWRTdGFydCByZXF1aXJlcyBhIG5vbi1uZWdhdGl2ZSBmaW5pdGUgY291bnQuJyk7XG5cdFx0fVxuXG5cdFx0aWYgKG1heExlbmd0aCA9PT0gbnVsbCB8fCBtYXhMZW5ndGggPT09IHVuZGVmaW5lZCB8fCBtYXhMZW5ndGggPCAwKSB7XG5cdFx0XHRtYXhMZW5ndGggPSAwO1xuXHRcdH1cblxuXHRcdGxldCBzdHJUZXh0ID0gU3RyaW5nKHRleHQpO1xuXHRcdGNvbnN0IHBhZGRpbmcgPSBtYXhMZW5ndGggLSBzdHJUZXh0Lmxlbmd0aDtcblxuXHRcdGlmIChwYWRkaW5nID4gMCkge1xuXHRcdFx0c3RyVGV4dCA9XG5cdFx0XHRcdHJlcGVhdChmaWxsU3RyaW5nLCBNYXRoLmZsb29yKHBhZGRpbmcgLyBmaWxsU3RyaW5nLmxlbmd0aCkpICtcblx0XHRcdFx0ZmlsbFN0cmluZy5zbGljZSgwLCBwYWRkaW5nICUgZmlsbFN0cmluZy5sZW5ndGgpICtcblx0XHRcdFx0c3RyVGV4dDtcblx0XHR9XG5cblx0XHRyZXR1cm4gc3RyVGV4dDtcblx0fTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzdHJpbmcudHMiLCJpbXBvcnQgZ2xvYmFsIGZyb20gJy4uL2dsb2JhbCc7XG5pbXBvcnQgaGFzIGZyb20gJy4vaGFzJztcbmltcG9ydCB7IEhhbmRsZSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuXG5mdW5jdGlvbiBleGVjdXRlVGFzayhpdGVtOiBRdWV1ZUl0ZW0gfCB1bmRlZmluZWQpOiB2b2lkIHtcblx0aWYgKGl0ZW0gJiYgaXRlbS5pc0FjdGl2ZSAmJiBpdGVtLmNhbGxiYWNrKSB7XG5cdFx0aXRlbS5jYWxsYmFjaygpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGdldFF1ZXVlSGFuZGxlKGl0ZW06IFF1ZXVlSXRlbSwgZGVzdHJ1Y3Rvcj86ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KTogSGFuZGxlIHtcblx0cmV0dXJuIHtcblx0XHRkZXN0cm95OiBmdW5jdGlvbih0aGlzOiBIYW5kbGUpIHtcblx0XHRcdHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCkge307XG5cdFx0XHRpdGVtLmlzQWN0aXZlID0gZmFsc2U7XG5cdFx0XHRpdGVtLmNhbGxiYWNrID0gbnVsbDtcblxuXHRcdFx0aWYgKGRlc3RydWN0b3IpIHtcblx0XHRcdFx0ZGVzdHJ1Y3RvcigpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxuaW50ZXJmYWNlIFBvc3RNZXNzYWdlRXZlbnQgZXh0ZW5kcyBFdmVudCB7XG5cdHNvdXJjZTogYW55O1xuXHRkYXRhOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUXVldWVJdGVtIHtcblx0aXNBY3RpdmU6IGJvb2xlYW47XG5cdGNhbGxiYWNrOiBudWxsIHwgKCguLi5hcmdzOiBhbnlbXSkgPT4gYW55KTtcbn1cblxubGV0IGNoZWNrTWljcm9UYXNrUXVldWU6ICgpID0+IHZvaWQ7XG5sZXQgbWljcm9UYXNrczogUXVldWVJdGVtW107XG5cbi8qKlxuICogU2NoZWR1bGVzIGEgY2FsbGJhY2sgdG8gdGhlIG1hY3JvdGFzayBxdWV1ZS5cbiAqXG4gKiBAcGFyYW0gY2FsbGJhY2sgdGhlIGZ1bmN0aW9uIHRvIGJlIHF1ZXVlZCBhbmQgbGF0ZXIgZXhlY3V0ZWQuXG4gKiBAcmV0dXJucyBBbiBvYmplY3Qgd2l0aCBhIGBkZXN0cm95YCBtZXRob2QgdGhhdCwgd2hlbiBjYWxsZWQsIHByZXZlbnRzIHRoZSByZWdpc3RlcmVkIGNhbGxiYWNrIGZyb20gZXhlY3V0aW5nLlxuICovXG5leHBvcnQgY29uc3QgcXVldWVUYXNrID0gKGZ1bmN0aW9uKCkge1xuXHRsZXQgZGVzdHJ1Y3RvcjogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5cdGxldCBlbnF1ZXVlOiAoaXRlbTogUXVldWVJdGVtKSA9PiB2b2lkO1xuXG5cdC8vIFNpbmNlIHRoZSBJRSBpbXBsZW1lbnRhdGlvbiBvZiBgc2V0SW1tZWRpYXRlYCBpcyBub3QgZmxhd2xlc3MsIHdlIHdpbGwgdGVzdCBmb3IgYHBvc3RNZXNzYWdlYCBmaXJzdC5cblx0aWYgKGhhcygncG9zdG1lc3NhZ2UnKSkge1xuXHRcdGNvbnN0IHF1ZXVlOiBRdWV1ZUl0ZW1bXSA9IFtdO1xuXG5cdFx0Z2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbihldmVudDogUG9zdE1lc3NhZ2VFdmVudCk6IHZvaWQge1xuXHRcdFx0Ly8gQ29uZmlybSB0aGF0IHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkIGJ5IHRoZSBjdXJyZW50IHdpbmRvdyBhbmQgYnkgdGhpcyBwYXJ0aWN1bGFyIGltcGxlbWVudGF0aW9uLlxuXHRcdFx0aWYgKGV2ZW50LnNvdXJjZSA9PT0gZ2xvYmFsICYmIGV2ZW50LmRhdGEgPT09ICdkb2pvLXF1ZXVlLW1lc3NhZ2UnKSB7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRcdGlmIChxdWV1ZS5sZW5ndGgpIHtcblx0XHRcdFx0XHRleGVjdXRlVGFzayhxdWV1ZS5zaGlmdCgpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0ZW5xdWV1ZSA9IGZ1bmN0aW9uKGl0ZW06IFF1ZXVlSXRlbSk6IHZvaWQge1xuXHRcdFx0cXVldWUucHVzaChpdGVtKTtcblx0XHRcdGdsb2JhbC5wb3N0TWVzc2FnZSgnZG9qby1xdWV1ZS1tZXNzYWdlJywgJyonKTtcblx0XHR9O1xuXHR9IGVsc2UgaWYgKGhhcygnc2V0aW1tZWRpYXRlJykpIHtcblx0XHRkZXN0cnVjdG9yID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlO1xuXHRcdGVucXVldWUgPSBmdW5jdGlvbihpdGVtOiBRdWV1ZUl0ZW0pOiBhbnkge1xuXHRcdFx0cmV0dXJuIHNldEltbWVkaWF0ZShleGVjdXRlVGFzay5iaW5kKG51bGwsIGl0ZW0pKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdGRlc3RydWN0b3IgPSBnbG9iYWwuY2xlYXJUaW1lb3V0O1xuXHRcdGVucXVldWUgPSBmdW5jdGlvbihpdGVtOiBRdWV1ZUl0ZW0pOiBhbnkge1xuXHRcdFx0cmV0dXJuIHNldFRpbWVvdXQoZXhlY3V0ZVRhc2suYmluZChudWxsLCBpdGVtKSwgMCk7XG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIHF1ZXVlVGFzayhjYWxsYmFjazogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkpOiBIYW5kbGUge1xuXHRcdGNvbnN0IGl0ZW06IFF1ZXVlSXRlbSA9IHtcblx0XHRcdGlzQWN0aXZlOiB0cnVlLFxuXHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrXG5cdFx0fTtcblx0XHRjb25zdCBpZDogYW55ID0gZW5xdWV1ZShpdGVtKTtcblxuXHRcdHJldHVybiBnZXRRdWV1ZUhhbmRsZShcblx0XHRcdGl0ZW0sXG5cdFx0XHRkZXN0cnVjdG9yICYmXG5cdFx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGRlc3RydWN0b3IoaWQpO1xuXHRcdFx0XHR9XG5cdFx0KTtcblx0fVxuXG5cdC8vIFRPRE86IFVzZSBhc3BlY3QuYmVmb3JlIHdoZW4gaXQgaXMgYXZhaWxhYmxlLlxuXHRyZXR1cm4gaGFzKCdtaWNyb3Rhc2tzJylcblx0XHQ/IHF1ZXVlVGFza1xuXHRcdDogZnVuY3Rpb24oY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KTogSGFuZGxlIHtcblx0XHRcdFx0Y2hlY2tNaWNyb1Rhc2tRdWV1ZSgpO1xuXHRcdFx0XHRyZXR1cm4gcXVldWVUYXNrKGNhbGxiYWNrKTtcblx0XHQgIH07XG59KSgpO1xuXG4vLyBXaGVuIG5vIG1lY2hhbmlzbSBmb3IgcmVnaXN0ZXJpbmcgbWljcm90YXNrcyBpcyBleHBvc2VkIGJ5IHRoZSBlbnZpcm9ubWVudCwgbWljcm90YXNrcyB3aWxsXG4vLyBiZSBxdWV1ZWQgYW5kIHRoZW4gZXhlY3V0ZWQgaW4gYSBzaW5nbGUgbWFjcm90YXNrIGJlZm9yZSB0aGUgb3RoZXIgbWFjcm90YXNrcyBhcmUgZXhlY3V0ZWQuXG5pZiAoIWhhcygnbWljcm90YXNrcycpKSB7XG5cdGxldCBpc01pY3JvVGFza1F1ZXVlZCA9IGZhbHNlO1xuXG5cdG1pY3JvVGFza3MgPSBbXTtcblx0Y2hlY2tNaWNyb1Rhc2tRdWV1ZSA9IGZ1bmN0aW9uKCk6IHZvaWQge1xuXHRcdGlmICghaXNNaWNyb1Rhc2tRdWV1ZWQpIHtcblx0XHRcdGlzTWljcm9UYXNrUXVldWVkID0gdHJ1ZTtcblx0XHRcdHF1ZXVlVGFzayhmdW5jdGlvbigpIHtcblx0XHRcdFx0aXNNaWNyb1Rhc2tRdWV1ZWQgPSBmYWxzZTtcblxuXHRcdFx0XHRpZiAobWljcm9UYXNrcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRsZXQgaXRlbTogUXVldWVJdGVtIHwgdW5kZWZpbmVkO1xuXHRcdFx0XHRcdHdoaWxlICgoaXRlbSA9IG1pY3JvVGFza3Muc2hpZnQoKSkpIHtcblx0XHRcdFx0XHRcdGV4ZWN1dGVUYXNrKGl0ZW0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xufVxuXG4vKipcbiAqIFNjaGVkdWxlcyBhbiBhbmltYXRpb24gdGFzayB3aXRoIGB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lYCBpZiBpdCBleGlzdHMsIG9yIHdpdGggYHF1ZXVlVGFza2Agb3RoZXJ3aXNlLlxuICpcbiAqIFNpbmNlIHJlcXVlc3RBbmltYXRpb25GcmFtZSdzIGJlaGF2aW9yIGRvZXMgbm90IG1hdGNoIHRoYXQgZXhwZWN0ZWQgZnJvbSBgcXVldWVUYXNrYCwgaXQgaXMgbm90IHVzZWQgdGhlcmUuXG4gKiBIb3dldmVyLCBhdCB0aW1lcyBpdCBtYWtlcyBtb3JlIHNlbnNlIHRvIGRlbGVnYXRlIHRvIHJlcXVlc3RBbmltYXRpb25GcmFtZTsgaGVuY2UgdGhlIGZvbGxvd2luZyBtZXRob2QuXG4gKlxuICogQHBhcmFtIGNhbGxiYWNrIHRoZSBmdW5jdGlvbiB0byBiZSBxdWV1ZWQgYW5kIGxhdGVyIGV4ZWN1dGVkLlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggYSBgZGVzdHJveWAgbWV0aG9kIHRoYXQsIHdoZW4gY2FsbGVkLCBwcmV2ZW50cyB0aGUgcmVnaXN0ZXJlZCBjYWxsYmFjayBmcm9tIGV4ZWN1dGluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXVlQW5pbWF0aW9uVGFzayA9IChmdW5jdGlvbigpIHtcblx0aWYgKCFoYXMoJ3JhZicpKSB7XG5cdFx0cmV0dXJuIHF1ZXVlVGFzaztcblx0fVxuXG5cdGZ1bmN0aW9uIHF1ZXVlQW5pbWF0aW9uVGFzayhjYWxsYmFjazogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkpOiBIYW5kbGUge1xuXHRcdGNvbnN0IGl0ZW06IFF1ZXVlSXRlbSA9IHtcblx0XHRcdGlzQWN0aXZlOiB0cnVlLFxuXHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrXG5cdFx0fTtcblx0XHRjb25zdCByYWZJZDogbnVtYmVyID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGV4ZWN1dGVUYXNrLmJpbmQobnVsbCwgaXRlbSkpO1xuXG5cdFx0cmV0dXJuIGdldFF1ZXVlSGFuZGxlKGl0ZW0sIGZ1bmN0aW9uKCkge1xuXHRcdFx0Y2FuY2VsQW5pbWF0aW9uRnJhbWUocmFmSWQpO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gVE9ETzogVXNlIGFzcGVjdC5iZWZvcmUgd2hlbiBpdCBpcyBhdmFpbGFibGUuXG5cdHJldHVybiBoYXMoJ21pY3JvdGFza3MnKVxuXHRcdD8gcXVldWVBbmltYXRpb25UYXNrXG5cdFx0OiBmdW5jdGlvbihjYWxsYmFjazogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkpOiBIYW5kbGUge1xuXHRcdFx0XHRjaGVja01pY3JvVGFza1F1ZXVlKCk7XG5cdFx0XHRcdHJldHVybiBxdWV1ZUFuaW1hdGlvblRhc2soY2FsbGJhY2spO1xuXHRcdCAgfTtcbn0pKCk7XG5cbi8qKlxuICogU2NoZWR1bGVzIGEgY2FsbGJhY2sgdG8gdGhlIG1pY3JvdGFzayBxdWV1ZS5cbiAqXG4gKiBBbnkgY2FsbGJhY2tzIHJlZ2lzdGVyZWQgd2l0aCBgcXVldWVNaWNyb1Rhc2tgIHdpbGwgYmUgZXhlY3V0ZWQgYmVmb3JlIHRoZSBuZXh0IG1hY3JvdGFzay4gSWYgbm8gbmF0aXZlXG4gKiBtZWNoYW5pc20gZm9yIHNjaGVkdWxpbmcgbWFjcm90YXNrcyBpcyBleHBvc2VkLCB0aGVuIGFueSBjYWxsYmFja3Mgd2lsbCBiZSBmaXJlZCBiZWZvcmUgYW55IG1hY3JvdGFza1xuICogcmVnaXN0ZXJlZCB3aXRoIGBxdWV1ZVRhc2tgIG9yIGBxdWV1ZUFuaW1hdGlvblRhc2tgLlxuICpcbiAqIEBwYXJhbSBjYWxsYmFjayB0aGUgZnVuY3Rpb24gdG8gYmUgcXVldWVkIGFuZCBsYXRlciBleGVjdXRlZC5cbiAqIEByZXR1cm5zIEFuIG9iamVjdCB3aXRoIGEgYGRlc3Ryb3lgIG1ldGhvZCB0aGF0LCB3aGVuIGNhbGxlZCwgcHJldmVudHMgdGhlIHJlZ2lzdGVyZWQgY2FsbGJhY2sgZnJvbSBleGVjdXRpbmcuXG4gKi9cbmV4cG9ydCBsZXQgcXVldWVNaWNyb1Rhc2sgPSAoZnVuY3Rpb24oKSB7XG5cdGxldCBlbnF1ZXVlOiAoaXRlbTogUXVldWVJdGVtKSA9PiB2b2lkO1xuXG5cdGlmIChoYXMoJ2hvc3Qtbm9kZScpKSB7XG5cdFx0ZW5xdWV1ZSA9IGZ1bmN0aW9uKGl0ZW06IFF1ZXVlSXRlbSk6IHZvaWQge1xuXHRcdFx0Z2xvYmFsLnByb2Nlc3MubmV4dFRpY2soZXhlY3V0ZVRhc2suYmluZChudWxsLCBpdGVtKSk7XG5cdFx0fTtcblx0fSBlbHNlIGlmIChoYXMoJ2VzNi1wcm9taXNlJykpIHtcblx0XHRlbnF1ZXVlID0gZnVuY3Rpb24oaXRlbTogUXVldWVJdGVtKTogdm9pZCB7XG5cdFx0XHRnbG9iYWwuUHJvbWlzZS5yZXNvbHZlKGl0ZW0pLnRoZW4oZXhlY3V0ZVRhc2spO1xuXHRcdH07XG5cdH0gZWxzZSBpZiAoaGFzKCdkb20tbXV0YXRpb25vYnNlcnZlcicpKSB7XG5cdFx0LyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWUgKi9cblx0XHRjb25zdCBIb3N0TXV0YXRpb25PYnNlcnZlciA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xuXHRcdGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRjb25zdCBxdWV1ZTogUXVldWVJdGVtW10gPSBbXTtcblx0XHRjb25zdCBvYnNlcnZlciA9IG5ldyBIb3N0TXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbigpOiB2b2lkIHtcblx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGNvbnN0IGl0ZW0gPSBxdWV1ZS5zaGlmdCgpO1xuXHRcdFx0XHRpZiAoaXRlbSAmJiBpdGVtLmlzQWN0aXZlICYmIGl0ZW0uY2FsbGJhY2spIHtcblx0XHRcdFx0XHRpdGVtLmNhbGxiYWNrKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdG9ic2VydmVyLm9ic2VydmUobm9kZSwgeyBhdHRyaWJ1dGVzOiB0cnVlIH0pO1xuXG5cdFx0ZW5xdWV1ZSA9IGZ1bmN0aW9uKGl0ZW06IFF1ZXVlSXRlbSk6IHZvaWQge1xuXHRcdFx0cXVldWUucHVzaChpdGVtKTtcblx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKCdxdWV1ZVN0YXR1cycsICcxJyk7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRlbnF1ZXVlID0gZnVuY3Rpb24oaXRlbTogUXVldWVJdGVtKTogdm9pZCB7XG5cdFx0XHRjaGVja01pY3JvVGFza1F1ZXVlKCk7XG5cdFx0XHRtaWNyb1Rhc2tzLnB1c2goaXRlbSk7XG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiBmdW5jdGlvbihjYWxsYmFjazogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkpOiBIYW5kbGUge1xuXHRcdGNvbnN0IGl0ZW06IFF1ZXVlSXRlbSA9IHtcblx0XHRcdGlzQWN0aXZlOiB0cnVlLFxuXHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrXG5cdFx0fTtcblxuXHRcdGVucXVldWUoaXRlbSk7XG5cblx0XHRyZXR1cm4gZ2V0UXVldWVIYW5kbGUoaXRlbSk7XG5cdH07XG59KSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHF1ZXVlLnRzIiwiLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgYSB2YWx1ZSBwcm9wZXJ0eSBkZXNjcmlwdG9yXG4gKlxuICogQHBhcmFtIHZhbHVlICAgICAgICBUaGUgdmFsdWUgdGhlIHByb3BlcnR5IGRlc2NyaXB0b3Igc2hvdWxkIGJlIHNldCB0b1xuICogQHBhcmFtIGVudW1lcmFibGUgICBJZiB0aGUgcHJvcGVydHkgc2hvdWxkIGJlIGVudW1iZXJhYmxlLCBkZWZhdWx0cyB0byBmYWxzZVxuICogQHBhcmFtIHdyaXRhYmxlICAgICBJZiB0aGUgcHJvcGVydHkgc2hvdWxkIGJlIHdyaXRhYmxlLCBkZWZhdWx0cyB0byB0cnVlXG4gKiBAcGFyYW0gY29uZmlndXJhYmxlIElmIHRoZSBwcm9wZXJ0eSBzaG91bGQgYmUgY29uZmlndXJhYmxlLCBkZWZhdWx0cyB0byB0cnVlXG4gKiBAcmV0dXJuICAgICAgICAgICAgIFRoZSBwcm9wZXJ0eSBkZXNjcmlwdG9yIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFsdWVEZXNjcmlwdG9yPFQ+KFxuXHR2YWx1ZTogVCxcblx0ZW51bWVyYWJsZTogYm9vbGVhbiA9IGZhbHNlLFxuXHR3cml0YWJsZTogYm9vbGVhbiA9IHRydWUsXG5cdGNvbmZpZ3VyYWJsZTogYm9vbGVhbiA9IHRydWVcbik6IFR5cGVkUHJvcGVydHlEZXNjcmlwdG9yPFQ+IHtcblx0cmV0dXJuIHtcblx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0ZW51bWVyYWJsZTogZW51bWVyYWJsZSxcblx0XHR3cml0YWJsZTogd3JpdGFibGUsXG5cdFx0Y29uZmlndXJhYmxlOiBjb25maWd1cmFibGVcblx0fTtcbn1cblxuLyoqXG4gKiBBIGhlbHBlciBmdW5jdGlvbiB3aGljaCB3cmFwcyBhIGZ1bmN0aW9uIHdoZXJlIHRoZSBmaXJzdCBhcmd1bWVudCBiZWNvbWVzIHRoZSBzY29wZVxuICogb2YgdGhlIGNhbGxcbiAqXG4gKiBAcGFyYW0gbmF0aXZlRnVuY3Rpb24gVGhlIHNvdXJjZSBmdW5jdGlvbiB0byBiZSB3cmFwcGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3cmFwTmF0aXZlPFQsIFUsIFI+KG5hdGl2ZUZ1bmN0aW9uOiAoYXJnMTogVSkgPT4gUik6ICh0YXJnZXQ6IFQsIGFyZzE6IFUpID0+IFI7XG5leHBvcnQgZnVuY3Rpb24gd3JhcE5hdGl2ZTxULCBVLCBWLCBSPihuYXRpdmVGdW5jdGlvbjogKGFyZzE6IFUsIGFyZzI6IFYpID0+IFIpOiAodGFyZ2V0OiBULCBhcmcxOiBVLCBhcmcyOiBWKSA9PiBSO1xuZXhwb3J0IGZ1bmN0aW9uIHdyYXBOYXRpdmU8VCwgVSwgViwgVywgUj4oXG5cdG5hdGl2ZUZ1bmN0aW9uOiAoYXJnMTogVSwgYXJnMjogViwgYXJnMzogVykgPT4gUlxuKTogKHRhcmdldDogVCwgYXJnMTogVSwgYXJnMjogViwgYXJnMzogVykgPT4gUjtcbmV4cG9ydCBmdW5jdGlvbiB3cmFwTmF0aXZlPFQsIFUsIFYsIFcsIFgsIFI+KFxuXHRuYXRpdmVGdW5jdGlvbjogKGFyZzE6IFUsIGFyZzI6IFYsIGFyZzM6IFcpID0+IFJcbik6ICh0YXJnZXQ6IFQsIGFyZzE6IFUsIGFyZzI6IFYsIGFyZzM6IFcpID0+IFI7XG5leHBvcnQgZnVuY3Rpb24gd3JhcE5hdGl2ZTxULCBVLCBWLCBXLCBYLCBZLCBSPihcblx0bmF0aXZlRnVuY3Rpb246IChhcmcxOiBVLCBhcmcyOiBWLCBhcmczOiBXLCBhcmc0OiBZKSA9PiBSXG4pOiAodGFyZ2V0OiBULCBhcmcxOiBVLCBhcmcyOiBWLCBhcmczOiBXLCBhcmc0OiBZKSA9PiBSO1xuZXhwb3J0IGZ1bmN0aW9uIHdyYXBOYXRpdmUobmF0aXZlRnVuY3Rpb246ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KTogKHRhcmdldDogYW55LCAuLi5hcmdzOiBhbnlbXSkgPT4gYW55IHtcblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldDogYW55LCAuLi5hcmdzOiBhbnlbXSk6IGFueSB7XG5cdFx0cmV0dXJuIG5hdGl2ZUZ1bmN0aW9uLmFwcGx5KHRhcmdldCwgYXJncyk7XG5cdH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gdXRpbC50cyIsImltcG9ydCB7IEV2ZW50ZWQgfSBmcm9tICcuLi9jb3JlL0V2ZW50ZWQnO1xuaW1wb3J0IHsgRXZlbnRPYmplY3QgfSBmcm9tICcuLi9jb3JlL2ludGVyZmFjZXMnO1xuaW1wb3J0IE1hcCBmcm9tICcuLi9zaGltL01hcCc7XG5pbXBvcnQgeyBOb2RlSGFuZGxlckludGVyZmFjZSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbi8qKlxuICogRW51bSB0byBpZGVudGlmeSB0aGUgdHlwZSBvZiBldmVudC5cbiAqIExpc3RlbmluZyB0byAnUHJvamVjdG9yJyB3aWxsIG5vdGlmeSB3aGVuIHByb2plY3RvciBpcyBjcmVhdGVkIG9yIHVwZGF0ZWRcbiAqIExpc3RlbmluZyB0byAnV2lkZ2V0JyB3aWxsIG5vdGlmeSB3aGVuIHdpZGdldCByb290IGlzIGNyZWF0ZWQgb3IgdXBkYXRlZFxuICovXG5leHBvcnQgZW51bSBOb2RlRXZlbnRUeXBlIHtcblx0UHJvamVjdG9yID0gJ1Byb2plY3RvcicsXG5cdFdpZGdldCA9ICdXaWRnZXQnXG59XG5cbmV4cG9ydCB0eXBlIE5vZGVIYW5kbGVyRXZlbnRNYXAgPSB7XG5cdFByb2plY3RvcjogRXZlbnRPYmplY3Q8Tm9kZUV2ZW50VHlwZS5Qcm9qZWN0b3I+O1xuXHRXaWRnZXQ6IEV2ZW50T2JqZWN0PE5vZGVFdmVudFR5cGUuV2lkZ2V0Pjtcbn07XG5cbmV4cG9ydCBjbGFzcyBOb2RlSGFuZGxlciBleHRlbmRzIEV2ZW50ZWQ8Tm9kZUhhbmRsZXJFdmVudE1hcD4gaW1wbGVtZW50cyBOb2RlSGFuZGxlckludGVyZmFjZSB7XG5cdHByaXZhdGUgX25vZGVNYXAgPSBuZXcgTWFwPHN0cmluZywgRWxlbWVudD4oKTtcblxuXHRwdWJsaWMgZ2V0KGtleTogc3RyaW5nKTogRWxlbWVudCB8IHVuZGVmaW5lZCB7XG5cdFx0cmV0dXJuIHRoaXMuX25vZGVNYXAuZ2V0KGtleSk7XG5cdH1cblxuXHRwdWJsaWMgaGFzKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX25vZGVNYXAuaGFzKGtleSk7XG5cdH1cblxuXHRwdWJsaWMgYWRkKGVsZW1lbnQ6IEVsZW1lbnQsIGtleTogc3RyaW5nKTogdm9pZCB7XG5cdFx0dGhpcy5fbm9kZU1hcC5zZXQoa2V5LCBlbGVtZW50KTtcblx0XHR0aGlzLmVtaXQoeyB0eXBlOiBrZXkgfSk7XG5cdH1cblxuXHRwdWJsaWMgYWRkUm9vdCgpOiB2b2lkIHtcblx0XHR0aGlzLmVtaXQoeyB0eXBlOiBOb2RlRXZlbnRUeXBlLldpZGdldCB9KTtcblx0fVxuXG5cdHB1YmxpYyBhZGRQcm9qZWN0b3IoKTogdm9pZCB7XG5cdFx0dGhpcy5lbWl0KHsgdHlwZTogTm9kZUV2ZW50VHlwZS5Qcm9qZWN0b3IgfSk7XG5cdH1cblxuXHRwdWJsaWMgY2xlYXIoKTogdm9pZCB7XG5cdFx0dGhpcy5fbm9kZU1hcC5jbGVhcigpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vZGVIYW5kbGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIE5vZGVIYW5kbGVyLnRzIiwiaW1wb3J0IFByb21pc2UgZnJvbSAnLi4vc2hpbS9Qcm9taXNlJztcbmltcG9ydCBNYXAgZnJvbSAnLi4vc2hpbS9NYXAnO1xuaW1wb3J0IFN5bWJvbCBmcm9tICcuLi9zaGltL1N5bWJvbCc7XG5pbXBvcnQgeyBFdmVudE9iamVjdCB9IGZyb20gJy4uL2NvcmUvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBFdmVudGVkIH0gZnJvbSAnLi4vY29yZS9FdmVudGVkJztcbmltcG9ydCB7XG5cdENvbnN0cnVjdG9yLFxuXHRJbmplY3RvckZhY3RvcnksXG5cdEluamVjdG9ySXRlbSxcblx0UmVnaXN0cnlMYWJlbCxcblx0V2lkZ2V0QmFzZUNvbnN0cnVjdG9yLFxuXHRXaWRnZXRCYXNlSW50ZXJmYWNlXG59IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCB0eXBlIFdpZGdldEJhc2VDb25zdHJ1Y3RvckZ1bmN0aW9uID0gKCkgPT4gUHJvbWlzZTxXaWRnZXRCYXNlQ29uc3RydWN0b3I+O1xuXG5leHBvcnQgdHlwZSBFU01EZWZhdWx0V2lkZ2V0QmFzZUZ1bmN0aW9uID0gKCkgPT4gUHJvbWlzZTxFU01EZWZhdWx0V2lkZ2V0QmFzZTxXaWRnZXRCYXNlSW50ZXJmYWNlPj47XG5cbmV4cG9ydCB0eXBlIFJlZ2lzdHJ5SXRlbSA9XG5cdHwgV2lkZ2V0QmFzZUNvbnN0cnVjdG9yXG5cdHwgUHJvbWlzZTxXaWRnZXRCYXNlQ29uc3RydWN0b3I+XG5cdHwgV2lkZ2V0QmFzZUNvbnN0cnVjdG9yRnVuY3Rpb25cblx0fCBFU01EZWZhdWx0V2lkZ2V0QmFzZUZ1bmN0aW9uO1xuXG4vKipcbiAqIFdpZGdldCBiYXNlIHN5bWJvbCB0eXBlXG4gKi9cbmV4cG9ydCBjb25zdCBXSURHRVRfQkFTRV9UWVBFID0gU3ltYm9sKCdXaWRnZXQgQmFzZScpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlZ2lzdHJ5RXZlbnRPYmplY3QgZXh0ZW5kcyBFdmVudE9iamVjdDxSZWdpc3RyeUxhYmVsPiB7XG5cdGFjdGlvbjogc3RyaW5nO1xuXHRpdGVtOiBXaWRnZXRCYXNlQ29uc3RydWN0b3IgfCBJbmplY3RvckZhY3Rvcnk7XG59XG4vKipcbiAqIFdpZGdldCBSZWdpc3RyeSBJbnRlcmZhY2VcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZWdpc3RyeUludGVyZmFjZSB7XG5cdC8qKlxuXHQgKiBEZWZpbmUgYSBXaWRnZXRSZWdpc3RyeUl0ZW0gYWdhaW5zdCBhIGxhYmVsXG5cdCAqXG5cdCAqIEBwYXJhbSBsYWJlbCBUaGUgbGFiZWwgb2YgdGhlIHdpZGdldCB0byByZWdpc3RlclxuXHQgKiBAcGFyYW0gcmVnaXN0cnlJdGVtIFRoZSByZWdpc3RyeSBpdGVtIHRvIGRlZmluZVxuXHQgKi9cblx0ZGVmaW5lKGxhYmVsOiBSZWdpc3RyeUxhYmVsLCByZWdpc3RyeUl0ZW06IFJlZ2lzdHJ5SXRlbSk6IHZvaWQ7XG5cblx0LyoqXG5cdCAqIFJldHVybiBhIFJlZ2lzdHJ5SXRlbSBmb3IgdGhlIGdpdmVuIGxhYmVsLCBudWxsIGlmIGFuIGVudHJ5IGRvZXNuJ3QgZXhpc3Rcblx0ICpcblx0ICogQHBhcmFtIHdpZGdldExhYmVsIFRoZSBsYWJlbCBvZiB0aGUgd2lkZ2V0IHRvIHJldHVyblxuXHQgKiBAcmV0dXJucyBUaGUgUmVnaXN0cnlJdGVtIGZvciB0aGUgd2lkZ2V0TGFiZWwsIGBudWxsYCBpZiBubyBlbnRyeSBleGlzdHNcblx0ICovXG5cdGdldDxUIGV4dGVuZHMgV2lkZ2V0QmFzZUludGVyZmFjZSA9IFdpZGdldEJhc2VJbnRlcmZhY2U+KGxhYmVsOiBSZWdpc3RyeUxhYmVsKTogQ29uc3RydWN0b3I8VD4gfCBudWxsO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgYm9vbGVhbiBpZiBhbiBlbnRyeSBmb3IgdGhlIGxhYmVsIGV4aXN0c1xuXHQgKlxuXHQgKiBAcGFyYW0gd2lkZ2V0TGFiZWwgVGhlIGxhYmVsIHRvIHNlYXJjaCBmb3Jcblx0ICogQHJldHVybnMgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGEgd2lkZ2V0IHJlZ2lzdHJ5IGl0ZW0gZXhpc3RzXG5cdCAqL1xuXHRoYXMobGFiZWw6IFJlZ2lzdHJ5TGFiZWwpOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBEZWZpbmUgYW4gSW5qZWN0b3IgYWdhaW5zdCBhIGxhYmVsXG5cdCAqXG5cdCAqIEBwYXJhbSBsYWJlbCBUaGUgbGFiZWwgb2YgdGhlIGluamVjdG9yIHRvIHJlZ2lzdGVyXG5cdCAqIEBwYXJhbSByZWdpc3RyeUl0ZW0gVGhlIGluamVjdG9yIGZhY3Rvcnlcblx0ICovXG5cdGRlZmluZUluamVjdG9yKGxhYmVsOiBSZWdpc3RyeUxhYmVsLCBpbmplY3RvckZhY3Rvcnk6IEluamVjdG9yRmFjdG9yeSk6IHZvaWQ7XG5cblx0LyoqXG5cdCAqIFJldHVybiBhbiBJbmplY3RvciByZWdpc3RyeSBpdGVtIGZvciB0aGUgZ2l2ZW4gbGFiZWwsIG51bGwgaWYgYW4gZW50cnkgZG9lc24ndCBleGlzdFxuXHQgKlxuXHQgKiBAcGFyYW0gbGFiZWwgVGhlIGxhYmVsIG9mIHRoZSBpbmplY3RvciB0byByZXR1cm5cblx0ICogQHJldHVybnMgVGhlIFJlZ2lzdHJ5SXRlbSBmb3IgdGhlIHdpZGdldExhYmVsLCBgbnVsbGAgaWYgbm8gZW50cnkgZXhpc3RzXG5cdCAqL1xuXHRnZXRJbmplY3RvcjxUPihsYWJlbDogUmVnaXN0cnlMYWJlbCk6IEluamVjdG9ySXRlbTxUPiB8IG51bGw7XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBib29sZWFuIGlmIGFuIGluamVjdG9yIGZvciB0aGUgbGFiZWwgZXhpc3RzXG5cdCAqXG5cdCAqIEBwYXJhbSB3aWRnZXRMYWJlbCBUaGUgbGFiZWwgdG8gc2VhcmNoIGZvclxuXHQgKiBAcmV0dXJucyBib29sZWFuIGluZGljYXRpbmcgaWYgYSBpbmplY3RvciByZWdpc3RyeSBpdGVtIGV4aXN0c1xuXHQgKi9cblx0aGFzSW5qZWN0b3IobGFiZWw6IFJlZ2lzdHJ5TGFiZWwpOiBib29sZWFuO1xufVxuXG4vKipcbiAqIENoZWNrcyBpcyB0aGUgaXRlbSBpcyBhIHN1YmNsYXNzIG9mIFdpZGdldEJhc2UgKG9yIGEgV2lkZ2V0QmFzZSlcbiAqXG4gKiBAcGFyYW0gaXRlbSB0aGUgaXRlbSB0byBjaGVja1xuICogQHJldHVybnMgdHJ1ZS9mYWxzZSBpbmRpY2F0aW5nIGlmIHRoZSBpdGVtIGlzIGEgV2lkZ2V0QmFzZUNvbnN0cnVjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1dpZGdldEJhc2VDb25zdHJ1Y3RvcjxUIGV4dGVuZHMgV2lkZ2V0QmFzZUludGVyZmFjZT4oaXRlbTogYW55KTogaXRlbSBpcyBDb25zdHJ1Y3RvcjxUPiB7XG5cdHJldHVybiBCb29sZWFuKGl0ZW0gJiYgaXRlbS5fdHlwZSA9PT0gV0lER0VUX0JBU0VfVFlQRSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRVNNRGVmYXVsdFdpZGdldEJhc2U8VD4ge1xuXHRkZWZhdWx0OiBDb25zdHJ1Y3RvcjxUPjtcblx0X19lc01vZHVsZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1dpZGdldENvbnN0cnVjdG9yRGVmYXVsdEV4cG9ydDxUPihpdGVtOiBhbnkpOiBpdGVtIGlzIEVTTURlZmF1bHRXaWRnZXRCYXNlPFQ+IHtcblx0cmV0dXJuIEJvb2xlYW4oXG5cdFx0aXRlbSAmJlxuXHRcdFx0aXRlbS5oYXNPd25Qcm9wZXJ0eSgnX19lc01vZHVsZScpICYmXG5cdFx0XHRpdGVtLmhhc093blByb3BlcnR5KCdkZWZhdWx0JykgJiZcblx0XHRcdGlzV2lkZ2V0QmFzZUNvbnN0cnVjdG9yKGl0ZW0uZGVmYXVsdClcblx0KTtcbn1cblxuLyoqXG4gKiBUaGUgUmVnaXN0cnkgaW1wbGVtZW50YXRpb25cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZ2lzdHJ5IGV4dGVuZHMgRXZlbnRlZDx7fSwgUmVnaXN0cnlMYWJlbCwgUmVnaXN0cnlFdmVudE9iamVjdD4gaW1wbGVtZW50cyBSZWdpc3RyeUludGVyZmFjZSB7XG5cdC8qKlxuXHQgKiBpbnRlcm5hbCBtYXAgb2YgbGFiZWxzIGFuZCBSZWdpc3RyeUl0ZW1cblx0ICovXG5cdHByaXZhdGUgX3dpZGdldFJlZ2lzdHJ5OiBNYXA8UmVnaXN0cnlMYWJlbCwgUmVnaXN0cnlJdGVtPiB8IHVuZGVmaW5lZDtcblxuXHRwcml2YXRlIF9pbmplY3RvclJlZ2lzdHJ5OiBNYXA8UmVnaXN0cnlMYWJlbCwgSW5qZWN0b3JJdGVtPiB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogRW1pdCBsb2FkZWQgZXZlbnQgZm9yIHJlZ2lzdHJ5IGxhYmVsXG5cdCAqL1xuXHRwcml2YXRlIGVtaXRMb2FkZWRFdmVudCh3aWRnZXRMYWJlbDogUmVnaXN0cnlMYWJlbCwgaXRlbTogV2lkZ2V0QmFzZUNvbnN0cnVjdG9yIHwgSW5qZWN0b3JJdGVtKTogdm9pZCB7XG5cdFx0dGhpcy5lbWl0KHtcblx0XHRcdHR5cGU6IHdpZGdldExhYmVsLFxuXHRcdFx0YWN0aW9uOiAnbG9hZGVkJyxcblx0XHRcdGl0ZW1cblx0XHR9KTtcblx0fVxuXG5cdHB1YmxpYyBkZWZpbmUobGFiZWw6IFJlZ2lzdHJ5TGFiZWwsIGl0ZW06IFJlZ2lzdHJ5SXRlbSk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl93aWRnZXRSZWdpc3RyeSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl93aWRnZXRSZWdpc3RyeSA9IG5ldyBNYXAoKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fd2lkZ2V0UmVnaXN0cnkuaGFzKGxhYmVsKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGB3aWRnZXQgaGFzIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkIGZvciAnJHtsYWJlbC50b1N0cmluZygpfSdgKTtcblx0XHR9XG5cblx0XHR0aGlzLl93aWRnZXRSZWdpc3RyeS5zZXQobGFiZWwsIGl0ZW0pO1xuXG5cdFx0aWYgKGl0ZW0gaW5zdGFuY2VvZiBQcm9taXNlKSB7XG5cdFx0XHRpdGVtLnRoZW4oXG5cdFx0XHRcdCh3aWRnZXRDdG9yKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5fd2lkZ2V0UmVnaXN0cnkhLnNldChsYWJlbCwgd2lkZ2V0Q3Rvcik7XG5cdFx0XHRcdFx0dGhpcy5lbWl0TG9hZGVkRXZlbnQobGFiZWwsIHdpZGdldEN0b3IpO1xuXHRcdFx0XHRcdHJldHVybiB3aWRnZXRDdG9yO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQoZXJyb3IpID0+IHtcblx0XHRcdFx0XHR0aHJvdyBlcnJvcjtcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9IGVsc2UgaWYgKGlzV2lkZ2V0QmFzZUNvbnN0cnVjdG9yKGl0ZW0pKSB7XG5cdFx0XHR0aGlzLmVtaXRMb2FkZWRFdmVudChsYWJlbCwgaXRlbSk7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIGRlZmluZUluamVjdG9yKGxhYmVsOiBSZWdpc3RyeUxhYmVsLCBpbmplY3RvckZhY3Rvcnk6IEluamVjdG9yRmFjdG9yeSk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9pbmplY3RvclJlZ2lzdHJ5ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2luamVjdG9yUmVnaXN0cnkgPSBuZXcgTWFwKCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2luamVjdG9yUmVnaXN0cnkuaGFzKGxhYmVsKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBpbmplY3RvciBoYXMgYWxyZWFkeSBiZWVuIHJlZ2lzdGVyZWQgZm9yICcke2xhYmVsLnRvU3RyaW5nKCl9J2ApO1xuXHRcdH1cblxuXHRcdGNvbnN0IGludmFsaWRhdG9yID0gbmV3IEV2ZW50ZWQoKTtcblxuXHRcdGNvbnN0IGluamVjdG9ySXRlbTogSW5qZWN0b3JJdGVtID0ge1xuXHRcdFx0aW5qZWN0b3I6IGluamVjdG9yRmFjdG9yeSgoKSA9PiBpbnZhbGlkYXRvci5lbWl0KHsgdHlwZTogJ2ludmFsaWRhdGUnIH0pKSxcblx0XHRcdGludmFsaWRhdG9yXG5cdFx0fTtcblxuXHRcdHRoaXMuX2luamVjdG9yUmVnaXN0cnkuc2V0KGxhYmVsLCBpbmplY3Rvckl0ZW0pO1xuXHRcdHRoaXMuZW1pdExvYWRlZEV2ZW50KGxhYmVsLCBpbmplY3Rvckl0ZW0pO1xuXHR9XG5cblx0cHVibGljIGdldDxUIGV4dGVuZHMgV2lkZ2V0QmFzZUludGVyZmFjZSA9IFdpZGdldEJhc2VJbnRlcmZhY2U+KGxhYmVsOiBSZWdpc3RyeUxhYmVsKTogQ29uc3RydWN0b3I8VD4gfCBudWxsIHtcblx0XHRpZiAoIXRoaXMuX3dpZGdldFJlZ2lzdHJ5IHx8ICF0aGlzLmhhcyhsYWJlbCkpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGNvbnN0IGl0ZW0gPSB0aGlzLl93aWRnZXRSZWdpc3RyeS5nZXQobGFiZWwpO1xuXG5cdFx0aWYgKGlzV2lkZ2V0QmFzZUNvbnN0cnVjdG9yPFQ+KGl0ZW0pKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cblx0XHRpZiAoaXRlbSBpbnN0YW5jZW9mIFByb21pc2UpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGNvbnN0IHByb21pc2UgPSAoPFdpZGdldEJhc2VDb25zdHJ1Y3RvckZ1bmN0aW9uPml0ZW0pKCk7XG5cdFx0dGhpcy5fd2lkZ2V0UmVnaXN0cnkuc2V0KGxhYmVsLCBwcm9taXNlKTtcblxuXHRcdHByb21pc2UudGhlbihcblx0XHRcdCh3aWRnZXRDdG9yKSA9PiB7XG5cdFx0XHRcdGlmIChpc1dpZGdldENvbnN0cnVjdG9yRGVmYXVsdEV4cG9ydDxUPih3aWRnZXRDdG9yKSkge1xuXHRcdFx0XHRcdHdpZGdldEN0b3IgPSB3aWRnZXRDdG9yLmRlZmF1bHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl93aWRnZXRSZWdpc3RyeSEuc2V0KGxhYmVsLCB3aWRnZXRDdG9yKTtcblx0XHRcdFx0dGhpcy5lbWl0TG9hZGVkRXZlbnQobGFiZWwsIHdpZGdldEN0b3IpO1xuXHRcdFx0XHRyZXR1cm4gd2lkZ2V0Q3Rvcjtcblx0XHRcdH0sXG5cdFx0XHQoZXJyb3IpID0+IHtcblx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHR9XG5cdFx0KTtcblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0cHVibGljIGdldEluamVjdG9yPFQ+KGxhYmVsOiBSZWdpc3RyeUxhYmVsKTogSW5qZWN0b3JJdGVtPFQ+IHwgbnVsbCB7XG5cdFx0aWYgKCF0aGlzLl9pbmplY3RvclJlZ2lzdHJ5IHx8ICF0aGlzLmhhc0luamVjdG9yKGxhYmVsKSkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuX2luamVjdG9yUmVnaXN0cnkuZ2V0KGxhYmVsKSE7XG5cdH1cblxuXHRwdWJsaWMgaGFzKGxhYmVsOiBSZWdpc3RyeUxhYmVsKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIEJvb2xlYW4odGhpcy5fd2lkZ2V0UmVnaXN0cnkgJiYgdGhpcy5fd2lkZ2V0UmVnaXN0cnkuaGFzKGxhYmVsKSk7XG5cdH1cblxuXHRwdWJsaWMgaGFzSW5qZWN0b3IobGFiZWw6IFJlZ2lzdHJ5TGFiZWwpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gQm9vbGVhbih0aGlzLl9pbmplY3RvclJlZ2lzdHJ5ICYmIHRoaXMuX2luamVjdG9yUmVnaXN0cnkuaGFzKGxhYmVsKSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVnaXN0cnk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gUmVnaXN0cnkudHMiLCJpbXBvcnQgeyBNYXAgfSBmcm9tICcuLi9zaGltL01hcCc7XG5pbXBvcnQgeyBFdmVudGVkIH0gZnJvbSAnLi4vY29yZS9FdmVudGVkJztcbmltcG9ydCB7IEV2ZW50T2JqZWN0IH0gZnJvbSAnLi4vY29yZS9pbnRlcmZhY2VzJztcbmltcG9ydCB7IENvbnN0cnVjdG9yLCBJbmplY3RvckZhY3RvcnksIEluamVjdG9ySXRlbSwgUmVnaXN0cnlMYWJlbCwgV2lkZ2V0QmFzZUludGVyZmFjZSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBSZWdpc3RyeSwgUmVnaXN0cnlFdmVudE9iamVjdCwgUmVnaXN0cnlJdGVtIH0gZnJvbSAnLi9SZWdpc3RyeSc7XG5cbmV4cG9ydCB0eXBlIFJlZ2lzdHJ5SGFuZGxlckV2ZW50TWFwID0ge1xuXHRpbnZhbGlkYXRlOiBFdmVudE9iamVjdDwnaW52YWxpZGF0ZSc+O1xufTtcblxuZXhwb3J0IGNsYXNzIFJlZ2lzdHJ5SGFuZGxlciBleHRlbmRzIEV2ZW50ZWQ8UmVnaXN0cnlIYW5kbGVyRXZlbnRNYXA+IHtcblx0cHJpdmF0ZSBfcmVnaXN0cnkgPSBuZXcgUmVnaXN0cnkoKTtcblx0cHJpdmF0ZSBfcmVnaXN0cnlXaWRnZXRMYWJlbE1hcDogTWFwPFJlZ2lzdHJ5LCBSZWdpc3RyeUxhYmVsW10+ID0gbmV3IE1hcCgpO1xuXHRwcml2YXRlIF9yZWdpc3RyeUluamVjdG9yTGFiZWxNYXA6IE1hcDxSZWdpc3RyeSwgUmVnaXN0cnlMYWJlbFtdPiA9IG5ldyBNYXAoKTtcblx0cHJvdGVjdGVkIGJhc2VSZWdpc3RyeT86IFJlZ2lzdHJ5O1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5vd24odGhpcy5fcmVnaXN0cnkpO1xuXHRcdGNvbnN0IGRlc3Ryb3kgPSAoKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5iYXNlUmVnaXN0cnkpIHtcblx0XHRcdFx0dGhpcy5fcmVnaXN0cnlXaWRnZXRMYWJlbE1hcC5kZWxldGUodGhpcy5iYXNlUmVnaXN0cnkpO1xuXHRcdFx0XHR0aGlzLl9yZWdpc3RyeUluamVjdG9yTGFiZWxNYXAuZGVsZXRlKHRoaXMuYmFzZVJlZ2lzdHJ5KTtcblx0XHRcdFx0dGhpcy5iYXNlUmVnaXN0cnkgPSB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHR0aGlzLm93bih7IGRlc3Ryb3kgfSk7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGJhc2UoYmFzZVJlZ2lzdHJ5OiBSZWdpc3RyeSkge1xuXHRcdGlmICh0aGlzLmJhc2VSZWdpc3RyeSkge1xuXHRcdFx0dGhpcy5fcmVnaXN0cnlXaWRnZXRMYWJlbE1hcC5kZWxldGUodGhpcy5iYXNlUmVnaXN0cnkpO1xuXHRcdFx0dGhpcy5fcmVnaXN0cnlJbmplY3RvckxhYmVsTWFwLmRlbGV0ZSh0aGlzLmJhc2VSZWdpc3RyeSk7XG5cdFx0fVxuXHRcdHRoaXMuYmFzZVJlZ2lzdHJ5ID0gYmFzZVJlZ2lzdHJ5O1xuXHR9XG5cblx0cHVibGljIGRlZmluZShsYWJlbDogUmVnaXN0cnlMYWJlbCwgd2lkZ2V0OiBSZWdpc3RyeUl0ZW0pOiB2b2lkIHtcblx0XHR0aGlzLl9yZWdpc3RyeS5kZWZpbmUobGFiZWwsIHdpZGdldCk7XG5cdH1cblxuXHRwdWJsaWMgZGVmaW5lSW5qZWN0b3IobGFiZWw6IFJlZ2lzdHJ5TGFiZWwsIGluamVjdG9yOiBJbmplY3RvckZhY3RvcnkpOiB2b2lkIHtcblx0XHR0aGlzLl9yZWdpc3RyeS5kZWZpbmVJbmplY3RvcihsYWJlbCwgaW5qZWN0b3IpO1xuXHR9XG5cblx0cHVibGljIGhhcyhsYWJlbDogUmVnaXN0cnlMYWJlbCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9yZWdpc3RyeS5oYXMobGFiZWwpIHx8IEJvb2xlYW4odGhpcy5iYXNlUmVnaXN0cnkgJiYgdGhpcy5iYXNlUmVnaXN0cnkuaGFzKGxhYmVsKSk7XG5cdH1cblxuXHRwdWJsaWMgaGFzSW5qZWN0b3IobGFiZWw6IFJlZ2lzdHJ5TGFiZWwpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fcmVnaXN0cnkuaGFzSW5qZWN0b3IobGFiZWwpIHx8IEJvb2xlYW4odGhpcy5iYXNlUmVnaXN0cnkgJiYgdGhpcy5iYXNlUmVnaXN0cnkuaGFzSW5qZWN0b3IobGFiZWwpKTtcblx0fVxuXG5cdHB1YmxpYyBnZXQ8VCBleHRlbmRzIFdpZGdldEJhc2VJbnRlcmZhY2UgPSBXaWRnZXRCYXNlSW50ZXJmYWNlPihcblx0XHRsYWJlbDogUmVnaXN0cnlMYWJlbCxcblx0XHRnbG9iYWxQcmVjZWRlbmNlOiBib29sZWFuID0gZmFsc2Vcblx0KTogQ29uc3RydWN0b3I8VD4gfCBudWxsIHtcblx0XHRyZXR1cm4gdGhpcy5fZ2V0KGxhYmVsLCBnbG9iYWxQcmVjZWRlbmNlLCAnZ2V0JywgdGhpcy5fcmVnaXN0cnlXaWRnZXRMYWJlbE1hcCk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0SW5qZWN0b3I8VD4obGFiZWw6IFJlZ2lzdHJ5TGFiZWwsIGdsb2JhbFByZWNlZGVuY2U6IGJvb2xlYW4gPSBmYWxzZSk6IEluamVjdG9ySXRlbTxUPiB8IG51bGwge1xuXHRcdHJldHVybiB0aGlzLl9nZXQobGFiZWwsIGdsb2JhbFByZWNlZGVuY2UsICdnZXRJbmplY3RvcicsIHRoaXMuX3JlZ2lzdHJ5SW5qZWN0b3JMYWJlbE1hcCk7XG5cdH1cblxuXHRwcml2YXRlIF9nZXQoXG5cdFx0bGFiZWw6IFJlZ2lzdHJ5TGFiZWwsXG5cdFx0Z2xvYmFsUHJlY2VkZW5jZTogYm9vbGVhbixcblx0XHRnZXRGdW5jdGlvbk5hbWU6ICdnZXRJbmplY3RvcicgfCAnZ2V0Jyxcblx0XHRsYWJlbE1hcDogTWFwPFJlZ2lzdHJ5LCBSZWdpc3RyeUxhYmVsW10+XG5cdCk6IGFueSB7XG5cdFx0Y29uc3QgcmVnaXN0cmllcyA9IGdsb2JhbFByZWNlZGVuY2UgPyBbdGhpcy5iYXNlUmVnaXN0cnksIHRoaXMuX3JlZ2lzdHJ5XSA6IFt0aGlzLl9yZWdpc3RyeSwgdGhpcy5iYXNlUmVnaXN0cnldO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVnaXN0cmllcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgcmVnaXN0cnk6IGFueSA9IHJlZ2lzdHJpZXNbaV07XG5cdFx0XHRpZiAoIXJlZ2lzdHJ5KSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgaXRlbSA9IHJlZ2lzdHJ5W2dldEZ1bmN0aW9uTmFtZV0obGFiZWwpO1xuXHRcdFx0Y29uc3QgcmVnaXN0ZXJlZExhYmVscyA9IGxhYmVsTWFwLmdldChyZWdpc3RyeSkgfHwgW107XG5cdFx0XHRpZiAoaXRlbSkge1xuXHRcdFx0XHRyZXR1cm4gaXRlbTtcblx0XHRcdH0gZWxzZSBpZiAocmVnaXN0ZXJlZExhYmVscy5pbmRleE9mKGxhYmVsKSA9PT0gLTEpIHtcblx0XHRcdFx0Y29uc3QgaGFuZGxlID0gcmVnaXN0cnkub24obGFiZWwsIChldmVudDogUmVnaXN0cnlFdmVudE9iamVjdCkgPT4ge1xuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdGV2ZW50LmFjdGlvbiA9PT0gJ2xvYWRlZCcgJiZcblx0XHRcdFx0XHRcdCh0aGlzIGFzIGFueSlbZ2V0RnVuY3Rpb25OYW1lXShsYWJlbCwgZ2xvYmFsUHJlY2VkZW5jZSkgPT09IGV2ZW50Lml0ZW1cblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZW1pdCh7IHR5cGU6ICdpbnZhbGlkYXRlJyB9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR0aGlzLm93bihoYW5kbGUpO1xuXHRcdFx0XHRsYWJlbE1hcC5zZXQocmVnaXN0cnksIFsuLi5yZWdpc3RlcmVkTGFiZWxzLCBsYWJlbF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZWdpc3RyeUhhbmRsZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gUmVnaXN0cnlIYW5kbGVyLnRzIiwiaW1wb3J0IE1hcCBmcm9tICcuLi9zaGltL01hcCc7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuLi9zaGltL1dlYWtNYXAnO1xuaW1wb3J0IFN5bWJvbCBmcm9tICcuLi9zaGltL1N5bWJvbCc7XG5pbXBvcnQgeyBIYW5kbGUgfSBmcm9tICcuLi9jb3JlL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgdiB9IGZyb20gJy4vZCc7XG5pbXBvcnQgeyBhdXRvIH0gZnJvbSAnLi9kaWZmJztcbmltcG9ydCB7XG5cdEFmdGVyUmVuZGVyLFxuXHRCZWZvcmVQcm9wZXJ0aWVzLFxuXHRCZWZvcmVSZW5kZXIsXG5cdENvcmVQcm9wZXJ0aWVzLFxuXHREaWZmUHJvcGVydHlSZWFjdGlvbixcblx0RE5vZGUsXG5cdFJlbmRlcixcblx0V2lkZ2V0TWV0YUJhc2UsXG5cdFdpZGdldE1ldGFDb25zdHJ1Y3Rvcixcblx0V2lkZ2V0QmFzZUludGVyZmFjZSxcblx0V2lkZ2V0UHJvcGVydGllc1xufSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IFJlZ2lzdHJ5SGFuZGxlciBmcm9tICcuL1JlZ2lzdHJ5SGFuZGxlcic7XG5pbXBvcnQgTm9kZUhhbmRsZXIgZnJvbSAnLi9Ob2RlSGFuZGxlcic7XG5pbXBvcnQgeyB3aWRnZXRJbnN0YW5jZU1hcCB9IGZyb20gJy4vdmRvbSc7XG5pbXBvcnQgeyBpc1dpZGdldEJhc2VDb25zdHJ1Y3RvciwgV0lER0VUX0JBU0VfVFlQRSB9IGZyb20gJy4vUmVnaXN0cnknO1xuXG5pbnRlcmZhY2UgUmVhY3Rpb25GdW5jdGlvbkNvbmZpZyB7XG5cdHByb3BlcnR5TmFtZTogc3RyaW5nO1xuXHRyZWFjdGlvbjogRGlmZlByb3BlcnR5UmVhY3Rpb247XG59XG5cbmV4cG9ydCB0eXBlIEJvdW5kRnVuY3Rpb25EYXRhID0geyBib3VuZEZ1bmM6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55OyBzY29wZTogYW55IH07XG5cbmNvbnN0IGRlY29yYXRvck1hcCA9IG5ldyBNYXA8RnVuY3Rpb24sIE1hcDxzdHJpbmcsIGFueVtdPj4oKTtcbmNvbnN0IGJvdW5kQXV0byA9IGF1dG8uYmluZChudWxsKTtcblxuZXhwb3J0IGNvbnN0IG5vQmluZCA9IFN5bWJvbC5mb3IoJ2Rvam9Ob0JpbmQnKTtcblxuLyoqXG4gKiBNYWluIHdpZGdldCBiYXNlIGZvciBhbGwgd2lkZ2V0cyB0byBleHRlbmRcbiAqL1xuZXhwb3J0IGNsYXNzIFdpZGdldEJhc2U8UCA9IFdpZGdldFByb3BlcnRpZXMsIEMgZXh0ZW5kcyBETm9kZSA9IEROb2RlPiBpbXBsZW1lbnRzIFdpZGdldEJhc2VJbnRlcmZhY2U8UCwgQz4ge1xuXHQvKipcblx0ICogc3RhdGljIGlkZW50aWZpZXJcblx0ICovXG5cdHN0YXRpYyBfdHlwZTogc3ltYm9sID0gV0lER0VUX0JBU0VfVFlQRTtcblxuXHQvKipcblx0ICogY2hpbGRyZW4gYXJyYXlcblx0ICovXG5cdHByaXZhdGUgX2NoaWxkcmVuOiAoQyB8IG51bGwpW107XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyBpZiBpdCBpcyB0aGUgaW5pdGlhbCBzZXQgcHJvcGVydGllcyBjeWNsZVxuXHQgKi9cblx0cHJpdmF0ZSBfaW5pdGlhbFByb3BlcnRpZXMgPSB0cnVlO1xuXG5cdC8qKlxuXHQgKiBpbnRlcm5hbCB3aWRnZXQgcHJvcGVydGllc1xuXHQgKi9cblx0cHJpdmF0ZSBfcHJvcGVydGllczogUCAmIFdpZGdldFByb3BlcnRpZXMgJiB7IFtpbmRleDogc3RyaW5nXTogYW55IH07XG5cblx0LyoqXG5cdCAqIEFycmF5IG9mIHByb3BlcnR5IGtleXMgY29uc2lkZXJlZCBjaGFuZ2VkIGZyb20gdGhlIHByZXZpb3VzIHNldCBwcm9wZXJ0aWVzXG5cdCAqL1xuXHRwcml2YXRlIF9jaGFuZ2VkUHJvcGVydHlLZXlzOiBzdHJpbmdbXSA9IFtdO1xuXG5cdC8qKlxuXHQgKiBtYXAgb2YgZGVjb3JhdG9ycyB0aGF0IGFyZSBhcHBsaWVkIHRvIHRoaXMgd2lkZ2V0XG5cdCAqL1xuXHRwcml2YXRlIF9kZWNvcmF0b3JDYWNoZTogTWFwPHN0cmluZywgYW55W10+O1xuXG5cdHByaXZhdGUgX3JlZ2lzdHJ5OiBSZWdpc3RyeUhhbmRsZXIgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIE1hcCBvZiBmdW5jdGlvbnMgcHJvcGVydGllcyBmb3IgdGhlIGJvdW5kIGZ1bmN0aW9uXG5cdCAqL1xuXHRwcml2YXRlIF9iaW5kRnVuY3Rpb25Qcm9wZXJ0eU1hcDogV2Vha01hcDwoLi4uYXJnczogYW55W10pID0+IGFueSwgQm91bmRGdW5jdGlvbkRhdGE+IHwgdW5kZWZpbmVkO1xuXG5cdHByaXZhdGUgX21ldGFNYXA6IE1hcDxXaWRnZXRNZXRhQ29uc3RydWN0b3I8YW55PiwgV2lkZ2V0TWV0YUJhc2U+IHwgdW5kZWZpbmVkO1xuXG5cdHByaXZhdGUgX2JvdW5kUmVuZGVyRnVuYzogUmVuZGVyO1xuXG5cdHByaXZhdGUgX2JvdW5kSW52YWxpZGF0ZTogKCkgPT4gdm9pZDtcblxuXHRwcml2YXRlIF9ub2RlSGFuZGxlcjogTm9kZUhhbmRsZXIgPSBuZXcgTm9kZUhhbmRsZXIoKTtcblxuXHRwcml2YXRlIF9oYW5kbGVzOiBIYW5kbGVbXSA9IFtdO1xuXG5cdC8qKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICovXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX2NoaWxkcmVuID0gW107XG5cdFx0dGhpcy5fZGVjb3JhdG9yQ2FjaGUgPSBuZXcgTWFwPHN0cmluZywgYW55W10+KCk7XG5cdFx0dGhpcy5fcHJvcGVydGllcyA9IDxQPnt9O1xuXHRcdHRoaXMuX2JvdW5kUmVuZGVyRnVuYyA9IHRoaXMucmVuZGVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5fYm91bmRJbnZhbGlkYXRlID0gdGhpcy5pbnZhbGlkYXRlLmJpbmQodGhpcyk7XG5cblx0XHR3aWRnZXRJbnN0YW5jZU1hcC5zZXQodGhpcywge1xuXHRcdFx0ZGlydHk6IHRydWUsXG5cdFx0XHRvbkF0dGFjaDogKCk6IHZvaWQgPT4ge1xuXHRcdFx0XHR0aGlzLm9uQXR0YWNoKCk7XG5cdFx0XHR9LFxuXHRcdFx0b25EZXRhY2g6ICgpOiB2b2lkID0+IHtcblx0XHRcdFx0dGhpcy5vbkRldGFjaCgpO1xuXHRcdFx0XHR0aGlzLmRlc3Ryb3koKTtcblx0XHRcdH0sXG5cdFx0XHRub2RlSGFuZGxlcjogdGhpcy5fbm9kZUhhbmRsZXIsXG5cdFx0XHRyZWdpc3RyeTogKCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5yZWdpc3RyeTtcblx0XHRcdH0sXG5cdFx0XHRjb3JlUHJvcGVydGllczoge30gYXMgQ29yZVByb3BlcnRpZXMsXG5cdFx0XHRyZW5kZXJpbmc6IGZhbHNlLFxuXHRcdFx0aW5wdXRQcm9wZXJ0aWVzOiB7fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5fcnVuQWZ0ZXJDb25zdHJ1Y3RvcnMoKTtcblx0fVxuXG5cdHByb3RlY3RlZCBtZXRhPFQgZXh0ZW5kcyBXaWRnZXRNZXRhQmFzZT4oTWV0YVR5cGU6IFdpZGdldE1ldGFDb25zdHJ1Y3RvcjxUPik6IFQge1xuXHRcdGlmICh0aGlzLl9tZXRhTWFwID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX21ldGFNYXAgPSBuZXcgTWFwPFdpZGdldE1ldGFDb25zdHJ1Y3Rvcjxhbnk+LCBXaWRnZXRNZXRhQmFzZT4oKTtcblx0XHR9XG5cdFx0bGV0IGNhY2hlZCA9IHRoaXMuX21ldGFNYXAuZ2V0KE1ldGFUeXBlKTtcblx0XHRpZiAoIWNhY2hlZCkge1xuXHRcdFx0Y2FjaGVkID0gbmV3IE1ldGFUeXBlKHtcblx0XHRcdFx0aW52YWxpZGF0ZTogdGhpcy5fYm91bmRJbnZhbGlkYXRlLFxuXHRcdFx0XHRub2RlSGFuZGxlcjogdGhpcy5fbm9kZUhhbmRsZXIsXG5cdFx0XHRcdGJpbmQ6IHRoaXNcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5vd24oY2FjaGVkKTtcblx0XHRcdHRoaXMuX21ldGFNYXAuc2V0KE1ldGFUeXBlLCBjYWNoZWQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBjYWNoZWQgYXMgVDtcblx0fVxuXG5cdHByb3RlY3RlZCBvbkF0dGFjaCgpOiB2b2lkIHtcblx0XHQvLyBEbyBub3RoaW5nIGJ5IGRlZmF1bHQuXG5cdH1cblxuXHRwcm90ZWN0ZWQgb25EZXRhY2goKTogdm9pZCB7XG5cdFx0Ly8gRG8gbm90aGluZyBieSBkZWZhdWx0LlxuXHR9XG5cblx0cHVibGljIGdldCBwcm9wZXJ0aWVzKCk6IFJlYWRvbmx5PFA+ICYgUmVhZG9ubHk8V2lkZ2V0UHJvcGVydGllcz4ge1xuXHRcdHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzO1xuXHR9XG5cblx0cHVibGljIGdldCBjaGFuZ2VkUHJvcGVydHlLZXlzKCk6IHN0cmluZ1tdIHtcblx0XHRyZXR1cm4gWy4uLnRoaXMuX2NoYW5nZWRQcm9wZXJ0eUtleXNdO1xuXHR9XG5cblx0cHVibGljIF9fc2V0Q29yZVByb3BlcnRpZXNfXyhjb3JlUHJvcGVydGllczogQ29yZVByb3BlcnRpZXMpOiB2b2lkIHtcblx0XHRjb25zdCB7IGJhc2VSZWdpc3RyeSB9ID0gY29yZVByb3BlcnRpZXM7XG5cdFx0Y29uc3QgaW5zdGFuY2VEYXRhID0gd2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KHRoaXMpITtcblxuXHRcdGlmIChpbnN0YW5jZURhdGEuY29yZVByb3BlcnRpZXMuYmFzZVJlZ2lzdHJ5ICE9PSBiYXNlUmVnaXN0cnkpIHtcblx0XHRcdGlmICh0aGlzLl9yZWdpc3RyeSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHRoaXMuX3JlZ2lzdHJ5ID0gbmV3IFJlZ2lzdHJ5SGFuZGxlcigpO1xuXHRcdFx0XHR0aGlzLm93bih0aGlzLl9yZWdpc3RyeSk7XG5cdFx0XHRcdHRoaXMub3duKHRoaXMuX3JlZ2lzdHJ5Lm9uKCdpbnZhbGlkYXRlJywgdGhpcy5fYm91bmRJbnZhbGlkYXRlKSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9yZWdpc3RyeS5iYXNlID0gYmFzZVJlZ2lzdHJ5O1xuXHRcdFx0dGhpcy5pbnZhbGlkYXRlKCk7XG5cdFx0fVxuXHRcdGluc3RhbmNlRGF0YS5jb3JlUHJvcGVydGllcyA9IGNvcmVQcm9wZXJ0aWVzO1xuXHR9XG5cblx0cHVibGljIF9fc2V0UHJvcGVydGllc19fKG9yaWdpbmFsUHJvcGVydGllczogdGhpc1sncHJvcGVydGllcyddKTogdm9pZCB7XG5cdFx0Y29uc3QgaW5zdGFuY2VEYXRhID0gd2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KHRoaXMpITtcblx0XHRpbnN0YW5jZURhdGEuaW5wdXRQcm9wZXJ0aWVzID0gb3JpZ2luYWxQcm9wZXJ0aWVzO1xuXHRcdGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLl9ydW5CZWZvcmVQcm9wZXJ0aWVzKG9yaWdpbmFsUHJvcGVydGllcyk7XG5cdFx0Y29uc3QgcmVnaXN0ZXJlZERpZmZQcm9wZXJ0eU5hbWVzID0gdGhpcy5nZXREZWNvcmF0b3IoJ3JlZ2lzdGVyZWREaWZmUHJvcGVydHknKTtcblx0XHRjb25zdCBjaGFuZ2VkUHJvcGVydHlLZXlzOiBzdHJpbmdbXSA9IFtdO1xuXHRcdGNvbnN0IHByb3BlcnR5TmFtZXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKTtcblxuXHRcdGlmICh0aGlzLl9pbml0aWFsUHJvcGVydGllcyA9PT0gZmFsc2UgfHwgcmVnaXN0ZXJlZERpZmZQcm9wZXJ0eU5hbWVzLmxlbmd0aCAhPT0gMCkge1xuXHRcdFx0Y29uc3QgYWxsUHJvcGVydGllcyA9IFsuLi5wcm9wZXJ0eU5hbWVzLCAuLi5PYmplY3Qua2V5cyh0aGlzLl9wcm9wZXJ0aWVzKV07XG5cdFx0XHRjb25zdCBjaGVja2VkUHJvcGVydGllczogKHN0cmluZyB8IG51bWJlcilbXSA9IFtdO1xuXHRcdFx0Y29uc3QgZGlmZlByb3BlcnR5UmVzdWx0czogYW55ID0ge307XG5cdFx0XHRsZXQgcnVuUmVhY3Rpb25zID0gZmFsc2U7XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYWxsUHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb25zdCBwcm9wZXJ0eU5hbWUgPSBhbGxQcm9wZXJ0aWVzW2ldO1xuXHRcdFx0XHRpZiAoY2hlY2tlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wZXJ0eU5hbWUpICE9PSAtMSkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNoZWNrZWRQcm9wZXJ0aWVzLnB1c2gocHJvcGVydHlOYW1lKTtcblx0XHRcdFx0Y29uc3QgcHJldmlvdXNQcm9wZXJ0eSA9IHRoaXMuX3Byb3BlcnRpZXNbcHJvcGVydHlOYW1lXTtcblx0XHRcdFx0Y29uc3QgbmV3UHJvcGVydHkgPSB0aGlzLl9iaW5kRnVuY3Rpb25Qcm9wZXJ0eShcblx0XHRcdFx0XHRwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0sXG5cdFx0XHRcdFx0aW5zdGFuY2VEYXRhLmNvcmVQcm9wZXJ0aWVzLmJpbmRcblx0XHRcdFx0KTtcblx0XHRcdFx0aWYgKHJlZ2lzdGVyZWREaWZmUHJvcGVydHlOYW1lcy5pbmRleE9mKHByb3BlcnR5TmFtZSkgIT09IC0xKSB7XG5cdFx0XHRcdFx0cnVuUmVhY3Rpb25zID0gdHJ1ZTtcblx0XHRcdFx0XHRjb25zdCBkaWZmRnVuY3Rpb25zID0gdGhpcy5nZXREZWNvcmF0b3IoYGRpZmZQcm9wZXJ0eToke3Byb3BlcnR5TmFtZX1gKTtcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRpZmZGdW5jdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGNvbnN0IHJlc3VsdCA9IGRpZmZGdW5jdGlvbnNbaV0ocHJldmlvdXNQcm9wZXJ0eSwgbmV3UHJvcGVydHkpO1xuXHRcdFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFuZ2VkICYmIGNoYW5nZWRQcm9wZXJ0eUtleXMuaW5kZXhPZihwcm9wZXJ0eU5hbWUpID09PSAtMSkge1xuXHRcdFx0XHRcdFx0XHRjaGFuZ2VkUHJvcGVydHlLZXlzLnB1c2gocHJvcGVydHlOYW1lKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChwcm9wZXJ0eU5hbWUgaW4gcHJvcGVydGllcykge1xuXHRcdFx0XHRcdFx0XHRkaWZmUHJvcGVydHlSZXN1bHRzW3Byb3BlcnR5TmFtZV0gPSByZXN1bHQudmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnN0IHJlc3VsdCA9IGJvdW5kQXV0byhwcmV2aW91c1Byb3BlcnR5LCBuZXdQcm9wZXJ0eSk7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFuZ2VkICYmIGNoYW5nZWRQcm9wZXJ0eUtleXMuaW5kZXhPZihwcm9wZXJ0eU5hbWUpID09PSAtMSkge1xuXHRcdFx0XHRcdFx0Y2hhbmdlZFByb3BlcnR5S2V5cy5wdXNoKHByb3BlcnR5TmFtZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChwcm9wZXJ0eU5hbWUgaW4gcHJvcGVydGllcykge1xuXHRcdFx0XHRcdFx0ZGlmZlByb3BlcnR5UmVzdWx0c1twcm9wZXJ0eU5hbWVdID0gcmVzdWx0LnZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAocnVuUmVhY3Rpb25zKSB7XG5cdFx0XHRcdGNvbnN0IHJlYWN0aW9uRnVuY3Rpb25zOiBSZWFjdGlvbkZ1bmN0aW9uQ29uZmlnW10gPSB0aGlzLmdldERlY29yYXRvcignZGlmZlJlYWN0aW9uJyk7XG5cdFx0XHRcdGNvbnN0IGV4ZWN1dGVkUmVhY3Rpb25zOiBGdW5jdGlvbltdID0gW107XG5cdFx0XHRcdHJlYWN0aW9uRnVuY3Rpb25zLmZvckVhY2goKHsgcmVhY3Rpb24sIHByb3BlcnR5TmFtZSB9KSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgcHJvcGVydHlDaGFuZ2VkID0gY2hhbmdlZFByb3BlcnR5S2V5cy5pbmRleE9mKHByb3BlcnR5TmFtZSkgIT09IC0xO1xuXHRcdFx0XHRcdGNvbnN0IHJlYWN0aW9uUnVuID0gZXhlY3V0ZWRSZWFjdGlvbnMuaW5kZXhPZihyZWFjdGlvbikgIT09IC0xO1xuXHRcdFx0XHRcdGlmIChwcm9wZXJ0eUNoYW5nZWQgJiYgIXJlYWN0aW9uUnVuKSB7XG5cdFx0XHRcdFx0XHRyZWFjdGlvbi5jYWxsKHRoaXMsIHRoaXMuX3Byb3BlcnRpZXMsIGRpZmZQcm9wZXJ0eVJlc3VsdHMpO1xuXHRcdFx0XHRcdFx0ZXhlY3V0ZWRSZWFjdGlvbnMucHVzaChyZWFjdGlvbik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX3Byb3BlcnRpZXMgPSBkaWZmUHJvcGVydHlSZXN1bHRzO1xuXHRcdFx0dGhpcy5fY2hhbmdlZFByb3BlcnR5S2V5cyA9IGNoYW5nZWRQcm9wZXJ0eUtleXM7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2luaXRpYWxQcm9wZXJ0aWVzID0gZmFsc2U7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnR5TmFtZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y29uc3QgcHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lc1tpXTtcblx0XHRcdFx0aWYgKHR5cGVvZiBwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0gPSB0aGlzLl9iaW5kRnVuY3Rpb25Qcm9wZXJ0eShcblx0XHRcdFx0XHRcdHByb3BlcnRpZXNbcHJvcGVydHlOYW1lXSxcblx0XHRcdFx0XHRcdGluc3RhbmNlRGF0YS5jb3JlUHJvcGVydGllcy5iaW5kXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjaGFuZ2VkUHJvcGVydHlLZXlzLnB1c2gocHJvcGVydHlOYW1lKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5fY2hhbmdlZFByb3BlcnR5S2V5cyA9IGNoYW5nZWRQcm9wZXJ0eUtleXM7XG5cdFx0XHR0aGlzLl9wcm9wZXJ0aWVzID0geyAuLi5wcm9wZXJ0aWVzIH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2NoYW5nZWRQcm9wZXJ0eUtleXMubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhpcy5pbnZhbGlkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIGdldCBjaGlsZHJlbigpOiAoQyB8IG51bGwpW10ge1xuXHRcdHJldHVybiB0aGlzLl9jaGlsZHJlbjtcblx0fVxuXG5cdHB1YmxpYyBfX3NldENoaWxkcmVuX18oY2hpbGRyZW46IChDIHwgbnVsbClbXSk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9jaGlsZHJlbi5sZW5ndGggPiAwIHx8IGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMuX2NoaWxkcmVuID0gY2hpbGRyZW47XG5cdFx0XHR0aGlzLmludmFsaWRhdGUoKTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgX19yZW5kZXJfXygpOiBETm9kZSB8IEROb2RlW10ge1xuXHRcdGNvbnN0IGluc3RhbmNlRGF0YSA9IHdpZGdldEluc3RhbmNlTWFwLmdldCh0aGlzKSE7XG5cdFx0aW5zdGFuY2VEYXRhLmRpcnR5ID0gZmFsc2U7XG5cdFx0Y29uc3QgcmVuZGVyID0gdGhpcy5fcnVuQmVmb3JlUmVuZGVycygpO1xuXHRcdGxldCBkTm9kZSA9IHJlbmRlcigpO1xuXHRcdGROb2RlID0gdGhpcy5ydW5BZnRlclJlbmRlcnMoZE5vZGUpO1xuXHRcdHRoaXMuX25vZGVIYW5kbGVyLmNsZWFyKCk7XG5cdFx0cmV0dXJuIGROb2RlO1xuXHR9XG5cblx0cHVibGljIGludmFsaWRhdGUoKTogdm9pZCB7XG5cdFx0Y29uc3QgaW5zdGFuY2VEYXRhID0gd2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KHRoaXMpITtcblx0XHRpZiAoaW5zdGFuY2VEYXRhLmludmFsaWRhdGUpIHtcblx0XHRcdGluc3RhbmNlRGF0YS5pbnZhbGlkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlcigpOiBETm9kZSB8IEROb2RlW10ge1xuXHRcdHJldHVybiB2KCdkaXYnLCB7fSwgdGhpcy5jaGlsZHJlbik7XG5cdH1cblxuXHQvKipcblx0ICogRnVuY3Rpb24gdG8gYWRkIGRlY29yYXRvcnMgdG8gV2lkZ2V0QmFzZVxuXHQgKlxuXHQgKiBAcGFyYW0gZGVjb3JhdG9yS2V5IFRoZSBrZXkgb2YgdGhlIGRlY29yYXRvclxuXHQgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIG9mIHRoZSBkZWNvcmF0b3Jcblx0ICovXG5cdHByb3RlY3RlZCBhZGREZWNvcmF0b3IoZGVjb3JhdG9yS2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcblx0XHR2YWx1ZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xuXHRcdGlmICh0aGlzLmhhc093blByb3BlcnR5KCdjb25zdHJ1Y3RvcicpKSB7XG5cdFx0XHRsZXQgZGVjb3JhdG9yTGlzdCA9IGRlY29yYXRvck1hcC5nZXQodGhpcy5jb25zdHJ1Y3Rvcik7XG5cdFx0XHRpZiAoIWRlY29yYXRvckxpc3QpIHtcblx0XHRcdFx0ZGVjb3JhdG9yTGlzdCA9IG5ldyBNYXA8c3RyaW5nLCBhbnlbXT4oKTtcblx0XHRcdFx0ZGVjb3JhdG9yTWFwLnNldCh0aGlzLmNvbnN0cnVjdG9yLCBkZWNvcmF0b3JMaXN0KTtcblx0XHRcdH1cblxuXHRcdFx0bGV0IHNwZWNpZmljRGVjb3JhdG9yTGlzdCA9IGRlY29yYXRvckxpc3QuZ2V0KGRlY29yYXRvcktleSk7XG5cdFx0XHRpZiAoIXNwZWNpZmljRGVjb3JhdG9yTGlzdCkge1xuXHRcdFx0XHRzcGVjaWZpY0RlY29yYXRvckxpc3QgPSBbXTtcblx0XHRcdFx0ZGVjb3JhdG9yTGlzdC5zZXQoZGVjb3JhdG9yS2V5LCBzcGVjaWZpY0RlY29yYXRvckxpc3QpO1xuXHRcdFx0fVxuXHRcdFx0c3BlY2lmaWNEZWNvcmF0b3JMaXN0LnB1c2goLi4udmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBkZWNvcmF0b3JzID0gdGhpcy5nZXREZWNvcmF0b3IoZGVjb3JhdG9yS2V5KTtcblx0XHRcdHRoaXMuX2RlY29yYXRvckNhY2hlLnNldChkZWNvcmF0b3JLZXksIFsuLi5kZWNvcmF0b3JzLCAuLi52YWx1ZV0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGdW5jdGlvbiB0byBidWlsZCB0aGUgbGlzdCBvZiBkZWNvcmF0b3JzIGZyb20gdGhlIGdsb2JhbCBkZWNvcmF0b3IgbWFwLlxuXHQgKlxuXHQgKiBAcGFyYW0gZGVjb3JhdG9yS2V5ICBUaGUga2V5IG9mIHRoZSBkZWNvcmF0b3Jcblx0ICogQHJldHVybiBBbiBhcnJheSBvZiBkZWNvcmF0b3IgdmFsdWVzXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIF9idWlsZERlY29yYXRvckxpc3QoZGVjb3JhdG9yS2V5OiBzdHJpbmcpOiBhbnlbXSB7XG5cdFx0Y29uc3QgYWxsRGVjb3JhdG9ycyA9IFtdO1xuXG5cdFx0bGV0IGNvbnN0cnVjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcjtcblxuXHRcdHdoaWxlIChjb25zdHJ1Y3Rvcikge1xuXHRcdFx0Y29uc3QgaW5zdGFuY2VNYXAgPSBkZWNvcmF0b3JNYXAuZ2V0KGNvbnN0cnVjdG9yKTtcblx0XHRcdGlmIChpbnN0YW5jZU1hcCkge1xuXHRcdFx0XHRjb25zdCBkZWNvcmF0b3JzID0gaW5zdGFuY2VNYXAuZ2V0KGRlY29yYXRvcktleSk7XG5cblx0XHRcdFx0aWYgKGRlY29yYXRvcnMpIHtcblx0XHRcdFx0XHRhbGxEZWNvcmF0b3JzLnVuc2hpZnQoLi4uZGVjb3JhdG9ycyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y29uc3RydWN0b3IgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoY29uc3RydWN0b3IpO1xuXHRcdH1cblxuXHRcdHJldHVybiBhbGxEZWNvcmF0b3JzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZ1bmN0aW9uIHRvIHJldHJpZXZlIGRlY29yYXRvciB2YWx1ZXNcblx0ICpcblx0ICogQHBhcmFtIGRlY29yYXRvcktleSBUaGUga2V5IG9mIHRoZSBkZWNvcmF0b3Jcblx0ICogQHJldHVybnMgQW4gYXJyYXkgb2YgZGVjb3JhdG9yIHZhbHVlc1xuXHQgKi9cblx0cHJvdGVjdGVkIGdldERlY29yYXRvcihkZWNvcmF0b3JLZXk6IHN0cmluZyk6IGFueVtdIHtcblx0XHRsZXQgYWxsRGVjb3JhdG9ycyA9IHRoaXMuX2RlY29yYXRvckNhY2hlLmdldChkZWNvcmF0b3JLZXkpO1xuXG5cdFx0aWYgKGFsbERlY29yYXRvcnMgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIGFsbERlY29yYXRvcnM7XG5cdFx0fVxuXG5cdFx0YWxsRGVjb3JhdG9ycyA9IHRoaXMuX2J1aWxkRGVjb3JhdG9yTGlzdChkZWNvcmF0b3JLZXkpO1xuXG5cdFx0dGhpcy5fZGVjb3JhdG9yQ2FjaGUuc2V0KGRlY29yYXRvcktleSwgYWxsRGVjb3JhdG9ycyk7XG5cdFx0cmV0dXJuIGFsbERlY29yYXRvcnM7XG5cdH1cblxuXHQvKipcblx0ICogQmluZHMgdW5ib3VuZCBwcm9wZXJ0eSBmdW5jdGlvbnMgdG8gdGhlIHNwZWNpZmllZCBgYmluZGAgcHJvcGVydHlcblx0ICpcblx0ICogQHBhcmFtIHByb3BlcnRpZXMgcHJvcGVydGllcyB0byBjaGVjayBmb3IgZnVuY3Rpb25zXG5cdCAqL1xuXHRwcml2YXRlIF9iaW5kRnVuY3Rpb25Qcm9wZXJ0eShwcm9wZXJ0eTogYW55LCBiaW5kOiBhbnkpOiBhbnkge1xuXHRcdGlmICh0eXBlb2YgcHJvcGVydHkgPT09ICdmdW5jdGlvbicgJiYgIXByb3BlcnR5W25vQmluZF0gJiYgaXNXaWRnZXRCYXNlQ29uc3RydWN0b3IocHJvcGVydHkpID09PSBmYWxzZSkge1xuXHRcdFx0aWYgKHRoaXMuX2JpbmRGdW5jdGlvblByb3BlcnR5TWFwID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0dGhpcy5fYmluZEZ1bmN0aW9uUHJvcGVydHlNYXAgPSBuZXcgV2Vha01hcDxcblx0XHRcdFx0XHQoLi4uYXJnczogYW55W10pID0+IGFueSxcblx0XHRcdFx0XHR7IGJvdW5kRnVuYzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7IHNjb3BlOiBhbnkgfVxuXHRcdFx0XHQ+KCk7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBiaW5kSW5mbzogUGFydGlhbDxCb3VuZEZ1bmN0aW9uRGF0YT4gPSB0aGlzLl9iaW5kRnVuY3Rpb25Qcm9wZXJ0eU1hcC5nZXQocHJvcGVydHkpIHx8IHt9O1xuXHRcdFx0bGV0IHsgYm91bmRGdW5jLCBzY29wZSB9ID0gYmluZEluZm87XG5cblx0XHRcdGlmIChib3VuZEZ1bmMgPT09IHVuZGVmaW5lZCB8fCBzY29wZSAhPT0gYmluZCkge1xuXHRcdFx0XHRib3VuZEZ1bmMgPSBwcm9wZXJ0eS5iaW5kKGJpbmQpIGFzICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xuXHRcdFx0XHR0aGlzLl9iaW5kRnVuY3Rpb25Qcm9wZXJ0eU1hcC5zZXQocHJvcGVydHksIHsgYm91bmRGdW5jLCBzY29wZTogYmluZCB9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBib3VuZEZ1bmM7XG5cdFx0fVxuXHRcdHJldHVybiBwcm9wZXJ0eTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgcmVnaXN0cnkoKTogUmVnaXN0cnlIYW5kbGVyIHtcblx0XHRpZiAodGhpcy5fcmVnaXN0cnkgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5fcmVnaXN0cnkgPSBuZXcgUmVnaXN0cnlIYW5kbGVyKCk7XG5cdFx0XHR0aGlzLm93bih0aGlzLl9yZWdpc3RyeSk7XG5cdFx0XHR0aGlzLm93bih0aGlzLl9yZWdpc3RyeS5vbignaW52YWxpZGF0ZScsIHRoaXMuX2JvdW5kSW52YWxpZGF0ZSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fcmVnaXN0cnk7XG5cdH1cblxuXHRwcml2YXRlIF9ydW5CZWZvcmVQcm9wZXJ0aWVzKHByb3BlcnRpZXM6IGFueSkge1xuXHRcdGNvbnN0IGJlZm9yZVByb3BlcnRpZXM6IEJlZm9yZVByb3BlcnRpZXNbXSA9IHRoaXMuZ2V0RGVjb3JhdG9yKCdiZWZvcmVQcm9wZXJ0aWVzJyk7XG5cdFx0aWYgKGJlZm9yZVByb3BlcnRpZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0cmV0dXJuIGJlZm9yZVByb3BlcnRpZXMucmVkdWNlKFxuXHRcdFx0XHQocHJvcGVydGllcywgYmVmb3JlUHJvcGVydGllc0Z1bmN0aW9uKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHsgLi4ucHJvcGVydGllcywgLi4uYmVmb3JlUHJvcGVydGllc0Z1bmN0aW9uLmNhbGwodGhpcywgcHJvcGVydGllcykgfTtcblx0XHRcdFx0fSxcblx0XHRcdFx0eyAuLi5wcm9wZXJ0aWVzIH1cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiBwcm9wZXJ0aWVzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJ1biBhbGwgcmVnaXN0ZXJlZCBiZWZvcmUgcmVuZGVycyBhbmQgcmV0dXJuIHRoZSB1cGRhdGVkIHJlbmRlciBtZXRob2Rcblx0ICovXG5cdHByaXZhdGUgX3J1bkJlZm9yZVJlbmRlcnMoKTogUmVuZGVyIHtcblx0XHRjb25zdCBiZWZvcmVSZW5kZXJzID0gdGhpcy5nZXREZWNvcmF0b3IoJ2JlZm9yZVJlbmRlcicpO1xuXG5cdFx0aWYgKGJlZm9yZVJlbmRlcnMubGVuZ3RoID4gMCkge1xuXHRcdFx0cmV0dXJuIGJlZm9yZVJlbmRlcnMucmVkdWNlKChyZW5kZXI6IFJlbmRlciwgYmVmb3JlUmVuZGVyRnVuY3Rpb246IEJlZm9yZVJlbmRlcikgPT4ge1xuXHRcdFx0XHRjb25zdCB1cGRhdGVkUmVuZGVyID0gYmVmb3JlUmVuZGVyRnVuY3Rpb24uY2FsbCh0aGlzLCByZW5kZXIsIHRoaXMuX3Byb3BlcnRpZXMsIHRoaXMuX2NoaWxkcmVuKTtcblx0XHRcdFx0aWYgKCF1cGRhdGVkUmVuZGVyKSB7XG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKCdSZW5kZXIgZnVuY3Rpb24gbm90IHJldHVybmVkIGZyb20gYmVmb3JlUmVuZGVyLCB1c2luZyBwcmV2aW91cyByZW5kZXInKTtcblx0XHRcdFx0XHRyZXR1cm4gcmVuZGVyO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB1cGRhdGVkUmVuZGVyO1xuXHRcdFx0fSwgdGhpcy5fYm91bmRSZW5kZXJGdW5jKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2JvdW5kUmVuZGVyRnVuYztcblx0fVxuXG5cdC8qKlxuXHQgKiBSdW4gYWxsIHJlZ2lzdGVyZWQgYWZ0ZXIgcmVuZGVycyBhbmQgcmV0dXJuIHRoZSBkZWNvcmF0ZWQgRE5vZGVzXG5cdCAqXG5cdCAqIEBwYXJhbSBkTm9kZSBUaGUgRE5vZGVzIHRvIHJ1biB0aHJvdWdoIHRoZSBhZnRlciByZW5kZXJzXG5cdCAqL1xuXHRwcm90ZWN0ZWQgcnVuQWZ0ZXJSZW5kZXJzKGROb2RlOiBETm9kZSB8IEROb2RlW10pOiBETm9kZSB8IEROb2RlW10ge1xuXHRcdGNvbnN0IGFmdGVyUmVuZGVycyA9IHRoaXMuZ2V0RGVjb3JhdG9yKCdhZnRlclJlbmRlcicpO1xuXG5cdFx0aWYgKGFmdGVyUmVuZGVycy5sZW5ndGggPiAwKSB7XG5cdFx0XHRkTm9kZSA9IGFmdGVyUmVuZGVycy5yZWR1Y2UoKGROb2RlOiBETm9kZSB8IEROb2RlW10sIGFmdGVyUmVuZGVyRnVuY3Rpb246IEFmdGVyUmVuZGVyKSA9PiB7XG5cdFx0XHRcdHJldHVybiBhZnRlclJlbmRlckZ1bmN0aW9uLmNhbGwodGhpcywgZE5vZGUpO1xuXHRcdFx0fSwgZE5vZGUpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9tZXRhTWFwICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX21ldGFNYXAuZm9yRWFjaCgobWV0YSkgPT4ge1xuXHRcdFx0XHRtZXRhLmFmdGVyUmVuZGVyKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZE5vZGU7XG5cdH1cblxuXHRwcml2YXRlIF9ydW5BZnRlckNvbnN0cnVjdG9ycygpOiB2b2lkIHtcblx0XHRjb25zdCBhZnRlckNvbnN0cnVjdG9ycyA9IHRoaXMuZ2V0RGVjb3JhdG9yKCdhZnRlckNvbnN0cnVjdG9yJyk7XG5cblx0XHRpZiAoYWZ0ZXJDb25zdHJ1Y3RvcnMubGVuZ3RoID4gMCkge1xuXHRcdFx0YWZ0ZXJDb25zdHJ1Y3RvcnMuZm9yRWFjaCgoYWZ0ZXJDb25zdHJ1Y3RvcikgPT4gYWZ0ZXJDb25zdHJ1Y3Rvci5jYWxsKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgb3duKGhhbmRsZTogSGFuZGxlKTogdm9pZCB7XG5cdFx0dGhpcy5faGFuZGxlcy5wdXNoKGhhbmRsZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgZGVzdHJveSgpIHtcblx0XHR3aGlsZSAodGhpcy5faGFuZGxlcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRjb25zdCBoYW5kbGUgPSB0aGlzLl9oYW5kbGVzLnBvcCgpO1xuXHRcdFx0aWYgKGhhbmRsZSkge1xuXHRcdFx0XHRoYW5kbGUuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBXaWRnZXRCYXNlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIFdpZGdldEJhc2UudHMiLCJpbXBvcnQgeyBWTm9kZVByb3BlcnRpZXMgfSBmcm9tICcuLy4uL2ludGVyZmFjZXMnO1xuXG5sZXQgYnJvd3NlclNwZWNpZmljVHJhbnNpdGlvbkVuZEV2ZW50TmFtZSA9ICcnO1xubGV0IGJyb3dzZXJTcGVjaWZpY0FuaW1hdGlvbkVuZEV2ZW50TmFtZSA9ICcnO1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVCcm93c2VyU3R5bGVOYW1lcyhlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuXHRpZiAoJ1dlYmtpdFRyYW5zaXRpb24nIGluIGVsZW1lbnQuc3R5bGUpIHtcblx0XHRicm93c2VyU3BlY2lmaWNUcmFuc2l0aW9uRW5kRXZlbnROYW1lID0gJ3dlYmtpdFRyYW5zaXRpb25FbmQnO1xuXHRcdGJyb3dzZXJTcGVjaWZpY0FuaW1hdGlvbkVuZEV2ZW50TmFtZSA9ICd3ZWJraXRBbmltYXRpb25FbmQnO1xuXHR9IGVsc2UgaWYgKCd0cmFuc2l0aW9uJyBpbiBlbGVtZW50LnN0eWxlIHx8ICdNb3pUcmFuc2l0aW9uJyBpbiBlbGVtZW50LnN0eWxlKSB7XG5cdFx0YnJvd3NlclNwZWNpZmljVHJhbnNpdGlvbkVuZEV2ZW50TmFtZSA9ICd0cmFuc2l0aW9uZW5kJztcblx0XHRicm93c2VyU3BlY2lmaWNBbmltYXRpb25FbmRFdmVudE5hbWUgPSAnYW5pbWF0aW9uZW5kJztcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1lvdXIgYnJvd3NlciBpcyBub3Qgc3VwcG9ydGVkJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZShlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuXHRpZiAoYnJvd3NlclNwZWNpZmljQW5pbWF0aW9uRW5kRXZlbnROYW1lID09PSAnJykge1xuXHRcdGRldGVybWluZUJyb3dzZXJTdHlsZU5hbWVzKGVsZW1lbnQpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJ1bkFuZENsZWFuVXAoZWxlbWVudDogSFRNTEVsZW1lbnQsIHN0YXJ0QW5pbWF0aW9uOiAoKSA9PiB2b2lkLCBmaW5pc2hBbmltYXRpb246ICgpID0+IHZvaWQpIHtcblx0aW5pdGlhbGl6ZShlbGVtZW50KTtcblxuXHRsZXQgZmluaXNoZWQgPSBmYWxzZTtcblxuXHRsZXQgdHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICghZmluaXNoZWQpIHtcblx0XHRcdGZpbmlzaGVkID0gdHJ1ZTtcblx0XHRcdGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihicm93c2VyU3BlY2lmaWNUcmFuc2l0aW9uRW5kRXZlbnROYW1lLCB0cmFuc2l0aW9uRW5kKTtcblx0XHRcdGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihicm93c2VyU3BlY2lmaWNBbmltYXRpb25FbmRFdmVudE5hbWUsIHRyYW5zaXRpb25FbmQpO1xuXG5cdFx0XHRmaW5pc2hBbmltYXRpb24oKTtcblx0XHR9XG5cdH07XG5cblx0c3RhcnRBbmltYXRpb24oKTtcblxuXHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoYnJvd3NlclNwZWNpZmljQW5pbWF0aW9uRW5kRXZlbnROYW1lLCB0cmFuc2l0aW9uRW5kKTtcblx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGJyb3dzZXJTcGVjaWZpY1RyYW5zaXRpb25FbmRFdmVudE5hbWUsIHRyYW5zaXRpb25FbmQpO1xufVxuXG5mdW5jdGlvbiBleGl0KG5vZGU6IEhUTUxFbGVtZW50LCBwcm9wZXJ0aWVzOiBWTm9kZVByb3BlcnRpZXMsIGV4aXRBbmltYXRpb246IHN0cmluZywgcmVtb3ZlTm9kZTogKCkgPT4gdm9pZCkge1xuXHRjb25zdCBhY3RpdmVDbGFzcyA9IHByb3BlcnRpZXMuZXhpdEFuaW1hdGlvbkFjdGl2ZSB8fCBgJHtleGl0QW5pbWF0aW9ufS1hY3RpdmVgO1xuXG5cdHJ1bkFuZENsZWFuVXAoXG5cdFx0bm9kZSxcblx0XHQoKSA9PiB7XG5cdFx0XHRub2RlLmNsYXNzTGlzdC5hZGQoZXhpdEFuaW1hdGlvbik7XG5cblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcblx0XHRcdFx0bm9kZS5jbGFzc0xpc3QuYWRkKGFjdGl2ZUNsYXNzKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0KCkgPT4ge1xuXHRcdFx0cmVtb3ZlTm9kZSgpO1xuXHRcdH1cblx0KTtcbn1cblxuZnVuY3Rpb24gZW50ZXIobm9kZTogSFRNTEVsZW1lbnQsIHByb3BlcnRpZXM6IFZOb2RlUHJvcGVydGllcywgZW50ZXJBbmltYXRpb246IHN0cmluZykge1xuXHRjb25zdCBhY3RpdmVDbGFzcyA9IHByb3BlcnRpZXMuZW50ZXJBbmltYXRpb25BY3RpdmUgfHwgYCR7ZW50ZXJBbmltYXRpb259LWFjdGl2ZWA7XG5cblx0cnVuQW5kQ2xlYW5VcChcblx0XHRub2RlLFxuXHRcdCgpID0+IHtcblx0XHRcdG5vZGUuY2xhc3NMaXN0LmFkZChlbnRlckFuaW1hdGlvbik7XG5cblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcblx0XHRcdFx0bm9kZS5jbGFzc0xpc3QuYWRkKGFjdGl2ZUNsYXNzKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0KCkgPT4ge1xuXHRcdFx0bm9kZS5jbGFzc0xpc3QucmVtb3ZlKGVudGVyQW5pbWF0aW9uKTtcblx0XHRcdG5vZGUuY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVDbGFzcyk7XG5cdFx0fVxuXHQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGVudGVyLFxuXHRleGl0XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGNzc1RyYW5zaXRpb25zLnRzIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuLi9zaGltL1N5bWJvbCc7XG5pbXBvcnQge1xuXHRDb25zdHJ1Y3Rvcixcblx0RGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2UsXG5cdERlZmVycmVkVmlydHVhbFByb3BlcnRpZXMsXG5cdEROb2RlLFxuXHRWTm9kZSxcblx0UmVnaXN0cnlMYWJlbCxcblx0Vk5vZGVQcm9wZXJ0aWVzLFxuXHRXaWRnZXRCYXNlSW50ZXJmYWNlLFxuXHRXTm9kZSxcblx0RG9tT3B0aW9uc1xufSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgSW50ZXJuYWxWTm9kZSwgUmVuZGVyUmVzdWx0IH0gZnJvbSAnLi92ZG9tJztcblxuLyoqXG4gKiBUaGUgc3ltYm9sIGlkZW50aWZpZXIgZm9yIGEgV05vZGUgdHlwZVxuICovXG5leHBvcnQgY29uc3QgV05PREUgPSBTeW1ib2woJ0lkZW50aWZpZXIgZm9yIGEgV05vZGUuJyk7XG5cbi8qKlxuICogVGhlIHN5bWJvbCBpZGVudGlmaWVyIGZvciBhIFZOb2RlIHR5cGVcbiAqL1xuZXhwb3J0IGNvbnN0IFZOT0RFID0gU3ltYm9sKCdJZGVudGlmaWVyIGZvciBhIFZOb2RlLicpO1xuXG4vKipcbiAqIFRoZSBzeW1ib2wgaWRlbnRpZmllciBmb3IgYSBWTm9kZSB0eXBlIGNyZWF0ZWQgdXNpbmcgZG9tKClcbiAqL1xuZXhwb3J0IGNvbnN0IERPTVZOT0RFID0gU3ltYm9sKCdJZGVudGlmaWVyIGZvciBhIFZOb2RlIGNyZWF0ZWQgdXNpbmcgZXhpc3RpbmcgZG9tLicpO1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IHJldHVybnMgdHJ1ZSBpZiB0aGUgYEROb2RlYCBpcyBhIGBXTm9kZWAgdXNpbmcgdGhlIGB0eXBlYCBwcm9wZXJ0eVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNXTm9kZTxXIGV4dGVuZHMgV2lkZ2V0QmFzZUludGVyZmFjZSA9IERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlPihcblx0Y2hpbGQ6IEROb2RlPFc+XG4pOiBjaGlsZCBpcyBXTm9kZTxXPiB7XG5cdHJldHVybiBCb29sZWFuKGNoaWxkICYmIHR5cGVvZiBjaGlsZCAhPT0gJ3N0cmluZycgJiYgY2hpbGQudHlwZSA9PT0gV05PREUpO1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IHJldHVybnMgdHJ1ZSBpZiB0aGUgYEROb2RlYCBpcyBhIGBWTm9kZWAgdXNpbmcgdGhlIGB0eXBlYCBwcm9wZXJ0eVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNWTm9kZShjaGlsZDogRE5vZGUpOiBjaGlsZCBpcyBWTm9kZSB7XG5cdHJldHVybiBCb29sZWFuKGNoaWxkICYmIHR5cGVvZiBjaGlsZCAhPT0gJ3N0cmluZycgJiYgKGNoaWxkLnR5cGUgPT09IFZOT0RFIHx8IGNoaWxkLnR5cGUgPT09IERPTVZOT0RFKSk7XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0cnVlIGlmIHRoZSBgRE5vZGVgIGlzIGEgYFZOb2RlYCBjcmVhdGVkIHdpdGggYGRvbSgpYCB1c2luZyB0aGUgYHR5cGVgIHByb3BlcnR5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RvbVZOb2RlKGNoaWxkOiBETm9kZSk6IGNoaWxkIGlzIFZOb2RlIHtcblx0cmV0dXJuIEJvb2xlYW4oY2hpbGQgJiYgdHlwZW9mIGNoaWxkICE9PSAnc3RyaW5nJyAmJiBjaGlsZC50eXBlID09PSBET01WTk9ERSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VsZW1lbnROb2RlKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBFbGVtZW50IHtcblx0cmV0dXJuICEhdmFsdWUudGFnTmFtZTtcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIHRoZSBkZWNvcmF0ZSBtb2RpZmllclxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1vZGlmaWVyPFQgZXh0ZW5kcyBETm9kZT4ge1xuXHQoZE5vZGU6IFQsIGJyZWFrZXI6ICgpID0+IHZvaWQpOiB2b2lkO1xufVxuXG4vKipcbiAqIFRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gZm9yIGRlY29yYXRlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUHJlZGljYXRlPFQgZXh0ZW5kcyBETm9kZT4ge1xuXHQoZE5vZGU6IEROb2RlKTogZE5vZGUgaXMgVDtcbn1cblxuLyoqXG4gKiBEZWNvcmF0b3Igb3B0aW9uc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIERlY29yYXRlT3B0aW9uczxUIGV4dGVuZHMgRE5vZGU+IHtcblx0bW9kaWZpZXI6IE1vZGlmaWVyPFQ+O1xuXHRwcmVkaWNhdGU/OiBQcmVkaWNhdGU8VD47XG5cdHNoYWxsb3c/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEdlbmVyaWMgZGVjb3JhdGUgZnVuY3Rpb24gZm9yIEROb2Rlcy4gVGhlIG5vZGVzIGFyZSBtb2RpZmllZCBpbiBwbGFjZSBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgcHJlZGljYXRlXG4gKiBhbmQgbW9kaWZpZXIgZnVuY3Rpb25zLlxuICpcbiAqIFRoZSBjaGlsZHJlbiBvZiBlYWNoIG5vZGUgYXJlIGZsYXR0ZW5lZCBhbmQgYWRkZWQgdG8gdGhlIGFycmF5IGZvciBkZWNvcmF0aW9uLlxuICpcbiAqIElmIG5vIHByZWRpY2F0ZSBpcyBzdXBwbGllZCB0aGVuIHRoZSBtb2RpZmllciB3aWxsIGJlIGV4ZWN1dGVkIG9uIGFsbCBub2Rlcy4gQSBgYnJlYWtlcmAgZnVuY3Rpb24gaXMgcGFzc2VkIHRvIHRoZVxuICogbW9kaWZpZXIgd2hpY2ggd2lsbCBkcmFpbiB0aGUgbm9kZXMgYXJyYXkgYW5kIGV4aXQgdGhlIGRlY29yYXRpb24uXG4gKlxuICogV2hlbiB0aGUgYHNoYWxsb3dgIG9wdGlvbnMgaXMgc2V0IHRvIGB0cnVlYCB0aGUgb25seSB0aGUgdG9wIG5vZGUgb3Igbm9kZXMgd2lsbCBiZSBkZWNvcmF0ZWQgKG9ubHkgc3VwcG9ydGVkIHVzaW5nXG4gKiBgRGVjb3JhdGVPcHRpb25zYCkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNvcmF0ZTxUIGV4dGVuZHMgRE5vZGU+KGROb2RlczogRE5vZGUsIG9wdGlvbnM6IERlY29yYXRlT3B0aW9uczxUPik6IEROb2RlO1xuZXhwb3J0IGZ1bmN0aW9uIGRlY29yYXRlPFQgZXh0ZW5kcyBETm9kZT4oZE5vZGVzOiBETm9kZVtdLCBvcHRpb25zOiBEZWNvcmF0ZU9wdGlvbnM8VD4pOiBETm9kZVtdO1xuZXhwb3J0IGZ1bmN0aW9uIGRlY29yYXRlPFQgZXh0ZW5kcyBETm9kZT4oZE5vZGVzOiBETm9kZSB8IEROb2RlW10sIG9wdGlvbnM6IERlY29yYXRlT3B0aW9uczxUPik6IEROb2RlIHwgRE5vZGVbXTtcbmV4cG9ydCBmdW5jdGlvbiBkZWNvcmF0ZTxUIGV4dGVuZHMgRE5vZGU+KGROb2RlczogRE5vZGUsIG1vZGlmaWVyOiBNb2RpZmllcjxUPiwgcHJlZGljYXRlOiBQcmVkaWNhdGU8VD4pOiBETm9kZTtcbmV4cG9ydCBmdW5jdGlvbiBkZWNvcmF0ZTxUIGV4dGVuZHMgRE5vZGU+KGROb2RlczogRE5vZGVbXSwgbW9kaWZpZXI6IE1vZGlmaWVyPFQ+LCBwcmVkaWNhdGU6IFByZWRpY2F0ZTxUPik6IEROb2RlW107XG5leHBvcnQgZnVuY3Rpb24gZGVjb3JhdGU8VCBleHRlbmRzIEROb2RlPihcblx0ZE5vZGVzOiBSZW5kZXJSZXN1bHQsXG5cdG1vZGlmaWVyOiBNb2RpZmllcjxUPixcblx0cHJlZGljYXRlOiBQcmVkaWNhdGU8VD5cbik6IFJlbmRlclJlc3VsdDtcbmV4cG9ydCBmdW5jdGlvbiBkZWNvcmF0ZShkTm9kZXM6IEROb2RlLCBtb2RpZmllcjogTW9kaWZpZXI8RE5vZGU+KTogRE5vZGU7XG5leHBvcnQgZnVuY3Rpb24gZGVjb3JhdGUoZE5vZGVzOiBETm9kZVtdLCBtb2RpZmllcjogTW9kaWZpZXI8RE5vZGU+KTogRE5vZGVbXTtcbmV4cG9ydCBmdW5jdGlvbiBkZWNvcmF0ZShkTm9kZXM6IFJlbmRlclJlc3VsdCwgbW9kaWZpZXI6IE1vZGlmaWVyPEROb2RlPik6IFJlbmRlclJlc3VsdDtcbmV4cG9ydCBmdW5jdGlvbiBkZWNvcmF0ZShcblx0ZE5vZGVzOiBETm9kZSB8IEROb2RlW10sXG5cdG9wdGlvbnNPck1vZGlmaWVyOiBNb2RpZmllcjxETm9kZT4gfCBEZWNvcmF0ZU9wdGlvbnM8RE5vZGU+LFxuXHRwcmVkaWNhdGU/OiBQcmVkaWNhdGU8RE5vZGU+XG4pOiBETm9kZSB8IEROb2RlW10ge1xuXHRsZXQgc2hhbGxvdyA9IGZhbHNlO1xuXHRsZXQgbW9kaWZpZXI7XG5cdGlmICh0eXBlb2Ygb3B0aW9uc09yTW9kaWZpZXIgPT09ICdmdW5jdGlvbicpIHtcblx0XHRtb2RpZmllciA9IG9wdGlvbnNPck1vZGlmaWVyO1xuXHR9IGVsc2Uge1xuXHRcdG1vZGlmaWVyID0gb3B0aW9uc09yTW9kaWZpZXIubW9kaWZpZXI7XG5cdFx0cHJlZGljYXRlID0gb3B0aW9uc09yTW9kaWZpZXIucHJlZGljYXRlO1xuXHRcdHNoYWxsb3cgPSBvcHRpb25zT3JNb2RpZmllci5zaGFsbG93IHx8IGZhbHNlO1xuXHR9XG5cblx0bGV0IG5vZGVzID0gQXJyYXkuaXNBcnJheShkTm9kZXMpID8gWy4uLmROb2Rlc10gOiBbZE5vZGVzXTtcblx0ZnVuY3Rpb24gYnJlYWtlcigpIHtcblx0XHRub2RlcyA9IFtdO1xuXHR9XG5cdHdoaWxlIChub2Rlcy5sZW5ndGgpIHtcblx0XHRjb25zdCBub2RlID0gbm9kZXMuc2hpZnQoKTtcblx0XHRpZiAobm9kZSkge1xuXHRcdFx0aWYgKCFzaGFsbG93ICYmIChpc1dOb2RlKG5vZGUpIHx8IGlzVk5vZGUobm9kZSkpICYmIG5vZGUuY2hpbGRyZW4pIHtcblx0XHRcdFx0bm9kZXMgPSBbLi4ubm9kZXMsIC4uLm5vZGUuY2hpbGRyZW5dO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFwcmVkaWNhdGUgfHwgcHJlZGljYXRlKG5vZGUpKSB7XG5cdFx0XHRcdG1vZGlmaWVyKG5vZGUsIGJyZWFrZXIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gZE5vZGVzO1xufVxuXG4vKipcbiAqIFdyYXBwZXIgZnVuY3Rpb24gZm9yIGNhbGxzIHRvIGNyZWF0ZSBhIHdpZGdldC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHc8VyBleHRlbmRzIFdpZGdldEJhc2VJbnRlcmZhY2U+KFxuXHR3aWRnZXRDb25zdHJ1Y3RvcjogQ29uc3RydWN0b3I8Vz4gfCBSZWdpc3RyeUxhYmVsLFxuXHRwcm9wZXJ0aWVzOiBXWydwcm9wZXJ0aWVzJ10sXG5cdGNoaWxkcmVuOiBXWydjaGlsZHJlbiddID0gW11cbik6IFdOb2RlPFc+IHtcblx0cmV0dXJuIHtcblx0XHRjaGlsZHJlbixcblx0XHR3aWRnZXRDb25zdHJ1Y3Rvcixcblx0XHRwcm9wZXJ0aWVzLFxuXHRcdHR5cGU6IFdOT0RFXG5cdH07XG59XG5cbi8qKlxuICogV3JhcHBlciBmdW5jdGlvbiBmb3IgY2FsbHMgdG8gY3JlYXRlIFZOb2Rlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHYodGFnOiBzdHJpbmcsIGNoaWxkcmVuOiB1bmRlZmluZWQgfCBETm9kZVtdKTogVk5vZGU7XG5leHBvcnQgZnVuY3Rpb24gdih0YWc6IHN0cmluZywgcHJvcGVydGllczogRGVmZXJyZWRWaXJ0dWFsUHJvcGVydGllcyB8IFZOb2RlUHJvcGVydGllcywgY2hpbGRyZW4/OiBETm9kZVtdKTogVk5vZGU7XG5leHBvcnQgZnVuY3Rpb24gdih0YWc6IHN0cmluZyk6IFZOb2RlO1xuZXhwb3J0IGZ1bmN0aW9uIHYoXG5cdHRhZzogc3RyaW5nLFxuXHRwcm9wZXJ0aWVzT3JDaGlsZHJlbjogVk5vZGVQcm9wZXJ0aWVzIHwgRGVmZXJyZWRWaXJ0dWFsUHJvcGVydGllcyB8IEROb2RlW10gPSB7fSxcblx0Y2hpbGRyZW46IHVuZGVmaW5lZCB8IEROb2RlW10gPSB1bmRlZmluZWRcbik6IFZOb2RlIHtcblx0bGV0IHByb3BlcnRpZXM6IFZOb2RlUHJvcGVydGllcyB8IERlZmVycmVkVmlydHVhbFByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzT3JDaGlsZHJlbjtcblx0bGV0IGRlZmVycmVkUHJvcGVydGllc0NhbGxiYWNrO1xuXG5cdGlmIChBcnJheS5pc0FycmF5KHByb3BlcnRpZXNPckNoaWxkcmVuKSkge1xuXHRcdGNoaWxkcmVuID0gcHJvcGVydGllc09yQ2hpbGRyZW47XG5cdFx0cHJvcGVydGllcyA9IHt9O1xuXHR9XG5cblx0aWYgKHR5cGVvZiBwcm9wZXJ0aWVzID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0ZGVmZXJyZWRQcm9wZXJ0aWVzQ2FsbGJhY2sgPSBwcm9wZXJ0aWVzO1xuXHRcdHByb3BlcnRpZXMgPSB7fTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0dGFnLFxuXHRcdGRlZmVycmVkUHJvcGVydGllc0NhbGxiYWNrLFxuXHRcdGNoaWxkcmVuLFxuXHRcdHByb3BlcnRpZXMsXG5cdFx0dHlwZTogVk5PREVcblx0fTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBWTm9kZSBmb3IgYW4gZXhpc3RpbmcgRE9NIE5vZGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkb20oXG5cdHsgbm9kZSwgYXR0cnMgPSB7fSwgcHJvcHMgPSB7fSwgb24gPSB7fSwgZGlmZlR5cGUgPSAnbm9uZScgfTogRG9tT3B0aW9ucyxcblx0Y2hpbGRyZW4/OiBETm9kZVtdXG4pOiBWTm9kZSB7XG5cdHJldHVybiB7XG5cdFx0dGFnOiBpc0VsZW1lbnROb2RlKG5vZGUpID8gbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgOiAnJyxcblx0XHRwcm9wZXJ0aWVzOiBwcm9wcyxcblx0XHRhdHRyaWJ1dGVzOiBhdHRycyxcblx0XHRldmVudHM6IG9uLFxuXHRcdGNoaWxkcmVuLFxuXHRcdHR5cGU6IERPTVZOT0RFLFxuXHRcdGRvbU5vZGU6IG5vZGUsXG5cdFx0dGV4dDogaXNFbGVtZW50Tm9kZShub2RlKSA/IHVuZGVmaW5lZCA6IG5vZGUuZGF0YSxcblx0XHRkaWZmVHlwZVxuXHR9IGFzIEludGVybmFsVk5vZGU7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZC50cyIsImltcG9ydCB7IGhhbmRsZURlY29yYXRvciB9IGZyb20gJy4vaGFuZGxlRGVjb3JhdG9yJztcblxuLyoqXG4gKiBEZWNvcmF0b3IgdGhhdCBjYW4gYmUgdXNlZCB0byByZWdpc3RlciBhIGZ1bmN0aW9uIHRvIHJ1biBhcyBhbiBhc3BlY3QgdG8gYHJlbmRlcmBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFmdGVyUmVuZGVyKG1ldGhvZDogRnVuY3Rpb24pOiAodGFyZ2V0OiBhbnkpID0+IHZvaWQ7XG5leHBvcnQgZnVuY3Rpb24gYWZ0ZXJSZW5kZXIoKTogKHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nKSA9PiB2b2lkO1xuZXhwb3J0IGZ1bmN0aW9uIGFmdGVyUmVuZGVyKG1ldGhvZD86IEZ1bmN0aW9uKSB7XG5cdHJldHVybiBoYW5kbGVEZWNvcmF0b3IoKHRhcmdldCwgcHJvcGVydHlLZXkpID0+IHtcblx0XHR0YXJnZXQuYWRkRGVjb3JhdG9yKCdhZnRlclJlbmRlcicsIHByb3BlcnR5S2V5ID8gdGFyZ2V0W3Byb3BlcnR5S2V5XSA6IG1ldGhvZCk7XG5cdH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhZnRlclJlbmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBhZnRlclJlbmRlci50cyIsImV4cG9ydCB0eXBlIERlY29yYXRvckhhbmRsZXIgPSAodGFyZ2V0OiBhbnksIHByb3BlcnR5S2V5Pzogc3RyaW5nKSA9PiB2b2lkO1xuXG4vKipcbiAqIEdlbmVyaWMgZGVjb3JhdG9yIGhhbmRsZXIgdG8gdGFrZSBjYXJlIG9mIHdoZXRoZXIgb3Igbm90IHRoZSBkZWNvcmF0b3Igd2FzIGNhbGxlZCBhdCB0aGUgY2xhc3MgbGV2ZWxcbiAqIG9yIHRoZSBtZXRob2QgbGV2ZWwuXG4gKlxuICogQHBhcmFtIGhhbmRsZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZURlY29yYXRvcihoYW5kbGVyOiBEZWNvcmF0b3JIYW5kbGVyKSB7XG5cdHJldHVybiBmdW5jdGlvbih0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk/OiBzdHJpbmcsIGRlc2NyaXB0b3I/OiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcblx0XHRpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0aGFuZGxlcih0YXJnZXQucHJvdG90eXBlLCB1bmRlZmluZWQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRoYW5kbGVyKHRhcmdldCwgcHJvcGVydHlLZXkpO1xuXHRcdH1cblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlRGVjb3JhdG9yO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGhhbmRsZURlY29yYXRvci50cyIsImltcG9ydCB7IFByb3BlcnR5Q2hhbmdlUmVjb3JkIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IFdJREdFVF9CQVNFX1RZUEUgfSBmcm9tICcuL1JlZ2lzdHJ5JztcblxuZnVuY3Rpb24gaXNPYmplY3RPckFycmF5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcblx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IE9iamVjdF0nIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWx3YXlzKHByZXZpb3VzUHJvcGVydHk6IGFueSwgbmV3UHJvcGVydHk6IGFueSk6IFByb3BlcnR5Q2hhbmdlUmVjb3JkIHtcblx0cmV0dXJuIHtcblx0XHRjaGFuZ2VkOiB0cnVlLFxuXHRcdHZhbHVlOiBuZXdQcm9wZXJ0eVxuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaWdub3JlKHByZXZpb3VzUHJvcGVydHk6IGFueSwgbmV3UHJvcGVydHk6IGFueSk6IFByb3BlcnR5Q2hhbmdlUmVjb3JkIHtcblx0cmV0dXJuIHtcblx0XHRjaGFuZ2VkOiBmYWxzZSxcblx0XHR2YWx1ZTogbmV3UHJvcGVydHlcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZmVyZW5jZShwcmV2aW91c1Byb3BlcnR5OiBhbnksIG5ld1Byb3BlcnR5OiBhbnkpOiBQcm9wZXJ0eUNoYW5nZVJlY29yZCB7XG5cdHJldHVybiB7XG5cdFx0Y2hhbmdlZDogcHJldmlvdXNQcm9wZXJ0eSAhPT0gbmV3UHJvcGVydHksXG5cdFx0dmFsdWU6IG5ld1Byb3BlcnR5XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGFsbG93KHByZXZpb3VzUHJvcGVydHk6IGFueSwgbmV3UHJvcGVydHk6IGFueSk6IFByb3BlcnR5Q2hhbmdlUmVjb3JkIHtcblx0bGV0IGNoYW5nZWQgPSBmYWxzZTtcblxuXHRjb25zdCB2YWxpZE9sZFByb3BlcnR5ID0gcHJldmlvdXNQcm9wZXJ0eSAmJiBpc09iamVjdE9yQXJyYXkocHJldmlvdXNQcm9wZXJ0eSk7XG5cdGNvbnN0IHZhbGlkTmV3UHJvcGVydHkgPSBuZXdQcm9wZXJ0eSAmJiBpc09iamVjdE9yQXJyYXkobmV3UHJvcGVydHkpO1xuXG5cdGlmICghdmFsaWRPbGRQcm9wZXJ0eSB8fCAhdmFsaWROZXdQcm9wZXJ0eSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjaGFuZ2VkOiB0cnVlLFxuXHRcdFx0dmFsdWU6IG5ld1Byb3BlcnR5XG5cdFx0fTtcblx0fVxuXG5cdGNvbnN0IHByZXZpb3VzS2V5cyA9IE9iamVjdC5rZXlzKHByZXZpb3VzUHJvcGVydHkpO1xuXHRjb25zdCBuZXdLZXlzID0gT2JqZWN0LmtleXMobmV3UHJvcGVydHkpO1xuXG5cdGlmIChwcmV2aW91c0tleXMubGVuZ3RoICE9PSBuZXdLZXlzLmxlbmd0aCkge1xuXHRcdGNoYW5nZWQgPSB0cnVlO1xuXHR9IGVsc2Uge1xuXHRcdGNoYW5nZWQgPSBuZXdLZXlzLnNvbWUoKGtleSkgPT4ge1xuXHRcdFx0cmV0dXJuIG5ld1Byb3BlcnR5W2tleV0gIT09IHByZXZpb3VzUHJvcGVydHlba2V5XTtcblx0XHR9KTtcblx0fVxuXHRyZXR1cm4ge1xuXHRcdGNoYW5nZWQsXG5cdFx0dmFsdWU6IG5ld1Byb3BlcnR5XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhdXRvKHByZXZpb3VzUHJvcGVydHk6IGFueSwgbmV3UHJvcGVydHk6IGFueSk6IFByb3BlcnR5Q2hhbmdlUmVjb3JkIHtcblx0bGV0IHJlc3VsdDtcblx0aWYgKHR5cGVvZiBuZXdQcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGlmIChuZXdQcm9wZXJ0eS5fdHlwZSA9PT0gV0lER0VUX0JBU0VfVFlQRSkge1xuXHRcdFx0cmVzdWx0ID0gcmVmZXJlbmNlKHByZXZpb3VzUHJvcGVydHksIG5ld1Byb3BlcnR5KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gaWdub3JlKHByZXZpb3VzUHJvcGVydHksIG5ld1Byb3BlcnR5KTtcblx0XHR9XG5cdH0gZWxzZSBpZiAoaXNPYmplY3RPckFycmF5KG5ld1Byb3BlcnR5KSkge1xuXHRcdHJlc3VsdCA9IHNoYWxsb3cocHJldmlvdXNQcm9wZXJ0eSwgbmV3UHJvcGVydHkpO1xuXHR9IGVsc2Uge1xuXHRcdHJlc3VsdCA9IHJlZmVyZW5jZShwcmV2aW91c1Byb3BlcnR5LCBuZXdQcm9wZXJ0eSk7XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBkaWZmLnRzIiwiaW1wb3J0IHsgYXNzaWduIH0gZnJvbSAnLi4vLi4vY29yZS9sYW5nJztcbmltcG9ydCB7IEhhbmRsZSB9IGZyb20gJy4uLy4uL2NvcmUvaW50ZXJmYWNlcyc7XG5pbXBvcnQgY3NzVHJhbnNpdGlvbnMgZnJvbSAnLi4vYW5pbWF0aW9ucy9jc3NUcmFuc2l0aW9ucyc7XG5pbXBvcnQgeyBDb25zdHJ1Y3RvciwgRE5vZGUsIFByb2plY3Rpb24sIFByb2plY3Rpb25PcHRpb25zIH0gZnJvbSAnLi8uLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tICcuLy4uL1dpZGdldEJhc2UnO1xuaW1wb3J0IHsgYWZ0ZXJSZW5kZXIgfSBmcm9tICcuLy4uL2RlY29yYXRvcnMvYWZ0ZXJSZW5kZXInO1xuaW1wb3J0IHsgdiB9IGZyb20gJy4vLi4vZCc7XG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gJy4vLi4vUmVnaXN0cnknO1xuaW1wb3J0IHsgZG9tIH0gZnJvbSAnLi8uLi92ZG9tJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBhdHRhY2ggc3RhdGUgb2YgdGhlIHByb2plY3RvclxuICovXG5leHBvcnQgZW51bSBQcm9qZWN0b3JBdHRhY2hTdGF0ZSB7XG5cdEF0dGFjaGVkID0gMSxcblx0RGV0YWNoZWRcbn1cblxuLyoqXG4gKiBBdHRhY2ggdHlwZSBmb3IgdGhlIHByb2plY3RvclxuICovXG5leHBvcnQgZW51bSBBdHRhY2hUeXBlIHtcblx0QXBwZW5kID0gMSxcblx0TWVyZ2UgPSAyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXR0YWNoT3B0aW9ucyB7XG5cdC8qKlxuXHQgKiBJZiBgJ2FwcGVuZCdgIGl0IHdpbGwgYXBwZW5kZWQgdG8gdGhlIHJvb3QuIElmIGAnbWVyZ2UnYCBpdCB3aWxsIG1lcmdlZCB3aXRoIHRoZSByb290LiBJZiBgJ3JlcGxhY2UnYCBpdCB3aWxsXG5cdCAqIHJlcGxhY2UgdGhlIHJvb3QuXG5cdCAqL1xuXHR0eXBlOiBBdHRhY2hUeXBlO1xuXG5cdC8qKlxuXHQgKiBFbGVtZW50IHRvIGF0dGFjaCB0aGUgcHJvamVjdG9yLlxuXHQgKi9cblx0cm9vdD86IEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvamVjdG9yUHJvcGVydGllcyB7XG5cdHJlZ2lzdHJ5PzogUmVnaXN0cnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvamVjdG9yTWl4aW48UD4ge1xuXHRyZWFkb25seSBwcm9wZXJ0aWVzOiBSZWFkb25seTxQPiAmIFJlYWRvbmx5PFByb2plY3RvclByb3BlcnRpZXM+O1xuXG5cdC8qKlxuXHQgKiBBcHBlbmQgdGhlIHByb2plY3RvciB0byB0aGUgcm9vdC5cblx0ICovXG5cdGFwcGVuZChyb290PzogRWxlbWVudCk6IEhhbmRsZTtcblxuXHQvKipcblx0ICogTWVyZ2UgdGhlIHByb2plY3RvciBvbnRvIHRoZSByb290LlxuXHQgKlxuXHQgKiBUaGUgYHJvb3RgIGFuZCBhbnkgb2YgaXRzIGBjaGlsZHJlbmAgd2lsbCBiZSByZS11c2VkLiAgQW55IGV4Y2VzcyBET00gbm9kZXMgd2lsbCBiZSBpZ25vcmVkIGFuZCBhbnkgbWlzc2luZyBET00gbm9kZXNcblx0ICogd2lsbCBiZSBjcmVhdGVkLlxuXHQgKiBAcGFyYW0gcm9vdCBUaGUgcm9vdCBlbGVtZW50IHRoYXQgdGhlIHJvb3QgdmlydHVhbCBET00gbm9kZSB3aWxsIGJlIG1lcmdlZCB3aXRoLiAgRGVmYXVsdHMgdG8gYGRvY3VtZW50LmJvZHlgLlxuXHQgKi9cblx0bWVyZ2Uocm9vdD86IEVsZW1lbnQpOiBIYW5kbGU7XG5cblx0LyoqXG5cdCAqIEF0dGFjaCB0aGUgcHJvamVjdCB0byBhIF9zYW5kYm94ZWRfIGRvY3VtZW50IGZyYWdtZW50IHRoYXQgaXMgbm90IHBhcnQgb2YgdGhlIERPTS5cblx0ICpcblx0ICogV2hlbiBzYW5kYm94ZWQsIHRoZSBgUHJvamVjdG9yYCB3aWxsIHJ1biBpbiBhIHN5bmMgbWFubmVyLCB3aGVyZSByZW5kZXJzIGFyZSBjb21wbGV0ZWQgd2l0aGluIHRoZSBzYW1lIHR1cm4uXG5cdCAqIFRoZSBgUHJvamVjdG9yYCBjcmVhdGVzIGEgYERvY3VtZW50RnJhZ21lbnRgIHdoaWNoIHJlcGxhY2VzIGFueSBvdGhlciBgcm9vdGAgdGhhdCBoYXMgYmVlbiBzZXQuXG5cdCAqIEBwYXJhbSBkb2MgVGhlIGBEb2N1bWVudGAgdG8gdXNlLCB3aGljaCBkZWZhdWx0cyB0byB0aGUgZ2xvYmFsIGBkb2N1bWVudGAuXG5cdCAqL1xuXHRzYW5kYm94KGRvYz86IERvY3VtZW50KTogdm9pZDtcblxuXHQvKipcblx0ICogU2V0cyB0aGUgcHJvcGVydGllcyBmb3IgdGhlIHdpZGdldC4gUmVzcG9uc2libGUgZm9yIGNhbGxpbmcgdGhlIGRpZmZpbmcgZnVuY3Rpb25zIGZvciB0aGUgcHJvcGVydGllcyBhZ2FpbnN0IHRoZVxuXHQgKiBwcmV2aW91cyBwcm9wZXJ0aWVzLiBSdW5zIHRob3VnaCBhbnkgcmVnaXN0ZXJlZCBzcGVjaWZpYyBwcm9wZXJ0eSBkaWZmIGZ1bmN0aW9ucyBjb2xsZWN0aW5nIHRoZSByZXN1bHRzIGFuZCB0aGVuXG5cdCAqIHJ1bnMgdGhlIHJlbWFpbmRlciB0aHJvdWdoIHRoZSBjYXRjaCBhbGwgZGlmZiBmdW5jdGlvbi4gVGhlIGFnZ3JlZ2F0ZSBvZiB0aGUgdHdvIHNldHMgb2YgdGhlIHJlc3VsdHMgaXMgdGhlblxuXHQgKiBzZXQgYXMgdGhlIHdpZGdldCdzIHByb3BlcnRpZXNcblx0ICpcblx0ICogQHBhcmFtIHByb3BlcnRpZXMgVGhlIG5ldyB3aWRnZXQgcHJvcGVydGllc1xuXHQgKi9cblx0c2V0UHJvcGVydGllcyhwcm9wZXJ0aWVzOiB0aGlzWydwcm9wZXJ0aWVzJ10pOiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSB3aWRnZXQncyBjaGlsZHJlblxuXHQgKi9cblx0c2V0Q2hpbGRyZW4oY2hpbGRyZW46IEROb2RlW10pOiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm4gYSBgc3RyaW5nYCB0aGF0IHJlcHJlc2VudHMgdGhlIEhUTUwgb2YgdGhlIGN1cnJlbnQgcHJvamVjdGlvbi4gIFRoZSBwcm9qZWN0b3IgbmVlZHMgdG8gYmUgYXR0YWNoZWQuXG5cdCAqL1xuXHR0b0h0bWwoKTogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgaWYgdGhlIHByb2plY3RvcnMgaXMgaW4gYXN5bmMgbW9kZSwgY29uZmlndXJlZCB0byBgdHJ1ZWAgYnkgZGVmYXVsdHMuXG5cdCAqL1xuXHRhc3luYzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogUm9vdCBlbGVtZW50IHRvIGF0dGFjaCB0aGUgcHJvamVjdG9yXG5cdCAqL1xuXHRyb290OiBFbGVtZW50O1xuXG5cdC8qKlxuXHQgKiBUaGUgc3RhdHVzIG9mIHRoZSBwcm9qZWN0b3Jcblx0ICovXG5cdHJlYWRvbmx5IHByb2plY3RvclN0YXRlOiBQcm9qZWN0b3JBdHRhY2hTdGF0ZTtcblxuXHQvKipcblx0ICogUnVucyByZWdpc3RlcmVkIGRlc3Ryb3kgaGFuZGxlc1xuXHQgKi9cblx0ZGVzdHJveSgpOiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUHJvamVjdG9yTWl4aW48UCwgVCBleHRlbmRzIENvbnN0cnVjdG9yPFdpZGdldEJhc2U8UD4+PihCYXNlOiBUKTogVCAmIENvbnN0cnVjdG9yPFByb2plY3Rvck1peGluPFA+PiB7XG5cdGFic3RyYWN0IGNsYXNzIFByb2plY3RvciBleHRlbmRzIEJhc2Uge1xuXHRcdHB1YmxpYyBwcm9qZWN0b3JTdGF0ZTogUHJvamVjdG9yQXR0YWNoU3RhdGU7XG5cblx0XHRwcml2YXRlIF9yb290OiBFbGVtZW50ID0gZG9jdW1lbnQuYm9keTtcblx0XHRwcml2YXRlIF9hc3luYyA9IHRydWU7XG5cdFx0cHJpdmF0ZSBfYXR0YWNoSGFuZGxlOiBIYW5kbGUgfCB1bmRlZmluZWQ7XG5cdFx0cHJpdmF0ZSBfcHJvamVjdGlvbk9wdGlvbnM6IFBhcnRpYWw8UHJvamVjdGlvbk9wdGlvbnM+O1xuXHRcdHByaXZhdGUgX3Byb2plY3Rpb246IFByb2plY3Rpb24gfCB1bmRlZmluZWQ7XG5cdFx0cHJpdmF0ZSBfcHJvamVjdG9yUHJvcGVydGllczogdGhpc1sncHJvcGVydGllcyddID0ge30gYXMgdGhpc1sncHJvcGVydGllcyddO1xuXHRcdHB1YmxpYyBhYnN0cmFjdCBwcm9wZXJ0aWVzOiBSZWFkb25seTxQPiAmIFJlYWRvbmx5PFByb2plY3RvclByb3BlcnRpZXM+O1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJnczogYW55W10pIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXG5cdFx0XHR0aGlzLl9wcm9qZWN0aW9uT3B0aW9ucyA9IHtcblx0XHRcdFx0dHJhbnNpdGlvbnM6IGNzc1RyYW5zaXRpb25zXG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLnJvb3QgPSBkb2N1bWVudC5ib2R5O1xuXHRcdFx0dGhpcy5wcm9qZWN0b3JTdGF0ZSA9IFByb2plY3RvckF0dGFjaFN0YXRlLkRldGFjaGVkO1xuXHRcdH1cblxuXHRcdHB1YmxpYyBhcHBlbmQocm9vdD86IEVsZW1lbnQpOiBIYW5kbGUge1xuXHRcdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdFx0dHlwZTogQXR0YWNoVHlwZS5BcHBlbmQsXG5cdFx0XHRcdHJvb3Rcblx0XHRcdH07XG5cblx0XHRcdHJldHVybiB0aGlzLl9hdHRhY2gob3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0cHVibGljIG1lcmdlKHJvb3Q/OiBFbGVtZW50KTogSGFuZGxlIHtcblx0XHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRcdHR5cGU6IEF0dGFjaFR5cGUuTWVyZ2UsXG5cdFx0XHRcdHJvb3Rcblx0XHRcdH07XG5cblx0XHRcdHJldHVybiB0aGlzLl9hdHRhY2gob3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0cHVibGljIHNldCByb290KHJvb3Q6IEVsZW1lbnQpIHtcblx0XHRcdGlmICh0aGlzLnByb2plY3RvclN0YXRlID09PSBQcm9qZWN0b3JBdHRhY2hTdGF0ZS5BdHRhY2hlZCkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1Byb2plY3RvciBhbHJlYWR5IGF0dGFjaGVkLCBjYW5ub3QgY2hhbmdlIHJvb3QgZWxlbWVudCcpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fcm9vdCA9IHJvb3Q7XG5cdFx0fVxuXG5cdFx0cHVibGljIGdldCByb290KCk6IEVsZW1lbnQge1xuXHRcdFx0cmV0dXJuIHRoaXMuX3Jvb3Q7XG5cdFx0fVxuXG5cdFx0cHVibGljIGdldCBhc3luYygpOiBib29sZWFuIHtcblx0XHRcdHJldHVybiB0aGlzLl9hc3luYztcblx0XHR9XG5cblx0XHRwdWJsaWMgc2V0IGFzeW5jKGFzeW5jOiBib29sZWFuKSB7XG5cdFx0XHRpZiAodGhpcy5wcm9qZWN0b3JTdGF0ZSA9PT0gUHJvamVjdG9yQXR0YWNoU3RhdGUuQXR0YWNoZWQpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdQcm9qZWN0b3IgYWxyZWFkeSBhdHRhY2hlZCwgY2Fubm90IGNoYW5nZSBhc3luYyBtb2RlJyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9hc3luYyA9IGFzeW5jO1xuXHRcdH1cblxuXHRcdHB1YmxpYyBzYW5kYm94KGRvYzogRG9jdW1lbnQgPSBkb2N1bWVudCk6IHZvaWQge1xuXHRcdFx0aWYgKHRoaXMucHJvamVjdG9yU3RhdGUgPT09IFByb2plY3RvckF0dGFjaFN0YXRlLkF0dGFjaGVkKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignUHJvamVjdG9yIGFscmVhZHkgYXR0YWNoZWQsIGNhbm5vdCBjcmVhdGUgc2FuZGJveCcpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fYXN5bmMgPSBmYWxzZTtcblx0XHRcdGNvbnN0IHByZXZpb3VzUm9vdCA9IHRoaXMucm9vdDtcblxuXHRcdFx0LyogZnJlZSB1cCB0aGUgZG9jdW1lbnQgZnJhZ21lbnQgZm9yIEdDICovXG5cdFx0XHR0aGlzLm93bih7XG5cdFx0XHRcdGRlc3Ryb3k6ICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLl9yb290ID0gcHJldmlvdXNSb290O1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5fYXR0YWNoKHtcblx0XHRcdFx0LyogRG9jdW1lbnRGcmFnbWVudCBpcyBub3QgYXNzaWduYWJsZSB0byBFbGVtZW50LCBidXQgcHJvdmlkZXMgZXZlcnl0aGluZyBuZWVkZWQgdG8gd29yayAqL1xuXHRcdFx0XHRyb290OiBkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpIGFzIGFueSxcblx0XHRcdFx0dHlwZTogQXR0YWNoVHlwZS5BcHBlbmRcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHB1YmxpYyBzZXRDaGlsZHJlbihjaGlsZHJlbjogRE5vZGVbXSk6IHZvaWQge1xuXHRcdFx0dGhpcy5fX3NldENoaWxkcmVuX18oY2hpbGRyZW4pO1xuXHRcdH1cblxuXHRcdHB1YmxpYyBzZXRQcm9wZXJ0aWVzKHByb3BlcnRpZXM6IHRoaXNbJ3Byb3BlcnRpZXMnXSk6IHZvaWQge1xuXHRcdFx0dGhpcy5fX3NldFByb3BlcnRpZXNfXyhwcm9wZXJ0aWVzKTtcblx0XHR9XG5cblx0XHRwdWJsaWMgX19zZXRQcm9wZXJ0aWVzX18ocHJvcGVydGllczogdGhpc1sncHJvcGVydGllcyddKTogdm9pZCB7XG5cdFx0XHRpZiAodGhpcy5fcHJvamVjdG9yUHJvcGVydGllcyAmJiB0aGlzLl9wcm9qZWN0b3JQcm9wZXJ0aWVzLnJlZ2lzdHJ5ICE9PSBwcm9wZXJ0aWVzLnJlZ2lzdHJ5KSB7XG5cdFx0XHRcdGlmICh0aGlzLl9wcm9qZWN0b3JQcm9wZXJ0aWVzLnJlZ2lzdHJ5KSB7XG5cdFx0XHRcdFx0dGhpcy5fcHJvamVjdG9yUHJvcGVydGllcy5yZWdpc3RyeS5kZXN0cm95KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuX3Byb2plY3RvclByb3BlcnRpZXMgPSBhc3NpZ24oe30sIHByb3BlcnRpZXMpO1xuXHRcdFx0c3VwZXIuX19zZXRDb3JlUHJvcGVydGllc19fKHsgYmluZDogdGhpcywgYmFzZVJlZ2lzdHJ5OiBwcm9wZXJ0aWVzLnJlZ2lzdHJ5IH0pO1xuXHRcdFx0c3VwZXIuX19zZXRQcm9wZXJ0aWVzX18ocHJvcGVydGllcyk7XG5cdFx0fVxuXG5cdFx0cHVibGljIHRvSHRtbCgpOiBzdHJpbmcge1xuXHRcdFx0aWYgKHRoaXMucHJvamVjdG9yU3RhdGUgIT09IFByb2plY3RvckF0dGFjaFN0YXRlLkF0dGFjaGVkIHx8ICF0aGlzLl9wcm9qZWN0aW9uKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignUHJvamVjdG9yIGlzIG5vdCBhdHRhY2hlZCwgY2Fubm90IHJldHVybiBhbiBIVE1MIHN0cmluZyBvZiBwcm9qZWN0aW9uLicpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICh0aGlzLl9wcm9qZWN0aW9uLmRvbU5vZGUuY2hpbGROb2Rlc1swXSBhcyBFbGVtZW50KS5vdXRlckhUTUw7XG5cdFx0fVxuXG5cdFx0QGFmdGVyUmVuZGVyKClcblx0XHRwdWJsaWMgYWZ0ZXJSZW5kZXIocmVzdWx0OiBETm9kZSkge1xuXHRcdFx0bGV0IG5vZGUgPSByZXN1bHQ7XG5cdFx0XHRpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycgfHwgcmVzdWx0ID09PSBudWxsIHx8IHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdG5vZGUgPSB2KCdzcGFuJywge30sIFtyZXN1bHRdKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0cHVibGljIGRlc3Ryb3koKSB7XG5cdFx0XHRzdXBlci5kZXN0cm95KCk7XG5cdFx0fVxuXG5cdFx0cHJpdmF0ZSBfYXR0YWNoKHsgdHlwZSwgcm9vdCB9OiBBdHRhY2hPcHRpb25zKTogSGFuZGxlIHtcblx0XHRcdGlmIChyb290KSB7XG5cdFx0XHRcdHRoaXMucm9vdCA9IHJvb3Q7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLl9hdHRhY2hIYW5kbGUpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2F0dGFjaEhhbmRsZTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5wcm9qZWN0b3JTdGF0ZSA9IFByb2plY3RvckF0dGFjaFN0YXRlLkF0dGFjaGVkO1xuXG5cdFx0XHRjb25zdCBoYW5kbGUgPSB7XG5cdFx0XHRcdGRlc3Ryb3k6ICgpID0+IHtcblx0XHRcdFx0XHRpZiAodGhpcy5wcm9qZWN0b3JTdGF0ZSA9PT0gUHJvamVjdG9yQXR0YWNoU3RhdGUuQXR0YWNoZWQpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3Byb2plY3Rpb24gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHR0aGlzLnByb2plY3RvclN0YXRlID0gUHJvamVjdG9yQXR0YWNoU3RhdGUuRGV0YWNoZWQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLm93bihoYW5kbGUpO1xuXHRcdFx0dGhpcy5fYXR0YWNoSGFuZGxlID0gaGFuZGxlO1xuXG5cdFx0XHR0aGlzLl9wcm9qZWN0aW9uT3B0aW9ucyA9IHsgLi4udGhpcy5fcHJvamVjdGlvbk9wdGlvbnMsIC4uLnsgc3luYzogIXRoaXMuX2FzeW5jIH0gfTtcblxuXHRcdFx0c3dpdGNoICh0eXBlKSB7XG5cdFx0XHRcdGNhc2UgQXR0YWNoVHlwZS5BcHBlbmQ6XG5cdFx0XHRcdFx0dGhpcy5fcHJvamVjdGlvbiA9IGRvbS5hcHBlbmQodGhpcy5yb290LCB0aGlzLCB0aGlzLl9wcm9qZWN0aW9uT3B0aW9ucyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgQXR0YWNoVHlwZS5NZXJnZTpcblx0XHRcdFx0XHR0aGlzLl9wcm9qZWN0aW9uID0gZG9tLm1lcmdlKHRoaXMucm9vdCwgdGhpcywgdGhpcy5fcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGhpcy5fYXR0YWNoSGFuZGxlO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBQcm9qZWN0b3I7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3Rvck1peGluO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIFByb2plY3Rvci50cyIsImltcG9ydCBnbG9iYWwgZnJvbSAnLi4vc2hpbS9nbG9iYWwnO1xuaW1wb3J0IHtcblx0Q29yZVByb3BlcnRpZXMsXG5cdERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlLFxuXHRETm9kZSxcblx0Vk5vZGUsXG5cdFdOb2RlLFxuXHRQcm9qZWN0aW9uT3B0aW9ucyxcblx0UHJvamVjdGlvbixcblx0U3VwcG9ydGVkQ2xhc3NOYW1lLFxuXHRUcmFuc2l0aW9uU3RyYXRlZ3ksXG5cdFZOb2RlUHJvcGVydGllc1xufSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgZnJvbSBhcyBhcnJheUZyb20gfSBmcm9tICcuLi9zaGltL2FycmF5JztcbmltcG9ydCB7IGlzV05vZGUsIGlzVk5vZGUsIGlzRG9tVk5vZGUsIFZOT0RFLCBXTk9ERSB9IGZyb20gJy4vZCc7XG5pbXBvcnQgeyBpc1dpZGdldEJhc2VDb25zdHJ1Y3RvciB9IGZyb20gJy4vUmVnaXN0cnknO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLi4vc2hpbS9XZWFrTWFwJztcbmltcG9ydCBOb2RlSGFuZGxlciBmcm9tICcuL05vZGVIYW5kbGVyJztcbmltcG9ydCBSZWdpc3RyeUhhbmRsZXIgZnJvbSAnLi9SZWdpc3RyeUhhbmRsZXInO1xuXG5jb25zdCBOQU1FU1BBQ0VfVzMgPSAnaHR0cDovL3d3dy53My5vcmcvJztcbmNvbnN0IE5BTUVTUEFDRV9TVkcgPSBOQU1FU1BBQ0VfVzMgKyAnMjAwMC9zdmcnO1xuY29uc3QgTkFNRVNQQUNFX1hMSU5LID0gTkFNRVNQQUNFX1czICsgJzE5OTkveGxpbmsnO1xuXG5jb25zdCBlbXB0eUFycmF5OiAoSW50ZXJuYWxXTm9kZSB8IEludGVybmFsVk5vZGUpW10gPSBbXTtcblxuY29uc3Qgbm9kZU9wZXJhdGlvbnMgPSBbJ2ZvY3VzJywgJ2JsdXInLCAnc2Nyb2xsSW50b1ZpZXcnLCAnY2xpY2snXTtcblxuZXhwb3J0IHR5cGUgUmVuZGVyUmVzdWx0ID0gRE5vZGU8YW55PiB8IEROb2RlPGFueT5bXTtcblxuaW50ZXJmYWNlIEluc3RhbmNlTWFwRGF0YSB7XG5cdHBhcmVudFZOb2RlOiBJbnRlcm5hbFZOb2RlO1xuXHRkbm9kZTogSW50ZXJuYWxXTm9kZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbnRlcm5hbFdOb2RlIGV4dGVuZHMgV05vZGU8RGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2U+IHtcblx0LyoqXG5cdCAqIFRoZSBpbnN0YW5jZSBvZiB0aGUgd2lkZ2V0XG5cdCAqL1xuXHRpbnN0YW5jZTogRGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2U7XG5cblx0LyoqXG5cdCAqIFRoZSByZW5kZXJlZCBETm9kZXMgZnJvbSB0aGUgaW5zdGFuY2Vcblx0ICovXG5cdHJlbmRlcmVkOiBJbnRlcm5hbEROb2RlW107XG5cblx0LyoqXG5cdCAqIENvcmUgcHJvcGVydGllcyB0aGF0IGFyZSB1c2VkIGJ5IHRoZSB3aWRnZXQgY29yZSBzeXN0ZW1cblx0ICovXG5cdGNvcmVQcm9wZXJ0aWVzOiBDb3JlUHJvcGVydGllcztcblxuXHQvKipcblx0ICogQ2hpbGRyZW4gZm9yIHRoZSBXTm9kZVxuXHQgKi9cblx0Y2hpbGRyZW46IEludGVybmFsRE5vZGVbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbnRlcm5hbFZOb2RlIGV4dGVuZHMgVk5vZGUge1xuXHQvKipcblx0ICogQ2hpbGRyZW4gZm9yIHRoZSBWTm9kZVxuXHQgKi9cblx0Y2hpbGRyZW4/OiBJbnRlcm5hbEROb2RlW107XG5cblx0aW5zZXJ0ZWQ/OiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBCYWcgdXNlZCB0byBzdGlsbCBkZWNvcmF0ZSBwcm9wZXJ0aWVzIG9uIGEgZGVmZXJyZWQgcHJvcGVydGllcyBjYWxsYmFja1xuXHQgKi9cblx0ZGVjb3JhdGVkRGVmZXJyZWRQcm9wZXJ0aWVzPzogVk5vZGVQcm9wZXJ0aWVzO1xuXG5cdC8qKlxuXHQgKiBET00gZWxlbWVudFxuXHQgKi9cblx0ZG9tTm9kZT86IEVsZW1lbnQgfCBUZXh0O1xufVxuXG5leHBvcnQgdHlwZSBJbnRlcm5hbEROb2RlID0gSW50ZXJuYWxWTm9kZSB8IEludGVybmFsV05vZGU7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVuZGVyUXVldWUge1xuXHRpbnN0YW5jZTogRGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2U7XG5cdGRlcHRoOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2lkZ2V0RGF0YSB7XG5cdG9uRGV0YWNoOiAoKSA9PiB2b2lkO1xuXHRvbkF0dGFjaDogKCkgPT4gdm9pZDtcblx0ZGlydHk6IGJvb2xlYW47XG5cdHJlZ2lzdHJ5OiAoKSA9PiBSZWdpc3RyeUhhbmRsZXI7XG5cdG5vZGVIYW5kbGVyOiBOb2RlSGFuZGxlcjtcblx0Y29yZVByb3BlcnRpZXM6IENvcmVQcm9wZXJ0aWVzO1xuXHRpbnZhbGlkYXRlPzogRnVuY3Rpb247XG5cdHJlbmRlcmluZzogYm9vbGVhbjtcblx0aW5wdXRQcm9wZXJ0aWVzOiBhbnk7XG59XG5cbmludGVyZmFjZSBQcm9qZWN0b3JTdGF0ZSB7XG5cdGRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzOiBGdW5jdGlvbltdO1xuXHRhZnRlclJlbmRlckNhbGxiYWNrczogRnVuY3Rpb25bXTtcblx0bm9kZU1hcDogV2Vha01hcDxOb2RlLCBXZWFrTWFwPEZ1bmN0aW9uLCBFdmVudExpc3RlbmVyPj47XG5cdHJlbmRlclNjaGVkdWxlZD86IG51bWJlcjtcblx0cmVuZGVyUXVldWU6IFJlbmRlclF1ZXVlW107XG5cdG1lcmdlOiBib29sZWFuO1xuXHRtZXJnZUVsZW1lbnQ/OiBOb2RlO1xufVxuXG5leHBvcnQgY29uc3Qgd2lkZ2V0SW5zdGFuY2VNYXAgPSBuZXcgV2Vha01hcDxhbnksIFdpZGdldERhdGE+KCk7XG5cbmNvbnN0IGluc3RhbmNlTWFwID0gbmV3IFdlYWtNYXA8RGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2UsIEluc3RhbmNlTWFwRGF0YT4oKTtcbmNvbnN0IG5leHRTaWJsaW5nTWFwID0gbmV3IFdlYWtNYXA8RGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2UsIEludGVybmFsRE5vZGVbXT4oKTtcbmNvbnN0IHByb2plY3RvclN0YXRlTWFwID0gbmV3IFdlYWtNYXA8RGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2UsIFByb2plY3RvclN0YXRlPigpO1xuXG5mdW5jdGlvbiBzYW1lKGRub2RlMTogSW50ZXJuYWxETm9kZSwgZG5vZGUyOiBJbnRlcm5hbEROb2RlKSB7XG5cdGlmIChpc1ZOb2RlKGRub2RlMSkgJiYgaXNWTm9kZShkbm9kZTIpKSB7XG5cdFx0aWYgKGlzRG9tVk5vZGUoZG5vZGUxKSB8fCBpc0RvbVZOb2RlKGRub2RlMikpIHtcblx0XHRcdGlmIChkbm9kZTEuZG9tTm9kZSAhPT0gZG5vZGUyLmRvbU5vZGUpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoZG5vZGUxLnRhZyAhPT0gZG5vZGUyLnRhZykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRpZiAoZG5vZGUxLnByb3BlcnRpZXMua2V5ICE9PSBkbm9kZTIucHJvcGVydGllcy5rZXkpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gZWxzZSBpZiAoaXNXTm9kZShkbm9kZTEpICYmIGlzV05vZGUoZG5vZGUyKSkge1xuXHRcdGlmIChkbm9kZTEuaW5zdGFuY2UgPT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZG5vZGUyLndpZGdldENvbnN0cnVjdG9yID09PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRpZiAoZG5vZGUxLndpZGdldENvbnN0cnVjdG9yICE9PSBkbm9kZTIud2lkZ2V0Q29uc3RydWN0b3IpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0aWYgKGRub2RlMS5wcm9wZXJ0aWVzLmtleSAhPT0gZG5vZGUyLnByb3BlcnRpZXMua2V5KSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn1cblxuY29uc3QgbWlzc2luZ1RyYW5zaXRpb24gPSBmdW5jdGlvbigpIHtcblx0dGhyb3cgbmV3IEVycm9yKCdQcm92aWRlIGEgdHJhbnNpdGlvbnMgb2JqZWN0IHRvIHRoZSBwcm9qZWN0aW9uT3B0aW9ucyB0byBkbyBhbmltYXRpb25zJyk7XG59O1xuXG5mdW5jdGlvbiBnZXRQcm9qZWN0aW9uT3B0aW9ucyhcblx0cHJvamVjdG9yT3B0aW9uczogUGFydGlhbDxQcm9qZWN0aW9uT3B0aW9ucz4sXG5cdHByb2plY3Rvckluc3RhbmNlOiBEZWZhdWx0V2lkZ2V0QmFzZUludGVyZmFjZVxuKTogUHJvamVjdGlvbk9wdGlvbnMge1xuXHRjb25zdCBkZWZhdWx0czogUGFydGlhbDxQcm9qZWN0aW9uT3B0aW9ucz4gPSB7XG5cdFx0bmFtZXNwYWNlOiB1bmRlZmluZWQsXG5cdFx0c3R5bGVBcHBseWVyOiBmdW5jdGlvbihkb21Ob2RlOiBIVE1MRWxlbWVudCwgc3R5bGVOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcblx0XHRcdChkb21Ob2RlLnN0eWxlIGFzIGFueSlbc3R5bGVOYW1lXSA9IHZhbHVlO1xuXHRcdH0sXG5cdFx0dHJhbnNpdGlvbnM6IHtcblx0XHRcdGVudGVyOiBtaXNzaW5nVHJhbnNpdGlvbixcblx0XHRcdGV4aXQ6IG1pc3NpbmdUcmFuc2l0aW9uXG5cdFx0fSxcblx0XHRkZXB0aDogMCxcblx0XHRtZXJnZTogZmFsc2UsXG5cdFx0c3luYzogZmFsc2UsXG5cdFx0cHJvamVjdG9ySW5zdGFuY2Vcblx0fTtcblx0cmV0dXJuIHsgLi4uZGVmYXVsdHMsIC4uLnByb2plY3Rvck9wdGlvbnMgfSBhcyBQcm9qZWN0aW9uT3B0aW9ucztcbn1cblxuZnVuY3Rpb24gY2hlY2tTdHlsZVZhbHVlKHN0eWxlVmFsdWU6IE9iamVjdCkge1xuXHRpZiAodHlwZW9mIHN0eWxlVmFsdWUgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdTdHlsZSB2YWx1ZXMgbXVzdCBiZSBzdHJpbmdzJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlRXZlbnQoXG5cdGRvbU5vZGU6IE5vZGUsXG5cdGV2ZW50TmFtZTogc3RyaW5nLFxuXHRjdXJyZW50VmFsdWU6IEZ1bmN0aW9uLFxuXHRwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnMsXG5cdGJpbmQ6IGFueSxcblx0cHJldmlvdXNWYWx1ZT86IEZ1bmN0aW9uXG4pIHtcblx0Y29uc3QgcHJvamVjdG9yU3RhdGUgPSBwcm9qZWN0b3JTdGF0ZU1hcC5nZXQocHJvamVjdGlvbk9wdGlvbnMucHJvamVjdG9ySW5zdGFuY2UpITtcblx0Y29uc3QgZXZlbnRNYXAgPSBwcm9qZWN0b3JTdGF0ZS5ub2RlTWFwLmdldChkb21Ob2RlKSB8fCBuZXcgV2Vha01hcCgpO1xuXG5cdGlmIChwcmV2aW91c1ZhbHVlKSB7XG5cdFx0Y29uc3QgcHJldmlvdXNFdmVudCA9IGV2ZW50TWFwLmdldChwcmV2aW91c1ZhbHVlKTtcblx0XHRkb21Ob2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBwcmV2aW91c0V2ZW50KTtcblx0fVxuXG5cdGxldCBjYWxsYmFjayA9IGN1cnJlbnRWYWx1ZS5iaW5kKGJpbmQpO1xuXG5cdGlmIChldmVudE5hbWUgPT09ICdpbnB1dCcpIHtcblx0XHRjYWxsYmFjayA9IGZ1bmN0aW9uKHRoaXM6IGFueSwgZXZ0OiBFdmVudCkge1xuXHRcdFx0Y3VycmVudFZhbHVlLmNhbGwodGhpcywgZXZ0KTtcblx0XHRcdChldnQudGFyZ2V0IGFzIGFueSlbJ29uaW5wdXQtdmFsdWUnXSA9IChldnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuXHRcdH0uYmluZChiaW5kKTtcblx0fVxuXG5cdGRvbU5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKTtcblx0ZXZlbnRNYXAuc2V0KGN1cnJlbnRWYWx1ZSwgY2FsbGJhY2spO1xuXHRwcm9qZWN0b3JTdGF0ZS5ub2RlTWFwLnNldChkb21Ob2RlLCBldmVudE1hcCk7XG59XG5cbmZ1bmN0aW9uIGFkZENsYXNzZXMoZG9tTm9kZTogRWxlbWVudCwgY2xhc3NlczogU3VwcG9ydGVkQ2xhc3NOYW1lKSB7XG5cdGlmIChjbGFzc2VzKSB7XG5cdFx0Y29uc3QgY2xhc3NOYW1lcyA9IGNsYXNzZXMuc3BsaXQoJyAnKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNsYXNzTmFtZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGRvbU5vZGUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWVzW2ldKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3Nlcyhkb21Ob2RlOiBFbGVtZW50LCBjbGFzc2VzOiBTdXBwb3J0ZWRDbGFzc05hbWUpIHtcblx0aWYgKGNsYXNzZXMpIHtcblx0XHRjb25zdCBjbGFzc05hbWVzID0gY2xhc3Nlcy5zcGxpdCgnICcpO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3NOYW1lcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0ZG9tTm9kZS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZXNbaV0pO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBidWlsZFByZXZpb3VzUHJvcGVydGllcyhkb21Ob2RlOiBhbnksIHByZXZpb3VzOiBJbnRlcm5hbFZOb2RlLCBjdXJyZW50OiBJbnRlcm5hbFZOb2RlKSB7XG5cdGNvbnN0IHsgZGlmZlR5cGUsIHByb3BlcnRpZXMsIGF0dHJpYnV0ZXMgfSA9IGN1cnJlbnQ7XG5cdGlmICghZGlmZlR5cGUgfHwgZGlmZlR5cGUgPT09ICd2ZG9tJykge1xuXHRcdHJldHVybiB7IHByb3BlcnRpZXM6IHByZXZpb3VzLnByb3BlcnRpZXMsIGF0dHJpYnV0ZXM6IHByZXZpb3VzLmF0dHJpYnV0ZXMsIGV2ZW50czogcHJldmlvdXMuZXZlbnRzIH07XG5cdH0gZWxzZSBpZiAoZGlmZlR5cGUgPT09ICdub25lJykge1xuXHRcdHJldHVybiB7IHByb3BlcnRpZXM6IHt9LCBhdHRyaWJ1dGVzOiBwcmV2aW91cy5hdHRyaWJ1dGVzID8ge30gOiB1bmRlZmluZWQsIGV2ZW50czogcHJldmlvdXMuZXZlbnRzIH07XG5cdH1cblx0bGV0IG5ld1Byb3BlcnRpZXM6IGFueSA9IHtcblx0XHRwcm9wZXJ0aWVzOiB7fVxuXHR9O1xuXHRpZiAoYXR0cmlidXRlcykge1xuXHRcdG5ld1Byb3BlcnRpZXMuYXR0cmlidXRlcyA9IHt9O1xuXHRcdG5ld1Byb3BlcnRpZXMuZXZlbnRzID0gcHJldmlvdXMuZXZlbnRzO1xuXHRcdE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLmZvckVhY2goKHByb3BOYW1lKSA9PiB7XG5cdFx0XHRuZXdQcm9wZXJ0aWVzLnByb3BlcnRpZXNbcHJvcE5hbWVdID0gZG9tTm9kZVtwcm9wTmFtZV07XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaCgoYXR0ck5hbWUpID0+IHtcblx0XHRcdG5ld1Byb3BlcnRpZXMuYXR0cmlidXRlc1thdHRyTmFtZV0gPSBkb21Ob2RlLmdldEF0dHJpYnV0ZShhdHRyTmFtZSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIG5ld1Byb3BlcnRpZXM7XG5cdH1cblx0bmV3UHJvcGVydGllcy5wcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMocHJvcGVydGllcykucmVkdWNlKFxuXHRcdChwcm9wcywgcHJvcGVydHkpID0+IHtcblx0XHRcdHByb3BzW3Byb3BlcnR5XSA9IGRvbU5vZGUuZ2V0QXR0cmlidXRlKHByb3BlcnR5KSB8fCBkb21Ob2RlW3Byb3BlcnR5XTtcblx0XHRcdHJldHVybiBwcm9wcztcblx0XHR9LFxuXHRcdHt9IGFzIGFueVxuXHQpO1xuXHRyZXR1cm4gbmV3UHJvcGVydGllcztcbn1cblxuZnVuY3Rpb24gbm9kZU9wZXJhdGlvbihcblx0cHJvcE5hbWU6IHN0cmluZyxcblx0cHJvcFZhbHVlOiBhbnksXG5cdHByZXZpb3VzVmFsdWU6IGFueSxcblx0ZG9tTm9kZTogRWxlbWVudCxcblx0cHJvamVjdGlvbk9wdGlvbnM6IFByb2plY3Rpb25PcHRpb25zXG4pOiB2b2lkIHtcblx0bGV0IHJlc3VsdDtcblx0aWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXN1bHQgPSBwcm9wVmFsdWUoKTtcblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSBwcm9wVmFsdWUgJiYgIXByZXZpb3VzVmFsdWU7XG5cdH1cblx0aWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuXHRcdGNvbnN0IHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKSE7XG5cdFx0cHJvamVjdG9yU3RhdGUuZGVmZXJyZWRSZW5kZXJDYWxsYmFja3MucHVzaCgoKSA9PiB7XG5cdFx0XHQoZG9tTm9kZSBhcyBhbnkpW3Byb3BOYW1lXSgpO1xuXHRcdH0pO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU9ycGhhbmVkRXZlbnRzKFxuXHRkb21Ob2RlOiBFbGVtZW50LFxuXHRwcmV2aW91c1Byb3BlcnRpZXM6IFZOb2RlUHJvcGVydGllcyxcblx0cHJvcGVydGllczogVk5vZGVQcm9wZXJ0aWVzLFxuXHRwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnMsXG5cdG9ubHlFdmVudHM6IGJvb2xlYW4gPSBmYWxzZVxuKSB7XG5cdGNvbnN0IHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKSE7XG5cdGNvbnN0IGV2ZW50TWFwID0gcHJvamVjdG9yU3RhdGUubm9kZU1hcC5nZXQoZG9tTm9kZSk7XG5cdGlmIChldmVudE1hcCkge1xuXHRcdE9iamVjdC5rZXlzKHByZXZpb3VzUHJvcGVydGllcykuZm9yRWFjaCgocHJvcE5hbWUpID0+IHtcblx0XHRcdGNvbnN0IGlzRXZlbnQgPSBwcm9wTmFtZS5zdWJzdHIoMCwgMikgPT09ICdvbicgfHwgb25seUV2ZW50cztcblx0XHRcdGNvbnN0IGV2ZW50TmFtZSA9IG9ubHlFdmVudHMgPyBwcm9wTmFtZSA6IHByb3BOYW1lLnN1YnN0cigyKTtcblx0XHRcdGlmIChpc0V2ZW50ICYmICFwcm9wZXJ0aWVzW3Byb3BOYW1lXSkge1xuXHRcdFx0XHRjb25zdCBldmVudENhbGxiYWNrID0gZXZlbnRNYXAuZ2V0KHByZXZpb3VzUHJvcGVydGllc1twcm9wTmFtZV0pO1xuXHRcdFx0XHRpZiAoZXZlbnRDYWxsYmFjaykge1xuXHRcdFx0XHRcdGRvbU5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50Q2FsbGJhY2spO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlKGRvbU5vZGU6IEVsZW1lbnQsIGF0dHJOYW1lOiBzdHJpbmcsIGF0dHJWYWx1ZTogc3RyaW5nLCBwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnMpIHtcblx0aWYgKHByb2plY3Rpb25PcHRpb25zLm5hbWVzcGFjZSA9PT0gTkFNRVNQQUNFX1NWRyAmJiBhdHRyTmFtZSA9PT0gJ2hyZWYnKSB7XG5cdFx0ZG9tTm9kZS5zZXRBdHRyaWJ1dGVOUyhOQU1FU1BBQ0VfWExJTkssIGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuXHR9IGVsc2UgaWYgKChhdHRyTmFtZSA9PT0gJ3JvbGUnICYmIGF0dHJWYWx1ZSA9PT0gJycpIHx8IGF0dHJWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0ZG9tTm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuXHR9IGVsc2Uge1xuXHRcdGRvbU5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZXMoXG5cdGRvbU5vZGU6IEVsZW1lbnQsXG5cdHByZXZpb3VzQXR0cmlidXRlczogeyBbaW5kZXg6IHN0cmluZ106IHN0cmluZyB9LFxuXHRhdHRyaWJ1dGVzOiB7IFtpbmRleDogc3RyaW5nXTogc3RyaW5nIH0sXG5cdHByb2plY3Rpb25PcHRpb25zOiBQcm9qZWN0aW9uT3B0aW9uc1xuKSB7XG5cdGNvbnN0IGF0dHJOYW1lcyA9IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpO1xuXHRjb25zdCBhdHRyQ291bnQgPSBhdHRyTmFtZXMubGVuZ3RoO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJDb3VudDsgaSsrKSB7XG5cdFx0Y29uc3QgYXR0ck5hbWUgPSBhdHRyTmFtZXNbaV07XG5cdFx0Y29uc3QgYXR0clZhbHVlID0gYXR0cmlidXRlc1thdHRyTmFtZV07XG5cdFx0Y29uc3QgcHJldmlvdXNBdHRyVmFsdWUgPSBwcmV2aW91c0F0dHJpYnV0ZXNbYXR0ck5hbWVdO1xuXHRcdGlmIChhdHRyVmFsdWUgIT09IHByZXZpb3VzQXR0clZhbHVlKSB7XG5cdFx0XHR1cGRhdGVBdHRyaWJ1dGUoZG9tTm9kZSwgYXR0ck5hbWUsIGF0dHJWYWx1ZSwgcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVQcm9wZXJ0aWVzKFxuXHRkb21Ob2RlOiBFbGVtZW50LFxuXHRwcmV2aW91c1Byb3BlcnRpZXM6IFZOb2RlUHJvcGVydGllcyxcblx0cHJvcGVydGllczogVk5vZGVQcm9wZXJ0aWVzLFxuXHRwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnMsXG5cdGluY2x1ZGVzRXZlbnRzQW5kQXR0cmlidXRlcyA9IHRydWVcbikge1xuXHRsZXQgcHJvcGVydGllc1VwZGF0ZWQgPSBmYWxzZTtcblx0Y29uc3QgcHJvcE5hbWVzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyk7XG5cdGNvbnN0IHByb3BDb3VudCA9IHByb3BOYW1lcy5sZW5ndGg7XG5cdGlmIChwcm9wTmFtZXMuaW5kZXhPZignY2xhc3NlcycpID09PSAtMSAmJiBwcmV2aW91c1Byb3BlcnRpZXMuY2xhc3Nlcykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHByZXZpb3VzUHJvcGVydGllcy5jbGFzc2VzKSkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwcmV2aW91c1Byb3BlcnRpZXMuY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRyZW1vdmVDbGFzc2VzKGRvbU5vZGUsIHByZXZpb3VzUHJvcGVydGllcy5jbGFzc2VzW2ldKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlQ2xhc3Nlcyhkb21Ob2RlLCBwcmV2aW91c1Byb3BlcnRpZXMuY2xhc3Nlcyk7XG5cdFx0fVxuXHR9XG5cblx0aW5jbHVkZXNFdmVudHNBbmRBdHRyaWJ1dGVzICYmIHJlbW92ZU9ycGhhbmVkRXZlbnRzKGRvbU5vZGUsIHByZXZpb3VzUHJvcGVydGllcywgcHJvcGVydGllcywgcHJvamVjdGlvbk9wdGlvbnMpO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcENvdW50OyBpKyspIHtcblx0XHRjb25zdCBwcm9wTmFtZSA9IHByb3BOYW1lc1tpXTtcblx0XHRsZXQgcHJvcFZhbHVlID0gcHJvcGVydGllc1twcm9wTmFtZV07XG5cdFx0Y29uc3QgcHJldmlvdXNWYWx1ZSA9IHByZXZpb3VzUHJvcGVydGllcyFbcHJvcE5hbWVdO1xuXHRcdGlmIChwcm9wTmFtZSA9PT0gJ2NsYXNzZXMnKSB7XG5cdFx0XHRjb25zdCBwcmV2aW91c0NsYXNzZXMgPSBBcnJheS5pc0FycmF5KHByZXZpb3VzVmFsdWUpID8gcHJldmlvdXNWYWx1ZSA6IFtwcmV2aW91c1ZhbHVlXTtcblx0XHRcdGNvbnN0IGN1cnJlbnRDbGFzc2VzID0gQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpID8gcHJvcFZhbHVlIDogW3Byb3BWYWx1ZV07XG5cdFx0XHRpZiAocHJldmlvdXNDbGFzc2VzICYmIHByZXZpb3VzQ2xhc3Nlcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGlmICghcHJvcFZhbHVlIHx8IHByb3BWYWx1ZS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHByZXZpb3VzQ2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0cmVtb3ZlQ2xhc3Nlcyhkb21Ob2RlLCBwcmV2aW91c0NsYXNzZXNbaV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb25zdCBuZXdDbGFzc2VzOiAobnVsbCB8IHVuZGVmaW5lZCB8IHN0cmluZylbXSA9IFsuLi5jdXJyZW50Q2xhc3Nlc107XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwcmV2aW91c0NsYXNzZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGNvbnN0IHByZXZpb3VzQ2xhc3NOYW1lID0gcHJldmlvdXNDbGFzc2VzW2ldO1xuXHRcdFx0XHRcdFx0aWYgKHByZXZpb3VzQ2xhc3NOYW1lKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGNsYXNzSW5kZXggPSBuZXdDbGFzc2VzLmluZGV4T2YocHJldmlvdXNDbGFzc05hbWUpO1xuXHRcdFx0XHRcdFx0XHRpZiAoY2xhc3NJbmRleCA9PT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0XHRyZW1vdmVDbGFzc2VzKGRvbU5vZGUsIHByZXZpb3VzQ2xhc3NOYW1lKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRuZXdDbGFzc2VzLnNwbGljZShjbGFzc0luZGV4LCAxKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG5ld0NsYXNzZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGFkZENsYXNzZXMoZG9tTm9kZSwgbmV3Q2xhc3Nlc1tpXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRDbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0YWRkQ2xhc3Nlcyhkb21Ob2RlLCBjdXJyZW50Q2xhc3Nlc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKG5vZGVPcGVyYXRpb25zLmluZGV4T2YocHJvcE5hbWUpICE9PSAtMSkge1xuXHRcdFx0bm9kZU9wZXJhdGlvbihwcm9wTmFtZSwgcHJvcFZhbHVlLCBwcmV2aW91c1ZhbHVlLCBkb21Ob2RlLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdFx0fSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gJ3N0eWxlcycpIHtcblx0XHRcdGNvbnN0IHN0eWxlTmFtZXMgPSBPYmplY3Qua2V5cyhwcm9wVmFsdWUpO1xuXHRcdFx0Y29uc3Qgc3R5bGVDb3VudCA9IHN0eWxlTmFtZXMubGVuZ3RoO1xuXHRcdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBzdHlsZUNvdW50OyBqKyspIHtcblx0XHRcdFx0Y29uc3Qgc3R5bGVOYW1lID0gc3R5bGVOYW1lc1tqXTtcblx0XHRcdFx0Y29uc3QgbmV3U3R5bGVWYWx1ZSA9IHByb3BWYWx1ZVtzdHlsZU5hbWVdO1xuXHRcdFx0XHRjb25zdCBvbGRTdHlsZVZhbHVlID0gcHJldmlvdXNWYWx1ZSAmJiBwcmV2aW91c1ZhbHVlW3N0eWxlTmFtZV07XG5cdFx0XHRcdGlmIChuZXdTdHlsZVZhbHVlID09PSBvbGRTdHlsZVZhbHVlKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0cHJvcGVydGllc1VwZGF0ZWQgPSB0cnVlO1xuXHRcdFx0XHRpZiAobmV3U3R5bGVWYWx1ZSkge1xuXHRcdFx0XHRcdGNoZWNrU3R5bGVWYWx1ZShuZXdTdHlsZVZhbHVlKTtcblx0XHRcdFx0XHRwcm9qZWN0aW9uT3B0aW9ucy5zdHlsZUFwcGx5ZXIhKGRvbU5vZGUgYXMgSFRNTEVsZW1lbnQsIHN0eWxlTmFtZSwgbmV3U3R5bGVWYWx1ZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cHJvamVjdGlvbk9wdGlvbnMuc3R5bGVBcHBseWVyIShkb21Ob2RlIGFzIEhUTUxFbGVtZW50LCBzdHlsZU5hbWUsICcnKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoIXByb3BWYWx1ZSAmJiB0eXBlb2YgcHJldmlvdXNWYWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0cHJvcFZhbHVlID0gJyc7XG5cdFx0XHR9XG5cdFx0XHRpZiAocHJvcE5hbWUgPT09ICd2YWx1ZScpIHtcblx0XHRcdFx0Y29uc3QgZG9tVmFsdWUgPSAoZG9tTm9kZSBhcyBhbnkpW3Byb3BOYW1lXTtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdGRvbVZhbHVlICE9PSBwcm9wVmFsdWUgJiZcblx0XHRcdFx0XHQoKGRvbU5vZGUgYXMgYW55KVsnb25pbnB1dC12YWx1ZSddXG5cdFx0XHRcdFx0XHQ/IGRvbVZhbHVlID09PSAoZG9tTm9kZSBhcyBhbnkpWydvbmlucHV0LXZhbHVlJ11cblx0XHRcdFx0XHRcdDogcHJvcFZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHQoZG9tTm9kZSBhcyBhbnkpW3Byb3BOYW1lXSA9IHByb3BWYWx1ZTtcblx0XHRcdFx0XHQoZG9tTm9kZSBhcyBhbnkpWydvbmlucHV0LXZhbHVlJ10gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHByb3BWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xuXHRcdFx0XHRcdHByb3BlcnRpZXNVcGRhdGVkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChwcm9wTmFtZSAhPT0gJ2tleScgJiYgcHJvcFZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XG5cdFx0XHRcdGNvbnN0IHR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuXHRcdFx0XHRpZiAodHlwZSA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wTmFtZS5sYXN0SW5kZXhPZignb24nLCAwKSA9PT0gMCAmJiBpbmNsdWRlc0V2ZW50c0FuZEF0dHJpYnV0ZXMpIHtcblx0XHRcdFx0XHR1cGRhdGVFdmVudChcblx0XHRcdFx0XHRcdGRvbU5vZGUsXG5cdFx0XHRcdFx0XHRwcm9wTmFtZS5zdWJzdHIoMiksXG5cdFx0XHRcdFx0XHRwcm9wVmFsdWUsXG5cdFx0XHRcdFx0XHRwcm9qZWN0aW9uT3B0aW9ucyxcblx0XHRcdFx0XHRcdHByb3BlcnRpZXMuYmluZCxcblx0XHRcdFx0XHRcdHByZXZpb3VzVmFsdWVcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIHByb3BOYW1lICE9PSAnaW5uZXJIVE1MJyAmJiBpbmNsdWRlc0V2ZW50c0FuZEF0dHJpYnV0ZXMpIHtcblx0XHRcdFx0XHR1cGRhdGVBdHRyaWJ1dGUoZG9tTm9kZSwgcHJvcE5hbWUsIHByb3BWYWx1ZSwgcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHByb3BOYW1lID09PSAnc2Nyb2xsTGVmdCcgfHwgcHJvcE5hbWUgPT09ICdzY3JvbGxUb3AnKSB7XG5cdFx0XHRcdFx0aWYgKChkb21Ob2RlIGFzIGFueSlbcHJvcE5hbWVdICE9PSBwcm9wVmFsdWUpIHtcblx0XHRcdFx0XHRcdChkb21Ob2RlIGFzIGFueSlbcHJvcE5hbWVdID0gcHJvcFZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQoZG9tTm9kZSBhcyBhbnkpW3Byb3BOYW1lXSA9IHByb3BWYWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRwcm9wZXJ0aWVzVXBkYXRlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiBwcm9wZXJ0aWVzVXBkYXRlZDtcbn1cblxuZnVuY3Rpb24gZmluZEluZGV4T2ZDaGlsZChjaGlsZHJlbjogSW50ZXJuYWxETm9kZVtdLCBzYW1lQXM6IEludGVybmFsRE5vZGUsIHN0YXJ0OiBudW1iZXIpIHtcblx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAoc2FtZShjaGlsZHJlbltpXSwgc2FtZUFzKSkge1xuXHRcdFx0cmV0dXJuIGk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiAtMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvUGFyZW50Vk5vZGUoZG9tTm9kZTogRWxlbWVudCk6IEludGVybmFsVk5vZGUge1xuXHRyZXR1cm4ge1xuXHRcdHRhZzogJycsXG5cdFx0cHJvcGVydGllczoge30sXG5cdFx0Y2hpbGRyZW46IHVuZGVmaW5lZCxcblx0XHRkb21Ob2RlLFxuXHRcdHR5cGU6IFZOT0RFXG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1RleHRWTm9kZShkYXRhOiBhbnkpOiBJbnRlcm5hbFZOb2RlIHtcblx0cmV0dXJuIHtcblx0XHR0YWc6ICcnLFxuXHRcdHByb3BlcnRpZXM6IHt9LFxuXHRcdGNoaWxkcmVuOiB1bmRlZmluZWQsXG5cdFx0dGV4dDogYCR7ZGF0YX1gLFxuXHRcdGRvbU5vZGU6IHVuZGVmaW5lZCxcblx0XHR0eXBlOiBWTk9ERVxuXHR9O1xufVxuXG5mdW5jdGlvbiB0b0ludGVybmFsV05vZGUoaW5zdGFuY2U6IERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlLCBpbnN0YW5jZURhdGE6IFdpZGdldERhdGEpOiBJbnRlcm5hbFdOb2RlIHtcblx0cmV0dXJuIHtcblx0XHRpbnN0YW5jZSxcblx0XHRyZW5kZXJlZDogW10sXG5cdFx0Y29yZVByb3BlcnRpZXM6IGluc3RhbmNlRGF0YS5jb3JlUHJvcGVydGllcyxcblx0XHRjaGlsZHJlbjogaW5zdGFuY2UuY2hpbGRyZW4gYXMgYW55LFxuXHRcdHdpZGdldENvbnN0cnVjdG9yOiBpbnN0YW5jZS5jb25zdHJ1Y3RvciBhcyBhbnksXG5cdFx0cHJvcGVydGllczogaW5zdGFuY2VEYXRhLmlucHV0UHJvcGVydGllcyxcblx0XHR0eXBlOiBXTk9ERVxuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyQW5kRGVjb3JhdGVDaGlsZHJlbihcblx0Y2hpbGRyZW46IHVuZGVmaW5lZCB8IEROb2RlIHwgRE5vZGVbXSxcblx0aW5zdGFuY2U6IERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlXG4pOiBJbnRlcm5hbEROb2RlW10ge1xuXHRpZiAoY2hpbGRyZW4gPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBlbXB0eUFycmF5O1xuXHR9XG5cdGNoaWxkcmVuID0gQXJyYXkuaXNBcnJheShjaGlsZHJlbikgPyBjaGlsZHJlbiA6IFtjaGlsZHJlbl07XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICkge1xuXHRcdGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV0gYXMgSW50ZXJuYWxETm9kZTtcblx0XHRpZiAoY2hpbGQgPT09IHVuZGVmaW5lZCB8fCBjaGlsZCA9PT0gbnVsbCkge1xuXHRcdFx0Y2hpbGRyZW4uc3BsaWNlKGksIDEpO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgY2hpbGQgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRjaGlsZHJlbltpXSA9IHRvVGV4dFZOb2RlKGNoaWxkKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGlzVk5vZGUoY2hpbGQpKSB7XG5cdFx0XHRcdGlmIChjaGlsZC5wcm9wZXJ0aWVzLmJpbmQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdChjaGlsZC5wcm9wZXJ0aWVzIGFzIGFueSkuYmluZCA9IGluc3RhbmNlO1xuXHRcdFx0XHRcdGlmIChjaGlsZC5jaGlsZHJlbiAmJiBjaGlsZC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRmaWx0ZXJBbmREZWNvcmF0ZUNoaWxkcmVuKGNoaWxkLmNoaWxkcmVuLCBpbnN0YW5jZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoIWNoaWxkLmNvcmVQcm9wZXJ0aWVzKSB7XG5cdFx0XHRcdFx0Y29uc3QgaW5zdGFuY2VEYXRhID0gd2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KGluc3RhbmNlKSE7XG5cdFx0XHRcdFx0Y2hpbGQuY29yZVByb3BlcnRpZXMgPSB7XG5cdFx0XHRcdFx0XHRiaW5kOiBpbnN0YW5jZSxcblx0XHRcdFx0XHRcdGJhc2VSZWdpc3RyeTogaW5zdGFuY2VEYXRhLmNvcmVQcm9wZXJ0aWVzLmJhc2VSZWdpc3RyeVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGNoaWxkLmNoaWxkcmVuICYmIGNoaWxkLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRmaWx0ZXJBbmREZWNvcmF0ZUNoaWxkcmVuKGNoaWxkLmNoaWxkcmVuLCBpbnN0YW5jZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aSsrO1xuXHR9XG5cdHJldHVybiBjaGlsZHJlbiBhcyBJbnRlcm5hbEROb2RlW107XG59XG5cbmZ1bmN0aW9uIG5vZGVBZGRlZChkbm9kZTogSW50ZXJuYWxETm9kZSwgdHJhbnNpdGlvbnM6IFRyYW5zaXRpb25TdHJhdGVneSkge1xuXHRpZiAoaXNWTm9kZShkbm9kZSkgJiYgZG5vZGUucHJvcGVydGllcykge1xuXHRcdGNvbnN0IGVudGVyQW5pbWF0aW9uID0gZG5vZGUucHJvcGVydGllcy5lbnRlckFuaW1hdGlvbjtcblx0XHRpZiAoZW50ZXJBbmltYXRpb24pIHtcblx0XHRcdGlmICh0eXBlb2YgZW50ZXJBbmltYXRpb24gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0ZW50ZXJBbmltYXRpb24oZG5vZGUuZG9tTm9kZSBhcyBFbGVtZW50LCBkbm9kZS5wcm9wZXJ0aWVzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRyYW5zaXRpb25zLmVudGVyKGRub2RlLmRvbU5vZGUgYXMgRWxlbWVudCwgZG5vZGUucHJvcGVydGllcywgZW50ZXJBbmltYXRpb24gYXMgc3RyaW5nKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbm9kZVRvUmVtb3ZlKGRub2RlOiBJbnRlcm5hbEROb2RlLCB0cmFuc2l0aW9uczogVHJhbnNpdGlvblN0cmF0ZWd5LCBwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnMpIHtcblx0aWYgKGlzV05vZGUoZG5vZGUpKSB7XG5cdFx0Y29uc3QgaXRlbSA9IGluc3RhbmNlTWFwLmdldChkbm9kZS5pbnN0YW5jZSk7XG5cdFx0Y29uc3QgcmVuZGVyZWQgPSAoaXRlbSA/IGl0ZW0uZG5vZGUucmVuZGVyZWQgOiBkbm9kZS5yZW5kZXJlZCkgfHwgZW1wdHlBcnJheTtcblx0XHRpZiAoZG5vZGUuaW5zdGFuY2UpIHtcblx0XHRcdGNvbnN0IGluc3RhbmNlRGF0YSA9IHdpZGdldEluc3RhbmNlTWFwLmdldChkbm9kZS5pbnN0YW5jZSkhO1xuXHRcdFx0aW5zdGFuY2VEYXRhLm9uRGV0YWNoKCk7XG5cdFx0XHRpbnN0YW5jZU1hcC5kZWxldGUoZG5vZGUuaW5zdGFuY2UpO1xuXHRcdH1cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRub2RlVG9SZW1vdmUocmVuZGVyZWRbaV0sIHRyYW5zaXRpb25zLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IGRvbU5vZGUgPSBkbm9kZS5kb21Ob2RlO1xuXHRcdGNvbnN0IHByb3BlcnRpZXMgPSBkbm9kZS5wcm9wZXJ0aWVzO1xuXHRcdGlmIChkbm9kZS5jaGlsZHJlbiAmJiBkbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdG5vZGVUb1JlbW92ZShkbm9kZS5jaGlsZHJlbltpXSwgdHJhbnNpdGlvbnMsIHByb2plY3Rpb25PcHRpb25zKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Y29uc3QgZXhpdEFuaW1hdGlvbiA9IHByb3BlcnRpZXMuZXhpdEFuaW1hdGlvbjtcblx0XHRpZiAocHJvcGVydGllcyAmJiBleGl0QW5pbWF0aW9uKSB7XG5cdFx0XHQoZG9tTm9kZSBhcyBIVE1MRWxlbWVudCkuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcblx0XHRcdGNvbnN0IHJlbW92ZURvbU5vZGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0ZG9tTm9kZSAmJiBkb21Ob2RlLnBhcmVudE5vZGUgJiYgZG9tTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRvbU5vZGUpO1xuXHRcdFx0XHRkbm9kZS5kb21Ob2RlID0gdW5kZWZpbmVkO1xuXHRcdFx0fTtcblx0XHRcdGlmICh0eXBlb2YgZXhpdEFuaW1hdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRleGl0QW5pbWF0aW9uKGRvbU5vZGUgYXMgRWxlbWVudCwgcmVtb3ZlRG9tTm9kZSwgcHJvcGVydGllcyk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRyYW5zaXRpb25zLmV4aXQoZG5vZGUuZG9tTm9kZSBhcyBFbGVtZW50LCBwcm9wZXJ0aWVzLCBleGl0QW5pbWF0aW9uIGFzIHN0cmluZywgcmVtb3ZlRG9tTm9kZSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZG9tTm9kZSAmJiBkb21Ob2RlLnBhcmVudE5vZGUgJiYgZG9tTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRvbU5vZGUpO1xuXHRcdGRub2RlLmRvbU5vZGUgPSB1bmRlZmluZWQ7XG5cdH1cbn1cblxuZnVuY3Rpb24gY2hlY2tEaXN0aW5ndWlzaGFibGUoXG5cdGNoaWxkTm9kZXM6IEludGVybmFsRE5vZGVbXSxcblx0aW5kZXhUb0NoZWNrOiBudW1iZXIsXG5cdHBhcmVudEluc3RhbmNlOiBEZWZhdWx0V2lkZ2V0QmFzZUludGVyZmFjZVxuKSB7XG5cdGNvbnN0IGNoaWxkTm9kZSA9IGNoaWxkTm9kZXNbaW5kZXhUb0NoZWNrXTtcblx0aWYgKGlzVk5vZGUoY2hpbGROb2RlKSAmJiAhY2hpbGROb2RlLnRhZykge1xuXHRcdHJldHVybjsgLy8gVGV4dCBub2RlcyBuZWVkIG5vdCBiZSBkaXN0aW5ndWlzaGFibGVcblx0fVxuXHRjb25zdCB7IGtleSB9ID0gY2hpbGROb2RlLnByb3BlcnRpZXM7XG5cblx0aWYgKGtleSA9PT0gdW5kZWZpbmVkIHx8IGtleSA9PT0gbnVsbCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKGkgIT09IGluZGV4VG9DaGVjaykge1xuXHRcdFx0XHRjb25zdCBub2RlID0gY2hpbGROb2Rlc1tpXTtcblx0XHRcdFx0aWYgKHNhbWUobm9kZSwgY2hpbGROb2RlKSkge1xuXHRcdFx0XHRcdGxldCBub2RlSWRlbnRpZmllcjogc3RyaW5nO1xuXHRcdFx0XHRcdGNvbnN0IHBhcmVudE5hbWUgPSAocGFyZW50SW5zdGFuY2UgYXMgYW55KS5jb25zdHJ1Y3Rvci5uYW1lIHx8ICd1bmtub3duJztcblx0XHRcdFx0XHRpZiAoaXNXTm9kZShjaGlsZE5vZGUpKSB7XG5cdFx0XHRcdFx0XHRub2RlSWRlbnRpZmllciA9IChjaGlsZE5vZGUud2lkZ2V0Q29uc3RydWN0b3IgYXMgYW55KS5uYW1lIHx8ICd1bmtub3duJztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bm9kZUlkZW50aWZpZXIgPSBjaGlsZE5vZGUudGFnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XHRcdGBBIHdpZGdldCAoJHtwYXJlbnROYW1lfSkgaGFzIGhhZCBhIGNoaWxkIGFkZGRlZCBvciByZW1vdmVkLCBidXQgdGhleSB3ZXJlIG5vdCBhYmxlIHRvIHVuaXF1ZWx5IGlkZW50aWZpZWQuIEl0IGlzIHJlY29tbWVuZGVkIHRvIHByb3ZpZGUgYSB1bmlxdWUgJ2tleScgcHJvcGVydHkgd2hlbiB1c2luZyB0aGUgc2FtZSB3aWRnZXQgb3IgZWxlbWVudCAoJHtub2RlSWRlbnRpZmllcn0pIG11bHRpcGxlIHRpbWVzIGFzIHNpYmxpbmdzYFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlQ2hpbGRyZW4oXG5cdHBhcmVudFZOb2RlOiBJbnRlcm5hbFZOb2RlLFxuXHRzaWJsaW5nczogSW50ZXJuYWxETm9kZVtdLFxuXHRvbGRDaGlsZHJlbjogSW50ZXJuYWxETm9kZVtdLFxuXHRuZXdDaGlsZHJlbjogSW50ZXJuYWxETm9kZVtdLFxuXHRwYXJlbnRJbnN0YW5jZTogRGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2UsXG5cdHByb2plY3Rpb25PcHRpb25zOiBQcm9qZWN0aW9uT3B0aW9uc1xuKSB7XG5cdG9sZENoaWxkcmVuID0gb2xkQ2hpbGRyZW4gfHwgZW1wdHlBcnJheTtcblx0bmV3Q2hpbGRyZW4gPSBuZXdDaGlsZHJlbjtcblx0Y29uc3Qgb2xkQ2hpbGRyZW5MZW5ndGggPSBvbGRDaGlsZHJlbi5sZW5ndGg7XG5cdGNvbnN0IG5ld0NoaWxkcmVuTGVuZ3RoID0gbmV3Q2hpbGRyZW4ubGVuZ3RoO1xuXHRjb25zdCB0cmFuc2l0aW9ucyA9IHByb2plY3Rpb25PcHRpb25zLnRyYW5zaXRpb25zITtcblx0Y29uc3QgcHJvamVjdG9yU3RhdGUgPSBwcm9qZWN0b3JTdGF0ZU1hcC5nZXQocHJvamVjdGlvbk9wdGlvbnMucHJvamVjdG9ySW5zdGFuY2UpITtcblx0cHJvamVjdGlvbk9wdGlvbnMgPSB7IC4uLnByb2plY3Rpb25PcHRpb25zLCBkZXB0aDogcHJvamVjdGlvbk9wdGlvbnMuZGVwdGggKyAxIH07XG5cdGxldCBvbGRJbmRleCA9IDA7XG5cdGxldCBuZXdJbmRleCA9IDA7XG5cdGxldCBpOiBudW1iZXI7XG5cdGxldCB0ZXh0VXBkYXRlZCA9IGZhbHNlO1xuXHR3aGlsZSAobmV3SW5kZXggPCBuZXdDaGlsZHJlbkxlbmd0aCkge1xuXHRcdGxldCBvbGRDaGlsZCA9IG9sZEluZGV4IDwgb2xkQ2hpbGRyZW5MZW5ndGggPyBvbGRDaGlsZHJlbltvbGRJbmRleF0gOiB1bmRlZmluZWQ7XG5cdFx0Y29uc3QgbmV3Q2hpbGQgPSBuZXdDaGlsZHJlbltuZXdJbmRleF07XG5cdFx0aWYgKGlzVk5vZGUobmV3Q2hpbGQpICYmIHR5cGVvZiBuZXdDaGlsZC5kZWZlcnJlZFByb3BlcnRpZXNDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0bmV3Q2hpbGQuaW5zZXJ0ZWQgPSBpc1ZOb2RlKG9sZENoaWxkKSAmJiBvbGRDaGlsZC5pbnNlcnRlZDtcblx0XHRcdGFkZERlZmVycmVkUHJvcGVydGllcyhuZXdDaGlsZCwgcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdH1cblx0XHRpZiAob2xkQ2hpbGQgIT09IHVuZGVmaW5lZCAmJiBzYW1lKG9sZENoaWxkLCBuZXdDaGlsZCkpIHtcblx0XHRcdG9sZEluZGV4Kys7XG5cdFx0XHRuZXdJbmRleCsrO1xuXHRcdFx0dGV4dFVwZGF0ZWQgPVxuXHRcdFx0XHR1cGRhdGVEb20oXG5cdFx0XHRcdFx0b2xkQ2hpbGQsXG5cdFx0XHRcdFx0bmV3Q2hpbGQsXG5cdFx0XHRcdFx0cHJvamVjdGlvbk9wdGlvbnMsXG5cdFx0XHRcdFx0cGFyZW50Vk5vZGUsXG5cdFx0XHRcdFx0cGFyZW50SW5zdGFuY2UsXG5cdFx0XHRcdFx0b2xkQ2hpbGRyZW4uc2xpY2Uob2xkSW5kZXgpLFxuXHRcdFx0XHRcdG5ld0NoaWxkcmVuLnNsaWNlKG5ld0luZGV4KVxuXHRcdFx0XHQpIHx8IHRleHRVcGRhdGVkO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZmluZE9sZEluZGV4ID0gZmluZEluZGV4T2ZDaGlsZChvbGRDaGlsZHJlbiwgbmV3Q2hpbGQsIG9sZEluZGV4ICsgMSk7XG5cdFx0Y29uc3QgYWRkQ2hpbGQgPSAoKSA9PiB7XG5cdFx0XHRsZXQgaW5zZXJ0QmVmb3JlRG9tTm9kZTogTm9kZSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblx0XHRcdGxldCBjaGlsZHJlbkFycmF5ID0gb2xkQ2hpbGRyZW47XG5cdFx0XHRsZXQgbmV4dEluZGV4ID0gb2xkSW5kZXggKyAxO1xuXHRcdFx0bGV0IGNoaWxkOiBJbnRlcm5hbEROb2RlID0gb2xkQ2hpbGRyZW5bb2xkSW5kZXhdO1xuXHRcdFx0aWYgKCFjaGlsZCkge1xuXHRcdFx0XHRjaGlsZCA9IHNpYmxpbmdzWzBdO1xuXHRcdFx0XHRuZXh0SW5kZXggPSAxO1xuXHRcdFx0XHRjaGlsZHJlbkFycmF5ID0gc2libGluZ3M7XG5cdFx0XHR9XG5cdFx0XHRpZiAoY2hpbGQpIHtcblx0XHRcdFx0bGV0IGluc2VydEJlZm9yZUNoaWxkcmVuID0gW2NoaWxkXTtcblx0XHRcdFx0d2hpbGUgKGluc2VydEJlZm9yZUNoaWxkcmVuLmxlbmd0aCkge1xuXHRcdFx0XHRcdGNvbnN0IGluc2VydEJlZm9yZSA9IGluc2VydEJlZm9yZUNoaWxkcmVuLnNoaWZ0KCkhO1xuXHRcdFx0XHRcdGlmIChpc1dOb2RlKGluc2VydEJlZm9yZSkpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGl0ZW0gPSBpbnN0YW5jZU1hcC5nZXQoaW5zZXJ0QmVmb3JlLmluc3RhbmNlKTtcblx0XHRcdFx0XHRcdGlmIChpdGVtICYmIGl0ZW0uZG5vZGUucmVuZGVyZWQpIHtcblx0XHRcdFx0XHRcdFx0aW5zZXJ0QmVmb3JlQ2hpbGRyZW4ucHVzaCguLi5pdGVtLmRub2RlLnJlbmRlcmVkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKGluc2VydEJlZm9yZS5kb21Ob2RlKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChpbnNlcnRCZWZvcmUuZG9tTm9kZS5wYXJlbnRFbGVtZW50ICE9PSBwYXJlbnRWTm9kZS5kb21Ob2RlKSB7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aW5zZXJ0QmVmb3JlRG9tTm9kZSA9IGluc2VydEJlZm9yZS5kb21Ob2RlO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGluc2VydEJlZm9yZUNoaWxkcmVuLmxlbmd0aCA9PT0gMCAmJiBjaGlsZHJlbkFycmF5W25leHRJbmRleF0pIHtcblx0XHRcdFx0XHRcdGluc2VydEJlZm9yZUNoaWxkcmVuLnB1c2goY2hpbGRyZW5BcnJheVtuZXh0SW5kZXhdKTtcblx0XHRcdFx0XHRcdG5leHRJbmRleCsrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRjcmVhdGVEb20oXG5cdFx0XHRcdG5ld0NoaWxkLFxuXHRcdFx0XHRwYXJlbnRWTm9kZSxcblx0XHRcdFx0bmV3Q2hpbGRyZW4uc2xpY2UobmV3SW5kZXggKyAxKSxcblx0XHRcdFx0aW5zZXJ0QmVmb3JlRG9tTm9kZSxcblx0XHRcdFx0cHJvamVjdGlvbk9wdGlvbnMsXG5cdFx0XHRcdHBhcmVudEluc3RhbmNlXG5cdFx0XHQpO1xuXHRcdFx0bm9kZUFkZGVkKG5ld0NoaWxkLCB0cmFuc2l0aW9ucyk7XG5cdFx0XHRjb25zdCBpbmRleFRvQ2hlY2sgPSBuZXdJbmRleDtcblx0XHRcdHByb2plY3RvclN0YXRlLmFmdGVyUmVuZGVyQ2FsbGJhY2tzLnB1c2goKCkgPT4ge1xuXHRcdFx0XHRjaGVja0Rpc3Rpbmd1aXNoYWJsZShuZXdDaGlsZHJlbiwgaW5kZXhUb0NoZWNrLCBwYXJlbnRJbnN0YW5jZSk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0aWYgKCFvbGRDaGlsZCB8fCBmaW5kT2xkSW5kZXggPT09IC0xKSB7XG5cdFx0XHRhZGRDaGlsZCgpO1xuXHRcdFx0bmV3SW5kZXgrKztcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlbW92ZUNoaWxkID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgaW5kZXhUb0NoZWNrID0gb2xkSW5kZXg7XG5cdFx0XHRwcm9qZWN0b3JTdGF0ZS5hZnRlclJlbmRlckNhbGxiYWNrcy5wdXNoKCgpID0+IHtcblx0XHRcdFx0Y2hlY2tEaXN0aW5ndWlzaGFibGUob2xkQ2hpbGRyZW4sIGluZGV4VG9DaGVjaywgcGFyZW50SW5zdGFuY2UpO1xuXHRcdFx0fSk7XG5cdFx0XHRpZiAoaXNXTm9kZShvbGRDaGlsZCkpIHtcblx0XHRcdFx0Y29uc3QgaXRlbSA9IGluc3RhbmNlTWFwLmdldChvbGRDaGlsZC5pbnN0YW5jZSk7XG5cdFx0XHRcdGlmIChpdGVtKSB7XG5cdFx0XHRcdFx0b2xkQ2hpbGQgPSBpdGVtLmRub2RlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRub2RlVG9SZW1vdmUob2xkQ2hpbGQhLCB0cmFuc2l0aW9ucywgcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdH07XG5cdFx0Y29uc3QgZmluZE5ld0luZGV4ID0gZmluZEluZGV4T2ZDaGlsZChuZXdDaGlsZHJlbiwgb2xkQ2hpbGQsIG5ld0luZGV4ICsgMSk7XG5cblx0XHRpZiAoZmluZE5ld0luZGV4ID09PSAtMSkge1xuXHRcdFx0cmVtb3ZlQ2hpbGQoKTtcblx0XHRcdG9sZEluZGV4Kys7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRhZGRDaGlsZCgpO1xuXHRcdHJlbW92ZUNoaWxkKCk7XG5cdFx0b2xkSW5kZXgrKztcblx0XHRuZXdJbmRleCsrO1xuXHR9XG5cdGlmIChvbGRDaGlsZHJlbkxlbmd0aCA+IG9sZEluZGV4KSB7XG5cdFx0Ly8gUmVtb3ZlIGNoaWxkIGZyYWdtZW50c1xuXHRcdGZvciAoaSA9IG9sZEluZGV4OyBpIDwgb2xkQ2hpbGRyZW5MZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgaW5kZXhUb0NoZWNrID0gaTtcblx0XHRcdHByb2plY3RvclN0YXRlLmFmdGVyUmVuZGVyQ2FsbGJhY2tzLnB1c2goKCkgPT4ge1xuXHRcdFx0XHRjaGVja0Rpc3Rpbmd1aXNoYWJsZShvbGRDaGlsZHJlbiwgaW5kZXhUb0NoZWNrLCBwYXJlbnRJbnN0YW5jZSk7XG5cdFx0XHR9KTtcblx0XHRcdGxldCBjaGlsZFRvUmVtb3ZlID0gb2xkQ2hpbGRyZW5baV07XG5cdFx0XHRpZiAoaXNXTm9kZShjaGlsZFRvUmVtb3ZlKSkge1xuXHRcdFx0XHRjb25zdCBpdGVtID0gaW5zdGFuY2VNYXAuZ2V0KGNoaWxkVG9SZW1vdmUuaW5zdGFuY2UpO1xuXHRcdFx0XHRpZiAoaXRlbSkge1xuXHRcdFx0XHRcdGNoaWxkVG9SZW1vdmUgPSBpdGVtLmRub2RlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRub2RlVG9SZW1vdmUoY2hpbGRUb1JlbW92ZSwgdHJhbnNpdGlvbnMsIHByb2plY3Rpb25PcHRpb25zKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRleHRVcGRhdGVkO1xufVxuXG5mdW5jdGlvbiBhZGRDaGlsZHJlbihcblx0cGFyZW50Vk5vZGU6IEludGVybmFsVk5vZGUsXG5cdGNoaWxkcmVuOiBJbnRlcm5hbEROb2RlW10gfCB1bmRlZmluZWQsXG5cdHByb2plY3Rpb25PcHRpb25zOiBQcm9qZWN0aW9uT3B0aW9ucyxcblx0cGFyZW50SW5zdGFuY2U6IERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlLFxuXHRpbnNlcnRCZWZvcmU6IE5vZGUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQsXG5cdGNoaWxkTm9kZXM/OiAoRWxlbWVudCB8IFRleHQpW11cbikge1xuXHRpZiAoY2hpbGRyZW4gPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKSE7XG5cdGlmIChwcm9qZWN0b3JTdGF0ZS5tZXJnZSAmJiBjaGlsZE5vZGVzID09PSB1bmRlZmluZWQpIHtcblx0XHRjaGlsZE5vZGVzID0gYXJyYXlGcm9tKHBhcmVudFZOb2RlLmRvbU5vZGUhLmNoaWxkTm9kZXMpIGFzIChFbGVtZW50IHwgVGV4dClbXTtcblx0fVxuXHRjb25zdCB0cmFuc2l0aW9ucyA9IHByb2plY3Rpb25PcHRpb25zLnRyYW5zaXRpb25zITtcblx0cHJvamVjdGlvbk9wdGlvbnMgPSB7IC4uLnByb2plY3Rpb25PcHRpb25zLCBkZXB0aDogcHJvamVjdGlvbk9wdGlvbnMuZGVwdGggKyAxIH07XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV07XG5cdFx0Y29uc3QgbmV4dFNpYmxpbmdzID0gY2hpbGRyZW4uc2xpY2UoaSArIDEpO1xuXG5cdFx0aWYgKGlzVk5vZGUoY2hpbGQpKSB7XG5cdFx0XHRpZiAocHJvamVjdG9yU3RhdGUubWVyZ2UgJiYgY2hpbGROb2Rlcykge1xuXHRcdFx0XHRsZXQgZG9tRWxlbWVudDogRWxlbWVudCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblx0XHRcdFx0d2hpbGUgKGNoaWxkLmRvbU5vZGUgPT09IHVuZGVmaW5lZCAmJiBjaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRkb21FbGVtZW50ID0gY2hpbGROb2Rlcy5zaGlmdCgpIGFzIEVsZW1lbnQ7XG5cdFx0XHRcdFx0aWYgKGRvbUVsZW1lbnQgJiYgZG9tRWxlbWVudC50YWdOYW1lID09PSAoY2hpbGQudGFnLnRvVXBwZXJDYXNlKCkgfHwgdW5kZWZpbmVkKSkge1xuXHRcdFx0XHRcdFx0Y2hpbGQuZG9tTm9kZSA9IGRvbUVsZW1lbnQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjcmVhdGVEb20oY2hpbGQsIHBhcmVudFZOb2RlLCBuZXh0U2libGluZ3MsIGluc2VydEJlZm9yZSwgcHJvamVjdGlvbk9wdGlvbnMsIHBhcmVudEluc3RhbmNlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y3JlYXRlRG9tKGNoaWxkLCBwYXJlbnRWTm9kZSwgbmV4dFNpYmxpbmdzLCBpbnNlcnRCZWZvcmUsIHByb2plY3Rpb25PcHRpb25zLCBwYXJlbnRJbnN0YW5jZSwgY2hpbGROb2Rlcyk7XG5cdFx0fVxuXHRcdG5vZGVBZGRlZChjaGlsZCwgdHJhbnNpdGlvbnMpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGluaXRQcm9wZXJ0aWVzQW5kQ2hpbGRyZW4oXG5cdGRvbU5vZGU6IEVsZW1lbnQsXG5cdGRub2RlOiBJbnRlcm5hbFZOb2RlLFxuXHRwYXJlbnRJbnN0YW5jZTogRGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2UsXG5cdHByb2plY3Rpb25PcHRpb25zOiBQcm9qZWN0aW9uT3B0aW9uc1xuKSB7XG5cdGFkZENoaWxkcmVuKGRub2RlLCBkbm9kZS5jaGlsZHJlbiwgcHJvamVjdGlvbk9wdGlvbnMsIHBhcmVudEluc3RhbmNlLCB1bmRlZmluZWQpO1xuXHRpZiAodHlwZW9mIGRub2RlLmRlZmVycmVkUHJvcGVydGllc0NhbGxiYWNrID09PSAnZnVuY3Rpb24nICYmIGRub2RlLmluc2VydGVkID09PSB1bmRlZmluZWQpIHtcblx0XHRhZGREZWZlcnJlZFByb3BlcnRpZXMoZG5vZGUsIHByb2plY3Rpb25PcHRpb25zKTtcblx0fVxuXG5cdGlmIChkbm9kZS5hdHRyaWJ1dGVzICYmIGRub2RlLmV2ZW50cykge1xuXHRcdHVwZGF0ZUF0dHJpYnV0ZXMoZG9tTm9kZSwge30sIGRub2RlLmF0dHJpYnV0ZXMsIHByb2plY3Rpb25PcHRpb25zKTtcblx0XHR1cGRhdGVQcm9wZXJ0aWVzKGRvbU5vZGUsIHt9LCBkbm9kZS5wcm9wZXJ0aWVzLCBwcm9qZWN0aW9uT3B0aW9ucywgZmFsc2UpO1xuXHRcdHJlbW92ZU9ycGhhbmVkRXZlbnRzKGRvbU5vZGUsIHt9LCBkbm9kZS5ldmVudHMsIHByb2plY3Rpb25PcHRpb25zLCB0cnVlKTtcblx0XHRjb25zdCBldmVudHMgPSBkbm9kZS5ldmVudHM7XG5cdFx0T2JqZWN0LmtleXMoZXZlbnRzKS5mb3JFYWNoKChldmVudCkgPT4ge1xuXHRcdFx0dXBkYXRlRXZlbnQoZG9tTm9kZSwgZXZlbnQsIGV2ZW50c1tldmVudF0sIHByb2plY3Rpb25PcHRpb25zLCBkbm9kZS5wcm9wZXJ0aWVzLmJpbmQpO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHVwZGF0ZVByb3BlcnRpZXMoZG9tTm9kZSwge30sIGRub2RlLnByb3BlcnRpZXMsIHByb2plY3Rpb25PcHRpb25zKTtcblx0fVxuXHRpZiAoZG5vZGUucHJvcGVydGllcy5rZXkgIT09IG51bGwgJiYgZG5vZGUucHJvcGVydGllcy5rZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdGNvbnN0IGluc3RhbmNlRGF0YSA9IHdpZGdldEluc3RhbmNlTWFwLmdldChwYXJlbnRJbnN0YW5jZSkhO1xuXHRcdGluc3RhbmNlRGF0YS5ub2RlSGFuZGxlci5hZGQoZG9tTm9kZSBhcyBIVE1MRWxlbWVudCwgYCR7ZG5vZGUucHJvcGVydGllcy5rZXl9YCk7XG5cdH1cblx0ZG5vZGUuaW5zZXJ0ZWQgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVEb20oXG5cdGRub2RlOiBJbnRlcm5hbEROb2RlLFxuXHRwYXJlbnRWTm9kZTogSW50ZXJuYWxWTm9kZSxcblx0bmV4dFNpYmxpbmdzOiBJbnRlcm5hbEROb2RlW10sXG5cdGluc2VydEJlZm9yZTogTm9kZSB8IHVuZGVmaW5lZCxcblx0cHJvamVjdGlvbk9wdGlvbnM6IFByb2plY3Rpb25PcHRpb25zLFxuXHRwYXJlbnRJbnN0YW5jZTogRGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2UsXG5cdGNoaWxkTm9kZXM/OiAoRWxlbWVudCB8IFRleHQpW11cbikge1xuXHRsZXQgZG9tTm9kZTogRWxlbWVudCB8IFRleHQgfCB1bmRlZmluZWQ7XG5cdGNvbnN0IHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKSE7XG5cdGlmIChpc1dOb2RlKGRub2RlKSkge1xuXHRcdGxldCB7IHdpZGdldENvbnN0cnVjdG9yIH0gPSBkbm9kZTtcblx0XHRjb25zdCBwYXJlbnRJbnN0YW5jZURhdGEgPSB3aWRnZXRJbnN0YW5jZU1hcC5nZXQocGFyZW50SW5zdGFuY2UpITtcblx0XHRpZiAoIWlzV2lkZ2V0QmFzZUNvbnN0cnVjdG9yPERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlPih3aWRnZXRDb25zdHJ1Y3RvcikpIHtcblx0XHRcdGNvbnN0IGl0ZW0gPSBwYXJlbnRJbnN0YW5jZURhdGEucmVnaXN0cnkoKS5nZXQ8RGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2U+KHdpZGdldENvbnN0cnVjdG9yKTtcblx0XHRcdGlmIChpdGVtID09PSBudWxsKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHdpZGdldENvbnN0cnVjdG9yID0gaXRlbTtcblx0XHR9XG5cdFx0Y29uc3QgaW5zdGFuY2UgPSBuZXcgd2lkZ2V0Q29uc3RydWN0b3IoKTtcblx0XHRkbm9kZS5pbnN0YW5jZSA9IGluc3RhbmNlO1xuXHRcdG5leHRTaWJsaW5nTWFwLnNldChpbnN0YW5jZSwgbmV4dFNpYmxpbmdzKTtcblx0XHRjb25zdCBpbnN0YW5jZURhdGEgPSB3aWRnZXRJbnN0YW5jZU1hcC5nZXQoaW5zdGFuY2UpITtcblx0XHRpbnN0YW5jZURhdGEuaW52YWxpZGF0ZSA9ICgpID0+IHtcblx0XHRcdGluc3RhbmNlRGF0YS5kaXJ0eSA9IHRydWU7XG5cdFx0XHRpZiAoaW5zdGFuY2VEYXRhLnJlbmRlcmluZyA9PT0gZmFsc2UpIHtcblx0XHRcdFx0cHJvamVjdG9yU3RhdGUucmVuZGVyUXVldWUucHVzaCh7IGluc3RhbmNlLCBkZXB0aDogcHJvamVjdGlvbk9wdGlvbnMuZGVwdGggfSk7XG5cdFx0XHRcdHNjaGVkdWxlUmVuZGVyKHByb2plY3Rpb25PcHRpb25zKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdGluc3RhbmNlRGF0YS5yZW5kZXJpbmcgPSB0cnVlO1xuXHRcdGluc3RhbmNlLl9fc2V0Q29yZVByb3BlcnRpZXNfXyhkbm9kZS5jb3JlUHJvcGVydGllcyk7XG5cdFx0aW5zdGFuY2UuX19zZXRDaGlsZHJlbl9fKGRub2RlLmNoaWxkcmVuKTtcblx0XHRpbnN0YW5jZS5fX3NldFByb3BlcnRpZXNfXyhkbm9kZS5wcm9wZXJ0aWVzKTtcblx0XHRjb25zdCByZW5kZXJlZCA9IGluc3RhbmNlLl9fcmVuZGVyX18oKTtcblx0XHRpbnN0YW5jZURhdGEucmVuZGVyaW5nID0gZmFsc2U7XG5cdFx0aWYgKHJlbmRlcmVkKSB7XG5cdFx0XHRjb25zdCBmaWx0ZXJlZFJlbmRlcmVkID0gZmlsdGVyQW5kRGVjb3JhdGVDaGlsZHJlbihyZW5kZXJlZCwgaW5zdGFuY2UpO1xuXHRcdFx0ZG5vZGUucmVuZGVyZWQgPSBmaWx0ZXJlZFJlbmRlcmVkO1xuXHRcdFx0YWRkQ2hpbGRyZW4ocGFyZW50Vk5vZGUsIGZpbHRlcmVkUmVuZGVyZWQsIHByb2plY3Rpb25PcHRpb25zLCBpbnN0YW5jZSwgaW5zZXJ0QmVmb3JlLCBjaGlsZE5vZGVzKTtcblx0XHR9XG5cdFx0aW5zdGFuY2VNYXAuc2V0KGluc3RhbmNlLCB7IGRub2RlLCBwYXJlbnRWTm9kZSB9KTtcblx0XHRpbnN0YW5jZURhdGEubm9kZUhhbmRsZXIuYWRkUm9vdCgpO1xuXHRcdHByb2plY3RvclN0YXRlLmFmdGVyUmVuZGVyQ2FsbGJhY2tzLnB1c2goKCkgPT4ge1xuXHRcdFx0aW5zdGFuY2VEYXRhLm9uQXR0YWNoKCk7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKHByb2plY3RvclN0YXRlLm1lcmdlICYmIHByb2plY3RvclN0YXRlLm1lcmdlRWxlbWVudCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRkb21Ob2RlID0gZG5vZGUuZG9tTm9kZSA9IHByb2plY3Rpb25PcHRpb25zLm1lcmdlRWxlbWVudDtcblx0XHRcdHByb2plY3RvclN0YXRlLm1lcmdlRWxlbWVudCA9IHVuZGVmaW5lZDtcblx0XHRcdGluaXRQcm9wZXJ0aWVzQW5kQ2hpbGRyZW4oZG9tTm9kZSEsIGRub2RlLCBwYXJlbnRJbnN0YW5jZSwgcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBkb2MgPSBwYXJlbnRWTm9kZS5kb21Ob2RlIS5vd25lckRvY3VtZW50O1xuXHRcdGlmICghZG5vZGUudGFnICYmIHR5cGVvZiBkbm9kZS50ZXh0ID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKGRub2RlLmRvbU5vZGUgIT09IHVuZGVmaW5lZCAmJiBwYXJlbnRWTm9kZS5kb21Ob2RlKSB7XG5cdFx0XHRcdGNvbnN0IG5ld0RvbU5vZGUgPSBkbm9kZS5kb21Ob2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZG5vZGUudGV4dCEpO1xuXHRcdFx0XHRpZiAocGFyZW50Vk5vZGUuZG9tTm9kZSA9PT0gZG5vZGUuZG9tTm9kZS5wYXJlbnROb2RlKSB7XG5cdFx0XHRcdFx0cGFyZW50Vk5vZGUuZG9tTm9kZS5yZXBsYWNlQ2hpbGQobmV3RG9tTm9kZSwgZG5vZGUuZG9tTm9kZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cGFyZW50Vk5vZGUuZG9tTm9kZS5hcHBlbmRDaGlsZChuZXdEb21Ob2RlKTtcblx0XHRcdFx0XHRkbm9kZS5kb21Ob2RlLnBhcmVudE5vZGUgJiYgZG5vZGUuZG9tTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRub2RlLmRvbU5vZGUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRub2RlLmRvbU5vZGUgPSBuZXdEb21Ob2RlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZG9tTm9kZSA9IGRub2RlLmRvbU5vZGUgPSBkb2MuY3JlYXRlVGV4dE5vZGUoZG5vZGUudGV4dCEpO1xuXHRcdFx0XHRpZiAoaW5zZXJ0QmVmb3JlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRwYXJlbnRWTm9kZS5kb21Ob2RlIS5pbnNlcnRCZWZvcmUoZG9tTm9kZSwgaW5zZXJ0QmVmb3JlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRwYXJlbnRWTm9kZS5kb21Ob2RlIS5hcHBlbmRDaGlsZChkb21Ob2RlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoZG5vZGUuZG9tTm9kZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGlmIChkbm9kZS50YWcgPT09ICdzdmcnKSB7XG5cdFx0XHRcdFx0cHJvamVjdGlvbk9wdGlvbnMgPSB7IC4uLnByb2plY3Rpb25PcHRpb25zLCAuLi57IG5hbWVzcGFjZTogTkFNRVNQQUNFX1NWRyB9IH07XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHByb2plY3Rpb25PcHRpb25zLm5hbWVzcGFjZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0ZG9tTm9kZSA9IGRub2RlLmRvbU5vZGUgPSBkb2MuY3JlYXRlRWxlbWVudE5TKHByb2plY3Rpb25PcHRpb25zLm5hbWVzcGFjZSwgZG5vZGUudGFnKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkb21Ob2RlID0gZG5vZGUuZG9tTm9kZSA9IGRub2RlLmRvbU5vZGUgfHwgZG9jLmNyZWF0ZUVsZW1lbnQoZG5vZGUudGFnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZG9tTm9kZSA9IGRub2RlLmRvbU5vZGU7XG5cdFx0XHR9XG5cdFx0XHRpbml0UHJvcGVydGllc0FuZENoaWxkcmVuKGRvbU5vZGUhIGFzIEVsZW1lbnQsIGRub2RlLCBwYXJlbnRJbnN0YW5jZSwgcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdFx0aWYgKGluc2VydEJlZm9yZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHBhcmVudFZOb2RlLmRvbU5vZGUhLmluc2VydEJlZm9yZShkb21Ob2RlLCBpbnNlcnRCZWZvcmUpO1xuXHRcdFx0fSBlbHNlIGlmIChkb21Ob2RlIS5wYXJlbnROb2RlICE9PSBwYXJlbnRWTm9kZS5kb21Ob2RlISkge1xuXHRcdFx0XHRwYXJlbnRWTm9kZS5kb21Ob2RlIS5hcHBlbmRDaGlsZChkb21Ob2RlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlRG9tKFxuXHRwcmV2aW91czogYW55LFxuXHRkbm9kZTogSW50ZXJuYWxETm9kZSxcblx0cHJvamVjdGlvbk9wdGlvbnM6IFByb2plY3Rpb25PcHRpb25zLFxuXHRwYXJlbnRWTm9kZTogSW50ZXJuYWxWTm9kZSxcblx0cGFyZW50SW5zdGFuY2U6IERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlLFxuXHRvbGROZXh0U2libGluZ3M6IEludGVybmFsRE5vZGVbXSxcblx0bmV4dFNpYmxpbmdzOiBJbnRlcm5hbEROb2RlW11cbikge1xuXHRpZiAoaXNXTm9kZShkbm9kZSkpIHtcblx0XHRjb25zdCB7IGluc3RhbmNlIH0gPSBwcmV2aW91cztcblx0XHRjb25zdCB7IHBhcmVudFZOb2RlLCBkbm9kZTogbm9kZSB9ID0gaW5zdGFuY2VNYXAuZ2V0KGluc3RhbmNlKSE7XG5cdFx0Y29uc3QgcHJldmlvdXNSZW5kZXJlZCA9IG5vZGUgPyBub2RlLnJlbmRlcmVkIDogcHJldmlvdXMucmVuZGVyZWQ7XG5cdFx0Y29uc3QgaW5zdGFuY2VEYXRhID0gd2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KGluc3RhbmNlKSE7XG5cdFx0aW5zdGFuY2VEYXRhLnJlbmRlcmluZyA9IHRydWU7XG5cdFx0aW5zdGFuY2UuX19zZXRDb3JlUHJvcGVydGllc19fKGRub2RlLmNvcmVQcm9wZXJ0aWVzKTtcblx0XHRpbnN0YW5jZS5fX3NldENoaWxkcmVuX18oZG5vZGUuY2hpbGRyZW4pO1xuXHRcdGluc3RhbmNlLl9fc2V0UHJvcGVydGllc19fKGRub2RlLnByb3BlcnRpZXMpO1xuXHRcdG5leHRTaWJsaW5nTWFwLnNldChpbnN0YW5jZSwgbmV4dFNpYmxpbmdzKTtcblx0XHRkbm9kZS5pbnN0YW5jZSA9IGluc3RhbmNlO1xuXHRcdGlmIChpbnN0YW5jZURhdGEuZGlydHkgPT09IHRydWUpIHtcblx0XHRcdGNvbnN0IHJlbmRlcmVkID0gaW5zdGFuY2UuX19yZW5kZXJfXygpO1xuXHRcdFx0aW5zdGFuY2VEYXRhLnJlbmRlcmluZyA9IGZhbHNlO1xuXHRcdFx0ZG5vZGUucmVuZGVyZWQgPSBmaWx0ZXJBbmREZWNvcmF0ZUNoaWxkcmVuKHJlbmRlcmVkLCBpbnN0YW5jZSk7XG5cdFx0XHR1cGRhdGVDaGlsZHJlbihwYXJlbnRWTm9kZSwgb2xkTmV4dFNpYmxpbmdzLCBwcmV2aW91c1JlbmRlcmVkLCBkbm9kZS5yZW5kZXJlZCwgaW5zdGFuY2UsIHByb2plY3Rpb25PcHRpb25zKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aW5zdGFuY2VEYXRhLnJlbmRlcmluZyA9IGZhbHNlO1xuXHRcdFx0ZG5vZGUucmVuZGVyZWQgPSBwcmV2aW91c1JlbmRlcmVkO1xuXHRcdH1cblx0XHRpbnN0YW5jZU1hcC5zZXQoaW5zdGFuY2UsIHsgZG5vZGUsIHBhcmVudFZOb2RlIH0pO1xuXHRcdGluc3RhbmNlRGF0YS5ub2RlSGFuZGxlci5hZGRSb290KCk7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKHByZXZpb3VzID09PSBkbm9kZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRjb25zdCBkb21Ob2RlID0gKGRub2RlLmRvbU5vZGUgPSBwcmV2aW91cy5kb21Ob2RlKTtcblx0XHRsZXQgdGV4dFVwZGF0ZWQgPSBmYWxzZTtcblx0XHRsZXQgdXBkYXRlZCA9IGZhbHNlO1xuXHRcdGlmICghZG5vZGUudGFnICYmIHR5cGVvZiBkbm9kZS50ZXh0ID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKGRub2RlLnRleHQgIT09IHByZXZpb3VzLnRleHQpIHtcblx0XHRcdFx0Y29uc3QgbmV3RG9tTm9kZSA9IGRvbU5vZGUub3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkbm9kZS50ZXh0ISk7XG5cdFx0XHRcdGRvbU5vZGUucGFyZW50Tm9kZSEucmVwbGFjZUNoaWxkKG5ld0RvbU5vZGUsIGRvbU5vZGUpO1xuXHRcdFx0XHRkbm9kZS5kb21Ob2RlID0gbmV3RG9tTm9kZTtcblx0XHRcdFx0dGV4dFVwZGF0ZWQgPSB0cnVlO1xuXHRcdFx0XHRyZXR1cm4gdGV4dFVwZGF0ZWQ7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChkbm9kZS50YWcgJiYgZG5vZGUudGFnLmxhc3RJbmRleE9mKCdzdmcnLCAwKSA9PT0gMCkge1xuXHRcdFx0XHRwcm9qZWN0aW9uT3B0aW9ucyA9IHsgLi4ucHJvamVjdGlvbk9wdGlvbnMsIC4uLnsgbmFtZXNwYWNlOiBOQU1FU1BBQ0VfU1ZHIH0gfTtcblx0XHRcdH1cblx0XHRcdGlmIChwcmV2aW91cy5jaGlsZHJlbiAhPT0gZG5vZGUuY2hpbGRyZW4pIHtcblx0XHRcdFx0Y29uc3QgY2hpbGRyZW4gPSBmaWx0ZXJBbmREZWNvcmF0ZUNoaWxkcmVuKGRub2RlLmNoaWxkcmVuLCBwYXJlbnRJbnN0YW5jZSk7XG5cdFx0XHRcdGRub2RlLmNoaWxkcmVuID0gY2hpbGRyZW47XG5cdFx0XHRcdHVwZGF0ZWQgPVxuXHRcdFx0XHRcdHVwZGF0ZUNoaWxkcmVuKFxuXHRcdFx0XHRcdFx0ZG5vZGUsXG5cdFx0XHRcdFx0XHRvbGROZXh0U2libGluZ3MsXG5cdFx0XHRcdFx0XHRwcmV2aW91cy5jaGlsZHJlbixcblx0XHRcdFx0XHRcdGNoaWxkcmVuLFxuXHRcdFx0XHRcdFx0cGFyZW50SW5zdGFuY2UsXG5cdFx0XHRcdFx0XHRwcm9qZWN0aW9uT3B0aW9uc1xuXHRcdFx0XHRcdCkgfHwgdXBkYXRlZDtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgcHJldmlvdXNQcm9wZXJ0aWVzID0gYnVpbGRQcmV2aW91c1Byb3BlcnRpZXMoZG9tTm9kZSwgcHJldmlvdXMsIGRub2RlKTtcblx0XHRcdGlmIChkbm9kZS5hdHRyaWJ1dGVzICYmIGRub2RlLmV2ZW50cykge1xuXHRcdFx0XHR1cGRhdGVBdHRyaWJ1dGVzKGRvbU5vZGUsIHByZXZpb3VzUHJvcGVydGllcy5hdHRyaWJ1dGVzLCBkbm9kZS5hdHRyaWJ1dGVzLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdFx0XHRcdHVwZGF0ZWQgPVxuXHRcdFx0XHRcdHVwZGF0ZVByb3BlcnRpZXMoXG5cdFx0XHRcdFx0XHRkb21Ob2RlLFxuXHRcdFx0XHRcdFx0cHJldmlvdXNQcm9wZXJ0aWVzLnByb3BlcnRpZXMsXG5cdFx0XHRcdFx0XHRkbm9kZS5wcm9wZXJ0aWVzLFxuXHRcdFx0XHRcdFx0cHJvamVjdGlvbk9wdGlvbnMsXG5cdFx0XHRcdFx0XHRmYWxzZVxuXHRcdFx0XHRcdCkgfHwgdXBkYXRlZDtcblx0XHRcdFx0cmVtb3ZlT3JwaGFuZWRFdmVudHMoZG9tTm9kZSwgcHJldmlvdXNQcm9wZXJ0aWVzLmV2ZW50cywgZG5vZGUuZXZlbnRzLCBwcm9qZWN0aW9uT3B0aW9ucywgdHJ1ZSk7XG5cdFx0XHRcdGNvbnN0IGV2ZW50cyA9IGRub2RlLmV2ZW50cztcblx0XHRcdFx0T2JqZWN0LmtleXMoZXZlbnRzKS5mb3JFYWNoKChldmVudCkgPT4ge1xuXHRcdFx0XHRcdHVwZGF0ZUV2ZW50KFxuXHRcdFx0XHRcdFx0ZG9tTm9kZSxcblx0XHRcdFx0XHRcdGV2ZW50LFxuXHRcdFx0XHRcdFx0ZXZlbnRzW2V2ZW50XSxcblx0XHRcdFx0XHRcdHByb2plY3Rpb25PcHRpb25zLFxuXHRcdFx0XHRcdFx0ZG5vZGUucHJvcGVydGllcy5iaW5kLFxuXHRcdFx0XHRcdFx0cHJldmlvdXNQcm9wZXJ0aWVzLmV2ZW50c1tldmVudF1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHVwZGF0ZWQgPVxuXHRcdFx0XHRcdHVwZGF0ZVByb3BlcnRpZXMoZG9tTm9kZSwgcHJldmlvdXNQcm9wZXJ0aWVzLnByb3BlcnRpZXMsIGRub2RlLnByb3BlcnRpZXMsIHByb2plY3Rpb25PcHRpb25zKSB8fFxuXHRcdFx0XHRcdHVwZGF0ZWQ7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkbm9kZS5wcm9wZXJ0aWVzLmtleSAhPT0gbnVsbCAmJiBkbm9kZS5wcm9wZXJ0aWVzLmtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGNvbnN0IGluc3RhbmNlRGF0YSA9IHdpZGdldEluc3RhbmNlTWFwLmdldChwYXJlbnRJbnN0YW5jZSkhO1xuXHRcdFx0XHRpbnN0YW5jZURhdGEubm9kZUhhbmRsZXIuYWRkKGRvbU5vZGUsIGAke2Rub2RlLnByb3BlcnRpZXMua2V5fWApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodXBkYXRlZCAmJiBkbm9kZS5wcm9wZXJ0aWVzICYmIGRub2RlLnByb3BlcnRpZXMudXBkYXRlQW5pbWF0aW9uKSB7XG5cdFx0XHRkbm9kZS5wcm9wZXJ0aWVzLnVwZGF0ZUFuaW1hdGlvbihkb21Ob2RlIGFzIEVsZW1lbnQsIGRub2RlLnByb3BlcnRpZXMsIHByZXZpb3VzLnByb3BlcnRpZXMpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhZGREZWZlcnJlZFByb3BlcnRpZXModm5vZGU6IEludGVybmFsVk5vZGUsIHByb2plY3Rpb25PcHRpb25zOiBQcm9qZWN0aW9uT3B0aW9ucykge1xuXHQvLyB0cmFuc2ZlciBhbnkgcHJvcGVydGllcyB0aGF0IGhhdmUgYmVlbiBwYXNzZWQgLSBhcyB0aGVzZSBtdXN0IGJlIGRlY29yYXRlZCBwcm9wZXJ0aWVzXG5cdHZub2RlLmRlY29yYXRlZERlZmVycmVkUHJvcGVydGllcyA9IHZub2RlLnByb3BlcnRpZXM7XG5cdGNvbnN0IHByb3BlcnRpZXMgPSB2bm9kZS5kZWZlcnJlZFByb3BlcnRpZXNDYWxsYmFjayEoISF2bm9kZS5pbnNlcnRlZCk7XG5cdGNvbnN0IHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKSE7XG5cdHZub2RlLnByb3BlcnRpZXMgPSB7IC4uLnByb3BlcnRpZXMsIC4uLnZub2RlLmRlY29yYXRlZERlZmVycmVkUHJvcGVydGllcyB9O1xuXHRwcm9qZWN0b3JTdGF0ZS5kZWZlcnJlZFJlbmRlckNhbGxiYWNrcy5wdXNoKCgpID0+IHtcblx0XHRjb25zdCBwcm9wZXJ0aWVzID0ge1xuXHRcdFx0Li4udm5vZGUuZGVmZXJyZWRQcm9wZXJ0aWVzQ2FsbGJhY2shKCEhdm5vZGUuaW5zZXJ0ZWQpLFxuXHRcdFx0Li4udm5vZGUuZGVjb3JhdGVkRGVmZXJyZWRQcm9wZXJ0aWVzXG5cdFx0fTtcblx0XHR1cGRhdGVQcm9wZXJ0aWVzKHZub2RlLmRvbU5vZGUhIGFzIEVsZW1lbnQsIHZub2RlLnByb3BlcnRpZXMsIHByb3BlcnRpZXMsIHByb2plY3Rpb25PcHRpb25zKTtcblx0XHR2bm9kZS5wcm9wZXJ0aWVzID0gcHJvcGVydGllcztcblx0fSk7XG59XG5cbmZ1bmN0aW9uIHJ1bkRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzKHByb2plY3Rpb25PcHRpb25zOiBQcm9qZWN0aW9uT3B0aW9ucykge1xuXHRjb25zdCBwcm9qZWN0b3JTdGF0ZSA9IHByb2plY3RvclN0YXRlTWFwLmdldChwcm9qZWN0aW9uT3B0aW9ucy5wcm9qZWN0b3JJbnN0YW5jZSkhO1xuXHRpZiAocHJvamVjdG9yU3RhdGUuZGVmZXJyZWRSZW5kZXJDYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0aWYgKHByb2plY3Rpb25PcHRpb25zLnN5bmMpIHtcblx0XHRcdHdoaWxlIChwcm9qZWN0b3JTdGF0ZS5kZWZlcnJlZFJlbmRlckNhbGxiYWNrcy5sZW5ndGgpIHtcblx0XHRcdFx0Y29uc3QgY2FsbGJhY2sgPSBwcm9qZWN0b3JTdGF0ZS5kZWZlcnJlZFJlbmRlckNhbGxiYWNrcy5zaGlmdCgpO1xuXHRcdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRnbG9iYWwucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcblx0XHRcdFx0d2hpbGUgKHByb2plY3RvclN0YXRlLmRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzLmxlbmd0aCkge1xuXHRcdFx0XHRcdGNvbnN0IGNhbGxiYWNrID0gcHJvamVjdG9yU3RhdGUuZGVmZXJyZWRSZW5kZXJDYWxsYmFja3Muc2hpZnQoKTtcblx0XHRcdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gcnVuQWZ0ZXJSZW5kZXJDYWxsYmFja3MocHJvamVjdGlvbk9wdGlvbnM6IFByb2plY3Rpb25PcHRpb25zKSB7XG5cdGNvbnN0IHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKSE7XG5cdGlmIChwcm9qZWN0aW9uT3B0aW9ucy5zeW5jKSB7XG5cdFx0d2hpbGUgKHByb2plY3RvclN0YXRlLmFmdGVyUmVuZGVyQ2FsbGJhY2tzLmxlbmd0aCkge1xuXHRcdFx0Y29uc3QgY2FsbGJhY2sgPSBwcm9qZWN0b3JTdGF0ZS5hZnRlclJlbmRlckNhbGxiYWNrcy5zaGlmdCgpO1xuXHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0aWYgKGdsb2JhbC5yZXF1ZXN0SWRsZUNhbGxiYWNrKSB7XG5cdFx0XHRnbG9iYWwucmVxdWVzdElkbGVDYWxsYmFjaygoKSA9PiB7XG5cdFx0XHRcdHdoaWxlIChwcm9qZWN0b3JTdGF0ZS5hZnRlclJlbmRlckNhbGxiYWNrcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRjb25zdCBjYWxsYmFjayA9IHByb2plY3RvclN0YXRlLmFmdGVyUmVuZGVyQ2FsbGJhY2tzLnNoaWZ0KCk7XG5cdFx0XHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHR3aGlsZSAocHJvamVjdG9yU3RhdGUuYWZ0ZXJSZW5kZXJDYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0XHRcdFx0Y29uc3QgY2FsbGJhY2sgPSBwcm9qZWN0b3JTdGF0ZS5hZnRlclJlbmRlckNhbGxiYWNrcy5zaGlmdCgpO1xuXHRcdFx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBzY2hlZHVsZVJlbmRlcihwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnMpIHtcblx0Y29uc3QgcHJvamVjdG9yU3RhdGUgPSBwcm9qZWN0b3JTdGF0ZU1hcC5nZXQocHJvamVjdGlvbk9wdGlvbnMucHJvamVjdG9ySW5zdGFuY2UpITtcblx0aWYgKHByb2plY3Rpb25PcHRpb25zLnN5bmMpIHtcblx0XHRyZW5kZXIocHJvamVjdGlvbk9wdGlvbnMpO1xuXHR9IGVsc2UgaWYgKHByb2plY3RvclN0YXRlLnJlbmRlclNjaGVkdWxlZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cHJvamVjdG9yU3RhdGUucmVuZGVyU2NoZWR1bGVkID0gZ2xvYmFsLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG5cdFx0XHRyZW5kZXIocHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdH0pO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbmRlcihwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnMpIHtcblx0Y29uc3QgcHJvamVjdG9yU3RhdGUgPSBwcm9qZWN0b3JTdGF0ZU1hcC5nZXQocHJvamVjdGlvbk9wdGlvbnMucHJvamVjdG9ySW5zdGFuY2UpITtcblx0cHJvamVjdG9yU3RhdGUucmVuZGVyU2NoZWR1bGVkID0gdW5kZWZpbmVkO1xuXHRjb25zdCByZW5kZXJRdWV1ZSA9IHByb2plY3RvclN0YXRlLnJlbmRlclF1ZXVlO1xuXHRjb25zdCByZW5kZXJzID0gWy4uLnJlbmRlclF1ZXVlXTtcblx0cHJvamVjdG9yU3RhdGUucmVuZGVyUXVldWUgPSBbXTtcblx0cmVuZGVycy5zb3J0KChhLCBiKSA9PiBhLmRlcHRoIC0gYi5kZXB0aCk7XG5cdGNvbnN0IHByZXZpb3VzbHlSZW5kZXJlZCA9IFtdO1xuXHR3aGlsZSAocmVuZGVycy5sZW5ndGgpIHtcblx0XHRjb25zdCB7IGluc3RhbmNlIH0gPSByZW5kZXJzLnNoaWZ0KCkhO1xuXHRcdGlmIChpbnN0YW5jZU1hcC5oYXMoaW5zdGFuY2UpICYmIHByZXZpb3VzbHlSZW5kZXJlZC5pbmRleE9mKGluc3RhbmNlKSA9PT0gLTEpIHtcblx0XHRcdHByZXZpb3VzbHlSZW5kZXJlZC5wdXNoKGluc3RhbmNlKTtcblx0XHRcdGNvbnN0IHsgcGFyZW50Vk5vZGUsIGRub2RlIH0gPSBpbnN0YW5jZU1hcC5nZXQoaW5zdGFuY2UpITtcblx0XHRcdGNvbnN0IGluc3RhbmNlRGF0YSA9IHdpZGdldEluc3RhbmNlTWFwLmdldChpbnN0YW5jZSkhO1xuXHRcdFx0Y29uc3QgbmV4dFNpYmxpbmdzID0gbmV4dFNpYmxpbmdNYXAuZ2V0KGluc3RhbmNlKSE7XG5cdFx0XHR1cGRhdGVEb20oXG5cdFx0XHRcdGRub2RlLFxuXHRcdFx0XHR0b0ludGVybmFsV05vZGUoaW5zdGFuY2UsIGluc3RhbmNlRGF0YSksXG5cdFx0XHRcdHByb2plY3Rpb25PcHRpb25zLFxuXHRcdFx0XHRwYXJlbnRWTm9kZSxcblx0XHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRcdG5leHRTaWJsaW5ncyxcblx0XHRcdFx0bmV4dFNpYmxpbmdzXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXHRydW5BZnRlclJlbmRlckNhbGxiYWNrcyhwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdHJ1bkRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzKHByb2plY3Rpb25PcHRpb25zKTtcbn1cblxuZXhwb3J0IGNvbnN0IGRvbSA9IHtcblx0YXBwZW5kOiBmdW5jdGlvbihcblx0XHRwYXJlbnROb2RlOiBFbGVtZW50LFxuXHRcdGluc3RhbmNlOiBEZWZhdWx0V2lkZ2V0QmFzZUludGVyZmFjZSxcblx0XHRwcm9qZWN0aW9uT3B0aW9uczogUGFydGlhbDxQcm9qZWN0aW9uT3B0aW9ucz4gPSB7fVxuXHQpOiBQcm9qZWN0aW9uIHtcblx0XHRjb25zdCBpbnN0YW5jZURhdGEgPSB3aWRnZXRJbnN0YW5jZU1hcC5nZXQoaW5zdGFuY2UpITtcblx0XHRjb25zdCBmaW5hbFByb2plY3Rvck9wdGlvbnMgPSBnZXRQcm9qZWN0aW9uT3B0aW9ucyhwcm9qZWN0aW9uT3B0aW9ucywgaW5zdGFuY2UpO1xuXHRcdGNvbnN0IHByb2plY3RvclN0YXRlOiBQcm9qZWN0b3JTdGF0ZSA9IHtcblx0XHRcdGFmdGVyUmVuZGVyQ2FsbGJhY2tzOiBbXSxcblx0XHRcdGRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzOiBbXSxcblx0XHRcdG5vZGVNYXA6IG5ldyBXZWFrTWFwKCksXG5cdFx0XHRyZW5kZXJTY2hlZHVsZWQ6IHVuZGVmaW5lZCxcblx0XHRcdHJlbmRlclF1ZXVlOiBbXSxcblx0XHRcdG1lcmdlOiBwcm9qZWN0aW9uT3B0aW9ucy5tZXJnZSB8fCBmYWxzZSxcblx0XHRcdG1lcmdlRWxlbWVudDogcHJvamVjdGlvbk9wdGlvbnMubWVyZ2VFbGVtZW50XG5cdFx0fTtcblx0XHRwcm9qZWN0b3JTdGF0ZU1hcC5zZXQoaW5zdGFuY2UsIHByb2plY3RvclN0YXRlKTtcblxuXHRcdGZpbmFsUHJvamVjdG9yT3B0aW9ucy5yb290Tm9kZSA9IHBhcmVudE5vZGU7XG5cdFx0Y29uc3QgcGFyZW50Vk5vZGUgPSB0b1BhcmVudFZOb2RlKGZpbmFsUHJvamVjdG9yT3B0aW9ucy5yb290Tm9kZSk7XG5cdFx0Y29uc3Qgbm9kZSA9IHRvSW50ZXJuYWxXTm9kZShpbnN0YW5jZSwgaW5zdGFuY2VEYXRhKTtcblx0XHRpbnN0YW5jZU1hcC5zZXQoaW5zdGFuY2UsIHsgZG5vZGU6IG5vZGUsIHBhcmVudFZOb2RlIH0pO1xuXHRcdGluc3RhbmNlRGF0YS5pbnZhbGlkYXRlID0gKCkgPT4ge1xuXHRcdFx0aW5zdGFuY2VEYXRhLmRpcnR5ID0gdHJ1ZTtcblx0XHRcdGlmIChpbnN0YW5jZURhdGEucmVuZGVyaW5nID09PSBmYWxzZSkge1xuXHRcdFx0XHRwcm9qZWN0b3JTdGF0ZS5yZW5kZXJRdWV1ZS5wdXNoKHsgaW5zdGFuY2UsIGRlcHRoOiBmaW5hbFByb2plY3Rvck9wdGlvbnMuZGVwdGggfSk7XG5cdFx0XHRcdHNjaGVkdWxlUmVuZGVyKGZpbmFsUHJvamVjdG9yT3B0aW9ucyk7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHR1cGRhdGVEb20obm9kZSwgbm9kZSwgZmluYWxQcm9qZWN0b3JPcHRpb25zLCBwYXJlbnRWTm9kZSwgaW5zdGFuY2UsIFtdLCBbXSk7XG5cdFx0cHJvamVjdG9yU3RhdGUuYWZ0ZXJSZW5kZXJDYWxsYmFja3MucHVzaCgoKSA9PiB7XG5cdFx0XHRpbnN0YW5jZURhdGEub25BdHRhY2goKTtcblx0XHR9KTtcblx0XHRydW5EZWZlcnJlZFJlbmRlckNhbGxiYWNrcyhmaW5hbFByb2plY3Rvck9wdGlvbnMpO1xuXHRcdHJ1bkFmdGVyUmVuZGVyQ2FsbGJhY2tzKGZpbmFsUHJvamVjdG9yT3B0aW9ucyk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRvbU5vZGU6IGZpbmFsUHJvamVjdG9yT3B0aW9ucy5yb290Tm9kZVxuXHRcdH07XG5cdH0sXG5cdGNyZWF0ZTogZnVuY3Rpb24oaW5zdGFuY2U6IERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlLCBwcm9qZWN0aW9uT3B0aW9ucz86IFBhcnRpYWw8UHJvamVjdGlvbk9wdGlvbnM+KTogUHJvamVjdGlvbiB7XG5cdFx0cmV0dXJuIHRoaXMuYXBwZW5kKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLCBpbnN0YW5jZSwgcHJvamVjdGlvbk9wdGlvbnMpO1xuXHR9LFxuXHRtZXJnZTogZnVuY3Rpb24oXG5cdFx0ZWxlbWVudDogRWxlbWVudCxcblx0XHRpbnN0YW5jZTogRGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2UsXG5cdFx0cHJvamVjdGlvbk9wdGlvbnM6IFBhcnRpYWw8UHJvamVjdGlvbk9wdGlvbnM+ID0ge31cblx0KTogUHJvamVjdGlvbiB7XG5cdFx0cHJvamVjdGlvbk9wdGlvbnMubWVyZ2UgPSB0cnVlO1xuXHRcdHByb2plY3Rpb25PcHRpb25zLm1lcmdlRWxlbWVudCA9IGVsZW1lbnQ7XG5cdFx0Y29uc3QgcHJvamVjdGlvbiA9IHRoaXMuYXBwZW5kKGVsZW1lbnQucGFyZW50Tm9kZSBhcyBFbGVtZW50LCBpbnN0YW5jZSwgcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdGNvbnN0IHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KGluc3RhbmNlKSE7XG5cdFx0cHJvamVjdG9yU3RhdGUubWVyZ2UgPSBmYWxzZTtcblx0XHRyZXR1cm4gcHJvamVjdGlvbjtcblx0fVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB2ZG9tLnRzIiwiLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG52YXIgaGFzID0gcmVxdWlyZSgnQGRvam8vZnJhbWV3b3JrL2NvcmUvaGFzJyk7XG5cbmlmICghaGFzLmV4aXN0cygnYnVpbGQtdGltZS1yZW5kZXInKSkge1xuXHRoYXMuYWRkKCdidWlsZC10aW1lLXJlbmRlcicsIGZhbHNlLCBmYWxzZSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gaGFzQnVpbGRUaW1lUmVuZGVyLnRzIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0geVtvcFswXSAmIDIgPyBcInJldHVyblwiIDogb3BbMF0gPyBcInRocm93XCIgOiBcIm5leHRcIl0pICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gWzAsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7ICB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAob1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XG59IGNhdGNoKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcblx0XHRnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiaW1wb3J0IGhhcyBmcm9tICdAZG9qby9mcmFtZXdvcmsvaGFzL2hhcyc7XG5cbmV4cG9ydCBjb25zdCBob3N0ID0gaGFzKCdhcGktaG9zdCcpIGFzIHN0cmluZztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby93ZWJwYWNrLWNvbnRyaWIvY3NzLW1vZHVsZS1kdHMtbG9hZGVyP3R5cGU9dHMmaW5zdGFuY2VOYW1lPTBfZG9qbyEuL3NyYy9jb25maWcudHMiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIyaG83OG9DVy5zdmdcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbWcvbG9nby5zdmdcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2ltZy9sb2dvLnN2Z1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21haW4uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9tYWluLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJpbXBvcnQgeyBQcm9qZWN0b3JNaXhpbiB9IGZyb20gJ0Bkb2pvL2ZyYW1ld29yay93aWRnZXQtY29yZS9taXhpbnMvUHJvamVjdG9yJztcbmltcG9ydCBIZWxsb1dvcmxkIGZyb20gJy4vd2lkZ2V0cy9IZWxsb1dvcmxkJztcbmltcG9ydCB7IGhvc3QgfSBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnN0IFByb2plY3RvciA9IFByb2plY3Rvck1peGluKEhlbGxvV29ybGQpO1xuY29uc3QgcHJvamVjdG9yID0gbmV3IFByb2plY3RvcigpO1xucHJvamVjdG9yLnNldFByb3BlcnRpZXMoeyBuYW1lOiBob3N0IH0pO1xuXG5wcm9qZWN0b3IuYXBwZW5kKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vd2VicGFjay1jb250cmliL2Nzcy1tb2R1bGUtZHRzLWxvYWRlcj90eXBlPXRzJmluc3RhbmNlTmFtZT0wX2Rvam8hLi9zcmMvbWFpbi50cyIsImltcG9ydCBXaWRnZXRCYXNlIGZyb20gJ0Bkb2pvL2ZyYW1ld29yay93aWRnZXQtY29yZS9XaWRnZXRCYXNlJztcbmltcG9ydCB7IHYgfSBmcm9tICdAZG9qby9mcmFtZXdvcmsvd2lkZ2V0LWNvcmUvZCc7XG5cbmltcG9ydCAqIGFzIGNzcyBmcm9tICcuL3N0eWxlcy9oZWxsb1dvcmxkLm0uY3NzJztcblxuY29uc3QgbG9nbyA9IHJlcXVpcmUoJy4vLi4vaW1nL2xvZ28uc3ZnJyk7XG5cbi8qKlxuICogQSBcIkhlbGxvIFdvcmxkXCIgd2lkZ2V0IHRoYXQgcmVuZGVycyBhIHNwaW5uaW5nIERvam8gMiBsb2dvIGFuZCB0aGUgdGV4dCBcIkhlbGxvLCBEb2pvIDIgV29ybGQhXCIuXG4gKlxuICogUmVmZXIgdG8gdGhlIGNyZWF0aW5nIHdpZGdldHMgdHV0b3JpYWwgZm9yIGhlbHA6IGh0dHBzOi8vZG9qby5pby90dXRvcmlhbHMvMDAzX2NyZWF0aW5nX3dpZGdldHMvXG4gKi9cbmV4cG9ydCBjbGFzcyBIZWxsb1dvcmxkIGV4dGVuZHMgV2lkZ2V0QmFzZTx7IG5hbWU6IHN0cmluZyB9PiB7XG5cdHByb3RlY3RlZCByZW5kZXIoKSB7XG5cdFx0cmV0dXJuIHYoJ2RpdicsIHsgY2xhc3NlczogY3NzLnJvb3QgfSwgW1xuXHRcdFx0dignaW1nJywgeyBzcmM6IGxvZ28sIGNsYXNzZXM6IGNzcy5sb2dvIH0pLFxuXHRcdFx0dignZGl2JywgeyBjbGFzc2VzOiBjc3MubGFiZWwgfSwgW2BIZWxsbywgJHt0aGlzLnByb3BlcnRpZXMubmFtZX0hYF0pXG5cdFx0XSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSGVsbG9Xb3JsZDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9AZG9qby93ZWJwYWNrLWNvbnRyaWIvY3NzLW1vZHVsZS1kdHMtbG9hZGVyP3R5cGU9dHMmaW5zdGFuY2VOYW1lPTBfZG9qbyEuL3NyYy93aWRnZXRzL0hlbGxvV29ybGQudHMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCIgX2tleVwiOlwiZmVhdHVyZXMvaGVsbG9Xb3JsZFwiLFwicm9vdFwiOlwiaGVsbG9Xb3JsZC1tX19yb290X18zbUxFNFwiLFwibG9nb1wiOlwiaGVsbG9Xb3JsZC1tX19sb2dvX19TTkVXd1wiLFwicm90YXRpb25cIjpcImhlbGxvV29ybGQtbV9fcm90YXRpb25fXzEydXljXCIsXCJsYWJlbFwiOlwiaGVsbG9Xb3JsZC1tX19sYWJlbF9fMW5ZRXVcIn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvd2lkZ2V0cy9zdHlsZXMvaGVsbG9Xb3JsZC5tLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvd2lkZ2V0cy9zdHlsZXMvaGVsbG9Xb3JsZC5tLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iXSwic291cmNlUm9vdCI6IiJ9