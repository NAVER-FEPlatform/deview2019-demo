import {
  Component, OnInit, ViewChild, ElementRef,
  Input, Output, EventEmitter, OnDestroy, OnChanges,
  AfterViewInit, AfterViewChecked,
} from '@angular/core';

import VanillaInfinite, { InfiniteOptions } from '@egjs/deview-infinite';

@Component({
  selector: 'ngx-deview-infinite, [NgxDeviewInfinite]',
  template: `
  <ng-template #content><ng-content></ng-content></ng-template>
    <ng-template [ngIf]="elRef.nativeElement.tagName==='NGX-DEVIEW-INFINITE'" [ngIfElse]="noWrapper">
    <div #container>
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </div>
  </ng-template>
  <ng-template #noWrapper>
    <ng-container *ngTemplateOutlet="content"></ng-container>
  </ng-template>
  `,
  styles: []
})
export class NgxDeviewInfiniteComponent
  implements AfterViewInit, AfterViewChecked,
  OnDestroy, OnChanges {

  private infinite!: VanillaInfinite;
  @Input() public items: any[] = [];
  @Input() public options: Partial<InfiniteOptions> = {};
  @Output() public append: EventEmitter<any> = new EventEmitter();
  @ViewChild('container', { static: false }) containerRef: ElementRef;
  private isChange = false;

  constructor(public elRef: ElementRef) { }
  ngOnChanges(changes) {
    const infinite = this.infinite;
    if (!infinite) {
      return;
    }
    this.isChange = true;
  }
  ngAfterViewChecked() {
    if (!this.isChange) {
      return;
    }
    this.isChange = false;
    this.infinite.sync(this.getElements());
  }
  ngAfterViewInit() {
    const ref = this.containerRef || this.elRef;

    this.infinite = new VanillaInfinite(ref.nativeElement, {
      ...this.options,
      renderExternal: true,
    }).on('append', e => {
      this.append.emit({ ...e, currentTarget: this });
    });

    const infinite = this.infinite;

    infinite.sync(this.getElements());
  }
  ngOnDestroy() {
    this.infinite.destroy();
  }

  private getElements() {
    const ref = this.containerRef || this.elRef;

    return [].slice.call(ref.nativeElement.children);
  }
}
