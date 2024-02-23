import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Authenticate the user
      axios.post('/api/login', { email, password })
        .then(response => {
          console.log(response.data); 
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      // Register a new user
      axios.post('/api/signup', { email, password })
        .then(response => {
          console.log(response.data); 
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        {!isLogin && <input type="password" placeholder="Confirm Password" required />}
        <button type="submit">{isLogin ? 'Sign In' : 'Sign Up'}</button>
      </form>
      <p>{isLogin ? 'Don\'t have an account? ' : 'Already have an account? '}<span onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign Up' : 'Sign In'}</span></p>
    </div>
  );
};

export default LoginPage;


