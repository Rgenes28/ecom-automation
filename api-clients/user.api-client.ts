import { APIRequestContext } from '@playwright/test';
import { EnvConfig } from '../env.config'

export class UserApiClient {
  private request: APIRequestContext;
  private readonly baseUrl = `${EnvConfig.getBaseUrl()}/api/user`;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async findUserByEmail(email: string) {
    const response = await this.request.get(`${this.baseUrl}?email=${email}`);
    return response.json();
  }

  async deleteUserById(userId: string, authToken: string) {
    const response = await this.request.delete(`${this.baseUrl}/${userId}`, {
      headers: {
        Authorization: authToken,
      },
    });
    return response.json();
  }
}