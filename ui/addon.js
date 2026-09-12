var Ws = Object.defineProperty;
var bi = (e) => {
  throw TypeError(e);
};
var Js = (e, t, n) => t in e ? Ws(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Re = (e, t, n) => Js(e, typeof t != "symbol" ? t + "" : t, n), Rr = (e, t, n) => t.has(e) || bi("Cannot " + n);
var o = (e, t, n) => (Rr(e, t, "read from private field"), n ? n.call(e) : t.get(e)), A = (e, t, n) => t.has(e) ? bi("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), k = (e, t, n, r) => (Rr(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), O = (e, t, n) => (Rr(e, t, "access private method"), n);
const ae = Symbol("uninitialized"), Qs = "http://www.w3.org/1999/xhtml", Bi = !1;
var Hi = Array.isArray, Xs = Array.prototype.indexOf, ur = Array.prototype.includes, yr = Array.from, Ui = Object.defineProperty, Mn = Object.getOwnPropertyDescriptor, Zs = Object.getOwnPropertyDescriptors, ea = Object.prototype, ta = Array.prototype, Vi = Object.getPrototypeOf, mi = Object.isExtensible;
const na = () => {
};
function ra(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function qi() {
  var e, t, n = new Promise((r, i) => {
    e = r, t = i;
  });
  return { promise: n, resolve: e, reject: t };
}
function ia(e, t) {
  if (Array.isArray(e))
    return e;
  if (!(Symbol.iterator in e))
    return Array.from(e);
  const n = [];
  for (const r of e)
    if (n.push(r), n.length === t) break;
  return n;
}
const fe = 2, In = 4, wr = 8, $i = 1 << 24, We = 16, Ve = 32, gt = 64, zr = 128, Zr = 256, Ue = 512, le = 1024, re = 2048, Qe = 4096, Ee = 8192, Pe = 16384, _n = 32768, jr = 1 << 25, cn = 65536, cr = 1 << 17, sa = 1 << 18, pn = 1 << 19, aa = 1 << 20, st = 1 << 25, Ht = 65536, dr = 1 << 21, nn = 1 << 22, kt = 1 << 23, Cr = Symbol("$state"), Ki = Symbol("component"), la = Symbol(""), rr = Symbol("attributes"), Br = Symbol("class"), oa = Symbol("style"), xn = Symbol("text"), ir = Symbol("form reset"), Bn = new class extends Error {
  constructor() {
    super(...arguments);
    Re(this, "name", "StaleReactionError");
    Re(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
function fa() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function ua() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Yi(e) {
  return e === this.v;
}
function ca(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Gi(e) {
  return !ca(e, this.v);
}
function da() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function va(e, t, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function ha(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function _a() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function pa(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function ga() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ba() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function ma() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function ya() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function wa() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
let xa = !1, Ae = null;
function dn(e) {
  Ae = e;
}
function xr(e, t = !1, n) {
  Ae = {
    p: Ae,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      N
    ),
    l: null
  };
}
function Er(e) {
  var t = (
    /** @type {ComponentContext} */
    Ae
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      hs(r);
  }
  return t.i = !0, Ae = t.p, Wi(e);
}
function Wi(e = {}) {
  return Ui(e, Ki, { value: !0 }), e;
}
function Ji() {
  return !0;
}
let Ot = [];
function Qi() {
  var e = Ot;
  Ot = [], ra(e);
}
function Et(e) {
  if (Ot.length === 0 && !Cn) {
    var t = Ot;
    queueMicrotask(() => {
      t === Ot && Qi();
    });
  }
  Ot.push(e);
}
function Ea() {
  for (; Ot.length > 0; )
    Qi();
}
const ka = -7169;
function Z(e, t) {
  e.f = e.f & ka | t;
}
function ei(e) {
  (e.f & Ue) !== 0 || e.deps === null ? Z(e, le) : Z(e, Qe);
}
function Xi(e) {
  if (e !== null)
    for (const t of e)
      (t.f & fe) === 0 || (t.f & Ht) === 0 || (t.f ^= Ht, Xi(
        /** @type {Derived} */
        t.deps
      ));
}
function Zi(e, t, n) {
  (e.f & re) !== 0 ? t.add(e) : (e.f & Qe) !== 0 && n.add(e), Xi(e.deps), Z(e, le);
}
let yi = !1;
function Sa() {
  yi || (yi = !0, document.addEventListener(
    "reset",
    (e) => {
      Promise.resolve().then(() => {
        var t;
        if (!e.defaultPrevented)
          for (
            const n of
            /**@type {HTMLFormElement} */
            e.target.elements
          )
            (t = n[ir]) == null || t.call(n);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function Hn(e) {
  var t = C, n = N;
  qe(null), ft(null);
  try {
    return e();
  } finally {
    qe(t), ft(n);
  }
}
function Ta(e, t, n, r = n) {
  e.addEventListener(t, () => Hn(n));
  const i = (
    /** @type {any} */
    e[ir]
  );
  i ? e[ir] = () => {
    i(), r(!0);
  } : e[ir] = () => r(!0), Sa();
}
function Aa(e, t, n, r) {
  const i = ti;
  var s = e.filter((h) => !h.settled), a = t.map(i);
  if (n.length === 0 && s.length === 0) {
    r(a);
    return;
  }
  var f = (
    /** @type {Effect} */
    N
  ), u = Ma(), c = s.length === 1 ? s[0].promise : s.length > 1 ? Promise.all(s.map((h) => h.promise)) : null;
  function v(h) {
    if ((f.f & Pe) === 0) {
      u();
      try {
        r([...a, ...h]);
      } catch (b) {
        it(b, f);
      }
      vr();
    }
  }
  var p = es();
  if (n.length === 0) {
    c.then(() => v([])).finally(p);
    return;
  }
  function d() {
    Promise.all(n.map((h) => /* @__PURE__ */ Ra(h))).then(v).catch((h) => it(h, f)).finally(p);
  }
  c ? c.then(() => {
    u(), d(), vr();
  }) : d();
}
function Ma() {
  var e = (
    /** @type {Effect} */
    N
  ), t = C, n = Ae, r = (
    /** @type {Batch} */
    w
  );
  return function(s = !0) {
    ft(e), qe(t), dn(n), s && (e.f & Pe) === 0 && (r == null || r.activate(), r == null || r.apply());
  };
}
function vr(e = !0) {
  ft(null), qe(null), dn(null), e && (w == null || w.deactivate());
}
function es() {
  var e = (
    /** @type {Effect} */
    N
  ), t = e.b, n = (
    /** @type {Batch} */
    w
  ), r = !!(t != null && t.is_rendered());
  return t == null || t.update_pending_count(1, n), n.increment(r, e), () => {
    t == null || t.update_pending_count(-1, n), n.decrement(r, e);
  };
}
// @__NO_SIDE_EFFECTS__
function ti(e) {
  var t = fe | re;
  return N !== null && (N.f |= pn), {
    ctx: Ae,
    deps: null,
    effects: null,
    equals: Yi,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      ae
    ),
    wv: 0,
    parent: N,
    ac: null
  };
}
const En = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function Ra(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    N
  );
  r === null && da();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = Vt(
    /** @type {V} */
    ae
  ), a = !C, f = /* @__PURE__ */ new Set();
  return Ya(() => {
    var h, b;
    var u = (
      /** @type {Effect} */
      N
    ), c = qi();
    i = c.promise;
    try {
      Promise.resolve(e()).then(c.resolve, (m) => {
        m !== Bn && c.reject(m);
      }).finally(vr);
    } catch (m) {
      c.reject(m), vr();
    }
    var v = (
      /** @type {Batch} */
      w
    );
    if (a) {
      if ((u.f & _n) !== 0)
        var p = es();
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        (h = r.b) != null && h.is_rendered()
      )
        (b = v.async_deriveds.get(u)) == null || b.reject(En);
      else
        for (const m of f.values())
          m.reject(En);
      f.add(c), v.async_deriveds.set(u, c);
    }
    const d = (m, g = void 0) => {
      p == null || p(), f.delete(c), g !== En && (v.activate(), g ? (s.f |= kt, vn(s, g)) : ((s.f & kt) !== 0 && (s.f ^= kt), vn(s, m)), v.deactivate());
    };
    c.promise.then(d, (m) => d(null, m || "unknown"));
  }), $a(() => {
    for (const u of f)
      u.reject(En);
  }), new Promise((u) => {
    function c(v) {
      function p() {
        v === i ? u(s) : c(i);
      }
      v.then(p, p);
    }
    c(i);
  });
}
// @__NO_SIDE_EFFECTS__
function Ce(e) {
  const t = /* @__PURE__ */ ti(e);
  return ys(t), t;
}
// @__NO_SIDE_EFFECTS__
function Ca(e) {
  const t = /* @__PURE__ */ ti(e);
  return t.equals = Gi, t;
}
function Oa(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      Me(
        /** @type {Effect} */
        t[n]
      );
  }
}
function ni(e) {
  var t, n = N, r = e.parent;
  if (!St && r !== null && e.v !== ae && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (Pe | Ee)) !== 0)
    return fa(), e.v;
  ft(r);
  try {
    e.f &= ~Ht, Oa(e), t = ks(e);
  } finally {
    ft(n);
  }
  return t;
}
function ts(e) {
  var t = ni(e);
  if (!e.equals(t) && (e.wv = xs(), (!(w != null && w.is_fork) || e.deps === null) && (w !== null ? (w.capture(e, t, !0), Rn == null || Rn.capture(e, t, !0)) : e.v = t, e.deps === null))) {
    Z(e, le);
    return;
  }
  St || (de !== null ? (si() || w != null && w.is_fork) && de.set(e, t) : ei(e));
}
function Ia(e) {
  var t;
  if (e.effects !== null)
    for (const n of e.effects)
      (n.teardown || n.ac) && ((t = n.teardown) == null || t.call(n), n.ac !== null && Hn(() => {
        n.ac.abort(Bn), n.ac = null;
      }), n.fn !== null && (n.teardown = na), Dn(n, 0), li(n));
}
function ns(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && t.fn !== null && hn(t);
}
let Or = null, Jt = null, w = null, Rn = null, de = null, Hr = null, Cn = !1, Ir = !1, Xt = null, sr = null;
var wi = 0;
let Na = 1;
var rn, wt, Dt, sn, an, ln, vt, on, Se, Pn, ht, Ye, tt, fn, Pt, B, Ur, kn, Vr, rs, is, Qt, Da, Sn;
const gr = class gr {
  constructor() {
    A(this, B);
    Re(this, "id", Na++);
    /** True as soon as `#process` was called */
    A(this, rn, !1);
    Re(this, "linked", !0);
    /** @type {Batch | null} */
    A(this, wt, null);
    /** @type {Batch | null} */
    A(this, Dt, null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    Re(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    Re(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    Re(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    A(this, sn, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    A(this, an, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    A(this, ln, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    A(this, vt, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    A(this, on, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    A(this, Se, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    A(this, Pn, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    A(this, ht, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    A(this, Ye, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    A(this, tt, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    A(this, fn, /* @__PURE__ */ new Set());
    Re(this, "is_fork", !1);
    A(this, Pt, !1);
    Jt === null ? Or = Jt = this : (k(Jt, Dt, this), k(this, wt, Jt)), Jt = this;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    o(this, tt).has(t) || o(this, tt).set(t, { d: [], m: [] }), o(this, fn).delete(t);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(t, n = (r) => this.schedule(r)) {
    var r = o(this, tt).get(t);
    if (r) {
      o(this, tt).delete(t);
      for (var i of r.d)
        Z(i, re), n(i);
      for (i of r.m)
        Z(i, Qe), n(i);
    }
    o(this, fn).add(t);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(t, n, r = !1) {
    t.v !== ae && !this.previous.has(t) && this.previous.set(t, t.v), (t.f & kt) === 0 && (this.current.set(t, [n, r]), de == null || de.set(t, n)), this.is_fork || (t.v = n);
  }
  activate() {
    w = this;
  }
  deactivate() {
    w = null, de = null;
  }
  flush() {
    try {
      Ir = !0, w = this, O(this, B, kn).call(this);
    } finally {
      wi = 0, Hr = null, Xt = null, sr = null, Ir = !1, w = null, de = null, lt.clear();
    }
  }
  discard() {
    var t;
    for (const n of o(this, an)) n(this);
    o(this, an).clear();
    for (const n of this.async_deriveds.values())
      n.reject(En);
    O(this, B, Sn).call(this), (t = o(this, on)) == null || t.resolve();
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(t) {
    o(this, Pn).push(t);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(t, n) {
    if (k(this, ln, o(this, ln) + 1), t) {
      let r = o(this, vt).get(n) ?? 0;
      o(this, vt).set(n, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(t, n) {
    if (k(this, ln, o(this, ln) - 1), t) {
      let r = o(this, vt).get(n) ?? 0;
      r === 1 ? o(this, vt).delete(n) : o(this, vt).set(n, r - 1);
    }
    o(this, Pt) || (k(this, Pt, !0), Et(() => {
      k(this, Pt, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(t, n) {
    for (const r of t)
      o(this, ht).add(r);
    for (const r of n)
      o(this, Ye).add(r);
    t.clear(), n.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(t) {
    o(this, sn).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    o(this, an).add(t);
  }
  settled() {
    return (o(this, on) ?? k(this, on, qi())).promise;
  }
  static ensure() {
    if (w === null) {
      const t = w = new gr();
      !Ir && !Cn && Et(() => {
        o(t, rn) || t.flush();
      });
    }
    return w;
  }
  apply() {
    {
      de = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(t) {
    var i;
    if (Hr = t, (i = t.b) != null && i.is_pending && (t.f & (In | wr | $i)) !== 0 && (t.f & _n) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var n = t; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (Xt !== null && n === N && (C === null || (C.f & fe) === 0))
        return;
      if ((r & (gt | Ve)) !== 0) {
        if ((r & le) === 0)
          return;
        n.f ^= le;
      }
    }
    o(this, Se).push(n);
  }
};
rn = new WeakMap(), wt = new WeakMap(), Dt = new WeakMap(), sn = new WeakMap(), an = new WeakMap(), ln = new WeakMap(), vt = new WeakMap(), on = new WeakMap(), Se = new WeakMap(), Pn = new WeakMap(), ht = new WeakMap(), Ye = new WeakMap(), tt = new WeakMap(), fn = new WeakMap(), Pt = new WeakMap(), B = new WeakSet(), Ur = function() {
  if (this.is_fork) return !0;
  for (const r of o(this, vt).keys()) {
    for (var t = r, n = !1; t.parent !== null; ) {
      if (o(this, tt).has(t)) {
        n = !0;
        break;
      }
      t = t.parent;
    }
    if (!n)
      return !0;
  }
  return !1;
}, kn = function() {
  var u, c, v, p;
  k(this, rn, !0), wi++ > 1e3 && (O(this, B, Sn).call(this), Fa());
  for (const d of o(this, ht))
    o(this, Ye).delete(d), Z(d, re), this.schedule(d);
  for (const d of o(this, Ye))
    Z(d, Qe), this.schedule(d);
  const t = o(this, Se);
  k(this, Se, []), this.apply();
  var n = Xt = [], r = [], i = sr = [];
  for (const d of t)
    try {
      O(this, B, Vr).call(this, d, n, r);
    } catch (h) {
      throw ls(d), O(this, B, Ur).call(this) || this.discard(), h;
    }
  if (w = null, i.length > 0) {
    var s = gr.ensure();
    for (const d of i)
      s.schedule(d);
  }
  if (Xt = null, sr = null, O(this, B, Ur).call(this)) {
    O(this, B, Qt).call(this, r), O(this, B, Qt).call(this, n);
    for (const [d, h] of o(this, tt))
      as(d, h);
    i.length > 0 && /** @type {unknown} */
    O(u = w, B, kn).call(u);
    return;
  }
  const a = O(this, B, rs).call(this);
  if (a) {
    O(this, B, Qt).call(this, r), O(this, B, Qt).call(this, n), O(c = a, B, is).call(c, this);
    return;
  }
  o(this, ht).clear(), o(this, Ye).clear();
  for (const d of o(this, sn)) d(this);
  o(this, sn).clear(), Rn = this, xi(r), xi(n), Rn = null, (v = o(this, on)) == null || v.resolve();
  var f = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    w
  );
  if (o(this, ln) === 0 && (o(this, Se).length === 0 || f !== null) && O(this, B, Sn).call(this), o(this, Se).length > 0)
    if (f !== null) {
      const d = f;
      o(d, Se).push(...o(this, Se).filter((h) => !o(d, Se).includes(h)));
    } else
      f = this;
  f !== null && (lt.clear(), O(p = f, B, kn).call(p));
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
Vr = function(t, n, r) {
  t.f ^= le;
  for (var i = t.first; i !== null; ) {
    var s = i.f, a = (s & (Ve | gt)) !== 0, f = a && (s & le) !== 0, u = f || (s & Ee) !== 0 || o(this, tt).has(i);
    if (!u && i.fn !== null) {
      a ? i.f ^= le : (s & In) !== 0 ? n.push(i) : Vn(i) && ((s & We) !== 0 && o(this, Ye).add(i), hn(i));
      var c = i.first;
      if (c !== null) {
        i = c;
        continue;
      }
    }
    for (; i !== null; ) {
      var v = i.next;
      if (v !== null) {
        i = v;
        break;
      }
      i = i.parent;
    }
  }
}, rs = function() {
  for (var t = o(this, wt); t !== null; ) {
    if (!t.is_fork) {
      for (const [n, [, r]] of this.current)
        if (t.current.has(n) && !r)
          return t;
    }
    t = o(t, wt);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
is = function(t) {
  var r;
  for (const [i, s] of t.current)
    !this.previous.has(i) && t.previous.has(i) && this.previous.set(i, t.previous.get(i)), this.current.set(i, s);
  for (const [i, s] of t.async_deriveds) {
    const a = this.async_deriveds.get(i);
    a && s.promise.then(a.resolve).catch(a.reject);
  }
  t.async_deriveds.clear(), this.transfer_effects(o(t, ht), o(t, Ye));
  const n = (i) => {
    var s = i.reactions;
    if (s !== null && !((i.f & fe) !== 0 && (i.f & (re | Qe)) === 0))
      for (const u of s) {
        var a = u.f;
        if ((a & fe) !== 0)
          n(
            /** @type {Derived} */
            u
          );
        else {
          var f = (
            /** @type {Effect} */
            u
          );
          a & (nn | We) && !this.async_deriveds.has(f) && (o(this, Ye).delete(f), Z(f, re), this.schedule(f));
        }
      }
  };
  for (const i of this.current.keys())
    n(i);
  this.oncommit(() => t.discard()), O(r = t, B, Sn).call(r), w = this, O(this, B, kn).call(this);
}, /**
 * @param {Effect[]} effects
 */
Qt = function(t) {
  for (var n = 0; n < t.length; n += 1)
    Zi(t[n], o(this, ht), o(this, Ye));
}, Da = function() {
  var p;
  for (let d = Or; d !== null; d = o(d, Dt)) {
    var t = d.id < this.id, n = [];
    for (const [h, [b, m]] of this.current) {
      if (d.current.has(h)) {
        var r = (
          /** @type {[any, boolean]} */
          d.current.get(h)[0]
        );
        if (t && b !== r)
          d.current.set(h, [b, m]);
        else
          continue;
      }
      n.push(h);
    }
    if (t)
      for (const [h, b] of this.async_deriveds) {
        const m = d.async_deriveds.get(h);
        m && b.promise.then(m.resolve).catch(m.reject);
      }
    var i = [...d.current.keys()].filter(
      (h) => !/** @type {[any, boolean]} */
      d.current.get(h)[1]
    );
    if (!(!o(d, rn) || i.length === 0)) {
      var s = i.filter((h) => !this.current.has(h));
      if (s.length === 0)
        t && d.discard();
      else if (n.length > 0) {
        if (t)
          for (const h of o(this, fn))
            d.unskip_effect(h, (b) => {
              var m;
              (b.f & (We | nn)) !== 0 ? d.schedule(b) : O(m = d, B, Qt).call(m, [b]);
            });
        d.activate();
        var a = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Map();
        for (var u of n)
          ss(u, s, a, f);
        f = /* @__PURE__ */ new Map();
        var c = [...d.current].filter(([h, b]) => {
          const m = this.current.get(h);
          return m ? m[0] !== b[0] || m[1] !== b[1] : !0;
        }).map(([h]) => h);
        if (c.length > 0)
          for (const h of o(this, Pn))
            (h.f & (Pe | Ee | cr)) === 0 && ri(h, c, f) && ((h.f & (nn | We)) !== 0 ? (Z(h, re), d.schedule(h)) : o(d, ht).add(h));
        if (o(d, Se).length > 0 && !o(d, Pt)) {
          d.apply();
          for (var v of o(d, Se))
            O(p = d, B, Vr).call(p, v, [], []);
          k(d, Se, []);
        }
        d.deactivate();
      }
    }
  }
}, Sn = function() {
  if (this.linked) {
    var t = o(this, wt), n = o(this, Dt);
    t === null ? Or = n : k(t, Dt, n), n === null ? Jt = t : k(n, wt, t), this.linked = !1;
  }
};
let Ut = gr;
function Pa(e) {
  var t = Cn;
  Cn = !0;
  try {
    for (var n; ; ) {
      if (Ea(), w === null)
        return (
          /** @type {T} */
          n
        );
      w.flush();
    }
  } finally {
    Cn = t;
  }
}
function Fa() {
  try {
    ga();
  } catch (e) {
    it(e, Hr);
  }
}
let Ke = null;
function xi(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (Pe | Ee)) === 0 && Vn(r) && (Ke = /* @__PURE__ */ new Set(), hn(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && gs(r), (Ke == null ? void 0 : Ke.size) > 0)) {
        lt.clear();
        for (const i of Ke) {
          if ((i.f & (Pe | Ee)) !== 0) continue;
          const s = [i];
          let a = i.parent;
          for (; a !== null; )
            Ke.has(a) && (Ke.delete(a), s.push(a)), a = a.parent;
          for (let f = s.length - 1; f >= 0; f--) {
            const u = s[f];
            (u.f & (Pe | Ee)) === 0 && hn(u);
          }
        }
        Ke.clear();
      }
    }
    Ke = null;
  }
}
function ss(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const i of e.reactions) {
      const s = i.f;
      (s & fe) !== 0 ? ss(
        /** @type {Derived} */
        i,
        t,
        n,
        r
      ) : (s & (nn | We)) !== 0 && (s & re) === 0 && ri(i, t, r) && (Z(i, re), ii(
        /** @type {Effect} */
        i
      ));
    }
}
function ri(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const i of e.deps) {
      if (ur.call(t, i))
        return !0;
      if ((i.f & fe) !== 0 && ri(
        /** @type {Derived} */
        i,
        t,
        n
      ))
        return n.set(
          /** @type {Derived} */
          i,
          !0
        ), !0;
    }
  return n.set(e, !1), !1;
}
function ii(e) {
  w.schedule(e);
}
function as(e, t) {
  if (!((e.f & Ve) !== 0 && (e.f & le) !== 0)) {
    (e.f & re) !== 0 ? t.d.push(e) : (e.f & Qe) !== 0 && t.m.push(e), Z(e, le);
    for (var n = e.first; n !== null; )
      as(n, t), n = n.next;
  }
}
function ls(e) {
  Z(e, le);
  for (var t = e.first; t !== null; )
    ls(t), t = t.next;
}
let hr = /* @__PURE__ */ new Set();
const lt = /* @__PURE__ */ new Map();
let os = !1;
function Vt(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Yi,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function $(e, t) {
  const n = Vt(e);
  return ys(n), n;
}
// @__NO_SIDE_EFFECTS__
function La(e, t = !1, n = !0) {
  const r = Vt(e);
  return t || (r.equals = Gi), r;
}
function T(e, t, n = !1) {
  C !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Je || (C.f & cr) !== 0) && Ji() && (C.f & (fe | We | nn | cr)) !== 0 && (ot === null || !ot.has(e)) && ya();
  let r = n ? at(t) : t;
  return vn(e, r, sr);
}
function vn(e, t, n = null) {
  if (!e.equals(t)) {
    St ? lt.set(e, t) : lt.has(e) || lt.set(e, e.v);
    var r = Ut.ensure();
    if (r.capture(e, t), (e.f & fe) !== 0) {
      const i = (
        /** @type {Derived} */
        e
      );
      (e.f & re) !== 0 && ni(i), de === null && ei(i);
    }
    e.wv = xs(), fs(e, re, n), N !== null && (N.f & le) !== 0 && (N.f & (Ve | gt)) === 0 && (ze === null ? Ja([e]) : ze.push(e)), !r.is_fork && hr.size > 0 && !os && za();
  }
  return t;
}
function za() {
  os = !1;
  for (const e of hr) {
    (e.f & le) !== 0 && Z(e, Qe);
    let t;
    try {
      t = Vn(e);
    } catch {
      t = !0;
    }
    t && hn(e);
  }
  hr.clear();
}
function On(e) {
  T(e, e.v + 1);
}
function fs(e, t, n) {
  var r = e.reactions;
  if (r !== null)
    for (var i = r.length, s = 0; s < i; s++) {
      var a = r[s], f = a.f, u = (f & re) === 0;
      if (u && Z(a, t), (f & cr) !== 0)
        hr.add(
          /** @type {Effect} */
          a
        );
      else if ((f & fe) !== 0) {
        var c = (
          /** @type {Derived} */
          a
        );
        de == null || de.delete(c), (f & Ht) === 0 && (f & Ue && (N === null || (N.f & dr) === 0) && (a.f |= Ht), fs(c, Qe, n));
      } else if (u) {
        var v = (
          /** @type {Effect} */
          a
        );
        (f & We) !== 0 && Ke !== null && Ke.add(v), n !== null ? n.push(v) : ii(v);
      }
    }
}
function at(e) {
  if (typeof e != "object" || e === null || Cr in e || Ki in e)
    return e;
  const t = Vi(e);
  if (t !== ea && t !== ta)
    return e;
  var n = /* @__PURE__ */ new Map(), r = Hi(e), i = /* @__PURE__ */ $(0), s = Bt, a = (f) => {
    if (Bt === s)
      return f();
    var u = C, c = Bt;
    qe(null), Si(s);
    var v = f();
    return qe(u), Si(c), v;
  };
  return r && n.set("length", /* @__PURE__ */ $(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(f, u, c) {
        (!("value" in c) || c.configurable === !1 || c.enumerable === !1 || c.writable === !1) && ba();
        var v = n.get(u);
        return v === void 0 ? a(() => {
          var p = /* @__PURE__ */ $(c.value);
          return n.set(u, p), p;
        }) : T(v, c.value, !0), !0;
      },
      deleteProperty(f, u) {
        var c = n.get(u);
        if (c === void 0) {
          if (u in f) {
            const v = a(() => /* @__PURE__ */ $(ae));
            n.set(u, v), On(i);
          }
        } else
          T(c, ae), On(i);
        return !0;
      },
      get(f, u, c) {
        var h;
        if (u === Cr)
          return e;
        var v = n.get(u), p = u in f;
        if (v === void 0 && (!p || (h = Mn(f, u)) != null && h.writable) && (v = a(() => {
          var b = at(p ? f[u] : ae), m = /* @__PURE__ */ $(b);
          return m;
        }), n.set(u, v)), v !== void 0) {
          var d = l(v);
          return d === ae ? void 0 : d;
        }
        return Reflect.get(f, u, c);
      },
      getOwnPropertyDescriptor(f, u) {
        var c = Reflect.getOwnPropertyDescriptor(f, u);
        if (c && "value" in c) {
          var v = n.get(u);
          v && (c.value = l(v));
        } else if (c === void 0) {
          var p = n.get(u), d = p == null ? void 0 : p.v;
          if (p !== void 0 && d !== ae)
            return {
              enumerable: !0,
              configurable: !0,
              value: d,
              writable: !0
            };
        }
        return c;
      },
      has(f, u) {
        var d;
        if (u === Cr)
          return !0;
        var c = n.get(u), v = c !== void 0 && c.v !== ae || Reflect.has(f, u);
        if (c !== void 0 || N !== null && (!v || (d = Mn(f, u)) != null && d.writable)) {
          c === void 0 && (c = a(() => {
            var h = v ? at(f[u]) : ae, b = /* @__PURE__ */ $(h);
            return b;
          }), n.set(u, c));
          var p = l(c);
          if (p === ae)
            return !1;
        }
        return v;
      },
      set(f, u, c, v) {
        var P;
        var p = n.get(u), d = u in f;
        if (r && u === "length")
          for (var h = c; h < /** @type {Source<number>} */
          p.v; h += 1) {
            var b = n.get(h + "");
            b !== void 0 ? T(b, ae) : h in f && (b = a(() => /* @__PURE__ */ $(ae)), n.set(h + "", b));
          }
        if (p === void 0)
          (!d || (P = Mn(f, u)) != null && P.writable) && (p = a(() => /* @__PURE__ */ $(void 0)), T(p, at(c)), n.set(u, p));
        else {
          d = p.v !== ae;
          var m = a(() => at(c));
          T(p, m);
        }
        var g = Reflect.getOwnPropertyDescriptor(f, u);
        if (g != null && g.set && g.set.call(v, c), !d) {
          if (r && typeof u == "string") {
            var x = (
              /** @type {Source<number>} */
              n.get("length")
            ), G = Number(u);
            Number.isInteger(G) && G >= x.v && T(x, G + 1);
          }
          On(i);
        }
        return !0;
      },
      ownKeys(f) {
        l(i);
        var u = Reflect.ownKeys(f).filter((p) => {
          var d = n.get(p);
          return d === void 0 || d.v !== ae;
        });
        for (var [c, v] of n)
          v.v !== ae && !(c in f) && u.push(c);
        return u;
      },
      setPrototypeOf() {
        ma();
      }
    }
  );
}
var Ei, us, cs, ds;
function ja() {
  if (Ei === void 0) {
    Ei = window, us = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    cs = Mn(t, "firstChild").get, ds = Mn(t, "nextSibling").get, mi(e) && (e[Br] = void 0, e[rr] = null, e[oa] = void 0, e.__e = void 0), mi(n) && (n[xn] = void 0);
  }
}
function pt(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Nn(e) {
  return (
    /** @type {TemplateNode | null} */
    cs.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function Un(e) {
  return (
    /** @type {TemplateNode | null} */
    ds.call(e)
  );
}
function R(e, t) {
  return /* @__PURE__ */ Nn(e);
}
function ar(e, t = !1) {
  {
    var n = /* @__PURE__ */ Nn(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Un(n) : n;
  }
}
function J(e, t = !1) {
  return /* @__PURE__ */ Nn(e);
}
function y(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Un(r);
  return r;
}
function Ba(e) {
  e.textContent = "";
}
function vs() {
  return !1;
}
function Ha(e, t, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    n ? document.createElement(e, { is: n }) : document.createElement(e)
  );
}
function Ua(e) {
  var t = N;
  if (t === null)
    return C.f |= kt, e;
  if ((t.f & _n) === 0 && (t.f & In) === 0)
    throw e;
  it(e, t);
}
function it(e, t) {
  if (!(t !== null && (t.f & Pe) !== 0)) {
    for (; t !== null; ) {
      if ((t.f & zr) !== 0 && (t.f & (Pe | jr)) === 0) {
        if ((t.f & _n) === 0)
          throw e;
        try {
          t.b.error(e);
          return;
        } catch (n) {
          e = n;
        }
      }
      t = t.parent;
    }
    throw e;
  }
}
function Va(e) {
  N === null && (C === null && pa(), _a()), St && ha();
}
function qa(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Tt(e, t) {
  var n = N;
  n !== null && (n.f & Ee) !== 0 && (e |= Ee);
  var r = {
    ctx: Ae,
    deps: null,
    nodes: null,
    f: e | re | Ue,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: n,
    b: n && n.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  w == null || w.register_created_effect(r);
  var i = r;
  if ((e & In) !== 0)
    Xt !== null ? Xt.push(r) : Ut.ensure().schedule(r);
  else if (t !== null) {
    try {
      hn(r);
    } catch (a) {
      throw Me(r), a;
    }
    i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
    (i.f & pn) === 0 && (i = i.first, (e & We) !== 0 && (e & cn) !== 0 && i !== null && (i.f |= cn));
  }
  if (i !== null && (i.parent = n, n !== null && qa(i, n), C !== null && (C.f & fe) !== 0 && (e & gt) === 0)) {
    var s = (
      /** @type {Derived} */
      C
    );
    (s.effects ?? (s.effects = [])).push(i);
  }
  return r;
}
function si() {
  return C !== null && !Je;
}
function $a(e) {
  const t = Tt(wr, null);
  return Z(t, le), t.teardown = e, t;
}
function lr(e) {
  Va();
  var t = (
    /** @type {Effect} */
    N.f
  ), n = !C && (t & Ve) !== 0 && Ae !== null && !Ae.i;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      Ae
    );
    (r.e ?? (r.e = [])).push(e);
  } else
    return hs(e);
}
function hs(e) {
  return Tt(In | aa, e);
}
function Ka(e) {
  Ut.ensure();
  const t = Tt(gt | pn, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? jt(t, () => {
      Me(t), r(void 0);
    }) : (Me(t), r(void 0));
  });
}
function Ya(e) {
  return Tt(nn | pn, e);
}
function _s(e, t = 0) {
  return Tt(wr | t, e);
}
function j(e, t = [], n = [], r = []) {
  Aa(r, t, n, (i) => {
    Tt(wr, () => {
      e(...i.map(l));
    });
  });
}
function ai(e, t = 0) {
  var n = Tt(We | t, e);
  return n;
}
function He(e) {
  return Tt(Ve | pn, e);
}
function ps(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = St, r = C;
    ki(!0), qe(null);
    try {
      t.call(null);
    } catch (i) {
      it(i, e.parent);
    } finally {
      ki(n), qe(r);
    }
  }
}
function li(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const i = n.ac;
    i !== null && Hn(() => {
      i.abort(Bn);
    });
    var r = n.next;
    (n.f & gt) !== 0 ? n.parent = null : Me(n, t), n = r;
  }
}
function Ga(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & Ve) === 0 && Me(t), t = n;
  }
}
function Me(e, t = !0) {
  var n = !1;
  (t || (e.f & sa) !== 0) && e.nodes !== null && e.nodes.end !== null && (Wa(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), e.f |= jr, li(e, t && !n), Dn(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const s of r)
      s.stop();
  ps(e), e.f ^= jr, e.f |= Pe;
  var i = e.parent;
  i !== null && i.first !== null && gs(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Wa(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ Un(e);
    e.remove(), e = n;
  }
}
function gs(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function jt(e, t, n = !0) {
  var r = [];
  e.f |= Zr, bs(e, r, !0);
  var i = () => {
    n && Me(e), t && t();
  }, s = r.length;
  if (s > 0) {
    var a = () => --s || i();
    for (var f of r)
      f.out(a);
  } else
    i();
}
function bs(e, t, n) {
  if ((e.f & Ee) === 0) {
    e.f ^= Ee;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const f of r)
        (f.is_global || n) && t.push(f);
    for (var i = e.first; i !== null; ) {
      var s = i.next;
      if ((i.f & gt) === 0) {
        var a = (i.f & cn) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (i.f & Ve) !== 0 && (e.f & We) !== 0;
        bs(i, t, a ? n : !1);
      }
      i = s;
    }
  }
}
function _r(e) {
  e.f &= ~Zr, ms(e, !0);
}
function ms(e, t) {
  if ((e.f & Zr) === 0 && (e.f & Ee) !== 0) {
    e.f ^= Ee, (e.f & le) === 0 && (Z(e, re), Ut.ensure().schedule(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, i = (n.f & cn) !== 0 || (n.f & Ve) !== 0;
      ms(n, i ? t : !1), n = r;
    }
    var s = e.nodes && e.nodes.t;
    if (s !== null)
      for (const a of s)
        (a.is_global || t) && a.in();
  }
}
function oi(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var i = n === r ? null : /* @__PURE__ */ Un(n);
      t.append(n), n = i;
    }
}
let or = !1, St = !1;
function ki(e) {
  St = e;
}
let C = null, Je = !1;
function qe(e) {
  C = e;
}
let N = null;
function ft(e) {
  N = e;
}
let ot = null;
function ys(e) {
  C !== null && (ot ?? (ot = /* @__PURE__ */ new Set())).add(e);
}
let Te = null, De = 0, ze = null;
function Ja(e) {
  ze = e;
}
let ws = 1, It = 0, Bt = It;
function Si(e) {
  Bt = e;
}
function xs() {
  return ++ws;
}
function Vn(e) {
  var t = e.f;
  if ((t & re) !== 0)
    return !0;
  if (t & fe && (e.f &= ~Ht), (t & Qe) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, i = 0; i < r; i++) {
      var s = n[i];
      if (Vn(
        /** @type {Derived} */
        s
      ) && ts(
        /** @type {Derived} */
        s
      ), s.wv > e.wv)
        return !0;
    }
    (t & Ue) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    de === null && Z(e, le);
  }
  return !1;
}
function Es(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(ot !== null && ot.has(e)))
    for (var i = 0; i < r.length; i++) {
      var s = r[i];
      (s.f & fe) !== 0 ? Es(
        /** @type {Derived} */
        s,
        t,
        !1
      ) : t === s && (n ? Z(s, re) : (s.f & le) !== 0 && Z(s, Qe), ii(
        /** @type {Effect} */
        s
      ));
    }
}
function ks(e) {
  var t = Te, n = De, r = ze, i = C, s = ot, a = Ae, f = Je, u = Bt, c = e.f;
  Te = /** @type {null | Value[]} */
  null, De = 0, ze = null, C = (c & (Ve | gt)) === 0 ? e : null, ot = null, dn(e.ctx), Je = !1, Bt = ++It, e.ac !== null && (Hn(() => {
    e.ac.abort(Bn);
  }), e.ac = null);
  try {
    e.f |= dr;
    var v = (
      /** @type {Function} */
      e.fn
    ), p = v();
    e.f |= _n;
    var d = Ti(e);
    if (Ji() && ze !== null && !Je && d !== null && (e.f & (fe | Qe | re)) === 0)
      for (var h = 0; h < /** @type {Source[]} */
      ze.length; h++)
        Es(
          ze[h],
          /** @type {Effect} */
          e
        );
    if (i !== null && i !== e) {
      if (It++, i.deps !== null)
        for (let b = 0; b < n; b += 1)
          i.deps[b].rv = It;
      if (t !== null)
        for (const b of t)
          b.rv = It;
      ze !== null && (r === null ? r = ze : r.push(.../** @type {Source[]} */
      ze));
    }
    return (e.f & kt) !== 0 && (e.f ^= kt), p;
  } catch (b) {
    return Ti(e), Ua(b);
  } finally {
    e.f ^= dr, Te = t, De = n, ze = r, C = i, ot = s, dn(a), Je = f, Bt = u;
  }
}
function Ti(e) {
  var i;
  var t = e.deps, n = w == null ? void 0 : w.is_fork;
  if (Te !== null) {
    var r;
    if (n || Dn(e, De), t !== null && De > 0)
      for (t.length = De + Te.length, r = 0; r < Te.length; r++)
        t[De + r] = Te[r];
    else
      e.deps = t = Te;
    if (si() && (e.f & Ue) !== 0)
      for (r = De; r < t.length; r++)
        ((i = t[r]).reactions ?? (i.reactions = [])).push(e);
  } else !n && t !== null && De < t.length && (Dn(e, De), t.length = De);
  return t;
}
function Qa(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = Xs.call(n, e);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  if (n === null && (t.f & fe) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Te === null || !ur.call(Te, t))) {
    var s = (
      /** @type {Derived} */
      t
    );
    (s.f & Ue) !== 0 && (s.f ^= Ue, s.f &= ~Ht), s.v !== ae && ei(s), s.ac !== null && Hn(() => {
      s.ac.abort(Bn), s.ac = null, Z(s, re);
    }), Ia(s), Dn(s, 0);
  }
}
function Dn(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      Qa(e, n[r]);
}
function hn(e) {
  var t = e.f;
  if ((t & Pe) === 0) {
    Z(e, le);
    var n = N, r = or;
    N = e, or = (t & (Ve | gt)) === 0;
    try {
      (t & (We | $i)) !== 0 ? Ga(e) : li(e), ps(e);
      var i = ks(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = ws;
      var s;
      Bi && xa && (e.f & re) !== 0 && e.deps;
    } finally {
      or = r, N = n;
    }
  }
}
async function Xa() {
  await Promise.resolve(), Pa();
}
function l(e) {
  var t = e.f, n = (t & fe) !== 0;
  if (C !== null && !Je) {
    var r = N !== null && (N.f & Pe) !== 0;
    if (!r && (ot === null || !ot.has(e))) {
      var i = C.deps;
      if ((C.f & dr) !== 0)
        e.rv < It && (e.rv = It, Te === null && i !== null && i[De] === e ? De++ : Te === null ? Te = [e] : Te.push(e));
      else {
        C.deps ?? (C.deps = []), ur.call(C.deps, e) || C.deps.push(e);
        var s = e.reactions;
        s === null ? e.reactions = [C] : ur.call(s, C) || s.push(C);
      }
    }
  }
  if (St && lt.has(e))
    return lt.get(e);
  if (n) {
    var a = (
      /** @type {Derived} */
      e
    );
    if (St) {
      var f = a.v;
      return ((a.f & le) === 0 && a.reactions !== null || Ts(a)) && (f = ni(a)), lt.set(a, f), f;
    }
    var u = (a.f & Ue) === 0 && !Je && C !== null && (or || (C.f & Ue) !== 0), c = (a.f & _n) === 0;
    Vn(a) && (u && (a.f |= Ue), ts(a)), u && !c && (ns(a), Ss(a));
  }
  if (de != null && de.has(e))
    return de.get(e);
  if ((e.f & kt) !== 0)
    throw e.v;
  return e.v;
}
function Ss(e) {
  if (e.f |= Ue, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ?? (t.reactions = [])).push(e), (t.f & fe) !== 0 && (t.f & Ue) === 0 && (ns(
        /** @type {Derived} */
        t
      ), Ss(
        /** @type {Derived} */
        t
      ));
}
function Ts(e) {
  if (e.v === ae) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (lt.has(t) || (t.f & fe) !== 0 && Ts(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function As(e) {
  var t = Je;
  try {
    return Je = !0, e();
  } finally {
    Je = t;
  }
}
const Nt = Symbol("events"), Ms = /* @__PURE__ */ new Set(), qr = /* @__PURE__ */ new Set();
function ge(e, t, n) {
  (t[Nt] ?? (t[Nt] = {}))[e] = n;
}
function fi(e) {
  for (var t = 0; t < e.length; t++)
    Ms.add(e[t]);
  for (var n of qr)
    n(e);
}
let Nr = null, Dr = !1;
function Ai(e) {
  var m, g;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, i = ((m = e.composedPath) == null ? void 0 : m.call(e)) || [], s = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  Nr = e, Dr || (Dr = !0, setTimeout(() => {
    Dr = !1, Nr = null;
  }));
  var a = 0, f = Nr === e && e[Nt];
  if (f) {
    var u = i.indexOf(f);
    if (u !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[Nt] = t;
      return;
    }
    var c = i.indexOf(t);
    if (c === -1)
      return;
    u <= c && (a = u);
  }
  if (s = /** @type {Element} */
  i[a] || e.target, s !== t) {
    Ui(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || n;
      }
    });
    var v = C, p = N;
    qe(null), ft(null);
    try {
      for (var d, h = []; s !== null && s !== t; ) {
        try {
          var b = (g = s[Nt]) == null ? void 0 : g[r];
          b != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === s) && b.call(s, e);
        } catch (x) {
          d ? h.push(x) : d = x;
        }
        if (e.cancelBubble) break;
        a++, s = a < i.length ? (
          /** @type {Element} */
          i[a]
        ) : null;
      }
      if (d) {
        for (let x of h)
          queueMicrotask(() => {
            throw x;
          });
        throw d;
      }
    } finally {
      e[Nt] = t, delete e.currentTarget, qe(v), ft(p);
    }
  }
}
var zi;
const Pr = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((zi = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : zi.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function Za(e) {
  return (
    /** @type {string} */
    (Pr == null ? void 0 : Pr.createHTML(e)) ?? e
  );
}
function el(e) {
  var t = Ha("template");
  return t.innerHTML = Za(e.replaceAll("<!>", "<!---->")), t.content;
}
function pr(e, t) {
  var n = (
    /** @type {Effect} */
    N
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function z(e, t) {
  var n = (t & 1) !== 0, r = (t & 2) !== 0, i, s = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = el(s ? e : "<!>" + e), n || (i = /** @type {TemplateNode} */
    /* @__PURE__ */ Nn(i)));
    var a = (
      /** @type {TemplateNode} */
      r || us ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (n) {
      var f = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Nn(a)
      ), u = (
        /** @type {TemplateNode} */
        a.lastChild
      );
      pr(f, u);
    } else
      pr(a, a);
    return a;
  };
}
function Ct(e = "") {
  {
    var t = pt(e + "");
    return pr(t, t), t;
  }
}
function tl() {
  var e = document.createDocumentFragment(), t = document.createComment(""), n = pt();
  return e.append(t, n), pr(t, n), e;
}
function S(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
const nl = ["touchstart", "touchmove"];
function rl(e) {
  return nl.includes(e);
}
function il(e) {
  let t = 0, n = Vt(0), r;
  return () => {
    si() && (l(n), _s(() => (t === 0 && (r = As(() => e(() => On(n)))), t += 1, () => {
      Et(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, On(n));
      });
    })));
  };
}
var sl = cn | pn;
function al(e, t, n, r) {
  new ll(e, t, n, r);
}
var je, Xr, Be, Ft, we, Oe, xe, Ie, nt, Lt, xt, un, Fn, Ln, _t, br, Y, ol, fl, $r, ul, Kr, Tn, fr, Yr, Gr;
class ll {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, n, r, i) {
    A(this, Y);
    /** @type {Boundary | null} */
    Re(this, "parent");
    Re(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    Re(this, "transform_error");
    /** @type {TemplateNode} */
    A(this, je);
    /** @type {TemplateNode | null} */
    A(this, Xr, null);
    /** @type {BoundaryProps} */
    A(this, Be);
    /** @type {((anchor: Node) => void)} */
    A(this, Ft);
    /** @type {Effect} */
    A(this, we);
    /** @type {Effect | null} */
    A(this, Oe, null);
    /** @type {Effect | null} */
    A(this, xe, null);
    /** @type {Effect | null} */
    A(this, Ie, null);
    /** @type {DocumentFragment | null} */
    A(this, nt, null);
    A(this, Lt, 0);
    A(this, xt, 0);
    A(this, un, !1);
    /** @type {Set<Effect>} */
    A(this, Fn, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    A(this, Ln, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    A(this, _t, null);
    A(this, br, il(() => (k(this, _t, Vt(o(this, Lt))), () => {
      k(this, _t, null);
    })));
    var s;
    k(this, je, t), k(this, Be, n), k(this, Ft, (a) => {
      var f = (
        /** @type {Effect} */
        N
      );
      f.b = this, f.f |= zr, r(a);
    }), this.parent = /** @type {Effect} */
    N.b, this.transform_error = i ?? ((s = this.parent) == null ? void 0 : s.transform_error) ?? ((a) => a), k(this, we, ai(() => {
      O(this, Y, Kr).call(this);
    }, sl));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    Zi(t, o(this, Fn), o(this, Ln));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!o(this, Be).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(t, n) {
    O(this, Y, Yr).call(this, t, n), k(this, Lt, o(this, Lt) + t), !(!o(this, _t) || o(this, un)) && (k(this, un, !0), Et(() => {
      k(this, un, !1), o(this, _t) && vn(o(this, _t), o(this, Lt));
    }));
  }
  get_effect_pending() {
    return o(this, br).call(this), l(
      /** @type {Source<number>} */
      o(this, _t)
    );
  }
  /** @param {unknown} error */
  error(t) {
    if (!o(this, Be).onerror && !o(this, Be).failed)
      throw t;
    w != null && w.is_fork ? (o(this, Oe) && w.skip_effect(o(this, Oe)), o(this, xe) && w.skip_effect(o(this, xe)), o(this, Ie) && w.skip_effect(o(this, Ie)), w.oncommit(() => {
      O(this, Y, Gr).call(this, t);
    })) : O(this, Y, Gr).call(this, t);
  }
}
je = new WeakMap(), Xr = new WeakMap(), Be = new WeakMap(), Ft = new WeakMap(), we = new WeakMap(), Oe = new WeakMap(), xe = new WeakMap(), Ie = new WeakMap(), nt = new WeakMap(), Lt = new WeakMap(), xt = new WeakMap(), un = new WeakMap(), Fn = new WeakMap(), Ln = new WeakMap(), _t = new WeakMap(), br = new WeakMap(), Y = new WeakSet(), ol = function() {
  try {
    k(this, Oe, He(() => o(this, Ft).call(this, o(this, je))));
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
fl = function(t) {
  const n = o(this, Be).failed, { reset: r, invoke_onerror: i } = O(this, Y, $r).call(this, t);
  Et(i), n && k(this, Ie, He(() => {
    n(
      o(this, je),
      () => t,
      () => r
    );
  }));
}, /**
 * Creates the `reset` function for a failed boundary, along with a function
 * that invokes `onerror` with it (if provided)
 * @param {unknown} error
 * @returns {{ reset: () => void, invoke_onerror: () => void }}
 */
$r = function(t) {
  var n = !1, r = !1;
  const i = () => {
    if (n) {
      ua();
      return;
    }
    n = !0, r && wa(), o(this, Ie) !== null && jt(o(this, Ie), () => {
      k(this, Ie, null);
    }), O(this, Y, fr).call(this, () => {
      O(this, Y, Kr).call(this);
    });
  };
  return { reset: i, invoke_onerror: () => {
    var a, f;
    try {
      r = !0, (f = (a = o(this, Be)).onerror) == null || f.call(a, t, i), r = !1;
    } catch (u) {
      it(u, o(this, we) && o(this, we).parent);
    }
  } };
}, ul = function() {
  const t = o(this, Be).pending;
  t && (this.is_pending = !0, k(this, xe, He(() => t(o(this, je)))), Et(() => {
    var n = k(this, nt, document.createDocumentFragment()), r = pt(), i = !1;
    if (n.append(r), k(this, Oe, O(this, Y, fr).call(this, () => {
      try {
        return He(() => o(this, Ft).call(this, r));
      } catch (s) {
        try {
          this.error(s), i = !0;
        } catch (a) {
          it(a, o(this, we).parent);
        }
        return null;
      }
    })), o(this, Oe) === null) {
      k(this, nt, null), i && O(this, Y, Tn).call(
        this,
        /** @type {Batch} */
        w
      );
      return;
    }
    o(this, xt) === 0 && (o(this, je).before(n), k(this, nt, null), jt(
      /** @type {Effect} */
      o(this, xe),
      () => {
        k(this, xe, null);
      }
    ), O(this, Y, Tn).call(
      this,
      /** @type {Batch} */
      w
    ));
  }));
}, Kr = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), k(this, xt, 0), k(this, Lt, 0), k(this, Oe, He(() => {
      o(this, Ft).call(this, o(this, je));
    })), o(this, xt) > 0) {
      var t = k(this, nt, document.createDocumentFragment());
      oi(o(this, Oe), t);
      const n = (
        /** @type {(anchor: Node) => void} */
        o(this, Be).pending
      );
      k(this, xe, He(() => n(o(this, je))));
    } else
      O(this, Y, Tn).call(
        this,
        /** @type {Batch} */
        w
      );
  } catch (n) {
    this.error(n);
  }
}, /**
 * @param {Batch} batch
 */
Tn = function(t) {
  this.is_pending = !1, t.transfer_effects(o(this, Fn), o(this, Ln));
}, /**
 * @template T
 * @param {() => T} fn
 */
fr = function(t) {
  var n = N, r = C, i = Ae;
  ft(o(this, we)), qe(o(this, we)), dn(o(this, we).ctx);
  try {
    return Ut.ensure(), t();
  } finally {
    ft(n), qe(r), dn(i);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
Yr = function(t, n) {
  var r;
  if (!this.has_pending_snippet()) {
    this.parent && O(r = this.parent, Y, Yr).call(r, t, n);
    return;
  }
  k(this, xt, o(this, xt) + t), o(this, xt) === 0 && (O(this, Y, Tn).call(this, n), o(this, xe) && jt(o(this, xe), () => {
    k(this, xe, null);
  }), o(this, nt) && (o(this, je).before(o(this, nt)), k(this, nt, null)));
}, /**
 * @param {unknown} error
 */
Gr = function(t) {
  o(this, Oe) && (Me(o(this, Oe)), k(this, Oe, null)), o(this, xe) && (Me(o(this, xe)), k(this, xe, null)), o(this, Ie) && (Me(o(this, Ie)), k(this, Ie, null));
  let n = o(this, Be).failed;
  const r = (i) => {
    const { reset: s, invoke_onerror: a } = O(this, Y, $r).call(this, i);
    a(), n && k(this, Ie, O(this, Y, fr).call(this, () => {
      try {
        return He(() => {
          var f = (
            /** @type {Effect} */
            N
          );
          f.b = this, f.f |= zr, n(
            o(this, je),
            () => i,
            () => s
          );
        });
      } catch (f) {
        return it(
          f,
          /** @type {Effect} */
          o(this, we).parent
        ), null;
      }
    }));
  };
  Et(() => {
    var i;
    try {
      i = this.transform_error(t);
    } catch (s) {
      it(s, o(this, we) && o(this, we).parent);
      return;
    }
    i !== null && typeof i == "object" && typeof /** @type {any} */
    i.then == "function" ? i.then(
      r,
      /** @param {unknown} e */
      (s) => it(s, o(this, we) && o(this, we).parent)
    ) : r(i);
  });
};
function I(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== /** @type {any} */
  (e[xn] ?? (e[xn] = e.nodeValue)) && (e[xn] = n, e.nodeValue = `${n}`);
}
function cl(e, t) {
  return dl(e, t);
}
const er = /* @__PURE__ */ new Map();
function dl(e, { target: t, anchor: n, props: r = {}, events: i, context: s, intro: a = !0, transformError: f }) {
  ja();
  var u = void 0, c = Ka(() => {
    var v = n ?? t.appendChild(pt());
    al(
      /** @type {TemplateNode} */
      v,
      {
        pending: () => {
        }
      },
      (h) => {
        xr({});
        var b = (
          /** @type {ComponentContext} */
          Ae
        );
        s && (b.c = s), i && (r.$$events = i), u = e(h, r) || Wi(), Er();
      },
      f
    );
    var p = /* @__PURE__ */ new Set(), d = (h) => {
      for (var b = 0; b < h.length; b++) {
        var m = h[b];
        if (!p.has(m)) {
          p.add(m);
          var g = rl(m);
          for (const P of [t, document]) {
            var x = er.get(P);
            x === void 0 && (x = /* @__PURE__ */ new Map(), er.set(P, x));
            var G = x.get(m);
            G === void 0 ? (P.addEventListener(m, Ai, { passive: g }), x.set(m, 1)) : x.set(m, G + 1);
          }
        }
      }
    };
    return d(yr(Ms)), qr.add(d), () => {
      var g;
      for (var h of p)
        for (const x of [t, document]) {
          var b = (
            /** @type {Map<string, number>} */
            er.get(x)
          ), m = (
            /** @type {number} */
            b.get(h)
          );
          --m == 0 ? (x.removeEventListener(h, Ai), b.delete(h), b.size === 0 && er.delete(x)) : b.set(h, m);
        }
      qr.delete(d), v !== n && ((g = v.parentNode) == null || g.removeChild(v));
    };
  });
  return Wr.set(u, c), u;
}
let Wr = /* @__PURE__ */ new WeakMap();
function vl(e, t) {
  const n = Wr.get(e);
  return n ? (Wr.delete(e), n(t)) : Promise.resolve();
}
var Ge, rt, Ne, zt, zn, jn, mr;
class hl {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, n = !0) {
    /** @type {TemplateNode} */
    Re(this, "anchor");
    /** @type {Map<Batch, Key>} */
    A(this, Ge, /* @__PURE__ */ new Map());
    /**
     * Map of keys to effects that are currently rendered in the DOM.
     * These effects are visible and actively part of the document tree.
     * Example:
     * ```
     * {#if condition}
     * 	foo
     * {:else}
     * 	bar
     * {/if}
     * ```
     * Can result in the entries `true->Effect` and `false->Effect`
     * @type {Map<Key, Effect>}
     */
    A(this, rt, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    A(this, Ne, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    A(this, zt, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    A(this, zn, !0);
    /**
     * @param {Batch} batch
     */
    A(this, jn, (t) => {
      if (o(this, Ge).has(t)) {
        var n = (
          /** @type {Key} */
          o(this, Ge).get(t)
        ), r = o(this, rt).get(n);
        if (r)
          _r(r), o(this, zt).delete(n);
        else {
          var i = o(this, Ne).get(n);
          i && (_r(i.effect), o(this, rt).set(n, i.effect), o(this, Ne).delete(n), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), r = i.effect);
        }
        for (const [s, a] of o(this, Ge)) {
          if (o(this, Ge).delete(s), s === t)
            break;
          const f = o(this, Ne).get(a);
          f && (Me(f.effect), o(this, Ne).delete(a));
        }
        for (const [s, a] of o(this, rt)) {
          if (s === n || o(this, zt).has(s)) continue;
          const f = () => {
            if (Array.from(o(this, Ge).values()).includes(s)) {
              var c = document.createDocumentFragment();
              oi(a, c), c.append(pt()), o(this, Ne).set(s, { effect: a, fragment: c });
            } else
              Me(a);
            o(this, zt).delete(s), o(this, rt).delete(s);
          };
          o(this, zn) || !r ? (o(this, zt).add(s), jt(a, f, !1)) : f();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    A(this, mr, (t) => {
      o(this, Ge).delete(t);
      const n = Array.from(o(this, Ge).values());
      for (const [r, i] of o(this, Ne))
        n.includes(r) || (Me(i.effect), o(this, Ne).delete(r));
    });
    this.anchor = t, k(this, zn, n);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, n) {
    var r = (
      /** @type {Batch} */
      w
    ), i = vs();
    if (n && !o(this, rt).has(t) && !o(this, Ne).has(t))
      if (i) {
        var s = document.createDocumentFragment(), a = pt();
        s.append(a), o(this, Ne).set(t, {
          effect: He(() => n(a)),
          fragment: s
        });
      } else
        o(this, rt).set(
          t,
          He(() => n(this.anchor))
        );
    if (o(this, Ge).set(r, t), i) {
      for (const [f, u] of o(this, rt))
        f === t ? r.unskip_effect(u) : r.skip_effect(u);
      for (const [f, u] of o(this, Ne))
        f === t ? r.unskip_effect(u.effect) : r.skip_effect(u.effect);
      r.oncommit(o(this, jn)), r.ondiscard(o(this, mr));
    } else
      o(this, jn).call(this, r);
  }
}
Ge = new WeakMap(), rt = new WeakMap(), Ne = new WeakMap(), zt = new WeakMap(), zn = new WeakMap(), jn = new WeakMap(), mr = new WeakMap();
function q(e, t, n = !1) {
  var r = new hl(e), i = n ? cn : 0;
  function s(a, f) {
    r.ensure(a, f);
  }
  ai(() => {
    var a = !1;
    t((f, u = 0) => {
      a = !0, s(u, f);
    }), a || s(-1, null);
  }, i);
}
function _l(e, t, n) {
  for (var r = [], i = t.length, s, a = t.length, f = 0; f < i; f++) {
    let p = t[f];
    jt(
      p,
      () => {
        if (s) {
          if (s.pending.delete(p), s.done.add(p), s.pending.size === 0) {
            var d = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            Jr(e, yr(s.done)), d.delete(s), d.size === 0 && (e.outrogroups = null);
          }
        } else
          a -= 1;
      },
      !1
    );
  }
  if (a === 0) {
    var u = r.length === 0 && n !== null && e.pending.size === 0;
    if (u) {
      var c = (
        /** @type {Element} */
        n
      ), v = (
        /** @type {Element} */
        c.parentNode
      );
      Ba(v), v.append(c), e.items.clear();
    }
    Jr(e, t, !u);
  } else
    s = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ?? (e.outrogroups = /* @__PURE__ */ new Set())).add(s);
}
function Jr(e, t, n = !0) {
  var r;
  if (e.pending.size > 0) {
    r = /* @__PURE__ */ new Set();
    for (const a of e.pending.values())
      for (const f of a)
        r.add(
          /** @type {EachItem} */
          e.items.get(f).e
        );
  }
  for (var i = 0; i < t.length; i++) {
    var s = t[i];
    if (r != null && r.has(s)) {
      s.f |= st;
      const a = document.createDocumentFragment();
      oi(s, a);
    } else
      Me(t[i], n);
  }
}
var Mi;
function Zt(e, t, n, r, i, s = null) {
  var a = e, f = /* @__PURE__ */ new Map(), u = (t & 4) !== 0;
  if (u) {
    var c = (
      /** @type {Element} */
      e
    );
    a = c.appendChild(pt());
  }
  var v = null, p = /* @__PURE__ */ Ca(() => {
    var P = n();
    return (
      /** @type {V[]} */
      Hi(P) ? P : P == null ? [] : yr(P)
    );
  }), d, h = /* @__PURE__ */ new Map(), b = !0;
  function m(P) {
    (G.effect.f & Pe) === 0 && (G.pending.delete(P), G.fallback = v, pl(G, d, a, t, r), v !== null && (d.length === 0 ? (v.f & st) === 0 ? _r(v) : (v.f ^= st, An(v, null, a)) : jt(v, () => {
      v = null;
    })));
  }
  function g(P) {
    G.pending.delete(P);
  }
  var x = ai(() => {
    d = /** @type {V[]} */
    l(p);
    for (var P = d.length, Q = /* @__PURE__ */ new Set(), ee = (
      /** @type {Batch} */
      w
    ), Xe = vs(), te = 0; te < P; te += 1) {
      var Fe = d[te], $e = r(Fe, te), ve = b ? null : f.get($e);
      ve ? (ve.v && vn(ve.v, Fe), ve.i && vn(ve.i, te), Xe && ee.unskip_effect(ve.e)) : (ve = gl(
        f,
        b ? a : Mi ?? (Mi = pt()),
        Fe,
        $e,
        te,
        i,
        t,
        n
      ), b || (ve.e.f |= st), f.set($e, ve)), Q.add($e);
    }
    if (P === 0 && s && !v && (b ? v = He(() => s(a)) : (v = He(() => s(Mi ?? (Mi = pt()))), v.f |= st)), P > Q.size && va(), !b)
      if (h.set(ee, Q), Xe) {
        for (const [ut, ct] of f)
          Q.has(ut) || ee.skip_effect(ct.e);
        ee.oncommit(m), ee.ondiscard(g);
      } else
        m(ee);
    l(p);
  }), G = { effect: x, items: f, pending: h, outrogroups: null, fallback: v };
  b = !1;
}
function wn(e) {
  for (; e !== null && (e.f & Ve) === 0; )
    e = e.next;
  return e;
}
function pl(e, t, n, r, i) {
  var ve, ut, ct, dt, E, D, H, ue, he;
  var s = (r & 8) !== 0, a = t.length, f = e.items, u = wn(e.effect.first), c, v = null, p, d = [], h = [], b, m, g, x;
  if (s)
    for (x = 0; x < a; x += 1)
      b = t[x], m = i(b, x), g = /** @type {EachItem} */
      f.get(m).e, (g.f & st) === 0 && ((ut = (ve = g.nodes) == null ? void 0 : ve.a) == null || ut.measure(), (p ?? (p = /* @__PURE__ */ new Set())).add(g));
  for (x = 0; x < a; x += 1) {
    if (b = t[x], m = i(b, x), g = /** @type {EachItem} */
    f.get(m).e, e.outrogroups !== null)
      for (const ie of e.outrogroups)
        ie.pending.delete(g), ie.done.delete(g);
    if ((g.f & Ee) !== 0 && (_r(g), s && ((dt = (ct = g.nodes) == null ? void 0 : ct.a) == null || dt.unfix(), (p ?? (p = /* @__PURE__ */ new Set())).delete(g))), (g.f & st) !== 0)
      if (g.f ^= st, g === u)
        An(g, null, n);
      else {
        var G = v ? v.next : u;
        g === e.effect.last && (e.effect.last = g.prev), g.prev && (g.prev.next = g.next), g.next && (g.next.prev = g.prev), yt(e, v, g), yt(e, g, G), An(g, G, n), v = g, d = [], h = [], u = wn(v.next);
        continue;
      }
    if (g !== u) {
      if (c !== void 0 && c.has(g)) {
        if (d.length < h.length) {
          var P = h[0], Q;
          v = P.prev;
          var ee = d[0], Xe = d[d.length - 1];
          for (Q = 0; Q < d.length; Q += 1)
            An(d[Q], P, n);
          for (Q = 0; Q < h.length; Q += 1)
            c.delete(h[Q]);
          yt(e, ee.prev, Xe.next), yt(e, v, ee), yt(e, Xe, P), u = P, v = Xe, x -= 1, d = [], h = [];
        } else
          c.delete(g), An(g, u, n), yt(e, g.prev, g.next), yt(e, g, v === null ? e.effect.first : v.next), yt(e, v, g), v = g;
        continue;
      }
      for (d = [], h = []; u !== null && u !== g; )
        (c ?? (c = /* @__PURE__ */ new Set())).add(u), h.push(u), u = wn(u.next);
      if (u === null)
        continue;
    }
    (g.f & st) === 0 && d.push(g), v = g, u = wn(g.next);
  }
  if (e.outrogroups !== null) {
    for (const ie of e.outrogroups)
      ie.pending.size === 0 && (Jr(e, yr(ie.done)), (E = e.outrogroups) == null || E.delete(ie));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (u !== null || c !== void 0) {
    var te = [];
    if (c !== void 0)
      for (g of c)
        (g.f & Ee) === 0 && te.push(g);
    for (; u !== null; )
      (u.f & Ee) === 0 && u !== e.fallback && te.push(u), u = wn(u.next);
    var Fe = te.length;
    if (Fe > 0) {
      var $e = (r & 4) !== 0 && a === 0 ? n : null;
      if (s) {
        for (x = 0; x < Fe; x += 1)
          (H = (D = te[x].nodes) == null ? void 0 : D.a) == null || H.measure();
        for (x = 0; x < Fe; x += 1)
          (he = (ue = te[x].nodes) == null ? void 0 : ue.a) == null || he.fix();
      }
      _l(e, te, $e);
    }
  }
  s && Et(() => {
    var ie, X;
    if (p !== void 0)
      for (g of p)
        (X = (ie = g.nodes) == null ? void 0 : ie.a) == null || X.apply();
  });
}
function gl(e, t, n, r, i, s, a, f) {
  var u = (a & 1) !== 0 ? (a & 16) === 0 ? /* @__PURE__ */ La(n, !1, !1) : Vt(n) : null, c = (a & 2) !== 0 ? Vt(i) : null;
  return {
    v: u,
    i: c,
    e: He(() => (s(t, u ?? n, c ?? i, f), () => {
      e.delete(r);
    }))
  };
}
function An(e, t, n) {
  if (e.nodes)
    for (var r = e.nodes.start, i = e.nodes.end, s = t && (t.f & st) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : n; r !== null; ) {
      var a = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Un(r)
      );
      if (s.before(r), r === i)
        return;
      r = a;
    }
}
function yt(e, t, n) {
  t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
const Ri = [...` 	
\r\f \v\uFEFF`];
function bl(e, t, n) {
  var r = e == null ? "" : "" + e;
  if (n) {
    for (var i of Object.keys(n))
      if (n[i])
        r = r ? r + " " + i : i;
      else if (r.length)
        for (var s = i.length, a = 0; (a = r.indexOf(i, a)) >= 0; ) {
          var f = a + s;
          (a === 0 || Ri.includes(r[a - 1])) && (f === r.length || Ri.includes(r[f])) ? r = (a === 0 ? "" : r.substring(0, a)) + r.substring(f + 1) : a = f;
        }
  }
  return r === "" ? null : r;
}
function en(e, t, n, r, i, s) {
  var a = (
    /** @type {any} */
    e[Br]
  );
  if (a !== n || a === void 0) {
    var f = bl(n, r, s);
    f == null ? e.removeAttribute("class") : e.className = f, e[Br] = n;
  } else if (s && i !== s)
    for (var u in s) {
      var c = !!s[u];
      (i == null || c !== !!i[u]) && e.classList.toggle(u, c);
    }
  return s;
}
const ml = Symbol("is custom element"), yl = Symbol("is html");
function tn(e, t, n, r) {
  var i = wl(e);
  i[t] !== (i[t] = n) && (t === "loading" && (e[la] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && xl(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function wl(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    e[rr] ?? (e[rr] = {
      [ml]: e.nodeName.includes("-"),
      [yl]: e.namespaceURI === Qs
    })
  );
}
var Ci = /* @__PURE__ */ new Map();
function xl(e) {
  var t = e.getAttribute("is") || e.nodeName, n = Ci.get(t);
  if (n) return n;
  Ci.set(t, n = /* @__PURE__ */ new Set());
  for (var r, i = e, s = Element.prototype; s !== i; ) {
    r = Zs(i);
    for (var a in r)
      r[a].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      a !== "innerHTML" && a !== "textContent" && a !== "innerText" && n.add(a);
    i = Vi(i);
  }
  return n;
}
function El(e, t, n = t) {
  var r = /* @__PURE__ */ new WeakSet();
  Ta(e, "input", async (i) => {
    var s = i ? e.defaultValue : e.value;
    if (s = Fr(e) ? Lr(s) : s, n(s), w !== null && r.add(w), await Xa(), s !== (s = t())) {
      var a = e.selectionStart, f = e.selectionEnd, u = e.value.length;
      if (e.value = s ?? "", f !== null) {
        var c = e.value.length;
        a === f && f === u && c > u ? (e.selectionStart = c, e.selectionEnd = c) : (e.selectionStart = a, e.selectionEnd = Math.min(f, c));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  As(t) == null && e.value && (n(Fr(e) ? Lr(e.value) : e.value), w !== null && r.add(w)), _s(() => {
    var i = t();
    if (e === document.activeElement) {
      var s = (
        /** @type {Batch} */
        w
      );
      if (r.has(s))
        return;
    }
    Fr(e) && i === Lr(e.value) || e.type === "date" && !i && !e.value || i !== e.value && (e.value = i ?? "");
  });
}
function Fr(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function Lr(e) {
  return e === "" ? null : +e;
}
function Qr(e, t, n, r) {
  var i = (
    /** @type {V} */
    r
  ), s = !0, a = () => (s && (s = !1, i = /** @type {V} */
  r), i), f;
  f = /** @type {V} */
  e[t], f === void 0 && r !== void 0 && (f = a());
  var u;
  return u = () => {
    var c = (
      /** @type {V} */
      e[t]
    );
    return c === void 0 ? a() : (s = !0, c);
  }, u;
}
const kl = "5";
var ji;
typeof window < "u" && ((ji = window.__svelte ?? (window.__svelte = {})).v ?? (ji.v = /* @__PURE__ */ new Set())).add(kl);
let Rs = "";
function Sl(e) {
  Rs = e;
}
function kr(e, t) {
  const n = new URL(`${Rs}${e}`, window.location.origin);
  for (const [r, i] of Object.entries(t ?? {}))
    i != null && i !== "" && n.searchParams.set(r, String(i));
  return n;
}
async function Cs(e, t, n) {
  try {
    const r = await fetch(kr(t, n), { method: e });
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  }
}
const Tl = (e, t) => Cs("GET", e, t), Al = (e, t) => Cs("POST", e, t);
async function Oi(e, t) {
  try {
    const n = await fetch(kr(e), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(t)
    });
    return n.ok ? await n.json() : null;
  } catch {
    return null;
  }
}
const Ml = (e, t) => String(kr("/stream", { site: e, video_id: t }));
async function Rl() {
  try {
    const e = await fetch("/api/v1/vpn/status");
    return e.ok ? await e.json() : null;
  } catch {
    return null;
  }
}
function Ii(e, t) {
  const n = e ? t === "scraping" ? e.route_scraping : e.route_streaming : !1, r = (e == null ? void 0 : e.connected) ?? !1;
  return {
    routed: n,
    connected: r,
    blocked: n && !r,
    exitNodeName: (e == null ? void 0 : e.exit_node_name) ?? null
  };
}
async function Cl(e) {
  const t = e === "scraping" ? "vpn.route_scraping" : "vpn.route_streaming";
  try {
    return (await fetch(`/api/v1/settings/set/${t}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ [t]: !1 })
    })).ok;
  } catch {
    return !1;
  }
}
const ui = "/api/bookmarks";
async function Ol(e) {
  try {
    const t = await fetch(`${ui}?contextTitle=${encodeURIComponent(e)}`);
    return t.ok ? (await t.json()).bookmarks ?? [] : null;
  } catch {
    return null;
  }
}
async function Il(e) {
  try {
    return (await fetch(ui, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(e)
    })).ok;
  } catch {
    return !1;
  }
}
async function Nl(e, t) {
  try {
    return (await fetch(
      `${ui}?site=${encodeURIComponent(e)}&videoId=${encodeURIComponent(t)}`,
      { method: "DELETE" }
    )).ok;
  } catch {
    return !1;
  }
}
function Ni(e) {
  if (!e) return "";
  const t = ["B", "KB", "MB", "GB"], n = Math.min(Math.floor(Math.log(e) / Math.log(1024)), t.length - 1);
  return `${(e / 1024 ** n).toFixed(n === 0 ? 0 : 1)} ${t[n]}`;
}
function tr(e) {
  if (!e) return null;
  const t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = e % 60, i = (s) => String(s).padStart(2, "0");
  return t ? `${t}:${i(n)}:${i(r)}` : `${n}:${i(r)}`;
}
var Dl = /* @__PURE__ */ z('<div><span> </span> <button type="button" class="tbx-link"> </button></div>'), Pl = /* @__PURE__ */ z('<div><span class="tbx-dot"></span> </div>');
function Di(e, t) {
  xr(t, !0);
  let n = Qr(t, "size", 3, "sm"), r = /* @__PURE__ */ $(!1);
  async function i() {
    var c;
    T(r, !0), await Cl(t.purpose) && await ((c = t.onDisabled) == null ? void 0 : c.call(t)), T(r, !1);
  }
  var s = tl(), a = ar(s);
  {
    var f = (c) => {
      var v = Dl();
      let p;
      var d = R(v), h = J(d), b = y(d, 2), m = J(b, !0);
      j(() => {
        p = en(v, 1, "tbx-banner tbx-banner-blocked", null, p, { "tbx-banner-lg": n() === "lg" }), I(h, `${t.base ?? ""} is routed through the VPN, and the tunnel is down.
            ${t.gerund ?? ""} is blocked rather than falling back to a direct connection.`), b.disabled = l(r), I(m, l(r) ? "Turning off…" : "Turn off routing");
      }), ge("click", b, i), S(c, v);
    }, u = (c) => {
      var v = Pl();
      let p;
      var d = y(R(v));
      j(() => {
        p = en(v, 1, "tbx-banner", null, p, { "tbx-banner-lg": n() === "lg" }), I(d, ` ${t.gerund ?? ""} through the VPN${t.route.exitNodeName ? ` via ${t.route.exitNodeName}` : ""}.`);
      }), S(c, v);
    };
    q(a, (c) => {
      t.route.blocked ? c(f) : t.route.routed && c(u, 1);
    });
  }
  S(e, s), Er();
}
fi(["click"]);
var Fl = /* @__PURE__ */ z("Searching<!><!>…", 1), Ll = /* @__PURE__ */ z(" <!>", 1), Pi = /* @__PURE__ */ z('<img alt="" loading="lazy" referrerpolicy="no-referrer"/>'), Fi = /* @__PURE__ */ z('<span class="tbx-duration"> </span>'), zl = /* @__PURE__ */ z('<span class="tbx-muted">Fetching quality…</span>'), nr = /* @__PURE__ */ z('<span class="tbx-badge"> </span>'), jl = /* @__PURE__ */ z("<!> <!>", 1), Bl = /* @__PURE__ */ z('<div class="tbx-card tbx-card-saved"><button type="button"><span class="tbx-thumb"><!> <!></span> <span class="tbx-meta"><span class="tbx-title"> </span> <span class="tbx-badges"><!></span></span></button> <button type="button" class="tbx-mark tbx-mark-on">★</button></div>'), Hl = /* @__PURE__ */ z('<div class="tbx-section"><div class="tbx-section-head tbx-saved"> </div> <div class="tbx-grid"></div></div>'), Ul = /* @__PURE__ */ z(`<div class="tbx-confirm" role="alertdialog" aria-label="Remove this bookmark?"><span>Remove this bookmark? It stays reachable from the site's own search
                results if you look for it again.</span> <span class="tbx-confirm-actions"><button type="button" class="tbx-btn">Cancel</button> <button type="button" class="tbx-btn tbx-btn-danger">Remove</button></span></div>`), Vl = /* @__PURE__ */ z('<p class="tbx-muted tbx-pad">Searching<!> </p>'), ql = /* @__PURE__ */ z('<div class="tbx-pad"><p class="tbx-error"> </p> <button type="button" class="tbx-btn">Try again</button></div>'), $l = /* @__PURE__ */ z('<div class="tbx-pad"><p class="tbx-muted"> </p> <button type="button" class="tbx-btn">Search again</button></div>'), Kl = /* @__PURE__ */ z('<span class="tbx-best">Best match</span>'), Yl = /* @__PURE__ */ z('<span class="tbx-badge">HD</span>'), Gl = /* @__PURE__ */ z('<div class="tbx-card"><button type="button"><span class="tbx-thumb"><!> <!> <!></span> <span class="tbx-meta"><span class="tbx-title"> </span> <span class="tbx-badges"><!> <!></span></span></button> <button type="button" class="tbx-mark">☆</button></div>'), Wl = /* @__PURE__ */ z('<div class="tbx-section"><div class="tbx-section-head"> <span class="tbx-muted"> </span></div> <div class="tbx-grid"></div></div>'), Jl = /* @__PURE__ */ z('<div class="tbx-rows"></div>'), Ql = /* @__PURE__ */ z('<p class="tbx-muted tbx-still"><!></p>'), Xl = /* @__PURE__ */ z('<p><span class="tbx-error"> </span> </p>'), Zl = /* @__PURE__ */ z('<div class="tbx-errors"></div>'), eo = /* @__PURE__ */ z('<div class="tbx-panel"><!> <!> <!> <!></div>'), to = /* @__PURE__ */ z('<div class="tbx"><div class="tbx-head"><button type="button"><span class="tbx-globe" aria-hidden="true"></span> <span class="tbx-trigger-text"><span class="tbx-trigger-title">Watch from a site</span> <span class="tbx-trigger-sub"><!></span></span> <span aria-hidden="true"></span></button> <div class="tbx-custom"><input type="search" placeholder="Custom search term" aria-label="Custom search term for streaming sites"/> <button type="button" class="tbx-btn">Search</button></div></div> <!> <!> <!> <!></div>');
function no(e, t) {
  xr(t, !0);
  let n = Qr(t, "title", 3, ""), r = Qr(t, "itemId", 3, null), i = /* @__PURE__ */ $(!1), s = /* @__PURE__ */ $(!1), a = /* @__PURE__ */ $(!1), f = /* @__PURE__ */ $(""), u = /* @__PURE__ */ $(at([])), c = /* @__PURE__ */ $(at({})), v = /* @__PURE__ */ $(null), p = /* @__PURE__ */ $(0), d = /* @__PURE__ */ $(0), h = null, b = /* @__PURE__ */ $(null);
  async function m() {
    T(b, await Rl(), !0);
  }
  const g = /* @__PURE__ */ Ce(() => Ii(l(b), "scraping")), x = /* @__PURE__ */ Ce(() => Ii(l(b), "streaming"));
  let G = /* @__PURE__ */ $(at([])), P = /* @__PURE__ */ $(null), Q = /* @__PURE__ */ $(at(/* @__PURE__ */ new Set()));
  const ee = (_, M) => `${_}:${M}`, Xe = /* @__PURE__ */ Ce(() => new Set(l(G).map((_) => ee(_.site, _.videoId))));
  async function te() {
    const _ = await Ol(n());
    _ && T(G, _, !0);
  }
  lr(() => {
    m(), te();
  }), lr(() => {
    if (!l(G).some((M) => M.metadataStatus === "pending")) return;
    const _ = setInterval(te, 4e3);
    return () => clearInterval(_);
  });
  async function Fe(_, M) {
    T(Q, new Set(l(Q)).add(_), !0);
    try {
      await M() && await te();
    } finally {
      const F = new Set(l(Q));
      F.delete(_), T(Q, F, !0);
    }
  }
  const $e = (_) => Fe(ee(_.site, _.video_id), () => Il({
    site: _.site,
    videoId: _.video_id,
    contextTitle: n(),
    title: _.title,
    pageUrl: _.page_url,
    thumbnail: _.thumbnail,
    duration: _.duration,
    resolution: _.resolution,
    size: _.size
  }));
  async function ve() {
    const _ = l(P);
    if (!_) return;
    T(P, null);
    const [M, F] = _.split(/:(.+)/);
    await Fe(_, () => Nl(M, F));
  }
  const ut = {
    tnaflix: 0,
    eporner: 0,
    hqporner: 1,
    paradisehill: 1,
    tubepornclassic: 1
  }, ct = (_) => ut[_] ?? 2, dt = /* @__PURE__ */ Ce(() => {
    const _ = /* @__PURE__ */ new Map();
    for (const M of l(u)) {
      if (l(Xe).has(ee(M.site, M.video_id))) continue;
      const F = _.get(M.site) ?? { name: M.site_name, items: [] };
      F.items.push(M), _.set(M.site, F);
    }
    return [..._.entries()].map(([M, F]) => ({ site: M, ...F })).sort((M, F) => {
      var U, oe;
      const be = ct(M.site) - ct(F.site);
      return be || (((U = F.items[0]) == null ? void 0 : U.relevance) ?? 0) - (((oe = M.items[0]) == null ? void 0 : oe.relevance) ?? 0);
    });
  });
  function E() {
    h == null || h.close(), T(s, !0), T(v, null), T(u, [], !0), T(c, {}, !0), T(p, 0), T(d, 0);
    const _ = l(f).trim(), M = _ ? { query: _ } : r() ? { item_id: r() } : { query: n() }, F = new EventSource(kr("/search_stream", M));
    h = F, F.onmessage = (be) => {
      var oe;
      let U;
      try {
        U = JSON.parse(be.data);
      } catch {
        return;
      }
      if (U.total_sites && T(p, U.total_sites, !0), U.event === "site") {
        T(d, U.sites_completed ?? l(d) + 1, !0), T(a, !0), (oe = U.results) != null && oe.length && T(u, [...l(u), ...U.results], !0), U.error && U.site && (l(c)[U.site] = U.error);
        return;
      }
      U.event === "error" && T(v, U.error ?? "Search failed", !0), T(a, !0), T(s, !1), F.close(), h = null;
    }, F.onerror = () => {
      F.close(), h = null, l(a) || T(v, "Search failed"), T(s, !1);
    };
  }
  lr(() => () => h == null ? void 0 : h.close());
  const D = /* @__PURE__ */ Ce(() => l(f).trim() || n());
  function H() {
    l(g).blocked || (T(i, !0), l(s) || E());
  }
  function ue() {
    !l(i) && l(g).blocked || (T(i, !l(i)), l(i) && !l(a) && !l(s) && E());
  }
  function he(_) {
    l(x).blocked || t.host.play({
      src: Ml(_.site, _.videoId),
      title: _.title,
      // The real type is not known until the backend resolves the
      // source, and the proxy reports it on the response. MP4 is the
      // right opening guess; the player falls back if the element
      // rejects it.
      mimeType: "video/mp4",
      poster: _.thumbnail ?? void 0,
      site: _.site,
      videoId: _.videoId,
      contextTitle: n(),
      duration: _.duration,
      resolution: _.resolution,
      size: _.size
    });
  }
  const ie = (_) => he({
    site: _.site,
    videoId: _.video_id,
    title: _.title,
    thumbnail: _.thumbnail,
    duration: _.duration,
    resolution: _.resolution,
    size: _.size
  }), X = (_) => he(_);
  var At = to(), qn = R(At), Mt = R(qn);
  let $n;
  var Kn = y(R(Mt), 2), qt = y(R(Kn), 2), $t = R(qt);
  {
    var gn = (_) => {
      var M = Fl(), F = y(ar(M));
      {
        var be = (V) => {
          var me = Ct();
          j(() => I(me, ` — ${l(d) ?? ""}/${l(p) ?? ""} sites`)), S(V, me);
        };
        q(F, (V) => {
          l(p) && V(be);
        });
      }
      var U = y(F);
      {
        var oe = (V) => {
          var me = Ct();
          j(() => I(me, `,
                            ${l(u).length ?? ""} so far`)), S(V, me);
        };
        q(U, (V) => {
          l(u).length && V(oe);
        });
      }
      S(_, M);
    }, Sr = (_) => {
      var M = Ll(), F = ar(M), be = y(F);
      {
        var U = (oe) => {
          var V = Ct();
          j((me) => I(V, `· ${me ?? ""}`), [
            () => l(dt).map((me) => `${me.name} ${me.items.length}`).join(", ")
          ]), S(oe, V);
        };
        q(be, (oe) => {
          l(dt).length && oe(U);
        });
      }
      j(() => I(F, `${l(u).length ?? ""} found`)), S(_, M);
    }, Os = (_) => {
      var M = Ct("Search streaming sites and play without downloading");
      S(_, M);
    };
    q($t, (_) => {
      l(s) ? _(gn) : l(a) ? _(Sr, 1) : _(Os, -1);
    });
  }
  var Is = y(Kn, 2);
  let ci;
  var Ns = y(Mt, 2), Yn = R(Ns), di = y(Yn, 2), vi = y(qn, 2);
  {
    var Ds = (_) => {
      var M = Hl(), F = R(M), be = J(F), U = y(F, 2);
      Zt(U, 21, () => l(G), (oe) => ee(oe.site, oe.videoId), (oe, V) => {
        const me = /* @__PURE__ */ Ce(() => ee(l(V).site, l(V).videoId));
        var Gn = Bl(), bt = R(Gn);
        let Wn;
        var Jn = R(bt), Qn = R(Jn);
        {
          var Tr = (L) => {
            var Le = Pi();
            j(() => tn(Le, "src", l(V).thumbnail)), S(L, Le);
          };
          q(Qn, (L) => {
            l(V).thumbnail && L(Tr);
          });
        }
        var K = y(Qn, 2);
        {
          var se = (L) => {
            var Le = Fi(), Gt = J(Le, !0);
            j((Wt) => I(Gt, Wt), [() => tr(l(V).duration)]), S(L, Le);
          }, ne = /* @__PURE__ */ Ce(() => tr(l(V).duration));
          q(K, (L) => {
            l(ne) && L(se);
          });
        }
        var _e = y(Jn, 2), pe = R(_e), ce = J(pe, !0), ke = y(pe, 2), Kt = R(ke);
        {
          var Yt = (L) => {
            var Le = zl();
            S(L, Le);
          }, bn = (L) => {
            var Le = jl(), Gt = ar(Le);
            {
              var Wt = (et) => {
                var mt = nr(), mn = J(mt, !0);
                j(() => I(mn, l(V).resolution)), S(et, mt);
              };
              q(Gt, (et) => {
                l(V).resolution && et(Wt);
              });
            }
            var Rt = y(Gt, 2);
            {
              var Xn = (et) => {
                var mt = nr(), mn = J(mt, !0);
                j((Zn) => I(mn, Zn), [() => Ni(l(V).size)]), S(et, mt);
              };
              q(Rt, (et) => {
                l(V).size && et(Xn);
              });
            }
            S(L, Le);
          };
          q(Kt, (L) => {
            l(V).metadataStatus === "pending" ? L(Yt) : L(bn, -1);
          });
        }
        var Ze = y(bt, 2);
        j(
          (L) => {
            Wn = en(bt, 1, "tbx-card-body", null, Wn, { "tbx-disabled": l(x).blocked }), bt.disabled = l(x).blocked, I(ce, l(V).title), Ze.disabled = L, tn(Ze, "aria-label", `Remove ${l(V).title} from bookmarks`);
          },
          [() => l(Q).has(l(me))]
        ), ge("click", bt, () => X(l(V))), ge("click", Ze, () => T(P, l(me), !0)), S(oe, Gn);
      }), j(() => I(be, `Bookmarked (${l(G).length ?? ""})`)), S(_, M);
    };
    q(vi, (_) => {
      l(G).length && _(Ds);
    });
  }
  var hi = y(vi, 2);
  {
    var Ps = (_) => {
      var M = Ul(), F = y(R(M), 2), be = R(F), U = y(be, 2);
      ge("click", be, () => T(P, null)), ge("click", U, ve), S(_, M);
    };
    q(hi, (_) => {
      l(P) && _(Ps);
    });
  }
  var _i = y(hi, 2);
  Di(_i, {
    purpose: "scraping",
    get route() {
      return l(g);
    },
    gerund: "Searching",
    base: "Search",
    size: "sm",
    onDisabled: m
  });
  var Fs = y(_i, 2);
  {
    var Ls = (_) => {
      var M = eo(), F = R(M);
      {
        var be = (K) => {
          Di(K, {
            purpose: "streaming",
            get route() {
              return l(x);
            },
            gerund: "Streaming",
            base: "Stream",
            size: "lg",
            onDisabled: m
          });
        };
        q(F, (K) => {
          l(a) && !l(s) && K(be);
        });
      }
      var U = y(F, 2);
      {
        var oe = (K) => {
          var se = Vl(), ne = y(R(se));
          {
            var _e = (ce) => {
              var ke = Ct();
              j(() => I(ke, `${l(p) ?? ""} sites`)), S(ce, ke);
            };
            q(ne, (ce) => {
              l(p) && ce(_e);
            });
          }
          var pe = y(ne);
          j(() => I(pe, ` for “${l(D) ?? ""}”…`)), S(K, se);
        }, V = (K) => {
          var se = ql(), ne = R(se), _e = J(ne, !0), pe = y(ne, 2);
          j(() => I(_e, l(v))), ge("click", pe, E), S(K, se);
        }, me = (K) => {
          var se = $l(), ne = R(se), _e = J(ne), pe = y(ne, 2);
          j(() => I(_e, `No site had anything for “${l(D) ?? ""}”.`)), ge("click", pe, E), S(K, se);
        }, Gn = (K) => {
          var se = Jl();
          Zt(se, 21, () => l(dt), (ne) => ne.site, (ne, _e) => {
            var pe = Wl(), ce = R(pe), ke = R(ce), Kt = y(ke), Yt = J(Kt), bn = y(ce, 2);
            Zt(bn, 23, () => l(_e).items, (Ze) => `${Ze.site}:${Ze.video_id}`, (Ze, L, Le) => {
              const Gt = /* @__PURE__ */ Ce(() => ee(l(L).site, l(L).video_id));
              var Wt = Gl(), Rt = R(Wt);
              let Xn;
              var et = R(Rt), mt = R(et);
              {
                var mn = (W) => {
                  var ye = Pi();
                  j(() => tn(ye, "src", l(L).thumbnail)), S(W, ye);
                };
                q(mt, (W) => {
                  l(L).thumbnail && W(mn);
                });
              }
              var Zn = y(mt, 2);
              {
                var zs = (W) => {
                  var ye = Fi(), yn = J(ye, !0);
                  j((Mr) => I(yn, Mr), [() => tr(l(L).duration)]), S(W, ye);
                }, js = /* @__PURE__ */ Ce(() => tr(l(L).duration));
                q(Zn, (W) => {
                  l(js) && W(zs);
                });
              }
              var Bs = y(Zn, 2);
              {
                var Hs = (W) => {
                  var ye = Kl();
                  S(W, ye);
                };
                q(Bs, (W) => {
                  l(Le) === 0 && W(Hs);
                });
              }
              var Us = y(et, 2), pi = R(Us), Vs = J(pi, !0), qs = y(pi, 2), gi = R(qs);
              {
                var $s = (W) => {
                  var ye = nr(), yn = J(ye, !0);
                  j(() => I(yn, l(L).resolution)), S(W, ye);
                }, Ks = (W) => {
                  var ye = Yl();
                  S(W, ye);
                };
                q(gi, (W) => {
                  l(L).resolution ? W($s) : l(L).hd && W(Ks, 1);
                });
              }
              var Ys = y(gi, 2);
              {
                var Gs = (W) => {
                  var ye = nr(), yn = J(ye, !0);
                  j((Mr) => I(yn, Mr), [() => Ni(l(L).size)]), S(W, ye);
                };
                q(Ys, (W) => {
                  l(L).size && W(Gs);
                });
              }
              var Ar = y(Rt, 2);
              j(
                (W) => {
                  Xn = en(Rt, 1, "tbx-card-body", null, Xn, { "tbx-disabled": l(x).blocked }), Rt.disabled = l(x).blocked, I(Vs, l(L).title), Ar.disabled = W, tn(Ar, "aria-label", `Bookmark ${l(L).title}`);
                },
                [() => l(Q).has(l(Gt))]
              ), ge("click", Rt, () => ie(l(L))), ge("click", Ar, () => $e(l(L))), S(Ze, Wt);
            }), j(() => {
              I(ke, `${l(_e).name ?? ""} `), I(Yt, `top ${l(_e).items.length ?? ""}`);
            }), S(ne, pe);
          }), S(K, se);
        };
        q(U, (K) => {
          l(s) && !l(u).length ? K(oe) : l(v) ? K(V, 1) : l(a) && !l(s) && !l(u).length ? K(me, 2) : l(dt).length && K(Gn, 3);
        });
      }
      var bt = y(U, 2);
      {
        var Wn = (K) => {
          var se = Ql(), ne = R(se);
          {
            var _e = (ce) => {
              var ke = Ct();
              j(() => I(ke, `${l(p) - l(d)} of ${l(p) ?? ""} sites still searching…`)), S(ce, ke);
            }, pe = (ce) => {
              var ke = Ct("Still searching…");
              S(ce, ke);
            };
            q(ne, (ce) => {
              l(p) ? ce(_e) : ce(pe, -1);
            });
          }
          S(K, se);
        };
        q(bt, (K) => {
          l(s) && l(u).length && K(Wn);
        });
      }
      var Jn = y(bt, 2);
      {
        var Qn = (K) => {
          var se = Zl();
          Zt(se, 21, () => Object.entries(l(c)), ([ne, _e]) => ne, (ne, _e) => {
            var pe = /* @__PURE__ */ Ce(() => ia(l(_e), 2));
            let ce = () => l(pe)[0], ke = () => l(pe)[1];
            var Kt = Xl(), Yt = R(Kt), bn = J(Yt, !0), Ze = y(Yt);
            j(() => {
              I(bn, ce()), I(Ze, `: ${ke() ?? ""}`);
            }), S(ne, Kt);
          }), S(K, se);
        }, Tr = /* @__PURE__ */ Ce(() => Object.keys(l(c)).length);
        q(Jn, (K) => {
          l(Tr) && K(Qn);
        });
      }
      S(_, M);
    };
    q(Fs, (_) => {
      l(i) && _(Ls);
    });
  }
  j(
    (_) => {
      $n = en(Mt, 1, "tbx-trigger", null, $n, { "tbx-disabled": l(g).blocked }), Mt.disabled = l(g).blocked, ci = en(Is, 1, "tbx-chevron", null, ci, { "tbx-open": l(i) }), Yn.disabled = l(g).blocked, di.disabled = _;
    },
    [
      () => l(s) || !l(f).trim() || l(g).blocked
    ]
  ), ge("click", Mt, ue), ge("keydown", Yn, (_) => _.key === "Enter" && !l(g).blocked && H()), El(Yn, () => l(f), (_) => T(f, _)), ge("click", di, H), S(e, At), Er();
}
fi(["click", "keydown"]);
var ro = /* @__PURE__ */ z('<p class="tbx-error"> </p>'), io = /* @__PURE__ */ z('<p><span class="tbx-error"> </span> </p>'), so = /* @__PURE__ */ z('<div class="tbx-broken"></div>'), ao = /* @__PURE__ */ z('<li><span class="tbx-rank"> </span> <span class="tbx-list-main"><span class="tbx-list-name"> </span> <span class="tbx-muted"> </span></span> <span class="tbx-list-actions"><button type="button" class="tbx-icon">↑</button> <button type="button" class="tbx-icon">↓</button> <button type="button" class="tbx-btn tbx-btn-small"> </button></span></li>'), lo = /* @__PURE__ */ z('<p class="tbx-muted">No scrapers loaded.</p>'), oo = /* @__PURE__ */ z(`<div class="tbx tbx-settings"><div class="tbx-box"><div class="tbx-box-head"><div><p class="tbx-box-title">Site scrapers</p> <p class="tbx-muted">Loaded from <code> </code>. This is the add-on's own
                    bundled folder unless you have pointed it elsewhere, so updating the add-on
                    refreshes every scraper in it.</p></div> <button type="button" class="tbx-btn"> </button></div> <!> <!> <ul class="tbx-list"></ul> <!></div></div>`);
function fo(e, t) {
  xr(t, !0);
  let n = /* @__PURE__ */ $(null), r = /* @__PURE__ */ $(null), i = /* @__PURE__ */ $(!1), s = /* @__PURE__ */ $(!1), a = /* @__PURE__ */ $(null);
  function f(E, D) {
    E ? (T(n, E, !0), T(a, null)) : T(a, D, !0);
  }
  const u = async () => f(await Tl("/plugins"), "Could not read the scraper registry");
  async function c() {
    T(i, !0), f(await Al("/plugins/rescan"), "Rescan failed"), T(i, !1);
  }
  async function v(E, D) {
    T(r, E, !0), f(await Oi(`/plugins/${encodeURIComponent(E)}/enabled`, { enabled: D }), `Could not switch ${E} ${D ? "on" : "off"}`), T(r, null);
  }
  lr(() => {
    u();
    const E = setInterval(u, 5e3);
    return () => clearInterval(E);
  });
  const p = /* @__PURE__ */ Ce(() => {
    var he, ie;
    const E = (((he = l(n)) == null ? void 0 : he.scrapers) ?? []).filter((X) => !X.error), D = new Map(E.map((X) => [X.key, X])), H = (((ie = l(n)) == null ? void 0 : ie.site_order) ?? []).map((X) => D.get(X)).filter((X) => X !== void 0), ue = new Set(H.map((X) => X.key));
    return [...H, ...E.filter((X) => !ue.has(X.key))];
  });
  async function d(E, D) {
    const H = l(p).map((he) => he.key), ue = E + D;
    ue < 0 || ue >= H.length || ([H[E], H[ue]] = [H[ue], H[E]], T(s, !0), f(await Oi("/plugins/order", { order: H }), "Could not save the scraper order"), T(s, !1));
  }
  const h = /* @__PURE__ */ Ce(() => {
    var E;
    return (((E = l(n)) == null ? void 0 : E.scrapers) ?? []).filter((D) => D.error);
  });
  var b = oo(), m = R(b), g = R(m), x = R(g), G = y(R(x), 2), P = y(R(G)), Q = J(P, !0), ee = y(x, 2), Xe = J(ee, !0), te = y(g, 2);
  {
    var Fe = (E) => {
      var D = ro(), H = J(D, !0);
      j(() => I(H, l(a))), S(E, D);
    };
    q(te, (E) => {
      l(a) && E(Fe);
    });
  }
  var $e = y(te, 2);
  {
    var ve = (E) => {
      var D = so();
      Zt(D, 21, () => l(h), (H) => H.key, (H, ue) => {
        var he = io(), ie = R(he), X = J(ie, !0), At = y(ie);
        j(() => {
          I(X, l(ue).key), I(At, `: ${l(ue).error ?? ""}`);
        }), S(H, he);
      }), S(E, D);
    };
    q($e, (E) => {
      l(h).length && E(ve);
    });
  }
  var ut = y($e, 2);
  Zt(ut, 23, () => l(p), (E) => E.key, (E, D, H) => {
    var ue = ao(), he = R(ue), ie = J(he, !0), X = y(he, 2), At = R(X), qn = J(At, !0), Mt = y(At, 2), $n = J(Mt, !0), Kn = y(X, 2), qt = R(Kn), $t = y(qt, 2), gn = y($t, 2), Sr = J(gn, !0);
    j(() => {
      I(ie, l(H) + 1), I(qn, l(D).name), I($n, l(D).base_url), tn(qt, "aria-label", `Move ${l(D).name} up`), qt.disabled = l(s) || l(H) === 0, tn($t, "aria-label", `Move ${l(D).name} down`), $t.disabled = l(s) || l(H) === l(p).length - 1, gn.disabled = l(r) === l(D).key, I(Sr, l(D).enabled ? "On" : "Off");
    }), ge("click", qt, () => d(l(H), -1)), ge("click", $t, () => d(l(H), 1)), ge("click", gn, () => v(l(D).key, !l(D).enabled)), S(E, ue);
  });
  var ct = y(ut, 2);
  {
    var dt = (E) => {
      var D = lo();
      S(E, D);
    };
    q(ct, (E) => {
      l(n) && !l(p).length && !l(h).length && E(dt);
    });
  }
  j(() => {
    var E;
    I(Q, ((E = l(n)) == null ? void 0 : E.plugin_dir) ?? "…"), ee.disabled = l(i), I(Xe, l(i) ? "Rescanning…" : "Rescan folder");
  }), ge("click", ee, c), S(e, b), Er();
}
fi(["click"]);
function Li(e, t = () => ({})) {
  return ({ target: n, api: r, props: i, navigate: s, host: a }) => {
    Sl(r);
    const f = at({ ...i, navigate: s, host: a, ...t() }), u = cl(e, { target: n, props: f });
    return {
      /*
          Updated in place rather than remounted. Moving between two
          titles client-side should refresh this section, not tear it
          down -- a rebuild would drop the results already fetched and
          re-run twenty live site requests for a panel the user may not
          even have open.
      */
      update(c) {
        Object.assign(f, c ?? {});
      },
      destroy() {
        vl(u);
      }
    };
  };
}
const vo = { details: Li(no), settings: Li(fo) };
export {
  vo as slots
};
