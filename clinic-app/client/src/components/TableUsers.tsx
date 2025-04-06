import { FC } from 'react'
import { IUsersFormDataTransformer } from '../utils/transformUsers'

interface ITableUsersProps {
	sortedAndFilteredUsers: IUsersFormDataTransformer[]
}

export const TableUsers: FC<ITableUsersProps> = ({
	sortedAndFilteredUsers,
}) => {
	return (
		<div className='table-container'>
			<table className='custom-table'>
				<thead>
					<tr>
						<th>Дата отправки</th>
						<th>ФИО</th>
						<th>Телефон</th>
						<th>Проблема</th>
					</tr>
				</thead>
				<tbody>
					{sortedAndFilteredUsers.map(
						({ createdAt, fullName, phone, problem }, index) => (
							<tr key={index}>
								<td>{createdAt}</td>
								<td>{fullName}</td>
								<td>{phone}</td>
								<td>{problem}</td>
							</tr>
						)
					)}
				</tbody>
			</table>
		</div>
	)
}
