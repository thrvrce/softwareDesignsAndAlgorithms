import { Client } from "./src/CLient/Cllient";
import { Shipment } from "./src/Shipment/Shipment";

const shipmentConfig = {
  'fromAddress': 'addr 1',
  'fromZipCode': '12',
  'shipmentId': 0,
  'toAddress': 'adddr 2',
  'toZipCode': '321',
  'weight': 123
}

const shipment1 = Shipment.getInstance(shipmentConfig)
const shipment2 = Shipment.getInstance({...shipmentConfig, fromZipCode: '23'})
const shipment3 = Shipment.getInstance({...shipmentConfig, fromZipCode: '56'})
const shipment4 = Shipment.getInstance({...shipmentConfig, fromZipCode: '90'})
const shipment5 = Shipment.getInstance({...shipmentConfig, fromZipCode: '0'})
const shipment6 = Shipment.getInstance({...shipmentConfig, fromZipCode: ''})

const client = new Client()

client.ship(shipment1)
client.ship(shipment2)
client.ship(shipment3)
client.ship(shipment4)
client.ship(shipment5)
client.ship(shipment6)