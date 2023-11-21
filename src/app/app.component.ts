import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/public/header/header.component';
import { FooterComponent } from './layouts/public/footer/footer.component';
import { SidebarComponent } from './layouts/secure/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    HeaderComponent,FooterComponent,
    SidebarComponent,
    HttpClientModule,
    MatDialogModule,
    MatDatepickerModule,
    NgxSpinnerModule,
  ],
 schemas: [CUSTOM_ELEMENTS_SCHEMA],
 providers: [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
  ) {
    this.checkBaseUrl();
    this.setGlobalTitle();
  }

  setGlobalTitle() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd),  // set title dynamic
    ).subscribe(() => {
      var rt = this.getActivatedRoute(this.activatedRoute);
      let titleName = rt?.data._value?.breadcrumb[rt.data?._value?.breadcrumb?.length - 1]?.title;
      rt.data.subscribe(() => {
        this.titleService.setTitle(titleName)
      })
    });
  }

  getActivatedRoute(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getActivatedRoute(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  checkBaseUrl() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        window.scroll(0, 0);
      }
    });
  }
}
