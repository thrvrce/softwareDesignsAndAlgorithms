import { ShipmentCalculatorByWeight } from "../ShipmentCalculator/ShipmentCalculator";
import { IdGenerator } from "../utils/IdGenerator";
import { ShipmentConfig } from "./Shipment.types";

export class Shipment {
  private static idGenerator = IdGenerator.getInstance();

  public static getInstance(shipmentConfig: ShipmentConfig): Shipment {
    if (shipmentConfig.shipmentId === 0) {
      return new Shipment({...shipmentConfig, shipmentId: this.idGenerator.getUniqueId()});
    }

    return new Shipment(shipmentConfig);
  }

  private shipmentCalculator = new ShipmentCalculatorByWeight(0.39)
  private shipmentId: number;
  private weight: number;
  public fromAddress: string;
  public fromZipCode: string;
  public toAddress: string;
  public toZipCode: string;

  private constructor(shipmentConfig: ShipmentConfig) {
    this.shipmentId = shipmentConfig.shipmentId;
    this.weight = shipmentConfig.weight;
    this.fromAddress = shipmentConfig.fromAddress;
    this.fromZipCode = shipmentConfig.fromZipCode;
    this.toAddress = shipmentConfig.toAddress;
    this.toZipCode = shipmentConfig.toZipCode;
  }

  public ship(): string {
    const shipmentCost = this.shipmentCalculator.calculateShipmentCost(this.weight);

    return `shipment ID: ${this.shipmentId}; from address: ${this.fromAddress}; to address: ${this.toAddress}; shipment cost: ${shipmentCost}`;
  }
}
