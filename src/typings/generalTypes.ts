/**
 * @param T тип/интерфейс, вложенность которого хотим видеть (mapped types)
 * @returns вложенные свойства
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export enum SortTypes {
  ABC = "ABC",
  CBA = "CBA",
}
