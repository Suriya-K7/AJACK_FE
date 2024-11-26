import { PencilSquareIcon, TrashIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import AppLayout from "layout/AppLayout";
import { useContext, useEffect } from "react";
import DataContext from "../context/DataContent";

const people = [
    {
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        firstName: "suriya",
        lastName: "K7",
        id: "WL172",
        department: "Marketing",
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
];

export default function Dashboard() {

    const { getUserData, userData, handleDeleteUser, navigate } = useContext(DataContext);

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <AppLayout>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {userData && userData.map((person, index) => (
                    <li key={index} className="col-span-1 bg-gray-300 divide-y divide-gray-200 rounded-lg shadow cursor-pointer hover:shadow-sm hover:shadow-white">
                        <div className="flex items-center justify-between w-full gap-6 p-6 pb-3 ">
                            <div className="flex flex-col flex-1 gap-1 truncate">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-sm font-medium text-gray-900 truncate">{person.firstName} {person.lastName}</h3>
                                </div>
                                <span className="w-fit inline-flex shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    {person.id}
                                </span>
                                <p className="text-sm text-gray-500 truncate">{person.department}</p>
                            </div>
                            {/* <img alt="" src={"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"} className="bg-gray-300 rounded-full size-10 shrink-0" /> */}
                            <UserCircleIcon className="h-14" />
                        </div>
                        <div>
                            <div className="flex -mt-px divide-x divide-gray-200">
                                <div className="flex flex-1 w-0">
                                    <button
                                        className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-semibold text-gray-900 duration-200 border border-transparent rounded-bl-lg gap-x-3 hover:scale-110"
                                        onClick={() => handleDeleteUser(person._id)}
                                    >
                                        <TrashIcon aria-hidden="true" className="text-black duration-200 size-5 " />
                                        Delete
                                    </button>
                                </div>
                                <div className="flex flex-1 w-0 -ml-px">
                                    <button
                                        className="relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-semibold text-gray-900 duration-200 border border-transparent rounded-br-lg gap-x-3 hover:scale-110"
                                        onClick={() => navigate(`/edituser/${person._id}`)}
                                    >
                                        <PencilSquareIcon aria-hidden="true" className="text-black size-5" />
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </AppLayout>
    );
}
