import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tiny-card',
  templateUrl: './tiny-card.component.html',
  styleUrls: ['./tiny-card.component.scss']
})
export class TinyCardComponent {

  @Input()
  public icon;

  @Input()
  public title;

  @Input()
  public content;

}
