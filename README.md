### expression-eval-ext

ext [expression-eval](https://github.com/donmccurdy/expression-eval)

install:
```bash
npm i --save expression-eval-ext
```
import:
```javascript
// es6
import { parse, evaluate, evaluateAsync, compile, compileAsync, addUnaryOp, addBinaryOp, ASTHelper } from 'expression-eval-ext';
// COMMONJS
const { parse, evaluate } = require('expression-eval-ext');
// UMD / standalone script
const { parse, evaluate } = window.expressionEvalExt;
```

以下方法请参考 [expression-eval](https://github.com/donmccurdy/expression-eval)
`parse`, `evaluate`, `evaluateAsync`, `compile`, `compileAsync`, `addUnaryOp`, `addBinaryOp`


ASTHelper
```javascript
const ast = parse('object.a.b.c')
const astHelper = new ASTHelper(ast)
// ast tree to expression
console.log(astHelper.expression) // print object.a.b.c
```

