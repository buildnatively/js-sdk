function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
export class Natively {
  constructor() {
    _defineProperty(this, "isDebug", void 0);
    _defineProperty(this, "min_app_version", void 0);
    _defineProperty(this, "app_version", void 0);
    _defineProperty(this, "injected", void 0);
    _defineProperty(this, "observers", void 0);
    _defineProperty(this, "isIOSApp", void 0);
    _defineProperty(this, "isAndroidApp", void 0);
  }
}
export class NativelyInfo {}

// Add all your other class declarations here
export class NativelyClipboard {}

// Continue with all other class declarations...