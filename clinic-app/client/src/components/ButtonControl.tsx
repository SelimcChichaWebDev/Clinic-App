import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'

interface IButtonControlProps {
	sortOrder: 'asc' | 'desc'
	setSortOrder: Dispatch<SetStateAction<'asc' | 'desc'>>
	sortField: 'fullName' | 'phone'
	setSortField: Dispatch<SetStateAction<'fullName' | 'phone'>>
	searchValueHandler: (e: ChangeEvent<HTMLInputElement>) => void
	searchValue: string
}

export const ButtonControl: FC<IButtonControlProps> = ({
	sortOrder,
	setSortOrder,
	sortField,
	setSortField,
	searchValueHandler,
	searchValue,
}) => {
	return (
		<div className='button-control'>
			<button
				className='auth-button'
				onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
			>
				Сортировка ({sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию'})
			</button>

			<select
				className='auth-select'
				value={sortField}
				onChange={e => setSortField(e.target.value as 'fullName' | 'phone')}
			>
				<option value='fullName'>ФИО</option>
				<option value='phone'>Телефон</option>
			</select>
			<input
				type='text'
				placeholder='Поиск по ФИО, Телефон или Проблема'
				className='auth-button'
				onChange={searchValueHandler}
				value={searchValue}
			/>
		</div>
	)
}
