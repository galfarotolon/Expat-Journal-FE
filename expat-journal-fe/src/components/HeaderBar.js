// dependency imports
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
//styled components
import { Navbar, OtherLinks, MoreLinks, Span } from "../assets/StyledComponents"
import logo from "../images/logoimg.svg"


// Store imports
import { fetchAllPosts } from "../store/actions"

// component imports
import AddPost from "./AddPost"


function HeaderBar(props) {

    const { push } = useHistory();
    const dispatch = useDispatch();

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const LogOut = event => {
        event.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem("fullname");
        dispatch({ type: "LOG_OUT" })
        push("/loggedout")
    }


    return (

        <Navbar>
            <OtherLinks>
                <Link to="/" className="ATag"><img src={logo} /></Link>
                <Link to="/dashboard" className="ATag">Dashboard</Link>
                <Link to="/allposts" className="ATag">View All Posts</Link>
                <Link to="/about" className="ATag">About</Link>
            </OtherLinks>
            {!props.isLoggedIn && (<MoreLinks>
                <Link to="/register" className="ATag">Signup </Link>
                <Span> | </Span>
                <Link to="/login" className="ATag">Login</Link>
            </MoreLinks>)}
            {props.isLoggedIn && (<MoreLinks>
                <Link onClick={toggle} className="ATag"><i className="fas fa-plus add-post"></i></Link>
                <AddPost show={modal} toggle={toggle} />
                <Link onClick={LogOut} className="ATag" alt="sign out"><i className="fas fa-sign-out-alt" alt="sign out"></i></Link>

            </MoreLinks>)}

        </Navbar>
    )

}
const mapStateToProps = state => {
    console.log("headerBar", state)
    return {
        isLoggedIn: state.postReducer.isLoggedIn,
        fullname: state.postReducer.fullname
    }
}
export default connect(
    mapStateToProps,
    {}
)(HeaderBar)