import React, { useState } from 'react';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import qs from 'querystring';
import Tooltip from '@material-ui/core/Tooltip';
import { fetchSupplies } from '../../redux/actions/ActionFetchData';
import { useDispatch } from 'react-redux';

const EditSupplyModal = ({ show, onHide, supplyid, supplydate, supplier, suppliers }) => {

    const dispatch = useDispatch();
    const [snackBaropen, setSnackBaropen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`https://localhost:5001/api/Supply/edit?${qs.stringify({
            Id: supplyid,
            SupplierId: event.target.supplier.value,
            Date: event.target.date.value
        })}`)
            .then(res => { setSnackBaropen(true); setSnackBarMessage('Успешно обновлён'); dispatch(fetchSupplies()); })
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
                        Редактирование поставки
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="date">
                                    <Form.Label>Дата поставки</Form.Label>
                                    <Form.Control
                                        defaultValue={supplydate}
                                        type="date"
                                        name="date"
                                        required
                                        placeholder="Дата поставки" />
                                </Form.Group>
                                <Form.Group controlId="supplier">
                                    <Form.Label>Организация</Form.Label>
                                    <Form.Control as="select"
                                        defaultValue={supplier}>
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

                    <Button variant="light" onClick={onHide}>
                        Закрыть
        </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditSupplyModal;