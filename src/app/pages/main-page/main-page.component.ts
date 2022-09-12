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
public trucks= ["AA22 AA 2222",
"AP02 1111 1111",
"AP02 TC 0357",
"AP02 TC 2826",
"AP03 TJ 0063",
"AP09 QW 0909",
"AP39 TH 1956",
"AP39 TS 8276",
"AP39 TV 9995",
"AP39 TZ 8568",
"AP39 UB 3717",
"KA01 AH 3534",
"KA01 AH 7778",
"KA01 AH 7789",
"KA01 AJ 4242",
"KA01 AL 4869",
"KA01 AM 3332",
"KA05 AD 4103",
"KA07 A 9059",
"KA07 AF 9057",
"KA10 A 6096",
"KA22 D 4084",
"KA22 D 7975",
"KA28 D 6287",
"KA32 AA 0020",
"KA32 D 0618",
"KA32 D 3159",
"KA32 D 3796",
"KA32 D 6378",
"KA32 D 8126",
"KA32 D 8644",
"KA32 D 8674",
"KA32 D 8879",
"KA51 A 9449",
"KA51 AB 2667",
"KA51 AC 9506",
"KA51 AD 2396",
"KA51 AD 7093",
"KA51 AG 4959",
"KA51 AH 1767",
"KA51 D 5001",
"KA53 AA 2116",
"KA59 1535",
"KL19 L 5155",
"KL38 H 6836",
"MH01 CR 6482",
"MH01 CR 6744",
"MH03 CV 2438",
"MH04 GR 2456",
"MH04 KU 4173",
"MH04 KV 4173",
"MH05 DK 2954",
"MH09 CU 0185",
"MH10 AW 7081",
"MH10 Z 4238",
"MH11 AL 2258",
"MH11 AL 5125",
"MH12 FC 8602",
"MH12 FZ 9983",
"MH12 LT 1212",
"MH12 LT 2424",
"MH12 LT 7157",
"MH12 LT 7257",
"MH12 LT 8025",
"MH12 LY 7686",
"MH12 MV 8382",
"MH12 QG 7576",
"MH12 QG 8710",
"MH12 QW 3059",
"MH12 QW 3194",
"MH12 QW 3212",
"MH12 QW 3393",
"MH12 QW 3471",
"MH12 QW 4073",
"MH12 QW 5744",
"MH12 QW 5745",
"MH12 QW 6094",
"MH12 QW 8929",
"MH12 QW 9945",
"MH12 QW 9983",
"MH12 RN 1895",
"MH12 RN 8882",
"MH12 SF 5890",
"MH12 SX 2939",
"MH12 SX 2992",
"MH12 SX 3137",
"MH12 SX 6094",
"MH12 SX 6160",
"MH12 SX 7792",
"MH12 SX 7970",
"MH12 SX 8964",
"MH12 SX 9397",
"MH12 TV 4207",
"MH12 TV 4273",
"MH12 TV 6094",
"MH12 TV 6763",
"MH12 TV 7865",
"MH12 TV 9794",
"MH13 AX 2172",
"MH13 AX 4714",
"MH13 AX 4883",
"MH13 CU 3372",
"MH13 CU 3617",
"MH13 CU 6036",
"MH13 CU 6386",
"MH13 CU 7293",
"MH13 DQ 3402",
"MH13 DQ 3462",
"MH13 dq 3462",
"MH14 EM 0557",
"MH14 GD 7471",
"MH14 GU 5560",
"MH14 GU 8953",
"MH14 HG 2491",
"MH14 HG 2778",
"MH14 HG 7471",
"MH14 HU 0727",
"MH14 HU 1982",
"MH14 HU 8501",
"MH14 JL 0927",
"MH14 JL 5081",
"MH14 JL 9333",
"MH14 KA 2860",
"MH17 AG 8157",
"MH24 AB 9141",
"MH24 AU 3611",
"MH24 AV 4725",
"MH24 AV 6955",
"MH25 AJ 1352",
"MH25 AJ 1554",
"MH42 AQ 3136",
"MH42 AQ 8086",
"MH42 AQ 9858",
"MH45 0513",
"MH45 1285",
"MH45 AF 1339",
"MH45 AF 1644",
"MH45 AF 3245",
"MH45 AF 5896",
"MH45 AF 6302",
"MH45 AF 6969",
"MH45 AF 7878",
"MH46 BF 0996",
"MH48 AY 6571",
"MH48 T 8341",
"MH50 N 0529",
"OO00 OO 0000",
"PY01 BH 3087",
"PY05 F 5880",
"QQ11 QQ 1111",
"QQ22 QQ 2222",
"TN01 1111 1111",
"TN02 BF 0048",
"TN02 BQ 8187",
"TN02 BU 0510",
"TN02 BW 6791",
"TN02 BW 8961",
"TN03 Z 0920",
"TN05 BV 4485",
"TN05 CB 6201",
"TN05 CC 0967",
"TN05 CC 0973",
"TN05 CC 1427",
"TN05 CE 4906",
"TN05 CF 0695",
"TN05 CF 1359",
"TN05 CF 7085",
"TN05 CL 9982",
"TN09 CE 7576",
"TN09 CQ 1642",
"TN09 CU 8910",
"TN10 BD 0549",
"TN10 BF 4091",
"TN10 BK 7449",
"TN10 BP 9909",
"TN10 BP 9919",
"TN10 BP 9929",
"TN10 BP 9959",
"TN10 BQ 0459",
"TN10 BQ 5076",
"TN10 BR 2670",
"TN11 AX 5029",
"TN11 AX 9562",
"TN11 X 1921",
"TN12 A 9097",
"TN12 AE 3750",
"TN12 AE 7444",
"TN12 AF 0946",
"TN12 AL 9789",
"TN12 AL 9942",
"TN12 AM 1769",
"TN12 AM 1800",
"TN12 AM 2298",
"TN12 AM 3537",
"TN12 AP 2833",
"TN12 AQ 0858",
"TN12 AR 6752",
"TN12 AR 6760",
"TN12 AR 7083",
"TN12 AS 1477",
"TN12 AS 3444",
"TN12 AX 6760",
"TN12 M 6329",
"TN12 U 7707",
"TN12 W 9041",
"TN12 Y 1409",
"TN13 Q 9281",
"TN13 T 2999",
"TN13 T 6699",
"TN13 TN 1313",
"TN13 U 5986",
"TN13 W 4897",
"TN15 A 5244",
"TN15 A 8106",
"TN15 AM 8545",
"TN15 B 0752",
"TN15 C 0977",
"TN15 C 5982",
"TN15 D 7270",
"TN15 D 7922",
"TN15 D 9671",
"TN15 E 2775",
"TN15 E 2845",
"TN15 M 6094",
"TN16 A 3299",
"TN16 C 3771",
"TN16 C 3859",
"TN16 C 4033",
"TN16 C 4934",
"TN16 C 5434",
"TN16 C 5436",
"TN16 C 5771",
"TN16 C 6271",
"TN16 E 4132",
"TN16 E 5035",
"TN16 E 5059",
"TN16 E 5601",
"TN16 E 8922",
"TN16 F 7770",
"TN16 F 9387",
"TN16 H 4338",
"TN16 V 5953",
"TN16 X 9913",
"TN18 AC 8652",
"TN18 AD 7074",
"TN18 AJ 4570",
"TN18 AM 1297",
"TN18 AQ 3241",
"TN18 AS 3166",
"TN18 B 8904",
"TN18 BB 0245",
"TN18 BE 3652",
"TN19 AA 2949",
"TN19 AQ 1631",
"TN19 AR 8062",
"TN19 BX 6841",
"TN20 CT 8785",
"TN20 DA 9896",
"TN21 BP 6099",
"TN21 BQ 0883",
"TN22 AY 5475",
"TN22 DK 2887",
"TN22 DM 4182",
"TN23 AL 4800",
"TN23 BF 0258",
"TN23 BX 5272",
"TN23 CC 2848",
"TN23 CE 1465",
"TN23 CK 6567",
"TN23 CP 1802",
"TN23 CP 6091",
"TN23 CU 3487",
"TN23 CU 8619",
"TN23 CV 3487",
"TN23 CW 8845",
"TN23 CZ 1865",
"TN23 CZ 9552",
"TN23 DY 0931",
"TN24 AA 9835",
"TN24 AB 4446",
"TN24 AB 5878",
"TN24 AC 4543",
"TN24 AD 0713",
"TN24 AD 2050",
"TN24 AE 4446",
"TN24 AF 3229",
"TN24 AH 7399",
"TN24 AJ 0043",
"TN24 AK 2454",
"TN24 AK 5720",
"TN24 AK 7399",
"TN24 AM 2814",
"TN24 AM 4052",
"TN24 AM 9165",
"TN24 AP 5803",
"TN24 AP 8514",
"TN24 AQ 1730",
"TN24 AQ 1757",
"TN24 AQ 6118",
"TN24 AQ 9578",
"TN24 AR 0336",
"TN24 AR 2028",
"TN24 AR 2556",
"TN24 AR 4129",
"TN24 AR 6642",
"TN24 AT 0598",
"TN24 AT 1308",
"TN24 AT 4007",
"TN24 AT 4437",
"TN24 AT 5828",
"TN24 AV 3229",
"TN24 AV 3983",
"TN24 AV 4636",
"TN24 AW 0410",
"TN24 AW 1236",
"TN24 AW 2181",
"TN24 AW 4636",
"TN24 AX 3313",
"TN24 AX 3601",
"TN24 AY 1684",
"TN24 AY 3873",
"TN24 M 1032",
"TN24 P 9256",
"TN24 R 5196",
"TN25 AL 2516",
"TN25 AM 5164",
"TN25 AS 0265",
"TN25 AT 7815",
"TN25 BH 4480",
"TN25 BJ 5537",
"TN25 BJ 6049",
"TN25 BJ 9274",
"TN25 BJ 9897",
"TN25 BK 2098",
"TN25 BK 5951",
"TN25 BL 3918",
"TN25 BL 6860",
"TN25 BS 0921",
"TN25 BT 6984",
"TN25 BW 3984",
"TN25 BW 7377",
"TN25 CT 6984",
"TN28 AF 3894",
"TN28 AR 0660",
"TN28 AU 7414",
"TN28 BE 6413",
"TN28 BE 7525",
"TN28 BF 3845",
"TN28 BF 3894",
"TN28 BF 8035",
"TN28 BH 0967",
"TN28 BH 3082",
"TN28 BH 3215",
"TN28 BH 3224",
"TN28 BH 3252",
"TN28 BH 3290",
"TN28 BH 3294",
"TN28 BW 9166",
"TN29 AK 2799",
"TN29 AU 7076",
"TN29 BC 4629",
"TN29 BE 6032",
"TN29 BK 3370",
"TN29 BL 9852",
"TN29 BL 9891",
"TN29 BP 0160",
"TN29 BP 5773",
"TN29 BR 0071",
"TN29 BR 0240",
"TN29 BR 0671",
"TN29 BR 1170",
"TN29 BR 1657",
"TN29 BR 2684",
"TN29 BR 2937",
"TN29 BR 3241",
"TN29 BR 7450",
"TN29 BU 3882",
"TN29 BU 3982",
"TN29 BU 7139",
"TN29 BV 7664",
"TN29 BY 5998",
"TN29 BZ 2794",
"TN29 CW 6348",
"TN29 CW 9648",
"TN29 CY 6053",
"TN29 CY 7160",
"TN29 CY 7836",
"TN29 DZ 2399",
"TN30 AC 4125",
"TN30 BA 2388",
"TN30 BM 0254",
"TN30 BQ 0047",
"TN30 BQ 9542",
"TN30 BR 4317",
"TN30 BR 9542",
"TN30 BS 5805",
"TN30 BS 8671",
"TN30 BY 2994",
"TN30 CA 3235",
"TN30 CA 3477",
"TN30 CA 4829",
"TN30 CB 0050",
"TN30 CW 0748",
"TN30 CX 4777",
"TN30 CX 6016",
"TN30 CX 9777",
"TN30 CY 2705",
"TN30 CZ 1362",
"TN30 CZ 2476",
"TN31 AE 4419",
"TN31 AF 7958",
"TN31 AL 8489",
"TN31 AS 6321",
"TN31 AX 1067",
"TN31 BA 8107",
"TN31 BD 4916",
"TN31 BE 3715",
"TN31 BE 5676",
"TN31 BF 4716",
"TN31 BF 5163",
"TN31 BF 5850",
"TN31 BH 1523",
"TN31 BH 6806",
"TN31 BH 8776",
"TN31 BH 9496",
"TN31 BK 9025",
"TN31 BM 3051",
"TN31 BM 6946",
"TN31 BS 6079",
"TN31 CA 4358",
"TN31 CA 5142",
"TN31 CA 5405",
"TN31 CA 8107",
"TN31 CA 8716",
"TN31 CB 2820",
"TN31 CB 3124",
"TN31 CB 5613",
"TN31 CC 3124",
"TN31 CC 8248",
"TN31 CD 2331",
"TN31 CE 4858",
"TN31 CE 5149",
"TN31 CE 5176",
"TN31 CU 2607",
"TN31 CU 5302",
"TN31 CV 1027",
"TN31 CV 1076",
"TN31 CV 1697",
"TN31 CV 9563",
"TN31 CX 1067",
"TN31 CX 1935",
"TN31 CX 7978",
"TN31 DZ 5166",
"TN31 KC 8248",
"TN31 TC 3124",
"TN32 AA 8938",
"TN32 AB 7413",
"TN32 AF 0434",
"TN32 AH 5937",
"TN32 AH 7545",
"TN32 AH 9270",
"TN32 AH 9398",
"TN32 AK 6818",
"TN32 AK 8170",
"TN32 AM 2828",
"TN32 AM 9147",
"TN32 AP 4727",
"TN32 AQ 0309",
"TN32 AQ 0392",
"TN32 AQ 3121",
"TN32 AQ 5090",
"TN32 AQ 5478",
"TN32 AQ 6082",
"TN32 AQ 7960",
"TN32 AQ 8848",
"TN32 AQ 9182",
"TN32 AR 0688",
"TN32 AR 7320",
"TN32 AS 0718",
"TN32 AS 2466",
"TN32 AT 9573",
"TN32 AX 3900",
"TN32 BA 2387",
"TN32 BA 3309",
"TN32 BA 4281",
"TN32 BA 9529",
"TN32 BB 2287",
"TN32 BB 2973",
"TN32 BB 3526",
"TN32 BB 5106",
"TN32 BB 5180",
"TN32 BB 6602",
"TN32 BB 6726",
"TN32 BB 7354",
"TN32 BB 7986",
"TN32 BB 8025",
"TN32 BC 3741",
"TN32 CV 1027",
"TN32 J 8469",
"TN32 M 2542",
"TN33 BD 7434",
"TN33 BQ 3935",
"TN33 BW 3130",
"TN33 BW 3510",
"TN34 AC 0462",
"TN34 AC 6822",
"TN34 AD 0029",
"TN34 AD 2144",
"TN34 AD 3479",
"TN34 AD 6855",
"TN34 AE 9560",
"TN34 AF 2955",
"TN34 S 8844",
"TN34 T 4018",
"TN36 AK 3719",
"TN36 AL 6550",
"TN36 AM 4700",
"TN36 AR 1780",
"TN36 AW 5379",
"TN36 BW 4898",
"TN36 BW 5389",
"TN37 CH 5634",
"TN37 CK 6975",
"TN37 CM 2364",
"TN37 CT 7187",
"TN37 CV 5168",
"TN37 CY 3820",
"TN37 DE 2477",
"TN37 DJ 0556",
"TN37 DJ 0564",
"TN37 DK 1062",
"TN37 DK 5276",
"TN37 DW 1895",
"TN37 DW 6143",
"TN37 DW 8583",
"TN37 DX 0696",
"TN37 DX 0984",
"TN37 DX 3700",
"TN37 DY 0703",
"TN37 DY 3700",
"TN37 EY 5751",
"TN37 EZ 3037",
"TN37 EZ 4016",
"TN37 EZ 4267",
"TN38 A 3139",
"TN38 AF 2955",
"TN38 CA 4062",
"TN38 CA 8192",
"TN38 CA 8235",
"TN38 CC 9311",
"TN38 CC 9375",
"TN38 CC 9697",
"TN38 CK 4684",
"TN38 CK 6935",
"TN38 CK 7207",
"TN38 CL 4090",
"TN38 CM 6212",
"TN38 CM 7522",
"TN38 CM 8083",
"TN38 CP 9262",
"TN38 CQ 0918",
"TN38 CQ 6789",
"TN38 CR 2709",
"TN38 CS 0088",
"TN38 CS 6718",
"TN38 CS 8661",
"TN38 CT 1743",
"TN38 CT 5879",
"TN38 CT 8787",
"TN38 CU 6769",
"TN38 CU 7319",
"TN38 CU 7979",
"TN38 CW 0936",
"TN38 CW 2752",
"TN38 CW 6212",
"TN38 CX 3253",
"TN38 CX 3255",
"TN38 CX 3298",
"TN38 CX 3299",
"TN38 CX 9122",
"TN38 CY 1919",
"TN38 CY 5875",
"TN38 CZ 3272",
"TN38 CZ 6615",
"TN38 DA 4567",
"TN38 DB 2155",
"TN39 BJ 1793",
"TN39 BR 9694",
"TN39 BZ 5635",
"TN39 CB 2404",
"TN39 CD 0137",
"TN39 CF 4347",
"TN39 CJ 1793",
"TN39 CK 1959",
"TN39 CK 5715",
"TN39 CK 6935",
"TN39 CP 7950",
"TN39 CQ 4924",
"TN39 CT 1956",
"TN39 CW 0936",
"TN39 CW 2359",
"TN39 DX 2137",
"TN39 DX 5166",
"TN39 DY 5443",
"TN39 DZ 5869",
"TN40 AA 1551",
"TN40 R 2471",
"TN40 S 0353",
"TN41 AK 0680",
"TN41 AT 9808",
"TN42 AA 2418",
"TN42 AA 3737",
"TN42 AA 9592",
"TN42 AB 6969",
"TN42 AB 7623",
"TN42 AB 8542",
"TN42 AC 1201",
"TN42 AC 4771",
"TN42 AD 5842",
"TN42 AD 5896",
"TN42 AE 2723",
"TN42 AE 4247",
"TN42 AE 5002",
"TN42 AF 0066",
"TN42 AF 0101",
"TN42 AF 1756",
"TN42 AF 7337",
"TN42 AF 7867",
"TN42 AH 1395",
"TN42 AH 2107",
"TN42 AH 2118",
"TN42 AH 2983",
"TN42 AH 5278",
"TN42 AJ 8650",
"TN42 AX 3535",
"TN42 AZ 4296",
"TN42 P 0508",
"TN43 D 5865",
"TN45 AV 3362",
"TN45 BC 5707",
"TN45 BQ 8179",
"TN45 BR 3937",
"TN45 BZ 1033",
"TN45 BZ 8512",
"TN45 BZ 9370",
"TN45 CZ 1033",
"TN45 CZ 1635",
"TN45 CZ 9370",
"TN45 CZ 9436",
"TN46 W 3766",
"TN47 AF 3043",
"TN47 AL 0243",
"TN47 AL 2437",
"TN47 AL 3417",
"TN47 AL 5105",
"TN47 AM 1761",
"TN47 AM 3933",
"TN47 AM 5905",
"TN47 AM 6851",
"TN47 AU 9050",
"TN47 AV 2034",
"TN47 AY 2034",
"TN47 BA 1686",
"TN47 BA 3825",
"TN47 BA 4083",
"TN47 BA 7466",
"TN47 BW 6205",
"TN47 BW 8057",
"TN47 BY 9399",
"TN47 BZ 4853",
"TN48 AD 1797",
"TN48 AD 1847",
"TN48 AE 2201",
"TN48 AH 7877",
"TN48 AK 0906",
"TN48 AK 1091",
"TN48 AL 2437",
"TN48 AL 4370",
"TN48 AP 0012",
"TN48 AP 1678",
"TN48 BA 4519",
"TN48 BA 7589",
"TN48 BB 2255",
"TN48 BB 5230",
"TN48 BB 6026",
"TN48 BC 0499",
"TN48 BC 1447",
"TN48 BD 1931",
"TN48 BD 4251",
"TN48 BW 0978",
"TN48 BW 1033",
"TN48 BW 2255",
"TN48 BY 6459",
"TN48 BZ 1832",
"TN48 BZ 5230",
"TN48 BZ 8936",
"TN48 BZ 8986",
"TN48 BZ 9544",
"TN48 X 9666",
"TN49 AS 5071",
"TN50 M 6746",
"TN51 AQ 2394",
"TN52 AA 2273",
"TN52 AA 3777",
"TN52 AC 1177",
"TN52 M 5677",
"TN52 M 7251",
"TN52 Q 0014",
"TN52 Q 6235",
"TN52 R 4577",
"TN52 S 3326",
"TN54 D 5866",
"TN54 H 5836",
"TN54 P 8839",
"TN54 Q 5798",
"TN54 R 4074",
"TN54 S 1096",
"TN54 S 4312",
"TN54 S 4344",
"TN54 S 4370",
"TN54 S 4383",
"TN54 S 7825",
"TN54 S 7843",
"TN54 S 7857",
"TN54 S 7882",
"TN54 S 7893",
"TN54 T 0378",
"TN54 T 0604",
"TN54 T 2711",
"TN54 T 2724",
"TN54 T 2729",
"TN54 T 2768",
"TN54 T 2793",
"TN54 T 3272",
"TN54 T 5648",
"TN54 U 2315",
"TN54 U 2336",
"TN54 U 2711",
"TN54 U 2919",
"TN54 U 3129",
"TN54 U 3252",
"TN54 U 3260",
"TN54 U 3278",
"TN54 U 3529",
"TN54 U 3592",
"TN54 U 3930",
"TN54 U 4259",
"TN54 U 468.",
"TN54 U 4683",
"TN54 U 4851",
"TN54 U 5037",
"TN54 U 5591",
"TN54 U 5593",
"TN54 U 5731",
"TN54 U 5798",
"TN54 U 5836",
"TN54 U 5848",
"TN54 U 7015",
"TN54 U 8023",
"TN54 U 8836",
"TN54 U 8850",
"TN54 U 8931",
"TN54 U 9009",
"TN54 U 9581",
"TN54 V 2039",
"TN54 V 3129",
"TN54 V 3272",
"TN54 V 3479",
"TN54 V 3930",
"TN54 V 5166",
"TN54 V 5801",
"TN54 V 5836",
"TN54 V 6044",
"TN54 V 6187",
"TN54 V 6321",
"TN54 V 6402",
"TN54 V 6432",
"TN54 V 6449",
"TN54 V 6458",
"TN54 V 6520",
"TN54 V 6646",
"TN54 V 7357",
"TN55 BE 0923",
"TN55 BH 4833",
"TN55 BJ 9487",
"TN55 BS 1350",
"TN55 BV 3998",
"TN55 C 1275",
"TN55 CH 1350",
"TN55 CS 1350",
"TN55 CS 3222",
"TN56 H 2590",
"TN56 H 8357",
"TN56 J 3564",
"TN56 L 5736",
"TN56 P 8508",
"TN56 P 8533",
"TN56 Q 6266",
"TN56 Q 8557",
"TN57 AL 2265",
"TN57 AX 2599",
"TN57 BA 7913",
"TN57 BD 0202",
"TN57 BD 1612",
"TN57 BH 0957",
"TN57 BH 1839",
"TN57 BH 3129",
"TN57 BH 6192",
"TN57 BH 9570",
"TN57 BH 9600",
"TN57 BJ 5800",
"TN57 BJ 6451",
"TN57 BM 3372",
"TN57 BW 6775",
"TN57 BX 3549",
"TN57 BX 9194",
"TN57 CZ 6970",
"TN58 AB 9499",
"TN58 AL 4973",
"TN58 AP 0717",
"TN58 AQ 4908",
"TN58 AT 3367",
"TN58 AU 7899",
"TN58 AU 9982",
"TN58 B 4908",
"TN58 BA 5305",
"TN58 BA 9499",
"TN58 BB 1676",
"TN58 BB 4917",
"TN58 BB 7441",
"TN58 BD 4917",
"TN58 BE 4489",
"TN58 BE 5229",
"TN58 BF 3966",
"TN58 BJ 0726",
"TN58 BR 3901",
"TN58 BW 1195",
"TN58 BX 0724",
"TN58 BX 9849",
"TN58 U 3459",
"TN59 BF 1809",
"TN59 BF 2107",
"TN59 BH 0677",
"TN59 BJ 5786",
"TN59 BK 2674",
"TN59 BM 5535",
"TN59 BQ 4529",
"TN59 BT 5457",
"TN59 BT 8597",
"TN59 BX 9849",
"TN59 BZ 0724",
"TN59 CB 8929",
"TN59 CC 7824",
"TN59 CE 7436",
"TN59 CE 7711",
"TN59 CF 6266",
"TN59 CL 1275",
"TN59 CL 8519",
"TN59 CM 5674",
"TN59 CM 6517",
"TN59 CU 1680",
"TN59 CW 9344",
"TN59 CZ 3790",
"TN60 AF 2552",
"TN60 AH 7328",
"TN60 AH 8921",
"TN60 AV 6073",
"TN60 Q 0713",
"TN61 K 9900",
"TN61 Q 2939",
"TN61 S 7240",
"TN63 AV 7447",
"TN64 F 0047",
"TN64 H 2272",
"TN64 L 4871",
"TN64 L 4893",
"TN64 R 8722",
"TN64 S 2077",
"TN64 T 6060",
"TN64 T 9498",
"TN64 V 3569",
"TN64 W 5564",
"TN64 W 5654",
"TN64 X 6305",
"TN65 AJ 4204",
"TN65 AQ 0923",
"TN65 BY 7738",
"TN66 AE 6984",
"TN66 W 1839",
"TN66 W 8231",
"TN66 Z 1909",
"TN67 BE 6154",
"TN67 BF 6154",
"TN67 BH 2874",
"TN67 BY 2847",
"TN67 BY 2874",
"TN68 AF 4785",
"TN68 P 6827",
"TN68 X 2535",
"TN69 BK 5863",
"TN69 BQ 0727",
"TN70 AA 6048",
"TN70 AB 1221",
"TN70 AE 5536",
"TN70 AF 8907",
"TN70 AS 5617",
"TN70 U 3884",
"TN70 V 3884",
"TN70 Z 3838",
"TN70 Z 5188",
"TN72 AH 6762",
"TN72 BK 1406",
"TN72 BP 1071",
"TN72 BP 2622",
"TN72 BX 3261",
"TN73 AB 8781",
"TN73 AC 2259",
"TN73 AD 7380",
"TN73 AE 6045",
"TN73 AE 7813",
"TN73 AE 9122",
"TN73 K 1615",
"TN74 AQ 6235",
"TN75 AS 1561",
"TN75 E 9034",
"TN75 J 7501",
"TN76 AV 7251",
"TN76 J 9648",
"TN77 C 5828",
"TN77 E 9034",
"TN77 F 3264",
"TN77 F 8782",
"TN77 P 7280",
"TN77 P 7286",
"TN77 P 8137",
"TN78 AZ 4245",
"TN78 AZ 7018",
"TN78 Z 7018",
"TN81 B 6509",
"TN81 D 6509",
"TN81 F 6934",
"TN83 A 1074",
"TN83 A 3139",
"TN83 C 1074",
"TN83 C 7180",
"TN83 D 5342",
"TN84 H 0347",
"TN84 L 3879",
"TN85 P 3648",
"TN85 P 5826",
"TN85 P 6097",
"TN86 A 4813",
"TN86 B 5431",
"TN86 E 1459",
"TN88 V 0675",
"TN90 A 9491",
"TN90 AF 9514",
"TN90 B 9104",
"TN90 C 6381",
"TN90 E 5053",
"TN90 F 0878",
"TN90 F 1914",
"TN90 F 4090",
"TN90 F 4237",
"TN90 F 5190",
"TN90 F 9372",
"TN90 F 9514",
"TN92 C 6163",
"TN92 C 9093",
"TN92 F 0972",
"TN92 F 8145",
"TN93 5927",
"TN93 B 2523",
"TN93 B 2604",
"TN93 B 2856",
"TN93 B 9282",
"TN93 C 5618",
"TN93 D 6592",
"TN93 D 9887",
"TN93 E 0883",
"TN94 B 7738",
"TN95 A 5475",
"TN95 B 6646",
"TN95 E 4037",
"TN96 B 3272",
"TN96 C 2171",
"TN97 A 0469",
"TN97 B 2785",
"TN97 B 4894",
"TN97 B 6815",
"TN99 B 0781",
"TN99 K 7457",
"TN99 P 5959",
"TN99 P 6870",
"TN99 T 0807",
"TN99 T 8129",
"TN99 U 1144",
"TN99 U 2122",
"TN99 V 1144",
"TN99 V 1199",
"TN99 Z 1144",
"TS12 D 5894",
"TS12 UD 1502"
]
public objectKeys = Object.keys;
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
public data=[]
  constructor(public apiCallservice: ApiCallsService, public handledata: HandleDataService,
    public router: Router, public handleF: handleFunction,public security:SecurityCheckService) {
    localStorage.clear();
    // this.generateReportAccount();
    }

    generateReportAccount(){//threshhold is 295
// Fetch all trucks who have either 12 or 363 as false
      let data=this.handleF.removeDuplicates(this.data)
      let pager=1;
       var doc = new jsPDF()
       doc.setFontSize('25');
       doc.setFontType('bold');
       doc.text('Account Details : ', 15, 15)//partyname
       doc.setFontSize('10');
      //  doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 165, 19)//date
       doc.text(String(pager), 180, 5)//pageno
       pager=pager+1;
       doc.setFontSize('25');
       doc.setLineWidth(0.5);
       doc.line(0, 20, 210, 20);//line after main header
       //headers
       doc.setFontSize('10');
       let y = 24;
       let starty = 24;
       doc.text('Sr', 3, y)//partyname
       doc.text('TruckNo', 12, y)//partyname
       doc.text('Account', 39, y)//partyname
       doc.text('12', 92, y)//partyname
       doc.text('363', 114, y)//partyname
       doc.text('Account Number', 150, y)//partyname
       //headers
       doc.line(0, 25, 210, 25);//line after header
   
       //vertical lines
       doc.line(10, 20, 10, 25);//srno
       doc.line(38, 20, 38, 25);//date
       doc.line(90, 20, 90, 25);//truckno
       doc.line(112, 20, 112, 25);//credit
       doc.line(134, 20, 134, 25);//credit
       //vertical lines
       let startforI=0;
       y = y + 6;
       startforI=0;
       for (let i = startforI; i < data.length; i++) {
   
         if(y>290){
           y=24;
           y=y+6;
       starty = 24;
           doc.addPage();
           doc.setFontSize('25');
       doc.setFontType('bold');
       doc.text('Account Details : ', 15, 15)//partyname
       doc.setFontSize('10');
      //  doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 190, 19)//date
       doc.text(String(pager), 180, 5)//pageno
       pager=pager+1;
       doc.setFontSize('25');
       doc.setLineWidth(0.5);
       doc.line(0, 20, 210, 20);//line after main header
       //headers
       doc.setFontSize('10');
       doc.text('Sr', 3, y-6)//partyname
       doc.text('TruckNo', 12, y-6)//partyname
       doc.text('Account', 39, y-6)//partyname
       doc.text('12', 92, y-6)//partyname
       doc.text('363', 114, y-6)//partyname
       doc.text('Account Number', 150, y-6)//partyname
       //headers
       doc.line(0, 25, 210, 25);//line after header
   
       //vertical lines
       doc.line(10, 20, 10, 25);//srno
       doc.line(38, 20, 38, 25);//date
       doc.line(90, 20, 90, 25);//truckno
       doc.line(112, 20, 112, 25);//credit
       doc.line(134, 20, 134, 25);//credit
       //vertical lines
       }
       
        doc.text(String(i+1), 3, y)//partyname
        doc.text(data[i].truckno, 11, y)//partyname

       doc.text(data[i].accountDetails[0].accountName, 39, y)//partyname
       doc.text(String(data[i].accountDetails[0].accountNumber), 39, y+4)//partyname
       doc.text(data[i].accountDetails[0].ifsc, 39, y+8)//partyname
  
                  
         doc.line(0, y + 11, 210, y + 11);//line after header
         y = y + 15;
   
         
       //vertical lines//getting applied for every loop, make it happen once only
       doc.line(10, starty, 10, y-4);//srno
       doc.line(38, starty, 38, y-4);//date
       doc.line(90, starty, 90, y-4);//truckno
       doc.line(112, starty, 112, y-4);//credit
       doc.line(134, starty, 134, y-4);//credit
       //vertical lines
       }
  
       doc.save('Account-Details.pdf')
     }

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

