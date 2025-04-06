import { FC } from 'react'

export const LazyLoader: FC = () => {
	return (
		<div className='lazy-loader'>
			<div className='spinner'>
				<div className='circle'></div>
			</div>
		</div>
	)
}
