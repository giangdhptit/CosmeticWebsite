package com.cosmetic.service;

import com.cosmetic.model.Order;
import com.cosmetic.model.ResObject;
import com.cosmetic.request.AddOrderRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderService {
    List<Order> getAllOrders();
    ResponseEntity<ResObject> getOrder(int Order_id);
    ResponseEntity<ResObject> getOrderQuantity(int Order_id);
    ResponseEntity<ResObject> placeOrder(Order Order);
    ResponseEntity<ResObject> saveOrder(int id, String status);
    ResponseEntity<ResObject> deleteOrder(int Order_id);
}
