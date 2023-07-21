import { Dispatch, SetStateAction} from 'react'

export interface UserPreferenceData {
	activeDraftId: number | undefined
}

export type UserPreferenceProviderProps = { children: React.ReactNode }
export type UserPreferenceContext = {
	userPreference: UserPreferenceData
	setUserPreference: Dispatch<SetStateAction<UserPreferenceData>> | undefined
}
