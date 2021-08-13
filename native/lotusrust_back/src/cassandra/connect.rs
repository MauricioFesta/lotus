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

    let user = "user";
    let password = "password";
    let auth = StaticPasswordAuthenticator::new(&user, &password);
    let node = NodeTcpConfigBuilder::new("localhost:9042", auth).build();
    let cluster_config = ClusterTcpConfig(vec![node]);
    let no_compression: CurrentSession = new_session(&cluster_config, RoundRobin::new()).expect("session should be created");

    no_compression

}
