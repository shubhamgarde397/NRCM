import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-turn-book-handler',
  templateUrl: './turn-book-handler.component.html',
  styleUrls: ['./turn-book-handler.component.css']
})
export class TurnBookHandlerComponent implements OnInit {
public nrcmid=0;
  constructor(public sec: HandleDataService, public router: Router,public securit:SecurityCheckService) { }

  ngOnInit() {
    this.nrcmid=this.securit.nrcmid;
  }

  reset() {
    this.sec.resetArray('turnbook');
    this.router.navigate(['Navigation/TURN_BOOK_HANDLER/TurnBookDispHandler']);
  }

}
