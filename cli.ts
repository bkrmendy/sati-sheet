import { calculatePoolBoundary, Pool } from '~/lib/factory-math'
import { Recipes } from '~/lib/recipes'

const pool: Pool = {
  name: 'Big Copper Site',
  recipesManufactured: [
    Recipes.copperOre,

    Recipes.copperIngot,
    Recipes.copperIngot,
    Recipes.copperIngot,
    Recipes.copperIngot,
    Recipes.copperIngot,

    Recipes.copperWire,
    Recipes.copperWire,
    Recipes.copperWire,
    Recipes.copperWire,
    Recipes.copperWire,
    Recipes.copperWire,
    
    Recipes.copperSheet,
    Recipes.copperSheet,
    Recipes.copperSheet,

    Recipes.copperCable,
    Recipes.copperCable,
    Recipes.copperCable,
  ],
}

console.log(calculatePoolBoundary(pool))
