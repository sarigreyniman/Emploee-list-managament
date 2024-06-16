import axios from "axios";
import { action, makeObservable, observable, runInAction } from "mobx";

class PositionSingleTon {
    positionsListNames=[];

    constructor() {
        makeObservable(this, {
            positionsListNames:observable,
            getPositionsListNames:action
        });
        this.init();
    }

  async  init() {
      await  this.getPositionsListNames();
    }

    async getPositionsListNames() {
        try {
            const response = await axios.get(`https://localhost:7148/api/Position/GetPositionNames`);
            runInAction(() => {
                this.positionsListNames = response.data;
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default new PositionSingleTon();
