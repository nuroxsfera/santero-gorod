/** Normalize Russian text for search (ё→е, lower, trim, collapse spaces). */
export function normalizeSearchText(input: string): string {
  return input
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/\s+/g, " ")
    .trim();
}

/** Simple Levenshtein distance for typo tolerance on short queries. */
export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = b[i - 1] === a[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[b.length][a.length];
}

export function matchesQuery(
  nameNormalized: string,
  aliases: string[],
  queryNorm: string
): { hit: boolean; score: number } {
  if (!queryNorm) return { hit: false, score: 0 };

  if (nameNormalized === queryNorm) return { hit: true, score: 1000 };
  if (nameNormalized.startsWith(queryNorm)) return { hit: true, score: 900 };
  if (nameNormalized.includes(queryNorm)) return { hit: true, score: 700 };

  for (const a of aliases) {
    const an = normalizeSearchText(a);
    if (an === queryNorm) return { hit: true, score: 850 };
    if (an.startsWith(queryNorm)) return { hit: true, score: 750 };
    if (an.includes(queryNorm)) return { hit: true, score: 600 };
  }

  if (queryNorm.length >= 2 && queryNorm.length <= 8) {
    const dist = levenshtein(nameNormalized.slice(0, queryNorm.length + 2), queryNorm);
    if (dist <= 1 && nameNormalized.length <= queryNorm.length + 3) {
      return { hit: true, score: 400 - dist * 50 };
    }
  }

  return { hit: false, score: 0 };
}
