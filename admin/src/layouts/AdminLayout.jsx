import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import {
  LuLayoutDashboard, LuNewspaper, LuImage, LuUsers, LuBuilding2,
  LuFileText, LuBellRing, LuLandmark, LuFolderKanban, LuGavel,
  LuMapPin, LuVideo, LuMail, LuLogOut,
} from "react-icons/lu";

const navItems = [
  { to: "/", label: "Dashboard", icon: <LuLayoutDashboard /> },
  { to: "/news", label: "News", icon: <LuNewspaper /> },
  { to: "/sliders", label: "Slider", icon: <LuImage /> },
  { to: "/departments", label: "Departments (Wings)", icon: <LuBuilding2 /> },
  { to: "/officials", label: "Officials", icon: <LuUsers /> },
  { to: "/pages", label: "Pages", icon: <LuFileText /> },
  { to: "/announcements", label: "Announcements", icon: <LuBellRing /> },
  { to: "/resources", label: "Laws / Downloads / AIT", icon: <LuFileText /> },
  { to: "/cause-lists", label: "Cause Lists", icon: <LuGavel /> },
  { to: "/taxes", label: "Taxes", icon: <LuLandmark /> },
  { to: "/albums", label: "Gallery", icon: <LuImage /> },
  { to: "/videos", label: "Videos", icon: <LuVideo /> },
  { to: "/projects", label: "Projects", icon: <LuFolderKanban /> },
  { to: "/sdcs", label: "SDCs", icon: <LuMapPin /> },
  { to: "/contact-messages", label: "Messages", icon: <LuMail /> },
];

const AdminLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <aside
        className="d-flex flex-column p-3"
        style={{ width: 260, background: "var(--gradient)", color: "#fff" }}
      >
        <div className="mb-4">
          <h5 className="fw-bold mb-0">BOR CMS</h5>
          <small className="text-white-50">Board of Revenue, KP</small>
        </div>

        <nav className="flex-grow-1 d-flex flex-column gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none ${
                  isActive ? "bg-white text-primary fw-semibold" : "text-white-50"
                }`
              }
            >
              {item.icon} <span style={{ fontSize: 14 }}>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-top border-white-50 pt-3 mt-3">
          <div className="mb-2" style={{ fontSize: 13 }}>
            {user?.fullName} <br />
            <span className="text-white-50 text-capitalize">{user?.role}</span>
          </div>
          <button
            className="btn btn-sm btn-light w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={() => dispatch(logout())}
          >
            <LuLogOut /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-grow-1 p-4" style={{ background: "var(--bg)" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;