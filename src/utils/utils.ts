export class UtilsInstance {
  public groupBy<T>(array: T[], key: string): { [key: string]: T[] } {
    return array.reduce((acc, curr) => {
      if (!acc.hasOwnProperty(curr[key])) {
        acc[curr[key]] = [];
      }

      acc[curr[key]].push(curr);

      return acc;
    }, {} as { [key: string]: T[] });
  }
}

export const Utils = new UtilsInstance();
