import { describe, it, expect } from '@jest/globals'
import { calculatePoolBoundary, Pool } from './factory-math'
import { Recipes } from './recipes'

describe('factory math', () => {
  it('can calculate pool from single copper ore', () => {
    const pool: Pool = {
      name: 'Copper Ore',
      recipesManufactured: [Recipes.copperOre],
    }

    expect(calculatePoolBoundary(pool)).toMatchInlineSnapshot(`
      {
        "makes": [
          {
            "material": "copper-ore",
            "quantity": 300,
          },
        ],
        "needs": [],
      }
    `)
  })

  it('can calculate pool boundary from miner + smelter', () => {
    const pool: Pool = {
      name: 'Copper Ingot',
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
            "material": "copper-ore",
            "quantity": 120,
          },
          {
            "material": "copper-ingot",
            "quantity": 90,
          },
        ],
        "needs": [],
      }
    `)
  })

  it('can calculate more complex copper setup', () => {
    const pool: Pool = {
      name: 'Big Copper Site',
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
            "material": "copper-ore",
            "quantity": 60,
          },
          {
            "material": "copper-ingot",
            "quantity": 84,
          },
          {
            "material": "copper-sheet",
            "quantity": 8,
          },
          {
            "material": "copper-wire",
            "quantity": 7,
          },
          {
            "material": "cable",
            "quantity": 6,
          },
        ],
        "needs": [],
      }
    `)
  })

  it("can calculate what's needed", () => {
    const pool: Pool = {
      name: 'Incomplete Copper Pool',
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
            "material": "copper-sheet",
            "quantity": 8,
          },
          {
            "material": "copper-wire",
            "quantity": 7,
          },
          {
            "material": "cable",
            "quantity": 6,
          },
        ],
        "needs": [
          {
            "material": "copper-ingot",
            "quantity": 36,
          },
        ],
      }
    `)
  })
})
