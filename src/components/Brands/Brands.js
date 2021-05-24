import React, { Component, useEffect, useState } from 'react';
import { ButtonToolbar, Button, Table, Alert } from 'react-bootstrap';
import AddBrandModal from './AddBrands';
import EditBrandModal from './EditBrands';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import ScrollTop from '../ScrollTop';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../redux/actions/ActionFetchData';

const Brands = () => {

    const dispatch = useDispatch();
    const { brands } = useSelector(({ fetchDataReducer }) => fetchDataReducer);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [Id, setId] = useState(null);
    const [Name, setName] = useState('');

    const addModalClose = () => setAddModalShow(false);
    const editModalClose = () => setEditModalShow(false);

    const deleteBrand = (id) => {
        if (window.confirm('Вы уверены?')) {
            axios.delete(`https://i-bozh-server.herokuapp.com/api/Brand/delete/${id}`)
                .then(res => dispatch(fetchBrands()))
                .catch(error => console.log(error));
        }
    }

    useEffect(() => {
        if (brands.length === 0) {
            dispatch(fetchBrands());
        }
    }, [])

    return (
        <div>
            <ButtonToolbar className='float-right mt-2 mb-2'>
                <Button variant="light"
                    onClick={() => setAddModalShow(true)}>
                    {< AddIcon />} Добавить новый бренд
                    </Button>
            </ButtonToolbar>

            <AddBrandModal
                show={addModalShow}
                onHide={addModalClose}>
            </AddBrandModal>

            {(brands && brands.length !== 0) ? (
                <Table className='mt-4' responsive="xl">
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map(brand =>
                            <tr key={brand.id}>
                                <td>{brand.name}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button
                                            variant="light"
                                            onClick={() => {
                                                setEditModalShow(true);
                                                setId(brand.id);
                                                setName(brand.name);
                                            }}>
                                            {<EditIcon />}
                                        </Button>

                                        <div className="mr-2"></div>

                                        <Button className="mr-2"
                                            variant="light"
                                            onClick={() => deleteBrand(brand.id)}>
                                            {<DeleteIcon />}
                                        </Button>

                                        <EditBrandModal
                                            show={editModalShow}
                                            onHide={editModalClose}
                                            brandid={Id}
                                            brandname={Name} />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            ) : (<Alert className='mt-2 d-flex justify-content-center' variant='secondary'>Список пуст</Alert>)}
            <ScrollTop />
        </div>
    )
}

export default Brands;