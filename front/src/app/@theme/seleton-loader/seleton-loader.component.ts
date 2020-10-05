import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-seleton-loader',
  template: `
      <div [ngStyle]="styles" class="skelt-load loader" [class]="class"></div>
  `,
  styleUrls: ['./seleton-loader.component.css']
})
export class SeletonLoaderComponent {

  @Input() public width;
  @Input() public height;
  @Input() public circle: boolean;
  @Input() public center: boolean;
  @Input() public class: string;

  constructor() {
  }


  get styles(): any {
    return {
      width: this.width ? this.width : '',
      height: this.height ? this.height : '',
      'border-radius': this.circle ? '50%' : '',
      margin: this.center ? '0 auto' : ''
    };
  }

}
