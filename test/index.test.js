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
})
