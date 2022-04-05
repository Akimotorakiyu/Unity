export function compareDeep(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true
  }

  if (!(a && typeof a == 'object') || !(b && typeof b == 'object')) {
    return false
  }

  const aIsArray = Array.isArray(a)
  const bIsArray = Array.isArray(b)

  if (aIsArray !== bIsArray) {
    return false
  }

  if (aIsArray && bIsArray) {
    if (a.length != b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!compareDeep(a[i], b[i])) return false
    }
  }

  for (const p in a) {
    if (
      !(p in b) ||
      !compareDeep(
        (a as Record<string, unknown>)[p],
        (b as Record<string, unknown>)[p],
      )
    ) {
      return false
    }
  }

  for (let p in b) {
    if (!(p in a)) return false
  }
  return true
}
