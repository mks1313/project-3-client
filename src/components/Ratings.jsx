import { Rate, Typography } from "antd";

const { Text } = Typography;

const Ratings = ({ ratings }) => {
  return (
    <div>
      <h3>Likes</h3>
      <Rate disabled defaultValue={ratings.length} />
      <Text>({ratings.length} votes)</Text>
    </div>
  );
};

export default Ratings;
