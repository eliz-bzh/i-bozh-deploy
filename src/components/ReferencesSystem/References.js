import React, { Component } from 'react';
import './references.css';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, ButtonToolbar } from 'react-bootstrap';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import { Modal, Row, Col, Form } from 'react-bootstrap';

export default class References extends Component {

  constructor(props) {
    super(props);
    this.state = { addModalShow: false, editModalShow: false, deleteModalShow: false };
  }

  render() {
    if (this.state.deleteModalShow) {
      window.confirm('Вы уверены?')
    }
    const { addModalShow, editModalShow } = this.state;
    const addModalClose = () => this.setState({ addModalShow: false });
    const editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <h1>Справочная система</h1>

        {(this.props.role === 'admin') ? (
          <div>
            <h2>Данное приложение разработано для
            автоматизации работы магазина техники. С помощью данного приложения
                  управляющий может с лёгкостью вести учёт своей работы.</h2>
            <ButtonToolbar>
              <div className='app-header'>
                <Button onClick={() => this.setState({ addModalShow: true })}
                  variant="light" >
                  {<AddIcon />}
                          Добавить новый ...
                      </Button>
                <span className='span-style'>Кнопка для функции добавления.
                      Нажав на неё отобразиться модель для добавления нового элемента в список.</span>
              </div>
              <div>
                <Modal
                  size="lg"
                  show={addModalShow}
                  onHide={addModalClose}
                  aria-labelledby="contained-modal-title-vcenter">
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Добавление нового ...
                          </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row>
                      <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                          <Form.Group controlId="name">
                            <Form.Label>Строка</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Строка" />
                          </Form.Group>
                          <Form.Group>
                            <Button variant="light">
                              Добавить ...
                                            </Button>
                          </Form.Group>
                        </Form>
                      </Col>
                    </Row>
                  </Modal.Body>
                  <Modal.Footer>

                    <Button variant="light" onClick={addModalClose}>
                      Закрыть
                        </Button>

                  </Modal.Footer>
                </Modal>
              </div>


              <div className='app-header'>
                <Button onClick={() => this.setState({ editModalShow: true })}
                  variant="light">
                  {<EditIcon />}
                </Button>
                <span className='span-style'>Кнопка для функции редактирования.
                      Нажав на неё отобразиться модель для редактирования выбраного элемента в списоке со старыми данными.</span>
              </div>
              <div>
                <Modal
                  size="lg"
                  show={editModalShow}
                  onHide={editModalClose}
                  aria-labelledby="contained-modal-title-vcenter">
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Редактирование ...
                          </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row>
                      <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                          <Form.Group controlId="name">
                            <Form.Label>Строка</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Строка" />
                          </Form.Group>
                          <Form.Group>
                            <Button variant="light">
                              Изменить ...
                                            </Button>
                          </Form.Group>
                        </Form>
                      </Col>
                    </Row>
                  </Modal.Body>
                  <Modal.Footer>

                    <Button variant="light" onClick={editModalClose}>
                      Закрыть
                        </Button>

                  </Modal.Footer>
                </Modal>
              </div>

              <div className='app-header'>
                <Button onClick={() => this.setState({ deleteModalShow: true })}
                  variant="light">
                  {<DeleteIcon />}
                </Button>
                <span className='span-style'>Кнопка для функции удаления.
                      Нажав на неё отобразиться окно соглашения на удаление выбраного элемента из списка.</span>
              </div>

            </ButtonToolbar>
            <div>
              <h2>Панель меню:</h2>
              <li>Главная - главная страница приложения. Приветствует пользователя.</li>
              <li>Список товаров - страница для просмотра и работы со всем списком товаров.</li>
              <li>Бренды - страница для просмотра и работы со списком существующих брендов товаров.</li>
              <li>Категории - страница для просмотра и работы со списком существующих категорий товаров.</li>
              <li>Поставки - страница для просмотра и работы со списком принятых поставок.</li>
              <li>Поставщики - страница для просмотра и ведения учёта информации о поставщиках.</li>
              <li>{<HelpOutlineIcon />} - страница справочной системы.</li>
            </div>
          </div>
        ) : (
          <div>
            <ButtonToolbar>
              <div className='app-header'>
                <Button onClick={() => this.setState({ deleteModalShow: true })}
                  variant="light">
                  {<DeleteIcon />}
                </Button>
                <span className='span-style'>Кнопка для функции удаления.
                      Нажав на неё произойдёт удаление выбраного элемента из списка корзины.</span>
              </div>
              <div className='app-header'>
                <Button onClick={() => this.setState({ deleteModalShow: true })}
                  variant="light">
                  {<ShoppingCartRoundedIcon />}
                </Button>
                <span className='span-style'>Кнопка для функции добавления товара в корзину.
                    Нажав товар добавится в корзину.</span>
              </div>
            </ButtonToolbar>
            <div>
              <h2>Панель меню:</h2>
              <li>Главная - главная страница приложения. Приветствует пользователя.</li>
              <li>Список товаров - страница для просмотра и работы со всем списком товаров.</li>
              <li>{<ShoppingCartRoundedIcon />}<sup>1</sup> - страница для просмотра и работы со всем списком товаров, добавленных в корзину.</li>
              <li>{<HelpOutlineIcon />} - страница справочной системы.</li>
            </div>
          </div>
        )}

      </div>
    );
  }
};