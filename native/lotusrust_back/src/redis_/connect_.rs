extern crate redis;

pub fn main() -> redis::Connection {

    let client = redis::Client::open("redis://127.0.0.1/").unwrap();
    let  con = client.get_connection().unwrap();

    con
  
}

