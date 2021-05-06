import {ManagementClient} from './contentful-management-client'

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
  const entry = await client.getEntryProps<CommentType>('5rGWvPHRDXQkkUV9ww7Ac3')
  entry.fields.likes['en-US'] = entry.fields.likes['en-US'] + 1
  const updatedEntryProps = await client.updateEntryProps<CommentType>(entry)
  expect(updatedEntryProps.fields.likes['en-US']).toEqual(entry.fields.likes['en-US'])
})
