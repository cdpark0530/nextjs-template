export const normToArray = <E>(object: E | E[] | null | undefined) => {
  if (object instanceof Array) {
    return object;
  }
  else {
    return object === undefined || object === null
      ? []
      : [object];
  }
};

export function getSerializable<T extends undefined | null>(object: T): T;
export function getSerializable<T extends Object>(obj: T): ExcludeUndefined<T>;
export function getSerializable(object: any) {
  if (object instanceof Array) {
    return object
      .filter((el) => el !== undefined)
      .map((el) => getSerializable(el));
  }

  if (object instanceof Object) {
    return (Object.entries(object) as Entries<typeof object>)
      .reduce(
        (acc, [key, val]) => {
          if (val !== undefined) {
            acc[key] = getSerializable(val);
          }

          return acc;
        },
        {
        } as ExcludeUndefined<typeof object>
      );
  }

  return object;
}

/**
 * Iterate nested properties of the `filler`, and update the correspoding properties of the `object`
 * with either the `filler`'s property or the `fillerFallback`'s property if one of them is not `undefined`.
 *
 * It will `delete` the `object`'s property if the corresponding 'fillers' are unavailable
 * when `fillerFallback` is provided.
 *
 * @param object - The object to amend
 * @param filler - The filler to amend the object with its properties that are not `undefined`
 * @param fillerFallback - The fallback filler of `filler`
 */
export const amend = <T extends object>(object: T, filler: PartialObject<T>, fillerFallback?: T): T => {
  return (Object.entries(filler) as Entries<T>)
    .reduce(
      (acc, [key, val]) => {
        if (val === undefined) {
          if (fillerFallback) {
            val = fillerFallback[key];

            if (val === undefined) {
              // initialize
              delete acc[key];
              return acc;
            }
          }
        }

        if (acc[key] instanceof Array) {
          (acc[key] as T[keyof T][]) = normToArray(val);
        }
        else if (acc[key] instanceof Object) {
          (acc[key] as object) = amend(acc[key] as object, val as object, fillerFallback?.[key] as object);
        }
        else {
          acc[key] = val;
        }

        return acc;
      },
      {
        ...object,
      },
    );
};
