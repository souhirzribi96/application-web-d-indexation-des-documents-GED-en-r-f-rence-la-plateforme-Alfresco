import {Component, ViewChild, Input, AfterViewChecked, Optional} from '@angular/core';
import {AlfrescoApiService, DataColumn, DataRow} from '@alfresco/adf-core';
import {DocumentListComponent, DocumentListService} from '@alfresco/adf-content-services';
import {AlfrescoCustomService} from "../shared/alfresco-custom.service";
import {ActivatedRoute, Router} from '@angular/router';
import {INDEXED, NON_INDEXED, WORKDIR} from "../app.constant";

@Component({
  selector: 'app-documentlist',
  templateUrl: './documentlist.component.html',
  styleUrls: ['./documentlist.component.css']
})
export class DocumentlistComponent implements AfterViewChecked {
  myroot: any;
  INDEXEDnodeId: any;
  @Input()
  showViewer: boolean = false;
  nodeId: string = null;

  @ViewChild('documentList')
  documentList: DocumentListComponent;

  @ViewChild('viewPdf')
  viewPdf: any;

  indexes = [];
  index = {type: '',num:''};

  constructor(private alfrescoJsApi: AlfrescoApiService,
              private alfrescoCustomService: AlfrescoCustomService,
              private router: Router,
              private documentListService: DocumentListService,
              @Optional() private route: ActivatedRoute,
  ) {
    //a l'ouverture de l'interface on donne le path d'intialiation WORKDIR dans constant pour obtient le nodeRef
    this.alfrescoCustomService.getFolderInSiteFromPath(WORKDIR).subscribe((result: any) => {
      let WORKDIRNodeId = result.parent.nodeRef.substring(24);
      //création une repertoire dans WORKDIRNodeId de nom INDEXED et on enregistre nodeRef du rep crée
      this.alfrescoCustomService.mkdir(INDEXED, WORKDIRNodeId).subscribe((result: any) => {
        this.INDEXEDnodeId = result.nodeRefs[0].substring(result.nodeRefs[0].indexOf("SpacesStore") + 12)
      });
      //création une repertoire dans WORKDIRNodeId de nom NON_INDEXED
      this.alfrescoCustomService.mkdir(NON_INDEXED, WORKDIRNodeId).subscribe((result: any) => {

      })
    });

    //  va prendre le path du fichier app..constante et va nous fournir le nodeRef du root
    this.alfrescoCustomService.getFolderInSiteFromPath(WORKDIR + NON_INDEXED).subscribe((result: any) => {

        this.route.params.forEach((params:any) => {
          if (params.id) {

            this.myroot = params.id;
          }else {
            this.myroot = result.parent.nodeRef.substring(24);
          }
        });

    });

  }

  //pour connaitre les informations du root
  ngOnInit() {
    this.alfrescoJsApi.nodesApi.getNodeChildren('-root-').then(function (data) {
      console.log('This node info');
      console.log(data);
    }, function (error) {
      console.log('This node does not exist');
    });
  }

//associe a chaque repertoire ou document son nomh dans le compsant documentlit
  getNodeNameTooltip(row: DataRow, col: DataColumn): string {
    if (row) {
      return row.getValue('name');
    }
    return null;
  }

  move() {

    // getNode avec opts nous fornir quelque information sur la node
    // opts nous ajoute des information sur le path

    //on consulte le path du pdf et on coupe a partir du position (NON_INDEXED) plus son longeur
    //creation rep du nom path trouver dans nodeRef du rep INDEXED
    //deplacer pdf dans dans nouvelle nodeRef du rep créer
    var opts = {'include': ["path"]};
    this.alfrescoJsApi.nodesApi.getNode(this.nodeId, opts).then((result) => {
      var pathrepertoirecreated = result.entry.path.name.substring(result.entry.path.name.indexOf(NON_INDEXED) + 12)
      this.alfrescoCustomService.mkdir(pathrepertoirecreated, this.INDEXEDnodeId).subscribe((result: any) => {
        var finalPathFolderNodeRef = result.nodeRefs[0].substring(result.nodeRefs[0].indexOf("SpacesStore") + 12)
        this.documentListService.moveNode(this.nodeId, finalPathFolderNodeRef).subscribe((result: any) => {
          this.showViewer = false;

        })
      })
    });
  }



  ngAfterViewChecked() {
    // if (this.viewPdf.pdfViewer != undefined && this.cast) {
    //   this.cast = false;
    //   setTimeout(() => {
    //     this.viewPdf.showThumbnails = true;
    //   }, 1000);
    // }
  }

//pour afficher document
  showPreview(event) {
    if (event.value.entry.isFile) {
      this.nodeId = event.value.entry.id;
      this.showViewer = true;
    }
  }

//retourner a la page précedent du page pdf
  onGoBack(event: any) {
    this.showViewer = false;
    this.nodeId = null;

  }

//ajouter indexes du document
  addindex(text) {
      console.log(text)
     this.indexes.push(text);
  }



  onFolderChange($event) {
    this.router.navigate(['/documentlist', $event.value.id]);
  }


}
