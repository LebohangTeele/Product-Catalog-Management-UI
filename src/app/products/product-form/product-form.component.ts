import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { CategoryService } from 'src/app/Services/category.service';
import { Product } from 'src/app/Model/product.model';
import { Category } from 'src/app/Model/category.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  categories: Category[] = [];
  productId?: string;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      sku: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(cats => this.categories = cats);
    this.productId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.productId) {
      this.loading = true;
      this.productService.getmyProduct(this.productId).subscribe({
        next: prod => { this.form.patchValue(prod); this.loading = false; },
        error: err => { this.error = 'Failed to load product'; this.loading = false; }
      });
    }
  }

  submit() {
    debugger;
    if (this.form.invalid) return;
    this.loading = true;
    const prod: Product = { ...this.form.value };
    if (this.productId) {
      this.productService.updateProduct(this.productId, prod).subscribe({
        next: () => this.router.navigate(['/products']),
        error: err => { this.error = 'Failed to update product'; this.loading = false; }
      });
    } else {
      this.productService.addProduct(prod).subscribe({
        next: () => this.router.navigate(['/products']),
        error: err => { this.error = 'Failed to add product'; this.loading = false; }
      });
    }
  }
}