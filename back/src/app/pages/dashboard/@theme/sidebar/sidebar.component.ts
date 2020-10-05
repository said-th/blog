import {Component, OnInit} from '@angular/core';
import {MENU_ITEMS} from '../../menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public menuItems = MENU_ITEMS;
  public collapsedMenu: boolean;
  public menuChild: number;

  constructor() {

  }

  ngOnInit(): void {
    this.collapsedMenu = false;
  }

  toggleCollapse(): void {
    this.collapsedMenu = !this.collapsedMenu;
    this.menuChild = -1;
  }

  toggle(index: number): void {
    this.menuChild = index === this.menuChild ? -1 : index;
  }
}
