
pub mod cassandra{
    pub mod connect;
    pub mod queries;
}


#[rustler::nif]
fn add(a: i64, b: i64) -> i64 {
    a + b
}

#[rustler::nif]
fn get_value(){
  
    cassandra::connect::main()
    // cassandra::connect::create_keyspace()

}


rustler::init!("Elixir.LotusRust.Back", [add, get_value]);
