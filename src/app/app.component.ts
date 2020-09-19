import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public defaultValue: string = "";
  public priviewhtml: string;
  @ViewChild('priview') priview: ElementRef;
  @ViewChild('markdown') markdown: ElementRef;


  constructor () { }

  onValueChange(event) {
    this.priviewhtml = event.html;
    this.priview.nativeElement.innerHTML = event.html;
    this.markdown.nativeElement.innerHTML = event.input;
  }
}
