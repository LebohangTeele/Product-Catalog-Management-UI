import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { CategoryService } from 'src/app/Services/category.service';
import { Product } from 'src/app/Model/product.model';
import { Category } from 'src/app/Model/category.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  search = '';
  selectedCategory = '';
  loading = false;
  error = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts(this.search, this.selectedCategory, 1, 20)
      .subscribe({
        next: products => { this.products = products; this.loading = false; },
        error: err => { this.error = 'Failed to load products'; this.loading = false; }
      });
  }

  loadCategories() {
    this.categoryService.getCategories()
      .subscribe({
        next: cats => this.categories = cats,
        error: err => this.error = 'Failed to load categories'
      });
  }

  onSearch(term: string) {
    this.search = term;
    this.loadProducts();
  }

  onCategoryChange(categoryId: string) {
    this.selectedCategory = categoryId;
    this.loadProducts();
  }

  onDelete(product: Product) {
    if (confirm(`Delete product "${product.name}"?`)) {
      this.productService.deleteProduct(product.id.toString()).subscribe(() => this.loadProducts());
    }
  }

  getCategoryName(categoryId: string): string {
    const cat = this.categories.find(c => String(c.id) === categoryId);
    return cat ? cat.name : '';
  }
}