import { Component } from '@angular/core';
import { PdfgeneratorService } from './pdfmake-files/pdfgenerator.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser/'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pdfUrl?: SafeResourceUrl;

  constructor(
    private pdfService:PdfgeneratorService,
    private sanitizer:DomSanitizer
  ){
    this.generatePdfUrl();
  }

  generatePdfUrl(){
    this.pdfService.generatePdfUrl({},{},performance.now()).subscribe(
      data => {
        if(data)
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data);
      }
    )
  }
}
