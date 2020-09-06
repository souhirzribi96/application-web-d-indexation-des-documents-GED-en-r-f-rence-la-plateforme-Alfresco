import { NgModule } from '@angular/core';

// ADF modules
import { ContentModule } from '@alfresco/adf-content-services';
import { CoreModule } from '@alfresco/adf-core';
import {HttpClient} from "@angular/common/http";

export function modules() {
  return [
      CoreModule,
      ContentModule,
  ];
}

@NgModule({
  imports: modules(),
  exports: modules()
})
export class AdfModule {}
