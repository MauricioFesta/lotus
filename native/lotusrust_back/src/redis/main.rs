use redis::AsyncCommands;
use redis::RedisResult;
use redis::Client;
use std::thread;


pub struct Db {

    client: Client
}


impl Db {

    pub fn new() -> Db {

        let client = redis::Client::open("redis://127.0.0.1/").unwrap();
       
        Db {
            client: client,
        }
    }

    pub async fn get_vagas(&self) -> redis::RedisResult<Vec<String>>  {

        let mut con = self.client.get_async_connection().await?;

        let lista = con.lrange("list_vagas", 0,-1).await?;
        
        Ok(lista)
        
    }

    pub async fn set_vagas(&self, list: Vec<&str>) -> RedisResult<bool> {

        let mut con = self.client.get_async_connection().await?;

        for i in list {
 
           con.lpush("list_vagas", i).await?;

    
        }

        Ok(true)

    }

    pub async fn reset_cache(self, list: Vec<String>) -> RedisResult<bool> {

        println!("{}", "Building cache...");

        let mut con = self.client.get_async_connection().await?;

        let resp = tokio::task::spawn_blocking(move || async move {
  
            let _resp = &self.clear_cache().await;

            println!("{}", "Clear finish...");

        }).await.expect("Task panicked");
        

        resp.await;

        println!("{:?} Tamanho da lista", list.len());

        for i in list {

            con.lpush("list_vagas", i).await?;
        }
            
        println!("{}", "Finish Building cache...");

        Ok(true)
    }

    pub async fn clear_cache(&self) -> RedisResult<bool> {

        let mut con = self.client.get_async_connection().await?;

        let _resp = con.del::<String, String>("list_vagas".to_string()).await?;

        Ok(true)

    }

}


  


