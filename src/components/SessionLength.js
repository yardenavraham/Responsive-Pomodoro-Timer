import React from 'react';
import { FaPlus } from "react-icons/fa"
import { FaMinus } from "react-icons/fa"
 
function SessionLength(props) {
    function decreaseSession() {
        if (props.sessionLength === 1) {
            return;
        }
        props.decreaseSession();

    }

    function increaseSession() {
        if (props.sessionLength === 60) {
            return;
        }
        props.increaseSession();
    }
    return (
        <div className="col-auto">
            <h6>Session Length</h6>
            <div className={'d-flex justify-content-center align-items-center'}>
                <button type="button" className="btn btn-outline-dark up-down-btn"
                    disabled={props.isStart === true ? "disabled" : ""}
                    onClick={decreaseSession}><FaMinus/></button>
                <p>{props.sessionLength}</p>
                <button type="button" className="btn btn-outline-dark up-down-btn"
                    disabled={props.isStart === true ? "disabled" : ""}
                    onClick={increaseSession}><FaPlus/></button>
            </div>
        </div>

        
    )
}

export default SessionLength;