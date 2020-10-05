import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import * as hljs from 'highlight.js';

@Directive({
  selector: 'code',
})
export class HighlightDirective implements AfterViewInit {

  constructor(private elRef: ElementRef) { }

  ngAfterViewInit() {
    hljs.highlightBlock(this.elRef.nativeElement);
  }

}
