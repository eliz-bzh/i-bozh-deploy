import React, { Component } from 'react';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import qs from 'querystring';

export default class EditBrandModal extends Component {

    constructor(props) {
        super(props);
        this.state = { snackBaropen: false, snackBarMessage: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackBarClose = (event) => {
        this.setState({ snackBaropen: false });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`https://i-bozh-server.herokuapp.com/api/Type/edit?${qs.stringify({
            Id: this.props.typeid,
            Name: event.target.name.value
        })}`)
            .then(res => this.setState({ snackBaropen: true, snackBarMessage: 'Успешно обновлён' }))
            .catch(error => this.setState({ snackBaropen: true, snackBarMessage: 'Ошибка редактирования' }));
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
                            Редактирование категории
        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="name">
                                        <Form.Label>Название</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            required
                                            defaultValue={this.props.typename}
                                            placeholder="Название" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="light" type="submit">
                                            Изменить категорию
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