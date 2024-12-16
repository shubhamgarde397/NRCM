import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';


@Component({
  selector: 'app-turn-book-add',
  templateUrl: './turn-book-add.component.html',
  styleUrls: ['./turn-book-add.component.css'],
  providers: [ApiCallsService]
})
export class TurnBookAddComponent implements OnInit {
  public turnAdd=[]
  public toAdd=[]
  constructor() {

  }



  ngOnInit() {
  }



//  formatTruckNo(a){
//   a=a.toUpperCase();
// 	let newtruck=[]
// 	let raw=a.replace(/ /g, "");
// 	newtruck.push(raw.slice(0,2))
// 	newtruck.push(raw.slice(2,4))
	
// 	if(raw.length==10){
// 			newtruck.push(' ')
// 			newtruck.push(raw.slice(4,6))	
// 			newtruck.push(' ')
// 			newtruck.push(raw.slice(6,10))	
// 	}
// 	if(raw.length==9){

// 			newtruck.push(' ')
// 			newtruck.push(raw.slice(4,5))	
// 			newtruck.push(' ')
// 			newtruck.push(raw.slice(5,9))	
// 	}
// 	if(raw.length==8){
// 			newtruck.push(' ')
// 			newtruck.push(raw.slice(4,8))	
// 	}
// 	return newtruck.join('')
// }





  // leftRight(LR) {
  //   let tempArray;
  //   let date;
  //   switch (LR) {
  //     case 'back':
  //       tempArray=this.turnbookDate.split('-');
  //       date=new Date(tempArray[0],parseInt(tempArray[1])-1,parseInt(tempArray[2])-1)
  //       this.turnbookDate = this.handlefunction.createDate(date);
  //       break;
  //     case 'ahead':
  //       tempArray=this.turnbookDate.split('-');
  //       date=new Date(tempArray[0],parseInt(tempArray[1])-1,parseInt(tempArray[2])+1)
  //       this.turnbookDate = this.handlefunction.createDate(date);
  //       break;
  //   }
  // }

}

