export type RawIntEnum<T> = `${Extract<
   T,
   number
>}` extends `${infer N extends number}`
   ? N
   : never;

export type RawStringEnum<T> = `${Extract<
   T,
   string
>}` extends `${infer N extends string}`
   ? N
   : never;
