import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import ImageViewer from 'awesome-image-viewer';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { ExcelPfdDownloadedService } from 'src/app/core/services/excel-pfd-download.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { DirectivesModule } from 'src/app/shared/modules/directives/directives.module';

@Component({
  selector: 'app-ai-toll-vehicle-update',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTabsModule, MatIconModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatPaginatorModule ,NgxImageZoomModule,DirectivesModule,MatSnackBarModule
  ],
  templateUrl: './ai-toll-vehicle-update.component.html',
  providers: [ExcelPfdDownloadedService,CommonMethodsService,ApiService,ErrorsService,DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  styleUrls: ['./ai-toll-vehicle-update.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AiTollVehicleUpdateComponent {

  dataSource: any;
  displayedColumns = ['SrNo', 'VehicleNo', 'LegalIllegal', 'FrontClassName', 'TopClassName', 'LaneNo', 'expand'];
  expandedElement: any | null;
  pageNumber = 1;
  totalRows: any;

  maxDate = new Date()
  districtArray = new Array();
  topCategoryArray = new Array();
  lineArray = new Array(8);

  iscompleted: Number = 0;
  ANPRRemarkArray: any = ["number mismatch (standard)", " number mismatch (not standard)", "number plate not visible", "software error", "ANPR image not found", "vehicle mismatch ", "other"]
  frontTopRemarkArray: any = ['software error', 'Vehicle mismatch', 'other'];
  front_cls_names = ['truck', 'mini_truck', 'container', 'hywa', 'tractor', 'car', 'bus', 'unclassified', 'other', 'not_found', 'image_not_found'];

  filterFrom!: FormGroup;
  updateFrom:any;

  totalVerifiedCountDetails: any;
  editObj: any;

  constructor(private apiService: ApiService,
    public commonService: CommonMethodsService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService,
    private errorService: ErrorsService,
    public Validation:ValidationService,
    private dateAdapter: DateAdapter<Date>,
    private excelPdfDownload:ExcelPfdDownloadedService
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    this.defaultFilterFrom();
    this.bindDistrict(3);
    this.bindTopCategory();
    this.getData();
  }

  defaultFilterFrom() {
    this.filterFrom = this.fb.group({
      from: [new Date()],
      to: [new Date()],
      isCompleted: [''],
      AI_SubCategory: [''],
      FrontClassName: [''],
      Status: [''],
      dist: [''],
      TextSearch: [''],
      Laneid: ['']
    });
    this.defaultFrom();
  }

  defaultFrom() {
    this.updateFrom = this.fb.group({
      VehicleDetected: [''],
      vehicleNumberPlate: [''],
      vehicleNumberDetected: [''],
      vehicleNumberInput: [''],
      vehicleNumberRemark: [''],
      frontViewVehicle: [''],
      vehicleFrontAnalysis: [''],
      vehicleFrontAnalysisType: [''],
      vehicleFrontAnalysisRemark: [''],
      TopVehicleDetected: [''],
      TopAnalysis: [''],
      TopAnalysissubCategoryType: [''],
      TopAnalysisRemark: [''],
      AI_Toll_VerificationRemark: [''],
      anprdllRemark: [''],
      frontdllremark: [''],
      topdllremark: [''],
    })
   // this.updateFrom.controls['AI_Toll_VerificationRemark'].disable();
  }

  bindDistrict(stateId: number) {
    this.apiService.setHttp('GET', 'MP/Master/GetAllDistricts?StateId=' + stateId, false, false, false, 'MPDSSBaseUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == "200") {
          this.districtArray = res.responseData;
          this.districtArray.unshift({ id: 0, district: "All District" });
        } else {
          this.districtArray = [];
          this.errorService.handelError(res.statusCode);
        }
      },
      error: (e: any) => {
        this.districtArray = [];
        this.errorService.handelError(e.status);
      }
    });
  }

  // ----
  bindTopCategory() {
    this.apiService.setHttp('GET', 'MP/monitoring/get-ai-model-subcategory', false, false, false, 'MPDSSBaseUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == "200") {
          this.topCategoryArray = res.responseData;
          this.topCategoryArray.unshift({ id: 0, subCategory: 'Top Class Category' });

        } else {
          this.topCategoryArray = [];
          this.errorService.handelError(res.statusCode);
        }
      },
      error: (e: any) => {
        this.topCategoryArray = []; this.errorService.handelError(e.status);
      }
    });

  }

  getData() {
    this.spinner.show();
    let queryParam = '';
    let fromData = this.filterFrom.value;
    let topClass= fromData.AI_SubCategory == 0 ? '':this.topCategoryArray.find((ele:any)=>ele.id == fromData.AI_SubCategory).subCategory
    queryParam = '?from=' + this.datePipe.transform(fromData.from, 'dd/MM/yyyy')
    queryParam += '&to=' + this.datePipe.transform(fromData.to, 'dd/MM/yyyy') + '&Status=' + fromData.Status + '&pagesize=10&pageno=' + this.pageNumber + "&isCompleted=1&IsReVerified=" + this.iscompleted
    queryParam += '&AI_SubCategory=' + topClass  + '&FrontClassName=' + fromData.FrontClassName + '&Status=' + fromData.Status + '&TextSearch=' + fromData.TextSearch
    if (fromData.dist) { queryParam += '&dist=' + fromData.dist }
    if (fromData.Laneid) { queryParam += '&Laneid=' + fromData.Laneid }
    this.apiService.setHttp('GET', 'MP/monitoring/GetAIModelVerificationTollPlaza' + queryParam, false, false, false, 'MPDSSBaseUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == "200") {
          this.spinner.hide();
          var details = res.responseData.responseData1;
          details.map((ele: any, ind: number) => ele.srNo = (ind + 1 + (this.pageNumber - 1) * 10))
          this.dataSource = new MatTableDataSource(details);
         this.totalRows = res.responseData.responseData2[0].totalCount;
        } else {
          this.spinner.hide();
          this.dataSource = [];
          res.statusCode == 404 ? '' : this.errorService.handelError(res.statusCode);
          this.totalRows = 0;
        }
      },
      error: (e: any) => {
        this.spinner.hide();
        this.dataSource = []; this.totalRows; this.errorService.handelError(e.status);
      }
    });
  }



  pageChanged(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.getData();
  }

  onClickFold(data: any, flag: any) {
    this.editObj = data;
    this.defaultFrom();
    this.updateFrom.patchValue({
      VehicleDetected: data.vehicleDetected == 'No' ? data.vehicleDetected : 'Yes',
      vehicleNumberPlate: data.numberPlateDetected || 'Yes',
      vehicleNumberDetected: data.vehicleNo_Available == 'No' ? data.vehicleNo_Available : 'Yes',
      vehicleNumberInput: data.vehicleNumber || '',
      vehicleNumberRemark: data.numberPlateRemark || '',
      frontViewVehicle: data.frontVehicleDetected || 'Yes',
      vehicleFrontAnalysis: data.frontAnalysis == 'No' ? data.frontAnalysis : 'Yes',
      vehicleFrontAnalysisType: data?.aI_VehicleType || '',
      vehicleFrontAnalysisRemark: data.frontVehicleRemark || '',
      TopVehicleDetected: data.topVehicleDetected || 'Yes',
      TopAnalysis: data.topAnalysis == 'No' ? data.topAnalysis : 'Yes',
      TopAnalysissubCategoryType: data?.aI_SubCategory,
      TopAnalysisRemark: data.topVehicleRemark || '',
      AI_Toll_VerificationRemark: data.aI_Toll_VerificationRemark|| ''
    });


    if (flag == 'Progress') {
      this.updateFrom.getRawValue().vehicleNumberDetected == 'Yes' ? this.updateFrom.get('vehicleNumberInput').disable() : '';
      this.updateFrom.getRawValue().vehicleFrontAnalysis == 'Yes' ? this.updateFrom.get('vehicleFrontAnalysisType').disable() : '';
      this.updateFrom.getRawValue().TopAnalysis == 'Yes' ? this.updateFrom.get('TopAnalysissubCategoryType').disable() : '';
    } else {
      this.updateFrom.get('VehicleDetected').disable();
      this.updateFrom.get('vehicleNumberPlate').disable();
      this.updateFrom.get('vehicleNumberDetected').disable();
      this.updateFrom.get('vehicleNumberInput').disable();
      this.updateFrom.get('vehicleNumberRemark').disable();
      this.updateFrom.get('frontViewVehicle').disable();
      this.updateFrom.get('vehicleFrontAnalysis').disable();
      this.updateFrom.get('vehicleFrontAnalysisType').disable();
      this.updateFrom.get('vehicleFrontAnalysisRemark').disable();
      this.updateFrom.get('TopVehicleDetected').disable();
      this.updateFrom.get('TopAnalysis').disable();
      this.updateFrom.get('TopAnalysissubCategoryType').disable();
      this.updateFrom.get('TopAnalysisRemark').disable();
    }
  }

  saveUpdate(flag:boolean) {
    let formData = this.updateFrom.getRawValue();
    let sendObj = {
      "logId": +this.editObj.logid,
      "aI_Category": this.editObj.aI_Category || '',
      "aI_SubCategory": formData.TopAnalysissubCategoryType,//this.topCategoryArray.find((res: any) => res.id == formData.TopAnalysissubCategoryType).subCategory,
      "createdBy": 1,
      "reasonType": "",
      "numberPlateDetected": formData.vehicleNumberPlate,
      "frontVehicleDetected": formData.frontViewVehicle,
      "topVehicleDetected": formData.TopVehicleDetected,
      "vehicleNumber": formData.vehicleNumberInput,
      "numberPlateRemark": formData.vehicleNumberRemark || '',
      "frontVehicleRemark": formData.vehicleFrontAnalysisRemark || '',
      "topVehicleRemark": formData.TopAnalysisRemark || '',
      "frontAnalysis": formData.vehicleFrontAnalysis,
      "topAnalysis": formData.TopAnalysis,
      "vehicleNo_Available": formData.vehicleNumberDetected,
      "vehicleTypeId": 0,//+this.topCategoryArray.find((res: any) => res.id == formData.TopAnalysissubCategoryType).id,
      "aI_VehicleType": formData.vehicleFrontAnalysisType.toString(),
      "vehicleDetected": formData.VehicleDetected,
      "IsReVerified": flag,
      "aI_Toll_VerificationRemark": formData.AI_Toll_VerificationRemark,
      "isCompleted": flag ? 1 : 0

    }

    if (confirm('Are you sure you want to update this record?')) {//
      this.apiService.setHttp('put', 'MP/monitoring/AICategoryTollPlazzaListReverification', false, sendObj, false, 'MPDSSBaseUrl');
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode == "200") {
            this.commonService.snackBar('AI Category Verified Successfully', 0);
            this.getData();
          } else {
            this.commonService.snackBar(res.statusMessage, 1);
          }
        },
        error: (e: any) => {
          this.errorService.handelError(e.status);
        }
      });
    }
  }


  tabClick(event: any) {
    this.iscompleted = event.index; // [selectedIndex]="tabIndex"
    this.pageNumber = 1;
    this.getData();
  }


  imageType(selObj: any, imageView: any, isPredicateImg: any) {

    return selObj.log_PhotoDetailsModel.find((ele: any) => ele.photoView == imageView && ele.isPredicatesImages == isPredicateImg);
  }

  openImage(data: any, imagePath?: any) {
    let imageArray = [];
    if (imagePath) {
      let obj = {
        mainUrl: imagePath ? imagePath : '',
        thumbnailUrl: imagePath ? imagePath : '',
      }
      imageArray.push(obj)
    } else {
      data.log_PhotoDetailsModel.map((ele: any) => {
        imageArray.push({
          mainUrl: ele.imagePath,
          thumbnailUrl: ele.imagePath,
        })
      })
    }

    new ImageViewer({
      images: imageArray,
      stretchImages: true,
      showThumbnails: imagePath ? false : true,
      isZoomable: false
    })
  }

  // ----------------------- ANPR  check Vehicle Number -----------------------//
  checkVehicleNo(obj: any) {
    if (this.updateFrom.getRawValue().vehicleNumberDetected == 'No') {
      this.updateFrom.get('vehicleNumberInput').enable();
      this.updateFrom.get('vehicleNumberDetected').disable();
    } else {
      this.updateFrom.controls['vehicleNumberInput'].setValue(obj?.vehicle_OriginalNo ? obj?.vehicle_OriginalNo : obj?.vehicleno);
      this.updateFrom.get('vehicleNumberInput').disable();
      this.updateFrom.get('vehicleNumberDetected').enable();
    }
  }

  checkRawNo(obj: any) {
    let rawVehicle = obj?.raw_vehicleno ? obj?.raw_vehicleno : obj?.vehicleNumber;
    this.updateFrom.getRawValue().vehicleNumberInput.toUpperCase() == rawVehicle.toUpperCase() ? (this.updateFrom.controls['vehicleNumberDetected'].setValue('Yes'), this.updateFrom.get('vehicleNumberInput').disable(), this.updateFrom.get('vehicleNumberDetected').enable()) : '';
  }

  setRemark() {
    this.updateFrom.controls['vehicleNumberRemark'].setValue(this.updateFrom.getRawValue().anprdllRemark == 'other' ? '' : this.updateFrom.getRawValue().anprdllRemark);
  }

  //-------------------------------------- check Front Vehicle  AI --------------------------//

  checkFrontClass(obj: any) {
    if (this.updateFrom.getRawValue().vehicleFrontAnalysis == 'No') {
      this.updateFrom.get('vehicleFrontAnalysisType').enable();
      this.updateFrom.get('vehicleFrontAnalysis').disable();
    } else {
      this.updateFrom.controls['vehicleFrontAnalysisType'].setValue(obj?.front_class_name);
      this.updateFrom.get('vehicleFrontAnalysisType').disable();
      this.updateFrom.get('vehicleFrontAnalysis').enable();
    }
  }

  checkRawFrontClass(obj: any) {
    this.updateFrom.getRawValue().vehicleFrontAnalysisType == obj.front_class_name ? (this.updateFrom.controls['vehicleFrontAnalysis'].setValue('Yes'), this.updateFrom.get('vehicleFrontAnalysisType').disable(), this.updateFrom.get('vehicleFrontAnalysis').enable()) : '';
  }
  setFrontRemark() {
    this.updateFrom.controls['vehicleFrontAnalysisRemark'].setValue(this.updateFrom.getRawValue().frontdllremark == 'other' ? '' : this.updateFrom.getRawValue().frontdllremark);
  }
  //-------------------------------------- check Top Vehicle  AI --------------------------//

  checkTopClass(obj: any) {
    if (this.updateFrom.getRawValue().TopAnalysis == 'No') {
      this.updateFrom.get('TopAnalysissubCategoryType').enable();
      this.updateFrom.get('TopAnalysis').disable();
    } else {
      this.updateFrom.controls['TopAnalysissubCategoryType'].setValue(obj?.aiSubCategoryId);
      this.updateFrom.get('TopAnalysissubCategoryType').disable();
      this.updateFrom.get('TopAnalysis').enable();
    }
  }

  checkRawTopClass(obj: any) {
    this.updateFrom.getRawValue().TopAnalysissubCategoryType == obj.aiSubCategoryId ? (this.updateFrom.controls['TopAnalysis'].setValue('Yes'), this.updateFrom.get('TopAnalysissubCategoryType').disable(), this.updateFrom.get('vehicleFrontAnalysis').enable()) : '';
  }

  setTopRemark() {
    this.updateFrom.controls['TopAnalysisRemark'].setValue(this.updateFrom.getRawValue().topdllremark == 'other' ? '' : this.updateFrom.getRawValue().topdllremark);
  }

  enableFrom(){
    this.updateFrom.get('VehicleDetected').enable();
    this.updateFrom.get('vehicleNumberPlate').enable();
    this.updateFrom.get('vehicleNumberDetected').enable();
    this.updateFrom.get('vehicleNumberInput').enable();
    this.updateFrom.get('vehicleNumberRemark').enable();
    this.updateFrom.get('frontViewVehicle').enable();
    this.updateFrom.get('vehicleFrontAnalysis').enable();
    this.updateFrom.get('vehicleFrontAnalysisType').enable();
    this.updateFrom.get('vehicleFrontAnalysisRemark').enable();
    this.updateFrom.get('TopVehicleDetected').enable();
    this.updateFrom.get('TopAnalysis').enable();
    this.updateFrom.get('TopAnalysissubCategoryType').enable();
    this.updateFrom.get('TopAnalysisRemark').enable();
  }

  exportExcel() {
    this.apiService.setHttp('GET', 'MP/monitoring/get-AICategoryReverificationDetails?FromDate=' + this.datePipe.transform(this.filterFrom.value.from, 'yyyy/MM/dd') + '&ToDate=' + this.datePipe.transform(this.filterFrom.value.to, 'yyyy/MM/dd'), false, false, false, 'MPDSSBaseUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == "200") {
          this.downloadExcel(res.responseData);
        } else {

          this.commonService.snackBar('No data found', 1);
        }
      },
      error: (e: any) => {
        this.errorService.handelError(e.status);
      }
    });
  }

  downloadExcel(data?: any) {
    let pageName = 'AI Toll Reverified List';
    let headerData = { fromDate: '18/04/2023', key1: 'Application Types', value1: 'All', key2: 'Minerals',  value2: 'All'}
    let header = ['logid ', 'Date', 'Time', 'Lane No.', 'Vehicle Box Predicted Correctly', 'Vehicle Box Predicted Correctly', 'ANPR Predicted', 'ANPR GT', 'ANPR Class Match', 'Comment ANPR', 'Front Box Predicted Correctly', 'Front Class Predicted', 'Front Class GT', 'Front Class Match', 'Comment Front', 'Top Box Predicted Correctly', 'Top Class Predicted', 'Top Class GT', 'Top Class Match', 'Top Class Match']
    let keys = ['logId', 'date', 'time', 'lane_id', 'vehicle_Box_Predicted_Correctly', 'number_Plate_Box_Predicted_Correctly', 'anpR_Predicted', 'anpR_GT', 'anpR_Predicted_GT', 'comment_ANPR', 'front_Box_Predicted_Correctly', 'front_Class_Predicted', 'front_Class_GT', 'front_Class_Predicted_GT', 'comment_Front', 'top_Box_Predicted_Correctly', 'top_Class_Predicted', 'top_Class_GT', 'top_Class_Predicted_GT', 'comment_Top']
    data.map((ele: any) => {
      ele.date=this.datePipe.transform(ele.date,'dd/MM/yyyy'),
      ele.time=this.datePipe.transform(ele.time,'hh:mm:ss a'),
      ele.lane_id = 'Lane -'+ele.lane_id
    })
    let columnWidth = [15, 15, 25, 25, 25, 25]
    this.excelPdfDownload.generateExcel(header, keys, data, pageName, headerData, columnWidth);
  }
}

