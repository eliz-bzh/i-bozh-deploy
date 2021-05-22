import React, { Component } from 'react';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';
import { Spinner } from '..';

export default class EditProductModal extends Component {

    constructor(props) {
        super(props);
        this.state = { snackBaropen: false, snackBarMessage: '', brands: [], types: [], suppliers: [], loading: false, imagesState: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.brandsList();
        this.typesList();
        this.supplyList();
    }

    brandsList() {
        axios.get(`https://i-bozh-server.herokuapp.com/api/Brand/getAll`)
            .then(res => this.setState({ brands: res.data }));
    }

    typesList() {
        axios.get(`https://i-bozh-server.herokuapp.com/api/Type/getAll`)
            .then(res => this.setState({ types: res.data }));
    }

    supplyList() {
        axios.get(`https://i-bozh-server.herokuapp.com/api/Supplier/getAll`)
            .then(res => this.setState({ suppliers: res.data }));
    }

    snackBarClose = (event) => {
        this.setState({ snackBaropen: false });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let imagesArray = [];
        if (this.props.images.length !== 0) {
            this.props.images.map(image =>
                imagesArray.push({ url: image.url })
            )
        }
        axios.put(`https://i-bozh-server.herokuapp.com/api/Product/edit`, {
            id: this.props.id,
            name: event.target.name.value,
            year: event.target.year.value,
            brandId: parseInt(event.target.brand.value),
            typeId: parseInt(event.target.type.value),
            modal: event.target.modal.value,
            warranty: parseInt(event.target.warranty.value),
            price: parseInt(event.target.price.value),
            amount: parseInt(event.target.amount.value),
            supplyId: parseInt(event.target.supplier.value),
            images: (this.state.imagesState.length !== 0) ? (this.state.imagesState) : (imagesArray)
        })
            .then(res => this.setState({ snackBaropen: true, snackBarMessage: 'Успешно обновлён' }))
            .catch(error => this.setState({ snackBaropen: true, snackBarMessage: 'Ошибка редактирования' }));
    }

    uploadImage = async event => {
        const files = event.target.files;
        const data = new FormData();
        for (let i = 0; i !== files.length; ++i) {
            data.append('file', files[i]);
            data.append('upload_preset', 'hardware-store');
            this.setState({ loading: true })
            const res = await fetch(`https://api.cloudinary.com/v1_1/dzlhauo5h/image/upload`,
                {
                    method: 'POST',
                    body: data
                }
            );
            const file = await res.json();
            this.setState(({ loading, imagesState }) => {
                return {
                    loading: false,
                    imagesState: [...imagesState, { url: file.secure_url }]
                }
            })
        }
    }

    render() {
        const { brands, types, suppliers, loading, imagesState } = this.state;
        const { images } = this.props;
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
                    open={this.state.snackBaropen}
                    autoHideDuration={1000}
                    onClose={this.snackBarClose}
                    message={<span id='message-id'>{this.state.snackBarMessage}</span>}
                    action={[
                        <IconButton color="inherit" size="small"
                            onClick={this.snackBarClose}
                        ><CloseIcon /></IconButton>
                    ]} />
                <Modal size='xl'
                    {...this.props}
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
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="image">
                                        <div>
                                            <Form.File multiple name='file' onChange={this.uploadImage} label='Выберите картинку для товара' data-browse='Выбрать' custom />
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
                                                    defaultValue={this.props.name}
                                                    placeholder="Название" />
                                            </Col>
                                            <Col>
                                                <Form.Label>Модель</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="modal"
                                                    required
                                                    defaultValue={this.props.modal}
                                                    placeholder="Модель" />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group>
                                        <Row>
                                            <Col>
                                                <Form.Label>Категория</Form.Label>
                                                <Form.Control as="select" name='type'
                                                    defaultValue={this.props.type}>
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
                                                    defaultValue={this.props.brand}>
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
                                                    defaultValue={this.props.year}
                                                    placeholder="Год выпуска" />
                                            </Col>
                                            <Col>
                                                <Form.Label>Срок гарантии</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="warranty"
                                                    required
                                                    defaultValue={this.props.warranty}
                                                    placeholder="Срок гарантии" />
                                            </Col>
                                            <Col>
                                                <Form.Label>Количество на складе</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="amount"
                                                    required
                                                    defaultValue={this.props.amount}
                                                    placeholder="Количество на складе" />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group>
                                        <Row>
                                            <Col>
                                                <Form.Label>Поставщик</Form.Label>
                                                <Form.Control as="select" name='supplier'
                                                    defaultValue={this.props.supply}>
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
                                                    defaultValue={this.props.price}
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

                        <Button variant="light" onClick={this.props.onHide}>
                            Закрыть
        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        );
    };
}