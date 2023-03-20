package com.cosmetic.service;


import com.cosmetic.model.Product;
import com.cosmetic.model.ResObject;
import com.cosmetic.request.LoginRequest;
import com.cosmetic.model.User;
import com.cosmetic.request.SaveProductRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    ResponseEntity<ResObject> getUser(int User_id);
    ResponseEntity<ResObject> addUser(User user);
    ResponseEntity<ResObject> updateUser(int User_id, User user);
    ResponseEntity<ResObject> checkLogin(LoginRequest req);
    ResponseEntity<ResObject> saveUser(User user);
    ResponseEntity<ResObject> deleteUser(int id);
}
