import PropTypes from 'prop-types'; 
import Button from './Button'; 

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {  

  return (
    <div className="confirmation-dialog">
      <p>{message}</p>
      <Button onClick={onConfirm} style={{ marginRight: '20px' }}>Confirm</Button>
      <Button onClick={onCancel} style={{ marginLeft: '20px' }}>Discard</Button>
    </div>
  );
};

ConfirmationDialog.propTypes = {
  message: PropTypes.string.isRequired, 
  onConfirm: PropTypes.func.isRequired,   
  onCancel: PropTypes.func.isRequired,  
};

export default ConfirmationDialog;


