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

  public generateCode(tokenLength = 82) {
    const str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOASDFGHJKLZXCVBNM1234567890';
    let token = '';
    for (let index = 0; index < tokenLength; index++) {
      token += str[Math.round(Math.random() * (str.length - 1))];
    }
    return token;
  }
}

export const Utils = new UtilsInstance();
