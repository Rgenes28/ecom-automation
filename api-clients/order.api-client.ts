import { APIRequestContext } from '@playwright/test';
import { EnvConfig } from '../env.config';


export class OrderApiClient {
  private request: APIRequestContext;
  private readonly baseUrl = `${EnvConfig.getBaseUrl()}/api/orders`;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getOrderById(orderId: string) {
    const response = await this.request.get(`${this.baseUrl}/${orderId}`);
    if (!response.ok()) {
      throw new Error(`Failed to fetch order ${orderId}`);
    }
    return response.json();
  }
}