import React, { useState } from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import qs from 'querystring';
import { useDispatch } from 'react-redux';
import { fetchBrands } from '../../redux/actions/ActionFetchData';

const EditBrandModal = ({ show, onHide, brandid, brandname }) => {

    const dispatch = useDispatch();
    const [snackBaropen, setSnackBaropen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`https://i-bozh-server.herokuapp.com/api/Brand/edit?${qs.stringify({
            Id: brandid,
            Name: event.target.name.value
        })}`)
            .then(res => { setSnackBaropen(true); setSnackBarMessage('Успешно обновлён'); dispatch(fetchBrands()); })
            .catch(error => { setSnackBaropen(true); setSnackBarMessage('Ошибка редактирования') });
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
                        Редактирование бренда
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
                                        defaultValue={brandname}
                                        placeholder="Название" />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="light" type="submit">
                                        Изменить бренд
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

export default EditBrandModal;