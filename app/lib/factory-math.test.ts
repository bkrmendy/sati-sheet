import { describe, it, expect } from '@jest/globals'
import { calculatePoolBoundary, Pool } from './factory-math'
import { Recipes } from './recipes'

describe('factory math', () => {
  it('can calculate pool from single copper ore', () => {
    const pool: Pool = {
      recipesManufactured: [Recipes.copperOre],
    }

    expect(calculatePoolBoundary(pool)).toMatchInlineSnapshot(`
      {
        "makes": [
          {
            "material": "Copper ore",
            "quantity": 480,
          },
        ],
        "needs": [],
      }
    `)
  })

  it('can calculate pool boundary from miner + smelter', () => {
    const pool: Pool = {
      recipesManufactured: [
        Recipes.copperOre,
        Recipes.copperIngot,
        Recipes.copperIngot,
        Recipes.copperIngot,
      ],
    }

    expect(calculatePoolBoundary(pool)).toMatchInlineSnapshot(`
      {
        "makes": [
          {
            "material": "Copper ore",
            "quantity": 390,
          },
          {
            "material": "Copper ingot",
            "quantity": 90,
          },
        ],
        "needs": [],
      }
    `)
  })

  it('can calculate more complex copper setup', () => {
    const pool: Pool = {
      recipesManufactured: [
        Recipes.copperOre,
        Recipes.copperIngot,
        Recipes.copperIngot,
        Recipes.copperIngot,
        Recipes.copperIngot,
        Recipes.copperSheet,
        Recipes.copperSheet,
        Recipes.copperWire,
        Recipes.copperWire,
        Recipes.copperWire,
        Recipes.copperWire,
        Recipes.copperCable,
        Recipes.copperCable,
        Recipes.copperCable,
      ],
    }
    expect(calculatePoolBoundary(pool)).toMatchInlineSnapshot(`
      {
        "makes": [
          {
            "material": "Copper ore",
            "quantity": 360,
          },
          {
            "material": "Copper ingot",
            "quantity": 20,
          },
          {
            "material": "Copper sheet",
            "quantity": 20,
          },
          {
            "material": "Cable",
            "quantity": 90,
          },
        ],
        "needs": [
          {
            "material": "Copper wire",
            "quantity": 60,
          },
        ],
      }
    `)
  })

  it("can calculate what's needed", () => {
    const pool: Pool = {
      recipesManufactured: [
        Recipes.copperSheet,
        Recipes.copperSheet,
        Recipes.copperWire,
        Recipes.copperWire,
        Recipes.copperWire,
        Recipes.copperWire,
        Recipes.copperCable,
        Recipes.copperCable,
        Recipes.copperCable,
      ],
    }

    expect(calculatePoolBoundary(pool)).toMatchInlineSnapshot(`
      {
        "makes": [
          {
            "material": "Copper sheet",
            "quantity": 20,
          },
          {
            "material": "Cable",
            "quantity": 90,
          },
        ],
        "needs": [
          {
            "material": "Copper ingot",
            "quantity": 100,
          },
          {
            "material": "Copper wire",
            "quantity": 60,
          },
        ],
      }
    `)
  })
})
