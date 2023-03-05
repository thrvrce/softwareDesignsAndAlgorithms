import { Consumable } from "./Consumable";

export class Pizza extends Consumable {
  public readonly numberOfSlices: number;
  private numberOfEatenSlices: number = 0;

  constructor(value: number, weight: number, isSpoiled: boolean, numberOfSlices: number) {
    super("pizza", value, weight, isSpoiled);

    this.numberOfSlices = numberOfSlices;
  }

  public getNumberOfEatenSlices(): number {
    return this.numberOfEatenSlices;
  }

  use(): string {
    if (this.numberOfSlices - this.getNumberOfEatenSlices()) {
      this.numberOfEatenSlices++;

      return "You consumed a slice of the pizza.";
    } else {
      return "There's nothing left of the pizza to consume.";
    }
  }
}
