
pub mod cassandra{
    pub mod vagas_filtros;
}


#[rustler::nif]
pub fn add(a: i64, b: i64) -> i64 {
    a + b
}

#[rustler::nif]
pub fn get_value()  {

   let vec_user = cassandra::vagas_filtros::get_user();

//    vec_user;
   
    println!("{:?}", vec_user);

}


rustler::init!("Elixir.LotusRust.Back", [add, get_value]);
