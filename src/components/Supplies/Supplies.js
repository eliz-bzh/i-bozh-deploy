import React, { Component } from 'react';
import { ButtonToolbar, Button, Table, Alert } from 'react-bootstrap';
import AddSupplyModal from './AddSupply';
import EditSupplyModal from './EditSupply';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import ScrollTop from '../ScrollTop';

export default class Supplies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplies: [],
            suppliers: [],
            snackBaropen: false,
            snackBarMessage: '',
            addModalShow: false,
            editModalShow: false
        };
    }

    componentDidMount() {
        this.suppliesList();
        this.suppliersList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.addModalShow !== this.state.addModalShow || prevState.editModalShow !== this.state.editModalShow) {
            this.suppliesList();
        }
    }

    deleteSupply(id) {
        if (window.confirm('Вы уверены?')) {
            axios.delete(`https://i-bozh-server.herokuapp.com/api/Supply/delete/${id}`)
                .then(res => this.suppliesList())
                .catch(error => console.log(error));
        }
    }

    suppliesList() {
        axios.get(`https://i-bozh-server.herokuapp.com/api/Supply/getAll`)
            .then(res => this.setState({ supplies: res.data }));
    }

    suppliersList() {
        axios.get(`https://i-bozh-server.herokuapp.com/api/Supplier/getAll`)
            .then(res => this.setState({ suppliers: res.data }));
    }

    snackBarClose = (event) => {
        this.setState({ snackBaropen: false });
    }

    date = (dateSupply) => {
        var date = new Date(dateSupply);
        return date.toLocaleDateString('en-GB');
    }


    render() {
        const { supplies, suppliers, Id, Date, Name } = this.state;
        const addModalClose = () => this.setState({ addModalShow: false });
        const editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div>
                <ButtonToolbar className='float-right mt-2 mb-2'>
                    <Button variant="light"
                        onClick={() => {
                            this.setState({ addModalShow: true })
                        }}>
                        {<AddIcon />}Добавить новую поставку
                    </Button>
                </ButtonToolbar>

                <AddSupplyModal
                    show={this.state.addModalShow}
                    onHide={addModalClose}>
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
                                    <td>{this.date(supply.date)}</td>
                                    <td>{suppliers.filter(supplier => supplier.id === supply.supplierId)
                                        .map(supplier => { return supplier.nameOrganization })}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button
                                                variant="light"
                                                onClick={() => this.setState({
                                                    editModalShow: true,
                                                    Id: supply.id,
                                                    Date: supply.date,
                                                    Name: supply.supplierId
                                                })}>
                                                {<EditIcon />}
                                            </Button>

                                            <div className="mr-2"></div>

                                            <Button className="mr-2"
                                                variant="light"
                                                onClick={() => this.deleteSupply(supply.id)}>
                                                {<DeleteIcon />}
                                            </Button>

                                            <EditSupplyModal
                                                show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                supplyid={Id}
                                                supplydate={Date}
                                                supplier={Name} />

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