import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Divider, Row, Col, Card } from "antd";
import Comments from "../components/Comments";
import Ratings from "../components/Ratings";
import { Link } from "react-router-dom";





const { Title, Text } = Typography;

function RestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/restaurants/read/${id}`)
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  if (!restaurant) {
    return <div>Cargando...</div>;
  }


  const deleteRestaurant = (id) => {

    axios
      .delete(`/api/restaurants/delete/${id}`)
      .then(() => {
        navigate("/restaurants");
      })
      .catch((err) => console.log(err));
  };



  return (
    <div className="RestDetailPage">
      <Title level={2}>{restaurant.name}</Title>
      <Divider />
      

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Card cover={<img src={restaurant.image} alt="Descripción de la imagen" />} />
        </Col>
        <Col xs={24} sm={12}>
          <Title level={3}>Detalles del restaurante</Title>
          <Text strong>Adress:</Text>
          <Text>{restaurant.location.coordinates}</Text>
          <br />
          <Text strong>Descriptión:</Text>
          <Text>{restaurant.description}</Text>
          <br />
          <Text strong>Capacity:</Text>
          <Text>{restaurant.capacity}</Text>
          <br />
          <Text strong>Category:</Text>
          <Text>{restaurant.category}</Text>
          <br />
          <Text strong>City:</Text>
          <Text>{restaurant.city}</Text>
          <br />
          <Text strong>CPost code:</Text>
          <Text>{restaurant.postcode}</Text>
          <br />
          <Text strong>Phone:</Text>
          <Text>{restaurant.phone}</Text>
          <br />
          <Text strong>Price:</Text>
          <Text>{restaurant.price}</Text>
          <br />

          
          <button onClick={() => deleteRestaurant(id)}>Delete Restaurant</button>

      <Link
  to={`/restaurants/edit/${id}`}
  style={{ color: 'black' }}
>
  <button>Edit Restaurant</button>
</Link>
          <Ratings ratings={restaurant.ratings} />
          <Comments restaurantId={id} />
        </Col>
      </Row>
   
    </div>
  );
}

export default RestDetailPage;
