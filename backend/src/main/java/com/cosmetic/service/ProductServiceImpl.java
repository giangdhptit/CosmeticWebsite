package com.cosmetic.service;


import com.cosmetic.model.Category;
import com.cosmetic.model.Product;
import com.cosmetic.model.ResObject;
import com.cosmetic.repository.ProductRepository;
import com.cosmetic.response.GetProductResponse;
import com.cosmetic.request.SaveProductRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository ProductRepository;

    @Override
    public List<Product> getAllProducts() {
        List<Product> ProductList = ProductRepository.findAll();

        return ProductList;
    }

    @Override
    public Category getAllProductsCategory() {
        List<Product> ProductList = ProductRepository.findAll();
        Product pr = ProductList.get(0);
        Category cat_ = pr.getCategory();
        return cat_;
    }

    @Override
    public ResponseEntity<ResObject> getProduct(int Product_id) {
        Product foundProduct = ProductRepository.find(Product_id);
        Category cat_ = foundProduct.getCategory();
        int category_id = cat_.getId();
        GetProductResponse data = new GetProductResponse();
        data.setName(foundProduct.getName());
        data.setCategory_id(category_id);
        data.setDescription(foundProduct.getDescription());
        data.setCost(foundProduct.getCost());
        data.setSelling_price(foundProduct.getSelling_price());
        data.setPhoto_name(foundProduct.getPhoto_name());

            if (foundProduct!=null){
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResObject("ok","succeeded",data)
                );
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResObject("false", "Cannot find " + Product_id, "")
                );
            }

    }

    @Override
    public ResponseEntity<ResObject> saveProduct(Product Product) {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResObject("ok","succeeded", ProductRepository.save(Product))
        );
    }


    @Override
    public ResponseEntity<ResObject> updateProduct(int Product_id, SaveProductRequest req) {
        DateFormat dateFormatYMD = new SimpleDateFormat("MM/dd/yyyy");
//        System.out.println("req"+req.getPublishing_day());
//       String pd = dateFormatYMD.format(req.getPublishing_day());
//       System.out.println("pd"+pd);

        Product newProduct = new Product();
        newProduct.setId(Product_id);
        newProduct.setName(req.getName());
        newProduct.setCost(req.getCost());
        newProduct.setSelling_price(req.getSelling_price());

        newProduct.setCategory(req.getCategory());
        newProduct.setDescription(req.getDescription());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResObject("ok","succeeded", ProductRepository.save(newProduct))
            );
    }

    @Override
    public ResponseEntity<ResObject> deleteProduct(int Product_id) {
        Optional<Product> foundProduct = ProductRepository.findById(Product_id);
        if (foundProduct!=null){
            ProductRepository.deleteById(Product_id);
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
