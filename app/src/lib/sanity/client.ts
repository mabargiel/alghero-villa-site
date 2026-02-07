import {createClient} from '@sanity/client'
import {sanityDataset, sanityProjectId} from './env'

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: '2024-10-01',
  useCdn: true,
})
