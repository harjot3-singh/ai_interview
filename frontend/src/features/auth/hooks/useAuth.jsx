import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout, getMe } from "../services/auth.api.jsx";
import { useEffect } from "react";
export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });

            if (data?.user) {
                setUser(data.user);
            } else {
                console.log("Login response missing user");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            if (data?.user) {
                setUser(data.user);
            } else {
                console.error('Registration failed: no user data returned');
            }
        } catch (err) {
            console.error('Registration error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
    const getAndSetUser = async () => {
        try {
            const data = await getMe();
            setUser(data.user);
        } catch (err) {
            console.log(err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    getAndSetUser();// also call it// here we called fucniton as well
    
}, []);


    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout,
    };
};