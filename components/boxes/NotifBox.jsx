import React, { useState } from 'react'
import { checkTextTranslation } from '../../utils/useful';

const NotifBox = props => {

    const [exit, setExit] = useState(false)
    const [width, setWidth] = useState(0)
    const [intervalId, setIntervalId] = useState(null)



    React.useEffect(() => {
        startTimer()
    }, [])

    React.useEffect(() => {
        if (width >= 100) {
            console.log()
            closeNotif()
        }
    }, [width])


    const startTimer = () => {
        const id = setInterval(() => {
            setWidth((prevWidth) => {
                if (prevWidth < 100) {
                    return prevWidth + 0.5
                }
                clearInterval(id)
                console.log(prevWidth)
                // closeNotif()
                return prevWidth
            })
        }, 20);

        setIntervalId(id)
    }

    const pauseTimer = () => {
        clearInterval(intervalId)
    }

    const closeNotif = () => {
        pauseTimer()
        setExit(true)
        setTimeout(() => {
            console.log("CLOSE NOTIF")
            props.removeNotif( props.id )
        }, 500);
    }



    return (
        <div onMouseOver={() => pauseTimer()} onMouseLeave={() => startTimer()} className={'mb-2 notifBox ' + (props?.type) + ' ' + (exit ? 'rightHide' : '')}>
            <div className="py-2 px-3">
                {props?.title && (<p className="notifTitle">{checkTextTranslation(props?.title)}</p>)}
                {props?.description && (<p className="notifDescription">{checkTextTranslation(props?.description)}</p>)}
            </div>
            <div style={{ width: width + '%', backgroundColor: '#eeeeee50', height: 3, borderRadius: 10 }} >

            </div>
        </div>
    )

}

export default NotifBox
