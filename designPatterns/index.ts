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
const shipment21 = Shipment.getInstance({...shipmentConfig, fromZipCode: '23', weight: 2})
const shipment22 = Shipment.getInstance({...shipmentConfig, fromZipCode: '23'})
const shipment23 = Shipment.getInstance({...shipmentConfig, fromZipCode: '23', weight: 190})
const shipment31 = Shipment.getInstance({...shipmentConfig, fromZipCode: '56', weight: 2})
const shipment32 = Shipment.getInstance({...shipmentConfig, fromZipCode: '56'})
const shipment33 = Shipment.getInstance({...shipmentConfig, fromZipCode: '56', weight: 190})
const shipment41 = Shipment.getInstance({...shipmentConfig, fromZipCode: '90', weight: 2})
const shipment42 = Shipment.getInstance({...shipmentConfig, fromZipCode: '90'})
const shipment43 = Shipment.getInstance({...shipmentConfig, fromZipCode: '90', weight: 190})
const shipment51 = Shipment.getInstance({...shipmentConfig, fromZipCode: '0', weight: 2})
const shipment52 = Shipment.getInstance({...shipmentConfig, fromZipCode: '0'})
const shipment53 = Shipment.getInstance({...shipmentConfig, fromZipCode: '0', weight: 190})
const shipment61 = Shipment.getInstance({...shipmentConfig, fromZipCode: '', weight: 2})
const shipment62 = Shipment.getInstance({...shipmentConfig, fromZipCode: ''})
const shipment63 = Shipment.getInstance({...shipmentConfig, fromZipCode: '', weight: 190})

const client = new Client()

client.ship(shipment1)
client.ship(shipment21)
client.ship(shipment22)
client.ship(shipment23)
client.ship(shipment31)
client.ship(shipment32)
client.ship(shipment33)
client.ship(shipment41)
client.ship(shipment42)
client.ship(shipment43)
client.ship(shipment51)
client.ship(shipment52)
client.ship(shipment53)
client.ship(shipment61)
client.ship(shipment62)
client.ship(shipment63)