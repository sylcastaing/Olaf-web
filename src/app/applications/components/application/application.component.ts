import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {

  @Input()
  public url: string;

  @Input()
  public title: string;

  @Input()
  public image: string;

  @Input()
  public imgAlt: string;
}
