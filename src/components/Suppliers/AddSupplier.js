import React, { useState } from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import qs from 'querystring';
import { useDispatch } from 'react-redux';
import { fetchSuppliers } from '../../redux/actions/ActionFetchData';

const AddSupplierModal = ({ show, onHide }) => {

    const dispatch = useDispatch();
    const [snackBaropen, setSnackBaropen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`https://localhost:5001/api/Supplier/create?${qs.stringify({
            NameOrganization: event.target.name.value,
            Number: event.target.number.value,
            Adress: event.target.adress.value
        })}`)
            .then(res => { setSnackBaropen(true); setSnackBarMessage('Успешно добавлено'); dispatch(fetchSuppliers()); })
            .catch(error => { setSnackBaropen(true); setSnackBarMessage('Ошибка добавления') });
    }

    const snackBarClose = () => setSnackBaropen(false);

    return (
        <div className='container'>
            <SnackBar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackBaropen}
                autoHideDuration={1000}
                onClose={snackBarClose}
                message={<span id='message-id'>{snackBarMessage}</span>}
                action={[
                    <IconButton color="inherit" size="small"
                        onClick={snackBarClose}
                    ><CloseIcon /></IconButton>
                ]} />
            <Modal
                show={show}
                onHide={onHide}
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
                            <Form onSubmit={handleSubmit}>
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

                    <Button variant="light" onClick={onHide}>
                        Закрыть
        </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddSupplierModal;