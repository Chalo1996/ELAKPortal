import {
  UPDATE_USER_DETAILS,
  SET_QUOTATION_DATA,
  SET_LOADING,
  RESET_STORE,
} from "../actions/groupCreditActions";

const initialState = {
  firstname: "",
  lastname: "",
  gender: "",
  country: "Kenya",
  phone: "",
  dob: null,
  email: "",
  countryCode: "+254",
  countryFlag: null,
  termschecked: false,
  sumAssured: "",
  termsInMonths: "",
  frequency: "",
  installments: "",
  retrenchment: false,
  isLoading: false,
  gcRate: 0.675,
  retRate: 0.775,
  discount: 70,
  freeCoverLimit: 5000000,
  quoteSubmitted: false,
  loading: false,
  quotationData: null,
  numOfPartners: "",
  partnerDates: [],
};

export const groupCreditReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_DETAILS:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case SET_QUOTATION_DATA:
      return {
        ...state,
        quotationData: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case RESET_STORE:
      return initialState;
    default:
      return state;
  }
};
