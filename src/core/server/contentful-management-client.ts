import {ClientAPI, createClient} from 'contentful-management'
import {Entry, EntryProps, Environment} from 'contentful-management/types'

const createClientApi = () =>
  createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
    space: process.env.CONTENTFUL_SPACE_ID,
  })

export class ManagementClient {
  constructor(private clientApi: ClientAPI = createClientApi()) {}

  private async getEnvironment(): Promise<Environment> {
    const spaces = await this.clientApi.getSpaces()
    return spaces.items[0].getEnvironment('master')
  }

  private async getEntry(id: string): Promise<Entry> {
    const env = await this.getEnvironment()
    return env.getEntry(id)
  }

  async getEntryProps<T>(id: string): Promise<EntryProps<T>> {
    const entry = await this.getEntry(id)
    return entry.toPlainObject() as EntryProps<T>
  }

  async updateEntryFields<T>(id: string, entryProps: Pick<EntryProps<T>, 'fields'>): Promise<EntryProps<T>> {
    const entry = await this.getEntry(id)
    entry.fields = entryProps.fields
    const updatedEntry = await entry.update()
    await updatedEntry.publish()
    return updatedEntry.toPlainObject() as EntryProps<T>
  }

  async createEntry<T>(contentTypeId: string, entryProps: Pick<EntryProps<T>, 'fields'>): Promise<EntryProps<T>> {
    const env = await this.getEnvironment()
    const entry = await env.createEntry(contentTypeId, {
      fields: entryProps.fields,
    })
    await entry.publish()
    return entry.toPlainObject() as EntryProps<T>
  }
}
