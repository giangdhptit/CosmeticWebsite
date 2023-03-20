package com.cosmetic.service;


import com.cosmetic.model.Category;
import com.cosmetic.model.ResObject;
import com.cosmetic.repository.CategoryRepository;
import com.cosmetic.request.SaveCategoryRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryRepository CategoryRepository;

    @Override
    public List<Category> getAllCategories() {
        List<Category> CategoryList = CategoryRepository.findAll();
        return CategoryList;
    }

    @Override
    public ResponseEntity<ResObject> getCategory(int Category_id) {
        Optional<Category> foundCategory = CategoryRepository.findById(Category_id);
        if (foundCategory!=null){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResObject("ok","succeeded",foundCategory)
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResObject("false","Cannot find "+Category_id,"")
            );
        }
    }

    @Override
    public ResponseEntity<ResObject> saveCategory(Category Category) {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResObject("ok","succeeded", CategoryRepository.save(Category))
        );
    }


    @Override
    public ResponseEntity<ResObject> updateCategory(int Category_id, SaveCategoryRequest req) {
        DateFormat dateFormatYMD = new SimpleDateFormat("MM/dd/yyyy");
//        System.out.println("req"+req.getPublishing_day());
//       String pd = dateFormatYMD.format(req.getPublishing_day());
//       System.out.println("pd"+pd);

        Category newCategory = new Category();
        newCategory.setId(Category_id);
        newCategory.setName(req.getName());

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResObject("ok","succeeded", CategoryRepository.saveAndFlush(newCategory))
            );
    }

    @Override
    public ResponseEntity<ResObject> deleteCategory(int Category_id) {
        Category foundCategory = CategoryRepository.getReferenceById(Category_id);
        if (foundCategory!=null){
            CategoryRepository.delete(foundCategory);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResObject("ok","succeeded","")
            );

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResObject("failed", "failed", "")
            );
        }
    }
}
