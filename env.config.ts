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

  static getValidUser(): string {
    return this.getEnvVar('USER_VALID_ECOM');
  }

  static getValidPass(): string {
    return this.getEnvVar('PASS_VALID_ECOM');
  }

  static getInvalidUser(): string {
    return this.getEnvVar('USER_INVALID_ECOM');
  }

  static getInvalidPass(): string {
    return this.getEnvVar('PASS_INVALID_ECOM');
  }

}