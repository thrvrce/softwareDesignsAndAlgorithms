import { Comparable } from "./Comparable";
import { transformNumberToString } from "./utils";

export abstract class Item implements Comparable<Item> {
  public static idCounter: number = 0;
  public static resetIdCounter(): void {
    this.idCounter = 0;
  }

  private readonly id: number;

  constructor(readonly name: string, public value: number, public weight: number) {
    this.id = ++Item.idCounter;
  }

  compareTo(other: Item): number {
    if (this.value < other.value) {
      return -1;
    } else if (this.value > other.value) {
      return 1;
    } else {
      const thisNameLowerCase = this.name.toLowerCase();
      const otherNameLowerCase = other.name.toLowerCase();

      if (thisNameLowerCase < otherNameLowerCase) {
        return -1;
      } else if (thisNameLowerCase > otherNameLowerCase) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  toString(): string {
    return `${this.name} − Value: ${transformNumberToString(this.value)}, Weight: ${transformNumberToString(
      this.weight
    )}`;
  }

  getId(): number {
    return this.id;
  }

  abstract use(): void;
}

declare const a: Item;
