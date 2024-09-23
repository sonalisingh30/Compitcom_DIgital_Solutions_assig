import MainSpce from "../components/MainSpce";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";

function DashboardLayout() {
  return (
    <div className="w-full flex flex-col gap-y-[1rem] h-screen">
      {/* NAVIGATION BAR */}
      <Nav />
      {/* PAGE CONTENT */}
      <div className="p-[2rem]  mt-[8rem] h-full flex gap-x-5 w-full">
        <SideBar />
        <MainSpce />
      </div>
    </div>
  );
}

export default DashboardLayout;
