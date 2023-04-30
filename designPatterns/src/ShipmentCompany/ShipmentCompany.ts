import { IShipmentCalculator } from "../ShipmentCalculator/ShipmentCalculator"

class ShipmentCompany implements IShipmentCalculator{
  constructor(private letterCostByWeight: number, private packageCostByWeight: number) {}

  public getCost(shipmentWeight: number): number {
    if (shipmentWeight <= 15) {
      return shipmentWeight * this.letterCostByWeight
    }

    return shipmentWeight * this.packageCostByWeight
  }
}

export class AirWestShipment extends ShipmentCompany {
  private oversizeAdditionCost: number = 10;

  constructor() {
    super(0.39, 0.25)
  }

  public getCost(shipmentWeight: number): number {
    const baseCost  = super.getCost(shipmentWeight);

    if (shipmentWeight <= 160 ) {
      return baseCost
    }

    return baseCost + this.oversizeAdditionCost;
  }

}

export class ChicagoSpiritShipment extends ShipmentCompany {
  constructor() {
    super(0.42, 0.2)
  }
}

export class PacificParcelShipment extends ShipmentCompany {
  private oversizeCostByWeight: number= 0.02;

  constructor() {
    super(0.51, 0.19)
  }

  public getCost(shipmentWeight: number): number {
    const baseCost  = super.getCost(shipmentWeight);

    if (shipmentWeight <= 160 ) {
      return baseCost
    }

    return baseCost + this.oversizeCostByWeight * shipmentWeight;
  }
}

