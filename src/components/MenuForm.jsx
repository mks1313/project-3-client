const MenuForm = ({ menus, handleMenuChange, handleAddMenu, handleRemoveMenu }) => {
  return (
    <div>
      <h4>Menus</h4>
      {menus.map((menu, index) => (
        <div key={index}>
          <input
            type="text"
            name={`menus[${index}].name`}
            value={menu.name}
            onChange={(e) => handleMenuChange(index, e)}
            placeholder="Name"
          />
          {/* Otros campos de menú */}
          <button type="button" onClick={() => handleRemoveMenu(index)}>
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

export default MenuForm;
