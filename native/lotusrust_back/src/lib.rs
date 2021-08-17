use rustc_serialize::json::{self, ToJson, Json};

pub mod cassandra{
    pub mod vagas;
    pub mod connect;
    pub mod user;
    
}

pub mod redis_{
   pub mod vagas_;
   pub mod connect_;
}



pub struct AddMap {
    lhs: i32,
    rhs: i32,
}

   


#[rustler::nif]
pub fn add(a: i64, b: i64) -> i64 {
    a + b
}


#[rustler::nif]
pub fn get_filtro_vagas_empresa(ids: &str) -> Vec<String>  {

   let vec_user = cassandra::vagas::get_filtro_vagas_empresa_db(ids);
 
   vec_user
   
}


#[rustler::nif]
pub fn get_filtro_vagas_ramo(ramo: &str) -> Vec<String>  {

   let vec_user = cassandra::vagas::get_filtro_vagas_ramo_db(ramo);
 
   vec_user
   
}

#[rustler::nif]
pub fn get_list_vagas() -> Vec<String> {

   let vec_vagas = cassandra::vagas::get_vagas_db();

   vec_vagas
   
}

#[rustler::nif]
pub fn update_notificacoes_vencidas() {

   let vec_user = cassandra::user::update_notificacoes_vencidas();


}

#[rustler::nif]
pub fn get_vagas_cache() -> Vec<std::string::String>  {

   let vec_user = redis_::vagas_::get_vagas();

   vec_user

}



#[rustler::nif]
pub fn set_vagas_cache(list: Vec<std::string::String>) -> bool {

   let ret: bool = redis_::vagas_::set_vagas(list);

   ret

}




rustler::init!("Elixir.LotusRust.Back", [add, get_filtro_vagas_empresa, get_list_vagas, get_filtro_vagas_ramo, update_notificacoes_vencidas,get_vagas_cache, set_vagas_cache]);
