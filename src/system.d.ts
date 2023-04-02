type Primitives =
  | null
  | string
  | number
  | boolean
  | undefined
  | symbol
  | bigint;

type IsNever<T> = [T] extends [never]
  ? true
  : false;

type UseUndefined<T> = IsNever<T> extends true
  ? undefined
  : T;

type GetKeyByValue<T, V> = UseUndefined<Extract<Entries<T>[number], [keyof T, V]>[0]>;

type IndexSignature<O extends object> = {
  [P in keyof O]: O[P] extends object
    ? IndexSignature<O[P]>
    : O[P];
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

type MakeElement<T> = T extends Array<infer E>
  ? E
  : T;

type PartialObject<T extends object> = {
  [P in keyof T]?: T[P] extends Array<infer E>
    ? E | E[]
    : T[P] extends object
      ? PartialObject<T[P]>
      : T[P];
};
