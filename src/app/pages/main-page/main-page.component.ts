import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { handleFunction } from '../../common/services/functions/handleFunctions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [ApiCallsService]
})
export class MainPageComponent implements OnInit {
  public jsonData=[
    {
        "Pipe": {
            "Hire": 0,
            "Advance": 0
        }
    },
    {
        "Fittings": {
            "Hire": 0,
            "Advance": 5
        }
    }
]
public objectKeys = Object.keys;
// public data=[
//   {
//   "truckno": "TN86 B 5431",
//   "loadingDate": "2022-07-23",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "R Gunasekaran",
//     "accountNumber": "20044773141",
//     "bankName": "SBIN",
//     "ifsc": "SBIN",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN58 BR 3901",
//   "loadingDate": "2021-02-19",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Raju M",
//     "accountNumber":  "31332714791",
//     "bankName": "SBI",
//     "ifsc": "SBIN0007464",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 U 4259",
//   "loadingDate": "2022-10-20",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Venkateshwaran",
//     "accountNumber":  "1667101028736",
//     "bankName": "CNRB",
//     "ifsc": "CNRB",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 T 0604",
//   "loadingDate": "2021-06-25",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M Kulamani",
//     "accountNumber": 2113074503,
//     "bankName": "KKBK",
//     "ifsc": "KKBK0000521",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH45 AF 6969",
//   "loadingDate": "2021-10-27",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Anil Hemant Kolekar",
//     "accountNumber":  "8850100027919",
//     "bankName": "BABB",
//     "ifsc": "BABROAKLUJX",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN29 CY 7836",
//   "loadingDate": "2021-06-23",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "A Saravanan",
//     "accountNumber":  "760802010006633",
//     "bankName": "UBIN",
//     "ifsc": "UBIN0576085",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH14 HG 4667",
//   "loadingDate": "2022-09-21",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Swapnil D Chougule",
//     "accountNumber": "50100460428173",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0003455",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 AQ 8848",
//   "loadingDate": "2021-06-23",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "R Arumugam",
//     "accountNumber":  "33349407652",
//     "bankName": "SBI",
//     "ifsc": "SBIN0012793",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AR 0336",
//   "loadingDate": "2022-08-22",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M Selvaraj",
//     "accountNumber": "1277155000188922",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001277",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN25 BK 5951",
//   "loadingDate": "2022-10-20",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Rajesh",
//     "accountNumber":  "269501000008639",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0002695",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN10 BP 9959",
//   "loadingDate": "2022-09-24",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Shree Jothi Roadlines",
//     "accountNumber":  "777705550549",
//     "bankName": "ICICI",
//     "ifsc": "ICICI",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN28 BH 3252",
//   "loadingDate": "2022-08-08",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "P Manimulathi",
//     "accountNumber":  "1166155000081156",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001166",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN90 F 4237",
//   "loadingDate": "2022-10-13",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Jothi Sathish Kumar",
//     "accountNumber":  "6616786229",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000U036",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AR 2556",
//   "loadingDate": "2022-09-15",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Arun Kumar",
//     "accountNumber": "37862954872",
//     "bankName": "SBI",
//     "ifsc": "SBIN0007463",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN16 F 9387",
//   "loadingDate": "2022-08-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "V Vallarasu",
//     "accountNumber":  "6242930492",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000E036",
//     "acc12": false,
//     "acc65": false,
//     "acc363": false
//   }
// },{
//   "truckno": "TN58 BF 3966",
//   "loadingDate": "2022-04-15",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Karthikeya Sakthi Tpt",
//     "accountNumber":  "259344566770",
//     "bankName": "INDB",
//     "ifsc": "INDB0001345",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN16 E 8922",
//   "loadingDate": "2021-07-20",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "V Gomathi",
//     "accountNumber": 502579133,
//     "bankName": "IDIB",
//     "ifsc": "IDIB000K241",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN29 BR 2684",
//   "loadingDate": "2022-04-28",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Manidevam",
//     "accountNumber":  "34356098599",
//     "bankName": "SBI",
//     "ifsc": "SBIN0003834",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH14 JL 5081",
//   "loadingDate": "2022-01-06",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Harish Roadlines",
//     "accountNumber":  "87102000058946",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0000087",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH24 AV 6955",
//   "loadingDate": "2022-08-17",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Patel Tpt ",
//     "accountNumber": "5511173847",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0000724",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN02 BU 0510",
//   "loadingDate": "2022-08-27",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "D Manikandan\t",
//     "accountNumber":  "30883880575",
//     "bankName": "SBI",
//     "ifsc": "SBIN0007108",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN23 CP 1802",
//   "loadingDate": "2022-04-07",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Pram Kumar",
//     "accountNumber":  "154301000013124",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001543",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 AT 9573",
//   "loadingDate": "2021-09-07",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Kanchana",
//     "accountNumber":  "7000459236",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000K172",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN48 BC 0499",
//   "loadingDate": "2022-08-19",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Perfect Transport",
//     "accountNumber":  "10041427509",
//     "bankName": "IDFB",
//     "ifsc": "IDFB00080451",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN40 S 0353",
//   "loadingDate": "2021-01-28",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Anukodi",
//     "accountNumber":  "31450239251",
//     "bankName": "SBI",
//     "ifsc": "SBIN0014254",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 AH 7797",
//   "loadingDate": "2022-10-18",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Saravanan B",
//     "accountNumber": "045100050305971",
//     "bankName": "TMBL",
//     "ifsc": "TMBL0000045",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN72 BX 3261",
//   "loadingDate": "2022-07-05",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Jeyapaul M",
//     "accountNumber":  "138701000016456",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001387",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN70 AS 5617",
//   "loadingDate": "2022-06-25",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Nagarajuna E",
//     "accountNumber":  "20425380489",
//     "bankName": "SBI",
//     "ifsc": "SBIN0007824",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AM 4052",
//   "loadingDate": "2022-04-21",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "G Jagnatham",
//     "accountNumber":  "817110110005658",
//     "bankName": "BKID",
//     "ifsc": "BKID0008171",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH12 LT 8025",
//   "loadingDate": "2022-10-07",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Shivaji R Mulage",
//     "accountNumber": "6225101005953",
//     "bankName": "CNRB",
//     "ifsc": "CNRB",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA07 AL 7084",
//   "loadingDate": "2022-09-13",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "E Thiyagarajan",
//     "accountNumber": "1666101015497",
//     "bankName": "CNRB",
//     "ifsc": "CNRB0001666",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA22 D 4084",
//   "loadingDate": "2022-02-27",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Rahim M Shaikh",
//     "accountNumber":  "5402210054558",
//     "bankName": "CNRB",
//     "ifsc": "CNRB0010540",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN42 AF 0066",
//   "loadingDate": "2022-03-19",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Global Roadways",
//     "accountNumber":  "9750279000",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0008785",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN28 BE 7525",
//   "loadingDate": "2022-03-17",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "N Boopesh Kumar",
//     "accountNumber":  "622205016199",
//     "bankName": "ICICI",
//     "ifsc": "ICIC0006222",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH14 HU 0727",
//   "loadingDate": "2022-02-03",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Harsh Roadlines",
//     "accountNumber":  "87102000058946",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0000087",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN90 F 0878",
//   "loadingDate": "2021-07-24",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Selladurai G",
//     "accountNumber":  "1109155000145573",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001109",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN39 CW 0936",
//   "loadingDate": "2022-09-15",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M Govindrajan",
//     "accountNumber":  "6352221415",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000P037",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN56 Q 6266",
//   "loadingDate": "2022-04-12",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "S Kavin",
//     "accountNumber":  "1703135000001074",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001703",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN68 AF 4785",
//   "loadingDate": "2022-04-04",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "SenthilKumar",
//     "accountNumber":  "1203101063946",
//     "bankName": "CNRB",
//     "ifsc": "CNRB0001203",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TEST1",
//   "loadingDate": "2023-10-04",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Name",
//     "accountNumber": "22930040410368984",
//     "bankName": "BankName",
//     "ifsc": "IFSC",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN28 BH 3215",
//   "loadingDate": "2022-02-07",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "KKP Tpt",
//     "accountNumber":  "5234201000092",
//     "bankName": "CNRB",
//     "ifsc": "CNRB",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN85 P 3648",
//   "loadingDate": "2021-12-13",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Mathi Logistics",
//     "accountNumber":  "50200011328560",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0001254",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 U 5798",
//   "loadingDate": "2021-05-28",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "R John Peter",
//     "accountNumber":  "1758155000057289",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001758",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN45 BC 5707",
//   "loadingDate": "2021-10-30",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Shanmugavel",
//     "accountNumber":  "1697155000079274",
//     "bankName": "Other",
//     "ifsc": "Other",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH45 AF 7878",
//   "loadingDate": "2021-04-10",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Aviksha T&T",
//     "accountNumber":  "513701013000073",
//     "bankName": "VIJB",
//     "ifsc": "VIJB0005137",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN45 CZ 9436",
//   "loadingDate": "2021-07-16",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K Parthipan",
//     "accountNumber":  "920010056440197",
//     "bankName": "UTIB",
//     "ifsc": "UTIB0001563",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN48 BA 4519",
//   "loadingDate": "2022-10-15",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "SAKTHIVEL A",
//     "accountNumber":  "1134155000038421",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001134",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA01 AJ 4242",
//   "loadingDate": "2021-12-22",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Krishna M",
//     "accountNumber":  "6182630010",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000N112",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AA 9835",
//   "loadingDate": "2021-08-07",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Kumaressan",
//     "accountNumber":  "35282986158",
//     "bankName": "SBI",
//     "ifsc": "SBIN0007495",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN02 BW 6791",
//   "loadingDate": "2022-08-09",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Manikandan D",
//     "accountNumber": "30883880575",
//     "bankName": "SBI",
//     "ifsc": "SBIN0007108",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN37 DY 3700",
//   "loadingDate": "2022-07-20",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "D Paramasivan",
//     "accountNumber": "1279155000071783",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001665",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN61 S 7240",
//   "loadingDate": "2021-12-27",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Muruganantham Paramasivam",
//     "accountNumber":  "500101012839958",
//     "bankName": "CIUB",
//     "ifsc": "CIUB0000024",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH04 KU 4173",
//   "loadingDate": "2022-09-24",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Akshay Shinde",
//     "accountNumber":  "603104000095105",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0000603",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN93 B 9282",
//   "loadingDate": "2021-04-21",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "N Anandan",
//     "accountNumber":  "6412670824",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0000525",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN29 BR 1657",
//   "loadingDate": "2022-07-14",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Siva V",
//     "accountNumber":  "760802010006817",
//     "bankName": "UBIN",
//     "ifsc": "UBIN0576085",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN50 M 6746",
//   "loadingDate": "2021-09-07",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "G Venkadesan",
//     "accountNumber":  "52601502357",
//     "bankName": "ICICI",
//     "ifsc": "ICIC0000526",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN45 BZ 9370",
//   "loadingDate": "2022-05-21",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Manikandan V",
//     "accountNumber":  "1647155000127524",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001647",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN29 BZ 2794",
//   "loadingDate": "2022-01-04",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Vijayalakshmi S",
//     "accountNumber":  "6521059845",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000P037",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN12 AE 3750",
//   "loadingDate": "2022-10-08",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Thangadurai V",
//     "accountNumber":  "1833104000004060",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0001833",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN47 AM 3933",
//   "loadingDate": "2022-05-31",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "SRI PALANIMURUGAN",
//     "accountNumber":  "1218135000001385",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001218",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN23 CW 8845",
//   "loadingDate": "2021-03-22",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "P Murugesan",
//     "accountNumber":  "270601000006942",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0002706",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 BB 6726",
//   "loadingDate": "2022-04-09",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "V.Deivasigamani",
//     "accountNumber":  "623301121788",
//     "bankName": "ICICI",
//     "ifsc": "ICIC0006233",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN48 AK 1091",
//   "loadingDate": "2022-08-09",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "P Lakshminayanan",
//     "accountNumber":  "302314419991",
//     "bankName": "SBI",
//     "ifsc": "SBIN0008181",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN72 BP 1071",
//   "loadingDate": "2021-01-08",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "S Kannadasan",
//     "accountNumber":  "34800920141",
//     "bankName": "SBIN",
//     "ifsc": "SBIN0011941",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AT 5828",
//   "loadingDate": "2021-07-10",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K Arul",
//     "accountNumber":  "917010037797762",
//     "bankName": "UTIB",
//     "ifsc": "UTIB0002097",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN92 F 0972",
//   "loadingDate": "2022-09-21",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Mayandi N",
//     "accountNumber":  "1694155000052568",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001831",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN21 BQ 0883",
//   "loadingDate": "2022-10-23",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Prabhu R",
//     "accountNumber":  "6410114974",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000O010",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN11 AX 9562",
//   "loadingDate": "2022-05-09",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "R Raman",
//     "accountNumber":  "4446698876",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0008525",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN56 J 3564",
//   "loadingDate": "2022-10-08",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "G Saraswati",
//     "accountNumber":  "1831155000005071",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001831",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN42 AJ 8650",
//   "loadingDate": "2022-06-23",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Selvaraj",
//     "accountNumber":  "11770100270862",
//     "bankName": "FDRL",
//     "ifsc": "FDRL0001177",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN58 BB 7441",
//   "loadingDate": "2022-01-24",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Sree Sairam Logistics\t",
//     "accountNumber":  "1626135000005365",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001626",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN41 AK 0680",
//   "loadingDate": "2021-02-12",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "N Raja",
//     "accountNumber":  "50200047060415",
//     "bankName": "Other",
//     "ifsc": "Other",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN70 AB 1221",
//   "loadingDate": "2022-04-26",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "K Periasamy",
//     "accountNumber":  "1742155000007605",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001742",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN36 BW 5389",
//   "loadingDate": "2022-08-23",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Prakash N",
//     "accountNumber": "31376009255",
//     "bankName": "SBI",
//     "ifsc": "SBIN0007592",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN05 BV 4485",
//   "loadingDate": "2022-07-28",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K Selvaraj",
//     "accountNumber": "6787045964",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000T009",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN47 AL 5105",
//   "loadingDate": "2022-05-31",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "J Selvam",
//     "accountNumber":  "1259153000005515",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001259",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN68 X 2535",
//   "loadingDate": "2021-02-09",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Malathi Kaisankar",
//     "accountNumber":  "6954841184",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000P186",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH13 AX 4883",
//   "loadingDate": "2021-09-14",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Jalinder D Shinde",
//     "accountNumber":  "39359859772",
//     "bankName": "SBIn",
//     "ifsc": "SBIN0016288",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN42 AF 1756",
//   "loadingDate": "2021-01-05",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "P Anandha Prakash",
//     "accountNumber":  "20463032980",
//     "bankName": "SBIN",
//     "ifsc": "SBIN0012788",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH12 QG 7576",
//   "loadingDate": "2022-10-29",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Rajendra S Borole",
//     "accountNumber":  "68002197806",
//     "bankName": "MAHB",
//     "ifsc": "MAHB0001413",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH24 AV 4725",
//   "loadingDate": "2022-01-22",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Survase C Dagdu",
//     "accountNumber":  "34060119832",
//     "bankName": "SBI",
//     "ifsc": "SBIN0008115",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN25 AS 0265",
//   "loadingDate": "2021-08-06",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Sampath R",
//     "accountNumber":  "5963101000200",
//     "bankName": "CNRB",
//     "ifsc": "CNRB0005963",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN42 AD 5896",
//   "loadingDate": "2022-02-10",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Global Roadways",
//     "accountNumber":  "9750279000",
//     "bankName": "KKBK",
//     "ifsc": "KKBK",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH03 CV 2438",
//   "loadingDate": "2021-09-07",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Vishal Jayasekar",
//     "accountNumber":  "124901504466",
//     "bankName": "ICICI",
//     "ifsc": "ICIC0001249",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH14 KA 5027",
//   "loadingDate": "2022-10-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Harsh Roadlines",
//     "accountNumber": "87102000058946",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0000087",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN33 BR 7168",
//   "loadingDate": "2022-10-21",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Arun Kumar R",
//     "accountNumber": "1129155000203514",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001129",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TEST5",
//   "loadingDate": "2023-10-04",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Name",
//     "accountNumber": "22930040348765520",
//     "bankName": "BankName",
//     "ifsc": "IFSC",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH14 KA 8953",
//   "loadingDate": "2022-10-11",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Harsh Roadlines",
//     "accountNumber": "87102000058946",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0000087",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN10 BQ 0459",
//   "loadingDate": "2022-09-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M.VIMALA DEVI",
//     "accountNumber":  "50100308363478",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0002770",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AM 2814",
//   "loadingDate": "2022-07-07",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "P.gopi",
//     "accountNumber":  "6891305913",
//     "bankName": "IBIB",
//     "ifsc": "IBIB000S077",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 BB 5180",
//   "loadingDate": "2022-03-20",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Vengadesan T",
//     "accountNumber":  "3985806348",
//     "bankName": "Central",
//     "ifsc": "CBIN0282411",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH14 JL 8027",
//   "loadingDate": "2022-09-16",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Harsh Roadlines",
//     "accountNumber": "87102000058946",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0000087",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN10 BR 2670",
//   "loadingDate": "2022-07-23",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K Palani",
//     "accountNumber": "159487887887",
//     "bankName": "INDB",
//     "ifsc": "INDB0000854",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH45 AF 1644",
//   "loadingDate": "2021-10-07",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Inus Nizam Shaikh",
//     "accountNumber":  "649601505002",
//     "bankName": "ICICI",
//     "ifsc": "ICIC0006496",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA32 D 0618",
//   "loadingDate": "2021-04-13",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Faulatrao Alaguni",
//     "accountNumber":  "60259592222",
//     "bankName": "MAHN",
//     "ifsc": "MAHB0000149",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN12 AM 3537",
//   "loadingDate": "2022-08-16",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Sandhiya Roadlines",
//     "accountNumber": "9311962328",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0008955",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN83 D 5342",
//   "loadingDate": "2022-03-10",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Manivannan Palani",
//     "accountNumber":  "6714196078",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000M184",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH48 AY 6571",
//   "loadingDate": "2021-03-23",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Rohit R Sathe",
//     "accountNumber":  "68878100004737",
//     "bankName": "BABR",
//     "ifsc": "BARBOUGHADE",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN55 BS 1350",
//   "loadingDate": "2022-10-27",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Mohan C",
//     "accountNumber": "101901000046735",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001019",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN30 CA 3477",
//   "loadingDate": "2021-12-13",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "D Madhesan",
//     "accountNumber":  "33789464766",
//     "bankName": "SBI",
//     "ifsc": "SBIN0017743",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 V 2039",
//   "loadingDate": "2022-03-06",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "J Murali",
//     "accountNumber":  "334102010407686",
//     "bankName": "UBIN",
//     "ifsc": "UBIN0533416",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH24 AU 3611",
//   "loadingDate": "2021-10-27",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Akash B Waghmare",
//     "accountNumber":  "1451104000057293",
//     "bankName": "IBKL",
//     "ifsc": "IBKL000145",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN29 BV 7664",
//   "loadingDate": "2022-08-30",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "R Palani",
//     "accountNumber":  "1813155000001793",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001813",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN90 F 5190",
//   "loadingDate": "2021-10-11",
//   "a12": false,
//   "a363": true,
//   "acc": {
//     "accountName": "Suresh Kumar K",
//     "accountNumber":  "50200047627153",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0002410",
//     "acc12": false,
//     "acc363": true,
//     "acc65": false
//   }
// },{
//   "truckno": "AP39 TS 8276",
//   "loadingDate": "2022-04-23",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Patel Tpt",
//     "accountNumber":  "5511173847",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0000724",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 U 8931",
//   "loadingDate": "2022-06-02",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "M Prakash",
//     "accountNumber":  "100007474874",
//     "bankName": "ESFB",
//     "ifsc": "ESFB0001091",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN10 BF 4091",
//   "loadingDate": "2022-08-08",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K Ashokachakaravarthi",
//     "accountNumber":  "30818473272",
//     "bankName": "SBI",
//     "ifsc": "SBIN0005200",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA32 D 6378",
//   "loadingDate": "2022-03-31",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Vaijanath Mulagi",
//     "accountNumber":  "11039101058800",
//     "bankName": "PKGB",
//     "ifsc": "PKGB0011039",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN37 DW 6143",
//   "loadingDate": "2021-09-04",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "R Perumal Samy",
//     "accountNumber":  "1677194000002405",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001677",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN90 B 9104",
//   "loadingDate": "2022-03-24",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Kondava Naickar P",
//     "accountNumber":  "32801192706",
//     "bankName": "SBI",
//     "ifsc": "SBIN0008115",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 BA 8107",
//   "loadingDate": "2022-09-01",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "A Catherin",
//     "accountNumber":  "6357231086",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000P017",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN37 DE 2477",
//   "loadingDate": "2021-10-10",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "N RathaKrishnan",
//     "accountNumber":  "1620155000002473",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001620",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN73 AV 0438",
//   "loadingDate": "2022-10-31",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Rajesh Kumar P",
//     "accountNumber": "568717839",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000K032",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH01 CR 6744",
//   "loadingDate": "2021-10-07",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Rama Nivrutti Devkatte",
//     "accountNumber":  "60374557128",
//     "bankName": "MAHB",
//     "ifsc": "MAHB0001838",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN59 BM 5535",
//   "loadingDate": "2021-02-11",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Sasikumar",
//     "accountNumber":  "1700155000019992",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001700",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 CV 1076",
//   "loadingDate": "2021-07-27",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "V J Antony",
//     "accountNumber":  "920010002656661",
//     "bankName": "UTIB",
//     "ifsc": "UTIB0000082",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN39 CK 5715",
//   "loadingDate": "2020-05-08",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "D Udhayasuriyan",
//     "accountNumber":  "101301000009569",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001013",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 AS 0718",
//   "loadingDate": "2022-05-16",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K Arikruishnain",
//     "accountNumber":  "1688155000043331",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001688",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 V 6402",
//   "loadingDate": "2022-07-12",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "A Nashir Basha",
//     "accountNumber":  "1667194000001199",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001667",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH42 AQ 8086",
//   "loadingDate": "2021-08-08",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Akash A Giramkar",
//     "accountNumber":  "60236550635",
//     "bankName": "MAHB",
//     "ifsc": "MAHB0000176",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN55 BH 4833",
//   "loadingDate": "2021-11-12",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "A Vignesh",
//     "accountNumber":  "32558141789",
//     "bankName": "SBI",
//     "ifsc": "SBIN0000258",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AW 0410",
//   "loadingDate": "2022-06-23",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Vasu Enterprises",
//     "accountNumber":  "50200066301550",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0002053",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 U 3278",
//   "loadingDate": "2021-12-04",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "S John Basha",
//     "accountNumber":  "106001513199",
//     "bankName": "ICICI",
//     "ifsc": "ICIC0001060",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN99 U 2122",
//   "loadingDate": "2022-03-19",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "M. Suresh",
//     "accountNumber":  "30257651071",
//     "bankName": "SBI",
//     "ifsc": "SBIN0015017",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH13 CU 7293",
//   "loadingDate": "2021-04-09",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Bhagyashree Sidramappa",
//     "accountNumber":  "11012101008975",
//     "bankName": "PKGB",
//     "ifsc": "PKGB0011012",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN45 CZ 9370",
//   "loadingDate": "2022-07-25",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "R Velappan",
//     "accountNumber": "1862155000010112",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001862",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN15 B 0752",
//   "loadingDate": "2022-04-09",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Manivanan",
//     "accountNumber":  "921010002360561",
//     "bankName": "UTIB",
//     "ifsc": "UTIB0003550",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN57 CZ 6970",
//   "loadingDate": "2021-10-30",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "J Savvanan",
//     "accountNumber":  "1057101018473",
//     "bankName": "CNRB",
//     "ifsc": "CNRB",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN37 EZ 3037",
//   "loadingDate": "2021-07-23",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "SMBA Tpt",
//     "accountNumber":  "192102000000642",
//     "bankName": "IDBA",
//     "ifsc": "IDBA0001921",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 T 0378",
//   "loadingDate": "2022-09-05",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Mahalakshmi",
//     "accountNumber":  "50100509284219",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0001281",
//     "acc12": false,
//     "acc65": false,
//     "acc363": false
//   }
// },{
//   "truckno": "TN29 BR 0240",
//   "loadingDate": "2021-06-25",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "S Brindha",
//     "accountNumber":  "6214608151",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000H018",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN59 BQ 4529",
//   "loadingDate": "2021-04-24",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "K Samu Durai",
//     "accountNumber":  "39620516272",
//     "bankName": "SBIN",
//     "ifsc": "SBIN",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN34 AD 0029",
//   "loadingDate": "2022-09-10",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "SM.ILAIYARAJA",
//     "accountNumber":  "1194155000306053",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001194",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN15 E 2845",
//   "loadingDate": "2022-06-05",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "A Arul Kumar",
//     "accountNumber":  "6230776044",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000T047",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH14 GU 8953",
//   "loadingDate": "2022-02-25",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Harsh Roadlines",
//     "accountNumber":  "87102000058946",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0000087",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN47 AM 5905",
//   "loadingDate": "2022-07-19",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Sripalani Murugan Tpt",
//     "accountNumber":  "1218135000001385",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001218",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN90 A 9491",
//   "loadingDate": "2022-01-14",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Kondava Naickar P",
//     "accountNumber":  "32801192706",
//     "bankName": "SBI",
//     "ifsc": "SBIN0008115",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN93 B 2856",
//   "loadingDate": "2021-05-05",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "S Jayachitra",
//     "accountNumber":  "584202010003386",
//     "bankName": "UBIN",
//     "ifsc": "UBIN0558427",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN57 BJ 5800",
//   "loadingDate": "2021-03-26",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Bal Murugan R",
//     "accountNumber":  "241100050302016",
//     "bankName": "TMBL",
//     "ifsc": "TMBL0000241",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 CE 5176",
//   "loadingDate": "2022-06-07",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Kovarthanan P",
//     "accountNumber":  "621301065797",
//     "bankName": "ICICI",
//     "ifsc": "ICIC0006213",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN55 BJ 9487",
//   "loadingDate": "2022-08-08",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "R Mohanraj",
//     "accountNumber": "50200039261069",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0001005",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH13 CU 6036",
//   "loadingDate": "2022-06-30",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Ganesh Kashinath Pise",
//     "accountNumber":  "918010046426434",
//     "bankName": "UTIB",
//     "ifsc": "UTIB0003816",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN66 AE 6984",
//   "loadingDate": "2022-06-18",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Ayyapparaja M",
//     "accountNumber":  "61301000034872",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0000613",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN57 BH 6192",
//   "loadingDate": "2021-09-07",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "P Mohankumar",
//     "accountNumber":  "38207299038",
//     "bankName": "SIB",
//     "ifsc": "SBIN0016573",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AJ 0043",
//   "loadingDate": "2021-06-24",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "V Thangaraj",
//     "accountNumber":  "50100404762981",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0001006",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AT 4437",
//   "loadingDate": "2022-09-26",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "R Palani",
//     "accountNumber":  "1813155000001793",
//     "bankName": "Other",
//     "ifsc": "Other",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN28 BE 6413",
//   "loadingDate": "2022-03-25",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Deepam Logistics",
//     "accountNumber":  "80405002639",
//     "bankName": "ICICI",
//     "ifsc": "ICIC0006222",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN65 AQ 0923",
//   "loadingDate": "2022-01-07",
//   "a12": false,
//   "a363": true,
//   "acc": {
//     "accountName": "Thanikodu S",
//     "accountNumber":  "6067478919",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000K2225",
//     "acc12": false,
//     "acc363": true,
//     "acc65": false
//   }
// },{
//   "truckno": "TN11 X 1921",
//   "loadingDate": "2021-12-17",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "R Manoj",
//     "accountNumber":  "1194155000273633",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001194",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AC 4543",
//   "loadingDate": "2022-02-15",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Murali M",
//     "accountNumber":  "6060135014",
//     "bankName": "IDIB",
//     "ifsc": "IDIB00013012",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH11 AL 5125",
//   "loadingDate": "2022-01-12",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Sanjay Mahadev Pawar",
//     "accountNumber":  "131910110001414",
//     "bankName": "BKID",
//     "ifsc": "BKID0001319",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TEST4",
//   "loadingDate": "2023-10-04",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Name",
//     "accountNumber": "22930040344886756",
//     "bankName": "BankName",
//     "ifsc": "IFSC",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN88 V 0675",
//   "loadingDate": "2020-05-07",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "P Yashoda",
//     "accountNumber": 585176591,
//     "bankName": "IDIB",
//     "ifsc": "IDIB000P092",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AY 1684",
//   "loadingDate": "2022-08-25",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Vasu Enterprises",
//     "accountNumber": "50200066301550",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0002053",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN57 BD 1612",
//   "loadingDate": "2021-09-28",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "P Sadarraj",
//     "accountNumber": 801210167,
//     "bankName": "IDIB",
//     "ifsc": "IDIB000D018",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN23 CE 1465",
//   "loadingDate": "2021-04-23",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Sarath Kumar T",
//     "accountNumber":  "6688775234",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000D003",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH12 TV 9794",
//   "loadingDate": "2022-10-28",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Sameer Pawar",
//     "accountNumber":  "603104000099466",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0000603",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN93 B 2604",
//   "loadingDate": "2021-07-17",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K Sivaraj",
//     "accountNumber": 884566922,
//     "bankName": "IDIB",
//     "ifsc": "IDIB000M025",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN42 AB 7623",
//   "loadingDate": "2021-03-22",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Global Roadways",
//     "accountNumber":  "9750279000",
//     "bankName": "KKBK",
//     "ifsc": "KKBK",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "OO00 OO 0000",
//   "loadingDate": "2021-01-05",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "O",
//     "accountNumber": 0,
//     "bankName": "O",
//     "ifsc": "O",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AX 3313",
//   "loadingDate": "2022-05-27",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "R Mani",
//     "accountNumber": 856762227,
//     "bankName": "IDIB",
//     "ifsc": "IDIB000K031",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 M 2542",
//   "loadingDate": "2021-03-25",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "N Manikandan",
//     "accountNumber":  "6300144574",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000T070",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN30 BM 0254",
//   "loadingDate": "2021-03-12",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Sathish Kumar G",
//     "accountNumber":  "50100060434359",
//     "bankName": "Other",
//     "ifsc": "Other",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN30 CB 0050",
//   "loadingDate": "2022-10-03",
//   "a12": false,
//   "a363": true,
//   "acc": {
//     "accountName": "R Vengatachalam",
//     "accountNumber":  "28100050307291",
//     "bankName": "TMBL",
//     "ifsc": "TMBL000028",
//     "acc12": false,
//     "acc363": true,
//     "acc65": false
//   }
// },{
//   "truckno": "TN39 CK 1959",
//   "loadingDate": "2021-07-23",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "P Thiyagarajan",
//     "accountNumber":  "1208101032730",
//     "bankName": "CNRB",
//     "ifsc": "CNRB0001208",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA28 D 6287",
//   "loadingDate": "2021-04-23",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Mallikarjun Naykadi",
//     "accountNumber":  "22372413001833",
//     "bankName": "ORBC",
//     "ifsc": "ORBC0102237",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN02 BQ 8187",
//   "loadingDate": "2022-06-13",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Manikandan D",
//     "accountNumber":  "30883880575",
//     "bankName": "SBI",
//     "ifsc": "SBIN0007108",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN36 BW 9595",
//   "loadingDate": "2022-09-20",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Vasanthakumar S",
//     "accountNumber": "39979205123",
//     "bankName": "SBI",
//     "ifsc": "SBIN0008155",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN48 AK 0906",
//   "loadingDate": "2021-02-12",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Name",
//     "accountNumber": "22802031853681720",
//     "bankName": "BankName",
//     "ifsc": "IFSC",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN23 CZ 9552",
//   "loadingDate": "2021-03-15",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "K Ravi Kumar",
//     "accountNumber":  "1758155000054982",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001758",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN38 CW 2752",
//   "loadingDate": "2020-06-25",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Yogiraj Golden TPT",
//     "accountNumber":  "35540200000031",
//     "bankName": "BARB",
//     "ifsc": "BARBOGANAPA",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AW 4636",
//   "loadingDate": "2021-08-09",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Vignesh Karthikeyan",
//     "accountNumber":  "1813155000025411",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001813",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH14 KA 2860",
//   "loadingDate": "2022-07-30",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Mahadev Shamrao Kawde",
//     "accountNumber": "0087104000509657",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0000087",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN45 AV 3362",
//   "loadingDate": "2022-03-02",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "A Ramesh",
//     "accountNumber":  "30287549721",
//     "bankName": "SBI",
//     "ifsc": "SBIN0000765",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN43 D 5865",
//   "loadingDate": "2021-06-22",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M Ramachandran",
//     "accountNumber":  "37844157890",
//     "bankName": "SBI",
//     "ifsc": "SBIN0018664",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH12 SF 5890",
//   "loadingDate": "2022-02-19",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Patel Tpt",
//     "accountNumber":  "5511173847",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0000724",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN51 AQ 2394",
//   "loadingDate": "2022-10-13",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Parvathi K",
//     "accountNumber":  "1774101008963",
//     "bankName": "CNRB",
//     "ifsc": "CNRB0001774",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 V 6646",
//   "loadingDate": "2022-09-23",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "A Nashir Basha",
//     "accountNumber":  "1667194000001199",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001667",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN64 L 4825",
//   "loadingDate": "2022-09-27",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M Murugan",
//     "accountNumber": "20047309924",
//     "bankName": "SBI",
//     "ifsc": "SBIN0003689",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN33 BD 7434",
//   "loadingDate": "2021-03-22",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "V Prabhakaran",
//     "accountNumber":  "10523923805",
//     "bankName": "SBI",
//     "ifsc": "SBIN0004765",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN38 CM 6212",
//   "loadingDate": "2022-08-19",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Dhiya Transport",
//     "accountNumber":  "1748135000002000",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001748",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN59 BJ 5786",
//   "loadingDate": "2022-03-29",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Mahadevan V",
//     "accountNumber":  "20950100000308",
//     "bankName": "FDRL",
//     "ifsc": "FDRL0002095",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN47 BA 1686",
//   "loadingDate": "2022-06-21",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M Vennila",
//     "accountNumber":  "1259155000084588",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001259",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 BC 3741",
//   "loadingDate": "2022-07-08",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Raji D",
//     "accountNumber":  "20394242248",
//     "bankName": "SBI",
//     "ifsc": "SBIN0012793",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN34 AC 6822",
//   "loadingDate": "2022-07-09",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Santhana Kumar",
//     "accountNumber":  "6795911072",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000V128",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN47 AM 1761",
//   "loadingDate": "2022-07-02",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "V Kathirvel",
//     "accountNumber":  "1152135000013644",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001152",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN39 CJ 1793",
//   "loadingDate": "2022-06-28",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "V.KANAGARANI",
//     "accountNumber":  "500101010819958",
//     "bankName": "CIUB",
//     "ifsc": "CIUB0000452",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AT 1308",
//   "loadingDate": "2022-07-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Ranji R",
//     "accountNumber": "309008738923",
//     "bankName": "RATN",
//     "ifsc": "RATN0000238",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN48 BZ 8936",
//   "loadingDate": "2022-05-11",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Abdul Rahuman K",
//     "accountNumber":  "5901000026907",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0000059",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA32 D 8644",
//   "loadingDate": "2022-02-27",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Mashak C Patel\t",
//     "accountNumber":  "50100262593583",
//     "bankName": "HDFC0000768",
//     "ifsc": "HDFC",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN02 BF 0048",
//   "loadingDate": "2022-03-30",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Mahaboob Basha",
//     "accountNumber":  "31628236058",
//     "bankName": "SBI",
//     "ifsc": "SBIN0014620",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN92 C 6163",
//   "loadingDate": "2022-01-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K Subramani",
//     "accountNumber":  "1726155000025123",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001726",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH14 GU 5560",
//   "loadingDate": "2021-12-25",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Lakkanna H Gadige",
//     "accountNumber":  "9313270797",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0001757",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AB 5878",
//   "loadingDate": "2022-04-02",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "A Sampath",
//     "accountNumber": 579848430,
//     "bankName": "IDIB",
//     "ifsc": "IDIB000001",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN33 BW 3510",
//   "loadingDate": "2022-08-13",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "R Guna Sekaran",
//     "accountNumber":  "20044773141",
//     "bankName": "SBI",
//     "ifsc": "SBIN0016520",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 W 1436",
//   "loadingDate": "2022-10-30",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Kavitha Selvam",
//     "accountNumber": "50210014919041",
//     "bankName": "BDBL",
//     "ifsc": "BDBL0001894",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 BA 4281",
//   "loadingDate": "2021-09-07",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M Vanitha",
//     "accountNumber":  "50100061332595",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0000795",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN47 AL 3417",
//   "loadingDate": "2021-08-21",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M Dhanam",
//     "accountNumber":  "257401000003247",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0002574",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN29 BL 9852",
//   "loadingDate": "2022-09-24",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "N Palanisamy",
//     "accountNumber": "0221301000021890",
//     "bankName": "DBSS01N0221",
//     "ifsc": "DBSS",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN42 AA 3737",
//   "loadingDate": "2021-02-25",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "P Sivakamy",
//     "accountNumber":  "100003153898",
//     "bankName": "ESFB",
//     "ifsc": "ESFB0001008",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN10 BR 3402",
//   "loadingDate": "2022-10-18",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Daimond Enterprises",
//     "accountNumber": "200001589668",
//     "bankName": "ESFB",
//     "ifsc": "ESFB0001064",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN76 J 9648",
//   "loadingDate": "2022-07-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Sachin Kumar",
//     "accountNumber": "32285688742",
//     "bankName": "SBI",
//     "ifsc": "SBIN0013437",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN23 AL 4800",
//   "loadingDate": "2022-03-03",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "V Suresh",
//     "accountNumber":  "1075108017875",
//     "bankName": "CNRB",
//     "ifsc": "CNRB0001075",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 BB 3526",
//   "loadingDate": "2022-10-31",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Sreeniwasan Natesan",
//     "accountNumber":  "100023786661",
//     "bankName": "ESFB",
//     "ifsc": "ESFB0001075",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH12 LT 7157",
//   "loadingDate": "2022-06-11",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Rajendra Roadlines",
//     "accountNumber":  "44220200000876",
//     "bankName": "BARB",
//     "ifsc": "BARB0SAHPUN",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "AP02 TC 0357",
//   "loadingDate": "2022-04-08",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Palayam Vishwamurthy",
//     "accountNumber":  "20398794181",
//     "bankName": "SBI",
//     "ifsc": "SBIN0018857",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN30 CZ 2476",
//   "loadingDate": "2021-02-25",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "J Gnana Sekaran",
//     "accountNumber":  "1246155000221241",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001246",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN19 BX 6841",
//   "loadingDate": "2021-11-25",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "G Sundaramoorthy",
//     "accountNumber":  "1682155000041026",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001682",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN36 AK 8065",
//   "loadingDate": "2022-10-28",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Sridhar",
//     "accountNumber": "30431816243",
//     "bankName": "SBI",
//     "ifsc": "SBIN0004271",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH14 JL 0827",
//   "loadingDate": "2022-10-12",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Harsh Roadlines",
//     "accountNumber": "87102000058946",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0000087",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN16 C 4033",
//   "loadingDate": "2021-10-10",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "I Senthil Kumar",
//     "accountNumber":  "310501000000597",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0003105",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN57 BM 3372",
//   "loadingDate": "2021-09-23",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "A Balasubramanian",
//     "accountNumber":  "316401000001399",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0003164",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN28 BH 3224",
//   "loadingDate": "2022-10-19",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "P Manimalathi",
//     "accountNumber":  "1166155000081156",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001166",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 BF 5163",
//   "loadingDate": "2021-04-17",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K Sathish",
//     "accountNumber":  "6157939640",
//     "bankName": "Other",
//     "ifsc": "Other",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN15 E 3728",
//   "loadingDate": "2022-10-08",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Venkatesan P",
//     "accountNumber": "32823299337",
//     "bankName": "SBI",
//     "ifsc": "SBIN0015826",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN86 E 1459",
//   "loadingDate": "2022-10-08",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K Nalla Sivam",
//     "accountNumber":  "1619155000056710",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001619",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN45 BZ 8512",
//   "loadingDate": "2022-07-28",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Arun Kumar Lourdusamy",
//     "accountNumber": "1647155000112760",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001647",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 CU 5302",
//   "loadingDate": "2022-05-08",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "R Nithya Nandhan",
//     "accountNumber":  "6019882647",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000M080",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN58 AB 9499",
//   "loadingDate": "2021-09-16",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M Kalanthai Joseph",
//     "accountNumber":  "158001000008309",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001580",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 V 7396",
//   "loadingDate": "2022-09-30",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "VRG Logistics",
//     "accountNumber": "1248135000009082",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001248",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH12 TV 4207",
//   "loadingDate": "2022-09-28",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Ganesh Haribhai Lande",
//     "accountNumber": "0603104000098847",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0000603",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 U 3252",
//   "loadingDate": "2022-06-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Nashir Basha",
//     "accountNumber":  "1667194000001199",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001667",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 AS 2466",
//   "loadingDate": "2022-10-27",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Gajendiran",
//     "accountNumber":  "1208155000220262",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001208",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN72 BP 2622",
//   "loadingDate": "2021-03-25",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Manikandan Murukku",
//     "accountNumber":  "1636155000082295",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001636",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "AP39 TZ 8568",
//   "loadingDate": "2022-04-09",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M Hanumantha Reddy",
//     "accountNumber":  "43901523108",
//     "bankName": "ICICI",
//     "ifsc": "ICIC0000439",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN38 CX 3253",
//   "loadingDate": "2021-06-26",
//   "a12": false,
//   "a363": true,
//   "acc": {
//     "accountName": "Reegal Tpt",
//     "accountNumber":  "15888030000097",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0001588",
//     "acc12": false,
//     "acc363": true,
//     "acc65": false
//   }
// },{
//   "truckno": "TN90 C 6381",
//   "loadingDate": "2021-01-23",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "V Naveen",
//     "accountNumber":  "7142193000198",
//     "bankName": "ORBC",
//     "ifsc": "ORBC0100714",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH12 TV 6763",
//   "loadingDate": "2022-10-27",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Atul Subhash Gaikwad",
//     "accountNumber": "920010068679826",
//     "bankName": "UTIB",
//     "ifsc": "UTIB0003106",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 P 9256",
//   "loadingDate": "2022-02-18",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Kalaiselvi",
//     "accountNumber":  "20375163152",
//     "bankName": "SBI",
//     "ifsc": "SBIN0007494",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH45 AF 5896",
//   "loadingDate": "2022-10-28",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Priya Hanumant Markad",
//     "accountNumber":  "71110110026129",
//     "bankName": "BKID",
//     "ifsc": "BKID0000711",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 TC 3124",
//   "loadingDate": "2021-02-17",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "P Navaneetha Krishnan",
//     "accountNumber":  "127010100029473",
//     "bankName": "ANDB",
//     "ifsc": "ANDB0002470",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN30 CA 4829",
//   "loadingDate": "2022-02-17",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Lakshmi Kanthan V",
//     "accountNumber":  "20950100000738",
//     "bankName": "FDRL",
//     "ifsc": "FDRL0002095",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN52 H 9930",
//   "loadingDate": "2022-10-14",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "J Selvam",
//     "accountNumber": "183301000007908",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001833",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN29 BE 6032",
//   "loadingDate": "2021-06-25",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Arunachalam Annachura",
//     "accountNumber":  "6480699017",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000K076",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN25 BJ 5537",
//   "loadingDate": "2021-06-23",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Rajkumar N",
//     "accountNumber":  "395702010402203",
//     "bankName": "UBIN",
//     "ifsc": "UBIN0562220",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 BA 9529",
//   "loadingDate": "2022-10-29",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Gajendiran",
//     "accountNumber":  "1208155000220262",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001208",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 AQ 5090",
//   "loadingDate": "2022-09-27",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "S Babu",
//     "accountNumber":  "927101022236",
//     "bankName": "CNRB",
//     "ifsc": "CNRB0008542",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN68 P 6827",
//   "loadingDate": "2022-07-04",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "RajDurai R",
//     "accountNumber":  "362301000087950",
//     "bankName": "LAVB",
//     "ifsc": "LAVB0000362",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KL38 H 6836",
//   "loadingDate": "2022-04-16",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "MARTIN T KAPPEN",
//     "accountNumber":  "11210100196072",
//     "bankName": "FDRL",
//     "ifsc": "FDRL0001121",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 CV 1027",
//   "loadingDate": "2021-07-10",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "V J Antony",
//     "accountNumber":  "920010002656661",
//     "bankName": "UTIB",
//     "ifsc": "UTIB0000082",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 BK 9025",
//   "loadingDate": "2022-01-01",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "R Karthi",
//     "accountNumber":  "38170499772",
//     "bankName": "SBI",
//     "ifsc": "SBIN0015826",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 AR 7320",
//   "loadingDate": "2021-04-09",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Manikandan R",
//     "accountNumber":  "6143427888",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000M203",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN99 K 7457",
//   "loadingDate": "2022-02-08",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Senthil Kumar K",
//     "accountNumber":  "1282155000113615",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001282",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN15 D 7270",
//   "loadingDate": "2022-05-28",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Murugan T",
//     "accountNumber":  "30479004462",
//     "bankName": "SBI",
//     "ifsc": "SBIN0006720",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH11 AL 2629",
//   "loadingDate": "2022-09-26",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Swapnil D Chougule",
//     "accountNumber": "50100460428173",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0003455",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN12 Y 1409",
//   "loadingDate": "2021-04-29",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Ramesh Thambi",
//     "accountNumber":  "34194687214",
//     "bankName": "SBI",
//     "ifsc": "SBIN0017934",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN16 F 7770",
//   "loadingDate": "2022-08-08",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Ananthan G",
//     "accountNumber": "5983000100012979",
//     "bankName": "PUNB",
//     "ifsc": "PUNB0598300",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN96 C 2171",
//   "loadingDate": "2022-10-18",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Ranjit Kumar",
//     "accountNumber":  "29840100012202",
//     "bankName": "BARB",
//     "ifsc": "BARBOKOVILP",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN29 CW 9648",
//   "loadingDate": "2022-07-23",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Siva V",
//     "accountNumber": "760802010006817",
//     "bankName": "UBIN",
//     "ifsc": "UBIN0576085",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA32 D 8879",
//   "loadingDate": "2022-07-12",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Santosh Pular",
//     "accountNumber":  "38724486268",
//     "bankName": "SBI",
//     "ifsc": "SBIN0011580",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 CA 5405",
//   "loadingDate": "2022-09-13",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "S Suresh",
//     "accountNumber":  "110701000005764",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001107",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN77 F 3264",
//   "loadingDate": "2022-03-22",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K Senthil Kumar",
//     "accountNumber":  "50100221306376",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0000974",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN36 AM 4700",
//   "loadingDate": "2021-11-27",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Sakthidasan B",
//     "accountNumber":  "1803194000002610",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001803",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH12 LT 1212",
//   "loadingDate": "2022-01-07",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Amol B Gawade",
//     "accountNumber":  "31057382324",
//     "bankName": "SBI",
//     "ifsc": "SBIN0012926",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN42 AC 1201",
//   "loadingDate": "2021-03-04",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Nandakumar C",
//     "accountNumber":  "500101012020793",
//     "bankName": "CIUB",
//     "ifsc": "CIUB0000493",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN38 CU 7979",
//   "loadingDate": "2021-08-10",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "S Kumar",
//     "accountNumber":  "1031101127626",
//     "bankName": "CNRB",
//     "ifsc": "CNRB0001031",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN77 E 9034",
//   "loadingDate": "2022-08-18",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "R Suresh",
//     "accountNumber":  "4053101005114",
//     "bankName": "CNRB",
//     "ifsc": "CNRB0004053",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN42 AE 2723",
//   "loadingDate": "2021-10-26",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "A Jesu",
//     "accountNumber":  "30995324327",
//     "bankName": "SBI",
//     "ifsc": "SBIN0009314",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 Q 5798",
//   "loadingDate": "2021-04-22",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "R John Peter",
//     "accountNumber":  "1758155000057289",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001758",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN48 BC 1447",
//   "loadingDate": "2021-09-25",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "R Elayaraja",
//     "accountNumber":  "1725155000017020",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001725",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AT 4007",
//   "loadingDate": "2021-04-08",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "S Prabhu",
//     "accountNumber":  "37868328805",
//     "bankName": "SBI",
//     "ifsc": "SBIN0007463",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 U 9009",
//   "loadingDate": "2022-02-04",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Richue Pranab",
//     "accountNumber":  "1667135000007596",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001667",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN77 P 8137",
//   "loadingDate": "2021-08-24",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Sreeniwasan Thangarasu",
//     "accountNumber":  "1669155000039916",
//     "bankName": "KVBL",
//     "ifsc": "KVBL",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN48 BZ 5230",
//   "loadingDate": "2022-09-22",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "G Sumathi",
//     "accountNumber":  "50031744974",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000T017",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 AH 5937",
//   "loadingDate": "2021-06-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Shanbegavali N",
//     "accountNumber":  "32234165299",
//     "bankName": "SBIN",
//     "ifsc": "SBIN0000755",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN34 AD 6855",
//   "loadingDate": "2022-01-11",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "P Indirani",
//     "accountNumber":  "584202010006776",
//     "bankName": "Union",
//     "ifsc": "UBIN0558427",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH25 AJ 1554",
//   "loadingDate": "2022-09-13",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Patel Tpt Co",
//     "accountNumber":  "5511173847",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0000724",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN10 BP 9909",
//   "loadingDate": "2022-04-12",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Shree Jothi Roadlines",
//     "accountNumber":  "777705550549",
//     "bankName": "ICICI",
//     "ifsc": "ICICI",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN42 AA 9592",
//   "loadingDate": "2021-06-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "C Arjunan",
//     "accountNumber":  "100005789540",
//     "bankName": "ESFB",
//     "ifsc": "ESFB0001008",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH14 JL 9333",
//   "loadingDate": "2022-02-22",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Patel Tpt",
//     "accountNumber":  "5511173847",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0000724",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 BB 7986",
//   "loadingDate": "2022-06-17",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "G Murugan",
//     "accountNumber": 526400285,
//     "bankName": "IDIB",
//     "ifsc": "IDIB000T029",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN48 BD 8065",
//   "loadingDate": "2022-10-06",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Perfect Transport",
//     "accountNumber": "10041427509",
//     "bankName": "IDFB",
//     "ifsc": "IDFB00080451",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN59 BK 2674",
//   "loadingDate": "2021-04-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "R Rajamanikam",
//     "accountNumber": 2454,
//     "bankName": "CNRB",
//     "ifsc": "CNRB",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN12 AM 1769",
//   "loadingDate": "2022-10-07",
//   "a12": false,
//   "a363": true,
//   "acc": {
//     "accountName": "Sandhiya Roadlines",
//     "accountNumber":  "9311962328",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0008955",
//     "acc12": false,
//     "acc363": true,
//     "acc65": false
//   }
// },{
//   "truckno": "TN42 AH 2983",
//   "loadingDate": "2021-12-25",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Global Roadways",
//     "accountNumber":  "200000723315",
//     "bankName": "ESFB",
//     "ifsc": "ESFB0001008",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN28 BH 3082",
//   "loadingDate": "2022-04-21",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Deepam Logistics",
//     "accountNumber":  "80405002639",
//     "bankName": "ICICI",
//     "ifsc": "ICIC0000804",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA01 AH 7778",
//   "loadingDate": "2021-02-20",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Lakshmanan R",
//     "accountNumber":  "1272255000006",
//     "bankName": "CNRB",
//     "ifsc": "CNRB",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN22 AY 5475",
//   "loadingDate": "2022-03-22",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "S Devendiran",
//     "accountNumber":  "6073028961",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000T019",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA32 D 8126",
//   "loadingDate": "2022-03-14",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Panchappa Allagi",
//     "accountNumber":  "6225101006704",
//     "bankName": "CNRB",
//     "ifsc": "CNRB",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN38 CW 6212",
//   "loadingDate": "2022-08-05",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "DHIYA TRANSPORT",
//     "accountNumber":  "1748135000002000",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001748",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 AA 8938",
//   "loadingDate": "2021-10-09",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "G Murugan",
//     "accountNumber": 526400285,
//     "bankName": "IDIB",
//     "ifsc": "IDIB000T029",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN42 AB 8542",
//   "loadingDate": "2021-01-05",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Global Roadways",
//     "accountNumber":  "200000723315",
//     "bankName": "ESFB",
//     "ifsc": "ESFB0001008",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 BA 3309",
//   "loadingDate": "2021-10-05",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "V Iyyappan",
//     "accountNumber": 941283715,
//     "bankName": "IDIB",
//     "ifsc": "IDIB000A043",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN05 CF 7085",
//   "loadingDate": "2022-04-30",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "A Suresh",
//     "accountNumber":  "30428511531",
//     "bankName": "SBI",
//     "ifsc": "SBIN0000934",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN12 W 9041",
//   "loadingDate": "2021-12-08",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Mohamed Yonus",
//     "accountNumber":  "60100050306393",
//     "bankName": "IMBL",
//     "ifsc": "IMBL0000060",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN67 BY 2874",
//   "loadingDate": "2022-08-28",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "J Selvam",
//     "accountNumber": "183301000007908",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001833",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN11 AX 5029",
//   "loadingDate": "2022-10-01",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Nagarajan R",
//     "accountNumber": "61072010024716",
//     "bankName": "CNRB",
//     "ifsc": "CNRB",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN48 BW 2255",
//   "loadingDate": "2022-07-13",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Abdul Rahuman K",
//     "accountNumber":  "1166155000219146",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001166",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 BE 3715",
//   "loadingDate": "2021-06-15",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "S Manivanan",
//     "accountNumber":  "921010002360561",
//     "bankName": "UTIB",
//     "ifsc": "UTIB0003550",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 V 6187",
//   "loadingDate": "2022-07-08",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "SureshKumar K",
//     "accountNumber":  "50200047627153",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0002410",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN18 AC 8652",
//   "loadingDate": "2022-01-09",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "R Sathish Kumar",
//     "accountNumber":  "673602010008502",
//     "bankName": "UBIN",
//     "ifsc": "UBIN0567361",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH12 QW 3059",
//   "loadingDate": "2022-10-07",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Madhukar G Mane\t",
//     "accountNumber":  "920010069126727",
//     "bankName": "UTIB",
//     "ifsc": "UTIB0001039",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 CX 1935",
//   "loadingDate": "2021-12-21",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Pavadai KalyaPerumal",
//     "accountNumber":  "37777805816",
//     "bankName": "SBI",
//     "ifsc": "SBIN0000958",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN29 BR 0671",
//   "loadingDate": "2021-02-17",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "C Murugan",
//     "accountNumber":  "61712200043879",
//     "bankName": "CNRB",
//     "ifsc": "CNRB",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN42 AH 1395",
//   "loadingDate": "2022-03-19",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Global Roadways",
//     "accountNumber":  "9750279000",
//     "bankName": "KKBK",
//     "ifsc": "KKBK",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN22 DM 4182",
//   "loadingDate": "2022-06-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Murugan M",
//     "accountNumber":  "500101012484864",
//     "bankName": "CIUB",
//     "ifsc": "CIUB0000067",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 V 6520",
//   "loadingDate": "2022-09-30",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "VRG Logistics",
//     "accountNumber": "101901000046735",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001248",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN18 AD 7074",
//   "loadingDate": "2021-07-10",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Senthilnuthan",
//     "accountNumber":  "79101000005547",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0000791",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 U 7015",
//   "loadingDate": "2022-09-23",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Abdul Wahab A",
//     "accountNumber":  "4363101007266",
//     "bankName": "CNRB",
//     "ifsc": "CNRB0004363",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 U 3129",
//   "loadingDate": "2022-08-02",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Mahalakshmi",
//     "accountNumber":  "50100509284219",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0001281",
//     "acc12": false,
//     "acc65": false,
//     "acc363": false
//   }
// },{
//   "truckno": "TN47 BY 9399",
//   "loadingDate": "2022-04-02",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Nagraj R",
//     "accountNumber":  "37074092641",
//     "bankName": "SBI",
//     "ifsc": "SBIN0070390",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN12 AS 1477",
//   "loadingDate": "2022-06-10",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Welcome Transport",
//     "accountNumber":  "1248115000008893",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001248",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AY 3873",
//   "loadingDate": "2022-08-04",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Karthik P",
//     "accountNumber":  "922010019635013",
//     "bankName": "UTIB",
//     "ifsc": "UTIB0004855",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN58 BE 5229",
//   "loadingDate": "2021-09-21",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "G Sarvana Kumar",
//     "accountNumber":  "20064419406",
//     "bankName": "SBI",
//     "ifsc": "SBIN0002235",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH14 HU 1982",
//   "loadingDate": "2021-08-12",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Harsh Roadlines",
//     "accountNumber":  "87102000058446",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0000087",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN57 BJ 6451",
//   "loadingDate": "2021-07-19",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Murugesan P",
//     "accountNumber":  "270601000006942",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0002706",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 AQ 5478",
//   "loadingDate": "2021-11-30",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Thamizhselvan",
//     "accountNumber": 975804052,
//     "bankName": "IDIB",
//     "ifsc": "IDIB000P164",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN25 AM 5164",
//   "loadingDate": "2021-09-06",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "S Pandiyan",
//     "accountNumber":  "177901000015358",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001779",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 U 5591",
//   "loadingDate": "2022-03-20",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Senthilkumar L",
//     "accountNumber":  "500101012265857",
//     "bankName": "CIUB",
//     "ifsc": "CIUB0000629",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN16 H 4338",
//   "loadingDate": "2022-10-17",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "A Siva",
//     "accountNumber":  "1265166000020980",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001265",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN99 T 0807",
//   "loadingDate": "2021-07-10",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Bagyam Transport",
//     "accountNumber":  "170001000091119",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001700",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN28 BH 3294",
//   "loadingDate": "2022-10-07",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "KKP Transport",
//     "accountNumber":  "5234301000092",
//     "bankName": "CNRB",
//     "ifsc": "CNRB",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA51 AH 1767",
//   "loadingDate": "2022-06-27",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Mohan Kumar A",
//     "accountNumber":  "32449021853",
//     "bankName": "SBI",
//     "ifsc": "SBIN0007008",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN48 AE 2201",
//   "loadingDate": "2022-03-09",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Baskaran R",
//     "accountNumber":  "4301000014558",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0000043",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN38 DB 2155",
//   "loadingDate": "2022-07-25",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "E Sakkimuthu",
//     "accountNumber": "1797155000024634",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001797",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN59 CM 6517",
//   "loadingDate": "2022-08-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Chandrabose T",
//     "accountNumber": "20258967065",
//     "bankName": "SBI",
//     "ifsc": "SBIN0016503",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 CX 7978",
//   "loadingDate": "2021-07-17",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "R Nithya Nandhan",
//     "accountNumber":  "6019882647",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000M030",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN49 AS 5071",
//   "loadingDate": "2021-07-08",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "A Vijay Kumar",
//     "accountNumber":  "520101017739108",
//     "bankName": "CORP",
//     "ifsc": "CORP0000171",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 V 3930",
//   "loadingDate": "2022-08-11",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M Prabhu\t",
//     "accountNumber":  "177610100118980",
//     "bankName": "UBIN",
//     "ifsc": "UBIN0817767",
//     "acc12": false,
//     "acc65": false,
//     "acc363": false
//   }
// },{
//   "truckno": "TN19 AQ 1631",
//   "loadingDate": "2021-02-19",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Sumithra Devi V",
//     "accountNumber":  "10971050026923",
//     "bankName": "Other",
//     "ifsc": "Other",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH10 AW 7081",
//   "loadingDate": "2022-01-20",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Abhijeet Tpt",
//     "accountNumber":  "917020060972038",
//     "bankName": "Axis",
//     "ifsc": "UTIB0001039",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN64 X 6305",
//   "loadingDate": "2022-10-30",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "T Ganesh Pandian",
//     "accountNumber":  "1626155000006964",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001626",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN52 S 3326",
//   "loadingDate": "2021-08-05",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "P Kanan",
//     "accountNumber":  "70000100003024",
//     "bankName": "BARB",
//     "ifsc": "BARBOVJKOSA",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH12 SX 7792",
//   "loadingDate": "2021-04-17",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Ganesh Jadhav",
//     "accountNumber":  "3717912638",
//     "bankName": "CBIN",
//     "ifsc": "CBIN0282342",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 CD 2331",
//   "loadingDate": "2022-05-12",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Jamal Mohammed D",
//     "accountNumber":  "20195936762",
//     "bankName": "SBI",
//     "ifsc": "SBIN0001516",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN45 CZ 1033",
//   "loadingDate": "2022-07-19",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "R Velappan",
//     "accountNumber":  "1862155000010112",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001862",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN69 BK 5863",
//   "loadingDate": "2021-06-22",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M H Ameer",
//     "accountNumber":  "100006703643",
//     "bankName": "ESFB",
//     "ifsc": "ESFB0001088",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "AP02 TC 2826",
//   "loadingDate": "2022-03-28",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Shekar",
//     "accountNumber":  "919010064460239",
//     "bankName": "UTIB",
//     "ifsc": "UTIB0000332",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH13 DQ 3797",
//   "loadingDate": "2022-09-15",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Yallappa Birappa Pujari",
//     "accountNumber": "68008413448",
//     "bankName": "MAHB",
//     "ifsc": "MAHB0000149",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN58 BB 4917",
//   "loadingDate": "2021-01-22",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "R Lakshmanan",
//     "accountNumber":  "1272255000006",
//     "bankName": "CNRB",
//     "ifsc": "CNRB",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN02 BW 8961",
//   "loadingDate": "2022-08-26",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Pattabirman R",
//     "accountNumber": "510909010083234",
//     "bankName": "CIUB",
//     "ifsc": "CIUB0000469",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN48 BB 5230",
//   "loadingDate": "2022-03-22",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "G Sumathi",
//     "accountNumber":  "50031744974",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000T017",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN30 CW 0748",
//   "loadingDate": "2022-06-12",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "C Loganathan",
//     "accountNumber":  "921010029035011",
//     "bankName": "UTIB",
//     "ifsc": "UTIB0000611",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN78 Z 7018",
//   "loadingDate": "2022-01-22",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "E Prakash",
//     "accountNumber":  "8996101005775",
//     "bankName": "CNRB",
//     "ifsc": "CNRB",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN15 M 6094",
//   "loadingDate": "2022-06-22",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "C Subramani",
//     "accountNumber":  "1329172000002734",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001329",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN57 BX 3549",
//   "loadingDate": "2022-09-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K. ponnusamy",
//     "accountNumber": "201100050308499",
//     "bankName": "TMBL",
//     "ifsc": "TMBL0000201",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN57 BH 9600",
//   "loadingDate": "2021-09-23",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "J Kumaravel",
//     "accountNumber":  "5616101001725",
//     "bankName": "CNRB",
//     "ifsc": "CNRB",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN83 A 1074",
//   "loadingDate": "2022-07-06",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "A Rajesh",
//     "accountNumber":  "6616167844",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000A185",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 BD 4916",
//   "loadingDate": "2022-06-30",
//   "a12": false,
//   "a363": true,
//   "acc": {
//     "accountName": "Bal Murugan K",
//     "accountNumber":  "79101000015212",
//     "bankName": "KVBL",
//     "ifsc": "KVBL",
//     "acc12": false,
//     "acc363": true,
//     "acc65": false
//   }
// },{
//   "truckno": "TN83 MA 7688",
//   "loadingDate": "2022-10-13",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Kirubanandhan A",
//     "accountNumber": "33780913472",
//     "bankName": "SBI",
//     "ifsc": "SBIN0003688",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA10 A 6096",
//   "loadingDate": "2022-07-30",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Selvaraj R",
//     "accountNumber":  "20212011843",
//     "bankName": "SBI",
//     "ifsc": "SBIN0060075",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AE 4446",
//   "loadingDate": "2022-03-24",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Rajesh R",
//     "accountNumber": 997637705,
//     "bankName": "IDIB",
//     "ifsc": "IDIB000G048",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH04 GR 2456",
//   "loadingDate": "2021-03-12",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Sunil D Kambale",
//     "accountNumber":  "73610110007625",
//     "bankName": "BKID",
//     "ifsc": "BKID0000736",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN38 CX 3298",
//   "loadingDate": "2022-05-19",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Saranya R",
//     "accountNumber":  "500101010604507",
//     "bankName": "CIUB",
//     "ifsc": "CIUB0000345",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN76 R 0142",
//   "loadingDate": "2022-09-27",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K Ramesh",
//     "accountNumber": "17331550000024982",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001733",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH45 AF 3245",
//   "loadingDate": "2022-07-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Samadhan Popat Kedar",
//     "accountNumber": "50100504144378",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0004200",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA05 AD 4103",
//   "loadingDate": "2021-07-03",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "A Siva",
//     "accountNumber":  "1265166000020980",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001265",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN78 AZ 4245",
//   "loadingDate": "2021-09-23",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Ashok R",
//     "accountNumber":  "8996101000176",
//     "bankName": "CNRB",
//     "ifsc": "CNRB0008996",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN55 CS 3222",
//   "loadingDate": "2022-10-10",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Karthick Kumar T",
//     "accountNumber": "101901000044958",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001019",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN30 BR 9542",
//   "loadingDate": "2022-08-16",
//   "a12": false,
//   "a363": true,
//   "acc": {
//     "accountName": "Vengatachalam Ramamoorthi",
//     "accountNumber":  "28100050307291",
//     "bankName": "TMBL",
//     "ifsc": "TMBL000028",
//     "acc12": false,
//     "acc363": true,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 BB 2973",
//   "loadingDate": "2022-02-04",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Raja D",
//     "accountNumber":  "20247458868",
//     "bankName": "SBI",
//     "ifsc": "SBIN0016900",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 V 5166",
//   "loadingDate": "2022-08-11",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "R Rangadurai",
//     "accountNumber":  "1140155000022921",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001140",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN10 BD 0549",
//   "loadingDate": "2019-10-09",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M.VIMALA DEVI",
//     "accountNumber":  "50100308363478",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0002770",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH14 HG 2491",
//   "loadingDate": "2021-12-22",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Lakkanna H Gadige",
//     "accountNumber":  "9313270797",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0001757",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH48 T 8341",
//   "loadingDate": "2022-02-10",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Balasaheb B Pawar",
//     "accountNumber":  "651602010004692",
//     "bankName": "Union",
//     "ifsc": "UBIN0565164",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AW 1236",
//   "loadingDate": "2022-02-11",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "S Raman",
//     "accountNumber":  "6497987619",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000K272",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 CA 8716",
//   "loadingDate": "2021-09-30",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Kanchana",
//     "accountNumber":  "7000459236",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000K172",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN34 AE 9560",
//   "loadingDate": "2022-05-05",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "S Musthiri",
//     "accountNumber":  "726301000086130",
//     "bankName": "DBSS",
//     "ifsc": "DBSSOIN0726",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 AQ 7960",
//   "loadingDate": "2021-09-04",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Muruli",
//     "accountNumber":  "20197799370",
//     "bankName": "SBI",
//     "ifsc": "SBIN0000949",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN74 AQ 6235",
//   "loadingDate": "2022-05-19",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "P Vadivel",
//     "accountNumber":  "6010717137",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000K202",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN61 K 9900",
//   "loadingDate": "2022-08-19",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "A.Ramesh",
//     "accountNumber": "916010069242873",
//     "bankName": "UTIB",
//     "ifsc": "UTIB0001272",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN34 AD 3479",
//   "loadingDate": "2022-05-21",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M Nagarajan",
//     "accountNumber":  "1194155000192173",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001194",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 CB 2820",
//   "loadingDate": "2022-08-04",
//   "a12": false,
//   "a363": true,
//   "acc": {
//     "accountName": "T Rajeswari",
//     "accountNumber":  "135501000011993",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001355",
//     "acc12": false,
//     "acc363": true,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 BH 8776",
//   "loadingDate": "2021-09-30",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "D Geetha",
//     "accountNumber":  "33133774526",
//     "bankName": "SBI",
//     "ifsc": "SBIN0003782",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN77 P 7286",
//   "loadingDate": "2021-07-21",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "R Venkatajalam",
//     "accountNumber":  "1669155000034587",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001669",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH12 TV 4273",
//   "loadingDate": "2022-06-24",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Akshay Shinde",
//     "accountNumber":  "603104000095105",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0000603",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN12 AM 1800",
//   "loadingDate": "2022-03-19",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Sugumar",
//     "accountNumber":  "6023855946",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000A043",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH45 0513",
//   "loadingDate": "2020-06-15",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Chavan Mahesh Changdeo",
//     "accountNumber":  "13058100008186",
//     "bankName": "BABR",
//     "ifsc": "BABROVELPU",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 CB 5613",
//   "loadingDate": "2022-07-19",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Sandhiya Roadlines",
//     "accountNumber": "9311962328",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0008955",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN30 CY 7229",
//   "loadingDate": "2022-10-14",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "PS Transport",
//     "accountNumber": "50200066058480",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0005884",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "AP39 TH 1956",
//   "loadingDate": "2022-03-28",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Yerriswami Akuleti",
//     "accountNumber":  "20219071464",
//     "bankName": "SBI",
//     "ifsc": "SBIN0006108",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN25 BJ 9274",
//   "loadingDate": "2022-03-16",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Sarvanakumar N",
//     "accountNumber":  "100004222688",
//     "bankName": "ESFB",
//     "ifsc": "ESFB0001045",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN29 BR 2937",
//   "loadingDate": "2022-01-07",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Suresh Ramakrishnan",
//     "accountNumber":  "40563288975",
//     "bankName": "SBI",
//     "ifsc": "SBIN0061791",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN47 BA 3825",
//   "loadingDate": "2021-12-17",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Siva Sakthi Transport",
//     "accountNumber":  "155305004412",
//     "bankName": "ICICI",
//     "ifsc": "ICIC0001553",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN59 BF 1809",
//   "loadingDate": "2021-06-17",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "E Kutty",
//     "accountNumber":  "34541244348",
//     "bankName": "SBI",
//     "ifsc": "SBIN0005201",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN38 CK 4684",
//   "loadingDate": "2021-01-21",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Thangaswarun",
//     "accountNumber":  "618802010008122",
//     "bankName": "UBIN",
//     "ifsc": "UBIN0561886",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN29 CW 7895",
//   "loadingDate": "2022-09-28",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "B Dhandapani",
//     "accountNumber": "1155110010054704",
//     "bankName": "UBIN",
//     "ifsc": "UBIN0001155",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN48 BD 1931",
//   "loadingDate": "2022-06-08",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Loganathan V",
//     "accountNumber":  "500101012715308",
//     "bankName": "CIUB",
//     "ifsc": "CIUB0000475",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AV 4636",
//   "loadingDate": "2021-09-11",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Vignesh Karthikeyan",
//     "accountNumber":  "1813155000025411",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001813",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN99 B 0781",
//   "loadingDate": "2021-03-10",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "S Dinesh Kumar",
//     "accountNumber":  "690010100022507",
//     "bankName": "UTIB",
//     "ifsc": " UTIB0000690",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AX 9109",
//   "loadingDate": "2022-10-01",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "S Chan Basha",
//     "accountNumber": "1813155000023670",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001813",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN29 CY 6053",
//   "loadingDate": "2021-07-07",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "A Sarvanan",
//     "accountNumber":  "760802010006633",
//     "bankName": "UBIN",
//     "ifsc": "UBIN0576085",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN48 BB 2255",
//   "loadingDate": "2022-07-23",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Abdul Rahuman K",
//     "accountNumber": "1166155000219146",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001166",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH13 DQ 7773",
//   "loadingDate": "2022-10-17",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Patel Tpt Co",
//     "accountNumber": "5511173847",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0000724",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH09 CU 0185",
//   "loadingDate": "2022-09-03",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Patel Tpt",
//     "accountNumber": "5511173847",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0000724",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AX 3601",
//   "loadingDate": "2022-10-27",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Ranjit Kumar Ramamoorthy",
//     "accountNumber":  "110019885646",
//     "bankName": "CNRB",
//     "ifsc": "CNRB0006740",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN85 P 6097",
//   "loadingDate": "2022-04-09",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Mathi Logistics",
//     "accountNumber":  "50200011328560",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0001254",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA01 AH 7789",
//   "loadingDate": "2021-02-18",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "R Lakshmanan",
//     "accountNumber":  "1272255000006",
//     "bankName": "CNRB",
//     "ifsc": "CNRB0001272",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN55 CS 1350",
//   "loadingDate": "2022-10-17",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "MOHAN C",
//     "accountNumber":  "101901000046735",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001019",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA51 AG 4068",
//   "loadingDate": "2022-10-20",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Arun Kumar",
//     "accountNumber": "9162500101530001",
//     "bankName": "KARB",
//     "ifsc": "KARB0000916",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN15 D 9671",
//   "loadingDate": "2022-05-12",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Venkatesan",
//     "accountNumber":  "6792190164",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000U035",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "AP39 UB 3717",
//   "loadingDate": "2022-03-25",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "VINOD KUMAR D.K",
//     "accountNumber":  "50100273523841",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0004246",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 CV 9563",
//   "loadingDate": "2021-11-20",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Jayachandru P",
//     "accountNumber":  "34547828804",
//     "bankName": "SBI",
//     "ifsc": "SBIN0002251",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN58 BA 9499",
//   "loadingDate": "2022-01-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M Kalanthai Joseph",
//     "accountNumber":  "158001000008309",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001580",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN73 AE 9122",
//   "loadingDate": "2022-03-05",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Lokesh S",
//     "accountNumber":  "800710110015837",
//     "bankName": "BKID",
//     "ifsc": "BKID0008366",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH50 N 0529",
//   "loadingDate": "2021-10-07",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Vishal Prakash Pawar",
//     "accountNumber":  "50100421959211",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0003675",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN59 BF 2107",
//   "loadingDate": "2022-04-06",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "M Kottaisamy",
//     "accountNumber":  "233201000002200",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0002332",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH14 KA 8027",
//   "loadingDate": "2022-10-10",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Harsh Roadlines",
//     "accountNumber": "87102000058946",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0000087",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH12 FC 8602",
//   "loadingDate": "2020-09-12",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Name",
//     "accountNumber": "22802031852561828",
//     "bankName": "BankName",
//     "ifsc": "IFSC",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN18 AM 1297",
//   "loadingDate": "2022-01-07",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Sandhiya ROadlines",
//     "accountNumber": 5020,
//     "bankName": "ICICI",
//     "ifsc": "ICIC",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH13 AX 4714",
//   "loadingDate": "2021-02-12",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Name",
//     "accountNumber": "22802031853686140",
//     "bankName": "BankName",
//     "ifsc": "IFSC",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN57 BH 0957",
//   "loadingDate": "2022-03-01",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "S Dennis Arcockian",
//     "accountNumber":  "32671116606",
//     "bankName": "SBI",
//     "ifsc": "SBIN0013477",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 BB 8025",
//   "loadingDate": "2022-06-09",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K Jayamuthusekaran",
//     "accountNumber":  "1208172000007771",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001208",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN73 K 1615",
//   "loadingDate": "2022-09-24",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "A Suresh",
//     "accountNumber":  "30428511531",
//     "bankName": "SBI",
//     "ifsc": "SBIN0000934",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN59 CF 6266",
//   "loadingDate": "2021-04-23",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "S Kumar",
//     "accountNumber":  "288001000008548",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0002880",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN34 AF 2955",
//   "loadingDate": "2022-10-15",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Manimegalani",
//     "accountNumber":  "110016153434",
//     "bankName": "CNRB",
//     "ifsc": "CNRB",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 U 8023",
//   "loadingDate": "2022-09-15",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "A Nashir Basha",
//     "accountNumber":  "1667194000001199",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001667",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 AE 4419",
//   "loadingDate": "2021-07-30",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "E Kavitha",
//     "accountNumber": 987279574,
//     "bankName": "IDIB",
//     "ifsc": "IDIB000T029",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN48 BZ 9544",
//   "loadingDate": "2022-07-06",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M Mohamed Abbas",
//     "accountNumber": 439,
//     "bankName": "TP",
//     "ifsc": "TP",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN48 BD 6409",
//   "loadingDate": "2022-10-18",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Perfect Transport",
//     "accountNumber": "10041427509",
//     "bankName": "IDFB",
//     "ifsc": "IDFB0080451",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN16 V 5953",
//   "loadingDate": "2022-07-16",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Sunjaimadhavan K",
//     "accountNumber": "37092946536",
//     "bankName": "SBI",
//     "ifsc": "SBIN0000267",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN45 BR 3937",
//   "loadingDate": "2021-07-31",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Saravanan Ramalingam",
//     "accountNumber":  "57301502507",
//     "bankName": "ICICI",
//     "ifsc": "ICIC0000573",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH12 PQ 7782",
//   "loadingDate": "2022-10-14",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Jarad Transport",
//     "accountNumber": "545901010050962",
//     "bankName": "UBIN",
//     "ifsc": "UBIN0554596",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN55 BS 3222",
//   "loadingDate": "2022-10-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Karthick Kumar T",
//     "accountNumber": "101901000044958",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001019",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN28 BW 9166",
//   "loadingDate": "2021-12-29",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "K Sundaram",
//     "accountNumber":  "6315981482",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000A171",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 CC 8248",
//   "loadingDate": "2021-06-12",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "E Raja Baskar",
//     "accountNumber":  "28001000007962",
//     "bankName": "X",
//     "ifsc": "X",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 BF 4716",
//   "loadingDate": "2021-02-08",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "N Sathyanarayanan",
//     "accountNumber":  "6485303850",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000K172",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN99 Y 1144",
//   "loadingDate": "2022-10-19",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "V Kanagarani",
//     "accountNumber": "500101010819958",
//     "bankName": "CIUB",
//     "ifsc": "CIUB000452",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 BB 6602",
//   "loadingDate": "2022-05-27",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Iyyappan R",
//     "accountNumber":  "1710155000026954",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001710",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA32 D 3796",
//   "loadingDate": "2022-10-22",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Mashak C Patel",
//     "accountNumber":  "50100262593583",
//     "bankName": "HDFC0000768",
//     "ifsc": "HDFC",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN12 AR 6760",
//   "loadingDate": "2022-10-18",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Thangadurai V",
//     "accountNumber":  "1833104000004060",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0001833",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN13 Q 9281",
//   "loadingDate": "2022-08-10",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Winnis Logistic",
//     "accountNumber":  "5020054558258",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0000017",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN78 AZ 7018",
//   "loadingDate": "2021-09-11",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "E Prakash",
//     "accountNumber":  "8996101005775",
//     "bankName": "CNRB",
//     "ifsc": "CNRB0008996",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA53 AA 2116",
//   "loadingDate": "2022-08-12",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Praveen Raj",
//     "accountNumber": "032701000020536",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0000327",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH12 LT 7257",
//   "loadingDate": "2022-06-02",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Rajendra Roadlimes",
//     "accountNumber":  "44220200000876",
//     "bankName": "BARB",
//     "ifsc": "BARB0SAHPUN",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN05 CC 1427",
//   "loadingDate": "2021-04-19",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "R Nandhi Varman",
//     "accountNumber":  "218405001135",
//     "bankName": "ICICI",
//     "ifsc": "ICIC0002184",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN30 CX 6016",
//   "loadingDate": "2022-07-23",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Mohan Murugan",
//     "accountNumber": "100036770967",
//     "bankName": "ESFB",
//     "ifsc": "ESFB0001117",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN64 T 9498",
//   "loadingDate": "2022-05-26",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Saraswathi I",
//     "accountNumber":  "500101013019024",
//     "bankName": "CIUB",
//     "ifsc": "CIUB0000554",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN15 A 5244",
//   "loadingDate": "2021-05-03",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "D Chakkarapani",
//     "accountNumber":  "31971667333",
//     "bankName": "SBI",
//     "ifsc": "SBIN0011071",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN29 BL 9891",
//   "loadingDate": "2021-06-10",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "R Gnanasekaran",
//     "accountNumber":  "368104000071664",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0000368",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH42 AQ 7087",
//   "loadingDate": "2022-10-28",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Patel Tpt",
//     "accountNumber": "5511173847",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0000724",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA22 D 7975",
//   "loadingDate": "2022-04-08",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Mohammad Mustak Naikwadi",
//     "accountNumber":  "89100073701",
//     "bankName": "KVGB",
//     "ifsc": "KVGB0002501",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 BH 9496",
//   "loadingDate": "2021-06-19",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Sathish J",
//     "accountNumber":  "79101000019872",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0000791",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 AR 0688",
//   "loadingDate": "2022-06-20",
//   "a12": false,
//   "a363": true,
//   "acc": {
//     "accountName": "P Govindan",
//     "accountNumber":  "20273597118",
//     "bankName": "SBI",
//     "ifsc": "SBIN0016117",
//     "acc12": false,
//     "acc363": true,
//     "acc65": false
//   }
// },{
//   "truckno": "MH25 AJ 1352",
//   "loadingDate": "2022-07-05",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Patel Tpt Co",
//     "accountNumber":  "5511173847",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0000724",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA01 AH 3534",
//   "loadingDate": "2022-02-10",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Raghu",
//     "accountNumber":  "110002059104",
//     "bankName": "CNRB",
//     "ifsc": "CNRB",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 BM 3051",
//   "loadingDate": "2021-07-19",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "S Subramanian",
//     "accountNumber":  "28001000015331",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0000280",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TEST",
//   "loadingDate": "2023-10-31",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Name",
//     "accountNumber": "221002042706529630",
//     "bankName": "BankName",
//     "ifsc": "IFSC",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN13 T 6699",
//   "loadingDate": "2021-12-27",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "National Cargo Carrier",
//     "accountNumber":  "1694135000003555",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001694",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH12 LT 2424",
//   "loadingDate": "2021-03-11",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Santosh Parihar",
//     "accountNumber": 8857,
//     "bankName": "Other",
//     "ifsc": "Other",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN12 AR 6752",
//   "loadingDate": "2022-09-24",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Thangadurai V",
//     "accountNumber":  "1833104000004060",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0001833",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN39 CD 0137",
//   "loadingDate": "2020-05-25",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M Muthupriya",
//     "accountNumber":  "3404619679",
//     "bankName": "CBIn",
//     "ifsc": "CBIN0282151",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN28 BH 0967",
//   "loadingDate": "2022-02-25",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Deepam Logistics",
//     "accountNumber":  "80405002639",
//     "bankName": "ICICI",
//     "ifsc": "ICIC0000804",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN39 DX 5166",
//   "loadingDate": "2022-08-04",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Ramesh.K",
//     "accountNumber": "1179155000171123",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001179",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN42 P 0508",
//   "loadingDate": "2022-03-31",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Madhu Roadlines",
//     "accountNumber":  "50200055886167",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0003724",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH12 UM 0941",
//   "loadingDate": "2022-10-08",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Patel Tpt",
//     "accountNumber": "5511173847",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0000724",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH13 CU 3617",
//   "loadingDate": "2022-10-31",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Nitin D Kambale",
//     "accountNumber":  "73610510002380",
//     "bankName": "BKID",
//     "ifsc": "BKID0000736",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN25 BJ 9897",
//   "loadingDate": "2022-05-28",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "C Suresh",
//     "accountNumber":  "1431104000029078",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0001431",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 V 0928",
//   "loadingDate": "2022-10-15",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Karthikeyan Annamalai",
//     "accountNumber": "12870100133208",
//     "bankName": "FDRL",
//     "ifsc": "FDRL0001287",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN38 CY 1919",
//   "loadingDate": "2022-07-15",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "SRI SENTHIL VELAVAN TRANSPORT",
//     "accountNumber":  "1748115000006090",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001748",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN12 AR 7083",
//   "loadingDate": "2022-10-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Sudhakar P",
//     "accountNumber":  "69790100003197",
//     "bankName": "BARB",
//     "ifsc": "BARB0VJTIND",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN70 Z 5188",
//   "loadingDate": "2022-06-23",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Senthilkumar RL",
//     "accountNumber":  "500101012265857",
//     "bankName": "CIUB",
//     "ifsc": "CIUB0000629",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN47 BA 4083",
//   "loadingDate": "2022-10-28",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "V Kathirvel",
//     "accountNumber":  "1152135000013644",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001152",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH13 CU 6386",
//   "loadingDate": "2022-10-08",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Parshuram M Kambale",
//     "accountNumber":  "73610110007656",
//     "bankName": "BKID",
//     "ifsc": "BKID0000736",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN42 AD 5842",
//   "loadingDate": "2022-03-12",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Global Roadways",
//     "accountNumber":  "200000723315",
//     "bankName": "ESFB",
//     "ifsc": "ESFB0001008",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 BH 1523",
//   "loadingDate": "2021-09-24",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "G Gomathi",
//     "accountNumber":  "20316986915",
//     "bankName": "SBIN",
//     "ifsc": "SBIN0003782",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN15 C 0977",
//   "loadingDate": "2022-08-29",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Sumanraj",
//     "accountNumber":  "6589064482",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000T064",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN75 AS 1561",
//   "loadingDate": "2022-01-10",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "P Jose",
//     "accountNumber":  "67055172809",
//     "bankName": "SBI",
//     "ifsc": "SBIN0070016",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 AQ 0309",
//   "loadingDate": "2022-06-05",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Tirumalai S",
//     "accountNumber":  "836410110004441",
//     "bankName": "BKID",
//     "ifsc": "BKID00008364",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN38 CT 1743",
//   "loadingDate": "2021-03-17",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "A Jayasuriyan",
//     "accountNumber":  "20401759065",
//     "bankName": "SBI",
//     "ifsc": "SBIN0016923",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN38 CA 4062",
//   "loadingDate": "2021-03-28",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Aliya Bee M",
//     "accountNumber":  "1075101021798",
//     "bankName": "CNRB",
//     "ifsc": "CNRB0001075",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH13 DQ 3462",
//   "loadingDate": "2022-09-05",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Patel Tpt",
//     "accountNumber": "5511173847",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0000724",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN33 BW 3130",
//   "loadingDate": "2022-07-27",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "A Praveen Kumar",
//     "accountNumber": "162701000013038",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001627",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 U 3272",
//   "loadingDate": "2022-10-10",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Welcome Transport",
//     "accountNumber": "1248115000008893",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001248",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN42 AH 2118",
//   "loadingDate": "2022-03-13",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Global Roadways",
//     "accountNumber":  "9750279000",
//     "bankName": "KKBK",
//     "ifsc": "KKBK",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN37 DX 3700",
//   "loadingDate": "2022-09-12",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "D Paramasivan",
//     "accountNumber":  "1279155000071783",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001665",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN47 AV 2034",
//   "loadingDate": "2022-07-09",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Silambarasan S",
//     "accountNumber":  "273601000027149",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0002736",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN42 AH 2107",
//   "loadingDate": "2022-03-11",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Global Roadways",
//     "accountNumber":  "9750279000",
//     "bankName": "KKBK",
//     "ifsc": "KKBK",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 AB 7413",
//   "loadingDate": "2022-09-07",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Poorani V",
//     "accountNumber":  "1710155000028630",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001710",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN19 AR 8062",
//   "loadingDate": "2022-01-24",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Value Chain Supply Soln",
//     "accountNumber":  "918020060384496",
//     "bankName": "Axis",
//     "ifsc": "UTIB0003393",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AQ 6118",
//   "loadingDate": "2021-11-02",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Ashvuth A",
//     "accountNumber": 799105389,
//     "bankName": "IDIB",
//     "ifsc": "IDIB000S062",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN16 E 5601",
//   "loadingDate": "2022-09-06",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "V Murugan",
//     "accountNumber":  "33289139427",
//     "bankName": "SBI",
//     "ifsc": "SBIN0016900",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN84 H 0347",
//   "loadingDate": "2022-05-07",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Muniyandi S",
//     "accountNumber":  "39875080539",
//     "bankName": "SBI",
//     "ifsc": "SBIN0000921",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN37 DW 1895",
//   "loadingDate": "2021-06-16",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "S Ganesh Moorthy",
//     "accountNumber":  "1759155000021661",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001759",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN75 J 7501",
//   "loadingDate": "2022-04-29",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Augustin J Kennedy",
//     "accountNumber":  "459301000023002",
//     "bankName": "LAVB",
//     "ifsc": "LAVB000096",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN38 CZ 6615",
//   "loadingDate": "2022-08-24",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "SARAVANAKUMAR",
//     "accountNumber":  "1748155000002350",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001748",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN15 D 7922",
//   "loadingDate": "2022-04-29",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "P Anbarasan",
//     "accountNumber":  "500101010987367",
//     "bankName": "CIUB0000075",
//     "ifsc": "CIUB",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN48 BB 6026",
//   "loadingDate": "2022-10-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Gocindharaj A",
//     "accountNumber":  "19100050306542",
//     "bankName": "TMBL",
//     "ifsc": "TMBL0000019",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH14 GD 7471",
//   "loadingDate": "2022-10-19",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Mystak Ladji Bagwan",
//     "accountNumber":  "913010008116354",
//     "bankName": "UTIB",
//     "ifsc": "UTIB0001034",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN25 BJ 6049",
//   "loadingDate": "2021-02-06",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "T Senthil Kumar",
//     "accountNumber":  "6607551763",
//     "bankName": "IDIB",
//     "ifsc": "IDIB0005246",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA32 D 8674",
//   "loadingDate": "2022-04-22",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Meerasab Mujawar",
//     "accountNumber":  "11039100010525",
//     "bankName": "PKGB",
//     "ifsc": "PKGB0011039",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 BB 5106",
//   "loadingDate": "2022-02-27",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Elumalai",
//     "accountNumber":  "6758438198",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000T134",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 M 1032",
//   "loadingDate": "2021-06-28",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Arumugam V",
//     "accountNumber":  "6610275662",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000M213",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN42 AF 7337",
//   "loadingDate": "2022-01-12",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Global Roadways",
//     "accountNumber":  "9750279000",
//     "bankName": "KKBK",
//     "ifsc": "KKBK",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA32 AA 0020",
//   "loadingDate": "2022-06-24",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Mashak Chand Patel",
//     "accountNumber":  "50100262593583",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0000768",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN18 AQ 3241",
//   "loadingDate": "2022-06-19",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Ramachandran S",
//     "accountNumber":  "170501000016593",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001705",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN34 AF 0904",
//   "loadingDate": "2022-10-07",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "R Manoj Kumar",
//     "accountNumber": "1194155000273633",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001194",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 CC 3124",
//   "loadingDate": "2022-07-12",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "P Navaneetha Krishnan",
//     "accountNumber":  "247010100029473",
//     "bankName": "ANDB",
//     "ifsc": "ANDB0002470",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 V 6432",
//   "loadingDate": "2022-09-11",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "A Nashir Basha",
//     "accountNumber":  "1667194000001199",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001667",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN18 BB 0245",
//   "loadingDate": "2022-04-12",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Sakthidasan B",
//     "accountNumber":  "1803194000002610",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001803",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN25 BL 6860",
//   "loadingDate": "2021-04-24",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "K Pichaikaran",
//     "accountNumber": 951168916,
//     "bankName": "IDIB",
//     "ifsc": "IDIB000T094",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TS12 UD 1502",
//   "loadingDate": "2022-04-29",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Patel Tpt",
//     "accountNumber":  "5511173847",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0000724",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 AQ 6082",
//   "loadingDate": "2021-01-09",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "S Duraisamy",
//     "accountNumber":  "30401629225",
//     "bankName": "SBIN",
//     "ifsc": "SBIN0016854",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 AH 9270",
//   "loadingDate": "2021-06-26",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "S Prabhu",
//     "accountNumber":  "1208155000184503",
//     "bankName": "KVBL",
//     "ifsc": "KVBL",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN45 BQ 8179",
//   "loadingDate": "2021-07-07",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M Mohamed Ansari",
//     "accountNumber":  "6676278974",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000P006",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH10 Z 4238",
//   "loadingDate": "2021-01-23",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Nana B Markad",
//     "accountNumber":  "50100338972900",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0004200",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN23 CK 6567",
//   "loadingDate": "2021-07-29",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Akshayya Tpt",
//     "accountNumber":  "1291135000003049",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001291",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 CB 3124",
//   "loadingDate": "2022-04-23",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "L Sabri",
//     "accountNumber":  "927101030133",
//     "bankName": "CNRB",
//     "ifsc": "CNRB0000927",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN30 BS 5805",
//   "loadingDate": "2021-04-26",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Kumaresan K",
//     "accountNumber":  "32919849400",
//     "bankName": "SBI",
//     "ifsc": "SBIN0018379",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN36 AS 9595 ",
//   "loadingDate": "2022-09-22",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K Varadharaj",
//     "accountNumber": "1188155000124981",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001188",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN29 CW 6348",
//   "loadingDate": "2022-08-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Siva V",
//     "accountNumber": "760802010006817",
//     "bankName": "UBIN",
//     "ifsc": "UBIN0576085",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH45 AF 6302",
//   "loadingDate": "2022-10-30",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Snehal D Sutar",
//     "accountNumber":  "60252907525",
//     "bankName": "MAHB",
//     "ifsc": "MAHB0001838",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN23 CV 3487",
//   "loadingDate": "2022-08-05",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "G Ashokkumar",
//     "accountNumber":  "6065755567",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000O001",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN25 BL 3918",
//   "loadingDate": "2021-01-19",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "R Raghunath",
//     "accountNumber":  "2204728332",
//     "bankName": "CBIn",
//     "ifsc": "CBIN0282104",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN59 CE 7436",
//   "loadingDate": "2021-03-22",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Senthil Murugan R",
//     "accountNumber":  "406100050301728",
//     "bankName": "TMBL",
//     "ifsc": "TMBL0000406",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN42 AE 5002",
//   "loadingDate": "2022-06-22",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K Selvaraj",
//     "accountNumber":  "1795155000072862",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001795",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN38 CX 3255",
//   "loadingDate": "2022-03-30",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Saranya R",
//     "accountNumber":  "500101010604507",
//     "bankName": "CIUB",
//     "ifsc": "CIUB0000345",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN92 C 9093",
//   "loadingDate": "2022-03-28",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "K Sekaran",
//     "accountNumber":  "1152155000104394",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001152",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN12 AL 9789",
//   "loadingDate": "2022-06-25",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Ramesh T",
//     "accountNumber":  "915010041901388",
//     "bankName": "UTIB",
//     "ifsc": "UTIB0001182",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH12 QW 4073",
//   "loadingDate": "2022-06-30",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Akshay Shinde",
//     "accountNumber":  "603104000095105",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0000603",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN99 AA 1144",
//   "loadingDate": "2022-10-06",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "V Kanagrani",
//     "accountNumber": "500101010819958",
//     "bankName": "CIUB",
//     "ifsc": "CIUB000452",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN59 CC 7824",
//   "loadingDate": "2022-10-17",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "T Ganesh Pandian",
//     "accountNumber":  "1626155000006964",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001626",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TEST3",
//   "loadingDate": "2023-10-04",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Name",
//     "accountNumber": "22930040339786704",
//     "bankName": "BankName",
//     "ifsc": "IFSC",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH14 HG 7471",
//   "loadingDate": "2022-07-27",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Mystak Ladji Bagwan",
//     "accountNumber": "913010008116354",
//     "bankName": "UTIB",
//     "ifsc": "UTIB0001034",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN47 BA 7466",
//   "loadingDate": "2022-05-31",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Selvam J",
//     "accountNumber":  "270101000014220",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0002701",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH45 AF 1339",
//   "loadingDate": "2022-06-11",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Navnath Wagh",
//     "accountNumber":  "11662352131",
//     "bankName": "SBI",
//     "ifsc": "SBIN0001928",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN12 AF 0946",
//   "loadingDate": "2021-03-19",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Arun Kumar Nair",
//     "accountNumber":  "246001001124028",
//     "bankName": "CIUB",
//     "ifsc": "CIUB0000246",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 AK 6818",
//   "loadingDate": "2021-03-18",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Saruth Kumar T",
//     "accountNumber":  "6688775234",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000D003",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 U 9581",
//   "loadingDate": "2021-12-22",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Manikandan",
//     "accountNumber":  "918010049789244",
//     "bankName": "UTIB",
//     "ifsc": "UTIB0001526",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH42 AQ 9858",
//   "loadingDate": "2022-06-23",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Patel Tpt",
//     "accountNumber":  "5511173847",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0000724",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN37 EZ 0762",
//   "loadingDate": "2022-09-26",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Muralidharan",
//     "accountNumber": "2396201005733",
//     "bankName": "CNRB",
//     "ifsc": "CNRB",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN59 BX 9849",
//   "loadingDate": "2022-07-09",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "accountName",
//     "accountNumber": 1,
//     "bankName": "bankName",
//     "ifsc": "ifsc",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN12 M 6329",
//   "loadingDate": "2022-02-19",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "B Karthikeyan",
//     "accountNumber":  "500101010765655",
//     "bankName": "CIUB",
//     "ifsc": "CIUB0000397",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AQ 9578",
//   "loadingDate": "2022-10-15",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "T Kumar",
//     "accountNumber":  "20203569591",
//     "bankName": "SBI",
//     "ifsc": "SBIN0007494",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN93 5927",
//   "loadingDate": "2021-12-18",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "K Partiban",
//     "accountNumber":  "50100307863005",
//     "bankName": "HDFC",
//     "ifsc": "HDFC00002222",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN12 W 9236",
//   "loadingDate": "2022-09-16",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K Magesh",
//     "accountNumber": "55170100000771",
//     "bankName": "BABR",
//     "ifsc": "BABR0AVADIX",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH42 AQ 3136",
//   "loadingDate": "2021-02-19",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Ananda Baburao Nikalaje",
//     "accountNumber":  "5435101000568",
//     "bankName": "CNRB",
//     "ifsc": "CNRB0005435",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN48 BZ 8986",
//   "loadingDate": "2022-07-17",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Abdul Rahman K",
//     "accountNumber":  "5901000026907",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0000059",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH01 CR 6482",
//   "loadingDate": "2021-03-23",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Tukaram Markad",
//     "accountNumber":  "8850100027272",
//     "bankName": "BARB",
//     "ifsc": "BARB0AKLUJX",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN29 BR 3241",
//   "loadingDate": "2022-09-23",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M Sivaraman",
//     "accountNumber": "6077428739",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000H018",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN23 DY 0931",
//   "loadingDate": "2022-08-27",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "S Suresh",
//     "accountNumber":  "119801000012886",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001198",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN29 CY 7160",
//   "loadingDate": "2021-07-07",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Syed Aslam",
//     "accountNumber":  "33937848179",
//     "bankName": "SBI",
//     "ifsc": "SBIN0003834",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN96 B 3272",
//   "loadingDate": "2022-08-24",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M Chandrasekar",
//     "accountNumber":  "34910100001389",
//     "bankName": "UBIN",
//     "ifsc": "UBIN0803499",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 BB 2287",
//   "loadingDate": "2022-08-10",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "A Senthil",
//     "accountNumber":  "6477621874",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000T104",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN20 DA 9896",
//   "loadingDate": "2022-09-06",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Dineshkumar Ramesh",
//     "accountNumber": "7118182589",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000V024",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 CE 4858",
//   "loadingDate": "2022-06-08",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "T Selvi",
//     "accountNumber":  "50200055579395",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0000407",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH12 TV 6094",
//   "loadingDate": "2022-10-14",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "ATUL SUBHASH GAIKWAD",
//     "accountNumber": "920010068679826",
//     "bankName": "UTIB",
//     "ifsc": "UTIB0003106",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH45 1285",
//   "loadingDate": "2022-08-27",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Vijay N Londe",
//     "accountNumber": "50100315239534",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0002803",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN29 AK 2799",
//   "loadingDate": "2022-02-13",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K Deivani",
//     "accountNumber":  "6669696220",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000P104",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN77 L 5828",
//   "loadingDate": "2022-09-27",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "C Senthamarai",
//     "accountNumber": "607196482",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000A033",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN69 BQ 0727",
//   "loadingDate": "2022-09-10",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Ravi S",
//     "accountNumber":  "6124378296",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000M208",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN39 DY 5443",
//   "loadingDate": "2022-06-13",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Vardharaj C",
//     "accountNumber":  "50200053990176",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0002225",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN72 BL 7205",
//   "loadingDate": "2022-10-11",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "E Sakkipandi Muthian",
//     "accountNumber": "6756957716",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000T035",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH46 BF 0996",
//   "loadingDate": "2022-10-08",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Harish Roadlines",
//     "accountNumber":  "87102000058946",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0000087",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN18 AS 3166",
//   "loadingDate": "2021-01-29",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "SS Transport",
//     "accountNumber":  "570301010050308",
//     "bankName": "UBIN",
//     "ifsc": "UBIN0557030",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN45 CZ 1635",
//   "loadingDate": "2022-07-18",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K Parthipan",
//     "accountNumber":  "1647155000108945",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001647",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN58 BD 4917",
//   "loadingDate": "2022-10-28",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "T Ganesh Pandian",
//     "accountNumber":  "1626155000006964",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001626",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN37 EZ 4267",
//   "loadingDate": "2021-12-30",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "T Nagaraj",
//     "accountNumber":  "20681530001873",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0003914",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN58 BA 5305",
//   "loadingDate": "2022-10-21",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "T Ganesh Pandian",
//     "accountNumber":  "1626155000006964",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001626",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN59 CU 1680",
//   "loadingDate": "2022-06-09",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Lavanya A",
//     "accountNumber":  "1019101041034",
//     "bankName": "CNRB",
//     "ifsc": "CNRB",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN55 BV 3998",
//   "loadingDate": "2022-06-29",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Mohan C",
//     "accountNumber":  "101901000046735",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001019",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN23 CC 2848",
//   "loadingDate": "2022-03-29",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "A Anusiya",
//     "accountNumber":  "36166941410",
//     "bankName": "SBI",
//     "ifsc": "SBIN0000864",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN92 F 8145",
//   "loadingDate": "2022-09-12",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Vignesh",
//     "accountNumber":  "132101000064236",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001321",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN16 E 4132",
//   "loadingDate": "2022-08-01",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "D Selvaraj",
//     "accountNumber": "1688155000013279",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001688",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN54 V 3129",
//   "loadingDate": "2022-08-13",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Mahalakshmi",
//     "accountNumber": "50100509284219",
//     "bankName": "HDFC",
//     "ifsc": "HDFC0001281",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN48 BW 0978",
//   "loadingDate": "2022-05-14",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Amutha S",
//     "accountNumber":  "32470442446",
//     "bankName": "SBI",
//     "ifsc": "SBIN0000978",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN18 BE 3652",
//   "loadingDate": "2022-08-02",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Chandralekha G",
//     "accountNumber":  "500101012226586",
//     "bankName": "CIUB",
//     "ifsc": "CIUB0000242",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN48 AP 0012",
//   "loadingDate": "2022-05-17",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "M Loganathan",
//     "accountNumber":  "1166155000141474",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001166",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN24 AQ 1757",
//   "loadingDate": "2021-04-03",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Sakthivel Sekar",
//     "accountNumber":  "1813155000021420",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001813",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN70 AF 8907",
//   "loadingDate": "2022-06-13",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "C Subramani",
//     "accountNumber":  "1329172000002734",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001329",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH14 JL 0927",
//   "loadingDate": "2022-02-03",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Harsh Roadlines",
//     "accountNumber":  "87102000058946",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0000087",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH12 SX 9397",
//   "loadingDate": "2022-10-07",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Akshay Shinde",
//     "accountNumber":  "603104000095105",
//     "bankName": "IBKL",
//     "ifsc": "IBKL0000603",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN47 BZ 4853",
//   "loadingDate": "2021-03-09",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Poopathi S",
//     "accountNumber":  "377301000074875",
//     "bankName": "LAVB",
//     "ifsc": "LAVB0000377",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA32 D 3159",
//   "loadingDate": "2022-10-04",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Dilip Shirure",
//     "accountNumber":  "3684343368",
//     "bankName": "CBIN",
//     "ifsc": "CBIN0284391",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 CE 5405",
//   "loadingDate": "2022-10-28",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Suresh S",
//     "accountNumber": "110701000005764",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001107",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 AS 6321",
//   "loadingDate": "2021-04-24",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Reegam",
//     "accountNumber":  "6283350833",
//     "bankName": "IDIB",
//     "ifsc": "IDIB000V121",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN37 DW 8669",
//   "loadingDate": "2022-09-21",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Muralidharan",
//     "accountNumber": "2396201005733",
//     "bankName": "CNRB",
//     "ifsc": "CNRB",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN30 BA 2388",
//   "loadingDate": "2021-08-24",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "T MANIMEGALAI",
//     "accountNumber":  "801710100006234",
//     "bankName": "BKID",
//     "ifsc": "BKID0008017",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN52 Q 0014",
//   "loadingDate": "2022-09-08",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Ramesh S",
//     "accountNumber":  "1684155000079677",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001684",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN29 BP 5773",
//   "loadingDate": "2022-07-15",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Sanjay Gandhi Palani",
//     "accountNumber":  "916384854366",
//     "bankName": "PAYTM",
//     "ifsc": "PYTM0123456",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN32 AK 8170",
//   "loadingDate": "2021-08-18",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "K V Carrier",
//     "accountNumber":  "5640400043681",
//     "bankName": "BARB",
//     "ifsc": "BARBOPONDIL",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN38 CT 5879",
//   "loadingDate": "2022-08-12",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "SRI SENTHIL VELAVAN TRANSPORT",
//     "accountNumber":  "1748115000006090",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001748",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN99 P 6870",
//   "loadingDate": "2022-04-15",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "M Mallika",
//     "accountNumber":  "170001000082176",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0001700",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 CV 1697",
//   "loadingDate": "2021-11-13",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Gopal Krishnan A",
//     "accountNumber":  "79101000019243",
//     "bankName": "IOBA",
//     "ifsc": "IOBA0000791",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH13 DQ 3402",
//   "loadingDate": "2022-09-01",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Patel Tpt",
//     "accountNumber": "5511173847",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0000724",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "KA59 1535",
//   "loadingDate": "2021-08-14",
//   "a12": false,
//   "a363": true,
//   "acc": {
//     "accountName": "M Vadivel",
//     "accountNumber": 785630198,
//     "bankName": "IDIB",
//     "ifsc": "IDIB000H018",
//     "acc12": false,
//     "acc363": true,
//     "acc65": false
//   }
// },{
//   "truckno": "TEST2",
//   "loadingDate": "2023-10-04",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "Name",
//     "accountNumber": "22930040334566732",
//     "bankName": "BankName",
//     "ifsc": "IFSC",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN25 BK 2098",
//   "loadingDate": "2021-04-24",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "D Ravi",
//     "accountNumber":  "619601020066",
//     "bankName": "ICICI",
//     "ifsc": "ICIC0006196",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN93 D 9887",
//   "loadingDate": "2022-01-08",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Sasikumar",
//     "accountNumber":  "39769356466",
//     "bankName": "SBI",
//     "ifsc": "SBIN0000877",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN31 AL 8489",
//   "loadingDate": "2021-10-09",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "P Sivaraman",
//     "accountNumber":  "31897590473",
//     "bankName": "SBI",
//     "ifsc": "SBIN0003782",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN47 AL 0243",
//   "loadingDate": "2022-03-28",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "V Kathirvel",
//     "accountNumber":  "1152135000013644",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001152",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN29 BY 5998",
//   "loadingDate": "2022-05-14",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "C Chinnaraj",
//     "accountNumber":  "4369101006900",
//     "bankName": "CNRB",
//     "ifsc": "CNRB00004369",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN34 AC 0462",
//   "loadingDate": "2022-03-17",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "G. Kandhasamy",
//     "accountNumber":  "237510100044126",
//     "bankName": "UBIN",
//     "ifsc": "UBIN0901121",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "TN64 V 3569",
//   "loadingDate": "2021-01-06",
//   "a12": false,
//   "a363": false,
//   "acc": {
//     "accountName": "L Manikandan",
//     "accountNumber":  "1161155000078957",
//     "bankName": "KVBL",
//     "ifsc": "KVBL0001161",
//     "acc12": false,
//     "acc363": false,
//     "acc65": false
//   }
// },{
//   "truckno": "MH24 AB 9141",
//   "loadingDate": "2021-11-18",
//   "a12": true,
//   "a363": false,
//   "acc": {
//     "accountName": "Patel Transport",
//     "accountNumber":  "5511173847",
//     "bankName": "KKBK",
//     "ifsc": "KKBK0000724",
//     "acc12": true,
//     "acc363": false,
//     "acc65": false
//   }
// }]
public items = { keyOne: 'value 1', keyTwo: 'value 2', keyThree: 'value 3' };
  public contact;
  public modalData;
  public loginV = false;
  public hoverThis = false;
  public now = new Date();
  public changed = false;
  public hehe;
  public morseIS = '';
  public clue = false;
  public fileFormData = new FormData();
  public fileFormDataPython = new FormData();
  public newAuthor: any;
  public paymentData;

  public selectedFile = null;
  public imageFolder = ''
  public panCardFile: any;
  public panCardString: string;
  public finalJson = {};
  public pythonVar = '';
  public document = new jsPDF();

  constructor(public apiCallservice: ApiCallsService, public handledata: HandleDataService,
    public router: Router, public handleF: handleFunction,public security:SecurityCheckService) {
    localStorage.clear();
    // this.generateReportAccount2();
    }
    
    
    // generateReportAccount2(){//threshhold is 295
    //   //
            
    //         let data=this.data;
    //          var doc = new jsPDF()
    //          let y = 24;
    //          let starty = 24;
            
             
    //          let startforI=0;
    //          y = y + 6;
    //          startforI=0;
    //          for (let i = startforI; i < data.length; i++) {
         
    //            if(y>290){
    //              y=24;
    //              y=y+6;
    //          starty = 24;
             
    //              doc.addPage();
    //          }
    //          doc.text(data[i].a12?'T':'', 92, y)//partyname
    //          doc.text(data[i].a363?'T':'', 114, y)//partyname
               
    //            y = y + 15;
         
    //          }
        
    //          doc.save('Account-Details.pdf')
    //        }
//     generateReportAccount(){//threshhold is 295
// // Fetch all trucks who have either 12 or 363 as false
//       // let data=this.handleF.removeDuplicates(this.data)
//       let data=this.data;
//       let pager=1;
//        var doc = new jsPDF()
//        doc.setFontSize('25');
//        doc.setFontType('bold');
//        doc.text('Account Details : ', 15, 15)//partyname
//        doc.setFontSize('10');
//       //  doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 165, 19)//date
//        doc.text(String(pager), 180, 5)//pageno
//        pager=pager+1;
//        doc.setFontSize('25');
//        doc.setLineWidth(0.5);
//        doc.line(0, 20, 210, 20);//line after main header
//        //headers
//        doc.setFontSize('10');
//        let y = 24;
//        let starty = 24;
//        doc.text('Sr', 3, y)//partyname
//        doc.text('TruckNo', 12, y)//partyname
//        doc.text('Account', 39, y)//partyname
//        doc.text('12', 92, y)//partyname
//        doc.text('363', 114, y)//partyname
//        doc.text('Account Number', 150, y)//partyname
//        //headers
//        doc.line(0, 25, 210, 25);//line after header
   
//        //vertical lines
//        doc.line(10, 20, 10, 25);//srno
//        doc.line(38, 20, 38, 25);//date
//        doc.line(90, 20, 90, 25);//truckno
//        doc.line(112, 20, 112, 25);//credit
//        doc.line(134, 20, 134, 25);//credit
//        //vertical lines
//        let startforI=0;
//        y = y + 6;
//        startforI=0;
//        for (let i = startforI; i < data.length; i++) {
   
//          if(y>290){
//            y=24;
//            y=y+6;
//        starty = 24;
//        doc.line(10, 25, 10, 300);//srno
//        doc.line(38, 25, 38, 300);//date
//        doc.line(90, 25, 90, 300);//truckno
//        doc.line(112, 25, 112, 300);//credit
//        doc.line(134, 25, 134, 300);//credit
//            doc.addPage();
//            doc.setFontSize('25');
//        doc.setFontType('bold');
//        doc.text('Account Details : ', 15, 15)//partyname
//        doc.setFontSize('10');
//       //  doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 190, 19)//date
//        doc.text(String(pager), 180, 5)//pageno
//        pager=pager+1;
//        doc.setFontSize('25');
//        doc.setLineWidth(0.5);
//        doc.line(0, 20, 210, 20);//line after main header
//        //headers
//        doc.setFontSize('10');
//        doc.text('Sr', 3, y-6)//partyname
//        doc.text('TruckNo', 12, y-6)//partyname
//        doc.text('Account', 39, y-6)//partyname
//        doc.text('12', 92, y-6)//partyname
//        doc.text('363', 114, y-6)//partyname
//        doc.text('Account Number', 150, y-6)//partyname
//        //headers
//        doc.line(0, 25, 210, 25);//line after header
   
//        //vertical lines
//        doc.line(10, 20, 10, 25);//srno
//        doc.line(38, 20, 38, 25);//date
//        doc.line(90, 20, 90, 25);//truckno
//        doc.line(112, 20, 112, 25);//credit
//        doc.line(134, 20, 134, 25);//credit
//        //vertical lines
//        }
       
//         doc.text(String(i+1), 3, y)//partyname
//         doc.text(data[i].truckno, 11, y)//partyname

//         doc.text(this.handleF.getDateddmmyy(data[i].loadingDate), 11, y+4)//partyname

//        doc.text(data[i].acc.accountName, 39, y)//partyname
//        doc.text(String(data[i].acc.accountNumber), 39, y+4)//partyname
//        doc.text(data[i].acc.ifsc, 39, y+8)//partyname
  
                  
//          doc.line(0, y + 11, 210, y + 11);//line after header
//          y = y + 15;
   
//        }
//              doc.line(10, starty, 10, y-4);//srno
//        doc.line(38, starty, 38, y-4);//date
//        doc.line(90, starty, 90, y-4);//truckno
//        doc.line(112, starty, 112, y-4);//credit
//        doc.line(134, starty, 134, y-4);//credit
  
//        doc.save('Account-Details.pdf')
//      }

  login(data) {
    this.security.setBranch(data);
    
    this.router.navigate(['Login']);
    this.loginV = true;
    
  }
  sendMsg(type,typo){

    switch (typo) {
      case 'wa':
        switch (type) {
          case 'nitin':
            window.open('https://wa.me/+919822288257/?text=Hi','_blank');    
            break;
            case 'shubham':
            window.open('https://wa.me/+919766707061/?text=Hi','_blank');    
            break;
        }
        break;
        case 'txt':
        switch (type) {
          case 'nitin':
            window.open('sms:+919822288257?body=Hi','_blank');    
            break;
            case 'shubham':
            window.open('sms:+919766707061?body=Hi','_blank');    
            break;
        }
        break;
    
      
    }
    
    
      }
      returnAmountPaymentBalance(){
        let amount=0;
        let payment=0;
        this.paymentData.forEach(r=>{
         if(r.type=='buy'){
         amount=amount+r.amount;
     }
     else if(r.type=='payment'){
         payment=payment+r.amount;
     }
     
     })
        return [amount,payment,amount-payment];
      }
  whatsapp() {
    this.router.navigate(['Whatsapp']);
    this.loginV = true;
  }

  whysapp() {
    this.router.navigate(['WhysApp']);
    this.loginV = true;
  }
  reverseMe() {
    this.hehe = this.hehe.split('').reverse().join('');
  }

  incomingFile(file) {

    this.selectedFile = file.target.files[0]
    if (file) {
      this.fileFormData.append('image', file.target.files[0]);

    }
  }






  getMorse(data) {
    this.morseIS = this.handleF.normalMorseCode(data);
  }

  clueCall() {
    this.clue = true;
  }
  getValueofI(a) {
    let I = 16;
    for (let i = 0; i < a.length; i) {
      let x = parseInt(a[i]);
      let l = parseInt(a[i + 1]);
      let X = parseInt(a.slice(i + 2, i + 2 + l));
      I = I + ((6 * X) * (x + 2))
      i = i + l + 2
    }
    return I;
  }
download(){
    var doc = new jsPDF()
    doc.setFontSize('30');
    doc.setFontType('bold');
    doc.setTextColor(224,0,0);
    doc.text('Nitin Roadways And Cargo Movers',15, 25)

    doc.setFontSize('16');
    doc.setFontType('bold');
    doc.setFontType('italic');
    doc.setTextColor(0, 0, 0);
    // doc.text('(TRANSPORT CONTRACTOR & COMMISSION AGENT)', 30, 35)

    doc.setDrawColor(163,0,0);
    doc.setLineWidth(0.5);
    doc.line(15, 33, 195, 33);

    doc.setFontSize('15');
    doc.setFontType('bold');
    doc.setTextColor(224,0,0);
    doc.text('DAILY SERVICE TAMILNADU, KERALA, KARNATAKA & PONDICHERY', 15, 38)

    doc.setDrawColor(163,0,0);
    doc.setLineWidth(0.5);
    doc.line(15, 39, 195, 39);

    doc.setFontType('normal');
    doc.setFontSize('15');
    doc.setTextColor(0, 0, 0);
    doc.text('Cell :- 9822288257, 8459729293, 9423580221, 9766707061', 25, 51)
    doc.setFontSize('12');
    doc.text('Email : punenitinroadways@gmail.com    Website : www.nitinroadways.in', 25, 58)


    doc.setFontType('italic');
    doc.setFontSize('14');
    doc.setTextColor(0, 0, 0);
    doc.text('Shop No 253, Opp. Katraj Police Station, Satara Road, Katraj, Pune- 411046', 25, 65)

    doc.setDrawColor(224,0,0);
    doc.setLineWidth(0.8);
    doc.line(15, 67, 195, 67);

    doc.setDrawColor(224,0,0);
    doc.setLineWidth(0.2);
    doc.line(15, 68, 195, 68);

    doc.setFontSize('12');
    doc.setFontType('normal');
    doc.setTextColor(0, 0, 0);

    doc.setFontType('bold');
    doc.setDrawColor(0,0,0);
    doc.text('Bill No. : ',25,79)
    doc.text('Date : ',150,79)

    doc.line(15, 85, 195, 85);
    doc.line(15, 85, 15, 290);
    doc.line(195, 85, 195, 290);
    doc.line(15, 290, 195, 290);

    doc.text("Owner's Name : ",18,95);
    doc.text("Contact : ",120,95);

   
    doc.save('test.pdf')
  }

  ngOnInit() {
    setInterval(() => {
      this.now = new Date();
      if (this.now.getSeconds() % 10 === 0) {
        this.changed = true;
      } else {
        this.changed = false;
      }
    }, 1000);
    // this.download();
    }
 
}

