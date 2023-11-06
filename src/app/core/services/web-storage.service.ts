import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import {   Subject } from 'rxjs';
import { CommonMethodsService } from './common-methods.service';
@Injectable({
  providedIn: 'root'
})
export class WebStorageService {

  userTypeId!: number;
  userId!: number | string;
  districtId!: number | string;
  talukaId!: number | string;
  censusId!: number | string;
  consumerId!: number;
  stateId!: number;
  subusertypeid!: number;
  mobileNo !:string;
  vehicleOwnerName!:string;
  userName!:string;
  vehicleOwnerMobileNo!:string;
  vehicleOwnerId!:string;

  secretKey = "8080808080808080";

  constructor(public router:Router,
    private commomMethod:CommonMethodsService) { }
  setuId!:number;

  setLanguage = new Subject();


  checkUserIsLoggedIn() {
    if (sessionStorage.getItem('loggedIn'))
      return true
    else return false
  }

  getLocalStorageData() {
    if (this.checkUserIsLoggedIn() == true) {
      var decryptData = JSON.parse(
        this.commomMethod.decrypt(localStorage['loggedInData'])
      );
      let data = decryptData;
      return data;
    }
  }

  assignLocalStorageData() {
    let id: any = this.getLocalStorageData();
    this.userTypeId = JSON.parse(id).responseData.userTypeId;
    this.userId = JSON.parse(id).responseData[0].id;
    this.userName = JSON.parse(id).responseData[0].name;
    this.consumerId = JSON.parse(id).responseData[0].consumerId;
    this.stateId = JSON.parse(id).responseData[0].stateId;
    this.districtId = JSON.parse(id).responseData[0].districtId;
    this.talukaId = JSON.parse(id).responseData[0].talukaId;
    this.censusId = JSON.parse(id).responseData[0].censusId;
    this.setuId = JSON.parse(id).responseData[0].setuId;
    this.mobileNo = JSON.parse(id).responseData[0].mobileNo1;
    this.vehicleOwnerName = JSON.parse(id).responseData[0].ownerName;
    this.vehicleOwnerMobileNo = JSON.parse(id).responseData[0].ownerMobileNo;
    this.vehicleOwnerId = JSON.parse(id).responseData[0].vehicleOwnerId;
    this.subusertypeid  = JSON.parse(id).responseData[0].subusertypeid; // 18 for Setu / 10 consumer

  }

  getAllPageName() {
    if (this.checkUserIsLoggedIn() == true) {
      let getAllPageName = JSON.parse(this.getLocalStorageData());
      return getAllPageName.responseData2;
    }
  }

  checkDistTalVillage() {
    let data: any = localStorage.getItem('loggedInData');
    var localData = JSON.parse(CryptoJS.AES.decrypt(decodeURIComponent(data), 'secret key 123').toString(CryptoJS.enc.Utf8));
      var  localData = JSON.parse(localData);
    if (localData.responseData[0].districtId == 0 && localData.responseData[0].talukaId == 0 && localData.responseData[0].censusId == 0 ) {
     this.router.navigate(['../consumer-profile']);
      return true
    }else {
      return  false
    }
  }

  createdByProps(creBy?:any,creDate?:any): any {
    this.assignLocalStorageData();
    return {
      "createdBy":creBy ? creBy :this.userId ,
      "createdDate":creDate ? creDate: new Date(),
      "isDeleted": false
    }
  }

  createdByObj(creBy?:any, creDate?:any) {
    this.assignLocalStorageData();
    return {
      "createdBy":creBy ? creBy:this.userId,
      "modifiedBy": this.userId,
      "createdDate":creDate ? creDate: new Date(),
      "modifiedDate": new Date(),
      "isDeleted": false,
    }
  }
}
