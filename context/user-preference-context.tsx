import { UserPreferenceContext, UserPreferenceData, UserPreferenceProviderProps } from '@/types/user-preference-context'
import { createContext, useContext, useState } from 'react'



const UserPreference = createContext<UserPreferenceContext | undefined>(undefined)

function UserPreferenceProvider({ children }: UserPreferenceProviderProps) {
	const [userPreference, setUserPreference] = useState<UserPreferenceData>({ activeDraftId: 1 })

	const value = { userPreference, setUserPreference }

	return <UserPreference.Provider value={value}>{children}</UserPreference.Provider>
}

function useUserPreference() {
	const context = useContext(UserPreference)

	if (context === undefined) {
		throw new Error('useUserPreference must be used within a UserPreferenceProvider')
	}

	return context
}

export { UserPreferenceProvider, useUserPreference }
