import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const MenuComponent = ({ menuIds }) => {
  const [menuItems, setMenuItems] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const fetchMenuItem = useCallback((menuId) => {
    return axios.get(`${API_BASE_URL}/menus/get/${menuId}`, {
      headers: { Authorization: `Bearer ${storedToken}` }
    });
  }, [storedToken]);

  const getMenuItemsData = useCallback(async () => {
    const promises = menuIds.map(menuId => fetchMenuItem(menuId));
    const responses = await Promise.all(promises);
    return responses.map(response => response.data);
  }, [menuIds, fetchMenuItem]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const menuItemsData = await getMenuItemsData();
        setMenuItems(menuItemsData);
      } catch (error) {
        console.error("Error al obtener los detalles del menú:", error);
      }
    };

    fetchMenuItems();
  }, [getMenuItemsData]);

  return (
    <div>
      {menuItems.length > 0 ? (
        menuItems.map((item, index) => (
          <div key={index}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))
      ) : (
        <p>Loading menu items...</p>
      )}
    </div>
  );
};

export default MenuComponent;


