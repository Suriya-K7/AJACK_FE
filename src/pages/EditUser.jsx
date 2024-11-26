import AppLayout from "layout/AppLayout";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DataContext from "../context/DataContent";
import InputField from "components/InputField";



export default function EditUser() {
    const { id: dataId } = useParams();

    const { firstName, setFirstName, lastName, setLastName, email, setEmail, department, setDepartment, id, setId, getUserDataById, resetUserFields, handleUpdateUser, handleToast } = useContext(DataContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !department || !id) {
            handleToast("All fileds are mandatory", "warning");
            return;
        }

        handleUpdateUser(dataId);

    };

    useEffect(() => {
        if (dataId) getUserDataById(dataId);
    }, [dataId]);

    return (
        <AppLayout>
            <form className="min-h-[82vh] p-4 bg-gray-900">
                <div className="space-y-12">
                    <div className="pb-12 border-b border-white/10">
                        <h2 className="font-semibold text-white text-base/7">User Information</h2>
                        <p className="mt-1 text-gray-400 text-sm/6">Use a permanent address where you can receive mail.</p>

                        <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <InputField label={"First name"} id={"first-name"} type={"text"} placeholder={"enter your first name"} value={firstName} onChange={setFirstName} flag={true} />
                            <InputField label={"Last name"} id={"last-name"} type={"text"} placeholder={"enter your last name"} value={lastName} onChange={setLastName} flag={true} />
                            <InputField label={"Email"} id={"email"} type={"email"} placeholder={"enter your email"} value={email} onChange={setEmail} flag={false} />
                            <InputField label={"Department"} id={"department"} type={"text"} placeholder={"enter your department"} value={department} onChange={setDepartment} flag={false} />
                            <InputField label={"Id"} id={"id"} type={"text"} placeholder={"enter your id"} value={id} onChange={setId} flag={false} />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end mt-6 gap-x-6">
                    <Link to={"/"} type="button" className="font-semibold text-white text-sm/6"
                        onClick={resetUserFields}>
                        Cancel
                    </Link>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="px-3 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-md shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        update
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
