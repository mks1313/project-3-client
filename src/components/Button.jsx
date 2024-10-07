import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ children, onClick, style }) => {
  return (
    <button className="chulo-button" onClick={onClick} style={style}>
      {children}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.node.isRequired,   
  onClick: PropTypes.func.isRequired,    
  style: PropTypes.object                
};

export default Button;


