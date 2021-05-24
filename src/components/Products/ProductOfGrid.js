import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { ButtonToolbar, Button } from 'react-bootstrap';
import EditProductModal from './EditProduct';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import RemoveShoppingCartRoundedIcon from '@material-ui/icons/RemoveShoppingCartRounded';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addItemInCart } from "../../redux/actions/ActionsCart";
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Carousel } from '..';
import { fetchProducts } from '../../redux/actions/ActionFetchData';

const ProductOfGrid = ({ product, role }) => {

    const dispatch = useDispatch();
    const { brands, types, suppliers } = useSelector(({ fetchDataReducer }) => fetchDataReducer)
    const [editModalShow, setEditModalShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [Id, setId] = useState(null);
    const [Name, setName] = useState('');
    const [Year, setYear] = useState('');
    const [Brand, setBrand] = useState(null);
    const [Type, setType] = useState(null);
    const [Modal, setModal] = useState('');
    const [Warranty, setWarranty] = useState(null);
    const [Amount, setAmount] = useState(0);
    const [Supply, setSupply] = useState('');
    const [Price, setPrice] = useState(0);
    const [Images, setImages] = useState([]);

    const editModalClose = () => setEditModalShow(false);

    const deleteProduct = (id) => {
        if (window.confirm('Вы уверены?')) {
            axios.delete(`https://i-bozh-server.herokuapp.com/api/Product/delete/${id}`)
                .then(res => dispatch(fetchProducts()))
                .catch(error => console.log(error));
        }
    }

    return (
        <div>
            <SnackBar open={open} autoHideDuration={400} onClose={() => setOpen(false)}>
                <MuiAlert onClose={() => setOpen(false)} severity="success" variant="filled">
                    <b className='snackBar-label'>Товар добавлен</b>
                </MuiAlert>
            </SnackBar>
            <Row>
                <Col>
                    <Card className='mr-2 mt-2' key={product.id} style={{ width: '16.5rem' }}>
                        <Carousel images={product.images} height='230px' width='16.4rem' />
                        <Card.Header style={{ textAlign: 'center' }}>{product.name}</Card.Header>
                        <Card.Body style={{ textAlign: 'left' }}>
                            <Card.Text>
                                Категория: {types.filter(type => type.id === product.typeId).map(type => { return type.name })}<br />
                                    Бренд: {brands.filter(brand => brand.id === product.brandId).map(brand => { return brand.name })}<br />
                                    Модель: {product.modal}<br />
                                    Год выпуска: {product.year}<br />
                                    Срок гарантии: {product.warranty}<br />
                                    Количество на складе: {product.amount}<br />
                                    Поставщик: {suppliers.filter(supplier => supplier.id === product.supplyId).map(supplier => { return supplier.nameOrganization + ', ' + supplier.adress + '; ' + supplier.number })}<br />
                                <span className='d-flex justify-content-end'><b className='price product'>{product.price} </b>BYN</span>
                            </Card.Text>

                        </Card.Body>
                        <Card.Footer>
                            <ButtonToolbar className='d-flex justify-content-end'>
                                {(role === 'admin') ? (
                                    <div>
                                        <Button variant="light"
                                            onClick={() => {
                                                setEditModalShow(true);
                                                setId(product.id);
                                                setName(product.name);
                                                setYear(product.year);
                                                setBrand(product.brandId);
                                                setType(product.typeId);
                                                setModal(product.modal);
                                                setWarranty(product.warranty);
                                                setAmount(product.amount);
                                                setSupply(product.supplyId);
                                                setPrice(product.price);
                                                setImages(product.images);
                                            }}>
                                            {<EditIcon />}
                                        </Button>



                                        <Button className='ml-2' variant="light"
                                            onClick={() => deleteProduct(product.id)}>
                                            {<DeleteIcon />}
                                        </Button>

                                        <EditProductModal
                                            show={editModalShow}
                                            onHide={editModalClose}
                                            id={Id}
                                            name={Name}
                                            year={Year}
                                            brand={Brand}
                                            type={Type}
                                            modal={Modal}
                                            warranty={Warranty}
                                            amount={Amount}
                                            supply={Supply}
                                            price={Price}
                                            images={Images}
                                            types={types}
                                            brands={brands}
                                            suppliers={suppliers} />
                                    </div>
                                ) : (
                                    <div>
                                        {product.amount > 0 ? <Button variant="light"
                                            onClick={e => {
                                                e.stopPropagation();
                                                setOpen(!open);
                                                dispatch(
                                                    addItemInCart({ ...product, quantity: 1 })
                                                );
                                            }}>
                                            {<AddShoppingCartRoundedIcon />}</Button> :
                                            <Button variant="light" disabled>{<RemoveShoppingCartRoundedIcon />}Sold out</Button>}
                                    </div>
                                )}
                            </ButtonToolbar>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductOfGrid;