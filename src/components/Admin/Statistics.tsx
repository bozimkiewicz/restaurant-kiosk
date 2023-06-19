import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";

interface IStats {
  orders: number;
  orders_total: number;
  cash: number;
  cash_total: number;
  card: number;
  card_total: number;
  in: number;
  in_total: number;
  out: number;
  out_total: number;
}

const Statistics = () => {
  const [by, setBy] = useState<string>("day");

  return (
    <div>
      <h4>Statystyki</h4>
      <div>
        <button className="mr-3" onClick={() => setBy("day")}>Dzienne</button>
        <button onClick={() => setBy("month")}>Miesięczne</button>
      </div>
      {by === "day" && <DailyStats />}
      {by === "month" && <MonthlyStats />}
    </div>
  );
};

const DailyStats = () => {
  const [stats, setStats] = useState<IStats | null>(null);
  const [date, setDate] = useState<{
    month: number;
    year: number;
    day: number;
  } | null>(null);

  const { keycloak } = useKeycloak();

  const fetchStats = (date: { day: number; month: number; year: number }) => {
    setDate(date);
    fetch(
      `http://localhost:3000/orders/day/${date.year}/${date.month}/${date.day}`,
      {
        method: "GET",
        headers: {
        Authorization: "Bearer " + keycloak.token,
        },
      },
    )
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h4>Dziennie</h4>
      <Formik
        initialValues={{
          day: 0,
          month: 0,
          year: 0,
        }}
        onSubmit={(values) => fetchStats(values)}
      >
        <Form className="inline-block">
          <label htmlFor="day">Dzień</label>
          <Field
            className="mb-3 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="number"
            name="day"
          />
          <label htmlFor="month">Miesiąc</label>
          <Field
            className="mb-3 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="number"
            name="month"
          />
          <label htmlFor="year">Rok</label>
          <Field
            className="mb-3 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="number"
            name="year"
          />

          <button className="bg-my-orange-100" type="submit">
            Szukaj
          </button>
        </Form>
      </Formik>
      {stats && date && <Stats data={stats} date={date} />}
    </div>
  );
};

const MonthlyStats = () => {
  const [stats, setStats] = useState<IStats | null>(null);
  const [date, setDate] = useState<{ month: number; year: number } | null>(
    null
  );

  const { keycloak } = useKeycloak();

  const fetchStats = (date: { month: number; year: number }) => {
    setDate(date);
    fetch(`http://localhost:3000/orders/month/${date.year}/${date.month}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + keycloak.token,
      },
    })
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h4>Miesięcznie</h4>
      <Formik
        initialValues={{
          month: 0,
          year: 0,
        }}
        onSubmit={(values) => fetchStats(values)}
      >
        <Form className="inline-block">
          <label htmlFor="month">Miesiąc</label>
          <Field
            className="mb-3 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            type="number"
            name="month"
          />
          <label htmlFor="year">Rok</label>
          <Field
            className="mb-3 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            type="number"
            name="year"
          />

          <button className="bg-my-orange-100" type="submit">
            Szukaj
          </button>
        </Form>
      </Formik>
      {stats && date && <Stats data={stats} date={date} />}
    </div>
  );
};

const Stats = (props: {
  data: IStats;
  date: { year: number; month: number; day?: number };
}) => {
  return (
    <div>
      <h3 className="m-5 text-2xl">
        Statystki z {props.date.year}/{props.date.month}
        {props.date.day ? `/${props.date.day}` : ""}
      </h3>
      <h4 className="p-3">Liczba zamówień: {props.data.orders}</h4>
      <h4>Całkowite zarobki: {props.data.orders_total.toFixed(2)} zł</h4>
      <h4 className="border-solid border-t-2 border-t-my-orange-200 mt-3 p-3">Liczba zamówień opłaconych kartą: {props.data.card}</h4>
      <h4>Całkowite zarobki opłacone kartą: {props.data.card_total.toFixed(2)} zł</h4>
      <h4 className="border-solid border-t-2 border-t-my-orange-200 mt-3 p-3">Liczba zamówień opłaconych gotówką: {props.data.cash}</h4>
      <h4>Całkowite zarobki opłaconych gotówką: {props.data.cash_total.toFixed(2)} zł</h4>
      <h4 className="border-solid border-t-2 border-t-my-orange-200 mt-3 p-3">Liczba zamówień na wynos: {props.data.out}</h4>
      <h4>Całkowite zarobki na wynos: {props.data.out_total.toFixed(2)} zł</h4>
      <h4 className="border-solid border-t-2 border-t-my-orange-200 mt-3 p-3">Liczba zamówień na miejscu: {props.data.in}</h4>
      <h4>Całkowite zarobki na miejscu: {props.data.in_total.toFixed(2)} zł</h4>
    </div>
  );
};

export default Statistics;
