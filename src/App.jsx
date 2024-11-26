import { Route, Routes } from "react-router-dom";
import { Dashboard, AddUser, EditUser } from "pages/index";

function App() {

  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/edituser/:id" element={<EditUser />} />
      </Routes>
    </>
  );
}

export default App;
