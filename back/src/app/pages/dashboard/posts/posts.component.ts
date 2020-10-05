import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class PostsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
