package anuda.me.r2rstoreback.controllers;


import anuda.me.r2rstoreback.data_access_objects.BooksDAO;
import anuda.me.r2rstoreback.data_access_objects.OrdersDAO;
import anuda.me.r2rstoreback.data_access_objects.UsersDAO;
import anuda.me.r2rstoreback.models.api_models.LoginRequest;
import anuda.me.r2rstoreback.models.api_models.NewBookRequest;
import anuda.me.r2rstoreback.models.db_models.Books;
import anuda.me.r2rstoreback.models.db_models.Orders;
import anuda.me.r2rstoreback.models.db_models.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admin-api")
public class AdminController {


    @Autowired
    private UsersDAO usersDAO;

    @Autowired
    private BooksDAO booksDAO;

    @Autowired
    private OrdersDAO ordersDAO;

    @RequestMapping(value = "login", method = RequestMethod.POST)       //login
    public ResponseEntity<?> userVerification(@RequestBody LoginRequest request){

        Users user = usersDAO.findByUname(request.getUname());

        if(user!=null) {
            if (user.getPassword().equals(request.getPassword())) {
                return new ResponseEntity(HttpStatus.OK);
            }else{
                return new ResponseEntity(HttpStatus.UNAUTHORIZED);
            }
        }else{
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

    }


    //Inventory Management Endpoints
    @RequestMapping(value = "get-books", method = RequestMethod.GET)
    public ResponseEntity<?> getAllBooks(){

        try {
            List<Books> booksList = booksDAO.findAll();

            return new ResponseEntity(booksList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "new-book", method = RequestMethod.POST)
    public ResponseEntity<?> addNewBook(@RequestBody NewBookRequest request){

        Books newBook = new Books();

        newBook.setActiveStatus(1);
        newBook.setAuthor(request.getAuthor());
        newBook.setCategory(request.getCategory());
        newBook.setDetails(request.getDetails());
        newBook.setName(request.getName());
        newBook.setPrice(request.getPrice());

        newBook.setPicurl(request.getPicurl());
        newBook.setTrendingStatus(request.getTrendingStatus());

        Books bookSave = booksDAO.save(newBook);

        if(bookSave!=null){
            return new ResponseEntity(HttpStatus.OK);

        }else {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "edit-book", method = RequestMethod.POST)
    public ResponseEntity<?> editListedBook(@RequestBody Books request){

        Books book = booksDAO.findById(request.getId());

        book = request;

        Books bookSave = booksDAO.save(book);

        if(bookSave!=null){
            return new ResponseEntity(book,HttpStatus.OK);
        }else{
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    //Order Management Endpoints

    @RequestMapping(value="get-pending-orders", method = RequestMethod.GET)
    public ResponseEntity<?> getPendingOrders(){

        try {
            List<Orders> ordersList = ordersDAO.findAllByOrderStatus(1);

            return new ResponseEntity(ordersList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value="get-complete-orders", method = RequestMethod.GET)
    public ResponseEntity<?> getCompleteOrders(){

        try {
            List<Orders> ordersList = ordersDAO.findAllByOrderStatus(2);

            return new ResponseEntity(ordersList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value="complete-order", method = RequestMethod.GET)
    public ResponseEntity<?> completeOrder(@RequestParam Integer id){

        Orders order = ordersDAO.findById(id);

        if(order!=null){
            order.setOrderStatus(2);
            Orders orderSave = ordersDAO.save(order);

            if(orderSave!=null){
                return new ResponseEntity(HttpStatus.OK);
            }else{
                return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }else{
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

    }

    @RequestMapping(value="cancel-order", method = RequestMethod.GET)
    public ResponseEntity<?> cancelOrder(@RequestParam Integer id){

        Orders order = ordersDAO.findById(id);

        if(order!=null){
            order.setOrderStatus(0);
            Orders orderSave = ordersDAO.save(order);
            Books book = booksDAO.findById(order.getBookId());

            book.setActiveStatus(1);

            Books bookSave = booksDAO.save(book);

            if(orderSave!=null&&bookSave!=null){
                return new ResponseEntity(HttpStatus.OK);
            }else{
                return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }else{
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

    }

}
