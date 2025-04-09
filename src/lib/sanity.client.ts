import { createClient } from 'next-sanity'

// These will eventually come from environment variables for better security and flexibility
const projectId = 'iphe6n4j' // Replace with your actual project ID
const dataset = 'production' // Replace with your actual dataset name
const apiVersion = '2023-05-03' // Use a specific API version

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: true, // Set to `false` if you want to bypass the CDN for fresh data (e.g., during development)
})
