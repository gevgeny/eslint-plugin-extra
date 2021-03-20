const pragmaUtil = require('eslint-plugin-react/lib/util/pragma');
const astUtil = require('eslint-plugin-react/lib/util/ast');

const defaultConfig = {
  allowWithComponentDidCatch: true,
  allowWithGetDerivedStateFromError: true,
  allowWithGetSnapshotBeforeUpdate: true,
}

module.exports = function (context) {
  const pragma = pragmaUtil.getFromContext(context);
  const createClass = pragmaUtil.getCreateClassFromContext(context);
  const sourceCode = context.getSourceCode();

  function hasGetDerivedStateFromError(node) {
    const properties = node.body.body;
    return properties.some(
      (property) =>
        astUtil.getPropertyName(property) === 'getDerivedStateFromError' && property.static
    );
  }

  function hasProperty(node, name) {
    const properties = astUtil.getComponentProperties(node);
    return properties.some(
      (property) => astUtil.getPropertyName(property) === name
    );
  }

  function isES5Component (node) {
    if (!node.parent) {
      return false;
    }
    console.log('pragma', pragma, createClass, `^(${pragma}\\.)?${createClass}$`);
    return new RegExp(`^(${pragma}\\.)?${createClass}$`).test(sourceCode.getText(node.parent.callee));
  }

  function isES6Component (node) {
    if (!node.superClass) {
      return false;
    }
    return new RegExp(`^(${pragma}\\.)?(Pure)?Component$`).test(sourceCode.getText(node.superClass));
  }

  function report(node) {
    context.report({
      node,
      message: 'Component should be functional'
    });
  }

  function checkClassNode(node) {
    if (!isES6Component(node)) return;

    const config = { ...defaultConfig, ...context.options[0] };
    if (config.allowWithComponentDidCatch && hasProperty(node, 'componentDidCatch')) return;
    if (config.allowWithGetSnapshotBeforeUpdate && hasProperty(node, 'getSnapshotBeforeUpdate')) return;
    if (config.allowWithGetDerivedStateFromError && hasGetDerivedStateFromError(node)) return;

    report(node);
  }

  function checkObjectNode(node) {
    if (!isES5Component(node)) return;

    report(node);
  }

  return {
    ClassDeclaration: checkClassNode,
    ClassExpression: checkClassNode,
    ObjectExpression: checkObjectNode,
  }
};

module.exports.schema = [{
  type: 'object',
  properties: {
    allowWithComponentDidCatch: { type: 'boolean' },
    allowWithGetDerivedStateFromError: { type: 'boolean' },
    allowWithGetSnapshotBeforeUpdate: { type: 'boolean' },
  },
  additionalProperties: false
}];