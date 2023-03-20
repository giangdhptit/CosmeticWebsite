package com.cosmetic.service;


import com.cosmetic.model.Order;
import com.cosmetic.model.OrderQuantity;
import com.cosmetic.model.Product;
import com.cosmetic.model.ResObject;
import com.cosmetic.repository.OrderQuantityRepository;
import com.cosmetic.repository.OrderRepository;
import com.cosmetic.request.AddOrderRequest;
import com.cosmetic.response.GetOrderQuantityResponse;
import com.cosmetic.response.GetOrderResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository OrderRepository;

    @Autowired
    OrderQuantityRepository OrderQuantityRepository;


    @Override
    public List<Order> getAllOrders() {
        List<Order> OrderList = OrderRepository.findAll();
        return OrderList;
    }

    @Override
    public ResponseEntity<ResObject> getOrder(int Order_id) {
        Order foundOrder = OrderRepository.find(Order_id);
//        List<OrderQuantity> oq_ = foundOrder.getOrderQuantities();

        if (foundOrder!=null){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResObject("ok","succeeded",foundOrder)
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResObject("false","Cannot find "+Order_id,"")
            );
        }
    }

    @Override
    public ResponseEntity<ResObject> getOrderQuantity(int Order_id) {
        List<OrderQuantity> foundOrder = OrderQuantityRepository.find(Order_id);
//        Product p = new Product();
        List<GetOrderQuantityResponse> oqResponse= new ArrayList<>();
        for (OrderQuantity order:foundOrder
             ) {
            GetOrderQuantityResponse oq = new GetOrderQuantityResponse();
            oq.setOrder_id(Order_id);
            oq.setQuantity(order.getQuantity());
            oq.setProduct_id(order.getProduct().getId());
            oq.setPrice(order.getPrice());
            oqResponse.add(oq);
        }

        if (foundOrder!=null){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResObject("ok","succeeded",oqResponse)
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResObject("false","Cannot find "+Order_id,"")
            );
        }
    }

    @Override
    public ResponseEntity<ResObject> placeOrder(Order Order) {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResObject("ok","succeeded", OrderRepository.save(Order))
        );
    }

    @Override
    public ResponseEntity<ResObject> saveOrder(int id, String status) {
        Order foundOrder = OrderRepository.find(id);
        foundOrder.setStatus(status);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResObject("ok","succeeded", OrderRepository.save(foundOrder))
        );
    }

//    @Override
//    public ResponseEntity<ResObject> updateOrder(Order order,String newStatus) {
//            order.setStatus(newStatus);
//
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new ResObject("ok","succeeded", OrderRepository.saveAndFlush(order))
//            );
//    }

    @Override
    public ResponseEntity<ResObject> deleteOrder(int Order_id) {
        Order foundOrder = OrderRepository.getReferenceById(Order_id);
        if (foundOrder!=null){
            OrderRepository.delete(foundOrder);
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
