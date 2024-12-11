import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import authService from "./appwrite/authService";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => console.log("Something went wrong : ", error))
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className="h-screen w-full flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main className="w-full bg-neutral-400">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) :
    <div className="w-full h-screen flex items-center justify-center">
      Loading...
    </div>
}

export default App;
