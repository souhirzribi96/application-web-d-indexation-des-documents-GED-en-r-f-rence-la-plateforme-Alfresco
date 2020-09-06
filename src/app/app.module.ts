import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';


// ADF modules
import { CoreModule } from '@alfresco/adf-core';
import { AdfModule  } from './adf.module';
import { ContentModule } from '@alfresco/adf-content-services';

// App components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DocumentlistComponent } from './documentlist/documentlist.component';
import {CommonModule} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {AlfrescoCustomService} from "./shared/alfresco-custom.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    ContentModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes // ,
      // { enableTracing: true } // <-- debugging purposes only
    ),

    // ADF modules
    AdfModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DocumentlistComponent,
  ],
  providers: [HttpClient,AlfrescoCustomService],
  exports: [
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
