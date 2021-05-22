import React, { Component } from 'react';
import { ButtonToolbar, Button, Table, Alert } from 'react-bootstrap';
import AddTypeModal from './AddType';
import EditTypeModal from './EditType';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import ScrollTop from '../ScrollTop';

export default class Types extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: [],
            snackBaropen: false,
            snackBarMessage: '',
            addModalShow: false,
            editModalShow: false
        };
    }

    componentDidMount() {
        this.typesList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.addModalShow !== this.state.addModalShow || prevState.editModalShow !== this.state.editModalShow) {
            this.typesList();
        }
    }

    deleteType(id) {
        if (window.confirm('Вы уверены?')) {
            axios.delete(`https://i-bozh-server.herokuapp.com/api/Type/delete/${id}`)
                .then(res => this.typesList())
                .catch(error => console.log(error));
        }
    }

    typesList() {
        axios.get(`https://i-bozh-server.herokuapp.com/api/Type/getAll`)
            .then(res => this.setState({ types: res.data }));
    }

    snackBarClose = (event) => {
        this.setState({ snackBaropen: false });
    }


    render() {
        const { types, Id, Name } = this.state;
        const addModalClose = () => this.setState({ addModalShow: false });
        const editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div>
                <ButtonToolbar className='float-right mt-2 mb-2'>
                    <Button variant="light"
                        onClick={() => {
                            this.setState({ addModalShow: true })
                        }}>
                        {<AddIcon />}Добавить новую категорию
                    </Button>
                </ButtonToolbar>

                <AddTypeModal
                    show={this.state.addModalShow}
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
                                                onClick={() => this.setState({
                                                    editModalShow: true,
                                                    Id: type.id,
                                                    Name: type.name
                                                })}>
                                                {<EditIcon />}
                                            </Button>

                                            <div className="mr-2"></div>

                                            <Button className="mr-2"
                                                variant="ligth"
                                                onClick={() => this.deleteType(type.id)}>
                                                {<DeleteIcon />}
                                            </Button>

                                            <EditTypeModal
                                                show={this.state.editModalShow}
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
}