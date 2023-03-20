package com.cosmetic.request;

import com.cosmetic.model.OrderQuantity;
import com.cosmetic.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddOrderRequest {
    private String status;
    private String order_date;
    private User user;
    private Set<OrderQuantity> oQ;
}
