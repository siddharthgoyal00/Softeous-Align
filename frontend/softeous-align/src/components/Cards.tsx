export const Cards = ()=>{
    return  (
        <div className="flex justify-center gap-8 py-10">
        {/* Admin Login Card */}
        <div className="bg-blue-100 shadow-md rounded-lg p-6 w-80">
          <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
          <p className="text-gray-600 mb-6">Log in to create and manage employees and settings.</p>
          <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600">
            Login as Admin
          </button>
        </div>
    
        {/* Employee Login Card */}
        <div className="bg-green-100 shadow-md rounded-lg p-6 w-80">
          <h2 className="text-xl font-semibold mb-4">Employee Login</h2>
          <p className="text-gray-600 mb-6">Log in to access your dashboard and mark attendence.</p>
          <button className="w-full bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600">
            Login as Employee
          </button>
        </div>
      </div>
    )
}