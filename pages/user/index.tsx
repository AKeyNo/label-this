import { useSession, signIn, signOut } from 'next-auth/react';
import Login from '../../components/login-btn';

const User = () => {
  return <Login />;
};

export default User;
