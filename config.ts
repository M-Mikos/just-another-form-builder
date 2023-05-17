// App's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBkfPrO9d_hAgG3wyybeP9kp6fSPQqhR70",
  authDomain: "just-another-form-builder.firebaseapp.com",
  databaseURL: "https://just-another-form-builder-default-rtdb.firebaseio.com",
  projectId: "just-another-form-builder",
  storageBucket: "just-another-form-builder.appspot.com",
  messagingSenderId: "318952263654",
  appId: "1:318952263654:web:b0d647770c0c8dc265d027",
};

// Avaliable fields:
export const AVAILABLE_FIELDS_TYPES: string[] = [
  "short",
  "paragraph",
  // "multiple choice",
  // "checkboxes",
  // "linear scale",
];

// UI:
export const DESCRIPTION_EXCERPT_LENGHT: number = 60;
export const FORM_AUTOSAVE_DEBOUNCE_TIME = 1500;

// Styles:
export const FORMS_COLORS: string[] = [
  "slate",
  "amber",
  "orange",
  "rose",
  "violet",
  "blue",
  "cyan",
  "emerald",
  "green",
];
