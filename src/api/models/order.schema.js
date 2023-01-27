const OrderSchema = {

    payment: {
        in: ['body'],
        errorMessage: 'Payment is wrong',
        isString: true
    },

    order_method: {
        in: ['body'],
        errorMessage: 'order method is wrong',
        isString: true
    },

    items: {
        in: ['body'],
        errorMessage: 'items is worng',
        isString: true
    },

    total: {
        in: ['body'],
        errorMessage: 'total is wrong',
        isDecimal: true
    }
}

const StatDaySchema = {
    day: {
        in: ['param'],
        isDate: true
    }
}

const StatMonthSchema = {
    month: {
        in: ['param'],
        isDate: true
    }
}

module.exports = {
    OrderSchema,
    StatDaySchema,
    StatMonthSchema
}