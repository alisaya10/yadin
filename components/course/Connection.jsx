import React from "react";
import Configurer from "../Configurer";
import Messenger from "../messenger/Messenger";
class Connection extends React.Component {
  state = {}
  componentDidMount() {
    console.log('here12121', this.props.course)
  }
  changeWindowLink = (nPath) => {

  }
  goToHub = () => {
  }

  render() {

    return (
      // <Configurer
      //   settingsInfo={{
      //     headerTitle: "connection",
      //     button: { goBack: true },
      //   }}
      //   title={"Connection"}
      //   description={"Connection"}
      //   className=""
      //   style={{ padding: '0px 3% 0px 3%' }}
      //   changeOnUnmount={true}
      // >
      <div className="container" style={{ height: 'calc(100vh - 100px)' }}>
        <div className="w-100 h-100">

          <Messenger isTeacher={this.props.isTeacher} course={this.props.course} width={100} height={100} changeWindowLink={this.changeWindowLink} goToHub={this.goToHub} />
        </div>
        {/* </Configurer> */}
      </div>
    )
  }
}

export default Connection;