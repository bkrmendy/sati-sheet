import React from 'react'
import { useAtom } from 'jotai'
import { DBAtom, HistoryAtom } from './atoms'
import { append, History, redo, undo } from './lib/history'
import { processAction } from './lib/db'
import { Action } from './lib/actions'

export function useHistory(): [History, { undo: () => void; redo: () => void }] {
  const [history, setHistory] = useAtom(HistoryAtom)
  const [db] = useAtom(DBAtom)

  const undoHistory = React.useCallback(() => {
    const result = undo(history)
    if (result == null) {
      return
    }
    const [undone, undoAction] = result
    setHistory(undone)
    processAction(db, undoAction)
  }, [db, history, setHistory])

  const redoHistory = React.useCallback(() => {
    const result = redo(history)
    if (result == null) {
      return
    }

    const [redone, redoAction] = result
    setHistory(redone)
    processAction(db, redoAction)
  }, [db, history, setHistory])

  return [history, { undo: undoHistory, redo: redoHistory }]
}

export function useDispatch() {
  const [history, setHistory] = useAtom(HistoryAtom)
  const [db] = useAtom(DBAtom)
  const dispatch = React.useCallback(
    (action: Action) => {
      setHistory(append(history, action))
      processAction(db, action)
    },
    [db, history, setHistory]
  )

  return dispatch
}
