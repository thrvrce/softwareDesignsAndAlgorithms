import { Shipment } from "../Shipment/Shipment";

export class Client {
  ship(shipment: Shipment ) {
    console.log(shipment.ship())
  }
}