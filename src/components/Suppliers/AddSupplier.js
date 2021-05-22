import React, { Component } from 'react';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import qs from 'querystring';

export default class AddSupplierModal extends Component {

    constructor(props) {
        super(props);
        this.state = { suppliers: [], snackBaropen: false, snackBarMessage: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackBarClose = (event) => {
        this.setState({ snackBaropen: false });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`https://i-bozh-server.herokuapp.com/api/Supplier/create?${qs.stringify({
            NameOrganization: event.target.name.value,
            Number: event.target.number.value,
            Adress: event.target.adress.value
        })}`)
            .then(res => this.setState({ snackBaropen: true, snackBarMessage: 'Успешно добавлено' }))
            .catch(error => this.setState({ snackBaropen: true, snackBarMessage: 'Ошибка добавления' }));
    }

    render() {
        return (
            <div className='container'>
                <SnackBar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackBaropen}
                    autoHideDuration={1000}
                    onClose={this.snackBarClose}
                    message={<span id='message-id'>{this.state.snackBarMessage}</span>}
                    action={[
                        <IconButton color="inherit" size="small"
                            onClick={this.snackBarClose}
                        ><CloseIcon /></IconButton>
                    ]} />
                <Modal
                    {...this.props}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Добавление нового поставщика
        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="name">
                                        <Form.Label>Организация</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            required
                                            placeholder="Организация" />
                                    </Form.Group>
                                    <Form.Group controlId="number">
                                        <Form.Label>Контакты</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="number"
                                            required
                                            defaultValue='+375'
                                            maxLength={13} />
                                    </Form.Group>
                                    <Form.Group controlId="adress">
                                        <Form.Label>Адрес</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="adress"
                                            required
                                            placeholder="Адрес" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="light" type="submit">
                                            Добавить поставщика
                            </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="light" onClick={this.props.onHide}>
                            Закрыть
        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        );
    };
}