var ea = Object.defineProperty;
var mi = (e) => {
  throw TypeError(e);
};
var ta = (e, t, n) => t in e ? ea(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Fe = (e, t, n) => ta(e, typeof t != "symbol" ? t + "" : t, n), Rr = (e, t, n) => t.has(e) || mi("Cannot " + n);
var o = (e, t, n) => (Rr(e, t, "read from private field"), n ? n.call(e) : t.get(e)), M = (e, t, n) => t.has(e) ? mi("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), A = (e, t, n, r) => (Rr(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), D = (e, t, n) => (Rr(e, t, "access private method"), n);
const ve = Symbol("uninitialized"), na = "http://www.w3.org/1999/xhtml", Vi = !1;
var Hi = Array.isArray, ra = Array.prototype.indexOf, dr = Array.prototype.includes, xr = Array.from, Ui = Object.defineProperty, On = Object.getOwnPropertyDescriptor, ia = Object.getOwnPropertyDescriptors, sa = Object.prototype, aa = Array.prototype, qi = Object.getPrototypeOf, yi = Object.isExtensible;
const la = () => {
};
function oa(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function Ki() {
  var e, t, n = new Promise((r, i) => {
    e = r, t = i;
  });
  return { promise: n, resolve: e, reject: t };
}
function Yi(e, t) {
  if (Array.isArray(e))
    return e;
  if (t === void 0 || !(Symbol.iterator in e))
    return Array.from(e);
  const n = [];
  for (const r of e)
    if (n.push(r), n.length === t) break;
  return n;
}
const pe = 2, Ln = 4, kr = 8, Gi = 1 << 24, Ze = 16, $e = 32, yt = 64, zr = 128, ei = 256, Ge = 512, he = 1024, ce = 2048, tt = 4096, Me = 8192, Ve = 16384, mn = 32768, Br = 1 << 25, _n = 65536, vr = 1 << 17, fa = 1 << 18, yn = 1 << 19, ua = 1 << 20, ft = 1 << 25, Kt = 65536, hr = 1 << 21, an = 1 << 22, Nt = 1 << 23, Cr = Symbol("$state"), $i = Symbol("component"), ca = Symbol(""), lr = Symbol("attributes"), Vr = Symbol("class"), da = Symbol("style"), Tn = Symbol("text"), or = Symbol("form reset"), Kn = new class extends Error {
  constructor() {
    super(...arguments);
    Fe(this, "name", "StaleReactionError");
    Fe(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
function va() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function ha() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Ji(e) {
  return e === this.v;
}
function _a(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Wi(e) {
  return !_a(e, this.v);
}
function pa() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function ba(e, t, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function ga(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function ma() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function ya(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function wa() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function xa() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function ka() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Ea() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Sa() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
let Ta = !1, De = null;
function pn(e) {
  De = e;
}
function Yn(e, t = !1, n) {
  De = {
    p: De,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      j
    ),
    l: null
  };
}
function Gn(e) {
  var t = (
    /** @type {ComponentContext} */
    De
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      ps(r);
  }
  return t.i = !0, De = t.p, Qi(e);
}
function Qi(e = {}) {
  return Ui(e, $i, { value: !0 }), e;
}
function Xi() {
  return !0;
}
let Dt = [];
function Zi() {
  var e = Dt;
  Dt = [], oa(e);
}
function At(e) {
  if (Dt.length === 0 && !Dn) {
    var t = Dt;
    queueMicrotask(() => {
      t === Dt && Zi();
    });
  }
  Dt.push(e);
}
function Aa() {
  for (; Dt.length > 0; )
    Zi();
}
const Ma = -7169;
function se(e, t) {
  e.f = e.f & Ma | t;
}
function ti(e) {
  (e.f & Ge) !== 0 || e.deps === null ? se(e, he) : se(e, tt);
}
function es(e) {
  if (e !== null)
    for (const t of e)
      (t.f & pe) === 0 || (t.f & Kt) === 0 || (t.f ^= Kt, es(
        /** @type {Derived} */
        t.deps
      ));
}
function ts(e, t, n) {
  (e.f & ce) !== 0 ? t.add(e) : (e.f & tt) !== 0 && n.add(e), es(e.deps), se(e, he);
}
let wi = !1;
function Na() {
  wi || (wi = !0, document.addEventListener(
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
            (t = n[or]) == null || t.call(n);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function $n(e) {
  var t = I, n = j;
  Je(null), ht(null);
  try {
    return e();
  } finally {
    Je(t), ht(n);
  }
}
function Ra(e, t, n, r = n) {
  e.addEventListener(t, () => $n(n));
  const i = (
    /** @type {any} */
    e[or]
  );
  i ? e[or] = () => {
    i(), r(!0);
  } : e[or] = () => r(!0), Na();
}
function Ca(e, t, n, r) {
  const i = ni;
  var s = e.filter((v) => !v.settled), l = t.map(i);
  if (n.length === 0 && s.length === 0) {
    r(l);
    return;
  }
  var f = (
    /** @type {Effect} */
    j
  ), u = Oa(), c = s.length === 1 ? s[0].promise : s.length > 1 ? Promise.all(s.map((v) => v.promise)) : null;
  function h(v) {
    if ((f.f & Ve) === 0) {
      u();
      try {
        r([...l, ...v]);
      } catch (g) {
        ot(g, f);
      }
      _r();
    }
  }
  var p = ns();
  if (n.length === 0) {
    c.then(() => h([])).finally(p);
    return;
  }
  function d() {
    Promise.all(n.map((v) => /* @__PURE__ */ Ia(v))).then(h).catch((v) => ot(v, f)).finally(p);
  }
  c ? c.then(() => {
    u(), d(), _r();
  }) : d();
}
function Oa() {
  var e = (
    /** @type {Effect} */
    j
  ), t = I, n = De, r = (
    /** @type {Batch} */
    E
  );
  return function(s = !0) {
    ht(e), Je(t), pn(n), s && (e.f & Ve) === 0 && (r == null || r.activate(), r == null || r.apply());
  };
}
function _r(e = !0) {
  ht(null), Je(null), pn(null), e && (E == null || E.deactivate());
}
function ns() {
  var e = (
    /** @type {Effect} */
    j
  ), t = e.b, n = (
    /** @type {Batch} */
    E
  ), r = !!(t != null && t.is_rendered());
  return t == null || t.update_pending_count(1, n), n.increment(r, e), () => {
    t == null || t.update_pending_count(-1, n), n.decrement(r, e);
  };
}
// @__NO_SIDE_EFFECTS__
function ni(e) {
  var t = pe | ce;
  return j !== null && (j.f |= yn), {
    ctx: De,
    deps: null,
    effects: null,
    equals: Ji,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      ve
    ),
    wv: 0,
    parent: j,
    ac: null
  };
}
const An = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function Ia(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    j
  );
  r === null && pa();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = Gt(
    /** @type {V} */
    ve
  ), l = !I, f = /* @__PURE__ */ new Set();
  return Qa(() => {
    var v, g;
    var u = (
      /** @type {Effect} */
      j
    ), c = Ki();
    i = c.promise;
    try {
      Promise.resolve(e()).then(c.resolve, (m) => {
        m !== Kn && c.reject(m);
      }).finally(_r);
    } catch (m) {
      c.reject(m), _r();
    }
    var h = (
      /** @type {Batch} */
      E
    );
    if (l) {
      if ((u.f & mn) !== 0)
        var p = ns();
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        (v = r.b) != null && v.is_rendered()
      )
        (g = h.async_deriveds.get(u)) == null || g.reject(An);
      else
        for (const m of f.values())
          m.reject(An);
      f.add(c), h.async_deriveds.set(u, c);
    }
    const d = (m, b = void 0) => {
      p == null || p(), f.delete(c), b !== An && (h.activate(), b ? (s.f |= Nt, bn(s, b)) : ((s.f & Nt) !== 0 && (s.f ^= Nt), bn(s, m)), h.deactivate());
    };
    c.promise.then(d, (m) => d(null, m || "unknown"));
  }), Ja(() => {
    for (const u of f)
      u.reject(An);
  }), new Promise((u) => {
    function c(h) {
      function p() {
        h === i ? u(s) : c(i);
      }
      h.then(p, p);
    }
    c(i);
  });
}
// @__NO_SIDE_EFFECTS__
function Ce(e) {
  const t = /* @__PURE__ */ ni(e);
  return xs(t), t;
}
// @__NO_SIDE_EFFECTS__
function Da(e) {
  const t = /* @__PURE__ */ ni(e);
  return t.equals = Wi, t;
}
function Pa(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      Pe(
        /** @type {Effect} */
        t[n]
      );
  }
}
function ri(e) {
  var t, n = j, r = e.parent;
  if (!Rt && r !== null && e.v !== ve && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (Ve | Me)) !== 0)
    return va(), e.v;
  ht(r);
  try {
    e.f &= ~Kt, Pa(e), t = Ts(e);
  } finally {
    ht(n);
  }
  return t;
}
function rs(e) {
  var t = ri(e);
  if (!e.equals(t) && (e.wv = Es(), (!(E != null && E.is_fork) || e.deps === null) && (E !== null ? (E.capture(e, t, !0), In == null || In.capture(e, t, !0)) : e.v = t, e.deps === null))) {
    se(e, he);
    return;
  }
  Rt || (ge !== null ? (ai() || E != null && E.is_fork) && ge.set(e, t) : ti(e));
}
function Fa(e) {
  var t;
  if (e.effects !== null)
    for (const n of e.effects)
      (n.teardown || n.ac) && ((t = n.teardown) == null || t.call(n), n.ac !== null && $n(() => {
        n.ac.abort(Kn), n.ac = null;
      }), n.fn !== null && (n.teardown = la), zn(n, 0), oi(n));
}
function is(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && t.fn !== null && gn(t);
}
let Or = null, nn = null, E = null, In = null, ge = null, Hr = null, Dn = !1, Ir = !1, sn = null, fr = null;
var xi = 0;
let La = 1;
var on, St, jt, fn, un, cn, pt, dn, Oe, Bn, bt, Qe, st, vn, zt, q, Ur, Mn, qr, ss, as, rn, ja, Nn;
const mr = class mr {
  constructor() {
    M(this, q);
    Fe(this, "id", La++);
    /** True as soon as `#process` was called */
    M(this, on, !1);
    Fe(this, "linked", !0);
    /** @type {Batch | null} */
    M(this, St, null);
    /** @type {Batch | null} */
    M(this, jt, null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    Fe(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    Fe(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    Fe(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    M(this, fn, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    M(this, un, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    M(this, cn, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    M(this, pt, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    M(this, dn, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    M(this, Oe, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    M(this, Bn, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    M(this, bt, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    M(this, Qe, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    M(this, st, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    M(this, vn, /* @__PURE__ */ new Set());
    Fe(this, "is_fork", !1);
    M(this, zt, !1);
    nn === null ? Or = nn = this : (A(nn, jt, this), A(this, St, nn)), nn = this;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    o(this, st).has(t) || o(this, st).set(t, { d: [], m: [] }), o(this, vn).delete(t);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(t, n = (r) => this.schedule(r)) {
    var r = o(this, st).get(t);
    if (r) {
      o(this, st).delete(t);
      for (var i of r.d)
        se(i, ce), n(i);
      for (i of r.m)
        se(i, tt), n(i);
    }
    o(this, vn).add(t);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(t, n, r = !1) {
    t.v !== ve && !this.previous.has(t) && this.previous.set(t, t.v), (t.f & Nt) === 0 && (this.current.set(t, [n, r]), ge == null || ge.set(t, n)), this.is_fork || (t.v = n);
  }
  activate() {
    E = this;
  }
  deactivate() {
    E = null, ge = null;
  }
  flush() {
    try {
      Ir = !0, E = this, D(this, q, Mn).call(this);
    } finally {
      xi = 0, Hr = null, sn = null, fr = null, Ir = !1, E = null, ge = null, dt.clear();
    }
  }
  discard() {
    var t;
    for (const n of o(this, un)) n(this);
    o(this, un).clear();
    for (const n of this.async_deriveds.values())
      n.reject(An);
    D(this, q, Nn).call(this), (t = o(this, dn)) == null || t.resolve();
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(t) {
    o(this, Bn).push(t);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(t, n) {
    if (A(this, cn, o(this, cn) + 1), t) {
      let r = o(this, pt).get(n) ?? 0;
      o(this, pt).set(n, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(t, n) {
    if (A(this, cn, o(this, cn) - 1), t) {
      let r = o(this, pt).get(n) ?? 0;
      r === 1 ? o(this, pt).delete(n) : o(this, pt).set(n, r - 1);
    }
    o(this, zt) || (A(this, zt, !0), At(() => {
      A(this, zt, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(t, n) {
    for (const r of t)
      o(this, bt).add(r);
    for (const r of n)
      o(this, Qe).add(r);
    t.clear(), n.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(t) {
    o(this, fn).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    o(this, un).add(t);
  }
  settled() {
    return (o(this, dn) ?? A(this, dn, Ki())).promise;
  }
  static ensure() {
    if (E === null) {
      const t = E = new mr();
      !Ir && !Dn && At(() => {
        o(t, on) || t.flush();
      });
    }
    return E;
  }
  apply() {
    {
      ge = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(t) {
    var i;
    if (Hr = t, (i = t.b) != null && i.is_pending && (t.f & (Ln | kr | Gi)) !== 0 && (t.f & mn) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var n = t; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (sn !== null && n === j && (I === null || (I.f & pe) === 0))
        return;
      if ((r & (yt | $e)) !== 0) {
        if ((r & he) === 0)
          return;
        n.f ^= he;
      }
    }
    o(this, Oe).push(n);
  }
};
on = new WeakMap(), St = new WeakMap(), jt = new WeakMap(), fn = new WeakMap(), un = new WeakMap(), cn = new WeakMap(), pt = new WeakMap(), dn = new WeakMap(), Oe = new WeakMap(), Bn = new WeakMap(), bt = new WeakMap(), Qe = new WeakMap(), st = new WeakMap(), vn = new WeakMap(), zt = new WeakMap(), q = new WeakSet(), Ur = function() {
  if (this.is_fork) return !0;
  for (const r of o(this, pt).keys()) {
    for (var t = r, n = !1; t.parent !== null; ) {
      if (o(this, st).has(t)) {
        n = !0;
        break;
      }
      t = t.parent;
    }
    if (!n)
      return !0;
  }
  return !1;
}, Mn = function() {
  var u, c, h, p;
  A(this, on, !0), xi++ > 1e3 && (D(this, q, Nn).call(this), Ba());
  for (const d of o(this, bt))
    o(this, Qe).delete(d), se(d, ce), this.schedule(d);
  for (const d of o(this, Qe))
    se(d, tt), this.schedule(d);
  const t = o(this, Oe);
  A(this, Oe, []), this.apply();
  var n = sn = [], r = [], i = fr = [];
  for (const d of t)
    try {
      D(this, q, qr).call(this, d, n, r);
    } catch (v) {
      throw fs(d), D(this, q, Ur).call(this) || this.discard(), v;
    }
  if (E = null, i.length > 0) {
    var s = mr.ensure();
    for (const d of i)
      s.schedule(d);
  }
  if (sn = null, fr = null, D(this, q, Ur).call(this)) {
    D(this, q, rn).call(this, r), D(this, q, rn).call(this, n);
    for (const [d, v] of o(this, st))
      os(d, v);
    i.length > 0 && /** @type {unknown} */
    D(u = E, q, Mn).call(u);
    return;
  }
  const l = D(this, q, ss).call(this);
  if (l) {
    D(this, q, rn).call(this, r), D(this, q, rn).call(this, n), D(c = l, q, as).call(c, this);
    return;
  }
  o(this, bt).clear(), o(this, Qe).clear();
  for (const d of o(this, fn)) d(this);
  o(this, fn).clear(), In = this, ki(r), ki(n), In = null, (h = o(this, dn)) == null || h.resolve();
  var f = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    E
  );
  if (o(this, cn) === 0 && (o(this, Oe).length === 0 || f !== null) && D(this, q, Nn).call(this), o(this, Oe).length > 0)
    if (f !== null) {
      const d = f;
      o(d, Oe).push(...o(this, Oe).filter((v) => !o(d, Oe).includes(v)));
    } else
      f = this;
  f !== null && (dt.clear(), D(p = f, q, Mn).call(p));
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
qr = function(t, n, r) {
  t.f ^= he;
  for (var i = t.first; i !== null; ) {
    var s = i.f, l = (s & ($e | yt)) !== 0, f = l && (s & he) !== 0, u = f || (s & Me) !== 0 || o(this, st).has(i);
    if (!u && i.fn !== null) {
      l ? i.f ^= he : (s & Ln) !== 0 ? n.push(i) : Wn(i) && ((s & Ze) !== 0 && o(this, Qe).add(i), gn(i));
      var c = i.first;
      if (c !== null) {
        i = c;
        continue;
      }
    }
    for (; i !== null; ) {
      var h = i.next;
      if (h !== null) {
        i = h;
        break;
      }
      i = i.parent;
    }
  }
}, ss = function() {
  for (var t = o(this, St); t !== null; ) {
    if (!t.is_fork) {
      for (const [n, [, r]] of this.current)
        if (t.current.has(n) && !r)
          return t;
    }
    t = o(t, St);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
as = function(t) {
  var r;
  for (const [i, s] of t.current)
    !this.previous.has(i) && t.previous.has(i) && this.previous.set(i, t.previous.get(i)), this.current.set(i, s);
  for (const [i, s] of t.async_deriveds) {
    const l = this.async_deriveds.get(i);
    l && s.promise.then(l.resolve).catch(l.reject);
  }
  t.async_deriveds.clear(), this.transfer_effects(o(t, bt), o(t, Qe));
  const n = (i) => {
    var s = i.reactions;
    if (s !== null && !((i.f & pe) !== 0 && (i.f & (ce | tt)) === 0))
      for (const u of s) {
        var l = u.f;
        if ((l & pe) !== 0)
          n(
            /** @type {Derived} */
            u
          );
        else {
          var f = (
            /** @type {Effect} */
            u
          );
          l & (an | Ze) && !this.async_deriveds.has(f) && (o(this, Qe).delete(f), se(f, ce), this.schedule(f));
        }
      }
  };
  for (const i of this.current.keys())
    n(i);
  this.oncommit(() => t.discard()), D(r = t, q, Nn).call(r), E = this, D(this, q, Mn).call(this);
}, /**
 * @param {Effect[]} effects
 */
rn = function(t) {
  for (var n = 0; n < t.length; n += 1)
    ts(t[n], o(this, bt), o(this, Qe));
}, ja = function() {
  var p;
  for (let d = Or; d !== null; d = o(d, jt)) {
    var t = d.id < this.id, n = [];
    for (const [v, [g, m]] of this.current) {
      if (d.current.has(v)) {
        var r = (
          /** @type {[any, boolean]} */
          d.current.get(v)[0]
        );
        if (t && g !== r)
          d.current.set(v, [g, m]);
        else
          continue;
      }
      n.push(v);
    }
    if (t)
      for (const [v, g] of this.async_deriveds) {
        const m = d.async_deriveds.get(v);
        m && g.promise.then(m.resolve).catch(m.reject);
      }
    var i = [...d.current.keys()].filter(
      (v) => !/** @type {[any, boolean]} */
      d.current.get(v)[1]
    );
    if (!(!o(d, on) || i.length === 0)) {
      var s = i.filter((v) => !this.current.has(v));
      if (s.length === 0)
        t && d.discard();
      else if (n.length > 0) {
        if (t)
          for (const v of o(this, vn))
            d.unskip_effect(v, (g) => {
              var m;
              (g.f & (Ze | an)) !== 0 ? d.schedule(g) : D(m = d, q, rn).call(m, [g]);
            });
        d.activate();
        var l = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Map();
        for (var u of n)
          ls(u, s, l, f);
        f = /* @__PURE__ */ new Map();
        var c = [...d.current].filter(([v, g]) => {
          const m = this.current.get(v);
          return m ? m[0] !== g[0] || m[1] !== g[1] : !0;
        }).map(([v]) => v);
        if (c.length > 0)
          for (const v of o(this, Bn))
            (v.f & (Ve | Me | vr)) === 0 && ii(v, c, f) && ((v.f & (an | Ze)) !== 0 ? (se(v, ce), d.schedule(v)) : o(d, bt).add(v));
        if (o(d, Oe).length > 0 && !o(d, zt)) {
          d.apply();
          for (var h of o(d, Oe))
            D(p = d, q, qr).call(p, h, [], []);
          A(d, Oe, []);
        }
        d.deactivate();
      }
    }
  }
}, Nn = function() {
  if (this.linked) {
    var t = o(this, St), n = o(this, jt);
    t === null ? Or = n : A(t, jt, n), n === null ? nn = t : A(n, St, t), this.linked = !1;
  }
};
let Yt = mr;
function za(e) {
  var t = Dn;
  Dn = !0;
  try {
    for (var n; ; ) {
      if (Aa(), E === null)
        return (
          /** @type {T} */
          n
        );
      E.flush();
    }
  } finally {
    Dn = t;
  }
}
function Ba() {
  try {
    wa();
  } catch (e) {
    ot(e, Hr);
  }
}
let We = null;
function ki(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (Ve | Me)) === 0 && Wn(r) && (We = /* @__PURE__ */ new Set(), gn(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && ms(r), (We == null ? void 0 : We.size) > 0)) {
        dt.clear();
        for (const i of We) {
          if ((i.f & (Ve | Me)) !== 0) continue;
          const s = [i];
          let l = i.parent;
          for (; l !== null; )
            We.has(l) && (We.delete(l), s.push(l)), l = l.parent;
          for (let f = s.length - 1; f >= 0; f--) {
            const u = s[f];
            (u.f & (Ve | Me)) === 0 && gn(u);
          }
        }
        We.clear();
      }
    }
    We = null;
  }
}
function ls(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const i of e.reactions) {
      const s = i.f;
      (s & pe) !== 0 ? ls(
        /** @type {Derived} */
        i,
        t,
        n,
        r
      ) : (s & (an | Ze)) !== 0 && (s & ce) === 0 && ii(i, t, r) && (se(i, ce), si(
        /** @type {Effect} */
        i
      ));
    }
}
function ii(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const i of e.deps) {
      if (dr.call(t, i))
        return !0;
      if ((i.f & pe) !== 0 && ii(
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
function si(e) {
  E.schedule(e);
}
function os(e, t) {
  if (!((e.f & $e) !== 0 && (e.f & he) !== 0)) {
    (e.f & ce) !== 0 ? t.d.push(e) : (e.f & tt) !== 0 && t.m.push(e), se(e, he);
    for (var n = e.first; n !== null; )
      os(n, t), n = n.next;
  }
}
function fs(e) {
  se(e, he);
  for (var t = e.first; t !== null; )
    fs(t), t = t.next;
}
let pr = /* @__PURE__ */ new Set();
const dt = /* @__PURE__ */ new Map();
let us = !1;
function Gt(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Ji,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function H(e, t) {
  const n = Gt(e);
  return xs(n), n;
}
// @__NO_SIDE_EFFECTS__
function Va(e, t = !1, n = !0) {
  const r = Gt(e);
  return t || (r.equals = Wi), r;
}
function x(e, t, n = !1) {
  I !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!et || (I.f & vr) !== 0) && Xi() && (I.f & (pe | Ze | an | vr)) !== 0 && (vt === null || !vt.has(e)) && Ea();
  let r = n ? ut(t) : t;
  return bn(e, r, fr);
}
function bn(e, t, n = null) {
  if (!e.equals(t)) {
    Rt ? dt.set(e, t) : dt.has(e) || dt.set(e, e.v);
    var r = Yt.ensure();
    if (r.capture(e, t), (e.f & pe) !== 0) {
      const i = (
        /** @type {Derived} */
        e
      );
      (e.f & ce) !== 0 && ri(i), ge === null && ti(i);
    }
    e.wv = Es(), cs(e, ce, n), j !== null && (j.f & he) !== 0 && (j.f & ($e | yt)) === 0 && (Ue === null ? el([e]) : Ue.push(e)), !r.is_fork && pr.size > 0 && !us && Ha();
  }
  return t;
}
function Ha() {
  us = !1;
  for (const e of pr) {
    (e.f & he) !== 0 && se(e, tt);
    let t;
    try {
      t = Wn(e);
    } catch {
      t = !0;
    }
    t && gn(e);
  }
  pr.clear();
}
function Pn(e) {
  x(e, e.v + 1);
}
function cs(e, t, n) {
  var r = e.reactions;
  if (r !== null)
    for (var i = r.length, s = 0; s < i; s++) {
      var l = r[s], f = l.f, u = (f & ce) === 0;
      if (u && se(l, t), (f & vr) !== 0)
        pr.add(
          /** @type {Effect} */
          l
        );
      else if ((f & pe) !== 0) {
        var c = (
          /** @type {Derived} */
          l
        );
        ge == null || ge.delete(c), (f & Kt) === 0 && (f & Ge && (j === null || (j.f & hr) === 0) && (l.f |= Kt), cs(c, tt, n));
      } else if (u) {
        var h = (
          /** @type {Effect} */
          l
        );
        (f & Ze) !== 0 && We !== null && We.add(h), n !== null ? n.push(h) : si(h);
      }
    }
}
function ut(e) {
  if (typeof e != "object" || e === null || Cr in e || $i in e)
    return e;
  const t = qi(e);
  if (t !== sa && t !== aa)
    return e;
  var n = /* @__PURE__ */ new Map(), r = Hi(e), i = /* @__PURE__ */ H(0), s = qt, l = (f) => {
    if (qt === s)
      return f();
    var u = I, c = qt;
    Je(null), Ti(s);
    var h = f();
    return Je(u), Ti(c), h;
  };
  return r && n.set("length", /* @__PURE__ */ H(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(f, u, c) {
        (!("value" in c) || c.configurable === !1 || c.enumerable === !1 || c.writable === !1) && xa();
        var h = n.get(u);
        return h === void 0 ? l(() => {
          var p = /* @__PURE__ */ H(c.value);
          return n.set(u, p), p;
        }) : x(h, c.value, !0), !0;
      },
      deleteProperty(f, u) {
        var c = n.get(u);
        if (c === void 0) {
          if (u in f) {
            const h = l(() => /* @__PURE__ */ H(ve));
            n.set(u, h), Pn(i);
          }
        } else
          x(c, ve), Pn(i);
        return !0;
      },
      get(f, u, c) {
        var v;
        if (u === Cr)
          return e;
        var h = n.get(u), p = u in f;
        if (h === void 0 && (!p || (v = On(f, u)) != null && v.writable) && (h = l(() => {
          var g = ut(p ? f[u] : ve), m = /* @__PURE__ */ H(g);
          return m;
        }), n.set(u, h)), h !== void 0) {
          var d = a(h);
          return d === ve ? void 0 : d;
        }
        return Reflect.get(f, u, c);
      },
      getOwnPropertyDescriptor(f, u) {
        var c = Reflect.getOwnPropertyDescriptor(f, u);
        if (c && "value" in c) {
          var h = n.get(u);
          h && (c.value = a(h));
        } else if (c === void 0) {
          var p = n.get(u), d = p == null ? void 0 : p.v;
          if (p !== void 0 && d !== ve)
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
        var c = n.get(u), h = c !== void 0 && c.v !== ve || Reflect.has(f, u);
        if (c !== void 0 || j !== null && (!h || (d = On(f, u)) != null && d.writable)) {
          c === void 0 && (c = l(() => {
            var v = h ? ut(f[u]) : ve, g = /* @__PURE__ */ H(v);
            return g;
          }), n.set(u, c));
          var p = a(c);
          if (p === ve)
            return !1;
        }
        return h;
      },
      set(f, u, c, h) {
        var P;
        var p = n.get(u), d = u in f;
        if (r && u === "length")
          for (var v = c; v < /** @type {Source<number>} */
          p.v; v += 1) {
            var g = n.get(v + "");
            g !== void 0 ? x(g, ve) : v in f && (g = l(() => /* @__PURE__ */ H(ve)), n.set(v + "", g));
          }
        if (p === void 0)
          (!d || (P = On(f, u)) != null && P.writable) && (p = l(() => /* @__PURE__ */ H(void 0)), x(p, ut(c)), n.set(u, p));
        else {
          d = p.v !== ve;
          var m = l(() => ut(c));
          x(p, m);
        }
        var b = Reflect.getOwnPropertyDescriptor(f, u);
        if (b != null && b.set && b.set.call(h, c), !d) {
          if (r && typeof u == "string") {
            var k = (
              /** @type {Source<number>} */
              n.get("length")
            ), $ = Number(u);
            Number.isInteger($) && $ >= k.v && x(k, $ + 1);
          }
          Pn(i);
        }
        return !0;
      },
      ownKeys(f) {
        a(i);
        var u = Reflect.ownKeys(f).filter((p) => {
          var d = n.get(p);
          return d === void 0 || d.v !== ve;
        });
        for (var [c, h] of n)
          h.v !== ve && !(c in f) && u.push(c);
        return u;
      },
      setPrototypeOf() {
        ka();
      }
    }
  );
}
var Ei, ds, vs, hs;
function Ua() {
  if (Ei === void 0) {
    Ei = window, ds = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    vs = On(t, "firstChild").get, hs = On(t, "nextSibling").get, yi(e) && (e[Vr] = void 0, e[lr] = null, e[da] = void 0, e.__e = void 0), yi(n) && (n[Tn] = void 0);
  }
}
function mt(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function jn(e) {
  return (
    /** @type {TemplateNode | null} */
    vs.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function Jn(e) {
  return (
    /** @type {TemplateNode | null} */
    hs.call(e)
  );
}
function T(e, t) {
  return /* @__PURE__ */ jn(e);
}
function ln(e, t = !1) {
  {
    var n = /* @__PURE__ */ jn(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Jn(n) : n;
  }
}
function Q(e, t = !1) {
  return /* @__PURE__ */ jn(e);
}
function y(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Jn(r);
  return r;
}
function qa(e) {
  e.textContent = "";
}
function _s() {
  return !1;
}
function Ka(e, t, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    n ? document.createElement(e, { is: n }) : document.createElement(e)
  );
}
function Ya(e) {
  var t = j;
  if (t === null)
    return I.f |= Nt, e;
  if ((t.f & mn) === 0 && (t.f & Ln) === 0)
    throw e;
  ot(e, t);
}
function ot(e, t) {
  if (!(t !== null && (t.f & Ve) !== 0)) {
    for (; t !== null; ) {
      if ((t.f & zr) !== 0 && (t.f & (Ve | Br)) === 0) {
        if ((t.f & mn) === 0)
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
function Ga(e) {
  j === null && (I === null && ya(), ma()), Rt && ga();
}
function $a(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Ct(e, t) {
  var n = j;
  n !== null && (n.f & Me) !== 0 && (e |= Me);
  var r = {
    ctx: De,
    deps: null,
    nodes: null,
    f: e | ce | Ge,
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
  E == null || E.register_created_effect(r);
  var i = r;
  if ((e & Ln) !== 0)
    sn !== null ? sn.push(r) : Yt.ensure().schedule(r);
  else if (t !== null) {
    try {
      gn(r);
    } catch (l) {
      throw Pe(r), l;
    }
    i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
    (i.f & yn) === 0 && (i = i.first, (e & Ze) !== 0 && (e & _n) !== 0 && i !== null && (i.f |= _n));
  }
  if (i !== null && (i.parent = n, n !== null && $a(i, n), I !== null && (I.f & pe) !== 0 && (e & yt) === 0)) {
    var s = (
      /** @type {Derived} */
      I
    );
    (s.effects ?? (s.effects = [])).push(i);
  }
  return r;
}
function ai() {
  return I !== null && !et;
}
function Ja(e) {
  const t = Ct(kr, null);
  return se(t, he), t.teardown = e, t;
}
function Fn(e) {
  Ga();
  var t = (
    /** @type {Effect} */
    j.f
  ), n = !I && (t & $e) !== 0 && De !== null && !De.i;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      De
    );
    (r.e ?? (r.e = [])).push(e);
  } else
    return ps(e);
}
function ps(e) {
  return Ct(Ln | ua, e);
}
function Wa(e) {
  Yt.ensure();
  const t = Ct(yt | yn, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? Ut(t, () => {
      Pe(t), r(void 0);
    }) : (Pe(t), r(void 0));
  });
}
function Qa(e) {
  return Ct(an | yn, e);
}
function bs(e, t = 0) {
  return Ct(kr | t, e);
}
function L(e, t = [], n = [], r = []) {
  Ca(r, t, n, (i) => {
    Ct(kr, () => {
      e(...i.map(a));
    });
  });
}
function li(e, t = 0) {
  var n = Ct(Ze | t, e);
  return n;
}
function Ye(e) {
  return Ct($e | yn, e);
}
function gs(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = Rt, r = I;
    Si(!0), Je(null);
    try {
      t.call(null);
    } catch (i) {
      ot(i, e.parent);
    } finally {
      Si(n), Je(r);
    }
  }
}
function oi(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const i = n.ac;
    i !== null && $n(() => {
      i.abort(Kn);
    });
    var r = n.next;
    (n.f & yt) !== 0 ? n.parent = null : Pe(n, t), n = r;
  }
}
function Xa(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & $e) === 0 && Pe(t), t = n;
  }
}
function Pe(e, t = !0) {
  var n = !1;
  (t || (e.f & fa) !== 0) && e.nodes !== null && e.nodes.end !== null && (Za(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), e.f |= Br, oi(e, t && !n), zn(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const s of r)
      s.stop();
  gs(e), e.f ^= Br, e.f |= Ve;
  var i = e.parent;
  i !== null && i.first !== null && ms(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Za(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ Jn(e);
    e.remove(), e = n;
  }
}
function ms(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Ut(e, t, n = !0) {
  var r = [];
  e.f |= ei, ys(e, r, !0);
  var i = () => {
    n && Pe(e), t && t();
  }, s = r.length;
  if (s > 0) {
    var l = () => --s || i();
    for (var f of r)
      f.out(l);
  } else
    i();
}
function ys(e, t, n) {
  if ((e.f & Me) === 0) {
    e.f ^= Me;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const f of r)
        (f.is_global || n) && t.push(f);
    for (var i = e.first; i !== null; ) {
      var s = i.next;
      if ((i.f & yt) === 0) {
        var l = (i.f & _n) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (i.f & $e) !== 0 && (e.f & Ze) !== 0;
        ys(i, t, l ? n : !1);
      }
      i = s;
    }
  }
}
function br(e) {
  e.f &= ~ei, ws(e, !0);
}
function ws(e, t) {
  if ((e.f & ei) === 0 && (e.f & Me) !== 0) {
    e.f ^= Me, (e.f & he) === 0 && (se(e, ce), Yt.ensure().schedule(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, i = (n.f & _n) !== 0 || (n.f & $e) !== 0;
      ws(n, i ? t : !1), n = r;
    }
    var s = e.nodes && e.nodes.t;
    if (s !== null)
      for (const l of s)
        (l.is_global || t) && l.in();
  }
}
function fi(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var i = n === r ? null : /* @__PURE__ */ Jn(n);
      t.append(n), n = i;
    }
}
let ur = !1, Rt = !1;
function Si(e) {
  Rt = e;
}
let I = null, et = !1;
function Je(e) {
  I = e;
}
let j = null;
function ht(e) {
  j = e;
}
let vt = null;
function xs(e) {
  I !== null && (vt ?? (vt = /* @__PURE__ */ new Set())).add(e);
}
let Ie = null, Be = 0, Ue = null;
function el(e) {
  Ue = e;
}
let ks = 1, Pt = 0, qt = Pt;
function Ti(e) {
  qt = e;
}
function Es() {
  return ++ks;
}
function Wn(e) {
  var t = e.f;
  if ((t & ce) !== 0)
    return !0;
  if (t & pe && (e.f &= ~Kt), (t & tt) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, i = 0; i < r; i++) {
      var s = n[i];
      if (Wn(
        /** @type {Derived} */
        s
      ) && rs(
        /** @type {Derived} */
        s
      ), s.wv > e.wv)
        return !0;
    }
    (t & Ge) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    ge === null && se(e, he);
  }
  return !1;
}
function Ss(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(vt !== null && vt.has(e)))
    for (var i = 0; i < r.length; i++) {
      var s = r[i];
      (s.f & pe) !== 0 ? Ss(
        /** @type {Derived} */
        s,
        t,
        !1
      ) : t === s && (n ? se(s, ce) : (s.f & he) !== 0 && se(s, tt), si(
        /** @type {Effect} */
        s
      ));
    }
}
function Ts(e) {
  var t = Ie, n = Be, r = Ue, i = I, s = vt, l = De, f = et, u = qt, c = e.f;
  Ie = /** @type {null | Value[]} */
  null, Be = 0, Ue = null, I = (c & ($e | yt)) === 0 ? e : null, vt = null, pn(e.ctx), et = !1, qt = ++Pt, e.ac !== null && ($n(() => {
    e.ac.abort(Kn);
  }), e.ac = null);
  try {
    e.f |= hr;
    var h = (
      /** @type {Function} */
      e.fn
    ), p = h();
    e.f |= mn;
    var d = Ai(e);
    if (Xi() && Ue !== null && !et && d !== null && (e.f & (pe | tt | ce)) === 0)
      for (var v = 0; v < /** @type {Source[]} */
      Ue.length; v++)
        Ss(
          Ue[v],
          /** @type {Effect} */
          e
        );
    if (i !== null && i !== e) {
      if (Pt++, i.deps !== null)
        for (let g = 0; g < n; g += 1)
          i.deps[g].rv = Pt;
      if (t !== null)
        for (const g of t)
          g.rv = Pt;
      Ue !== null && (r === null ? r = Ue : r.push(.../** @type {Source[]} */
      Ue));
    }
    return (e.f & Nt) !== 0 && (e.f ^= Nt), p;
  } catch (g) {
    return Ai(e), Ya(g);
  } finally {
    e.f ^= hr, Ie = t, Be = n, Ue = r, I = i, vt = s, pn(l), et = f, qt = u;
  }
}
function Ai(e) {
  var i;
  var t = e.deps, n = E == null ? void 0 : E.is_fork;
  if (Ie !== null) {
    var r;
    if (n || zn(e, Be), t !== null && Be > 0)
      for (t.length = Be + Ie.length, r = 0; r < Ie.length; r++)
        t[Be + r] = Ie[r];
    else
      e.deps = t = Ie;
    if (ai() && (e.f & Ge) !== 0)
      for (r = Be; r < t.length; r++)
        ((i = t[r]).reactions ?? (i.reactions = [])).push(e);
  } else !n && t !== null && Be < t.length && (zn(e, Be), t.length = Be);
  return t;
}
function tl(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = ra.call(n, e);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  if (n === null && (t.f & pe) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Ie === null || !dr.call(Ie, t))) {
    var s = (
      /** @type {Derived} */
      t
    );
    (s.f & Ge) !== 0 && (s.f ^= Ge, s.f &= ~Kt), s.v !== ve && ti(s), s.ac !== null && $n(() => {
      s.ac.abort(Kn), s.ac = null, se(s, ce);
    }), Fa(s), zn(s, 0);
  }
}
function zn(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      tl(e, n[r]);
}
function gn(e) {
  var t = e.f;
  if ((t & Ve) === 0) {
    se(e, he);
    var n = j, r = ur;
    j = e, ur = (t & ($e | yt)) === 0;
    try {
      (t & (Ze | Gi)) !== 0 ? Xa(e) : oi(e), gs(e);
      var i = Ts(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = ks;
      var s;
      Vi && Ta && (e.f & ce) !== 0 && e.deps;
    } finally {
      ur = r, j = n;
    }
  }
}
async function nl() {
  await Promise.resolve(), za();
}
function a(e) {
  var t = e.f, n = (t & pe) !== 0;
  if (I !== null && !et) {
    var r = j !== null && (j.f & Ve) !== 0;
    if (!r && (vt === null || !vt.has(e))) {
      var i = I.deps;
      if ((I.f & hr) !== 0)
        e.rv < Pt && (e.rv = Pt, Ie === null && i !== null && i[Be] === e ? Be++ : Ie === null ? Ie = [e] : Ie.push(e));
      else {
        I.deps ?? (I.deps = []), dr.call(I.deps, e) || I.deps.push(e);
        var s = e.reactions;
        s === null ? e.reactions = [I] : dr.call(s, I) || s.push(I);
      }
    }
  }
  if (Rt && dt.has(e))
    return dt.get(e);
  if (n) {
    var l = (
      /** @type {Derived} */
      e
    );
    if (Rt) {
      var f = l.v;
      return ((l.f & he) === 0 && l.reactions !== null || Ms(l)) && (f = ri(l)), dt.set(l, f), f;
    }
    var u = (l.f & Ge) === 0 && !et && I !== null && (ur || (I.f & Ge) !== 0), c = (l.f & mn) === 0;
    Wn(l) && (u && (l.f |= Ge), rs(l)), u && !c && (is(l), As(l));
  }
  if (ge != null && ge.has(e))
    return ge.get(e);
  if ((e.f & Nt) !== 0)
    throw e.v;
  return e.v;
}
function As(e) {
  if (e.f |= Ge, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ?? (t.reactions = [])).push(e), (t.f & pe) !== 0 && (t.f & Ge) === 0 && (is(
        /** @type {Derived} */
        t
      ), As(
        /** @type {Derived} */
        t
      ));
}
function Ms(e) {
  if (e.v === ve) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (dt.has(t) || (t.f & pe) !== 0 && Ms(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function Ns(e) {
  var t = et;
  try {
    return et = !0, e();
  } finally {
    et = t;
  }
}
const Ft = Symbol("events"), Rs = /* @__PURE__ */ new Set(), Kr = /* @__PURE__ */ new Set();
function ue(e, t, n) {
  (t[Ft] ?? (t[Ft] = {}))[e] = n;
}
function Er(e) {
  for (var t = 0; t < e.length; t++)
    Rs.add(e[t]);
  for (var n of Kr)
    n(e);
}
let Dr = null, Pr = !1;
function Mi(e) {
  var m, b;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, i = ((m = e.composedPath) == null ? void 0 : m.call(e)) || [], s = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  Dr = e, Pr || (Pr = !0, setTimeout(() => {
    Pr = !1, Dr = null;
  }));
  var l = 0, f = Dr === e && e[Ft];
  if (f) {
    var u = i.indexOf(f);
    if (u !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[Ft] = t;
      return;
    }
    var c = i.indexOf(t);
    if (c === -1)
      return;
    u <= c && (l = u);
  }
  if (s = /** @type {Element} */
  i[l] || e.target, s !== t) {
    Ui(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || n;
      }
    });
    var h = I, p = j;
    Je(null), ht(null);
    try {
      for (var d, v = []; s !== null && s !== t; ) {
        try {
          var g = (b = s[Ft]) == null ? void 0 : b[r];
          g != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === s) && g.call(s, e);
        } catch (k) {
          d ? v.push(k) : d = k;
        }
        if (e.cancelBubble) break;
        l++, s = l < i.length ? (
          /** @type {Element} */
          i[l]
        ) : null;
      }
      if (d) {
        for (let k of v)
          queueMicrotask(() => {
            throw k;
          });
        throw d;
      }
    } finally {
      e[Ft] = t, delete e.currentTarget, Je(h), ht(p);
    }
  }
}
var zi;
const Fr = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((zi = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : zi.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function rl(e) {
  return (
    /** @type {string} */
    (Fr == null ? void 0 : Fr.createHTML(e)) ?? e
  );
}
function il(e) {
  var t = Ka("template");
  return t.innerHTML = rl(e.replaceAll("<!>", "<!---->")), t.content;
}
function gr(e, t) {
  var n = (
    /** @type {Effect} */
    j
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function N(e, t) {
  var n = (t & 1) !== 0, r = (t & 2) !== 0, i, s = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = il(s ? e : "<!>" + e), n || (i = /** @type {TemplateNode} */
    /* @__PURE__ */ jn(i)));
    var l = (
      /** @type {TemplateNode} */
      r || ds ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (n) {
      var f = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ jn(l)
      ), u = (
        /** @type {TemplateNode} */
        l.lastChild
      );
      gr(f, u);
    } else
      gr(l, l);
    return l;
  };
}
function It(e = "") {
  {
    var t = mt(e + "");
    return gr(t, t), t;
  }
}
function Cs() {
  var e = document.createDocumentFragment(), t = document.createComment(""), n = mt();
  return e.append(t, n), gr(t, n), e;
}
function w(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
const sl = ["touchstart", "touchmove"];
function al(e) {
  return sl.includes(e);
}
function ll(e) {
  let t = 0, n = Gt(0), r;
  return () => {
    ai() && (a(n), bs(() => (t === 0 && (r = Ns(() => e(() => Pn(n)))), t += 1, () => {
      At(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, Pn(n));
      });
    })));
  };
}
var ol = _n | yn;
function fl(e, t, n, r) {
  new ul(e, t, n, r);
}
var qe, Zr, Ke, Bt, Te, Le, Ae, je, at, Vt, Tt, hn, Vn, Hn, gt, yr, X, cl, dl, Yr, vl, Gr, Rn, cr, $r, Jr;
class ul {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, n, r, i) {
    M(this, X);
    /** @type {Boundary | null} */
    Fe(this, "parent");
    Fe(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    Fe(this, "transform_error");
    /** @type {TemplateNode} */
    M(this, qe);
    /** @type {TemplateNode | null} */
    M(this, Zr, null);
    /** @type {BoundaryProps} */
    M(this, Ke);
    /** @type {((anchor: Node) => void)} */
    M(this, Bt);
    /** @type {Effect} */
    M(this, Te);
    /** @type {Effect | null} */
    M(this, Le, null);
    /** @type {Effect | null} */
    M(this, Ae, null);
    /** @type {Effect | null} */
    M(this, je, null);
    /** @type {DocumentFragment | null} */
    M(this, at, null);
    M(this, Vt, 0);
    M(this, Tt, 0);
    M(this, hn, !1);
    /** @type {Set<Effect>} */
    M(this, Vn, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    M(this, Hn, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    M(this, gt, null);
    M(this, yr, ll(() => (A(this, gt, Gt(o(this, Vt))), () => {
      A(this, gt, null);
    })));
    var s;
    A(this, qe, t), A(this, Ke, n), A(this, Bt, (l) => {
      var f = (
        /** @type {Effect} */
        j
      );
      f.b = this, f.f |= zr, r(l);
    }), this.parent = /** @type {Effect} */
    j.b, this.transform_error = i ?? ((s = this.parent) == null ? void 0 : s.transform_error) ?? ((l) => l), A(this, Te, li(() => {
      D(this, X, Gr).call(this);
    }, ol));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    ts(t, o(this, Vn), o(this, Hn));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!o(this, Ke).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(t, n) {
    D(this, X, $r).call(this, t, n), A(this, Vt, o(this, Vt) + t), !(!o(this, gt) || o(this, hn)) && (A(this, hn, !0), At(() => {
      A(this, hn, !1), o(this, gt) && bn(o(this, gt), o(this, Vt));
    }));
  }
  get_effect_pending() {
    return o(this, yr).call(this), a(
      /** @type {Source<number>} */
      o(this, gt)
    );
  }
  /** @param {unknown} error */
  error(t) {
    if (!o(this, Ke).onerror && !o(this, Ke).failed)
      throw t;
    E != null && E.is_fork ? (o(this, Le) && E.skip_effect(o(this, Le)), o(this, Ae) && E.skip_effect(o(this, Ae)), o(this, je) && E.skip_effect(o(this, je)), E.oncommit(() => {
      D(this, X, Jr).call(this, t);
    })) : D(this, X, Jr).call(this, t);
  }
}
qe = new WeakMap(), Zr = new WeakMap(), Ke = new WeakMap(), Bt = new WeakMap(), Te = new WeakMap(), Le = new WeakMap(), Ae = new WeakMap(), je = new WeakMap(), at = new WeakMap(), Vt = new WeakMap(), Tt = new WeakMap(), hn = new WeakMap(), Vn = new WeakMap(), Hn = new WeakMap(), gt = new WeakMap(), yr = new WeakMap(), X = new WeakSet(), cl = function() {
  try {
    A(this, Le, Ye(() => o(this, Bt).call(this, o(this, qe))));
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
dl = function(t) {
  const n = o(this, Ke).failed, { reset: r, invoke_onerror: i } = D(this, X, Yr).call(this, t);
  At(i), n && A(this, je, Ye(() => {
    n(
      o(this, qe),
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
Yr = function(t) {
  var n = !1, r = !1;
  const i = () => {
    if (n) {
      ha();
      return;
    }
    n = !0, r && Sa(), o(this, je) !== null && Ut(o(this, je), () => {
      A(this, je, null);
    }), D(this, X, cr).call(this, () => {
      D(this, X, Gr).call(this);
    });
  };
  return { reset: i, invoke_onerror: () => {
    var l, f;
    try {
      r = !0, (f = (l = o(this, Ke)).onerror) == null || f.call(l, t, i), r = !1;
    } catch (u) {
      ot(u, o(this, Te) && o(this, Te).parent);
    }
  } };
}, vl = function() {
  const t = o(this, Ke).pending;
  t && (this.is_pending = !0, A(this, Ae, Ye(() => t(o(this, qe)))), At(() => {
    var n = A(this, at, document.createDocumentFragment()), r = mt(), i = !1;
    if (n.append(r), A(this, Le, D(this, X, cr).call(this, () => {
      try {
        return Ye(() => o(this, Bt).call(this, r));
      } catch (s) {
        try {
          this.error(s), i = !0;
        } catch (l) {
          ot(l, o(this, Te).parent);
        }
        return null;
      }
    })), o(this, Le) === null) {
      A(this, at, null), i && D(this, X, Rn).call(
        this,
        /** @type {Batch} */
        E
      );
      return;
    }
    o(this, Tt) === 0 && (o(this, qe).before(n), A(this, at, null), Ut(
      /** @type {Effect} */
      o(this, Ae),
      () => {
        A(this, Ae, null);
      }
    ), D(this, X, Rn).call(
      this,
      /** @type {Batch} */
      E
    ));
  }));
}, Gr = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), A(this, Tt, 0), A(this, Vt, 0), A(this, Le, Ye(() => {
      o(this, Bt).call(this, o(this, qe));
    })), o(this, Tt) > 0) {
      var t = A(this, at, document.createDocumentFragment());
      fi(o(this, Le), t);
      const n = (
        /** @type {(anchor: Node) => void} */
        o(this, Ke).pending
      );
      A(this, Ae, Ye(() => n(o(this, qe))));
    } else
      D(this, X, Rn).call(
        this,
        /** @type {Batch} */
        E
      );
  } catch (n) {
    this.error(n);
  }
}, /**
 * @param {Batch} batch
 */
Rn = function(t) {
  this.is_pending = !1, t.transfer_effects(o(this, Vn), o(this, Hn));
}, /**
 * @template T
 * @param {() => T} fn
 */
cr = function(t) {
  var n = j, r = I, i = De;
  ht(o(this, Te)), Je(o(this, Te)), pn(o(this, Te).ctx);
  try {
    return Yt.ensure(), t();
  } finally {
    ht(n), Je(r), pn(i);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
$r = function(t, n) {
  var r;
  if (!this.has_pending_snippet()) {
    this.parent && D(r = this.parent, X, $r).call(r, t, n);
    return;
  }
  A(this, Tt, o(this, Tt) + t), o(this, Tt) === 0 && (D(this, X, Rn).call(this, n), o(this, Ae) && Ut(o(this, Ae), () => {
    A(this, Ae, null);
  }), o(this, at) && (o(this, qe).before(o(this, at)), A(this, at, null)));
}, /**
 * @param {unknown} error
 */
Jr = function(t) {
  o(this, Le) && (Pe(o(this, Le)), A(this, Le, null)), o(this, Ae) && (Pe(o(this, Ae)), A(this, Ae, null)), o(this, je) && (Pe(o(this, je)), A(this, je, null));
  let n = o(this, Ke).failed;
  const r = (i) => {
    const { reset: s, invoke_onerror: l } = D(this, X, Yr).call(this, i);
    l(), n && A(this, je, D(this, X, cr).call(this, () => {
      try {
        return Ye(() => {
          var f = (
            /** @type {Effect} */
            j
          );
          f.b = this, f.f |= zr, n(
            o(this, qe),
            () => i,
            () => s
          );
        });
      } catch (f) {
        return ot(
          f,
          /** @type {Effect} */
          o(this, Te).parent
        ), null;
      }
    }));
  };
  At(() => {
    var i;
    try {
      i = this.transform_error(t);
    } catch (s) {
      ot(s, o(this, Te) && o(this, Te).parent);
      return;
    }
    i !== null && typeof i == "object" && typeof /** @type {any} */
    i.then == "function" ? i.then(
      r,
      /** @param {unknown} e */
      (s) => ot(s, o(this, Te) && o(this, Te).parent)
    ) : r(i);
  });
};
function O(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== /** @type {any} */
  (e[Tn] ?? (e[Tn] = e.nodeValue)) && (e[Tn] = n, e.nodeValue = `${n}`);
}
function hl(e, t) {
  return _l(e, t);
}
const ir = /* @__PURE__ */ new Map();
function _l(e, { target: t, anchor: n, props: r = {}, events: i, context: s, intro: l = !0, transformError: f }) {
  Ua();
  var u = void 0, c = Wa(() => {
    var h = n ?? t.appendChild(mt());
    fl(
      /** @type {TemplateNode} */
      h,
      {
        pending: () => {
        }
      },
      (v) => {
        Yn({});
        var g = (
          /** @type {ComponentContext} */
          De
        );
        s && (g.c = s), i && (r.$$events = i), u = e(v, r) || Qi(), Gn();
      },
      f
    );
    var p = /* @__PURE__ */ new Set(), d = (v) => {
      for (var g = 0; g < v.length; g++) {
        var m = v[g];
        if (!p.has(m)) {
          p.add(m);
          var b = al(m);
          for (const P of [t, document]) {
            var k = ir.get(P);
            k === void 0 && (k = /* @__PURE__ */ new Map(), ir.set(P, k));
            var $ = k.get(m);
            $ === void 0 ? (P.addEventListener(m, Mi, { passive: b }), k.set(m, 1)) : k.set(m, $ + 1);
          }
        }
      }
    };
    return d(xr(Rs)), Kr.add(d), () => {
      var b;
      for (var v of p)
        for (const k of [t, document]) {
          var g = (
            /** @type {Map<string, number>} */
            ir.get(k)
          ), m = (
            /** @type {number} */
            g.get(v)
          );
          --m == 0 ? (k.removeEventListener(v, Mi), g.delete(v), g.size === 0 && ir.delete(k)) : g.set(v, m);
        }
      Kr.delete(d), h !== n && ((b = h.parentNode) == null || b.removeChild(h));
    };
  });
  return Wr.set(u, c), u;
}
let Wr = /* @__PURE__ */ new WeakMap();
function pl(e, t) {
  const n = Wr.get(e);
  return n ? (Wr.delete(e), n(t)) : Promise.resolve();
}
var Xe, lt, ze, Ht, Un, qn, wr;
class bl {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, n = !0) {
    /** @type {TemplateNode} */
    Fe(this, "anchor");
    /** @type {Map<Batch, Key>} */
    M(this, Xe, /* @__PURE__ */ new Map());
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
    M(this, lt, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    M(this, ze, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    M(this, Ht, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    M(this, Un, !0);
    /**
     * @param {Batch} batch
     */
    M(this, qn, (t) => {
      if (o(this, Xe).has(t)) {
        var n = (
          /** @type {Key} */
          o(this, Xe).get(t)
        ), r = o(this, lt).get(n);
        if (r)
          br(r), o(this, Ht).delete(n);
        else {
          var i = o(this, ze).get(n);
          i && (br(i.effect), o(this, lt).set(n, i.effect), o(this, ze).delete(n), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), r = i.effect);
        }
        for (const [s, l] of o(this, Xe)) {
          if (o(this, Xe).delete(s), s === t)
            break;
          const f = o(this, ze).get(l);
          f && (Pe(f.effect), o(this, ze).delete(l));
        }
        for (const [s, l] of o(this, lt)) {
          if (s === n || o(this, Ht).has(s)) continue;
          const f = () => {
            if (Array.from(o(this, Xe).values()).includes(s)) {
              var c = document.createDocumentFragment();
              fi(l, c), c.append(mt()), o(this, ze).set(s, { effect: l, fragment: c });
            } else
              Pe(l);
            o(this, Ht).delete(s), o(this, lt).delete(s);
          };
          o(this, Un) || !r ? (o(this, Ht).add(s), Ut(l, f, !1)) : f();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    M(this, wr, (t) => {
      o(this, Xe).delete(t);
      const n = Array.from(o(this, Xe).values());
      for (const [r, i] of o(this, ze))
        n.includes(r) || (Pe(i.effect), o(this, ze).delete(r));
    });
    this.anchor = t, A(this, Un, n);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, n) {
    var r = (
      /** @type {Batch} */
      E
    ), i = _s();
    if (n && !o(this, lt).has(t) && !o(this, ze).has(t))
      if (i) {
        var s = document.createDocumentFragment(), l = mt();
        s.append(l), o(this, ze).set(t, {
          effect: Ye(() => n(l)),
          fragment: s
        });
      } else
        o(this, lt).set(
          t,
          Ye(() => n(this.anchor))
        );
    if (o(this, Xe).set(r, t), i) {
      for (const [f, u] of o(this, lt))
        f === t ? r.unskip_effect(u) : r.skip_effect(u);
      for (const [f, u] of o(this, ze))
        f === t ? r.unskip_effect(u.effect) : r.skip_effect(u.effect);
      r.oncommit(o(this, qn)), r.ondiscard(o(this, wr));
    } else
      o(this, qn).call(this, r);
  }
}
Xe = new WeakMap(), lt = new WeakMap(), ze = new WeakMap(), Ht = new WeakMap(), Un = new WeakMap(), qn = new WeakMap(), wr = new WeakMap();
function z(e, t, n = !1) {
  var r = new bl(e), i = n ? _n : 0;
  function s(l, f) {
    r.ensure(l, f);
  }
  li(() => {
    var l = !1;
    t((f, u = 0) => {
      l = !0, s(u, f);
    }), l || s(-1, null);
  }, i);
}
function gl(e, t, n) {
  for (var r = [], i = t.length, s, l = t.length, f = 0; f < i; f++) {
    let p = t[f];
    Ut(
      p,
      () => {
        if (s) {
          if (s.pending.delete(p), s.done.add(p), s.pending.size === 0) {
            var d = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            Qr(e, xr(s.done)), d.delete(s), d.size === 0 && (e.outrogroups = null);
          }
        } else
          l -= 1;
      },
      !1
    );
  }
  if (l === 0) {
    var u = r.length === 0 && n !== null && e.pending.size === 0;
    if (u) {
      var c = (
        /** @type {Element} */
        n
      ), h = (
        /** @type {Element} */
        c.parentNode
      );
      qa(h), h.append(c), e.items.clear();
    }
    Qr(e, t, !u);
  } else
    s = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ?? (e.outrogroups = /* @__PURE__ */ new Set())).add(s);
}
function Qr(e, t, n = !0) {
  var r;
  if (e.pending.size > 0) {
    r = /* @__PURE__ */ new Set();
    for (const l of e.pending.values())
      for (const f of l)
        r.add(
          /** @type {EachItem} */
          e.items.get(f).e
        );
  }
  for (var i = 0; i < t.length; i++) {
    var s = t[i];
    if (r != null && r.has(s)) {
      s.f |= ft;
      const l = document.createDocumentFragment();
      fi(s, l);
    } else
      Pe(t[i], n);
  }
}
var Ni;
function Mt(e, t, n, r, i, s = null) {
  var l = e, f = /* @__PURE__ */ new Map(), u = (t & 4) !== 0;
  if (u) {
    var c = (
      /** @type {Element} */
      e
    );
    l = c.appendChild(mt());
  }
  var h = null, p = /* @__PURE__ */ Da(() => {
    var P = n();
    return (
      /** @type {V[]} */
      Hi(P) ? P : P == null ? [] : xr(P)
    );
  }), d, v = /* @__PURE__ */ new Map(), g = !0;
  function m(P) {
    ($.effect.f & Ve) === 0 && ($.pending.delete(P), $.fallback = h, ml($, d, l, t, r), h !== null && (d.length === 0 ? (h.f & ft) === 0 ? br(h) : (h.f ^= ft, Cn(h, null, l)) : Ut(h, () => {
      h = null;
    })));
  }
  function b(P) {
    $.pending.delete(P);
  }
  var k = li(() => {
    d = /** @type {V[]} */
    a(p);
    for (var P = d.length, ee = /* @__PURE__ */ new Set(), re = (
      /** @type {Batch} */
      E
    ), J = _s(), F = 0; F < P; F += 1) {
      var Z = d[F], we = r(Z, F), le = g ? null : f.get(we);
      le ? (le.v && bn(le.v, Z), le.i && bn(le.i, F), J && re.unskip_effect(le.e)) : (le = yl(
        f,
        g ? l : Ni ?? (Ni = mt()),
        Z,
        we,
        F,
        i,
        t,
        n
      ), g || (le.e.f |= ft), f.set(we, le)), ee.add(we);
    }
    if (P === 0 && s && !h && (g ? h = Ye(() => s(l)) : (h = Ye(() => s(Ni ?? (Ni = mt()))), h.f |= ft)), P > ee.size && ba(), !g)
      if (v.set(re, ee), J) {
        for (const [Ne, oe] of f)
          ee.has(Ne) || re.skip_effect(oe.e);
        re.oncommit(m), re.ondiscard(b);
      } else
        m(re);
    a(p);
  }), $ = { effect: k, items: f, pending: v, outrogroups: null, fallback: h };
  g = !1;
}
function Sn(e) {
  for (; e !== null && (e.f & $e) === 0; )
    e = e.next;
  return e;
}
function ml(e, t, n, r, i) {
  var le, Ne, oe, xe, S, R, U, ae, te;
  var s = (r & 8) !== 0, l = t.length, f = e.items, u = Sn(e.effect.first), c, h = null, p, d = [], v = [], g, m, b, k;
  if (s)
    for (k = 0; k < l; k += 1)
      g = t[k], m = i(g, k), b = /** @type {EachItem} */
      f.get(m).e, (b.f & ft) === 0 && ((Ne = (le = b.nodes) == null ? void 0 : le.a) == null || Ne.measure(), (p ?? (p = /* @__PURE__ */ new Set())).add(b));
  for (k = 0; k < l; k += 1) {
    if (g = t[k], m = i(g, k), b = /** @type {EachItem} */
    f.get(m).e, e.outrogroups !== null)
      for (const ie of e.outrogroups)
        ie.pending.delete(b), ie.done.delete(b);
    if ((b.f & Me) !== 0 && (br(b), s && ((xe = (oe = b.nodes) == null ? void 0 : oe.a) == null || xe.unfix(), (p ?? (p = /* @__PURE__ */ new Set())).delete(b))), (b.f & ft) !== 0)
      if (b.f ^= ft, b === u)
        Cn(b, null, n);
      else {
        var $ = h ? h.next : u;
        b === e.effect.last && (e.effect.last = b.prev), b.prev && (b.prev.next = b.next), b.next && (b.next.prev = b.prev), Et(e, h, b), Et(e, b, $), Cn(b, $, n), h = b, d = [], v = [], u = Sn(h.next);
        continue;
      }
    if (b !== u) {
      if (c !== void 0 && c.has(b)) {
        if (d.length < v.length) {
          var P = v[0], ee;
          h = P.prev;
          var re = d[0], J = d[d.length - 1];
          for (ee = 0; ee < d.length; ee += 1)
            Cn(d[ee], P, n);
          for (ee = 0; ee < v.length; ee += 1)
            c.delete(v[ee]);
          Et(e, re.prev, J.next), Et(e, h, re), Et(e, J, P), u = P, h = J, k -= 1, d = [], v = [];
        } else
          c.delete(b), Cn(b, u, n), Et(e, b.prev, b.next), Et(e, b, h === null ? e.effect.first : h.next), Et(e, h, b), h = b;
        continue;
      }
      for (d = [], v = []; u !== null && u !== b; )
        (c ?? (c = /* @__PURE__ */ new Set())).add(u), v.push(u), u = Sn(u.next);
      if (u === null)
        continue;
    }
    (b.f & ft) === 0 && d.push(b), h = b, u = Sn(b.next);
  }
  if (e.outrogroups !== null) {
    for (const ie of e.outrogroups)
      ie.pending.size === 0 && (Qr(e, xr(ie.done)), (S = e.outrogroups) == null || S.delete(ie));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (u !== null || c !== void 0) {
    var F = [];
    if (c !== void 0)
      for (b of c)
        (b.f & Me) === 0 && F.push(b);
    for (; u !== null; )
      (u.f & Me) === 0 && u !== e.fallback && F.push(u), u = Sn(u.next);
    var Z = F.length;
    if (Z > 0) {
      var we = (r & 4) !== 0 && l === 0 ? n : null;
      if (s) {
        for (k = 0; k < Z; k += 1)
          (U = (R = F[k].nodes) == null ? void 0 : R.a) == null || U.measure();
        for (k = 0; k < Z; k += 1)
          (te = (ae = F[k].nodes) == null ? void 0 : ae.a) == null || te.fix();
      }
      gl(e, F, we);
    }
  }
  s && At(() => {
    var ie, K;
    if (p !== void 0)
      for (b of p)
        (K = (ie = b.nodes) == null ? void 0 : ie.a) == null || K.apply();
  });
}
function yl(e, t, n, r, i, s, l, f) {
  var u = (l & 1) !== 0 ? (l & 16) === 0 ? /* @__PURE__ */ Va(n, !1, !1) : Gt(n) : null, c = (l & 2) !== 0 ? Gt(i) : null;
  return {
    v: u,
    i: c,
    e: Ye(() => (s(t, u ?? n, c ?? i, f), () => {
      e.delete(r);
    }))
  };
}
function Cn(e, t, n) {
  if (e.nodes)
    for (var r = e.nodes.start, i = e.nodes.end, s = t && (t.f & ft) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : n; r !== null; ) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Jn(r)
      );
      if (s.before(r), r === i)
        return;
      r = l;
    }
}
function Et(e, t, n) {
  t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
const Ri = [...` 	
\r\f \v\uFEFF`];
function wl(e, t, n) {
  var r = e == null ? "" : "" + e;
  if (n) {
    for (var i of Object.keys(n))
      if (n[i])
        r = r ? r + " " + i : i;
      else if (r.length)
        for (var s = i.length, l = 0; (l = r.indexOf(i, l)) >= 0; ) {
          var f = l + s;
          (l === 0 || Ri.includes(r[l - 1])) && (f === r.length || Ri.includes(r[f])) ? r = (l === 0 ? "" : r.substring(0, l)) + r.substring(f + 1) : l = f;
        }
  }
  return r === "" ? null : r;
}
function Lt(e, t, n, r, i, s) {
  var l = (
    /** @type {any} */
    e[Vr]
  );
  if (l !== n || l === void 0) {
    var f = wl(n, r, s);
    f == null ? e.removeAttribute("class") : e.className = f, e[Vr] = n;
  } else if (s && i !== s)
    for (var u in s) {
      var c = !!s[u];
      (i == null || c !== !!i[u]) && e.classList.toggle(u, c);
    }
  return s;
}
const xl = Symbol("is custom element"), kl = Symbol("is html");
function ct(e, t, n, r) {
  var i = El(e);
  i[t] !== (i[t] = n) && (t === "loading" && (e[ca] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Sl(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function El(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    e[lr] ?? (e[lr] = {
      [xl]: e.nodeName.includes("-"),
      [kl]: e.namespaceURI === na
    })
  );
}
var Ci = /* @__PURE__ */ new Map();
function Sl(e) {
  var t = e.getAttribute("is") || e.nodeName, n = Ci.get(t);
  if (n) return n;
  Ci.set(t, n = /* @__PURE__ */ new Set());
  for (var r, i = e, s = Element.prototype; s !== i; ) {
    r = ia(i);
    for (var l in r)
      r[l].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      l !== "innerHTML" && l !== "textContent" && l !== "innerText" && n.add(l);
    i = qi(i);
  }
  return n;
}
function Tl(e, t, n = t) {
  var r = /* @__PURE__ */ new WeakSet();
  Ra(e, "input", async (i) => {
    var s = i ? e.defaultValue : e.value;
    if (s = Lr(e) ? jr(s) : s, n(s), E !== null && r.add(E), await nl(), s !== (s = t())) {
      var l = e.selectionStart, f = e.selectionEnd, u = e.value.length;
      if (e.value = s ?? "", f !== null) {
        var c = e.value.length;
        l === f && f === u && c > u ? (e.selectionStart = c, e.selectionEnd = c) : (e.selectionStart = l, e.selectionEnd = Math.min(f, c));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  Ns(t) == null && e.value && (n(Lr(e) ? jr(e.value) : e.value), E !== null && r.add(E)), bs(() => {
    var i = t();
    if (e === document.activeElement) {
      var s = (
        /** @type {Batch} */
        E
      );
      if (r.has(s))
        return;
    }
    Lr(e) && i === jr(e.value) || e.type === "date" && !i && !e.value || i !== e.value && (e.value = i ?? "");
  });
}
function Lr(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function jr(e) {
  return e === "" ? null : +e;
}
function Xr(e, t, n, r) {
  var i = (
    /** @type {V} */
    r
  ), s = !0, l = () => (s && (s = !1, i = /** @type {V} */
  r), i), f;
  f = /** @type {V} */
  e[t], f === void 0 && r !== void 0 && (f = l());
  var u;
  return u = () => {
    var c = (
      /** @type {V} */
      e[t]
    );
    return c === void 0 ? l() : (s = !0, c);
  }, u;
}
const Al = "5";
var Bi;
typeof window < "u" && ((Bi = window.__svelte ?? (window.__svelte = {})).v ?? (Bi.v = /* @__PURE__ */ new Set())).add(Al);
let Os = "";
function Ml(e) {
  Os = e;
}
function Sr(e, t) {
  const n = new URL(`${Os}${e}`, window.location.origin);
  for (const [r, i] of Object.entries(t ?? {}))
    i != null && i !== "" && n.searchParams.set(r, String(i));
  return n;
}
async function Is(e, t, n) {
  try {
    const r = await fetch(Sr(t, n), { method: e });
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  }
}
const Nl = (e, t) => Is("GET", e, t), Rl = (e, t) => Is("POST", e, t);
async function Oi(e, t) {
  try {
    const n = await fetch(Sr(e), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(t)
    });
    return n.ok ? await n.json() : null;
  } catch {
    return null;
  }
}
const Cl = (e, t) => String(Sr("/stream", { site: e, video_id: t }));
async function Ds() {
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
async function Ps(e, t) {
  const n = e === "scraping" ? "vpn.route_scraping" : "vpn.route_streaming";
  try {
    return (await fetch(`/api/v1/settings/set/${n}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ [n]: t })
    })).ok;
  } catch {
    return !1;
  }
}
const Ol = (e) => Ps(e, !1);
async function Il(e) {
  try {
    const t = await fetch("/api/v1/vpn/exit-node", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ node_id: e })
    });
    return t.ok ? await t.json() : null;
  } catch {
    return null;
  }
}
const ui = "/api/bookmarks";
async function Dl(e) {
  try {
    const t = await fetch(`${ui}?contextTitle=${encodeURIComponent(e)}`);
    return t.ok ? (await t.json()).bookmarks ?? [] : null;
  } catch {
    return null;
  }
}
async function Pl(e) {
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
async function Fl(e, t) {
  try {
    return (await fetch(
      `${ui}?site=${encodeURIComponent(e)}&videoId=${encodeURIComponent(t)}`,
      { method: "DELETE" }
    )).ok;
  } catch {
    return !1;
  }
}
function Di(e) {
  if (!e) return "";
  const t = ["B", "KB", "MB", "GB"], n = Math.min(Math.floor(Math.log(e) / Math.log(1024)), t.length - 1);
  return `${(e / 1024 ** n).toFixed(n === 0 ? 0 : 1)} ${t[n]}`;
}
function sr(e) {
  if (!e) return null;
  const t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = e % 60, i = (s) => String(s).padStart(2, "0");
  return t ? `${t}:${i(n)}:${i(r)}` : `${n}:${i(r)}`;
}
var Ll = /* @__PURE__ */ N('<div><span> </span> <button type="button" class="tbx-link"> </button></div>'), jl = /* @__PURE__ */ N('<div><span class="tbx-dot"></span> </div>');
function Pi(e, t) {
  Yn(t, !0);
  let n = Xr(t, "size", 3, "sm"), r = /* @__PURE__ */ H(!1);
  async function i() {
    var c;
    x(r, !0), await Ol(t.purpose) && await ((c = t.onDisabled) == null ? void 0 : c.call(t)), x(r, !1);
  }
  var s = Cs(), l = ln(s);
  {
    var f = (c) => {
      var h = Ll();
      let p;
      var d = T(h), v = Q(d), g = y(d, 2), m = Q(g, !0);
      L(() => {
        p = Lt(h, 1, "tbx-banner tbx-banner-blocked", null, p, { "tbx-banner-lg": n() === "lg" }), O(v, `${t.base ?? ""} is routed through the VPN, and the tunnel is down.
            ${t.gerund ?? ""} is blocked rather than falling back to a direct connection.`), g.disabled = a(r), O(m, a(r) ? "Turning off…" : "Turn off routing");
      }), ue("click", g, i), w(c, h);
    }, u = (c) => {
      var h = jl();
      let p;
      var d = y(T(h));
      L(() => {
        p = Lt(h, 1, "tbx-banner", null, p, { "tbx-banner-lg": n() === "lg" }), O(d, ` ${t.gerund ?? ""} through the VPN${t.route.exitNodeName ? ` via ${t.route.exitNodeName}` : ""}.`);
      }), w(c, h);
    };
    z(l, (c) => {
      t.route.blocked ? c(f) : t.route.routed && c(u, 1);
    });
  }
  w(e, s), Gn();
}
Er(["click"]);
var zl = /* @__PURE__ */ N('<button type="button" role="switch"><span class="tbx-toggle-track"><span class="tbx-toggle-knob"></span></span> <span> </span></button>'), Bl = /* @__PURE__ */ N('<span class="tbx-dim">offline</span>'), Vl = /* @__PURE__ */ N('<li><button type="button" role="option"> <!></button></li>'), Hl = /* @__PURE__ */ N('<ul class="tbx-picker-list" role="listbox"><li><button type="button" role="option">No exit node</button></li> <!></ul>'), Ul = /* @__PURE__ */ N('<div class="tbx-picker"><button type="button" class="tbx-picker-button" aria-haspopup="listbox"> <span class="tbx-caret" aria-hidden="true"></span></button> <!></div>'), ql = /* @__PURE__ */ N('<span class="tbx-vpn-down">tunnel down · routed traffic is blocked</span>'), Kl = /* @__PURE__ */ N('<p class="tbx-vpn-note"> </p>'), Yl = /* @__PURE__ */ N('<div class="tbx-vpn"><span class="tbx-vpn-label">VPN</span> <!> <!> <!></div> <!>', 1);
function Gl(e, t) {
  Yn(t, !0);
  let n = /* @__PURE__ */ H(null), r = /* @__PURE__ */ H(null), i = /* @__PURE__ */ H(!1), s = /* @__PURE__ */ H(null);
  async function l() {
    x(n, await Ds(), !0);
  }
  Fn(() => {
    l();
  });
  async function f(d) {
    var g;
    const v = d === "scraping" ? !a(n).route_scraping : !a(n).route_streaming;
    x(r, d, !0), x(s, null), await Ps(d, v) && (await l(), await ((g = t.onchange) == null ? void 0 : g.call(t))), x(r, null);
  }
  async function u(d) {
    var g;
    x(r, "exit"), x(i, !1);
    const v = await Il(d);
    v && (x(n, v, !0), x(s, v.detail ?? null, !0), await ((g = t.onchange) == null ? void 0 : g.call(t))), x(r, null);
  }
  var c = Cs(), h = ln(c);
  {
    var p = (d) => {
      var v = Yl(), g = ln(v), m = y(T(g), 2);
      Mt(
        m,
        17,
        () => [
          ["scraping", "Scraping", a(n).route_scraping],
          [
            "streaming",
            "Video streaming",
            a(n).route_streaming
          ]
        ],
        ([J, F, Z]) => J,
        (J, F) => {
          var Z = /* @__PURE__ */ Ce(() => Yi(a(F), 3));
          let we = () => a(Z)[0], le = () => a(Z)[1], Ne = () => a(Z)[2];
          var oe = zl();
          let xe;
          var S = y(T(oe), 2), R = Q(S, !0);
          L(() => {
            xe = Lt(oe, 1, "tbx-toggle", null, xe, { "tbx-toggle-on": Ne() }), ct(oe, "aria-checked", Ne()), oe.disabled = a(r) !== null, O(R, le());
          }), ue("click", oe, () => f(we())), w(J, oe);
        }
      );
      var b = y(m, 2);
      {
        var k = (J) => {
          var F = Ul(), Z = T(F), we = T(Z), le = y(Z, 2);
          {
            var Ne = (oe) => {
              var xe = Hl(), S = T(xe), R = Q(S), U = y(S, 2);
              Mt(U, 17, () => a(n).exit_nodes, (ae) => ae.id, (ae, te) => {
                var ie = Vl(), K = T(ie), nt = T(K), $t = y(nt);
                {
                  var _t = (wt) => {
                    var Jt = Bl();
                    w(wt, Jt);
                  };
                  z($t, (wt) => {
                    a(te).online || wt(_t);
                  });
                }
                L(() => {
                  ct(K, "aria-selected", a(te).active), K.disabled = !a(te).online, O(nt, `${a(te).name ?? ""}${a(te).country ? ` · ${a(te).country}` : ""} `);
                }), ue("click", K, () => u(a(te).id)), w(ae, ie);
              }), L(() => ct(R, "aria-selected", !a(n).exit_node)), ue("click", R, () => u(null)), w(oe, xe);
            };
            z(le, (oe) => {
              a(i) && oe(Ne);
            });
          }
          L(() => {
            ct(Z, "aria-expanded", a(i)), Z.disabled = a(r) !== null, O(we, `${a(n).exit_node_name ?? "No exit node" ?? ""} `);
          }), ue("click", Z, () => x(i, !a(i))), w(J, F);
        };
        z(b, (J) => {
          var F;
          (F = a(n).exit_nodes) != null && F.length && J(k);
        });
      }
      var $ = y(b, 2);
      {
        var P = (J) => {
          var F = ql();
          w(J, F);
        };
        z($, (J) => {
          !a(n).connected && (a(n).route_scraping || a(n).route_streaming) && J(P);
        });
      }
      var ee = y(g, 2);
      {
        var re = (J) => {
          var F = Kl(), Z = Q(F, !0);
          L(() => O(Z, a(s))), w(J, F);
        };
        z(ee, (J) => {
          a(s) && J(re);
        });
      }
      w(d, v);
    };
    z(h, (d) => {
      var v;
      (v = a(n)) != null && v.enabled && d(p);
    });
  }
  w(e, c), Gn();
}
Er(["click"]);
var $l = /* @__PURE__ */ N("Searching<!><!>…", 1), Jl = /* @__PURE__ */ N(" <!>", 1), Fi = /* @__PURE__ */ N('<img alt="" loading="lazy" referrerpolicy="no-referrer"/>'), Li = /* @__PURE__ */ N('<span class="tbx-duration"> </span>'), Wl = /* @__PURE__ */ N('<span class="tbx-muted">Fetching quality…</span>'), ar = /* @__PURE__ */ N('<span class="tbx-badge"> </span>'), Ql = /* @__PURE__ */ N("<!> <!>", 1), Xl = /* @__PURE__ */ N('<div class="tbx-card tbx-card-saved"><button type="button"><span class="tbx-thumb"><!> <!></span> <span class="tbx-meta"><span class="tbx-title"> </span> <span class="tbx-badges"><!></span></span></button> <button type="button" class="tbx-mark tbx-mark-on">★</button></div>'), Zl = /* @__PURE__ */ N('<div class="tbx-section"><div class="tbx-section-head tbx-saved"> </div> <div class="tbx-grid"></div></div>'), eo = /* @__PURE__ */ N(`<div class="tbx-confirm" role="alertdialog" aria-label="Remove this bookmark?"><span>Remove this bookmark? It stays reachable from the site's own search
                results if you look for it again.</span> <span class="tbx-confirm-actions"><button type="button" class="tbx-btn">Cancel</button> <button type="button" class="tbx-btn tbx-btn-danger">Remove</button></span></div>`), to = /* @__PURE__ */ N('<p class="tbx-muted tbx-pad">Searching<!> </p>'), no = /* @__PURE__ */ N('<div class="tbx-pad"><p class="tbx-error"> </p> <button type="button" class="tbx-btn">Try again</button></div>'), ro = /* @__PURE__ */ N('<div class="tbx-pad"><p class="tbx-muted"> </p> <button type="button" class="tbx-btn">Search again</button></div>'), io = /* @__PURE__ */ N('<span class="tbx-best">Best match</span>'), so = /* @__PURE__ */ N('<span class="tbx-badge">HD</span>'), ao = /* @__PURE__ */ N('<div class="tbx-card"><button type="button"><span class="tbx-thumb"><!> <!> <!></span> <span class="tbx-meta"><span class="tbx-title"> </span> <span class="tbx-badges"><!> <!></span></span></button> <button type="button" class="tbx-mark">☆</button></div>'), lo = /* @__PURE__ */ N('<div class="tbx-section"><div class="tbx-section-head"> <span class="tbx-muted"> </span></div> <div class="tbx-grid"></div></div>'), oo = /* @__PURE__ */ N('<div class="tbx-rows"></div>'), fo = /* @__PURE__ */ N('<p class="tbx-muted tbx-still"><!></p>'), uo = /* @__PURE__ */ N('<p><span class="tbx-error"> </span> </p>'), co = /* @__PURE__ */ N('<div class="tbx-errors"></div>'), vo = /* @__PURE__ */ N('<div class="tbx-panel"><!> <!> <!> <!></div>'), ho = /* @__PURE__ */ N('<div class="tbx"><div class="tbx-head"><button type="button"><span class="tbx-globe" aria-hidden="true"></span> <span class="tbx-trigger-text"><span class="tbx-trigger-title">Watch from a site</span> <span class="tbx-trigger-sub"><!></span></span> <span aria-hidden="true"></span></button> <div class="tbx-custom"><input type="search" placeholder="Custom search term" aria-label="Custom search term for streaming sites"/> <button type="button" class="tbx-btn">Search</button></div></div> <!> <!> <!> <!> <!></div>');
function _o(e, t) {
  Yn(t, !0);
  let n = Xr(t, "title", 3, ""), r = Xr(t, "itemId", 3, null), i = /* @__PURE__ */ H(!1), s = /* @__PURE__ */ H(!1), l = /* @__PURE__ */ H(!1), f = /* @__PURE__ */ H(""), u = /* @__PURE__ */ H(ut([])), c = /* @__PURE__ */ H(ut({})), h = /* @__PURE__ */ H(null), p = /* @__PURE__ */ H(0), d = /* @__PURE__ */ H(0), v = null, g = /* @__PURE__ */ H(null);
  async function m() {
    x(g, await Ds(), !0);
  }
  const b = /* @__PURE__ */ Ce(() => Ii(a(g), "scraping")), k = /* @__PURE__ */ Ce(() => Ii(a(g), "streaming"));
  let $ = /* @__PURE__ */ H(ut([])), P = /* @__PURE__ */ H(null), ee = /* @__PURE__ */ H(ut(/* @__PURE__ */ new Set()));
  const re = (_, C) => `${_}:${C}`, J = /* @__PURE__ */ Ce(() => new Set(a($).map((_) => re(_.site, _.videoId))));
  async function F() {
    const _ = await Dl(n());
    _ && x($, _, !0);
  }
  Fn(() => {
    m(), F();
  }), Fn(() => {
    if (!a($).some((C) => C.metadataStatus === "pending")) return;
    const _ = setInterval(F, 4e3);
    return () => clearInterval(_);
  });
  async function Z(_, C) {
    x(ee, new Set(a(ee)).add(_), !0);
    try {
      await C() && await F();
    } finally {
      const B = new Set(a(ee));
      B.delete(_), x(ee, B, !0);
    }
  }
  const we = (_) => Z(re(_.site, _.video_id), () => Pl({
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
  async function le() {
    const _ = a(P);
    if (!_) return;
    x(P, null);
    const [C, B] = _.split(/:(.+)/);
    await Z(_, () => Fl(C, B));
  }
  const Ne = {
    tnaflix: 0,
    eporner: 0,
    hqporner: 1,
    paradisehill: 1,
    tubepornclassic: 1
  }, oe = (_) => Ne[_] ?? 2, xe = /* @__PURE__ */ Ce(() => {
    const _ = /* @__PURE__ */ new Map();
    for (const C of a(u)) {
      if (a(J).has(re(C.site, C.video_id))) continue;
      const B = _.get(C.site) ?? { name: C.site_name, items: [] };
      B.items.push(C), _.set(C.site, B);
    }
    return [..._.entries()].map(([C, B]) => ({ site: C, ...B })).sort((C, B) => {
      var Y, _e;
      const ke = oe(C.site) - oe(B.site);
      return ke || (((Y = B.items[0]) == null ? void 0 : Y.relevance) ?? 0) - (((_e = C.items[0]) == null ? void 0 : _e.relevance) ?? 0);
    });
  });
  function S() {
    v == null || v.close(), x(s, !0), x(h, null), x(u, [], !0), x(c, {}, !0), x(p, 0), x(d, 0);
    const _ = a(f).trim(), C = _ ? { query: _ } : r() ? { item_id: r() } : { query: n() }, B = new EventSource(Sr("/search_stream", C));
    v = B, B.onmessage = (ke) => {
      var _e;
      let Y;
      try {
        Y = JSON.parse(ke.data);
      } catch {
        return;
      }
      if (Y.total_sites && x(p, Y.total_sites, !0), Y.event === "site") {
        x(d, Y.sites_completed ?? a(d) + 1, !0), x(l, !0), (_e = Y.results) != null && _e.length && x(u, [...a(u), ...Y.results], !0), Y.error && Y.site && (a(c)[Y.site] = Y.error);
        return;
      }
      Y.event === "error" && x(h, Y.error ?? "Search failed", !0), x(l, !0), x(s, !1), B.close(), v = null;
    }, B.onerror = () => {
      B.close(), v = null, a(l) || x(h, "Search failed"), x(s, !1);
    };
  }
  Fn(() => () => v == null ? void 0 : v.close());
  const R = /* @__PURE__ */ Ce(() => a(f).trim() || n());
  function U() {
    a(b).blocked || (x(i, !0), a(s) || S());
  }
  function ae() {
    !a(i) && a(b).blocked || (x(i, !a(i)), a(i) && !a(l) && !a(s) && S());
  }
  function te(_) {
    a(k).blocked || t.host.play({
      src: Cl(_.site, _.videoId),
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
  const ie = (_) => te({
    site: _.site,
    videoId: _.video_id,
    title: _.title,
    thumbnail: _.thumbnail,
    duration: _.duration,
    resolution: _.resolution,
    size: _.size
  }), K = (_) => te(_);
  var nt = ho(), $t = T(nt), _t = T($t);
  let wt;
  var Jt = y(T(_t), 2), Wt = y(T(Jt), 2), Qt = T(Wt);
  {
    var wn = (_) => {
      var C = $l(), B = y(ln(C));
      {
        var ke = (G) => {
          var Ee = It();
          L(() => O(Ee, ` — ${a(d) ?? ""}/${a(p) ?? ""} sites`)), w(G, Ee);
        };
        z(B, (G) => {
          a(p) && G(ke);
        });
      }
      var Y = y(B);
      {
        var _e = (G) => {
          var Ee = It();
          L(() => O(Ee, `,
                            ${a(u).length ?? ""} so far`)), w(G, Ee);
        };
        z(Y, (G) => {
          a(u).length && G(_e);
        });
      }
      w(_, C);
    }, Tr = (_) => {
      var C = Jl(), B = ln(C), ke = y(B);
      {
        var Y = (_e) => {
          var G = It();
          L((Ee) => O(G, `· ${Ee ?? ""}`), [
            () => a(xe).map((Ee) => `${Ee.name} ${Ee.items.length}`).join(", ")
          ]), w(_e, G);
        };
        z(ke, (_e) => {
          a(xe).length && _e(Y);
        });
      }
      L(() => O(B, `${a(u).length ?? ""} found`)), w(_, C);
    }, Fs = (_) => {
      var C = It("Search streaming sites and play without downloading");
      w(_, C);
    };
    z(Qt, (_) => {
      a(s) ? _(wn) : a(l) ? _(Tr, 1) : _(Fs, -1);
    });
  }
  var Ls = y(Jt, 2);
  let ci;
  var js = y(_t, 2), Qn = T(js), di = y(Qn, 2), vi = y($t, 2);
  {
    var zs = (_) => {
      var C = Zl(), B = T(C), ke = Q(B), Y = y(B, 2);
      Mt(Y, 21, () => a($), (_e) => re(_e.site, _e.videoId), (_e, G) => {
        const Ee = /* @__PURE__ */ Ce(() => re(a(G).site, a(G).videoId));
        var Xn = Xl(), xt = T(Xn);
        let Zn;
        var er = T(xt), tr = T(er);
        {
          var Ar = (V) => {
            var He = Fi();
            L(() => ct(He, "src", a(G).thumbnail)), w(V, He);
          };
          z(tr, (V) => {
            a(G).thumbnail && V(Ar);
          });
        }
        var W = y(tr, 2);
        {
          var de = (V) => {
            var He = Li(), en = Q(He, !0);
            L((tn) => O(en, tn), [() => sr(a(G).duration)]), w(V, He);
          }, fe = /* @__PURE__ */ Ce(() => sr(a(G).duration));
          z(W, (V) => {
            a(fe) && V(de);
          });
        }
        var me = y(er, 2), ye = T(me), be = Q(ye, !0), Re = y(ye, 2), Xt = T(Re);
        {
          var Zt = (V) => {
            var He = Wl();
            w(V, He);
          }, xn = (V) => {
            var He = Ql(), en = ln(He);
            {
              var tn = (it) => {
                var kt = ar(), kn = Q(kt, !0);
                L(() => O(kn, a(G).resolution)), w(it, kt);
              };
              z(en, (it) => {
                a(G).resolution && it(tn);
              });
            }
            var Ot = y(en, 2);
            {
              var nr = (it) => {
                var kt = ar(), kn = Q(kt, !0);
                L((rr) => O(kn, rr), [() => Di(a(G).size)]), w(it, kt);
              };
              z(Ot, (it) => {
                a(G).size && it(nr);
              });
            }
            w(V, He);
          };
          z(Xt, (V) => {
            a(G).metadataStatus === "pending" ? V(Zt) : V(xn, -1);
          });
        }
        var rt = y(xt, 2);
        L(
          (V) => {
            Zn = Lt(xt, 1, "tbx-card-body", null, Zn, { "tbx-disabled": a(k).blocked }), xt.disabled = a(k).blocked, O(be, a(G).title), rt.disabled = V, ct(rt, "aria-label", `Remove ${a(G).title} from bookmarks`);
          },
          [() => a(ee).has(a(Ee))]
        ), ue("click", xt, () => K(a(G))), ue("click", rt, () => x(P, a(Ee), !0)), w(_e, Xn);
      }), L(() => O(ke, `Bookmarked (${a($).length ?? ""})`)), w(_, C);
    };
    z(vi, (_) => {
      a($).length && _(zs);
    });
  }
  var hi = y(vi, 2);
  {
    var Bs = (_) => {
      var C = eo(), B = y(T(C), 2), ke = T(B), Y = y(ke, 2);
      ue("click", ke, () => x(P, null)), ue("click", Y, le), w(_, C);
    };
    z(hi, (_) => {
      a(P) && _(Bs);
    });
  }
  var _i = y(hi, 2);
  Gl(_i, { onchange: m });
  var pi = y(_i, 2);
  Pi(pi, {
    purpose: "scraping",
    get route() {
      return a(b);
    },
    gerund: "Searching",
    base: "Search",
    size: "sm",
    onDisabled: m
  });
  var Vs = y(pi, 2);
  {
    var Hs = (_) => {
      var C = vo(), B = T(C);
      {
        var ke = (W) => {
          Pi(W, {
            purpose: "streaming",
            get route() {
              return a(k);
            },
            gerund: "Streaming",
            base: "Stream",
            size: "lg",
            onDisabled: m
          });
        };
        z(B, (W) => {
          a(l) && !a(s) && W(ke);
        });
      }
      var Y = y(B, 2);
      {
        var _e = (W) => {
          var de = to(), fe = y(T(de));
          {
            var me = (be) => {
              var Re = It();
              L(() => O(Re, `${a(p) ?? ""} sites`)), w(be, Re);
            };
            z(fe, (be) => {
              a(p) && be(me);
            });
          }
          var ye = y(fe);
          L(() => O(ye, ` for “${a(R) ?? ""}”…`)), w(W, de);
        }, G = (W) => {
          var de = no(), fe = T(de), me = Q(fe, !0), ye = y(fe, 2);
          L(() => O(me, a(h))), ue("click", ye, S), w(W, de);
        }, Ee = (W) => {
          var de = ro(), fe = T(de), me = Q(fe), ye = y(fe, 2);
          L(() => O(me, `No site had anything for “${a(R) ?? ""}”.`)), ue("click", ye, S), w(W, de);
        }, Xn = (W) => {
          var de = oo();
          Mt(de, 21, () => a(xe), (fe) => fe.site, (fe, me) => {
            var ye = lo(), be = T(ye), Re = T(be), Xt = y(Re), Zt = Q(Xt), xn = y(be, 2);
            Mt(xn, 23, () => a(me).items, (rt) => `${rt.site}:${rt.video_id}`, (rt, V, He) => {
              const en = /* @__PURE__ */ Ce(() => re(a(V).site, a(V).video_id));
              var tn = ao(), Ot = T(tn);
              let nr;
              var it = T(Ot), kt = T(it);
              {
                var kn = (ne) => {
                  var Se = Fi();
                  L(() => ct(Se, "src", a(V).thumbnail)), w(ne, Se);
                };
                z(kt, (ne) => {
                  a(V).thumbnail && ne(kn);
                });
              }
              var rr = y(kt, 2);
              {
                var Us = (ne) => {
                  var Se = Li(), En = Q(Se, !0);
                  L((Nr) => O(En, Nr), [() => sr(a(V).duration)]), w(ne, Se);
                }, qs = /* @__PURE__ */ Ce(() => sr(a(V).duration));
                z(rr, (ne) => {
                  a(qs) && ne(Us);
                });
              }
              var Ks = y(rr, 2);
              {
                var Ys = (ne) => {
                  var Se = io();
                  w(ne, Se);
                };
                z(Ks, (ne) => {
                  a(He) === 0 && ne(Ys);
                });
              }
              var Gs = y(it, 2), bi = T(Gs), $s = Q(bi, !0), Js = y(bi, 2), gi = T(Js);
              {
                var Ws = (ne) => {
                  var Se = ar(), En = Q(Se, !0);
                  L(() => O(En, a(V).resolution)), w(ne, Se);
                }, Qs = (ne) => {
                  var Se = so();
                  w(ne, Se);
                };
                z(gi, (ne) => {
                  a(V).resolution ? ne(Ws) : a(V).hd && ne(Qs, 1);
                });
              }
              var Xs = y(gi, 2);
              {
                var Zs = (ne) => {
                  var Se = ar(), En = Q(Se, !0);
                  L((Nr) => O(En, Nr), [() => Di(a(V).size)]), w(ne, Se);
                };
                z(Xs, (ne) => {
                  a(V).size && ne(Zs);
                });
              }
              var Mr = y(Ot, 2);
              L(
                (ne) => {
                  nr = Lt(Ot, 1, "tbx-card-body", null, nr, { "tbx-disabled": a(k).blocked }), Ot.disabled = a(k).blocked, O($s, a(V).title), Mr.disabled = ne, ct(Mr, "aria-label", `Bookmark ${a(V).title}`);
                },
                [() => a(ee).has(a(en))]
              ), ue("click", Ot, () => ie(a(V))), ue("click", Mr, () => we(a(V))), w(rt, tn);
            }), L(() => {
              O(Re, `${a(me).name ?? ""} `), O(Zt, `top ${a(me).items.length ?? ""}`);
            }), w(fe, ye);
          }), w(W, de);
        };
        z(Y, (W) => {
          a(s) && !a(u).length ? W(_e) : a(h) ? W(G, 1) : a(l) && !a(s) && !a(u).length ? W(Ee, 2) : a(xe).length && W(Xn, 3);
        });
      }
      var xt = y(Y, 2);
      {
        var Zn = (W) => {
          var de = fo(), fe = T(de);
          {
            var me = (be) => {
              var Re = It();
              L(() => O(Re, `${a(p) - a(d)} of ${a(p) ?? ""} sites still searching…`)), w(be, Re);
            }, ye = (be) => {
              var Re = It("Still searching…");
              w(be, Re);
            };
            z(fe, (be) => {
              a(p) ? be(me) : be(ye, -1);
            });
          }
          w(W, de);
        };
        z(xt, (W) => {
          a(s) && a(u).length && W(Zn);
        });
      }
      var er = y(xt, 2);
      {
        var tr = (W) => {
          var de = co();
          Mt(de, 21, () => Object.entries(a(c)), ([fe, me]) => fe, (fe, me) => {
            var ye = /* @__PURE__ */ Ce(() => Yi(a(me), 2));
            let be = () => a(ye)[0], Re = () => a(ye)[1];
            var Xt = uo(), Zt = T(Xt), xn = Q(Zt, !0), rt = y(Zt);
            L(() => {
              O(xn, be()), O(rt, `: ${Re() ?? ""}`);
            }), w(fe, Xt);
          }), w(W, de);
        }, Ar = /* @__PURE__ */ Ce(() => Object.keys(a(c)).length);
        z(er, (W) => {
          a(Ar) && W(tr);
        });
      }
      w(_, C);
    };
    z(Vs, (_) => {
      a(i) && _(Hs);
    });
  }
  L(
    (_) => {
      wt = Lt(_t, 1, "tbx-trigger", null, wt, { "tbx-disabled": a(b).blocked }), _t.disabled = a(b).blocked, ci = Lt(Ls, 1, "tbx-chevron", null, ci, { "tbx-open": a(i) }), Qn.disabled = a(b).blocked, di.disabled = _;
    },
    [
      () => a(s) || !a(f).trim() || a(b).blocked
    ]
  ), ue("click", _t, ae), ue("keydown", Qn, (_) => _.key === "Enter" && !a(b).blocked && U()), Tl(Qn, () => a(f), (_) => x(f, _)), ue("click", di, U), w(e, nt), Gn();
}
Er(["click", "keydown"]);
var po = /* @__PURE__ */ N('<p class="tbx-error"> </p>'), bo = /* @__PURE__ */ N('<p><span class="tbx-error"> </span> </p>'), go = /* @__PURE__ */ N('<div class="tbx-broken"></div>'), mo = /* @__PURE__ */ N('<li><span class="tbx-rank"> </span> <span class="tbx-list-main"><span class="tbx-list-name"> </span> <span class="tbx-muted"> </span></span> <span class="tbx-list-actions"><button type="button" class="tbx-icon">↑</button> <button type="button" class="tbx-icon">↓</button> <button type="button" class="tbx-btn tbx-btn-small"> </button></span></li>'), yo = /* @__PURE__ */ N('<p class="tbx-muted">No scrapers loaded.</p>'), wo = /* @__PURE__ */ N(`<div class="tbx tbx-settings"><div class="tbx-box"><div class="tbx-box-head"><div><p class="tbx-box-title">Site scrapers</p> <p class="tbx-muted">Loaded from <code> </code>. This is the add-on's own
                    bundled folder unless you have pointed it elsewhere, so updating the add-on
                    refreshes every scraper in it.</p></div> <button type="button" class="tbx-btn"> </button></div> <!> <!> <ul class="tbx-list"></ul> <!></div></div>`);
function xo(e, t) {
  Yn(t, !0);
  let n = /* @__PURE__ */ H(null), r = /* @__PURE__ */ H(null), i = /* @__PURE__ */ H(!1), s = /* @__PURE__ */ H(!1), l = /* @__PURE__ */ H(null);
  function f(S, R) {
    S ? (x(n, S, !0), x(l, null)) : x(l, R, !0);
  }
  const u = async () => f(await Nl("/plugins"), "Could not read the scraper registry");
  async function c() {
    x(i, !0), f(await Rl("/plugins/rescan"), "Rescan failed"), x(i, !1);
  }
  async function h(S, R) {
    x(r, S, !0), f(await Oi(`/plugins/${encodeURIComponent(S)}/enabled`, { enabled: R }), `Could not switch ${S} ${R ? "on" : "off"}`), x(r, null);
  }
  Fn(() => {
    u();
    const S = setInterval(u, 5e3);
    return () => clearInterval(S);
  });
  const p = /* @__PURE__ */ Ce(() => {
    var te, ie;
    const S = (((te = a(n)) == null ? void 0 : te.scrapers) ?? []).filter((K) => !K.error), R = new Map(S.map((K) => [K.key, K])), U = (((ie = a(n)) == null ? void 0 : ie.site_order) ?? []).map((K) => R.get(K)).filter((K) => K !== void 0), ae = new Set(U.map((K) => K.key));
    return [...U, ...S.filter((K) => !ae.has(K.key))];
  });
  async function d(S, R) {
    const U = a(p).map((te) => te.key), ae = S + R;
    ae < 0 || ae >= U.length || ([U[S], U[ae]] = [U[ae], U[S]], x(s, !0), f(await Oi("/plugins/order", { order: U }), "Could not save the scraper order"), x(s, !1));
  }
  const v = /* @__PURE__ */ Ce(() => {
    var S;
    return (((S = a(n)) == null ? void 0 : S.scrapers) ?? []).filter((R) => R.error);
  });
  var g = wo(), m = T(g), b = T(m), k = T(b), $ = y(T(k), 2), P = y(T($)), ee = Q(P, !0), re = y(k, 2), J = Q(re, !0), F = y(b, 2);
  {
    var Z = (S) => {
      var R = po(), U = Q(R, !0);
      L(() => O(U, a(l))), w(S, R);
    };
    z(F, (S) => {
      a(l) && S(Z);
    });
  }
  var we = y(F, 2);
  {
    var le = (S) => {
      var R = go();
      Mt(R, 21, () => a(v), (U) => U.key, (U, ae) => {
        var te = bo(), ie = T(te), K = Q(ie, !0), nt = y(ie);
        L(() => {
          O(K, a(ae).key), O(nt, `: ${a(ae).error ?? ""}`);
        }), w(U, te);
      }), w(S, R);
    };
    z(we, (S) => {
      a(v).length && S(le);
    });
  }
  var Ne = y(we, 2);
  Mt(Ne, 23, () => a(p), (S) => S.key, (S, R, U) => {
    var ae = mo(), te = T(ae), ie = Q(te, !0), K = y(te, 2), nt = T(K), $t = Q(nt, !0), _t = y(nt, 2), wt = Q(_t, !0), Jt = y(K, 2), Wt = T(Jt), Qt = y(Wt, 2), wn = y(Qt, 2), Tr = Q(wn, !0);
    L(() => {
      O(ie, a(U) + 1), O($t, a(R).name), O(wt, a(R).base_url), ct(Wt, "aria-label", `Move ${a(R).name} up`), Wt.disabled = a(s) || a(U) === 0, ct(Qt, "aria-label", `Move ${a(R).name} down`), Qt.disabled = a(s) || a(U) === a(p).length - 1, wn.disabled = a(r) === a(R).key, O(Tr, a(R).enabled ? "On" : "Off");
    }), ue("click", Wt, () => d(a(U), -1)), ue("click", Qt, () => d(a(U), 1)), ue("click", wn, () => h(a(R).key, !a(R).enabled)), w(S, ae);
  });
  var oe = y(Ne, 2);
  {
    var xe = (S) => {
      var R = yo();
      w(S, R);
    };
    z(oe, (S) => {
      a(n) && !a(p).length && !a(v).length && S(xe);
    });
  }
  L(() => {
    var S;
    O(ee, ((S = a(n)) == null ? void 0 : S.plugin_dir) ?? "…"), re.disabled = a(i), O(J, a(i) ? "Rescanning…" : "Rescan folder");
  }), ue("click", re, c), w(e, g), Gn();
}
Er(["click"]);
function ji(e, t = () => ({})) {
  return ({ target: n, api: r, props: i, navigate: s, host: l }) => {
    Ml(r);
    const f = ut({ ...i, navigate: s, host: l, ...t() }), u = hl(e, { target: n, props: f });
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
        pl(u);
      }
    };
  };
}
const So = { details: ji(_o), settings: ji(xo) };
export {
  So as slots
};
