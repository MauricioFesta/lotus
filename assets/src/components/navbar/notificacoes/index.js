import React from 'react'
import { Card, Feed } from 'semantic-ui-react'
import { listNotificacoes } from "../../../stores/vagas/api"
import { observable } from 'mobx';
import { observer } from "mobx-react";
import * as Mui from "@material-ui/core"
import moment from 'moment';


class Notificacoes extends React.Component {

    constructor(props) {
        super(props)

        this.obs = observable({
            itens_notificacoes: [],
            dateNow: Date

        })
    }

    async componentDidMount() {

        this.obs.dateNow = moment(new Date());

        let res = await listNotificacoes()

        this.obs.itens_notificacoes = res.data[0].notificacoes


    }

    render() {

        return (

            <Card>
                <Card.Content>
                    <Card.Header>Atividades Recentes</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>

                        {Array.isArray(this.obs.itens_notificacoes) &&

            
                            this.obs.itens_notificacoes.map((el, index) => {

                        
                                if (el != '' && index < 6) {

                                    let json = JSON.parse(el)

                                    let date = moment(new Date(json.date * 1000)).add(3, 'hours').format()

                                    var end = moment(date); 
                                    var duration = moment.duration(this.obs.dateNow.diff(end));
                                    var days = duration.asDays();

                                    if(Math.floor(days) <= 1){

                                        return (

                                            <Feed.Event>
                                                <Feed.Label>
                                                    <Mui.Avatar alt="Remy Sharp" src={"data:image/png;base64," + json.foto_base64} />
    
                                                </Feed.Label>
                                                <Feed.Content>
                                                    <Feed.Date content={`${Math.floor(days) === 0 ? Math.floor(duration.asMinutes()) < 60 ? Math.floor(duration.asMinutes())   + " min ago" :  Math.floor(duration.asHours())   + " hours ago" : Math.floor(days) + " day ago"}`} />
                                                    <Feed.Summary>
                                                        {json.notify}
                                                    </Feed.Summary>
                                                </Feed.Content>
                                            </Feed.Event>
                                        )

                                    }
                                    

                                }

                            })

                        }

                    </Feed>
                </Card.Content>
            </Card>

        );
    }


}

export default observer(Notificacoes)





