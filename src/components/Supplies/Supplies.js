import React, { useEffect, useState } from 'react';
import { ButtonToolbar, Button, Table, Alert } from 'react-bootstrap';
import AddSupplyModal from './AddSupply';
import EditSupplyModal from './EditSupply';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import ScrollTop from '../ScrollTop';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuppliers, fetchSupplies } from '../../redux/actions/ActionFetchData';

const Supplies = () => {

    const dispatch = useDispatch();
    const { supplies, suppliers } = useSelector(({ fetchDataReducer }) => fetchDataReducer);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [Id, setId] = useState(null);
    const [DateSupply, setDateSupply] = useState('');
    const [Name, setName] = useState('');

    const addModalClose = () => setAddModalShow(false);
    const editModalClose = () => setEditModalShow(false);
    const date = (dateSupply) => {
        var date = new Date(dateSupply);
        return date.toLocaleDateString('en-GB');
    }

    const deleteSupply = (id) => {
        if (window.confirm('Вы уверены?')) {
            axios.delete(`https://localhost:5001/api/Supply/delete/${id}`)
                .then(res => dispatch(fetchSupplies()))
                .catch(error => console.log(error));
        }
    }

    useEffect(() => {
        if (supplies.length === 0) {
            dispatch(fetchSupplies());
        } if (suppliers.length === 0) {
            dispatch(fetchSuppliers());
        }
    }, [])

    return (
        <div>
            <ButtonToolbar className='float-right mt-2 mb-2'>
                <Button variant="light"
                    onClick={() => setAddModalShow(true)}>
                    {<AddIcon />}Добавить новую поставку
                    </Button>
            </ButtonToolbar>

            <AddSupplyModal
                show={addModalShow}
                onHide={addModalClose}
                suppliers={suppliers}>
            </AddSupplyModal>
            {(supplies && supplies.length !== 0) ? (
                <Table className='mt-4' responsive="xl">
                    <thead>
                        <tr>
                            <th>Дата поставки</th>
                            <th>Организация</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplies.map(supply =>
                            <tr key={supply.id}>
                                <td>{date(supply.date)}</td>
                                <td>{suppliers.filter(supplier => supplier.id === supply.supplierId)
                                    .map(supplier => { return supplier.nameOrganization })}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button
                                            variant="light"
                                            onClick={() => {
                                                setEditModalShow(true);
                                                setId(supply.id);
                                                setDateSupply(supply.date);
                                                setName(supply.name);
                                            }}>
                                            {<EditIcon />}
                                        </Button>

                                        <div className="mr-2"></div>

                                        <Button className="mr-2"
                                            variant="light"
                                            onClick={() => deleteSupply(supply.id)}>
                                            {<DeleteIcon />}
                                        </Button>

                                        <EditSupplyModal
                                            show={editModalShow}
                                            onHide={editModalClose}
                                            supplyid={Id}
                                            supplydate={DateSupply}
                                            supplier={Name}
                                            suppliers={suppliers} />
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

export default Supplies;