import { IShipmentCalculator } from "../ShipmentCalculator/ShipmentCalculator"

export class ShipmentCompany implements IShipmentCalculator{
  private static chicagoSpiritZipCodes = [4, 5, 6]
  private static pacificParcelZipCodes = [7, 8, 9]

  public static getInstanceByZipCode(zipCode: string): ShipmentCompany {
    const zipCodeFirstNumber = Number(zipCode[0])


    if(ShipmentCompany.chicagoSpiritZipCodes.includes(zipCodeFirstNumber) ) {
      return new ShipmentCompany('Chicago Sprint', 0.42)
    }

    if(ShipmentCompany.pacificParcelZipCodes.includes(zipCodeFirstNumber)) {
      return new ShipmentCompany('Pacific Parcel', 0.51)
    }

    return new ShipmentCompany('Air East', 0.39)
  }

  private constructor(public readonly companyName: string, private costByWeight: number) {}

  public getCost(shipmentWeight: number): number {
    return this.costByWeight * shipmentWeight
  }
}