import React, { useEffect, useState } from 'react';
import { ButtonToolbar, Button, Table, Alert } from 'react-bootstrap';
import AddSupplierModal from './AddSupplier';
import EditSupplierModal from './EditSupplier';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import ScrollTop from '../ScrollTop';
import { fetchSuppliers } from '../../redux/actions/ActionFetchData';
import { useDispatch, useSelector } from 'react-redux';

const Suppliers = () => {

    const dispatch = useDispatch();
    const { suppliers } = useSelector(({ fetchDataReducer }) => fetchDataReducer);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [Id, setId] = useState(null);
    const [Name, setName] = useState('');
    const [Number, setNumber] = useState('');
    const [Adress, setAdress] = useState('');

    const addModalClose = () => setAddModalShow(false);
    const editModalClose = () => setEditModalShow(false);

    const deleteSupplier = (id) => {
        if (window.confirm('Вы уверены?')) {
            axios.delete(`https://i-bozh-server.herokuapp.com/api/Supplier/delete/${id}`)
                .then(res => dispatch(fetchSuppliers()))
                .catch(error => console.log(error));
        }
    }

    useEffect(() => {
        if (suppliers.length === 0) {
            dispatch(fetchSuppliers());
        }
    }, [])

    return (
        <div>
            <ButtonToolbar className='float-right mt-2 mb-2'>
                <Button variant="light"
                    onClick={() => setAddModalShow(true)}>
                    {<AddIcon />}Добавить нового поставщика
                    </Button>
            </ButtonToolbar>

            <AddSupplierModal
                show={addModalShow}
                onHide={addModalClose}>
            </AddSupplierModal>

            {(suppliers && suppliers.length !== 0) ? (
                <Table className='mt-4' responsive="xl">
                    <thead>
                        <tr>
                            <th>Организация</th>
                            <th>Контакты</th>
                            <th>Адрес офиса</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map(supplier =>
                            <tr key={supplier.id}>
                                <td>{supplier.nameOrganization}</td>
                                <td>{supplier.number}</td>
                                <td>{supplier.adress}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button
                                            variant="light"
                                            onClick={() => {
                                                setEditModalShow(true);
                                                setId(supplier.id);
                                                setName(supplier.nameOrganization);
                                                setNumber(supplier.number);
                                                setAdress(supplier.adress)
                                            }}>
                                            {<EditIcon />}
                                        </Button>

                                        <div className="mr-2"></div>

                                        <Button className="mr-2"
                                            variant="light"
                                            onClick={() => deleteSupplier(supplier.id)}>
                                            {<DeleteIcon />}
                                        </Button>

                                        <EditSupplierModal
                                            show={editModalShow}
                                            onHide={editModalClose}
                                            supplierid={Id}
                                            supplierOrg={Name}
                                            supplierNum={Number}
                                            supplierAdr={Adress} />

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

export default Suppliers;