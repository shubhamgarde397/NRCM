import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from 'node_modules/@angular/router';
import { ApiCallsService } from 'src/app/common/services/ApiCalls/ApiCalls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
    public data=[];
    public backGroundColor=[];
    public borderColor=[];
    public dataonX=[];
    public dataonY=[];
    public months = ["January" ,"February" ,"March" ,"April" ,"May" ,"June" ,"July" ,"August" ,"September" ,"October" ,"November" ,"December"];
    public years=[];
    public types=[
        {viewValue:'By Month',value:'byMonth'},//select year and month avalaible only for NRCM charts
        {viewValue:'By Party Yearwise',value:'byPartyYearwise'},//select party and year
        {viewValue:'By Selected Party',value:'bySelectedPartyYearwise'},//select party you want in the chart min 2 max 30 and year
        {viewValue:'By Selected Party MonthWise',value:'bySelectedPartyYearMonthwise'},//select party you want in the chart min 2 max 30 and year and showcase 12 charts
    ];

    public typeOfChartDiv=true;
    public yearDiv=false;
    public monthDiv=false;
    public buttonDiv=false;
    public partyDiv=false;
    public partyModalSelectButton=false;

    public selectedYear;
    public selectedMonth;
    public selectedType;

    public myChart;
    public commonArray;
    public gstdetailslist;
    public gstdetailslistid;
    public gstdetailslistidList=[];
    public considerArray;
    public nopid='';

  constructor(
      public apiCallservice:ApiCallsService,
      public router:Router,
      public security:SecurityCheckService,
      public handleFunction:handleFunction,
    public handledata: HandleDataService, 
    public spinnerService: Ng4LoadingSpinnerService) {if(!this.security.login){
      this.router.navigate([''])
    } }

  ngOnInit() {
    this.commonArray = this.security.commonArray;
    this.considerArray = this.handledata.createConsiderArray('infogstonly')
    this.handledata.goAhead(this.considerArray) ? this.getInformationData() : this.fetchBasic();
    for (let i = 0; i < new Date().getFullYear() - 2020; i++) {
        this.years.push(i + 2021)
      }
  }

  getInformationData() {
    this.spinnerService.show();
    let tempObj = { "method": "displaynew", "consider": this.considerArray,'notall':false };
    this.apiCallservice.handleData_New_python('commoninformation', 1, tempObj, true)
      .subscribe((res: any) => {
        this.security.commonArray['gstdetails'] = Object.keys(res.gstdetails[0]).length > 0 ? res.gstdetails : this.security.commonArray['gstdetails'];;
        this.fetchBasic();
        this.spinnerService.hide();
      });
  }

  fetchBasic() {
    this.commonArray = this.security.commonArray;
    this.gstdetailslist = [];
    this.gstdetailslist = this.commonArray.gstdetails;
  }

  findgst() {
    this.gstdetailslistid = this.handleFunction.findgst(this.nopid, this.gstdetailslist);
    if(this.selectedType==='bySelectedPartyYearwise'){
        this.gstdetailslistidList.length===15?alert('Cannot add more than 15'):this.gstdetailslistidList.push({'id':this.gstdetailslistid._id,'name':this.gstdetailslistid['name']});
    }
  }
  removeFromGstList(i,j){
this.gstdetailslistidList.splice(j,1)
  }
  
  turnDiv(){
    switch (this.selectedType) {
        case 'byMonth':
                this.monthDiv=true;
                this.yearDiv=true;
                this.partyDiv=false;
                this.buttonDiv=true;
                this.partyModalSelectButton=false;
                break;
                case 'byPartyYearwise':
                this.monthDiv=false;
                this.yearDiv=true;
                this.partyDiv=true;
                this.buttonDiv=true;
                this.partyModalSelectButton=false;
                break;
                case 'bySelectedPartyYearwise':
                this.monthDiv=false;
                this.yearDiv=true;
                this.partyDiv=false;
                this.partyModalSelectButton=true;
                this.buttonDiv=true;
                case 'bySelectedPartyYearMonthwise':
                  break;
    }
  }
  
  callChart(){//as per the type change the required fields
    let tempObj={}
    tempObj['method']="chart";
    tempObj['tablename']="TurnBook_2020_2021"
    tempObj['type']=this.selectedType;
    tempObj['from']=this.selectedType==='byMonth'?this.selectedYear+'-'+this.handleFunction.generate2DigitNumber(String(this.handleFunction.getMonthNumber(this.selectedMonth)))+'-01':this.selectedYear+'-01-01';
    tempObj['to']=this.selectedType==='byMonth'?this.selectedYear+'-'+this.handleFunction.generate2DigitNumber(String(this.handleFunction.getMonthNumber(this.selectedMonth)))+'-31':this.selectedYear+'-12-31';
    if(this.selectedType==='bySelectedPartyYearwise')
    {
        tempObj['id']=this.gstdetailslistidList.map(r=>r.id)
    }
    else if(this.selectedType==='byPartyYearwise'){
        tempObj['id']=this.gstdetailslistid['_id']
    }
    this.apiCallservice.handleData_New_python
    ('commoninformation', 1, tempObj, true)
    .subscribe((res: any) => {
        this.data=[];
        this.dataonX=[];
        this.dataonY=[];
        this.borderColor=[];
        this.backGroundColor=[];
        this.data=res;
        setTimeout(() => {
            this.generateColor(this.data['chartData']);    
        }, 1000);
    }); 
  }

  generateColor(data){
    for(let i=0;i<data.length;i++){
        this.backGroundColor.push('rgba(255, 99, 132, 0.2)');
        this.borderColor.push('rgba(255, 99, 132, 0.2)');
        this.dataonX.push(data[i]._id);
        this.dataonY.push(data[i].sum);
    }
    this.createChart(this.createLabel(this.selectedType));
  }

    createChart(label){
        let isAvailable=document.getElementsByClassName('opened');
        if (isAvailable.length>0){
            document.getElementById('myChart').classList.remove('opened');
            this.myChart.destroy();
        }
        this.myChart = new Chart("myChart", {
            type: 'bar',
            data: {
                labels: this.dataonX,
                datasets: [{
                    label: label,
                    data: this.dataonY,
                    backgroundColor: this.backGroundColor,
                    borderColor: this.borderColor,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        document.getElementById('myChart').classList.add('opened');
    }

    createLabel(typeOfChart){
        switch (typeOfChart) {
            case 'byMonth':
                return 'Data by Month for the year '+this.selectedYear+'-'+this.selectedMonth;
            case 'byPartyYearwise':
                return 'Data by Year-'+this.selectedYear+' : '+this.gstdetailslistid['name'];
            case 'bySelectedPartyYearwise':
                return 'Data by Year for Selected Parties for the year : '+this.selectedYear;
                
        }

    }
    
}
