import axios from 'axios';

const useAuth = () => {
  const loginUser = async (data) => {
    const url = 'https://si-api-web-migrate-1.onrender.com/users/login';
    try {
      const res = await axios.post(url, data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userLogged', JSON.stringify(res.data.user));
    } catch (err) {
      throw err; // Lanza error para que sea manejado por el componente
    }
  };

  return { loginUser };
};

export default useAuth;
