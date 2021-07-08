use cdrs::*;
use cdrs_helpers_derive::*;
use cdrs::query::*;
use cdrs::frame::IntoBytes;
use cdrs::types::from_cdrs::FromCDRSByName;
use cdrs::types::prelude::*;

use super::connect;


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

pub fn get_filtro_vagas_db(id: &str) -> Vec<String>  {

   
    let no_compression = connect::conn();

    let select_struct_cql =  format!("SELECT * FROM lotus_dev.user WHERE id = {}", id);

        let rows = no_compression
        .query(select_struct_cql)
        .expect("query")
        .get_body()
        .expect("get body")
        .into_rows()
        .expect("into rows");

        let mut arr_vec = Vec::new();

        for row in rows {
    
            let my_row: RowStruct = RowStruct::try_from_row(row).expect("into RowStruct");
            let str_format = format!("{{\"nome\": \"{}\",\"email\": {}}}", my_row.nome, my_row.email);
           
            arr_vec.push(str_format);
            
            
        }


        arr_vec
      
}







