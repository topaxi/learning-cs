import { GraphVertex } from '../../data-structures/graph/graph-vertex'
import { depthFirstSearch } from './depth-first-search'

describe('Graph Depth First Search', () => {
  test('traverses graph depth first', () => {
    let startVertex = new GraphVertex(0)
    let vertex8 = new GraphVertex(8).connect(startVertex)

    startVertex
      .connect(
        new GraphVertex(1)
          .connect(new GraphVertex(2))
          .connect(new GraphVertex(3))
      )
      .connect(new GraphVertex(4))
      .connect(
        new GraphVertex(5)
          .connect(new GraphVertex(6).connect(new GraphVertex(7)))
          .connect(vertex8)
      )

    let path: string[] = []

    depthFirstSearch(startVertex, {
      enterVertex: ({ value }) => path.push(`enter ${value}`),
      leaveVertex: ({ value }) => path.push(`leave ${value}`)
    })

    expect(path).toMatchInlineSnapshot(`
            Array [
              "enter 0",
              "enter 1",
              "enter 2",
              "leave 2",
              "enter 3",
              "leave 3",
              "leave 1",
              "enter 4",
              "leave 4",
              "enter 5",
              "enter 6",
              "enter 7",
              "leave 7",
              "leave 6",
              "enter 8",
              "leave 8",
              "leave 5",
              "leave 0",
            ]
        `)
  })

  test('should stop traversing on found vertex', () => {
    let startVertex = new GraphVertex(0)
    let vertex8 = new GraphVertex(8).connect(startVertex)

    startVertex
      .connect(
        new GraphVertex(1)
          .connect(new GraphVertex(2))
          .connect(new GraphVertex(3))
      )
      .connect(new GraphVertex(4))
      .connect(
        new GraphVertex(5)
          .connect(new GraphVertex(6).connect(new GraphVertex(7)))
          .connect(vertex8)
      )

    let path: string[] = []

    let vertex = depthFirstSearch(startVertex, {
      find: ({ value }) => value === 4,
      enterVertex: ({ value }) => path.push(`enter ${value}`),
      leaveVertex: ({ value }) => path.push(`leave ${value}`)
    })

    expect(vertex!.value).toBe(4)

    expect(path).toMatchInlineSnapshot(`
      Array [
        "enter 0",
        "enter 1",
        "enter 2",
        "leave 2",
        "enter 3",
        "leave 3",
        "leave 1",
        "enter 4",
      ]
    `)
  })
})
