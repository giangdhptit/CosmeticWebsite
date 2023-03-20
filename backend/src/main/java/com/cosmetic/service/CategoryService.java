package com.cosmetic.service;

import com.cosmetic.model.Category;
import com.cosmetic.model.ResObject;
import com.cosmetic.request.SaveCategoryRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories();
    ResponseEntity<ResObject> getCategory(int Category_id);
    ResponseEntity<ResObject> saveCategory(Category Category);
    ResponseEntity<ResObject> updateCategory(int Category_id, SaveCategoryRequest Category);
    ResponseEntity<ResObject> deleteCategory(int Category_id);
}
