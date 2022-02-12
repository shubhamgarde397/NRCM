{
    "bhData": 
    [
    {
      "truckData": [
         {
          "date": "2022-02-11",
          "truckno": "OL11 OL 1111",
          "shortDetails": "NRCM-Tp-ChTNd",
          "pageno": 2,
          "amount": 1,
          "partyType": "NRCM"
        },
        {
          "date": "2022-02-11",
          "truckno": "OJ11 OJ 1111",
          "shortDetails": "NRCM-Tp-CBE",
          "pageno": 4,
          "amount": 3,
          "partyType": "NRCM"
        },
      ],
      "todayDate": "2022-02-11",
      "comments": "",
      "commentToTruck": "12",
      "print": false,
      "bankName": "",
      "ifsc": "",
      "accountNumber": "",
      "accountName": ""
    }
  ],
  "method": "BHInsert",
  "tablename": "BalanceHire",
  "ids": [
    "6205df7b197d7d68d6dd744c",
    "6205df72197d7d68d6dd7447",
  ],
  "bhTrucks": [
    {
      "_id": "6205df7b197d7d68d6dd744c",
      "parentAccNo": 363,
      "loadingDate": "2022-02-11",
      "partyType": "NRCM",
      "turnbookDate": "2022-02-11",
      "entryDate": "2022-02-11",
      "pgno": 2,
      "villageDetails": [
        {
          "_id": "6023eeedfb76858c10ee945a",
          "village_name": "Chetynad",
          "shortName": "ChTNd"
        }
      ],
      "ownerDetails": [
        {
          "_id": "61faa84007ac95ea2d1ffee1",
          "truckno": "OL11 OL 1111",
          "oname": "",
          "pan": "",
          "accountDetails": [
            {
              "accountName": "C",
              "accountNumber": 3,
              "bankName": "C",
              "ifsc": "C"
            }
          ]
        }
      ],
      "partyDetails": [
        {
          "_id": "61a269cb55ed166c48a4383b",
          "name": "tp",
          "gst": "33AAAHT4575M1ZZ",
          "shortName": "Tp"
        }
      ],
      "balance": 0,
      "amount": 1
    },
    {
      "_id": "6205df72197d7d68d6dd7447",
      "parentAccNo": 12,
      "loadingDate": "2022-02-11",
      "partyType": "NRCM",
      "turnbookDate": "2022-02-11",
      "entryDate": "2022-02-11",
      "pgno": 4,
      "villageDetails": [
        {
          "_id": "5b212f5b305c3912d8547c3d",
          "village_name": "Coimbatore",
          "shortName": "CBE"
        }
      ],
      "ownerDetails": [
        {
          "_id": "61f9532b77155026cf1aadd0",
          "truckno": "OJ11 OJ 1111",
          "oname": "",
          "pan": "",
          "accountDetails": [
            {
              "accountName": "B",
              "accountNumber": 2,
              "bankName": "B",
              "ifsc": "B"
            }
          ]
        }
      ],
      "partyDetails": [
        {
          "_id": "61a269cb55ed166c48a4383b",
          "name": "tp",
          "gst": "33AAAHT4575M1ZZ",
          "shortName": "Tp"
        }
      ],
      "balance": 0,
      "amount": 3
    },
  ],
  "oids": [
    "61faa84007ac95ea2d1ffee1",
    "61f9532b77155026cf1aadd0",
  ],
  "pgnos": [
    2,4
  ],
  "amounts": [
    1,3
  ],
  "partyTypes": [
    "NRCM","NRCM"
  ],
  "todayDate": "2022-02-12",
  "user": "shubham",
  "typeofuser": 1
}