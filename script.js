function _mergeNamespaces(n, m) {
	m.forEach(function (e) {
		e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
			if (k !== 'default' && !(k in n)) {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	});
	return Object.freeze(n);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
				var args = [null];
				args.push.apply(args, arguments);
				var Ctor = Function.bind.apply(f, args);
				return new Ctor();
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var dist = {};

var action$ = {};

var cjs = {};

var Observable$2 = {};

var Subscriber$1 = {};

var isFunction$2 = {};

Object.defineProperty(isFunction$2, "__esModule", { value: true });
isFunction$2.isFunction = void 0;
function isFunction$1(value) {
    return typeof value === 'function';
}
isFunction$2.isFunction = isFunction$1;

var Subscription$2 = {};

var UnsubscriptionError$1 = {};

var createErrorClass$2 = {};

Object.defineProperty(createErrorClass$2, "__esModule", { value: true });
createErrorClass$2.createErrorClass = void 0;
function createErrorClass$1(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}
createErrorClass$2.createErrorClass = createErrorClass$1;

Object.defineProperty(UnsubscriptionError$1, "__esModule", { value: true });
UnsubscriptionError$1.UnsubscriptionError = void 0;
var createErrorClass_1$5 = createErrorClass$2;
UnsubscriptionError$1.UnsubscriptionError = createErrorClass_1$5.createErrorClass(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});

var arrRemove$2 = {};

Object.defineProperty(arrRemove$2, "__esModule", { value: true });
arrRemove$2.arrRemove = void 0;
function arrRemove$1(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}
arrRemove$2.arrRemove = arrRemove$1;

var __values$a = (commonjsGlobal && commonjsGlobal.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read$l = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
var __spreadArray$j = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(Subscription$2, "__esModule", { value: true });
Subscription$2.isSubscription = Subscription$2.EMPTY_SUBSCRIPTION = Subscription$2.Subscription = void 0;
var isFunction_1$p = isFunction$2;
var UnsubscriptionError_1 = UnsubscriptionError$1;
var arrRemove_1$7 = arrRemove$2;
var Subscription$1 = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._finalizers = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = __values$a(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialFinalizer = this.initialTeardown;
            if (isFunction_1$p.isFunction(initialFinalizer)) {
                try {
                    initialFinalizer();
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError_1.UnsubscriptionError ? e.errors : [e];
                }
            }
            var _finalizers = this._finalizers;
            if (_finalizers) {
                this._finalizers = null;
                try {
                    for (var _finalizers_1 = __values$a(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                        var finalizer = _finalizers_1_1.value;
                        try {
                            execFinalizer$1(finalizer);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                                errors = __spreadArray$j(__spreadArray$j([], __read$l(errors)), __read$l(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new UnsubscriptionError_1.UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execFinalizer$1(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            arrRemove_1$7.arrRemove(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _finalizers = this._finalizers;
        _finalizers && arrRemove_1$7.arrRemove(_finalizers, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());
Subscription$2.Subscription = Subscription$1;
Subscription$2.EMPTY_SUBSCRIPTION = Subscription$1.EMPTY;
function isSubscription$1(value) {
    return (value instanceof Subscription$1 ||
        (value && 'closed' in value && isFunction_1$p.isFunction(value.remove) && isFunction_1$p.isFunction(value.add) && isFunction_1$p.isFunction(value.unsubscribe)));
}
Subscription$2.isSubscription = isSubscription$1;
function execFinalizer$1(finalizer) {
    if (isFunction_1$p.isFunction(finalizer)) {
        finalizer();
    }
    else {
        finalizer.unsubscribe();
    }
}

var config$1 = {};

Object.defineProperty(config$1, "__esModule", { value: true });
config$1.config = void 0;
config$1.config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};

var reportUnhandledError$2 = {};

var timeoutProvider$1 = {};

(function (exports) {
	var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
	};
	var __spreadArray = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.timeoutProvider = void 0;
	exports.timeoutProvider = {
	    setTimeout: function (handler, timeout) {
	        var args = [];
	        for (var _i = 2; _i < arguments.length; _i++) {
	            args[_i - 2] = arguments[_i];
	        }
	        var delegate = exports.timeoutProvider.delegate;
	        if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
	            return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
	        }
	        return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
	    },
	    clearTimeout: function (handle) {
	        var delegate = exports.timeoutProvider.delegate;
	        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
	    },
	    delegate: undefined,
	};
	
} (timeoutProvider$1));

Object.defineProperty(reportUnhandledError$2, "__esModule", { value: true });
reportUnhandledError$2.reportUnhandledError = void 0;
var config_1$2 = config$1;
var timeoutProvider_1 = timeoutProvider$1;
function reportUnhandledError$1(err) {
    timeoutProvider_1.timeoutProvider.setTimeout(function () {
        var onUnhandledError = config_1$2.config.onUnhandledError;
        if (onUnhandledError) {
            onUnhandledError(err);
        }
        else {
            throw err;
        }
    });
}
reportUnhandledError$2.reportUnhandledError = reportUnhandledError$1;

var noop$3 = {};

Object.defineProperty(noop$3, "__esModule", { value: true });
noop$3.noop = void 0;
function noop$2() { }
noop$3.noop = noop$2;

var NotificationFactories = {};

Object.defineProperty(NotificationFactories, "__esModule", { value: true });
NotificationFactories.createNotification = NotificationFactories.nextNotification = NotificationFactories.errorNotification = NotificationFactories.COMPLETE_NOTIFICATION = void 0;
NotificationFactories.COMPLETE_NOTIFICATION = (function () { return createNotification('C', undefined, undefined); })();
function errorNotification(error) {
    return createNotification('E', undefined, error);
}
NotificationFactories.errorNotification = errorNotification;
function nextNotification(value) {
    return createNotification('N', value, undefined);
}
NotificationFactories.nextNotification = nextNotification;
function createNotification(kind, value, error) {
    return {
        kind: kind,
        value: value,
        error: error,
    };
}
NotificationFactories.createNotification = createNotification;

var errorContext$2 = {};

Object.defineProperty(errorContext$2, "__esModule", { value: true });
errorContext$2.captureError = errorContext$2.errorContext = void 0;
var config_1$1 = config$1;
var context = null;
function errorContext$1(cb) {
    if (config_1$1.config.useDeprecatedSynchronousErrorHandling) {
        var isRoot = !context;
        if (isRoot) {
            context = { errorThrown: false, error: null };
        }
        cb();
        if (isRoot) {
            var _a = context, errorThrown = _a.errorThrown, error = _a.error;
            context = null;
            if (errorThrown) {
                throw error;
            }
        }
    }
    else {
        cb();
    }
}
errorContext$2.errorContext = errorContext$1;
function captureError(err) {
    if (config_1$1.config.useDeprecatedSynchronousErrorHandling && context) {
        context.errorThrown = true;
        context.error = err;
    }
}
errorContext$2.captureError = captureError;

(function (exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EMPTY_OBSERVER = exports.SafeSubscriber = exports.Subscriber = void 0;
	var isFunction_1 = isFunction$2;
	var Subscription_1 = Subscription$2;
	var config_1 = config$1;
	var reportUnhandledError_1 = reportUnhandledError$2;
	var noop_1 = noop$3;
	var NotificationFactories_1 = NotificationFactories;
	var timeoutProvider_1 = timeoutProvider$1;
	var errorContext_1 = errorContext$2;
	var Subscriber = (function (_super) {
	    __extends(Subscriber, _super);
	    function Subscriber(destination) {
	        var _this = _super.call(this) || this;
	        _this.isStopped = false;
	        if (destination) {
	            _this.destination = destination;
	            if (Subscription_1.isSubscription(destination)) {
	                destination.add(_this);
	            }
	        }
	        else {
	            _this.destination = exports.EMPTY_OBSERVER;
	        }
	        return _this;
	    }
	    Subscriber.create = function (next, error, complete) {
	        return new SafeSubscriber(next, error, complete);
	    };
	    Subscriber.prototype.next = function (value) {
	        if (this.isStopped) {
	            handleStoppedNotification(NotificationFactories_1.nextNotification(value), this);
	        }
	        else {
	            this._next(value);
	        }
	    };
	    Subscriber.prototype.error = function (err) {
	        if (this.isStopped) {
	            handleStoppedNotification(NotificationFactories_1.errorNotification(err), this);
	        }
	        else {
	            this.isStopped = true;
	            this._error(err);
	        }
	    };
	    Subscriber.prototype.complete = function () {
	        if (this.isStopped) {
	            handleStoppedNotification(NotificationFactories_1.COMPLETE_NOTIFICATION, this);
	        }
	        else {
	            this.isStopped = true;
	            this._complete();
	        }
	    };
	    Subscriber.prototype.unsubscribe = function () {
	        if (!this.closed) {
	            this.isStopped = true;
	            _super.prototype.unsubscribe.call(this);
	            this.destination = null;
	        }
	    };
	    Subscriber.prototype._next = function (value) {
	        this.destination.next(value);
	    };
	    Subscriber.prototype._error = function (err) {
	        try {
	            this.destination.error(err);
	        }
	        finally {
	            this.unsubscribe();
	        }
	    };
	    Subscriber.prototype._complete = function () {
	        try {
	            this.destination.complete();
	        }
	        finally {
	            this.unsubscribe();
	        }
	    };
	    return Subscriber;
	}(Subscription_1.Subscription));
	exports.Subscriber = Subscriber;
	var _bind = Function.prototype.bind;
	function bind(fn, thisArg) {
	    return _bind.call(fn, thisArg);
	}
	var ConsumerObserver = (function () {
	    function ConsumerObserver(partialObserver) {
	        this.partialObserver = partialObserver;
	    }
	    ConsumerObserver.prototype.next = function (value) {
	        var partialObserver = this.partialObserver;
	        if (partialObserver.next) {
	            try {
	                partialObserver.next(value);
	            }
	            catch (error) {
	                handleUnhandledError(error);
	            }
	        }
	    };
	    ConsumerObserver.prototype.error = function (err) {
	        var partialObserver = this.partialObserver;
	        if (partialObserver.error) {
	            try {
	                partialObserver.error(err);
	            }
	            catch (error) {
	                handleUnhandledError(error);
	            }
	        }
	        else {
	            handleUnhandledError(err);
	        }
	    };
	    ConsumerObserver.prototype.complete = function () {
	        var partialObserver = this.partialObserver;
	        if (partialObserver.complete) {
	            try {
	                partialObserver.complete();
	            }
	            catch (error) {
	                handleUnhandledError(error);
	            }
	        }
	    };
	    return ConsumerObserver;
	}());
	var SafeSubscriber = (function (_super) {
	    __extends(SafeSubscriber, _super);
	    function SafeSubscriber(observerOrNext, error, complete) {
	        var _this = _super.call(this) || this;
	        var partialObserver;
	        if (isFunction_1.isFunction(observerOrNext) || !observerOrNext) {
	            partialObserver = {
	                next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
	                error: error !== null && error !== void 0 ? error : undefined,
	                complete: complete !== null && complete !== void 0 ? complete : undefined,
	            };
	        }
	        else {
	            var context_1;
	            if (_this && config_1.config.useDeprecatedNextContext) {
	                context_1 = Object.create(observerOrNext);
	                context_1.unsubscribe = function () { return _this.unsubscribe(); };
	                partialObserver = {
	                    next: observerOrNext.next && bind(observerOrNext.next, context_1),
	                    error: observerOrNext.error && bind(observerOrNext.error, context_1),
	                    complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
	                };
	            }
	            else {
	                partialObserver = observerOrNext;
	            }
	        }
	        _this.destination = new ConsumerObserver(partialObserver);
	        return _this;
	    }
	    return SafeSubscriber;
	}(Subscriber));
	exports.SafeSubscriber = SafeSubscriber;
	function handleUnhandledError(error) {
	    if (config_1.config.useDeprecatedSynchronousErrorHandling) {
	        errorContext_1.captureError(error);
	    }
	    else {
	        reportUnhandledError_1.reportUnhandledError(error);
	    }
	}
	function defaultErrorHandler(err) {
	    throw err;
	}
	function handleStoppedNotification(notification, subscriber) {
	    var onStoppedNotification = config_1.config.onStoppedNotification;
	    onStoppedNotification && timeoutProvider_1.timeoutProvider.setTimeout(function () { return onStoppedNotification(notification, subscriber); });
	}
	exports.EMPTY_OBSERVER = {
	    closed: true,
	    next: noop_1.noop,
	    error: defaultErrorHandler,
	    complete: noop_1.noop,
	};
	
} (Subscriber$1));

var observable$2 = {};

Object.defineProperty(observable$2, "__esModule", { value: true });
observable$2.observable = void 0;
observable$2.observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();

var pipe$1 = {};

var identity$2 = {};

Object.defineProperty(identity$2, "__esModule", { value: true });
identity$2.identity = void 0;
function identity$1(x) {
    return x;
}
identity$2.identity = identity$1;

Object.defineProperty(pipe$1, "__esModule", { value: true });
pipe$1.pipeFromArray = pipe$1.pipe = void 0;
var identity_1$e = identity$2;
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray$1(fns);
}
pipe$1.pipe = pipe;
function pipeFromArray$1(fns) {
    if (fns.length === 0) {
        return identity_1$e.identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
pipe$1.pipeFromArray = pipeFromArray$1;

Object.defineProperty(Observable$2, "__esModule", { value: true });
Observable$2.Observable = void 0;
var Subscriber_1$3 = Subscriber$1;
var Subscription_1$8 = Subscription$2;
var observable_1$2 = observable$2;
var pipe_1$2 = pipe$1;
var config_1 = config$1;
var isFunction_1$o = isFunction$2;
var errorContext_1$1 = errorContext$2;
var Observable$1 = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber$1(observerOrNext) ? observerOrNext : new Subscriber_1$3.SafeSubscriber(observerOrNext, error, complete);
        errorContext_1$1.errorContext(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor$1(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscriber = new Subscriber_1$3.SafeSubscriber({
                next: function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscriber.unsubscribe();
                    }
                },
                error: reject,
                complete: resolve,
            });
            _this.subscribe(subscriber);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[observable_1$2.observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return pipe_1$2.pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor$1(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
Observable$2.Observable = Observable$1;
function getPromiseCtor$1(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config_1.config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver$1(value) {
    return value && isFunction_1$o.isFunction(value.next) && isFunction_1$o.isFunction(value.error) && isFunction_1$o.isFunction(value.complete);
}
function isSubscriber$1(value) {
    return (value && value instanceof Subscriber_1$3.Subscriber) || (isObserver$1(value) && Subscription_1$8.isSubscription(value));
}

var ConnectableObservable$1 = {};

var refCount$2 = {};

var lift = {};

Object.defineProperty(lift, "__esModule", { value: true });
lift.operate = lift.hasLift = void 0;
var isFunction_1$n = isFunction$2;
function hasLift$1(source) {
    return isFunction_1$n.isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
lift.hasLift = hasLift$1;
function operate$1(init) {
    return function (source) {
        if (hasLift$1(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}
lift.operate = operate$1;

var OperatorSubscriber$2 = {};

var __extends$g = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(OperatorSubscriber$2, "__esModule", { value: true });
OperatorSubscriber$2.OperatorSubscriber = OperatorSubscriber$2.createOperatorSubscriber = void 0;
var Subscriber_1$2 = Subscriber$1;
function createOperatorSubscriber$1(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber$1(destination, onNext, onComplete, onError, onFinalize);
}
OperatorSubscriber$2.createOperatorSubscriber = createOperatorSubscriber$1;
var OperatorSubscriber$1 = (function (_super) {
    __extends$g(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this.shouldUnsubscribe = shouldUnsubscribe;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            var closed_1 = this.closed;
            _super.prototype.unsubscribe.call(this);
            !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
        }
    };
    return OperatorSubscriber;
}(Subscriber_1$2.Subscriber));
OperatorSubscriber$2.OperatorSubscriber = OperatorSubscriber$1;

Object.defineProperty(refCount$2, "__esModule", { value: true });
refCount$2.refCount = void 0;
var lift_1$13 = lift;
var OperatorSubscriber_1$U = OperatorSubscriber$2;
function refCount$1() {
    return lift_1$13.operate(function (source, subscriber) {
        var connection = null;
        source._refCount++;
        var refCounter = OperatorSubscriber_1$U.createOperatorSubscriber(subscriber, undefined, undefined, undefined, function () {
            if (!source || source._refCount <= 0 || 0 < --source._refCount) {
                connection = null;
                return;
            }
            var sharedConnection = source._connection;
            var conn = connection;
            connection = null;
            if (sharedConnection && (!conn || sharedConnection === conn)) {
                sharedConnection.unsubscribe();
            }
            subscriber.unsubscribe();
        });
        source.subscribe(refCounter);
        if (!refCounter.closed) {
            connection = source.connect();
        }
    });
}
refCount$2.refCount = refCount$1;

var __extends$f = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(ConnectableObservable$1, "__esModule", { value: true });
ConnectableObservable$1.ConnectableObservable = void 0;
var Observable_1$n = Observable$2;
var Subscription_1$7 = Subscription$2;
var refCount_1 = refCount$2;
var OperatorSubscriber_1$T = OperatorSubscriber$2;
var lift_1$12 = lift;
var ConnectableObservable = (function (_super) {
    __extends$f(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subjectFactory = subjectFactory;
        _this._subject = null;
        _this._refCount = 0;
        _this._connection = null;
        if (lift_1$12.hasLift(source)) {
            _this.lift = source.lift;
        }
        return _this;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype._teardown = function () {
        this._refCount = 0;
        var _connection = this._connection;
        this._subject = this._connection = null;
        _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
    };
    ConnectableObservable.prototype.connect = function () {
        var _this = this;
        var connection = this._connection;
        if (!connection) {
            connection = this._connection = new Subscription_1$7.Subscription();
            var subject_1 = this.getSubject();
            connection.add(this.source.subscribe(OperatorSubscriber_1$T.createOperatorSubscriber(subject_1, undefined, function () {
                _this._teardown();
                subject_1.complete();
            }, function (err) {
                _this._teardown();
                subject_1.error(err);
            }, function () { return _this._teardown(); })));
            if (connection.closed) {
                this._connection = null;
                connection = Subscription_1$7.Subscription.EMPTY;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return refCount_1.refCount()(this);
    };
    return ConnectableObservable;
}(Observable_1$n.Observable));
ConnectableObservable$1.ConnectableObservable = ConnectableObservable;

var animationFrames$1 = {};

var performanceTimestampProvider = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.performanceTimestampProvider = void 0;
	exports.performanceTimestampProvider = {
	    now: function () {
	        return (exports.performanceTimestampProvider.delegate || performance).now();
	    },
	    delegate: undefined,
	};
	
} (performanceTimestampProvider));

var animationFrameProvider = {};

(function (exports) {
	var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
	};
	var __spreadArray = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.animationFrameProvider = void 0;
	var Subscription_1 = Subscription$2;
	exports.animationFrameProvider = {
	    schedule: function (callback) {
	        var request = requestAnimationFrame;
	        var cancel = cancelAnimationFrame;
	        var delegate = exports.animationFrameProvider.delegate;
	        if (delegate) {
	            request = delegate.requestAnimationFrame;
	            cancel = delegate.cancelAnimationFrame;
	        }
	        var handle = request(function (timestamp) {
	            cancel = undefined;
	            callback(timestamp);
	        });
	        return new Subscription_1.Subscription(function () { return cancel === null || cancel === void 0 ? void 0 : cancel(handle); });
	    },
	    requestAnimationFrame: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var delegate = exports.animationFrameProvider.delegate;
	        return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
	    },
	    cancelAnimationFrame: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var delegate = exports.animationFrameProvider.delegate;
	        return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
	    },
	    delegate: undefined,
	};
	
} (animationFrameProvider));

Object.defineProperty(animationFrames$1, "__esModule", { value: true });
animationFrames$1.animationFrames = void 0;
var Observable_1$m = Observable$2;
var performanceTimestampProvider_1 = performanceTimestampProvider;
var animationFrameProvider_1$1 = animationFrameProvider;
function animationFrames(timestampProvider) {
    return timestampProvider ? animationFramesFactory(timestampProvider) : DEFAULT_ANIMATION_FRAMES;
}
animationFrames$1.animationFrames = animationFrames;
function animationFramesFactory(timestampProvider) {
    return new Observable_1$m.Observable(function (subscriber) {
        var provider = timestampProvider || performanceTimestampProvider_1.performanceTimestampProvider;
        var start = provider.now();
        var id = 0;
        var run = function () {
            if (!subscriber.closed) {
                id = animationFrameProvider_1$1.animationFrameProvider.requestAnimationFrame(function (timestamp) {
                    id = 0;
                    var now = provider.now();
                    subscriber.next({
                        timestamp: timestampProvider ? now : timestamp,
                        elapsed: now - start,
                    });
                    run();
                });
            }
        };
        run();
        return function () {
            if (id) {
                animationFrameProvider_1$1.animationFrameProvider.cancelAnimationFrame(id);
            }
        };
    });
}
var DEFAULT_ANIMATION_FRAMES = animationFramesFactory();

var Subject$2 = {};

var ObjectUnsubscribedError$1 = {};

Object.defineProperty(ObjectUnsubscribedError$1, "__esModule", { value: true });
ObjectUnsubscribedError$1.ObjectUnsubscribedError = void 0;
var createErrorClass_1$4 = createErrorClass$2;
ObjectUnsubscribedError$1.ObjectUnsubscribedError = createErrorClass_1$4.createErrorClass(function (_super) {
    return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = 'ObjectUnsubscribedError';
        this.message = 'object unsubscribed';
    };
});

var __extends$e = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values$9 = (commonjsGlobal && commonjsGlobal.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(Subject$2, "__esModule", { value: true });
Subject$2.AnonymousSubject = Subject$2.Subject = void 0;
var Observable_1$l = Observable$2;
var Subscription_1$6 = Subscription$2;
var ObjectUnsubscribedError_1 = ObjectUnsubscribedError$1;
var arrRemove_1$6 = arrRemove$2;
var errorContext_1 = errorContext$2;
var Subject$1 = (function (_super) {
    __extends$e(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.currentObservers = null;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject$1(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype._throwIfClosed = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
    };
    Subject.prototype.next = function (value) {
        var _this = this;
        errorContext_1.errorContext(function () {
            var e_1, _a;
            _this._throwIfClosed();
            if (!_this.isStopped) {
                if (!_this.currentObservers) {
                    _this.currentObservers = Array.from(_this.observers);
                }
                try {
                    for (var _b = __values$9(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var observer = _c.value;
                        observer.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    };
    Subject.prototype.error = function (err) {
        var _this = this;
        errorContext_1.errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.hasError = _this.isStopped = true;
                _this.thrownError = err;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    };
    Subject.prototype.complete = function () {
        var _this = this;
        errorContext_1.errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.isStopped = true;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = this.closed = true;
        this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject.prototype, "observed", {
        get: function () {
            var _a;
            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
    });
    Subject.prototype._trySubscribe = function (subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    };
    Subject.prototype._innerSubscribe = function (subscriber) {
        var _this = this;
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        if (hasError || isStopped) {
            return Subscription_1$6.EMPTY_SUBSCRIPTION;
        }
        this.currentObservers = null;
        observers.push(subscriber);
        return new Subscription_1$6.Subscription(function () {
            _this.currentObservers = null;
            arrRemove_1$6.arrRemove(observers, subscriber);
        });
    };
    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_1$l.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject$1(destination, source);
    };
    return Subject;
}(Observable_1$l.Observable));
Subject$2.Subject = Subject$1;
var AnonymousSubject$1 = (function (_super) {
    __extends$e(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject.prototype.error = function (err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject.prototype.complete = function () {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : Subscription_1$6.EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject;
}(Subject$1));
Subject$2.AnonymousSubject = AnonymousSubject$1;

var BehaviorSubject$1 = {};

var __extends$d = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(BehaviorSubject$1, "__esModule", { value: true });
BehaviorSubject$1.BehaviorSubject = void 0;
var Subject_1$e = Subject$2;
var BehaviorSubject = (function (_super) {
    __extends$d(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: false,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        !subscription.closed && subscriber.next(this._value);
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
        if (hasError) {
            throw thrownError;
        }
        this._throwIfClosed();
        return _value;
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, (this._value = value));
    };
    return BehaviorSubject;
}(Subject_1$e.Subject));
BehaviorSubject$1.BehaviorSubject = BehaviorSubject;

var ReplaySubject$1 = {};

var dateTimestampProvider$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.dateTimestampProvider = void 0;
	exports.dateTimestampProvider = {
	    now: function () {
	        return (exports.dateTimestampProvider.delegate || Date).now();
	    },
	    delegate: undefined,
	};
	
} (dateTimestampProvider$1));

var __extends$c = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(ReplaySubject$1, "__esModule", { value: true });
ReplaySubject$1.ReplaySubject = void 0;
var Subject_1$d = Subject$2;
var dateTimestampProvider_1$2 = dateTimestampProvider$1;
var ReplaySubject = (function (_super) {
    __extends$c(ReplaySubject, _super);
    function ReplaySubject(_bufferSize, _windowTime, _timestampProvider) {
        if (_bufferSize === void 0) { _bufferSize = Infinity; }
        if (_windowTime === void 0) { _windowTime = Infinity; }
        if (_timestampProvider === void 0) { _timestampProvider = dateTimestampProvider_1$2.dateTimestampProvider; }
        var _this = _super.call(this) || this;
        _this._bufferSize = _bufferSize;
        _this._windowTime = _windowTime;
        _this._timestampProvider = _timestampProvider;
        _this._buffer = [];
        _this._infiniteTimeWindow = true;
        _this._infiniteTimeWindow = _windowTime === Infinity;
        _this._bufferSize = Math.max(1, _bufferSize);
        _this._windowTime = Math.max(1, _windowTime);
        return _this;
    }
    ReplaySubject.prototype.next = function (value) {
        var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
        if (!isStopped) {
            _buffer.push(value);
            !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
        }
        this._trimBuffer();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._trimBuffer();
        var subscription = this._innerSubscribe(subscriber);
        var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
        var copy = _buffer.slice();
        for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
            subscriber.next(copy[i]);
        }
        this._checkFinalizedStatuses(subscriber);
        return subscription;
    };
    ReplaySubject.prototype._trimBuffer = function () {
        var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
        var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
        _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
        if (!_infiniteTimeWindow) {
            var now = _timestampProvider.now();
            var last = 0;
            for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
                last = i;
            }
            last && _buffer.splice(0, last + 1);
        }
    };
    return ReplaySubject;
}(Subject_1$d.Subject));
ReplaySubject$1.ReplaySubject = ReplaySubject;

var AsyncSubject$1 = {};

var __extends$b = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(AsyncSubject$1, "__esModule", { value: true });
AsyncSubject$1.AsyncSubject = void 0;
var Subject_1$c = Subject$2;
var AsyncSubject = (function (_super) {
    __extends$b(AsyncSubject, _super);
    function AsyncSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._value = null;
        _this._hasValue = false;
        _this._isComplete = false;
        return _this;
    }
    AsyncSubject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, _hasValue = _a._hasValue, _value = _a._value, thrownError = _a.thrownError, isStopped = _a.isStopped, _isComplete = _a._isComplete;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped || _isComplete) {
            _hasValue && subscriber.next(_value);
            subscriber.complete();
        }
    };
    AsyncSubject.prototype.next = function (value) {
        if (!this.isStopped) {
            this._value = value;
            this._hasValue = true;
        }
    };
    AsyncSubject.prototype.complete = function () {
        var _a = this, _hasValue = _a._hasValue, _value = _a._value, _isComplete = _a._isComplete;
        if (!_isComplete) {
            this._isComplete = true;
            _hasValue && _super.prototype.next.call(this, _value);
            _super.prototype.complete.call(this);
        }
    };
    return AsyncSubject;
}(Subject_1$c.Subject));
AsyncSubject$1.AsyncSubject = AsyncSubject;

var asap = {};

var AsapAction$1 = {};

var AsyncAction$2 = {};

var Action$2 = {};

var __extends$a = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(Action$2, "__esModule", { value: true });
Action$2.Action = void 0;
var Subscription_1$5 = Subscription$2;
var Action$1 = (function (_super) {
    __extends$a(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        return this;
    };
    return Action;
}(Subscription_1$5.Subscription));
Action$2.Action = Action$1;

var intervalProvider$1 = {};

(function (exports) {
	var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
	};
	var __spreadArray = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.intervalProvider = void 0;
	exports.intervalProvider = {
	    setInterval: function (handler, timeout) {
	        var args = [];
	        for (var _i = 2; _i < arguments.length; _i++) {
	            args[_i - 2] = arguments[_i];
	        }
	        var delegate = exports.intervalProvider.delegate;
	        if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
	            return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout], __read(args)));
	        }
	        return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
	    },
	    clearInterval: function (handle) {
	        var delegate = exports.intervalProvider.delegate;
	        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
	    },
	    delegate: undefined,
	};
	
} (intervalProvider$1));

var __extends$9 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(AsyncAction$2, "__esModule", { value: true });
AsyncAction$2.AsyncAction = void 0;
var Action_1 = Action$2;
var intervalProvider_1 = intervalProvider$1;
var arrRemove_1$5 = arrRemove$2;
var AsyncAction$1 = (function (_super) {
    __extends$9(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        var _a;
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
        if (delay === void 0) { delay = 0; }
        return intervalProvider_1.intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay != null && this.delay === delay && this.pending === false) {
            return id;
        }
        if (id != null) {
            intervalProvider_1.intervalProvider.clearInterval(id);
        }
        return undefined;
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, _delay) {
        var errored = false;
        var errorValue;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = e ? e : new Error('Scheduled action threw falsy error');
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype.unsubscribe = function () {
        if (!this.closed) {
            var _a = this, id = _a.id, scheduler = _a.scheduler;
            var actions = scheduler.actions;
            this.work = this.state = this.scheduler = null;
            this.pending = false;
            arrRemove_1$5.arrRemove(actions, this);
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, null);
            }
            this.delay = null;
            _super.prototype.unsubscribe.call(this);
        }
    };
    return AsyncAction;
}(Action_1.Action));
AsyncAction$2.AsyncAction = AsyncAction$1;

var immediateProvider = {};

var Immediate = {};

Object.defineProperty(Immediate, "__esModule", { value: true });
Immediate.TestTools = Immediate.Immediate = void 0;
var nextHandle = 1;
var resolved;
var activeHandles = {};
function findAndClearHandle(handle) {
    if (handle in activeHandles) {
        delete activeHandles[handle];
        return true;
    }
    return false;
}
Immediate.Immediate = {
    setImmediate: function (cb) {
        var handle = nextHandle++;
        activeHandles[handle] = true;
        if (!resolved) {
            resolved = Promise.resolve();
        }
        resolved.then(function () { return findAndClearHandle(handle) && cb(); });
        return handle;
    },
    clearImmediate: function (handle) {
        findAndClearHandle(handle);
    },
};
Immediate.TestTools = {
    pending: function () {
        return Object.keys(activeHandles).length;
    }
};

(function (exports) {
	var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
	};
	var __spreadArray = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.immediateProvider = void 0;
	var Immediate_1 = Immediate;
	var setImmediate = Immediate_1.Immediate.setImmediate, clearImmediate = Immediate_1.Immediate.clearImmediate;
	exports.immediateProvider = {
	    setImmediate: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var delegate = exports.immediateProvider.delegate;
	        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setImmediate) || setImmediate).apply(void 0, __spreadArray([], __read(args)));
	    },
	    clearImmediate: function (handle) {
	        var delegate = exports.immediateProvider.delegate;
	        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearImmediate) || clearImmediate)(handle);
	    },
	    delegate: undefined,
	};
	
} (immediateProvider));

var __extends$8 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(AsapAction$1, "__esModule", { value: true });
AsapAction$1.AsapAction = void 0;
var AsyncAction_1$3 = AsyncAction$2;
var immediateProvider_1 = immediateProvider;
var AsapAction = (function (_super) {
    __extends$8(AsapAction, _super);
    function AsapAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler._scheduled || (scheduler._scheduled = immediateProvider_1.immediateProvider.setImmediate(scheduler.flush.bind(scheduler, undefined)));
    };
    AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        var _a;
        if (delay === void 0) { delay = 0; }
        if (delay != null ? delay > 0 : this.delay > 0) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        var actions = scheduler.actions;
        if (id != null && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
            immediateProvider_1.immediateProvider.clearImmediate(id);
            scheduler._scheduled = undefined;
        }
        return undefined;
    };
    return AsapAction;
}(AsyncAction_1$3.AsyncAction));
AsapAction$1.AsapAction = AsapAction;

var AsapScheduler$1 = {};

var AsyncScheduler$2 = {};

var Scheduler$2 = {};

Object.defineProperty(Scheduler$2, "__esModule", { value: true });
Scheduler$2.Scheduler = void 0;
var dateTimestampProvider_1$1 = dateTimestampProvider$1;
var Scheduler$1 = (function () {
    function Scheduler(schedulerActionCtor, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.schedulerActionCtor = schedulerActionCtor;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.schedulerActionCtor(this, work).schedule(state, delay);
    };
    Scheduler.now = dateTimestampProvider_1$1.dateTimestampProvider.now;
    return Scheduler;
}());
Scheduler$2.Scheduler = Scheduler$1;

var __extends$7 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(AsyncScheduler$2, "__esModule", { value: true });
AsyncScheduler$2.AsyncScheduler = void 0;
var Scheduler_1 = Scheduler$2;
var AsyncScheduler$1 = (function (_super) {
    __extends$7(AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler_1.Scheduler.now; }
        var _this = _super.call(this, SchedulerAction, now) || this;
        _this.actions = [];
        _this._active = false;
        return _this;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this._active) {
            actions.push(action);
            return;
        }
        var error;
        this._active = true;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions.shift()));
        this._active = false;
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_1.Scheduler));
AsyncScheduler$2.AsyncScheduler = AsyncScheduler$1;

var __extends$6 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(AsapScheduler$1, "__esModule", { value: true });
AsapScheduler$1.AsapScheduler = void 0;
var AsyncScheduler_1$3 = AsyncScheduler$2;
var AsapScheduler = (function (_super) {
    __extends$6(AsapScheduler, _super);
    function AsapScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsapScheduler.prototype.flush = function (action) {
        this._active = true;
        var flushId = this._scheduled;
        this._scheduled = undefined;
        var actions = this.actions;
        var error;
        action = action || actions.shift();
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions[0]) && action.id === flushId && actions.shift());
        this._active = false;
        if (error) {
            while ((action = actions[0]) && action.id === flushId && actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsapScheduler;
}(AsyncScheduler_1$3.AsyncScheduler));
AsapScheduler$1.AsapScheduler = AsapScheduler;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.asap = exports.asapScheduler = void 0;
	var AsapAction_1 = AsapAction$1;
	var AsapScheduler_1 = AsapScheduler$1;
	exports.asapScheduler = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
	exports.asap = exports.asapScheduler;
	
} (asap));

var async = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.async = exports.asyncScheduler = void 0;
	var AsyncAction_1 = AsyncAction$2;
	var AsyncScheduler_1 = AsyncScheduler$2;
	exports.asyncScheduler = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
	exports.async = exports.asyncScheduler;
	
} (async));

var queue = {};

var QueueAction$1 = {};

var __extends$5 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(QueueAction$1, "__esModule", { value: true });
QueueAction$1.QueueAction = void 0;
var AsyncAction_1$2 = AsyncAction$2;
var QueueAction = (function (_super) {
    __extends$5(QueueAction, _super);
    function QueueAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    QueueAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    };
    QueueAction.prototype.execute = function (state, delay) {
        return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if ((delay != null && delay > 0) || (delay == null && this.delay > 0)) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.flush(this);
        return 0;
    };
    return QueueAction;
}(AsyncAction_1$2.AsyncAction));
QueueAction$1.QueueAction = QueueAction;

var QueueScheduler$1 = {};

var __extends$4 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(QueueScheduler$1, "__esModule", { value: true });
QueueScheduler$1.QueueScheduler = void 0;
var AsyncScheduler_1$2 = AsyncScheduler$2;
var QueueScheduler = (function (_super) {
    __extends$4(QueueScheduler, _super);
    function QueueScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QueueScheduler;
}(AsyncScheduler_1$2.AsyncScheduler));
QueueScheduler$1.QueueScheduler = QueueScheduler;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.queue = exports.queueScheduler = void 0;
	var QueueAction_1 = QueueAction$1;
	var QueueScheduler_1 = QueueScheduler$1;
	exports.queueScheduler = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
	exports.queue = exports.queueScheduler;
	
} (queue));

var animationFrame = {};

var AnimationFrameAction$1 = {};

var __extends$3 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(AnimationFrameAction$1, "__esModule", { value: true });
AnimationFrameAction$1.AnimationFrameAction = void 0;
var AsyncAction_1$1 = AsyncAction$2;
var animationFrameProvider_1 = animationFrameProvider;
var AnimationFrameAction = (function (_super) {
    __extends$3(AnimationFrameAction, _super);
    function AnimationFrameAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler._scheduled || (scheduler._scheduled = animationFrameProvider_1.animationFrameProvider.requestAnimationFrame(function () { return scheduler.flush(undefined); }));
    };
    AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        var _a;
        if (delay === void 0) { delay = 0; }
        if (delay != null ? delay > 0 : this.delay > 0) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        var actions = scheduler.actions;
        if (id != null && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
            animationFrameProvider_1.animationFrameProvider.cancelAnimationFrame(id);
            scheduler._scheduled = undefined;
        }
        return undefined;
    };
    return AnimationFrameAction;
}(AsyncAction_1$1.AsyncAction));
AnimationFrameAction$1.AnimationFrameAction = AnimationFrameAction;

var AnimationFrameScheduler$1 = {};

var __extends$2 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(AnimationFrameScheduler$1, "__esModule", { value: true });
AnimationFrameScheduler$1.AnimationFrameScheduler = void 0;
var AsyncScheduler_1$1 = AsyncScheduler$2;
var AnimationFrameScheduler = (function (_super) {
    __extends$2(AnimationFrameScheduler, _super);
    function AnimationFrameScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimationFrameScheduler.prototype.flush = function (action) {
        this._active = true;
        var flushId = this._scheduled;
        this._scheduled = undefined;
        var actions = this.actions;
        var error;
        action = action || actions.shift();
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions[0]) && action.id === flushId && actions.shift());
        this._active = false;
        if (error) {
            while ((action = actions[0]) && action.id === flushId && actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AnimationFrameScheduler;
}(AsyncScheduler_1$1.AsyncScheduler));
AnimationFrameScheduler$1.AnimationFrameScheduler = AnimationFrameScheduler;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.animationFrame = exports.animationFrameScheduler = void 0;
	var AnimationFrameAction_1 = AnimationFrameAction$1;
	var AnimationFrameScheduler_1 = AnimationFrameScheduler$1;
	exports.animationFrameScheduler = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);
	exports.animationFrame = exports.animationFrameScheduler;
	
} (animationFrame));

var VirtualTimeScheduler$1 = {};

var __extends$1 = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(VirtualTimeScheduler$1, "__esModule", { value: true });
VirtualTimeScheduler$1.VirtualAction = VirtualTimeScheduler$1.VirtualTimeScheduler = void 0;
var AsyncAction_1 = AsyncAction$2;
var Subscription_1$4 = Subscription$2;
var AsyncScheduler_1 = AsyncScheduler$2;
var VirtualTimeScheduler = (function (_super) {
    __extends$1(VirtualTimeScheduler, _super);
    function VirtualTimeScheduler(schedulerActionCtor, maxFrames) {
        if (schedulerActionCtor === void 0) { schedulerActionCtor = VirtualAction; }
        if (maxFrames === void 0) { maxFrames = Infinity; }
        var _this = _super.call(this, schedulerActionCtor, function () { return _this.frame; }) || this;
        _this.maxFrames = maxFrames;
        _this.frame = 0;
        _this.index = -1;
        return _this;
    }
    VirtualTimeScheduler.prototype.flush = function () {
        var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
        var error;
        var action;
        while ((action = actions[0]) && action.delay <= maxFrames) {
            actions.shift();
            this.frame = action.delay;
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        }
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    VirtualTimeScheduler.frameTimeFactor = 10;
    return VirtualTimeScheduler;
}(AsyncScheduler_1.AsyncScheduler));
VirtualTimeScheduler$1.VirtualTimeScheduler = VirtualTimeScheduler;
var VirtualAction = (function (_super) {
    __extends$1(VirtualAction, _super);
    function VirtualAction(scheduler, work, index) {
        if (index === void 0) { index = (scheduler.index += 1); }
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.index = index;
        _this.active = true;
        _this.index = scheduler.index = index;
        return _this;
    }
    VirtualAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (Number.isFinite(delay)) {
            if (!this.id) {
                return _super.prototype.schedule.call(this, state, delay);
            }
            this.active = false;
            var action = new VirtualAction(this.scheduler, this.work);
            this.add(action);
            return action.schedule(state, delay);
        }
        else {
            return Subscription_1$4.Subscription.EMPTY;
        }
    };
    VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        this.delay = scheduler.frame + delay;
        var actions = scheduler.actions;
        actions.push(this);
        actions.sort(VirtualAction.sortActions);
        return 1;
    };
    VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        return undefined;
    };
    VirtualAction.prototype._execute = function (state, delay) {
        if (this.active === true) {
            return _super.prototype._execute.call(this, state, delay);
        }
    };
    VirtualAction.sortActions = function (a, b) {
        if (a.delay === b.delay) {
            if (a.index === b.index) {
                return 0;
            }
            else if (a.index > b.index) {
                return 1;
            }
            else {
                return -1;
            }
        }
        else if (a.delay > b.delay) {
            return 1;
        }
        else {
            return -1;
        }
    };
    return VirtualAction;
}(AsyncAction_1.AsyncAction));
VirtualTimeScheduler$1.VirtualAction = VirtualAction;

var Notification = {};

var empty = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.empty = exports.EMPTY = void 0;
	var Observable_1 = Observable$2;
	exports.EMPTY = new Observable_1.Observable(function (subscriber) { return subscriber.complete(); });
	function empty(scheduler) {
	    return scheduler ? emptyScheduled(scheduler) : exports.EMPTY;
	}
	exports.empty = empty;
	function emptyScheduled(scheduler) {
	    return new Observable_1.Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
	}
	
} (empty));

var of$1 = {};

var args = {};

var isScheduler$1 = {};

Object.defineProperty(isScheduler$1, "__esModule", { value: true });
isScheduler$1.isScheduler = void 0;
var isFunction_1$m = isFunction$2;
function isScheduler(value) {
    return value && isFunction_1$m.isFunction(value.schedule);
}
isScheduler$1.isScheduler = isScheduler;

Object.defineProperty(args, "__esModule", { value: true });
args.popNumber = args.popScheduler = args.popResultSelector = void 0;
var isFunction_1$l = isFunction$2;
var isScheduler_1$3 = isScheduler$1;
function last$2(arr) {
    return arr[arr.length - 1];
}
function popResultSelector(args) {
    return isFunction_1$l.isFunction(last$2(args)) ? args.pop() : undefined;
}
args.popResultSelector = popResultSelector;
function popScheduler(args) {
    return isScheduler_1$3.isScheduler(last$2(args)) ? args.pop() : undefined;
}
args.popScheduler = popScheduler;
function popNumber(args, defaultValue) {
    return typeof last$2(args) === 'number' ? args.pop() : defaultValue;
}
args.popNumber = popNumber;

var from$1 = {};

var scheduled$1 = {};

var scheduleObservable$1 = {};

var innerFrom$1 = {};

var isArrayLike = {};

Object.defineProperty(isArrayLike, "__esModule", { value: true });
isArrayLike.isArrayLike = void 0;
isArrayLike.isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

var isPromise$1 = {};

Object.defineProperty(isPromise$1, "__esModule", { value: true });
isPromise$1.isPromise = void 0;
var isFunction_1$k = isFunction$2;
function isPromise(value) {
    return isFunction_1$k.isFunction(value === null || value === void 0 ? void 0 : value.then);
}
isPromise$1.isPromise = isPromise;

var isInteropObservable$1 = {};

Object.defineProperty(isInteropObservable$1, "__esModule", { value: true });
isInteropObservable$1.isInteropObservable = void 0;
var observable_1$1 = observable$2;
var isFunction_1$j = isFunction$2;
function isInteropObservable(input) {
    return isFunction_1$j.isFunction(input[observable_1$1.observable]);
}
isInteropObservable$1.isInteropObservable = isInteropObservable;

var isAsyncIterable$1 = {};

Object.defineProperty(isAsyncIterable$1, "__esModule", { value: true });
isAsyncIterable$1.isAsyncIterable = void 0;
var isFunction_1$i = isFunction$2;
function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction_1$i.isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
isAsyncIterable$1.isAsyncIterable = isAsyncIterable;

var throwUnobservableError = {};

Object.defineProperty(throwUnobservableError, "__esModule", { value: true });
throwUnobservableError.createInvalidObservableTypeError = void 0;
function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
throwUnobservableError.createInvalidObservableTypeError = createInvalidObservableTypeError;

var isIterable$1 = {};

var iterator = {};

Object.defineProperty(iterator, "__esModule", { value: true });
iterator.iterator = iterator.getSymbolIterator = void 0;
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
iterator.getSymbolIterator = getSymbolIterator;
iterator.iterator = getSymbolIterator();

Object.defineProperty(isIterable$1, "__esModule", { value: true });
isIterable$1.isIterable = void 0;
var iterator_1$1 = iterator;
var isFunction_1$h = isFunction$2;
function isIterable(input) {
    return isFunction_1$h.isFunction(input === null || input === void 0 ? void 0 : input[iterator_1$1.iterator]);
}
isIterable$1.isIterable = isIterable;

var isReadableStreamLike$1 = {};

var __generator$2 = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
};
var __await = (commonjsGlobal && commonjsGlobal.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); };
var __asyncGenerator = (commonjsGlobal && commonjsGlobal.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(isReadableStreamLike$1, "__esModule", { value: true });
isReadableStreamLike$1.isReadableStreamLike = isReadableStreamLike$1.readableStreamLikeToAsyncGenerator = void 0;
var isFunction_1$g = isFunction$2;
function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return __generator$2(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = readableStream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    return [4, __await(reader.read())];
                case 3:
                    _a = _b.sent(), value = _a.value, done = _a.done;
                    if (!done) return [3, 5];
                    return [4, __await(void 0)];
                case 4: return [2, _b.sent()];
                case 5: return [4, __await(value)];
                case 6: return [4, _b.sent()];
                case 7:
                    _b.sent();
                    return [3, 2];
                case 8: return [3, 10];
                case 9:
                    reader.releaseLock();
                    return [7];
                case 10: return [2];
            }
        });
    });
}
isReadableStreamLike$1.readableStreamLikeToAsyncGenerator = readableStreamLikeToAsyncGenerator;
function isReadableStreamLike(obj) {
    return isFunction_1$g.isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
isReadableStreamLike$1.isReadableStreamLike = isReadableStreamLike;

var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$1 = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
};
var __asyncValues = (commonjsGlobal && commonjsGlobal.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values$8 === "function" ? __values$8(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __values$8 = (commonjsGlobal && commonjsGlobal.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(innerFrom$1, "__esModule", { value: true });
innerFrom$1.fromReadableStreamLike = innerFrom$1.fromAsyncIterable = innerFrom$1.fromIterable = innerFrom$1.fromPromise = innerFrom$1.fromArrayLike = innerFrom$1.fromInteropObservable = innerFrom$1.innerFrom = void 0;
var isArrayLike_1$2 = isArrayLike;
var isPromise_1$1 = isPromise$1;
var Observable_1$k = Observable$2;
var isInteropObservable_1$1 = isInteropObservable$1;
var isAsyncIterable_1$1 = isAsyncIterable$1;
var throwUnobservableError_1$1 = throwUnobservableError;
var isIterable_1$1 = isIterable$1;
var isReadableStreamLike_1$2 = isReadableStreamLike$1;
var isFunction_1$f = isFunction$2;
var reportUnhandledError_1 = reportUnhandledError$2;
var observable_1 = observable$2;
function innerFrom(input) {
    if (input instanceof Observable_1$k.Observable) {
        return input;
    }
    if (input != null) {
        if (isInteropObservable_1$1.isInteropObservable(input)) {
            return fromInteropObservable(input);
        }
        if (isArrayLike_1$2.isArrayLike(input)) {
            return fromArrayLike(input);
        }
        if (isPromise_1$1.isPromise(input)) {
            return fromPromise(input);
        }
        if (isAsyncIterable_1$1.isAsyncIterable(input)) {
            return fromAsyncIterable(input);
        }
        if (isIterable_1$1.isIterable(input)) {
            return fromIterable(input);
        }
        if (isReadableStreamLike_1$2.isReadableStreamLike(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw throwUnobservableError_1$1.createInvalidObservableTypeError(input);
}
innerFrom$1.innerFrom = innerFrom;
function fromInteropObservable(obj) {
    return new Observable_1$k.Observable(function (subscriber) {
        var obs = obj[observable_1.observable]();
        if (isFunction_1$f.isFunction(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
innerFrom$1.fromInteropObservable = fromInteropObservable;
function fromArrayLike(array) {
    return new Observable_1$k.Observable(function (subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
innerFrom$1.fromArrayLike = fromArrayLike;
function fromPromise(promise) {
    return new Observable_1$k.Observable(function (subscriber) {
        promise
            .then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, reportUnhandledError_1.reportUnhandledError);
    });
}
innerFrom$1.fromPromise = fromPromise;
function fromIterable(iterable) {
    return new Observable_1$k.Observable(function (subscriber) {
        var e_1, _a;
        try {
            for (var iterable_1 = __values$8(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}
innerFrom$1.fromIterable = fromIterable;
function fromAsyncIterable(asyncIterable) {
    return new Observable_1$k.Observable(function (subscriber) {
        process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
    });
}
innerFrom$1.fromAsyncIterable = fromAsyncIterable;
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(isReadableStreamLike_1$2.readableStreamLikeToAsyncGenerator(readableStream));
}
innerFrom$1.fromReadableStreamLike = fromReadableStreamLike;
function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function () {
        var value, e_2_1;
        return __generator$1(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 11]);
                    asyncIterable_1 = __asyncValues(asyncIterable);
                    _b.label = 1;
                case 1: return [4, asyncIterable_1.next()];
                case 2:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                    value = asyncIterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return [2];
                    }
                    _b.label = 3;
                case 3: return [3, 1];
                case 4: return [3, 11];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 11];
                case 6:
                    _b.trys.push([6, , 9, 10]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                    return [4, _a.call(asyncIterable_1)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 10];
                case 9:
                    if (e_2) throw e_2.error;
                    return [7];
                case 10: return [7];
                case 11:
                    subscriber.complete();
                    return [2];
            }
        });
    });
}

var observeOn$1 = {};

var executeSchedule$1 = {};

Object.defineProperty(executeSchedule$1, "__esModule", { value: true });
executeSchedule$1.executeSchedule = void 0;
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) { delay = 0; }
    if (repeat === void 0) { repeat = false; }
    var scheduleSubscription = scheduler.schedule(function () {
        work();
        if (repeat) {
            parentSubscription.add(this.schedule(null, delay));
        }
        else {
            this.unsubscribe();
        }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
        return scheduleSubscription;
    }
}
executeSchedule$1.executeSchedule = executeSchedule;

Object.defineProperty(observeOn$1, "__esModule", { value: true });
observeOn$1.observeOn = void 0;
var executeSchedule_1$6 = executeSchedule$1;
var lift_1$11 = lift;
var OperatorSubscriber_1$S = OperatorSubscriber$2;
function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return lift_1$11.operate(function (source, subscriber) {
        source.subscribe(OperatorSubscriber_1$S.createOperatorSubscriber(subscriber, function (value) { return executeSchedule_1$6.executeSchedule(subscriber, scheduler, function () { return subscriber.next(value); }, delay); }, function () { return executeSchedule_1$6.executeSchedule(subscriber, scheduler, function () { return subscriber.complete(); }, delay); }, function (err) { return executeSchedule_1$6.executeSchedule(subscriber, scheduler, function () { return subscriber.error(err); }, delay); }));
    });
}
observeOn$1.observeOn = observeOn;

var subscribeOn$1 = {};

Object.defineProperty(subscribeOn$1, "__esModule", { value: true });
subscribeOn$1.subscribeOn = void 0;
var lift_1$10 = lift;
function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return lift_1$10.operate(function (source, subscriber) {
        subscriber.add(scheduler.schedule(function () { return source.subscribe(subscriber); }, delay));
    });
}
subscribeOn$1.subscribeOn = subscribeOn;

Object.defineProperty(scheduleObservable$1, "__esModule", { value: true });
scheduleObservable$1.scheduleObservable = void 0;
var innerFrom_1$C = innerFrom$1;
var observeOn_1$2 = observeOn$1;
var subscribeOn_1$2 = subscribeOn$1;
function scheduleObservable(input, scheduler) {
    return innerFrom_1$C.innerFrom(input).pipe(subscribeOn_1$2.subscribeOn(scheduler), observeOn_1$2.observeOn(scheduler));
}
scheduleObservable$1.scheduleObservable = scheduleObservable;

var schedulePromise$1 = {};

Object.defineProperty(schedulePromise$1, "__esModule", { value: true });
schedulePromise$1.schedulePromise = void 0;
var innerFrom_1$B = innerFrom$1;
var observeOn_1$1 = observeOn$1;
var subscribeOn_1$1 = subscribeOn$1;
function schedulePromise(input, scheduler) {
    return innerFrom_1$B.innerFrom(input).pipe(subscribeOn_1$1.subscribeOn(scheduler), observeOn_1$1.observeOn(scheduler));
}
schedulePromise$1.schedulePromise = schedulePromise;

var scheduleArray$1 = {};

Object.defineProperty(scheduleArray$1, "__esModule", { value: true });
scheduleArray$1.scheduleArray = void 0;
var Observable_1$j = Observable$2;
function scheduleArray(input, scheduler) {
    return new Observable_1$j.Observable(function (subscriber) {
        var i = 0;
        return scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
            }
            else {
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    this.schedule();
                }
            }
        });
    });
}
scheduleArray$1.scheduleArray = scheduleArray;

var scheduleIterable$1 = {};

Object.defineProperty(scheduleIterable$1, "__esModule", { value: true });
scheduleIterable$1.scheduleIterable = void 0;
var Observable_1$i = Observable$2;
var iterator_1 = iterator;
var isFunction_1$e = isFunction$2;
var executeSchedule_1$5 = executeSchedule$1;
function scheduleIterable(input, scheduler) {
    return new Observable_1$i.Observable(function (subscriber) {
        var iterator;
        executeSchedule_1$5.executeSchedule(subscriber, scheduler, function () {
            iterator = input[iterator_1.iterator]();
            executeSchedule_1$5.executeSchedule(subscriber, scheduler, function () {
                var _a;
                var value;
                var done;
                try {
                    (_a = iterator.next(), value = _a.value, done = _a.done);
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                }
            }, 0, true);
        });
        return function () { return isFunction_1$e.isFunction(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return(); };
    });
}
scheduleIterable$1.scheduleIterable = scheduleIterable;

var scheduleAsyncIterable$1 = {};

Object.defineProperty(scheduleAsyncIterable$1, "__esModule", { value: true });
scheduleAsyncIterable$1.scheduleAsyncIterable = void 0;
var Observable_1$h = Observable$2;
var executeSchedule_1$4 = executeSchedule$1;
function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new Observable_1$h.Observable(function (subscriber) {
        executeSchedule_1$4.executeSchedule(subscriber, scheduler, function () {
            var iterator = input[Symbol.asyncIterator]();
            executeSchedule_1$4.executeSchedule(subscriber, scheduler, function () {
                iterator.next().then(function (result) {
                    if (result.done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(result.value);
                    }
                });
            }, 0, true);
        });
    });
}
scheduleAsyncIterable$1.scheduleAsyncIterable = scheduleAsyncIterable;

var scheduleReadableStreamLike$1 = {};

Object.defineProperty(scheduleReadableStreamLike$1, "__esModule", { value: true });
scheduleReadableStreamLike$1.scheduleReadableStreamLike = void 0;
var scheduleAsyncIterable_1$1 = scheduleAsyncIterable$1;
var isReadableStreamLike_1$1 = isReadableStreamLike$1;
function scheduleReadableStreamLike(input, scheduler) {
    return scheduleAsyncIterable_1$1.scheduleAsyncIterable(isReadableStreamLike_1$1.readableStreamLikeToAsyncGenerator(input), scheduler);
}
scheduleReadableStreamLike$1.scheduleReadableStreamLike = scheduleReadableStreamLike;

Object.defineProperty(scheduled$1, "__esModule", { value: true });
scheduled$1.scheduled = void 0;
var scheduleObservable_1 = scheduleObservable$1;
var schedulePromise_1 = schedulePromise$1;
var scheduleArray_1 = scheduleArray$1;
var scheduleIterable_1$1 = scheduleIterable$1;
var scheduleAsyncIterable_1 = scheduleAsyncIterable$1;
var isInteropObservable_1 = isInteropObservable$1;
var isPromise_1 = isPromise$1;
var isArrayLike_1$1 = isArrayLike;
var isIterable_1 = isIterable$1;
var isAsyncIterable_1 = isAsyncIterable$1;
var throwUnobservableError_1 = throwUnobservableError;
var isReadableStreamLike_1 = isReadableStreamLike$1;
var scheduleReadableStreamLike_1 = scheduleReadableStreamLike$1;
function scheduled(input, scheduler) {
    if (input != null) {
        if (isInteropObservable_1.isInteropObservable(input)) {
            return scheduleObservable_1.scheduleObservable(input, scheduler);
        }
        if (isArrayLike_1$1.isArrayLike(input)) {
            return scheduleArray_1.scheduleArray(input, scheduler);
        }
        if (isPromise_1.isPromise(input)) {
            return schedulePromise_1.schedulePromise(input, scheduler);
        }
        if (isAsyncIterable_1.isAsyncIterable(input)) {
            return scheduleAsyncIterable_1.scheduleAsyncIterable(input, scheduler);
        }
        if (isIterable_1.isIterable(input)) {
            return scheduleIterable_1$1.scheduleIterable(input, scheduler);
        }
        if (isReadableStreamLike_1.isReadableStreamLike(input)) {
            return scheduleReadableStreamLike_1.scheduleReadableStreamLike(input, scheduler);
        }
    }
    throw throwUnobservableError_1.createInvalidObservableTypeError(input);
}
scheduled$1.scheduled = scheduled;

Object.defineProperty(from$1, "__esModule", { value: true });
from$1.from = void 0;
var scheduled_1 = scheduled$1;
var innerFrom_1$A = innerFrom$1;
function from(input, scheduler) {
    return scheduler ? scheduled_1.scheduled(input, scheduler) : innerFrom_1$A.innerFrom(input);
}
from$1.from = from;

Object.defineProperty(of$1, "__esModule", { value: true });
of$1.of = void 0;
var args_1$c = args;
var from_1$6 = from$1;
function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args_1$c.popScheduler(args);
    return from_1$6.from(args, scheduler);
}
of$1.of = of;

var throwError$1 = {};

Object.defineProperty(throwError$1, "__esModule", { value: true });
throwError$1.throwError = void 0;
var Observable_1$g = Observable$2;
var isFunction_1$d = isFunction$2;
function throwError(errorOrErrorFactory, scheduler) {
    var errorFactory = isFunction_1$d.isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function () { return errorOrErrorFactory; };
    var init = function (subscriber) { return subscriber.error(errorFactory()); };
    return new Observable_1$g.Observable(scheduler ? function (subscriber) { return scheduler.schedule(init, 0, subscriber); } : init);
}
throwError$1.throwError = throwError;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.observeNotification = exports.Notification = exports.NotificationKind = void 0;
	var empty_1 = empty;
	var of_1 = of$1;
	var throwError_1 = throwError$1;
	var isFunction_1 = isFunction$2;
	(function (NotificationKind) {
	    NotificationKind["NEXT"] = "N";
	    NotificationKind["ERROR"] = "E";
	    NotificationKind["COMPLETE"] = "C";
	})(exports.NotificationKind || (exports.NotificationKind = {}));
	var Notification = (function () {
	    function Notification(kind, value, error) {
	        this.kind = kind;
	        this.value = value;
	        this.error = error;
	        this.hasValue = kind === 'N';
	    }
	    Notification.prototype.observe = function (observer) {
	        return observeNotification(this, observer);
	    };
	    Notification.prototype.do = function (nextHandler, errorHandler, completeHandler) {
	        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
	        return kind === 'N' ? nextHandler === null || nextHandler === void 0 ? void 0 : nextHandler(value) : kind === 'E' ? errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(error) : completeHandler === null || completeHandler === void 0 ? void 0 : completeHandler();
	    };
	    Notification.prototype.accept = function (nextOrObserver, error, complete) {
	        var _a;
	        return isFunction_1.isFunction((_a = nextOrObserver) === null || _a === void 0 ? void 0 : _a.next)
	            ? this.observe(nextOrObserver)
	            : this.do(nextOrObserver, error, complete);
	    };
	    Notification.prototype.toObservable = function () {
	        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
	        var result = kind === 'N'
	            ?
	                of_1.of(value)
	            :
	                kind === 'E'
	                    ?
	                        throwError_1.throwError(function () { return error; })
	                    :
	                        kind === 'C'
	                            ?
	                                empty_1.EMPTY
	                            :
	                                0;
	        if (!result) {
	            throw new TypeError("Unexpected notification kind " + kind);
	        }
	        return result;
	    };
	    Notification.createNext = function (value) {
	        return new Notification('N', value);
	    };
	    Notification.createError = function (err) {
	        return new Notification('E', undefined, err);
	    };
	    Notification.createComplete = function () {
	        return Notification.completeNotification;
	    };
	    Notification.completeNotification = new Notification('C');
	    return Notification;
	}());
	exports.Notification = Notification;
	function observeNotification(notification, observer) {
	    var _a, _b, _c;
	    var _d = notification, kind = _d.kind, value = _d.value, error = _d.error;
	    if (typeof kind !== 'string') {
	        throw new TypeError('Invalid notification, missing "kind"');
	    }
	    kind === 'N' ? (_a = observer.next) === null || _a === void 0 ? void 0 : _a.call(observer, value) : kind === 'E' ? (_b = observer.error) === null || _b === void 0 ? void 0 : _b.call(observer, error) : (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.call(observer);
	}
	exports.observeNotification = observeNotification;
	
} (Notification));

var isObservable$1 = {};

Object.defineProperty(isObservable$1, "__esModule", { value: true });
isObservable$1.isObservable = void 0;
var Observable_1$f = Observable$2;
var isFunction_1$c = isFunction$2;
function isObservable(obj) {
    return !!obj && (obj instanceof Observable_1$f.Observable || (isFunction_1$c.isFunction(obj.lift) && isFunction_1$c.isFunction(obj.subscribe)));
}
isObservable$1.isObservable = isObservable;

var lastValueFrom$1 = {};

var EmptyError = {};

Object.defineProperty(EmptyError, "__esModule", { value: true });
EmptyError.EmptyError = void 0;
var createErrorClass_1$3 = createErrorClass$2;
EmptyError.EmptyError = createErrorClass_1$3.createErrorClass(function (_super) { return function EmptyErrorImpl() {
    _super(this);
    this.name = 'EmptyError';
    this.message = 'no elements in sequence';
}; });

Object.defineProperty(lastValueFrom$1, "__esModule", { value: true });
lastValueFrom$1.lastValueFrom = void 0;
var EmptyError_1$5 = EmptyError;
function lastValueFrom(source, config) {
    var hasConfig = typeof config === 'object';
    return new Promise(function (resolve, reject) {
        var _hasValue = false;
        var _value;
        source.subscribe({
            next: function (value) {
                _value = value;
                _hasValue = true;
            },
            error: reject,
            complete: function () {
                if (_hasValue) {
                    resolve(_value);
                }
                else if (hasConfig) {
                    resolve(config.defaultValue);
                }
                else {
                    reject(new EmptyError_1$5.EmptyError());
                }
            },
        });
    });
}
lastValueFrom$1.lastValueFrom = lastValueFrom;

var firstValueFrom$1 = {};

Object.defineProperty(firstValueFrom$1, "__esModule", { value: true });
firstValueFrom$1.firstValueFrom = void 0;
var EmptyError_1$4 = EmptyError;
var Subscriber_1$1 = Subscriber$1;
function firstValueFrom(source, config) {
    var hasConfig = typeof config === 'object';
    return new Promise(function (resolve, reject) {
        var subscriber = new Subscriber_1$1.SafeSubscriber({
            next: function (value) {
                resolve(value);
                subscriber.unsubscribe();
            },
            error: reject,
            complete: function () {
                if (hasConfig) {
                    resolve(config.defaultValue);
                }
                else {
                    reject(new EmptyError_1$4.EmptyError());
                }
            },
        });
        source.subscribe(subscriber);
    });
}
firstValueFrom$1.firstValueFrom = firstValueFrom;

var ArgumentOutOfRangeError = {};

Object.defineProperty(ArgumentOutOfRangeError, "__esModule", { value: true });
ArgumentOutOfRangeError.ArgumentOutOfRangeError = void 0;
var createErrorClass_1$2 = createErrorClass$2;
ArgumentOutOfRangeError.ArgumentOutOfRangeError = createErrorClass_1$2.createErrorClass(function (_super) {
    return function ArgumentOutOfRangeErrorImpl() {
        _super(this);
        this.name = 'ArgumentOutOfRangeError';
        this.message = 'argument out of range';
    };
});

var NotFoundError = {};

Object.defineProperty(NotFoundError, "__esModule", { value: true });
NotFoundError.NotFoundError = void 0;
var createErrorClass_1$1 = createErrorClass$2;
NotFoundError.NotFoundError = createErrorClass_1$1.createErrorClass(function (_super) {
    return function NotFoundErrorImpl(message) {
        _super(this);
        this.name = 'NotFoundError';
        this.message = message;
    };
});

var SequenceError = {};

Object.defineProperty(SequenceError, "__esModule", { value: true });
SequenceError.SequenceError = void 0;
var createErrorClass_1 = createErrorClass$2;
SequenceError.SequenceError = createErrorClass_1.createErrorClass(function (_super) {
    return function SequenceErrorImpl(message) {
        _super(this);
        this.name = 'SequenceError';
        this.message = message;
    };
});

var timeout = {};

var isDate = {};

Object.defineProperty(isDate, "__esModule", { value: true });
isDate.isValidDate = void 0;
function isValidDate(value) {
    return value instanceof Date && !isNaN(value);
}
isDate.isValidDate = isValidDate;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.timeout = exports.TimeoutError = void 0;
	var async_1 = async;
	var isDate_1 = isDate;
	var lift_1 = lift;
	var innerFrom_1 = innerFrom$1;
	var createErrorClass_1 = createErrorClass$2;
	var OperatorSubscriber_1 = OperatorSubscriber$2;
	var executeSchedule_1 = executeSchedule$1;
	exports.TimeoutError = createErrorClass_1.createErrorClass(function (_super) {
	    return function TimeoutErrorImpl(info) {
	        if (info === void 0) { info = null; }
	        _super(this);
	        this.message = 'Timeout has occurred';
	        this.name = 'TimeoutError';
	        this.info = info;
	    };
	});
	function timeout(config, schedulerArg) {
	    var _a = (isDate_1.isValidDate(config) ? { first: config } : typeof config === 'number' ? { each: config } : config), first = _a.first, each = _a.each, _b = _a.with, _with = _b === void 0 ? timeoutErrorFactory : _b, _c = _a.scheduler, scheduler = _c === void 0 ? schedulerArg !== null && schedulerArg !== void 0 ? schedulerArg : async_1.asyncScheduler : _c, _d = _a.meta, meta = _d === void 0 ? null : _d;
	    if (first == null && each == null) {
	        throw new TypeError('No timeout provided.');
	    }
	    return lift_1.operate(function (source, subscriber) {
	        var originalSourceSubscription;
	        var timerSubscription;
	        var lastValue = null;
	        var seen = 0;
	        var startTimer = function (delay) {
	            timerSubscription = executeSchedule_1.executeSchedule(subscriber, scheduler, function () {
	                try {
	                    originalSourceSubscription.unsubscribe();
	                    innerFrom_1.innerFrom(_with({
	                        meta: meta,
	                        lastValue: lastValue,
	                        seen: seen,
	                    })).subscribe(subscriber);
	                }
	                catch (err) {
	                    subscriber.error(err);
	                }
	            }, delay);
	        };
	        originalSourceSubscription = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
	            seen++;
	            subscriber.next((lastValue = value));
	            each > 0 && startTimer(each);
	        }, undefined, undefined, function () {
	            if (!(timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.closed)) {
	                timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
	            }
	            lastValue = null;
	        }));
	        !seen && startTimer(first != null ? (typeof first === 'number' ? first : +first - scheduler.now()) : each);
	    });
	}
	exports.timeout = timeout;
	function timeoutErrorFactory(info) {
	    throw new exports.TimeoutError(info);
	}
	
} (timeout));

var bindCallback$1 = {};

var bindCallbackInternals$1 = {};

var mapOneOrManyArgs$1 = {};

var map$1 = {};

Object.defineProperty(map$1, "__esModule", { value: true });
map$1.map = void 0;
var lift_1$$ = lift;
var OperatorSubscriber_1$R = OperatorSubscriber$2;
function map(project, thisArg) {
    return lift_1$$.operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1$R.createOperatorSubscriber(subscriber, function (value) {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}
map$1.map = map;

var __read$k = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
var __spreadArray$i = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(mapOneOrManyArgs$1, "__esModule", { value: true });
mapOneOrManyArgs$1.mapOneOrManyArgs = void 0;
var map_1$5 = map$1;
var isArray$2 = Array.isArray;
function callOrApply(fn, args) {
    return isArray$2(args) ? fn.apply(void 0, __spreadArray$i([], __read$k(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
    return map_1$5.map(function (args) { return callOrApply(fn, args); });
}
mapOneOrManyArgs$1.mapOneOrManyArgs = mapOneOrManyArgs;

var __read$j = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
var __spreadArray$h = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(bindCallbackInternals$1, "__esModule", { value: true });
bindCallbackInternals$1.bindCallbackInternals = void 0;
var isScheduler_1$2 = isScheduler$1;
var Observable_1$e = Observable$2;
var subscribeOn_1 = subscribeOn$1;
var mapOneOrManyArgs_1$6 = mapOneOrManyArgs$1;
var observeOn_1 = observeOn$1;
var AsyncSubject_1$1 = AsyncSubject$1;
function bindCallbackInternals(isNodeStyle, callbackFunc, resultSelector, scheduler) {
    if (resultSelector) {
        if (isScheduler_1$2.isScheduler(resultSelector)) {
            scheduler = resultSelector;
        }
        else {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return bindCallbackInternals(isNodeStyle, callbackFunc, scheduler)
                    .apply(this, args)
                    .pipe(mapOneOrManyArgs_1$6.mapOneOrManyArgs(resultSelector));
            };
        }
    }
    if (scheduler) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return bindCallbackInternals(isNodeStyle, callbackFunc)
                .apply(this, args)
                .pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
        };
    }
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var subject = new AsyncSubject_1$1.AsyncSubject();
        var uninitialized = true;
        return new Observable_1$e.Observable(function (subscriber) {
            var subs = subject.subscribe(subscriber);
            if (uninitialized) {
                uninitialized = false;
                var isAsync_1 = false;
                var isComplete_1 = false;
                callbackFunc.apply(_this, __spreadArray$h(__spreadArray$h([], __read$j(args)), [
                    function () {
                        var results = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            results[_i] = arguments[_i];
                        }
                        if (isNodeStyle) {
                            var err = results.shift();
                            if (err != null) {
                                subject.error(err);
                                return;
                            }
                        }
                        subject.next(1 < results.length ? results : results[0]);
                        isComplete_1 = true;
                        if (isAsync_1) {
                            subject.complete();
                        }
                    },
                ]));
                if (isComplete_1) {
                    subject.complete();
                }
                isAsync_1 = true;
            }
            return subs;
        });
    };
}
bindCallbackInternals$1.bindCallbackInternals = bindCallbackInternals;

Object.defineProperty(bindCallback$1, "__esModule", { value: true });
bindCallback$1.bindCallback = void 0;
var bindCallbackInternals_1$1 = bindCallbackInternals$1;
function bindCallback(callbackFunc, resultSelector, scheduler) {
    return bindCallbackInternals_1$1.bindCallbackInternals(false, callbackFunc, resultSelector, scheduler);
}
bindCallback$1.bindCallback = bindCallback;

var bindNodeCallback$1 = {};

Object.defineProperty(bindNodeCallback$1, "__esModule", { value: true });
bindNodeCallback$1.bindNodeCallback = void 0;
var bindCallbackInternals_1 = bindCallbackInternals$1;
function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
    return bindCallbackInternals_1.bindCallbackInternals(true, callbackFunc, resultSelector, scheduler);
}
bindNodeCallback$1.bindNodeCallback = bindNodeCallback;

var combineLatest$3 = {};

var argsArgArrayOrObject$1 = {};

Object.defineProperty(argsArgArrayOrObject$1, "__esModule", { value: true });
argsArgArrayOrObject$1.argsArgArrayOrObject = void 0;
var isArray$1 = Array.isArray;
var getPrototypeOf = Object.getPrototypeOf, objectProto = Object.prototype, getKeys = Object.keys;
function argsArgArrayOrObject(args) {
    if (args.length === 1) {
        var first_1 = args[0];
        if (isArray$1(first_1)) {
            return { args: first_1, keys: null };
        }
        if (isPOJO(first_1)) {
            var keys = getKeys(first_1);
            return {
                args: keys.map(function (key) { return first_1[key]; }),
                keys: keys,
            };
        }
    }
    return { args: args, keys: null };
}
argsArgArrayOrObject$1.argsArgArrayOrObject = argsArgArrayOrObject;
function isPOJO(obj) {
    return obj && typeof obj === 'object' && getPrototypeOf(obj) === objectProto;
}

var createObject$1 = {};

Object.defineProperty(createObject$1, "__esModule", { value: true });
createObject$1.createObject = void 0;
function createObject(keys, values) {
    return keys.reduce(function (result, key, i) { return ((result[key] = values[i]), result); }, {});
}
createObject$1.createObject = createObject;

Object.defineProperty(combineLatest$3, "__esModule", { value: true });
combineLatest$3.combineLatestInit = combineLatest$3.combineLatest = void 0;
var Observable_1$d = Observable$2;
var argsArgArrayOrObject_1$1 = argsArgArrayOrObject$1;
var from_1$5 = from$1;
var identity_1$d = identity$2;
var mapOneOrManyArgs_1$5 = mapOneOrManyArgs$1;
var args_1$b = args;
var createObject_1$1 = createObject$1;
var OperatorSubscriber_1$Q = OperatorSubscriber$2;
var executeSchedule_1$3 = executeSchedule$1;
function combineLatest$2() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args_1$b.popScheduler(args);
    var resultSelector = args_1$b.popResultSelector(args);
    var _a = argsArgArrayOrObject_1$1.argsArgArrayOrObject(args), observables = _a.args, keys = _a.keys;
    if (observables.length === 0) {
        return from_1$5.from([], scheduler);
    }
    var result = new Observable_1$d.Observable(combineLatestInit(observables, scheduler, keys
        ?
            function (values) { return createObject_1$1.createObject(keys, values); }
        :
            identity_1$d.identity));
    return resultSelector ? result.pipe(mapOneOrManyArgs_1$5.mapOneOrManyArgs(resultSelector)) : result;
}
combineLatest$3.combineLatest = combineLatest$2;
function combineLatestInit(observables, scheduler, valueTransform) {
    if (valueTransform === void 0) { valueTransform = identity_1$d.identity; }
    return function (subscriber) {
        maybeSchedule(scheduler, function () {
            var length = observables.length;
            var values = new Array(length);
            var active = length;
            var remainingFirstValues = length;
            var _loop_1 = function (i) {
                maybeSchedule(scheduler, function () {
                    var source = from_1$5.from(observables[i], scheduler);
                    var hasFirstValue = false;
                    source.subscribe(OperatorSubscriber_1$Q.createOperatorSubscriber(subscriber, function (value) {
                        values[i] = value;
                        if (!hasFirstValue) {
                            hasFirstValue = true;
                            remainingFirstValues--;
                        }
                        if (!remainingFirstValues) {
                            subscriber.next(valueTransform(values.slice()));
                        }
                    }, function () {
                        if (!--active) {
                            subscriber.complete();
                        }
                    }));
                }, subscriber);
            };
            for (var i = 0; i < length; i++) {
                _loop_1(i);
            }
        }, subscriber);
    };
}
combineLatest$3.combineLatestInit = combineLatestInit;
function maybeSchedule(scheduler, execute, subscription) {
    if (scheduler) {
        executeSchedule_1$3.executeSchedule(subscription, scheduler, execute);
    }
    else {
        execute();
    }
}

var concat$3 = {};

var concatAll$1 = {};

var mergeAll$1 = {};

var mergeMap$1 = {};

var mergeInternals$1 = {};

Object.defineProperty(mergeInternals$1, "__esModule", { value: true });
mergeInternals$1.mergeInternals = void 0;
var innerFrom_1$z = innerFrom$1;
var executeSchedule_1$2 = executeSchedule$1;
var OperatorSubscriber_1$P = OperatorSubscriber$2;
function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
    var buffer = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function () {
        if (isComplete && !buffer.length && !active) {
            subscriber.complete();
        }
    };
    var outerNext = function (value) { return (active < concurrent ? doInnerSub(value) : buffer.push(value)); };
    var doInnerSub = function (value) {
        expand && subscriber.next(value);
        active++;
        var innerComplete = false;
        innerFrom_1$z.innerFrom(project(value, index++)).subscribe(OperatorSubscriber_1$P.createOperatorSubscriber(subscriber, function (innerValue) {
            onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
            if (expand) {
                outerNext(innerValue);
            }
            else {
                subscriber.next(innerValue);
            }
        }, function () {
            innerComplete = true;
        }, undefined, function () {
            if (innerComplete) {
                try {
                    active--;
                    var _loop_1 = function () {
                        var bufferedValue = buffer.shift();
                        if (innerSubScheduler) {
                            executeSchedule_1$2.executeSchedule(subscriber, innerSubScheduler, function () { return doInnerSub(bufferedValue); });
                        }
                        else {
                            doInnerSub(bufferedValue);
                        }
                    };
                    while (buffer.length && active < concurrent) {
                        _loop_1();
                    }
                    checkComplete();
                }
                catch (err) {
                    subscriber.error(err);
                }
            }
        }));
    };
    source.subscribe(OperatorSubscriber_1$P.createOperatorSubscriber(subscriber, outerNext, function () {
        isComplete = true;
        checkComplete();
    }));
    return function () {
        additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
    };
}
mergeInternals$1.mergeInternals = mergeInternals;

Object.defineProperty(mergeMap$1, "__esModule", { value: true });
mergeMap$1.mergeMap = void 0;
var map_1$4 = map$1;
var innerFrom_1$y = innerFrom$1;
var lift_1$_ = lift;
var mergeInternals_1$2 = mergeInternals$1;
var isFunction_1$b = isFunction$2;
function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    if (isFunction_1$b.isFunction(resultSelector)) {
        return mergeMap(function (a, i) { return map_1$4.map(function (b, ii) { return resultSelector(a, b, i, ii); })(innerFrom_1$y.innerFrom(project(a, i))); }, concurrent);
    }
    else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return lift_1$_.operate(function (source, subscriber) { return mergeInternals_1$2.mergeInternals(source, subscriber, project, concurrent); });
}
mergeMap$1.mergeMap = mergeMap;

Object.defineProperty(mergeAll$1, "__esModule", { value: true });
mergeAll$1.mergeAll = void 0;
var mergeMap_1$6 = mergeMap$1;
var identity_1$c = identity$2;
function mergeAll(concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    return mergeMap_1$6.mergeMap(identity_1$c.identity, concurrent);
}
mergeAll$1.mergeAll = mergeAll;

Object.defineProperty(concatAll$1, "__esModule", { value: true });
concatAll$1.concatAll = void 0;
var mergeAll_1$2 = mergeAll$1;
function concatAll() {
    return mergeAll_1$2.mergeAll(1);
}
concatAll$1.concatAll = concatAll;

Object.defineProperty(concat$3, "__esModule", { value: true });
concat$3.concat = void 0;
var concatAll_1$1 = concatAll$1;
var args_1$a = args;
var from_1$4 = from$1;
function concat$2() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return concatAll_1$1.concatAll()(from_1$4.from(args, args_1$a.popScheduler(args)));
}
concat$3.concat = concat$2;

var connectable$1 = {};

var defer$1 = {};

Object.defineProperty(defer$1, "__esModule", { value: true });
defer$1.defer = void 0;
var Observable_1$c = Observable$2;
var innerFrom_1$x = innerFrom$1;
function defer(observableFactory) {
    return new Observable_1$c.Observable(function (subscriber) {
        innerFrom_1$x.innerFrom(observableFactory()).subscribe(subscriber);
    });
}
defer$1.defer = defer;

Object.defineProperty(connectable$1, "__esModule", { value: true });
connectable$1.connectable = void 0;
var Subject_1$b = Subject$2;
var Observable_1$b = Observable$2;
var defer_1$2 = defer$1;
var DEFAULT_CONFIG$1 = {
    connector: function () { return new Subject_1$b.Subject(); },
    resetOnDisconnect: true,
};
function connectable(source, config) {
    if (config === void 0) { config = DEFAULT_CONFIG$1; }
    var connection = null;
    var connector = config.connector, _a = config.resetOnDisconnect, resetOnDisconnect = _a === void 0 ? true : _a;
    var subject = connector();
    var result = new Observable_1$b.Observable(function (subscriber) {
        return subject.subscribe(subscriber);
    });
    result.connect = function () {
        if (!connection || connection.closed) {
            connection = defer_1$2.defer(function () { return source; }).subscribe(subject);
            if (resetOnDisconnect) {
                connection.add(function () { return (subject = connector()); });
            }
        }
        return connection;
    };
    return result;
}
connectable$1.connectable = connectable;

var forkJoin$1 = {};

Object.defineProperty(forkJoin$1, "__esModule", { value: true });
forkJoin$1.forkJoin = void 0;
var Observable_1$a = Observable$2;
var argsArgArrayOrObject_1 = argsArgArrayOrObject$1;
var innerFrom_1$w = innerFrom$1;
var args_1$9 = args;
var OperatorSubscriber_1$O = OperatorSubscriber$2;
var mapOneOrManyArgs_1$4 = mapOneOrManyArgs$1;
var createObject_1 = createObject$1;
function forkJoin() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSelector = args_1$9.popResultSelector(args);
    var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args), sources = _a.args, keys = _a.keys;
    var result = new Observable_1$a.Observable(function (subscriber) {
        var length = sources.length;
        if (!length) {
            subscriber.complete();
            return;
        }
        var values = new Array(length);
        var remainingCompletions = length;
        var remainingEmissions = length;
        var _loop_1 = function (sourceIndex) {
            var hasValue = false;
            innerFrom_1$w.innerFrom(sources[sourceIndex]).subscribe(OperatorSubscriber_1$O.createOperatorSubscriber(subscriber, function (value) {
                if (!hasValue) {
                    hasValue = true;
                    remainingEmissions--;
                }
                values[sourceIndex] = value;
            }, function () { return remainingCompletions--; }, undefined, function () {
                if (!remainingCompletions || !hasValue) {
                    if (!remainingEmissions) {
                        subscriber.next(keys ? createObject_1.createObject(keys, values) : values);
                    }
                    subscriber.complete();
                }
            }));
        };
        for (var sourceIndex = 0; sourceIndex < length; sourceIndex++) {
            _loop_1(sourceIndex);
        }
    });
    return resultSelector ? result.pipe(mapOneOrManyArgs_1$4.mapOneOrManyArgs(resultSelector)) : result;
}
forkJoin$1.forkJoin = forkJoin;

var fromEvent$1 = {};

var __read$i = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
Object.defineProperty(fromEvent$1, "__esModule", { value: true });
fromEvent$1.fromEvent = void 0;
var innerFrom_1$v = innerFrom$1;
var Observable_1$9 = Observable$2;
var mergeMap_1$5 = mergeMap$1;
var isArrayLike_1 = isArrayLike;
var isFunction_1$a = isFunction$2;
var mapOneOrManyArgs_1$3 = mapOneOrManyArgs$1;
var nodeEventEmitterMethods = ['addListener', 'removeListener'];
var eventTargetMethods = ['addEventListener', 'removeEventListener'];
var jqueryMethods = ['on', 'off'];
function fromEvent(target, eventName, options, resultSelector) {
    if (isFunction_1$a.isFunction(options)) {
        resultSelector = options;
        options = undefined;
    }
    if (resultSelector) {
        return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs_1$3.mapOneOrManyArgs(resultSelector));
    }
    var _a = __read$i(isEventTarget(target)
        ? eventTargetMethods.map(function (methodName) { return function (handler) { return target[methodName](eventName, handler, options); }; })
        :
            isNodeStyleEventEmitter(target)
                ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName))
                : isJQueryStyleEventEmitter(target)
                    ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName))
                    : [], 2), add = _a[0], remove = _a[1];
    if (!add) {
        if (isArrayLike_1.isArrayLike(target)) {
            return mergeMap_1$5.mergeMap(function (subTarget) { return fromEvent(subTarget, eventName, options); })(innerFrom_1$v.innerFrom(target));
        }
    }
    if (!add) {
        throw new TypeError('Invalid event target');
    }
    return new Observable_1$9.Observable(function (subscriber) {
        var handler = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return subscriber.next(1 < args.length ? args : args[0]);
        };
        add(handler);
        return function () { return remove(handler); };
    });
}
fromEvent$1.fromEvent = fromEvent;
function toCommonHandlerRegistry(target, eventName) {
    return function (methodName) { return function (handler) { return target[methodName](eventName, handler); }; };
}
function isNodeStyleEventEmitter(target) {
    return isFunction_1$a.isFunction(target.addListener) && isFunction_1$a.isFunction(target.removeListener);
}
function isJQueryStyleEventEmitter(target) {
    return isFunction_1$a.isFunction(target.on) && isFunction_1$a.isFunction(target.off);
}
function isEventTarget(target) {
    return isFunction_1$a.isFunction(target.addEventListener) && isFunction_1$a.isFunction(target.removeEventListener);
}

var fromEventPattern$1 = {};

Object.defineProperty(fromEventPattern$1, "__esModule", { value: true });
fromEventPattern$1.fromEventPattern = void 0;
var Observable_1$8 = Observable$2;
var isFunction_1$9 = isFunction$2;
var mapOneOrManyArgs_1$2 = mapOneOrManyArgs$1;
function fromEventPattern(addHandler, removeHandler, resultSelector) {
    if (resultSelector) {
        return fromEventPattern(addHandler, removeHandler).pipe(mapOneOrManyArgs_1$2.mapOneOrManyArgs(resultSelector));
    }
    return new Observable_1$8.Observable(function (subscriber) {
        var handler = function () {
            var e = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                e[_i] = arguments[_i];
            }
            return subscriber.next(e.length === 1 ? e[0] : e);
        };
        var retValue = addHandler(handler);
        return isFunction_1$9.isFunction(removeHandler) ? function () { return removeHandler(handler, retValue); } : undefined;
    });
}
fromEventPattern$1.fromEventPattern = fromEventPattern;

var generate$1 = {};

var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
};
Object.defineProperty(generate$1, "__esModule", { value: true });
generate$1.generate = void 0;
var identity_1$b = identity$2;
var isScheduler_1$1 = isScheduler$1;
var defer_1$1 = defer$1;
var scheduleIterable_1 = scheduleIterable$1;
function generate(initialStateOrOptions, condition, iterate, resultSelectorOrScheduler, scheduler) {
    var _a, _b;
    var resultSelector;
    var initialState;
    if (arguments.length === 1) {
        (_a = initialStateOrOptions, initialState = _a.initialState, condition = _a.condition, iterate = _a.iterate, _b = _a.resultSelector, resultSelector = _b === void 0 ? identity_1$b.identity : _b, scheduler = _a.scheduler);
    }
    else {
        initialState = initialStateOrOptions;
        if (!resultSelectorOrScheduler || isScheduler_1$1.isScheduler(resultSelectorOrScheduler)) {
            resultSelector = identity_1$b.identity;
            scheduler = resultSelectorOrScheduler;
        }
        else {
            resultSelector = resultSelectorOrScheduler;
        }
    }
    function gen() {
        var state;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    state = initialState;
                    _a.label = 1;
                case 1:
                    if (!(!condition || condition(state))) return [3, 4];
                    return [4, resultSelector(state)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    state = iterate(state);
                    return [3, 1];
                case 4: return [2];
            }
        });
    }
    return defer_1$1.defer((scheduler
        ?
            function () { return scheduleIterable_1.scheduleIterable(gen(), scheduler); }
        :
            gen));
}
generate$1.generate = generate;

var iif$1 = {};

Object.defineProperty(iif$1, "__esModule", { value: true });
iif$1.iif = void 0;
var defer_1 = defer$1;
function iif(condition, trueResult, falseResult) {
    return defer_1.defer(function () { return (condition() ? trueResult : falseResult); });
}
iif$1.iif = iif;

var interval$1 = {};

var timer$1 = {};

Object.defineProperty(timer$1, "__esModule", { value: true });
timer$1.timer = void 0;
var Observable_1$7 = Observable$2;
var async_1$a = async;
var isScheduler_1 = isScheduler$1;
var isDate_1$1 = isDate;
function timer(dueTime, intervalOrScheduler, scheduler) {
    if (dueTime === void 0) { dueTime = 0; }
    if (scheduler === void 0) { scheduler = async_1$a.async; }
    var intervalDuration = -1;
    if (intervalOrScheduler != null) {
        if (isScheduler_1.isScheduler(intervalOrScheduler)) {
            scheduler = intervalOrScheduler;
        }
        else {
            intervalDuration = intervalOrScheduler;
        }
    }
    return new Observable_1$7.Observable(function (subscriber) {
        var due = isDate_1$1.isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
        if (due < 0) {
            due = 0;
        }
        var n = 0;
        return scheduler.schedule(function () {
            if (!subscriber.closed) {
                subscriber.next(n++);
                if (0 <= intervalDuration) {
                    this.schedule(undefined, intervalDuration);
                }
                else {
                    subscriber.complete();
                }
            }
        }, due);
    });
}
timer$1.timer = timer;

Object.defineProperty(interval$1, "__esModule", { value: true });
interval$1.interval = void 0;
var async_1$9 = async;
var timer_1$5 = timer$1;
function interval(period, scheduler) {
    if (period === void 0) { period = 0; }
    if (scheduler === void 0) { scheduler = async_1$9.asyncScheduler; }
    if (period < 0) {
        period = 0;
    }
    return timer_1$5.timer(period, period, scheduler);
}
interval$1.interval = interval;

var merge$3 = {};

Object.defineProperty(merge$3, "__esModule", { value: true });
merge$3.merge = void 0;
var mergeAll_1$1 = mergeAll$1;
var innerFrom_1$u = innerFrom$1;
var empty_1$6 = empty;
var args_1$8 = args;
var from_1$3 = from$1;
function merge$2() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args_1$8.popScheduler(args);
    var concurrent = args_1$8.popNumber(args, Infinity);
    var sources = args;
    return !sources.length
        ?
            empty_1$6.EMPTY
        : sources.length === 1
            ?
                innerFrom_1$u.innerFrom(sources[0])
            :
                mergeAll_1$1.mergeAll(concurrent)(from_1$3.from(sources, scheduler));
}
merge$3.merge = merge$2;

var never = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.never = exports.NEVER = void 0;
	var Observable_1 = Observable$2;
	var noop_1 = noop$3;
	exports.NEVER = new Observable_1.Observable(noop_1.noop);
	function never() {
	    return exports.NEVER;
	}
	exports.never = never;
	
} (never));

var onErrorResumeNext$1 = {};

var argsOrArgArray$1 = {};

Object.defineProperty(argsOrArgArray$1, "__esModule", { value: true });
argsOrArgArray$1.argsOrArgArray = void 0;
var isArray = Array.isArray;
function argsOrArgArray(args) {
    return args.length === 1 && isArray(args[0]) ? args[0] : args;
}
argsOrArgArray$1.argsOrArgArray = argsOrArgArray;

Object.defineProperty(onErrorResumeNext$1, "__esModule", { value: true });
onErrorResumeNext$1.onErrorResumeNext = void 0;
var Observable_1$6 = Observable$2;
var argsOrArgArray_1$6 = argsOrArgArray$1;
var OperatorSubscriber_1$N = OperatorSubscriber$2;
var noop_1$c = noop$3;
var innerFrom_1$t = innerFrom$1;
function onErrorResumeNext() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var nextSources = argsOrArgArray_1$6.argsOrArgArray(sources);
    return new Observable_1$6.Observable(function (subscriber) {
        var sourceIndex = 0;
        var subscribeNext = function () {
            if (sourceIndex < nextSources.length) {
                var nextSource = void 0;
                try {
                    nextSource = innerFrom_1$t.innerFrom(nextSources[sourceIndex++]);
                }
                catch (err) {
                    subscribeNext();
                    return;
                }
                var innerSubscriber = new OperatorSubscriber_1$N.OperatorSubscriber(subscriber, undefined, noop_1$c.noop, noop_1$c.noop);
                nextSource.subscribe(innerSubscriber);
                innerSubscriber.add(subscribeNext);
            }
            else {
                subscriber.complete();
            }
        };
        subscribeNext();
    });
}
onErrorResumeNext$1.onErrorResumeNext = onErrorResumeNext;

var pairs$1 = {};

Object.defineProperty(pairs$1, "__esModule", { value: true });
pairs$1.pairs = void 0;
var from_1$2 = from$1;
function pairs(obj, scheduler) {
    return from_1$2.from(Object.entries(obj), scheduler);
}
pairs$1.pairs = pairs;

var partition$3 = {};

var not$1 = {};

Object.defineProperty(not$1, "__esModule", { value: true });
not$1.not = void 0;
function not(pred, thisArg) {
    return function (value, index) { return !pred.call(thisArg, value, index); };
}
not$1.not = not;

var filter$2 = {};

Object.defineProperty(filter$2, "__esModule", { value: true });
filter$2.filter = void 0;
var lift_1$Z = lift;
var OperatorSubscriber_1$M = OperatorSubscriber$2;
function filter$1(predicate, thisArg) {
    return lift_1$Z.operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1$M.createOperatorSubscriber(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
    });
}
filter$2.filter = filter$1;

Object.defineProperty(partition$3, "__esModule", { value: true });
partition$3.partition = void 0;
var not_1$1 = not$1;
var filter_1$5 = filter$2;
var innerFrom_1$s = innerFrom$1;
function partition$2(source, predicate, thisArg) {
    return [filter_1$5.filter(predicate, thisArg)(innerFrom_1$s.innerFrom(source)), filter_1$5.filter(not_1$1.not(predicate, thisArg))(innerFrom_1$s.innerFrom(source))];
}
partition$3.partition = partition$2;

var race$3 = {};

Object.defineProperty(race$3, "__esModule", { value: true });
race$3.raceInit = race$3.race = void 0;
var Observable_1$5 = Observable$2;
var innerFrom_1$r = innerFrom$1;
var argsOrArgArray_1$5 = argsOrArgArray$1;
var OperatorSubscriber_1$L = OperatorSubscriber$2;
function race$2() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    sources = argsOrArgArray_1$5.argsOrArgArray(sources);
    return sources.length === 1 ? innerFrom_1$r.innerFrom(sources[0]) : new Observable_1$5.Observable(raceInit(sources));
}
race$3.race = race$2;
function raceInit(sources) {
    return function (subscriber) {
        var subscriptions = [];
        var _loop_1 = function (i) {
            subscriptions.push(innerFrom_1$r.innerFrom(sources[i]).subscribe(OperatorSubscriber_1$L.createOperatorSubscriber(subscriber, function (value) {
                if (subscriptions) {
                    for (var s = 0; s < subscriptions.length; s++) {
                        s !== i && subscriptions[s].unsubscribe();
                    }
                    subscriptions = null;
                }
                subscriber.next(value);
            })));
        };
        for (var i = 0; subscriptions && !subscriber.closed && i < sources.length; i++) {
            _loop_1(i);
        }
    };
}
race$3.raceInit = raceInit;

var range$1 = {};

Object.defineProperty(range$1, "__esModule", { value: true });
range$1.range = void 0;
var Observable_1$4 = Observable$2;
var empty_1$5 = empty;
function range(start, count, scheduler) {
    if (count == null) {
        count = start;
        start = 0;
    }
    if (count <= 0) {
        return empty_1$5.EMPTY;
    }
    var end = count + start;
    return new Observable_1$4.Observable(scheduler
        ?
            function (subscriber) {
                var n = start;
                return scheduler.schedule(function () {
                    if (n < end) {
                        subscriber.next(n++);
                        this.schedule();
                    }
                    else {
                        subscriber.complete();
                    }
                });
            }
        :
            function (subscriber) {
                var n = start;
                while (n < end && !subscriber.closed) {
                    subscriber.next(n++);
                }
                subscriber.complete();
            });
}
range$1.range = range;

var using$1 = {};

Object.defineProperty(using$1, "__esModule", { value: true });
using$1.using = void 0;
var Observable_1$3 = Observable$2;
var innerFrom_1$q = innerFrom$1;
var empty_1$4 = empty;
function using(resourceFactory, observableFactory) {
    return new Observable_1$3.Observable(function (subscriber) {
        var resource = resourceFactory();
        var result = observableFactory(resource);
        var source = result ? innerFrom_1$q.innerFrom(result) : empty_1$4.EMPTY;
        source.subscribe(subscriber);
        return function () {
            if (resource) {
                resource.unsubscribe();
            }
        };
    });
}
using$1.using = using;

var zip$3 = {};

var __read$h = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
var __spreadArray$g = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(zip$3, "__esModule", { value: true });
zip$3.zip = void 0;
var Observable_1$2 = Observable$2;
var innerFrom_1$p = innerFrom$1;
var argsOrArgArray_1$4 = argsOrArgArray$1;
var empty_1$3 = empty;
var OperatorSubscriber_1$K = OperatorSubscriber$2;
var args_1$7 = args;
function zip$2() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSelector = args_1$7.popResultSelector(args);
    var sources = argsOrArgArray_1$4.argsOrArgArray(args);
    return sources.length
        ? new Observable_1$2.Observable(function (subscriber) {
            var buffers = sources.map(function () { return []; });
            var completed = sources.map(function () { return false; });
            subscriber.add(function () {
                buffers = completed = null;
            });
            var _loop_1 = function (sourceIndex) {
                innerFrom_1$p.innerFrom(sources[sourceIndex]).subscribe(OperatorSubscriber_1$K.createOperatorSubscriber(subscriber, function (value) {
                    buffers[sourceIndex].push(value);
                    if (buffers.every(function (buffer) { return buffer.length; })) {
                        var result = buffers.map(function (buffer) { return buffer.shift(); });
                        subscriber.next(resultSelector ? resultSelector.apply(void 0, __spreadArray$g([], __read$h(result))) : result);
                        if (buffers.some(function (buffer, i) { return !buffer.length && completed[i]; })) {
                            subscriber.complete();
                        }
                    }
                }, function () {
                    completed[sourceIndex] = true;
                    !buffers[sourceIndex].length && subscriber.complete();
                }));
            };
            for (var sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
                _loop_1(sourceIndex);
            }
            return function () {
                buffers = completed = null;
            };
        })
        : empty_1$3.EMPTY;
}
zip$3.zip = zip$2;

var types = {};

Object.defineProperty(types, "__esModule", { value: true });

var audit$1 = {};

Object.defineProperty(audit$1, "__esModule", { value: true });
audit$1.audit = void 0;
var lift_1$Y = lift;
var innerFrom_1$o = innerFrom$1;
var OperatorSubscriber_1$J = OperatorSubscriber$2;
function audit(durationSelector) {
    return lift_1$Y.operate(function (source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        var durationSubscriber = null;
        var isComplete = false;
        var endDuration = function () {
            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
            durationSubscriber = null;
            if (hasValue) {
                hasValue = false;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
            isComplete && subscriber.complete();
        };
        var cleanupDuration = function () {
            durationSubscriber = null;
            isComplete && subscriber.complete();
        };
        source.subscribe(OperatorSubscriber_1$J.createOperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            lastValue = value;
            if (!durationSubscriber) {
                innerFrom_1$o.innerFrom(durationSelector(value)).subscribe((durationSubscriber = OperatorSubscriber_1$J.createOperatorSubscriber(subscriber, endDuration, cleanupDuration)));
            }
        }, function () {
            isComplete = true;
            (!hasValue || !durationSubscriber || durationSubscriber.closed) && subscriber.complete();
        }));
    });
}
audit$1.audit = audit;

var auditTime$1 = {};

Object.defineProperty(auditTime$1, "__esModule", { value: true });
auditTime$1.auditTime = void 0;
var async_1$8 = async;
var audit_1 = audit$1;
var timer_1$4 = timer$1;
function auditTime(duration, scheduler) {
    if (scheduler === void 0) { scheduler = async_1$8.asyncScheduler; }
    return audit_1.audit(function () { return timer_1$4.timer(duration, scheduler); });
}
auditTime$1.auditTime = auditTime;

var buffer$1 = {};

Object.defineProperty(buffer$1, "__esModule", { value: true });
buffer$1.buffer = void 0;
var lift_1$X = lift;
var noop_1$b = noop$3;
var OperatorSubscriber_1$I = OperatorSubscriber$2;
var innerFrom_1$n = innerFrom$1;
function buffer(closingNotifier) {
    return lift_1$X.operate(function (source, subscriber) {
        var currentBuffer = [];
        source.subscribe(OperatorSubscriber_1$I.createOperatorSubscriber(subscriber, function (value) { return currentBuffer.push(value); }, function () {
            subscriber.next(currentBuffer);
            subscriber.complete();
        }));
        innerFrom_1$n.innerFrom(closingNotifier).subscribe(OperatorSubscriber_1$I.createOperatorSubscriber(subscriber, function () {
            var b = currentBuffer;
            currentBuffer = [];
            subscriber.next(b);
        }, noop_1$b.noop));
        return function () {
            currentBuffer = null;
        };
    });
}
buffer$1.buffer = buffer;

var bufferCount$1 = {};

var __values$7 = (commonjsGlobal && commonjsGlobal.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(bufferCount$1, "__esModule", { value: true });
bufferCount$1.bufferCount = void 0;
var lift_1$W = lift;
var OperatorSubscriber_1$H = OperatorSubscriber$2;
var arrRemove_1$4 = arrRemove$2;
function bufferCount(bufferSize, startBufferEvery) {
    if (startBufferEvery === void 0) { startBufferEvery = null; }
    startBufferEvery = startBufferEvery !== null && startBufferEvery !== void 0 ? startBufferEvery : bufferSize;
    return lift_1$W.operate(function (source, subscriber) {
        var buffers = [];
        var count = 0;
        source.subscribe(OperatorSubscriber_1$H.createOperatorSubscriber(subscriber, function (value) {
            var e_1, _a, e_2, _b;
            var toEmit = null;
            if (count++ % startBufferEvery === 0) {
                buffers.push([]);
            }
            try {
                for (var buffers_1 = __values$7(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
                    var buffer = buffers_1_1.value;
                    buffer.push(value);
                    if (bufferSize <= buffer.length) {
                        toEmit = toEmit !== null && toEmit !== void 0 ? toEmit : [];
                        toEmit.push(buffer);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (toEmit) {
                try {
                    for (var toEmit_1 = __values$7(toEmit), toEmit_1_1 = toEmit_1.next(); !toEmit_1_1.done; toEmit_1_1 = toEmit_1.next()) {
                        var buffer = toEmit_1_1.value;
                        arrRemove_1$4.arrRemove(buffers, buffer);
                        subscriber.next(buffer);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (toEmit_1_1 && !toEmit_1_1.done && (_b = toEmit_1.return)) _b.call(toEmit_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }, function () {
            var e_3, _a;
            try {
                for (var buffers_2 = __values$7(buffers), buffers_2_1 = buffers_2.next(); !buffers_2_1.done; buffers_2_1 = buffers_2.next()) {
                    var buffer = buffers_2_1.value;
                    subscriber.next(buffer);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (buffers_2_1 && !buffers_2_1.done && (_a = buffers_2.return)) _a.call(buffers_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
            subscriber.complete();
        }, undefined, function () {
            buffers = null;
        }));
    });
}
bufferCount$1.bufferCount = bufferCount;

var bufferTime$1 = {};

var __values$6 = (commonjsGlobal && commonjsGlobal.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(bufferTime$1, "__esModule", { value: true });
bufferTime$1.bufferTime = void 0;
var Subscription_1$3 = Subscription$2;
var lift_1$V = lift;
var OperatorSubscriber_1$G = OperatorSubscriber$2;
var arrRemove_1$3 = arrRemove$2;
var async_1$7 = async;
var args_1$6 = args;
var executeSchedule_1$1 = executeSchedule$1;
function bufferTime(bufferTimeSpan) {
    var _a, _b;
    var otherArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherArgs[_i - 1] = arguments[_i];
    }
    var scheduler = (_a = args_1$6.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1$7.asyncScheduler;
    var bufferCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
    var maxBufferSize = otherArgs[1] || Infinity;
    return lift_1$V.operate(function (source, subscriber) {
        var bufferRecords = [];
        var restartOnEmit = false;
        var emit = function (record) {
            var buffer = record.buffer, subs = record.subs;
            subs.unsubscribe();
            arrRemove_1$3.arrRemove(bufferRecords, record);
            subscriber.next(buffer);
            restartOnEmit && startBuffer();
        };
        var startBuffer = function () {
            if (bufferRecords) {
                var subs = new Subscription_1$3.Subscription();
                subscriber.add(subs);
                var buffer = [];
                var record_1 = {
                    buffer: buffer,
                    subs: subs,
                };
                bufferRecords.push(record_1);
                executeSchedule_1$1.executeSchedule(subs, scheduler, function () { return emit(record_1); }, bufferTimeSpan);
            }
        };
        if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
            executeSchedule_1$1.executeSchedule(subscriber, scheduler, startBuffer, bufferCreationInterval, true);
        }
        else {
            restartOnEmit = true;
        }
        startBuffer();
        var bufferTimeSubscriber = OperatorSubscriber_1$G.createOperatorSubscriber(subscriber, function (value) {
            var e_1, _a;
            var recordsCopy = bufferRecords.slice();
            try {
                for (var recordsCopy_1 = __values$6(recordsCopy), recordsCopy_1_1 = recordsCopy_1.next(); !recordsCopy_1_1.done; recordsCopy_1_1 = recordsCopy_1.next()) {
                    var record = recordsCopy_1_1.value;
                    var buffer = record.buffer;
                    buffer.push(value);
                    maxBufferSize <= buffer.length && emit(record);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (recordsCopy_1_1 && !recordsCopy_1_1.done && (_a = recordsCopy_1.return)) _a.call(recordsCopy_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }, function () {
            while (bufferRecords === null || bufferRecords === void 0 ? void 0 : bufferRecords.length) {
                subscriber.next(bufferRecords.shift().buffer);
            }
            bufferTimeSubscriber === null || bufferTimeSubscriber === void 0 ? void 0 : bufferTimeSubscriber.unsubscribe();
            subscriber.complete();
            subscriber.unsubscribe();
        }, undefined, function () { return (bufferRecords = null); });
        source.subscribe(bufferTimeSubscriber);
    });
}
bufferTime$1.bufferTime = bufferTime;

var bufferToggle$1 = {};

var __values$5 = (commonjsGlobal && commonjsGlobal.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(bufferToggle$1, "__esModule", { value: true });
bufferToggle$1.bufferToggle = void 0;
var Subscription_1$2 = Subscription$2;
var lift_1$U = lift;
var innerFrom_1$m = innerFrom$1;
var OperatorSubscriber_1$F = OperatorSubscriber$2;
var noop_1$a = noop$3;
var arrRemove_1$2 = arrRemove$2;
function bufferToggle(openings, closingSelector) {
    return lift_1$U.operate(function (source, subscriber) {
        var buffers = [];
        innerFrom_1$m.innerFrom(openings).subscribe(OperatorSubscriber_1$F.createOperatorSubscriber(subscriber, function (openValue) {
            var buffer = [];
            buffers.push(buffer);
            var closingSubscription = new Subscription_1$2.Subscription();
            var emitBuffer = function () {
                arrRemove_1$2.arrRemove(buffers, buffer);
                subscriber.next(buffer);
                closingSubscription.unsubscribe();
            };
            closingSubscription.add(innerFrom_1$m.innerFrom(closingSelector(openValue)).subscribe(OperatorSubscriber_1$F.createOperatorSubscriber(subscriber, emitBuffer, noop_1$a.noop)));
        }, noop_1$a.noop));
        source.subscribe(OperatorSubscriber_1$F.createOperatorSubscriber(subscriber, function (value) {
            var e_1, _a;
            try {
                for (var buffers_1 = __values$5(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
                    var buffer = buffers_1_1.value;
                    buffer.push(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }, function () {
            while (buffers.length > 0) {
                subscriber.next(buffers.shift());
            }
            subscriber.complete();
        }));
    });
}
bufferToggle$1.bufferToggle = bufferToggle;

var bufferWhen$1 = {};

Object.defineProperty(bufferWhen$1, "__esModule", { value: true });
bufferWhen$1.bufferWhen = void 0;
var lift_1$T = lift;
var noop_1$9 = noop$3;
var OperatorSubscriber_1$E = OperatorSubscriber$2;
var innerFrom_1$l = innerFrom$1;
function bufferWhen(closingSelector) {
    return lift_1$T.operate(function (source, subscriber) {
        var buffer = null;
        var closingSubscriber = null;
        var openBuffer = function () {
            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
            var b = buffer;
            buffer = [];
            b && subscriber.next(b);
            innerFrom_1$l.innerFrom(closingSelector()).subscribe((closingSubscriber = OperatorSubscriber_1$E.createOperatorSubscriber(subscriber, openBuffer, noop_1$9.noop)));
        };
        openBuffer();
        source.subscribe(OperatorSubscriber_1$E.createOperatorSubscriber(subscriber, function (value) { return buffer === null || buffer === void 0 ? void 0 : buffer.push(value); }, function () {
            buffer && subscriber.next(buffer);
            subscriber.complete();
        }, undefined, function () { return (buffer = closingSubscriber = null); }));
    });
}
bufferWhen$1.bufferWhen = bufferWhen;

var catchError$1 = {};

Object.defineProperty(catchError$1, "__esModule", { value: true });
catchError$1.catchError = void 0;
var innerFrom_1$k = innerFrom$1;
var OperatorSubscriber_1$D = OperatorSubscriber$2;
var lift_1$S = lift;
function catchError(selector) {
    return lift_1$S.operate(function (source, subscriber) {
        var innerSub = null;
        var syncUnsub = false;
        var handledResult;
        innerSub = source.subscribe(OperatorSubscriber_1$D.createOperatorSubscriber(subscriber, undefined, undefined, function (err) {
            handledResult = innerFrom_1$k.innerFrom(selector(err, catchError(selector)(source)));
            if (innerSub) {
                innerSub.unsubscribe();
                innerSub = null;
                handledResult.subscribe(subscriber);
            }
            else {
                syncUnsub = true;
            }
        }));
        if (syncUnsub) {
            innerSub.unsubscribe();
            innerSub = null;
            handledResult.subscribe(subscriber);
        }
    });
}
catchError$1.catchError = catchError;

var combineAll = {};

var combineLatestAll$1 = {};

var joinAllInternals$1 = {};

var toArray$1 = {};

var reduce$1 = {};

var scanInternals$1 = {};

Object.defineProperty(scanInternals$1, "__esModule", { value: true });
scanInternals$1.scanInternals = void 0;
var OperatorSubscriber_1$C = OperatorSubscriber$2;
function scanInternals(accumulator, seed, hasSeed, emitOnNext, emitBeforeComplete) {
    return function (source, subscriber) {
        var hasState = hasSeed;
        var state = seed;
        var index = 0;
        source.subscribe(OperatorSubscriber_1$C.createOperatorSubscriber(subscriber, function (value) {
            var i = index++;
            state = hasState
                ?
                    accumulator(state, value, i)
                :
                    ((hasState = true), value);
            emitOnNext && subscriber.next(state);
        }, emitBeforeComplete &&
            (function () {
                hasState && subscriber.next(state);
                subscriber.complete();
            })));
    };
}
scanInternals$1.scanInternals = scanInternals;

Object.defineProperty(reduce$1, "__esModule", { value: true });
reduce$1.reduce = void 0;
var scanInternals_1$1 = scanInternals$1;
var lift_1$R = lift;
function reduce(accumulator, seed) {
    return lift_1$R.operate(scanInternals_1$1.scanInternals(accumulator, seed, arguments.length >= 2, false, true));
}
reduce$1.reduce = reduce;

Object.defineProperty(toArray$1, "__esModule", { value: true });
toArray$1.toArray = void 0;
var reduce_1$3 = reduce$1;
var lift_1$Q = lift;
var arrReducer = function (arr, value) { return (arr.push(value), arr); };
function toArray() {
    return lift_1$Q.operate(function (source, subscriber) {
        reduce_1$3.reduce(arrReducer, [])(source).subscribe(subscriber);
    });
}
toArray$1.toArray = toArray;

Object.defineProperty(joinAllInternals$1, "__esModule", { value: true });
joinAllInternals$1.joinAllInternals = void 0;
var identity_1$a = identity$2;
var mapOneOrManyArgs_1$1 = mapOneOrManyArgs$1;
var pipe_1$1 = pipe$1;
var mergeMap_1$4 = mergeMap$1;
var toArray_1 = toArray$1;
function joinAllInternals(joinFn, project) {
    return pipe_1$1.pipe(toArray_1.toArray(), mergeMap_1$4.mergeMap(function (sources) { return joinFn(sources); }), project ? mapOneOrManyArgs_1$1.mapOneOrManyArgs(project) : identity_1$a.identity);
}
joinAllInternals$1.joinAllInternals = joinAllInternals;

Object.defineProperty(combineLatestAll$1, "__esModule", { value: true });
combineLatestAll$1.combineLatestAll = void 0;
var combineLatest_1$2 = combineLatest$3;
var joinAllInternals_1$1 = joinAllInternals$1;
function combineLatestAll(project) {
    return joinAllInternals_1$1.joinAllInternals(combineLatest_1$2.combineLatest, project);
}
combineLatestAll$1.combineLatestAll = combineLatestAll;

Object.defineProperty(combineAll, "__esModule", { value: true });
combineAll.combineAll = void 0;
var combineLatestAll_1 = combineLatestAll$1;
combineAll.combineAll = combineLatestAll_1.combineLatestAll;

var combineLatestWith$1 = {};

var combineLatest$1 = {};

var __read$g = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
var __spreadArray$f = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(combineLatest$1, "__esModule", { value: true });
combineLatest$1.combineLatest = void 0;
var combineLatest_1$1 = combineLatest$3;
var lift_1$P = lift;
var argsOrArgArray_1$3 = argsOrArgArray$1;
var mapOneOrManyArgs_1 = mapOneOrManyArgs$1;
var pipe_1 = pipe$1;
var args_1$5 = args;
function combineLatest() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSelector = args_1$5.popResultSelector(args);
    return resultSelector
        ? pipe_1.pipe(combineLatest.apply(void 0, __spreadArray$f([], __read$g(args))), mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector))
        : lift_1$P.operate(function (source, subscriber) {
            combineLatest_1$1.combineLatestInit(__spreadArray$f([source], __read$g(argsOrArgArray_1$3.argsOrArgArray(args))))(subscriber);
        });
}
combineLatest$1.combineLatest = combineLatest;

var __read$f = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
var __spreadArray$e = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(combineLatestWith$1, "__esModule", { value: true });
combineLatestWith$1.combineLatestWith = void 0;
var combineLatest_1 = combineLatest$1;
function combineLatestWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return combineLatest_1.combineLatest.apply(void 0, __spreadArray$e([], __read$f(otherSources)));
}
combineLatestWith$1.combineLatestWith = combineLatestWith;

var concatMap$1 = {};

Object.defineProperty(concatMap$1, "__esModule", { value: true });
concatMap$1.concatMap = void 0;
var mergeMap_1$3 = mergeMap$1;
var isFunction_1$8 = isFunction$2;
function concatMap(project, resultSelector) {
    return isFunction_1$8.isFunction(resultSelector) ? mergeMap_1$3.mergeMap(project, resultSelector, 1) : mergeMap_1$3.mergeMap(project, 1);
}
concatMap$1.concatMap = concatMap;

var concatMapTo$1 = {};

Object.defineProperty(concatMapTo$1, "__esModule", { value: true });
concatMapTo$1.concatMapTo = void 0;
var concatMap_1 = concatMap$1;
var isFunction_1$7 = isFunction$2;
function concatMapTo(innerObservable, resultSelector) {
    return isFunction_1$7.isFunction(resultSelector) ? concatMap_1.concatMap(function () { return innerObservable; }, resultSelector) : concatMap_1.concatMap(function () { return innerObservable; });
}
concatMapTo$1.concatMapTo = concatMapTo;

var concatWith$1 = {};

var concat$1 = {};

var __read$e = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
var __spreadArray$d = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(concat$1, "__esModule", { value: true });
concat$1.concat = void 0;
var lift_1$O = lift;
var concatAll_1 = concatAll$1;
var args_1$4 = args;
var from_1$1 = from$1;
function concat() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args_1$4.popScheduler(args);
    return lift_1$O.operate(function (source, subscriber) {
        concatAll_1.concatAll()(from_1$1.from(__spreadArray$d([source], __read$e(args)), scheduler)).subscribe(subscriber);
    });
}
concat$1.concat = concat;

var __read$d = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
var __spreadArray$c = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(concatWith$1, "__esModule", { value: true });
concatWith$1.concatWith = void 0;
var concat_1$3 = concat$1;
function concatWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return concat_1$3.concat.apply(void 0, __spreadArray$c([], __read$d(otherSources)));
}
concatWith$1.concatWith = concatWith;

var connect$1 = {};

var fromSubscribable$1 = {};

Object.defineProperty(fromSubscribable$1, "__esModule", { value: true });
fromSubscribable$1.fromSubscribable = void 0;
var Observable_1$1 = Observable$2;
function fromSubscribable(subscribable) {
    return new Observable_1$1.Observable(function (subscriber) { return subscribable.subscribe(subscriber); });
}
fromSubscribable$1.fromSubscribable = fromSubscribable;

Object.defineProperty(connect$1, "__esModule", { value: true });
connect$1.connect = void 0;
var Subject_1$a = Subject$2;
var innerFrom_1$j = innerFrom$1;
var lift_1$N = lift;
var fromSubscribable_1 = fromSubscribable$1;
var DEFAULT_CONFIG = {
    connector: function () { return new Subject_1$a.Subject(); },
};
function connect(selector, config) {
    if (config === void 0) { config = DEFAULT_CONFIG; }
    var connector = config.connector;
    return lift_1$N.operate(function (source, subscriber) {
        var subject = connector();
        innerFrom_1$j.innerFrom(selector(fromSubscribable_1.fromSubscribable(subject))).subscribe(subscriber);
        subscriber.add(source.subscribe(subject));
    });
}
connect$1.connect = connect;

var count$1 = {};

Object.defineProperty(count$1, "__esModule", { value: true });
count$1.count = void 0;
var reduce_1$2 = reduce$1;
function count(predicate) {
    return reduce_1$2.reduce(function (total, value, i) { return (!predicate || predicate(value, i) ? total + 1 : total); }, 0);
}
count$1.count = count;

var debounce$1 = {};

Object.defineProperty(debounce$1, "__esModule", { value: true });
debounce$1.debounce = void 0;
var lift_1$M = lift;
var noop_1$8 = noop$3;
var OperatorSubscriber_1$B = OperatorSubscriber$2;
var innerFrom_1$i = innerFrom$1;
function debounce(durationSelector) {
    return lift_1$M.operate(function (source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        var durationSubscriber = null;
        var emit = function () {
            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
            durationSubscriber = null;
            if (hasValue) {
                hasValue = false;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        };
        source.subscribe(OperatorSubscriber_1$B.createOperatorSubscriber(subscriber, function (value) {
            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
            hasValue = true;
            lastValue = value;
            durationSubscriber = OperatorSubscriber_1$B.createOperatorSubscriber(subscriber, emit, noop_1$8.noop);
            innerFrom_1$i.innerFrom(durationSelector(value)).subscribe(durationSubscriber);
        }, function () {
            emit();
            subscriber.complete();
        }, undefined, function () {
            lastValue = durationSubscriber = null;
        }));
    });
}
debounce$1.debounce = debounce;

var debounceTime$1 = {};

Object.defineProperty(debounceTime$1, "__esModule", { value: true });
debounceTime$1.debounceTime = void 0;
var async_1$6 = async;
var lift_1$L = lift;
var OperatorSubscriber_1$A = OperatorSubscriber$2;
function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) { scheduler = async_1$6.asyncScheduler; }
    return lift_1$L.operate(function (source, subscriber) {
        var activeTask = null;
        var lastValue = null;
        var lastTime = null;
        var emit = function () {
            if (activeTask) {
                activeTask.unsubscribe();
                activeTask = null;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        };
        function emitWhenIdle() {
            var targetTime = lastTime + dueTime;
            var now = scheduler.now();
            if (now < targetTime) {
                activeTask = this.schedule(undefined, targetTime - now);
                subscriber.add(activeTask);
                return;
            }
            emit();
        }
        source.subscribe(OperatorSubscriber_1$A.createOperatorSubscriber(subscriber, function (value) {
            lastValue = value;
            lastTime = scheduler.now();
            if (!activeTask) {
                activeTask = scheduler.schedule(emitWhenIdle, dueTime);
                subscriber.add(activeTask);
            }
        }, function () {
            emit();
            subscriber.complete();
        }, undefined, function () {
            lastValue = activeTask = null;
        }));
    });
}
debounceTime$1.debounceTime = debounceTime;

var defaultIfEmpty$1 = {};

Object.defineProperty(defaultIfEmpty$1, "__esModule", { value: true });
defaultIfEmpty$1.defaultIfEmpty = void 0;
var lift_1$K = lift;
var OperatorSubscriber_1$z = OperatorSubscriber$2;
function defaultIfEmpty(defaultValue) {
    return lift_1$K.operate(function (source, subscriber) {
        var hasValue = false;
        source.subscribe(OperatorSubscriber_1$z.createOperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            subscriber.next(value);
        }, function () {
            if (!hasValue) {
                subscriber.next(defaultValue);
            }
            subscriber.complete();
        }));
    });
}
defaultIfEmpty$1.defaultIfEmpty = defaultIfEmpty;

var delay$1 = {};

var delayWhen$1 = {};

var take$1 = {};

Object.defineProperty(take$1, "__esModule", { value: true });
take$1.take = void 0;
var empty_1$2 = empty;
var lift_1$J = lift;
var OperatorSubscriber_1$y = OperatorSubscriber$2;
function take(count) {
    return count <= 0
        ?
            function () { return empty_1$2.EMPTY; }
        : lift_1$J.operate(function (source, subscriber) {
            var seen = 0;
            source.subscribe(OperatorSubscriber_1$y.createOperatorSubscriber(subscriber, function (value) {
                if (++seen <= count) {
                    subscriber.next(value);
                    if (count <= seen) {
                        subscriber.complete();
                    }
                }
            }));
        });
}
take$1.take = take;

var ignoreElements$1 = {};

Object.defineProperty(ignoreElements$1, "__esModule", { value: true });
ignoreElements$1.ignoreElements = void 0;
var lift_1$I = lift;
var OperatorSubscriber_1$x = OperatorSubscriber$2;
var noop_1$7 = noop$3;
function ignoreElements() {
    return lift_1$I.operate(function (source, subscriber) {
        source.subscribe(OperatorSubscriber_1$x.createOperatorSubscriber(subscriber, noop_1$7.noop));
    });
}
ignoreElements$1.ignoreElements = ignoreElements;

var mapTo$1 = {};

Object.defineProperty(mapTo$1, "__esModule", { value: true });
mapTo$1.mapTo = void 0;
var map_1$3 = map$1;
function mapTo(value) {
    return map_1$3.map(function () { return value; });
}
mapTo$1.mapTo = mapTo;

Object.defineProperty(delayWhen$1, "__esModule", { value: true });
delayWhen$1.delayWhen = void 0;
var concat_1$2 = concat$3;
var take_1$2 = take$1;
var ignoreElements_1 = ignoreElements$1;
var mapTo_1 = mapTo$1;
var mergeMap_1$2 = mergeMap$1;
var innerFrom_1$h = innerFrom$1;
function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
        return function (source) {
            return concat_1$2.concat(subscriptionDelay.pipe(take_1$2.take(1), ignoreElements_1.ignoreElements()), source.pipe(delayWhen(delayDurationSelector)));
        };
    }
    return mergeMap_1$2.mergeMap(function (value, index) { return innerFrom_1$h.innerFrom(delayDurationSelector(value, index)).pipe(take_1$2.take(1), mapTo_1.mapTo(value)); });
}
delayWhen$1.delayWhen = delayWhen;

Object.defineProperty(delay$1, "__esModule", { value: true });
delay$1.delay = void 0;
var async_1$5 = async;
var delayWhen_1 = delayWhen$1;
var timer_1$3 = timer$1;
function delay(due, scheduler) {
    if (scheduler === void 0) { scheduler = async_1$5.asyncScheduler; }
    var duration = timer_1$3.timer(due, scheduler);
    return delayWhen_1.delayWhen(function () { return duration; });
}
delay$1.delay = delay;

var dematerialize$1 = {};

Object.defineProperty(dematerialize$1, "__esModule", { value: true });
dematerialize$1.dematerialize = void 0;
var Notification_1$1 = Notification;
var lift_1$H = lift;
var OperatorSubscriber_1$w = OperatorSubscriber$2;
function dematerialize() {
    return lift_1$H.operate(function (source, subscriber) {
        source.subscribe(OperatorSubscriber_1$w.createOperatorSubscriber(subscriber, function (notification) { return Notification_1$1.observeNotification(notification, subscriber); }));
    });
}
dematerialize$1.dematerialize = dematerialize;

var distinct$1 = {};

Object.defineProperty(distinct$1, "__esModule", { value: true });
distinct$1.distinct = void 0;
var lift_1$G = lift;
var OperatorSubscriber_1$v = OperatorSubscriber$2;
var noop_1$6 = noop$3;
var innerFrom_1$g = innerFrom$1;
function distinct(keySelector, flushes) {
    return lift_1$G.operate(function (source, subscriber) {
        var distinctKeys = new Set();
        source.subscribe(OperatorSubscriber_1$v.createOperatorSubscriber(subscriber, function (value) {
            var key = keySelector ? keySelector(value) : value;
            if (!distinctKeys.has(key)) {
                distinctKeys.add(key);
                subscriber.next(value);
            }
        }));
        flushes && innerFrom_1$g.innerFrom(flushes).subscribe(OperatorSubscriber_1$v.createOperatorSubscriber(subscriber, function () { return distinctKeys.clear(); }, noop_1$6.noop));
    });
}
distinct$1.distinct = distinct;

var distinctUntilChanged$1 = {};

Object.defineProperty(distinctUntilChanged$1, "__esModule", { value: true });
distinctUntilChanged$1.distinctUntilChanged = void 0;
var identity_1$9 = identity$2;
var lift_1$F = lift;
var OperatorSubscriber_1$u = OperatorSubscriber$2;
function distinctUntilChanged(comparator, keySelector) {
    if (keySelector === void 0) { keySelector = identity_1$9.identity; }
    comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
    return lift_1$F.operate(function (source, subscriber) {
        var previousKey;
        var first = true;
        source.subscribe(OperatorSubscriber_1$u.createOperatorSubscriber(subscriber, function (value) {
            var currentKey = keySelector(value);
            if (first || !comparator(previousKey, currentKey)) {
                first = false;
                previousKey = currentKey;
                subscriber.next(value);
            }
        }));
    });
}
distinctUntilChanged$1.distinctUntilChanged = distinctUntilChanged;
function defaultCompare(a, b) {
    return a === b;
}

var distinctUntilKeyChanged$1 = {};

Object.defineProperty(distinctUntilKeyChanged$1, "__esModule", { value: true });
distinctUntilKeyChanged$1.distinctUntilKeyChanged = void 0;
var distinctUntilChanged_1 = distinctUntilChanged$1;
function distinctUntilKeyChanged(key, compare) {
    return distinctUntilChanged_1.distinctUntilChanged(function (x, y) { return compare ? compare(x[key], y[key]) : x[key] === y[key]; });
}
distinctUntilKeyChanged$1.distinctUntilKeyChanged = distinctUntilKeyChanged;

var elementAt$1 = {};

var throwIfEmpty$1 = {};

Object.defineProperty(throwIfEmpty$1, "__esModule", { value: true });
throwIfEmpty$1.throwIfEmpty = void 0;
var EmptyError_1$3 = EmptyError;
var lift_1$E = lift;
var OperatorSubscriber_1$t = OperatorSubscriber$2;
function throwIfEmpty(errorFactory) {
    if (errorFactory === void 0) { errorFactory = defaultErrorFactory; }
    return lift_1$E.operate(function (source, subscriber) {
        var hasValue = false;
        source.subscribe(OperatorSubscriber_1$t.createOperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            subscriber.next(value);
        }, function () { return (hasValue ? subscriber.complete() : subscriber.error(errorFactory())); }));
    });
}
throwIfEmpty$1.throwIfEmpty = throwIfEmpty;
function defaultErrorFactory() {
    return new EmptyError_1$3.EmptyError();
}

Object.defineProperty(elementAt$1, "__esModule", { value: true });
elementAt$1.elementAt = void 0;
var ArgumentOutOfRangeError_1 = ArgumentOutOfRangeError;
var filter_1$4 = filter$2;
var throwIfEmpty_1$2 = throwIfEmpty$1;
var defaultIfEmpty_1$2 = defaultIfEmpty$1;
var take_1$1 = take$1;
function elementAt(index, defaultValue) {
    if (index < 0) {
        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
    }
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(filter_1$4.filter(function (v, i) { return i === index; }), take_1$1.take(1), hasDefaultValue ? defaultIfEmpty_1$2.defaultIfEmpty(defaultValue) : throwIfEmpty_1$2.throwIfEmpty(function () { return new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError(); }));
    };
}
elementAt$1.elementAt = elementAt;

var endWith$1 = {};

var __read$c = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
var __spreadArray$b = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(endWith$1, "__esModule", { value: true });
endWith$1.endWith = void 0;
var concat_1$1 = concat$3;
var of_1 = of$1;
function endWith() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return function (source) { return concat_1$1.concat(source, of_1.of.apply(void 0, __spreadArray$b([], __read$c(values)))); };
}
endWith$1.endWith = endWith;

var every$1 = {};

Object.defineProperty(every$1, "__esModule", { value: true });
every$1.every = void 0;
var lift_1$D = lift;
var OperatorSubscriber_1$s = OperatorSubscriber$2;
function every(predicate, thisArg) {
    return lift_1$D.operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1$s.createOperatorSubscriber(subscriber, function (value) {
            if (!predicate.call(thisArg, value, index++, source)) {
                subscriber.next(false);
                subscriber.complete();
            }
        }, function () {
            subscriber.next(true);
            subscriber.complete();
        }));
    });
}
every$1.every = every;

var exhaust = {};

var exhaustAll$1 = {};

var exhaustMap$1 = {};

Object.defineProperty(exhaustMap$1, "__esModule", { value: true });
exhaustMap$1.exhaustMap = void 0;
var map_1$2 = map$1;
var innerFrom_1$f = innerFrom$1;
var lift_1$C = lift;
var OperatorSubscriber_1$r = OperatorSubscriber$2;
function exhaustMap(project, resultSelector) {
    if (resultSelector) {
        return function (source) {
            return source.pipe(exhaustMap(function (a, i) { return innerFrom_1$f.innerFrom(project(a, i)).pipe(map_1$2.map(function (b, ii) { return resultSelector(a, b, i, ii); })); }));
        };
    }
    return lift_1$C.operate(function (source, subscriber) {
        var index = 0;
        var innerSub = null;
        var isComplete = false;
        source.subscribe(OperatorSubscriber_1$r.createOperatorSubscriber(subscriber, function (outerValue) {
            if (!innerSub) {
                innerSub = OperatorSubscriber_1$r.createOperatorSubscriber(subscriber, undefined, function () {
                    innerSub = null;
                    isComplete && subscriber.complete();
                });
                innerFrom_1$f.innerFrom(project(outerValue, index++)).subscribe(innerSub);
            }
        }, function () {
            isComplete = true;
            !innerSub && subscriber.complete();
        }));
    });
}
exhaustMap$1.exhaustMap = exhaustMap;

Object.defineProperty(exhaustAll$1, "__esModule", { value: true });
exhaustAll$1.exhaustAll = void 0;
var exhaustMap_1 = exhaustMap$1;
var identity_1$8 = identity$2;
function exhaustAll() {
    return exhaustMap_1.exhaustMap(identity_1$8.identity);
}
exhaustAll$1.exhaustAll = exhaustAll;

Object.defineProperty(exhaust, "__esModule", { value: true });
exhaust.exhaust = void 0;
var exhaustAll_1 = exhaustAll$1;
exhaust.exhaust = exhaustAll_1.exhaustAll;

var expand$1 = {};

Object.defineProperty(expand$1, "__esModule", { value: true });
expand$1.expand = void 0;
var lift_1$B = lift;
var mergeInternals_1$1 = mergeInternals$1;
function expand(project, concurrent, scheduler) {
    if (concurrent === void 0) { concurrent = Infinity; }
    concurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
    return lift_1$B.operate(function (source, subscriber) {
        return mergeInternals_1$1.mergeInternals(source, subscriber, project, concurrent, undefined, true, scheduler);
    });
}
expand$1.expand = expand;

var finalize$1 = {};

Object.defineProperty(finalize$1, "__esModule", { value: true });
finalize$1.finalize = void 0;
var lift_1$A = lift;
function finalize(callback) {
    return lift_1$A.operate(function (source, subscriber) {
        try {
            source.subscribe(subscriber);
        }
        finally {
            subscriber.add(callback);
        }
    });
}
finalize$1.finalize = finalize;

var find$1 = {};

Object.defineProperty(find$1, "__esModule", { value: true });
find$1.createFind = find$1.find = void 0;
var lift_1$z = lift;
var OperatorSubscriber_1$q = OperatorSubscriber$2;
function find(predicate, thisArg) {
    return lift_1$z.operate(createFind(predicate, thisArg, 'value'));
}
find$1.find = find;
function createFind(predicate, thisArg, emit) {
    var findIndex = emit === 'index';
    return function (source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1$q.createOperatorSubscriber(subscriber, function (value) {
            var i = index++;
            if (predicate.call(thisArg, value, i, source)) {
                subscriber.next(findIndex ? i : value);
                subscriber.complete();
            }
        }, function () {
            subscriber.next(findIndex ? -1 : undefined);
            subscriber.complete();
        }));
    };
}
find$1.createFind = createFind;

var findIndex$1 = {};

Object.defineProperty(findIndex$1, "__esModule", { value: true });
findIndex$1.findIndex = void 0;
var lift_1$y = lift;
var find_1 = find$1;
function findIndex(predicate, thisArg) {
    return lift_1$y.operate(find_1.createFind(predicate, thisArg, 'index'));
}
findIndex$1.findIndex = findIndex;

var first$1 = {};

Object.defineProperty(first$1, "__esModule", { value: true });
first$1.first = void 0;
var EmptyError_1$2 = EmptyError;
var filter_1$3 = filter$2;
var take_1 = take$1;
var defaultIfEmpty_1$1 = defaultIfEmpty$1;
var throwIfEmpty_1$1 = throwIfEmpty$1;
var identity_1$7 = identity$2;
function first(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(predicate ? filter_1$3.filter(function (v, i) { return predicate(v, i, source); }) : identity_1$7.identity, take_1.take(1), hasDefaultValue ? defaultIfEmpty_1$1.defaultIfEmpty(defaultValue) : throwIfEmpty_1$1.throwIfEmpty(function () { return new EmptyError_1$2.EmptyError(); }));
    };
}
first$1.first = first;

var groupBy$1 = {};

Object.defineProperty(groupBy$1, "__esModule", { value: true });
groupBy$1.groupBy = void 0;
var Observable_1 = Observable$2;
var innerFrom_1$e = innerFrom$1;
var Subject_1$9 = Subject$2;
var lift_1$x = lift;
var OperatorSubscriber_1$p = OperatorSubscriber$2;
function groupBy(keySelector, elementOrOptions, duration, connector) {
    return lift_1$x.operate(function (source, subscriber) {
        var element;
        if (!elementOrOptions || typeof elementOrOptions === 'function') {
            element = elementOrOptions;
        }
        else {
            (duration = elementOrOptions.duration, element = elementOrOptions.element, connector = elementOrOptions.connector);
        }
        var groups = new Map();
        var notify = function (cb) {
            groups.forEach(cb);
            cb(subscriber);
        };
        var handleError = function (err) { return notify(function (consumer) { return consumer.error(err); }); };
        var activeGroups = 0;
        var teardownAttempted = false;
        var groupBySourceSubscriber = new OperatorSubscriber_1$p.OperatorSubscriber(subscriber, function (value) {
            try {
                var key_1 = keySelector(value);
                var group_1 = groups.get(key_1);
                if (!group_1) {
                    groups.set(key_1, (group_1 = connector ? connector() : new Subject_1$9.Subject()));
                    var grouped = createGroupedObservable(key_1, group_1);
                    subscriber.next(grouped);
                    if (duration) {
                        var durationSubscriber_1 = OperatorSubscriber_1$p.createOperatorSubscriber(group_1, function () {
                            group_1.complete();
                            durationSubscriber_1 === null || durationSubscriber_1 === void 0 ? void 0 : durationSubscriber_1.unsubscribe();
                        }, undefined, undefined, function () { return groups.delete(key_1); });
                        groupBySourceSubscriber.add(innerFrom_1$e.innerFrom(duration(grouped)).subscribe(durationSubscriber_1));
                    }
                }
                group_1.next(element ? element(value) : value);
            }
            catch (err) {
                handleError(err);
            }
        }, function () { return notify(function (consumer) { return consumer.complete(); }); }, handleError, function () { return groups.clear(); }, function () {
            teardownAttempted = true;
            return activeGroups === 0;
        });
        source.subscribe(groupBySourceSubscriber);
        function createGroupedObservable(key, groupSubject) {
            var result = new Observable_1.Observable(function (groupSubscriber) {
                activeGroups++;
                var innerSub = groupSubject.subscribe(groupSubscriber);
                return function () {
                    innerSub.unsubscribe();
                    --activeGroups === 0 && teardownAttempted && groupBySourceSubscriber.unsubscribe();
                };
            });
            result.key = key;
            return result;
        }
    });
}
groupBy$1.groupBy = groupBy;

var isEmpty$1 = {};

Object.defineProperty(isEmpty$1, "__esModule", { value: true });
isEmpty$1.isEmpty = void 0;
var lift_1$w = lift;
var OperatorSubscriber_1$o = OperatorSubscriber$2;
function isEmpty() {
    return lift_1$w.operate(function (source, subscriber) {
        source.subscribe(OperatorSubscriber_1$o.createOperatorSubscriber(subscriber, function () {
            subscriber.next(false);
            subscriber.complete();
        }, function () {
            subscriber.next(true);
            subscriber.complete();
        }));
    });
}
isEmpty$1.isEmpty = isEmpty;

var last$1 = {};

var takeLast$1 = {};

var __values$4 = (commonjsGlobal && commonjsGlobal.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(takeLast$1, "__esModule", { value: true });
takeLast$1.takeLast = void 0;
var empty_1$1 = empty;
var lift_1$v = lift;
var OperatorSubscriber_1$n = OperatorSubscriber$2;
function takeLast(count) {
    return count <= 0
        ? function () { return empty_1$1.EMPTY; }
        : lift_1$v.operate(function (source, subscriber) {
            var buffer = [];
            source.subscribe(OperatorSubscriber_1$n.createOperatorSubscriber(subscriber, function (value) {
                buffer.push(value);
                count < buffer.length && buffer.shift();
            }, function () {
                var e_1, _a;
                try {
                    for (var buffer_1 = __values$4(buffer), buffer_1_1 = buffer_1.next(); !buffer_1_1.done; buffer_1_1 = buffer_1.next()) {
                        var value = buffer_1_1.value;
                        subscriber.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (buffer_1_1 && !buffer_1_1.done && (_a = buffer_1.return)) _a.call(buffer_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                subscriber.complete();
            }, undefined, function () {
                buffer = null;
            }));
        });
}
takeLast$1.takeLast = takeLast;

Object.defineProperty(last$1, "__esModule", { value: true });
last$1.last = void 0;
var EmptyError_1$1 = EmptyError;
var filter_1$2 = filter$2;
var takeLast_1 = takeLast$1;
var throwIfEmpty_1 = throwIfEmpty$1;
var defaultIfEmpty_1 = defaultIfEmpty$1;
var identity_1$6 = identity$2;
function last(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(predicate ? filter_1$2.filter(function (v, i) { return predicate(v, i, source); }) : identity_1$6.identity, takeLast_1.takeLast(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function () { return new EmptyError_1$1.EmptyError(); }));
    };
}
last$1.last = last;

var materialize$1 = {};

Object.defineProperty(materialize$1, "__esModule", { value: true });
materialize$1.materialize = void 0;
var Notification_1 = Notification;
var lift_1$u = lift;
var OperatorSubscriber_1$m = OperatorSubscriber$2;
function materialize() {
    return lift_1$u.operate(function (source, subscriber) {
        source.subscribe(OperatorSubscriber_1$m.createOperatorSubscriber(subscriber, function (value) {
            subscriber.next(Notification_1.Notification.createNext(value));
        }, function () {
            subscriber.next(Notification_1.Notification.createComplete());
            subscriber.complete();
        }, function (err) {
            subscriber.next(Notification_1.Notification.createError(err));
            subscriber.complete();
        }));
    });
}
materialize$1.materialize = materialize;

var max$1 = {};

Object.defineProperty(max$1, "__esModule", { value: true });
max$1.max = void 0;
var reduce_1$1 = reduce$1;
var isFunction_1$6 = isFunction$2;
function max(comparer) {
    return reduce_1$1.reduce(isFunction_1$6.isFunction(comparer) ? function (x, y) { return (comparer(x, y) > 0 ? x : y); } : function (x, y) { return (x > y ? x : y); });
}
max$1.max = max;

var flatMap = {};

Object.defineProperty(flatMap, "__esModule", { value: true });
flatMap.flatMap = void 0;
var mergeMap_1$1 = mergeMap$1;
flatMap.flatMap = mergeMap_1$1.mergeMap;

var mergeMapTo$1 = {};

Object.defineProperty(mergeMapTo$1, "__esModule", { value: true });
mergeMapTo$1.mergeMapTo = void 0;
var mergeMap_1 = mergeMap$1;
var isFunction_1$5 = isFunction$2;
function mergeMapTo(innerObservable, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    if (isFunction_1$5.isFunction(resultSelector)) {
        return mergeMap_1.mergeMap(function () { return innerObservable; }, resultSelector, concurrent);
    }
    if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return mergeMap_1.mergeMap(function () { return innerObservable; }, concurrent);
}
mergeMapTo$1.mergeMapTo = mergeMapTo;

var mergeScan$1 = {};

Object.defineProperty(mergeScan$1, "__esModule", { value: true });
mergeScan$1.mergeScan = void 0;
var lift_1$t = lift;
var mergeInternals_1 = mergeInternals$1;
function mergeScan(accumulator, seed, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    return lift_1$t.operate(function (source, subscriber) {
        var state = seed;
        return mergeInternals_1.mergeInternals(source, subscriber, function (value, index) { return accumulator(state, value, index); }, concurrent, function (value) {
            state = value;
        }, false, undefined, function () { return (state = null); });
    });
}
mergeScan$1.mergeScan = mergeScan;

var mergeWith$1 = {};

var merge$1 = {};

var __read$b = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
var __spreadArray$a = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(merge$1, "__esModule", { value: true });
merge$1.merge = void 0;
var lift_1$s = lift;
var argsOrArgArray_1$2 = argsOrArgArray$1;
var mergeAll_1 = mergeAll$1;
var args_1$3 = args;
var from_1 = from$1;
function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args_1$3.popScheduler(args);
    var concurrent = args_1$3.popNumber(args, Infinity);
    args = argsOrArgArray_1$2.argsOrArgArray(args);
    return lift_1$s.operate(function (source, subscriber) {
        mergeAll_1.mergeAll(concurrent)(from_1.from(__spreadArray$a([source], __read$b(args)), scheduler)).subscribe(subscriber);
    });
}
merge$1.merge = merge;

var __read$a = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
var __spreadArray$9 = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(mergeWith$1, "__esModule", { value: true });
mergeWith$1.mergeWith = void 0;
var merge_1 = merge$1;
function mergeWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return merge_1.merge.apply(void 0, __spreadArray$9([], __read$a(otherSources)));
}
mergeWith$1.mergeWith = mergeWith;

var min$1 = {};

Object.defineProperty(min$1, "__esModule", { value: true });
min$1.min = void 0;
var reduce_1 = reduce$1;
var isFunction_1$4 = isFunction$2;
function min(comparer) {
    return reduce_1.reduce(isFunction_1$4.isFunction(comparer) ? function (x, y) { return (comparer(x, y) < 0 ? x : y); } : function (x, y) { return (x < y ? x : y); });
}
min$1.min = min;

var multicast$1 = {};

Object.defineProperty(multicast$1, "__esModule", { value: true });
multicast$1.multicast = void 0;
var ConnectableObservable_1$2 = ConnectableObservable$1;
var isFunction_1$3 = isFunction$2;
var connect_1$1 = connect$1;
function multicast(subjectOrSubjectFactory, selector) {
    var subjectFactory = isFunction_1$3.isFunction(subjectOrSubjectFactory) ? subjectOrSubjectFactory : function () { return subjectOrSubjectFactory; };
    if (isFunction_1$3.isFunction(selector)) {
        return connect_1$1.connect(selector, {
            connector: subjectFactory,
        });
    }
    return function (source) { return new ConnectableObservable_1$2.ConnectableObservable(source, subjectFactory); };
}
multicast$1.multicast = multicast;

var onErrorResumeNextWith$1 = {};

var __read$9 = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
var __spreadArray$8 = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(onErrorResumeNextWith$1, "__esModule", { value: true });
onErrorResumeNextWith$1.onErrorResumeNext = onErrorResumeNextWith$1.onErrorResumeNextWith = void 0;
var argsOrArgArray_1$1 = argsOrArgArray$1;
var onErrorResumeNext_1 = onErrorResumeNext$1;
function onErrorResumeNextWith() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var nextSources = argsOrArgArray_1$1.argsOrArgArray(sources);
    return function (source) { return onErrorResumeNext_1.onErrorResumeNext.apply(void 0, __spreadArray$8([source], __read$9(nextSources))); };
}
onErrorResumeNextWith$1.onErrorResumeNextWith = onErrorResumeNextWith;
onErrorResumeNextWith$1.onErrorResumeNext = onErrorResumeNextWith;

var pairwise$1 = {};

Object.defineProperty(pairwise$1, "__esModule", { value: true });
pairwise$1.pairwise = void 0;
var lift_1$r = lift;
var OperatorSubscriber_1$l = OperatorSubscriber$2;
function pairwise() {
    return lift_1$r.operate(function (source, subscriber) {
        var prev;
        var hasPrev = false;
        source.subscribe(OperatorSubscriber_1$l.createOperatorSubscriber(subscriber, function (value) {
            var p = prev;
            prev = value;
            hasPrev && subscriber.next([p, value]);
            hasPrev = true;
        }));
    });
}
pairwise$1.pairwise = pairwise;

var pluck$1 = {};

Object.defineProperty(pluck$1, "__esModule", { value: true });
pluck$1.pluck = void 0;
var map_1$1 = map$1;
function pluck() {
    var properties = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i] = arguments[_i];
    }
    var length = properties.length;
    if (length === 0) {
        throw new Error('list of properties cannot be empty.');
    }
    return map_1$1.map(function (x) {
        var currentProp = x;
        for (var i = 0; i < length; i++) {
            var p = currentProp === null || currentProp === void 0 ? void 0 : currentProp[properties[i]];
            if (typeof p !== 'undefined') {
                currentProp = p;
            }
            else {
                return undefined;
            }
        }
        return currentProp;
    });
}
pluck$1.pluck = pluck;

var publish$1 = {};

Object.defineProperty(publish$1, "__esModule", { value: true });
publish$1.publish = void 0;
var Subject_1$8 = Subject$2;
var multicast_1$1 = multicast$1;
var connect_1 = connect$1;
function publish(selector) {
    return selector ? function (source) { return connect_1.connect(selector)(source); } : function (source) { return multicast_1$1.multicast(new Subject_1$8.Subject())(source); };
}
publish$1.publish = publish;

var publishBehavior$1 = {};

Object.defineProperty(publishBehavior$1, "__esModule", { value: true });
publishBehavior$1.publishBehavior = void 0;
var BehaviorSubject_1 = BehaviorSubject$1;
var ConnectableObservable_1$1 = ConnectableObservable$1;
function publishBehavior(initialValue) {
    return function (source) {
        var subject = new BehaviorSubject_1.BehaviorSubject(initialValue);
        return new ConnectableObservable_1$1.ConnectableObservable(source, function () { return subject; });
    };
}
publishBehavior$1.publishBehavior = publishBehavior;

var publishLast$1 = {};

Object.defineProperty(publishLast$1, "__esModule", { value: true });
publishLast$1.publishLast = void 0;
var AsyncSubject_1 = AsyncSubject$1;
var ConnectableObservable_1 = ConnectableObservable$1;
function publishLast() {
    return function (source) {
        var subject = new AsyncSubject_1.AsyncSubject();
        return new ConnectableObservable_1.ConnectableObservable(source, function () { return subject; });
    };
}
publishLast$1.publishLast = publishLast;

var publishReplay$1 = {};

Object.defineProperty(publishReplay$1, "__esModule", { value: true });
publishReplay$1.publishReplay = void 0;
var ReplaySubject_1$1 = ReplaySubject$1;
var multicast_1 = multicast$1;
var isFunction_1$2 = isFunction$2;
function publishReplay(bufferSize, windowTime, selectorOrScheduler, timestampProvider) {
    if (selectorOrScheduler && !isFunction_1$2.isFunction(selectorOrScheduler)) {
        timestampProvider = selectorOrScheduler;
    }
    var selector = isFunction_1$2.isFunction(selectorOrScheduler) ? selectorOrScheduler : undefined;
    return function (source) { return multicast_1.multicast(new ReplaySubject_1$1.ReplaySubject(bufferSize, windowTime, timestampProvider), selector)(source); };
}
publishReplay$1.publishReplay = publishReplay;

var raceWith$1 = {};

var __read$8 = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
var __spreadArray$7 = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(raceWith$1, "__esModule", { value: true });
raceWith$1.raceWith = void 0;
var race_1 = race$3;
var lift_1$q = lift;
var identity_1$5 = identity$2;
function raceWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return !otherSources.length
        ? identity_1$5.identity
        : lift_1$q.operate(function (source, subscriber) {
            race_1.raceInit(__spreadArray$7([source], __read$8(otherSources)))(subscriber);
        });
}
raceWith$1.raceWith = raceWith;

var repeat$1 = {};

Object.defineProperty(repeat$1, "__esModule", { value: true });
repeat$1.repeat = void 0;
var empty_1 = empty;
var lift_1$p = lift;
var OperatorSubscriber_1$k = OperatorSubscriber$2;
var innerFrom_1$d = innerFrom$1;
var timer_1$2 = timer$1;
function repeat(countOrConfig) {
    var _a;
    var count = Infinity;
    var delay;
    if (countOrConfig != null) {
        if (typeof countOrConfig === 'object') {
            (_a = countOrConfig.count, count = _a === void 0 ? Infinity : _a, delay = countOrConfig.delay);
        }
        else {
            count = countOrConfig;
        }
    }
    return count <= 0
        ? function () { return empty_1.EMPTY; }
        : lift_1$p.operate(function (source, subscriber) {
            var soFar = 0;
            var sourceSub;
            var resubscribe = function () {
                sourceSub === null || sourceSub === void 0 ? void 0 : sourceSub.unsubscribe();
                sourceSub = null;
                if (delay != null) {
                    var notifier = typeof delay === 'number' ? timer_1$2.timer(delay) : innerFrom_1$d.innerFrom(delay(soFar));
                    var notifierSubscriber_1 = OperatorSubscriber_1$k.createOperatorSubscriber(subscriber, function () {
                        notifierSubscriber_1.unsubscribe();
                        subscribeToSource();
                    });
                    notifier.subscribe(notifierSubscriber_1);
                }
                else {
                    subscribeToSource();
                }
            };
            var subscribeToSource = function () {
                var syncUnsub = false;
                sourceSub = source.subscribe(OperatorSubscriber_1$k.createOperatorSubscriber(subscriber, undefined, function () {
                    if (++soFar < count) {
                        if (sourceSub) {
                            resubscribe();
                        }
                        else {
                            syncUnsub = true;
                        }
                    }
                    else {
                        subscriber.complete();
                    }
                }));
                if (syncUnsub) {
                    resubscribe();
                }
            };
            subscribeToSource();
        });
}
repeat$1.repeat = repeat;

var repeatWhen$1 = {};

Object.defineProperty(repeatWhen$1, "__esModule", { value: true });
repeatWhen$1.repeatWhen = void 0;
var innerFrom_1$c = innerFrom$1;
var Subject_1$7 = Subject$2;
var lift_1$o = lift;
var OperatorSubscriber_1$j = OperatorSubscriber$2;
function repeatWhen(notifier) {
    return lift_1$o.operate(function (source, subscriber) {
        var innerSub;
        var syncResub = false;
        var completions$;
        var isNotifierComplete = false;
        var isMainComplete = false;
        var checkComplete = function () { return isMainComplete && isNotifierComplete && (subscriber.complete(), true); };
        var getCompletionSubject = function () {
            if (!completions$) {
                completions$ = new Subject_1$7.Subject();
                innerFrom_1$c.innerFrom(notifier(completions$)).subscribe(OperatorSubscriber_1$j.createOperatorSubscriber(subscriber, function () {
                    if (innerSub) {
                        subscribeForRepeatWhen();
                    }
                    else {
                        syncResub = true;
                    }
                }, function () {
                    isNotifierComplete = true;
                    checkComplete();
                }));
            }
            return completions$;
        };
        var subscribeForRepeatWhen = function () {
            isMainComplete = false;
            innerSub = source.subscribe(OperatorSubscriber_1$j.createOperatorSubscriber(subscriber, undefined, function () {
                isMainComplete = true;
                !checkComplete() && getCompletionSubject().next();
            }));
            if (syncResub) {
                innerSub.unsubscribe();
                innerSub = null;
                syncResub = false;
                subscribeForRepeatWhen();
            }
        };
        subscribeForRepeatWhen();
    });
}
repeatWhen$1.repeatWhen = repeatWhen;

var retry$1 = {};

Object.defineProperty(retry$1, "__esModule", { value: true });
retry$1.retry = void 0;
var lift_1$n = lift;
var OperatorSubscriber_1$i = OperatorSubscriber$2;
var identity_1$4 = identity$2;
var timer_1$1 = timer$1;
var innerFrom_1$b = innerFrom$1;
function retry(configOrCount) {
    if (configOrCount === void 0) { configOrCount = Infinity; }
    var config;
    if (configOrCount && typeof configOrCount === 'object') {
        config = configOrCount;
    }
    else {
        config = {
            count: configOrCount,
        };
    }
    var _a = config.count, count = _a === void 0 ? Infinity : _a, delay = config.delay, _b = config.resetOnSuccess, resetOnSuccess = _b === void 0 ? false : _b;
    return count <= 0
        ? identity_1$4.identity
        : lift_1$n.operate(function (source, subscriber) {
            var soFar = 0;
            var innerSub;
            var subscribeForRetry = function () {
                var syncUnsub = false;
                innerSub = source.subscribe(OperatorSubscriber_1$i.createOperatorSubscriber(subscriber, function (value) {
                    if (resetOnSuccess) {
                        soFar = 0;
                    }
                    subscriber.next(value);
                }, undefined, function (err) {
                    if (soFar++ < count) {
                        var resub_1 = function () {
                            if (innerSub) {
                                innerSub.unsubscribe();
                                innerSub = null;
                                subscribeForRetry();
                            }
                            else {
                                syncUnsub = true;
                            }
                        };
                        if (delay != null) {
                            var notifier = typeof delay === 'number' ? timer_1$1.timer(delay) : innerFrom_1$b.innerFrom(delay(err, soFar));
                            var notifierSubscriber_1 = OperatorSubscriber_1$i.createOperatorSubscriber(subscriber, function () {
                                notifierSubscriber_1.unsubscribe();
                                resub_1();
                            }, function () {
                                subscriber.complete();
                            });
                            notifier.subscribe(notifierSubscriber_1);
                        }
                        else {
                            resub_1();
                        }
                    }
                    else {
                        subscriber.error(err);
                    }
                }));
                if (syncUnsub) {
                    innerSub.unsubscribe();
                    innerSub = null;
                    subscribeForRetry();
                }
            };
            subscribeForRetry();
        });
}
retry$1.retry = retry;

var retryWhen$1 = {};

Object.defineProperty(retryWhen$1, "__esModule", { value: true });
retryWhen$1.retryWhen = void 0;
var innerFrom_1$a = innerFrom$1;
var Subject_1$6 = Subject$2;
var lift_1$m = lift;
var OperatorSubscriber_1$h = OperatorSubscriber$2;
function retryWhen(notifier) {
    return lift_1$m.operate(function (source, subscriber) {
        var innerSub;
        var syncResub = false;
        var errors$;
        var subscribeForRetryWhen = function () {
            innerSub = source.subscribe(OperatorSubscriber_1$h.createOperatorSubscriber(subscriber, undefined, undefined, function (err) {
                if (!errors$) {
                    errors$ = new Subject_1$6.Subject();
                    innerFrom_1$a.innerFrom(notifier(errors$)).subscribe(OperatorSubscriber_1$h.createOperatorSubscriber(subscriber, function () {
                        return innerSub ? subscribeForRetryWhen() : (syncResub = true);
                    }));
                }
                if (errors$) {
                    errors$.next(err);
                }
            }));
            if (syncResub) {
                innerSub.unsubscribe();
                innerSub = null;
                syncResub = false;
                subscribeForRetryWhen();
            }
        };
        subscribeForRetryWhen();
    });
}
retryWhen$1.retryWhen = retryWhen;

var sample$1 = {};

Object.defineProperty(sample$1, "__esModule", { value: true });
sample$1.sample = void 0;
var innerFrom_1$9 = innerFrom$1;
var lift_1$l = lift;
var noop_1$5 = noop$3;
var OperatorSubscriber_1$g = OperatorSubscriber$2;
function sample(notifier) {
    return lift_1$l.operate(function (source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        source.subscribe(OperatorSubscriber_1$g.createOperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            lastValue = value;
        }));
        innerFrom_1$9.innerFrom(notifier).subscribe(OperatorSubscriber_1$g.createOperatorSubscriber(subscriber, function () {
            if (hasValue) {
                hasValue = false;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        }, noop_1$5.noop));
    });
}
sample$1.sample = sample;

var sampleTime$1 = {};

Object.defineProperty(sampleTime$1, "__esModule", { value: true });
sampleTime$1.sampleTime = void 0;
var async_1$4 = async;
var sample_1 = sample$1;
var interval_1 = interval$1;
function sampleTime(period, scheduler) {
    if (scheduler === void 0) { scheduler = async_1$4.asyncScheduler; }
    return sample_1.sample(interval_1.interval(period, scheduler));
}
sampleTime$1.sampleTime = sampleTime;

var scan$1 = {};

Object.defineProperty(scan$1, "__esModule", { value: true });
scan$1.scan = void 0;
var lift_1$k = lift;
var scanInternals_1 = scanInternals$1;
function scan(accumulator, seed) {
    return lift_1$k.operate(scanInternals_1.scanInternals(accumulator, seed, arguments.length >= 2, true));
}
scan$1.scan = scan;

var sequenceEqual$1 = {};

Object.defineProperty(sequenceEqual$1, "__esModule", { value: true });
sequenceEqual$1.sequenceEqual = void 0;
var lift_1$j = lift;
var OperatorSubscriber_1$f = OperatorSubscriber$2;
var innerFrom_1$8 = innerFrom$1;
function sequenceEqual(compareTo, comparator) {
    if (comparator === void 0) { comparator = function (a, b) { return a === b; }; }
    return lift_1$j.operate(function (source, subscriber) {
        var aState = createState();
        var bState = createState();
        var emit = function (isEqual) {
            subscriber.next(isEqual);
            subscriber.complete();
        };
        var createSubscriber = function (selfState, otherState) {
            var sequenceEqualSubscriber = OperatorSubscriber_1$f.createOperatorSubscriber(subscriber, function (a) {
                var buffer = otherState.buffer, complete = otherState.complete;
                if (buffer.length === 0) {
                    complete ? emit(false) : selfState.buffer.push(a);
                }
                else {
                    !comparator(a, buffer.shift()) && emit(false);
                }
            }, function () {
                selfState.complete = true;
                var complete = otherState.complete, buffer = otherState.buffer;
                complete && emit(buffer.length === 0);
                sequenceEqualSubscriber === null || sequenceEqualSubscriber === void 0 ? void 0 : sequenceEqualSubscriber.unsubscribe();
            });
            return sequenceEqualSubscriber;
        };
        source.subscribe(createSubscriber(aState, bState));
        innerFrom_1$8.innerFrom(compareTo).subscribe(createSubscriber(bState, aState));
    });
}
sequenceEqual$1.sequenceEqual = sequenceEqual;
function createState() {
    return {
        buffer: [],
        complete: false,
    };
}

var share$1 = {};

var __read$7 = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
var __spreadArray$6 = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(share$1, "__esModule", { value: true });
share$1.share = void 0;
var innerFrom_1$7 = innerFrom$1;
var Subject_1$5 = Subject$2;
var Subscriber_1 = Subscriber$1;
var lift_1$i = lift;
function share(options) {
    if (options === void 0) { options = {}; }
    var _a = options.connector, connector = _a === void 0 ? function () { return new Subject_1$5.Subject(); } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
    return function (wrapperSource) {
        var connection;
        var resetConnection;
        var subject;
        var refCount = 0;
        var hasCompleted = false;
        var hasErrored = false;
        var cancelReset = function () {
            resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
            resetConnection = undefined;
        };
        var reset = function () {
            cancelReset();
            connection = subject = undefined;
            hasCompleted = hasErrored = false;
        };
        var resetAndUnsubscribe = function () {
            var conn = connection;
            reset();
            conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
        };
        return lift_1$i.operate(function (source, subscriber) {
            refCount++;
            if (!hasErrored && !hasCompleted) {
                cancelReset();
            }
            var dest = (subject = subject !== null && subject !== void 0 ? subject : connector());
            subscriber.add(function () {
                refCount--;
                if (refCount === 0 && !hasErrored && !hasCompleted) {
                    resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
                }
            });
            dest.subscribe(subscriber);
            if (!connection &&
                refCount > 0) {
                connection = new Subscriber_1.SafeSubscriber({
                    next: function (value) { return dest.next(value); },
                    error: function (err) {
                        hasErrored = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnError, err);
                        dest.error(err);
                    },
                    complete: function () {
                        hasCompleted = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnComplete);
                        dest.complete();
                    },
                });
                innerFrom_1$7.innerFrom(source).subscribe(connection);
            }
        })(wrapperSource);
    };
}
share$1.share = share;
function handleReset(reset, on) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (on === true) {
        reset();
        return;
    }
    if (on === false) {
        return;
    }
    var onSubscriber = new Subscriber_1.SafeSubscriber({
        next: function () {
            onSubscriber.unsubscribe();
            reset();
        },
    });
    return innerFrom_1$7.innerFrom(on.apply(void 0, __spreadArray$6([], __read$7(args)))).subscribe(onSubscriber);
}

var shareReplay$1 = {};

Object.defineProperty(shareReplay$1, "__esModule", { value: true });
shareReplay$1.shareReplay = void 0;
var ReplaySubject_1 = ReplaySubject$1;
var share_1 = share$1;
function shareReplay(configOrBufferSize, windowTime, scheduler) {
    var _a, _b, _c;
    var bufferSize;
    var refCount = false;
    if (configOrBufferSize && typeof configOrBufferSize === 'object') {
        (_a = configOrBufferSize.bufferSize, bufferSize = _a === void 0 ? Infinity : _a, _b = configOrBufferSize.windowTime, windowTime = _b === void 0 ? Infinity : _b, _c = configOrBufferSize.refCount, refCount = _c === void 0 ? false : _c, scheduler = configOrBufferSize.scheduler);
    }
    else {
        bufferSize = (configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity);
    }
    return share_1.share({
        connector: function () { return new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler); },
        resetOnError: true,
        resetOnComplete: false,
        resetOnRefCountZero: refCount,
    });
}
shareReplay$1.shareReplay = shareReplay;

var single$1 = {};

Object.defineProperty(single$1, "__esModule", { value: true });
single$1.single = void 0;
var EmptyError_1 = EmptyError;
var SequenceError_1 = SequenceError;
var NotFoundError_1 = NotFoundError;
var lift_1$h = lift;
var OperatorSubscriber_1$e = OperatorSubscriber$2;
function single(predicate) {
    return lift_1$h.operate(function (source, subscriber) {
        var hasValue = false;
        var singleValue;
        var seenValue = false;
        var index = 0;
        source.subscribe(OperatorSubscriber_1$e.createOperatorSubscriber(subscriber, function (value) {
            seenValue = true;
            if (!predicate || predicate(value, index++, source)) {
                hasValue && subscriber.error(new SequenceError_1.SequenceError('Too many matching values'));
                hasValue = true;
                singleValue = value;
            }
        }, function () {
            if (hasValue) {
                subscriber.next(singleValue);
                subscriber.complete();
            }
            else {
                subscriber.error(seenValue ? new NotFoundError_1.NotFoundError('No matching values') : new EmptyError_1.EmptyError());
            }
        }));
    });
}
single$1.single = single;

var skip$1 = {};

Object.defineProperty(skip$1, "__esModule", { value: true });
skip$1.skip = void 0;
var filter_1$1 = filter$2;
function skip(count) {
    return filter_1$1.filter(function (_, index) { return count <= index; });
}
skip$1.skip = skip;

var skipLast$1 = {};

Object.defineProperty(skipLast$1, "__esModule", { value: true });
skipLast$1.skipLast = void 0;
var identity_1$3 = identity$2;
var lift_1$g = lift;
var OperatorSubscriber_1$d = OperatorSubscriber$2;
function skipLast(skipCount) {
    return skipCount <= 0
        ?
            identity_1$3.identity
        : lift_1$g.operate(function (source, subscriber) {
            var ring = new Array(skipCount);
            var seen = 0;
            source.subscribe(OperatorSubscriber_1$d.createOperatorSubscriber(subscriber, function (value) {
                var valueIndex = seen++;
                if (valueIndex < skipCount) {
                    ring[valueIndex] = value;
                }
                else {
                    var index = valueIndex % skipCount;
                    var oldValue = ring[index];
                    ring[index] = value;
                    subscriber.next(oldValue);
                }
            }));
            return function () {
                ring = null;
            };
        });
}
skipLast$1.skipLast = skipLast;

var skipUntil$1 = {};

Object.defineProperty(skipUntil$1, "__esModule", { value: true });
skipUntil$1.skipUntil = void 0;
var lift_1$f = lift;
var OperatorSubscriber_1$c = OperatorSubscriber$2;
var innerFrom_1$6 = innerFrom$1;
var noop_1$4 = noop$3;
function skipUntil(notifier) {
    return lift_1$f.operate(function (source, subscriber) {
        var taking = false;
        var skipSubscriber = OperatorSubscriber_1$c.createOperatorSubscriber(subscriber, function () {
            skipSubscriber === null || skipSubscriber === void 0 ? void 0 : skipSubscriber.unsubscribe();
            taking = true;
        }, noop_1$4.noop);
        innerFrom_1$6.innerFrom(notifier).subscribe(skipSubscriber);
        source.subscribe(OperatorSubscriber_1$c.createOperatorSubscriber(subscriber, function (value) { return taking && subscriber.next(value); }));
    });
}
skipUntil$1.skipUntil = skipUntil;

var skipWhile$1 = {};

Object.defineProperty(skipWhile$1, "__esModule", { value: true });
skipWhile$1.skipWhile = void 0;
var lift_1$e = lift;
var OperatorSubscriber_1$b = OperatorSubscriber$2;
function skipWhile(predicate) {
    return lift_1$e.operate(function (source, subscriber) {
        var taking = false;
        var index = 0;
        source.subscribe(OperatorSubscriber_1$b.createOperatorSubscriber(subscriber, function (value) { return (taking || (taking = !predicate(value, index++))) && subscriber.next(value); }));
    });
}
skipWhile$1.skipWhile = skipWhile;

var startWith$1 = {};

Object.defineProperty(startWith$1, "__esModule", { value: true });
startWith$1.startWith = void 0;
var concat_1 = concat$3;
var args_1$2 = args;
var lift_1$d = lift;
function startWith() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    var scheduler = args_1$2.popScheduler(values);
    return lift_1$d.operate(function (source, subscriber) {
        (scheduler ? concat_1.concat(values, source, scheduler) : concat_1.concat(values, source)).subscribe(subscriber);
    });
}
startWith$1.startWith = startWith;

var switchAll$1 = {};

var switchMap$1 = {};

Object.defineProperty(switchMap$1, "__esModule", { value: true });
switchMap$1.switchMap = void 0;
var innerFrom_1$5 = innerFrom$1;
var lift_1$c = lift;
var OperatorSubscriber_1$a = OperatorSubscriber$2;
function switchMap(project, resultSelector) {
    return lift_1$c.operate(function (source, subscriber) {
        var innerSubscriber = null;
        var index = 0;
        var isComplete = false;
        var checkComplete = function () { return isComplete && !innerSubscriber && subscriber.complete(); };
        source.subscribe(OperatorSubscriber_1$a.createOperatorSubscriber(subscriber, function (value) {
            innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
            var innerIndex = 0;
            var outerIndex = index++;
            innerFrom_1$5.innerFrom(project(value, outerIndex)).subscribe((innerSubscriber = OperatorSubscriber_1$a.createOperatorSubscriber(subscriber, function (innerValue) { return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue); }, function () {
                innerSubscriber = null;
                checkComplete();
            })));
        }, function () {
            isComplete = true;
            checkComplete();
        }));
    });
}
switchMap$1.switchMap = switchMap;

Object.defineProperty(switchAll$1, "__esModule", { value: true });
switchAll$1.switchAll = void 0;
var switchMap_1$2 = switchMap$1;
var identity_1$2 = identity$2;
function switchAll() {
    return switchMap_1$2.switchMap(identity_1$2.identity);
}
switchAll$1.switchAll = switchAll;

var switchMapTo$1 = {};

Object.defineProperty(switchMapTo$1, "__esModule", { value: true });
switchMapTo$1.switchMapTo = void 0;
var switchMap_1$1 = switchMap$1;
var isFunction_1$1 = isFunction$2;
function switchMapTo(innerObservable, resultSelector) {
    return isFunction_1$1.isFunction(resultSelector) ? switchMap_1$1.switchMap(function () { return innerObservable; }, resultSelector) : switchMap_1$1.switchMap(function () { return innerObservable; });
}
switchMapTo$1.switchMapTo = switchMapTo;

var switchScan$1 = {};

Object.defineProperty(switchScan$1, "__esModule", { value: true });
switchScan$1.switchScan = void 0;
var switchMap_1 = switchMap$1;
var lift_1$b = lift;
function switchScan(accumulator, seed) {
    return lift_1$b.operate(function (source, subscriber) {
        var state = seed;
        switchMap_1.switchMap(function (value, index) { return accumulator(state, value, index); }, function (_, innerValue) { return ((state = innerValue), innerValue); })(source).subscribe(subscriber);
        return function () {
            state = null;
        };
    });
}
switchScan$1.switchScan = switchScan;

var takeUntil$1 = {};

Object.defineProperty(takeUntil$1, "__esModule", { value: true });
takeUntil$1.takeUntil = void 0;
var lift_1$a = lift;
var OperatorSubscriber_1$9 = OperatorSubscriber$2;
var innerFrom_1$4 = innerFrom$1;
var noop_1$3 = noop$3;
function takeUntil(notifier) {
    return lift_1$a.operate(function (source, subscriber) {
        innerFrom_1$4.innerFrom(notifier).subscribe(OperatorSubscriber_1$9.createOperatorSubscriber(subscriber, function () { return subscriber.complete(); }, noop_1$3.noop));
        !subscriber.closed && source.subscribe(subscriber);
    });
}
takeUntil$1.takeUntil = takeUntil;

var takeWhile$1 = {};

Object.defineProperty(takeWhile$1, "__esModule", { value: true });
takeWhile$1.takeWhile = void 0;
var lift_1$9 = lift;
var OperatorSubscriber_1$8 = OperatorSubscriber$2;
function takeWhile(predicate, inclusive) {
    if (inclusive === void 0) { inclusive = false; }
    return lift_1$9.operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1$8.createOperatorSubscriber(subscriber, function (value) {
            var result = predicate(value, index++);
            (result || inclusive) && subscriber.next(value);
            !result && subscriber.complete();
        }));
    });
}
takeWhile$1.takeWhile = takeWhile;

var tap$2 = {};

Object.defineProperty(tap$2, "__esModule", { value: true });
tap$2.tap = void 0;
var isFunction_1 = isFunction$2;
var lift_1$8 = lift;
var OperatorSubscriber_1$7 = OperatorSubscriber$2;
var identity_1$1 = identity$2;
function tap$1(observerOrNext, error, complete) {
    var tapObserver = isFunction_1.isFunction(observerOrNext) || error || complete
        ?
            { next: observerOrNext, error: error, complete: complete }
        : observerOrNext;
    return tapObserver
        ? lift_1$8.operate(function (source, subscriber) {
            var _a;
            (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
            var isUnsub = true;
            source.subscribe(OperatorSubscriber_1$7.createOperatorSubscriber(subscriber, function (value) {
                var _a;
                (_a = tapObserver.next) === null || _a === void 0 ? void 0 : _a.call(tapObserver, value);
                subscriber.next(value);
            }, function () {
                var _a;
                isUnsub = false;
                (_a = tapObserver.complete) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                subscriber.complete();
            }, function (err) {
                var _a;
                isUnsub = false;
                (_a = tapObserver.error) === null || _a === void 0 ? void 0 : _a.call(tapObserver, err);
                subscriber.error(err);
            }, function () {
                var _a, _b;
                if (isUnsub) {
                    (_a = tapObserver.unsubscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                }
                (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
            }));
        })
        :
            identity_1$1.identity;
}
tap$2.tap = tap$1;

var throttle = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.throttle = exports.defaultThrottleConfig = void 0;
	var lift_1 = lift;
	var OperatorSubscriber_1 = OperatorSubscriber$2;
	var innerFrom_1 = innerFrom$1;
	exports.defaultThrottleConfig = {
	    leading: true,
	    trailing: false,
	};
	function throttle(durationSelector, config) {
	    if (config === void 0) { config = exports.defaultThrottleConfig; }
	    return lift_1.operate(function (source, subscriber) {
	        var leading = config.leading, trailing = config.trailing;
	        var hasValue = false;
	        var sendValue = null;
	        var throttled = null;
	        var isComplete = false;
	        var endThrottling = function () {
	            throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
	            throttled = null;
	            if (trailing) {
	                send();
	                isComplete && subscriber.complete();
	            }
	        };
	        var cleanupThrottling = function () {
	            throttled = null;
	            isComplete && subscriber.complete();
	        };
	        var startThrottle = function (value) {
	            return (throttled = innerFrom_1.innerFrom(durationSelector(value)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, endThrottling, cleanupThrottling)));
	        };
	        var send = function () {
	            if (hasValue) {
	                hasValue = false;
	                var value = sendValue;
	                sendValue = null;
	                subscriber.next(value);
	                !isComplete && startThrottle(value);
	            }
	        };
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            hasValue = true;
	            sendValue = value;
	            !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
	        }, function () {
	            isComplete = true;
	            !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
	        }));
	    });
	}
	exports.throttle = throttle;
	
} (throttle));

var throttleTime$1 = {};

Object.defineProperty(throttleTime$1, "__esModule", { value: true });
throttleTime$1.throttleTime = void 0;
var async_1$3 = async;
var throttle_1 = throttle;
var timer_1 = timer$1;
function throttleTime(duration, scheduler, config) {
    if (scheduler === void 0) { scheduler = async_1$3.asyncScheduler; }
    if (config === void 0) { config = throttle_1.defaultThrottleConfig; }
    var duration$ = timer_1.timer(duration, scheduler);
    return throttle_1.throttle(function () { return duration$; }, config);
}
throttleTime$1.throttleTime = throttleTime;

var timeInterval$1 = {};

Object.defineProperty(timeInterval$1, "__esModule", { value: true });
timeInterval$1.TimeInterval = timeInterval$1.timeInterval = void 0;
var async_1$2 = async;
var lift_1$7 = lift;
var OperatorSubscriber_1$6 = OperatorSubscriber$2;
function timeInterval(scheduler) {
    if (scheduler === void 0) { scheduler = async_1$2.asyncScheduler; }
    return lift_1$7.operate(function (source, subscriber) {
        var last = scheduler.now();
        source.subscribe(OperatorSubscriber_1$6.createOperatorSubscriber(subscriber, function (value) {
            var now = scheduler.now();
            var interval = now - last;
            last = now;
            subscriber.next(new TimeInterval(value, interval));
        }));
    });
}
timeInterval$1.timeInterval = timeInterval;
var TimeInterval = (function () {
    function TimeInterval(value, interval) {
        this.value = value;
        this.interval = interval;
    }
    return TimeInterval;
}());
timeInterval$1.TimeInterval = TimeInterval;

var timeoutWith$1 = {};

Object.defineProperty(timeoutWith$1, "__esModule", { value: true });
timeoutWith$1.timeoutWith = void 0;
var async_1$1 = async;
var isDate_1 = isDate;
var timeout_1 = timeout;
function timeoutWith(due, withObservable, scheduler) {
    var first;
    var each;
    var _with;
    scheduler = scheduler !== null && scheduler !== void 0 ? scheduler : async_1$1.async;
    if (isDate_1.isValidDate(due)) {
        first = due;
    }
    else if (typeof due === 'number') {
        each = due;
    }
    if (withObservable) {
        _with = function () { return withObservable; };
    }
    else {
        throw new TypeError('No observable provided to switch to');
    }
    if (first == null && each == null) {
        throw new TypeError('No timeout provided.');
    }
    return timeout_1.timeout({
        first: first,
        each: each,
        scheduler: scheduler,
        with: _with,
    });
}
timeoutWith$1.timeoutWith = timeoutWith;

var timestamp$1 = {};

Object.defineProperty(timestamp$1, "__esModule", { value: true });
timestamp$1.timestamp = void 0;
var dateTimestampProvider_1 = dateTimestampProvider$1;
var map_1 = map$1;
function timestamp(timestampProvider) {
    if (timestampProvider === void 0) { timestampProvider = dateTimestampProvider_1.dateTimestampProvider; }
    return map_1.map(function (value) { return ({ value: value, timestamp: timestampProvider.now() }); });
}
timestamp$1.timestamp = timestamp;

var window$2 = {};

Object.defineProperty(window$2, "__esModule", { value: true });
window$2.window = void 0;
var Subject_1$4 = Subject$2;
var lift_1$6 = lift;
var OperatorSubscriber_1$5 = OperatorSubscriber$2;
var noop_1$2 = noop$3;
var innerFrom_1$3 = innerFrom$1;
function window$1(windowBoundaries) {
    return lift_1$6.operate(function (source, subscriber) {
        var windowSubject = new Subject_1$4.Subject();
        subscriber.next(windowSubject.asObservable());
        var errorHandler = function (err) {
            windowSubject.error(err);
            subscriber.error(err);
        };
        source.subscribe(OperatorSubscriber_1$5.createOperatorSubscriber(subscriber, function (value) { return windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.next(value); }, function () {
            windowSubject.complete();
            subscriber.complete();
        }, errorHandler));
        innerFrom_1$3.innerFrom(windowBoundaries).subscribe(OperatorSubscriber_1$5.createOperatorSubscriber(subscriber, function () {
            windowSubject.complete();
            subscriber.next((windowSubject = new Subject_1$4.Subject()));
        }, noop_1$2.noop, errorHandler));
        return function () {
            windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.unsubscribe();
            windowSubject = null;
        };
    });
}
window$2.window = window$1;

var windowCount$1 = {};

var __values$3 = (commonjsGlobal && commonjsGlobal.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(windowCount$1, "__esModule", { value: true });
windowCount$1.windowCount = void 0;
var Subject_1$3 = Subject$2;
var lift_1$5 = lift;
var OperatorSubscriber_1$4 = OperatorSubscriber$2;
function windowCount(windowSize, startWindowEvery) {
    if (startWindowEvery === void 0) { startWindowEvery = 0; }
    var startEvery = startWindowEvery > 0 ? startWindowEvery : windowSize;
    return lift_1$5.operate(function (source, subscriber) {
        var windows = [new Subject_1$3.Subject()];
        var count = 0;
        subscriber.next(windows[0].asObservable());
        source.subscribe(OperatorSubscriber_1$4.createOperatorSubscriber(subscriber, function (value) {
            var e_1, _a;
            try {
                for (var windows_1 = __values$3(windows), windows_1_1 = windows_1.next(); !windows_1_1.done; windows_1_1 = windows_1.next()) {
                    var window_1 = windows_1_1.value;
                    window_1.next(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (windows_1_1 && !windows_1_1.done && (_a = windows_1.return)) _a.call(windows_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var c = count - windowSize + 1;
            if (c >= 0 && c % startEvery === 0) {
                windows.shift().complete();
            }
            if (++count % startEvery === 0) {
                var window_2 = new Subject_1$3.Subject();
                windows.push(window_2);
                subscriber.next(window_2.asObservable());
            }
        }, function () {
            while (windows.length > 0) {
                windows.shift().complete();
            }
            subscriber.complete();
        }, function (err) {
            while (windows.length > 0) {
                windows.shift().error(err);
            }
            subscriber.error(err);
        }, function () {
            windows = null;
        }));
    });
}
windowCount$1.windowCount = windowCount;

var windowTime$1 = {};

Object.defineProperty(windowTime$1, "__esModule", { value: true });
windowTime$1.windowTime = void 0;
var Subject_1$2 = Subject$2;
var async_1 = async;
var Subscription_1$1 = Subscription$2;
var lift_1$4 = lift;
var OperatorSubscriber_1$3 = OperatorSubscriber$2;
var arrRemove_1$1 = arrRemove$2;
var args_1$1 = args;
var executeSchedule_1 = executeSchedule$1;
function windowTime(windowTimeSpan) {
    var _a, _b;
    var otherArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherArgs[_i - 1] = arguments[_i];
    }
    var scheduler = (_a = args_1$1.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
    var windowCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
    var maxWindowSize = otherArgs[1] || Infinity;
    return lift_1$4.operate(function (source, subscriber) {
        var windowRecords = [];
        var restartOnClose = false;
        var closeWindow = function (record) {
            var window = record.window, subs = record.subs;
            window.complete();
            subs.unsubscribe();
            arrRemove_1$1.arrRemove(windowRecords, record);
            restartOnClose && startWindow();
        };
        var startWindow = function () {
            if (windowRecords) {
                var subs = new Subscription_1$1.Subscription();
                subscriber.add(subs);
                var window_1 = new Subject_1$2.Subject();
                var record_1 = {
                    window: window_1,
                    subs: subs,
                    seen: 0,
                };
                windowRecords.push(record_1);
                subscriber.next(window_1.asObservable());
                executeSchedule_1.executeSchedule(subs, scheduler, function () { return closeWindow(record_1); }, windowTimeSpan);
            }
        };
        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
            executeSchedule_1.executeSchedule(subscriber, scheduler, startWindow, windowCreationInterval, true);
        }
        else {
            restartOnClose = true;
        }
        startWindow();
        var loop = function (cb) { return windowRecords.slice().forEach(cb); };
        var terminate = function (cb) {
            loop(function (_a) {
                var window = _a.window;
                return cb(window);
            });
            cb(subscriber);
            subscriber.unsubscribe();
        };
        source.subscribe(OperatorSubscriber_1$3.createOperatorSubscriber(subscriber, function (value) {
            loop(function (record) {
                record.window.next(value);
                maxWindowSize <= ++record.seen && closeWindow(record);
            });
        }, function () { return terminate(function (consumer) { return consumer.complete(); }); }, function (err) { return terminate(function (consumer) { return consumer.error(err); }); }));
        return function () {
            windowRecords = null;
        };
    });
}
windowTime$1.windowTime = windowTime;

var windowToggle$1 = {};

var __values$2 = (commonjsGlobal && commonjsGlobal.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(windowToggle$1, "__esModule", { value: true });
windowToggle$1.windowToggle = void 0;
var Subject_1$1 = Subject$2;
var Subscription_1 = Subscription$2;
var lift_1$3 = lift;
var innerFrom_1$2 = innerFrom$1;
var OperatorSubscriber_1$2 = OperatorSubscriber$2;
var noop_1$1 = noop$3;
var arrRemove_1 = arrRemove$2;
function windowToggle(openings, closingSelector) {
    return lift_1$3.operate(function (source, subscriber) {
        var windows = [];
        var handleError = function (err) {
            while (0 < windows.length) {
                windows.shift().error(err);
            }
            subscriber.error(err);
        };
        innerFrom_1$2.innerFrom(openings).subscribe(OperatorSubscriber_1$2.createOperatorSubscriber(subscriber, function (openValue) {
            var window = new Subject_1$1.Subject();
            windows.push(window);
            var closingSubscription = new Subscription_1.Subscription();
            var closeWindow = function () {
                arrRemove_1.arrRemove(windows, window);
                window.complete();
                closingSubscription.unsubscribe();
            };
            var closingNotifier;
            try {
                closingNotifier = innerFrom_1$2.innerFrom(closingSelector(openValue));
            }
            catch (err) {
                handleError(err);
                return;
            }
            subscriber.next(window.asObservable());
            closingSubscription.add(closingNotifier.subscribe(OperatorSubscriber_1$2.createOperatorSubscriber(subscriber, closeWindow, noop_1$1.noop, handleError)));
        }, noop_1$1.noop));
        source.subscribe(OperatorSubscriber_1$2.createOperatorSubscriber(subscriber, function (value) {
            var e_1, _a;
            var windowsCopy = windows.slice();
            try {
                for (var windowsCopy_1 = __values$2(windowsCopy), windowsCopy_1_1 = windowsCopy_1.next(); !windowsCopy_1_1.done; windowsCopy_1_1 = windowsCopy_1.next()) {
                    var window_1 = windowsCopy_1_1.value;
                    window_1.next(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (windowsCopy_1_1 && !windowsCopy_1_1.done && (_a = windowsCopy_1.return)) _a.call(windowsCopy_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }, function () {
            while (0 < windows.length) {
                windows.shift().complete();
            }
            subscriber.complete();
        }, handleError, function () {
            while (0 < windows.length) {
                windows.shift().unsubscribe();
            }
        }));
    });
}
windowToggle$1.windowToggle = windowToggle;

var windowWhen$1 = {};

Object.defineProperty(windowWhen$1, "__esModule", { value: true });
windowWhen$1.windowWhen = void 0;
var Subject_1 = Subject$2;
var lift_1$2 = lift;
var OperatorSubscriber_1$1 = OperatorSubscriber$2;
var innerFrom_1$1 = innerFrom$1;
function windowWhen(closingSelector) {
    return lift_1$2.operate(function (source, subscriber) {
        var window;
        var closingSubscriber;
        var handleError = function (err) {
            window.error(err);
            subscriber.error(err);
        };
        var openWindow = function () {
            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
            window === null || window === void 0 ? void 0 : window.complete();
            window = new Subject_1.Subject();
            subscriber.next(window.asObservable());
            var closingNotifier;
            try {
                closingNotifier = innerFrom_1$1.innerFrom(closingSelector());
            }
            catch (err) {
                handleError(err);
                return;
            }
            closingNotifier.subscribe((closingSubscriber = OperatorSubscriber_1$1.createOperatorSubscriber(subscriber, openWindow, openWindow, handleError)));
        };
        openWindow();
        source.subscribe(OperatorSubscriber_1$1.createOperatorSubscriber(subscriber, function (value) { return window.next(value); }, function () {
            window.complete();
            subscriber.complete();
        }, handleError, function () {
            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
            window = null;
        }));
    });
}
windowWhen$1.windowWhen = windowWhen;

var withLatestFrom$1 = {};

var __read$6 = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
var __spreadArray$5 = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(withLatestFrom$1, "__esModule", { value: true });
withLatestFrom$1.withLatestFrom = void 0;
var lift_1$1 = lift;
var OperatorSubscriber_1 = OperatorSubscriber$2;
var innerFrom_1 = innerFrom$1;
var identity_1 = identity$2;
var noop_1 = noop$3;
var args_1 = args;
function withLatestFrom() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    var project = args_1.popResultSelector(inputs);
    return lift_1$1.operate(function (source, subscriber) {
        var len = inputs.length;
        var otherValues = new Array(len);
        var hasValue = inputs.map(function () { return false; });
        var ready = false;
        var _loop_1 = function (i) {
            innerFrom_1.innerFrom(inputs[i]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
                otherValues[i] = value;
                if (!ready && !hasValue[i]) {
                    hasValue[i] = true;
                    (ready = hasValue.every(identity_1.identity)) && (hasValue = null);
                }
            }, noop_1.noop));
        };
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
            if (ready) {
                var values = __spreadArray$5([value], __read$6(otherValues));
                subscriber.next(project ? project.apply(void 0, __spreadArray$5([], __read$6(values))) : values);
            }
        }));
    });
}
withLatestFrom$1.withLatestFrom = withLatestFrom;

var zipAll$1 = {};

Object.defineProperty(zipAll$1, "__esModule", { value: true });
zipAll$1.zipAll = void 0;
var zip_1$2 = zip$3;
var joinAllInternals_1 = joinAllInternals$1;
function zipAll(project) {
    return joinAllInternals_1.joinAllInternals(zip_1$2.zip, project);
}
zipAll$1.zipAll = zipAll;

var zipWith$1 = {};

var zip$1 = {};

var __read$5 = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
var __spreadArray$4 = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(zip$1, "__esModule", { value: true });
zip$1.zip = void 0;
var zip_1$1 = zip$3;
var lift_1 = lift;
function zip() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return lift_1.operate(function (source, subscriber) {
        zip_1$1.zip.apply(void 0, __spreadArray$4([source], __read$5(sources))).subscribe(subscriber);
    });
}
zip$1.zip = zip;

var __read$4 = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
var __spreadArray$3 = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(zipWith$1, "__esModule", { value: true });
zipWith$1.zipWith = void 0;
var zip_1 = zip$1;
function zipWith() {
    var otherInputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherInputs[_i] = arguments[_i];
    }
    return zip_1.zip.apply(void 0, __spreadArray$3([], __read$4(otherInputs)));
}
zipWith$1.zipWith = zipWith;

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.interval = exports.iif = exports.generate = exports.fromEventPattern = exports.fromEvent = exports.from = exports.forkJoin = exports.empty = exports.defer = exports.connectable = exports.concat = exports.combineLatest = exports.bindNodeCallback = exports.bindCallback = exports.UnsubscriptionError = exports.TimeoutError = exports.SequenceError = exports.ObjectUnsubscribedError = exports.NotFoundError = exports.EmptyError = exports.ArgumentOutOfRangeError = exports.firstValueFrom = exports.lastValueFrom = exports.isObservable = exports.identity = exports.noop = exports.pipe = exports.NotificationKind = exports.Notification = exports.Subscriber = exports.Subscription = exports.Scheduler = exports.VirtualAction = exports.VirtualTimeScheduler = exports.animationFrameScheduler = exports.animationFrame = exports.queueScheduler = exports.queue = exports.asyncScheduler = exports.async = exports.asapScheduler = exports.asap = exports.AsyncSubject = exports.ReplaySubject = exports.BehaviorSubject = exports.Subject = exports.animationFrames = exports.observable = exports.ConnectableObservable = exports.Observable = void 0;
	exports.filter = exports.expand = exports.exhaustMap = exports.exhaustAll = exports.exhaust = exports.every = exports.endWith = exports.elementAt = exports.distinctUntilKeyChanged = exports.distinctUntilChanged = exports.distinct = exports.dematerialize = exports.delayWhen = exports.delay = exports.defaultIfEmpty = exports.debounceTime = exports.debounce = exports.count = exports.connect = exports.concatWith = exports.concatMapTo = exports.concatMap = exports.concatAll = exports.combineLatestWith = exports.combineLatestAll = exports.combineAll = exports.catchError = exports.bufferWhen = exports.bufferToggle = exports.bufferTime = exports.bufferCount = exports.buffer = exports.auditTime = exports.audit = exports.config = exports.NEVER = exports.EMPTY = exports.scheduled = exports.zip = exports.using = exports.timer = exports.throwError = exports.range = exports.race = exports.partition = exports.pairs = exports.onErrorResumeNext = exports.of = exports.never = exports.merge = void 0;
	exports.switchMap = exports.switchAll = exports.subscribeOn = exports.startWith = exports.skipWhile = exports.skipUntil = exports.skipLast = exports.skip = exports.single = exports.shareReplay = exports.share = exports.sequenceEqual = exports.scan = exports.sampleTime = exports.sample = exports.refCount = exports.retryWhen = exports.retry = exports.repeatWhen = exports.repeat = exports.reduce = exports.raceWith = exports.publishReplay = exports.publishLast = exports.publishBehavior = exports.publish = exports.pluck = exports.pairwise = exports.onErrorResumeNextWith = exports.observeOn = exports.multicast = exports.min = exports.mergeWith = exports.mergeScan = exports.mergeMapTo = exports.mergeMap = exports.flatMap = exports.mergeAll = exports.max = exports.materialize = exports.mapTo = exports.map = exports.last = exports.isEmpty = exports.ignoreElements = exports.groupBy = exports.first = exports.findIndex = exports.find = exports.finalize = void 0;
	exports.zipWith = exports.zipAll = exports.withLatestFrom = exports.windowWhen = exports.windowToggle = exports.windowTime = exports.windowCount = exports.window = exports.toArray = exports.timestamp = exports.timeoutWith = exports.timeout = exports.timeInterval = exports.throwIfEmpty = exports.throttleTime = exports.throttle = exports.tap = exports.takeWhile = exports.takeUntil = exports.takeLast = exports.take = exports.switchScan = exports.switchMapTo = void 0;
	var Observable_1 = Observable$2;
	Object.defineProperty(exports, "Observable", { enumerable: true, get: function () { return Observable_1.Observable; } });
	var ConnectableObservable_1 = ConnectableObservable$1;
	Object.defineProperty(exports, "ConnectableObservable", { enumerable: true, get: function () { return ConnectableObservable_1.ConnectableObservable; } });
	var observable_1 = observable$2;
	Object.defineProperty(exports, "observable", { enumerable: true, get: function () { return observable_1.observable; } });
	var animationFrames_1 = animationFrames$1;
	Object.defineProperty(exports, "animationFrames", { enumerable: true, get: function () { return animationFrames_1.animationFrames; } });
	var Subject_1 = Subject$2;
	Object.defineProperty(exports, "Subject", { enumerable: true, get: function () { return Subject_1.Subject; } });
	var BehaviorSubject_1 = BehaviorSubject$1;
	Object.defineProperty(exports, "BehaviorSubject", { enumerable: true, get: function () { return BehaviorSubject_1.BehaviorSubject; } });
	var ReplaySubject_1 = ReplaySubject$1;
	Object.defineProperty(exports, "ReplaySubject", { enumerable: true, get: function () { return ReplaySubject_1.ReplaySubject; } });
	var AsyncSubject_1 = AsyncSubject$1;
	Object.defineProperty(exports, "AsyncSubject", { enumerable: true, get: function () { return AsyncSubject_1.AsyncSubject; } });
	var asap_1 = asap;
	Object.defineProperty(exports, "asap", { enumerable: true, get: function () { return asap_1.asap; } });
	Object.defineProperty(exports, "asapScheduler", { enumerable: true, get: function () { return asap_1.asapScheduler; } });
	var async_1 = async;
	Object.defineProperty(exports, "async", { enumerable: true, get: function () { return async_1.async; } });
	Object.defineProperty(exports, "asyncScheduler", { enumerable: true, get: function () { return async_1.asyncScheduler; } });
	var queue_1 = queue;
	Object.defineProperty(exports, "queue", { enumerable: true, get: function () { return queue_1.queue; } });
	Object.defineProperty(exports, "queueScheduler", { enumerable: true, get: function () { return queue_1.queueScheduler; } });
	var animationFrame_1 = animationFrame;
	Object.defineProperty(exports, "animationFrame", { enumerable: true, get: function () { return animationFrame_1.animationFrame; } });
	Object.defineProperty(exports, "animationFrameScheduler", { enumerable: true, get: function () { return animationFrame_1.animationFrameScheduler; } });
	var VirtualTimeScheduler_1 = VirtualTimeScheduler$1;
	Object.defineProperty(exports, "VirtualTimeScheduler", { enumerable: true, get: function () { return VirtualTimeScheduler_1.VirtualTimeScheduler; } });
	Object.defineProperty(exports, "VirtualAction", { enumerable: true, get: function () { return VirtualTimeScheduler_1.VirtualAction; } });
	var Scheduler_1 = Scheduler$2;
	Object.defineProperty(exports, "Scheduler", { enumerable: true, get: function () { return Scheduler_1.Scheduler; } });
	var Subscription_1 = Subscription$2;
	Object.defineProperty(exports, "Subscription", { enumerable: true, get: function () { return Subscription_1.Subscription; } });
	var Subscriber_1 = Subscriber$1;
	Object.defineProperty(exports, "Subscriber", { enumerable: true, get: function () { return Subscriber_1.Subscriber; } });
	var Notification_1 = Notification;
	Object.defineProperty(exports, "Notification", { enumerable: true, get: function () { return Notification_1.Notification; } });
	Object.defineProperty(exports, "NotificationKind", { enumerable: true, get: function () { return Notification_1.NotificationKind; } });
	var pipe_1 = pipe$1;
	Object.defineProperty(exports, "pipe", { enumerable: true, get: function () { return pipe_1.pipe; } });
	var noop_1 = noop$3;
	Object.defineProperty(exports, "noop", { enumerable: true, get: function () { return noop_1.noop; } });
	var identity_1 = identity$2;
	Object.defineProperty(exports, "identity", { enumerable: true, get: function () { return identity_1.identity; } });
	var isObservable_1 = isObservable$1;
	Object.defineProperty(exports, "isObservable", { enumerable: true, get: function () { return isObservable_1.isObservable; } });
	var lastValueFrom_1 = lastValueFrom$1;
	Object.defineProperty(exports, "lastValueFrom", { enumerable: true, get: function () { return lastValueFrom_1.lastValueFrom; } });
	var firstValueFrom_1 = firstValueFrom$1;
	Object.defineProperty(exports, "firstValueFrom", { enumerable: true, get: function () { return firstValueFrom_1.firstValueFrom; } });
	var ArgumentOutOfRangeError_1 = ArgumentOutOfRangeError;
	Object.defineProperty(exports, "ArgumentOutOfRangeError", { enumerable: true, get: function () { return ArgumentOutOfRangeError_1.ArgumentOutOfRangeError; } });
	var EmptyError_1 = EmptyError;
	Object.defineProperty(exports, "EmptyError", { enumerable: true, get: function () { return EmptyError_1.EmptyError; } });
	var NotFoundError_1 = NotFoundError;
	Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return NotFoundError_1.NotFoundError; } });
	var ObjectUnsubscribedError_1 = ObjectUnsubscribedError$1;
	Object.defineProperty(exports, "ObjectUnsubscribedError", { enumerable: true, get: function () { return ObjectUnsubscribedError_1.ObjectUnsubscribedError; } });
	var SequenceError_1 = SequenceError;
	Object.defineProperty(exports, "SequenceError", { enumerable: true, get: function () { return SequenceError_1.SequenceError; } });
	var timeout_1 = timeout;
	Object.defineProperty(exports, "TimeoutError", { enumerable: true, get: function () { return timeout_1.TimeoutError; } });
	var UnsubscriptionError_1 = UnsubscriptionError$1;
	Object.defineProperty(exports, "UnsubscriptionError", { enumerable: true, get: function () { return UnsubscriptionError_1.UnsubscriptionError; } });
	var bindCallback_1 = bindCallback$1;
	Object.defineProperty(exports, "bindCallback", { enumerable: true, get: function () { return bindCallback_1.bindCallback; } });
	var bindNodeCallback_1 = bindNodeCallback$1;
	Object.defineProperty(exports, "bindNodeCallback", { enumerable: true, get: function () { return bindNodeCallback_1.bindNodeCallback; } });
	var combineLatest_1 = combineLatest$3;
	Object.defineProperty(exports, "combineLatest", { enumerable: true, get: function () { return combineLatest_1.combineLatest; } });
	var concat_1 = concat$3;
	Object.defineProperty(exports, "concat", { enumerable: true, get: function () { return concat_1.concat; } });
	var connectable_1 = connectable$1;
	Object.defineProperty(exports, "connectable", { enumerable: true, get: function () { return connectable_1.connectable; } });
	var defer_1 = defer$1;
	Object.defineProperty(exports, "defer", { enumerable: true, get: function () { return defer_1.defer; } });
	var empty_1 = empty;
	Object.defineProperty(exports, "empty", { enumerable: true, get: function () { return empty_1.empty; } });
	var forkJoin_1 = forkJoin$1;
	Object.defineProperty(exports, "forkJoin", { enumerable: true, get: function () { return forkJoin_1.forkJoin; } });
	var from_1 = from$1;
	Object.defineProperty(exports, "from", { enumerable: true, get: function () { return from_1.from; } });
	var fromEvent_1 = fromEvent$1;
	Object.defineProperty(exports, "fromEvent", { enumerable: true, get: function () { return fromEvent_1.fromEvent; } });
	var fromEventPattern_1 = fromEventPattern$1;
	Object.defineProperty(exports, "fromEventPattern", { enumerable: true, get: function () { return fromEventPattern_1.fromEventPattern; } });
	var generate_1 = generate$1;
	Object.defineProperty(exports, "generate", { enumerable: true, get: function () { return generate_1.generate; } });
	var iif_1 = iif$1;
	Object.defineProperty(exports, "iif", { enumerable: true, get: function () { return iif_1.iif; } });
	var interval_1 = interval$1;
	Object.defineProperty(exports, "interval", { enumerable: true, get: function () { return interval_1.interval; } });
	var merge_1 = merge$3;
	Object.defineProperty(exports, "merge", { enumerable: true, get: function () { return merge_1.merge; } });
	var never_1 = never;
	Object.defineProperty(exports, "never", { enumerable: true, get: function () { return never_1.never; } });
	var of_1 = of$1;
	Object.defineProperty(exports, "of", { enumerable: true, get: function () { return of_1.of; } });
	var onErrorResumeNext_1 = onErrorResumeNext$1;
	Object.defineProperty(exports, "onErrorResumeNext", { enumerable: true, get: function () { return onErrorResumeNext_1.onErrorResumeNext; } });
	var pairs_1 = pairs$1;
	Object.defineProperty(exports, "pairs", { enumerable: true, get: function () { return pairs_1.pairs; } });
	var partition_1 = partition$3;
	Object.defineProperty(exports, "partition", { enumerable: true, get: function () { return partition_1.partition; } });
	var race_1 = race$3;
	Object.defineProperty(exports, "race", { enumerable: true, get: function () { return race_1.race; } });
	var range_1 = range$1;
	Object.defineProperty(exports, "range", { enumerable: true, get: function () { return range_1.range; } });
	var throwError_1 = throwError$1;
	Object.defineProperty(exports, "throwError", { enumerable: true, get: function () { return throwError_1.throwError; } });
	var timer_1 = timer$1;
	Object.defineProperty(exports, "timer", { enumerable: true, get: function () { return timer_1.timer; } });
	var using_1 = using$1;
	Object.defineProperty(exports, "using", { enumerable: true, get: function () { return using_1.using; } });
	var zip_1 = zip$3;
	Object.defineProperty(exports, "zip", { enumerable: true, get: function () { return zip_1.zip; } });
	var scheduled_1 = scheduled$1;
	Object.defineProperty(exports, "scheduled", { enumerable: true, get: function () { return scheduled_1.scheduled; } });
	var empty_2 = empty;
	Object.defineProperty(exports, "EMPTY", { enumerable: true, get: function () { return empty_2.EMPTY; } });
	var never_2 = never;
	Object.defineProperty(exports, "NEVER", { enumerable: true, get: function () { return never_2.NEVER; } });
	__exportStar(types, exports);
	var config_1 = config$1;
	Object.defineProperty(exports, "config", { enumerable: true, get: function () { return config_1.config; } });
	var audit_1 = audit$1;
	Object.defineProperty(exports, "audit", { enumerable: true, get: function () { return audit_1.audit; } });
	var auditTime_1 = auditTime$1;
	Object.defineProperty(exports, "auditTime", { enumerable: true, get: function () { return auditTime_1.auditTime; } });
	var buffer_1 = buffer$1;
	Object.defineProperty(exports, "buffer", { enumerable: true, get: function () { return buffer_1.buffer; } });
	var bufferCount_1 = bufferCount$1;
	Object.defineProperty(exports, "bufferCount", { enumerable: true, get: function () { return bufferCount_1.bufferCount; } });
	var bufferTime_1 = bufferTime$1;
	Object.defineProperty(exports, "bufferTime", { enumerable: true, get: function () { return bufferTime_1.bufferTime; } });
	var bufferToggle_1 = bufferToggle$1;
	Object.defineProperty(exports, "bufferToggle", { enumerable: true, get: function () { return bufferToggle_1.bufferToggle; } });
	var bufferWhen_1 = bufferWhen$1;
	Object.defineProperty(exports, "bufferWhen", { enumerable: true, get: function () { return bufferWhen_1.bufferWhen; } });
	var catchError_1 = catchError$1;
	Object.defineProperty(exports, "catchError", { enumerable: true, get: function () { return catchError_1.catchError; } });
	var combineAll_1 = combineAll;
	Object.defineProperty(exports, "combineAll", { enumerable: true, get: function () { return combineAll_1.combineAll; } });
	var combineLatestAll_1 = combineLatestAll$1;
	Object.defineProperty(exports, "combineLatestAll", { enumerable: true, get: function () { return combineLatestAll_1.combineLatestAll; } });
	var combineLatestWith_1 = combineLatestWith$1;
	Object.defineProperty(exports, "combineLatestWith", { enumerable: true, get: function () { return combineLatestWith_1.combineLatestWith; } });
	var concatAll_1 = concatAll$1;
	Object.defineProperty(exports, "concatAll", { enumerable: true, get: function () { return concatAll_1.concatAll; } });
	var concatMap_1 = concatMap$1;
	Object.defineProperty(exports, "concatMap", { enumerable: true, get: function () { return concatMap_1.concatMap; } });
	var concatMapTo_1 = concatMapTo$1;
	Object.defineProperty(exports, "concatMapTo", { enumerable: true, get: function () { return concatMapTo_1.concatMapTo; } });
	var concatWith_1 = concatWith$1;
	Object.defineProperty(exports, "concatWith", { enumerable: true, get: function () { return concatWith_1.concatWith; } });
	var connect_1 = connect$1;
	Object.defineProperty(exports, "connect", { enumerable: true, get: function () { return connect_1.connect; } });
	var count_1 = count$1;
	Object.defineProperty(exports, "count", { enumerable: true, get: function () { return count_1.count; } });
	var debounce_1 = debounce$1;
	Object.defineProperty(exports, "debounce", { enumerable: true, get: function () { return debounce_1.debounce; } });
	var debounceTime_1 = debounceTime$1;
	Object.defineProperty(exports, "debounceTime", { enumerable: true, get: function () { return debounceTime_1.debounceTime; } });
	var defaultIfEmpty_1 = defaultIfEmpty$1;
	Object.defineProperty(exports, "defaultIfEmpty", { enumerable: true, get: function () { return defaultIfEmpty_1.defaultIfEmpty; } });
	var delay_1 = delay$1;
	Object.defineProperty(exports, "delay", { enumerable: true, get: function () { return delay_1.delay; } });
	var delayWhen_1 = delayWhen$1;
	Object.defineProperty(exports, "delayWhen", { enumerable: true, get: function () { return delayWhen_1.delayWhen; } });
	var dematerialize_1 = dematerialize$1;
	Object.defineProperty(exports, "dematerialize", { enumerable: true, get: function () { return dematerialize_1.dematerialize; } });
	var distinct_1 = distinct$1;
	Object.defineProperty(exports, "distinct", { enumerable: true, get: function () { return distinct_1.distinct; } });
	var distinctUntilChanged_1 = distinctUntilChanged$1;
	Object.defineProperty(exports, "distinctUntilChanged", { enumerable: true, get: function () { return distinctUntilChanged_1.distinctUntilChanged; } });
	var distinctUntilKeyChanged_1 = distinctUntilKeyChanged$1;
	Object.defineProperty(exports, "distinctUntilKeyChanged", { enumerable: true, get: function () { return distinctUntilKeyChanged_1.distinctUntilKeyChanged; } });
	var elementAt_1 = elementAt$1;
	Object.defineProperty(exports, "elementAt", { enumerable: true, get: function () { return elementAt_1.elementAt; } });
	var endWith_1 = endWith$1;
	Object.defineProperty(exports, "endWith", { enumerable: true, get: function () { return endWith_1.endWith; } });
	var every_1 = every$1;
	Object.defineProperty(exports, "every", { enumerable: true, get: function () { return every_1.every; } });
	var exhaust_1 = exhaust;
	Object.defineProperty(exports, "exhaust", { enumerable: true, get: function () { return exhaust_1.exhaust; } });
	var exhaustAll_1 = exhaustAll$1;
	Object.defineProperty(exports, "exhaustAll", { enumerable: true, get: function () { return exhaustAll_1.exhaustAll; } });
	var exhaustMap_1 = exhaustMap$1;
	Object.defineProperty(exports, "exhaustMap", { enumerable: true, get: function () { return exhaustMap_1.exhaustMap; } });
	var expand_1 = expand$1;
	Object.defineProperty(exports, "expand", { enumerable: true, get: function () { return expand_1.expand; } });
	var filter_1 = filter$2;
	Object.defineProperty(exports, "filter", { enumerable: true, get: function () { return filter_1.filter; } });
	var finalize_1 = finalize$1;
	Object.defineProperty(exports, "finalize", { enumerable: true, get: function () { return finalize_1.finalize; } });
	var find_1 = find$1;
	Object.defineProperty(exports, "find", { enumerable: true, get: function () { return find_1.find; } });
	var findIndex_1 = findIndex$1;
	Object.defineProperty(exports, "findIndex", { enumerable: true, get: function () { return findIndex_1.findIndex; } });
	var first_1 = first$1;
	Object.defineProperty(exports, "first", { enumerable: true, get: function () { return first_1.first; } });
	var groupBy_1 = groupBy$1;
	Object.defineProperty(exports, "groupBy", { enumerable: true, get: function () { return groupBy_1.groupBy; } });
	var ignoreElements_1 = ignoreElements$1;
	Object.defineProperty(exports, "ignoreElements", { enumerable: true, get: function () { return ignoreElements_1.ignoreElements; } });
	var isEmpty_1 = isEmpty$1;
	Object.defineProperty(exports, "isEmpty", { enumerable: true, get: function () { return isEmpty_1.isEmpty; } });
	var last_1 = last$1;
	Object.defineProperty(exports, "last", { enumerable: true, get: function () { return last_1.last; } });
	var map_1 = map$1;
	Object.defineProperty(exports, "map", { enumerable: true, get: function () { return map_1.map; } });
	var mapTo_1 = mapTo$1;
	Object.defineProperty(exports, "mapTo", { enumerable: true, get: function () { return mapTo_1.mapTo; } });
	var materialize_1 = materialize$1;
	Object.defineProperty(exports, "materialize", { enumerable: true, get: function () { return materialize_1.materialize; } });
	var max_1 = max$1;
	Object.defineProperty(exports, "max", { enumerable: true, get: function () { return max_1.max; } });
	var mergeAll_1 = mergeAll$1;
	Object.defineProperty(exports, "mergeAll", { enumerable: true, get: function () { return mergeAll_1.mergeAll; } });
	var flatMap_1 = flatMap;
	Object.defineProperty(exports, "flatMap", { enumerable: true, get: function () { return flatMap_1.flatMap; } });
	var mergeMap_1 = mergeMap$1;
	Object.defineProperty(exports, "mergeMap", { enumerable: true, get: function () { return mergeMap_1.mergeMap; } });
	var mergeMapTo_1 = mergeMapTo$1;
	Object.defineProperty(exports, "mergeMapTo", { enumerable: true, get: function () { return mergeMapTo_1.mergeMapTo; } });
	var mergeScan_1 = mergeScan$1;
	Object.defineProperty(exports, "mergeScan", { enumerable: true, get: function () { return mergeScan_1.mergeScan; } });
	var mergeWith_1 = mergeWith$1;
	Object.defineProperty(exports, "mergeWith", { enumerable: true, get: function () { return mergeWith_1.mergeWith; } });
	var min_1 = min$1;
	Object.defineProperty(exports, "min", { enumerable: true, get: function () { return min_1.min; } });
	var multicast_1 = multicast$1;
	Object.defineProperty(exports, "multicast", { enumerable: true, get: function () { return multicast_1.multicast; } });
	var observeOn_1 = observeOn$1;
	Object.defineProperty(exports, "observeOn", { enumerable: true, get: function () { return observeOn_1.observeOn; } });
	var onErrorResumeNextWith_1 = onErrorResumeNextWith$1;
	Object.defineProperty(exports, "onErrorResumeNextWith", { enumerable: true, get: function () { return onErrorResumeNextWith_1.onErrorResumeNextWith; } });
	var pairwise_1 = pairwise$1;
	Object.defineProperty(exports, "pairwise", { enumerable: true, get: function () { return pairwise_1.pairwise; } });
	var pluck_1 = pluck$1;
	Object.defineProperty(exports, "pluck", { enumerable: true, get: function () { return pluck_1.pluck; } });
	var publish_1 = publish$1;
	Object.defineProperty(exports, "publish", { enumerable: true, get: function () { return publish_1.publish; } });
	var publishBehavior_1 = publishBehavior$1;
	Object.defineProperty(exports, "publishBehavior", { enumerable: true, get: function () { return publishBehavior_1.publishBehavior; } });
	var publishLast_1 = publishLast$1;
	Object.defineProperty(exports, "publishLast", { enumerable: true, get: function () { return publishLast_1.publishLast; } });
	var publishReplay_1 = publishReplay$1;
	Object.defineProperty(exports, "publishReplay", { enumerable: true, get: function () { return publishReplay_1.publishReplay; } });
	var raceWith_1 = raceWith$1;
	Object.defineProperty(exports, "raceWith", { enumerable: true, get: function () { return raceWith_1.raceWith; } });
	var reduce_1 = reduce$1;
	Object.defineProperty(exports, "reduce", { enumerable: true, get: function () { return reduce_1.reduce; } });
	var repeat_1 = repeat$1;
	Object.defineProperty(exports, "repeat", { enumerable: true, get: function () { return repeat_1.repeat; } });
	var repeatWhen_1 = repeatWhen$1;
	Object.defineProperty(exports, "repeatWhen", { enumerable: true, get: function () { return repeatWhen_1.repeatWhen; } });
	var retry_1 = retry$1;
	Object.defineProperty(exports, "retry", { enumerable: true, get: function () { return retry_1.retry; } });
	var retryWhen_1 = retryWhen$1;
	Object.defineProperty(exports, "retryWhen", { enumerable: true, get: function () { return retryWhen_1.retryWhen; } });
	var refCount_1 = refCount$2;
	Object.defineProperty(exports, "refCount", { enumerable: true, get: function () { return refCount_1.refCount; } });
	var sample_1 = sample$1;
	Object.defineProperty(exports, "sample", { enumerable: true, get: function () { return sample_1.sample; } });
	var sampleTime_1 = sampleTime$1;
	Object.defineProperty(exports, "sampleTime", { enumerable: true, get: function () { return sampleTime_1.sampleTime; } });
	var scan_1 = scan$1;
	Object.defineProperty(exports, "scan", { enumerable: true, get: function () { return scan_1.scan; } });
	var sequenceEqual_1 = sequenceEqual$1;
	Object.defineProperty(exports, "sequenceEqual", { enumerable: true, get: function () { return sequenceEqual_1.sequenceEqual; } });
	var share_1 = share$1;
	Object.defineProperty(exports, "share", { enumerable: true, get: function () { return share_1.share; } });
	var shareReplay_1 = shareReplay$1;
	Object.defineProperty(exports, "shareReplay", { enumerable: true, get: function () { return shareReplay_1.shareReplay; } });
	var single_1 = single$1;
	Object.defineProperty(exports, "single", { enumerable: true, get: function () { return single_1.single; } });
	var skip_1 = skip$1;
	Object.defineProperty(exports, "skip", { enumerable: true, get: function () { return skip_1.skip; } });
	var skipLast_1 = skipLast$1;
	Object.defineProperty(exports, "skipLast", { enumerable: true, get: function () { return skipLast_1.skipLast; } });
	var skipUntil_1 = skipUntil$1;
	Object.defineProperty(exports, "skipUntil", { enumerable: true, get: function () { return skipUntil_1.skipUntil; } });
	var skipWhile_1 = skipWhile$1;
	Object.defineProperty(exports, "skipWhile", { enumerable: true, get: function () { return skipWhile_1.skipWhile; } });
	var startWith_1 = startWith$1;
	Object.defineProperty(exports, "startWith", { enumerable: true, get: function () { return startWith_1.startWith; } });
	var subscribeOn_1 = subscribeOn$1;
	Object.defineProperty(exports, "subscribeOn", { enumerable: true, get: function () { return subscribeOn_1.subscribeOn; } });
	var switchAll_1 = switchAll$1;
	Object.defineProperty(exports, "switchAll", { enumerable: true, get: function () { return switchAll_1.switchAll; } });
	var switchMap_1 = switchMap$1;
	Object.defineProperty(exports, "switchMap", { enumerable: true, get: function () { return switchMap_1.switchMap; } });
	var switchMapTo_1 = switchMapTo$1;
	Object.defineProperty(exports, "switchMapTo", { enumerable: true, get: function () { return switchMapTo_1.switchMapTo; } });
	var switchScan_1 = switchScan$1;
	Object.defineProperty(exports, "switchScan", { enumerable: true, get: function () { return switchScan_1.switchScan; } });
	var take_1 = take$1;
	Object.defineProperty(exports, "take", { enumerable: true, get: function () { return take_1.take; } });
	var takeLast_1 = takeLast$1;
	Object.defineProperty(exports, "takeLast", { enumerable: true, get: function () { return takeLast_1.takeLast; } });
	var takeUntil_1 = takeUntil$1;
	Object.defineProperty(exports, "takeUntil", { enumerable: true, get: function () { return takeUntil_1.takeUntil; } });
	var takeWhile_1 = takeWhile$1;
	Object.defineProperty(exports, "takeWhile", { enumerable: true, get: function () { return takeWhile_1.takeWhile; } });
	var tap_1 = tap$2;
	Object.defineProperty(exports, "tap", { enumerable: true, get: function () { return tap_1.tap; } });
	var throttle_1 = throttle;
	Object.defineProperty(exports, "throttle", { enumerable: true, get: function () { return throttle_1.throttle; } });
	var throttleTime_1 = throttleTime$1;
	Object.defineProperty(exports, "throttleTime", { enumerable: true, get: function () { return throttleTime_1.throttleTime; } });
	var throwIfEmpty_1 = throwIfEmpty$1;
	Object.defineProperty(exports, "throwIfEmpty", { enumerable: true, get: function () { return throwIfEmpty_1.throwIfEmpty; } });
	var timeInterval_1 = timeInterval$1;
	Object.defineProperty(exports, "timeInterval", { enumerable: true, get: function () { return timeInterval_1.timeInterval; } });
	var timeout_2 = timeout;
	Object.defineProperty(exports, "timeout", { enumerable: true, get: function () { return timeout_2.timeout; } });
	var timeoutWith_1 = timeoutWith$1;
	Object.defineProperty(exports, "timeoutWith", { enumerable: true, get: function () { return timeoutWith_1.timeoutWith; } });
	var timestamp_1 = timestamp$1;
	Object.defineProperty(exports, "timestamp", { enumerable: true, get: function () { return timestamp_1.timestamp; } });
	var toArray_1 = toArray$1;
	Object.defineProperty(exports, "toArray", { enumerable: true, get: function () { return toArray_1.toArray; } });
	var window_1 = window$2;
	Object.defineProperty(exports, "window", { enumerable: true, get: function () { return window_1.window; } });
	var windowCount_1 = windowCount$1;
	Object.defineProperty(exports, "windowCount", { enumerable: true, get: function () { return windowCount_1.windowCount; } });
	var windowTime_1 = windowTime$1;
	Object.defineProperty(exports, "windowTime", { enumerable: true, get: function () { return windowTime_1.windowTime; } });
	var windowToggle_1 = windowToggle$1;
	Object.defineProperty(exports, "windowToggle", { enumerable: true, get: function () { return windowToggle_1.windowToggle; } });
	var windowWhen_1 = windowWhen$1;
	Object.defineProperty(exports, "windowWhen", { enumerable: true, get: function () { return windowWhen_1.windowWhen; } });
	var withLatestFrom_1 = withLatestFrom$1;
	Object.defineProperty(exports, "withLatestFrom", { enumerable: true, get: function () { return withLatestFrom_1.withLatestFrom; } });
	var zipAll_1 = zipAll$1;
	Object.defineProperty(exports, "zipAll", { enumerable: true, get: function () { return zipAll_1.zipAll; } });
	var zipWith_1 = zipWith$1;
	Object.defineProperty(exports, "zipWith", { enumerable: true, get: function () { return zipWith_1.zipWith; } });
	
} (cjs));

var hide$1 = {};

Object.defineProperty(hide$1, "__esModule", { value: true });
var hide_2 = hide$1.hide = void 0;
function hide() {
    return function hideOperation(source) {
        return source.lift(new HideOperator());
    };
}
hide_2 = hide$1.hide = hide;
var HideOperator = (function () {
    function HideOperator() {
        this.hide = true;
    }
    HideOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(subscriber);
    };
    return HideOperator;
}());

var tag$1 = {};

Object.defineProperty(tag$1, "__esModule", { value: true });
var tag_2 = tag$1.tag = void 0;
function tag(tag) {
    return function tagOperation(source) {
        return source.lift(new TagOperator(tag));
    };
}
tag_2 = tag$1.tag = tag;
var TagOperator = (function () {
    function TagOperator(tag) {
        this.tag = tag;
    }
    TagOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(subscriber);
    };
    return TagOperator;
}());

var index_d = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	get hide () { return hide_2; },
	get tag () { return tag_2; }
}, [hide$1, tag$1]);

var require$$2 = /*@__PURE__*/getAugmentedNamespace(index_d);

var operators$2 = {};

var partition$1 = {};

Object.defineProperty(partition$1, "__esModule", { value: true });
partition$1.partition = void 0;
var not_1 = not$1;
var filter_1 = filter$2;
function partition(predicate, thisArg) {
    return function (source) {
        return [filter_1.filter(predicate, thisArg)(source), filter_1.filter(not_1.not(predicate, thisArg))(source)];
    };
}
partition$1.partition = partition;

var race$1 = {};

var __read$3 = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
var __spreadArray$2 = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(race$1, "__esModule", { value: true });
race$1.race = void 0;
var argsOrArgArray_1 = argsOrArgArray$1;
var raceWith_1 = raceWith$1;
function race() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return raceWith_1.raceWith.apply(void 0, __spreadArray$2([], __read$3(argsOrArgArray_1.argsOrArgArray(args))));
}
race$1.race = race;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.mergeAll = exports.merge = exports.max = exports.materialize = exports.mapTo = exports.map = exports.last = exports.isEmpty = exports.ignoreElements = exports.groupBy = exports.first = exports.findIndex = exports.find = exports.finalize = exports.filter = exports.expand = exports.exhaustMap = exports.exhaustAll = exports.exhaust = exports.every = exports.endWith = exports.elementAt = exports.distinctUntilKeyChanged = exports.distinctUntilChanged = exports.distinct = exports.dematerialize = exports.delayWhen = exports.delay = exports.defaultIfEmpty = exports.debounceTime = exports.debounce = exports.count = exports.connect = exports.concatWith = exports.concatMapTo = exports.concatMap = exports.concatAll = exports.concat = exports.combineLatestWith = exports.combineLatest = exports.combineLatestAll = exports.combineAll = exports.catchError = exports.bufferWhen = exports.bufferToggle = exports.bufferTime = exports.bufferCount = exports.buffer = exports.auditTime = exports.audit = void 0;
	exports.timeInterval = exports.throwIfEmpty = exports.throttleTime = exports.throttle = exports.tap = exports.takeWhile = exports.takeUntil = exports.takeLast = exports.take = exports.switchScan = exports.switchMapTo = exports.switchMap = exports.switchAll = exports.subscribeOn = exports.startWith = exports.skipWhile = exports.skipUntil = exports.skipLast = exports.skip = exports.single = exports.shareReplay = exports.share = exports.sequenceEqual = exports.scan = exports.sampleTime = exports.sample = exports.refCount = exports.retryWhen = exports.retry = exports.repeatWhen = exports.repeat = exports.reduce = exports.raceWith = exports.race = exports.publishReplay = exports.publishLast = exports.publishBehavior = exports.publish = exports.pluck = exports.partition = exports.pairwise = exports.onErrorResumeNext = exports.observeOn = exports.multicast = exports.min = exports.mergeWith = exports.mergeScan = exports.mergeMapTo = exports.mergeMap = exports.flatMap = void 0;
	exports.zipWith = exports.zipAll = exports.zip = exports.withLatestFrom = exports.windowWhen = exports.windowToggle = exports.windowTime = exports.windowCount = exports.window = exports.toArray = exports.timestamp = exports.timeoutWith = exports.timeout = void 0;
	var audit_1 = audit$1;
	Object.defineProperty(exports, "audit", { enumerable: true, get: function () { return audit_1.audit; } });
	var auditTime_1 = auditTime$1;
	Object.defineProperty(exports, "auditTime", { enumerable: true, get: function () { return auditTime_1.auditTime; } });
	var buffer_1 = buffer$1;
	Object.defineProperty(exports, "buffer", { enumerable: true, get: function () { return buffer_1.buffer; } });
	var bufferCount_1 = bufferCount$1;
	Object.defineProperty(exports, "bufferCount", { enumerable: true, get: function () { return bufferCount_1.bufferCount; } });
	var bufferTime_1 = bufferTime$1;
	Object.defineProperty(exports, "bufferTime", { enumerable: true, get: function () { return bufferTime_1.bufferTime; } });
	var bufferToggle_1 = bufferToggle$1;
	Object.defineProperty(exports, "bufferToggle", { enumerable: true, get: function () { return bufferToggle_1.bufferToggle; } });
	var bufferWhen_1 = bufferWhen$1;
	Object.defineProperty(exports, "bufferWhen", { enumerable: true, get: function () { return bufferWhen_1.bufferWhen; } });
	var catchError_1 = catchError$1;
	Object.defineProperty(exports, "catchError", { enumerable: true, get: function () { return catchError_1.catchError; } });
	var combineAll_1 = combineAll;
	Object.defineProperty(exports, "combineAll", { enumerable: true, get: function () { return combineAll_1.combineAll; } });
	var combineLatestAll_1 = combineLatestAll$1;
	Object.defineProperty(exports, "combineLatestAll", { enumerable: true, get: function () { return combineLatestAll_1.combineLatestAll; } });
	var combineLatest_1 = combineLatest$1;
	Object.defineProperty(exports, "combineLatest", { enumerable: true, get: function () { return combineLatest_1.combineLatest; } });
	var combineLatestWith_1 = combineLatestWith$1;
	Object.defineProperty(exports, "combineLatestWith", { enumerable: true, get: function () { return combineLatestWith_1.combineLatestWith; } });
	var concat_1 = concat$1;
	Object.defineProperty(exports, "concat", { enumerable: true, get: function () { return concat_1.concat; } });
	var concatAll_1 = concatAll$1;
	Object.defineProperty(exports, "concatAll", { enumerable: true, get: function () { return concatAll_1.concatAll; } });
	var concatMap_1 = concatMap$1;
	Object.defineProperty(exports, "concatMap", { enumerable: true, get: function () { return concatMap_1.concatMap; } });
	var concatMapTo_1 = concatMapTo$1;
	Object.defineProperty(exports, "concatMapTo", { enumerable: true, get: function () { return concatMapTo_1.concatMapTo; } });
	var concatWith_1 = concatWith$1;
	Object.defineProperty(exports, "concatWith", { enumerable: true, get: function () { return concatWith_1.concatWith; } });
	var connect_1 = connect$1;
	Object.defineProperty(exports, "connect", { enumerable: true, get: function () { return connect_1.connect; } });
	var count_1 = count$1;
	Object.defineProperty(exports, "count", { enumerable: true, get: function () { return count_1.count; } });
	var debounce_1 = debounce$1;
	Object.defineProperty(exports, "debounce", { enumerable: true, get: function () { return debounce_1.debounce; } });
	var debounceTime_1 = debounceTime$1;
	Object.defineProperty(exports, "debounceTime", { enumerable: true, get: function () { return debounceTime_1.debounceTime; } });
	var defaultIfEmpty_1 = defaultIfEmpty$1;
	Object.defineProperty(exports, "defaultIfEmpty", { enumerable: true, get: function () { return defaultIfEmpty_1.defaultIfEmpty; } });
	var delay_1 = delay$1;
	Object.defineProperty(exports, "delay", { enumerable: true, get: function () { return delay_1.delay; } });
	var delayWhen_1 = delayWhen$1;
	Object.defineProperty(exports, "delayWhen", { enumerable: true, get: function () { return delayWhen_1.delayWhen; } });
	var dematerialize_1 = dematerialize$1;
	Object.defineProperty(exports, "dematerialize", { enumerable: true, get: function () { return dematerialize_1.dematerialize; } });
	var distinct_1 = distinct$1;
	Object.defineProperty(exports, "distinct", { enumerable: true, get: function () { return distinct_1.distinct; } });
	var distinctUntilChanged_1 = distinctUntilChanged$1;
	Object.defineProperty(exports, "distinctUntilChanged", { enumerable: true, get: function () { return distinctUntilChanged_1.distinctUntilChanged; } });
	var distinctUntilKeyChanged_1 = distinctUntilKeyChanged$1;
	Object.defineProperty(exports, "distinctUntilKeyChanged", { enumerable: true, get: function () { return distinctUntilKeyChanged_1.distinctUntilKeyChanged; } });
	var elementAt_1 = elementAt$1;
	Object.defineProperty(exports, "elementAt", { enumerable: true, get: function () { return elementAt_1.elementAt; } });
	var endWith_1 = endWith$1;
	Object.defineProperty(exports, "endWith", { enumerable: true, get: function () { return endWith_1.endWith; } });
	var every_1 = every$1;
	Object.defineProperty(exports, "every", { enumerable: true, get: function () { return every_1.every; } });
	var exhaust_1 = exhaust;
	Object.defineProperty(exports, "exhaust", { enumerable: true, get: function () { return exhaust_1.exhaust; } });
	var exhaustAll_1 = exhaustAll$1;
	Object.defineProperty(exports, "exhaustAll", { enumerable: true, get: function () { return exhaustAll_1.exhaustAll; } });
	var exhaustMap_1 = exhaustMap$1;
	Object.defineProperty(exports, "exhaustMap", { enumerable: true, get: function () { return exhaustMap_1.exhaustMap; } });
	var expand_1 = expand$1;
	Object.defineProperty(exports, "expand", { enumerable: true, get: function () { return expand_1.expand; } });
	var filter_1 = filter$2;
	Object.defineProperty(exports, "filter", { enumerable: true, get: function () { return filter_1.filter; } });
	var finalize_1 = finalize$1;
	Object.defineProperty(exports, "finalize", { enumerable: true, get: function () { return finalize_1.finalize; } });
	var find_1 = find$1;
	Object.defineProperty(exports, "find", { enumerable: true, get: function () { return find_1.find; } });
	var findIndex_1 = findIndex$1;
	Object.defineProperty(exports, "findIndex", { enumerable: true, get: function () { return findIndex_1.findIndex; } });
	var first_1 = first$1;
	Object.defineProperty(exports, "first", { enumerable: true, get: function () { return first_1.first; } });
	var groupBy_1 = groupBy$1;
	Object.defineProperty(exports, "groupBy", { enumerable: true, get: function () { return groupBy_1.groupBy; } });
	var ignoreElements_1 = ignoreElements$1;
	Object.defineProperty(exports, "ignoreElements", { enumerable: true, get: function () { return ignoreElements_1.ignoreElements; } });
	var isEmpty_1 = isEmpty$1;
	Object.defineProperty(exports, "isEmpty", { enumerable: true, get: function () { return isEmpty_1.isEmpty; } });
	var last_1 = last$1;
	Object.defineProperty(exports, "last", { enumerable: true, get: function () { return last_1.last; } });
	var map_1 = map$1;
	Object.defineProperty(exports, "map", { enumerable: true, get: function () { return map_1.map; } });
	var mapTo_1 = mapTo$1;
	Object.defineProperty(exports, "mapTo", { enumerable: true, get: function () { return mapTo_1.mapTo; } });
	var materialize_1 = materialize$1;
	Object.defineProperty(exports, "materialize", { enumerable: true, get: function () { return materialize_1.materialize; } });
	var max_1 = max$1;
	Object.defineProperty(exports, "max", { enumerable: true, get: function () { return max_1.max; } });
	var merge_1 = merge$1;
	Object.defineProperty(exports, "merge", { enumerable: true, get: function () { return merge_1.merge; } });
	var mergeAll_1 = mergeAll$1;
	Object.defineProperty(exports, "mergeAll", { enumerable: true, get: function () { return mergeAll_1.mergeAll; } });
	var flatMap_1 = flatMap;
	Object.defineProperty(exports, "flatMap", { enumerable: true, get: function () { return flatMap_1.flatMap; } });
	var mergeMap_1 = mergeMap$1;
	Object.defineProperty(exports, "mergeMap", { enumerable: true, get: function () { return mergeMap_1.mergeMap; } });
	var mergeMapTo_1 = mergeMapTo$1;
	Object.defineProperty(exports, "mergeMapTo", { enumerable: true, get: function () { return mergeMapTo_1.mergeMapTo; } });
	var mergeScan_1 = mergeScan$1;
	Object.defineProperty(exports, "mergeScan", { enumerable: true, get: function () { return mergeScan_1.mergeScan; } });
	var mergeWith_1 = mergeWith$1;
	Object.defineProperty(exports, "mergeWith", { enumerable: true, get: function () { return mergeWith_1.mergeWith; } });
	var min_1 = min$1;
	Object.defineProperty(exports, "min", { enumerable: true, get: function () { return min_1.min; } });
	var multicast_1 = multicast$1;
	Object.defineProperty(exports, "multicast", { enumerable: true, get: function () { return multicast_1.multicast; } });
	var observeOn_1 = observeOn$1;
	Object.defineProperty(exports, "observeOn", { enumerable: true, get: function () { return observeOn_1.observeOn; } });
	var onErrorResumeNextWith_1 = onErrorResumeNextWith$1;
	Object.defineProperty(exports, "onErrorResumeNext", { enumerable: true, get: function () { return onErrorResumeNextWith_1.onErrorResumeNext; } });
	var pairwise_1 = pairwise$1;
	Object.defineProperty(exports, "pairwise", { enumerable: true, get: function () { return pairwise_1.pairwise; } });
	var partition_1 = partition$1;
	Object.defineProperty(exports, "partition", { enumerable: true, get: function () { return partition_1.partition; } });
	var pluck_1 = pluck$1;
	Object.defineProperty(exports, "pluck", { enumerable: true, get: function () { return pluck_1.pluck; } });
	var publish_1 = publish$1;
	Object.defineProperty(exports, "publish", { enumerable: true, get: function () { return publish_1.publish; } });
	var publishBehavior_1 = publishBehavior$1;
	Object.defineProperty(exports, "publishBehavior", { enumerable: true, get: function () { return publishBehavior_1.publishBehavior; } });
	var publishLast_1 = publishLast$1;
	Object.defineProperty(exports, "publishLast", { enumerable: true, get: function () { return publishLast_1.publishLast; } });
	var publishReplay_1 = publishReplay$1;
	Object.defineProperty(exports, "publishReplay", { enumerable: true, get: function () { return publishReplay_1.publishReplay; } });
	var race_1 = race$1;
	Object.defineProperty(exports, "race", { enumerable: true, get: function () { return race_1.race; } });
	var raceWith_1 = raceWith$1;
	Object.defineProperty(exports, "raceWith", { enumerable: true, get: function () { return raceWith_1.raceWith; } });
	var reduce_1 = reduce$1;
	Object.defineProperty(exports, "reduce", { enumerable: true, get: function () { return reduce_1.reduce; } });
	var repeat_1 = repeat$1;
	Object.defineProperty(exports, "repeat", { enumerable: true, get: function () { return repeat_1.repeat; } });
	var repeatWhen_1 = repeatWhen$1;
	Object.defineProperty(exports, "repeatWhen", { enumerable: true, get: function () { return repeatWhen_1.repeatWhen; } });
	var retry_1 = retry$1;
	Object.defineProperty(exports, "retry", { enumerable: true, get: function () { return retry_1.retry; } });
	var retryWhen_1 = retryWhen$1;
	Object.defineProperty(exports, "retryWhen", { enumerable: true, get: function () { return retryWhen_1.retryWhen; } });
	var refCount_1 = refCount$2;
	Object.defineProperty(exports, "refCount", { enumerable: true, get: function () { return refCount_1.refCount; } });
	var sample_1 = sample$1;
	Object.defineProperty(exports, "sample", { enumerable: true, get: function () { return sample_1.sample; } });
	var sampleTime_1 = sampleTime$1;
	Object.defineProperty(exports, "sampleTime", { enumerable: true, get: function () { return sampleTime_1.sampleTime; } });
	var scan_1 = scan$1;
	Object.defineProperty(exports, "scan", { enumerable: true, get: function () { return scan_1.scan; } });
	var sequenceEqual_1 = sequenceEqual$1;
	Object.defineProperty(exports, "sequenceEqual", { enumerable: true, get: function () { return sequenceEqual_1.sequenceEqual; } });
	var share_1 = share$1;
	Object.defineProperty(exports, "share", { enumerable: true, get: function () { return share_1.share; } });
	var shareReplay_1 = shareReplay$1;
	Object.defineProperty(exports, "shareReplay", { enumerable: true, get: function () { return shareReplay_1.shareReplay; } });
	var single_1 = single$1;
	Object.defineProperty(exports, "single", { enumerable: true, get: function () { return single_1.single; } });
	var skip_1 = skip$1;
	Object.defineProperty(exports, "skip", { enumerable: true, get: function () { return skip_1.skip; } });
	var skipLast_1 = skipLast$1;
	Object.defineProperty(exports, "skipLast", { enumerable: true, get: function () { return skipLast_1.skipLast; } });
	var skipUntil_1 = skipUntil$1;
	Object.defineProperty(exports, "skipUntil", { enumerable: true, get: function () { return skipUntil_1.skipUntil; } });
	var skipWhile_1 = skipWhile$1;
	Object.defineProperty(exports, "skipWhile", { enumerable: true, get: function () { return skipWhile_1.skipWhile; } });
	var startWith_1 = startWith$1;
	Object.defineProperty(exports, "startWith", { enumerable: true, get: function () { return startWith_1.startWith; } });
	var subscribeOn_1 = subscribeOn$1;
	Object.defineProperty(exports, "subscribeOn", { enumerable: true, get: function () { return subscribeOn_1.subscribeOn; } });
	var switchAll_1 = switchAll$1;
	Object.defineProperty(exports, "switchAll", { enumerable: true, get: function () { return switchAll_1.switchAll; } });
	var switchMap_1 = switchMap$1;
	Object.defineProperty(exports, "switchMap", { enumerable: true, get: function () { return switchMap_1.switchMap; } });
	var switchMapTo_1 = switchMapTo$1;
	Object.defineProperty(exports, "switchMapTo", { enumerable: true, get: function () { return switchMapTo_1.switchMapTo; } });
	var switchScan_1 = switchScan$1;
	Object.defineProperty(exports, "switchScan", { enumerable: true, get: function () { return switchScan_1.switchScan; } });
	var take_1 = take$1;
	Object.defineProperty(exports, "take", { enumerable: true, get: function () { return take_1.take; } });
	var takeLast_1 = takeLast$1;
	Object.defineProperty(exports, "takeLast", { enumerable: true, get: function () { return takeLast_1.takeLast; } });
	var takeUntil_1 = takeUntil$1;
	Object.defineProperty(exports, "takeUntil", { enumerable: true, get: function () { return takeUntil_1.takeUntil; } });
	var takeWhile_1 = takeWhile$1;
	Object.defineProperty(exports, "takeWhile", { enumerable: true, get: function () { return takeWhile_1.takeWhile; } });
	var tap_1 = tap$2;
	Object.defineProperty(exports, "tap", { enumerable: true, get: function () { return tap_1.tap; } });
	var throttle_1 = throttle;
	Object.defineProperty(exports, "throttle", { enumerable: true, get: function () { return throttle_1.throttle; } });
	var throttleTime_1 = throttleTime$1;
	Object.defineProperty(exports, "throttleTime", { enumerable: true, get: function () { return throttleTime_1.throttleTime; } });
	var throwIfEmpty_1 = throwIfEmpty$1;
	Object.defineProperty(exports, "throwIfEmpty", { enumerable: true, get: function () { return throwIfEmpty_1.throwIfEmpty; } });
	var timeInterval_1 = timeInterval$1;
	Object.defineProperty(exports, "timeInterval", { enumerable: true, get: function () { return timeInterval_1.timeInterval; } });
	var timeout_1 = timeout;
	Object.defineProperty(exports, "timeout", { enumerable: true, get: function () { return timeout_1.timeout; } });
	var timeoutWith_1 = timeoutWith$1;
	Object.defineProperty(exports, "timeoutWith", { enumerable: true, get: function () { return timeoutWith_1.timeoutWith; } });
	var timestamp_1 = timestamp$1;
	Object.defineProperty(exports, "timestamp", { enumerable: true, get: function () { return timestamp_1.timestamp; } });
	var toArray_1 = toArray$1;
	Object.defineProperty(exports, "toArray", { enumerable: true, get: function () { return toArray_1.toArray; } });
	var window_1 = window$2;
	Object.defineProperty(exports, "window", { enumerable: true, get: function () { return window_1.window; } });
	var windowCount_1 = windowCount$1;
	Object.defineProperty(exports, "windowCount", { enumerable: true, get: function () { return windowCount_1.windowCount; } });
	var windowTime_1 = windowTime$1;
	Object.defineProperty(exports, "windowTime", { enumerable: true, get: function () { return windowTime_1.windowTime; } });
	var windowToggle_1 = windowToggle$1;
	Object.defineProperty(exports, "windowToggle", { enumerable: true, get: function () { return windowToggle_1.windowToggle; } });
	var windowWhen_1 = windowWhen$1;
	Object.defineProperty(exports, "windowWhen", { enumerable: true, get: function () { return windowWhen_1.windowWhen; } });
	var withLatestFrom_1 = withLatestFrom$1;
	Object.defineProperty(exports, "withLatestFrom", { enumerable: true, get: function () { return withLatestFrom_1.withLatestFrom; } });
	var zip_1 = zip$1;
	Object.defineProperty(exports, "zip", { enumerable: true, get: function () { return zip_1.zip; } });
	var zipAll_1 = zipAll$1;
	Object.defineProperty(exports, "zipAll", { enumerable: true, get: function () { return zipAll_1.zipAll; } });
	var zipWith_1 = zipWith$1;
	Object.defineProperty(exports, "zipWith", { enumerable: true, get: function () { return zipWith_1.zipWith; } });
	
} (operators$2));

var namespace = {};

(function (exports) {
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.namespaceActionDispatcher = exports.namespaceActionCreator = exports._namespaceAction = void 0;
	var _namespaceAction = function (namespace, action) {
	    return Object.freeze({
	        type: action.type,
	        payload: action.payload,
	        meta: Object.freeze(__assign(__assign({}, action.meta), { namespace: namespace })),
	    });
	};
	exports._namespaceAction = _namespaceAction;
	/**
	 * Decorate an action creator so the created actions have the given namespace
	 *
	 * The given namespace will replace existing namespaces on the action objects.
	 *
	 * In contrast to `namespaceActionDispatcher`, the function returned by this
	 * function creates an action object instead of dispatching it.
	 *
	 * @see namespaceActionDispatcher
	 * @param namespace The namespace to set for the created actions
	 * @param actionCreator The action creator to decorate
	 * @returns An action creator that creates actions using the passed action
	 *          creator, and sets the given namespace
	 */
	var namespaceActionCreator = function (namespace, actionCreator) {
	    var creator = function (payload) {
	        return (0, exports._namespaceAction)(namespace, actionCreator(payload));
	    };
	    creator.type = actionCreator.type;
	    return Object.freeze(creator);
	};
	exports.namespaceActionCreator = namespaceActionCreator;
	/**
	 * Decorate an action dispatcher so it dispatches namespaced actions
	 *
	 * The given namespace is set as the namespace for each action dispatched with
	 * this function, before the action is dispatched with the action dispatcher
	 * from the arguments.
	 *
	 * In contrast to `namespaceActionCreator`, the function returned by this
	 * function dispatches the action, instead of creating it.
	 *
	 * @see namespaceActionCreator
	 * @param parentDispatcher The dispatcher the returned action dispatcher will
	 *                         dispatch to
	 * @param namespace The namespace that will be set for each action before they
	 *                  are passed on to the parent dispatcher
	 * @returns An action dispatcher that sets the namespace before passing the
	 *          actions to the parent dispatcher
	 */
	var namespaceActionDispatcher = function (namespace, parentDispatcher) {
	    return function (action) {
	        return parentDispatcher((0, exports._namespaceAction)(namespace, action));
	    };
	};
	exports.namespaceActionDispatcher = namespaceActionDispatcher;
	
} (namespace));

Object.defineProperty(action$, "__esModule", { value: true });
action$.dispatchAction = action$.action$ = void 0;
var rxjs_1$7 = cjs;
var operators_1$7 = require$$2;
var operators_2$2 = operators$2;
var namespace_1 = namespace;
var actionSubject$ = new rxjs_1$7.Subject();
/**
 * The main action stream for RxBeach
 */
action$.action$ = actionSubject$.pipe((0, operators_1$7.tag)('action$'), (0, operators_2$2.share)());
/**
 * Dispatch an action to the action stream
 *
 * If namespace is provided, it will be set on the action.
 *
 * @param action The action to dispatch to action$
 * @param namespace Optional namespace to add to the action
 */
var dispatchAction = function (action, namespace) {
    if (namespace === undefined) {
        actionSubject$.next(action);
    }
    else {
        actionSubject$.next((0, namespace_1._namespaceAction)(namespace, action));
    }
};
action$.dispatchAction = dispatchAction;

var actionCreator$1 = {};

Object.defineProperty(actionCreator$1, "__esModule", { value: true });
actionCreator$1.actionCreator = void 0;
/**
 * Untyped `actionCreator`
 *
 * **You code should not hit this untyped overload**
 * If you see this message in your IDE, you should investigate why TS did not
 * recognize the generic, typed overload of this function.
 */
var actionCreator = function (type) {
    var actionCreatorFn = function (payload) {
        return Object.freeze({
            type: type,
            payload: payload,
            meta: Object.freeze({}),
        });
    };
    actionCreatorFn.type = type;
    return Object.freeze(actionCreatorFn);
};
actionCreator$1.actionCreator = actionCreator;

var reducer$1 = {};

var defaultErrorSubject = {};

var rethrowErrorGlobally$1 = {};

Object.defineProperty(rethrowErrorGlobally$1, "__esModule", { value: true });
rethrowErrorGlobally$1.rethrowErrorGlobally = void 0;
/**
 * Throws an error in a setTimout
 *
 * The error will become an uncaught error, as it's thrown on the main loop.
 * In the browser, these errors can be caught with `window.onerror`.
 *
 * @param error The error to rethrow
 */
var rethrowErrorGlobally = function (error) {
    return setTimeout(function () {
        throw error;
    });
};
rethrowErrorGlobally$1.rethrowErrorGlobally = rethrowErrorGlobally;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.defaultErrorSubject = void 0;
	var rxjs_1 = cjs;
	var rethrowErrorGlobally_1 = rethrowErrorGlobally$1;
	/**
	 * The default error subject is where errors that RxBeach has silenced will go
	 * if no other error subjects are specified.
	 *
	 * This subject is by default subscribed so that all the erros that it emits are
	 * rethrown globally, with `rethrowErrorGlobally`
	 *
	 * @see rethrowErrorGlobally
	 */
	exports.defaultErrorSubject = new rxjs_1.Subject();
	exports.defaultErrorSubject.subscribe(function (error) { return (0, rethrowErrorGlobally_1.rethrowErrorGlobally)(error); });
	
} (defaultErrorSubject));

var operators$1 = {};

Object.defineProperty(operators$1, "__esModule", { value: true });
operators$1.apply = operators$1.carry = operators$1.withoutNamespace = operators$1.withNamespace = operators$1.extractPayload = operators$1.ofType = void 0;
var rxjs_1$6 = cjs;
var operators_1$6 = operators$2;
operators$1.ofType = (function () {
    var targetTypes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        targetTypes[_i] = arguments[_i];
    }
    var types = new Set(targetTypes.map(function (_a) {
        var type = _a.type;
        return type;
    }));
    return (0, rxjs_1$6.pipe)((0, operators_1$6.filter)(function (action) { return types.has(action.type); }));
}); // Implementation is untyped
/**
 * Stream operator to extract the payload from an action
 *
 * @template `Payload` - The type of the payload, can be inferred if the stream
 *                       is typed, or explicitly set if the stream has `any`
 *                       type or the payload type is `any`
 */
var extractPayload = function () { return (0, operators_1$6.map)(function (action) { return action.payload; }); };
operators$1.extractPayload = extractPayload;
/**
 * Stream operator that excludes actions with the wrong namespace
 *
 * @param namespace The namespace to filter for
 */
var withNamespace = function (targetNamespace) {
    return (0, operators_1$6.filter)(function (_a) {
        var namespace = _a.meta.namespace;
        return namespace === undefined || namespace === targetNamespace;
    });
};
operators$1.withNamespace = withNamespace;
/**
 * Stream operator that excludes actions with the given namespace
 *
 * If no namespace is provided, it will exclude all actions that has any
 * namespace
 *
 * @param excludedNamespace Optionally a specific namespace to exclude
 */
var withoutNamespace = function (excludedNamespace) {
    return (0, operators_1$6.filter)(function (_a) {
        var namespace = _a.meta.namespace;
        return excludedNamespace === undefined
            ? namespace === undefined
            : namespace !== excludedNamespace;
    });
};
operators$1.withoutNamespace = withoutNamespace;
/**
 * Stream operator that carries the initial payload alongside the results
 * from the operator parameter. Using this makes the observable/stream hot.
 *
 * ```
 * routine(
 *   extractPayload(),
 *   carry(map(payload => payload.foo))
 *   tap(([payload, foo]) => {
 *     // `payload.foo === foo` equals `true`
 *   })
 * )
 * ```
 *
 * @param operator The operator to execute
 */
var carry = function (operator) {
    return function (observable) {
        var hot = observable.pipe((0, operators_1$6.share)());
        return hot.pipe(operator, (0, operators_1$6.withLatestFrom)(hot, function (emitted, carried) { return [carried, emitted]; }));
    };
};
operators$1.carry = carry;
/**
 * A utility operator for using pipes which need a value to be present
 * throughout the pipe.
 *
 * The main use for this operator is to provide context to `catchError`. `carry`
 * should be preferred where possible.
 *
 * **NB** Use with caution. This is very inefficient and should only be used for
 * providing context to `catchError`.
 *
 * Example:
 * ```ts
 * routine(
 *   ofType(myAction),
 *   apply(action => pipe(
 *     map(action => ...),
 *     tap(mapped => ...),
 *     catchError(() => {
 *       console.log('Error from action:', action);
 *     })
 *   ))
 * )
 * ```
 *
 * @param operator A function that returns an operator function
 */
var apply = function (operator) {
    return (0, operators_1$6.flatMap)(function (payload) { return (0, rxjs_1$6.of)(payload).pipe(operator(payload)); });
};
operators$1.apply = apply;

var isObservableInput$1 = {};

Object.defineProperty(isObservableInput$1, "__esModule", { value: true });
isObservableInput$1.isObservableInput = void 0;
var rxjs_1$5 = cjs;
var isObservableInput = function (obj) {
    try {
        (0, rxjs_1$5.from)(obj);
        return true;
    }
    catch (_a) {
        return false;
    }
};
isObservableInput$1.isObservableInput = isObservableInput;

var __read$2 = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
var __spreadArray$1 = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(reducer$1, "__esModule", { value: true });
reducer$1.combineReducers = reducer$1.reducer = void 0;
var rxjs_1$4 = cjs;
var operators_1$5 = operators$2;
var defaultErrorSubject_1$1 = defaultErrorSubject;
var operators_2$1 = operators$1;
var isObservableInput_1 = isObservableInput$1;
var wrapInArray = function (val) {
    return Array.isArray(val) ? val : [val];
};
var isActionReducer = function (reducerFn) {
    return 'actions' in reducerFn.trigger;
};
var isStreamReducer = function (reducerFn) {
    return 'source$' in reducerFn.trigger;
};
var reducer = function (trigger, reducerFn) {
    var wrapper = function (state, payload, namespace) {
        return reducerFn(state, payload, namespace);
    };
    if (!Array.isArray(trigger) && (0, isObservableInput_1.isObservableInput)(trigger)) {
        wrapper.trigger = {
            source$: (0, rxjs_1$4.from)(trigger),
        };
    }
    else {
        wrapper.trigger = {
            actions: wrapInArray(trigger),
        };
    }
    return wrapper;
};
reducer$1.reducer = reducer;
var ACTION_ORIGIN = Symbol('Action origin');
/**
 * Combine registered reducers into a stream operator
 *
 * Each reducer will receive the previous state (or the seed if it's the first
 * invocation) together with the payloads of the actions of the given reducer,
 * or the emitted values from the stream of the given reducer.
 *
 * The behaviour is undefined if multiple reducers are registered for the same
 * actions.
 *
 * This operator does not change whether the stream is hot or cold.
 *
 * The order of invocation for the reducers is controlled by the rxjs operator
 * `merge`, which is called with all the actions first and then the source
 * streams in the order their reducers are defined in the `reducers` argument.
 *
 * If a reducer throws an error, it will be nexted on the error subject. If the
 * error subject is not explicitly set, it will default to
 * `defaultErrorSubject`, which will rethrow the errors globally, as uncaught
 * exceptions. The stream will not complete or emit any value upon an error.
 *
 * @param seed The initial input to the first reducer call
 * @param reducers The reducer entries that should be combined
 * @param namespace Namespace to pass on to the reducers. Note that this will
 *                  always be passed, regardless of namespaces of the actions.
 * @see rxjs.merge
 */
var combineReducers = function (seed, reducers, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.errorSubject, errorSubject = _c === void 0 ? defaultErrorSubject_1$1.defaultErrorSubject : _c, namespace = _b.namespace;
    var actionReducers = reducers.filter(isActionReducer);
    var streamReducers = reducers.filter(isStreamReducer);
    var reducersByActionType = new Map(actionReducers.flatMap(function (reducerFn) {
        return reducerFn.trigger.actions.map(function (actionCreator) { return [
            actionCreator.type,
            reducerFn,
        ]; });
    }));
    var source$s = streamReducers.map(function (reducerFn, i) {
        return reducerFn.trigger.source$.pipe((0, operators_1$5.map)(function (payload) { return ({ origin: i, value: payload }); }));
    });
    return (0, rxjs_1$4.pipe)(operators_2$1.ofType.apply(void 0, __spreadArray$1([], __read$2(actionReducers.flatMap(function (reducerFn) { return reducerFn.trigger.actions; })), false)), (0, operators_1$5.map)(function (action) { return ({ origin: ACTION_ORIGIN, value: action }); }), operators_1$5.mergeWith.apply(void 0, __spreadArray$1([], __read$2(source$s), false)), (0, operators_1$5.scan)(function (_a, packet) {
        var state = _a.state;
        try {
            if (packet.origin === ACTION_ORIGIN) {
                var reducerFn_1 = reducersByActionType.get(packet.value.type);
                return {
                    caughtError: false,
                    state: reducerFn_1(state, packet.value.payload, namespace),
                };
            }
            var reducerFn = streamReducers[packet.origin];
            return {
                caughtError: false,
                state: reducerFn(state, packet.value, namespace),
            };
        }
        catch (e) {
            errorSubject.next(e);
            return {
                caughtError: true,
                state: state,
            };
        }
    }, { state: seed, caughtError: false }), (0, operators_1$5.filter)(function (_a) {
        var caughtError = _a.caughtError;
        return caughtError === false;
    }), (0, operators_1$5.map)(function (_a) {
        var state = _a.state;
        return state;
    }));
};
reducer$1.combineReducers = combineReducers;

var routines = {};

var mergeOperators = {};

(function (exports) {
	var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
	};
	var __spreadArray = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from, pack) {
	    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
	        if (ar || !(i in from)) {
	            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
	            ar[i] = from[i];
	        }
	    }
	    return to.concat(ar || Array.prototype.slice.call(from));
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.mergeOperators = exports.coldMergeOperators = void 0;
	var rxjs_1 = cjs;
	var operators_1 = operators$2;
	/**
	 * Runs operators in parallel and merges their results
	 *
	 * For each operator, the returned observable is subscribed to a pipe from the
	 * source observable with the operator. This makes it a bit like the `flatMap`
	 * operator and the `merge` function, but on an operator level instead of value
	 * or observable level.
	 *
	 * NB: Each operator will create a "copy" of the stream, so any operators
	 *     before the `coldMergeOperators` operator, will be executed for each
	 *     operator passed to `coldMergeOperators`. Because of this, you might want
	 *     to use the `mergeOperators` operator, which includes a `share` operator
	 *     to make the upstream hot.
	 *
	 * @param operators Operators to run in parallell and merge the results of
	 */
	var coldMergeOperators = function () {
	    var operators = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        operators[_i] = arguments[_i];
	    }
	    return function (source) {
	        return rxjs_1.merge.apply(void 0, __spreadArray([], __read(operators.map(function (operator) { return source.pipe(operator); })), false));
	    };
	};
	exports.coldMergeOperators = coldMergeOperators;
	/**
	 * Runs operators in parallel and merges their results
	 *
	 * For each operator, the returned observable is subscribed to a pipe from the
	 * source observable with the operator. This makes it a bit like the `flatMap`
	 * operator and the merge function, but on an operator level instead of value
	 * or observable level.
	 *
	 * This operator includes the `share` operator on the parent stream, to prevent
	 * operators that are attached before this one from running multiple times.
	 *
	 * @param operators Operators to run in parallell and merge the results of
	 */
	var mergeOperators = function () {
	    var operators = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        operators[_i] = arguments[_i];
	    }
	    return (0, rxjs_1.pipe)((0, operators_1.share)(), exports.coldMergeOperators.apply(void 0, __spreadArray([], __read(operators), false)));
	};
	exports.mergeOperators = mergeOperators;
	
} (mergeOperators));

var operators = {};

var reduceState$1 = {};

Object.defineProperty(reduceState$1, "__esModule", { value: true });
reduceState$1.reduceState = void 0;
var defaultErrorSubject_1 = defaultErrorSubject;
var operators_1$4 = require$$2;
var operators_2 = operators$2;
var reducer_1$1 = reducer$1;
var rxjs_1$3 = cjs;
/**
 * Create a state stream for a set of reducers.
 *
 * It is guaranteed that the state stream will always emit a value upon subscription.
 *
 * The state stream is ref counted, which means that the stream
 * will reset to its `defaultState` when there are no subscribers.
 *
 * If you wish to persist the state throughout the application lifecycle,
 * you should create a subscriber that never unsubscribes.
 *
 * The values emitted from the stream are shared between the subscribers,
 * and the reducers are only ran once per input action.
 *.
 *
 * @param name A name for debugging purposes
 * @param action$ The action stream
 * @param defaultState The initial state of the state stream,
 *                     which is typically emitted upon subscription
 *                     unless one of the stream reducers emit straight away
 * @param reducers The reducer entries that are combined with `combineReducers`
 * @see rxbeach.combineReducers
 * @returns An stream that emits the reduced state
 */
var reduceState = function (name, defaultState, reducers, errorSubject) {
    if (errorSubject === void 0) { errorSubject = defaultErrorSubject_1.defaultErrorSubject; }
    return (0, rxjs_1$3.pipe)((0, reducer_1$1.combineReducers)(defaultState, reducers, {
        errorSubject: errorSubject,
    }), (0, operators_2.startWith)(defaultState), (0, operators_2.shareReplay)({
        refCount: true,
        bufferSize: 1,
    }), (0, operators_1$4.tag)(name));
};
reduceState$1.reduceState = reduceState;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.reduceState = exports.mergeOperators = exports.apply = exports.carry = exports.withoutNamespace = exports.withNamespace = exports.extractPayload = exports.ofType = void 0;
	var operators_1 = operators$1;
	Object.defineProperty(exports, "ofType", { enumerable: true, get: function () { return operators_1.ofType; } });
	Object.defineProperty(exports, "extractPayload", { enumerable: true, get: function () { return operators_1.extractPayload; } });
	Object.defineProperty(exports, "withNamespace", { enumerable: true, get: function () { return operators_1.withNamespace; } });
	Object.defineProperty(exports, "withoutNamespace", { enumerable: true, get: function () { return operators_1.withoutNamespace; } });
	Object.defineProperty(exports, "carry", { enumerable: true, get: function () { return operators_1.carry; } });
	Object.defineProperty(exports, "apply", { enumerable: true, get: function () { return operators_1.apply; } });
	var mergeOperators_1 = mergeOperators;
	Object.defineProperty(exports, "mergeOperators", { enumerable: true, get: function () { return mergeOperators_1.mergeOperators; } });
	var reduceState_1 = reduceState$1;
	Object.defineProperty(exports, "reduceState", { enumerable: true, get: function () { return reduceState_1.reduceState; } });
	
} (operators));

(function (exports) {
	var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
	};
	var __spreadArray = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from, pack) {
	    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
	        if (ar || !(i in from)) {
	            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
	            ar[i] = from[i];
	        }
	    }
	    return to.concat(ar || Array.prototype.slice.call(from));
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.tapRoutine = exports.ensureArray = exports.subscribeRoutine = exports.collectRoutines = exports.routine = void 0;
	var rxjs_1 = cjs;
	var operators_1 = operators$2;
	var defaultErrorSubject_1 = defaultErrorSubject;
	var mergeOperators_1 = mergeOperators;
	var operators_2 = operators;
	/**
	 * See collectRoutines for documentation
	 */
	var routine = function () {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    return rxjs_1.pipe.apply(void 0, __spreadArray([], __read(args), false));
	};
	exports.routine = routine;
	/**
	 * Collect multiple routines to one
	 *
	 * A routine is simply a stream operator that will recieve actions, and is
	 * supposed to perform side effects. This function uses the composite pattern,
	 * so multiple routines can be collected into one routine.
	 *
	 * Routines are subscribed by passing them to a `subscribeRoutine` call.
	 *
	 * @see subscribeRoutine
	 * @param routines The routines to collect
	 * @returns A routine that calls the provided routines
	 */
	var collectRoutines = function () {
	    var routines = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        routines[_i] = arguments[_i];
	    }
	    return mergeOperators_1.mergeOperators.apply(void 0, __spreadArray([], __read(routines), false));
	};
	exports.collectRoutines = collectRoutines;
	/**
	 * Subscribe a routine to an action stream
	 *
	 * Errors will not cause the routine to be unsubscribed from the action stream.
	 * We assume all errors stem from faulty action objects, so we allow ourselves
	 * to continue the routine on errors. It is therefore important that the action
	 * stream is "hot", so the same action object is not re-emitted right away to
	 * the routine.
	 *
	 * If a routine throws an error, it will be nexted on the error subject. If the
	 * error subject is not explicitly set, it will default to
	 * `defaultErrorSubject`, which will rethrow the errors globally, as uncaught
	 * exceptions.
	 *
	 * **NB**: Routines should not accidentally dispatch actions to the action$
	 * when they are subscribed. If a routine dispatches an action when it is
	 * subscribed, only some of the routines will receive the action.
	 *
	 * @param action$ The action stream to subscribe the routine to
	 * @param routineToSubscribe The routine to subscribe
	 * @param errorSubject An optional Subject that will receive errors form the
	 *                     routine
	 * @returns A Subscription object
	 * @see defaultErrorSubject
	 */
	var subscribeRoutine = function (action$, routineToSubscribe, errorSubject) {
	    if (errorSubject === void 0) { errorSubject = defaultErrorSubject_1.defaultErrorSubject; }
	    return action$
	        .pipe(routineToSubscribe, (0, operators_1.catchError)(function (err, stream) {
	        errorSubject.next(err);
	        return stream;
	    }))
	        .subscribe();
	};
	exports.subscribeRoutine = subscribeRoutine;
	var ensureArray = function (a) {
	    return Array.isArray(a) ? a : [a];
	};
	exports.ensureArray = ensureArray;
	var tapRoutine = function (actionCreator, body) {
	    return (0, exports.routine)(operators_2.ofType.apply(void 0, __spreadArray([], __read((0, exports.ensureArray)(actionCreator)), false)), (0, operators_2.extractPayload)(), (0, operators_1.tap)(body));
	};
	exports.tapRoutine = tapRoutine;
	
} (routines));

var derivedStream$1 = {};

Object.defineProperty(derivedStream$1, "__esModule", { value: true });
derivedStream$1.derivedStream = void 0;
var rxjs_1$2 = cjs;
var operators_1$3 = require$$2;
/**
 * Make this stream a derived stream of its source and dependencies
 *
 * This is basically an annotated version of the `combineLatest` operator that
 * adds tags so the stream can be analyzed.
 *
 * @param name The unique name of this stream
 * @param dependencies The dependencies of this stream
 * @see combineLatest
 */
var derivedStream = function (name) {
    var dependencies = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        dependencies[_i - 1] = arguments[_i];
    }
    return (0, rxjs_1$2.combineLatest)(dependencies).pipe((0, operators_1$3.tag)(name));
};
derivedStream$1.derivedStream = derivedStream;

var reducedStream$3 = {};

var reducedStream$2 = {};

Object.defineProperty(reducedStream$2, "__esModule", { value: true });
reducedStream$2.reducedStream = void 0;
var reducer_1 = reducer$1;
var action_1 = action$;
var operators_1$2 = operators;
/**
 * Creates a simple reduced state stream (without tagging, making sure to have initial state, nor replay)
 *
 * @param initialState The initial state of the stream
 * @param reducers The reducers that build up the stream state
 * @param {ReducedStreamOptions} options
 * @returns
 */
var reducedStream$1 = function (initialState, reducers, _a) {
    var _b = _a === void 0 ? {} : _a, errorSubject = _b.errorSubject, namespace = _b.namespace, _c = _b.action$, action$ = _c === void 0 ? action_1.action$ : _c;
    var filteredAction$ = namespace === undefined ? action$ : action$.pipe((0, operators_1$2.withNamespace)(namespace));
    var source$ = filteredAction$.pipe((0, reducer_1.combineReducers)(initialState, reducers, {
        errorSubject: errorSubject,
        namespace: namespace,
    }));
    return source$;
};
reducedStream$2.reducedStream = reducedStream$1;

Object.defineProperty(reducedStream$3, "__esModule", { value: true });
reducedStream$3.reducedStream = void 0;
var rxjs_1$1 = cjs;
var operators_1$1 = require$$2;
var reducedStream_1$1 = reducedStream$2;
/**
 * Creates reduced state stream
 *
 * This stream scans over an action stream and other streams to build up state.
 *
 * To start reducing state,  you must first subscribe to the action$
 * (connecting a component using the React HOC ```connect``` would be enough)
 *
 * The state stream is ref counted, which means that the stream
 * will reset to its `defaultState` when there are no subscribers.
 *
 * If you wish to persist the state throughout the application lifecycle,
 * you should use ```persistentReducedStream```.
 *
 * It is guaranteed that the state stream will always emit a value upon subscription.
 *
 * The values emitted from the stream are shared between the subscribers,
 * and the reducers are only ran once per input action.
 *
 * @param name The name of the stream, used for placing a spy tag
 * @param initialState The initial state of the stream
 * @param reducers The reducers that build up the stream state
 */
var reducedStream = function (name, initialState, reducers, options) {
    if (options === void 0) { options = {}; }
    return (0, reducedStream_1$1.reducedStream)(initialState, reducers, options).pipe((0, rxjs_1$1.startWith)(initialState), (0, rxjs_1$1.shareReplay)({
        refCount: true,
        bufferSize: 1,
    }), (0, operators_1$1.tag)(name));
};
reducedStream$3.reducedStream = reducedStream;

var persistentDerivedStream$1 = {};

var observableState = {};

const observable$1 = Symbol.observable || "@@observable";

function patch(arg) {
    if (!Symbol.observable) {
        if (typeof arg === "function" &&
            arg.prototype &&
            arg.prototype[Symbol.observable]) {
            arg.prototype[observable$1] = arg.prototype[Symbol.observable];
            delete arg.prototype[Symbol.observable];
        }
        else {
            arg[observable$1] = arg[Symbol.observable];
            delete arg[Symbol.observable];
        }
    }
    return arg;
}

const noop$1 = () => { };
const rethrow = (error) => {
    throw error;
};
function toObserver(observer) {
    if (observer) {
        if (observer.next && observer.error && observer.complete) {
            return observer;
        }
        return {
            complete: (observer.complete ?? noop$1).bind(observer),
            error: (observer.error ?? rethrow).bind(observer),
            next: (observer.next ?? noop$1).bind(observer),
        };
    }
    return {
        complete: noop$1,
        error: rethrow,
        next: noop$1,
    };
}

var esm = /*#__PURE__*/Object.freeze({
	__proto__: null,
	observable: observable$1,
	patch: patch,
	toObserver: toObserver
});

var require$$1 = /*@__PURE__*/getAugmentedNamespace(esm);

Object.defineProperty(observableState, "__esModule", { value: true });
observableState.ObservableState = void 0;
var rxjs_1 = cjs;
var rxjs_interop_1 = require$$1;
/**
 * ObservableState is an Observable interface for state streams.
 * At its core, ObservableState multicasts a source Observable and makes the latest value available.
 *
 * You can start the stream by calling the {@link connect | connect()} method and destory it with {@link unsubscribe | unsubscribe()}
 *
 * The latest value of the state stream can be read synchronously by accessing
 * `.state` (as long as the inner subject isn't destroyed)
 */
var ObservableState = /** @class */ (function () {
    /**
     * Create a new ObservableState.
     *
     * Will not consume `source$` until {@link connect} has been called.
     *
     * @param name The name to store for the ObservableState, used by the stateStreamRegistry and for dev tools
     * @param source$ The observable this ObservableState will get it's values from
     * @param initialState The initial value of `.state` until `source$` has emitted a value
     */
    function ObservableState(name, source$, initialState) {
        var _this = this;
        /**
         * Start consuming the source observable. In effect, this "starts the work".
         */
        this.connect = function () {
            if (_this.destroyed) {
                throw new Error('ObservableState has been destroyed');
            }
            _this.subscription = _this.source$.subscribe(_this.subject);
            // NOTE: .subscribe(this.subject) does not work
            // All tests pass with it, but in practice there are cases
            // where the subject isn't updated as expected
            // .subscribe({
            //   complete: () => this.subject.complete(),
            //   error: (err) => this.subject.error(err),
            //   next: (state) => this.subject.next(state),
            // });
        };
        /**
         * Stop reducing this state stream and unsubscribe from the source observable.
         *
         * Accessing the `.state` property or subscribing after calling this method will throw an
         * exception.
         */
        this.unsubscribe = function () {
            if (_this.subscription) {
                _this.subscription.unsubscribe();
            }
            _this.subject.unsubscribe();
        };
        this.source$ = (0, rxjs_1.from)(source$);
        this.name = name;
        this.subject = new rxjs_1.BehaviorSubject(initialState);
        this.subscribe = this.subject.subscribe.bind(this.subject);
        this.pipe = this.subject.pipe.bind(this.subject);
        // rxjs-interop/patch handles fallback from Symbol.observable to
        // "@@observable" for the cases when the user of rxbeach hasn't polyfilled
        // Symbol.observable
        (0, rxjs_interop_1.patch)(this);
    }
    /**
     * @deprecated Only for use by RxJS
     */
    ObservableState.prototype[Symbol.observable] = function () {
        return {
            subscribe: this.subscribe,
        };
    };
    Object.defineProperty(ObservableState.prototype, "state", {
        get: function () {
            return this.subject.getValue();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ObservableState.prototype, "destroyed", {
        get: function () {
            return this.subject.closed;
        },
        enumerable: false,
        configurable: true
    });
    return ObservableState;
}());
observableState.ObservableState = ObservableState;

var stateStreamRegistry = {};

var __values$1 = (commonjsGlobal && commonjsGlobal.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read$1 = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
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
};
Object.defineProperty(stateStreamRegistry, "__esModule", { value: true });
stateStreamRegistry.stateStreamRegistry = stateStreamRegistry.StateStreamRegistry = void 0;
var StateStreamRegistry = /** @class */ (function () {
    function StateStreamRegistry() {
        this.streams = new Map();
        this.started = false;
    }
    /**
     * Register a stream to this stream registry
     *
     * If the registry has already been started, the registered stream will also be
     * started.
     *
     * Before the registry has started, an error will be thrown if the stream name
     * has already been used.
     *
     * @param stream The stream to register
     */
    StateStreamRegistry.prototype.register = function (stream) {
        if (this.streams.has(stream.name)) {
            throw new Error("Duplicate stream name: ".concat(stream.name));
        }
        if (this.started) {
            stream.connect();
        }
        this.streams.set(stream.name, stream);
    };
    /**
     * Start the registered reduced state streams.
     *
     * This causes the streams to actually start reducing over the action stream.
     *
     * Streams registered after this will also be started.
     *
     * If this is called twice without `stopReducing` being called in between, an
     * error will be thrown.
     *
     * @param action$ The action stream the streams should reduce over
     * @param states States to initialize the streams with, as returned by
     *               `getStates`
     */
    StateStreamRegistry.prototype.startReducing = function () {
        var e_1, _a;
        if (this.started) {
            throw new Error('Registry has already been started!');
        }
        this.started = true;
        try {
            for (var _b = __values$1(this.streams), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read$1(_c.value, 2), stream = _d[1];
                stream.connect();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Stops all the registered reduced state streams.
     *
     * This will call `unsubscribe` on all the streams. After this, all access to
     * the `.state` properties will throw exceptions. `getStates` can not be
     * called after `stopReducing` because of this.
     */
    StateStreamRegistry.prototype.stopReducing = function () {
        var e_2, _a;
        this.started = false;
        try {
            for (var _b = __values$1(this.streams.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var stream = _c.value;
                stream.unsubscribe();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    return StateStreamRegistry;
}());
stateStreamRegistry.StateStreamRegistry = StateStreamRegistry;
stateStreamRegistry.stateStreamRegistry = new StateStreamRegistry();

Object.defineProperty(persistentDerivedStream$1, "__esModule", { value: true });
persistentDerivedStream$1.persistentDerivedStream = void 0;
var observableState_1$1 = observableState;
var stateStreamRegistry_1$1 = stateStreamRegistry;
/**
 * Make this stream a ObservableState stream of its source.
 *
 * @param name The unique name of this stream
 * @param source$ The source of this stream
 */
var persistentDerivedStream = function (name, source$, initialState) {
    var stream = new observableState_1$1.ObservableState(name, source$, initialState);
    stateStreamRegistry_1$1.stateStreamRegistry.register(stream);
    return stream;
};
persistentDerivedStream$1.persistentDerivedStream = persistentDerivedStream;

var persistentReducedStream$1 = {};

Object.defineProperty(persistentReducedStream$1, "__esModule", { value: true });
persistentReducedStream$1.persistentReducedStream = void 0;
var observableState_1 = observableState;
var stateStreamRegistry_1 = stateStreamRegistry;
var operators_1 = require$$2;
var reducedStream_1 = reducedStream$2;
/**
 * Creates and registers a persistent reduced state stream
 *
 * This stream scans over an action stream and other streams to build up state.
 * It exposes its latest value through `.state`
 *
 * To start reducing state and subscribe to the action$, you must first call
 * `.startReducing(action$)` on the stream.
 * Because the stream will be registered in the stateStreamRegistry,
 * `startReducing` will be invoked on this stream when
 * `stateStreamRegistry.startReducing(action$)` is called.
 *
 * The stream is intended to be used for persistent application state that is
 * started at application init and persisted throughout the application's lifecycle.
 *
 * ```
 * const myState$ = persistentReducedStream(
 *   'myState$',
 *   initialState,
 *   reducers
 * );
 *
 * myState$.value === initialState // Will be true
 *
 * myState$.startReducing(action$) // To start reducing
 * ```
 *
 * @param name The name of the stream, used for placing a spy tag
 * @param initialState The initial state of the stream
 * @param reducers The reducers that build up the stream state
 */
var persistentReducedStream = function (name, initialState, reducers, options) {
    if (options === void 0) { options = {}; }
    var source$ = (0, reducedStream_1.reducedStream)(initialState, reducers, options).pipe((0, operators_1.tag)(name));
    var stream = new observableState_1.ObservableState(name, source$, initialState);
    stateStreamRegistry_1.stateStreamRegistry.register(stream);
    return stream;
};
persistentReducedStream$1.persistentReducedStream = persistentReducedStream;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.stateStreamRegistry = exports.ObservableState = exports.persistentReducedStream = exports.persistentDerivedStream = exports.reducedStream = exports.derivedStream = exports.tapRoutine = exports.collectRoutines = exports.routine = exports.subscribeRoutine = exports.namespaceActionDispatcher = exports.namespaceActionCreator = exports.combineReducers = exports.reducer = exports.actionCreator = exports.dispatchAction = exports.action$ = void 0;
	var action_1 = action$;
	Object.defineProperty(exports, "action$", { enumerable: true, get: function () { return action_1.action$; } });
	Object.defineProperty(exports, "dispatchAction", { enumerable: true, get: function () { return action_1.dispatchAction; } });
	var actionCreator_1 = actionCreator$1;
	Object.defineProperty(exports, "actionCreator", { enumerable: true, get: function () { return actionCreator_1.actionCreator; } });
	var reducer_1 = reducer$1;
	Object.defineProperty(exports, "reducer", { enumerable: true, get: function () { return reducer_1.reducer; } });
	Object.defineProperty(exports, "combineReducers", { enumerable: true, get: function () { return reducer_1.combineReducers; } });
	var namespace_1 = namespace;
	Object.defineProperty(exports, "namespaceActionCreator", { enumerable: true, get: function () { return namespace_1.namespaceActionCreator; } });
	Object.defineProperty(exports, "namespaceActionDispatcher", { enumerable: true, get: function () { return namespace_1.namespaceActionDispatcher; } });
	var routines_1 = routines;
	Object.defineProperty(exports, "subscribeRoutine", { enumerable: true, get: function () { return routines_1.subscribeRoutine; } });
	Object.defineProperty(exports, "routine", { enumerable: true, get: function () { return routines_1.routine; } });
	Object.defineProperty(exports, "collectRoutines", { enumerable: true, get: function () { return routines_1.collectRoutines; } });
	Object.defineProperty(exports, "tapRoutine", { enumerable: true, get: function () { return routines_1.tapRoutine; } });
	var derivedStream_1 = derivedStream$1;
	Object.defineProperty(exports, "derivedStream", { enumerable: true, get: function () { return derivedStream_1.derivedStream; } });
	var reducedStream_1 = reducedStream$3;
	Object.defineProperty(exports, "reducedStream", { enumerable: true, get: function () { return reducedStream_1.reducedStream; } });
	var persistentDerivedStream_1 = persistentDerivedStream$1;
	Object.defineProperty(exports, "persistentDerivedStream", { enumerable: true, get: function () { return persistentDerivedStream_1.persistentDerivedStream; } });
	var persistentReducedStream_1 = persistentReducedStream$1;
	Object.defineProperty(exports, "persistentReducedStream", { enumerable: true, get: function () { return persistentReducedStream_1.persistentReducedStream; } });
	var observableState_1 = observableState;
	Object.defineProperty(exports, "ObservableState", { enumerable: true, get: function () { return observableState_1.ObservableState; } });
	var stateStreamRegistry_1 = stateStreamRegistry;
	Object.defineProperty(exports, "stateStreamRegistry", { enumerable: true, get: function () { return stateStreamRegistry_1.stateStreamRegistry; } });
	
} (dist));

function isFunction(value) {
    return typeof value === 'function';
}

function hasLift(source) {
    return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
    return function (source) {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}

var UnsubscriptionError = createErrorClass(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});

function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}

var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._finalizers = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialFinalizer = this.initialTeardown;
            if (isFunction(initialFinalizer)) {
                try {
                    initialFinalizer();
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError ? e.errors : [e];
                }
            }
            var _finalizers = this._finalizers;
            if (_finalizers) {
                this._finalizers = null;
                try {
                    for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                        var finalizer = _finalizers_1_1.value;
                        try {
                            execFinalizer(finalizer);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof UnsubscriptionError) {
                                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execFinalizer(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            arrRemove(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _finalizers = this._finalizers;
        _finalizers && arrRemove(_finalizers, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe)));
}
function execFinalizer(finalizer) {
    if (isFunction(finalizer)) {
        finalizer();
    }
    else {
        finalizer.unsubscribe();
    }
}

var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};

var timeoutProvider = {
    setTimeout: function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearTimeout: function (handle) {
        return (clearTimeout)(handle);
    },
    delegate: undefined,
};

function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function () {
        {
            throw err;
        }
    });
}

function noop() { }

function errorContext(cb) {
    {
        cb();
    }
}

var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if (isSubscription(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) ;
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) ;
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) ;
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(Subscription));
var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
}
var ConsumerObserver = (function () {
    function ConsumerObserver(partialObserver) {
        this.partialObserver = partialObserver;
    }
    ConsumerObserver.prototype.next = function (value) {
        var partialObserver = this.partialObserver;
        if (partialObserver.next) {
            try {
                partialObserver.next(value);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    ConsumerObserver.prototype.error = function (err) {
        var partialObserver = this.partialObserver;
        if (partialObserver.error) {
            try {
                partialObserver.error(err);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
        else {
            handleUnhandledError(err);
        }
    };
    ConsumerObserver.prototype.complete = function () {
        var partialObserver = this.partialObserver;
        if (partialObserver.complete) {
            try {
                partialObserver.complete();
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    return ConsumerObserver;
}());
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var partialObserver;
        if (isFunction(observerOrNext) || !observerOrNext) {
            partialObserver = {
                next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                error: error !== null && error !== void 0 ? error : undefined,
                complete: complete !== null && complete !== void 0 ? complete : undefined,
            };
        }
        else {
            var context_1;
            if (_this && config.useDeprecatedNextContext) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () { return _this.unsubscribe(); };
                partialObserver = {
                    next: observerOrNext.next && bind(observerOrNext.next, context_1),
                    error: observerOrNext.error && bind(observerOrNext.error, context_1),
                    complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
                };
            }
            else {
                partialObserver = observerOrNext;
            }
        }
        _this.destination = new ConsumerObserver(partialObserver);
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));
function handleUnhandledError(error) {
    {
        reportUnhandledError(error);
    }
}
function defaultErrorHandler(err) {
    throw err;
}
var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop,
};

var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();

function identity(x) {
    return x;
}

function pipeFromArray(fns) {
    if (fns.length === 0) {
        return identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}

var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
        errorContext(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscriber = new SafeSubscriber({
                next: function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscriber.unsubscribe();
                    }
                },
                error: reject,
                complete: resolve,
            });
            _this.subscribe(subscriber);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof Subscriber) || (isObserver(value) && isSubscription(value));
}

function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = (function (_super) {
    __extends(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this.shouldUnsubscribe = shouldUnsubscribe;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            var closed_1 = this.closed;
            _super.prototype.unsubscribe.call(this);
            !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
        }
    };
    return OperatorSubscriber;
}(Subscriber));

var Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        return this;
    };
    return Action;
}(Subscription));

var intervalProvider = {
    setInterval: function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearInterval: function (handle) {
        return (clearInterval)(handle);
    },
    delegate: undefined,
};

var AsyncAction = (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        var _a;
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
        if (delay === void 0) { delay = 0; }
        return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay != null && this.delay === delay && this.pending === false) {
            return id;
        }
        if (id != null) {
            intervalProvider.clearInterval(id);
        }
        return undefined;
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, _delay) {
        var errored = false;
        var errorValue;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = e ? e : new Error('Scheduled action threw falsy error');
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype.unsubscribe = function () {
        if (!this.closed) {
            var _a = this, id = _a.id, scheduler = _a.scheduler;
            var actions = scheduler.actions;
            this.work = this.state = this.scheduler = null;
            this.pending = false;
            arrRemove(actions, this);
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, null);
            }
            this.delay = null;
            _super.prototype.unsubscribe.call(this);
        }
    };
    return AsyncAction;
}(Action));

var dateTimestampProvider = {
    now: function () {
        return (dateTimestampProvider.delegate || Date).now();
    },
    delegate: undefined,
};

var Scheduler = (function () {
    function Scheduler(schedulerActionCtor, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.schedulerActionCtor = schedulerActionCtor;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.schedulerActionCtor(this, work).schedule(state, delay);
    };
    Scheduler.now = dateTimestampProvider.now;
    return Scheduler;
}());

var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        var _this = _super.call(this, SchedulerAction, now) || this;
        _this.actions = [];
        _this._active = false;
        return _this;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this._active) {
            actions.push(action);
            return;
        }
        var error;
        this._active = true;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions.shift()));
        this._active = false;
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler));

new AsyncScheduler(AsyncAction);

var ObjectUnsubscribedError = createErrorClass(function (_super) {
    return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = 'ObjectUnsubscribedError';
        this.message = 'object unsubscribed';
    };
});

var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.currentObservers = null;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype._throwIfClosed = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
    };
    Subject.prototype.next = function (value) {
        var _this = this;
        errorContext(function () {
            var e_1, _a;
            _this._throwIfClosed();
            if (!_this.isStopped) {
                if (!_this.currentObservers) {
                    _this.currentObservers = Array.from(_this.observers);
                }
                try {
                    for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var observer = _c.value;
                        observer.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    };
    Subject.prototype.error = function (err) {
        var _this = this;
        errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.hasError = _this.isStopped = true;
                _this.thrownError = err;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    };
    Subject.prototype.complete = function () {
        var _this = this;
        errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.isStopped = true;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = this.closed = true;
        this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject.prototype, "observed", {
        get: function () {
            var _a;
            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
    });
    Subject.prototype._trySubscribe = function (subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    };
    Subject.prototype._innerSubscribe = function (subscriber) {
        var _this = this;
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        if (hasError || isStopped) {
            return EMPTY_SUBSCRIPTION;
        }
        this.currentObservers = null;
        observers.push(subscriber);
        return new Subscription(function () {
            _this.currentObservers = null;
            arrRemove(observers, subscriber);
        });
    };
    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable));
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject.prototype.error = function (err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject.prototype.complete = function () {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject;
}(Subject));

new Observable(function (subscriber) { return subscriber.complete(); });

var NotificationKind;
(function (NotificationKind) {
    NotificationKind["NEXT"] = "N";
    NotificationKind["ERROR"] = "E";
    NotificationKind["COMPLETE"] = "C";
})(NotificationKind || (NotificationKind = {}));

createErrorClass(function (_super) {
    return function ArgumentOutOfRangeErrorImpl() {
        _super(this);
        this.name = 'ArgumentOutOfRangeError';
        this.message = 'argument out of range';
    };
});

function filter(predicate, thisArg) {
    return operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(createOperatorSubscriber(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
    });
}

createErrorClass(function (_super) { return function EmptyErrorImpl() {
    _super(this);
    this.name = 'EmptyError';
    this.message = 'no elements in sequence';
}; });

function refCount() {
    return operate(function (source, subscriber) {
        var connection = null;
        source._refCount++;
        var refCounter = createOperatorSubscriber(subscriber, undefined, undefined, undefined, function () {
            if (!source || source._refCount <= 0 || 0 < --source._refCount) {
                connection = null;
                return;
            }
            var sharedConnection = source._connection;
            var conn = connection;
            connection = null;
            if (sharedConnection && (!conn || sharedConnection === conn)) {
                sharedConnection.unsubscribe();
            }
            subscriber.unsubscribe();
        });
        source.subscribe(refCounter);
        if (!refCounter.closed) {
            connection = source.connect();
        }
    });
}

((function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subjectFactory = subjectFactory;
        _this._subject = null;
        _this._refCount = 0;
        _this._connection = null;
        if (hasLift(source)) {
            _this.lift = source.lift;
        }
        return _this;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype._teardown = function () {
        this._refCount = 0;
        var _connection = this._connection;
        this._subject = this._connection = null;
        _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
    };
    ConnectableObservable.prototype.connect = function () {
        var _this = this;
        var connection = this._connection;
        if (!connection) {
            connection = this._connection = new Subscription();
            var subject_1 = this.getSubject();
            connection.add(this.source.subscribe(createOperatorSubscriber(subject_1, undefined, function () {
                _this._teardown();
                subject_1.complete();
            }, function (err) {
                _this._teardown();
                subject_1.error(err);
            }, function () { return _this._teardown(); })));
            if (connection.closed) {
                this._connection = null;
                connection = Subscription.EMPTY;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return refCount()(this);
    };
    return ConnectableObservable;
})(Observable));

((function (_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: false,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        !subscription.closed && subscriber.next(this._value);
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
        if (hasError) {
            throw thrownError;
        }
        this._throwIfClosed();
        return _value;
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, (this._value = value));
    };
    return BehaviorSubject;
})(Subject));

((function (_super) {
    __extends(AsyncSubject, _super);
    function AsyncSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._value = null;
        _this._hasValue = false;
        _this._isComplete = false;
        return _this;
    }
    AsyncSubject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, _hasValue = _a._hasValue, _value = _a._value, thrownError = _a.thrownError, isStopped = _a.isStopped, _isComplete = _a._isComplete;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped || _isComplete) {
            _hasValue && subscriber.next(_value);
            subscriber.complete();
        }
    };
    AsyncSubject.prototype.next = function (value) {
        if (!this.isStopped) {
            this._value = value;
            this._hasValue = true;
        }
    };
    AsyncSubject.prototype.complete = function () {
        var _a = this, _hasValue = _a._hasValue, _value = _a._value, _isComplete = _a._isComplete;
        if (!_isComplete) {
            this._isComplete = true;
            _hasValue && _super.prototype.next.call(this, _value);
            _super.prototype.complete.call(this);
        }
    };
    return AsyncSubject;
})(Subject));

((function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(_bufferSize, _windowTime, _timestampProvider) {
        if (_bufferSize === void 0) { _bufferSize = Infinity; }
        if (_windowTime === void 0) { _windowTime = Infinity; }
        if (_timestampProvider === void 0) { _timestampProvider = dateTimestampProvider; }
        var _this = _super.call(this) || this;
        _this._bufferSize = _bufferSize;
        _this._windowTime = _windowTime;
        _this._timestampProvider = _timestampProvider;
        _this._buffer = [];
        _this._infiniteTimeWindow = true;
        _this._infiniteTimeWindow = _windowTime === Infinity;
        _this._bufferSize = Math.max(1, _bufferSize);
        _this._windowTime = Math.max(1, _windowTime);
        return _this;
    }
    ReplaySubject.prototype.next = function (value) {
        var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
        if (!isStopped) {
            _buffer.push(value);
            !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
        }
        this._trimBuffer();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._trimBuffer();
        var subscription = this._innerSubscribe(subscriber);
        var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
        var copy = _buffer.slice();
        for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
            subscriber.next(copy[i]);
        }
        this._checkFinalizedStatuses(subscriber);
        return subscription;
    };
    ReplaySubject.prototype._trimBuffer = function () {
        var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
        var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
        _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
        if (!_infiniteTimeWindow) {
            var now = _timestampProvider.now();
            var last = 0;
            for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
                last = i;
            }
            last && _buffer.splice(0, last + 1);
        }
    };
    return ReplaySubject;
})(Subject));

createErrorClass(function (_super) {
    return function SequenceErrorImpl(message) {
        _super(this);
        this.name = 'SequenceError';
        this.message = message;
    };
});

createErrorClass(function (_super) {
    return function NotFoundErrorImpl(message) {
        _super(this);
        this.name = 'NotFoundError';
        this.message = message;
    };
});

function tap(observerOrNext, error, complete) {
    var tapObserver = isFunction(observerOrNext) || error || complete
        ?
            { next: observerOrNext, error: error, complete: complete }
        : observerOrNext;
    return tapObserver
        ? operate(function (source, subscriber) {
            var _a;
            (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
            var isUnsub = true;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                var _a;
                (_a = tapObserver.next) === null || _a === void 0 ? void 0 : _a.call(tapObserver, value);
                subscriber.next(value);
            }, function () {
                var _a;
                isUnsub = false;
                (_a = tapObserver.complete) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                subscriber.complete();
            }, function (err) {
                var _a;
                isUnsub = false;
                (_a = tapObserver.error) === null || _a === void 0 ? void 0 : _a.call(tapObserver, err);
                subscriber.error(err);
            }, function () {
                var _a, _b;
                if (isUnsub) {
                    (_a = tapObserver.unsubscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                }
                (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
            }));
        })
        :
            identity;
}

createErrorClass(function (_super) {
    return function TimeoutErrorImpl(info) {
        if (info === void 0) { info = null; }
        _super(this);
        this.message = 'Timeout has occurred';
        this.name = 'TimeoutError';
        this.info = info;
    };
});

const log = (...args) => {
    const pre = document.querySelector("pre");
    if (!pre)
        return;
    pre.textContent += `${args.join(", ")}\n`;
};
// test
const ONE = "ONE";
const TWO = "TWO";
const test = () => {
    dist.action$.pipe(tap(({ type }) => log("before", type))).subscribe();
    dist.action$
        .pipe(filter(({ type }) => type === ONE), tap(() => dist.dispatchAction({ type: TWO, meta: {} })))
        .subscribe();
    dist.action$.pipe(tap(({ type }) => log("after", type))).subscribe();
    dist.dispatchAction({ type: ONE, meta: {} });
};
// end test
const displayCodeAndRunTest = async () => {
    try {
        const res = await fetch("./script.ts");
        const code = await res.text();
        const snippet = code.match(new RegExp(/(?<=\/\/ test).*?(?=\/\/ end test)/, "s"));
        if (snippet)
            log(snippet[0]);
        log("log test():\n");
        test();
    }
    catch (e) { }
};
displayCodeAndRunTest();
