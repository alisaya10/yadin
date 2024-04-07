import React from "react";
import Configurer from "../Configurer";
// import FormViewer from "../FormViewer";
// import LoaderButton from "../LoaderButton";
import HttpService from "../../utils/Http.services";
import HttpServices from "../../utils/Http.services";
import Link from "next/link";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import UserCourseBox from "../boxes/UserCourseBox";
import ReactStars from "react-stars";
import { checkTranslation, imageAddress, priceStandardView } from "../../utils/useful";
import { translate } from "../../utils/useful";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';

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




class Courses extends React.Component {
  state = {
    like: true,

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

    this.getUserCourses()
    this.getLearningPath()
    // console.log('++++++++++++++++',this.state.path)


  }
  getUserCourses() {

    console.log("TP!")

    HttpServices.request('getUserCourses', {}, (fetchResult, fetchError) => {

      console.log('scsdccacsccs', fetchResult)
      console.log('00000000000000000', fetchError)

      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({ userCourses: fetchResult.info })
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
  getLearningPath() {
    // console.log(this.state.id)
    HttpServices.request('getLearningPath', {}, (fetchResult, fetchError) => {

      console.log('==================', fetchResult)

      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({
        path: fetchResult?.info
      })
      // , () => {
      //     console.log("alert")
      //     this.setState({ isLoading: true })
      //   })
    })


  }
  updatePath(path) {
    // console.log(this.state.id)
    HttpServices.request('updatePath', { course: path.course }, (fetchResult, fetchError) => {

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


  // updateUserPassword = () => {
  //   let data = this.form.getForm();
  //   if (data) {
  //     this.setState({ isLoading: true, errors: {}, message: null });
  //     HttpService.request(
  //       "updateUserPassword",
  //       data,
  //       (fetchResult, fetchError) => {
  //         console.log(fetchError);
  //         this.setState({ isLoading: false });
  //         if (fetchError) {
  //           this.setState({ errors: fetchError.errors });
  //           this.props.addNotif({
  //             type: "error",
  //             title: "{{lang}}errors.profileNotUpdated",
  //             description: fetchError.message,
  //           });
  //           return;
  //         }
  //         this.props.addNotif({
  //           type: "success",
  //           title: "{{lang}}info.profileUpdated",
  //           description: "{{lang}}info.profileUpdatedSuccessfully",
  //         });
  //       }
  //     );
  //   }
  // };


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
    // let path = this.state.path;
    return (
      <Configurer
        settingsInfo={{
          headerTitle: "Courses",
          button: { goBack: true },
        }}
        title={"Courses"}
        description={"Courses"}
        className=""
        changeOnUnmount={true}
      >
        <div className="container">

          <div className="flexcc">
            <div
              className="px-3 py-2 btn-primary6 mt-5 radius-2" style={{ maxWidth: "400px" }}>
              <div className="flexcb">
                <input type={"Text"} placeholder="جستجو.." className="search-input" style={{ color: "#fff", background: "transparent", border: "none" }} />
                <img src="/images/icons/Search-2.svg" />
              </div>
            </div>
          </div>


          <div className="box p-3">
            <div className="border-bottom-gray flexcb row m-0">
              <div className="col-12 col-lg-6">
                <p className="text-color-1 text-semibig nowrap pb-3">مسیر یادگیری</p>
              </div>
              {/* <div className="flexc col-12 col-lg-6 justify-content-end">
                <p className="text-color-2 nowrap pl-4">چینش یادین هابه صورت: </p>
                <button className="btn-primary6 flexcc" style={{ maxWidth: "250px" }}>
                  پیشنهادی
                  <img className="pr-5" src="/images/icons/arrow-down.svg" />
                </button>
              </div> */}
            </div>



            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {Array.isArray(this.state.path?.course) && this.state?.path?.course.map((item, index) => {
                      return (
                        <>
                          {item.removed == false && (

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

                                      {/* <div className="flex-1 d-flex"> */}
                                      <div className="ml-2 mb-2 radius-1" style={{ backgroundColor: index == 0 ? "transparent" : "#202020", width: "4px", flex: 1 }}>
                                      </div>
                                      {/* </div> */}

                                      <div className="p-1 flexcc text-color-2 ml-2" style={{ background: "#202020", borderRadius: "50%", width: 30, height: 30 }}>
                                        <p>{index + 1}</p>
                                      </div>

                                      <div className="ml-2 mt-2 radius-1" style={{ backgroundColor: index == this.state?.path?.course?.length - 1 ? 'transparent' : "#202020", width: "4px", flex: 1 }}>
                                      </div>

                                    </div>


                                    <div className="pt-3 w-100">
                                      <div className="box-1 radius-1">
                                        <div className="row m-0 " style={{}}>
                                          <div className="col-12 col-xl-3" style={{ cursor: "pointer"}}>
                                            <Link href={`/course/${item?._id}`}>

                                              <div className="flexcc">
                                                <img className="radius-1 w-100 h-100" src={imageAddress(item.image, 'resource', 'small')} style={{ objectFit: "cover", }} />
                                              </div>
                                            </Link>
                                            {/* <div className=" flexcc  mt-3" style={{ cursor: "pointer" }}>
                                      {(!item?.bought && item?.price > 0) && (

                                        <button className="btn-primary main-color-1 " style={{ width: "200px" }}>
                                          <Link href={`/course/${item?._id}`}>
                                            <a className="text-normal">
                                              اطلاعات یادین و خرید
                                            </a>
                                          </Link>
                                        </button>
                                      )}

                                      {(item?.bought || item?.price == 0) && (
                                        <button className="btn-primary main-color-1 " style={{ maxWidth: "300px" }}>
                                          <Link href={`/course-info/${item?._id}`}>
                                            <a className="text-normal">
                                              مشاهده یادین
                                            </a>
                                          </Link>
                                        </button>
                                      )}
                                    </div> */}
                                          </div>

                                          <div className="col-12 col-xl-9 pr-xl-0 pl-xl-0 mt-3">

                                            <div className="row m-0 pb-3 ml-0 flexc">
                                              <div className="col-12 col-xl-4 my-3 my-xl-0 flexcb">
                                                <Link href={`/course/${item?._id}`}>

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
                                                      <p className="main-color-1">{item.price > 0 ? priceStandardView(item.price) + 'تومان' : 'رایگان'} </p>
                                                    </div>
                                                  </div>

                                                  <div className="col-12 col-md-6 col-lg-4 pt-0 pr-0 d-flex justify-content-md-end justify-content-lg-start">
                                                    <p className="text-color-2">سطح یادین: {translate(item.level)}</p>
                                                  </div>

                                                  <div className="col-12 col-md-6 col-lg-2 p-0 flexc">
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
                                                <p className="text-color-2">
                                                  {item.description.length > 250 ? `${item.description.substring(0, 250)}...` : item.description}
                                                </p>
                                              </div>
                                            </div>

                                            {/* <div className="row m-0 mt-4"> */}
                                            {/* <div className="col-12 col-md-6 col-xl-3 pt-3 pt-xl-0">
                                          <p>{item.teacher?.name}</p>
                                          {console.log('item.teacher', item.teacher)}
                                        </div> */}
                                            {/* <div className="col-12 col-md-6 col-xl-3 pt-3 pt-xl-0">
                                        <p>دسته بندی یادین: {item.categories}</p>
                                      </div> */}

                                            {/* <div className="col-12 p-0 col-md-6 pt-2">
                                        <p className="text-color-2">سطح یادین: {checkTranslation(item.level)}</p>
                                      </div>

                                      <div className="col-12 p-0 col-md-6 flexc pb-4 text-semibig">
                                        <p className="text-color-1 pl-2">امتیاز :</p>

                                        <ReactStars
                                          count={5}
                                          size={25}
                                          emptyIcon={<i className="far fa-star"></i>}
                                          fullIcon={<i className="fa fa-star"></i>}
                                          // activeColor="#C97EF5"
                                          color2={'#C97EF5'}

                                          edit={false}
                                          value={this.state.course?.score}
                                          isHalf={false}

                                        />
                                      </div>


                                    </div> */}
                                          </div>




                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              )}
                            </Draggable>
                          )}

                        </>

                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {/* <div className='row d-flex' style={{ flexWrap: "wrap" }}>
              {this.state?.userCourses?.map((item, index) => {
                return (
                  <div className="col-12 col-md-6 col-xl-3 mb-4 ">
                    <UserCourseBox data={item.course} />
                  </div>
                )
              })}
            </div> */}
          </div>

        </div>



      </Configurer>
    );
  }
}
const mapStateToProps = state => ({ settings: state.settings, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(Courses);