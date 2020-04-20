export async function precache(cacheName: string, assets: RequestInfo[]) {
  let cache = await caches.open(cacheName)
  return await cache.addAll(assets)
}

export async function fromCache(cacheName: string, request: RequestInfo) {
  let cache = await caches.open(cacheName)
  return await cache.match(request)
}

export async function update(cacheName: string, request: RequestInfo) {
  let cache = await caches.open(cacheName)
  let response = await fetch(request)

  if (response.type === 'opaque') return response

  try {
    await cache.put(request, response.clone())
  } catch (error) {
    // eslint-disable-next-line
    console.warn(error)
    return response
  }
}
