import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/auth.context";
import "./Comments.css";

const Comments = ({ restaurantId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(true); 
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`/api/comments/${restaurantId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        console.log(response.data);
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
    <div className="comments-container">
      <h2>Comentarios</h2>
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment._id} className="comment-item">
            <div className="comment-content">
              <p>{comment.content}</p>
              <p>Por: {comment.author ? comment.author.name : 'Anónimo'}</p>
              <p>Respuestas: {comment.replies}</p>
            </div>
          </div>
        ))}
      </div>
      {showCommentForm && (
        <div className="comment-form">
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







