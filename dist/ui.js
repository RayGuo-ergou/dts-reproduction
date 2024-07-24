/**
* @vue/shared v3.4.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function tn(e, t) {
  const n = new Set(e.split(","));
  return t ? (r) => n.has(r.toLowerCase()) : (r) => n.has(r);
}
const D = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, nn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Y = () => {
}, rn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), C = Object.assign, sn = Object.prototype.hasOwnProperty, E = (e, t) => sn.call(e, t), g = Array.isArray, G = (e) => ye(e) === "[object Map]", on = (e) => ye(e) === "[object Set]", N = (e) => typeof e == "function", R = (e) => typeof e == "string", se = (e) => typeof e == "symbol", S = (e) => e !== null && typeof e == "object", cn = (e) => (S(e) || N(e)) && N(e.then) && N(e.catch), ln = Object.prototype.toString, ye = (e) => ln.call(e), bt = (e) => ye(e).slice(8, -1), un = (e) => ye(e) === "[object Object]", Be = (e) => R(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, St = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, an = /-(\w)/g, Ee = St((e) => e.replace(an, (t, n) => n ? n.toUpperCase() : "")), we = St((e) => e.charAt(0).toUpperCase() + e.slice(1)), Z = (e, t) => !Object.is(e, t), fn = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
};
let it;
const vt = () => it || (it = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Je(e) {
  if (g(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], s = R(r) ? _n(r) : Je(r);
      if (s)
        for (const o in s)
          t[o] = s[o];
    }
    return t;
  } else if (R(e) || S(e))
    return e;
}
const pn = /;(?![^(]*\))/g, dn = /:([^]+)/, hn = /\/\*[^]*?\*\//g;
function _n(e) {
  const t = {};
  return e.replace(hn, "").split(pn).forEach((n) => {
    if (n) {
      const r = n.split(dn);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function qe(e) {
  let t = "";
  if (R(e))
    t = e;
  else if (g(e))
    for (let n = 0; n < e.length; n++) {
      const r = qe(e[n]);
      r && (t += r + " ");
    }
  else if (S(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
/**
* @vue/reactivity v3.4.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function ne(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let gn;
function mn(e, t = gn) {
  t && t.active && t.effects.push(e);
}
let ee;
class En {
  constructor(t, n, r, s) {
    this.fn = t, this.trigger = n, this.scheduler = r, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, mn(this, s);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, xe();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (wn(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), Ve();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = U, n = ee;
    try {
      return U = !0, ee = this, this._runnings++, ct(this), this.fn();
    } finally {
      lt(this), this._runnings--, ee = n, U = t;
    }
  }
  stop() {
    this.active && (ct(this), lt(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function wn(e) {
  return e.value;
}
function ct(e) {
  e._trackId++, e._depsLength = 0;
}
function lt(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      yt(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function yt(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let U = !0, Ae = 0;
const xt = [];
function xe() {
  xt.push(U), U = !1;
}
function Ve() {
  const e = xt.pop();
  U = e === void 0 ? !0 : e;
}
function Ye() {
  Ae++;
}
function Ge() {
  for (Ae--; !Ae && Fe.length; )
    Fe.shift()();
}
function Nn(e, t, n) {
  var r;
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const s = e.deps[e._depsLength];
    s !== t ? (s && yt(s, e), e.deps[e._depsLength++] = t) : e._depsLength++, process.env.NODE_ENV !== "production" && ((r = e.onTrack) == null || r.call(e, C({ effect: e }, n)));
  }
}
const Fe = [];
function On(e, t, n) {
  var r;
  Ye();
  for (const s of e.keys()) {
    let o;
    s._dirtyLevel < t && (o ?? (o = e.get(s) === s._trackId)) && (s._shouldSchedule || (s._shouldSchedule = s._dirtyLevel === 0), s._dirtyLevel = t), s._shouldSchedule && (o ?? (o = e.get(s) === s._trackId)) && (process.env.NODE_ENV !== "production" && ((r = s.onTrigger) == null || r.call(s, C({ effect: s }, n))), s.trigger(), (!s._runnings || s.allowRecurse) && s._dirtyLevel !== 2 && (s._shouldSchedule = !1, s.scheduler && Fe.push(s.scheduler)));
  }
  Ge();
}
const bn = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, je = /* @__PURE__ */ new WeakMap(), W = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Le = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
function O(e, t, n) {
  if (U && ee) {
    let r = je.get(e);
    r || je.set(e, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || r.set(n, s = bn(() => r.delete(n))), Nn(
      ee,
      s,
      process.env.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n
      } : void 0
    );
  }
}
function A(e, t, n, r, s, o) {
  const i = je.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && g(e)) {
    const u = Number(r);
    i.forEach((a, h) => {
      (h === "length" || !se(h) && h >= u) && c.push(a);
    });
  } else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        g(e) ? Be(n) && c.push(i.get("length")) : (c.push(i.get(W)), G(e) && c.push(i.get(Le)));
        break;
      case "delete":
        g(e) || (c.push(i.get(W)), G(e) && c.push(i.get(Le)));
        break;
      case "set":
        G(e) && c.push(i.get(W));
        break;
    }
  Ye();
  for (const u of c)
    u && On(
      u,
      4,
      process.env.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n,
        newValue: r,
        oldValue: s,
        oldTarget: o
      } : void 0
    );
  Ge();
}
const Sn = /* @__PURE__ */ tn("__proto__,__v_isRef,__isVue"), Vt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(se)
), ut = /* @__PURE__ */ vn();
function vn() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = p(this);
      for (let o = 0, i = this.length; o < i; o++)
        O(r, "get", o + "");
      const s = r[t](...n);
      return s === -1 || s === !1 ? r[t](...n.map(p)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      xe(), Ye();
      const r = p(this)[t].apply(this, n);
      return Ge(), Ve(), r;
    };
  }), e;
}
function yn(e) {
  se(e) || (e = String(e));
  const t = p(this);
  return O(t, "has", e), t.hasOwnProperty(e);
}
class Rt {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    const s = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !s;
    if (n === "__v_isReadonly")
      return s;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return r === (s ? o ? $t : Pt : o ? jn : Dt).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = g(t);
    if (!s) {
      if (i && E(ut, n))
        return Reflect.get(ut, n, r);
      if (n === "hasOwnProperty")
        return yn;
    }
    const c = Reflect.get(t, n, r);
    return (se(n) ? Vt.has(n) : Sn(n)) || (s || O(t, "get", n), o) ? c : y(c) ? i && Be(n) ? c : c.value : S(c) ? s ? Mt(c) : Tt(c) : c;
  }
}
class xn extends Rt {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, s) {
    let o = t[n];
    if (!this._isShallow) {
      const u = j(o);
      if (!F(r) && !j(r) && (o = p(o), r = p(r)), !g(t) && y(o) && !y(r))
        return u ? !1 : (o.value = r, !0);
    }
    const i = g(t) && Be(n) ? Number(n) < t.length : E(t, n), c = Reflect.set(t, n, r, s);
    return t === p(s) && (i ? Z(r, o) && A(t, "set", n, r, o) : A(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = E(t, n), s = t[n], o = Reflect.deleteProperty(t, n);
    return o && r && A(t, "delete", n, void 0, s), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!se(n) || !Vt.has(n)) && O(t, "has", n), r;
  }
  ownKeys(t) {
    return O(
      t,
      "iterate",
      g(t) ? "length" : W
    ), Reflect.ownKeys(t);
  }
}
class Ct extends Rt {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && ne(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && ne(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Vn = /* @__PURE__ */ new xn(), Rn = /* @__PURE__ */ new Ct(), Cn = /* @__PURE__ */ new Ct(!0), Qe = (e) => e, Re = (e) => Reflect.getPrototypeOf(e);
function ce(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = p(e), o = p(t);
  n || (Z(t, o) && O(s, "get", t), O(s, "get", o));
  const { has: i } = Re(s), c = r ? Qe : n ? et : ke;
  if (i.call(s, t))
    return c(e.get(t));
  if (i.call(s, o))
    return c(e.get(o));
  e !== s && e.get(t);
}
function le(e, t = !1) {
  const n = this.__v_raw, r = p(n), s = p(e);
  return t || (Z(e, s) && O(r, "has", e), O(r, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s);
}
function ue(e, t = !1) {
  return e = e.__v_raw, !t && O(p(e), "iterate", W), Reflect.get(e, "size", e);
}
function at(e, t = !1) {
  !t && !F(e) && !j(e) && (e = p(e));
  const n = p(this);
  return Re(n).has.call(n, e) || (n.add(e), A(n, "add", e, e)), this;
}
function ft(e, t, n = !1) {
  !n && !F(t) && !j(t) && (t = p(t));
  const r = p(this), { has: s, get: o } = Re(r);
  let i = s.call(r, e);
  i ? process.env.NODE_ENV !== "production" && It(r, s, e) : (e = p(e), i = s.call(r, e));
  const c = o.call(r, e);
  return r.set(e, t), i ? Z(t, c) && A(r, "set", e, t, c) : A(r, "add", e, t), this;
}
function pt(e) {
  const t = p(this), { has: n, get: r } = Re(t);
  let s = n.call(t, e);
  s ? process.env.NODE_ENV !== "production" && It(t, n, e) : (e = p(e), s = n.call(t, e));
  const o = r ? r.call(t, e) : void 0, i = t.delete(e);
  return s && A(t, "delete", e, void 0, o), i;
}
function dt() {
  const e = p(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? G(e) ? new Map(e) : new Set(e) : void 0, r = e.clear();
  return t && A(e, "clear", void 0, void 0, n), r;
}
function ae(e, t) {
  return function(r, s) {
    const o = this, i = o.__v_raw, c = p(i), u = t ? Qe : e ? et : ke;
    return !e && O(c, "iterate", W), i.forEach((a, h) => r.call(s, u(a), u(h), o));
  };
}
function fe(e, t, n) {
  return function(...r) {
    const s = this.__v_raw, o = p(s), i = G(o), c = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, a = s[e](...r), h = n ? Qe : t ? et : ke;
    return !t && O(
      o,
      "iterate",
      u ? Le : W
    ), {
      // iterator protocol
      next() {
        const { value: l, done: f } = a.next();
        return f ? { value: l, done: f } : {
          value: c ? [h(l[0]), h(l[1])] : h(l),
          done: f
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function $(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      ne(
        `${we(e)} operation ${n}failed: target is readonly.`,
        p(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function In() {
  const e = {
    get(o) {
      return ce(this, o);
    },
    get size() {
      return ue(this);
    },
    has: le,
    add: at,
    set: ft,
    delete: pt,
    clear: dt,
    forEach: ae(!1, !1)
  }, t = {
    get(o) {
      return ce(this, o, !1, !0);
    },
    get size() {
      return ue(this);
    },
    has: le,
    add(o) {
      return at.call(this, o, !0);
    },
    set(o, i) {
      return ft.call(this, o, i, !0);
    },
    delete: pt,
    clear: dt,
    forEach: ae(!1, !0)
  }, n = {
    get(o) {
      return ce(this, o, !0);
    },
    get size() {
      return ue(this, !0);
    },
    has(o) {
      return le.call(this, o, !0);
    },
    add: $("add"),
    set: $("set"),
    delete: $("delete"),
    clear: $("clear"),
    forEach: ae(!0, !1)
  }, r = {
    get(o) {
      return ce(this, o, !0, !0);
    },
    get size() {
      return ue(this, !0);
    },
    has(o) {
      return le.call(this, o, !0);
    },
    add: $("add"),
    set: $("set"),
    delete: $("delete"),
    clear: $("clear"),
    forEach: ae(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    e[o] = fe(o, !1, !1), n[o] = fe(o, !0, !1), t[o] = fe(o, !1, !0), r[o] = fe(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    r
  ];
}
const [
  Dn,
  Pn,
  $n,
  Tn
] = /* @__PURE__ */ In();
function Xe(e, t) {
  const n = t ? e ? Tn : $n : e ? Pn : Dn;
  return (r, s, o) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(
    E(n, s) && s in r ? n : r,
    s,
    o
  );
}
const Mn = {
  get: /* @__PURE__ */ Xe(!1, !1)
}, An = {
  get: /* @__PURE__ */ Xe(!0, !1)
}, Fn = {
  get: /* @__PURE__ */ Xe(!0, !0)
};
function It(e, t, n) {
  const r = p(n);
  if (r !== n && t.call(e, r)) {
    const s = bt(e);
    ne(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Dt = /* @__PURE__ */ new WeakMap(), jn = /* @__PURE__ */ new WeakMap(), Pt = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ new WeakMap();
function Ln(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Hn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ln(bt(e));
}
function Tt(e) {
  return j(e) ? e : Ze(
    e,
    !1,
    Vn,
    Mn,
    Dt
  );
}
function Mt(e) {
  return Ze(
    e,
    !0,
    Rn,
    An,
    Pt
  );
}
function pe(e) {
  return Ze(
    e,
    !0,
    Cn,
    Fn,
    $t
  );
}
function Ze(e, t, n, r, s) {
  if (!S(e))
    return process.env.NODE_ENV !== "production" && ne(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = s.get(e);
  if (o)
    return o;
  const i = Hn(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? r : n
  );
  return s.set(e, c), c;
}
function Q(e) {
  return j(e) ? Q(e.__v_raw) : !!(e && e.__v_isReactive);
}
function j(e) {
  return !!(e && e.__v_isReadonly);
}
function F(e) {
  return !!(e && e.__v_isShallow);
}
function He(e) {
  return e ? !!e.__v_raw : !1;
}
function p(e) {
  const t = e && e.__v_raw;
  return t ? p(t) : e;
}
function Kn(e) {
  return Object.isExtensible(e) && fn(e, "__v_skip", !0), e;
}
const ke = (e) => S(e) ? Tt(e) : e, et = (e) => S(e) ? Mt(e) : e;
function y(e) {
  return !!(e && e.__v_isRef === !0);
}
function zn(e) {
  return y(e) ? e.value : e;
}
const Un = {
  get: (e, t, n) => zn(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return y(s) && !y(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Wn(e) {
  return Q(e) ? e : new Proxy(e, Un);
}
/**
* @vue/runtime-core v3.4.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const B = [];
function Bn(e) {
  B.push(e);
}
function Jn() {
  B.pop();
}
let Pe = !1;
function _(e, ...t) {
  if (Pe) return;
  Pe = !0, xe();
  const n = B.length ? B[B.length - 1].component : null, r = n && n.appContext.config.warnHandler, s = qn();
  if (r)
    J(
      r,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((o) => {
          var i, c;
          return (c = (i = o.toString) == null ? void 0 : i.call(o)) != null ? c : JSON.stringify(o);
        }).join(""),
        n && n.proxy,
        s.map(
          ({ vnode: o }) => `at <${Zt(n, o.type)}>`
        ).join(`
`),
        s
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    s.length && o.push(`
`, ...Yn(s)), console.warn(...o);
  }
  Ve(), Pe = !1;
}
function qn() {
  let e = B[B.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function Yn(e) {
  const t = [];
  return e.forEach((n, r) => {
    t.push(...r === 0 ? [] : [`
`], ...Gn(n));
  }), t;
}
function Gn({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, s = ` at <${Zt(
    e.component,
    e.type,
    r
  )}`, o = ">" + n;
  return e.props ? [s, ...Qn(e.props), o] : [s + o];
}
function Qn(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((r) => {
    t.push(...At(r, e[r]));
  }), n.length > 3 && t.push(" ..."), t;
}
function At(e, t, n) {
  return R(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : y(t) ? (t = At(e, p(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : N(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = p(t), n ? t : [`${e}=`, t]);
}
const Ft = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update"
};
function J(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (s) {
    tt(s, t, n);
  }
}
function _e(e, t, n, r) {
  if (N(e)) {
    const s = J(e, t, n, r);
    return s && cn(s) && s.catch((o) => {
      tt(o, t, n);
    }), s;
  }
  if (g(e)) {
    const s = [];
    for (let o = 0; o < e.length; o++)
      s.push(_e(e[o], t, n, r));
    return s;
  } else process.env.NODE_ENV !== "production" && _(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function tt(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? Ft[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; o; ) {
      const a = o.ec;
      if (a) {
        for (let h = 0; h < a.length; h++)
          if (a[h](e, i, c) === !1)
            return;
      }
      o = o.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      xe(), J(
        u,
        null,
        10,
        [e, i, c]
      ), Ve();
      return;
    }
  }
  Xn(e, n, s, r);
}
function Xn(e, t, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const s = Ft[t];
    if (n && Bn(n), _(`Unhandled error${s ? ` during execution of ${s}` : ""}`), n && Jn(), r)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let Ne = !1, Ke = !1;
const x = [];
let M = 0;
const X = [];
let T = null, K = 0;
const jt = /* @__PURE__ */ Promise.resolve();
let nt = null;
const Zn = 100;
function kn(e) {
  const t = nt || jt;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function er(e) {
  let t = M + 1, n = x.length;
  for (; t < n; ) {
    const r = t + n >>> 1, s = x[r], o = re(s);
    o < e || o === e && s.pre ? t = r + 1 : n = r;
  }
  return t;
}
function rt(e) {
  (!x.length || !x.includes(
    e,
    Ne && e.allowRecurse ? M + 1 : M
  )) && (e.id == null ? x.push(e) : x.splice(er(e.id), 0, e), Lt());
}
function Lt() {
  !Ne && !Ke && (Ke = !0, nt = jt.then(Kt));
}
function Ht(e) {
  g(e) ? X.push(...e) : (!T || !T.includes(
    e,
    e.allowRecurse ? K + 1 : K
  )) && X.push(e), Lt();
}
function tr(e) {
  if (X.length) {
    const t = [...new Set(X)].sort(
      (n, r) => re(n) - re(r)
    );
    if (X.length = 0, T) {
      T.push(...t);
      return;
    }
    for (T = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), K = 0; K < T.length; K++) {
      const n = T[K];
      process.env.NODE_ENV !== "production" && zt(e, n) || n.active !== !1 && n();
    }
    T = null, K = 0;
  }
}
const re = (e) => e.id == null ? 1 / 0 : e.id, nr = (e, t) => {
  const n = re(e) - re(t);
  if (n === 0) {
    if (e.pre && !t.pre) return -1;
    if (t.pre && !e.pre) return 1;
  }
  return n;
};
function Kt(e) {
  Ke = !1, Ne = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), x.sort(nr);
  const t = process.env.NODE_ENV !== "production" ? (n) => zt(e, n) : Y;
  try {
    for (M = 0; M < x.length; M++) {
      const n = x[M];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        J(
          n,
          n.i,
          n.i ? 15 : 14
        );
      }
    }
  } finally {
    M = 0, x.length = 0, tr(e), Ne = !1, nt = null, (x.length || X.length) && Kt(e);
  }
}
function zt(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Zn) {
      const r = t.i, s = r && ot(r.type);
      return tt(
        `Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
const $e = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (vt().__VUE_HMR_RUNTIME__ = {
  createRecord: Te(rr),
  rerender: Te(sr),
  reload: Te(or)
});
const Oe = /* @__PURE__ */ new Map();
function rr(e, t) {
  return Oe.has(e) ? !1 : (Oe.set(e, {
    initialDef: be(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function be(e) {
  return kt(e) ? e.__vccOpts : e;
}
function sr(e, t) {
  const n = Oe.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((r) => {
    t && (r.render = t, be(r.type).render = t), r.renderCache = [], r.effect.dirty = !0, r.update();
  }));
}
function or(e, t) {
  const n = Oe.get(e);
  if (!n) return;
  t = be(t), ht(n.initialDef, t);
  const r = [...n.instances];
  for (let s = 0; s < r.length; s++) {
    const o = r[s], i = be(o.type);
    let c = $e.get(i);
    c || (i !== n.initialDef && ht(i, t), $e.set(i, c = /* @__PURE__ */ new Set())), c.add(o), o.appContext.propsCache.delete(o.type), o.appContext.emitsCache.delete(o.type), o.appContext.optionsCache.delete(o.type), o.ceReload ? (c.add(o), o.ceReload(t.styles), c.delete(o)) : o.parent ? (o.parent.effect.dirty = !0, rt(() => {
      o.parent.update(), c.delete(o);
    })) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  Ht(() => {
    $e.clear();
  });
}
function ht(e, t) {
  C(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Te(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (r) {
      console.error(r), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let q, de = [];
function Ut(e, t) {
  var n, r;
  q = e, q ? (q.enabled = !0, de.forEach(({ event: s, args: o }) => q.emit(s, ...o)), de = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((r = (n = window.navigator) == null ? void 0 : n.userAgent) != null && r.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((o) => {
    Ut(o, t);
  }), setTimeout(() => {
    q || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, de = []);
  }, 3e3)) : de = [];
}
let P = null, ir = null;
function Wt(e, t) {
  e.shapeFlag & 6 && e.component ? Wt(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
const ze = "components";
function cr(e, t) {
  return ur(ze, e, !0, t) || e;
}
const lr = Symbol.for("v-ndc");
function ur(e, t, n = !0, r = !1) {
  const s = oe;
  if (s) {
    const o = s.type;
    if (e === ze) {
      const c = ot(
        o,
        !1
      );
      if (c && (c === t || c === Ee(t) || c === we(Ee(t))))
        return o;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      _t(s[e] || o[e], t) || // global registration
      _t(s.appContext[e], t)
    );
    if (!i && r)
      return o;
    if (process.env.NODE_ENV !== "production" && n && !i) {
      const c = e === ze ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      _(`Failed to resolve ${e.slice(0, -1)}: ${t}${c}`);
    }
    return i;
  } else process.env.NODE_ENV !== "production" && _(
    `resolve${we(e.slice(0, -1))} can only be used in render() or setup().`
  );
}
function _t(e, t) {
  return e && (e[t] || e[Ee(t)] || e[we(Ee(t))]);
}
const Ue = (e) => e ? Lr(e) ? Hr(e) : Ue(e.parent) : null, te = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ C(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? pe(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? pe(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? pe(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? pe(e.refs) : e.refs,
    $parent: (e) => Ue(e.parent),
    $root: (e) => Ue(e.root),
    $emit: (e) => e.emit,
    $options: (e) => pr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, rt(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = kn.bind(e.proxy)),
    $watch: (e) => br.bind(e)
  })
), ar = (e) => e === "_" || e === "$", Me = (e, t) => e !== D && !e.__isScriptSetup && E(e, t), fr = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: s, props: o, accessCache: i, type: c, appContext: u } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let a;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return r[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (Me(r, t))
          return i[t] = 1, r[t];
        if (s !== D && E(s, t))
          return i[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (a = e.propsOptions[0]) && E(a, t)
        )
          return i[t] = 3, o[t];
        if (n !== D && E(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const h = te[t];
    let l, f;
    if (h)
      return t === "$attrs" ? (O(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && O(e, "get", t), h(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== D && E(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      f = u.config.globalProperties, E(f, t)
    )
      return f[t];
    process.env.NODE_ENV !== "production" && P && (!R(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== D && ar(t[0]) && E(s, t) ? _(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === P && _(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: s, ctx: o } = e;
    return Me(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && E(s, t) ? (_(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : r !== D && E(r, t) ? (r[t] = n, !0) : E(e.props, t) ? (process.env.NODE_ENV !== "production" && _(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && _(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: o }
  }, i) {
    let c;
    return !!n[i] || e !== D && E(e, i) || Me(t, i) || (c = o[0]) && E(c, i) || E(r, i) || E(te, i) || E(s.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : E(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (fr.ownKeys = (e) => (_(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function gt(e) {
  return g(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function pr(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: s,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let u;
  return c ? u = c : !s.length && !n && !r ? u = t : (u = {}, s.length && s.forEach(
    (a) => Se(u, a, i, !0)
  ), Se(u, t, i)), S(t) && o.set(t, u), u;
}
function Se(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && Se(e, o, n, !0), s && s.forEach(
    (i) => Se(e, i, n, !0)
  );
  for (const i in t)
    if (r && i === "expose")
      process.env.NODE_ENV !== "production" && _(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = dr[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const dr = {
  data: mt,
  props: wt,
  emits: wt,
  // objects
  methods: k,
  computed: k,
  // lifecycle
  beforeCreate: b,
  created: b,
  beforeMount: b,
  mounted: b,
  beforeUpdate: b,
  updated: b,
  beforeDestroy: b,
  beforeUnmount: b,
  destroyed: b,
  unmounted: b,
  activated: b,
  deactivated: b,
  errorCaptured: b,
  serverPrefetch: b,
  // assets
  components: k,
  directives: k,
  // watch
  watch: _r,
  // provide / inject
  provide: mt,
  inject: hr
};
function mt(e, t) {
  return t ? e ? function() {
    return C(
      N(e) ? e.call(this, this) : e,
      N(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function hr(e, t) {
  return k(Et(e), Et(t));
}
function Et(e) {
  if (g(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function b(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function k(e, t) {
  return e ? C(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function wt(e, t) {
  return e ? g(e) && g(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : C(
    /* @__PURE__ */ Object.create(null),
    gt(e),
    gt(t ?? {})
  ) : t;
}
function _r(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = C(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = b(e[r], t[r]);
  return n;
}
let Nt = null;
function gr(e, t, n = !1) {
  const r = oe || P;
  if (r || Nt) {
    const s = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : Nt._context.provides;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && N(t) ? t.call(r && r.proxy) : t;
    process.env.NODE_ENV !== "production" && _(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && _("inject() can only be used inside setup() or functional components.");
}
const mr = {}, Bt = (e) => Object.getPrototypeOf(e) === mr, Er = (e) => e.__isTeleport, Ot = yr, wr = Symbol.for("v-scx"), Nr = () => {
  {
    const e = gr(wr);
    return e || process.env.NODE_ENV !== "production" && _(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
}, he = {};
function Or(e, t, {
  immediate: n,
  deep: r,
  flush: s,
  once: o,
  onTrack: i,
  onTrigger: c
} = D) {
  if (t && o) {
    const d = t;
    t = (...De) => {
      d(...De), Ie();
    };
  }
  process.env.NODE_ENV !== "production" && r !== void 0 && typeof r == "number" && _(
    'watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.'
  ), process.env.NODE_ENV !== "production" && !t && (n !== void 0 && _(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && _(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && _(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const u = (d) => {
    _(
      "Invalid watch source: ",
      d,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, a = oe, h = (d) => r === !0 ? d : (
    // for deep: false, only traverse root-level properties
    z(d, r === !1 ? 1 : void 0)
  );
  let l, f = !1, m = !1;
  if (y(e) ? (l = () => e.value, f = F(e)) : Q(e) ? (l = () => h(e), f = !0) : g(e) ? (m = !0, f = e.some((d) => Q(d) || F(d)), l = () => e.map((d) => {
    if (y(d))
      return d.value;
    if (Q(d))
      return h(d);
    if (N(d))
      return J(d, a, 2);
    process.env.NODE_ENV !== "production" && u(d);
  })) : N(e) ? t ? l = () => J(e, a, 2) : l = () => (w && w(), _e(
    e,
    a,
    3,
    [I]
  )) : (l = Y, process.env.NODE_ENV !== "production" && u(e)), t && r) {
    const d = l;
    l = () => z(d());
  }
  let w, I = (d) => {
    w = v.onStop = () => {
      J(d, a, 4), w = v.onStop = void 0;
    };
  }, Ce;
  if (Xt)
    if (I = Y, t ? n && _e(t, a, 3, [
      l(),
      m ? [] : void 0,
      I
    ]) : l(), s === "sync") {
      const d = Nr();
      Ce = d.__watcherHandles || (d.__watcherHandles = []);
    } else
      return Y;
  let L = m ? new Array(e.length).fill(he) : he;
  const H = () => {
    if (!(!v.active || !v.dirty))
      if (t) {
        const d = v.run();
        (r || f || (m ? d.some((De, en) => Z(De, L[en])) : Z(d, L))) && (w && w(), _e(t, a, 3, [
          d,
          // pass undefined as the old value when it's changed for the first time
          L === he ? void 0 : m && L[0] === he ? [] : L,
          I
        ]), L = d);
      } else
        v.run();
  };
  H.allowRecurse = !!t;
  let ie;
  s === "sync" ? ie = H : s === "post" ? ie = () => Ot(H, a && a.suspense) : (H.pre = !0, a && (H.id = a.uid), ie = () => rt(H));
  const v = new En(l, Y, ie), Ie = () => {
    v.stop();
  };
  return process.env.NODE_ENV !== "production" && (v.onTrack = i, v.onTrigger = c), t ? n ? H() : L = v.run() : s === "post" ? Ot(
    v.run.bind(v),
    a && a.suspense
  ) : v.run(), Ce && Ce.push(Ie), Ie;
}
function br(e, t, n) {
  const r = this.proxy, s = R(e) ? e.includes(".") ? Sr(r, e) : () => r[e] : e.bind(r, r);
  let o;
  N(t) ? o = t : (o = t.handler, n = t);
  const i = jr(this), c = Or(s, o.bind(r), n);
  return i(), c;
}
function Sr(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++)
      r = r[n[s]];
    return r;
  };
}
function z(e, t = 1 / 0, n) {
  if (t <= 0 || !S(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, y(e))
    z(e.value, t, n);
  else if (g(e))
    for (let r = 0; r < e.length; r++)
      z(e[r], t, n);
  else if (on(e) || G(e))
    e.forEach((r) => {
      z(r, t, n);
    });
  else if (un(e)) {
    for (const r in e)
      z(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && z(e[r], t, n);
  }
  return e;
}
const vr = (e) => e.__isSuspense;
function yr(e, t) {
  t && t.pendingBranch ? g(e) ? t.effects.push(...e) : t.effects.push(e) : Ht(e);
}
const Jt = Symbol.for("v-fgt"), xr = Symbol.for("v-txt"), Vr = Symbol.for("v-cmt"), ge = [];
let V = null;
function Rr(e = !1) {
  ge.push(V = e ? null : []);
}
function Cr() {
  ge.pop(), V = ge[ge.length - 1] || null;
}
function Ir(e) {
  return e.dynamicChildren = V || nn, Cr(), V && V.push(e), e;
}
function Dr(e, t, n, r, s) {
  return Ir(
    Yt(
      e,
      t,
      n,
      r,
      s,
      !0
    )
  );
}
function Pr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const $r = (...e) => Gt(
  ...e
), qt = ({ key: e }) => e ?? null, me = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? R(e) || y(e) || N(e) ? { i: P, r: e, k: t, f: !!n } : e : null);
function Tr(e, t = null, n = null, r = 0, s = null, o = e === Jt ? 0 : 1, i = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && qt(t),
    ref: t && me(t),
    scopeId: ir,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: P
  };
  return c ? (st(u, n), o & 128 && e.normalize(u)) : n && (u.shapeFlag |= R(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && _("VNode created with invalid key (NaN). VNode type:", u.type), // avoid a block node from tracking itself
  !i && // has current parent block
  V && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && V.push(u), u;
}
const Yt = process.env.NODE_ENV !== "production" ? $r : Gt;
function Gt(e, t = null, n = null, r = 0, s = null, o = !1) {
  if ((!e || e === lr) && (process.env.NODE_ENV !== "production" && !e && _(`Invalid vnode type when creating vnode: ${e}.`), e = Vr), Pr(e)) {
    const c = ve(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && st(c, n), !o && V && (c.shapeFlag & 6 ? V[V.indexOf(e)] = c : V.push(c)), c.patchFlag = -2, c;
  }
  if (kt(e) && (e = e.__vccOpts), t) {
    t = Mr(t);
    let { class: c, style: u } = t;
    c && !R(c) && (t.class = qe(c)), S(u) && (He(u) && !g(u) && (u = C({}, u)), t.style = Je(u));
  }
  const i = R(e) ? 1 : vr(e) ? 128 : Er(e) ? 64 : S(e) ? 4 : N(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && He(e) && (e = p(e), _(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Tr(
    e,
    t,
    n,
    r,
    s,
    i,
    o,
    !0
  );
}
function Mr(e) {
  return e ? He(e) || Bt(e) ? C({}, e) : e : null;
}
function ve(e, t, n = !1, r = !1) {
  const { props: s, ref: o, patchFlag: i, children: c, transition: u } = e, a = t ? Fr(s || {}, t) : s, h = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && qt(a),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? g(o) ? o.concat(me(t)) : [o, me(t)] : me(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && g(c) ? c.map(Qt) : c,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Jt ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: u,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ve(e.ssContent),
    ssFallback: e.ssFallback && ve(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && r && Wt(
    h,
    u.clone(h)
  ), h;
}
function Qt(e) {
  const t = ve(e);
  return g(e.children) && (t.children = e.children.map(Qt)), t;
}
function Ar(e = " ", t = 0) {
  return Yt(xr, null, e, t);
}
function st(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (g(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), st(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !Bt(t) ? t._ctx = P : s === 3 && P && (P.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else N(t) ? (t = { default: t, _ctx: P }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Ar(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Fr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = qe([t.class, r.class]));
      else if (s === "style")
        t.style = Je([t.style, r.style]);
      else if (rn(s)) {
        const o = t[s], i = r[s];
        i && o !== i && !(g(o) && o.includes(i)) && (t[s] = o ? [].concat(o, i) : i);
      } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
let oe = null, We;
{
  const e = vt(), t = (n, r) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(r), (o) => {
      s.length > 1 ? s.forEach((i) => i(o)) : s[0](o);
    };
  };
  We = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => oe = n
  ), t(
    "__VUE_SSR_SETTERS__",
    (n) => Xt = n
  );
}
const jr = (e) => {
  const t = oe;
  return We(e), e.scope.on(), () => {
    e.scope.off(), We(t);
  };
};
function Lr(e) {
  return e.vnode.shapeFlag & 4;
}
let Xt = !1;
process.env.NODE_ENV;
function Hr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Wn(Kn(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in te)
        return te[n](e);
    },
    has(t, n) {
      return n in t || n in te;
    }
  })) : e.proxy;
}
const Kr = /(?:^|[-_])(\w)/g, zr = (e) => e.replace(Kr, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function ot(e, t = !0) {
  return N(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Zt(e, t, n = !1) {
  let r = ot(t);
  if (!r && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (r = s[1]);
  }
  if (!r && e && e.parent) {
    const s = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    r = s(
      e.components || e.parent.type.components
    ) || s(e.appContext.components);
  }
  return r ? zr(r) : n ? "App" : "Anonymous";
}
function kt(e) {
  return N(e) && "__vccOpts" in e;
}
function Ur() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, r = { style: "color:#eb2f96" }, s = {
    __vue_custom_formatter: !0,
    header(l) {
      return S(l) ? l.__isVue ? ["div", e, "VueInstance"] : y(l) ? [
        "div",
        {},
        ["span", e, h(l)],
        "<",
        c(l.value),
        ">"
      ] : Q(l) ? [
        "div",
        {},
        ["span", e, F(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${j(l) ? " (readonly)" : ""}`
      ] : j(l) ? [
        "div",
        {},
        ["span", e, F(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const f = [];
    l.type.props && l.props && f.push(i("props", p(l.props))), l.setupState !== D && f.push(i("setup", l.setupState)), l.data !== D && f.push(i("data", p(l.data)));
    const m = u(l, "computed");
    m && f.push(i("computed", m));
    const w = u(l, "inject");
    return w && f.push(i("injected", w)), f.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), f;
  }
  function i(l, f) {
    return f = C({}, f), Object.keys(f).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(f).map((m) => [
          "div",
          {},
          ["span", r, m + ": "],
          c(f[m], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, f = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", r, l] : S(l) ? ["object", { object: f ? p(l) : l }] : ["span", n, String(l)];
  }
  function u(l, f) {
    const m = l.type;
    if (N(m))
      return;
    const w = {};
    for (const I in l.ctx)
      a(m, I, f) && (w[I] = l.ctx[I]);
    return w;
  }
  function a(l, f, m) {
    const w = l[m];
    if (g(w) && w.includes(f) || S(w) && f in w || l.extends && a(l.extends, f, m) || l.mixins && l.mixins.some((I) => a(I, f, m)))
      return !0;
  }
  function h(l) {
    return F(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
process.env.NODE_ENV;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* vue v3.4.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Wr() {
  Ur();
}
process.env.NODE_ENV !== "production" && Wr();
const Br = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, s] of t)
    n[r] = s;
  return n;
}, Jr = {};
function qr(e, t) {
  const n = cr("Button", !0);
  return Rr(), Dr(n);
}
const Yr = /* @__PURE__ */ Br(Jr, [["render", qr]]);
export {
  Yr as Button
};
