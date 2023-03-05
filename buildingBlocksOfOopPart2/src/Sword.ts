import { Weapon } from "./Weapon";

export class Sword extends Weapon {
  constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
    super("sword", baseDamage, baseDurability, value, weight);
  }

  public polish(): void {
    const damageModifierNewValue = this.damageModifier + Sword.MODIFIER_CHANGE_RATE;
    const damageModifierNewRoundedValue = Math.round(damageModifierNewValue * 100) / 100

    if ((this.baseDamage + damageModifierNewRoundedValue) <= (this.baseDamage * 1.25)) {
      this.damageModifier = damageModifierNewRoundedValue;
    }
  }
}
