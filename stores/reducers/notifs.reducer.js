import { ADD_NOTIF, REMOVE_NOTIF } from '../actionsList';
import { v4 as uuidv4 } from 'uuid';

const initialSettings = {
    list: [],
    LDate: null
};

const notifsReducer = (state = initialSettings, action) => {
    switch (action.type) {
        case ADD_NOTIF:
            {

                // if (!Array.isArray(list)) {
                let list = []
                    // }
                let now = new Date().getTime()
                    // list = JSON.parse(JSON.stringify(list))
                let id = uuidv4()
                let newNotif = { id, timestamp: now, ...action.options }

                list = [newNotif, ...state.list]

                // console.log(list)
                // list.splice(0, 0, { id, timestamp: now, options: action.options })
                // list.push({ id, timestamp: now, options: action.options })
                // console.log(list)

                // state.LDate = now

                return {
                    ...state,
                    list: list,
                    LDate: now
                }
            }


        case REMOVE_NOTIF:
            {
                let list = [...state.list]
                list = JSON.parse(JSON.stringify(list))
                // console.log(list)

                // list.forEach((notif, index) => {
                //     // console.log(notif.id)
                //     // console.log(action.id)
                //     if (notif.id == action.id) {
                //         list.splice(index, 1)
                //     }
                // });

                // console.log("---")
                // console.log(list)
                list = list.filter(a => a.id !== action.id)
                // console.log(action.id)
                // console.log(list)
                return {
                    ...state,
                    list: [...list]
                }
            }


        default:
            return state;
    }
}

export default notifsReducer;