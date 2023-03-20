package com.cosmetic.response;

import com.cosmetic.model.OrderQuantity;
import com.cosmetic.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetOrderResponse {
    @Column(table = "tblorders",name="id")
    private int id;

    @Column(name = "user_id")
    private User user;

    @Column(table = "tblorderquantity", name="id")
    private List<OrderQuantity> orderQuantities;

    @Column(name="total")
    private float total;

    @Column(name="status")
    private String status;

    @Column(name="order_date")
    private String order_date;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<OrderQuantity> getOrderQuantities() {
        return orderQuantities;
    }

    public void setOrderQuantities(List<OrderQuantity> orderQuantities) {
        this.orderQuantities = orderQuantities;
    }

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

    public String getOrder_date() {
        return order_date;
    }

    public void setOrder_date(String order_date) {
        this.order_date = order_date;
    }
}
