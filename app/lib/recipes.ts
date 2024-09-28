import { Recipe } from './factory-math'

const copperOre: Recipe = {
  name: 'Copper ore',
  inputs: [],
  outputs: [{ material: 'Copper ore', quantity: 300 }],
}

const copperIngot: Recipe = {
  name: 'Copper ingot',
  inputs: [{ material: 'Copper ore', quantity: 60 }],
  outputs: [{ material: 'Copper ingot', quantity: 30 }],
}

const copperSheet: Recipe = {
  name: 'Copper sheet',
  inputs: [{ material: 'Copper ingot', quantity: 10 }],
  outputs: [{ material: 'Copper sheet', quantity: 4 }],
}

const copperWire: Recipe = {
  name: 'Copper wire',
  inputs: [{ material: 'Copper ingot', quantity: 4 }],
  outputs: [{ material: 'Copper wire', quantity: 4 }],
}

const copperCable: Recipe = {
  name: 'Copper cable',
  inputs: [{ material: 'Copper wire', quantity: 3 }],
  outputs: [{ material: 'Cable', quantity: 2 }],
}

export const Recipes = {
  copperOre,
  copperIngot,
  copperSheet,
  copperWire,
  copperCable,
}
