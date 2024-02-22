
import { Comment, Avatar, Typography } from "antd";

const { Text } = Typography;

const Comments = ({ comments }) => {
  return (
    <div>
      <h3>Comentarios</h3>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          author={comment.author}
          avatar={<Avatar src={comment.avatar} alt={comment.author} />}
          content={<p>{comment.text}</p>}
        />
      ))}
    </div>
  );
};

export default Comments;
