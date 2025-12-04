import { type SchemaTypeDefinition } from 'sanity'

import profile from './schemaTypes/profile'
import tool from './schemaTypes/tool'
import client from './schemaTypes/client'
import work from './schemaTypes/work'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [profile, tool, client, work],
}
