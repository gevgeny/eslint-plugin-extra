ESLint-plugin-extra
===================
Extra rules for ESLint
## Installation
```sh
$ npm install eslint-plugin-extra --save-dev
```

## Configuration
Add "extra" to the plugins section.

```json
{
  "plugins": [
    "extra"
  ]
}
```

Enable the rules that you would like to use.

```json
  "rules": {
    "extra/no-nested-destructuring": ["error"],
    "extra/react-prefer-functional-component": ["error"]
  }
```

## List of supported rules

### extra/no-nested-destructuring
Forbids using nested destructuring

>  Nested destructuring may make code hard to read, so it makes sense to disallow it.

#### Rule Details
Examples of **incorrect** code for this rule:
```js
const { a: { b } } = obj;
```
```js
const { a: [ b ] } = obj;
```
```js
const [[ b ]] = obj;
```
```js
function foo({ a: { b } }) {
  
}
```
Examples of **correct** code for this rule:

```js
const { a } = obj;
const { b } = a;
```
```js
const { b } = obj.a;
```

#### Options
This rule has an object option:
```json
{
    "extra/no-nested-destructuring": ["error", { "allowForArrays": true }]
}

```
`allowForArrays` (default: `false`) – Allows nested destructuring for arrays.


### extra/react-prefer-functional-component
Enforce using functional React components 

>Since hooks are shipped in React, there is not much reason to use class components. 
See ["Motivation for using React Hooks"](https://reactjs.org/docs/hooks-intro.html#motivation) and ["Do Hooks cover all use cases for classes?"](https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes)  

#### Rule Details

Examples of **incorrect** code for this rule:

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = 42;
  }

  render() {
    return (
      <div>{this.state}</div>
    )
  }
}
```
```jsx
var Hello = createReactClass({
  render: function() { return <div />; };
});
```

Examples of **correct** code for this rule:
```jsx
const App = () => {
  const [value] = React.useState(42);
  
  return (
    <div>{value}</div>
  );
};
```
```jsx
class MyComponent extends React.Component {
  getSnapshotBeforeUpdate() { ... }

  render() {
    return (
      <div />
    );
  }
}
```
```jsx
class MyComponent extends React.Component {
  static getDerivedStateFromError() { ... }
  
  render() {
    return (
      <div />
    );
  }
}
```
```jsx
class MyComponent extends React.Component {
  componentDidCatch() { ... }
  
  render() {
    return (
      <div />
    );
  }
}
```

#### Options
This rule has an object option:
```json
{
    "extra/react-prefer-functional-component": ["error", {
        "allowWithComponentDidCatch": true,
        "allowWithGetDerivedStateFromError": true,
        "allowWithGetSnapshotBeforeUpdate": true
    }]
}

```
`allowWithComponentDidCatch` (default: `true`) – Allows using class components with `componentDidCatch` method.

`allowWithGetDerivedStateFromError` (default: `true`) – Allows using class components with `getDerivedStateFromError` static method.

`allowWithGetSnapshotBeforeUpdate` (default: `true`) – Allows using class components with `getSnapshotBeforeUpdate` method.







