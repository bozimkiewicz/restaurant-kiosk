const { randomUUID } = require("crypto");
const { DateTime } = require("neo4j-driver");
const {
  sendQuery,
  internalErrorHandler,
  driver,
} = require("./driver.controller");

const query1 = (clause) => `MATCH (o: Orders) 
     WHERE ${clause} 
     RETURN count(o) as no_orders, sum(o.total) as total`;

const query2 = (clause) => `MATCH (o: Orders)
    WHERE ${clause} AND o.payment="cash"
    RETURN count(o) as no_orders, sum(o.total) as total`;

const query3 = (clause) => `MATCH (o:Orders)
    WHERE ${clause} AND o.payment="card"
    RETURN count(o) as no_orders, sum(o.total) as total`;

const query4 = (clause) => `MATCH (o:Orders)
    WHERE ${clause} AND o.order_method="na wynos"
    RETURN count(o) as no_orders, sum(o.total) as total`;

const query5 = (clause) => `MATCH (o:Orders)
    WHERE ${clause} AND o.order_method="na miejscu"
    RETURN count(o) as no_orders, sum(o.total) as total`;

const statDayHandler = (req, res) => {
  const year = req.params.year;
  const month = req.params.month;
  const day = req.params.day;

  let clause = `date({year: ${year}, month: ${month}, day: ${day}}) = o.date`;

  const session = driver.session();

  let result = {
    orders: 0,
    orders_total: 0,
    cash: 0,
    cash_total: 0,
    card: 0,
    card_total: 0,
    in: 0,
    in_total: 0,
    out: 0,
    out_total: 0,
  };

  session
    .run(query1(clause))
    .then((data) => {
      result.orders = data.records[0].get("no_orders");
      result.orders_total = data.records[0].get("total");
      return session.run(query2(clause));
    })
    .then((data) => {
      result.cash = data.records[0].get("no_orders");
      result.cash_total = data.records[0].get("total");
      return session.run(query3(clause));
    })
    .then((data) => {
      result.card = data.records[0].get("no_orders");
      result.card_total = data.records[0].get("total");
      return session.run(query4(clause));
    })
    .then((data) => {
      result.out = data.records[0].get("no_orders");
      result.out_total = data.records[0].get("total");
      return session.run(query5(clause));
    })
    .then((data) => {
      result.in = data.records[0].get("no_orders");
      result.in_total = data.records[0].get("total");
    })
    .then(() => res.send(result))
    .catch((err) => console.log(err))
    .then(() => session.close());
};

const statMonthHandler = (req, res) => {
  let year_cur = req.params.year;
  let month_cur = req.params.month;
  let year_next = month_cur === 12 ? year_cur + 1 : year_cur;
  let month_next = month_cur === 12 ? 1 : month_cur + 1;

  let clause = `date({ year: ${year_next}, month: ${month_next}}) > o.date >= date({ year: ${year_cur}, month: ${month_cur}})`;

  const session = driver.session();

  let result = {
    orders: 0,
    orders_total: 0,
    cash: 0,
    cash_total: 0,
    card: 0,
    card_total: 0,
    in: 0,
    in_total: 0,
    out: 0,
    out_total: 0,
  };

  session
    .run(query1(clause))
    .then((data) => {
      result.orders = data.records[0].get("no_orders");
      result.orders_total = data.records[0].get("total");
      return session.run(query2(clause));
    })
    .then((data) => {
      result.cash = data.records[0].get("no_orders");
      result.cash_total = data.records[0].get("total");
      return session.run(query3(clause));
    })
    .then((data) => {
      result.card = data.records[0].get("no_orders");
      result.card_total = data.records[0].get("total");
      return session.run(query4(clause));
    })
    .then((data) => {
      result.out = data.records[0].get("no_orders");
      result.out_total = data.records[0].get("total");
      return session.run(query5(clause));
    })
    .then((data) => {
      result.in = data.records[0].get("no_orders");
      result.in_total = data.records[0].get("total");
    })
    .then(() => res.send(result))
    .catch((err) => console.log(err))
    .then(() => session.close());
};

const newOrderHandler = (req, res) => {
  const order = {
    id: randomUUID(),
    date: DateTime.fromStandardDate(new Date(Date.now())),

    items: req.body.items,
    payment: req.body.payment,
    total: req.body.total,
    order_method: req.body.order_method,
  };

  console.log(order.order_method);

  const query = `CREATE (o: Orders {
            id: "${order.id}", 
            date: date(datetime("${order.date}")), 
            items: "${order.items.length}", 
            payment: "${order.payment}",
            order_method: "${order.order_method}",
            total: ${order.total}
        })
        RETURN o`;

  sendQuery(
    query,
    (data) => res.send(data),
    () => internalErrorHandler(res)
  );
};

module.exports = {
  statDayHandler,
  statMonthHandler,
  newOrderHandler,
};
