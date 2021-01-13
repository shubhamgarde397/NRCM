import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';

@Component({
  selector: 'app-turn-book-handler',
  templateUrl: './turn-book-handler.component.html',
  styleUrls: ['./turn-book-handler.component.css']
})
export class TurnBookHandlerComponent implements OnInit {

  constructor(public sec: HandleDataService, public router: Router) { }

  ngOnInit() {
  }

  reset() {
    this.sec.resetArray('turnbook');
    this.router.navigate(['Navigation/TURN_BOOK_HANDLER/TurnBookDispHandler']);
  }

}
