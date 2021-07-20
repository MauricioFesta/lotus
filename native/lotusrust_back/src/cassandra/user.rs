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

        let mut arr_vec = Vec::new();

        for row in rows {
    
            let my_row: RowStructUser = RowStructUser::try_from_row(row).expect("into RowStruct");

       
          
            // let encoded = json::decode(&my_row).unwrap();

            arr_vec.push(my_row.notificacoes);
            
            
        }
        // let str_: &str = arr_vec[0][0];
        // println!("{}", str_);
        // json::decode(&str_).unwrap();




        // for row in rows {
    
        //     let my_row: RowStructVagas = RowStructVagas::try_from_row(row).expect("into RowStruct");
        //     let encoded = json::encode(&my_row).unwrap();

        //     arr_vec.push(encoded);
            
            
        // }


        // arr_vec
      
}
