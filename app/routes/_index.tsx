import type { MetaFunction } from '@remix-run/node'
import { useAtom } from 'jotai'
import React from 'react'
import { DBAtom } from '~/atoms'
import { Redo, Undo } from '~/components/icons'
import { Command, CommandInput, CommandItem, CommandList } from '~/components/ui/command'
import { Input } from '~/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { useDispatch, useHistory } from '~/hooks'
import { calculatePoolBoundary, Pool, Recipe } from '~/lib/factory-math'
import { Recipes } from '~/lib/recipes'
import { makeId, NOOP } from '~/lib/utils'

export const meta: MetaFunction = () => {
  return [
    { title: 'Sati Manager' },
    { name: 'description', content: 'Oversee your factory like a pro' },
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

const allRecipes = [
  Recipes.copperOre,
  Recipes.copperIngot,
  Recipes.copperSheet,
  Recipes.copperWire,
  Recipes.copperCable,
]

function AddRecipe() {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>+ Add</PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        className="w-[200px] p-0 shadow-none rounded-none border-slate-950 border-2 font-mono"
      >
        <Command>
          <CommandInput placeholder="Search recipes..." />
          <CommandList>
            {allRecipes.map(({ name }) => (
              <CommandItem key={name} value={name} onSelect={NOOP}>
                {name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

interface PoolCardProps {
  pool: Pool
}

function PoolCard(props: PoolCardProps) {
  const { pool } = props

  const recipes = recipesWithCount(pool.recipesManufactured)
  const boundary = calculatePoolBoundary(pool)

  return (
    <div className="bg-white grid max-w-[650px] h-max grid-cols-4 border-2 border-slate-950 font-mono">
      <div className="col-span-4 flex justify-center border border-slate-950 p-2 text-2xl font-bold uppercase">
        <Input
          className="text-2xl font-bold uppercase outline-none rounded-none shadow-none border-none"
          value={pool.name}
          onChange={NOOP}
        />
      </div>
      <div className="col-span-2 flex justify-center border border-slate-950 p-1 pt-3 text-xl font-semibold uppercase">
        Needs
      </div>
      <div className="col-span-2 flex justify-center border border-slate-950 p-1 pt-3 text-xl font-bold uppercase">
        Makes
      </div>
      <div className="col-span-2 row-span-2 grid grid-cols-2 border-slate-950">
        {boundary.needs.length === 0 && (
          <div className="col-span-2 border border-slate-950"></div>
        )}
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
        {boundary.makes.length === 0 && (
          <div className="col-span-2 border border-slate-950"></div>
        )}
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
            <div className="group col-span-2 flex justify-between items-center border border-slate-950 p-2 font-semibold">
              <span className="invisible group-hover:visible group-hover:bg-red-100 p-1 cursor-pointer text-red-500">
                Delete
              </span>
              <span>{recipe.name}</span>
            </div>
            <div className="group flex items-center gap-8 flex-row col-span-2 border border-slate-950 p-2 font-semibold">
              <span>x{count}</span>
              <div className="flex gap-4">
                <span className="invisible group-hover:visible cursor-pointer border-2 border-transparent hover:border-slate-950 px-2">
                  -
                </span>
                <span className="invisible group-hover:visible cursor-pointer border-2 border-transparent hover:border-slate-950 px-2">
                  +
                </span>
              </div>
            </div>
          </React.Fragment>
        )
      })}
      <div className="col-span-4 border border-slate-950 p-2">
        <AddRecipe />
      </div>
    </div>
  )
}

/**
 * TODO
 * - [ ] edit pool name
 * - [ ] add/remove recipe in pool
 * - [ ] combine pools: shows the makes/needs of pools, taken together (emulates trains)
 * - [ ] upload recipes json
 */

export default function Index() {
  const [, { undo, redo }] = useHistory()
  const dispatch = useDispatch()
  const onAddPoolClick = React.useCallback(() => {
    dispatch({
      type: 'create-pool',
      poolId: makeId(),
      pool: { name: 'New Pool', recipesManufactured: [] },
    })
  }, [dispatch])

  const [db] = useAtom(DBAtom)

  const { isLoading, error, data } = db.useQuery({ pools: {} })
  if (error) {
    console.error(error)
  }
  return (
    <div className="flex h-screen pt-16 relative bg-repeat heropattern-graphpaper-gray-300">
      <div className="absolute top-5 w-full flex justify-center">
        <div className="bg-white flex items-center gap-4 px-2 py-1 border-2 border-slate-950 font-mono">
          <div
            className="cursor-pointer border border-transparent p-1 hover:border-slate-950"
            onClick={undo}
          >
            <Undo />
          </div>
          <div
            className="cursor-pointer border border-transparent p-1 hover:border-slate-950"
            onClick={redo}
          >
            <Redo />
          </div>
          <div
            className="cursor-pointer border border-transparent p-1 hover:border-slate-950"
            onClick={onAddPoolClick}
          >
            + Add Pool
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-16 p-4">
        {isLoading && 'Loading...'}
        {error && `Error: ${error}`}
        {data &&
          data.pools.map(
            (pool) => !pool.deleted && <PoolCard key={pool.id} pool={pool.pool} />
          )}
        {/* <AddPool /> */}
      </div>
    </div>
  )
}
