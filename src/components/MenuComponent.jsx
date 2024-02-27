import { useState, useEffect } from 'react';
import axios from 'axios';

const MenuComponent = ({ menuIds }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = () => {
      const promises = menuIds.map(menuId =>
        axios.get(`/api/menus/get/${menuId}`)
      );

      Promise.all(promises)
        .then(responses => {
          const menuItemsData = responses.map(response => response.data);
          setMenuItems(menuItemsData);
        })
        .catch(error => {
          console.error('Error al obtener los detalles del menú:', error);
        });
    };

    fetchMenuItems();
  }, [menuIds]);

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {menuItems.map((menuItem, index) => (
          <li key={index}>
            <div>{menuItem.name}</div>
            <div>{menuItem.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuComponent;

