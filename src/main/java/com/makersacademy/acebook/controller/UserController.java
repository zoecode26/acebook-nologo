package com.makersacademy.acebook.controller;

import com.makersacademy.acebook.dao.UserDAO;
import com.makersacademy.acebook.model.FileUploadUtil;
import com.makersacademy.acebook.model.User;
import com.makersacademy.acebook.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;



import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Controller
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserDAO userDAO;

    @GetMapping("/login")
    // GET with no params, just shows you the form on the /login page
    public String showLoginForm(){
        // returns the view named 'login'
        return "login";
    }

    @GetMapping("/register")
    public String registerForm(Model model){
        model.addAttribute("users", new User());
        return "register";
    }


    @PostMapping("/register")
    public String registerMember(@Valid User user, Model model, @RequestParam("image") MultipartFile multipartFile) throws IOException{
        String email = user.getEmail();
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        if (userDAO.findByEmail(email) != null){
            model.addAttribute("exist",true);
            return "register";
        }

        user.setPhotos(fileName);
        User savedUser = userService.createUser(user);
        String uploadDir = "user-photos/" + savedUser.getId();
        FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);



        model.addAttribute("success", true);
        return "login";
    }
//    @PostMapping("/register")
//    public RedirectView saveUser(User user,
//                                 @RequestParam("image") MultipartFile multipartFile) throws IOException {
//
//        String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));
//        user.setPhotos(fileName);
//
//        User savedUser = userDAO.save(user);
//
//        String uploadDir = "user-photos/" + savedUser.getId();
//
//        FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
//
//        return new RedirectView("/login", true);
//    }





}
