import React from "react";
import PropTypes from 'prop-types';
import '../App.css'

export default function Tasks(props) {
  return (
    <>
      <div className="mt-3 col-12 task-ctnr d-flex justify-content-between align-items-center p-3">
        <span>{props.task}</span>
        <div className="col-2 d-flex justify-content-end align-items-baseline">
          <button
            className="add-btn p-0"
            onMouseOver={(e) => {
              props.remAniFunc(e.target, "fa-bounce" , "fa-bounce");
            }}
            onMouseOut={(e) => {
              props.addAniFunc(e.target, "fa-solid" , "fa-bounce");
            }}
            onClick={(e) => {
              props.editTasksFunc(e.target);
            }}
          >
            <i
              id="edit-btn"
              className="fa-solid fa-pen-to-square fa-bounce"
            ></i>
          </button>

          <button
            className="add-btn p-0"
            onClick={(e) => {
              props.delTasksFunc(e.target);
            }}
            onMouseOver={(e) => {
              props.remAniFunc(e.target, "fa-bounce", "fa-bounce");
            }}
            onMouseOut={(e) => {
              props.addAniFunc(e.target, "fa-solid", "fa-bounce");
            }}
          >
            <i className="fa-solid fa-trash fa-bounce" id="del-btn"></i>
          </button>
        </div>
      </div>
    </>
  );
}

Tasks.propTypes = {
  task: PropTypes.string.isRequired,
  remAniFunc: PropTypes.func.isRequired,
  addAniFunc: PropTypes.func.isRequired,
  editTasksFunc: PropTypes.func.isRequired,
  delTasksFunc: PropTypes.func.isRequired,
};