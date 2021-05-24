import React, { useEffect, useState } from 'react';
import { ButtonToolbar, Button, FormControl, Form, FormGroup, Alert, ListGroup, Row } from 'react-bootstrap';
import AddProductModal from './AddProduct';
import ProductOfGrid from './ProductOfGrid';
import ProductOfList from './ProductOfList';
import AddIcon from '@material-ui/icons/Add';
import CheckBox from '../CheckBox';
import RadioBox from '../RadioBox';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ScrollTop from '../ScrollTop';
import { Carousel, ToggleButtons } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBaners, fetchBrands, fetchProducts, fetchSuppliers, fetchTypes } from '../../redux/actions/ActionFetchData';

const items = [
    { id: 1, label: 'Любой' },
    { id: 2, label: 'От большего к меньшему' },
    { id: 3, label: 'От меньшего к большему' }
];

const Products = ({ role }) => {

    const dispatch = useDispatch();
    const { products, brands, types, baners, suppliers } = useSelector(({ fetchDataReducer }) => fetchDataReducer);
    const [addModalShow, setAddModalShow] = useState(false);
    const [search, setSearch] = useState('');
    const [newFiltersBrands, setNewFiltersBrands] = useState([]);
    const [newFiltersTypes, setNewFiltersTypes] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [grid, setGrid] = useState(true);

    const addModalClose = () => setAddModalShow(false);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        } if (brands.length === 0) {
            dispatch(fetchBrands());
        } if (types.length === 0) {
            dispatch(fetchTypes());
        } if (baners.length === 0) {
            dispatch(fetchBaners());
        } if (suppliers.length === 0) {
            dispatch(fetchSuppliers());
        }
    }, [])

    const searchPanel = (rows) => {
        return rows.filter((row) => row.name.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1);
    }

    const filterList = (list) => {
        let newList = list;
        if (newFiltersBrands && newFiltersBrands.length) {
            newList = list.filter(a => newFiltersBrands.indexOf(a.brandId) > -1);
        }
        if (newFiltersTypes && newFiltersTypes.length) {
            newList = newList.filter(a => newFiltersTypes.indexOf(a.typeId) > -1);
        }
        return newList;
    }

    const sortList = (list, sortType) => {
        let oldList = list;
        if (sortType === 'От меньшего к большему') {
            oldList = list.sort((a, b) => (a.price > b.price) ? 1 : -1);
        }
        if (sortType === 'От большего к меньшему') {
            oldList = list.sort((a, b) => (a.price < b.price) ? 1 : -1);
        }
        return oldList;
    }

    const handleFiltersBrands = (filters) => {
        var newFilters = [...filters];
        setNewFiltersBrands(newFilters);
    }

    const handleFiltersTypes = (filters) => {
        var newFilters = [...filters];
        setNewFiltersTypes(newFilters);
    }

    const handleSortPrice = (sortType) => {
        setSortBy(sortType);
    }

    const productsSearch = searchPanel(filterList(sortList(products, sortBy)));
    const list = (productsSearch && productsSearch.length !== 0) ? (
        (grid === true) ? (<Row className='d-flex justify-content-center'>{productsSearch.map(product => <ProductOfGrid key={product.id} product={product} role={role} />)}</Row>)
            : (<ListGroup>{productsSearch.map(product => <ProductOfList key={product.id} product={product} role={role} />)}</ListGroup>))
        : (<Alert className='mt-2 d-flex justify-content-center' variant='secondary'>Список пуст</Alert>)

    return (
        <div>
            {(baners.length !== 0) ? <div className="mt-2"><Carousel images={baners} /></div> : null}
            <ButtonToolbar className='float-right'>
                {(role === 'admin') ? (
                    <Button variant="light"
                        onClick={() => setAddModalShow(true)}>
                        {<AddIcon />}Добавить новый товар
                    </Button>
                ) : (null)}
            </ButtonToolbar>

            <div style={{ display: 'inline-flex' }}>
                {/*Filter by brands*/}
                <CheckBox items={brands} sortBy='Бренды' handleFilters={filters => handleFiltersBrands(filters)} />
                <div className="mr-2"></div>
                {/*Filter by category(types)*/}
                <CheckBox items={types} sortBy='Категории' handleFilters={filters => handleFiltersTypes(filters)} />
                <div className="mr-2"></div>
                {/*Sorting by price*/}
                <RadioBox list={items} handleSort={sort => handleSortPrice(sort)} />
            </div>

            <AddProductModal
                show={addModalShow}
                onHide={addModalClose}
                types={types}
                brands={brands}
                suppliers={suppliers}>
            </AddProductModal>
            <div className="mt-2"></div>
            {/*Search Panel*/}
            <Form>
                <FormGroup>
                    <FormControl type="text" value={search} placeholder="Search" className="mr-sm-2"
                        onChange={(e) => setSearch(e.target.value)} />
                </FormGroup>
            </Form>

            <ToggleButtons items={[<ViewComfyIcon />, <FormatListBulletedIcon />]} variant='light' value={grid} onChange={(grid) => setGrid(grid)} />
            {list}
            <ScrollTop />
        </div>
    )
}

export default Products;