import { Layout } from "antd";

const { Footer } = Layout;

const CustomFooter = () => {
  return (
    <Footer style={{ textAlign: "center", backgroundColor: "#001529", color: "#fff" }}>
      <div style={{ padding: "20px 0" }}>
        Este es un pie de página chulo.
      </div>
      <div>
        Creado con amor por <a href="https://www.ejemplo.com">Tu Nombre</a>
      </div>
    </Footer>
  );
};

export default CustomFooter;
