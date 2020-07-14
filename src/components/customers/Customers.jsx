// import lib
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Table, Container, Col, Row } from 'react-bootstrap';

// import components
import CustomersList from './CustomersList';

// import data

// import style

function Customers() {
  const { history } = useHistory();
  const initialState = [
    {
      id: '0',
      firstname: 'John',
      lastname: 'Doh',
      email: 'jon@doh.com',
      adresse: 'Springfield',
    },
  ];

  // CRUD

  // GET all customers
  const [customers, setCustomers] = useState([]);

  const getCustomersList = () => {
    Axios({
      method: 'get',
      // url: 'http://givyoo.fr/api/clients',
      url: 'http://localhost:5000/api/clients',
    }).then((response) => setCustomers(response.data));
  };

  useEffect(() => {
    setCustomers(initialState);
    getCustomersList();
  }, []);

  // POST a customer

  // PUT a customer
  const editCustomer = (id) => {
    Axios.put(`http://localhost:5000/api/clients/${id}`, customers).then(
      (response) => response.status === 200 && history.push('/admin/customers')
    );
  };
  // DELETE a customer
  const deleteCustomer = (id) => {
    Axios.delete(`http://localhost:5000/api/clients/${id}`, customers)
      .then((response) => response.status === 200 && customers)
      .finally(() => getCustomersList());
  };

  return (
    <Container>
      <Row>
        <Col>
          <Table>
            <CustomersList
              customers={customers}
              deleteCustomer={deleteCustomer}
              editCustomer={editCustomer}
            />
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Customers;
