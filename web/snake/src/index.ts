import { Game } from './game'

Game.start()

window.addEventListener('load', () =>
  navigator.serviceWorker.register('/snake/sw.js', {
    scope: '/snake/',
  })
)
