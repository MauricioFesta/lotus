

pub mod cassandra{
    pub mod main;
    
}

pub mod redis_{
   pub mod vagas_;
   pub mod connect_;
}



#[rustler::nif]
pub fn add(a: i64, b: i64) -> i64 {
    a + b
}


#[tokio::main]
#[rustler::nif]
pub async fn get_filtro_vagas_empresa(ids: std::string::String) -> Vec<std::string::String> {

   let vec_vagas = cassandra::main::Db::new().get_filtro_vagas_empresa_db(ids).await;
 
   vec_vagas
   
}


#[tokio::main]
#[rustler::nif]
pub async fn get_filtro_vagas_ramo(ramo: std::string::String) -> Vec<std::string::String>  {

   let vec_vagas = cassandra::main::Db::new().get_filtro_vagas_ramo_db(ramo).await;
 
   vec_vagas
   
}

#[tokio::main]
#[rustler::nif]
pub async fn get_list_vagas() -> Vec<std::string::String> {

     
   let resp = cassandra::main::Db::new().get_vagas_db().await;

   resp
   
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




rustler::init!("Elixir.LotusRust.Back", [add, get_filtro_vagas_empresa, get_list_vagas, get_filtro_vagas_ramo,get_vagas_cache, set_vagas_cache]);
