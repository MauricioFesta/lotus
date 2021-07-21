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

    
    // pub id_tmp: String,
    pub notificacoes: Vec<String>
  
}

#[derive(RustcDecodable, RustcEncodable)]
pub struct Notificacao  {
    notify: String,
    id: String
  
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

        // let mut arr_vec = Vec::new();

        for row in rows {
    
            let my_row: RowStructUser = RowStructUser::try_from_row(row).expect("into RowStruct");
            
            let mut new_vec = Vec::new();

            for notify_arr in my_row.notificacoes{

                let json_str: &str = &notify_arr;

                let decoded: Notificacao = json::decode(json_str).unwrap();

                println!("{}", decoded.notify);

                     //VALIDAR A DATA AQUI
                    if decoded.notify == "Empresa 123 enviu uma candidatura para uma vaga"{
                        
                        println!("{}", "Data vencida");
                        
                        
                    }else{
                        new_vec.push(json::encode(&decoded).unwrap());
                    }
                   

            }

            println!("{:?}", new_vec);
            // println!("{:?}", my_row.id_tmp);

                
        }

        
}


fn insert_new_notify(id: &str){

    // let update_struct_cql = "UPDATE test_ks.my_test_table SET user = ? WHERE key = ?";
    // let upd_user = RowStructUser {
    //     username: "Marry".to_string(),
    // };
    // let user_key = 1i32;
    // session
    //     .query_with_values(update_struct_cql, query_values!(upd_user, user_key))
    //     .expect("update");

}
