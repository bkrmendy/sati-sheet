import { describe, expect, it } from '@jest/globals'
import { canRedo, canUndo, History, redo, undo } from './history'

describe('history', () => {
  it('can undo', () => {
    const history: History = {
      undoStack: [{ type: 'add-recipe', poolId: '1', recipeName: 'Copper ore' }],
      redoStack: [],
    }

    expect(canUndo(history)).toEqual(true)
    expect(canRedo(history)).toEqual(false)

    const result = undo(history)
    if (result == null) {
      throw new Error('result should not be null')
    }

    const [historyUndone, action] = result

    expect(canUndo(historyUndone)).toEqual(false)
    expect(canRedo(historyUndone)).toEqual(true)

    expect(historyUndone).toMatchInlineSnapshot(`
      {
        "redoStack": [
          {
            "poolId": "1",
            "recipeName": "Copper ore",
            "type": "add-recipe",
          },
        ],
        "undoStack": [],
      }
    `)
    expect(action).toMatchInlineSnapshot(`
      {
        "poolId": "1",
        "recipeName": "Copper ore",
        "type": "remove-recipe",
      }
    `)
  })

  it('can redo', () => {
    const history: History = {
      redoStack: [
        {
          poolId: '1',
          recipeName: 'Copper ore',
          type: 'add-recipe',
        },
      ],
      undoStack: [],
    }

    expect(canUndo(history)).toEqual(false)
    expect(canRedo(history)).toEqual(true)

    const result = redo(history)
    if (result == null) {
      throw new Error('result should not be null')
    }

    const [historyRedone, action] = result
    expect(historyRedone).toMatchInlineSnapshot(`
      {
        "redoStack": [],
        "undoStack": [
          {
            "poolId": "1",
            "recipeName": "Copper ore",
            "type": "add-recipe",
          },
        ],
      }
    `)
    expect(action).toMatchInlineSnapshot(`
      {
        "poolId": "1",
        "recipeName": "Copper ore",
        "type": "add-recipe",
      }
    `)
  })

  it('gives back an identical history after undo -> redo -> undo', () => {
    const history: History = {
      undoStack: [{ type: 'add-recipe', poolId: '1', recipeName: 'Copper ore' }],
      redoStack: [],
    }

    const [undone] = undo(history)!
    const [redone] = redo(undone)!

    expect(redone).toEqual(history)
  })
})
