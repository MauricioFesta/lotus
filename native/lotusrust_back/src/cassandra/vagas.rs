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


#[derive(Clone, Debug, IntoCDRSValue, TryFromRow, PartialEq)]
pub struct RowStruct {

    pub email: String,
    pub nome: String,
  
}



#[derive(RustcDecodable, RustcEncodable,Clone, Debug, IntoCDRSValue, TryFromRow, PartialEq)]
pub struct RowStructVagas {

    
    pub id_tmp: String,
    pub descricao: String,
    pub empresa_id: String,
    pub valor: i32,
    pub estado: String,
    pub cidade: String,
    pub turno: String,
    pub imagem_base64: String,
    pub disponibilidade_viajar: bool,
    pub planejamento_futuro: bool,
    pub candidatos: Vec<String>,
    // pub inserted_at : i64,
    // pub updated_at: i64,
  
}



pub fn get_filtro_vagas_empresa_db(ids: &str) -> Vec<String>  {

   
    let no_compression = connect::conn();

    let select_struct_cql =  format!("SELECT * FROM lotus_dev.vagas WHERE empresa_id in {} ALLOW FILTERING", ids);

        let rows = no_compression
        .query(select_struct_cql)
        .expect("query")
        .get_body()
        .expect("get body")
        .into_rows()
        .expect("into rows");

        let mut arr_vec = Vec::new();

        for row in rows {
    
            let my_row: RowStructVagas = RowStructVagas::try_from_row(row).expect("into RowStruct");
            let encoded = json::encode(&my_row).unwrap();

            arr_vec.push(encoded);
            
            
        }


        arr_vec
      
}

pub fn get_filtro_vagas_ramo_db(ramo: &str) -> Vec<String>  {

   
    let no_compression = connect::conn();

    println!("{}", ramo);

    let select_struct_cql =  format!("SELECT * FROM lotus_dev.vagas WHERE ramo in {} ALLOW FILTERING", ramo);

        let rows = no_compression
        .query(select_struct_cql)
        .expect("query")
        .get_body()
        .expect("get body")
        .into_rows()
        .expect("into rows");

        let mut arr_vec = Vec::new();

        for row in rows {
    
            let my_row: RowStructVagas = RowStructVagas::try_from_row(row).expect("into RowStruct");
            let encoded = json::encode(&my_row).unwrap();

            arr_vec.push(encoded);
            
            
        }


        arr_vec
      
}

pub fn get_vagas_db() ->  Vec<String>  {

    let no_compression = connect::conn();

    let select_struct_cql =  format!("SELECT * FROM lotus_dev.vagas");

        let rows = no_compression
        .query(select_struct_cql)
        .expect("query")
        .get_body()
        .expect("get body")
        .into_rows()
        .expect("into rows");

        let mut arr_vec = Vec::new();

        for row in rows {
    
            let my_row: RowStructVagas = RowStructVagas::try_from_row(row).expect("into RowStruct");
           
            let encoded = json::encode(&my_row).unwrap();
          
            arr_vec.push(encoded);

        }



        arr_vec
        
    
      
}











