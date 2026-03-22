import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-buttom-top',
  templateUrl: './buttom-top.component.html',
  styleUrls: ['./buttom-top.component.scss'],
})
export class ButtomTopComponent {
  @Output() scrollToTop = new EventEmitter<void>();

  onScrollToTop(): void {
    this.scrollToTop.emit();
  }
}
