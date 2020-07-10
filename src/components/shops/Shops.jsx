import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Container, Modal, Table } from 'react-bootstrap';

import './shops.css';
import '../styles.css';

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // catch shop to pass to delete Modal
  const [shopId, setShopId] = useState();

  //
  const getShopsData = () => {
    const url = 'http://localhost:5000/api/shops';
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => setShops(data));
  };

  // handle delete modal
  const handleShow = (id) => {
    setShowModal(true);
    setShopId(id);
  };

  const handleClose = () => setShowModal(false);

  const deleteShop = () => {
    const url = `http://localhost:5000/api/shops/${shopId}`;
    axios
      .delete(url)
      .then((response) => response.data && setShowModal(false))
      .finally(() => getShopsData());
  };

  // fill table with shops data
  useEffect(() => {
    getShopsData();
  }, []);

  return (
    <Container>
      <div className="insideNavBar">
        <Link to="/admin/shops/add">
          <Button variant="insideNav">Ajouter une enseigne</Button>
        </Link>
      </div>

      <div>
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>Logo</th>
              <th>Name</th>
              <th>Ville</th>
              <th>Pays</th>
              <th>Theme</th>
              <th>E-Shop</th>
              <th>Boutique</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shops.map((shop) => (
              <tr>
                <td>{shop.id}</td>
                <td>logo</td>
                <td>
                  <Link to={`/admin/shops/update/${shop.id}`}>{shop.name}</Link>
                </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td>
                  <div className={shop.online ? 'e-shop' : 'shop'}>
                    {shop.online}
                  </div>
                </td>
                <td>
                  <div className={shop.offline ? 'e-shop' : 'shop'}>
                    {shop.offline}
                  </div>
                </td>
                <th> </th>
                <td>
                  <Link to={`/admin/shops/details/${shop.id}`}>
                    <Button variant="editing">Fiche</Button>
                  </Link>
                  <Link to={`/admin/shops/update/${shop.id}`}>
                    <Button variant="editing">Modifier</Button>
                  </Link>

                  <Button
                    variant="deleting"
                    onClick={() => handleShow(shop.id)}
                  >
                    Supprimer
                  </Button>

                  {/* Delete Modal */}
                  <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                      Supprimer l&apos;enseigne
                    </Modal.Header>
                    <Modal.Footer>
                      <Button onClick={handleClose}>Annuler</Button>
                      <Button onClick={() => deleteShop()}>Supprimer</Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Shops;
