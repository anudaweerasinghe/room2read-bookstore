package anuda.me.r2rstoreback.data_access_objects;

import anuda.me.r2rstoreback.models.db_models.Books;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface BooksDAO extends CrudRepository<Books, Long> {

    List<Books> findAll();
    List<Books> findByActiveStatus(Integer activeStatus);

    Books findById(Integer id);

    List<Books> findByActiveStatusAndTrendingStatus(Integer activeStatus, Integer trendingStatus);


    List<Books> findByActiveStatusAndCategoryEquals(Integer activeStatus, String category);


    List<Books> findAllByActiveStatusAndNameContainingOrAuthorContainingOrDetailsContainingOrCategoryEquals(Integer activeStatus, String name, String author, String details, String category);

}
