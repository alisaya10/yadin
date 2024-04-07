import { ADD_QUEUE_FILE, CANCEL_QUEUE_FILE, ADD_QUEUE_MESSAGE, CHANGE_TEMP_FILE, CANCEL_QUEUE_MESSAGE, UPDATE_QUEUE_FILE, UPDATE_QUEUE_MESSAGE } from '../actionsList';



const initialInfo = {
    uploads: [],
    downloads: [],
    messages: [],
};

const quequeReducer = (state = initialInfo, action) => {

    switch (action.type) {
        case ADD_QUEUE_FILE: {

            console.log("ADD_QUEUE_FILE")

            let key = action.quequeType
            let list = state[key]

            if (!list) {
                list = []
            }



            list.push({ file: action.file, source: action.source, tempId: action.tempId })

            console.log(key)
            console.log(list)

            return {
                ...state,
                [key]: list,
            }
        }


        case ADD_QUEUE_MESSAGE: {


            let list = state.messages

            if (!list) {
                list = []
            }

            list.push({ message: action.message, source: action.source, tempId: action.tempId })

            return {
                ...state,
                messages: list,
            }
        }

        case UPDATE_QUEUE_FILE: {

            console.log("UPDATE_QUEUE_FILE")

            let key = action.quequeType
            let list = state[key]

            if (typeof action.status == 'object') {

                for (let i = 0; i < list.length; i++) {
                    const element = list[i];
                    if (element.tempId == action.tempId) {
                        for (const [key, value] of Object.entries(action.status)) {
                            element[key] = value
                        }
                    }
                }


            }
            console.log(list)

            if (action.status == 'done') {
                for (let i = 0; i < list.length; i++) {
                    const element = list[i];
                    if (element.tempId == action.tempId) {
                        list.splice(i, 1)
                    }
                }
            }


            return {
                ...state,
                [key]: list,
            }
        }



        case UPDATE_QUEUE_MESSAGE: {

            console.log("UPDATE_QUEUE_MESSAGE")

            let list = state.messages

            if (action.status == 'done') {
                for (let i = 0; i < list.length; i++) {
                    const element = list[i];
                    if (element.tempId == action.tempId) {
                        list.splice(i, 1)
                    }
                }
            }

            return {
                ...state,
                messages: list,
            }
        }



        default:
            return state;
    }
}

export default quequeReducer;