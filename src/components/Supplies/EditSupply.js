import React, { Component } from 'react';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import qs from 'querystring';
import Tooltip from '@material-ui/core/Tooltip';

export default class EditSupplyModal extends Component {

    constructor(props) {
        super(props);
        this.state = { snackBaropen: false, snackBarMessage: '', suppliers: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.suppliersList();
    }

    suppliersList() {
        axios.get(`https://i-bozh-server.herokuapp.com/api/Supplier/getAll`)
            .then(res => {
                this.setState({ suppliers: res.data })
            });
    }

    snackBarClose = (event) => {
        this.setState({ snackBaropen: false });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`https://i-bozh-server.herokuapp.com/api/Supply/edit?${qs.stringify({
            Id: this.props.supplyid,
            SupplierId: event.target.supplier.value,
            Date: event.target.date.value
        })}`)
            .then(res => this.setState({ snackBaropen: true, snackBarMessage: 'Успешно обновлёна' }))
            .catch(error => this.setState({ snackBaropen: true, snackBarMessage: 'Ошибка редактирования' }));
    }

    render() {
        const { suppliers } = this.state;
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
                            Редактирование поставки
        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="date">
                                        <Form.Label>Дата поставки</Form.Label>
                                        <Form.Control
                                            defaultValue={this.props.supplydate}
                                            type="date"
                                            name="date"
                                            required
                                            placeholder="Дата поставки" />
                                    </Form.Group>
                                    <Form.Group controlId="supplier">
                                        <Form.Label>Организация</Form.Label>
                                        <Form.Control as="select"
                                            defaultValue={this.props.supplier}>
                                            {suppliers.map(supplier =>
                                                <Tooltip key={supplier.id} title={supplier.nameOrganization}>
                                                    <option key={supplier.id} value={supplier.id}>{supplier.nameOrganization}</option>
                                                </Tooltip>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="light" type="submit">
                                            Изменить поставку
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