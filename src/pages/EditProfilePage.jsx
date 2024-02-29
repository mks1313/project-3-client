import { useState } from 'react';

function EditProfilePage({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '', 
    isOwner: false,
    sex: 'N/A',
    birthday: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />

      <label htmlFor="confirmPassword">Confirm Password:</label> {/* Nuevo campo */}
      <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} /> {/* Nuevo campo */}

      <label htmlFor="isOwner">Owner:</label>
      <input type="checkbox" id="isOwner" name="isOwner" checked={formData.isOwner} onChange={() => setFormData({ ...formData, isOwner: !formData.isOwner })} />

      <label htmlFor="sex">Sex:</label>
      <select id="sex" name="sex" value={formData.sex} onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="N/A">N/A</option>
      </select>

      <label htmlFor="birthday">Birthday:</label>
      <input type="date" id="birthday" name="birthday" value={formData.birthday} onChange={handleChange} />

      <button type="submit">Submit</button>
    </form>
  );
}

export default EditProfilePage;


