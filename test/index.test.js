const { ASTHelper, parse, evaluate, compile } = require('../dist/expression-eval-ext')
const { expect } = require('chai')

describe('ASTHelper test', function() {
	it('Object', async function(done) {
		const object = { a: { b: { c: 1 } } }
		const ast = parse('object')
		const astHelper = new ASTHelper(ast)
		expect(astHelper.expression).to.be.equal('object')
		done()
	})
	it('object.key', async function(done) {
		const ast = parse('object.a.b.c')
		const astHelper = new ASTHelper(ast)
		expect(astHelper.expression).to.be.equal('object.a.b.c')
		done()
	})
	it('object.key + object.key', async function(done) {
		const ast = parse('object.a.b.c + object.a.b.c')
		const astHelper = new ASTHelper(ast)
		expect(astHelper.expression).to.be.equal('object.a.b.c+object.a.b.c')
		done()
	})
	it('(object.key + object.key) * 2', async function(done) {
		const ast = parse('(object.a.b.c + object.a.b.c) * 2')
		const astHelper = new ASTHelper(ast)
		expect(astHelper.expression).to.be.equal('(object.a.b.c+object.a.b.c)*2')
		done()
	})
	it('(object.key + object.key + 2) * 2', async function(done) {
		const ast = parse('(object.key + object.key + 2) * 2')
		const astHelper = new ASTHelper(ast)
		expect(astHelper.expression).to.be.equal('((object.key+object.key)+2)*2')
		done()
	})
	it('(object.key + object.key + 2) * 2 * 3', async function(done) {
		const ast = parse('(object.key + object.key + 2) * 2 * 3')
		const astHelper = new ASTHelper(ast)
		expect(astHelper.expression).to.be.equal('(((object.key+object.key)+2)*2)*3')
		done()
	})
	it('object.key + object.key + 2 * 2 * 3', async function(done) {
		const ast = parse('object.key + object.key + 2 * 2 * 3')
		const astHelper = new ASTHelper(ast)
		// console.log(astHelper.expression)
		expect(astHelper.expression).to.be.equal('(object.key+object.key)+((2*2)*3)')
		done()
	})
	it(`object.getKey('key') + object.key + 2 * 2 * 3`, async function(done) {
		const ast = parse(`object.getKey('key') + object.key + 2 * 2 * 3`)
		const astHelper = new ASTHelper(ast)
		// console.log(astHelper.expressionSplitArray)
		expect(astHelper.expression).to.be.equal(`(object.getKey('key')+object.key)+((2*2)*3)`)
		done()
	})
})
