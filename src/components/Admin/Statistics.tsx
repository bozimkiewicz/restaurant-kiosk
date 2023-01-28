import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

interface IStats {
    orders: number, orders_total: number,
    cash: number, cash_total: number,
    card: number, card_total: number,
    in: number, in_total: number,
    out: number, out_total: number
}

const Statistics = () => {

    const [by, setBy] = useState<string>('day')

    return (
        <div>
            <h4>Statistics</h4>
            <div>
                <button onClick={() => setBy('day')}>Dzienne</button>
                <button onClick={() => setBy('month')}>Miesięczne</button>
            </div>
            {by === 'day' && <DailyStats />}
            {by === 'month' && <MonthlyStats />}
        </div>
    )
}

const DailyStats = () => {

    const [stats, setStats] = useState<IStats | null>(null)
    const [date, setDate] = useState<{ month: number, year: number, day: number } | null>(null)

    const fetchStats = (date: { day: number, month: number, year: number }) => {
        setDate(date)
        fetch(`http://localhost:3000/orders/day/${date.year}/${date.month}/${date.day}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setStats(data))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h4>Daily</h4>
            <Formik
                initialValues={{
                    day: 0,
                    month: 0,
                    year: 0
                }}
                onSubmit={values => fetchStats(values)}
            >
                <Form>
                    <label htmlFor='day'>Day</label>
                    <Field type='number' name='day' />
                    <label htmlFor='month'>Month</label>
                    <Field type='number' name='month' />
                    <label htmlFor='year'>Year</label>
                    <Field type='number' name='year' />

                    <button type='submit' >Szukaj</button>
                </Form>
            </Formik>
            {stats && date && <Stats data={stats} date={date} />}
        </div>
    )
}

const MonthlyStats = () => {

    const [stats, setStats] = useState<IStats | null>(null)
    const [date, setDate] = useState<{ month: number, year: number } | null>(null)

    const fetchStats = (date: { month: number, year: number }) => {
        setDate(date)
        fetch(`http://localhost:3000/orders/month/${date.year}/${date.month}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setStats(data))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h4>Monthly</h4>
            <Formik
                initialValues={{
                    month: 0,
                    year: 0
                }}
                onSubmit={values => fetchStats(values)}
            >
                <Form>
                    <label htmlFor='month'>Month</label>
                    <Field type='number' name='month' />
                    <label htmlFor='year'>Year</label>
                    <Field type='number' name='year' />

                    <button type='submit' >Szukaj</button>
                </Form>
            </Formik>
            {stats && date && <Stats data={stats} date={date} />}
        </div>
    )
}

const Stats = (props: { data: IStats, date: { year: number, month: number, day?: number } }) => {

    return (
        <div>
            <h3>Statystki z {props.date.year}/{props.date.month}{props.date.day ? `/${props.date.day}` : ''}</h3>
            <h4>Liczba zamówień: {props.data.orders}</h4>
            <h4>Całkowite zarobki: {props.data.orders_total}</h4>
            <h4>Liczba zamówień opłaconych kartą: {props.data.card}</h4>
            <h4>Całkowite zarobki opłacone kartą: {props.data.card_total}</h4>
            <h4>Liczba zamówień opłaconych gotówką: {props.data.cash}</h4>
            <h4>Całkowite zarobki opłaconych gotówką: {props.data.cash_total}</h4>
            <h4>Liczba zamówień na wynos: {props.data.out}</h4>
            <h4>Całkowite zarobki na wynos: {props.data.out_total}</h4>
            <h4>Liczba zamówień na miejscu: {props.data.in}</h4>
            <h4>Całkowite zarobki na miejscu: {props.data.in_total}</h4>
        </div>
    )
}

export default Statistics