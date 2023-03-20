package com.cosmetic.controller;

import com.cosmetic.model.ResObject;
import com.cosmetic.model.User;
import com.cosmetic.repository.UserRepository;
import com.cosmetic.request.LoginRequest;
import com.cosmetic.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "")
public class UserController {
    @Autowired
    private UserServiceImpl UserServiceImpl;

    @Autowired
    private UserRepository UserRepository;

    @CrossOrigin
    @PostMapping(value = "/login")
    ResponseEntity<ResObject> checkLogin(@RequestBody LoginRequest req){
        return UserServiceImpl.checkLogin(req);
    }

    @GetMapping("admin/user/getAllUsers")
    List<User> getAllUsers(){
        return UserServiceImpl.getAllUsers();
    }

    @GetMapping("/user/{user_id}")
    ResponseEntity<ResObject> getUser(int user_id){
        return UserServiceImpl.getUser(user_id);
    }

    @PostMapping("/user/add")
    ResponseEntity<ResObject> addUser(@RequestBody User newUser){
        return UserServiceImpl.addUser(newUser);
    }

    @PutMapping("/admin/user/{user_id}/save")
    ResponseEntity<ResObject> updateUser(@PathVariable int user_id, @RequestParam String name,  @RequestParam String username, @RequestParam String role, @RequestParam String dob ){
        User newUser = new User();
        newUser.setId(user_id);
        newUser.setName(name);
        newUser.setUsername(username);
        newUser.setRole(role);
        newUser.setDOB(dob);
        String pw = UserRepository.find(user_id).getPassword();
        newUser.setPassword(pw);
        return UserServiceImpl.saveUser(newUser);
    }

    @GetMapping("/admin/user/{id}/delete")
    ResponseEntity<ResObject> deleteUser(@PathVariable int id){
        return  UserServiceImpl.deleteUser(id);
    }

}
