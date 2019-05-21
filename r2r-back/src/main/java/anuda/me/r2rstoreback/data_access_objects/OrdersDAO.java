package anuda.me.r2rstoreback.data_access_objects;

import anuda.me.r2rstoreback.models.db_models.Orders;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface OrdersDAO extends CrudRepository<Orders, Long> {

    List<Orders> findAllByOrderStatus(Integer orderStatus);
    Orders findById(Integer id);

}
