import React, { Component } from 'react';
import { ButtonToolbar, Button, Table, Alert } from 'react-bootstrap';
import AddBrandModal from './AddBrands';
import EditBrandModal from './EditBrands';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import ScrollTop from '../ScrollTop';

export default class Brands extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brands: [],
            snackBaropen: false,
            snackBarMessage: '',
            addModalShow: false,
            editModalShow: false
        };
    }

    componentDidMount() {
        this.brandsList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.addModalShow !== this.state.addModalShow || prevState.editModalShow !== this.state.editModalShow) {
            this.brandsList();
        }
    }

    deleteBrand(id) {
        if (window.confirm('Вы уверены?')) {
            axios.delete(`https://i-bozh-server.herokuapp.com/api/Brand/delete/${id}`)
                .then(res => this.brandsList())
                .catch(error => console.log(error));
        }
    }

    brandsList() {
        axios.get(`https://i-bozh-server.herokuapp.com/api/Brand/getAll`)
            .then(res => this.setState({ brands: res.data }));
    }

    snackBarClose = (event) => {
        this.setState({ snackBaropen: false });
    }


    render() {
        const { brands, Id, Name } = this.state;
        const addModalClose = () => this.setState({ addModalShow: false });
        const editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div>
                <ButtonToolbar className='float-right mt-2 mb-2'>
                    <Button variant="light"
                        onClick={() => {
                            this.setState({ addModalShow: true })
                        }}>
                        {<AddIcon />}Добавить новый бренд
                    </Button>
                </ButtonToolbar>

                <AddBrandModal
                    show={this.state.addModalShow}
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
                                                onClick={() => this.setState({
                                                    editModalShow: true,
                                                    Id: brand.id,
                                                    Name: brand.name
                                                })}>
                                                {<EditIcon />}
                                            </Button>

                                            <div className="mr-2"></div>

                                            <Button className="mr-2"
                                                variant="light"
                                                onClick={() => this.deleteBrand(brand.id)}>
                                                {<DeleteIcon />}
                                            </Button>

                                            <EditBrandModal
                                                show={this.state.editModalShow}
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
}