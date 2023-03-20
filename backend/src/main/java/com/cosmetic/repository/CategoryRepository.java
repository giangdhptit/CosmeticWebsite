package com.cosmetic.repository;



import com.cosmetic.model.Category;
import com.cosmetic.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
   //Category findById(int );
//    @Query(value="SELECT * FROM tblCategorys WHERE tblCategorys.id = id",nativeQuery = true)
//    Category findById(@Param("id") int Category_id);
   @Query(value="SELECT * FROM tblcategories WHERE tblcategories.id = :id",nativeQuery = true)
   Category find(@Param("id") int id);
}
