export class EnvConfig {
  
    private static getEnvVar(name: string): string {
      const value = process.env[name];
      if (!value) {
        throw new Error(`${name} environment variable is not defined`);
      }
      return value;
    }
  
    static getBaseUrl(): string {
      return this.getEnvVar('BASE_URL');
    }
  
    static getUser(): string {
      return this.getEnvVar('USER_ECOM');
    }
  
    static getPass(): string {
      return this.getEnvVar('PASS_ECOM');
    }
  }