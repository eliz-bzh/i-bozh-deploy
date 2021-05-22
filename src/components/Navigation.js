import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import Badge from '@material-ui/core/Badge';
import { connect } from 'react-redux';

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            admin: true,
            client: true
        }
    }

    componentDidMount() {
        this.user();
    }

    user() {
        if (this.props.role === 'admin') {
            this.setState(({ admin }) => {
                return {
                    admin: !admin
                }
            })
        } else {
            this.setState(({ client }) => {
                return {
                    client: !client
                }
            })
        }
    }

    render() {
        const { admin, client } = this.state;
        const { login } = this.props.match.params;
        return (
            <Navbar collapseOnSelect expand="lg">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className='m-2' id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Item hidden={admin} >
                            <NavLink style={{ display: 'inline-block' }} className='nav-items mr-3' to='/admin/home'>Главная</NavLink>
                            <NavLink style={{ display: 'inline-block' }} className='nav-items mr-3' to='/admin/products'>Список товаров</NavLink>
                            <NavLink style={{ display: 'inline-block' }} className='nav-items mr-3' to='/admin/brands'>Бренды</NavLink>
                            <NavLink style={{ display: 'inline-block' }} className='nav-items mr-3' to='/admin/types'>Категории</NavLink>
                            <NavLink style={{ display: 'inline-block' }} className='nav-items mr-3' to='/admin/suppliers'>Поставщики</NavLink>
                            <NavLink style={{ display: 'inline-block' }} className='nav-items mr-3' to='/admin/supplies'>Поставки</NavLink>
                            <NavLink style={{ display: 'inline-block' }} className='nav-items mr-3' to='/admin/orders'>Заказы</NavLink>
                        </Nav.Item>
                        <Nav.Item hidden={client}>
                            <NavLink style={{ display: 'inline-block' }} className='nav-items mr-3' to={'/client/' + login + '/home'}>Главная</NavLink>
                            <NavLink style={{ display: 'inline-block' }} className='nav-items mr-3' to={'/client/' + login + '/products'}>Список товаров</NavLink>
                        </Nav.Item>
                    </Nav>
                    <Nav>
                        <Nav.Item>
                            <NavLink hidden={client} style={{ display: 'inline-block' }} className='nav-items mr-3' to={'/client/' + login + '/shoppingCart'}><Badge badgeContent={this.props.items.reduce((accumulator, product) => {
                                return accumulator + product.quantity;
                            }, 0)} color="secondary" showZero>{<ShoppingCartRoundedIcon />}</Badge></NavLink>
                            <NavLink hidden={client} style={{ display: 'inline-block' }} className='nav-items mr-3' to={'/client/' + login + '/help'}>{<HelpOutlineIcon />}</NavLink>
                            <NavLink hidden={admin} style={{ display: 'inline-block' }} className='nav-items mr-3' to='/admin/help'>{<HelpOutlineIcon />}</NavLink>
                            <NavLink style={{ display: 'inline-block' }} className='nav-items mr-3' to='/'>Выход</NavLink>
                        </Nav.Item>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        items: state.cartReducer.cartItems,
        role: state.roleReducer.role
    };
};

export default withRouter(connect(mapStateToProps)(Navigation));