
CREATE KEYSPACE lotus_dev WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter1': '1'}  AND durable_writes = true;

CREATE TABLE lotus_dev.user(
   id varchar,
   nome varchar,
   email varchar,
   senha varchar,
   is_empresa boolean,
   foto_base64 text,
   cnpj_cpf bigint,
   notificacoes list<text>,
   vagas_aprovadas list<text>,
   inserted_at bigint,
   updated_at bigint,
   verificado boolean,
   PRIMARY KEY (id, email)
   );

CREATE INDEX ON user (senha);
CREATE INDEX ON user (is_empresa);

  

CREATE TABLE lotus_dev.curriculo(
   id varchar ,
   file_base64 text,
   image_base64 text,
   id_usuario varchar,
   principal boolean,
   descricao text,
   inserted_at timestamp,
   updated_at timestamp,

   PRIMARY KEY (id_usuario, id)
   
);

CREATE INDEX ON curriculo (principal);

CREATE TABLE lotus_dev.vagas(
   id varchar,
   titulo varchar,
   descricao varchar,
   empresa_id varchar,
   valor int,
   estado varchar,
   cidade  varchar,
   turno varchar,
   ramo varchar,
   imagem_base64 text,
   disponibilidade_viajar boolean,
   planejamento_futuro boolean,
   candidatos list<text>,
   inserted_at timestamp,
   updated_at timestamp,
   PRIMARY KEY (id, ramo)
   );

   CREATE INDEX ON vagas (empresa_id);


CREATE TABLE lotus_dev.postagens(
   id varchar,
   descricao text,
   empresa_razao text,
   PRIMARY KEY (id)

);
