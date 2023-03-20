package com.cosmetic.repository;

import com.cosmetic.model.Product;
import com.cosmetic.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
 
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query(value="SELECT * FROM tblusers WHERE tblusers.id = :id AND tblusers.deleted=0",nativeQuery = true)
    User find(@Param("id") int id);

    @Query(value="SELECT * FROM tblusers WHERE tblusers.username = :username AND tblusers.deleted=0",nativeQuery = true)
    User findByUsername(@Param("username") String username);

    @Query(value="SELECT * FROM tblusers WHERE tblusers.deleted=0",nativeQuery = true)
    List<User> findAll_();
}
