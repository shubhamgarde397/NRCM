import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators, FormsModule } from '@angular/forms';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { SecurityCheckService } from 'src/app/common/services/Data/security-check.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-c2w',
  templateUrl: './c2w.component.html',
  styleUrls: ['./c2w.component.css'],
  providers: [ApiCallsService]
})
export class C2wComponent implements OnInit {
  public myFormGroup: FormGroup;
  public submitted = false;
  public response: any;
  public name: string;
  public data = [];
  public oldData = [];
  public numberr;
  public arrayOfNumbers = [];
  public totalCountOfLines = 0;
  public totalCount = 0;
  public howMany;
  public numberString;
  constructor(public apiCallservice: ApiCallsService, public formBuilder: FormBuilder,
    public securityCheck: SecurityCheckService, public router: Router) { }


  ngOnInit() {
    const passowrd = prompt('Password?');
    if (passowrd !== 'a') { this.router.navigate(['']) }
    this.myFormGroup = this.formBuilder.group({
      MessageS: [''],
      MessageA: ['']
    });
    this.totalCount = parseInt(prompt('Enter total count?'));
    // this.getBasic();
  }

  async get() {
    this.apiCallservice.handleData_New('', 'chats/getChat', 4, 0)
      .subscribe((res: any) => {


        const dataaa = JSON.parse(res);
        dataaa.forEach(element => {
          this.oldData.push(element);
        });
        console.log(this.oldData);

      })


  }

  submit({ value, valid }: { value: { MessageA: '', MessageS: '' }, valid: boolean }) {

    this.submitted = true;
    if (value.MessageA && value.MessageS) {
      alert('Only one message at a time');
      this.myFormGroup.patchValue({ MessageA: '' });
      this.myFormGroup.patchValue({ MessageS: '' });
    } else {
      if (value.MessageA) {
        this.oldData.unshift({ "Name": "Anuja", "Text": value.MessageA });
        this.myFormGroup.patchValue({ MessageA: '' });
        this.myFormGroup.patchValue({ MessageS: '' });
      } else if (value.MessageS) {
        this.oldData.unshift({ "Name": "Shubham", "Text": value.MessageS })
        this.myFormGroup.patchValue({ MessageA: '' });
        this.myFormGroup.patchValue({ MessageS: '' });
      } else {
        alert('Doesnot Exist');
      }

    }
  }
  save() {
    // this.apiCallservice.handleData_New('', 'chats/writeChat', 1, 0, { data: this.oldData })
    //   .subscribe((res) => {
    //     console.log(res);

    //   })
    this.apiCallservice.handleData_New('', 'chats/advanced', 1, 0, { numbers: this.arrayOfNumbers })
      .subscribe((res) => {
        console.log(res);

      })
  }
  numbers() {
    this.arrayOfNumbers.push(parseInt(this.numberr));
    this.totalCountOfLines = this.totalCountOfLines + parseInt(this.numberr);
    console.log(this.totalCount, (this.totalCountOfLines - 5));

    if ((this.totalCountOfLines + 10) === this.totalCount) {
      alert('You are getting closer.')
    }
    this.numberr = '';
  }
  numbersAdv() {
    for (let i = 0; i < this.howMany; i++) {
      this.arrayOfNumbers.push(parseInt(this.numberr));
      this.totalCountOfLines = this.totalCountOfLines + parseInt(this.numberr);
    }


    if ((this.totalCountOfLines + 10) === this.totalCount) {
      alert('You are getting closer.')
    }
    this.numberr = '';
    this.howMany = '';
  }
  numbersAdv2() {
    this.numberString = this.numberString.split('')
    for (let i = 0; i < this.numberString.length; i++) {
      this.arrayOfNumbers.push(parseInt(this.numberString[i]))
      this.totalCountOfLines = this.totalCountOfLines + parseInt(this.numberString[i]);
    }
  }
  refreshAll() {
    this.arrayOfNumbers = [];
    this.oldData = [];
  }

  back() {
    this.submitted = !this.submitted;
  }
}
