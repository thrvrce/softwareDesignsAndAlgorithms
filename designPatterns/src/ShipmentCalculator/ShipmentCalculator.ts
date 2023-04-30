export interface IShipmentCalculator {
  getCost(shipmentWeight: number): number;
}

export class ShipmentCalculatorStrategy {
  private strategy: IShipmentCalculator | null = null;

  public setStrategy(strategy: IShipmentCalculator) {
    this.strategy = strategy;
  }

  public calculateShipmentCost(shipmentWeight: number): number {
    if(!this.strategy) {
      throw new Error('ShipmentCalculatorStrategy was not specified')
    }

    return this.strategy.getCost(shipmentWeight)
  }
}