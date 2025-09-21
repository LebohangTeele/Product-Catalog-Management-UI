import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/Model/category.model';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html'
})
export class CategoryFilterComponent {
  @Input() categories: Category[] = [];
  @Output() categoryChange = new EventEmitter<string>();
  onChange(event: any) {
    this.categoryChange.emit(event.target.value);
  }
}