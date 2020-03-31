import { useRef } from 'react';

/**
 * Creates a ref for given value and updates it in time
 */
export function useLatestRef<T>(value: T) {
  const ref = useRef(value);
  // update value eagerly during render to make sure value is up to date for use
  ref.current = value;
  return ref;
}

export const useLatestProp = useLatestRef;
