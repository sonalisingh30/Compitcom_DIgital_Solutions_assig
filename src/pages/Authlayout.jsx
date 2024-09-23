// Removed image imports

import ImageSlider from "../utils/ImageSlider";
import useDeviceWidth from "../hooks/useDevicWidth";
import { Link, Outlet } from "react-router-dom";
import { logo, logo_mobile } from "../data/fileImports";

function AuthLayout() {
  //   custom hook to check the device innerwidth
  const isMobile = useDeviceWidth(768);

  // determine the margin bottom

  return (
    <div className="mx-auto  flex  h-screen  w-screen  items-center justify-center  bg-transparent bg-gray-800  opacity-100 md:gap-x-[2rem] md:bg-transparent md:pr-2 md:opacity-100 xl:gap-x-[0rem]">
      <div className="flex h-screen min-h-screen w-screen max-w-full items-center  justify-center overflow-y-auto  md:gap-x-[1rem]">
        <div className="absolute  left-0 top-0 z-[-10] h-screen w-screen overflow-hidden opacity-35 md:static md:flex md:h-screen md:max-h-screen md:w-[75%]  md:items-center md:justify-center md:opacity-100 lg:w-full">
          <ImageSlider />
        </div>

        <div className=" mx-auto flex h-full w-full flex-col items-center  justify-start overflow-y-auto ">
          <div className=" mt-[1vh] flex flex-col items-center justify-start md:justify-center">
            <div className="flex  h-full w-full md:mt-0  justify-center items-center my-[2rem] !mt-[3rem]">
              <Link to="/">
                <img
                  src={isMobile ? logo_mobile : logo}
                  alt="logo"
                  className=" w-full h-[85px] md:h-[150px] fill-white"
                />
              </Link>
            </div>

            <h1 className=" font-raleway text-xl font-bold text-black flex justify-start  md:mb-[1vh] md:w-[425px] md:text-2xl  md:text-primary-normal_gray xl:w-[590px] xl:text-4xl">
              Manage your things with Classify
            </h1>
          </div>
          <div className="w-full flex justify-center items-center">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
