import { Generate_QR_Code_s, Login, Pin_s, Transaction_Details_s} from './ActionType';

const initialState = {
    userLoginData: [],
    userPinData:[],
    userQrCodeData:[],
    userSaleDetails:[]
};

export function mopsReducer(state = initialState, action) {
    switch (action.type) {
        case Login: 
        console.log('userData', action.payload.data);
            return { ...state, userLoginData: action.payload.data };
        case Pin_s:
            console.log('userData', action.payload.data);
            return { ...state, userPinData: action.payload.data };
        case Generate_QR_Code_s:
            console.log('userData', action.payload.data);
            return { ...state, userQrCodeData: action.payload.data };
        case Transaction_Details_s:
            console.log('userData', action.payload.data);
            return { ...state, userSaleDetails: action.payload.data };
        default:
            return state;
    }
}
