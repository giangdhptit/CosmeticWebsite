package com.cosmetic.service;

import com.cosmetic.model.Product;
import com.cosmetic.model.ResObject;
import com.cosmetic.model.User;
import com.cosmetic.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.cosmetic.request.LoginRequest;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository UserRepository;

    @Override
    public List<User> getAllUsers() {
        List<User> UserList = UserRepository.findAll_();
        return UserList;
    }

    @Override
    public ResponseEntity<ResObject> getUser(int User_id) {
        User foundUser = UserRepository.find(User_id);
        if (foundUser!=null){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResObject("ok","succeeded",foundUser)
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResObject("false","Cannot find "+User_id,"")
            );
        }
    }

    @Override
    public ResponseEntity<ResObject> addUser(User user) {
        User foundUser = UserRepository.findByUsername(user.getUsername().trim());
        if (foundUser!=null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResObject("false","User already existed","")
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResObject("ok","succeeded",UserRepository.save(user))
        );
    }

    @Override
    public ResponseEntity<ResObject> saveUser(User user) {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResObject("ok","succeeded", UserRepository.save(user))
        );
    }

    @Override
    public ResponseEntity<ResObject> updateUser(int user_id, User user) {
        Optional<User> foundUser = UserRepository.findById(user_id);
        if (foundUser!=null){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResObject("ok","succeeded",UserRepository.save(user))
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResObject("false","Cannot find "+user_id,"")
            );
        }
    }

    @Override
    public ResponseEntity<ResObject> checkLogin(LoginRequest req) {

        User foundUser = UserRepository.findByUsername(req.getUsername());

        if ((foundUser==null) || (!foundUser.getPassword().equals(req.getPassword()))){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResObject("false","Username or password might be incorrect","")
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResObject("ok","succeeded",foundUser));
    }


    @Override
    public ResponseEntity<ResObject> deleteUser(int id){
        User foundUser = UserRepository.find(id);
        if (foundUser!=null){
            foundUser.setDeleted(1);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResObject("ok","succeeded", UserRepository.save(foundUser)));
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResObject("false","Username or password might be incorrect",""));
        }

    }
}
