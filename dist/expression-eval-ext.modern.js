export {
	addBinaryOp, addUnaryOp, compile, compileAsync, eval as evaluate, evalAsync as evaluateAsync, parse
} from "expression-eval";

class e {
	constructor(e) {
		this.ast = e
	}

	get ast() {
		return this._ast
	}

	set ast(e) {
		this._ast = e, this.reCompute()
	}

	reCompute() {
		this.astSplitArray = this.toArray(this.ast), this.expression = this.toExpression(this.astSplitArray, !0)
	}

	toArray(e) {
		const t = [];
		let r = e;
		for (; r;) switch (r.type) {
			case"MemberExpression":
				t.push({operator: ".", left: "", right: r.property.name, type: r.type}), r = r.object;
				break;
			case"CallExpression":
				t.push({
					operator: ".",
					left: "",
					right: `${r.callee.property.name}(${r.arguments.map(e => "string" == typeof e.value ? `'${e.value}'` : e.value).join(",")})`,
					type: r.type
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
					right: "string" == typeof r.value ? `'${r.value}'` : r.value,
					type: r.type
				}), r = r.object;
				break;
			default:
				r = null
		}
		return t.reverse()
	}

	toExpression(e, t) {
		let r = "";
		for (const s of e) if ("BinaryExpression" === s.type) {
			const e = this.toExpression(s.left), a = this.toExpression(s.right);
			r = `${e}${s.operator}${a}`, t || (r = `(${r})`)
		} else r = `${r}${s.left}${s.operator}${s.right}`;
		return r
	}
}

export {e as ASTHelper};
//# sourceMappingURL=expression-eval-ext.modern.js.map
