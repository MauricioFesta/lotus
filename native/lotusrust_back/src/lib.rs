pub mod cassandra{
    pub mod connect;
}

#[rustler::nif]
fn add(a: i64, b: i64) -> i64 {
    a + b
}

#[rustler::nif]
fn get_value(a: &str){

    cassandra::connect::main(a)

}


rustler::init!("Elixir.LotusRust.Back", [add, get_value]);
