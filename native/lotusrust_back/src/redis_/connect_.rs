extern crate redis;
use redis::Commands;

pub fn main() -> redis::Connection {

    let client = redis::Client::open("redis://127.0.0.1/").unwrap();
    let mut con = client.get_connection().unwrap();

    con
  
}

// pub fn main() -> redis::Connection {

//     let client = redis::Client::open("redis://127.0.0.1/").unwrap();
//     let mut con = client.get_connection().unwrap();

//     con
  
// }