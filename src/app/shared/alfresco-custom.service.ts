import {Injectable} from '@angular/core';
import {AlfrescoApiService, AuthenticationService} from "@alfresco/adf-core";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';

@Injectable()
export class AlfrescoCustomService {

  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
  }

  getFolderInSiteFromPath(path: string) {
    return this.http.get('/alfresco/s/slingshot/doclib/treenode/node/alfresco/company/home/Sites/'
      + path + '?alf_ticket=' + this.authService.getTicketEcm());
  }

  mkdir(pathToCreate, destinationNodeId) {
    var data = {
      "destination": "workspace://SpacesStore/" + destinationNodeId,
      "paths": [
        pathToCreate
      ]
    }
    return this.http.post('/alfresco/s/slingshot/doclib2/mkdir' + '?alf_ticket='
      + this.authService.getTicketEcm(), data, {responseType: 'text'}).map(this.parseAlfrescoResponce)
      //.catch(this.handleError)
      ;
  }

  // private extractData(res: any) {
  //   var result = JSON.parse(res);
  //   console.log(result)
  //   return result;
  // }

  private parseAlfrescoResponce(res: any) {
// preserve newlines, etc - use valid JSON
    res = res.replace(/\\n/g, "\\n")
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, "\\&")
      .replace(/\\r/g, "\\r")
      .replace(/\\t/g, "\\t")
      .replace(/\\b/g, "\\b")
      .replace(/\\f/g, "\\f");
// remove non-printable and other non-valid JSON chars
    res = res.replace(/[\u0000-\u0019]+/g, "");
    return JSON.parse(res)
  }

  // private handleError(error: any) {
  //   alert('resssss')
  // }

}
