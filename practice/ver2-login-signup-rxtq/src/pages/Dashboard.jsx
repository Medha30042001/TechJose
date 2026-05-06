import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="max-w-4xl mx-auto mt-10 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Dashboard
          </h1>

          <p className="text-slate-600 mb-6">
            This page is protected. You can only see it after logging in.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              Logged-in User Details
            </h2>

            <p className="text-slate-700">
              <span className="font-semibold">Name:</span> {user?.name}
            </p>

            <p className="text-slate-700">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;