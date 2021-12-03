import init, { get_vagas } from "../../wasm/pkg/wasm";
import { observable } from 'mobx';
import { observer } from "mobx-react";


class _VagasStore {

    constructor(){


        this.obs = observable({
            vagas: [],
            length_vagas:0

        })
    }

    async handleGetVagas(){

        await init()
        let res = await get_vagas()

        this.obs.vagas= res
       

    }

   
}

export const VagasStore = new _VagasStore()