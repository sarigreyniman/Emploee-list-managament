import { observable, action, makeObservable, runInAction } from 'mobx';
import axios from "axios";

class WorkerSingleTon {

    workersList = [];
  

    constructor() {
        makeObservable(this, {
            workersList: observable,
            getWorkersList: action,
            putWorker: action,
            deleteWorker: action
        })
        this.init();
    }

    init() {
        this.getWorkersList();
        if (this.workersList == null)
            console.log("data is null");
        else
            console.log("data is not null");

        this.workersList.map((i) => {
            console.log(i.FirstName);
        })
    }

    async getWorkersList() {
        try {
            const response = await axios.get(`https://localhost:7148/api/Worker`);
            console.log(response)
            runInAction(() => {
                this.workersList = response.data;
            });
        } catch (error) {
            console.log(error);
        }
    }


    async getWorker(id) {
        try {
            const response = await axios.get(`https://localhost:7148/api/Worker/${id}`);
            runInAction(() => {
                this.workerById = response.data;
            });
        } catch (error) {
            console.log(error);
        }
    }
    postWorker(workerToAdd) {
        axios.post(`https://localhost:7148/api/Worker`, workerToAdd)
        .then((res) => {
            if (res.status === 200) {
                runInAction(() => {
                    this.workersList.push(res.data);
                    console.log("Worker was added successfully");
                });
            } else {
                console.error("Worker was not added. Unexpected status:", res.status);
            }
        })
        .catch((error) => {
            console.error("Error adding worker:", error);
        });
    
    }
    async putWorker(id, updatedWorker) {
        try {
            const response = await fetch(`https://localhost:7148/api/Worker/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedWorker)
            });

            if (!response.ok) {
                throw new Error('Failed to update worker');
            }

            const index = this.workersList.findIndex(worker => worker.id === id);
            if (index !== -1) {
                this.workersList[index] = updatedWorker;
                console.log('Worker updated successfully.');
                this.workersList[index].id = id;
            } else {
                console.error('Worker not found in workersList');
            }
        } catch (error) {
            console.error('Error updating worker:', error);
        }
    }


    deletePositionFromWorker(workerId, positionName) {
        const index = this.workersList.findIndex(worker => worker.id === workerId);
        if (index !== -1) {
            this.workersList[index].positions = this.workersList[index].positions.filter(position => position.positionName !== positionName);
            console.log('Position deleted from worker successfully.');
        } else {
            console.error('Worker not found in workersList');
        }
    }


    deleteWorker(id) {
        const index = this.workersList.findIndex(worker => worker.id === id);
        try {
            const response = axios.delete(`https://localhost:7148/api/Worker/${id}`);
            console.log("isActive = false");
        } catch (error) {
            console.log(error);
        }
    }
}

export default new WorkerSingleTon();
