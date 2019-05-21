package anuda.me.r2rstoreback.controllers;

import anuda.me.r2rstoreback.data_access_objects.BooksDAO;
import anuda.me.r2rstoreback.data_access_objects.OrdersDAO;
import anuda.me.r2rstoreback.models.api_models.OrderRequest;
import anuda.me.r2rstoreback.models.db_models.Books;
import anuda.me.r2rstoreback.models.db_models.Orders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("store-api")
public class MainController {


    @Autowired
    private BooksDAO booksDAO;


    @Autowired
    private OrdersDAO ordersDAO;

    //Trending Status - 1=trending and 0=not trending
    //Book Active Status - 0 = removed, 1= available, 2 = out of stock due to order

    //Order Active Status - 0 = cancelled, 1 = pending, 2 = completed

    @RequestMapping(value = "get-books", method = RequestMethod.GET)
    public ResponseEntity<?> getAllBooks(){

        try {
            List<Books> booksList = booksDAO.findByActiveStatus(1);

            return new ResponseEntity(booksList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "book-details", method = RequestMethod.GET)
    public ResponseEntity<?> getBookDetails(@RequestParam Integer id){

        try {
            Books book = booksDAO.findById(id);

            return new ResponseEntity(book, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "search", method = RequestMethod.GET)
    public ResponseEntity<?> searchBooks(@RequestParam String query){
        try {
            List<Books> booksList = booksDAO.findAllByActiveStatusAndNameContainingOrAuthorContainingOrDetailsContainingOrCategoryEquals(1,query, query, query, query);

            List<Books> searchResponse = new ArrayList<Books>();

            for(int i=0; i<booksList.size(); i++ ){

                if(booksList.get(i).getActiveStatus()==1){
                    searchResponse.add(booksList.get(i));
                }else{

                }

            }

            return new ResponseEntity(searchResponse, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "categories", method = RequestMethod.GET)
    public ResponseEntity<?> getBooksByCategory(@RequestParam String category){

        try {
            List<Books> booksList = booksDAO.findByActiveStatusAndCategoryEquals(1,category);

            return new ResponseEntity(booksList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "trending", method = RequestMethod.GET)
    public ResponseEntity<?> getTrendingBooks(){
        try {
            List<Books> booksList = booksDAO.findByActiveStatusAndTrendingStatus(1,1);

            return new ResponseEntity(booksList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "order", method = RequestMethod.POST)
    public ResponseEntity<?> makeAnOrder(@RequestBody OrderRequest request){

        Orders order = new Orders();

        order.setBookId(request.getBookId());
        order.setCustomerName(request.getCustomerName());
        order.setCustomerEmail(request.getCustomerEmail());
        order.setCustomerPhone(request.getCustomerPhone());
        order.setOrderStatus(1);

        Books book = booksDAO.findById(request.getBookId());
        order.setPrice(book.getPrice());
        book.setActiveStatus(2);

        try{

            Orders orderSave = ordersDAO.save(order);
            Books bookSave = booksDAO.save(book);

            if(orderSave!=null&&bookSave!=null){
                return new ResponseEntity(HttpStatus.OK);
            }else{
                return new ResponseEntity("Error Completing Order", HttpStatus.INTERNAL_SERVER_ERROR);
            }




        }catch (Exception e){
            return new ResponseEntity(e,HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
