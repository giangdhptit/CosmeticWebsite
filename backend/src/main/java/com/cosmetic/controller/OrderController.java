package com.cosmetic.controller;

import com.cosmetic.model.Order;
import com.cosmetic.model.OrderQuantity;
import com.cosmetic.model.ResObject;
import com.cosmetic.request.AddOrderRequest;
import com.cosmetic.service.OrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLConnection;
import java.time.LocalDate;
import java.util.List;


@CrossOrigin
@RestController
@RequestMapping(path = "")
public class OrderController {
    @Autowired
    private OrderServiceImpl OrderServiceImpl;

    @Autowired
    private static final String EXTERNAL_FILE_PATH = "src/main/resources/static/item-photos/";

    @GetMapping("/admin/order")
    List<Order> getAllOrders(){
        return OrderServiceImpl.getAllOrders();
    }

    @GetMapping("/admin/order/{Order_id}")
    ResponseEntity<ResObject> getOrder(@PathVariable int Order_id){
        return OrderServiceImpl.getOrder(Order_id);
    }

    @GetMapping("/order-detail/{Order_id}")
    ResponseEntity<ResObject> getOrderQuantity(@PathVariable int Order_id) {
        return OrderServiceImpl.getOrderQuantity(Order_id);
    }


    @PostMapping("/placeOrder" )
    ResponseEntity<ResObject> saveOrder(@RequestBody Order newOrder) throws IOException {
        return OrderServiceImpl.placeOrder(newOrder);
    }

    @PutMapping("/admin/order/update/{id}")
    ResponseEntity<ResObject> addOrder(@PathVariable int id, @RequestParam String status) throws IOException {
        return OrderServiceImpl.saveOrder(id,status);
    }
//    @PostMapping("/add")
//    ResponseEntity<ResObject> addOrder(@RequestParam("photo") MultipartFile file,@RequestBody Order newOrder ) throws IOException {
//
////        Order Order = new Order();
////        Order.setName(name);
////        Order.setCost(cost);
////        Order.setPages(pages);
////        Order.setPublishing_day(publishing_day);
////        Order.setDescription((description));
////        Order.setType(type);
//
//        String uploadDir = EXTERNAL_FILE_PATH + Order.getId();
//        FileUploadUtil.saveFile(uploadDir, file.getOriginalFilename(), file);
//        return OrderServiceImpl.saveOrder(newOrder);
//    }

    @RequestMapping(value="/{id}/{fileName:.+}",produces = MediaType.IMAGE_PNG_VALUE)
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
//    ResponseEntity<ResObject> updateOrder(@RequestParam("photo") MultipartFile file,@PathVariable int id,@RequestParam String title, @RequestParam String description, @RequestParam String author,@RequestParam String publishing_day, @RequestParam String type, @RequestParam int pages ) throws IOException {
//        AddOrderResponse res = new AddOrderResponse();
//        Order Order = new Order();
//        Order.setId(id);
//        Order.setTitle(title);
//        Order.setAuthor(author);
//        Order.setPages(pages);
//        Order.setPublishing_day(publishing_day);
//        Order.setDescription((description));
//        Order.setType(type);
//        Order.setPhoto_name(StringUtils.cleanPath(file.getOriginalFilename()));
//        Order.setPhoto_type(file.getContentType());
//        Order.setPhoto_data(file.getBytes());
//        String uploadDir = EXTERNAL_FILE_PATH + Order.getId();
//        FileUploadUtil.saveFile(uploadDir, file.getOriginalFilename(), file);
//        return OrderServiceImpl.saveOrder(Order);
//    }

    @DeleteMapping("/{id}/delete")
    ResponseEntity<ResObject> deleteOrder(@PathVariable int id){
        return  OrderServiceImpl.deleteOrder(id);
    }
}
