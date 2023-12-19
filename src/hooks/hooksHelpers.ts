export const checkColumnBySort = <P>(column: keyof P, a: P, b: P) => {
  const first: any = String(a[column]);
  const second: any = String(b[column]);
  if (column === "createdAt") {
    return new Date(first).getTime() - new Date(second).getTime();
  }

  return first.localeCompare(second);
};
