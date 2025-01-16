declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      OPEN_METEO_URL: string;
    }
  }
}

export {};
