import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  items = [];
  num = 0;
  start = 0;
  end = 0;
  onAppend() {
    const items = this.items;

    this.items = [...items, ++this.num];
  }
  shuffle() {
    const items = this.items;

    items.sort(() => Math.random() - 0.5);

    this.items = [...items];
  }
  trackBy(index: number, item: any) {
    return item;
  }
}
