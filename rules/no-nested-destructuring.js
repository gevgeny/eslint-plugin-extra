const pragmaUtil = require('eslint-plugin-react/lib/util/pragma');
const astUtil = require('eslint-plugin-react/lib/util/ast');

const defaultConfig = {
  allowWithComponentDidCatch: true,
  allowWithGetDerivedStateFromError: true,
  allowWithGetSnapshotBeforeUpdate: true,
}

module.exports = function (context) {
  function report(node) {
    context.report({
      node,
      message: 'Nested destructuring is disallowed'
    });
  }

  return {
    'ObjectPattern > Property > ObjectPattern': report,
    'ObjectPattern > Property > AssignmentPattern[left.type="ObjectPattern"]': report,
    'ObjectPattern > Property > ArrayPattern': report,
    'ArrayPattern > ObjectPattern': report,
    'ArrayPattern > AssignmentPattern[left.type="ObjectPattern"]': report,
    'ArrayPattern > AssignmentPattern[left.type="ArrayPattern"]': (node) => {
      if ((context.options[0] || {}).allowForArrays) return;
      report(node);
    },
    'ArrayPattern > ArrayPattern': (node) => {
      if ((context.options[0] || {}).allowForArrays) return;
      report(node);
    },
  }
};

module.exports.schema = [{
  type: 'object',
  properties: {
    allowForArrays: { type: 'boolean' },
  },
  additionalProperties: false
}];