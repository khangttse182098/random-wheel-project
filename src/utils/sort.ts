export const getSorter = <T>(key: keyof T) => {
  return (a: T, b: T) => {
    if (typeof a[key] === "number" && typeof b[key] === "number") {
      return (a[key] as number) - (b[key] as number);
    }
    if (typeof a[key] === "string" && typeof b[key] === "string") {
      return (a[key] as string).localeCompare(b[key] as string);
    }
    if (a[key] instanceof Date && b[key] instanceof Date) {
      return (a[key] as unknown as number) - (b[key] as unknown as number);
    }
    return 0;
  };
};
