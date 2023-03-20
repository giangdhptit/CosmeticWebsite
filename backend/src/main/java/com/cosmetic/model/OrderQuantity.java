
package com.cosmetic.model;



import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;
@Entity(name="OrderQuantity")
@Table(name="tblorderquantity")
public class OrderQuantity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
//
    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;

//    @ManyToOne
//    @MapsId("productId")
//    @JsonBackReference
//    @JoinColumn(name = "product_id")
//    Product product;
//
//    @ManyToOne
//    @MapsId("orderId")
//    @JsonBackReference
//    @JoinColumn(name = "order_id")
//    Order order;

    @Column(name = "quantity")
    int quantity;

    @Column(name = "price")
    float price;

    public OrderQuantity(int id,Product product, Order order, int quantity) {
        this.id = id;
        this.product = product;
        this.order = order;
        this.quantity = quantity;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public OrderQuantity() {
    }
// standard constructors, getters, and setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}