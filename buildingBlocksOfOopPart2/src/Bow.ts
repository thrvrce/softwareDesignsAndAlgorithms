import { Weapon } from "./Weapon";

export class Bow extends Weapon {
  constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
    super("bow", baseDamage, baseDurability, value, weight);
  }

  public polish(): void {
    const durabilityModifierNewValue = this.durabilityModifier + Bow.MODIFIER_CHANGE_RATE;

    if ((this.getEffectiveDurability(durabilityModifierNewValue)) <= 1) {
      this.durabilityModifier = durabilityModifierNewValue;
    }
  }
}
