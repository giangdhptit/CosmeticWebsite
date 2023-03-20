package com.cosmetic.service;

import com.cosmetic.model.Category;
import com.cosmetic.model.Product;
import com.cosmetic.model.ResObject;

import com.cosmetic.request.SaveProductRequest;
import org.json.JSONException;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Category getAllProductsCategory();
    ResponseEntity<ResObject> getProduct(int Product_id) throws JSONException;
    ResponseEntity<ResObject> saveProduct(Product Product);
    ResponseEntity<ResObject> updateProduct(int Product_id, SaveProductRequest Product);
    ResponseEntity<ResObject> deleteProduct(int Product_id);
}
