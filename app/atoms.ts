import { atom } from 'jotai'
import { History } from './lib/history'
import { DB, initDB } from './lib/db'

export const HistoryAtom = atom<History>({ undoStack: [], redoStack: [] })
export const DBAtom = atom<DB>(initDB())
