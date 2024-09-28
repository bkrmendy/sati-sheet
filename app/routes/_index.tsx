import type { MetaFunction } from '@remix-run/node'
import React from 'react'
import { calculatePoolBoundary, Pool, Recipe } from '~/lib/factory-math'
import { Recipes } from '~/lib/recipes'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

type RecipesWithCount = Record<
  string,
  {
    recipe: Recipe
    count: number
  }
>

function recipesWithCount(recipes: Recipe[]): RecipesWithCount {
  const result: RecipesWithCount = {}

  for (const recipe of recipes) {
    if (result[recipe.name] == null) {
      result[recipe.name] = { recipe, count: 0 }
    }
    result[recipe.name].count += 1
  }
  return result
}

interface PoolCardProps {
  pool: Pool
}

function PoolCard(props: PoolCardProps) {
  const { pool } = props

  const recipes = recipesWithCount(pool.recipesManufactured)
  const boundary = calculatePoolBoundary(pool)

  return (
    <div className="m-4 grid max-w-[500px] grid-cols-4 border-2 border-slate-950 font-mono">
      <div className="col-span-4 flex justify-center border border-slate-950 p-2 text-2xl font-bold uppercase">
        {pool.name}
      </div>
      <div className="col-span-2 flex justify-center border border-slate-950 p-1 pt-3 text-xl font-semibold uppercase">
        Needs
      </div>
      <div className="col-span-2 flex justify-center border border-slate-950 p-1 pt-3 text-xl font-bold uppercase">
        Makes
      </div>
      <div className="col-span-2 row-span-2 grid grid-cols-2 border-slate-950">
        {boundary.needs.map((recipe) => (
          <React.Fragment key={recipe.material}>
            <div className="flex justify-end border border-slate-950 p-2 font-semibold">
              {recipe.material}
            </div>
            <div className="border border-slate-950 p-2 font-semibold">
              {recipe.quantity} / min
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="col-span-2 row-span-2 grid grid-cols-2 border-slate-950">
        {boundary.makes.map((recipe) => (
          <React.Fragment key={recipe.material}>
            <div className="flex justify-end border border-slate-950 p-2 font-semibold">
              {recipe.material}
            </div>
            <div className="border border-slate-950 p-2 font-semibold">
              {recipe.quantity} / min
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="col-span-4 flex justify-center border border-slate-950 p-2 pt-3 text-xl font-bold uppercase">
        Recipes
      </div>
      {Object.values(recipes).map(({ recipe, count }) => {
        return (
          <React.Fragment key={recipe.name}>
            <div className="col-span-2 flex justify-end border border-slate-950 p-2 font-semibold">
              {recipe.name}
            </div>
            <div className="col-span-2 border border-slate-950 p-2 font-semibold">
              x {count}
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}

const pool: Pool = {
  name: 'Big Copper Site',
  recipesManufactured: [
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

export default function Index() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col items-center gap-16">
        <PoolCard pool={pool} />
      </div>
    </div>
  )
}
