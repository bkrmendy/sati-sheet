import { init } from '@instantdb/react'
import { Pool, Recipe } from './factory-math'

export interface Schema {
  recipes: Array<Recipe>
  pools: Array<{ id: string; pool: Pool }>
}

export const db = init<Schema>({ appId: '19a683be-65d0-4b3f-8942-22feedd32ef0' })
