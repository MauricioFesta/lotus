
pub mod cassandra{
    pub mod connect;
    pub mod queries;
}


#[rustler::nif]
pub fn add(a: i64, b: i64) -> i64 {
    a + b
}

#[rustler::nif]
pub fn get_value(){
  
    cassandra::connect::main();
    
    
}


rustler::init!("Elixir.LotusRust.Back", [add, get_value]);
