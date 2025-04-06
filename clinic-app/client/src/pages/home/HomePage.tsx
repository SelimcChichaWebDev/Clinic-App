import { FC, useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../app/context.auth'

const HomePage: FC = () => {
	const navigate = useNavigate()
	const authContext = useContext(AuthContext)

	return (
		<div className='container'>
			<header className='header'>
				<nav className='navbar'>
					<button onClick={() => navigate('form')}>Form</button>
					<button onClick={() => navigate('login')}>Login</button>
					{authContext?.isAuth?.email && (
						<button onClick={() => navigate('users')}>Users</button>
					)}
				</nav>
			</header>
			<Outlet />
		</div>
	)
}

export default HomePage
