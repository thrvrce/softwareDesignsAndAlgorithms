import { Point } from "./Point";

export abstract class Shape {
  protected color: string;
  protected filled: boolean;
  protected points: Point[];

  constructor(points: Point[]);
  constructor(points: Point[], color: string, filled: boolean);
  constructor(points: Point[], color?: string, filled?: boolean) {
    if(points.length < 3) {
      throw new Error(`[Points constructor]: received ${points.length} points, when minimum 3 points is required`)
    }

    if(color !== undefined && filled !== undefined) {
      this.color = color
      this.filled = filled;
    } else {
      this.color = 'green'
      this.filled = true;
    }

    this.points = points
  }

  toString() {
    const filledText = this.filled ? 'filled' : 'not filled';
    const pointsListText = this.points.map(point => point.toString()).join(', ');
    const shapeString = `A Shape with color of ${this.color} and ${filledText}. Points: ${pointsListText}.`

    return shapeString;
  }

  getPerimeter() {
    let perimeter: number = 0;
    const points = [...this.points, this.points[0]]

    for(let i = 0; i < points.length; i++) {
      const currentPoint = points[i];
      const nextPoint = points[i + 1];

      perimeter += currentPoint.distance(nextPoint)
    }

    return perimeter;
  }

  abstract getType(): string;
}
