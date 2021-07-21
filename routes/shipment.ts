import { Router } from 'express'
import ShipmentController from '../controllers/shipment'

const router = Router()
// const auth = new AuthMiddleware()
const shipment = new ShipmentController()

router.post('/create', shipment.create)

router.get('/', shipment.getAllShipments)

export default router
