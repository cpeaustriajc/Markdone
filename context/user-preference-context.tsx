import { createContext, useContext, useState } from 'react'

export interface UserPreferenceData {
	activeDraftId: number
}

type UserPreferenceProviderProps = { children: React.ReactNode }

const UserPreference = createContext<UserPreferenceData | undefined>(undefined)

function UserPreferenceProvider({ children }: UserPreferenceProviderProps) {
	const [userPreference, setUserPreference] = useState<UserPreferenceData>()

	return <UserPreference.Provider value={userPreference}>{children}</UserPreference.Provider>
}

function useUserPreference() {
	const context = useContext(UserPreference)

	if (context === undefined) {
		throw new Error('useUserPreference must be used within a UserPreferenceProvider')
	}

	return context
}

export { UserPreferenceProvider, useUserPreference }
