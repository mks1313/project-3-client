import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Divider, Row, Col, Card } from "antd";
// import Comments from "../components/Comments";
import Ratings from "../components/Ratings";

const { Title, Text } = Typography;

function RestDetailPage() {
  const { id } = useParams();
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
          <Text strong>Dirección:</Text>
          <Text>{restaurant.location.coordinates}</Text>
          <br />
          <Text strong>Descripción:</Text>
          <Text>{restaurant.description}</Text>
          <br />
          <Text strong>Capacidad:</Text>
          <Text>{restaurant.capacity}</Text>
          <br />
          <Text strong>Categoría:</Text>
          <Text>{restaurant.category}</Text>
          <br />
          <Text strong>Ciudad:</Text>
          <Text>{restaurant.city}</Text>
          <br />
          <Text strong>Código postal:</Text>
          <Text>{restaurant.postcode}</Text>
          <br />
          <Text strong>Teléfono:</Text>
          <Text>{restaurant.phone}</Text>
          <br />
          <Text strong>Precio:</Text>
          <Text>{restaurant.price}</Text>
          <br />

          {/* Mostrar comentarios y likes */}
          {/* <Comments comments={restaurant.comments} /> */}
          <Ratings ratings={restaurant.ratings} />
        </Col>
      </Row>
    </div>
  );
}

export default RestDetailPage;
