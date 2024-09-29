import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function NOOP() {}

export function assertNever(n: never): never {
  throw new Error(`expected never, got: ${JSON.stringify(n)}`)
}
