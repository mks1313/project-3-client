import { useState, useEffect } from 'react';
import axios from 'axios';

const MenuComponent = ({ menuIds }) => {
  const [menuItems, setMenuItems] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchMenuItems = () => {
      const promises = menuIds.map(menuId =>
        axios.get(`/api/menus/get/${menuId}`,{ headers: { Authorization: `Bearer ${storedToken}` } })
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
  }, [menuIds, storedToken]);

  return (
    <div>
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
          <div>
            
          </div>
    </div>
    
  );
};

export default MenuComponent;

