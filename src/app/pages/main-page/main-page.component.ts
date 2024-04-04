import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { handleFunction } from '../../common/services/functions/handleFunctions';
import { Consts } from '../../common/constants/const';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [ApiCallsService]
})
export class MainPageComponent implements OnInit {
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
  public selectedDate = '2024-01-06'
  public pochDate= '2024-01-17';
  public selectedFile = null;
  public imageFolder = ''
  public panCardFile: any;
  public panCardString: string;
  public finalJson = {};
  public pythonVar = '';
  public document = new jsPDF();
  public balanceDate=[
    {
        "_id": "65e480264455c3275783a0c1",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "Others",
        "loadingDate": "2024-02-29",
        "ownerid": "64a27f6e182b3e28cd0ae338",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nr_2410",
        "account": [
            {
                "accountName": "S Vijay Kumar",
                "accountNumber": "33787675600",
                "bankName": "SBIN",
                "ifsc": "SBIN0003378",
                "acc12": false,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Coimbatore",
        "truckno": "KA51 AG 9600",
        "party": "Mukund Roadlines",
        "contact": [],
        "pvt": "Mukund Roadlines-Coimbatore-Others"
    },
    {
        "_id": "65e481944455c3275783a0fb",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "Others",
        "loadingDate": "2024-02-29",
        "ownerid": "5caaf7cb0c95f710b846c0fa",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nr_2411",
        "account": [
            {
                "accountName": "M Murulidharan",
                "accountNumber": "663053000002302",
                "bankName": "SIBL",
                "ifsc": "SIBL0000663",
                "acc12": true,
                "acc363": true,
                "acc65": true
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Coimbatore",
        "truckno": "TN66 W 1839",
        "party": "Mukund Roadlines",
        "contact": [
            "9655633822",
            9443655061
        ],
        "pvt": "Mukund Roadlines-Coimbatore-Others"
    },
    {
        "_id": "65e481944455c3275783a0fc",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "Pipe",
        "loadingDate": "2024-02-29",
        "ownerid": "6588fe7e09a75f5868d9dcfe",
        "lrno": 13191,
        "rent": 40000,
        "billamt": 0,
        "billno": "nrcm_6297",
        "account": [
            {
                "accountName": "Babu H Jadhav",
                "accountNumber": "31680693339",
                "bankName": "SBIN",
                "ifsc": "SBIN0008783"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Salem",
        "truckno": "MH12 VT 5484",
        "party": "TUbes and Pipes_Salem",
        "contact": [],
        "pvt": "TUbes and Pipes_Salem-Salem-Pipe"
    },
    {
        "_id": "65e481944455c3275783a0fe",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "Pipe",
        "loadingDate": "2024-02-29",
        "ownerid": "65e481944455c3275783a0fd",
        "lrno": 13189,
        "rent": 40000,
        "billamt": 0,
        "billno": "nrcm_6298",
        "account": [
            {
                "accountName": "Patel Tpt",
                "accountNumber": "3847",
                "bankName": "KKBK",
                "ifsc": "KKBK"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Salem",
        "truckno": "MH12 SX 9290",
        "party": "TUbes and Pipes_Salem",
        "contact": [],
        "pvt": "TUbes and Pipes_Salem-Salem-Pipe"
    },
    {
        "_id": "65e481944455c3275783a101",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "Pipe",
        "loadingDate": "2024-02-29",
        "ownerid": "649e6c7dae159a646ad9fb94",
        "lrno": 13190,
        "rent": 42000,
        "billamt": 1500,
        "billno": "nrcm_6299",
        "account": [
            {
                "accountName": "Senthil Transport Service",
                "accountNumber": "246150050800448",
                "bankName": "TMBL",
                "ifsc": "TMBL0000246",
                "acc12": false,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Namakkal",
        "truckno": "TN24 AY 7130",
        "party": "TUbes and Pipes_Salem",
        "contact": [
            "6369187339"
        ],
        "pvt": "TUbes and Pipes_Salem-Namakkal-Pipe"
    },
    {
        "_id": "65e481944455c3275783a105",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "Others",
        "loadingDate": "2024-02-29",
        "ownerid": "5ffb02e636d1ac0ed412daf6",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nr_2412",
        "account": [
            {
                "accountName": "M Murulidharan",
                "accountNumber": "663053000002302",
                "bankName": "SIBL",
                "ifsc": "SIBL0000663",
                "acc12": true,
                "acc363": true,
                "acc65": true
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Coimbatore",
        "truckno": "TN66 W 8231",
        "party": "Mukund Roadlines",
        "contact": [
            "8428865935"
        ],
        "pvt": "Mukund Roadlines-Coimbatore-Others"
    },
    {
        "_id": "65e4822d4455c3275783a119",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "Pipe",
        "loadingDate": "2024-02-29",
        "ownerid": "65d6d15e735cba1292730a0d",
        "lrno": 13187,
        "rent": 43000,
        "billamt": 0,
        "billno": "nrcm_6294",
        "account": [
            {
                "accountName": "Nityanand Transport",
                "accountNumber": "2614",
                "bankName": "BCBM",
                "ifsc": "BCBM"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Chennai",
        "truckno": "MH09 FL 7188",
        "party": "Shri Vijay Pipe Corporation",
        "contact": [],
        "pvt": "Shri Vijay Pipe Corporation-Chennai-Pipe"
    },
    {
        "_id": "65deba5d7e5be2f04ab76548",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-01",
        "ownerid": "65ae3ed1b117f753d6140391",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6293",
        "account": [
            {
                "accountName": "Sridhar S",
                "accountNumber": "99980119908007",
                "bankName": "FDRL",
                "ifsc": "FDRL0001610"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Chennai",
        "truckno": "TN21 BS 8596",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Chennai-"
    },
    {
        "_id": "65e47f0e4455c3275783a078",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-01",
        "ownerid": "658cf931554646eabb383083",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6307",
        "account": [
            {
                "accountName": "M Vasanth Kumar",
                "accountNumber": "820220110000640",
                "bankName": "BKID",
                "ifsc": "BKID0008202"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Villupuram",
        "truckno": "TN39 CD 8003",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Villupuram-"
    },
    {
        "_id": "65e47f0e4455c3275783a079",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "Others",
        "loadingDate": "2024-03-01",
        "ownerid": "62b8858529cbda466b3cb376",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nr_2413",
        "account": [
            {
                "accountName": "Sripalani Murugan Tpt",
                "accountNumber": "1218135000001385",
                "bankName": "KVBL",
                "ifsc": "KVBL0001218",
                "acc12": true,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Chennai",
        "truckno": "TN47 AM 5905",
        "party": "Tirupathi",
        "contact": [],
        "pvt": "Tirupathi-Chennai-Others"
    },
    {
        "_id": "65e47f0e4455c3275783a082",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-01",
        "ownerid": "65c5b9f2726fd33926265503",
        "lrno": 13267,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6308",
        "account": [
            {
                "accountName": "M Subramani",
                "accountNumber": "455727834",
                "bankName": "IDIB",
                "ifsc": "IDIB000T018"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Chennai",
        "truckno": "TN12 BB 3169",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Chennai-"
    },
    {
        "_id": "65e47f0e4455c3275783a084",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-01",
        "ownerid": "65e47f0e4455c3275783a083",
        "lrno": 13266,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6295",
        "account": [
            {
                "accountName": "M Subramani",
                "accountNumber": "455727834",
                "bankName": "IDIB",
                "ifsc": "IDIB000T018"
            }
        ],
        "update": false,
        "pan": "red",
        "v1": "Tiruvanamalai",
        "truckno": "TN12 AY 2578",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Tiruvanamalai-"
    },
    {
        "_id": "65e481944455c3275783a0f9",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-01",
        "ownerid": "604d87ce041fc8fc37605074",
        "lrno": 13192,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6296",
        "account": [
            {
                "accountName": "K Nalla Sivam",
                "accountNumber": "1619155000056710",
                "bankName": "KVBL",
                "ifsc": "KVBL0001619",
                "acc12": true,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Thanjavur",
        "truckno": "TN86 E 1459",
        "party": "NRCM",
        "contact": [
            "9994204743"
        ],
        "pvt": "NRCM-Thanjavur-"
    },
    {
        "_id": "65e481944455c3275783a100",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-01",
        "ownerid": "65e481944455c3275783a0ff",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6309",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24303135636418330,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Coimbatore",
        "truckno": "TN34 AZ 6397",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Coimbatore-"
    },
    {
        "_id": "65e481944455c3275783a102",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-01",
        "ownerid": "6524c95561ddbed00216ac86",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6300",
        "account": [
            {
                "accountName": "Sarvanan D",
                "accountNumber": "026001001551947",
                "bankName": "KVBL",
                "ifsc": "KVBL",
                "acc12": false,
                "acc65": false,
                "acc363": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Tiruvarur",
        "truckno": "TN55 CT 3074",
        "party": "NRCM",
        "contact": [
            6385457242,
            9361896730
        ],
        "pvt": "NRCM-Tiruvarur-"
    },
    {
        "_id": "65e481944455c3275783a103",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-01",
        "ownerid": "6540a06f10c135d20751db2f",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6301",
        "account": [
            {
                "accountName": "Tirumala Roadways",
                "accountNumber": "1635135000006742",
                "bankName": "KVBL",
                "ifsc": "KVBL0001635",
                "acc12": false,
                "acc65": false,
                "acc363": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Manargudi",
        "truckno": "TN45 CC 8886",
        "party": "NRCM",
        "contact": [
            8508464135
        ],
        "pvt": "NRCM-Manargudi-"
    },
    {
        "_id": "65e481944455c3275783a104",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-01",
        "ownerid": "659e27b8f99746d7674dba56",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6302",
        "account": [
            {
                "accountName": "Savariyammal R",
                "accountNumber": "573192959",
                "bankName": "IDIB",
                "ifsc": "IDIB000A097"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Thanjavur-Pudukottai",
        "truckno": "TN61 Y 9086",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Thanjavur-Pudukottai-"
    },
    {
        "_id": "65e57460df6aa316da214502",
        "qrDate": "2024-03-04",
        "contacttb": [],
        "currentVehicleStatusforLoading": [
            "Entered Company Gate_purple"
        ],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "Fittings",
        "loadingDate": "2024-03-01",
        "ownerid": "65e57460df6aa316da214501",
        "lrno": "nrcm_6304",
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6304",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24304071232947400,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Tiruvanamalai",
        "truckno": "NL02 AA 0302",
        "party": "Sri Ram Traders",
        "contact": [],
        "pvt": "Sri Ram Traders-Tiruvanamalai-Fittings"
    },
    {
        "_id": "65eae6d1aaa80bc8cec7eec2",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-01",
        "ownerid": "644358f17ab18c281ef7d77f",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6310",
        "account": [
            {
                "accountName": "S Vijay Kumar",
                "accountNumber": "33787675600",
                "bankName": "SBIN",
                "ifsc": "SBIN0011543",
                "acc12": false,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Coimbatore-Tirupur",
        "truckno": "KA07 B 5407",
        "party": "NRCM",
        "contact": [
            9841305557
        ],
        "pvt": "NRCM-Coimbatore-Tirupur-"
    },
    {
        "_id": "65eae6d1aaa80bc8cec7eec3",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-01",
        "ownerid": "5ccea6820e84c628389f4813",
        "lrno": 13195,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6311",
        "account": [
            {
                "accountName": "G Elmalai",
                "accountNumber": "269501000000135",
                "bankName": "IOBA",
                "ifsc": "IOBA0002695",
                "acc12": true,
                "acc363": true,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Kumbhakonam",
        "truckno": "TN32 AQ 0392",
        "party": "NRCM",
        "contact": [
            "9843987583"
        ],
        "pvt": "NRCM-Kumbhakonam-"
    },
    {
        "_id": "65e481944455c3275783a0fa",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-02",
        "ownerid": "65b4a95df407c0e5267bd389",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6312",
        "account": [
            {
                "accountName": "Sivakumar G",
                "accountNumber": "500101010703347",
                "bankName": "CIUB",
                "ifsc": "CIUB0000637"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Chennai",
        "truckno": "TN18 BL 5128",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Chennai-"
    },
    {
        "_id": "65eae6d1aaa80bc8cec7eebc",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-02",
        "ownerid": "65eae6d1aaa80bc8cec7eebb",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6314",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24308102209533100,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Chennai",
        "truckno": "TN73 AE 6972",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Chennai-"
    },
    {
        "_id": "65eae6d1aaa80bc8cec7eebd",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-02",
        "ownerid": "62318d21e3d391695698ddd9",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6321",
        "account": [
            {
                "accountName": "Mahadevan V",
                "accountNumber": "20950100000308",
                "bankName": "FDRL",
                "ifsc": "FDRL0002095",
                "acc12": true,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Thanjavur",
        "truckno": "TN59 BJ 5786",
        "party": "NRCM",
        "contact": [
            "8760737720"
        ],
        "pvt": "NRCM-Thanjavur-"
    },
    {
        "_id": "65eae6d1aaa80bc8cec7eec1",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-02",
        "ownerid": "65eae6d1aaa80bc8cec7eec0",
        "lrno": 13356,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6323",
        "account": [
            {
                "accountName": "Check",
                "accountNumber": "1234",
                "bankName": "CHEC",
                "ifsc": "CHECk"
            }
        ],
        "update": false,
        "pan": "red",
        "v1": "Panruti",
        "truckno": "TN32 BE 8343",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Panruti-"
    },
    {
        "_id": "65eae6d1aaa80bc8cec7eec4",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-02",
        "ownerid": "64588d5f0f8cda3786127749",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6315",
        "account": [
            {
                "accountName": "M Murugesh Pandi",
                "accountNumber": "11500200330500",
                "bankName": "FDRL",
                "ifsc": "FDRL0001150",
                "acc12": true,
                "acc363": true,
                "acc65": true
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Palayamkottai",
        "truckno": "TN58 BZ 5638",
        "party": "NRCM",
        "contact": [
            6374950350
        ],
        "pvt": "NRCM-Palayamkottai-"
    },
    {
        "_id": "65eae6d1aaa80bc8cec7eec5",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-02",
        "ownerid": "658e80790d51c0c0d4f4f138",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6316",
        "account": [
            {
                "accountName": "Sathish Kumar A",
                "accountNumber": "912010026685622",
                "bankName": "UTIB",
                "ifsc": "UTIB0001577"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Kallakuruchi",
        "truckno": "TN34 AZ 7750",
        "party": "NRCM",
        "contact": [
            9994977992
        ],
        "pvt": "NRCM-Kallakuruchi-"
    },
    {
        "_id": "65eae6d2aaa80bc8cec7eec6",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-02",
        "ownerid": "65ae443d1cc768175c7d8a67",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6317",
        "account": [
            {
                "accountName": "A Sathish Kumar",
                "accountNumber": "912010026685622",
                "bankName": "UTIB",
                "ifsc": "UTIB0001577"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Chennai",
        "truckno": "TN34 AY 1425",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Chennai-"
    },
    {
        "_id": "65eae6d2aaa80bc8cec7eec7",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-02",
        "ownerid": "615dad3e22459e2a9d4ee1fd",
        "lrno": 13351,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6318",
        "account": [
            {
                "accountName": "Gajendiran",
                "accountNumber": "1208155000220262",
                "bankName": "KVBL",
                "ifsc": "KVBL0001208",
                "acc12": true,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Kumbhakonam",
        "truckno": "TN32 BA 9529",
        "party": "NRCM",
        "contact": [
            "9791642577",
            7538875706
        ],
        "pvt": "NRCM-Kumbhakonam-"
    },
    {
        "_id": "65eaf10d6490d682d40b8a68",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-02",
        "ownerid": "5caa15224094201d34f120b4",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6319",
        "account": [
            {
                "accountName": "Natarajan V",
                "accountNumber": "50100242907481",
                "bankName": "Hdfc",
                "ifsc": "HDFC0001006",
                "acc12": true,
                "acc363": true,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Manargudi",
        "truckno": "TN29 BR 1170",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Manargudi-"
    },
    {
        "_id": "65eaf10d6490d682d40b8a69",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-02",
        "ownerid": "63f99ac78b393e8ecc439ed0",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6320",
        "account": [
            {
                "accountName": "Nagendra Urabinatti",
                "accountNumber": "10105762751",
                "bankName": "IDFB",
                "ifsc": "IDFB0080253",
                "acc12": false,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Mayavaram",
        "truckno": "KA22 AA 0481",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Mayavaram-"
    },
    {
        "_id": "65eaf10d6490d682d40b8a6b",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-02",
        "ownerid": "65eaf10d6490d682d40b8a6a",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6322",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24308110549596560,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Hyderabad",
        "truckno": "MH25 AJ 1486",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Hyderabad-"
    },
    {
        "_id": "65eaf10d6490d682d40b8a6d",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-02",
        "ownerid": "65eaf10d6490d682d40b8a6c",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6324",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24308110549676588,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Coimbatore",
        "truckno": "KA04 AC 4955",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Coimbatore-"
    },
    {
        "_id": "65eaf10d6490d682d40b8a6e",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-02",
        "ownerid": "632c2cd035fbf8cfa0947082",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6325",
        "account": [
            {
                "accountName": "Swapnil D Chougule",
                "accountNumber": "50100460428173",
                "bankName": "HDFC",
                "ifsc": "HDFC0003455",
                "acc12": false,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Kumbhakonam",
        "truckno": "MH14 HG 4667",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Kumbhakonam-"
    },
    {
        "_id": "65eaf10d6490d682d40b8a6f",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-02",
        "ownerid": "65cf55bf581e31a9b13f612e",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6326",
        "account": [
            {
                "accountName": "Sivaguru V",
                "accountNumber": "26596",
                "bankName": "XXXX",
                "ifsc": "XXXX"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Kumbhakonam",
        "truckno": "TN36 BW 8409",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Kumbhakonam-"
    },
    {
        "_id": "65eaf10d6490d682d40b8a72",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "Others",
        "loadingDate": "2024-03-02",
        "ownerid": "65eaf10d6490d682d40b8a71",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nr_2414",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24308110549896580,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Coimbatore",
        "truckno": "TN56 K 7727",
        "party": "Mukund Roadlines",
        "contact": [],
        "pvt": "Mukund Roadlines-Coimbatore-Others"
    },
    {
        "_id": "65ed30d2f71b3b84cfdbee07",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-03",
        "ownerid": "65eaf10d6490d682d40b8a6a",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6327",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24308110549596560,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Hyderabad",
        "truckno": "MH25 AJ 1486",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Hyderabad-"
    },
    {
        "_id": "65ed30d2f71b3b84cfdbee09",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-03",
        "ownerid": "65ed30d2f71b3b84cfdbee08",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6328",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24310040226656176,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Kumbhakonam",
        "truckno": "MH13 CU 1644",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Kumbhakonam-"
    },
    {
        "_id": "65ed30d2f71b3b84cfdbee0b",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-03",
        "ownerid": "65ed30d2f71b3b84cfdbee0a",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6329",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24310040226718176,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Kumbhakonam",
        "truckno": "MH45 AF 3199",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Kumbhakonam-"
    },
    {
        "_id": "65ed30d2f71b3b84cfdbee0c",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-03",
        "ownerid": "65db27549d1521359854f68c",
        "lrno": 13360,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6330",
        "account": [
            {
                "accountName": "Sona V Sathe",
                "accountNumber": "3213672354",
                "bankName": "KKBK",
                "ifsc": "KKBK0001807"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Trichy",
        "truckno": "MH12 HD 3790",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Trichy-"
    },
    {
        "_id": "65ed30d2f71b3b84cfdbee0e",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-03",
        "ownerid": "65ed30d2f71b3b84cfdbee0d",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6331",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24310040226857376,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Thanjavur",
        "truckno": "KA22 D 2551",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Thanjavur-"
    },
    {
        "_id": "65ed30d2f71b3b84cfdbee11",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "Others",
        "loadingDate": "2024-03-04",
        "ownerid": "65ed30d2f71b3b84cfdbee10",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nr_2415",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24310040226961076,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Chennai",
        "truckno": "TN48 BT 3871",
        "party": "Pandian",
        "contact": [],
        "pvt": "Pandian-Chennai-Others"
    },
    {
        "_id": "65ed30d3f71b3b84cfdbee13",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-04",
        "ownerid": "65ed30d3f71b3b84cfdbee12",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6332",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24310040227036224,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Villupuram-Virudachalam",
        "truckno": "TN16 H 7705",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Villupuram-Virudachalam-"
    },
    {
        "_id": "65ed317cf71b3b84cfdbee2d",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-04",
        "ownerid": "64588f040f8cda3786127778",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6333",
        "account": [
            {
                "accountName": "Gajendiran",
                "accountNumber": "1208155000220262",
                "bankName": "KVBL",
                "ifsc": "KVBL0001208",
                "acc12": false,
                "acc363": false,
                "acc65": false,
                "delete": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Panruti",
        "truckno": "TN25 CA 2722",
        "party": "NRCM",
        "contact": [
            9791642577
        ],
        "pvt": "NRCM-Panruti-"
    },
    {
        "_id": "65ed317cf71b3b84cfdbee2e",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-04",
        "ownerid": "65afa07325bd1dfa9161c3c5",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6334",
        "account": [
            {
                "accountName": "Sri Thimmarayasamy",
                "accountNumber": "015605014879",
                "bankName": "ICIC",
                "ifsc": "ICIC0000156"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Panruti",
        "truckno": "TN70 AJ 2522",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Panruti-"
    },
    {
        "_id": "65ed317cf71b3b84cfdbee2f",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-04",
        "ownerid": "65afb125a5f33d8704b69cb3",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6335",
        "account": [
            {
                "accountName": "Sri Thimmarayasamy",
                "accountNumber": "015605014879",
                "bankName": "ICIC",
                "ifsc": "ICIC0000156"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Panruti",
        "truckno": "TN70 AK 1643",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Panruti-"
    },
    {
        "_id": "65ed317cf71b3b84cfdbee31",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-04",
        "ownerid": "5b15f8e25fe9b8da111a5729",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6336",
        "account": [
            {
                "accountName": "M Murugesh Pandi\t",
                "accountNumber": "11500200330500",
                "bankName": "FDRL",
                "ifsc": "FDRL0001150",
                "acc12": true,
                "acc363": true,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Palayamkottai",
        "truckno": "TN64 H 2272",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Palayamkottai-"
    },
    {
        "_id": "65ed317df71b3b84cfdbee33",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-04",
        "ownerid": "65ed317df71b3b84cfdbee32",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6337",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24310040517016240,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Vellore",
        "truckno": "MH25 AJ 4960",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Vellore-"
    },
    {
        "_id": "65ed317df71b3b84cfdbee35",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-04",
        "ownerid": "6577db11f1a93afc71035339",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6338",
        "account": [
            {
                "accountName": "Kabilraj S",
                "accountNumber": "0458301000027674",
                "bankName": "DBSS",
                "ifsc": "DBSS01N0458"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Trichy-Karur",
        "truckno": "TN59 BU 5083",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Trichy-Karur-"
    },
    {
        "_id": "65ed317df71b3b84cfdbee37",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-04",
        "ownerid": "65ed317df71b3b84cfdbee36",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6339",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24310040517196250,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Chennai",
        "truckno": "MH42 AQ 8354",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Chennai-"
    },
    {
        "_id": "65e849d57ef770d5d92105f7",
        "qrDate": "2024-03-06",
        "contacttb": [],
        "currentVehicleStatusforLoading": [
            "Entered Company Gate_purple"
        ],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "Fittings",
        "loadingDate": "2024-03-05",
        "ownerid": "65e849d57ef770d5d92105f6",
        "lrno": "nrcm_6305",
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6305",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24306104749407484,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Chennai",
        "truckno": "TN23 DY 0046",
        "party": "Shri Vijay Pipe Corporation",
        "contact": [],
        "pvt": "Shri Vijay Pipe Corporation-Chennai-Fittings"
    },
    {
        "_id": "65eaf10d6490d682d40b8a70",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-05",
        "ownerid": "6580193ca460367a6e518170",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6340",
        "account": [
            {
                "accountName": "MURUGAN P",
                "accountNumber": "194001000001014",
                "bankName": "IOBA",
                "ifsc": "IOBA0001940"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Chennai",
        "truckno": "TN87 E 4861",
        "party": "NRCM",
        "contact": [
            7373432853
        ],
        "pvt": "NRCM-Chennai-"
    },
    {
        "_id": "65eaf10d6490d682d40b8a73",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "Others",
        "loadingDate": "2024-03-05",
        "ownerid": "63a936b85f4ec97f27dd221c",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nr_2416",
        "account": [
            {
                "accountName": "K Sekaran",
                "accountNumber": "1152155000104394",
                "bankName": "KVBL",
                "ifsc": "KVBL",
                "acc12": false,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Coimbatore",
        "truckno": "TN47 BB 3646",
        "party": "Mukund Roadlines",
        "contact": [
            "9025751528",
            "9342265468",
            "9843746098"
        ],
        "pvt": "Mukund Roadlines-Coimbatore-Others"
    },
    {
        "_id": "65ed317cf71b3b84cfdbee2c",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-05",
        "ownerid": "5f1452b50ff548df17d45b89",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6341",
        "account": [
            {
                "accountName": "G Almel",
                "accountNumber": "79101000007947",
                "bankName": "IOBA",
                "ifsc": "IOBA0000791",
                "acc12": true,
                "acc363": true,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Pondicherry",
        "truckno": "TN31 CA 5142",
        "party": "NRCM",
        "contact": [
            "7708675135",
            7708675135
        ],
        "pvt": "NRCM-Pondicherry-"
    },
    {
        "_id": "65ed317df71b3b84cfdbee34",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-05",
        "ownerid": "65db296a9d1521359854f6f6",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6342",
        "account": [
            {
                "accountName": "Bhagyalaxmi",
                "accountNumber": "170901000013393",
                "bankName": "IOBA",
                "ifsc": "IOBA0001709"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Coimbatore-Patripatti",
        "truckno": "TN66 AL 7881",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Coimbatore-Patripatti-"
    },
    {
        "_id": "65ed317df71b3b84cfdbee38",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "Others",
        "loadingDate": "2024-03-05",
        "ownerid": "62615bb0d6e5fd008fcd3040",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "snl_117",
        "account": [
            {
                "accountName": "J Selvam",
                "accountNumber": "1259153000005515",
                "bankName": "KVBL",
                "ifsc": "KVBL0001259",
                "acc12": false,
                "acc65": false,
                "acc363": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Pune",
        "truckno": "TN47 BA 7466",
        "party": "Harsh Roadlines",
        "contact": [
            "8825957771"
        ],
        "pvt": "Harsh Roadlines-Pune-Others"
    },
    {
        "_id": "65ed4fad92da24a1d53254a9",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-05",
        "ownerid": "65ae48296c56eae81999588d",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6343",
        "account": [
            {
                "accountName": "Sneha S",
                "accountNumber": "00293211004790",
                "bankName": "UCBA",
                "ifsc": "UCBA0000029"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Theni",
        "truckno": "TN58 BL 0831",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Theni-"
    },
    {
        "_id": "65ed4fad92da24a1d53254aa",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-05",
        "ownerid": "5d7e05562da4c269f2318b10",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6344",
        "account": [
            {
                "accountName": "M Murugesh Pandi",
                "accountNumber": "11500200330500",
                "bankName": "FDRL",
                "ifsc": "FDRL0001150",
                "acc12": true,
                "acc363": true,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Palayamkottai",
        "truckno": "TN64 T 6060",
        "party": "NRCM",
        "contact": [
            9626258163
        ],
        "pvt": "NRCM-Palayamkottai-"
    },
    {
        "_id": "65ed4fad92da24a1d53254ac",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-05",
        "ownerid": "65ed4fad92da24a1d53254ab",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6345",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24310061405230424,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Chennai",
        "truckno": "MH25 AJ 7365",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Chennai-"
    },
    {
        "_id": "65ed4fad92da24a1d53254af",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-05",
        "ownerid": "65ed4fad92da24a1d53254ae",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6346",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24310061405329310,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Trichy-Dharapuram",
        "truckno": "TN37 CD 4413",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Trichy-Dharapuram-"
    },
    {
        "_id": "65ed4fad92da24a1d53254b9",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-05",
        "ownerid": "6568524343b5c4f73755311a",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6347",
        "account": [
            {
                "accountName": "Patel Transport",
                "accountNumber": "5511173847",
                "bankName": "KKBK",
                "ifsc": "KKBK"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Chennai",
        "truckno": "MH14 KQ 9231",
        "party": "NRCM",
        "contact": [
            7499259671
        ],
        "pvt": "NRCM-Chennai-"
    },
    {
        "_id": "65ed4fad92da24a1d53254ba",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-05",
        "ownerid": "65e849d57ef770d5d92105f6",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6348",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24306104749407484,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Chennai",
        "truckno": "TN23 DY 0046",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Chennai-"
    },
    {
        "_id": "65ed4fad92da24a1d53254bb",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-05",
        "ownerid": "65c46f32de9e6549f4d608d6",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6349",
        "account": [
            {
                "accountName": "Sri Thimmarayasamy",
                "accountNumber": "015605014879",
                "bankName": "ICIC",
                "ifsc": "ICIC0000156"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Trichy-Karur",
        "truckno": "TN70 AH 7131",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Trichy-Karur-"
    },
    {
        "_id": "65ed30d2f71b3b84cfdbee0f",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-06",
        "ownerid": "654d1b585a698aa885a52592",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6350",
        "account": [
            {
                "accountName": "Karupasamy",
                "accountNumber": "410505001357",
                "bankName": "Chec",
                "ifsc": "Check",
                "acc12": false,
                "acc65": false,
                "acc363": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Erode-Perambalur",
        "truckno": "TN58 AS 6279",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Erode-Perambalur-"
    },
    {
        "_id": "65ed317df71b3b84cfdbee39",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-06",
        "ownerid": "64da16d35bb378ccaf70bf81",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6352",
        "account": [
            {
                "accountName": "Selvakumar M",
                "accountNumber": "00000037095757603",
                "bankName": "SBIN",
                "ifsc": "SBIN0070972",
                "acc12": false,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Namakkal",
        "truckno": "TN49 CK 5140",
        "party": "NRCM",
        "contact": [
            9994318422
        ],
        "pvt": "NRCM-Namakkal-"
    },
    {
        "_id": "65ed317df71b3b84cfdbee3a",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-06",
        "ownerid": "649e65787b2192a79dc5283c",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6351",
        "account": [
            {
                "accountName": "Dhanalakshmi S",
                "accountNumber": "1646155000131184",
                "bankName": "KVBL",
                "ifsc": "KVBL0001646",
                "acc12": false,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Madurai",
        "truckno": "TN48 BW 9310",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Madurai-"
    },
    {
        "_id": "65ed317df71b3b84cfdbee3c",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-06",
        "ownerid": "65ed317df71b3b84cfdbee3b",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6353",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24310040517416264,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Chennai",
        "truckno": "TN49 BT 6834",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Chennai-"
    },
    {
        "_id": "65ed4fad92da24a1d53254b1",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-06",
        "ownerid": "65ed4fad92da24a1d53254b0",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6354",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24310061405389280,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Coimbatore",
        "truckno": "TN97 U 0563",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Coimbatore-"
    },
    {
        "_id": "65ed4fad92da24a1d53254b5",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-06",
        "ownerid": "63edc508ea77f9f7d01a48fe",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6355",
        "account": [
            {
                "accountName": "AlbertSarma S",
                "accountNumber": "34280511863",
                "bankName": "SBIN",
                "ifsc": "SBIN0006720",
                "acc12": false,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Chennai",
        "truckno": "TN15 E 6225",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Chennai-"
    },
    {
        "_id": "65ed4fad92da24a1d53254bf",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-06",
        "ownerid": "65ed4fad92da24a1d53254be",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6356",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24310061405949264,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Krishnagiri",
        "truckno": "TN73 AH 9878",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Krishnagiri-"
    },
    {
        "_id": "65ed4fae92da24a1d53254c8",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-06",
        "ownerid": "638dcc12d3300705ac08cdb9",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6357",
        "account": [
            {
                "accountName": "Sivaguru V",
                "accountNumber": "1748155000026596",
                "bankName": "KVBL",
                "ifsc": "KVBL0001748",
                "acc12": false,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Erode",
        "truckno": "TN63 BM 7657",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Erode-"
    },
    {
        "_id": "65ed50d592da24a1d53254fc",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-06",
        "ownerid": "65ed50d592da24a1d53254fb",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6358",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24310061901107950,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Chennai",
        "truckno": "TN34 MB 2570",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Chennai-"
    },
    {
        "_id": "65ed317cf71b3b84cfdbee30",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-07",
        "ownerid": "658c1aa71b4a712d81f252bd",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6359",
        "account": [
            {
                "accountName": "R Kamaldoss",
                "accountNumber": "50200040079914",
                "bankName": "HDFC",
                "ifsc": "HDFC0000390"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Vellore",
        "truckno": "TN87 E 4881",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Vellore-"
    },
    {
        "_id": "65ed4fad92da24a1d53254ad",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-07",
        "ownerid": "658ef4ae7fd90802448b9b0a",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6360",
        "account": [
            {
                "accountName": "A Sathish Kumar",
                "accountNumber": "912010026685622",
                "bankName": "Axis Bank",
                "ifsc": "UTIB0001577"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Pollachi",
        "truckno": "TN37 CF 3613",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Pollachi-"
    },
    {
        "_id": "65ed4fad92da24a1d53254b3",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-07",
        "ownerid": "65ed4fad92da24a1d53254b2",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6361",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24310061405449330,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Vellore",
        "truckno": "TN58 BJ 8218",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Vellore-"
    },
    {
        "_id": "65ed4fad92da24a1d53254b4",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-07",
        "ownerid": "6524cbce61ddbed00216acbd",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6363",
        "account": [
            {
                "accountName": "Kaviyarasu",
                "accountNumber": "1640155000080921",
                "bankName": "KVBL",
                "ifsc": "KVBL0001640",
                "acc12": false,
                "acc65": false,
                "acc363": false
            }
        ],
        "update": false,
        "pan": "red",
        "v1": "Coimbatore",
        "truckno": "TN39 CL 4767",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Coimbatore-"
    },
    {
        "_id": "65ed4fad92da24a1d53254b8",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-07",
        "ownerid": "65ed4fad92da24a1d53254b7",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6364",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24310061405649310,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Karaikal",
        "truckno": "TN47 BC 0763",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Karaikal-"
    },
    {
        "_id": "65ed4fad92da24a1d53254bc",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-07",
        "ownerid": "658678ff30812a861d8f2e41",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6365",
        "account": [
            {
                "accountName": "RAJA ",
                "accountNumber": "100038060369",
                "bankName": "ESFB",
                "ifsc": "ESFB0001153"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Trichy-Karur",
        "truckno": "TN83 E 7941",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Trichy-Karur-"
    },
    {
        "_id": "65ed4fad92da24a1d53254bd",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-07",
        "ownerid": "5be6dd7ed7a2dc39745831a1",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6366",
        "account": [
            {
                "accountName": "Sumanraj",
                "accountNumber": "6589064482",
                "bankName": "IDIB",
                "ifsc": "IDIB000T064",
                "acc12": true,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Mayavaram",
        "truckno": "TN15 C 0977",
        "party": "NRCM",
        "contact": [
            9994980051
        ],
        "pvt": "NRCM-Mayavaram-"
    },
    {
        "_id": "65ed4fae92da24a1d53254c1",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-07",
        "ownerid": "64bb75c339d3b5238808a498",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6367",
        "account": [
            {
                "accountName": "V Iyyappan",
                "accountNumber": "941283715",
                "bankName": "IDIB",
                "ifsc": "IDIB000A043",
                "acc12": false,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Tuticoreen",
        "truckno": "TN32 BD 9472",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Tuticoreen-"
    },
    {
        "_id": "65ed4fae92da24a1d53254c2",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-07",
        "ownerid": "6360957fffed0f4aa8f10dc6",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6368",
        "account": [
            {
                "accountName": "Kavitha Selvam",
                "accountNumber": "50210014919041",
                "bankName": "BDBL",
                "ifsc": "BDBL0001894",
                "acc12": false,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Chinnamanur",
        "truckno": "TN54 W 1436",
        "party": "NRCM",
        "contact": [
            9994020596
        ],
        "pvt": "NRCM-Chinnamanur-"
    },
    {
        "_id": "65ed50d492da24a1d53254f8",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-07",
        "ownerid": "65ed50d492da24a1d53254f7",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6369",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24310061900927980,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Thanjavur",
        "truckno": "TN69 BR 4833",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Thanjavur-"
    },
    {
        "_id": "65ed50d492da24a1d53254f9",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-07",
        "ownerid": "64f7172bdcb8fc49438daa40",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6370",
        "account": [
            {
                "accountName": "P Rajasekar",
                "accountNumber": "6308714210",
                "bankName": "IDIB",
                "ifsc": "IDIB000T069",
                "acc12": false,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Manargudi",
        "truckno": "TN25 CD 6705",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Manargudi-"
    },
    {
        "_id": "65ed5c707d39bd05f986f681",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-07",
        "ownerid": "65cc61a8389b7c39cf0872b1",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6362",
        "account": [
            {
                "accountName": "Parshuram J",
                "accountNumber": "159096735809",
                "bankName": "INDB",
                "ifsc": "INDB0001613"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Chennai",
        "truckno": "MH13 DQ 6386",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Chennai-"
    },
    {
        "_id": "65ed5c707d39bd05f986f688",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-07",
        "ownerid": "65ed5c707d39bd05f986f687",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6371",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24310070832384696,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Salem-Coimbatore",
        "truckno": "TN58 BX 3568",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Salem-Coimbatore-"
    },
    {
        "_id": "65ed5c707d39bd05f986f68e",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-07",
        "ownerid": "65ed5c707d39bd05f986f68d",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6372",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24310070832667024,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Chennai",
        "truckno": "MH13 CU 4126",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Chennai-"
    },
    {
        "_id": "65ed4fad92da24a1d53254b6",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "Others",
        "loadingDate": "2024-03-08",
        "ownerid": "61a63515c8f0eddfeb2bb9e1",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nr_2417",
        "account": [
            {
                "accountName": "K Sekaran",
                "accountNumber": "1152155000104394",
                "bankName": "KVBL",
                "ifsc": "KVBL0001152",
                "acc12": true,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Cudallur",
        "truckno": "TN92 C 9093",
        "party": "SFC",
        "contact": [
            "9843746098"
        ],
        "pvt": "SFC-Cudallur-Others"
    },
    {
        "_id": "65ed4fae92da24a1d53254c0",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-08",
        "ownerid": "656ec0ba82466d79d7aebc0c",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6373",
        "account": [
            {
                "accountName": "A Sathish Kumar",
                "accountNumber": "912010026685622",
                "bankName": "Axis Bank",
                "ifsc": "UTIB0001577",
                "acc12": false,
                "acc65": false,
                "acc363": true
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Trichy",
        "truckno": "TN34 AY 0677",
        "party": "NRCM",
        "contact": [
            9597953323
        ],
        "pvt": "NRCM-Trichy-"
    },
    {
        "_id": "65ed4fae92da24a1d53254c3",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-08",
        "ownerid": "64cb4633607db15756a879b5",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6374",
        "account": [
            {
                "accountName": "Yogalakshmi K",
                "accountNumber": "7927000100013806",
                "bankName": "PUNB",
                "ifsc": "PUNB0792700",
                "acc12": false,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Chennai",
        "truckno": "TN11 BD 8303",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Chennai-"
    },
    {
        "_id": "65ed50d492da24a1d53254f6",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-08",
        "ownerid": "65ae4029048b85e86fc9dc95",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6375",
        "account": [
            {
                "accountName": "N2R Groups and Co",
                "accountNumber": "510909010242877",
                "bankName": "CIUB",
                "ifsc": "CIUB0000493"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Trichy",
        "truckno": "TN37 EW 6777",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Trichy-"
    },
    {
        "_id": "65ed50d592da24a1d53254fa",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-08",
        "ownerid": "61ca8ed7dc7cf1ec1b90ac1f",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6376",
        "account": [
            {
                "accountName": "Rajesh",
                "accountNumber": "269501000008639",
                "bankName": "IOBA",
                "ifsc": "IOBA0002695",
                "acc12": true,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Kumbhakonam",
        "truckno": "TN25 BK 5951",
        "party": "NRCM",
        "contact": [
            "6381767712",
            9787097158
        ],
        "pvt": "NRCM-Kumbhakonam-"
    },
    {
        "_id": "65ed50d592da24a1d53254fd",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-08",
        "ownerid": "64f9b2ddb77b088896762ee2",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6377",
        "account": [
            {
                "accountName": "K Thangakarapasamy",
                "accountNumber": "1828155000008550",
                "bankName": "KVBL",
                "ifsc": "KVBL",
                "acc12": false,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Chennai",
        "truckno": "TN58 CZ 4224",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Chennai-"
    },
    {
        "_id": "65ed5c707d39bd05f986f684",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "Others",
        "loadingDate": "2024-03-08",
        "ownerid": "61a0ebc638ee7308b755b0c8",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "snl_118",
        "account": [
            {
                "accountName": "T Ganesh Pandian",
                "accountNumber": "1626155000006964",
                "bankName": "KVBL",
                "ifsc": "KVBL0001626",
                "acc12": false,
                "acc65": false,
                "acc363": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Pune",
        "truckno": "TN64 R 8722",
        "party": "Harsh Roadlines",
        "contact": [
            7094171412
        ],
        "pvt": "Harsh Roadlines-Pune-Others"
    },
    {
        "_id": "65ed5c707d39bd05f986f689",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "Others",
        "loadingDate": "2024-03-08",
        "ownerid": "5ffb02e636d1ac0ed412daf6",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nr_2418",
        "account": [
            {
                "accountName": "M Murulidharan",
                "accountNumber": "663053000002302",
                "bankName": "SIBL",
                "ifsc": "SIBL0000663",
                "acc12": true,
                "acc363": true,
                "acc65": true
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Coimbatore",
        "truckno": "TN66 W 8231",
        "party": "SCC",
        "contact": [
            "8428865935"
        ],
        "pvt": "SCC-Coimbatore-Others"
    },
    {
        "_id": "65ed5c707d39bd05f986f68a",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-08",
        "ownerid": "6013048052447b10784057db",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6378",
        "account": [
            {
                "accountName": "G Sumathi",
                "accountNumber": "50031744974",
                "bankName": "IDIB",
                "ifsc": "IDIB000T017",
                "acc12": true,
                "acc65": false,
                "acc363": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Thanjavur",
        "truckno": "TN48 BB 6026",
        "party": "NRCM",
        "contact": [
            "8884390882",
            8884390882
        ],
        "pvt": "NRCM-Thanjavur-"
    },
    {
        "_id": "65ed5c707d39bd05f986f68b",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-08",
        "ownerid": "5ccea6820e84c628389f4813",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6379",
        "account": [
            {
                "accountName": "G Elmalai",
                "accountNumber": "269501000000135",
                "bankName": "IOBA",
                "ifsc": "IOBA0002695",
                "acc12": true,
                "acc363": true,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Thanjavur",
        "truckno": "TN32 AQ 0392",
        "party": "NRCM",
        "contact": [
            "9843987583"
        ],
        "pvt": "NRCM-Thanjavur-"
    },
    {
        "_id": "65ed5c707d39bd05f986f68c",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-08",
        "ownerid": "615dad3e22459e2a9d4ee1fd",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6380",
        "account": [
            {
                "accountName": "Gajendiran",
                "accountNumber": "1208155000220262",
                "bankName": "KVBL",
                "ifsc": "KVBL0001208",
                "acc12": true,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Thanjavur",
        "truckno": "TN32 BA 9529",
        "party": "NRCM",
        "contact": [
            "9791642577",
            7538875706
        ],
        "pvt": "NRCM-Thanjavur-"
    },
    {
        "_id": "65ed5ee6fc04a7fed2515ac5",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-08",
        "ownerid": "6524c95561ddbed00216ac86",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6381",
        "account": [
            {
                "accountName": "Sarvanan D",
                "accountNumber": "026001001551947",
                "bankName": "KVBL",
                "ifsc": "KVBL",
                "acc12": false,
                "acc65": false,
                "acc363": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Thanjavur",
        "truckno": "TN55 CT 3074",
        "party": "NRCM",
        "contact": [
            6385457242,
            9361896730
        ],
        "pvt": "NRCM-Thanjavur-"
    },
    {
        "_id": "65ed5ee6fc04a7fed2515ac6",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-08",
        "ownerid": "5d29891fd69f252cc86730d1",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6382",
        "account": [
            {
                "accountName": "T Ganesh Pandian",
                "accountNumber": "1626155000006964",
                "bankName": "KVBL",
                "ifsc": "KVBL0001626",
                "acc12": true,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Madurai",
        "truckno": "TN58 BA 5305",
        "party": "NRCM",
        "contact": [
            "",
            "9786460544"
        ],
        "pvt": "NRCM-Madurai-"
    },
    {
        "_id": "65ed5ee6fc04a7fed2515acb",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-08",
        "ownerid": "632c2cd035fbf8cfa0947082",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6383",
        "account": [
            {
                "accountName": "Swapnil D Chougule",
                "accountNumber": "50100460428173",
                "bankName": "HDFC",
                "ifsc": "HDFC0003455",
                "acc12": false,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Chennai",
        "truckno": "MH14 HG 4667",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Chennai-"
    },
    {
        "_id": "65ed5ee6fc04a7fed2515acc",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "Others",
        "loadingDate": "2024-03-08",
        "ownerid": "62396952afdf0e2ee21e6823",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nr_2419",
        "account": [
            {
                "accountName": "T Ganesh Pandian",
                "accountNumber": "1626155000006964",
                "bankName": "KVBL",
                "ifsc": "KVBL0001626",
                "acc12": true,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Kunimuttur",
        "truckno": "TN64 X 6305",
        "party": "Surat Goods",
        "contact": [
            9677846036
        ],
        "pvt": "Surat Goods-Kunimuttur-Others"
    },
    {
        "_id": "65ed5c707d39bd05f986f683",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-09",
        "ownerid": "65ed5c707d39bd05f986f682",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6384",
        "account": [
            {
                "accountName": "Name",
                "accountNumber": 24310070832204708,
                "bankName": "BankName",
                "ifsc": "IFSC"
            }
        ],
        "update": true,
        "pan": "red",
        "v1": "Thanjavur-Pudukottai",
        "truckno": "TN47 BT 2619",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Thanjavur-Pudukottai-"
    },
    {
        "_id": "65ed5ee6fc04a7fed2515ac7",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-09",
        "ownerid": "5c8a0b0601f3fd22e8557281",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6385",
        "account": [
            {
                "accountName": "M Murali Krishnan",
                "accountNumber": "20315794699",
                "bankName": "SBI",
                "ifsc": "SBIN0012772",
                "acc12": true,
                "acc363": true,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Salem",
        "truckno": "TN54 S 1096",
        "party": "NRCM",
        "contact": [
            6379308290
        ],
        "pvt": "NRCM-Salem-"
    },
    {
        "_id": "65ed5ee6fc04a7fed2515ac8",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-09",
        "ownerid": "5caaf7cb0c95f710b846c0fa",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6388",
        "account": [
            {
                "accountName": "M Murulidharan",
                "accountNumber": "663053000002302",
                "bankName": "SIBL",
                "ifsc": "SIBL0000663",
                "acc12": true,
                "acc363": true,
                "acc65": true
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Coimbatore",
        "truckno": "TN66 W 1839",
        "party": "NRCM",
        "contact": [
            "9655633822",
            9443655061
        ],
        "pvt": "NRCM-Coimbatore-"
    },
    {
        "_id": "65ed5fe3fc04a7fed2515b0c",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-09",
        "ownerid": "63e5e7e91bbbca8a5994af9c",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6386",
        "account": [
            {
                "accountName": "Kamala",
                "accountNumber": "39565663490",
                "bankName": "SBIN",
                "ifsc": "SBIN0061703",
                "acc12": false,
                "acc363": false,
                "acc65": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Mayavaram",
        "truckno": "TN25 BD 7018",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Mayavaram-"
    },
    {
        "_id": "65ed5fe3fc04a7fed2515b0d",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-09",
        "ownerid": "65409b7810c135d20751da97",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6387",
        "account": [
            {
                "accountName": "Karthick Kumar T",
                "accountNumber": "1647155000135118",
                "bankName": "KVBL",
                "ifsc": "KVBL0001647"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Tiruvarur",
        "truckno": "TN55 CT 3669",
        "party": "NRCM",
        "contact": [
            8885281205
        ],
        "pvt": "NRCM-Tiruvarur-"
    },
    {
        "_id": "65ed5fe3fc04a7fed2515b0f",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-09",
        "ownerid": "6582920bd0501f6d8d456ec7",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6389",
        "account": [
            {
                "accountName": "SUBRAMANIAN N",
                "accountNumber": "30769775958",
                "bankName": "SBIN",
                "ifsc": "SBIN0011935"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Pattukottai",
        "truckno": "TN88 U 9213",
        "party": "NRCM",
        "contact": [
            7010121170
        ],
        "pvt": "NRCM-Pattukottai-"
    },
    {
        "_id": "65ed5fe3fc04a7fed2515b10",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-09",
        "ownerid": "649e694f7b2192a79dc528d3",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6390",
        "account": [
            {
                "accountName": "Ranjith J",
                "accountNumber": "919020061112855",
                "bankName": "UTIB",
                "ifsc": "UTIB0000704",
                "acc12": false,
                "acc65": false,
                "acc363": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Erode",
        "truckno": "TN05 CC 2018",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Erode-"
    },
    {
        "_id": "65ed5fe3fc04a7fed2515b11",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-09",
        "ownerid": "641814bae070675901c3bed0",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6391",
        "account": [
            {
                "accountName": "S Vijay Kumar",
                "accountNumber": "33787675600",
                "bankName": "SBI",
                "ifsc": "SBIN0011543",
                "acc12": true,
                "acc65": true,
                "acc363": true
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Pollachi",
        "truckno": "KA07 B 5408",
        "party": "NRCM",
        "contact": [
            8270059357
        ],
        "pvt": "NRCM-Pollachi-"
    },
    {
        "_id": "65ed5fe3fc04a7fed2515b12",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-09",
        "ownerid": "65d6d15e735cba1292730a0d",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6392",
        "account": [
            {
                "accountName": "Nityanand Transport",
                "accountNumber": "2614",
                "bankName": "BCBM",
                "ifsc": "BCBM"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Erode-Coimbatore",
        "truckno": "MH09 FL 7188",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Erode-Coimbatore-"
    },
    {
        "_id": "65ed5fe3fc04a7fed2515b14",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-09",
        "ownerid": "6540a06f10c135d20751db2f",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6393",
        "account": [
            {
                "accountName": "Tirumala Roadways",
                "accountNumber": "1635135000006742",
                "bankName": "KVBL",
                "ifsc": "KVBL0001635",
                "acc12": false,
                "acc65": false,
                "acc363": false
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Thanjavur",
        "truckno": "TN45 CC 8886",
        "party": "NRCM",
        "contact": [
            8508464135
        ],
        "pvt": "NRCM-Thanjavur-"
    },
    {
        "_id": "65ed5fe3fc04a7fed2515b15",
        "qrDate": "",
        "currentVehicleStatusforLoading": [],
        "currentVehicleStatus": [],
        "qr": [],
        "typeOfLoad": "",
        "loadingDate": "2024-03-09",
        "ownerid": "6577dee095ecde1a8ce6f77d",
        "lrno": 0,
        "rent": 0,
        "billamt": 0,
        "billno": "nrcm_6394",
        "account": [
            {
                "accountName": "S Vijay Kumar",
                "accountNumber": "33787675600",
                "bankName": "SBIN",
                "ifsc": "SBIN0011543"
            }
        ],
        "update": false,
        "pan": "green",
        "v1": "Erode",
        "truckno": "TN38 CV 4291",
        "party": "NRCM",
        "contact": [],
        "pvt": "NRCM-Erode-"
    }
]

  constructor(public apiCallservice: ApiCallsService, public handledata: HandleDataService,
    public router: Router, public handleF: handleFunction,public security:SecurityCheckService) {
    localStorage.clear();
    }

    


  login(data) {
    this.security.setBranch(data);
    
    this.router.navigate(['Login']);
    this.loginV = true;
    
  }

  track(){
    this.security.setBranch('nrcm');
    this.router.navigate(['TRACK']);
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
  ngOnInit() {
    setInterval(() => {
      this.now = new Date();
      if (this.now.getSeconds() % 10 === 0) {
        this.changed = true;
      } else {
        this.changed = false;
      }
    }, 1000);

    // this.downloadRS();
    }


    // downloadRS(){//threshhold is 295

    //   let i=16;

  
    //   let pageno = 1;
    //   let dateFormat = this.selectedDate.slice(8, 10) + '-' + this.selectedDate.slice(5, 7) + '-' + this.selectedDate.slice(0, 4);
    //   let totalAmount=0;
    //   var doc = new jsPDF();
    //   doc.line(0, 148.2, 5, 148.2);//punching line helper
    //   //Static Part Start
    //   //Date
    //   doc.setFontSize('10');
    //   doc.setFontType('bold');
    //   doc.setTextColor(0, 0, 0);
    //   doc.text(dateFormat, 90, i + 5 - 16)
    //   doc.text(String(pageno), 190, i + 5 - 16)
    //   pageno = pageno + 1;
    //   let pageStopper = i+5-16;
    //   //Date
    //   //line after date
    //   doc.setDrawColor(0, 0, 0);
    //   doc.setLineWidth(0.5);
    //   doc.line(0, i + 6 - 16, 210, i + 6 - 16);
    //   //line after date
    //   //5 vertical lines for amount, comments, pageno,date,trucno, account details(account details is further divided into 3 parts per data need a loop here)
    //   //vertical line after date
    //   doc.setDrawColor(0, 0, 0);
    //   doc.setLineWidth(0.5);
    //   doc.line(37, i + 6 - 16, 37, i + 12 - 16);
    //   doc.line(61, i + 6 - 16, 61, i + 12 - 16);
    //   // doc.line(72, i + 6 - 16, 72, i + 12 - 16);
    //   doc.line(83, i + 6 - 16, 83, i + 12 - 16);
    //   doc.line(146, i + 6 - 16, 146, i + 12 - 16);
  
  
    //   //vertical line after date till headers
    //   //Headers
    //   doc.setFontSize('10');
    //   doc.setFontType('bold');
    //   doc.setTextColor(0, 0, 0);
    //   doc.text('Amount', 16, i + 10 - 16)
    //   doc.text('Comments', 38, i + 10 - 16)
    //   // doc.text('Pg', 63, i + 10 - 16)
    //   doc.text('Date', 63, i + 10 - 16)
    //   doc.text('TruckNo', 83, i + 10 - 16)
 
    //   doc.text('Account Details', 146.5, i + 10 - 16)
    //   //Headers End
    //   //Line after headers
    //   doc.setDrawColor(0, 0, 0);
    //   doc.setLineWidth(0.5);
    //   doc.line(0, i + 12 - 16, 210, i + 12 - 16);
    //   //Line after headers
    //   //Static Part End
    //   //Dynamic Part Start
    //   doc.setFontSize('10');
    //   doc.setFontType('normal');
    //   doc.setTextColor(0, 0, 0);
    //   // doc.text('Shubham is awesome', 1, i);
    //   for (let z = 0; z < this.balanceDate.length; z++) {
    //     totalAmount=0;
    //     let data = this.balanceDate[z].truckData;
  
  
    //     if (((data.length * 6) + 15 + i) > 295) {
    //       doc.text('->', 192, pageStopper)
    //       doc.addPage();
    //       doc.line(0, 148.2, 5, 148.2);//punching line helper
    //       //Static Part Start
    //       //Date
    //       doc.setFontSize('10');
    //       doc.setFontType('bold');
    //       doc.setTextColor(0, 0, 0);
    //       doc.text(dateFormat, 90, 5)
    //       doc.text(String(pageno), 190, 5)
    //       pageStopper = 5;
    //       pageno = pageno + 1;
    //       //Date
    //       //line after date
    //       doc.setDrawColor(0, 0, 0);
    //       doc.setLineWidth(0.5);
    //       doc.line(0, 6, 210, 6);
    //       //line after date
    //       //5 vertical lines for amount, comments, pageno,date,trucno, account details(account details is further divided into 3 parts per data need a loop here)
    //       //vertical line after date
    //       doc.setDrawColor(0, 0, 0);
    //       doc.setLineWidth(0.5);
    //       doc.line(37, 6, 37, 12);
  
    //       doc.line(61, 6, 61, 12);
    //       // doc.line(72, 6, 72, 12);
  
    //       doc.line(83, 6, 83, 12);
    //       doc.line(146, 6, 146, 12);
    //       //vertical line after date
    //       //Headers
    //       doc.setFontSize('10');
    //       doc.setFontType('bold');
    //       doc.setTextColor(0, 0, 0);
    //       doc.text('Amount', 16, 10)
    //       doc.text('Comments', 38, 10)
    //       // doc.text('Pg', 63, 10)
    //       doc.text('Date', 63, 10)
    //       doc.text('TruckNo', 83, 10)
  
    //       doc.text('Account Details', 146.5, 10)
    //       //Headers End
    //       //Line after headers
    //       doc.setDrawColor(0, 0, 0);
    //       doc.setLineWidth(0.5);
    //       doc.line(0, 12, 210, 12);
    //       //Line after headers
    //       //Static Part End
    //       //Dynamic Part Start
    //       doc.setFontSize('10');
    //       doc.setFontType('normal');
    //       doc.setTextColor(0, 0, 0);
    //       i = 16;
    //     }
  
  
  
    //     let K = 0
    //     let accountI=i;
    //     doc.setFontSize('10');

    //     for (let k = 0; k < data.length; k++) {
    //       doc.setFontSize('10');
    //       if(this.balanceDate[z].truckData[k].pay){
    //       doc.text("Pay", 2, i);//amount
    //       }
    //       // Forward Date
    //       if(this.selectedDate==this.balanceDate[z]['todayDate']){
    //         if(this.balanceDate[z].truckData[k].forwardDate==''){}else{
    //           doc.text('fD:'+this.handleF.getDateddmmyy(this.balanceDate[z].truckData[k].forwardDate), 191, i+12);
    //           }
    //       }
    //       else{
    //         if(this.balanceDate[z].truckData[k].forwardDate==this.selectedDate){
    //           doc.text('pD:'+this.handleF.getDateddmmyy(this.balanceDate[z]['todayDate']), 191, i+12);
    //         }
    //       }
          
    //       // Forward Date
    //       doc.text(String(this.balanceDate[z].truckData[k].total), 16, i);//amount
  
    //       doc.setFontSize('10');
    //       doc.text(this.balanceDate[z].truckData[k].date.slice(8, 10) + '/' + this.balanceDate[z].truckData[k].date.slice(5, 7) + '/' + this.balanceDate[z].truckData[k].date.slice(0, 4), 63, i);//date
    //       doc.setFontSize('10');
    //       doc.text(this.balanceDate[z].truckData[k].truckno.split(' ').join(''), 83.5, i);//truckno
    //         doc.text(this.balanceDate[z].truckData[k].remark, 50, i);//truckno
          
    //       doc.setFontSize('8');
    
  
    //       doc.setFontSize('10');
    //       K = k;
    //       i = i + 6;
    //       totalAmount=totalAmount+this.balanceDate[z].truckData[k].total;
    //     }
    //     if(data.length>1){
    //     doc.line(5, i-4, 32, i-4);
    //     doc.text(String(totalAmount),16,i)
    //     }
    //     let bigKK=0
    //     // let data = this.balanceDate[z].truckData;
    //     for (let kk = 0; kk < this.balanceDate[z].dueToTake.length; kk++) {
    //       if(this.balanceDate[z].dueToTake[kk]){
    //         doc.setFontSize('8');
    //         doc.setLineDash([0.5, 1], 10);
    //         doc.line(37, i-4, 146, i-4);
            
            
  
    //           doc.text('*'+String(this.balanceDate[z].due[kk]['reason'])+'  *Total Due -'+String(this.balanceDate[z].due[kk]['totalDue']), 38.5, i+1+bigKK);//comments
    //           doc.text('* Due : '+String(this.balanceDate[z].due[kk]['thiscut'])+'   *Due Date* : '+String(this.balanceDate[z].due[kk]['dueTaken'].slice(8, 10) + '/' + this.balanceDate[z].due[kk]['dueTaken'].slice(5, 7) + '/' + this.balanceDate[z].due[kk]['dueTaken'].slice(0, 4)),83.5,i+1)+bigKK;
    //           bigKK=bigKK+5
  
    //       }
    //       doc.setLineDash([1, 0], 10);
    //     }
    //     bigKK=bigKK==0?5:bigKK;
  
  
    //     let bigK=0
  
    //     let adder=0
  
    //     doc.line(0, i + 7-(bigK*2)+adder, 210, i + 7-(bigK*2)+adder);
    //     doc.line(37, i - (data.length * 6) -11-(bigK*2), 37, i + 7-(bigK*2)+adder);
  
    //     doc.line(61, i - (data.length * 6) -11-(bigK*2), 61, i + 7-(bigK*2)+adder);
  
    //     doc.line(83, i - (data.length * 6) -11-(bigK*2), 83, i + 7-(bigK*2)+adder);
    //     doc.line(146, i - (data.length * 6) -11-(bigK*2), 146, i + 7-(bigK*2)+adder);
  
    
    //     doc.setFontSize('10');
    //     if(this.balanceDate[z].update){}else{
    
    //     doc.text(this.balanceDate[z].accountName, 147.5, accountI);//accno
    //     doc.text(String(this.balanceDate[z].accountNumber), 147.5, accountI+6);//accname
    //     doc.text(this.balanceDate[z].ifsc + '-' + this.balanceDate[z].contacttb, 147.5, accountI+12);//ifsc-bankname
    //     doc.rect( 195, accountI+9,3,3)
    //     doc.rect( 200, accountI+9,3,3)
    //     }
    //     // doc.text(this.balanceDate[z]['available'], 191, accountI+6);//accno
    //     doc.setFontSize('8');
        
    //     i = i + 12-(bigK*2)+(bigKK-5);
    //   }
    //   doc.text('#', 192, pageStopper)
    //   //Dynamic Part End
    //   doc.save(dateFormat + '.pdf')
    // }



  ls(no){
    if(no<6){
      return 3;
    }
    else if(no>=6){
      return no-5+this.ls(no-1);
    }
  }

amountSettler(d,c){return d.reduce((partialSum, a) => partialSum + a[c], 0);}


}
