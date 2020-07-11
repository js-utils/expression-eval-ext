class ASTHelper {
	constructor (ast) {
		this.ast = ast
	}
	get ast () { return this._ast }
	set ast (val) {
		this._ast = val
		this.reCompute()
	}

	reCompute () {
		this.astSplitArray = this.toArray(this.ast)
		this.expressionSplitArray = []
		this.expression = this.toExpression(this.astSplitArray, true)
	}
	toArray (ast) {
		const tags = []
		let layer = ast
		// console.log('layer', layer)
		while(layer) {
			switch(layer.type) {
				case 'MemberExpression':
					tags.push({operator: '.', left: '', right: layer.property.name, type: layer.type })
					layer = layer.object
					break
				case 'CallExpression':
					// tags.push(this.ViewModel.find(layer.arguments[0].value).name)
					tags.push({ operator: '.', left: '', right: `${ layer.callee.property.name }(${layer.arguments.map(arg => {
							if (typeof arg.value === 'string') {
								return `'${arg.value}'`
							}
							return arg.value
						}).join(',')})`, type: layer.type })
					layer = layer.callee.object
					break
				case 'Identifier':
					tags.push({ operator: '', left: '', right: layer.name, type: layer.type })
					layer = layer.object
					break
				case 'BinaryExpression':
					tags.push({ operator: layer.operator, left: this.toArray(layer.left), right: this.toArray(layer.right), type: layer.type })
					layer = layer.object
					break
				case 'Literal':
					tags.push({
						operator: '',
						left: '',
						right: typeof layer.value === 'string' ? `'${ layer.value }'` : layer.value,
						type: layer.type
					})
					layer = layer.object
					break
				default:
					layer = null
			}
		}
		return tags.reverse()
	}
	toExpression (astSplitArray, entry) {
		let expression = ''
		// console.log('astSplitArray', astSplitArray)
		for(const cLayer of astSplitArray) {
			if (cLayer.type === 'BinaryExpression') {
				const leftExpression = this.toExpression(cLayer.left)
				const rightExpression =  this.toExpression(cLayer.right)
				expression = `${leftExpression}${cLayer.operator}${rightExpression}`
				this.expressionSplitArray.push(leftExpression, cLayer.operator, rightExpression)
				if (!entry) {
					expression = `(${expression})`
				}
			} else {
				expression = `${expression}${ cLayer.left }${ cLayer.operator }${ cLayer.right }`
			}
		}
		return expression
	}
}
export default ASTHelper
