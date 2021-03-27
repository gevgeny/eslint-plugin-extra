const rule = require("../rules/react-prefer-functional-component");
const { typeScriptEslint } = require("./parsers");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester(
  { parserOptions: { ecmaVersion: 2020, sourceType: 'module' } }
);

ruleTester.run("react-prefer-functional-component", rule, {
  valid: [
    {
      code: `
        class MyComponent extends Component {
          static getDerivedStateFromError() { }
        }
      `,
    },
    {
      code: `
        class MyComponent extends Component {
          componentDidCatch() { }
        }
      `,
    },
    {
      code: `
        class MyComponent extends Component {
          getSnapshotBeforeUpdate() { }
        }
      `,
    },
    {
      code: `
        class MyComponent extends Component<{}, {}> {
          static getDerivedStateFromError(error: Error) { }
        }
      `,
      parser: typeScriptEslint,
    },
  ],
  invalid: [
    {
      code: `
        var Greeting = createReactClass({
          render: function() {},
        });
      `,
      errors: [{ message: "Component should be functional" }]
    },
    {
      code: `
        class MyComponent extends Component { }
      `,
      errors: [{ message: "Component should be functional" }]
    },
    {
      code: `
        const clazz = class extends Component { }
      `,
      errors: [{ message: "Component should be functional" }]
    },
    {
      code: `
        import React from 'react';
        class MyComponent extends React.Component { }
      `,
      errors: [{ message: "Component should be functional" }]
    },
    {
      code: `
        import React from 'react';
        class MyComponent extends React.Component {
          componentDidCatch() { }
        }
      `,
      options: [{ allowWithComponentDidCatch: false }],
      errors: [{ message: "Component should be functional" }]
    },
    {
      code: `
        import React from 'react';
        class MyComponent extends React.Component {
          static getDerivedStateFromError() { }
        }
      `,
      options: [{ allowWithGetDerivedStateFromError: false }],
      errors: [{ message: "Component should be functional" }]
    },
    {
      code: `
        import React from 'react';
        class MyComponent extends React.Component {
          getSnapshotBeforeUpdate() { }
        }
      `,
      options: [{ allowWithGetSnapshotBeforeUpdate: false }],
      errors: [{ message: "Component should be functional" }]
    },
    {
      code: `
        const clazz = class extends Component<{}, {}> { }
      `,
      errors: [{ message: "Component should be functional" }],
      parser: typeScriptEslint,
    }
  ]
});