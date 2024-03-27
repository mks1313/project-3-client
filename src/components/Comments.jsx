import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/auth.context";
import "./Comments.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Comments = ({ restaurantId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false); 
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/comments/${restaurantId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        setComments(response.data);
        // Verificar si el usuario ha realizado un comentario
        const userHasCommented = response.data.some(comment => comment.author._id === user._id);
        setShowCommentForm(!userHasCommented); // Cambiar a true si el usuario no ha realizado un comentario
      })
      .catch(error => {
        console.error('Error al obtener comentarios:', error);
      });
  }, [restaurantId, storedToken, user]);

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleNewCommentSubmit = () => {
    axios.post('${API_BASE_URL}/comments/create', {
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
      <h2 id='comment'>Comments:</h2>
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment._id} className="comment-item">
            <div className="comment-content">
              <p>{comment.content}</p>
              <p>By: {comment.author ? comment.author.name : 'Anónimo'}</p>
            </div>
          </div>
        ))}
      </div>
      {showCommentForm && (
        <div className="comment-form">
          <textarea
            placeholder="Leave your comment here...."
            value={newComment}
            onChange={handleNewCommentChange}
          />
          <button onClick={handleNewCommentSubmit}>Add Comment</button>
        </div>
      )}
    </div>
  );
};

export default Comments;








