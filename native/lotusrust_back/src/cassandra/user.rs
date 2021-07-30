use cdrs::*;
use cdrs_helpers_derive::*;
use cdrs::query::*;
use cdrs::frame::IntoBytes;

pub use cdrs::consistency::Consistency;
pub use cdrs::types::udt::UDT;

pub use cdrs::types::from_cdrs::FromCDRSByName;
pub use cdrs::types::{IntoRustByIndex, IntoRustByName};
pub use cdrs::types::value::{Bytes, Value};
pub use cdrs::types::prelude::*;
use chrono::*;
use std::str::*;


use rustc_serialize::json::{self, ToJson, Json};


use uuid::Uuid;
use super::connect;


#[derive(RustcDecodable, RustcEncodable,Clone, Debug, IntoCDRSValue, TryFromRow, PartialEq)]
pub struct RowStructUser {
    pub id: String,
    pub notificacoes: Vec<String>
  
}

#[derive(RustcDecodable, RustcEncodable)]
pub struct Notificacao  {
    notify: String,
    id: String,
    date: String
  
}

#[derive(RustcDecodable, RustcEncodable,Clone, Debug, IntoCDRSValue, TryFromRow, PartialEq)]
pub struct RowStructUpdateList {
   
    pub notificacoes: Vec<String>
  
}



pub fn update_notificacoes_vencidas()  {

    let no_compression = connect::conn();

    let select_struct_cql =  format!("SELECT * FROM lotus_dev.user ALLOW FILTERING");

        let rows = no_compression
        .query(select_struct_cql)
        .expect("query")
        .get_body()
        .expect("get body")
        .into_rows()
        .expect("into rows");


        for row in rows {
    
            let my_row: RowStructUser = RowStructUser::try_from_row(row).expect("into RowStruct user");

            if !&my_row.notificacoes.is_empty() {

                let mut new_vec = Vec::new();

                for notify_arr in &my_row.notificacoes{

                    let json_str: &str = &notify_arr;

                    let decoded: Notificacao = json::decode(json_str).unwrap();

                    let date_now = Local::now();

                    let mut date_str = String::from(&date_now.to_string());
                        
                    let beta_offset = date_str.find(' ').unwrap_or(date_str.len());
                        
                    date_str.replace_range(beta_offset.., "");
                    
                    if decoded.date == date_str {

                        new_vec.push(json::encode(&decoded).unwrap());
                    }
                            

                }

                insert_new_notify(new_vec, my_row.id);

            }

                
        }

        
}


fn insert_new_notify(new_list: Vec<std::string::String>, id: String){

    // println!("Nova Lista {:?}", new_list);
    // println!("id {:?}", id);

    let no_compression = connect::conn();

    let cql = "UPDATE lotus_dev.user SET notificacoes = ? WHERE id = ?";
    // let data = RowStructUpdateList {
    //     notificacoes: new_list
    // };
    let id = id;
    
    no_compression
        .query_with_values(cql, query_values!(new_list, id))
        .expect("update");

}

