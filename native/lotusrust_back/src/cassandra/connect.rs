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


pub fn conn() -> CurrentSession {

    let user = "lotus_root";
    let password = "nuOTbtK$B8G%#0I$w7@";
    let auth = StaticPasswordAuthenticator::new(&user, &password);
    // let node = NodeTcpConfigBuilder::new("137.184.9.0:9042", auth).build();
    let node = NodeTcpConfigBuilder::new("127.0.0.1:9042", auth).build();
    let cluster_config = ClusterTcpConfig(vec![node]);
    let no_compression: CurrentSession = new_session(&cluster_config, RoundRobin::new()).expect("session should be created");

    no_compression

}
