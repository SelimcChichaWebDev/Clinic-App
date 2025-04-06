import { FC } from 'react'

interface IPaginationProps {
	page: number
	prevPage: () => void
	nextPage: () => void
	totalPages: number
}

export const Pagination: FC<IPaginationProps> = ({
	page,
	prevPage,
	nextPage,
	totalPages,
}) => {
	return (
		<div className='pagination'>
			<button className='auth-button' onClick={prevPage} disabled={page === 1}>
				Назад
			</button>
			<span>
				Страница {page} из {totalPages}
			</span>
			<button
				className='auth-button'
				onClick={nextPage}
				disabled={page === totalPages}
			>
				Вперед
			</button>
		</div>
	)
}
