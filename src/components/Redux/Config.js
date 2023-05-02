
import axios from "axios"

export const Base_URL ='http://dev23-api-gateway-511281183.us-east-1.elb.amazonaws.com:80/'

export const LoginApi ='api/v2/m-pos/login'
export const PinApi = 'api/v2/m-pos/validate-pin'
export const BatchAPi = 'api/v2/m-pos/today-batch'
export const Transaction_SummaryApi = 'api/v2/m-pos/transaction/summary'
export const Transaction_DetailsApi = 'api/v2/m-pos/token/info'
export const Refund_Verify = '/api/v2/node/mpos/refund/verify'
export const Refund_Process = '/api/v2/node/mpos/refund/process'
export const DiscardApi = 'api/v2/m-pos/discard-sale'
export const Exit_SaleApi = 'api/v2/m-pos/exit-sale'
export const LogoutApi = 'api/v2/m-pos/logout'
export const Generate_QR_CodeApi ='api/v2/m-pos/generate-qrcode'
export const LogsApi ='api/v2/m-pos/transaction/logs'
export const ProfileUrl ='/api/v2/profile/download-url'

export const callAPI = async (EndPoint, Body) => {
    const headers = {
        'Accept': '*/*',
        'Accept-Language': 'en',
        'SkipDecryption': 'em',
        'X-REQUESTID': 'em',
        'requested-portal': 'mpos',
        'Content-Type': 'application/json',
    };
    try {
        const response = await axios.post(`${Base_URL}${EndPoint}`, JSON.stringify(Body), { headers });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
export const callAuthAPI = async (EndPoint, Body, Authorization) => {
    const headers = {
        'Accept': '*/*',
        'Accept-Language': 'en',
        'SkipDecryption': 'em',
        'X-REQUESTID': 'em',
        'requested-portal': 'mpos',
        'Content-Type': 'application/json',
        'Authorization': Authorization, 
    };
    try {
        const response = await axios.post(
            `${Base_URL}${EndPoint}`,
            JSON.stringify(Body),
            { headers }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const callAuthAPI1 = async (EndPoint,Body,token,Authorization) => {
    const headers = {
        'Accept': '*/*',
        'Accept-Language': 'en',
        'SkipDecryption': 'em',
        'X-REQUESTID': 'em',
        'requested-portal': 'mpos',
        'Content-Type': 'application/json',
        'Authorization': Authorization,
    };
    try {
        const response = await axios.post(
            `${Base_URL}${EndPoint}?token=${token}`,
            JSON.stringify(Body),
            { headers }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const callAuthAPI2 = async (EndPoint,gbxId,type,subtype, Authorization) => {
    const headers = {
        'Accept': '*/*',
        'Accept-Language': 'en',
        'SkipDecryption': 'em',
        'X-REQUESTID': 'em',
        'requested-portal': 'mpos',
        'Content-Type': 'application/json',
        'Authorization': Authorization,
    };
    try {
        const response = await axios.get(
            `${Base_URL}${EndPoint}/${gbxId}/${type}/${subtype}`,
            { headers }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};


 