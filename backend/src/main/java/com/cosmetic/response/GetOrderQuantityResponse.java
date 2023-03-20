package com.cosmetic.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetOrderQuantityResponse {

    private int product_id;
    private int quantity;
    private int order_id;
    private float price;

    public void setPrice(float price) {
        this.price = price;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setOrder_id(int order_id) {
        this.order_id = order_id;
    }
}
