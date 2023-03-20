package com.cosmetic.request;

import com.cosmetic.model.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveCategoryRequest {
    private String name;

}
