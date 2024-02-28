import { useState, useEffect } from "react";
import axios from "axios";

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUserData = () => {
      axios.get("/api/users/profile", { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => {
          setUserData(response.data.user); // El objeto `user` contiene los datos del usuario
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    };

    fetchUserData();
  }, [storedToken]);

  return (
    <div className="profile-page">
      <h1>Perfil de Usuario</h1>
      {userData ? (
        <div className="user-info">
          <img src={userData.profileImage} alt="Foto de perfil" />
          <p>Nombre: {userData.name}</p>
          <p>Correo electrónico: {userData.email}</p>
          <p>Sexo: {userData.sex}</p>
          <p>Fecha de nacimiento: {new Date(userData.birthday).toLocaleDateString()}</p>
          <p>Propietario: {userData.isOwner ? 'Sí' : 'No'}</p>
          {/* Aquí puedes agregar más campos según sea necesario */}
        </div>
      ) : (
        <p>Cargando datos de usuario...</p>
      )}
    </div>
  );
}

export default ProfilePage;

