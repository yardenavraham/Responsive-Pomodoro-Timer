
import React from 'react';
import { FaPlus } from "react-icons/fa"
import { FaMinus } from "react-icons/fa"

function BreakInterval(props) {
    function decreaseCounter() {
        props.clickSound(props.audio);
        if (props.breakInterval === 1) {
            return;
        }
        props.decreaseBreak();

    }

    function increaseCounter() {
        props.clickSound(props.audio);
        if (props.breakInterval === 60) {
            return;
        }
        props.increaseBreak();
    }


    return (
        <div className="col-auto">
            <h6>Break Length</h6>
            <div className={'d-flex justify-content-center align-items-center'}>
                <button type="button" className="btn btn-outline-dark up-down-btn"
                    disabled={props.isStart === true ? "disabled" : ""}
                    onClick={decreaseCounter}><FaMinus/></button>
                <p>{props.breakInterval}</p>
                <button type="button" className="btn btn-outline-dark up-down-btn"
                    disabled={props.isStart === true ? "disabled" : ""}
                    onClick={increaseCounter}><FaPlus/></button>
            </div>
        </div>
    )
}

export default BreakInterval;