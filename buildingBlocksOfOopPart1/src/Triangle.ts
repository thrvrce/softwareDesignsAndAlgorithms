import { Point } from "./Point";
import { Shape } from "./Shape";

export class Triangle extends Shape{
  constructor(pointA: Point, pointB: Point, pointC: Point );
  constructor(pointA: Point, pointB: Point, pointC: Point , color: string, filled: boolean)
  constructor(pointA: Point, pointB: Point, pointC: Point , color?: string, filled?: boolean) {
    if(color && filled) {
      super([pointA, pointB, pointC ], color, filled)
    } else {
      super([pointA, pointB, pointC ])
    }
  }

  toString() {
    const triangleListText = this.points.map((point, index) => `v${index+1}=${point.toString()}`).join(',');
    const triangleString = `Triangle[${triangleListText}]`

    return triangleString;
  }

  getType () {
    const round = (number: number) => Math.round(number * 1000) / 1000
    const [pointA, pointB, pointC] = this.points
    const sideABlength = round(pointA.distance(pointB))
    const sideAClength = round(pointA.distance(pointC))
    const sideBClength = round(pointB.distance(pointC))

    if (sideABlength === sideAClength && sideAClength === sideBClength) {
      return "equilateral triangle"
    }

    if ( sideABlength === sideAClength ||sideAClength === sideBClength ||sideBClength === sideABlength) {
        return "isosceles triangle"
    }

    return 'scalene triangle'
    }
}