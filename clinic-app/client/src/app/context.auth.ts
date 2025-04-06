import { createContext } from 'react'
import { IAuthContext } from './contextProvider.auth'

export const AuthContext = createContext<IAuthContext | null>(null)
