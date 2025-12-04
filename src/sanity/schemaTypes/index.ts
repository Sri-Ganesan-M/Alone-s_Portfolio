import { type SchemaTypeDefinition } from 'sanity'

import profile from './profile'
import tool from './tool'
import client from './client'
import work from './work'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [profile, tool, client, work],
}
