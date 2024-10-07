import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types"; 

const API_BASE_URL = import.meta.env.VITE_API_URL;

const MenuComponent = ({ menuIds }) => {
  const [menuItems, setMenuItems] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const fetchMenuItem = useCallback(async (menuId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/menus/get/${menuId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      return response.data; 
    } catch (error) {
      console.error("Error fetching menu item:", error);
      throw error; 
    }
  }, [storedToken]);

  const getMenuItemsData = useCallback(async () => {
    try {
      const promises = menuIds.map((menuId) => fetchMenuItem(menuId));
      const responses = await Promise.all(promises);
      return responses; 
    } catch (error) {
      console.error("Error getting menu items data:", error);
      return []; 
    }
  }, [menuIds, fetchMenuItem]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const menuItemsData = await getMenuItemsData();
      setMenuItems(menuItemsData); 
    };
    fetchMenuItems();
  }, [getMenuItemsData]);

  return (
    <div>
      {menuItems.length > 0 ? (
        menuItems.map((item) => (
          <div key={item.id}> 
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

MenuComponent.propTypes = {
  menuIds: PropTypes.arrayOf(PropTypes.string).isRequired, 
};

export default MenuComponent;



