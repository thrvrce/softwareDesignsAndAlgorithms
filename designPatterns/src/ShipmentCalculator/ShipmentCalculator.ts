export class ShipmentCalculatorByWeight {
  constructor(private costByWeight: number) {}

  public calculateShipmentCost(shipmentWeight: number): number {
    return this.costByWeight * shipmentWeight
  }
}