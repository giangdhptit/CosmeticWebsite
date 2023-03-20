package com.cosmetic.controller;

import com.cosmetic.config.FileUploadUtil;
import com.cosmetic.model.Category;
import com.cosmetic.model.ResObject;
import com.cosmetic.request.SaveCategoryRequest;
import com.cosmetic.service.CategoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLConnection;
import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "")
public class CategoryController {
    @Autowired
    private CategoryServiceImpl CategoryServiceImpl;

    @Autowired
    private static final String EXTERNAL_FILE_PATH = "src/main/resources/static/item-photos/";

    @GetMapping("/admin/category")
    List<Category> getAllCategories(){
        return CategoryServiceImpl.getAllCategories();
    }
//    @GetMapping("/user/category")
//    List<Category> getAllCategories(){
//        return CategoryServiceImpl.getAllCategories();
//    }
    @GetMapping("/admin/category/{Category_id}")
    ResponseEntity<ResObject> getCategory(@PathVariable int Category_id){
        return CategoryServiceImpl.getCategory(Category_id);
    }
    @CrossOrigin(origins = "http://localhost:3000",methods = RequestMethod.PUT)
    @RequestMapping("/admin/category/{id}/save")
    ResponseEntity<ResObject> saveCategory(@PathVariable int id, @RequestBody SaveCategoryRequest req) throws IOException {
        Category newCategory = new Category();
        if (id!=0) newCategory.setId(id);
        newCategory.setName(req.getName());

        return CategoryServiceImpl.saveCategory(newCategory);
    }
//    @PostMapping("/add")
//    ResponseEntity<ResObject> addCategory(@RequestParam("photo") MultipartFile file,@RequestBody Category newCategory ) throws IOException {
//
////        Category Category = new Category();
////        Category.setName(name);
////        Category.setCost(cost);
////        Category.setPages(pages);
////        Category.setPublishing_day(publishing_day);
////        Category.setDescription((description));
////        Category.setType(type);
//
//        String uploadDir = EXTERNAL_FILE_PATH + Category.getId();
//        FileUploadUtil.saveFile(uploadDir, file.getOriginalFilename(), file);
//        return CategoryServiceImpl.saveCategory(newCategory);
//    }

//    @RequestMapping(value="/{id}/{fileName:.+}",produces = MediaType.IMAGE_PNG_VALUE)
//    public void downloadPDFResource(HttpServletResponse response,
//                                    @PathVariable("fileName") String fileName, @PathVariable("id") String id) throws IOException {
//        File file = new File(EXTERNAL_FILE_PATH+id+"/" + fileName);
//        if (file.exists()) {
//            String mimeType = URLConnection.guessContentTypeFromName(file.getName());
//            if (mimeType == null) {
//                mimeType = "application/octet-stream";
//            }
//            response.setContentType(mimeType);
//            response.setHeader("Content-Disposition", String.format("inline; filename=\"" + file.getName() + "\""));
//            response.setContentLength((int) file.length());
//            InputStream inputStream = new BufferedInputStream(new FileInputStream(file));
//            FileCopyUtils.copy(inputStream, response.getOutputStream());
//
//        }
//    }
//    @PutMapping("/{id}/update")
//    ResponseEntity<ResObject> updateCategory(@RequestParam("photo") MultipartFile file,@PathVariable int id,@RequestParam String title, @RequestParam String description, @RequestParam String author,@RequestParam String publishing_day, @RequestParam String type, @RequestParam int pages ) throws IOException {
//        AddCategoryResponse res = new AddCategoryResponse();
//        Category Category = new Category();
//        Category.setId(id);
//        Category.setTitle(title);
//        Category.setAuthor(author);
//        Category.setPages(pages);
//        Category.setPublishing_day(publishing_day);
//        Category.setDescription((description));
//        Category.setType(type);
//        Category.setPhoto_name(StringUtils.cleanPath(file.getOriginalFilename()));
//        Category.setPhoto_type(file.getContentType());
//        Category.setPhoto_data(file.getBytes());
//        String uploadDir = EXTERNAL_FILE_PATH + Category.getId();
//        FileUploadUtil.saveFile(uploadDir, file.getOriginalFilename(), file);
//        return CategoryServiceImpl.saveCategory(Category);
//    }

    @DeleteMapping("/admin/category/{id}/delete")
    ResponseEntity<ResObject> deleteCategory(@PathVariable int id){
        return  CategoryServiceImpl.deleteCategory(id);
    }
}
