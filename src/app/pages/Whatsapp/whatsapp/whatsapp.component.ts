import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css']
})
export class WhatsappComponent implements OnInit {
  public contact='';
  constructor() { }

  ngOnInit() {
  }

  sendMsg(){
    this.contact=this.contact===""?'9766707061':this.contact
window.open('https://wa.me/+91'+this.contact+'/?text=Hi','_blank');
  }
  resetMsg(){
    this.contact='';
  }

  sendMultiple(){
    let contacts=['9766707061','9822288257'];
    for (let i=0;i<contacts.length;i++){
      window.open('https://wa.me/+91'+contacts[i]+'/?text=Hi','_self');
    }
  }

}
