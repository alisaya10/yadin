import React, { Component } from 'react'
import { translate } from '../../../../utils/useful'
import SwitchInput from '../../../inputs/SwitchInput'
import TextInput from '../../../inputs/TextInput'
import Chart from '../../../widgets2/Chart'
import ChartWidget from '../../../widgets2/ChartWidget'





export default class OverviewStatistic extends Component {
    state = {

    }



    openSidebar = () => {
        this.sidebarView.openSidebar()
    }

    openFirstView = () => {
        this.firstView.showView()
    }






    render() {
        return (
            <div className='h-100 px-3'>
                <div className='flexcc w-100 mt-3'>
                    <p className='text-center font-size-12'>your admins supports 3,322 customer in the last 26 days</p>
                </div>
                <div className='py-4' style={{borderBottom:"1px solid #ddd"}}>
                    <ChartWidget height={300} chartType={"bubble"}/>
                </div>
                <div className='py-4'>
                    <ChartWidget height={500} chartType={"polar"}/>
                </div>
            </div>
        )
    }
}
