import {
  Component, ViewChild, ElementRef,
  Input, Output, EventEmitter, OnDestroy, OnChanges,
  AfterViewInit, AfterViewChecked,
} from '@angular/core';

import VanillaRecycle, { RecycleOptions } from '@egjs/deview-recycle';

@Component({
  selector: 'ngx-deview-recycle, [NgxDeviewRecycle]',
  template: `
  <ng-template #content><ng-content></ng-content></ng-template>
    <ng-template [ngIf]="elRef.nativeElement.tagName==='NGX-DEVIEW-RECYCLE'" [ngIfElse]="noWrapper">
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
export class NgxDeviewRecycleComponent
  implements AfterViewInit, AfterViewChecked,
  OnDestroy, OnChanges {

  public visibleItems: any[] = [];
  @Input() public getKey: (e: any) => any = (item => item);
  @Input() public items: any[] = [];
  @Input() public options: Partial<RecycleOptions> = {};
  @Output() public append: EventEmitter<any> = new EventEmitter();
  @Output() public visibleChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('container', { static: false }) containerRef: ElementRef;
  private recycle!: VanillaRecycle;
  private isChange = false;

  constructor(public elRef: ElementRef) { }
  ngOnChanges() {
    const recycle = this.recycle;
    if (!recycle) {
      return;
    }
    this.updateVisibleItems();
  }
  updateVisibleItems() {
    const trackBy = this.getKey;
    const items = this.items;
    const itemKeys = items.map(item => trackBy(item));

    this.recycle.beforeSync(itemKeys);
    const indexes = this.recycle.getRenderingIndexes();

    this.visibleItems = items.slice(indexes.start, indexes.end + 1);
    this.isChange = true;
  }
  ngAfterViewChecked() {
    if (!this.isChange) {
      return;
    }
    this.isChange = false;
    this.recycle.sync(this.getElements());
  }
  ngAfterViewInit() {
    const ref = this.containerRef || this.elRef;

    this.recycle = new VanillaRecycle(ref.nativeElement, {
      ...this.options,
      renderExternal: true,
    }).on('append', e => {
      this.append.emit({ ...e, currentTarget: this });
    }).on('visibleChange', e => {
      setTimeout(() => {
        this.visibleChange.emit({ ...e, currentTarget: this });
        this.updateVisibleItems();
      });
    });

    const recycle = this.recycle;

    recycle.sync(this.getElements());
  }
  ngOnDestroy() {
    this.recycle.destroy();
  }

  private getElements() {
    const ref = this.containerRef || this.elRef;

    return [].slice.call(ref.nativeElement.children);
  }
}
