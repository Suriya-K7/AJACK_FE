import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";
import { HomeIcon, UsersIcon } from "@heroicons/react/24/outline";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    // user variable
    const [firstName, setFirstName] = useState("dasd");
    const [lastName, setLastName] = useState("asdsd");
    const [email, setEmail] = useState("asdsd");
    const [department, setDepartment] = useState("asdsd");
    const [id, setId] = useState("asdd");

    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    const [navigation, setNavigation] = useState([
        { id: 1, name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
        { id: 2, name: 'Add User', href: '/adduser', icon: UsersIcon, current: false },
    ]);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleNavigation = (id) => {
        setNavigation(navigation.map((nav) => (nav.id === id ? { ...nav, current: true } : { ...nav, current: false })));
    };

    const handleCloseToast = () => {
        setOpen(false);
    };

    const resetUserFields = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setDepartment("");
        setId("");
    };

    const resetToast = async () => {
        setTimeout(() => {
            setMessage("");
            setType("");
            setOpen(false);
        }, 3000);
    };

    const handleToast = (message, type) => {
        setOpen(true);
        setMessage(message);
        setType(type);
        resetToast();
    };

    useEffect(() => {
        const loggedInUserJson = localStorage.getItem("loggedInUser");
        if (loggedInUserJson) {
            const user = JSON.parse(loggedInUserJson);
            setLoggedUser(user.student);
            setToken(user.token);
            setConfig({
                headers: {
                    authorization: `bearer ${user.token}`,
                },
            });
        }
        api.get("/")
            .then((res) =>
                console.log(res.data)
            ).catch((error) =>
                console.log(error));
    }, []);

    const getUserData = async (data) => {
        try {
            const response = await api.get("/users");

            setUserData(response.data.data);

        } catch (error) {
            handleToast("error on fetching user data", "error");

        }
    };

    const getUserDataById = async (id) => {
        try {
            const response = await api.get(`/users/${id}`);

            setFirstName(response.data.data.firstName);
            setLastName(response.data.data.lastName);
            setId(response.data.data.id);
            setDepartment(response.data.data.department);
            setEmail(response.data.data.email);

        } catch (error) {
            handleToast("error on fetching user data", "error");


        }
    };

    const handleAddUser = async (data) => {
        try {
            const response = await api.post("/users", data);

            setUserData(prev => [...prev, response.data.data]);

            navigate("/");

            resetUserFields();

            handleToast("User added successfully", "success");

            resetToast();

        } catch (error) {

            handleToast("error on adding user", "error");

        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const response = await api.delete(`/users/${id}`);

            setUserData(prev => prev.filter(user => user._id !== id));

            handleToast("User deleted successfully", "success");

            resetToast();

        } catch (error) {
            handleToast("user not found", "error");
        }
    };

    const handleUpdateUser = async (userId) => {
        try {
            const data = {
                firstName: firstName,
                lastName: lastName,
                department: department,
                email: email,
                id: id
            };

            const response = await api.patch(`/users/${userId}`, data);

            setUserData(prev => prev.map(user => user._id === data._id ? response.data.data : user));

            setOpen(true);
            setMessage("User updated successfully");
            setType("success");

            await resetToast();

            navigate("/");

            resetUserFields();

        } catch (error) {
            console.log(error);

        }
    };

    return (
        <DataContext.Provider
            value={{
                navigate, firstName, setFirstName, lastName, setLastName, email, setEmail, department, setDepartment, id, setId, userData, setUserData, handleAddUser, getUserData, handleDeleteUser, handleUpdateUser, getUserDataById, handleUpdateUser, resetUserFields, open, setOpen, message, setMessage, type, setType, handleCloseToast, handleToast, navigation, setNavigation, sidebarOpen, setSidebarOpen, handleNavigation
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;