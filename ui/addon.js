var na = Object.defineProperty;
var mi = (e) => {
  throw TypeError(e);
};
var ra = (e, t, n) => t in e ? na(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Fe = (e, t, n) => ra(e, typeof t != "symbol" ? t + "" : t, n), Rr = (e, t, n) => t.has(e) || mi("Cannot " + n);
var o = (e, t, n) => (Rr(e, t, "read from private field"), n ? n.call(e) : t.get(e)), M = (e, t, n) => t.has(e) ? mi("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), A = (e, t, n, r) => (Rr(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), P = (e, t, n) => (Rr(e, t, "access private method"), n);
const ve = Symbol("uninitialized"), ia = "http://www.w3.org/1999/xhtml", Vi = !1;
var Hi = Array.isArray, sa = Array.prototype.indexOf, dr = Array.prototype.includes, xr = Array.from, Ui = Object.defineProperty, On = Object.getOwnPropertyDescriptor, aa = Object.getOwnPropertyDescriptors, la = Object.prototype, oa = Array.prototype, qi = Object.getPrototypeOf, yi = Object.isExtensible;
const fa = () => {
};
function ua(e) {
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
const pe = 2, Ln = 4, kr = 8, Gi = 1 << 24, et = 16, $e = 32, yt = 64, zr = 128, ei = 256, Ge = 512, he = 1024, ue = 2048, nt = 4096, Ae = 8192, Ve = 16384, mn = 32768, Br = 1 << 25, _n = 65536, vr = 1 << 17, ca = 1 << 18, yn = 1 << 19, da = 1 << 20, ft = 1 << 25, Kt = 65536, hr = 1 << 21, an = 1 << 22, Mt = 1 << 23, Cr = Symbol("$state"), $i = Symbol("component"), va = Symbol(""), lr = Symbol("attributes"), Vr = Symbol("class"), ha = Symbol("style"), Tn = Symbol("text"), or = Symbol("form reset"), Kn = new class extends Error {
  constructor() {
    super(...arguments);
    Fe(this, "name", "StaleReactionError");
    Fe(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
function _a() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function pa() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Ji(e) {
  return e === this.v;
}
function ba(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Wi(e) {
  return !ba(e, this.v);
}
function ga() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function ma(e, t, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function ya(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function wa() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function xa(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function ka() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Ea() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Sa() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Ta() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Aa() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
let Ma = !1, Ie = null;
function pn(e) {
  Ie = e;
}
function Yn(e, t = !1, n) {
  Ie = {
    p: Ie,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      L
    ),
    l: null
  };
}
function Gn(e) {
  var t = (
    /** @type {ComponentContext} */
    Ie
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      ps(r);
  }
  return t.i = !0, Ie = t.p, Qi(e);
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
  Dt = [], ua(e);
}
function Tt(e) {
  if (Dt.length === 0 && !Dn) {
    var t = Dt;
    queueMicrotask(() => {
      t === Dt && Zi();
    });
  }
  Dt.push(e);
}
function Na() {
  for (; Dt.length > 0; )
    Zi();
}
const Ra = -7169;
function ae(e, t) {
  e.f = e.f & Ra | t;
}
function ti(e) {
  (e.f & Ge) !== 0 || e.deps === null ? ae(e, he) : ae(e, nt);
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
  (e.f & ue) !== 0 ? t.add(e) : (e.f & nt) !== 0 && n.add(e), es(e.deps), ae(e, he);
}
let wi = !1;
function Ca() {
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
  var t = I, n = L;
  Je(null), ht(null);
  try {
    return e();
  } finally {
    Je(t), ht(n);
  }
}
function Oa(e, t, n, r = n) {
  e.addEventListener(t, () => $n(n));
  const i = (
    /** @type {any} */
    e[or]
  );
  i ? e[or] = () => {
    i(), r(!0);
  } : e[or] = () => r(!0), Ca();
}
function Ia(e, t, n, r) {
  const i = ni;
  var s = e.filter((h) => !h.settled), l = t.map(i);
  if (n.length === 0 && s.length === 0) {
    r(l);
    return;
  }
  var f = (
    /** @type {Effect} */
    L
  ), u = Da(), c = s.length === 1 ? s[0].promise : s.length > 1 ? Promise.all(s.map((h) => h.promise)) : null;
  function v(h) {
    if ((f.f & Ve) === 0) {
      u();
      try {
        r([...l, ...h]);
      } catch (_) {
        ot(_, f);
      }
      _r();
    }
  }
  var b = ns();
  if (n.length === 0) {
    c.then(() => v([])).finally(b);
    return;
  }
  function d() {
    Promise.all(n.map((h) => /* @__PURE__ */ Pa(h))).then(v).catch((h) => ot(h, f)).finally(b);
  }
  c ? c.then(() => {
    u(), d(), _r();
  }) : d();
}
function Da() {
  var e = (
    /** @type {Effect} */
    L
  ), t = I, n = Ie, r = (
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
    L
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
  var t = pe | ue;
  return L !== null && (L.f |= yn), {
    ctx: Ie,
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
    parent: L,
    ac: null
  };
}
const An = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function Pa(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    L
  );
  r === null && ga();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = Gt(
    /** @type {V} */
    ve
  ), l = !I, f = /* @__PURE__ */ new Set();
  return Za(() => {
    var h, _;
    var u = (
      /** @type {Effect} */
      L
    ), c = Ki();
    i = c.promise;
    try {
      Promise.resolve(e()).then(c.resolve, (m) => {
        m !== Kn && c.reject(m);
      }).finally(_r);
    } catch (m) {
      c.reject(m), _r();
    }
    var v = (
      /** @type {Batch} */
      E
    );
    if (l) {
      if ((u.f & mn) !== 0)
        var b = ns();
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        (h = r.b) != null && h.is_rendered()
      )
        (_ = v.async_deriveds.get(u)) == null || _.reject(An);
      else
        for (const m of f.values())
          m.reject(An);
      f.add(c), v.async_deriveds.set(u, c);
    }
    const d = (m, g = void 0) => {
      b == null || b(), f.delete(c), g !== An && (v.activate(), g ? (s.f |= Mt, bn(s, g)) : ((s.f & Mt) !== 0 && (s.f ^= Mt), bn(s, m)), v.deactivate());
    };
    c.promise.then(d, (m) => d(null, m || "unknown"));
  }), Qa(() => {
    for (const u of f)
      u.reject(An);
  }), new Promise((u) => {
    function c(v) {
      function b() {
        v === i ? u(s) : c(i);
      }
      v.then(b, b);
    }
    c(i);
  });
}
// @__NO_SIDE_EFFECTS__
function Re(e) {
  const t = /* @__PURE__ */ ni(e);
  return xs(t), t;
}
// @__NO_SIDE_EFFECTS__
function Fa(e) {
  const t = /* @__PURE__ */ ni(e);
  return t.equals = Wi, t;
}
function La(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      De(
        /** @type {Effect} */
        t[n]
      );
  }
}
function ri(e) {
  var t, n = L, r = e.parent;
  if (!Nt && r !== null && e.v !== ve && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (Ve | Ae)) !== 0)
    return _a(), e.v;
  ht(r);
  try {
    e.f &= ~Kt, La(e), t = Ts(e);
  } finally {
    ht(n);
  }
  return t;
}
function rs(e) {
  var t = ri(e);
  if (!e.equals(t) && (e.wv = Es(), (!(E != null && E.is_fork) || e.deps === null) && (E !== null ? (E.capture(e, t, !0), In == null || In.capture(e, t, !0)) : e.v = t, e.deps === null))) {
    ae(e, he);
    return;
  }
  Nt || (ge !== null ? (ai() || E != null && E.is_fork) && ge.set(e, t) : ti(e));
}
function ja(e) {
  var t;
  if (e.effects !== null)
    for (const n of e.effects)
      (n.teardown || n.ac) && ((t = n.teardown) == null || t.call(n), n.ac !== null && $n(() => {
        n.ac.abort(Kn), n.ac = null;
      }), n.fn !== null && (n.teardown = fa), zn(n, 0), oi(n));
}
function is(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && t.fn !== null && gn(t);
}
let Or = null, nn = null, E = null, In = null, ge = null, Hr = null, Dn = !1, Ir = !1, sn = null, fr = null;
var xi = 0;
let za = 1;
var on, Et, jt, fn, un, cn, pt, dn, Ce, Bn, bt, Xe, st, vn, zt, Y, Ur, Mn, qr, ss, as, rn, Ba, Nn;
const mr = class mr {
  constructor() {
    M(this, Y);
    Fe(this, "id", za++);
    /** True as soon as `#process` was called */
    M(this, on, !1);
    Fe(this, "linked", !0);
    /** @type {Batch | null} */
    M(this, Et, null);
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
    M(this, Ce, []);
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
    M(this, Xe, /* @__PURE__ */ new Set());
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
    nn === null ? Or = nn = this : (A(nn, jt, this), A(this, Et, nn)), nn = this;
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
        ae(i, ue), n(i);
      for (i of r.m)
        ae(i, nt), n(i);
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
    t.v !== ve && !this.previous.has(t) && this.previous.set(t, t.v), (t.f & Mt) === 0 && (this.current.set(t, [n, r]), ge == null || ge.set(t, n)), this.is_fork || (t.v = n);
  }
  activate() {
    E = this;
  }
  deactivate() {
    E = null, ge = null;
  }
  flush() {
    try {
      Ir = !0, E = this, P(this, Y, Mn).call(this);
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
    P(this, Y, Nn).call(this), (t = o(this, dn)) == null || t.resolve();
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
    o(this, zt) || (A(this, zt, !0), Tt(() => {
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
      o(this, Xe).add(r);
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
      !Ir && !Dn && Tt(() => {
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
      if (sn !== null && n === L && (I === null || (I.f & pe) === 0))
        return;
      if ((r & (yt | $e)) !== 0) {
        if ((r & he) === 0)
          return;
        n.f ^= he;
      }
    }
    o(this, Ce).push(n);
  }
};
on = new WeakMap(), Et = new WeakMap(), jt = new WeakMap(), fn = new WeakMap(), un = new WeakMap(), cn = new WeakMap(), pt = new WeakMap(), dn = new WeakMap(), Ce = new WeakMap(), Bn = new WeakMap(), bt = new WeakMap(), Xe = new WeakMap(), st = new WeakMap(), vn = new WeakMap(), zt = new WeakMap(), Y = new WeakSet(), Ur = function() {
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
  var u, c, v, b;
  A(this, on, !0), xi++ > 1e3 && (P(this, Y, Nn).call(this), Ha());
  for (const d of o(this, bt))
    o(this, Xe).delete(d), ae(d, ue), this.schedule(d);
  for (const d of o(this, Xe))
    ae(d, nt), this.schedule(d);
  const t = o(this, Ce);
  A(this, Ce, []), this.apply();
  var n = sn = [], r = [], i = fr = [];
  for (const d of t)
    try {
      P(this, Y, qr).call(this, d, n, r);
    } catch (h) {
      throw fs(d), P(this, Y, Ur).call(this) || this.discard(), h;
    }
  if (E = null, i.length > 0) {
    var s = mr.ensure();
    for (const d of i)
      s.schedule(d);
  }
  if (sn = null, fr = null, P(this, Y, Ur).call(this)) {
    P(this, Y, rn).call(this, r), P(this, Y, rn).call(this, n);
    for (const [d, h] of o(this, st))
      os(d, h);
    i.length > 0 && /** @type {unknown} */
    P(u = E, Y, Mn).call(u);
    return;
  }
  const l = P(this, Y, ss).call(this);
  if (l) {
    P(this, Y, rn).call(this, r), P(this, Y, rn).call(this, n), P(c = l, Y, as).call(c, this);
    return;
  }
  o(this, bt).clear(), o(this, Xe).clear();
  for (const d of o(this, fn)) d(this);
  o(this, fn).clear(), In = this, ki(r), ki(n), In = null, (v = o(this, dn)) == null || v.resolve();
  var f = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    E
  );
  if (o(this, cn) === 0 && (o(this, Ce).length === 0 || f !== null) && P(this, Y, Nn).call(this), o(this, Ce).length > 0)
    if (f !== null) {
      const d = f;
      o(d, Ce).push(...o(this, Ce).filter((h) => !o(d, Ce).includes(h)));
    } else
      f = this;
  f !== null && (dt.clear(), P(b = f, Y, Mn).call(b));
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
    var s = i.f, l = (s & ($e | yt)) !== 0, f = l && (s & he) !== 0, u = f || (s & Ae) !== 0 || o(this, st).has(i);
    if (!u && i.fn !== null) {
      l ? i.f ^= he : (s & Ln) !== 0 ? n.push(i) : Wn(i) && ((s & et) !== 0 && o(this, Xe).add(i), gn(i));
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
}, ss = function() {
  for (var t = o(this, Et); t !== null; ) {
    if (!t.is_fork) {
      for (const [n, [, r]] of this.current)
        if (t.current.has(n) && !r)
          return t;
    }
    t = o(t, Et);
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
  t.async_deriveds.clear(), this.transfer_effects(o(t, bt), o(t, Xe));
  const n = (i) => {
    var s = i.reactions;
    if (s !== null && !((i.f & pe) !== 0 && (i.f & (ue | nt)) === 0))
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
          l & (an | et) && !this.async_deriveds.has(f) && (o(this, Xe).delete(f), ae(f, ue), this.schedule(f));
        }
      }
  };
  for (const i of this.current.keys())
    n(i);
  this.oncommit(() => t.discard()), P(r = t, Y, Nn).call(r), E = this, P(this, Y, Mn).call(this);
}, /**
 * @param {Effect[]} effects
 */
rn = function(t) {
  for (var n = 0; n < t.length; n += 1)
    ts(t[n], o(this, bt), o(this, Xe));
}, Ba = function() {
  var b;
  for (let d = Or; d !== null; d = o(d, jt)) {
    var t = d.id < this.id, n = [];
    for (const [h, [_, m]] of this.current) {
      if (d.current.has(h)) {
        var r = (
          /** @type {[any, boolean]} */
          d.current.get(h)[0]
        );
        if (t && _ !== r)
          d.current.set(h, [_, m]);
        else
          continue;
      }
      n.push(h);
    }
    if (t)
      for (const [h, _] of this.async_deriveds) {
        const m = d.async_deriveds.get(h);
        m && _.promise.then(m.resolve).catch(m.reject);
      }
    var i = [...d.current.keys()].filter(
      (h) => !/** @type {[any, boolean]} */
      d.current.get(h)[1]
    );
    if (!(!o(d, on) || i.length === 0)) {
      var s = i.filter((h) => !this.current.has(h));
      if (s.length === 0)
        t && d.discard();
      else if (n.length > 0) {
        if (t)
          for (const h of o(this, vn))
            d.unskip_effect(h, (_) => {
              var m;
              (_.f & (et | an)) !== 0 ? d.schedule(_) : P(m = d, Y, rn).call(m, [_]);
            });
        d.activate();
        var l = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Map();
        for (var u of n)
          ls(u, s, l, f);
        f = /* @__PURE__ */ new Map();
        var c = [...d.current].filter(([h, _]) => {
          const m = this.current.get(h);
          return m ? m[0] !== _[0] || m[1] !== _[1] : !0;
        }).map(([h]) => h);
        if (c.length > 0)
          for (const h of o(this, Bn))
            (h.f & (Ve | Ae | vr)) === 0 && ii(h, c, f) && ((h.f & (an | et)) !== 0 ? (ae(h, ue), d.schedule(h)) : o(d, bt).add(h));
        if (o(d, Ce).length > 0 && !o(d, zt)) {
          d.apply();
          for (var v of o(d, Ce))
            P(b = d, Y, qr).call(b, v, [], []);
          A(d, Ce, []);
        }
        d.deactivate();
      }
    }
  }
}, Nn = function() {
  if (this.linked) {
    var t = o(this, Et), n = o(this, jt);
    t === null ? Or = n : A(t, jt, n), n === null ? nn = t : A(n, Et, t), this.linked = !1;
  }
};
let Yt = mr;
function Va(e) {
  var t = Dn;
  Dn = !0;
  try {
    for (var n; ; ) {
      if (Na(), E === null)
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
function Ha() {
  try {
    ka();
  } catch (e) {
    ot(e, Hr);
  }
}
let Qe = null;
function ki(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (Ve | Ae)) === 0 && Wn(r) && (Qe = /* @__PURE__ */ new Set(), gn(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && ms(r), (Qe == null ? void 0 : Qe.size) > 0)) {
        dt.clear();
        for (const i of Qe) {
          if ((i.f & (Ve | Ae)) !== 0) continue;
          const s = [i];
          let l = i.parent;
          for (; l !== null; )
            Qe.has(l) && (Qe.delete(l), s.push(l)), l = l.parent;
          for (let f = s.length - 1; f >= 0; f--) {
            const u = s[f];
            (u.f & (Ve | Ae)) === 0 && gn(u);
          }
        }
        Qe.clear();
      }
    }
    Qe = null;
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
      ) : (s & (an | et)) !== 0 && (s & ue) === 0 && ii(i, t, r) && (ae(i, ue), si(
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
    (e.f & ue) !== 0 ? t.d.push(e) : (e.f & nt) !== 0 && t.m.push(e), ae(e, he);
    for (var n = e.first; n !== null; )
      os(n, t), n = n.next;
  }
}
function fs(e) {
  ae(e, he);
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
function Ua(e, t = !1, n = !0) {
  const r = Gt(e);
  return t || (r.equals = Wi), r;
}
function w(e, t, n = !1) {
  I !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!tt || (I.f & vr) !== 0) && Xi() && (I.f & (pe | et | an | vr)) !== 0 && (vt === null || !vt.has(e)) && Ta();
  let r = n ? ut(t) : t;
  return bn(e, r, fr);
}
function bn(e, t, n = null) {
  if (!e.equals(t)) {
    Nt ? dt.set(e, t) : dt.has(e) || dt.set(e, e.v);
    var r = Yt.ensure();
    if (r.capture(e, t), (e.f & pe) !== 0) {
      const i = (
        /** @type {Derived} */
        e
      );
      (e.f & ue) !== 0 && ri(i), ge === null && ti(i);
    }
    e.wv = Es(), cs(e, ue, n), L !== null && (L.f & he) !== 0 && (L.f & ($e | yt)) === 0 && (Ue === null ? nl([e]) : Ue.push(e)), !r.is_fork && pr.size > 0 && !us && qa();
  }
  return t;
}
function qa() {
  us = !1;
  for (const e of pr) {
    (e.f & he) !== 0 && ae(e, nt);
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
  w(e, e.v + 1);
}
function cs(e, t, n) {
  var r = e.reactions;
  if (r !== null)
    for (var i = r.length, s = 0; s < i; s++) {
      var l = r[s], f = l.f, u = (f & ue) === 0;
      if (u && ae(l, t), (f & vr) !== 0)
        pr.add(
          /** @type {Effect} */
          l
        );
      else if ((f & pe) !== 0) {
        var c = (
          /** @type {Derived} */
          l
        );
        ge == null || ge.delete(c), (f & Kt) === 0 && (f & Ge && (L === null || (L.f & hr) === 0) && (l.f |= Kt), cs(c, nt, n));
      } else if (u) {
        var v = (
          /** @type {Effect} */
          l
        );
        (f & et) !== 0 && Qe !== null && Qe.add(v), n !== null ? n.push(v) : si(v);
      }
    }
}
function ut(e) {
  if (typeof e != "object" || e === null || Cr in e || $i in e)
    return e;
  const t = qi(e);
  if (t !== la && t !== oa)
    return e;
  var n = /* @__PURE__ */ new Map(), r = Hi(e), i = /* @__PURE__ */ H(0), s = qt, l = (f) => {
    if (qt === s)
      return f();
    var u = I, c = qt;
    Je(null), Ti(s);
    var v = f();
    return Je(u), Ti(c), v;
  };
  return r && n.set("length", /* @__PURE__ */ H(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(f, u, c) {
        (!("value" in c) || c.configurable === !1 || c.enumerable === !1 || c.writable === !1) && Ea();
        var v = n.get(u);
        return v === void 0 ? l(() => {
          var b = /* @__PURE__ */ H(c.value);
          return n.set(u, b), b;
        }) : w(v, c.value, !0), !0;
      },
      deleteProperty(f, u) {
        var c = n.get(u);
        if (c === void 0) {
          if (u in f) {
            const v = l(() => /* @__PURE__ */ H(ve));
            n.set(u, v), Pn(i);
          }
        } else
          w(c, ve), Pn(i);
        return !0;
      },
      get(f, u, c) {
        var h;
        if (u === Cr)
          return e;
        var v = n.get(u), b = u in f;
        if (v === void 0 && (!b || (h = On(f, u)) != null && h.writable) && (v = l(() => {
          var _ = ut(b ? f[u] : ve), m = /* @__PURE__ */ H(_);
          return m;
        }), n.set(u, v)), v !== void 0) {
          var d = a(v);
          return d === ve ? void 0 : d;
        }
        return Reflect.get(f, u, c);
      },
      getOwnPropertyDescriptor(f, u) {
        var c = Reflect.getOwnPropertyDescriptor(f, u);
        if (c && "value" in c) {
          var v = n.get(u);
          v && (c.value = a(v));
        } else if (c === void 0) {
          var b = n.get(u), d = b == null ? void 0 : b.v;
          if (b !== void 0 && d !== ve)
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
        var c = n.get(u), v = c !== void 0 && c.v !== ve || Reflect.has(f, u);
        if (c !== void 0 || L !== null && (!v || (d = On(f, u)) != null && d.writable)) {
          c === void 0 && (c = l(() => {
            var h = v ? ut(f[u]) : ve, _ = /* @__PURE__ */ H(h);
            return _;
          }), n.set(u, c));
          var b = a(c);
          if (b === ve)
            return !1;
        }
        return v;
      },
      set(f, u, c, v) {
        var D;
        var b = n.get(u), d = u in f;
        if (r && u === "length")
          for (var h = c; h < /** @type {Source<number>} */
          b.v; h += 1) {
            var _ = n.get(h + "");
            _ !== void 0 ? w(_, ve) : h in f && (_ = l(() => /* @__PURE__ */ H(ve)), n.set(h + "", _));
          }
        if (b === void 0)
          (!d || (D = On(f, u)) != null && D.writable) && (b = l(() => /* @__PURE__ */ H(void 0)), w(b, ut(c)), n.set(u, b));
        else {
          d = b.v !== ve;
          var m = l(() => ut(c));
          w(b, m);
        }
        var g = Reflect.getOwnPropertyDescriptor(f, u);
        if (g != null && g.set && g.set.call(v, c), !d) {
          if (r && typeof u == "string") {
            var x = (
              /** @type {Source<number>} */
              n.get("length")
            ), J = Number(u);
            Number.isInteger(J) && J >= x.v && w(x, J + 1);
          }
          Pn(i);
        }
        return !0;
      },
      ownKeys(f) {
        a(i);
        var u = Reflect.ownKeys(f).filter((b) => {
          var d = n.get(b);
          return d === void 0 || d.v !== ve;
        });
        for (var [c, v] of n)
          v.v !== ve && !(c in f) && u.push(c);
        return u;
      },
      setPrototypeOf() {
        Sa();
      }
    }
  );
}
var Ei, ds, vs, hs;
function Ka() {
  if (Ei === void 0) {
    Ei = window, ds = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    vs = On(t, "firstChild").get, hs = On(t, "nextSibling").get, yi(e) && (e[Vr] = void 0, e[lr] = null, e[ha] = void 0, e.__e = void 0), yi(n) && (n[Tn] = void 0);
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
function X(e, t = !1) {
  return /* @__PURE__ */ jn(e);
}
function y(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Jn(r);
  return r;
}
function Ya(e) {
  e.textContent = "";
}
function _s() {
  return !1;
}
function Ga(e, t, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    n ? document.createElement(e, { is: n }) : document.createElement(e)
  );
}
function $a(e) {
  var t = L;
  if (t === null)
    return I.f |= Mt, e;
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
function Ja(e) {
  L === null && (I === null && xa(), wa()), Nt && ya();
}
function Wa(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Rt(e, t) {
  var n = L;
  n !== null && (n.f & Ae) !== 0 && (e |= Ae);
  var r = {
    ctx: Ie,
    deps: null,
    nodes: null,
    f: e | ue | Ge,
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
      throw De(r), l;
    }
    i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
    (i.f & yn) === 0 && (i = i.first, (e & et) !== 0 && (e & _n) !== 0 && i !== null && (i.f |= _n));
  }
  if (i !== null && (i.parent = n, n !== null && Wa(i, n), I !== null && (I.f & pe) !== 0 && (e & yt) === 0)) {
    var s = (
      /** @type {Derived} */
      I
    );
    (s.effects ?? (s.effects = [])).push(i);
  }
  return r;
}
function ai() {
  return I !== null && !tt;
}
function Qa(e) {
  const t = Rt(kr, null);
  return ae(t, he), t.teardown = e, t;
}
function Fn(e) {
  Ja();
  var t = (
    /** @type {Effect} */
    L.f
  ), n = !I && (t & $e) !== 0 && Ie !== null && !Ie.i;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      Ie
    );
    (r.e ?? (r.e = [])).push(e);
  } else
    return ps(e);
}
function ps(e) {
  return Rt(Ln | da, e);
}
function Xa(e) {
  Yt.ensure();
  const t = Rt(yt | yn, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? Ut(t, () => {
      De(t), r(void 0);
    }) : (De(t), r(void 0));
  });
}
function Za(e) {
  return Rt(an | yn, e);
}
function bs(e, t = 0) {
  return Rt(kr | t, e);
}
function F(e, t = [], n = [], r = []) {
  Ia(r, t, n, (i) => {
    Rt(kr, () => {
      e(...i.map(a));
    });
  });
}
function li(e, t = 0) {
  var n = Rt(et | t, e);
  return n;
}
function Ye(e) {
  return Rt($e | yn, e);
}
function gs(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = Nt, r = I;
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
    (n.f & yt) !== 0 ? n.parent = null : De(n, t), n = r;
  }
}
function el(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & $e) === 0 && De(t), t = n;
  }
}
function De(e, t = !0) {
  var n = !1;
  (t || (e.f & ca) !== 0) && e.nodes !== null && e.nodes.end !== null && (tl(
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
function tl(e, t) {
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
    n && De(e), t && t();
  }, s = r.length;
  if (s > 0) {
    var l = () => --s || i();
    for (var f of r)
      f.out(l);
  } else
    i();
}
function ys(e, t, n) {
  if ((e.f & Ae) === 0) {
    e.f ^= Ae;
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
        (i.f & $e) !== 0 && (e.f & et) !== 0;
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
  if ((e.f & ei) === 0 && (e.f & Ae) !== 0) {
    e.f ^= Ae, (e.f & he) === 0 && (ae(e, ue), Yt.ensure().schedule(e));
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
let ur = !1, Nt = !1;
function Si(e) {
  Nt = e;
}
let I = null, tt = !1;
function Je(e) {
  I = e;
}
let L = null;
function ht(e) {
  L = e;
}
let vt = null;
function xs(e) {
  I !== null && (vt ?? (vt = /* @__PURE__ */ new Set())).add(e);
}
let Oe = null, Be = 0, Ue = null;
function nl(e) {
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
  if ((t & ue) !== 0)
    return !0;
  if (t & pe && (e.f &= ~Kt), (t & nt) !== 0) {
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
    ge === null && ae(e, he);
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
      ) : t === s && (n ? ae(s, ue) : (s.f & he) !== 0 && ae(s, nt), si(
        /** @type {Effect} */
        s
      ));
    }
}
function Ts(e) {
  var t = Oe, n = Be, r = Ue, i = I, s = vt, l = Ie, f = tt, u = qt, c = e.f;
  Oe = /** @type {null | Value[]} */
  null, Be = 0, Ue = null, I = (c & ($e | yt)) === 0 ? e : null, vt = null, pn(e.ctx), tt = !1, qt = ++Pt, e.ac !== null && ($n(() => {
    e.ac.abort(Kn);
  }), e.ac = null);
  try {
    e.f |= hr;
    var v = (
      /** @type {Function} */
      e.fn
    ), b = v();
    e.f |= mn;
    var d = Ai(e);
    if (Xi() && Ue !== null && !tt && d !== null && (e.f & (pe | nt | ue)) === 0)
      for (var h = 0; h < /** @type {Source[]} */
      Ue.length; h++)
        Ss(
          Ue[h],
          /** @type {Effect} */
          e
        );
    if (i !== null && i !== e) {
      if (Pt++, i.deps !== null)
        for (let _ = 0; _ < n; _ += 1)
          i.deps[_].rv = Pt;
      if (t !== null)
        for (const _ of t)
          _.rv = Pt;
      Ue !== null && (r === null ? r = Ue : r.push(.../** @type {Source[]} */
      Ue));
    }
    return (e.f & Mt) !== 0 && (e.f ^= Mt), b;
  } catch (_) {
    return Ai(e), $a(_);
  } finally {
    e.f ^= hr, Oe = t, Be = n, Ue = r, I = i, vt = s, pn(l), tt = f, qt = u;
  }
}
function Ai(e) {
  var i;
  var t = e.deps, n = E == null ? void 0 : E.is_fork;
  if (Oe !== null) {
    var r;
    if (n || zn(e, Be), t !== null && Be > 0)
      for (t.length = Be + Oe.length, r = 0; r < Oe.length; r++)
        t[Be + r] = Oe[r];
    else
      e.deps = t = Oe;
    if (ai() && (e.f & Ge) !== 0)
      for (r = Be; r < t.length; r++)
        ((i = t[r]).reactions ?? (i.reactions = [])).push(e);
  } else !n && t !== null && Be < t.length && (zn(e, Be), t.length = Be);
  return t;
}
function rl(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = sa.call(n, e);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  if (n === null && (t.f & pe) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Oe === null || !dr.call(Oe, t))) {
    var s = (
      /** @type {Derived} */
      t
    );
    (s.f & Ge) !== 0 && (s.f ^= Ge, s.f &= ~Kt), s.v !== ve && ti(s), s.ac !== null && $n(() => {
      s.ac.abort(Kn), s.ac = null, ae(s, ue);
    }), ja(s), zn(s, 0);
  }
}
function zn(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      rl(e, n[r]);
}
function gn(e) {
  var t = e.f;
  if ((t & Ve) === 0) {
    ae(e, he);
    var n = L, r = ur;
    L = e, ur = (t & ($e | yt)) === 0;
    try {
      (t & (et | Gi)) !== 0 ? el(e) : oi(e), gs(e);
      var i = Ts(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = ks;
      var s;
      Vi && Ma && (e.f & ue) !== 0 && e.deps;
    } finally {
      ur = r, L = n;
    }
  }
}
async function il() {
  await Promise.resolve(), Va();
}
function a(e) {
  var t = e.f, n = (t & pe) !== 0;
  if (I !== null && !tt) {
    var r = L !== null && (L.f & Ve) !== 0;
    if (!r && (vt === null || !vt.has(e))) {
      var i = I.deps;
      if ((I.f & hr) !== 0)
        e.rv < Pt && (e.rv = Pt, Oe === null && i !== null && i[Be] === e ? Be++ : Oe === null ? Oe = [e] : Oe.push(e));
      else {
        I.deps ?? (I.deps = []), dr.call(I.deps, e) || I.deps.push(e);
        var s = e.reactions;
        s === null ? e.reactions = [I] : dr.call(s, I) || s.push(I);
      }
    }
  }
  if (Nt && dt.has(e))
    return dt.get(e);
  if (n) {
    var l = (
      /** @type {Derived} */
      e
    );
    if (Nt) {
      var f = l.v;
      return ((l.f & he) === 0 && l.reactions !== null || Ms(l)) && (f = ri(l)), dt.set(l, f), f;
    }
    var u = (l.f & Ge) === 0 && !tt && I !== null && (ur || (I.f & Ge) !== 0), c = (l.f & mn) === 0;
    Wn(l) && (u && (l.f |= Ge), rs(l)), u && !c && (is(l), As(l));
  }
  if (ge != null && ge.has(e))
    return ge.get(e);
  if ((e.f & Mt) !== 0)
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
  var t = tt;
  try {
    return tt = !0, e();
  } finally {
    tt = t;
  }
}
const Ft = Symbol("events"), Rs = /* @__PURE__ */ new Set(), Kr = /* @__PURE__ */ new Set();
function fe(e, t, n) {
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
  var m, g;
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
    var v = I, b = L;
    Je(null), ht(null);
    try {
      for (var d, h = []; s !== null && s !== t; ) {
        try {
          var _ = (g = s[Ft]) == null ? void 0 : g[r];
          _ != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === s) && _.call(s, e);
        } catch (x) {
          d ? h.push(x) : d = x;
        }
        if (e.cancelBubble) break;
        l++, s = l < i.length ? (
          /** @type {Element} */
          i[l]
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
      e[Ft] = t, delete e.currentTarget, Je(v), ht(b);
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
function sl(e) {
  return (
    /** @type {string} */
    (Fr == null ? void 0 : Fr.createHTML(e)) ?? e
  );
}
function al(e) {
  var t = Ga("template");
  return t.innerHTML = sl(e.replaceAll("<!>", "<!---->")), t.content;
}
function gr(e, t) {
  var n = (
    /** @type {Effect} */
    L
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function R(e, t) {
  var n = (t & 1) !== 0, r = (t & 2) !== 0, i, s = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = al(s ? e : "<!>" + e), n || (i = /** @type {TemplateNode} */
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
function k(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
const ll = ["touchstart", "touchmove"];
function ol(e) {
  return ll.includes(e);
}
function fl(e) {
  let t = 0, n = Gt(0), r;
  return () => {
    ai() && (a(n), bs(() => (t === 0 && (r = Ns(() => e(() => Pn(n)))), t += 1, () => {
      Tt(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, Pn(n));
      });
    })));
  };
}
var ul = _n | yn;
function cl(e, t, n, r) {
  new dl(e, t, n, r);
}
var qe, Zr, Ke, Bt, Se, Le, Te, je, at, Vt, St, hn, Vn, Hn, gt, yr, Z, vl, hl, Yr, _l, Gr, Rn, cr, $r, Jr;
class dl {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, n, r, i) {
    M(this, Z);
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
    M(this, Se);
    /** @type {Effect | null} */
    M(this, Le, null);
    /** @type {Effect | null} */
    M(this, Te, null);
    /** @type {Effect | null} */
    M(this, je, null);
    /** @type {DocumentFragment | null} */
    M(this, at, null);
    M(this, Vt, 0);
    M(this, St, 0);
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
    M(this, yr, fl(() => (A(this, gt, Gt(o(this, Vt))), () => {
      A(this, gt, null);
    })));
    var s;
    A(this, qe, t), A(this, Ke, n), A(this, Bt, (l) => {
      var f = (
        /** @type {Effect} */
        L
      );
      f.b = this, f.f |= zr, r(l);
    }), this.parent = /** @type {Effect} */
    L.b, this.transform_error = i ?? ((s = this.parent) == null ? void 0 : s.transform_error) ?? ((l) => l), A(this, Se, li(() => {
      P(this, Z, Gr).call(this);
    }, ul));
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
    P(this, Z, $r).call(this, t, n), A(this, Vt, o(this, Vt) + t), !(!o(this, gt) || o(this, hn)) && (A(this, hn, !0), Tt(() => {
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
    E != null && E.is_fork ? (o(this, Le) && E.skip_effect(o(this, Le)), o(this, Te) && E.skip_effect(o(this, Te)), o(this, je) && E.skip_effect(o(this, je)), E.oncommit(() => {
      P(this, Z, Jr).call(this, t);
    })) : P(this, Z, Jr).call(this, t);
  }
}
qe = new WeakMap(), Zr = new WeakMap(), Ke = new WeakMap(), Bt = new WeakMap(), Se = new WeakMap(), Le = new WeakMap(), Te = new WeakMap(), je = new WeakMap(), at = new WeakMap(), Vt = new WeakMap(), St = new WeakMap(), hn = new WeakMap(), Vn = new WeakMap(), Hn = new WeakMap(), gt = new WeakMap(), yr = new WeakMap(), Z = new WeakSet(), vl = function() {
  try {
    A(this, Le, Ye(() => o(this, Bt).call(this, o(this, qe))));
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
hl = function(t) {
  const n = o(this, Ke).failed, { reset: r, invoke_onerror: i } = P(this, Z, Yr).call(this, t);
  Tt(i), n && A(this, je, Ye(() => {
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
      pa();
      return;
    }
    n = !0, r && Aa(), o(this, je) !== null && Ut(o(this, je), () => {
      A(this, je, null);
    }), P(this, Z, cr).call(this, () => {
      P(this, Z, Gr).call(this);
    });
  };
  return { reset: i, invoke_onerror: () => {
    var l, f;
    try {
      r = !0, (f = (l = o(this, Ke)).onerror) == null || f.call(l, t, i), r = !1;
    } catch (u) {
      ot(u, o(this, Se) && o(this, Se).parent);
    }
  } };
}, _l = function() {
  const t = o(this, Ke).pending;
  t && (this.is_pending = !0, A(this, Te, Ye(() => t(o(this, qe)))), Tt(() => {
    var n = A(this, at, document.createDocumentFragment()), r = mt(), i = !1;
    if (n.append(r), A(this, Le, P(this, Z, cr).call(this, () => {
      try {
        return Ye(() => o(this, Bt).call(this, r));
      } catch (s) {
        try {
          this.error(s), i = !0;
        } catch (l) {
          ot(l, o(this, Se).parent);
        }
        return null;
      }
    })), o(this, Le) === null) {
      A(this, at, null), i && P(this, Z, Rn).call(
        this,
        /** @type {Batch} */
        E
      );
      return;
    }
    o(this, St) === 0 && (o(this, qe).before(n), A(this, at, null), Ut(
      /** @type {Effect} */
      o(this, Te),
      () => {
        A(this, Te, null);
      }
    ), P(this, Z, Rn).call(
      this,
      /** @type {Batch} */
      E
    ));
  }));
}, Gr = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), A(this, St, 0), A(this, Vt, 0), A(this, Le, Ye(() => {
      o(this, Bt).call(this, o(this, qe));
    })), o(this, St) > 0) {
      var t = A(this, at, document.createDocumentFragment());
      fi(o(this, Le), t);
      const n = (
        /** @type {(anchor: Node) => void} */
        o(this, Ke).pending
      );
      A(this, Te, Ye(() => n(o(this, qe))));
    } else
      P(this, Z, Rn).call(
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
  var n = L, r = I, i = Ie;
  ht(o(this, Se)), Je(o(this, Se)), pn(o(this, Se).ctx);
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
    this.parent && P(r = this.parent, Z, $r).call(r, t, n);
    return;
  }
  A(this, St, o(this, St) + t), o(this, St) === 0 && (P(this, Z, Rn).call(this, n), o(this, Te) && Ut(o(this, Te), () => {
    A(this, Te, null);
  }), o(this, at) && (o(this, qe).before(o(this, at)), A(this, at, null)));
}, /**
 * @param {unknown} error
 */
Jr = function(t) {
  o(this, Le) && (De(o(this, Le)), A(this, Le, null)), o(this, Te) && (De(o(this, Te)), A(this, Te, null)), o(this, je) && (De(o(this, je)), A(this, je, null));
  let n = o(this, Ke).failed;
  const r = (i) => {
    const { reset: s, invoke_onerror: l } = P(this, Z, Yr).call(this, i);
    l(), n && A(this, je, P(this, Z, cr).call(this, () => {
      try {
        return Ye(() => {
          var f = (
            /** @type {Effect} */
            L
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
          o(this, Se).parent
        ), null;
      }
    }));
  };
  Tt(() => {
    var i;
    try {
      i = this.transform_error(t);
    } catch (s) {
      ot(s, o(this, Se) && o(this, Se).parent);
      return;
    }
    i !== null && typeof i == "object" && typeof /** @type {any} */
    i.then == "function" ? i.then(
      r,
      /** @param {unknown} e */
      (s) => ot(s, o(this, Se) && o(this, Se).parent)
    ) : r(i);
  });
};
function O(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== /** @type {any} */
  (e[Tn] ?? (e[Tn] = e.nodeValue)) && (e[Tn] = n, e.nodeValue = `${n}`);
}
function pl(e, t) {
  return bl(e, t);
}
const ir = /* @__PURE__ */ new Map();
function bl(e, { target: t, anchor: n, props: r = {}, events: i, context: s, intro: l = !0, transformError: f }) {
  Ka();
  var u = void 0, c = Xa(() => {
    var v = n ?? t.appendChild(mt());
    cl(
      /** @type {TemplateNode} */
      v,
      {
        pending: () => {
        }
      },
      (h) => {
        Yn({});
        var _ = (
          /** @type {ComponentContext} */
          Ie
        );
        s && (_.c = s), i && (r.$$events = i), u = e(h, r) || Qi(), Gn();
      },
      f
    );
    var b = /* @__PURE__ */ new Set(), d = (h) => {
      for (var _ = 0; _ < h.length; _++) {
        var m = h[_];
        if (!b.has(m)) {
          b.add(m);
          var g = ol(m);
          for (const D of [t, document]) {
            var x = ir.get(D);
            x === void 0 && (x = /* @__PURE__ */ new Map(), ir.set(D, x));
            var J = x.get(m);
            J === void 0 ? (D.addEventListener(m, Mi, { passive: g }), x.set(m, 1)) : x.set(m, J + 1);
          }
        }
      }
    };
    return d(xr(Rs)), Kr.add(d), () => {
      var g;
      for (var h of b)
        for (const x of [t, document]) {
          var _ = (
            /** @type {Map<string, number>} */
            ir.get(x)
          ), m = (
            /** @type {number} */
            _.get(h)
          );
          --m == 0 ? (x.removeEventListener(h, Mi), _.delete(h), _.size === 0 && ir.delete(x)) : _.set(h, m);
        }
      Kr.delete(d), v !== n && ((g = v.parentNode) == null || g.removeChild(v));
    };
  });
  return Wr.set(u, c), u;
}
let Wr = /* @__PURE__ */ new WeakMap();
function gl(e, t) {
  const n = Wr.get(e);
  return n ? (Wr.delete(e), n(t)) : Promise.resolve();
}
var Ze, lt, ze, Ht, Un, qn, wr;
class ml {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, n = !0) {
    /** @type {TemplateNode} */
    Fe(this, "anchor");
    /** @type {Map<Batch, Key>} */
    M(this, Ze, /* @__PURE__ */ new Map());
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
      if (o(this, Ze).has(t)) {
        var n = (
          /** @type {Key} */
          o(this, Ze).get(t)
        ), r = o(this, lt).get(n);
        if (r)
          br(r), o(this, Ht).delete(n);
        else {
          var i = o(this, ze).get(n);
          i && (br(i.effect), o(this, lt).set(n, i.effect), o(this, ze).delete(n), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), r = i.effect);
        }
        for (const [s, l] of o(this, Ze)) {
          if (o(this, Ze).delete(s), s === t)
            break;
          const f = o(this, ze).get(l);
          f && (De(f.effect), o(this, ze).delete(l));
        }
        for (const [s, l] of o(this, lt)) {
          if (s === n || o(this, Ht).has(s)) continue;
          const f = () => {
            if (Array.from(o(this, Ze).values()).includes(s)) {
              var c = document.createDocumentFragment();
              fi(l, c), c.append(mt()), o(this, ze).set(s, { effect: l, fragment: c });
            } else
              De(l);
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
      o(this, Ze).delete(t);
      const n = Array.from(o(this, Ze).values());
      for (const [r, i] of o(this, ze))
        n.includes(r) || (De(i.effect), o(this, ze).delete(r));
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
    if (o(this, Ze).set(r, t), i) {
      for (const [f, u] of o(this, lt))
        f === t ? r.unskip_effect(u) : r.skip_effect(u);
      for (const [f, u] of o(this, ze))
        f === t ? r.unskip_effect(u.effect) : r.skip_effect(u.effect);
      r.oncommit(o(this, qn)), r.ondiscard(o(this, wr));
    } else
      o(this, qn).call(this, r);
  }
}
Ze = new WeakMap(), lt = new WeakMap(), ze = new WeakMap(), Ht = new WeakMap(), Un = new WeakMap(), qn = new WeakMap(), wr = new WeakMap();
function j(e, t, n = !1) {
  var r = new ml(e), i = n ? _n : 0;
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
function yl(e, t, n) {
  for (var r = [], i = t.length, s, l = t.length, f = 0; f < i; f++) {
    let b = t[f];
    Ut(
      b,
      () => {
        if (s) {
          if (s.pending.delete(b), s.done.add(b), s.pending.size === 0) {
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
      ), v = (
        /** @type {Element} */
        c.parentNode
      );
      Ya(v), v.append(c), e.items.clear();
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
      De(t[i], n);
  }
}
var Ni;
function At(e, t, n, r, i, s = null) {
  var l = e, f = /* @__PURE__ */ new Map(), u = (t & 4) !== 0;
  if (u) {
    var c = (
      /** @type {Element} */
      e
    );
    l = c.appendChild(mt());
  }
  var v = null, b = /* @__PURE__ */ Fa(() => {
    var D = n();
    return (
      /** @type {V[]} */
      Hi(D) ? D : D == null ? [] : xr(D)
    );
  }), d, h = /* @__PURE__ */ new Map(), _ = !0;
  function m(D) {
    (J.effect.f & Ve) === 0 && (J.pending.delete(D), J.fallback = v, wl(J, d, l, t, r), v !== null && (d.length === 0 ? (v.f & ft) === 0 ? br(v) : (v.f ^= ft, Cn(v, null, l)) : Ut(v, () => {
      v = null;
    })));
  }
  function g(D) {
    J.pending.delete(D);
  }
  var x = li(() => {
    d = /** @type {V[]} */
    a(b);
    for (var D = d.length, te = /* @__PURE__ */ new Set(), ie = (
      /** @type {Batch} */
      E
    ), U = _s(), z = 0; z < D; z += 1) {
      var W = d[z], me = r(W, z), le = _ ? null : f.get(me);
      le ? (le.v && bn(le.v, W), le.i && bn(le.i, z), U && ie.unskip_effect(le.e)) : (le = xl(
        f,
        _ ? l : Ni ?? (Ni = mt()),
        W,
        me,
        z,
        i,
        t,
        n
      ), _ || (le.e.f |= ft), f.set(me, le)), te.add(me);
    }
    if (D === 0 && s && !v && (_ ? v = Ye(() => s(l)) : (v = Ye(() => s(Ni ?? (Ni = mt()))), v.f |= ft)), D > te.size && ma(), !_)
      if (h.set(ie, te), U) {
        for (const [Me, ce] of f)
          te.has(Me) || ie.skip_effect(ce.e);
        ie.oncommit(m), ie.ondiscard(g);
      } else
        m(ie);
    a(b);
  }), J = { effect: x, items: f, pending: h, outrogroups: null, fallback: v };
  _ = !1;
}
function Sn(e) {
  for (; e !== null && (e.f & $e) === 0; )
    e = e.next;
  return e;
}
function wl(e, t, n, r, i) {
  var le, Me, ce, Pe, S, N, K, se, ne;
  var s = (r & 8) !== 0, l = t.length, f = e.items, u = Sn(e.effect.first), c, v = null, b, d = [], h = [], _, m, g, x;
  if (s)
    for (x = 0; x < l; x += 1)
      _ = t[x], m = i(_, x), g = /** @type {EachItem} */
      f.get(m).e, (g.f & ft) === 0 && ((Me = (le = g.nodes) == null ? void 0 : le.a) == null || Me.measure(), (b ?? (b = /* @__PURE__ */ new Set())).add(g));
  for (x = 0; x < l; x += 1) {
    if (_ = t[x], m = i(_, x), g = /** @type {EachItem} */
    f.get(m).e, e.outrogroups !== null)
      for (const re of e.outrogroups)
        re.pending.delete(g), re.done.delete(g);
    if ((g.f & Ae) !== 0 && (br(g), s && ((Pe = (ce = g.nodes) == null ? void 0 : ce.a) == null || Pe.unfix(), (b ?? (b = /* @__PURE__ */ new Set())).delete(g))), (g.f & ft) !== 0)
      if (g.f ^= ft, g === u)
        Cn(g, null, n);
      else {
        var J = v ? v.next : u;
        g === e.effect.last && (e.effect.last = g.prev), g.prev && (g.prev.next = g.next), g.next && (g.next.prev = g.prev), kt(e, v, g), kt(e, g, J), Cn(g, J, n), v = g, d = [], h = [], u = Sn(v.next);
        continue;
      }
    if (g !== u) {
      if (c !== void 0 && c.has(g)) {
        if (d.length < h.length) {
          var D = h[0], te;
          v = D.prev;
          var ie = d[0], U = d[d.length - 1];
          for (te = 0; te < d.length; te += 1)
            Cn(d[te], D, n);
          for (te = 0; te < h.length; te += 1)
            c.delete(h[te]);
          kt(e, ie.prev, U.next), kt(e, v, ie), kt(e, U, D), u = D, v = U, x -= 1, d = [], h = [];
        } else
          c.delete(g), Cn(g, u, n), kt(e, g.prev, g.next), kt(e, g, v === null ? e.effect.first : v.next), kt(e, v, g), v = g;
        continue;
      }
      for (d = [], h = []; u !== null && u !== g; )
        (c ?? (c = /* @__PURE__ */ new Set())).add(u), h.push(u), u = Sn(u.next);
      if (u === null)
        continue;
    }
    (g.f & ft) === 0 && d.push(g), v = g, u = Sn(g.next);
  }
  if (e.outrogroups !== null) {
    for (const re of e.outrogroups)
      re.pending.size === 0 && (Qr(e, xr(re.done)), (S = e.outrogroups) == null || S.delete(re));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (u !== null || c !== void 0) {
    var z = [];
    if (c !== void 0)
      for (g of c)
        (g.f & Ae) === 0 && z.push(g);
    for (; u !== null; )
      (u.f & Ae) === 0 && u !== e.fallback && z.push(u), u = Sn(u.next);
    var W = z.length;
    if (W > 0) {
      var me = (r & 4) !== 0 && l === 0 ? n : null;
      if (s) {
        for (x = 0; x < W; x += 1)
          (K = (N = z[x].nodes) == null ? void 0 : N.a) == null || K.measure();
        for (x = 0; x < W; x += 1)
          (ne = (se = z[x].nodes) == null ? void 0 : se.a) == null || ne.fix();
      }
      yl(e, z, me);
    }
  }
  s && Tt(() => {
    var re, $;
    if (b !== void 0)
      for (g of b)
        ($ = (re = g.nodes) == null ? void 0 : re.a) == null || $.apply();
  });
}
function xl(e, t, n, r, i, s, l, f) {
  var u = (l & 1) !== 0 ? (l & 16) === 0 ? /* @__PURE__ */ Ua(n, !1, !1) : Gt(n) : null, c = (l & 2) !== 0 ? Gt(i) : null;
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
function kt(e, t, n) {
  t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
const Ri = [...` 	
\r\f \v\uFEFF`];
function kl(e, t, n) {
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
    var f = kl(n, r, s);
    f == null ? e.removeAttribute("class") : e.className = f, e[Vr] = n;
  } else if (s && i !== s)
    for (var u in s) {
      var c = !!s[u];
      (i == null || c !== !!i[u]) && e.classList.toggle(u, c);
    }
  return s;
}
const El = Symbol("is custom element"), Sl = Symbol("is html");
function ct(e, t, n, r) {
  var i = Tl(e);
  i[t] !== (i[t] = n) && (t === "loading" && (e[va] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Al(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function Tl(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    e[lr] ?? (e[lr] = {
      [El]: e.nodeName.includes("-"),
      [Sl]: e.namespaceURI === ia
    })
  );
}
var Ci = /* @__PURE__ */ new Map();
function Al(e) {
  var t = e.getAttribute("is") || e.nodeName, n = Ci.get(t);
  if (n) return n;
  Ci.set(t, n = /* @__PURE__ */ new Set());
  for (var r, i = e, s = Element.prototype; s !== i; ) {
    r = aa(i);
    for (var l in r)
      r[l].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      l !== "innerHTML" && l !== "textContent" && l !== "innerText" && n.add(l);
    i = qi(i);
  }
  return n;
}
function Ml(e, t, n = t) {
  var r = /* @__PURE__ */ new WeakSet();
  Oa(e, "input", async (i) => {
    var s = i ? e.defaultValue : e.value;
    if (s = Lr(e) ? jr(s) : s, n(s), E !== null && r.add(E), await il(), s !== (s = t())) {
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
const Nl = "5";
var Bi;
typeof window < "u" && ((Bi = window.__svelte ?? (window.__svelte = {})).v ?? (Bi.v = /* @__PURE__ */ new Set())).add(Nl);
let Os = "";
function Rl(e) {
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
const Ds = (e, t) => Is("GET", e, t), Cl = (e, t) => Is("POST", e, t);
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
const Ol = (e, t) => String(Sr("/stream", { site: e, video_id: t }));
async function Ps() {
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
async function Fs(e, t) {
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
const Il = (e) => Fs(e, !1);
async function Dl(e) {
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
async function Pl(e) {
  try {
    const t = await fetch(`${ui}?contextTitle=${encodeURIComponent(e)}`);
    return t.ok ? (await t.json()).bookmarks ?? [] : null;
  } catch {
    return null;
  }
}
async function Fl(e) {
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
async function Ll(e, t) {
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
var jl = /* @__PURE__ */ R('<div><span> </span> <button type="button" class="tbx-link"> </button></div>'), zl = /* @__PURE__ */ R('<div><span class="tbx-dot"></span> </div>');
function Pi(e, t) {
  Yn(t, !0);
  let n = Xr(t, "size", 3, "sm"), r = /* @__PURE__ */ H(!1);
  async function i() {
    var c;
    w(r, !0), await Il(t.purpose) && await ((c = t.onDisabled) == null ? void 0 : c.call(t)), w(r, !1);
  }
  var s = Cs(), l = ln(s);
  {
    var f = (c) => {
      var v = jl();
      let b;
      var d = T(v), h = X(d), _ = y(d, 2), m = X(_, !0);
      F(() => {
        b = Lt(v, 1, "tbx-banner tbx-banner-blocked", null, b, { "tbx-banner-lg": n() === "lg" }), O(h, `${t.base ?? ""} is routed through the VPN, and the tunnel is down.
            ${t.gerund ?? ""} is blocked rather than falling back to a direct connection.`), _.disabled = a(r), O(m, a(r) ? "Turning off…" : "Turn off routing");
      }), fe("click", _, i), k(c, v);
    }, u = (c) => {
      var v = zl();
      let b;
      var d = y(T(v));
      F(() => {
        b = Lt(v, 1, "tbx-banner", null, b, { "tbx-banner-lg": n() === "lg" }), O(d, ` ${t.gerund ?? ""} through the VPN${t.route.exitNodeName ? ` via ${t.route.exitNodeName}` : ""}.`);
      }), k(c, v);
    };
    j(l, (c) => {
      t.route.blocked ? c(f) : t.route.routed && c(u, 1);
    });
  }
  k(e, s), Gn();
}
Er(["click"]);
var Bl = /* @__PURE__ */ R('<button type="button" role="switch"><span class="tbx-toggle-track"><span class="tbx-toggle-knob"></span></span> <span> </span></button>'), Vl = /* @__PURE__ */ R('<span class="tbx-dim">offline</span>'), Hl = /* @__PURE__ */ R('<li><button type="button" role="option"> <!></button></li>'), Ul = /* @__PURE__ */ R('<ul class="tbx-picker-list" role="listbox"><li><button type="button" role="option">No exit node</button></li> <!></ul>'), ql = /* @__PURE__ */ R('<div class="tbx-picker"><button type="button" class="tbx-picker-button" aria-haspopup="listbox"> <span class="tbx-caret" aria-hidden="true"></span></button> <!></div>'), Kl = /* @__PURE__ */ R('<span class="tbx-vpn-down">tunnel down · routed traffic is blocked</span>'), Yl = /* @__PURE__ */ R('<p class="tbx-vpn-note"> </p>'), Gl = /* @__PURE__ */ R('<div class="tbx-vpn"><span class="tbx-vpn-label">VPN</span> <!> <!> <!></div> <!>', 1);
function $l(e, t) {
  Yn(t, !0);
  let n = /* @__PURE__ */ H(null), r = /* @__PURE__ */ H(null), i = /* @__PURE__ */ H(!1), s = /* @__PURE__ */ H(null);
  async function l() {
    w(n, await Ps(), !0);
  }
  Fn(() => {
    l();
  });
  async function f(d) {
    var _;
    const h = d === "scraping" ? !a(n).route_scraping : !a(n).route_streaming;
    w(r, d, !0), w(s, null), await Fs(d, h) && (await l(), await ((_ = t.onchange) == null ? void 0 : _.call(t))), w(r, null);
  }
  async function u(d) {
    var _;
    w(r, "exit"), w(i, !1);
    const h = await Dl(d);
    h && (w(n, h, !0), w(s, h.detail ?? null, !0), await ((_ = t.onchange) == null ? void 0 : _.call(t))), w(r, null);
  }
  var c = Cs(), v = ln(c);
  {
    var b = (d) => {
      var h = Gl(), _ = ln(h), m = y(T(_), 2);
      At(
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
        ([U, z, W]) => U,
        (U, z) => {
          var W = /* @__PURE__ */ Re(() => Yi(a(z), 3));
          let me = () => a(W)[0], le = () => a(W)[1], Me = () => a(W)[2];
          var ce = Bl();
          let Pe;
          var S = y(T(ce), 2), N = X(S, !0);
          F(() => {
            Pe = Lt(ce, 1, "tbx-toggle", null, Pe, { "tbx-toggle-on": Me() }), ct(ce, "aria-checked", Me()), ce.disabled = a(r) !== null, O(N, le());
          }), fe("click", ce, () => f(me())), k(U, ce);
        }
      );
      var g = y(m, 2);
      {
        var x = (U) => {
          var z = ql(), W = T(z), me = T(W), le = y(W, 2);
          {
            var Me = (ce) => {
              var Pe = Ul(), S = T(Pe), N = X(S), K = y(S, 2);
              At(K, 17, () => a(n).exit_nodes, (se) => se.id, (se, ne) => {
                var re = Hl(), $ = T(re), _t = T($), $t = y(_t);
                {
                  var Jt = (We) => {
                    var Wt = Vl();
                    k(We, Wt);
                  };
                  j($t, (We) => {
                    a(ne).online || We(Jt);
                  });
                }
                F(() => {
                  ct($, "aria-selected", a(ne).active), $.disabled = !a(ne).online, O(_t, `${a(ne).name ?? ""}${a(ne).country ? ` · ${a(ne).country}` : ""} `);
                }), fe("click", $, () => u(a(ne).id)), k(se, re);
              }), F(() => ct(N, "aria-selected", !a(n).exit_node)), fe("click", N, () => u(null)), k(ce, Pe);
            };
            j(le, (ce) => {
              a(i) && ce(Me);
            });
          }
          F(() => {
            ct(W, "aria-expanded", a(i)), W.disabled = a(r) !== null, O(me, `${a(n).exit_node_name ?? "No exit node" ?? ""} `);
          }), fe("click", W, () => w(i, !a(i))), k(U, z);
        };
        j(g, (U) => {
          var z;
          (z = a(n).exit_nodes) != null && z.length && U(x);
        });
      }
      var J = y(g, 2);
      {
        var D = (U) => {
          var z = Kl();
          k(U, z);
        };
        j(J, (U) => {
          !a(n).connected && (a(n).route_scraping || a(n).route_streaming) && U(D);
        });
      }
      var te = y(_, 2);
      {
        var ie = (U) => {
          var z = Yl(), W = X(z, !0);
          F(() => O(W, a(s))), k(U, z);
        };
        j(te, (U) => {
          a(s) && U(ie);
        });
      }
      k(d, h);
    };
    j(v, (d) => {
      var h;
      (h = a(n)) != null && h.enabled && d(b);
    });
  }
  k(e, c), Gn();
}
Er(["click"]);
var Jl = /* @__PURE__ */ R("Searching<!><!>…", 1), Wl = /* @__PURE__ */ R(" <!>", 1), Fi = /* @__PURE__ */ R('<img alt="" loading="lazy" referrerpolicy="no-referrer"/>'), Li = /* @__PURE__ */ R('<span class="tbx-duration"> </span>'), Ql = /* @__PURE__ */ R('<span class="tbx-muted">Fetching quality…</span>'), ar = /* @__PURE__ */ R('<span class="tbx-badge"> </span>'), Xl = /* @__PURE__ */ R("<!> <!>", 1), Zl = /* @__PURE__ */ R('<div class="tbx-card tbx-card-saved"><button type="button"><span class="tbx-thumb"><!> <!></span> <span class="tbx-meta"><span class="tbx-title"> </span> <span class="tbx-badges"><!></span></span></button> <button type="button" class="tbx-mark tbx-mark-on">★</button></div>'), eo = /* @__PURE__ */ R('<div class="tbx-section"><div class="tbx-section-head tbx-saved"> </div> <div class="tbx-grid"></div></div>'), to = /* @__PURE__ */ R(`<div class="tbx-confirm" role="alertdialog" aria-label="Remove this bookmark?"><span>Remove this bookmark? It stays reachable from the site's own search
                results if you look for it again.</span> <span class="tbx-confirm-actions"><button type="button" class="tbx-btn">Cancel</button> <button type="button" class="tbx-btn tbx-btn-danger">Remove</button></span></div>`), no = /* @__PURE__ */ R('<p class="tbx-muted tbx-pad">Searching<!> </p>'), ro = /* @__PURE__ */ R('<div class="tbx-pad"><p class="tbx-error"> </p> <button type="button" class="tbx-btn">Try again</button></div>'), io = /* @__PURE__ */ R('<div class="tbx-pad"><p class="tbx-muted"> </p> <button type="button" class="tbx-btn">Search again</button></div>'), so = /* @__PURE__ */ R('<span class="tbx-best">Best match</span>'), ao = /* @__PURE__ */ R('<span class="tbx-badge">HD</span>'), lo = /* @__PURE__ */ R('<div class="tbx-card"><button type="button"><span class="tbx-thumb"><!> <!> <!></span> <span class="tbx-meta"><span class="tbx-title"> </span> <span class="tbx-badges"><!> <!></span></span></button> <button type="button" class="tbx-mark">☆</button></div>'), oo = /* @__PURE__ */ R('<div class="tbx-section"><div class="tbx-section-head"> <span class="tbx-muted"> </span></div> <div class="tbx-grid"></div></div>'), fo = /* @__PURE__ */ R('<div class="tbx-rows"></div>'), uo = /* @__PURE__ */ R('<p class="tbx-muted tbx-still"><!></p>'), co = /* @__PURE__ */ R('<p><span class="tbx-error"> </span> </p>'), vo = /* @__PURE__ */ R('<div class="tbx-errors"></div>'), ho = /* @__PURE__ */ R('<div class="tbx-panel"><!> <!> <!> <!></div>'), _o = /* @__PURE__ */ R('<div class="tbx"><div class="tbx-head"><button type="button"><span class="tbx-globe" aria-hidden="true"></span> <span class="tbx-trigger-text"><span class="tbx-trigger-title">Watch from a site</span> <span class="tbx-trigger-sub"><!></span></span> <span aria-hidden="true"></span></button> <div class="tbx-custom"><input type="search" placeholder="Custom search term" aria-label="Custom search term for streaming sites"/> <button type="button" class="tbx-btn">Search</button></div></div> <!> <!> <!> <!> <!></div>');
function po(e, t) {
  Yn(t, !0);
  let n = Xr(t, "title", 3, ""), r = Xr(t, "itemId", 3, null), i = /* @__PURE__ */ H(!1), s = /* @__PURE__ */ H(!1), l = /* @__PURE__ */ H(!1), f = /* @__PURE__ */ H(""), u = /* @__PURE__ */ H(ut([])), c = /* @__PURE__ */ H(ut({})), v = /* @__PURE__ */ H(null), b = /* @__PURE__ */ H(0), d = /* @__PURE__ */ H(0), h = /* @__PURE__ */ H(!1), _ = null, m = /* @__PURE__ */ H(null);
  async function g() {
    w(m, await Ps(), !0);
  }
  const x = /* @__PURE__ */ Re(() => Ii(a(m), "scraping")), J = /* @__PURE__ */ Re(() => Ii(a(m), "streaming"));
  let D = /* @__PURE__ */ H(ut([])), te = /* @__PURE__ */ H(null), ie = /* @__PURE__ */ H(ut(/* @__PURE__ */ new Set()));
  const U = (p, C) => `${p}:${C}`, z = /* @__PURE__ */ Re(() => new Set(a(D).map((p) => U(p.site, p.videoId))));
  async function W() {
    const p = await Pl(n());
    p && w(D, p, !0);
  }
  Fn(() => {
    g(), W(), Ds("/prefetch", r() ? { item_id: r() } : { query: n() });
  }), Fn(() => {
    if (!a(D).some((C) => C.metadataStatus === "pending")) return;
    const p = setInterval(W, 4e3);
    return () => clearInterval(p);
  });
  async function me(p, C) {
    w(ie, new Set(a(ie)).add(p), !0);
    try {
      await C() && await W();
    } finally {
      const B = new Set(a(ie));
      B.delete(p), w(ie, B, !0);
    }
  }
  const le = (p) => me(U(p.site, p.video_id), () => Fl({
    site: p.site,
    videoId: p.video_id,
    contextTitle: n(),
    title: p.title,
    pageUrl: p.page_url,
    thumbnail: p.thumbnail,
    duration: p.duration,
    resolution: p.resolution,
    size: p.size
  }));
  async function Me() {
    const p = a(te);
    if (!p) return;
    w(te, null);
    const [C, B] = p.split(/:(.+)/);
    await me(p, () => Ll(C, B));
  }
  const ce = {
    tnaflix: 0,
    eporner: 0,
    hqporner: 1,
    paradisehill: 1,
    tubepornclassic: 1
  }, Pe = (p) => ce[p] ?? 2, S = /* @__PURE__ */ Re(() => {
    const p = /* @__PURE__ */ new Map();
    for (const C of a(u)) {
      if (a(z).has(U(C.site, C.video_id))) continue;
      const B = p.get(C.site) ?? { name: C.site_name, items: [] };
      B.items.push(C), p.set(C.site, B);
    }
    return [...p.entries()].map(([C, B]) => ({ site: C, ...B })).sort((C, B) => {
      var _e, q;
      const xe = (((_e = B.items[0]) == null ? void 0 : _e.relevance) ?? 0) - (((q = C.items[0]) == null ? void 0 : q.relevance) ?? 0), G = Pe(C.site) - Pe(B.site);
      return a(h) ? xe || G : G || xe;
    });
  });
  function N() {
    _ == null || _.close(), w(s, !0), w(v, null), w(u, [], !0), w(c, {}, !0), w(b, 0), w(d, 0), w(h, !1);
    const p = a(f).trim(), C = p ? { query: p } : r() ? { item_id: r() } : { query: n() }, B = new EventSource(Sr("/search_stream", C));
    _ = B, B.onmessage = (xe) => {
      var _e;
      let G;
      try {
        G = JSON.parse(xe.data);
      } catch {
        return;
      }
      if (G.total_sites && w(b, G.total_sites, !0), G.ranked && w(h, !0), G.event === "site") {
        w(d, G.sites_completed ?? a(d) + 1, !0), w(l, !0), (_e = G.results) != null && _e.length && w(u, [...a(u), ...G.results], !0), G.error && G.site && (a(c)[G.site] = G.error);
        return;
      }
      G.event === "error" && w(v, G.error ?? "Search failed", !0), w(l, !0), w(s, !1), B.close(), _ = null;
    }, B.onerror = () => {
      B.close(), _ = null, a(l) || w(v, "Search failed"), w(s, !1);
    };
  }
  Fn(() => () => _ == null ? void 0 : _.close());
  const K = /* @__PURE__ */ Re(() => a(f).trim() || n());
  function se() {
    a(x).blocked || (w(i, !0), a(s) || N());
  }
  function ne() {
    !a(i) && a(x).blocked || (w(i, !a(i)), a(i) && !a(l) && !a(s) && N());
  }
  function re(p) {
    a(J).blocked || t.host.play({
      src: Ol(p.site, p.videoId),
      title: p.title,
      // The real type is not known until the backend resolves the
      // source, and the proxy reports it on the response. MP4 is the
      // right opening guess; the player falls back if the element
      // rejects it.
      mimeType: "video/mp4",
      poster: p.thumbnail ?? void 0,
      site: p.site,
      videoId: p.videoId,
      contextTitle: n(),
      duration: p.duration,
      resolution: p.resolution,
      size: p.size
    });
  }
  const $ = (p) => re({
    site: p.site,
    videoId: p.video_id,
    title: p.title,
    thumbnail: p.thumbnail,
    duration: p.duration,
    resolution: p.resolution,
    size: p.size
  }), _t = (p) => re(p);
  var $t = _o(), Jt = T($t), We = T(Jt);
  let Wt;
  var Ct = y(T(We), 2), Qt = y(T(Ct), 2), wn = T(Qt);
  {
    var Tr = (p) => {
      var C = Jl(), B = y(ln(C));
      {
        var xe = (q) => {
          var ke = It();
          F(() => O(ke, ` — ${a(d) ?? ""}/${a(b) ?? ""} sites`)), k(q, ke);
        };
        j(B, (q) => {
          a(b) && q(xe);
        });
      }
      var G = y(B);
      {
        var _e = (q) => {
          var ke = It();
          F(() => O(ke, `,
                            ${a(u).length ?? ""} so far`)), k(q, ke);
        };
        j(G, (q) => {
          a(u).length && q(_e);
        });
      }
      k(p, C);
    }, Ls = (p) => {
      var C = Wl(), B = ln(C), xe = y(B);
      {
        var G = (_e) => {
          var q = It();
          F((ke) => O(q, `· ${ke ?? ""}`), [
            () => a(S).map((ke) => `${ke.name} ${ke.items.length}`).join(", ")
          ]), k(_e, q);
        };
        j(xe, (_e) => {
          a(S).length && _e(G);
        });
      }
      F(() => O(B, `${a(u).length ?? ""} found`)), k(p, C);
    }, js = (p) => {
      var C = It("Search streaming sites and play without downloading");
      k(p, C);
    };
    j(wn, (p) => {
      a(s) ? p(Tr) : a(l) ? p(Ls, 1) : p(js, -1);
    });
  }
  var zs = y(Ct, 2);
  let ci;
  var Bs = y(We, 2), Qn = T(Bs), di = y(Qn, 2), vi = y(Jt, 2);
  {
    var Vs = (p) => {
      var C = eo(), B = T(C), xe = X(B), G = y(B, 2);
      At(G, 21, () => a(D), (_e) => U(_e.site, _e.videoId), (_e, q) => {
        const ke = /* @__PURE__ */ Re(() => U(a(q).site, a(q).videoId));
        var Xn = Zl(), wt = T(Xn);
        let Zn;
        var er = T(wt), tr = T(er);
        {
          var Ar = (V) => {
            var He = Fi();
            F(() => ct(He, "src", a(q).thumbnail)), k(V, He);
          };
          j(tr, (V) => {
            a(q).thumbnail && V(Ar);
          });
        }
        var Q = y(tr, 2);
        {
          var de = (V) => {
            var He = Li(), en = X(He, !0);
            F((tn) => O(en, tn), [() => sr(a(q).duration)]), k(V, He);
          }, oe = /* @__PURE__ */ Re(() => sr(a(q).duration));
          j(Q, (V) => {
            a(oe) && V(de);
          });
        }
        var ye = y(er, 2), we = T(ye), be = X(we, !0), Ne = y(we, 2), Xt = T(Ne);
        {
          var Zt = (V) => {
            var He = Ql();
            k(V, He);
          }, xn = (V) => {
            var He = Xl(), en = ln(He);
            {
              var tn = (it) => {
                var xt = ar(), kn = X(xt, !0);
                F(() => O(kn, a(q).resolution)), k(it, xt);
              };
              j(en, (it) => {
                a(q).resolution && it(tn);
              });
            }
            var Ot = y(en, 2);
            {
              var nr = (it) => {
                var xt = ar(), kn = X(xt, !0);
                F((rr) => O(kn, rr), [() => Di(a(q).size)]), k(it, xt);
              };
              j(Ot, (it) => {
                a(q).size && it(nr);
              });
            }
            k(V, He);
          };
          j(Xt, (V) => {
            a(q).metadataStatus === "pending" ? V(Zt) : V(xn, -1);
          });
        }
        var rt = y(wt, 2);
        F(
          (V) => {
            Zn = Lt(wt, 1, "tbx-card-body", null, Zn, { "tbx-disabled": a(J).blocked }), wt.disabled = a(J).blocked, O(be, a(q).title), rt.disabled = V, ct(rt, "aria-label", `Remove ${a(q).title} from bookmarks`);
          },
          [() => a(ie).has(a(ke))]
        ), fe("click", wt, () => _t(a(q))), fe("click", rt, () => w(te, a(ke), !0)), k(_e, Xn);
      }), F(() => O(xe, `Bookmarked (${a(D).length ?? ""})`)), k(p, C);
    };
    j(vi, (p) => {
      a(D).length && p(Vs);
    });
  }
  var hi = y(vi, 2);
  {
    var Hs = (p) => {
      var C = to(), B = y(T(C), 2), xe = T(B), G = y(xe, 2);
      fe("click", xe, () => w(te, null)), fe("click", G, Me), k(p, C);
    };
    j(hi, (p) => {
      a(te) && p(Hs);
    });
  }
  var _i = y(hi, 2);
  $l(_i, { onchange: g });
  var pi = y(_i, 2);
  Pi(pi, {
    purpose: "scraping",
    get route() {
      return a(x);
    },
    gerund: "Searching",
    base: "Search",
    size: "sm",
    onDisabled: g
  });
  var Us = y(pi, 2);
  {
    var qs = (p) => {
      var C = ho(), B = T(C);
      {
        var xe = (Q) => {
          Pi(Q, {
            purpose: "streaming",
            get route() {
              return a(J);
            },
            gerund: "Streaming",
            base: "Stream",
            size: "lg",
            onDisabled: g
          });
        };
        j(B, (Q) => {
          a(l) && !a(s) && Q(xe);
        });
      }
      var G = y(B, 2);
      {
        var _e = (Q) => {
          var de = no(), oe = y(T(de));
          {
            var ye = (be) => {
              var Ne = It();
              F(() => O(Ne, `${a(b) ?? ""} sites`)), k(be, Ne);
            };
            j(oe, (be) => {
              a(b) && be(ye);
            });
          }
          var we = y(oe);
          F(() => O(we, ` for “${a(K) ?? ""}”…`)), k(Q, de);
        }, q = (Q) => {
          var de = ro(), oe = T(de), ye = X(oe, !0), we = y(oe, 2);
          F(() => O(ye, a(v))), fe("click", we, N), k(Q, de);
        }, ke = (Q) => {
          var de = io(), oe = T(de), ye = X(oe), we = y(oe, 2);
          F(() => O(ye, `No site had anything for “${a(K) ?? ""}”.`)), fe("click", we, N), k(Q, de);
        }, Xn = (Q) => {
          var de = fo();
          At(de, 21, () => a(S), (oe) => oe.site, (oe, ye) => {
            var we = oo(), be = T(we), Ne = T(be), Xt = y(Ne), Zt = X(Xt), xn = y(be, 2);
            At(xn, 23, () => a(ye).items, (rt) => `${rt.site}:${rt.video_id}`, (rt, V, He) => {
              const en = /* @__PURE__ */ Re(() => U(a(V).site, a(V).video_id));
              var tn = lo(), Ot = T(tn);
              let nr;
              var it = T(Ot), xt = T(it);
              {
                var kn = (ee) => {
                  var Ee = Fi();
                  F(() => ct(Ee, "src", a(V).thumbnail)), k(ee, Ee);
                };
                j(xt, (ee) => {
                  a(V).thumbnail && ee(kn);
                });
              }
              var rr = y(xt, 2);
              {
                var Ks = (ee) => {
                  var Ee = Li(), En = X(Ee, !0);
                  F((Nr) => O(En, Nr), [() => sr(a(V).duration)]), k(ee, Ee);
                }, Ys = /* @__PURE__ */ Re(() => sr(a(V).duration));
                j(rr, (ee) => {
                  a(Ys) && ee(Ks);
                });
              }
              var Gs = y(rr, 2);
              {
                var $s = (ee) => {
                  var Ee = so();
                  k(ee, Ee);
                };
                j(Gs, (ee) => {
                  a(He) === 0 && ee($s);
                });
              }
              var Js = y(it, 2), bi = T(Js), Ws = X(bi, !0), Qs = y(bi, 2), gi = T(Qs);
              {
                var Xs = (ee) => {
                  var Ee = ar(), En = X(Ee, !0);
                  F(() => O(En, a(V).resolution)), k(ee, Ee);
                }, Zs = (ee) => {
                  var Ee = ao();
                  k(ee, Ee);
                };
                j(gi, (ee) => {
                  a(V).resolution ? ee(Xs) : a(V).hd && ee(Zs, 1);
                });
              }
              var ea = y(gi, 2);
              {
                var ta = (ee) => {
                  var Ee = ar(), En = X(Ee, !0);
                  F((Nr) => O(En, Nr), [() => Di(a(V).size)]), k(ee, Ee);
                };
                j(ea, (ee) => {
                  a(V).size && ee(ta);
                });
              }
              var Mr = y(Ot, 2);
              F(
                (ee) => {
                  nr = Lt(Ot, 1, "tbx-card-body", null, nr, { "tbx-disabled": a(J).blocked }), Ot.disabled = a(J).blocked, O(Ws, a(V).title), Mr.disabled = ee, ct(Mr, "aria-label", `Bookmark ${a(V).title}`);
                },
                [() => a(ie).has(a(en))]
              ), fe("click", Ot, () => $(a(V))), fe("click", Mr, () => le(a(V))), k(rt, tn);
            }), F(() => {
              O(Ne, `${a(ye).name ?? ""} `), O(Zt, `top ${a(ye).items.length ?? ""}`);
            }), k(oe, we);
          }), k(Q, de);
        };
        j(G, (Q) => {
          a(s) && !a(u).length ? Q(_e) : a(v) ? Q(q, 1) : a(l) && !a(s) && !a(u).length ? Q(ke, 2) : a(S).length && Q(Xn, 3);
        });
      }
      var wt = y(G, 2);
      {
        var Zn = (Q) => {
          var de = uo(), oe = T(de);
          {
            var ye = (be) => {
              var Ne = It();
              F(() => O(Ne, `${a(b) - a(d)} of ${a(b) ?? ""} sites still searching…`)), k(be, Ne);
            }, we = (be) => {
              var Ne = It("Still searching…");
              k(be, Ne);
            };
            j(oe, (be) => {
              a(b) ? be(ye) : be(we, -1);
            });
          }
          k(Q, de);
        };
        j(wt, (Q) => {
          a(s) && a(u).length && Q(Zn);
        });
      }
      var er = y(wt, 2);
      {
        var tr = (Q) => {
          var de = vo();
          At(de, 21, () => Object.entries(a(c)), ([oe, ye]) => oe, (oe, ye) => {
            var we = /* @__PURE__ */ Re(() => Yi(a(ye), 2));
            let be = () => a(we)[0], Ne = () => a(we)[1];
            var Xt = co(), Zt = T(Xt), xn = X(Zt, !0), rt = y(Zt);
            F(() => {
              O(xn, be()), O(rt, `: ${Ne() ?? ""}`);
            }), k(oe, Xt);
          }), k(Q, de);
        }, Ar = /* @__PURE__ */ Re(() => Object.keys(a(c)).length);
        j(er, (Q) => {
          a(Ar) && Q(tr);
        });
      }
      k(p, C);
    };
    j(Us, (p) => {
      a(i) && p(qs);
    });
  }
  F(
    (p) => {
      Wt = Lt(We, 1, "tbx-trigger", null, Wt, { "tbx-disabled": a(x).blocked }), We.disabled = a(x).blocked, ci = Lt(zs, 1, "tbx-chevron", null, ci, { "tbx-open": a(i) }), Qn.disabled = a(x).blocked, di.disabled = p;
    },
    [
      () => a(s) || !a(f).trim() || a(x).blocked
    ]
  ), fe("click", We, ne), fe("keydown", Qn, (p) => p.key === "Enter" && !a(x).blocked && se()), Ml(Qn, () => a(f), (p) => w(f, p)), fe("click", di, se), k(e, $t), Gn();
}
Er(["click", "keydown"]);
var bo = /* @__PURE__ */ R('<p class="tbx-error"> </p>'), go = /* @__PURE__ */ R('<p><span class="tbx-error"> </span> </p>'), mo = /* @__PURE__ */ R('<div class="tbx-broken"></div>'), yo = /* @__PURE__ */ R('<li><span class="tbx-rank"> </span> <span class="tbx-list-main"><span class="tbx-list-name"> </span> <span class="tbx-muted"> </span></span> <span class="tbx-list-actions"><button type="button" class="tbx-icon">↑</button> <button type="button" class="tbx-icon">↓</button> <button type="button" class="tbx-btn tbx-btn-small"> </button></span></li>'), wo = /* @__PURE__ */ R('<p class="tbx-muted">No scrapers loaded.</p>'), xo = /* @__PURE__ */ R(`<div class="tbx tbx-settings"><div class="tbx-box"><div class="tbx-box-head"><div><p class="tbx-box-title">Site scrapers</p> <p class="tbx-muted">Loaded from <code> </code>. This is the add-on's own
                    bundled folder unless you have pointed it elsewhere, so updating the add-on
                    refreshes every scraper in it.</p></div> <button type="button" class="tbx-btn"> </button></div> <!> <!> <ul class="tbx-list"></ul> <!></div></div>`);
function ko(e, t) {
  Yn(t, !0);
  let n = /* @__PURE__ */ H(null), r = /* @__PURE__ */ H(null), i = /* @__PURE__ */ H(!1), s = /* @__PURE__ */ H(!1), l = /* @__PURE__ */ H(null);
  function f(S, N) {
    S ? (w(n, S, !0), w(l, null)) : w(l, N, !0);
  }
  const u = async () => f(await Ds("/plugins"), "Could not read the scraper registry");
  async function c() {
    w(i, !0), f(await Cl("/plugins/rescan"), "Rescan failed"), w(i, !1);
  }
  async function v(S, N) {
    w(r, S, !0), f(await Oi(`/plugins/${encodeURIComponent(S)}/enabled`, { enabled: N }), `Could not switch ${S} ${N ? "on" : "off"}`), w(r, null);
  }
  Fn(() => {
    u();
    const S = setInterval(u, 5e3);
    return () => clearInterval(S);
  });
  const b = /* @__PURE__ */ Re(() => {
    var ne, re;
    const S = (((ne = a(n)) == null ? void 0 : ne.scrapers) ?? []).filter(($) => !$.error), N = new Map(S.map(($) => [$.key, $])), K = (((re = a(n)) == null ? void 0 : re.site_order) ?? []).map(($) => N.get($)).filter(($) => $ !== void 0), se = new Set(K.map(($) => $.key));
    return [...K, ...S.filter(($) => !se.has($.key))];
  });
  async function d(S, N) {
    const K = a(b).map((ne) => ne.key), se = S + N;
    se < 0 || se >= K.length || ([K[S], K[se]] = [K[se], K[S]], w(s, !0), f(await Oi("/plugins/order", { order: K }), "Could not save the scraper order"), w(s, !1));
  }
  const h = /* @__PURE__ */ Re(() => {
    var S;
    return (((S = a(n)) == null ? void 0 : S.scrapers) ?? []).filter((N) => N.error);
  });
  var _ = xo(), m = T(_), g = T(m), x = T(g), J = y(T(x), 2), D = y(T(J)), te = X(D, !0), ie = y(x, 2), U = X(ie, !0), z = y(g, 2);
  {
    var W = (S) => {
      var N = bo(), K = X(N, !0);
      F(() => O(K, a(l))), k(S, N);
    };
    j(z, (S) => {
      a(l) && S(W);
    });
  }
  var me = y(z, 2);
  {
    var le = (S) => {
      var N = mo();
      At(N, 21, () => a(h), (K) => K.key, (K, se) => {
        var ne = go(), re = T(ne), $ = X(re, !0), _t = y(re);
        F(() => {
          O($, a(se).key), O(_t, `: ${a(se).error ?? ""}`);
        }), k(K, ne);
      }), k(S, N);
    };
    j(me, (S) => {
      a(h).length && S(le);
    });
  }
  var Me = y(me, 2);
  At(Me, 23, () => a(b), (S) => S.key, (S, N, K) => {
    var se = yo(), ne = T(se), re = X(ne, !0), $ = y(ne, 2), _t = T($), $t = X(_t, !0), Jt = y(_t, 2), We = X(Jt, !0), Wt = y($, 2), Ct = T(Wt), Qt = y(Ct, 2), wn = y(Qt, 2), Tr = X(wn, !0);
    F(() => {
      O(re, a(K) + 1), O($t, a(N).name), O(We, a(N).base_url), ct(Ct, "aria-label", `Move ${a(N).name} up`), Ct.disabled = a(s) || a(K) === 0, ct(Qt, "aria-label", `Move ${a(N).name} down`), Qt.disabled = a(s) || a(K) === a(b).length - 1, wn.disabled = a(r) === a(N).key, O(Tr, a(N).enabled ? "On" : "Off");
    }), fe("click", Ct, () => d(a(K), -1)), fe("click", Qt, () => d(a(K), 1)), fe("click", wn, () => v(a(N).key, !a(N).enabled)), k(S, se);
  });
  var ce = y(Me, 2);
  {
    var Pe = (S) => {
      var N = wo();
      k(S, N);
    };
    j(ce, (S) => {
      a(n) && !a(b).length && !a(h).length && S(Pe);
    });
  }
  F(() => {
    var S;
    O(te, ((S = a(n)) == null ? void 0 : S.plugin_dir) ?? "…"), ie.disabled = a(i), O(U, a(i) ? "Rescanning…" : "Rescan folder");
  }), fe("click", ie, c), k(e, _), Gn();
}
Er(["click"]);
function ji(e, t = () => ({})) {
  return ({ target: n, api: r, props: i, navigate: s, host: l }) => {
    Rl(r);
    const f = ut({ ...i, navigate: s, host: l, ...t() }), u = pl(e, { target: n, props: f });
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
        gl(u);
      }
    };
  };
}
const To = { details: ji(po), settings: ji(ko) };
export {
  To as slots
};
