import {
	ChangeEvent,
	FC,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchData } from '../../api/form/fetchDataUsers.api-form'
import { AuthContext } from '../../app/context.auth'
import {
	AnimeComponent,
	ButtonControl,
	Pagination,
	TableUsers,
	Title,
} from '../../components/index.export'
import { IUsersFormDataTransformer } from '../../utils/transformUsers'

const UsersPage: FC = () => {
	const [usersData, setUsersData] = useState<IUsersFormDataTransformer[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [searchValue, setSearchValue] = useState('')
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
	const [sortField, setSortField] = useState<'fullName' | 'phone'>('fullName')
	const [page, setPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(1)
	const navigate = useNavigate()
	const authContext = useContext(AuthContext)

	const isAuth = authContext?.isAuth

	useEffect(() => {
		if (!isAuth) {
			navigate('/login')
		}
	}, [isAuth, navigate])

	useEffect(() => {
		fetchData(page, setTotalPages, setUsersData, setError, setLoading)
	}, [page])

	const searchValueHandler = (e: ChangeEvent<HTMLInputElement>) =>
		setSearchValue(e.target.value)

	const sortedAndFilteredUsers = useMemo(() => {
		const search = searchValue.toLowerCase().trim()

		const filtered = !search
			? usersData
			: usersData.filter(({ fullName, phone, problem }) =>
					[fullName, phone, problem].some(field =>
						field.toLowerCase().includes(search)
					)
			  )

		const sorted = [...filtered].sort((a, b) => {
			const valueA = a[sortField].toLowerCase()
			const valueB = b[sortField].toLowerCase()

			if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1
			if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1
			return 0
		})

		return sorted
	}, [searchValue, sortField, sortOrder, usersData])

	const nextPage = () => page < totalPages && setPage(prev => prev + 1)
	const prevPage = () => page > 1 && setPage(prev => prev - 1)

	return (
		<AnimeComponent>
			<Title title='Заявки с формы' />

			{error && <Title title={error} />}
			{!loading && !error && (
				<>
					<ButtonControl
						sortOrder={sortOrder}
						setSortOrder={setSortOrder}
						sortField={sortField}
						setSortField={setSortField}
						searchValueHandler={searchValueHandler}
						searchValue={searchValue}
					/>
					<TableUsers sortedAndFilteredUsers={sortedAndFilteredUsers} />
					<Pagination
						page={page}
						prevPage={prevPage}
						nextPage={nextPage}
						totalPages={totalPages}
					/>
				</>
			)}
		</AnimeComponent>
	)
}
export default UsersPage
