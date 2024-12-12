import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice';
import authService from '../../appwrite/authService';

function LogoutBtn() {
    const dispatch = useDispatch();


    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout());
            }).catch((error) => {
                console.log(error);
            })
    }
    // logout button
    return (
        <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}>
            logout
        </button>
    )
}

export default LogoutBtn