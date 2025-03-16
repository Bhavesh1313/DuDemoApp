import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { LANGUAGE_CODES } from '../../utils/constants';

export interface LanguagePreferencesState {
  selectedLanguage: string;
}

const initialLanguageState: LanguagePreferencesState = {
  selectedLanguage: LANGUAGE_CODES.ENGLISH,
};

export const languageSlice = createSlice({
  name: 'language',
  initialState: initialLanguageState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.selectedLanguage = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
