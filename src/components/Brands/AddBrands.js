import React, { useState } from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import qs from 'querystring';
import { useDispatch } from 'react-redux';
import { fetchBrands } from '../../redux/actions/ActionFetchData';

const AddBrandModal = ({ show, onHide }) => {

    const dispatch = useDispatch();
    const [snackBaropen, setSnackBaropen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`https://i-bozh-server.herokuapp.com/api/Brand/create?${qs.stringify({
            Name: event.target.name.value
        })}`)
            .then(res => { setSnackBaropen(true); setSnackBarMessage('Успешно добавлено'); dispatch(fetchBrands()); })
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
                        Добавление нового бренда
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="name">
                                    <Form.Label>Название</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Название" />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="light" type="submit">
                                        Добавить бренд
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

export default AddBrandModal;