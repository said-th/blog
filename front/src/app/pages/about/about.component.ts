import {Component, OnDestroy, OnInit} from '@angular/core';
import {MetaService} from '../../services/meta.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  public html: string;
  private readonly destroy$ = new Subject<void>();

  constructor(private metaService: MetaService) {
  }

  ngOnInit(): void {
    this.metaService.getDetailedMetaData().pipe(takeUntil(this.destroy$)).subscribe(
      metadata => this.html = metadata.about
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
