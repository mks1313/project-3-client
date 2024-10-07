import PropTypes from 'prop-types';

const MenuForm = ({ menus, handleMenuChange, handleAddMenu, handleRemoveMenu }) => {

  return (
    <div>
      <h4>Menus</h4>

      {menus.map((menu) => (
        <div key={menu.id || menu.name}> 
          <input
            type="text"
            name={`menus[${menu.id || menu.name}].name`} 
            value={menu.name}
            onChange={(e) => handleMenuChange(menu.id, e)} 
            placeholder="Name"
          />
          <button type="button" onClick={() => handleRemoveMenu(menu.id)}> 
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddMenu}>
        Add Menu, best for you
      </button>
    </div>
  );
};

MenuForm.propTypes = {
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,  
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleMenuChange: PropTypes.func.isRequired,
  handleAddMenu: PropTypes.func.isRequired,
  handleRemoveMenu: PropTypes.func.isRequired,
};

export default MenuForm;

