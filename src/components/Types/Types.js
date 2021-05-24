import React, { useEffect, useState } from 'react';
import { ButtonToolbar, Button, Table, Alert } from 'react-bootstrap';
import AddTypeModal from './AddType';
import EditTypeModal from './EditType';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import ScrollTop from '../ScrollTop';
import { fetchTypes } from '../../redux/actions/ActionFetchData';
import { useDispatch, useSelector } from 'react-redux';

const Types = () => {

    const dispatch = useDispatch();
    const { types } = useSelector(({ fetchDataReducer }) => fetchDataReducer);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [Id, setId] = useState(null);
    const [Name, setName] = useState('');

    const addModalClose = () => setAddModalShow(false);
    const editModalClose = () => setEditModalShow(false);

    const deleteType = (id) => {
        if (window.confirm('Вы уверены?')) {
            axios.delete(`https://i-bozh-server.herokuapp.com/api/Type/delete/${id}`)
                .then(res => dispatch(fetchTypes()))
                .catch(error => console.log(error));
        }
    }

    useEffect(() => {
        if (types.length === 0) {
            dispatch(fetchTypes());
        }
    }, [])

    return (
        <div>
            <ButtonToolbar className='float-right mt-2 mb-2'>
                <Button variant="light"
                    onClick={() => setAddModalShow(true)}>
                    {<AddIcon />}Добавить новую категорию
                    </Button>
            </ButtonToolbar>

            <AddTypeModal
                show={addModalShow}
                onHide={addModalClose}>
            </AddTypeModal>
            {(types && types.length !== 0) ? (
                <Table className='mt-4' responsive="xl">
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {types.map(type =>
                            <tr key={type.id}>
                                <td>{type.name}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button
                                            variant="light"
                                            onClick={() => {
                                                setEditModalShow(true);
                                                setId(type.id);
                                                setName(type.name);
                                            }}>
                                            {<EditIcon />}
                                        </Button>

                                        <div className="mr-2"></div>

                                        <Button className="mr-2"
                                            variant="ligth"
                                            onClick={() => deleteType(type.id)}>
                                            {<DeleteIcon />}
                                        </Button>

                                        <EditTypeModal
                                            show={editModalShow}
                                            onHide={editModalClose}
                                            typeid={Id}
                                            typename={Name} />

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

export default Types;