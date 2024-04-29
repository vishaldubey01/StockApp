import "./App.css";
import { useAuth } from "./store/AuthContext";
import Dashboard from "./app/Dashboard";
import LoginSignUp from "./app/LoginSignUp";

function App() {
    const { user } = useAuth();

    if (!user) {
        return <LoginSignUp />;
    }

    return <Dashboard />;
}

export default App;
