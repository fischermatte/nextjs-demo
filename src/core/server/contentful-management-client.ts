import {ClientAPI, createClient} from 'contentful-management'

export class ClientFactory {
  private static instance: ClientAPI

  public static getInstance(): ClientAPI {
    if (!this.instance) {
      this.instance = createClient({
        accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
        space: process.env.shj5pv7iqbc5,
      })
    }
    return this.instance
  }
}
