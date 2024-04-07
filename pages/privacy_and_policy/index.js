import React from 'react';
import DynamicPage from '../../components/DynamicPage';
import HttpServices from '../../utils/Http.services';





export async function getServerSideProps(context) {

    let slug = 'privacy_and_policy'

    let lng = context.locale
    if (!lng) {
        lng = 'en'
    }


    const res = await (await HttpServices.syncRequest('getOneContent', { 'page':'dynamicPages','values.slug': slug, 'values.lng': lng })).result

    return {
        props: JSON.parse(JSON.stringify({ data: res ? res.info : null }))
    }



}

class Privacy extends React.Component {
    state = {

    }

    render() {
        var settings = {
            dots: true,
            autoplay: false,
            autoplaySpeed: 1900,
            infinite: true,
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
        };




        return (
            <div style={{ backgroundColor: '' }}>

                <DynamicPage data={this.props.data} />


            </div>
        )
    }
}



export default Privacy;