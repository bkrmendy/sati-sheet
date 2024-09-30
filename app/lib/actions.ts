import { Pool, Recipe } from './factory-math'
import { assertNever } from './utils'

export interface Change<T> {
  old: T
  new: T
}

export interface EditPoolName {
  type: 'edit-pool-name'
  poolId: string
  change: Change<string>
}

export interface SetRecipes {
  type: 'set-recipes'
  poolId: string
  recipes: Change<Recipe[]>
}

export interface CreatePool {
  type: 'create-pool'
  poolId: string
  name: string
  pool: Pool
}

export interface ResurrectPool {
  type: 'resurrect-pool'
  poolId: string
}

export interface DeletePool {
  type: 'delete-pool'
  poolId: string
}

export type Action = EditPoolName | SetRecipes | CreatePool | ResurrectPool | DeletePool

function invertChange<T>(change: Change<T>): Change<T> {
  return { old: change.new, new: change.old }
}

export function inverse(action: Action): Action {
  switch (action.type) {
    case 'set-recipes':
      return {
        type: 'set-recipes',
        poolId: action.poolId,
        recipes: invertChange(action.recipes),
      }
    case 'edit-pool-name':
      return {
        type: 'edit-pool-name',
        poolId: action.poolId,
        change: invertChange(action.change),
      }
    case 'create-pool':
      return {
        type: 'delete-pool',
        poolId: action.poolId,
      }
    case 'delete-pool':
      return {
        type: 'resurrect-pool',
        poolId: action.poolId,
      }
    case 'resurrect-pool':
      return {
        type: 'delete-pool',
        poolId: action.poolId,
      }
    default:
      assertNever(action)
  }
}
