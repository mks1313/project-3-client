import { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = ({ restaurantId }) => {
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    // Realizar una solicitud GET al servidor para obtener los comentarios
    axios.get(`/api/comments/${restaurantId}`,{ headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        // Al recibir la respuesta, actualiza el estado con los comentarios obtenidos
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error al obtener comentarios:', error);
      });
  }, [restaurantId, storedToken]); 

  // Función para manejar el clic en "Mostrar más"
  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <div className="comments">
      <h2>Comments</h2>
      <ul>
        {comments.slice(0, showMore ? comments.length : 5).map(comment => (
          <li key={comment._id}>
            <p>{comment.content}</p>
            <p>By: {comment.author}</p>
            <p>Replies: {comment.replies}</p>
          </li>
        ))}
      </ul>
      {!showMore && comments.length > 5 && (
        <button onClick={handleShowMore}>Mostrar más comentarios</button>
      )}
    </div>
  );
};

export default Comments;


