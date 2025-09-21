import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Model/category.model';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html'
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  newCategory: Partial<Category> = { name: '', description: '' };

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(cats => this.categories = cats);
  }

  addCategory() {
    if (this.newCategory.name) {
      this.categoryService.addCategory(this.newCategory as Category)
        .subscribe(() => {
          this.newCategory = { name: '', description: '' };
          this.loadCategories();
        });
    }
  }
}