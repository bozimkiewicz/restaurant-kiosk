const express = require('express')
const { checkSchema } = require('express-validator')
const { newOrderHandler, statDayHandler, statMonthHandler } = require('../controllers/order.controller')
const { OrderSchema, StatMonthSchema, StatDaySchema } = require('../models/order.schema')
const resultValidator = require('../util/resultValidator')

const OrderRouter = express.Router()

OrderRouter.get('/day/:date',
    checkSchema(StatDaySchema),
    resultValidator,
    statDayHandler
)

OrderRouter.get('/month/:month',
    checkSchema(StatMonthSchema),
    resultValidator,
    statMonthHandler
)

OrderRouter.post('/',
    checkSchema(OrderSchema),
    resultValidator,
    newOrderHandler
)

module.exports = OrderRouter