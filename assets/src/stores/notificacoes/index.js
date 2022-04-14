import init, { get_notificacoes } from "../../wasm/pkg/wasm";
import { observable } from 'mobx';
import { observer } from "mobx-react";
import moment from "moment";
import api from "../../others/api_default";


// @observer
export class _NotificacoesStore {

    constructor() {

        this.obs = observable({
            notificacoes: [],
            messagens_by_id: [],
            avatar: "",
            status200: false

        })
    }


    async handleGetMessageById(id) {
        this.obs.messagens_by_id = []
        

        let resp = await api.get(`/api/get-messagens-by-id/${id}`)
        


        if(resp.data.msg.length){

            this.obs.messagens_by_id = [...resp.data.msg]
            this.obs.avatar = resp.data.avatar

        }
    

    }

    async handlePutViewedNotify(id) {

        this.obs.status200 = false;

        let resp = await api.put(`/api/viewed-message/${id}`)

        if(resp.data == "ok"){

            this.obs.status200 = true

        }
    }


    async handleGetNotificacoes(token) {

        this.obs.notificacoes = []

        // await init()
        // let res = await get_notificacoes(token.toString())
        let resp = await api.get("/api/lista-notificacoes")

        console.log(resp.data, "Resposta")

        resp.data.map((el, index) => {


            //let json = JSON.parse(el)

            let date = moment(new Date(el.updated_at)).format()


            console.log("Data", date);

            var end = moment(date);
            var duration = moment.duration(moment(new Date()).diff(end));
            var days = duration.asDays();

            console.log(Math.floor(days), "Dias here")
            if (Math.floor(days) <= 6) {


                this.obs.notificacoes.push(el)
                

            }





        })
            

        // console.log(this.obs.notificacoes.length, "hereeee")




        // this.obs.notificacoes = res[0].notificacoes




    }


}




export const NotificacoesStore = new _NotificacoesStore()