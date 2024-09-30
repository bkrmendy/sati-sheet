import { init, tx } from '@instantdb/react'
import { Pool, Recipe } from './factory-math'
import { Action } from './actions'

interface DBPool {
  id: string
  createdAt: number
  deleted: boolean
  name: string
  pool: Pool
}

export interface Schema {
  recipes: Recipe
  pools: DBPool
}

export type DB = ReturnType<typeof initDB>

export const initDB = () =>
  init<Schema>({ appId: '19a683be-65d0-4b3f-8942-22feedd32ef0' })

export function processAction(db: DB, action: Action) {
  switch (action.type) {
    case 'create-pool':
      db.transact([
        tx.pools[action.poolId].update({
          id: action.poolId,
          createdAt: Date.now(),
          deleted: false,
          name: action.name,
          pool: action.pool,
        }),
      ])
      break
    case 'delete-pool':
      db.transact([tx.pools[action.poolId].update({ deleted: true })])
      break
    case 'resurrect-pool':
      db.transact([tx.pools[action.poolId].update({ deleted: false })])
      break
    case 'edit-pool-name':
      db.transact([tx.pools[action.poolId].update({ name: action.change.new })])
      break
    default:
      throw new Error('not implemented')
  }
}
