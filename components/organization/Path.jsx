import React from "react";
import Configurer from "../Configurer";
import HttpServices from "../../utils/Http.services";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../stores/actionsList";
import Router, { useRouter, withRouter } from "next/router";
import { imageAddress, priceStandardView, translate } from "../../utils/useful";
import Link from "next/link";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "transparent",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  borderRadius: 10,
  background: isDraggingOver ? "#eeeeee30" : "transparent",
  // padding: grid,
  // width: 250
});

class Path extends React.Component {

  state = {
    courseInfo: [
      {
        _id: '1',
        image: "/images/icons/maincardpic.png",
        title: "یادین تیم‌سازی",
        categories: "مدیریت",
        description:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
        rate: "4.5",
        credit: "100 اعتبار",
        level: "مقدماتی",
        teacher: {
          name: "ایمان سرایی",
          image: "/images/icons/profilepic.png",
          rate: "4.6",
          review: "(25نظر)",
          courses: "5 یادین",
          description:
            "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد... ",
        },
      },
      {
        _id: '2',
        image: "/images/icons/maincardpic.png",
        title: "یادین تیم‌سازی",
        categories: "مدیریت",
        description:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
        rate: "4.5",
        credit: "100 اعتبار",
        level: "مقدماتی",
        teacher: {
          name: "ایمان سرایی",
          image: "/images/icons/profilepic.png",
          rate: "4.6",
          review: "(25نظر)",
          courses: "5 یادین",
          description:
            "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد... ",
        },
      },
      {
        _id: '3',
        image: "/images/icons/maincardpic.png",
        title: "یادین تیم‌سازی",
        categories: "مدیریت",
        description:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
        rate: "4.5",
        credit: "100 اعتبار",
        level: "مقدماتی",
        teacher: {
          name: "ایمان سرایی",
          image: "/images/icons/profilepic.png",
          rate: "4.6",
          review: "(25نظر)",
          courses: "5 یادین",
          description:
            "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد... ",
        },
      },
      {
        _id: '4',
        image: "/images/icons/maincardpic.png",
        title: "یادین تیم‌سازی",
        categories: "مدیریت",
        description:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
        rate: "4.5",
        credit: "100 اعتبار",
        level: "مقدماتی",
        teacher: {
          name: "ایمان سرایی",
          image: "/images/icons/profilepic.png",
          rate: "4.6",
          review: "(25نظر)",
          courses: "5 یادین",
          description:
            "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد... ",
        },
      },
      {
        _id: '5',
        image: "/images/icons/maincardpic.png",
        title: "یادین تیم‌سازی",
        categories: "مدیریت",
        description:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
        rate: "4.5",
        credit: "100 اعتبار",
        level: "مقدماتی",
        teacher: {
          name: "ایمان سرایی",
          image: "/images/icons/profilepic.png",
          rate: "4.6",
          review: "(25نظر)",
          courses: "5 یادین",
          description:
            "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد... ",
        },
      }
    ],
  }

  componentDidMount() {
    this.setState({ path: this.props.orgInfo?.learningPath }, () => {
      console.log('...................', this.state.path);
    })
  }
  componentDidUpdate() {
    if (this.props.orgInfo?.learningPath && (!this.state.path || this.state.path == null || this.state.path == undefined)) {
      this.setState({ path: this.props.orgInfo?.learningPath }, () => {

      })
    }
  }
  // updateUserInfo = () => {
  //   let data = this.form.getForm()

  //   console.log(data)
  //   if (data) {
  //     this.setState({ isLoading: true })

  //     HttpServices.request("updateUserInfo", data, (fetchResult, fetchError) => {
  //       this.setState({ isLoading: false })
  //       if (fetchError) {
  //         this.setState({ errors: fetchError.errors })
  //         this.props.addNotif({ type: 'error', title: '{{lang}}errors.profileNotUpdated', description: fetchError.message })
  //         return
  //       }
  //       this.setState({ errors: null })
  //       this.props.setUser(fetchResult.user, null, true)
  //       this.props.addNotif({ type: 'success', title: '{{lang}}info.profileUpdated', description: '{{lang}}info.profileUpdatedSuccessfully' })
  //     })
  //   }
  // }
  updatePath(path) {
    console.log('sdfvcsadbfvscd', path, this.props.orgInfo._id)
    HttpServices.request('updatePath', { course: path.course, org: this.props.orgInfo._id }, (fetchResult, fetchError) => {

      console.log('==================', fetchResult)

      if (fetchError) {
        return
      }

      // , () => {
      //     console.log("alert")
      //     this.setState({ isLoading: true })
      //   })
    })


  }
  postWishList = (liked, course) => {

    console.log("liked", liked);
    console.log("course", course)
    // let course = this.state.course

    course.liked = liked
    this.setState({ course })

    HttpServices.request('postWishList', { course: course._id, status: liked }, (fetchResult, fetchError) => {
      console.log('postWishList', fetchError)


      if (fetchError) {

        course.liked = !liked
        this.setState({ course })
        console.log(fetchError)
        return
      }
      console.log(fetchError)
      console.log('postWishList', fetchResult)


    })

  }

  handlelike = () => {
    this.setState({ like: !this.state.like })
  }

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const courses = reorder(
      this.state.path.course,
      result.source.index,
      result.destination.index
    );

    let path = this.state.path
    path.course = courses
    this.updatePath(path)

    this.setState({ path });
  }


  render() {

    return (
      <>
        <div className="container">
          <div className="py-2 pb-4">

            <div className="flexcb">
              <div className="px-5">
                <p className="text-semibig text-color-1 font-bold">مسیر یادگیری</p>
              </div>

              <div className="flexc">
                <button onClick={() => { this.props.changeStage("organization") }} className="flexc">
                  <p className="text-color-2 pl-1">بازگشت</p>
                  <img src="/images/icons/arrow-left2.svg" />
                </button>
              </div>
            </div>

            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {Array.isArray(this.state.path?.course) && this.state.path?.course.map((item, index) => {
                      return (
                        <Draggable key={item._id} draggableId={item._id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >

                              <div className="flexcc">

                                <div className="flexcc flex-column flex-1" style={{ alignSelf: 'stretch' }}>
                                  <div className="ml-2 mb-2 radius-1" style={{ backgroundColor: index == 0 ? "transparent" : "#202020", width: "4px", flex: 1 }}>
                                  </div>
                                  <div className="p-1 flexcc text-color-2 ml-2" style={{ background: "#202020", borderRadius: "50%", width: 30, height: 30 }}>
                                    <p>{index + 1}</p>
                                  </div>
                                  <div className="ml-2 mt-2 radius-1" style={{ backgroundColor: index == this.state?.path?.course?.length - 1 ? 'transparent' : "#202020", width: "4px", flex: 1 }}>
                                  </div>
                                </div>



                                <div className="pt-3 w-100">
                                  <div className="box-1 radius-1">
                                    <div className="row m-0 " style={{ display: 'flex', justifyContent: 'space-between' }}>
                                      <Link href={`/course-info/${item?._id}`}>

                                        <div className="col-12 col-xl-3 flexc" style={{ flexDirection: "column", cursor: "pointer" }}>
                                          <img className="radius-1 w-100 h-100" src={imageAddress(item.image, 'resource', 'small')} style={{ objectFit: "contain" }} />
                                        </div>
                                      </Link>
                                      <div className="col-12 col-xl-9 pr-xl-0 pl-xl-0 mt-3">
                                        <div className="row m-0 pb-3 ml-0 flexc">
                                          <div className="col-12 col-xl-4 my-3 my-xl-0 flexcb">
                                            <Link href={`/course-info/${item?._id}`}>

                                              <p className="text-color-1 text-bold m-0 text-semibig" style={{ cursor: "pointer" }}>{item.title}</p>
                                            </Link>
                                            <div className="d-block d-xl-none ">
                                              {this.props.user && this.props.user.loggedin && (
                                                <div className="d-flex pl-3" >
                                                  {item?.liked ? (
                                                    <button className="p-0 pt-1" onClick={() => this.postWishList(false, item)}>
                                                      <img className="" src="/images/icons/heart-full.svg" />
                                                    </button>
                                                  ) : (
                                                    <button className="p-0 pt-1" onClick={() => this.postWishList(true, item)}>
                                                      <img className="" src="/images/icons/heart-2.svg" />
                                                    </button>
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                          </div>

                                          <div className="col-12 col-xl-12">
                                            <div className="row m-0 flexc">
                                              <div className="p-0 col-12 col-md-6 col-lg-3 flexc">
                                                <div className="d-flex align-items-center py-2 pl-4 radius-1">
                                                  <img src="/images/price.png" className="ml-2"></img>
                                                  <p className="main-color-1">{item?.price > 0 ? priceStandardView(item?.price) + 'تومان' : 'رایگان'} </p>
                                                </div>
                                              </div>

                                              <div className="col-12 col-md-6 col-lg-4 pt-0 pr-0 d-flex justify-content-md-end justify-content-lg-start">
                                                <p className="text-color-2">سطح یادین: {translate(item.level)}</p>
                                              </div>

                                              <div className="col-12 col-md-6 col-lg-2 p-0 flexc">
                                                {/* {console.log('ASDFGHJHGFDSADFGHHFSDDSFDGH', item)} */}

                                                <p className="text-color-2 pl-2">امتیاز : {(item.score).toFixed(1)}</p>

                                              </div>


                                              <div className="p-0 col-12 col-md-6 col-lg-3 d-flex flexc justify-content-md-end">
                                                <div className="d-none d-xl-block">

                                                  {this.props.user && this.props.user.loggedin && (
                                                    <div className="d-flex pl-3" >
                                                      {item?.liked ? (
                                                        <button className="p-0 pt-1" onClick={() => this.postWishList(false, item)}>
                                                          <img className="" src="/images/icons/heart-full.svg" />
                                                        </button>
                                                      ) : (
                                                        <button className="p-0 pt-1" onClick={() => this.postWishList(true, item)}>
                                                          <img className="" src="/images/icons/heart-2.svg" />
                                                        </button>
                                                      )}
                                                    </div>
                                                  )}
                                                </div>
                                                <button className="pr-0">
                                                  <Link href={`/course-info/${item?._id}`}>
                                                    <a className="flexcc">
                                                      <p className="text-color-2">صفحه یادین</p>
                                                      <img className="pr-2" src="/images/icons/arrow-left.svg" />
                                                    </a>
                                                  </Link>
                                                </button>

                                              </div>
                                            </div>
                                          </div>

                                        </div>

                                        <div className="">
                                          <div className="">
                                            <p className="text-color-2">
                                              {item.description.length > 250 ? `${item.description.substring(0, 250)}...` : item.description}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

          </div>










          {/* <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {Array.isArray(this.state.path?.course) && this.state?.path?.course.map((item, index) => {
                    return (
                      <Draggable key={item._id} draggableId={item._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >

                            <div className="flexcc">

                              <div className="flexcc flex-column flex-1" style={{ alignSelf: 'stretch' }}>
                                <div className="ml-2 mb-2 radius-1" style={{ backgroundColor: index == 0 ? "transparent" : "#202020", width: "4px", flex: 1 }}>
                                </div>
                                <div className="p-1 flexcc text-color-2 ml-2" style={{ background: "#202020", borderRadius: "50%", width: 30, height: 30 }}>
                                  <p>{index + 1}</p>
                                </div>
                                <div className="ml-2 mt-2 radius-1" style={{ backgroundColor: index == this.state?.path?.course?.length - 1 ? 'transparent' : "#202020", width: "4px", flex: 1 }}>
                                </div>
                              </div>


                              <div className="pt-3">
                                <div className="box-1 radius-1">
                                  <div className="row m-0 " style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="col-12 col-xl-3 flexc" style={{ flexDirection: "column" }}>
                                      <img className="radius-1 w-100 h-100" src={imageAddress(item.image)} alt={item.title} style={{ color: '#fff', objectFit: "contain" }} />
                                    </div>

                                    <div className="col-12 col-xl-9 pr-xl-0 pl-xl-0 mt-3">

                                      <div className="row m-0 pb-3 ml-0 flexc">
                                        <div className="col-12 col-xl-4 my-3 my-xl-0 flexcb">
                                          <p className="text-color-1 text-bold m-0 text-semibig">{item.title}</p>

                                          <div className="d-block d-xl-none ">
                                            {this.props.user && this.props.user.loggedin && (
                                              <div className="d-flex pl-3" >
                                                {item?.liked ? (
                                                  <button className="p-0 pt-1" onClick={() => this.postWishList(false, item)}>
                                                    <img className="" src="/images/icons/heart-full.svg" />
                                                  </button>
                                                ) : (
                                                  <button className="p-0 pt-1" onClick={() => this.postWishList(true, item)}>
                                                    <img className="" src="/images/icons/heart-2.svg" />
                                                  </button>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        </div>

                                        <div className="col-12 col-xl-8">
                                          <div className="row m-0 flexc">
                                            <div className="p-0 col-12 col-md-6 col-lg-3 flexc">
                                              <div className="d-flex align-items-center py-2 pl-4 radius-1">
                                                <img src="/images/price.png" className="ml-2"></img>
                                                <p className="main-color-1">{item.price > 0 ? priceStandardView(item.price) + 'تومان' : 'رایگان'} </p>
                                              </div>
                                            </div>

                                            <div className="col-12 col-md-6 col-lg-4 pt-0 pr-0 d-flex justify-content-md-end justify-content-lg-start">
                                              <p className="text-color-2">سطح یادین: {translate(item.level)}</p>
                                            </div>

                                            <div className="col-12 col-md-6 col-lg-2 p-0 flexc">
                                              <p className="text-color-2 pl-2">امتیاز : {this.state.course?.score}</p>

                                            </div>


                                            <div className="p-0 col-12 col-md-6 col-lg-3 d-flex flexc justify-content-md-end">
                                              <div className="d-none d-xl-block">

                                                {this.props.user && this.props.user.loggedin && (
                                                  <div className="d-flex pl-3" >
                                                    {item?.liked ? (
                                                      <button className="p-0 pt-1" onClick={() => this.postWishList(false, item)}>
                                                        <img className="" src="/images/icons/heart-full.svg" />
                                                      </button>
                                                    ) : (
                                                      <button className="p-0 pt-1" onClick={() => this.postWishList(true, item)}>
                                                        <img className="" src="/images/icons/heart-2.svg" />
                                                      </button>
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                              <button className="pr-0">
                                                <Link href={`/course/${item?._id}`}>
                                                  <a className="flexcc">
                                                    <p className="text-color-2">صفحه یادین</p>
                                                    <img className="pr-2" src="/images/icons/arrow-left.svg" />
                                                  </a>
                                                </Link>
                                              </button>

                                            </div>
                                          </div>
                                        </div>

                                      </div>

                                      <div className="">
                                        <div className="">
                                          <p className="text-color-2">{item.description}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>  */}






        </div>
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
)(withRouter(Path));

