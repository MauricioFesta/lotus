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


use rustc_serialize::json::{self, ToJson, Json};


use uuid::Uuid;
use super::connect;


#[derive(RustcDecodable, RustcEncodable,Clone, Debug, IntoCDRSValue, TryFromRow, PartialEq)]
pub struct RowStructUser {
    // pub id: String,
    pub notificacoes: Vec<String>
  
}

#[derive(RustcDecodable, RustcEncodable)]
pub struct Notificacao  {
    notify: String,
    id: String
  
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
    
            let my_row: RowStructUser = RowStructUser::try_from_row(row).expect("into RowStruct");
            
            let mut new_vec = Vec::new();

            for notify_arr in &my_row.notificacoes{

                let json_str: &str = &notify_arr;

                let decoded: Notificacao = json::decode(json_str).unwrap();

                println!("{}", decoded.notify);

                     //VALIDAR A DATA AQUI
                    if decoded.notify == "Empresa 123 enviu uma candidatura para uma vaga"{
                        
                        println!("{}", "Data vencida");
                        println!("{:?}", my_row);
                        new_vec.push("json::encode(&decoded).unwrap()".to_string());
                        
                        
                    }else{
                        new_vec.push(json::encode(&decoded).unwrap());
                    }
                   

            }

            insert_new_notify(new_vec);

                
        }

        
}


fn insert_new_notify(new_list: Vec<std::string::String>){

    println!("Nova Lista {:?}", new_list);

    // let no_compression = connect::conn();

    // let cql = "UPDATE lotus_dev.user SET notificacoes = ? WHERE email = ?";
    // let data = RowStructUpdateList {
    //     notificacoes: new_list
    // };
    // let email = "555".to_string();
    
    // no_compression
    //     .query_with_values(cql, query_values!(data, email))
    //     .expect("update");

}

