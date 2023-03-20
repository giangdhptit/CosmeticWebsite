package com.cosmetic.repository;



import com.cosmetic.model.Order;
import com.cosmetic.model.OrderQuantity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderQuantityRepository extends JpaRepository<OrderQuantity, Integer> {
   //Order findById(int );
//    @Query(value="SELECT * FROM tblOrders WHERE tblOrders.id = id",nativeQuery = true)
//    Order findById(@Param("id") int Order_id);
//   @Query(value="SELECT * FROM tblorders WHERE tblorders.id = :id",nativeQuery = true)
//   Order find(@Param("id") int id);
    @Query(value="SELECT * FROM tblorderquantity " +
            " WHERE tblorderquantity.order_id = :id",nativeQuery = true)
    List<OrderQuantity> find(@Param("id") int id);
}
