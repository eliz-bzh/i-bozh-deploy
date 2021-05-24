import React, { useState } from 'react';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';
import { Spinner } from '..';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/actions/ActionFetchData';

const EditProductModal = ({ show, onHide, id, name, year, type, brand, modal, warranty, amount, supply, price, images, types, brands, suppliers }) => {

    const dispatch = useDispatch();
    const [snackBaropen, setSnackBaropen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [imagesState, setImagesState] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let imagesArray = [];
        if (images.length !== 0) {
            images.map(image =>
                imagesArray.push({ url: image.url })
            )
        }
        axios.put(`https://localhost:5001/api/Product/edit`, {
            id: id,
            name: event.target.name.value,
            year: event.target.year.value,
            brandId: parseInt(event.target.brand.value),
            typeId: parseInt(event.target.type.value),
            modal: event.target.modal.value,
            warranty: parseInt(event.target.warranty.value),
            price: parseInt(event.target.price.value),
            amount: parseInt(event.target.amount.value),
            supplyId: parseInt(event.target.supplier.value),
            images: (imagesState.length !== 0) ? (imagesState) : (imagesArray)
        })
            .then(res => { setSnackBaropen(true); setSnackBarMessage('Успешно обновлён'); dispatch(fetchProducts()); })
            .catch(error => { setSnackBaropen(true); setSnackBarMessage('Ошибка редактирования') });
    }

    const uploadImage = async event => {
        const files = event.target.files;
        const data = new FormData();
        for (let i = 0; i !== files.length; ++i) {
            data.append('file', files[i]);
            data.append('upload_preset', 'hardware-store');
            setLoading(true)
            const res = await fetch(`https://api.cloudinary.com/v1_1/dzlhauo5h/image/upload`,
                {
                    method: 'POST',
                    body: data
                }
            );
            const file = await res.json();
            setLoading(false);
            setImagesState(imagesState => [...imagesState, { url: file.secure_url }])
        }
    }

    const snackBarClose = () => setSnackBaropen(false);
    const imagesPropsView =
        images && images.map((image, index) =>
            <img className='mt-2 mr-2' key={index} src={image.url} style={{ width: '300px' }} alt='Error, sorry...' />
        );
    const imagesStateView =
        imagesState && imagesState.map((image, index) =>
            <img className='mt-2 mr-2' key={index} src={image.url} style={{ width: '300px' }} alt='Error, sorry...' />
        );

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
            <Modal size='xl'
                show={show}
                onHide={onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Редактирование товара
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="image">
                                    <div>
                                        <Form.File multiple name='file' onChange={uploadImage} label='Выберите картинку для товара' data-browse='Выбрать' custom />
                                        {loading ? (
                                            <div>
                                                {imagesStateView}
                                                <div className='mt-4' style={{ display: 'inline-flex' }}><Spinner /></div>
                                            </div>
                                        ) : ((imagesState.length === 0) ? (imagesPropsView) : (imagesStateView))}
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Label>Название</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                required
                                                defaultValue={name}
                                                placeholder="Название" />
                                        </Col>
                                        <Col>
                                            <Form.Label>Модель</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="modal"
                                                required
                                                defaultValue={modal}
                                                placeholder="Модель" />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Label>Категория</Form.Label>
                                            <Form.Control as="select" name='type'
                                                defaultValue={type}>
                                                {types.map(type =>
                                                    <Tooltip key={type.id} title={type.name}>
                                                        <option key={type.id} value={type.id}>{type.name}</option>
                                                    </Tooltip>
                                                )}
                                            </Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Label>Бренд</Form.Label>
                                            <Form.Control as="select" name='brand'
                                                defaultValue={brand}>
                                                {brands.map(brand =>
                                                    <Tooltip key={brand.id} title={brand.name}>
                                                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                                                    </Tooltip>
                                                )}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Label>Год выпуска</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="year"
                                                required
                                                defaultValue={year}
                                                placeholder="Год выпуска" />
                                        </Col>
                                        <Col>
                                            <Form.Label>Срок гарантии</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="warranty"
                                                required
                                                defaultValue={warranty}
                                                placeholder="Срок гарантии" />
                                        </Col>
                                        <Col>
                                            <Form.Label>Количество на складе</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="amount"
                                                required
                                                defaultValue={amount}
                                                placeholder="Количество на складе" />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Label>Поставщик</Form.Label>
                                            <Form.Control as="select" name='supplier'
                                                defaultValue={supply}>
                                                {suppliers.map(supplier =>
                                                    <Tooltip key={supplier.id} title={supplier.nameOrganization}>
                                                        <option key={supplier.id} value={supplier.id}>{supplier.nameOrganization}</option>
                                                    </Tooltip>
                                                )}
                                            </Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Label>Цена</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="price"
                                                required
                                                defaultValue={price}
                                                placeholder="Цена" />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="light" type="submit">
                                        Изменить товар
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

export default EditProductModal;