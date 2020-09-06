import {Component} from '@angular/core';
import {TranslationService, AuthenticationService} from '@alfresco/adf-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(translationService: TranslationService,) {
    translationService.use('fr');
  }


}
