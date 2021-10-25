
use std::sync::Arc;
use cdrs_tokio::authenticators::StaticPasswordAuthenticatorProvider;
use cdrs_tokio::cluster::{ClusterTcpConfig,NodeTcpConfigBuilder,TcpConnectionPool};
use cdrs_tokio::query::*;
use cdrs_tokio::cluster::session::{new as new_session, Session};
use cdrs_tokio::types::from_cdrs::FromCdrsByName;
use cdrs_tokio::types::prelude::*;
use cdrs_tokio_helpers_derive::*;
use cdrs_tokio::load_balancing::RoundRobin;
use cdrs_tokio::retry::DefaultRetryPolicy;
use serde::{Serialize, Deserialize};

type CurrentSession = Session<RoundRobin<TcpConnectionPool>>;


#[derive(Clone, Debug, TryFromRow, PartialEq,Serialize, Deserialize)]
pub struct RowStruct {
    
    pub id: String,
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
    pub ramo: String,
    pub titulo: String,
    pub inserted_at: i64,
    pub updated_at: i64,
}


pub struct Db {
  
    config: ClusterTcpConfig
}


impl Db {

   pub fn new() -> Db {

        let user = "lotus_root";
        let password = "nuOTbtK$B8G%#0I$w7@";
        let auth = StaticPasswordAuthenticatorProvider::new(&user, &password);
            
        let node = NodeTcpConfigBuilder::new("137.184.9.0:9042", Arc::new(auth)).build();
        // let node = NodeTcpConfigBuilder::new("127.0.0.1:9042", Arc::new(auth)).build(); 
        
        let cluster_config = ClusterTcpConfig(vec![node]);
            
        Db{
                
            config: cluster_config
            
        }


    }

    pub async fn get_vagas_db(&self) -> Vec<String> {

        let session: CurrentSession = new_session(&self.config, RoundRobin::new(), Box::new(DefaultRetryPolicy::default())).await.expect("session should be created");

            let select_struct_cql = "SELECT * FROM lotus_dev.vagas WHERE ativo = true";
            let rows = session
                .query(select_struct_cql)
                .await
                .expect("query")
                .body()
                .expect("get body")
                .into_rows()
                .expect("into rows");
        
            let mut list_vagas = Vec::new();
        
            for row in rows {
        
                let my_row = RowStruct::try_from_row(row).expect("into RowStruct");
                // println!("struct got: {:?}", my_row);
                
                let encoded = serde_json::to_string(&my_row).unwrap();
        
                list_vagas.push(encoded);
            }

            list_vagas
        


    }

    pub async fn get_filtro_vagas_ramo_db(&self,ramo: String) -> Vec<String> {

        let session: CurrentSession = new_session(&self.config, RoundRobin::new(), Box::new(DefaultRetryPolicy::default())).await.expect("session should be created");

        let select_struct_cql = format!("SELECT * FROM lotus_dev.vagas WHERE ramo = {} AND ativo = true ALLOW FILTERING", ramo);
    
        let rows = session
            .query(select_struct_cql)
            .await
            .expect("query")
            .body()
            .expect("get body")
            .into_rows()
            .expect("into rows");
    
        let mut list_vagas = Vec::new();
    
        for row in rows {
    
            let my_row = RowStruct::try_from_row(row).expect("into RowStruct");
            // println!("struct got: {:?}", my_row);
            
            let encoded = serde_json::to_string(&my_row).unwrap();
    
            list_vagas.push(encoded);
        }
    
        list_vagas
    
    }
    
    pub async fn get_filtro_vagas_empresa_db(&self,empresa: String) -> Vec<String> {
    
        let session: CurrentSession = new_session(&self.config, RoundRobin::new(), Box::new(DefaultRetryPolicy::default())).await.expect("session should be created");


        let select_struct_cql = format!("SELECT * FROM lotus_dev.vagas WHERE empresa_id = {} AND ativo = true ALLOW FILTERING", empresa);
    
        let rows = session
            .query(select_struct_cql)
            .await
            .expect("query")
            .body()
            .expect("get body")
            .into_rows()
            .expect("into rows");
    
        let mut list_vagas = Vec::new();
    
        for row in rows {
    
            let my_row = RowStruct::try_from_row(row).expect("into RowStruct");
            
            let encoded = serde_json::to_string(&my_row).unwrap();
    
            list_vagas.push(encoded);
        }
    
        list_vagas
    
    }


}






















