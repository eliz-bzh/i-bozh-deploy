import React, { Component, useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import axios from 'axios';
import qs from 'querystring';
import { ButtonToolbar, ButtonGroup, Button, Table, Alert, Form } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, updateQuantityCartItem } from '../../redux/actions/ActionsCart';
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ExportCSV from '../../ExcelCheck/Check';
import ScrollTop from '../ScrollTop';
import { Carousel, PaymentSystem } from '..';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import emailjs from "emailjs-com";
import { init } from "emailjs-com";
import { fetchUser } from '../../redux/actions/ActionFetchData';
init("user_ZNDi6J5mnaAE4KFSr9mch");

const Cart = ({ match }) => {

    const dispatch = useDispatch();
    const { user } = useSelector(({ fetchDataReducer }) => fetchDataReducer);
    const { cartItems } = useSelector(({ cartReducer }) => cartReducer);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [buttonHiddenCheck, setButtonHiddenCheck] = useState(true);
    const [buttonHiddenPayment, setButtonHiddenPayment] = useState(true);
    const fileName = 'CheckOnline';
    const [dataToCheck, setDataToCheck] = useState([]);

    useEffect(() => {
        if (user.login !== match.params.login || user === {}) {
            dispatch(fetchUser(match.params.login));
        }
    }, [])

    const data = () => {
        const data = [];
        cartItems.map(item => {
            let newItem = { Название: item.name, 'Цена за единицу': item.price + ' руб.', Количество: item.quantity };
            data.push(newItem);
        });
        const total = cartItems.reduce((accumulator, product) => {
            return accumulator + product.price * product.quantity;
        }, 0);
        data.push({ Итого: total + ' руб.' });
        setDataToCheck(data);
    }

    const requestOrder = () => {
        if (cartItems && cartItems.length === 0) {
            setOpen(true);
            setMessage('Список пуст');
            setSeverity('warning');
        } else {
            let arrOrder = [];
            cartItems.map(item => {
                arrOrder.push({ productId: item.id, quantity: item.quantity });
            })
            const totalPrice = cartItems.reduce((accumulator, product) => {
                return accumulator + product.price * product.quantity;
            }, 0);
            axios.post(`https://i-bozh-server.herokuapp.com/api/Order/makeOrder/?${qs.stringify({
                ClientId: user.id,
                TotalPrice: totalPrice
            })}`, arrOrder)
                .then(res => {
                    data();
                    setOpen(true);
                    setMessage('Заказ оформлен');
                    setSeverity('success');
                    setButtonHiddenPayment(false)
                })
                .catch(err => console.log(err))
        }
    }

    const date = (dateOrder) => {
        var date = new Date(dateOrder);
        return date.toLocaleDateString();
    }

    const htmlMess = (user, order, products) => {
        return (
            `<div>
                        <p>Здравствуйте, ${user.name} ${user.surname}.</p>
                        <p>Ваш заказ №<b>${order.id}</b> от ${date(order.date)} на сумму <b>${order.totalPrice}</b>р.</p>
                        <h3>Продукты</h3>
                        <hr>
                        ${products.map(prod => {
                return (
                    `<div>
                            <br/>
                            <img src=${prod.images[0].url} alt='Error' style='float:left; margin: 7px 7px 7px 7px' height='150px' width='150px' />
                            <h3>${prod.name}</h3>
                            <h4>Кол-во: ${prod.quantity}</h4>
                            <h4><span style='color: red'>${prod.price}</span> BYN</h4><br/>
                        </div>`
                )
            })}
                        <br/><br/><hr>
                        <p>С наилучшими пожеланиями, интернет-магазин i-Bozh shop.</p>
                    </div>`
        );
    }

    const createLetter = () => {
        const templateId = "template_o16n64t";
        let products = [];
        cartItems.map((product, index) => {
            products.push(` ${index + 1}) ${product.name} x ${product.quantity} шт.`)
        });


        axios.get(`https://i-bozh-server.herokuapp.com/api/Order/getAll`)
            .then(res => {
                const order = res.data[res.data.length - 1];
                sendFeedback(templateId, {
                    email: user.email,
                    html: htmlMess(user, order, cartItems)
                });
            })
    }

    const sendFeedback = (templateId, variables) => {
        emailjs
            .send("service_e2uee2x", templateId, variables)
            .then((res) => {
                setOpen(true);
                setMessage(`Письмо отправлено на почту ${user.email}`);
                setSeverity('success');
            })
            .catch((err) => console.error("Oh well, you failed. Here some thoughts on the error that occured:", err));
    }

    return (
        <div className='container'>
            <SnackBar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                <MuiAlert onClose={() => setOpen(false)} severity={severity} variant="filled">
                    <b className='snackBar-label'>{message}</b>
                </MuiAlert>
            </SnackBar>
            <h1 className='mt-2 d-flex justify-content-left align-items-center'>
                <Avatar className='mr-2' style={{ backgroundColor: '#FF7700' }}>{(`${user.name}`).split('')[0].toLocaleUpperCase()}</Avatar>
                {user.name + ' ' + user.surname}
            </h1>
            <h1 className='mt-2 d-flex justify-content-center align-items-center'>Корзина</h1>
            <ButtonToolbar className='mb-2 float-right'>
                <ButtonGroup>
                    <ExportCSV hidden={buttonHiddenCheck} csvData={dataToCheck} fileName={fileName} buttonHidden={hidden => setTimeout((hidden) => setButtonHiddenCheck(hidden), 10000, hidden)} />
                </ButtonGroup>
                <ButtonGroup>
                    <PaymentSystem totalPrice={cartItems.reduce((accumulator, product) => {
                        return accumulator + product.price * product.quantity;
                    }, 0)} user={user} hidden={buttonHiddenPayment} onHidden={hidden => setButtonHiddenCheck(hidden)} createLetter={() => createLetter()} />
                </ButtonGroup>
                <ButtonGroup>
                    <Button className='mr-2' variant="outline-dark" onClick={() => requestOrder()}>Оформить заказ</Button>
                </ButtonGroup>
            </ButtonToolbar>
            <h5>Товаров в корзине: {cartItems.reduce((accumulator, product) => {
                return accumulator + product.quantity;
            }, 0)}</h5>

            <h5>Итого: <span className='price'>{cartItems.reduce((accumulator, product) => {
                return accumulator + product.price * product.quantity;
            }, 0)}</span> BYN</h5>

            {(cartItems && cartItems.length !== 0) ? (
                <Table className='mt-4' responsive="xl">
                    <thead>
                        <tr>
                            <th>Продукт</th>
                            <th>Название</th>
                            <th>Характеристики</th>
                            <th>Количество</th>
                            <th>Цена</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(product =>
                            <tr key={product.id}>
                                <td><Carousel images={product.images} height='150px' width='150px' /></td>
                                <td style={{ maxWidth: '200px' }}>{product.name}</td>
                                <td style={{ maxWidth: '210px' }}>
                                    <div>
                                        <b>Модель: </b>{product.modal}<br />
                                        <b>Год выпуска: </b>{product.year}<br />
                                        <b>Срок гарантии: </b>{product.warranty}
                                    </div>
                                </td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        required
                                        style={{ width: '80px' }}
                                        value={product.quantity}
                                        onChange={e => {
                                            let quantity = parseInt(e.target.value, 10);
                                            if (isNaN(quantity)) return 0;
                                            if (quantity < 0) return;
                                            dispatch(updateQuantityCartItem({ id: product.id, quantity }));
                                        }} />
                                </td>
                                <td><b className='price product'>{product.price}</b> BYN</td>
                                <td>
                                    <Button className="mr-2"
                                        variant="ligth"
                                        onClick={() => {
                                            dispatch(deleteCartItem(product.id));
                                        }}>
                                        {<DeleteIcon />}
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            ) : (<Alert className='mt-2 d-flex justify-content-center' variant='secondary'>Список пуст</Alert>)}
            <ScrollTop />
        </div>
    )
}

export default Cart;