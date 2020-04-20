import { GraphVertex } from './graph-vertex'
import { GraphEdge } from './graph-edge'

describe('GraphVertex<T>', () => {
  test('should have degree of 0 without edges', () => {
    let v = new GraphVertex('value')

    expect(v.degree).toEqual(0)
  })

  test('should increase degree when adding edges', () => {
    let v = new GraphVertex('value')
    let edge1 = new GraphEdge(v, v)
    let edge2 = new GraphEdge(v, v)

    v.addEdge(edge1)

    expect(v.degree).toEqual(1)

    v.addEdge(edge2)

    expect(v.degree).toEqual(2)
  })

  test('should decrease degree when removing edges', () => {
    let v = new GraphVertex('value')
    let edge1 = new GraphEdge(v, v)
    let edge2 = new GraphEdge(v, v)

    v.addEdge(edge1)
    v.addEdge(edge2)

    expect(v.degree).toEqual(2)
    expect(v.hasEdge(edge1)).toBe(true)
    expect(v.hasEdge(edge2)).toBe(true)

    v.deleteEdge(edge2)

    expect(v.degree).toEqual(1)
    expect(v.hasEdge(edge1)).toBe(true)
    expect(v.hasEdge(edge2)).toBe(false)

    v.deleteEdge(edge1)

    expect(v.degree).toEqual(0)
    expect(v.hasEdge(edge1)).toBe(false)
    expect(v.hasEdge(edge2)).toBe(false)
  })

  test('should implement toString', () => {
    let v = new GraphVertex(0)

    expect(v.toString()).toEqual('0')
  })

  test('should implement toJSON', () => {
    let v0 = new GraphVertex(0)
    let v1 = new GraphVertex(1)

    v0.addEdge(new GraphEdge(v0, v1))

    expect(v0).toMatchInlineSnapshot(`
      Object {
        "edges": Array [
          Object {
            "endVertex": Object {
              "edges": Array [],
              "value": 1,
            },
            "startVertex": [Circular],
            "weight": 0,
          },
        ],
        "value": 0,
      }
    `)
  })
})
