
import { Platform } from 'react-native';

const Common ={
  
    convertBigDecimalUSDC:(amount) => {
        let strValue = "";
        try {
            const amt = parseFloat(amount.replace(",", ""));
            const format = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
            });
            strValue = format.format(amt).replace("$", "").replace("USD", "").replace("CYN", "");
        } catch (ex) {
            console.log(ex);
        }
        return strValue;
    },
    
    convertDate :(date) => {
        let strDate = "";
        try {
            const spf = new Date(date);
            const options = { month: "2-digit", day: "2-digit", year: "numeric" };
            strDate = spf.toLocaleDateString("en-US", options);
        } catch (ex) {
            console.log(ex);
        }
        return strDate;
    },

     convertTime:(time) => {
        let strTime = "";
        try {
            const spf = new Date(time);
            const options = { hour: "numeric", minute: "numeric", hour12: true };
            strTime = spf.toLocaleTimeString("en-US", options).replace(" ", "");
        } catch (ex) {
            console.log(ex);
        }
        return strTime;
    },
    convertTwoDecimal:(strAmount) => {
        let strValue = "";
        try {
            if (strAmount.includes(" ")) {
                const split = strAmount.split(" ");
                const convertedAmt = convertBigDecimalUSDC(split[0]);
                strValue = `${convertedAmt} ${split[1]}`;
            } else {
                const convertedAmt = convertBigDecimalUSDC(strAmount);
                strValue = convertedAmt;
            }
            console.log("str", strValue);
        } catch (ex) {
            console.log(ex);
        }
        return strValue;
    },
    todayDate:() => {
        const currentDate = new Date().toISOString().split('T')[0];
        const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
        const currentDateTime = currentDate + ' ' + currentTime;
        return currentDateTime;
    },
}


export default Common;
