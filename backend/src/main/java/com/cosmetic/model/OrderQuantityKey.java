package com.cosmetic.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class OrderQuantityKey implements Serializable {
    @Column(name = "product_id")
    int productId;

    @Column(name = "order_id")
    int orderId;

}
