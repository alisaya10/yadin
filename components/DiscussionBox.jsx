import Link from 'next/link';
import React from 'react';
import Loader from 'react-loader-spinner';
import HttpServices from '../utils/Http.services';
// import Editor from './Editor';
import FormViewer from './FormViewer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../stores/actionsList';
import Router from 'next/router';
import { checkTranslation } from '../utils/useful';


class DiscussionBox extends React.Component {


    state = {
        headers: [
            { type: 'TextInput', key: 'title', information: { label: '{{lang}}title', placeholder: '{{lang}}title', required: true } },
            { key: 'category', type: 'SelectInput', information: { label: '{{lang}}category', address: 'getContents', filter: { lng: this.props?.lng, page: 'ForumsCategories' }, fields: { title: 'values.title', value: '_id' }, type: 'api', isSearchable: true, placeholder: '{{lang}}category', required: true }, showMain: true },
            { key: 'body', type: 'EditorInput', col: '12', information: { label: '{{lang}}body', placeholder: '{{lang}}body', required: true, inputClass: 'null' }, showMain: false },
        ],
    }

    // const [editorLoaded, setEditorLoaded] = useState(false);
    // const [data, setData] = useState();

    // useEffect(() => {
    //     setEditorLoaded(true);
    // }, []);


    // const editorRef = useRef();
    // const [editorLoaded, setEditorLoaded] = useState(false);
    // const { CKEditor, ClassicEditor } = editorRef.current || {}

    // useEffect(() => {
    //     editorRef.current = {
    //         CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
    //         ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
    //     };
    // }, []);

    componentDidMount() {
        setTimeout(() => {
            this.setState({ showContent: true })
        }, 100);
    }


    postForm = () => {
        let data = this.form.getForm()

        if (data) {
            data.lng = this.props.lng
            // console.log(data)

            this.setState({ isPostingData: true })

            HttpServices.request('postQuestion', data, (fetchResult, fetchError, fetchStatus) => {
                this.setState({ isPostingData: false })
                // console.log(fetchError)

                if (fetchError) {
                    this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.postedFailed', description: fetchError.message })
                    return
                }

                this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.postedSuccesfully', description: '{{lang}}info.dataPostedSuccesfully' })

                Router.push('/forums/question/' + fetchResult.info?._id);

                // console.log(fetchResult)
                // this.setState({ searchResults: fetchResult.info })
            })
        }

    }





    render() {
        if (this.state.showContent) {
            return (
                <div className="w-100 flexcc pb-5" style={{ backgroundColor: '#f2f6f8' }}>
                    <div className='w-100' style={{ maxWidth: 900 }}>
                        <div className=" my-5  p-5 w-100" style={{ backgroundColor: '#fff', borderRadius: 15 }}>
                            <div className="flexc mb-0">
                                <h2 className='m-0' style={{ fontSize: "20px", fontWeight: "400" }}><span style={{ color: "#00CD74" }}>IoTsmile</span> {checkTranslation('{{lang}}Forums')}</h2>
                            </div>
                            <div className="title-discussion mb-4">

                                <h3 className='m-0' style={{ fontWeight: "400", fontSize: 30 }}>{checkTranslation('{{lang}}Start-a-Conversation')}</h3>
                            </div>

                            {(!this.props.user || !this.props.user.loggedin) && (
                                <div className='text-center px-2 py-5' style={{ backgroundColor: '#f7f9fa', borderRadius: 15 }}>
                                    <img src={'/images/padlock.svg'} height={60} />
                                    <p className='text-big text-bold mt-2 mb-1' style={{}}>{checkTranslation('{{lang}}login')}</p>
                                    <p>{checkTranslation('{{lang}}forums-new-slug-login-desc')}</p>

                                    <div className='flexcc mt-3'>
                                        <Link href={'/login'}>
                                            <a className='mx-1' style={{ color: '#fff', backgroundColor: 'rgb(0, 205, 116)', borderRadius: 4, padding: '4px 15px' }}>
                                                <p style={{ color: '#fff', }}>{checkTranslation('{{lang}}login')}</p>
                                            </a></Link>

                                        <Link href={'/login'}>
                                            <a className='mx-1' style={{ color: '#789', backgroundColor: '#eee', borderRadius: 4, padding: '4px 15px' }}>
                                                <p style={{ color: '#789', }}>{checkTranslation('{{lang}}signup')}</p>
                                            </a></Link>
                                    </div>
                                </div>
                            )}

                            {this.props.user && this.props.user.loggedin && (
                                <div>
                                    <FormViewer initData={this.props.question} ref={el => this.form = el} headers={this.state.headers} inputClass={"modern-input"} />


                                    <div className="title-input-discussion">

                                        <div className="btn-for-post w-100">
                                            {this.state.isPostingData ? (
                                                <div className='flexc'>
                                                    <Loader
                                                        type="Oval"
                                                        color="00CD74"
                                                        height="40"
                                                        width="40"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="">
                                                    <button onClick={() => this.postForm()} style={{ backgroundColor: '#00CD74', borderRadius: 4, color: '#fff', fontSize: 15, padding: '7px 30px' }}>{checkTranslation('{{lang}}Post')}</button>
                                                    <Link href={"/forums"}><button className='mx-3' style={{ color: '#789', fontSize: 15 }}>{checkTranslation('{{lang}}Cancel')}</button></Link>
                                                </div>
                                            )}

                                        </div>

                                    </div>

                                    {/* <div className="btn-for-post w-100 d-flex justify-content-end">
                                <div className="">
                                    <Link href={"/forums"}><button className='mx-3' style={{color:'#789',fontSize:15}}>Cancel</button></Link>
                                    <button style={{backgroundColor:'#00CD74',borderRadius:4,color:'#fff',fontSize:15,padding:'7px 30px'}}>Post</button>

                                </div>

                            </div> */}
                                </div>
                            )}
                        </div>

                    </div>

                </div>
            )
        } else {
            return <div style={{ height: '100vh' }}></div>
        }
    }
}


const mapStateToProps = state => ({ settings: state.settings, cart: state.cart, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DiscussionBox);