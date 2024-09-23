import { useDispatch } from "react-redux";
import { setLogout } from "../slices/authSlice";
import { logo } from "../data/fileImports";

function Nav() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <nav className="bg-white shadow-lg px-6 py-4 flex justify-between items-center fixed top-0 w-screen z-10">
      {/* LOGO */}
      <div className="text-2xl font-bold ">
        <img src={logo} loading="lazy" alt="logo" className="w-[150px]" />
      </div>
      {/* PROFILE */}
      <div className="flex items-center gap-[2rem] ">
        <button
          onClick={handleLogout}
          className="ml-4 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Nav;
