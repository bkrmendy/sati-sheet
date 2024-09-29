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

export interface AddRecipe {
  type: 'add-recipe'
  poolId: string
  recipeName: string
}

export interface RemoveRecipe {
  type: 'remove-recipe'
  poolId: string
  recipeName: string
}

export type Action = EditPoolName | AddRecipe | RemoveRecipe

function invertChange<T>(change: Change<T>): Change<T> {
  return { old: change.new, new: change.old }
}

export function inverse(action: Action): Action {
  switch (action.type) {
    case 'add-recipe':
      return {
        type: 'remove-recipe',
        poolId: action.poolId,
        recipeName: action.recipeName,
      }
    case 'remove-recipe':
      return {
        type: 'add-recipe',
        poolId: action.poolId,
        recipeName: action.recipeName,
      }
    case 'edit-pool-name':
      return {
        type: 'edit-pool-name',
        poolId: action.poolId,
        change: invertChange(action.change),
      }
    default:
      assertNever(action)
  }
}
