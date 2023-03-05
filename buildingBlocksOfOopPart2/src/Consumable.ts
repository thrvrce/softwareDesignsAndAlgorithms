import { Item } from "./Item";

export abstract class Consumable extends Item {
  public isConsumed: boolean = false;
  private _isSpoiled: boolean;

  constructor(name: string, value: number, weight: number, isSpoiled = false) {
    super(name, value, weight);

    this._isSpoiled = isSpoiled;
  }

  public isSpoiled() {
    return this._isSpoiled;
  }
  use(): string {
    if (this.isConsumed) {
      return `There's nothing left of the ${this.name} to consume.`;
    } else {
      const defaultMessage = `You consumed the ${this.name}.`;
      if (this._isSpoiled) {
        return defaultMessage + "\nYou feel sick.";
      }

      return defaultMessage;
    }
  }
}
