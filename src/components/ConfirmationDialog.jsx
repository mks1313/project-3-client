
import Button from './Button'; 

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-dialog">
      <p>{message}</p>
      <Button onClick={onConfirm}>Confirm</Button>
      <Button onClick={onCancel}>Discard</Button>
    </div>
  );
};

export default ConfirmationDialog;

