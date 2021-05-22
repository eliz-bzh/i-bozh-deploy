import React, { Component } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToggleButtons } from '..';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { updateRole } from '../../redux/actions/ActionsRole';
import { SHA256 } from 'crypto-js';
import { Redirect } from 'react-router-dom';
import { clearCart } from '../../redux/actions/ActionsCart';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = { radioValue: 0, error: '', login: '', redirectClient: false, redirectAdmin: false, loading: false }
    }

    hashingPassword = (password) => {
        return SHA256(password).toString();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        axios.get(`https://i-bozh-server.herokuapp.com/api/Client/getByLogin/${event.target.login.value}`)
            .then(res => {
                if (res.data !== '') {
                    const password = this.hashingPassword(event.target.password.value);
                    if (password === res.data.password) {
                        this.props.dispatch(updateRole('client'));
                        this.props.dispatch(clearCart());
                        this.setState({ error: '', login: event.target.login.value, redirectClient: true, loading: false });
                    } else {
                        this.setState({ error: 'Неверный пароль', loading: false });
                    }
                } else {
                    this.setState({ error: 'Пользователь не зарегистрирован', loading: false })
                }
            })
            .catch(err => {
                this.setState({ error: 'Ошибка сервера', loading: false })
            })
    }

    handleSubmitAdmin = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        setTimeout(() => {
            if ((event.target.loginAdmin.value === 'admin') && (event.target.passwordAdmin.value === 'qwerty')) {
                this.props.dispatch(updateRole('admin'));
                this.setState({ error: '', redirectAdmin: true, loading: false })
            } else {
                this.setState({ error: 'Неверный логин или пароль', loading: false })
            }
        }, 1000)
    }

    render() {
        const { radioValue, error, redirectClient, redirectAdmin, login, loading } = this.state;
        return (
            <div>
                {redirectClient ? <Redirect to={`/client/${login}/home`} /> : null}
                {redirectAdmin ? <Redirect to='/admin/home' /> : null}
                <Container className='mt-5 d-flex flex-column justify-content-center align-items-center'>
                    <Row>
                        <Col>
                            <h1 align='center'>Аккаунт</h1>
                            <hr />
                            <ToggleButtons items={['Клиент', 'Администратор']} variant='outline-dark' value={radioValue} onChange={(radioValue) => this.setState({ radioValue })} />
                            {(radioValue === 0) ? (
                                <Form style={{ display: 'block' }} onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Логин</Form.Label>
                                        <Form.Control required name='login' type="text" placeholder="Логин" defaultValue='' />
                                        <Form.Label>Пароль</Form.Label>
                                        <Form.Control required name='password' type="password" placeholder="Пароль" defaultValue='' />
                                        <br />
                                        {(error !== '') ? (<Alert className='d-flex justify-content-center' variant='danger'>{error}</Alert>) : ''}
                                        <br />
                                        <Button type='submit' variant='outline-dark' size="lg" block>{!loading ? 'Войти' : 'Ожидание...'}</Button>
                                        <br />
                                        <Link className='d-flex justify-content-center' to='/registration'>Регистрация</Link>
                                    </Form.Group>
                                </Form>
                            ) :
                                (
                                    <Form onSubmit={this.handleSubmitAdmin}>
                                        <Form.Group>

                                            <Form.Label>Логин</Form.Label>
                                            <Form.Control required name='loginAdmin' type="text" placeholder="Логин" defaultValue='' />

                                            <Form.Label>Пароль</Form.Label>
                                            <Form.Control required name='passwordAdmin' type="password" placeholder="Пароль" defaultValue='' />
                                            <br />
                                            {(error !== '') ? (<Alert className='d-flex justify-content-center' variant='danger'>{error}</Alert>) : ''}
                                            <br />
                                            <Button type='submit' variant='outline-dark' size="lg" block>{!loading ? 'Войти' : 'Ожидание...'}</Button>
                                        </Form.Group>
                                    </Form>
                                )
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { role: state.roleReducer.role, items: state.cartReducer.cartItems };
};

export default withRouter(connect(mapStateToProps)(LoginForm));