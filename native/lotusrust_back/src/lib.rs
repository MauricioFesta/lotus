
pub mod cassandra{
    pub mod vagas_filtros;
}


#[rustler::nif]
pub fn add(a: i64, b: i64) -> i64 {
    a + b
}


#[rustler::nif]
pub fn get_value() -> Vec<&'static str>  {

   let vec_user = cassandra::vagas_filtros::get_user();

    let mut arr_vec = Vec::new();

    for row in vec_user {

       
        arr_vec.push("{\"name\": \"George\",\"age\": 27,\"verified\": false}");
        
    }

    println!("{:?}", arr_vec);

    arr_vec
   
}


rustler::init!("Elixir.LotusRust.Back", [add, get_value]);
