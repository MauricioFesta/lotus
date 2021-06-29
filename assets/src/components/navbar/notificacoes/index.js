import React from 'react'
import { Card, Feed } from 'semantic-ui-react'

export default class Notificacoes extends React.Component {

    render() {

        return (

            <Card>
                <Card.Content>
                    <Card.Header>Recent Activity</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        <Feed.Event>
                            <Feed.Label image='/images/avatar/small/jenny.jpg' />
                            <Feed.Content>
                                <Feed.Date content='1 day ago' />
                                <Feed.Summary>
                                    Empresa Ricefer aprovou seu currículo
                    </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>

                        <Feed.Event>
                            <Feed.Label image='/images/avatar/small/molly.png' />
                            <Feed.Content>
                                <Feed.Date content='3 days ago' />
                                <Feed.Summary>
                                    You added <a>Molly Malone</a> as a friend.
                    </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>

                        <Feed.Event>
                            <Feed.Label image='/images/avatar/small/elliot.jpg' />
                            <Feed.Content>
                                <Feed.Date content='4 days ago' />
                                <Feed.Summary>
                                    You added <a>Elliot Baker</a> to your <a>musicians</a> group.
                    </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </Card.Content>
            </Card>

        );
    }


}