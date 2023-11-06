import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private httpObj: any = {
    type: '',
    url: '',
    options: Object
  };
  constructor(private http: HttpClient) { }

  documentPathUrl="https://demo.mahamining.com/"//demo
  //documentPathUrl="https://mahakhanij.maharashtra.gov.in/"//Prod

  getBaseurl(url: string) {
    switch (url) {
      // Base url use for  developement

      case 'mpDssBaseUrl': return 'https://mp-dss-api.mahamining.com/'; break;

      case 'masterUrl': return 'https://awsmaster.mahamining.com/master/'; break;
      case 'mineralMappingUrl': return 'https://awsapi.mahamining.com/mineral-mapping/'; break;
      case 'mineralProjectUrl': return 'https://awsmineral-project.mahamining.com/mineral-project/'; break;
      case 'accountingUrl': return 'https://awsaccounting-api.mahamining.com/mining-accounting/'; break;
      case 'vehicleTrackingUrl': return 'https://awsvehicletracking.mahamining.com/vehicle-tracking/'; break;
      case 'trackOrderUrl': return 'https://awsvehicletracking.mahamining.com/vehicle-tracking/tracking/'; break;


      //live
      // case 'masterUrl': return 'https://mahakhanij.maharashtra.gov.in/master/'; break;
      // case 'mineralMappingUrl': return 'https://mahakhanij.maharashtra.gov.in/mineral-mapping/'; break;
      // case 'mineralProjectUrl': return 'https://mahakhanij.maharashtra.gov.in/mineral-project/'; break;
      // case 'accountingUrl': return 'https://mahakhanij.maharashtra.gov.in/mining-accounting/'; break;
      // case 'vehicleTrackingUrl': return 'https://mahakhanij.maharashtra.gov.in/vehicle-tracking/'; break;
      // case 'trackOrderUrl': return 'https://mahakhanij.maharashtra.gov.in/vehicle-tracking/tracking/'; break;

      default: return ''; break;
    }
  }

  getHttp(): any {
    !this.httpObj.options.body && (delete this.httpObj.options.body)
    !this.httpObj.options.params && (delete this.httpObj.options.params)
    return this.http.request(this.httpObj.type, this.httpObj.url, this.httpObj.options);
  }

  setHttp(type: string, url: string, isHeader: Boolean, obj: any, params: any, baseUrl: any) {
    try {
      // this.userObj = this.webStorage.getLoginData();
    } catch (e) { }
    this.clearHttp();
    this.httpObj.type = type;
    this.httpObj.url = this.getBaseurl(baseUrl) + url;
    if (isHeader) {
      let tempObj: any = {
        // "Authorization": "Bearer " + this.userObj.jwtAuthResult.accessToken // token set
        'Content-Type': 'application/json'
      };
      this.httpObj.options.headers = new HttpHeaders(tempObj);
    }

    obj !== false ? this.httpObj.options.body = obj : this.httpObj.options.body = false;
    params !== false ? this.httpObj.options.params = params : this.httpObj.options.params = false;
  }

  clearHttp() {
    this.httpObj.type = '';
    this.httpObj.url = '';
    this.httpObj.options = {};
  }
}
