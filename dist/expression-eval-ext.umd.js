!function (e, t) {
	"object" == typeof exports && "undefined" != typeof module ? t(exports, require("expression-eval")) : "function" == typeof define && define.amd ? define(["exports", "expression-eval"], t) : t((e = e || self).expressionEvalExt = {}, e.expressionEval)
}(this, function (e, t) {
	function r(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
		return n
	}

	var n = function () {
		function e(e) {
			this.ast = e
		}

		var t, n = e.prototype;
		return n.reCompute = function () {
			this.astSplitArray = this.toArray(this.ast), this.expression = this.toExpression(this.astSplitArray, !0)
		}, n.toArray = function (e) {
			for (var t = [], r = e; r;) switch (r.type) {
				case"MemberExpression":
					t.push({operator: ".", left: "", right: r.property.name, type: r.type}), r = r.object;
					break;
				case"CallExpression":
					t.push({
						operator: ".", left: "", right: r.callee.property.name + "(" + r.arguments.map(function (e) {
							return "string" == typeof e.value ? "'" + e.value + "'" : e.value
						}).join(",") + ")", type: r.type
					}), r = r.callee.object;
					break;
				case"Identifier":
					t.push({operator: "", left: "", right: r.name, type: r.type}), r = r.object;
					break;
				case"BinaryExpression":
					t.push({
						operator: r.operator,
						left: this.toArray(r.left),
						right: this.toArray(r.right),
						type: r.type
					}), r = r.object;
					break;
				case"Literal":
					t.push({
						operator: "",
						left: "",
						right: "string" == typeof r.value ? "'" + r.value + "'" : r.value,
						type: r.type
					}), r = r.object;
					break;
				default:
					r = null
			}
			return t.reverse()
		}, n.toExpression = function (e, t) {
			for (var n, o = "", a = function (e, t) {
				var n;
				if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
					if (Array.isArray(e) || (n = function (e, t) {
						if (e) {
							if ("string" == typeof e) return r(e, void 0);
							var n = Object.prototype.toString.call(e).slice(8, -1);
							return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? r(e, void 0) : void 0
						}
					}(e))) {
						n && (e = n);
						var o = 0;
						return function () {
							return o >= e.length ? {done: !0} : {done: !1, value: e[o++]}
						}
					}
					throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
				}
				return (n = e[Symbol.iterator]()).next.bind(n)
			}(e); !(n = a()).done;) {
				var i = n.value;
				if ("BinaryExpression" === i.type) {
					var p = this.toExpression(i.left), s = this.toExpression(i.right);
					o = "" + p + i.operator + s, t || (o = "(" + o + ")")
				} else o = "" + o + i.left + i.operator + i.right
			}
			return o
		}, (t = [{
			key: "ast", get: function () {
				return this._ast
			}, set: function (e) {
				this._ast = e, this.reCompute()
			}
		}]) && function (e, t) {
			for (var r = 0; r < t.length; r++) {
				var n = t[r];
				n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
			}
		}(e.prototype, t), e
	}();
	Object.defineProperty(e, "addBinaryOp", {
		enumerable: !0, get: function () {
			return t.addBinaryOp
		}
	}), Object.defineProperty(e, "addUnaryOp", {
		enumerable: !0, get: function () {
			return t.addUnaryOp
		}
	}), Object.defineProperty(e, "compile", {
		enumerable: !0, get: function () {
			return t.compile
		}
	}), Object.defineProperty(e, "compileAsync", {
		enumerable: !0, get: function () {
			return t.compileAsync
		}
	}), Object.defineProperty(e, "evaluate", {
		enumerable: !0, get: function () {
			return t.eval
		}
	}), Object.defineProperty(e, "evaluateAsync", {
		enumerable: !0, get: function () {
			return t.evalAsync
		}
	}), Object.defineProperty(e, "parse", {
		enumerable: !0, get: function () {
			return t.parse
		}
	}), e.ASTHelper = n
});
//# sourceMappingURL=expression-eval-ext.umd.js.map
