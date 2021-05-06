import {ManagementClient} from './contentful-management-client'
import {EntryProps} from 'contentful-management/types'

export interface LocaleString {
  'en-US': string
}

export interface LocaleNumber {
  'en-US': number
}

export interface CommentType {
  text: LocaleString
  title: LocaleString
  likes: LocaleNumber
}

test('ManagementClient', async () => {
  const client = new ManagementClient()
  const id = '5rGWvPHRDXQkkUV9ww7Ac3'
  const entry: EntryProps<CommentType> = await client.getEntryProps<CommentType>(id)
  entry.fields.likes['en-US'] = entry.fields.likes['en-US'] + 1
  const updatedEntryProps = await client.updateEntryFields<CommentType>(id, {
    fields: entry.fields,
  })
  expect(updatedEntryProps.fields.likes['en-US']).toEqual(entry.fields.likes['en-US'])
})
