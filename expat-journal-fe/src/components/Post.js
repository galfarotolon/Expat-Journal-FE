import React from 'react';
import {connect} from "react-router-dom";

function Post(props){

}


const mapStateToProps = state => {
    return {
        id: state.postReduceer.userid,
        fullname: state.postReducer.fullname,
        username: state.postReducer.username,
        blogs:state.postReducer.blogs
    }
}
export default connect(
    mapStateToProps,
    {}
)(Post);