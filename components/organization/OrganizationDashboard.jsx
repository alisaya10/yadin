import React from "react";
import Configurer from "../Configurer";
import HttpServices from "../../utils/Http.services";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../stores/actionsList";
import Router, { useRouter, withRouter } from "next/router";
import Organization from "./Organization";
import StagesManager from "../StagesManager";
import Path from "./Path";
import UserPath from "./UserPath";
import Details from "./Details";



class OrganizationDashboard extends React.Component {

  state = {
    organizationUsersInfo: {}
  }

  componentDidMount() {
    // console.log(this.props.user)
  }

  updateUserInfo = () => {
    let data = this.form.getForm()

    console.log(data)
    if (data) {
      this.setState({ isLoading: true })

      HttpServices.request("updateUserInfo", data, (fetchResult, fetchError) => {
        this.setState({ isLoading: false })
        if (fetchError) {
          this.setState({ errors: fetchError.errors })
          this.props.addNotif({ type: 'error', title: '{{lang}}errors.profileNotUpdated', description: fetchError.message })
          return
        }
        this.setState({ errors: null })
        this.props.setUser(fetchResult.user, null, true)
        this.props.addNotif({ type: 'success', title: '{{lang}}info.profileUpdated', description: '{{lang}}info.profileUpdatedSuccessfully' })
      })
    }
  }
  getOneOrganizationGroup = (orgInfo) => {
    // console.log(this.state.id)
    HttpServices.request('getOneOrganizationGroup', { _id: orgInfo._id }, (fetchResult, fetchError) => {

      console.log('==================', fetchResult)

      if (fetchError) {
        return
      }
      this.setState({
        organizationInfo: fetchResult?.info
      // },() => {
      //   this.props.changeStage("learning-path")

      })
      // , () => {
      //     console.log("alert")
      //     this.setState({ isLoading: true })
      //   })
    })


  }
  getOrgUserLearningPath = (orgInfo) => {
    // console.log(this.state.id)
    HttpServices.request('getOrgUserLearningPath', { _id: orgInfo._id }, (fetchResult, fetchError) => {

      console.log('==================', fetchResult)

      if (fetchError) {
        return
      }
      this.setState({
        orgUsersLearningPath: fetchResult?.info
      })
      // , () => {
      //     console.log("alert")
      //     this.setState({ isLoading: true })
      //   })
    })


  }
  getMyOrganizationUsersInfo = (orgInfo) => {
    console.log('here')
    HttpServices.request('getMyOrganizationUsersInfo', { _id: orgInfo._id }, (fetchResult, fetchError) => {

      console.log('================orrrrgggggggrrr==', fetchResult)

      if (fetchError) {
        console.log('errrrrrrrrrr', fetchError);
        return
      }
      this.setState({
        organizationUsersInfo: fetchResult?.info
      }, () => {

      })
      // , () => {
      //     console.log("alert")
      //     this.setState({ isLoading: true })
      //   })
    })


  }
  changePage = (page) => {
    let path = "/profile/" + page;
    Router.push({ pathname: path });
  };


  render() {

    return (
      <>



        <StagesManager ref={(el) => (this.stageManager = el)}>

          <Organization
            stage={0}
            stageName={"organization"}
            getOneOrganizationGroup={this.getOneOrganizationGroup}
            getOrgUserLearningPath={this.getOrgUserLearningPath}
            getMyOrganizationUsersInfo={this.getMyOrganizationUsersInfo}
          />

          <Path
            stage={1}
            stageName={"learning-path"}
            getOneOrganizationGroup={this.getOneOrganizationGroup}
            orgInfo={this.state.organizationInfo}

          />
          <UserPath
            stage={1}
            stageName={"user-learning-path"}
            getOneOrganizationGroup={this.getOneOrganizationGroup}
            orgInfo={this.state.orgUsersLearningPath}

          />

          <Details
            stage={2}
            stageName={"details"}
            getOneOrganizationGroup={this.getOneOrganizationGroup}
            orgUsersInfo={this.state?.organizationUsersInfo}
          />

        </StagesManager>

      </>
    )
  }
}
const mapStateToProps = (state) => ({
  settings: state.settings,
  cart: state.cart,
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrganizationDashboard));

