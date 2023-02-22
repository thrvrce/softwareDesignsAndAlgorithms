export class Point {
  x: number;
  y: number;

  constructor();
  constructor(x: number, y: number);
  constructor(x?: number, y?: number) {
      this.x= x === undefined ? 0 : x;
      this.y = y === undefined ? 0 : y;
  }

  toString () {
    return `(${this.x}, ${this.y})`
  }

  distance();
  distance(other: Point);
  distance(x: number, y: number);
  distance(...args: [Point] | [number, number] | [never]) {
    const {x: Xa, y: Ya} = this
    let Xb: number, Yb: number;

    if (args[0] instanceof Point) {
      Xb = args[0].x
      Yb = args[0].y
    } else if (typeof args[0] === 'number' && typeof args[1] === 'number') {
      Xb = args[0]
      Yb = args[1]
    } else {
      Xb = 0
      Yb = 0
    }

    return Math.sqrt(((Xb -Xa)**2) + ((Yb - Ya)**2))
  }
}

