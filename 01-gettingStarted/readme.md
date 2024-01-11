## React Notes

### React Basics

- **React** is a powerful JavaScript library designed for building user interfaces.

- **React elements** are objects that represent the UI components in React applications.

### Creating React Elements

- `createElement` is used to create React elements. It takes three arguments:
  1. The tag (or component) name.
  2. Attributes for the element.
  3. Inner HTML or child elements.

```js
const header = React.createElement("div", {id: "heading"}, (
    [ React.createElement("h5", {}, "heading1"), React.createElement("h5", {}, "heading2")]
));
```

### React Root

- A **React root** is created using `ReactDOM.createRoot`. It provides a dedicated space for rendering React elements into the DOM.

- `root.render` can be used to render elements created within a React root. Any content previously present in the root will be replaced by the newly rendered React element.

- React operates within its designated root element and can replace any existing HTML inside it. Elements outside this root are not managed by React and are free from its control.

```js
const root = ReactDOM.createRoot(document.getElementById("root"));
```

### Script Attributes

- The `crossorigin` attribute in the script tag indicates that the script should not require Cross-Origin Resource Sharing (CORS) to fetch.
