import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/auth.context";

const Comments = ({ restaurantId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(true); 
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`/api/comments/${restaurantId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error al obtener comentarios:', error);
      });
  }, [restaurantId, storedToken]); 

  useEffect(() => {
    if (comments.some(comment => comment.author === user._id)) {
      setShowCommentForm(false);
    }
  }, [comments, user]);

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleNewCommentSubmit = () => {
    axios.post('/api/comments/create', {
      content: newComment,
      restaurant: restaurantId,
    }, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        setComments([...comments, response.data]);
        setNewComment('');
        setShowCommentForm(false);
      })
      .catch(error => {
        console.error('Error al enviar el comentario:', error);
      });
  };

  return (
    <div className="comments">
      <h2>Comentarios</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>
            <p>{comment.content}</p>
            <p>Por: {comment.author}</p>
            <p>Respuestas: {comment.replies}</p>
          </li>
        ))}
      </ul>
      {showCommentForm && ( 
        <div>
          <textarea
            placeholder="Escribe tu comentario aquí"
            value={newComment}
            onChange={handleNewCommentChange}
          />
          <button onClick={handleNewCommentSubmit}>Agregar comentario</button>
        </div>
      )}
    </div>
  );
};

export default Comments;





