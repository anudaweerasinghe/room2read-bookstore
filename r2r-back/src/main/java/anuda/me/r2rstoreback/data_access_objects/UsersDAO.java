package anuda.me.r2rstoreback.data_access_objects;

import anuda.me.r2rstoreback.models.db_models.Users;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface UsersDAO extends CrudRepository<Users,Long> {

    Users findByUname(String uname);

}
