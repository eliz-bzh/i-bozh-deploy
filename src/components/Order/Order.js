import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'querystring';
import { Button, Table, Alert, Form, Row, Col, InputGroup } from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ScrollTop from '../ScrollTop';
import { fetchClients, fetchOrders, setLoad } from '../../redux/actions/ActionFetchData';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '..';

const Order = () => {

    const dispatch = useDispatch();
    const { orders, clients, loading } = useSelector(({ fetchDataReducer }) => fetchDataReducer);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [to, setTo] = useState('');
    const [from, setFrom] = useState('');

    const date = (dateSupply) => {
        var date = new Date(dateSupply);
        return date.toLocaleDateString('en-GB');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            url: `https://i-bozh-server.herokuapp.com/api/Order/excelOrders?${qs.stringify({
                From: event.target.from.value,
                To: event.target.to.value
            })}`,
            method: 'GET',
            responseType: 'blob', // important
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Report.xlsx');
                document.body.appendChild(link);
                link.click();
            })
            .catch(err => {
                setOpen(true);
                setMessage('Ошибка');
                setSeverity('warning');
            });
    }

    const filterList = (rows) => {
        let newList = rows;
        if (from !== '') {
            newList = rows.filter(row => row.date >= from);
        }
        if (to !== '') {
            newList = newList.filter(row => row.date < to);
        }
        return newList;
    }

    useEffect(() => {
        if (orders.length === 0) {
            dispatch(setLoad(true));
            dispatch(fetchOrders());
        } if (clients.length === 0) {
            dispatch(fetchClients());
        }
    }, [])

    const filterOrder = filterList(orders);

    return (
        <div>
            <SnackBar open={open} autoHideDuration={8000} onClose={() => setOpen(false)}>
                <MuiAlert onClose={() => setOpen(false)} severity={severity} variant="filled">
                    <b className='snackBar-label'>{message}</b>
                </MuiAlert>
            </SnackBar>
            <h1 className='mt-2 d-flex justify-content-center align-items-center'>Заказы</h1>
            <Form className='mr-3' onSubmit={handleSubmit}>
                <Row className='order-settings'>
                    <Col>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>С</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="date" name='from' required onChange={(e) => setFrom(e.target.value)} />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>До</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="date" name='to' required onChange={(e) => setTo(e.target.value)} />
                        </InputGroup>
                    </Col>
                    <Button variant='outline-dark' type='submit'>Сформировать отчёт</Button>
                </Row>
            </Form>

            {(!loading) ? ((filterOrder && filterOrder.length !== 0) ? (
                <Table className='mt-4' responsive="xl">
                    <thead>
                        <tr>
                            <th>Номер заказа</th>
                            <th>Клиент</th>
                            <th>Дата заказа</th>
                            <th>Сумма заказа</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterOrder.map(order =>
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{clients.filter(client => client.id === order.clientId).map(client => { return client.name + ' ' + client.surname })}</td>
                                <td>{date(order.date)}</td>
                                <td>{order.totalPrice}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            ) : (<Alert className='mt-2 d-flex justify-content-center' variant='secondary'>Список пуст</Alert>))
                : (
                    <div className='mt-2 d-flex justify-content-center'>
                        <Spinner />
                    </div>
                )}
            <ScrollTop />
        </div>
    )
}

export default Order;