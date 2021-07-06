// use cassandra_cpp::*;
// extern crate lotusrust_back;

// let mut cluster = Cluster::default();
// cluster.set_contact_points("localhost").unwrap();
// cluster.set_core_connections_per_host(1).unwrap();
// cluster.set_max_connections_per_host(1).unwrap();    
// cluster.set_queue_size_io(1024).unwrap();
// cluster.set_num_threads_io(4).unwrap();
// cluster.set_connect_timeout(time::Duration::seconds(5));
// cluster.set_load_balance_round_robin();


// pub fn main() -> String {

//         let session = match cluster.connect() {
//             Ok(s) => s,
//             Err(e) => {
//                 eprintln!("error: Failed to connect to Cassandra: {}", e);
//                 exit(1)
//             }
//         }
//     }


pub fn main(msg: &str) { 
    println!(": {}\n", msg); 
}