package com.cosmetic.model;



import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;


@Entity(name="Order")
@Table(name="tblorders")
public class Order implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @JsonIgnore
    //@JsonManagedReference
    @OneToMany(mappedBy = "order", cascade = CascadeType.PERSIST)
    Set<OrderQuantity> oQ;

    public Order(int id, Set<OrderQuantity> oQ, User user, String order_date, String status) {
        this.id = id;
        this.oQ = oQ;
        this.user = user;
        this.order_date = order_date;
        this.status = status;
    }

    @ManyToOne
    @JoinColumn(name="user_id",nullable = false)
    private User user;

    @Column(name="order_date")
    private String order_date;

    @Column(name="total")
    private float total;

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Column(name="status")
    private String status;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Set<OrderQuantity> getoQ() {
        return oQ;
    }

    public void setoQ(Set<OrderQuantity> oQ) {
        this.oQ = oQ;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getOrder_date() {
        return order_date;
    }

    public void setOrder_date(String order_date) {
        this.order_date = order_date;
    }


    public Order(int id, Set<OrderQuantity> oQ, User user, String order_date, float total, String status) {
        this.id = id;
        this.oQ = oQ;
        this.user = user;
        this.order_date = order_date;
        this.total = total;
        this.status = status;
    }

    public Order(){

    }


}
