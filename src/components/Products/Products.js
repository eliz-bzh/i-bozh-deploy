import React, { Component } from 'react';
import { ButtonToolbar, Button, ButtonGroup, FormControl, Form, FormGroup, Alert, ListGroup, Row } from 'react-bootstrap';
import AddProductModal from './AddProduct';
import ProductOfGrid from './ProductOfGrid';
import ProductOfList from './ProductOfList';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import CheckBox from '../CheckBox';
import RadioBox from '../RadioBox';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ScrollTop from '../ScrollTop';
import { Carousel, ToggleButtons } from '..';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsFilters: [],
            brands: [],
            types: [],
            addModalShow: false,
            search: '',
            newFiltersBrands: [],
            newFiltersTypes: [],
            items: [
                { id: 1, label: 'Любой' },
                { id: 2, label: 'От большего к меньшему' },
                { id: 3, label: 'От меньшего к большему' }
            ],
            baners: [],
            sortBy: '',
            grid: true, showScroll: false
        };
    }

    componentDidMount() {
        this.brandsList();
        this.typesList();
        this.productsList();
        this.banersList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.addModalShow !== this.state.addModalShow) {
            this.productsList();
        }
    }

    banersList() {
        axios.get(`https://i-bozh-server.herokuapp.com/api/Product/baners`)
            .then(res => this.setState({ baners: res.data }))
    }

    brandsList() {
        axios.get(`https://i-bozh-server.herokuapp.com/api/Brand/getAll`)
            .then(res => this.setState({ brands: res.data }));
    }

    typesList() {
        axios.get(`https://i-bozh-server.herokuapp.com/api/Type/getAll`)
            .then(res => this.setState({ types: res.data }));
    }

    productsList() {
        axios.get('https://i-bozh-server.herokuapp.com/api/Product/getAll')
            .then(res => this.setState({ productsFilters: res.data }))
    }

    searchPanel(rows) {
        return rows.filter((row) => row.name.toLowerCase().indexOf(this.state.search.toLocaleLowerCase()) > -1);
    }

    filterList(list) {
        let newList = list;
        if (this.state.newFiltersBrands && this.state.newFiltersBrands.length) {
            newList = list.filter(a => this.state.newFiltersBrands.indexOf(a.brandId) > -1);
        }
        if (this.state.newFiltersTypes && this.state.newFiltersTypes.length) {
            newList = newList.filter(a => this.state.newFiltersTypes.indexOf(a.typeId) > -1);
        }
        return newList;
    }

    sortList(list, sortType) {
        let oldList = list;
        if (sortType === 'От меньшего к большему') {
            oldList = list.sort((a, b) => (a.price > b.price) ? 1 : -1);
        }
        if (sortType === 'От большего к меньшему') {
            oldList = list.sort((a, b) => (a.price < b.price) ? 1 : -1);
        }
        return oldList;
    }

    handleFiltersBrands = (filters) => {
        var newFilters = [...filters];
        this.setState({ newFiltersBrands: newFilters });
    }

    handleFiltersTypes = (filters) => {
        var newFilters = [...filters];
        this.setState({ newFiltersTypes: newFilters });
    }

    handleSortPrice = (sortType) => {
        this.setState({ sortBy: sortType });
    }

    render() {
        const { productsFilters, brands, types, search, items, grid, baners } = this.state;
        const addModalClose = () => this.setState({ addModalShow: false });
        const productsSearch = this.searchPanel(this.filterList(this.sortList(productsFilters, this.state.sortBy)));
        const list = (productsSearch && productsSearch.length !== 0) ? (
            (grid === true) ? (<Row className='d-flex justify-content-center'>{productsSearch.map(product => <ProductOfGrid key={product.id} productsUpdate={() => this.productsList()} product={product} role={this.props.role} />)}</Row>)
                : (<ListGroup>{productsSearch.map(product => <ProductOfList key={product.id} productsUpdate={() => this.productsList()} product={product} role={this.props.role} />)}</ListGroup>))
            : (<Alert className='mt-2 d-flex justify-content-center' variant='secondary'>Список пуст</Alert>)
        return (
            <div>
                {(baners.length !== 0) ? <div className="mt-2"><Carousel images={baners} /></div> : null}
                <ButtonToolbar className='float-right'>
                    {(this.props.role === 'admin') ? (
                        <Button variant="light"
                            onClick={() => {
                                this.setState({ addModalShow: true })
                            }}>
                            {<AddIcon />}Добавить новый товар
                        </Button>
                    ) : (null)}
                </ButtonToolbar>

                <div style={{ display: 'inline-flex' }}>
                    {/*Filter by brands*/}
                    <CheckBox items={brands} sortBy='Бренды' handleFilters={filters => this.handleFiltersBrands(filters)} />
                    <div className="mr-2"></div>
                    {/*Filter by category(types)*/}
                    <CheckBox items={types} sortBy='Категории' handleFilters={filters => this.handleFiltersTypes(filters)} />
                    <div className="mr-2"></div>
                    {/*Sorting by price*/}
                    <RadioBox list={items} handleSort={sort => this.handleSortPrice(sort)} />
                </div>

                <AddProductModal
                    show={this.state.addModalShow}
                    onHide={addModalClose}>
                </AddProductModal>
                <div className="mt-2"></div>
                {/*Search Panel*/}
                <Form>
                    <FormGroup>
                        <FormControl type="text" value={search} placeholder="Search" className="mr-sm-2"
                            onChange={(e) => this.setState({ search: e.target.value })} />
                    </FormGroup>
                </Form>

                <ToggleButtons items={[<ViewComfyIcon />, <FormatListBulletedIcon />]} variant='light' value={grid} onChange={(grid) => this.setState({ grid })} />
                {list}
                <ScrollTop />
            </div>
        )
    }
}