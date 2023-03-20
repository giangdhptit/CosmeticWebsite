package com.cosmetic.repository;



import com.cosmetic.model.Category;
import com.cosmetic.model.Order;
import com.cosmetic.response.GetOrderResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
   //Order findById(int );
//    @Query(value="SELECT * FROM tblOrders WHERE tblOrders.id = id",nativeQuery = true)
//    Order findById(@Param("id") int Order_id);
//   @Query(value="SELECT * FROM tblorders WHERE tblorders.id = :id",nativeQuery = true)
//   Order find(@Param("id") int id);
    @Query(value="SELECT * FROM tblorders " +
            " WHERE tblorders.id = :id",nativeQuery = true)
    Order find(@Param("id") int id);
}
