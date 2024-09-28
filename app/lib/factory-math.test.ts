import { describe, it, expect } from '@jest/globals'
import { calculatePoolBoundary, Pool, Recipe } from './factory-math'

const ironOre: Recipe = {
  inputs: [],
  outputs: [{ material: 'copper-ore', quantity: 300 }],
}

const copperIngot: Recipe = {
  inputs: [{ material: 'copper-ore', quantity: 60 }],
  outputs: [{ material: 'copper-ingot', quantity: 30 }],
}

const copperSheet: Recipe = {
  inputs: [{ material: 'copper-ingot', quantity: 10 }],
  outputs: [{ material: 'copper-sheet', quantity: 4 }],
}

const copperWire: Recipe = {
  inputs: [{ material: 'copper-ingot', quantity: 4 }],
  outputs: [{ material: 'copper-wire', quantity: 4 }],
}

const copperCable: Recipe = {
  inputs: [{ material: 'copper-wire', quantity: 3 }],
  outputs: [{ material: 'cable', quantity: 2 }],
}

describe('factory math', () => {
  it('can calculate pool from single copper ore', () => {
    const pool: Pool = {
      name: 'Copper Ore',
      recipesManufactured: [ironOre],
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
      recipesManufactured: [ironOre, copperIngot, copperIngot, copperIngot],
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
        ironOre,
        copperIngot,
        copperIngot,
        copperIngot,
        copperIngot,
        copperSheet,
        copperSheet,
        copperWire,
        copperWire,
        copperWire,
        copperWire,
        copperCable,
        copperCable,
        copperCable,
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

  it("can calculate what's need", () => {
    const pool: Pool = {
      name: 'Incomplete Copper Pool',
      recipesManufactured: [
        copperSheet,
        copperSheet,
        copperWire,
        copperWire,
        copperWire,
        copperWire,
        copperCable,
        copperCable,
        copperCable,
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
