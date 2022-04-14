import React from 'react'
import { Card, Feed } from 'semantic-ui-react'
// import { listNotificacoes } from "../../../stores/vagas/api"
import { observable } from 'mobx';
import { observer } from "mobx-react";
import * as Mui from "@material-ui/core"
import { Spinner } from "@blueprintjs/core";
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";
import { tokenMain } from '../../login/auth'
// import init, { get_notificacoes } from "../../../wasm/pkg/wasm";
import { NotificacoesStore } from '../../../stores/notificacoes'


class Notificacoes extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            openChat: props.openChat
        };

        this.toggleNotifications = this.toggleNotifications.bind(this);

        this.obs = observable({
            itens_notificacoes: [],
            dateNow: Date,
            open_spinner: false

        })
    }

    toggleNotifications() {
        this.setState({
            visible: !this.state.visible
        });
    }

    async componentDidMount() {
        

        //let token = tokenMain()

        //await NotificacoesStore.handleGetNotificacoes(token);

        this.obs.open_spinner = true

        this.obs.dateNow = moment(new Date());

        // let token = tokenMain()

        // await NotificacoesStore.handleGetNotificacoes(token)


        // await init()
        // let res = await get_notificacoes(token)

        // let res = await listNotificacoes()


        this.obs.itens_notificacoes = NotificacoesStore.notificacoes

        this.obs.open_spinner = false


    }

    render() {

        return (

            <>

                <NavItem className="border-right dropdown notifications">

                    {this.obs.open_spinner &&
                        <DropdownItem>
                            <div className="notification__icon-wrapper">
                                <div className="notification__icon">
                                    {/* <i className="material-icons">&#xE6E1;</i> */}
                                </div>
                            </div>
                            <span className="notification__category">Carregando as Notificações</span>
                            <div className="notification__content">

                                &nbsp;&nbsp;&nbsp;
                                <p>


                                    <Spinner size={50} value={null} />

                                    <br />

                                </p>
                            </div>
                        </DropdownItem>
                    }

                    {

                        NotificacoesStore.obs.notificacoes.map((el, index) => {

                            let date = moment(new Date(el.updated_at)).format()

                            var end = moment(date);
                            var duration = moment.duration(moment(new Date()).diff(end));
                            var days = duration.asDays();

                            return (

                                <>

                                    <DropdownItem onClick={() => this.state.openChat(el.user_id, el._id)}>
                                        <div className="notification__icon-wrapper">
                                            <div className="notification__icon">
                                                {/* <i className="material-icons">&#xE6E1;</i> */}
                                            </div>
                                        </div>
                                        <div className="notification__content">
                                            <span className="notification__category">{el.nome}</span>
                                            <p>
                                                {el.notify}<br />
                                                <span className="text-success text-semibold">`{Math.floor(days) === 0 ? Math.floor(duration.asMinutes()) < 60 ? Math.floor(duration.asMinutes()) + " min atrás" : Math.floor(duration.asHours()) + " hora atrás" : Math.floor(days) + " dia atrás"}´</span>

                                            </p>
                                        </div>
                                    </DropdownItem>

                                </>
                            )

                            // }


                            // }



                        })

                    }



                    {/* <DropdownItem className="notification__all text-center">
                            View all Notifications
                        </DropdownItem> */}

                </NavItem>


            </>

        );
    }


}

export default observer(Notificacoes)





