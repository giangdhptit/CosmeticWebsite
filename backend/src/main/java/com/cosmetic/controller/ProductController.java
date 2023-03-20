package com.cosmetic.controller;

import  com.cosmetic.config.FileUploadUtil;
import com.cosmetic.model.Category;
import com.cosmetic.repository.CategoryRepository;
import com.cosmetic.request.SaveProductRequest;
import com.cosmetic.service.ProductServiceImpl;
import com.cosmetic.model.Product;
import com.cosmetic.model.ResObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLConnection;
import java.util.List;


@CrossOrigin
@RestController
@RequestMapping(path = "")
public class ProductController {
    @Autowired
    private ProductServiceImpl ProductServiceImpl;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private static final String EXTERNAL_FILE_PATH = "src/main/resources/static/item-photos/";

    @GetMapping("/admin/product")
    List<Product> getAllProducts(){
        return ProductServiceImpl.getAllProducts();
    }

    @GetMapping("/admin/product/category")
    Category getAllProductsCategory(){
        return ProductServiceImpl.getAllProductsCategory();
    }

    @GetMapping("/admin/product/{Product_id}")
    ResponseEntity<ResObject> getProduct(@PathVariable int Product_id){
        return ProductServiceImpl.getProduct(Product_id);
    }
    @PostMapping("/admin/product/add")
    ResponseEntity<ResObject> addProduct(@RequestParam("photo") MultipartFile file, @RequestParam String name, @RequestParam String description, @RequestParam float cost,@RequestParam float selling_price, @RequestParam int category_id ) throws IOException {
        Product newProduct = new Product();
//        if (id!=0) newProduct.setId(id);
        newProduct.setName(name);
        newProduct.setCost(cost);
        newProduct.setSelling_price(selling_price);
        newProduct.setDescription(description);
        Category category_= categoryRepository.find(category_id);
        newProduct.setCategory(category_);
        newProduct.setPhoto_name(file.getOriginalFilename());
        String uploadDir = EXTERNAL_FILE_PATH + newProduct.getId();
        FileUploadUtil.saveFile(uploadDir, file.getOriginalFilename(), file);
        return ProductServiceImpl.saveProduct(newProduct);
    }
    @PutMapping("/admin/product/{id}/save")
    ResponseEntity<ResObject> saveProduct(@RequestParam("photo") MultipartFile file, @PathVariable int id, @RequestParam String name, @RequestParam String description, @RequestParam float cost,@RequestParam float selling_price, @RequestParam int category_id ) throws IOException {
        Product newProduct = new Product();
        newProduct.setId(id);
        newProduct.setName(name);
        newProduct.setCost(cost);
        newProduct.setSelling_price(selling_price);
        newProduct.setDescription(description);
        Category category_= categoryRepository.find(category_id);
        newProduct.setCategory(category_);
        newProduct.setPhoto_name(file.getOriginalFilename());
        String uploadDir = EXTERNAL_FILE_PATH + newProduct.getId();
        FileUploadUtil.saveFile(uploadDir, file.getOriginalFilename(), file);
        return ProductServiceImpl.saveProduct(newProduct);
    }
//    @PostMapping("/add")
//    ResponseEntity<ResObject> addProduct(@RequestParam("photo") MultipartFile file,@RequestBody Product newproduct ) throws IOException {
//
////        Product Product = new Product();
////        Product.setName(name);
////        Product.setCost(cost);
////        Product.setPages(pages);
////        Product.setPublishing_day(publishing_day);
////        Product.setDescription((description));
////        Product.setType(type);
//
//        String uploadDir = EXTERNAL_FILE_PATH + Product.getId();
//        FileUploadUtil.saveFile(uploadDir, file.getOriginalFilename(), file);
//        return ProductServiceImpl.saveProduct(newproduct);
//    }

    @GetMapping(value="/admin/product/{id}/{fileName:.+}")
    public void downloadPDFResource(HttpServletResponse response,
                                    @PathVariable("fileName") String fileName, @PathVariable("id") String id) throws IOException {
        File file = new File(EXTERNAL_FILE_PATH+id+"/" + fileName);
        if (file.exists()) {
            String mimeType = URLConnection.guessContentTypeFromName(file.getName());
            if (mimeType == null) {
                mimeType = "application/octet-stream";
            }
            response.setContentType(mimeType);
            response.setHeader("Content-Disposition", String.format("inline; filename=\"" + file.getName() + "\""));
            response.setContentLength((int) file.length());
            InputStream inputStream = new BufferedInputStream(new FileInputStream(file));
            FileCopyUtils.copy(inputStream, response.getOutputStream());

        }
    }
//    @PutMapping("/{id}/update")
//    ResponseEntity<ResObject> updateProduct(@RequestParam("photo") MultipartFile file,@PathVariable int id,@RequestParam String title, @RequestParam String description, @RequestParam String author,@RequestParam String publishing_day, @RequestParam String type, @RequestParam int pages ) throws IOException {
//        AddProductResponse res = new AddProductResponse();
//        Product Product = new Product();
//        Product.setId(id);
//        Product.setTitle(title);
//        Product.setAuthor(author);
//        Product.setPages(pages);
//        Product.setPublishing_day(publishing_day);
//        Product.setDescription((description));
//        Product.setType(type);
//        Product.setPhoto_name(StringUtils.cleanPath(file.getOriginalFilename()));
//        Product.setPhoto_type(file.getContentType());
//        Product.setPhoto_data(file.getBytes());
//        String uploadDir = EXTERNAL_FILE_PATH + Product.getId();
//        FileUploadUtil.saveFile(uploadDir, file.getOriginalFilename(), file);
//        return ProductServiceImpl.saveProduct(Product);
//    }

    @DeleteMapping("/admin/product/{id}/delete")
    ResponseEntity<ResObject> deleteProduct(@PathVariable int id){
        return  ProductServiceImpl.deleteProduct(id);
    }
}
