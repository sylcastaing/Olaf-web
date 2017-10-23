import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-element',
  templateUrl: './nav-element.component.html',
  styleUrls: ['./nav-element.component.scss']
})
export class NavElementComponent {

  @Input()
  public title: string;

  @Input()
  public icon: string;

  @Input()
  public link: string;
}
