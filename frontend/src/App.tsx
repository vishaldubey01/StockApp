import "./App.css";
import { useAuth } from "./store/AuthContext";
import Dashboard from "./app/Dashboard";
import LoginSignUp from "./app/LoginSignUp";

function App() {
    const { user } = useAuth();

    console.log(user);
    if (!user) {
        return <LoginSignUp />;
    }
    console.log("DASHBOARD");
    return <Dashboard />;
}

export default App;
