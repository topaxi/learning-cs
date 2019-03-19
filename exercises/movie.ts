interface Movie { name: string; start: number; end: number }

let movies: Movie[] = [
  { name: "The Predident's Algorist", start: 1, end: 6 },
  { name: '"Discrete" Mathematics', start: 2, end: 4 },
  { name: 'Tarjan of the Jungle', start: 3, end: 8 },
  { name: 'Halting State', start: 5, end: 9 },
  { name: "Steiner's Tree", start: 7, end: 11 },
  { name: 'The Four Volume Problem', start: 10, end: 16 },
  { name: 'Programming Challenges', start: 12, end: 14 },
  { name: 'Process Terminated', start: 13, end: 17 },
  { name: 'Calculated Bets', start: 15, end: 18 }
]

function schedule(movies: Movie[]): Movie[] {
  return movies
    .sort((a, b) => a.end - b.end)
    .reduce((scheduled: Movie[], movie, i) => {
      if (i === 0 || movie.start >= scheduled[scheduled.length - 1].end) {
        scheduled.push(movie)
      }

      return scheduled
    }, [])
}

console.log(schedule(movies))
