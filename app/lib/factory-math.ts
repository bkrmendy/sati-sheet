export interface MaterialQuantity {
  material: string
  quantity: number
}

export interface Recipe {
  name: string
  inputs: MaterialQuantity[]
  outputs: MaterialQuantity[]
}

export interface Pool {
  recipesManufactured: Recipe[]
}

export interface PoolBoundary {
  needs: MaterialQuantity[]
  makes: MaterialQuantity[]
}

interface MultiMaterialQuantity {
  [material: string]: number
}

function toMultiMaterialQuantity(quantities: MaterialQuantity[]): MultiMaterialQuantity {
  const result: Record<string, number> = {}
  for (const { material, quantity } of quantities) {
    if (result[material] == null) {
      result[material] = 0
    }

    result[material] += quantity
  }

  return result
}

function toMaterialQuantity(multi: MultiMaterialQuantity): MaterialQuantity[] {
  return Object.entries(multi).map(([material, quantity]) => ({ material, quantity }))
}

function difference(
  from: MultiMaterialQuantity,
  toSubtract: MultiMaterialQuantity
): MultiMaterialQuantity {
  const result = { ...from }
  Object.entries(toSubtract).forEach(([material, quantity]) => {
    if (result[material] == null) {
      return
    }
    result[material] = result[material] - quantity
  })
  return result
}

function clampMaterialQuantity(multi: MultiMaterialQuantity) {
  return Object.entries(multi).reduce(
    (acc, [material, quantity]) =>
      quantity <= 0 ? acc : { ...acc, [material]: quantity },
    {}
  )
}

export function calculatePoolBoundary(pool: Pool): PoolBoundary {
  const needed = toMultiMaterialQuantity(
    pool.recipesManufactured.flatMap((r) => r.inputs)
  )
  const produced = toMultiMaterialQuantity(
    pool.recipesManufactured.flatMap((r) => r.outputs)
  )

  const leftOvers = clampMaterialQuantity(difference(produced, needed))
  const required = clampMaterialQuantity(difference(needed, produced))

  return { makes: toMaterialQuantity(leftOvers), needs: toMaterialQuantity(required) }
}
