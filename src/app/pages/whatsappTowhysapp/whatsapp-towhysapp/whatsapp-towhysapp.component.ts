import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { NgForm } from '@angular/forms';

import { Http, Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { WhatsToWhy } from './whatsToWhy';
import { FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-whatsapp-towhysapp',
  templateUrl: './whatsapp-towhysapp.component.html',
  styleUrls: ['./whatsapp-towhysapp.component.css']
})
export class WhatsappTowhysappComponent implements OnInit {


  public fileFormData = new FormData();
  public uploadFlag = false;
  public contentsentmsg: any;
  public visible: boolean;
  public isDisabled = false;
  public formData = { file: '' };

  public myFormGroup: FormGroup;
  public model: WhatsToWhy;
  public modelSubmitted: WhatsToWhy;
  public submitted = false;
  public response: any;
  public file: string;
  public FName: string;
  public SName: string;
  public suyash;
  fileContent = '';
  public fileString;
  selectedFile = null;
  from = 0;
  to = 1000;
  countOfLines = 0;
  array = [];
  prevNumber = 1;
  public UserName = '';

  constructor(public apiCallservice: ApiCallsService, public router: Router, public handledata: HandleDataService,
    public formBuilder: FormBuilder, public spinner: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      FName: ['', Validators.required],
      UName: ['', Validators.required]
    });
  }

  public testCheck({ value, valid }: { value: WhatsToWhy, valid: boolean }, from = '0', to = '1000'): void {
    this.UserName = value.UName;
    this.spinner.show();
    this.countOfLines = 0;
    this.array = [];
    this.prevNumber = 1;
    this.fileFormData.append('from', from);
    this.fileFormData.append('to', to);
    this.apiCallservice.handleData_Pyhon('textToJSON', 0, this.fileFormData)
      .subscribe((res) => {
        this.suyash = JSON.parse(res['_body']).Data;
        this.countOfLines = JSON.parse(res['_body']).Lines[0].Count;
        this.createDrawer();
        this.spinner.hide();
      });
  }

  createDrawer() {
    for (let i = 1; i <= this.countOfLines; i++) {
      this.array.push({ value: i, selected: false })
    }
    this.array[this.prevNumber - 1]['selected'] = true;
  }
  textMe(data) {
    this.spinner.show();
    this.array[this.prevNumber - 1]['selected'] = false;
    this.array[data - 1]['selected'] = true;
    this.prevNumber = data;
    this.fileFormData = new FormData();
    this.fileFormData.append('file', this.selectedFile);
    this.fileFormData.append('from', ((data * 1000) - 999).toString());
    this.fileFormData.append('to', ((data * 1000)).toString());
    this.apiCallservice.handleData_Pyhon('textToJSON', 0, this.fileFormData)
      .subscribe((res) => {
        this.suyash = JSON.parse(res['_body']).Data;
        setTimeout(() => {

          this.spinner.hide();
        }, 10000);

      });
  }

  incomingFile(file) {
    this.fileFormData = new FormData();
    this.selectedFile = file.target.files[0]
    if (file) {
      this.fileFormData.append('file', file.target.files[0]);

    }
  }



}
