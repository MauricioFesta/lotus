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
import { tokenMain} from '../../login/auth'
import init, { get_notificacoes } from "../../../wasm/pkg/wasm";


class Notificacoes extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            visible: false
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

        this.obs.open_spinner = true

        this.obs.dateNow = moment(new Date());

        let token = tokenMain()

        await init()
        let res = await get_notificacoes(token)

        // let res = await listNotificacoes()

        this.obs.itens_notificacoes = res[0].notificacoes

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

                    {Array.isArray(this.obs.itens_notificacoes) &&



                        this.obs.itens_notificacoes.map((el, index) => {

                            if (el != '' && index < 6) {

                                let json = JSON.parse(el)

                                let date = moment(new Date(json.date * 1000)).add(3, 'hours').format()

                                var end = moment(date);
                                var duration = moment.duration(this.obs.dateNow.diff(end));
                                var days = duration.asDays();

                                if (Math.floor(days) <= 1) {

                                    return (

                                        <>

                                            <DropdownItem>
                                                <div className="notification__icon-wrapper">
                                                    <div className="notification__icon">
                                                        {/* <i className="material-icons">&#xE6E1;</i> */}
                                                    </div>
                                                </div>
                                                <div className="notification__content">
                                                    <span className="notification__category">{json.empresa}</span>
                                                    <p>
                                                        {json.notify}<br />
                                                        <span className="text-success text-semibold">`{Math.floor(days) === 0 ? Math.floor(duration.asMinutes()) < 60 ? Math.floor(duration.asMinutes()) + " min ago" : Math.floor(duration.asHours()) + " hours ago" : Math.floor(days) + " day ago"}´</span>

                                                    </p>
                                                </div>
                                            </DropdownItem>

                                        </>
                                    )

                                }


                            }



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





