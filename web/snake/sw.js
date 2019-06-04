const CACHE = 'snake-assets'

self.addEventListener('install', event => {
  event.waitUntil(precache())
})

self.addEventListener('fetch', async event => {
  event.respondWith(fromCache(event.request))

  await event.waitUntil(update(event.request))
})

async function precache() {
  let cache = await caches.open(CACHE)
  return await cache.addAll(['game.ce49b8ae.js', '/'])
}

async function fromCache(request) {
  let cache = await caches.open(CACHE)
  return await cache.match(request)
}

async function update(request) {
  let cache = await caches.open(CACHE)
  let response = await fetch(request)

  if (response.type === 'opaque') return response

  try {
    await cache.put(request, response.clone())
  } catch (error) {
    console.warn(error)
    return response
  }
}
