export class Point {
  static equal(pointA: Point, pointB: Point) {
    return pointA.x === pointB.x && pointA.y === pointB.y
  }

  constructor(public x: number, public y: number) {}
}
