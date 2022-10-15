import { useCallback, useLayoutEffect, useState } from "react";


export type OnElementMount<E extends Element> = (el: E) => void | OnDestroyElement;
export type OnDestroyElement = <E extends Element>(el: E) => void;

export const useMount = <E extends Element>(onElementMountCallacks?: OnElementMount<E>[]) => {
  const [el, setElement] = useState<E>();

  useLayoutEffect(() => {
    if (el && onElementMountCallacks) {
      const onDestroyElementCallbacks: OnDestroyElement[] = [];
      onElementMountCallacks.forEach((cb) => {
        const onDestroyElement = cb(el);
        if (onDestroyElement) {
          onDestroyElementCallbacks.push(onDestroyElement);
        }
      });

      if (onDestroyElementCallbacks.length) {
        return () => {
          onDestroyElementCallbacks.forEach((cb) => cb(el));
        };
      }
    }

    return;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [el]);

  return {
    ref: useCallback((el: E) => el && setElement(el), []),
    el,
  };
};
