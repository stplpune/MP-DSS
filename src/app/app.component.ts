import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/public/header/header.component';
import { FooterComponent } from './layouts/public/footer/footer.component';
import { SidebarComponent } from './layouts/secure/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MAT_DATE_LOCALE } from '@angular/material/core';
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
  title = 'MP-DSS';
}
