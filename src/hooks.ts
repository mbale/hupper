import { createSelectorHook, createDispatchHook } from "react-redux"
import { RootState } from './store'

export const useAppDispatch = createDispatchHook()
export const useAppSelector = createSelectorHook<RootState>()
