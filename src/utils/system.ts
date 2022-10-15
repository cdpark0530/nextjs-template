import type { QueryKey, UseInfiniteQueryOptions, UseQueryOptions } from "@tanstack/react-query";

declare global {
  type Primitives =
  | null
  | string
  | number
  | boolean
  | undefined
  | symbol
  | bigint;

  type IsNever<T> = [T] extends [never] ? true : false;

  type UseUndefined<T> = IsNever<T> extends true ? undefined : T;

  type GetKeyByValue<T, V> = UseUndefined<Extract<Entries<T>[number], [keyof T, V]>[0]>;

  type IndexSignature<O extends object> = {
    [P in keyof O]: O[P] extends object ? IndexSignature<O[P]> : O[P];
  };

  type ExcludeUndefined<T> = T extends object
  ? {
    [P in keyof T]-?: ExcludeUndefined<T[P]>;
  }
  : Exclude<T, undefined>;

  type Value<T> = T[keyof T];

  type Entries<T> = Exclude<{
    [P in keyof T]: [P, T[P]];
  }[keyof T], undefined>[];

  type MakeElement<T> = T extends Array<infer E> ? E : T;

  type PartialObject<T extends object> = {
    [P in keyof T]?: T[P] extends Array<infer E>
    ? E | E[]
    : T[P] extends object
      ? PartialObject<T[P]>
      : T[P];
  };

  type SimpleUseQueryOptions<
    F extends {
      (...args: any): any;
      key: (...args: any) => K;
    },
    K extends QueryKey = ReturnType<F["key"]>,
  > = UseQueryOptions<Awaited<ReturnType<F>>, unknown, Awaited<ReturnType<F>>, K>;

  type SimpleUseInfiniteQueryOptions<
    F extends {
      (...args: any): any;
      key: (...args: any) => K;
    },
    K extends QueryKey = ReturnType<F["key"]>,
  > = UseInfiniteQueryOptions<Awaited<ReturnType<F>>, unknown, Awaited<ReturnType<F>>, Awaited<ReturnType<F>>, K>;
}

export const range = (size: number, from = 0) => Array.from(Array(size).keys()).map((_, idx) => idx + from);

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
      .reduce((acc, [key, val]) => {
        if (val !== undefined) {
          acc[key] = getSerializable(val);
        }

        return acc;
      }, {} as ExcludeUndefined<typeof object>);
  }

  return object;
}

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

/**
 * `object`의 속성들을 `undefined`가 아닌 `filler`의 속성들로 덮어쓴다.
 */
export const amend = <T extends object>(object: T, filler: PartialObject<T>, defaultFiller?: T): T => {
  return (Object.entries(filler) as Entries<T>)
    .reduce(
      (acc, [key, val]) => {
        if (val === undefined) {
          if (defaultFiller) {
            val = defaultFiller[key];

            if (val === undefined) {
              // 초기화
              delete acc[key];
              return acc;
            }
          }
        }

        if (acc[key] instanceof Array) {
          (acc[key] as T[keyof T][]) = normToArray(val);
        }
        else if (acc[key] instanceof Object) {
          (acc[key] as object) = amend(acc[key] as object, val as object, defaultFiller?.[key] as object);
        }
        else {
          acc[key] = val;
        }

        return acc;
      },
      { ...object },
    );
};
