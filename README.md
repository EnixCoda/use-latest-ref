# useLatestRef

This is a react hook for preserving latest value within a ref, which is introduced in React hooks FAQ [here](https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often) and [here](https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often).

Note:

- Just like the doc says, _This is a rather convoluted pattern but it shows that you can do this escape hatch optimization if you need it._ Use this only if you really need it.
- This hook could cause issues when react concurrent mode is enabled.

## Install

Available as `use-latest-ref` on npm, you can install with either npm or yarn.

```
$ yarn add use-latest-ref
```

## Usage examples

```jsx
import { useLatestRef } from 'use-latest-ref';

function Form() {
  const [text, updateText] = useState('');
  const textRef = useLatestRef(text);

  const handleSubmit = useCallback(() => {
    const currentText = textRef.current; // Read it from the ref
    alert(currentText);
  }, [textRef]); // Don't recreate handleSubmit like [text] would do

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}
```

```jsx
import { useLatestProp } from 'use-latest-ref';
// `useLatestProp` is an alias to `useLatestRef`
// useLatestProp === useLatestRef

function Example(props) {
  // Keep latest props in a ref.
  // latestProps.current gets updated as props changes
  const latestProps = useLatestProp(props);

  useEffect(() => {
    function tick() {
      // Read latest props at any time
      console.log(latestProps.current);
    }

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []); // This effect never re-runs
}
```
