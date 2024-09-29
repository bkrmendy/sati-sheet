import { Recipe } from './factory-math'

const copperOre: Recipe = {
  name: 'Copper ore',
  inputs: [],
  outputs: [{ material: 'Copper ore', quantity: 480 }],
}

const copperIngot: Recipe = {
  name: 'Copper ingot',
  inputs: [{ material: 'Copper ore', quantity: 30 }],
  outputs: [{ material: 'Copper ingot', quantity: 30 }],
}

const copperSheet: Recipe = {
  name: 'Copper sheet',
  inputs: [{ material: 'Copper ingot', quantity: 20 }],
  outputs: [{ material: 'Copper sheet', quantity: 10 }],
}

const copperWire: Recipe = {
  name: 'Copper wire',
  inputs: [{ material: 'Copper ingot', quantity: 15 }],
  outputs: [{ material: 'Copper wire', quantity: 30 }],
}

const copperCable: Recipe = {
  name: 'Copper cable',
  inputs: [{ material: 'Copper wire', quantity: 60 }],
  outputs: [{ material: 'Cable', quantity: 30 }],
}

export const Recipes = {
  copperOre,
  copperIngot,
  copperSheet,
  copperWire,
  copperCable,
}
