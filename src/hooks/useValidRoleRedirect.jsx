import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/auth-context/AuthContext';
import { messageBasic } from '../utils/HelperMessages';
import { useNavigate } from 'react-router-dom';

const useValidRoleRedirect = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const redirectUser = (token) => {
    const decoded = jwtDecode(token);
    const redireccion =
      decoded.userRoleName === 'Super Admin' ? '/admin' :
      decoded.userRoleName === 'User' ? '/profile' :
      null;

    if (redireccion === null) {
      messageBasic(
        'error',
        'Invalid role'
      );
    } else {
      login({ token, decoded });
      navigate(redireccion);
      messageBasic(
        'success',
        'Login successful',
        'top-end',
        false,
        1600
      );
    }
  };

  return redirectUser;
};

export default useValidRoleRedirect;
