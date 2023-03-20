package com.cosmetic.repository;



import com.cosmetic.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
   //Product findById(int );
    @Query(value="SELECT * FROM tblproducts WHERE tblproducts.id = :id",nativeQuery = true)
    Product find(@Param("id") int id);

}
