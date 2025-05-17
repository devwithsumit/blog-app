// import React from 'react'

import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import Container from "../container/Container";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const navigate = useNavigate()

  // nav items to make the SIMILAR navbar easily (Production level)
  // slug is ROUTE of the nav items,
  // active shows in which ROUTE are we currently
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    }
  ]

  return (
    <header className="py-3 shadow bg-neutral-200">
      <Container>
        <nav className="flex">
          <div className="mr-4 cursor-pointer">
            <Logo width="80px" />
            <Link to={'/'} />
          </div>
          <ul className="flex ml-auto">
            {/* using map for each navitems and placing them */}
            {navItems.map((item) =>
              item.active && (
                <button key={item.name} onClick={() => navigate(item.slug)} className={`inline-block mx-2 px-6 py-2 duration-100 backdrop-blur-sm backdrop-opacity-65 border shadow hover:bg-gray-100 rounded-full`}>
                  {item.name}
                </button>
              )
            )}
          </ul>
          {/* authStatus = true -> logout (only when user is logged in) */}
          {authStatus && (
            <LogoutBtn />
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Header
