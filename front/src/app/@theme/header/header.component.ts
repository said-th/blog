import {Component, Input, OnInit} from '@angular/core';
import {Meta} from '../../data/MetaData';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() public meta: Meta;
  @Input() public defaultImage: string;

  public searchForm: FormGroup;
  public isHome: boolean;
  public searchIsOpen: boolean;
  public navIsOpen: boolean;

  constructor(private searchFormBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.meta = {};
    this.searchIsOpen = false;
    this.navIsOpen = false;
    this.searchForm = this.searchFormBuilder.group({
      query: ['', [Validators.required]],
    });
  }

  openSearch(): void {
    this.searchIsOpen = true;
  }

  closeSearch(): void {
    this.searchIsOpen = false;
  }

  openNav(): void {
    this.navIsOpen = true;
  }

  closeNav(): void {
    this.navIsOpen = false;
  }

  get query(): string {
    return this.searchForm.get('query').value;
  }

  set query(q: string) {
    this.searchForm.setValue({query: q});
  }

  search(): void {
    this.closeSearch();
    this.router.navigate(['/blog/search', this.query]);
    this.query = '';
  }


}
