import { Action, inverse } from './actions'

export interface History {
  undoStack: Action[]
  redoStack: Action[]
}

export const canUndo = (history: History) => history.undoStack.length > 0
export const canRedo = (history: History) => history.redoStack.length > 0

export function undo(history: History): [History, Action] | null {
  if (!canUndo(history)) {
    return null
  }

  const {
    undoStack: [last, ...rest],
    redoStack,
  } = history

  return [{ undoStack: rest, redoStack: [last, ...redoStack] }, inverse(last)]
}

export function redo(history: History): [History, Action] | null {
  if (!canRedo(history)) {
    return null
  }

  const {
    undoStack,
    redoStack: [last, ...rest],
  } = history

  return [{ undoStack: [last, ...undoStack], redoStack: rest }, last]
}
