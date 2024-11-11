import { FaBars } from "react-icons/fa";

export default  function Navbar({ onClick }: any) {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-gray-700 p-5 flex  justify-between">
        <div className="flex items-center">
          <button className="text-white" onClick={onClick}>
            <FaBars />
          </button>
          <h1 className="ml-4 text-white text-2xl font-semibold">
            Office Align
          </h1>
        </div>
      </nav>
    </div>
  );
}
