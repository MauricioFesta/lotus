import init, { get_notificacoes } from "../../wasm/pkg/wasm";
import { observable } from 'mobx';
import { observer } from "mobx-react";
import moment from "moment";


// @observer
export class _NotificacoesStore {

    constructor() {

        this.obs = observable({
            notificacoes: []

        })
    }

    async handleGetNotificacoes(token) {

        this.obs.notificacoes = []

        await init()
        let res = await get_notificacoes(token.toString())

        res[0].notificacoes.map((el, index) => {

            if (el != '' && index < 6) {
                let json = JSON.parse(el)

                let date = moment(new Date(json.date * 1000)).add(3, 'hours').format()

                var end = moment(date);
                var duration = moment.duration(moment(new Date()).diff(end));
                var days = duration.asDays();

                if (Math.floor(days) <= 1) {


                    this.obs.notificacoes.push(json)
                    


                }

            }



        })

        console.log(this.obs.notificacoes.length, "hereeee")




        // this.obs.notificacoes = res[0].notificacoes




    }


}




export const NotificacoesStore =  new _NotificacoesStore()