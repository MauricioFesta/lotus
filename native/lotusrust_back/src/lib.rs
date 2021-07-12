
pub mod cassandra{
    pub mod vagas;
    pub mod connect;
    
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
pub fn get_list_vagas() -> Vec<String> {

   let vec_vagas = cassandra::vagas::get_vagas_db();

   vec_vagas
   
}



rustler::init!("Elixir.LotusRust.Back", [add, get_filtro_vagas_empresa, get_list_vagas]);
