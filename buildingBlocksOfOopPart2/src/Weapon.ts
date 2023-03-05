import { Item } from "./Item";
import { transformNumberToString } from "./utils";

export abstract class Weapon extends Item {
  public static MODIFIER_CHANGE_RATE: number = 0.05;
  protected baseDamage: number;
  protected damageModifier: number = 0;
  private baseDurability: number;
  protected durabilityModifier: number = 0;

  constructor(name: string, baseDamage: number, baseDurability: number, value: number, weight: number) {
    super(name, value, weight);

    this.baseDamage = baseDamage;
    this.baseDurability = baseDurability;
  }

  public use(): string {
    if (!this.getEffectiveDurability()) {
      return `You can't use the ${this.name}, it is broken.`;
    }

    if (this.baseDurability) {
      this.baseDurability -= Weapon.MODIFIER_CHANGE_RATE;
    } else if (this.durabilityModifier) {
      this.durabilityModifier -= Weapon.MODIFIER_CHANGE_RATE;
    }

    const useMessage = `You use the ${this.name}, dealing ${this.getEffectiveDamage()} points of damage.`;

    if (this.getEffectiveDurability()) {
      return useMessage;
    } else {
      return useMessage + `\nThe ${this.name} breaks.`;
    }
  }


  public toString(): string {
    const valueString = transformNumberToString(this.value);
    const weightString = transformNumberToString(this.weight);
    console.log('dmg')
    const damageString = transformNumberToString(this.getEffectiveDamage());
    const durabilityString = transformNumberToString(this.getEffectiveDurability() * 100);
    console.log(damageString)
    return `${this.name} − Value: ${valueString}, Weight: ${weightString}, Damage: ${damageString}, Durability: ${durabilityString}%`;
  }

  public getEffectiveDamage(): number {
    return this.baseDamage + this.damageModifier;
  }

  public getEffectiveDurability(durabilityModifier?: number): number {
    return this.baseDurability + (durabilityModifier || this.durabilityModifier);
  }

  public abstract polish(): void;
}
