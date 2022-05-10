import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSingleDateSelectionModel } from '@angular/material/datepicker';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { disableDebugTools } from '@angular/platform-browser';
import { Subscriber } from 'rxjs';
// import { appModel } from './app.component.model';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'formvalid';
  actionBtn : string = 'Submit';
  exform: FormGroup;
  // appdata1 : appModel = new appModel();
  submitted : boolean = false;
  regdata !: any;
  store1: any;
  maxDate: any;
  minDate = new Date();

  constructor(private api: ApiService) {
    console.log(this.maxDate)
  }

  ngOnInit() {
    this.disa();
    this.showitem();
    this.exform = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}$'
        ),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]),
      address: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      date1: new FormControl(null, [
        Validators.required,
      ])
    });
  }


  // saveDetails() {
  //   if(!this.exform.valid) {
  //     this.exform.markAllAsTouched();
  //   }
  // }

  AlphOnly(event: { keyCode: number; preventDefault: () => void }) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  numeric(event: { keyCode: number; preventDefault: () => void }) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  Alphanumeric(event: { keyCode: number; preventDefault: () => void }) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9@.]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  Alphanumericsy(event: { keyCode: number; preventDefault: () => void }) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9, ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  disa(){
    var date:any = new Date();
    var todayDate:any = date.getDate();
    var month:any = date.getMonth() + 2;
    var year:any = date.getFullYear();
    if(todayDate < 10 ){
      todayDate = '0' + todayDate;
    }
    if(month < 10){
      month = '0' + month;
    }
    this.maxDate = year + "-" + month + "-" + todayDate
  }

  additem() {
    if(!this.exform.valid) {
      this.exform.markAllAsTouched();
    }
    if(this.actionBtn=="Submit"){
      if (this.exform.valid) {
        this.api.postReg(this.exform.value).subscribe({
          next: (res) => {
            alert('Item added');
            this.exform.reset();
            this.showitem();
          },
          error: () => {
            alert('something went wrong');
          },
        });
      }
    }else{
      this.updateitem()
    }
  }

  showitem(){
    this.api.getReg()
    .subscribe({
      next: (res) =>{
        this.regdata = res;
      },
      error:(err) => {
        alert("Error while fetching data")
      }
    })
  }

    onEditItem(row : any, i: any){
      this.actionBtn = "Update";
      this.store1 = row.id;
      console.log(this.store1);
      this.exform.controls['name'].setValue(row.name);
      this.exform.controls['email'].setValue(row.email);
      this.exform.controls['phone'].setValue(row.phone);
      this.exform.controls['address'].setValue(row.address);
      this.exform.controls['date1'].setValue(row.date1);
      console.log("testtonmgfod",this.store1,this.exform.value)
      
    }
    updateitem(){ 
      if (this.exform.valid) {
        console.log("testing-=======",this.exform.value,this.store1);
        // this.appdata1.name = this.exform.value.name;
        // this.appdata1.email = this.exform.value.email;
        // this.appdata1.phone = this.exform.value.phone;
        // this.appdata1.address = this.exform.value.address;
        // this.appdata1.date1 = this.exform.value.date1;
        this.api.putReg(this.exform.value,this.store1).subscribe({
        next: (res) => {
          alert("Updated");
          this.exform.reset();
          this.actionBtn = "Submit"
          
        },
        error:()=>{
          alert("Error while updating")
        }
      })
    }
  }

    deleteitem(id:number){
      this.api.delReg(id)
      .subscribe({
        next:(res)=>{
        alert("Item Deleted");
        this.showitem();
      }
    })
    }

  get name() {
    return this.exform.get('name');
  }
  get email() {
    return this.exform.get('email');
  }
  get phone() {
    return this.exform.get('phone');
  }
  get address() {
    return this.exform.get('address');
  }
  get date1() {
    return this.exform.get('date1');
  }
}

console.log(new Date().getMonth() + 1)

