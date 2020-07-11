export {
	addBinaryOp, addUnaryOp, compile, compileAsync, eval as evaluate, evalAsync as evaluateAsync, parse
} from "expression-eval";

function e(e, t) {
	(null == t || t > e.length) && (t = e.length);
	for (var r = 0, o = new Array(t); r < t; r++) o[r] = e[r];
	return o
}

var t = function () {
	function t(e) {
		this.ast = e
	}

	var r, o = t.prototype;
	return o.reCompute = function () {
		this.astSplitArray = this.toArray(this.ast), this.expression = this.toExpression(this.astSplitArray, !0)
	}, o.toArray = function (e) {
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
	}, o.toExpression = function (t, r) {
		for (var o, a = "", n = function (t, r) {
			var o;
			if ("undefined" == typeof Symbol || null == t[Symbol.iterator]) {
				if (Array.isArray(t) || (o = function (t, r) {
					if (t) {
						if ("string" == typeof t) return e(t, void 0);
						var o = Object.prototype.toString.call(t).slice(8, -1);
						return "Object" === o && t.constructor && (o = t.constructor.name), "Map" === o || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? e(t, void 0) : void 0
					}
				}(t))) {
					o && (t = o);
					var a = 0;
					return function () {
						return a >= t.length ? {done: !0} : {done: !1, value: t[a++]}
					}
				}
				throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}
			return (o = t[Symbol.iterator]()).next.bind(o)
		}(t); !(o = n()).done;) {
			var i = o.value;
			if ("BinaryExpression" === i.type) {
				var s = this.toExpression(i.left), p = this.toExpression(i.right);
				a = "" + s + i.operator + p, r || (a = "(" + a + ")")
			} else a = "" + a + i.left + i.operator + i.right
		}
		return a
	}, (r = [{
		key: "ast", get: function () {
			return this._ast
		}, set: function (e) {
			this._ast = e, this.reCompute()
		}
	}]) && function (e, t) {
		for (var r = 0; r < t.length; r++) {
			var o = t[r];
			o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
		}
	}(t.prototype, r), t
}();
export {t as ASTHelper};
//# sourceMappingURL=expression-eval-ext.module.js.map