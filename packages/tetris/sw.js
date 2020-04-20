import { precache, fromCache, update } from '../sw/utils'

const CACHE = 'tetris-assets'

self.addEventListener('install', event => {
  event.waitUntil(precache(CACHE, ['game.ce49b8ae.js', '/']))
})

self.addEventListener('fetch', async event => {
  event.respondWith(fromCache(CACHE, event.request))

  await event.waitUntil(update(CACHE, event.request))
})
