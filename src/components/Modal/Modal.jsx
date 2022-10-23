import React from "react";
import ReactDOM from "react-dom";
import {
  AiOutlineClockCircle,
  AiFillLike,
  AiFillStar,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import { GiBowlOfRice, GiHealthNormal } from "react-icons/gi";
import classes from "./Modal.module.css";

const Modal = (props) => {

  // console.log("Modal.jsx");

  /*Handle modal on Escape Key*/
  React.useEffect(() => {
    function handleEscapeKey(e) {
      if (e.keyCode === 27) {
        props.handleModal(false);
      }
    }
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const summary = props.summary.replace(/(<([^>]+)>)/gi, "");

  const stepsArray = props.analyzedInstructions.map((step) => {
    return step.steps;
  });

  return ReactDOM.createPortal(
    <div className={classes.modal} onClick={() => props.handleModal(false)}>
      <div className={classes.modal__container}>
        <div className={classes.modal__header}>
          {props.popular && (
            <div
              className={`${classes.popular__tag} 
            ${classes.modal__header__items}`}
            >
              <AiFillStar className={classes.star__icon} />
              <span>Popular</span>
            </div>
          )}
          <div className={classes.modal__header__items}>
            <AiOutlineClockCircle className={classes.clock__icon} />
            <p>
              {props.readyInMinutes > 60 ? (
                <span>{props.readyInMinutes / 60} hours</span>
              ) : (
                <span>{props.readyInMinutes} minutes</span>
              )}{" "}
            </p>
          </div>
          <div className={classes.modal__header__items}>
            <AiFillLike className={classes.like__icon} />
            <p>
              {props.likes > 1 ? (
                <span>{props.likes} likes</span>
              ) : (
                <span>{props.likes} like</span>
              )}
            </p>
          </div>
          <div className={classes.modal__header__items}>
            <GiBowlOfRice className={classes.bowl__icon} />
            <p>
              {props.servings > 1 ? (
                <span>{props.servings} servings</span>
              ) : (
                <span>{props.servings} serving</span>
              )}
            </p>
          </div>
          <div className={classes.modal__header__items}>
            <GiHealthNormal className={classes.healthy__icon} />
            <p>{props.healthScore}/100</p>
          </div>
          <AiOutlineCloseCircle
            className={classes.close__icon}
            onClick={() => props.handleModal(false)}
          />
        </div>
        <div className={classes.modal__content}>
          <div className={classes.modal__image}>
            <img src={props.image} alt="" />
          </div>
          <div className={classes.description}>
            <div className={classes.title__section}>
              <h3>{props.title}</h3>
              {props.vegetarian ? (
                <BsCircleFill className={classes.diet__icon__veg} />
              ) : (
                <BsCircleFill className={classes.diet__icon__nonVeg} />
              )}
            </div>
            <h4>Summary -</h4>
            <p>{summary}</p>
          </div>
        </div>
        <div className={classes.steps__section}>
          <p>Steps -</p>
          <ol>
            {stepsArray.length > 0 ? (
              stepsArray[0].map((step, index) => {
                return <li key={index}>{step.step}</li>;
              })
            ) : (
              <li>This recipe has no steps.</li>
            )}
          </ol>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
