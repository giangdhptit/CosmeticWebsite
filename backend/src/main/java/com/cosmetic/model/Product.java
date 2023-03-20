package com.cosmetic.model;



import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDate;
import java.util.Set;


@Entity(name="Product")
@Table(name="tblproducts")
public class Product implements Serializable {
    @Id
    @Column(name="id")
    @GeneratedValue
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="selling_price")
    private float selling_price;

    @Column(name="cost")
    private float cost;

    public String getPhoto_name() {
        return photo_name;
    }

    public void setPhoto_name(String photo_name) {
        this.photo_name = photo_name;
    }

    @Column(name="photo_name")
    private String photo_name;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;

    @Column(name="description")
    private String description;


    @JsonIgnore
    @OneToMany(mappedBy = "product")
    Set<OrderQuantity> oQ;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getSelling_price() {
        return selling_price;
    }

    public void setSelling_price(float selling_price) {
        this.selling_price = selling_price;
    }

    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }

    public Product(int id, String name, float selling_price, float cost, Category category, String description, Set<OrderQuantity> oQ) {
        this.id = id;
        this.name = name;
        this.selling_price = selling_price;
        this.cost = cost;
        this.category = category;
        this.description = description;
        this.oQ = oQ;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Product(){

    }

    public Set<OrderQuantity> getoQ() {
        return oQ;
    }

    public void setoQ(Set<OrderQuantity> oQ) {
        this.oQ = oQ;
    }
}
