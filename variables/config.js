const siteConfig = {
  // languages: ["fa", "en"],
  languages: ["fa"],

  defaultLng: 'fa',
  dontShowUrlForDefaultLng: false,
  forceUrl: false,


  showCart: true,
  showProfile: true,
  showLanguage: true,
  showDeliveryCalcText: false,

  // domainName: 'https://yadin.elitive.ir/yadin/',
  // rootDomain: 'https://yadin.elitive.ir/yadin/',
  // domain: 'https://yadin.elitive.ir/yadin/',
  // assetsDomain: 'https://yadincdn.elitive.ir/',
  // socketDomain: 'https://socket.elitive.ir',

    rootDomain: 'https://yaadin.com/yadin/',
    domain: 'https://yaadin.com/yadin/',
    assetsDomain: 'https://cdn.yaadin.com/',
    socketDomain: "https://yaadin.com/yadin/",

    // rootDomain: 'https://yaadin.com/yadin/',
    // domain: 'https://yaadin.com/yadin/',
    // assetsDomain: 'https://yaadincdn.com/',
    // socketDomain: "https://yaadin.com/yadin/",

  // rootDomain: 'http://192.168.90.20/',
  // domain: 'http://192.168.90.20/iot/',
  // assetsDomain: 'http://192.168.90.20/assets/',
  // socketDomain: "http://192.168.90.20/",

  // rootDomain: 'http://localhost:5070/',
  // domain: 'http://localhost:5070/yadin/',
  // assetsDomain: 'http://localhost:5070/assets/',
  // socketDomain: "http://localhost:5070/",



  name: 'yadin',
  siteName: 'yadin',
  // phone: '0218794',
  // instagram: 'https://instagram.com/anp-co',
  // email: 'info.iotsmile@gmail.com',
  facebook: '',
}

const siteTheme = {


  logo: '/images/i-logo.png',
  logo_s: '/images/i-logo.png',
  // invertLogo: true,


  themeColors: { headerBack: '#f2f7f8', headerFont: '#000000' },
  // themeColors: { headerBack: '#46196f', headerFont: '#ffffff' },
  // themeColors: { headerBack: '#000000', headerFont: '#ffffff' },



  backgroundColors: { normal: '#e2e8ea', plus: '#ee5050', luxury: '#101010', custom: '#d3b564' },
  colors: { normal: '#202020', plus: '#fff', luxury: '#fff', custom: '#101010' },
}

const languagesInfo = {
  en: {
    shortName: 'en',
    direction: 'ltr',
    name: 'English',
    icon: '/images/english.svg'
  },
  fa: {
    shortName: 'fa',
    direction: 'rtl',
    name: 'فارسی',
    icon: '/images/persian.svg'
  },

  // fr: {
  //     shortName: 'fa',
  //     direction: 'rtl',
  //     name: 'فارسی',
  //     icon: '/images/persian.svg'
  // }
}


let apisList = {

  // USER
  // postUserIndicator: { route: 'users/signup/postUserIndicator', server: 'yc', hashMethod: '', params: [{ key: "userIndicator", type: 'string', required: true }, { key: "indicatorType", type: 'string', required: true }] },
  // signupActicationCode: { route: 'users/signup/postActicationCode', server: 'yc', hashMethod: '', params: [{ key: "userIndicator", type: 'string', required: true }, { key: "code", type: 'number', required: true }, { key: "indicatorType", type: 'string', required: true }] },
  // signinActicationCode: { route: 'users/signin/postActicationCode', server: 'yc', hashMethod: '', params: [{ key: "userIndicator", type: 'string', required: true }, { key: "code", type: 'number', required: true }, { key: "indicatorType", type: 'string', required: true }] },
  // postUserInfo: { route: 'users/signup/postUserInfo', server: 'yc', hashMethod: '', flexibleParams: true, params: [{ key: "userIndicator", type: 'string', required: true }, { key: "code", type: 'number', required: true }, { key: "indicatorType", type: 'string', required: true }] },
  // postForgotPassword: { route: 'users/signup/postForgotPassword', server: 'yc', hashMethod: '', params: [{ key: "userIndicator", type: 'string', required: true }, { key: "indicatorType", type: 'string', required: true }] },
  // postPassword: { route: 'users/signup/postPassword', server: 'yc', hashMethod: '', params: [{ key: "userIndicator", type: 'string', required: true }, { key: "code", type: 'number', required: true }, { key: "password", type: 'string', required: true }, { key: "indicatorType", type: 'string', required: true }] },
  // postNewPassword: { route: 'users/signup/postNewPassword', server: 'yc', hashMethod: '', params: [{ key: "userIndicator", type: 'string', required: true }, { key: "code", type: 'number', required: true }, { key: "password", type: 'string', required: true }, { key: "indicatorType", type: 'string', required: true }] },
  getUserInfo: { route: 'users/getInfo', server: 'yc', hashMethod: '', auth: 'token', params: [] },
  getOneUser: { route: 'users/getOneUser', server: 'yc', hashMethod: '', auth: 'token', params: [{ key: "id", type: 'string', required: true }] },
  updateUserInfo: { route: 'users/updateInfo', server: 'yc', hashMethod: '', flexibleParams: true, auth: 'token', params: [{ key: "name", type: 'string', required: true }, { key: "name", type: 'family', required: true }] },
  updateUserPassword: { route: 'users/updateUserPassword', server: 'yc', hashMethod: '', flexibleParams: true, auth: 'token', params: [{ key: "currentPassword", type: 'string', required: true }, { key: "newPassword", type: 'string', required: true }] },
  getInbox: { route: 'users/getInbox', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  seenInbox: { route: 'users/seenInbox', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getUsers: { route: 'users/getUsers', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  updateUser: { route: 'users/updateUser', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // removeUser: { route: 'users/removeUser', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getAdmins: { route: 'users/getAdmins', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // updateAdmin: { route: 'users/updateAdmin', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // removeAdmin: { route: 'users/removeAdmin', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // updatePayment: { route: 'payments/updatePayment', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // removePayment: { route: 'payments/removePayment', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // usersExport: { route: 'users/usersExport', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },

  // increaseBalance: { route: 'payments/increaseBalance', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  requestIncreaseBalance: { route: 'payments/requestIncreaseBalance', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getPayments: { route: 'payments/getPayments', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getMyPayments: { route: 'payments/getMyPayments', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  ignoreData: { route: 'payments/ignoreData', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  updatePayment: { route: 'payments/updatePayment', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  removePayment: { route: 'payments/removePayment', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  verifyIncrease: { route: 'payments/verifyIncrease', server: 'yc', hashMethod: '', params: [], auth: null, flexibleParams: true },


  //! LOGIN
  checkUserExist: { route: 'users/check', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  userSendVerifyCode: { route: 'users/signup/verifyCode', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  userPostInfo: { route: 'users/signup/postInfo', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  login: { route: 'users/authenticate', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  postForgotPassword: { route: 'users/forgotPassword', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  forgotPasswordVerifyCode: { route: 'users/forgotPassword/verifyCode', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  forgotPasswordPostPassword: { route: 'users/forgotPassword/postPassword', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },

  //// Content
  getContents: { route: 'content/getContents', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getOneContent: { route: 'content/getOneContent', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  postContent: { route: 'content/postContent', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  removeContent: { route: 'content/removeContent', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getRandomContents: { route: 'content/getRandomContents', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },

  // baners
  postBaner: { route: 'baners/postBaner', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  getbaners: { route: 'baners/getAll', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  removebaner: { route: 'baners/removeBaner', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  getOneBaner: { route: 'baners/getOneBaner', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  // Ticketing
  getMyTickets: { route: 'ticketing/getMyTickets', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getOneTicket: { route: 'ticketing/getOneTicket', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  postTicket: { route: 'ticketing/postTicket', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  postTicketReply: { route: 'ticketing/postTicketReply', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getTickets: { route: 'ticketing/getTickets', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // finantial
  getMyFinantials: { route: 'finantial/getMyFinantials', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },

  // Academy
  getCourses: { route: 'academy/getCourses', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getCoursesNotes: { route: 'academy/getCoursesNotes', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getCoursesPractices: { route: 'academy/getCoursesPractices', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getCoursesQuizes: { route: 'academy/getCoursesQuizes', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getSpecialCourses: { route: 'academy/getSpecialCourses', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  searchCourses: { route: 'academy/searchCourses', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getOneCourse: { route: 'academy/getOneCourse', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  //getTeacher
  getTeacher: { route: 'academy/getTeacher', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  //Notes
  getNotes: { route: 'notes/getNotes', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getOneNote: { route: 'notes/getOne', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  postNote: { route: 'notes/postNote', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  removeNote: { route: 'notes/removeNote', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  //Review
  getAllReviews: { route: 'reviews/getAllReviews', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getOneReview: { route: 'reviews/getOneReview', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  addReviews: { route: 'reviews/addReviews', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  removeReviews: { route: 'reviews/removeReviews', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  //TeacherReview
  getAllTeacherReviews: { route: 'teacherReviews/getAllTeacherReviews', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getOneTeacherReview: { route: 'teacherReviews/getOneTeacherReview', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  addTeacherReviews: { route: 'teacherReviews/addTeacherReviews', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  removeTeacherReviews: { route: 'teacherReviews/removeTeacherReviews', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },


  //lessons
  getLessons: { route: 'academy/getLessons', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getOneLesson: { route: 'academy/getOneLesson', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },

  //practices
  getPractices: { route: 'academy/getUserPractices', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  postPractice: { route: 'academy/postPractice', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  removePractice: { route: 'academy/removePractice', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  getspecialPractices: { route: 'academy/getSpecialPractices', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  getonePractice: { route: 'academy/getOnePractice', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },

  // wishList
  getWishLists: { route: 'wishList/getWishLists', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  postWishList: { route: 'wishList/postWishList', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  removeWishList: { route: 'wishList/removeWishList', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },

  //notes 
  postNote: { route: 'notes/postNote', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getNotes: { route: 'notes/getNotes', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  removeNote: { route: 'notes/removeNote', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },


  // category
  categoryAdd: { route: 'categories/addCategory', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  getAllCategory: { route: 'categories/getAllCategory', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },

  // learningPath
  addToLearningPath: { route: 'learningPath/addToLearningPath', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  updatePath: { route: 'learningPath/updatePath', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  removeFromLearningPath: { route: 'learningPath/removeFromLearningPath', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  getLearningPath: { route: 'learningPath/getOne', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },


  // do not need this in front
  removeCategory: { route: 'categories/removeCategory', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  getOneCategory: { route: 'categories/getOneCategory', server: 'yc', hashMethod: '', auth: null, params: [], flexibleParams: true },
  getMainCategories: { route: 'categories/getMainCategories', server: 'yc', hashMethod: '', auth: null, params: [], flexibleParams: true },
  addSpecifications: { route: 'categories/addSpecifications', server: 'yc', hashMethod: '', auth: null, params: [], flexibleParams: true },
  checkSync: { route: 'categories/checkSync', server: 'yc', hashMethod: '', auth: null, params: [], flexibleParams: true },

  // Specification
  // do not need this in front
  getFilteredSpecifications: { route: 'categories/getFilteredSpecifications', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  moveSpecifications: { route: 'categories/RemoveSpecifications', server: 'yc', hashMethod: '', auth: null, params: [], flexibleParams: true },
  getAllSpecifications: { route: 'categories/getAllSpecifications', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  addSpecifications: { route: 'categories/addSpecifications', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  RemoveSpecifications: { route: 'categories/RemoveSpecifications', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },

  //quiz 


  // startQuiz: { route: 'userQuiz/startQuiz', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // submitAnswer: { route: 'userQuiz/submitAnswer', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },

  // learningpath
  //question 
  getQuestions: { route: 'question/getQuestions', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  postQuestion: { route: 'question/postQuestion', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  removeQuestion: { route: 'question/removeQuestion', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getOneQuestio: { route: 'question/getOneQuestio', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },


  //quiz 
  getQuizes: { route: 'quizes/getQuizes', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  postQuiz: { route: 'quizes/postQuiz', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  removeQuiz: { route: 'quizes/removeQuiz', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getQuiz: { route: 'quizes/getOneQuiz', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },

  // userQuiz 
  startQuiz: { route: 'userQuiz/startQuiz', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  endQuiz: { route: 'userQuiz/endQuiz', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  currentQuiz: { route: 'userQuiz/getCurrenrQuiz', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getUserQuizes: { route: 'userQuiz/getUserQuizes', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  submitAnswer: { route: 'userQuiz/submitAnswer', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // userPractice
  startPractice: { route: 'userPractice/startPractice', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  endPractice: { route: 'userPractice/endPractice', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  currentPractice: { route: 'userPractice/getCurrenrPractice', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getUserPractices: { route: 'userPractice/getUserPractices', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  submitPracticeAnswer: { route: 'userPractice/submitAnswer', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // userCourse
  getUserCourses: { route: 'userCourse/getUserCourses', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  postUserCourse: { route: 'userCourse/postUserCourse', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  removeUserCourse: { route: 'userCourse/removeUserCourse', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getOneUserCourse: { route: 'userCourse/getOne', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getCurrentLesson: { route: 'userCourse/getCurrentLesson', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getCurrentLessonCourse: { route: 'userCourse/getCurrentLessonCourse', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getDetails: { route: 'userCourse/getDetails', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  videoPaused: { route: 'userCourse/videoPaused', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  videoEnded: { route: 'userCourse/videoEnded', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },



  // Comment
  addComment: { route: 'comments/add', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getAllComments: { route: 'comments/getAll', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getVerfiedComments: { route: 'comments/getVerfied', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getOneComment: { route: 'comments/getOne', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  removeComment: { route: 'comments/remove', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },


  // organizations
  getMyOrganizationInfo: { route: 'organizationGroup/getMyOrganizationInfo', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  getOneOrganizationGroup: { route: 'organizationGroup/getOneOrganizationGroup', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  getOrgUserLearningPath: { route: 'organizationGroup/getOrgUserLearningPath', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  getMyOrganizationUsersInfo: { route: 'organizationGroup/getMyOrganizationUsersInfo', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  getMyOrganizationUserscourseInfo: { route: 'organizationGroup/getMyOrganizationUserscourseInfo', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },

  // courseFiles
  getCourseFiles: { route: 'coursefiles/getCourseFiles', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  getOneCourseFile: { route: 'coursefiles/getOneCourseFile', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  postCourseFile: { route: 'coursefiles/postCourseFile', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },
  removeCourseFile: { route: 'coursefiles/removeCourseFile', server: 'yc', hashMethod: '', auth: 'token', params: [], flexibleParams: true },

  //Vouchers
  validateVouchers: { route: 'vouchers/validate', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },

  //Values
  // getValuesWithData: { route: 'values/getValuesWithData', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // postValue: { route: 'values/postValue', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // removeValue: { route: 'values/removeValue', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getOneValue: { route: 'values/getOneValue', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getMyPayments: { route: 'payments/getMyPayments', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },

  //blogs
  // getBlogs: { route: 'blogs/getBlogs', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // // postBlog: { route: 'blogs/postBlog', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // removeBlog: { route: 'blogs/removeBlog', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getOneBlog: { route: 'blogs/getOneBlog', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getRecommendedBlogs: { route: 'blogs/getRecommendedBlogs', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // searchBlogs: { route: 'blogs/searchBlogs', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getSpecialBlogs: { route: 'blogs/getSpecialBlogs', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },


  // Shop
  // getProducts: { route: 'shop/getProducts', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getOneProduct: { route: 'shop/getOneBlog', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getRecommendedProducts: { route: 'shop/getRecommendedProducts', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // searchProducts: { route: 'shop/searchProduct', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getSpecialProducts: { route: 'shop/getSpecialProducts', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getMyProducts: { route: 'shop/getMyProducts', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getProducts: { route: 'shop/getProducts', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getProduct: { route: 'shop/getProduct', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // postProduct: { route: 'shop/postProduct', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // removeProduct: { route: 'shop/removeProduct', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },


  // getRecommendedProducts: { route: 'shop/getRecommendedProducts', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getDocsSummary: { route: 'documentation/getDocsSummary', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // searchDocs: { route: 'documentation/searchDocs', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getOneDoc: { route: 'documentation/getOneDoc', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },

  // postPartner: { route: 'shop/postPartner', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getMyAddresses: { route: 'shop/getMyAddresses', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // postAddress: { route: 'shop/postAddress', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // postOrder: { route: 'shop/postOrder', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getOneOrder: { route: 'shop/getOneOrder', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getMyOrders: { route: 'shop/getMyOrders', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getPaymentLink: { route: 'shop/getPaymentLink', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // verifyPayment: { route: 'shop/verifyPayment', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },

  // removeAddress: { route: 'shop/removeAddress', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },


  // Forums

  // getUsersQuestions: { route: 'forums/getUsersQuestions', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getOneQuestion: { route: 'forums/getOneQuestion', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // postQuestion: { route: 'forums/postQuestion', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // removeQuestion: { route: 'forums/removeQuestion', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },

  // searchQuestions: { route: 'forums/searchQuestions', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getSpecialQuestions: { route: 'forums/getSpecialQuestions', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },

  // postAnswer: { route: 'forums/postAnswer', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // removeAnswer: { route: 'forums/removeAnswer', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // postVote: { route: 'forums/postVote', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },


  // Ticketing
  // getMyTickets: { route: 'ticketing/getMyTickets', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getOneTicket: { route: 'ticketing/getOneTicket', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // postTicket: { route: 'ticketing/postTicket', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // postTicketReply: { route: 'ticketing/postTicketReply', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  // getTickets: { route: 'ticketing/getTickets', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },


  // getMessengers: { route: 'messenger/getMessengers', server: 'yc', hashMethod: '', params: [], auth: 'vtoken', flexibleParams: true },
  // getMessengerMessages: { route: 'messenger/getMessengerMessages', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getMyMessengers: { route: 'messenger/getMyMessengers', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },
  getMessengerMessages: { route: 'messenger/getMessengerMessages', server: 'yc', hashMethod: '', params: [], auth: 'token', flexibleParams: true },

}


export { siteConfig, siteTheme, languagesInfo, apisList }