// import React from 'react'

import { Link } from "react-router-dom";

interface Logo {
  width?: string;
}
// Basic Logo
function Logo({ width = "100px" }: Logo) {
  return (
    <Link to={"/"}>
      <div className={`w-[100px] w-[${width}]`}>
        <img className="object-cover h-full w-full" src="/logo.png" alt="" />
      </div>
    </Link>
  )
}

export default Logo