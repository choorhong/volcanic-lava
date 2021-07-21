import { Router } from 'express'
import ShipmentController from '../controllers/shipment'

const router = Router()
// const auth = new AuthMiddleware()
const shipment = new ShipmentController()

router.post('/create', shipment.create)

router.post('/edit', shipment.editShipment)

router.delete('/delete', shipment.deleteShipment)

router.get('/:id', shipment.getShipment)

router.get('/', shipment.getAllShipments)

export default router
