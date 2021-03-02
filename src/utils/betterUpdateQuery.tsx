import { Cache, QueryInput } from "@urql/exchange-graphcache";

// helper func to make to facilitate casting types, acts as a wrapper
export function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}
