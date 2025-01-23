declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPEN_METEO_URL: string;
    }
  }
}

export {};
