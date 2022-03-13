
copy lotus_dev.postagens to '/tmp/postagens.csv' with header=true

copy lotus_dev.postagens from '/tmp/postagens.csv' with header=true

CREATE KEYSPACE lotus_dev WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter1': '1'}  AND durable_writes = true;

CREATE ROLE lotus_root with SUPERUSER = true AND LOGIN = true and PASSWORD = 'nuOTbtK$B8G%#0I$w7@';
ALTER ROLE cassandra WITH SUPERUSER = false AND LOGIN = false;

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
   PRIMARY KEY (id)
   );

CREATE INDEX ON user (email);
CREATE INDEX ON user (is_empresa);

  

CREATE TABLE lotus_dev.curriculo(
   id varchar ,
   file_base64 text,
   image_base64 text,
   id_usuario varchar,
   principal boolean,
   descricao text,
   inserted_at bigint,
   updated_at bigint,

   PRIMARY KEY (id_usuario, id)
   
);

CREATE INDEX ON curriculo (principal);

-- CREATE TABLE lotus_dev.vagas(
--    id varchar,
--    titulo varchar,
--    descricao varchar,
--    empresa_id varchar,
--    valor int,
--    estado varchar,
--    cidade  varchar,
--    turno varchar,
--    ramo varchar,
--    imagem_base64 text,
--    disponibilidade_viajar boolean,
--    planejamento_futuro boolean,
--    candidatos list<text>,
--    inserted_at bigint,
--    updated_at bigint,
--    ativo boolean,
--    PRIMARY KEY (id)
--    );

--    CREATE INDEX ON vagas (empresa_id);
--    CREATE INDEX ON vagas (ativo);


CREATE TABLE lotus_dev.postagens(
   id varchar,
   descricao text,
   empresa_razao text,
   empresa_id text,
   inserted_at bigint,
   updated_at bigint,
   PRIMARY KEY (id)

);

CREATE INDEX ON postagens (empresa_id);
