import React from "react";
// import { getBoundingClientRect } from "../../utils/functions";
import { checkTranslation,getBoundingClientRect } from "../../utils/useful";

var moment = require('jalali-moment');

class DateInput extends React.Component {

    state = {
        // title: moment(),
        isOpen: false,
        startOfMonth: '',
        endOfMonth: '',
        week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        days: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        month: { startDay: 0, daysCount: 30 },
        monthFromNow: 0,
        today: ''
        // currentTime
    }

    conditionalSettings(param, condition) {
        if (this.props.settings) {
            if (this.props.settings[param] == condition) {
                return true
            }
        }
        return false
    }


    componentWillMount() {
        // console.log(this.props.data)
        // console.log(moment().day())
        // let now = new Date().getTime() 
        // this.setState({ title: noew })
        this.setState({ title: this.props.data, today: new Date().getTime() })
        // // this.props.changeValue(this.props.header.key, day.start)

        // console.log(new Date().getTime())
        this.setMonth(0)
    }


    componentDidUpdate(prevProps){
        // console.log(this.props.data)
        if(this.props.data != prevProps.data ){
            this.setState({ title: this.props.data })

        }
    }




    changeMonth(number) {

        this.setMonth(this.state.monthFromNow + number)
        this.setState({ monthFromNow: this.state.monthFromNow + number })
    }

    setMonth(fromNow) {

        // this.setState({month:{}},()=>{


        let now = new Date();
        let days = []

        let start = moment(now).add(fromNow, 'jmonth').startOf('jmonth')
        // let end = moment(now).add(fromNow, 'jmonth').endOf('jmonth')
        // let count = 0

        for (let i = 0; i < moment(now).add(fromNow, 'jmonth').jDaysInMonth(); i++) {

            days.push({ start: moment(start).add(i, 'jday').startOf('jday').valueOf(), end: moment(start).add(i, 'jday').endOf('jday').valueOf() })
            // count++
        }
        // console.log(days)

        // this.setState({ isOpen: false }, () => {
        this.setState({ month: { title: moment(start).locale('fa').format('jYYYY-jMMMM'), startDay: start.day(), days: days } })
        // })
        // console.log(start.unix())
        // console.log(end.day())
        // })
    }

    setDay(day) {
        let startOrEnd = this.props.startOrEnd ? this.props.startOrEnd : "start"
        this.setState({ title: day[startOrEnd] })
        // console.log()
        this.props.changeValue(this.props.header.key, day[startOrEnd], this.props.extra)

    }

    showDays() {

        // let day = 1
        let week = []
        let weeks = []
        let days = []
        let startDay = this.state.month.startDay

        // let firstWeek = true
        let count = 0
        // console.log(startDay)
        for (let i = 0; i < startDay - 1; i++) {
            days.push(null)
        }

        days = [...days, ...this.state.month.days]

        for (let i = 0; i < days.length; i++) {
            // console.log("HERE")
            count++
            week.push(days[i])
            if (count == 7 || i == days.length - 1) {
                weeks.push(week)
                count = 0
                week = []
            }
        }

        // console.log(weeks)

        let lastWeekLenght = weeks[weeks.length - 1].length
        if (lastWeekLenght < 7) {
            for (let i = 0; i < 7 - lastWeekLenght; i++) {
                // console.log("HERE")
                weeks[weeks.length - 1].push(null)
            }
        }


        // console.log(weeks)
        // console.log(weeks)
        count = 0

        return weeks.map((week, index) => {

            // if(index ==  )
            return (
                <div key={index} className="d-flex text-center pl-2 pr-2 w-100" style={{ justifyContent: 'space-between' }}>
                    {week.map((day, index1) => {
                        // console.log(count)
                        if (day == null) {
                            return (
                                <div key={index1} style={{ width: '100%', padding: 10, width: 35 }}>
                                </div>
                            )
                        } else {
                            count++

                            let isToday = (this.state.today >= day.start && this.state.today <= day.end) ? true : false
                            let selectedDay = (this.state.title >= day.start && this.state.title <= day.end) ? true : false

                            let available = true

                            if (this.props.endDate && day.start > this.props.endDate) {
                                available = false
                            }

                            if (this.props.startDate && day.end < this.props.startDate) {
                                available = false
                            }
                            // console.log(this.props.startDate)
                            // if()
                            return (
                                <div onClick={() => { if (available) this.setDay(day) }} key={index1} style={{ cursor: 'pointer', width: '100%', backgroundColor: selectedDay ? '#007aff' : '#fcfcfc', padding: 0, borderRadius: 40, width: 35, height: 35, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                    <div style={{ backgroundColor: isToday ? '#007aff20' : 'transparent', borderRadius: 40, padding: 0, minWidth: 25, height: 25, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <span style={{ color: available ? (selectedDay ? '#fff' : '#345') : '#abc', fontSize: 12 }}>{count}</span>
                                    </div>
                                </div>
                            )
                        }
                    })
                    }

                </div>
            )
        })




    }


    componentWillUnmount() {
        document.removeEventListener('mousedown', this.closeBox);
        window.removeEventListener('scroll', this.getPosition);

    }

    openBox() {
        console.log("OPENBOX")
        document.addEventListener('mousedown', this.closeBox);
        window.addEventListener('scroll', this.getPosition, true);
        this.getPosition()
        this.setState({ isOpen: true })
    }


    closeBox = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.isOpen) {
            this.setState({ isOpen: false, data: this.props.data })
            document.removeEventListener('mousedown', this.closeBox);
            window.removeEventListener('scroll', this.getPosition);

            if (this.refs.icon)
                this.refs.icon.classList.toggle("rotate-180")

        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }


    getPosition = () => {
        // console.log("getPosition")
        let rect = getBoundingClientRect(this.wrapperRef)
        this.setState({ top: rect.top + 35, left: rect.left })
    }



    render() {
        let info = this.props.header.information

        // console.log(this.state.title)

        return (
            <div className='mt-0 w-100' >
                {/* <label className={'mb-2 mr-1 ml-1 ' + (info.required ? 'required' : '')} style={{ marginBottom: 3, fontSize: 12, marginTop: 5, color: '#999' }}>{info.label}</label> */}
                {/* <input disabled={info.disabled} onChange={e => { this.props.changeValue(this.props.header.key, e.target.value) }} className='form-control' defaultValue={this.props.title} placeholder={info.placeHolder} style={{ backgroundColor: '#f7f7f7', color: '#3b3a40' }} /> */}
                <div className='position-relative' ref={ref => this.setWrapperRef(ref)}>
                    <div onClick={() => { if (!info.disabled) { this.openBox() } }} disabled={info.disabled} onChange={e => { this.props.changeValue(this.props.header.key, e.target.value) }} className='' defaultValue={this.props.title} placeholder={info.placeHolder} style={{  height: 30,  color: '#222', display: 'flex', alignItems: 'center' }} >
                        {this.state.title && (<p>{this.state.title ? moment(this.state.title).locale('fa').format('jYYYY - jMMMM - jDD') : ''}</p>)}
                        {!this.state.title && (<p style={{ opacity: 0.3 }}>{checkTranslation(info.placeholder)}</p>)}
                    </div>

                    {this.state.isOpen && (
                        <div style={{ position: 'fixed', top: this.state.top, backgroundColor: '#fff', borderRadius: 5, width: '270px', zIndex: 10, boxShadow: '0px 0px 30px rgba(0,0,0,0.1)', padding: 10 }}>
                            <div className="d-flex p-2" style={{ justifyContent: 'space-between' }}>
                                <img onClick={() => this.changeMonth(-1)} src="/images/nexts.png" className="rotate-180"  height="14px"/>
                                <p>{this.state.month.title}</p>
                                <img onClick={() => this.changeMonth(1)} src="/images/nexts.png" height="14px"/>
                            </div>

                            <div className="d-flex p-2  text-center w-100" style={{ justifyContent: 'space-between' }}>
                                {this.state.week.map((prop, index) => {
                                    return (
                                        <div className={'w-100'} style={{ width: 35, }}>
                                            <p style={{ color: '#789', fontSize: 12 }}>{prop}</p>
                                        </div>
                                    )
                                })}
                            </div>

                            {this.showDays()}

                        </div>
                    )}

                </div>

            </div>
        );
    }
}

export default DateInput;
