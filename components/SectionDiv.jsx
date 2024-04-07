import React from 'react'
import SectionComp from './SectionComp';
// import Collapsible from 'react-collapsible';

const cardSectionMap = [
    {
        name: 'section 1',
        titlehead: 'Event List',
        number: '01',
        title: 'Learn php & laravel',
        description: ' Lorem ipsum dolor sit amet consecteturadipisicing nsecteturadipisicing nsecteturadipisicing nsecteturadipisicing nsecteturadipisicing elit. Natus amet perspiciatis omnis ',
        episode: 'episode 1',
        time: ' 50 minutes',
    },
    {
        name: 'section 2',
        titlehead: 'Quit List',
        number: '02',
        title: 'Learn php & laravel',
        description: ' Lorem ipsum dolor sit amet consecteturadipisicing nsecteturadipisicing nsecteturadipisicing nsecteturadipisicing nsecteturadipisicing elit. Natus amet perspiciatis omnis ',
        episode: 'episode 1',
        time: ' 50 minutes',
    },




]




const SectionDiv = ({lessons}) => {

    return (
        <>
            <div className="container mb-5 mt-4">
                <div className="wrapper sections mt-0 pt-0" >
                    {lessons.sort((a, b) => (a.priority - b.priority )).map((item,index) => (
                        <>
                            <SectionComp
                                item={item}
                                title={"Lesson "+(index+1)}
                                titlesec={item.title}
                                titlethird={index+1}
                                titlefour={item.title}
                                titlefive={item.description}
                                titlesix={item.episode}
                                titleseven={item?.video?.duration}

                            />

                        </>
                    ))}










                </div>

            </div>
        </>
    )
}



export default SectionDiv;