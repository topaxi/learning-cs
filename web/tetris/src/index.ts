import { Game } from './game'

Game.start()

window.addEventListener('load', () =>
  navigator.serviceWorker.register('/tetris/sw.js', {
    scope: '/tetris/',
  })
)
