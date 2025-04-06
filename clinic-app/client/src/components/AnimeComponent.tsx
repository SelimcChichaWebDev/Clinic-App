import { motion } from 'framer-motion'
import { FC, PropsWithChildren } from 'react'

export const AnimeComponent: FC<PropsWithChildren> = ({ children }) => {
	return (
		<motion.div
			initial={{ opacity: 0, zoom: 0 }}
			animate={{ opacity: 1, zoom: 1 }}
			transition={{ duration: 0.8, type: 'spring', damping: 10 }}
		>
			{children}
		</motion.div>
	)
}
