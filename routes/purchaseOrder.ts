import { Router } from 'express'
import PurchaseOrderController from '../controllers/purchaseOrder'
// import AuthMiddleware from '../middlewares/auth'

const router = Router()
// const auth = new AuthMiddleware()
const purchaseOrder = new PurchaseOrderController()

router.post('/create', purchaseOrder.create)

router.post('/search', purchaseOrder.searchPO)

router.get('/:id', purchaseOrder.getPO)

router.get('/', purchaseOrder.getAllPOs)

export default router
