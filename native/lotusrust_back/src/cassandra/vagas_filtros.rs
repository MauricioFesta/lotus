use cdrs::*;
use cdrs_helpers_derive::*;

use maplit::*;

use std::collections::HashMap;

use cdrs::authenticators::StaticPasswordAuthenticator;
use cdrs::cluster::session::{new as new_session, Session};
use cdrs::cluster::{ClusterTcpConfig, NodeTcpConfigBuilder, TcpConnectionPool};
use cdrs::load_balancing::RoundRobin;
use cdrs::query::*;

use cdrs::frame::IntoBytes;
use cdrs::types::from_cdrs::FromCDRSByName;
use cdrs::types::prelude::*;

type CurrentSession = Session<RoundRobin<TcpConnectionPool<StaticPasswordAuthenticator>>>;


#[derive(Clone, Debug, IntoCDRSValue, TryFromRow, PartialEq)]
pub struct RowStruct {
    
    pub email: String,
    pub nome: String,
  
}


impl RowStruct {
    fn into_query_values(self) -> QueryValues {
        query_values!("email" => self.email, "nome" => self.nome)
    }
}

pub fn get_user() -> Vec<RowStruct>  {

    let user = "user";
    let password = "password";
    let auth = StaticPasswordAuthenticator::new(&user, &password);
    let node = NodeTcpConfigBuilder::new("localhost:9042", auth).build();
    let cluster_config = ClusterTcpConfig(vec![node]);
    let no_compression: CurrentSession =

        new_session(&cluster_config, RoundRobin::new()).expect("session should be created");

        let select_struct_cql = "SELECT * FROM lotus_dev.user";

        let rows = no_compression
        .query(select_struct_cql)
        .expect("query")
        .get_body()
        .expect("get body")
        .into_rows()
        .expect("into rows");

        let mut rows_vec = vec![];

        for row in rows {
    
            let my_row: RowStruct = RowStruct::try_from_row(row).expect("into RowStruct");
            rows_vec.push(my_row)
            
        }
       
        rows_vec 
  
}







