import { HttpHeaders } from '@angular/common/http';
import { Consts } from '../../constants/const';

export class handleFunction {

    public hireExtendingMoney = [];
    public headerPost: HttpHeaders;
    public yearNames = [];
    public days = [];
    public date = new Date();
    public monthNames = [];
    public MorseCryptedFinalCode = "";
    public monthtoReturn;
    genaratemonthNames() {
        return this.monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"]
    }

    generateYears() {
        this.yearNames.push(2018);
        for (let i = 0; i < 100; i++) {
            this.yearNames.push(this.date.getFullYear() + i)
        } return this.yearNames;
    }

    getNewMonths(allMonthData) {
        this.monthtoReturn;
        allMonthData.forEach(element => {
            if (element.status === 1) {
                this.monthtoReturn = element.monthName;
            }
        });
        return this.monthtoReturn;
    }

    generateDays() {
        for (let i = 1; i < 32; i++) { this.days.push(i); } return this.days;
    }

    getMonthNumber(month) {
        switch (month) {
            case "January": return 1
            case "February": return 2
            case "March": return 3
            case "April": return 4
            case "May": return 5
            case "June": return 6
            case "July": return 7
            case "August": return 8
            case "September": return 9
            case "October": return 10
            case "November": return 11
            case "December": return 12
        }
    }
    generate2DigitNumber(data) {
        if (data.length == 1) {
            return '0' + data;
        } else {
            return data;
        }
    }
    generateMonthName(month) {
        switch (month) {
            case "01": return "January"
            case "02": return "February"
            case "03": return "March"
            case "04": return "April"
            case "05": return "May"
            case "06": return "June"
            case "07": return "July"
            case "08": return "August"
            case "09": return "September"
            case "10": return "October"
            case "11": return "November"
            case "12": return "December"
        }
    }

    sliceDate(day, monthno, year) {
        if (day[0] == 0) { day = day.slice(1, 2); }
        if (monthno[0] == 0) { monthno = monthno.slice(1, 2); }
        let convertedDate = this.getDate(day, monthno, year);
        return convertedDate;
    }

    getDate(day, monthno, year) {
        if (day < 10 && day > 0) {
            if (monthno < 10 && monthno > 0) { return year + "-0" + monthno + "-0" + day; }
            else { return year + "-" + monthno + "-0" + day; }
        }
        else {
            if (monthno < 10 && monthno > 0) { return year + "-0" + monthno + "-" + day; }
            else { return year + "-" + monthno + "-" + day; }
        }
    }

    getMoney() {
        this.hireExtendingMoney.push(35000);
        for (var i = 0; i < 70; i++) {
            var nextPush = this.hireExtendingMoney[i] + 500;
            this.hireExtendingMoney.push(nextPush);
        }
        return this.hireExtendingMoney;
    }


    findgst(nopid, gstArray) {
        if (nopid !== 'Select Name of The Party') {
            const data = nopid;
            switch (data.length) {
                case 25:
                    return gstArray[data.slice(-1)];
                case 26:
                    return gstArray[data.slice(-2)];
                case 27:
                    return gstArray[data.slice(-3)];
                case 28:
                    return gstArray[data.slice(-4)];
            }
        }
    }

    findowner(trucknoid, ownerArray) {
        if (trucknoid !== 'Select Truck Number') {
            const data = trucknoid;
            switch (data.length) {
                case 25:
                    return ownerArray[data.slice(-1)];
                case 26:
                    return ownerArray[data.slice(-2)];
                case 27:
                    return ownerArray[data.slice(-3)];
                case 28:
                    return ownerArray[data.slice(-4)];
            }
        }
    }

    findplace(trucknoid) {
        if (trucknoid !== 'Select Truck Number') {
            const data = trucknoid;
            console.log(data);

            switch (data.length) {
                case 24:
                    return data;
                case 25:
                    return data.slice(-1);
                case 26:
                    return data.slice(-2);
                case 27:
                    return data.slice(-3);
                case 28:
                    return data.slice(-4);
            }
        }
    }


    reduceData(data) {
        let dataArray = [];
        data.forEach((element, index) => {
            dataArray.push(data[index].truckNo);
        });
        let toSend = this.limitData(dataArray);
        return toSend;
    }

    reduceData2(data) {
        let dataArray = [];
        data.forEach((element, index) => {
            dataArray.push(data[index].truckno);
        });
        let toSend = this.limitData2(dataArray);
        return toSend;
    }

    limitData2(dataArray) {
        var temp = [];
        // dataArray.forEach(element => {
        for (var i = 0; i < dataArray.length; i++) {

            if (temp[0] == undefined) {
                temp.push(dataArray[i]);
            }
            else {
                for (var j = 0; j < temp.length; j++) {
                    if (temp[j] == dataArray[i]) {
                    }
                    else {
                        temp.push(dataArray[i]);
                    }
                };
            }
        };
        return temp;
    }

    limitData(dataArray) {
        var temp = [];
        // dataArray.forEach(element => {
        for (var i = 0; i < dataArray.length; i++) {

            if (temp[0] == undefined) {
                temp.push(dataArray[i]);
            }
            else {
                for (var j = 0; j < temp.length; j++) {
                    if (temp[j] == dataArray[i]) {
                    }
                    else {
                        temp.push(dataArray[i]);
                    }
                };
            }

        };
        return temp;
    }

    normalMorseCode(data) {
        let forCounter = 0;
        const morseArray = [];
        for (let i = 0; i < data.length; i++) {
            morseArray.push(Consts.MORSE_CODE[data.split("")[i]])
            let new_MorseCode = this.inverseMorseCode(Consts.MORSE_CODE[data.split("")[i]])
            forCounter++;
        }
        console.log('Final : ', this.MorseCryptedFinalCode);
        return this.MorseCryptedFinalCode;
        // if (forCounter === data.length) {
        //     this.complexIt(this.MorseCryptedFinalCode.split('2'))
        // }
    }
    inverseMorseCode(data) {

        const splittedMC = data.split("");
        let inverseMorseArray = [];
        for (let i = 0; i < splittedMC.length; i++) {
            if (splittedMC[i] === '.') {

                splittedMC[i] = '1'
            }
            else if (splittedMC[i] === '-') {

                splittedMC[i] = '0'
            }
            else if (splittedMC[i] === '*') {

                splittedMC[i] = '3'
            }
        }
        inverseMorseArray.push(splittedMC);
        this.concatStrigs(inverseMorseArray[0]);
    }

    concatStrigs(data) {
        for (let i = 0; i < data.length; i++) {
            this.MorseCryptedFinalCode = this.MorseCryptedFinalCode + data[i];
        }
        this.MorseCryptedFinalCode = this.MorseCryptedFinalCode + '2';

    }
    complexIt(dataToComplex) {
        let FinalizedComplextion = '';
        for (let i = 0; i < dataToComplex.length; i++) {
            FinalizedComplextion = FinalizedComplextion + parseInt(dataToComplex[i]) * (i + 1);
        }

    }
}