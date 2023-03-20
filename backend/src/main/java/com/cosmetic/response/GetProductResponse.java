package com.cosmetic.response;

import com.cosmetic.model.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetProductResponse {
    private String name;
    private int category_id;
    private float selling_price;
    private float cost;
    private String description;
    private String photo_name;

    public void setPhoto_name(String photo_name) {
        this.photo_name = photo_name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCategory_id(int category_id) {
        this.category_id = category_id;
    }

    public void setSelling_price(float selling_price) {
        this.selling_price = selling_price;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }

    public void setDescription(String description) {
        this.description = description;
    }


}
