import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-deview-infinite-app';
  items = [0, 1, 2];
  onAppend() {
    const items = this.items;

    const nextItem = (items[items.length - 1] || 0) + 1;

    this.items = [...items, nextItem];
  }
  trackBy(index: number, item: number): any {
    return item;
  }
}
