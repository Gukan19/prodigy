
import { useAuth } from "../contexts/AuthContext";
import LoginForm from "../components/auth/LoginForm";
import Dashboard from "../components/Dashboard";

const Index = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <Dashboard />;
};

export default Index;
