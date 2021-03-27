const rule = require("../rules/no-nested-destructuring");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester(
  { parserOptions: { ecmaVersion: 2020, sourceType: 'module' } }
);

ruleTester.run("no-nested-destructuring", rule, {
  valid: [
    {
      code: 'const { a } = d;'
    }, {
      code: 'const [[a]] = b;',
      options: [{ allowForArrays: true }],
    }, {
      code: 'const [[a = 4] = 5] = b;',
      options: [{ allowForArrays: true }],
    }
 ],
  invalid: [
    {
      code: 'const { a: { b } } = d;',
      errors: [{ message: 'Nested destructuring is disallowed' }]
    }, {
      code: 'const { a: { b = 3 } = 5 } = d;',
      errors: [{ message: 'Nested destructuring is disallowed' }]
    }, {
      code: 'const { a: [ b ] } = d;',
      errors: [{ message: 'Nested destructuring is disallowed' }]
    }, {
      code: 'const [ { a } ] = d;',
      errors: [{ message: 'Nested destructuring is disallowed' }]
    }, {
      code: 'const [ { a } = 4 ] = d;',
      errors: [{ message: 'Nested destructuring is disallowed' }]
    }, {
      code: 'const [ { a = 5 } = 4 ] = d;',
      errors: [{ message: 'Nested destructuring is disallowed' }]
    }, {
      code: 'function foo({ a: { b } }) { }',
      errors: [{ message: 'Nested destructuring is disallowed' }]
    }, {
      code: 'const [[a]] = b;',
      errors: [{ message: 'Nested destructuring is disallowed' }]
    }, {
      code: 'const [,[,a]] = b;',
      errors: [{ message: 'Nested destructuring is disallowed' }]
    }, {
      code: 'const [[a = 1] = 5] = b;',
      errors: [{ message: 'Nested destructuring is disallowed' }]
    }, {
      code: 'const { a: { b, ...rest1 }, ...rest2 } = c;',
      errors: [{ message: 'Nested destructuring is disallowed' }]
    }
  ]
});