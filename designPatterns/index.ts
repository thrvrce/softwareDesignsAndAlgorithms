import { Client } from "./src/CLient/Cllient";
import { Shipment } from "./src/Shipment/Shipment";

const shipment = Shipment.getInstance({
  'fromAddress': 'addr 1',
  'fromZipCode': '123',
  'shipmentId': 0,
  'toAddress': 'adddr 2',
  'toZipCode': '321',
  'weight': 123
})

const client = new Client()

client.ship(shipment)