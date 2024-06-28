import AuthenticatedLayout2 from '@/Layouts/AuthenticatedLayout2';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout2
            user={auth.user}
            header={<h2 className="display-4 font-weight-bolder">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="container mt-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout2>
    );
}
