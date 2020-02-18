import { Component, OnInit } from '@angular/core';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class informationComponent implements OnInit {

  toggle = true;
  public AUTH;
  constructor(
    public securit: SecurityCheckService) { }

  ngOnInit() {
    this.AUTH = this.securit.AUTH;
  }
}
