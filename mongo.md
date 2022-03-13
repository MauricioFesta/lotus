##Create User Admin
1º use admin
2ª db.createUser( { user: "lotus",
                 pwd: "[t46$uw4Kb^vF'u>Ms,65nB/;>`t}@5m",
                 roles: [ { role: "clusterAdmin", db: "admin" },
                          { role: "readAnyDatabase", db: "admin" },
                          "readWrite"] } )

##Autenticar User Admin

  1ª use admin
  2º db.auth("lotus", "[t46$uw4Kb^vF'u>Ms,65nB/;>`t}@5m")