import { self, precache, fromCache, update } from '../sw/utils'

const CACHE = 'tetris-assets'

self.addEventListener('install', (event: any) => {
  event.waitUntil(precache(CACHE, ['/']))
})

self.addEventListener('fetch', (event: any) => {
  event.respondWith(fromCache(CACHE, event.request))

  event.waitUntil(update(CACHE, event.request))
})
