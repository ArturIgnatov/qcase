declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: string;
      DB_USERNAME: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      JWT_EXP_IN: string;
      JWT_SECRET: string;
      REFRESH_EXP_IN: string;
      GOOGLE_LOGIN: string;
      GOOGLE_PASSWORD: string;
    }
  }
}
export {};
