import { useState } from 'react';
import ErrorAlert from './ErrorAlert';

const SomeComponent = () => {
  const [error, setError] = useState(null);

  const handleError = (errorMessage) => {
    setError(errorMessage); 
  };

  const handleCloseError = () => {
    setError(null); 
  };

  return (
    <div>
      {error && <ErrorAlert message={error} onClose={handleCloseError} />}
      
      <button onClick={() => handleError("Something went wrong!")}>Trigger Error</button>
    </div>
  );
};

export default SomeComponent;

