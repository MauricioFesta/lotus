

pub mod cassandra{
    pub mod main;
    
}

pub mod redis{
   // pub mod vagas_;
   // pub mod connect_;
   pub mod main;
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


#[tokio::main]
#[rustler::nif]
pub async fn get_vagas_cache() -> Vec<std::string::String>  {

   let vec_user = redis::main::Db::new().get_vagas().await;


   match vec_user {

      Ok(vec_user) => vec_user,

      Err(_) => vec!["Lista vazia".to_string()]

   }
   

}


#[tokio::main]
#[rustler::nif]
pub async fn set_vagas_cache(list: Vec<&str>) -> bool {

   // let _clear = redis::main::Db::new().clear_cache().await;

   let ret = redis::main::Db::new().set_vagas(list).await;

   match ret {

      Ok(_ret) => true,

      Err(_) => false,
   }


}

#[tokio::main]
#[rustler::nif]
pub async fn building_cache() -> bool {

   let list = cassandra::main::Db::new().get_vagas_db().await;

   let ret = redis::main::Db::new().reset_cache(list).await;

   match ret {

      Ok(_ret) => true,
      Err(_) => false,
   }

}



rustler::init!("Elixir.LotusRust.Back", [add,building_cache, get_filtro_vagas_empresa, get_list_vagas, get_filtro_vagas_ramo,get_vagas_cache, set_vagas_cache]);
