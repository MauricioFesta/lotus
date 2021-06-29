import React from 'react'
import { Card, Feed } from 'semantic-ui-react'
import { listNotificacoes } from "../../../stores/vagas/api"
import { observable } from 'mobx';
import { observer } from "mobx-react";


class Notificacoes extends React.Component {

    constructor(props) {
        super(props)

        this.obs = observable({
            itens_notificacoes: []

        })
    }

    async componentDidMount() {

        let res = await listNotificacoes()

        console.log(res.data, " Aqui")

        this.obs.itens_notificacoes = res.data[0].notificacoes
    }

    render() {

        return (

            <Card>
                <Card.Content>
                    <Card.Header>Recent Activity</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>

                        {this.obs.itens_notificacoes.map(el => {

                            let json = JSON.parse(el)

                            return (

                                <Feed.Event>
                                    <Feed.Label image={"data:image/png;base64," + json.foto_base64} />
                                    <Feed.Content>
                                        <Feed.Date content='1 day ago' />
                                        <Feed.Summary>
                                            Empresa {json.nome} aprovou seu currículo
                                    </Feed.Summary>
                                    </Feed.Content>
                                </Feed.Event>
                            )

                        })

                        }

                    </Feed>
                </Card.Content>
            </Card>

        );
    }


}

export default observer(Notificacoes) 





