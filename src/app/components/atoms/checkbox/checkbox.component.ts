import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface SelectEvent {
  value: string;
  checked: boolean;
}

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() value!: string;
  @Input() isLoading!: boolean;
  @Input() isChecked!: boolean;
  @Output() onChecked: EventEmitter<SelectEvent> = new EventEmitter();

  public check(event: Event) {
    const target = event.target as HTMLInputElement;

    this.onChecked.emit({
      value: this.value,
      checked: target.checked,
    });
  }
}
