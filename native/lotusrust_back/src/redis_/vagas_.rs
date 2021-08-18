extern crate redis;
use redis::Commands;
use redis::Cmd;
use redis::*;


use super::connect_;


pub fn get_vagas() -> Vec<std::string::String> {

    let mut conn: redis::Connection = connect_::main();

    conn.lrange("list_vagas", 0,-1).unwrap()
}

pub fn set_vagas(list: Vec<std::string::String>) -> bool {
   
    let mut conn: redis::Connection = connect_::main();

    conn.del::<String, String>("list_vagas".to_string());

    for i in list {

        let ff : () = conn.lpush("list_vagas", i).unwrap();

    }
    
    true
   
}
