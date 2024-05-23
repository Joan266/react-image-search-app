import { combineSlices } from '@reduxjs/toolkit'
import { searchSlice } from './searchSlice'

export const rootReducer = combineSlices(searchSlice)