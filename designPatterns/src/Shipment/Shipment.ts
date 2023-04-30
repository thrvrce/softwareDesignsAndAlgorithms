import { ShipmentCalculatorStrategy } from "../ShipmentCalculator/ShipmentCalculator";
import {
  AirWestShipment,
  ChicagoSpiritShipment,
  PacificParcelShipment ,
} from "../ShipmentCompany/ShipmentCompany";
import { IdGenerator } from "../utils/IdGenerator";
import { ShipmentConfig } from "./Shipment.types";

const chicagoSpiritZipCodes = [4, 5, 6];
const pacificParcelZipCodes = [7, 8, 9];

export class Shipment {
  private static idGenerator = IdGenerator.getInstance();

  public static getInstance(shipmentConfig: ShipmentConfig): Shipment {
    if (shipmentConfig.shipmentId === 0) {
      return new Shipment({...shipmentConfig, shipmentId: this.idGenerator.getUniqueId()});
    }

    return new Shipment(shipmentConfig);
  }

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
    const zipCodeFirstNumber = Number(this.fromZipCode[0])
    const shipmentCalculatorContext = new ShipmentCalculatorStrategy()

    if(chicagoSpiritZipCodes.includes(zipCodeFirstNumber) ) {
      shipmentCalculatorContext.setStrategy(new ChicagoSpiritShipment())
    } else if (pacificParcelZipCodes.includes(zipCodeFirstNumber)) {
      shipmentCalculatorContext.setStrategy(new PacificParcelShipment())
    } else {
      shipmentCalculatorContext.setStrategy(new AirWestShipment())
    }

    const shipmentCost = shipmentCalculatorContext.calculateShipmentCost(this.weight);

    return `shipment ID: ${this.shipmentId}; from address: ${this.fromAddress}; to address: ${this.toAddress}; shipment cost: ${shipmentCost}`;
  }
}
