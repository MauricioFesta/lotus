
pub mod cassandra{
    pub mod vagas_filtros;
    pub mod connect;
    
}


#[rustler::nif]
pub fn add(a: i64, b: i64) -> i64 {
    a + b
}


#[rustler::nif]
pub fn get_value() -> Vec<String>  {

   let vec_user = cassandra::vagas_filtros::get_user();
 
   vec_user
   
}


rustler::init!("Elixir.LotusRust.Back", [add, get_value]);
