import { useNavigate } from "react-router-dom";

export const Cards = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center gap-8 py-10">
      {/* Admin Login Card */}
      <div className="bg-blue-300 shadow-lg rounded-lg p-6 w-80">
        <h2 className="text-xl text-black font-bold mb-4">Admin Login</h2>
        <p className="text-gray-600 font-semibold mb-6">
          Log in to create and manage employees and settings.
        </p>
        <button
          className="w-full bg-gray-700 text-white font-semibold py-2 rounded hover:bg-gray-900"
          onClick={() => navigate("/login")}
        >
          Login as Admin
        </button>
      </div>

      {/* Employee Login Card */}
      <div className="bg-yellow-300 shadow-md rounded-lg p-6 w-80">
        <h2 className="text-xl text-black font-bold mb-4">Employee Login</h2>
        <p className="text-gray-600 font-semibold mb-6">
          Login to access your dashboard and mark attendence.
        </p>
        <button
          className="w-full bg-gray-700 text-white font-semibold py-2 rounded hover:bg-gray-900"
          onClick={() => navigate("/employee-login")}
        >
          Login as Employee
        </button>
      </div>
    </div>
  );
};
