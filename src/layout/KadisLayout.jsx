import React, { useState, useEffect } from "react";
import { getMe } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/authSlice";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { BsDatabase } from "react-icons/bs";
import { BsDatabaseCheck } from "react-icons/bs";
import { BsDatabaseDash } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import ModalLogout from "../components/common/modal/ModalLogout";
import PropTypes from "prop-types";
import NotFound from "../pages/NotFound";

const KadisLayout = ({ children }) => {
  const { isError, user } = useSelector((state) => state.auth);
  let role;

  switch (user?.role) {
    case "admin":
      role = "Admin";
      break;
    case "secretary":
      role = "Sekertaris";
      break;
    default:
      role = user
        ? `Kepala Bidang ${user.division || "Unknown Division"}`
        : "Unknown Role";
      break;
  }

  const [isModalLogout, setIsModalLogout] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const menus = [
    { name: "Dasbor", link: "/kadis/dashboard", icon: MdOutlineDashboard },
    {
      name: "Data Surat",
      link: "/kadis/letters",
      icon: BsDatabase,
      submenus: [
        {
          name: "Belum Diproses",
          link: "/kadis/letters/not-process",
          icon: BsDatabaseDash,
        },
        {
          name: "Dalam Proses",
          link: "/kadis/letters/in-process",
          icon: BsDatabase,
        },
        {
          name: "Selesai Proses",
          link: "/kadis/letters/completed",
          icon: BsDatabaseCheck,
        },
        {
          name: "Disposisi",
          link: "/kadis/letters/dispositioned",
          icon: BsDatabaseCheck,
        },
      ],
    },
    {
      name: "Data PTK",
      link: "/kadis/ptk",
      icon: FaUsers,
      submenus: [
        {
          name: "Menunggu",
          link: "/kadis/ptk/waiting",
          icon: BsDatabaseDash,
        },
        {
          name: "Diterima",
          link: "/kadis/ptk/accepted",
          icon: BsDatabase,
        },
        {
          name: "Ditolak",
          link: "/kadis/ptk/rejected",
          icon: BsDatabaseCheck,
        },
      ],
    },
  ];

  const [open, setOpen] = useState(true);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const openModal = () => {
    setIsModalLogout(true);
  };

  const closeModal = () => {
    setIsModalLogout(false);
  };

  if (user === null || user === undefined) {
    return <NotFound />;
  }

  return (
    <section className="flex h-screen overflow-hidden ">
      <div
        className={`bg-white min-h-screen ${
          open ? "w-72" : "w-28"
        } duration-500 text-gray-500 box__shadow z-index-top px-4`}
      >
        <div className="flex items-center justify-between">
          <div className={`${open ? "" : "hidden"} `}>
            <h1 className="text-2xl font-bold text-red-600">E-OFFICE</h1>
          </div>
          <div className="flex justify-end py-3">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>
        <div className="relative flex flex-col gap-4 mt-4">
          {menus?.map((menu, i) => (
            <div key={i}>
              {menu.submenus ? (
                <div className="">
                  <div
                    className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:border-r-4 cursor-pointer ${
                      location.pathname.startsWith(menu.link)
                        ? `active__navlink_sidebar  ${open && "border-r-4"}`
                        : ""
                    } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:border-r-4 `}
                  >
                    <div>{React.createElement(menu.icon, { size: "20" })}</div>
                    <h2
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      {menu.name}
                    </h2>
                  </div>
                  <div className={`ml-6 `}>
                    {menu.submenus.map((submenu, j) => (
                      <NavLink
                        to={submenu.link}
                        key={j}
                        className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:border-r-4 sub-menu ${
                          location.pathname === submenu.link
                            ? `active__navlink_sidebar  ${open && "border-r-4"}`
                            : ""
                        } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:border-r-4`}
                      >
                        <div>
                          {React.createElement(submenu.icon, { size: "20" })}
                        </div>
                        <h2
                          style={{
                            transitionDelay: `${i + 3}00ms`,
                          }}
                          className={`whitespace-pre duration-500 ${
                            !open && "opacity-0 translate-x-28 overflow-hidden"
                          }`}
                        >
                          {submenu.name}
                        </h2>
                        <h2
                          className={`${
                            open && "hidden"
                          } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                        >
                          {submenu?.name}
                        </h2>
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  to={menu.link}
                  className={` ${menu?.margin && "mt-5"} ${
                    location.pathname === `${menu.link}`
                      ? `active__navlink_sidebar ${open && "border-r-4"} `
                      : ""
                  }  group flex items-center text-sm  gap-3.5 font-medium p-2 hover:border-r-4 `}
                >
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu?.name}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    {menu?.name}
                  </h2>
                </NavLink>
              )}
            </div>
          ))}
          <button
            onClick={() => openModal()}
            className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-red-600 rounded-md hover:text-white"
          >
            <div>{React.createElement(MdLogout, { size: "20" })}</div>
            <span
              style={{
                transitionDelay: `300ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Keluar
            </span>
            <span
              className={`${
                open && "hidden"
              } absolute left-48 hover:text-white bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              Keluar
            </span>
          </button>
        </div>
      </div>
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <header className="sticky top-0 flex flex-col items-end w-full py-4 bg-white px-14 z-index drop-shadow-1 box__shadow">
          <h3 className="font-normal">
            {" "}
            Selamat datang,{" "}
            <span className="font-bold">
              {user && user.name && user.name.toUpperCase()}
            </span>
          </h3>
        </header>
        <main className="h-screen p-4 md:p-6 2xl:p-10">{children}</main>
        {/* <footer className="sticky bottom-0 flex w-full p-4 bg-white z-index drop-shadow-1 box__shadow">
          Copyright © 2023 - All right reserved by Dinas Sosial Kabupaten
          Minahasa
        </footer> */}
      </div>
      <ModalLogout
        isOpen={isModalLogout}
        onClose={closeModal}
        logout={handleLogout}
      />
    </section>
  );
};

KadisLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default KadisLayout;
