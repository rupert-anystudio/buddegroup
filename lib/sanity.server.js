import { createClient } from 'next-sanity'
import config from './sanity.config'

if (!config.projectId) {
  throw Error('The Project ID is not set. Check your environment variables.')
}
if (!config.dataset) {
  throw Error('The dataset name is not set. Check your environment variables.')
}

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config)

// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_PREVIEW_API_TOKEN,
})

// Helper function for easily switching between normal client and preview client
export const getClient = (usePreview) => usePreview
  ? previewClient
  : sanityClient
