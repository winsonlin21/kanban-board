'use client'; 

import { useState } from 'react';

type CounterProps = {
  initial: number;
};

export default function Counter({ initial }: CounterProps) {
  const [count, setCount] = useState(initial);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
