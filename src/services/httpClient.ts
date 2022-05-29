import axios, { AxiosInstance } from 'axios';

export class HttpClient {
  private static _instance: HttpClient;
  static get instance() {
    if (!this._instance) {
      this._instance = new HttpClient(axios.create({
        baseURL: `http://localhost:8080`,
        withCredentials: false,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }));
    }
    return this._instance;
  }

  private constructor(private axios: AxiosInstance) { }

  postUpdate(update: string) {
    return this.axios.post('/shipment-update', update );
  }
}
