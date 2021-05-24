import React, { Component } from 'react';
import { Form, Button, ButtonGroup, Alert, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { SHA256 } from 'crypto-js';
import { Redirect } from 'react-router';

export default class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = { error: '', redirect: false }
    }

    hashingPassword = (password) => {
        return SHA256(password).toString();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (event.target.password.value === event.target.password2.value) {

            axios.post(`https://localhost:5001/api/Client/create`, {

                name: event.target.name.value,
                surname: event.target.surname.value,
                adress: event.target.city.value + ', ' + event.target.street.value + ', д. ' + event.target.house.value + ', кв. ' + event.target.flat.value,
                number: event.target.number.value,
                email: event.target.email.value,
                login: event.target.login.value,
                password: this.hashingPassword(event.target.password.value)

            })
                .then(res => this.setState({ error: '', redirect: true }))
                .catch(error => this.setState({ error: 'Пользователь уже существует' }));
        } else {
            this.setState({ error: 'Пароли не совпадают' });
        }
    }

    render() {
        const { redirect } = this.state;
        return (
            <div>
                {redirect ? <Redirect to={`/`} /> : null}
                <Container className='d-flex flex-column justify-content-center align-items-center'>
                    <Row>
                        <Col>
                            <h1 align='center'>Регистрация</h1>
                            <hr />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Label>Ваше имя</Form.Label>
                                <Form.Control type="text" name='name' required placeholder="Ваше имя" />

                                <Form.Label>Ваша фамилия</Form.Label>
                                <Form.Control type="text" name='surname' required placeholder="Ваше фамилия" />

                                <Row>
                                    <Col>
                                        <Form.Label>Город</Form.Label>
                                        <Form.Control type="text" name='city' required placeholder="Город"></Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Label>Улица</Form.Label>
                                        <Form.Control type="text" name='street' required placeholder="Улица"></Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Label>Номер дома</Form.Label>
                                        <Form.Control type="number" name='house' required placeholder="Номер дома"></Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Label>Номер квартиры</Form.Label>
                                        <Form.Control type="number" name='flat' required placeholder="Номер квартиры"></Form.Control>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Label>Номер телефона</Form.Label>
                                        <Form.Control type="tel" name="number" defaultValue='+375' required maxLength={13}></Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Label>Электронная почта</Form.Label>
                                        <Form.Control type="email" name="email" required placeholder="Электронная почта"></Form.Control>
                                    </Col>
                                </Row>


                                <Form.Label>Логин</Form.Label>
                                <Form.Control type="text" name='login' required placeholder="Логин" />

                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" name="password" required placeholder="Пароль" />

                                <Form.Label>Повтор пароля</Form.Label>
                                <Form.Control type="password" name="password2" required placeholder="Повтор пароля" />
                                <br />
                                {(this.state.error !== '') ? (<Alert className='d-flex justify-content-center' variant='danger'>{this.state.error}</Alert>) : ''}
                                <br />
                                <ButtonGroup className='d-flex justify-content-center align-items-center' variant='horizontal'>
                                    <Button className='active' variant='outline-dark' size="lg" type="submit">Зарегистрироваться</Button>
                                    <Button variant='outline-dark' size="lg" onClick={() => { this.setState({ redirect: true }) }}>
                                        Отмена</Button>
                                </ButtonGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}