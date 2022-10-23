import React from "react";
import { BsCircleFill } from "react-icons/bs";
import { AiOutlineClockCircle, AiFillLike, AiFillStar } from "react-icons/ai";
import { GiBowlOfRice } from "react-icons/gi";
import Tilt from "react-parallax-tilt";
import classes from "./Card.module.css";
import Modal from "../Modal/Modal";

const Card = (props) => {
  // console.log("Card.jsx");

  /*State for modal*/
  const [modal, setModal] = React.useState(false);

  /*Handle modal*/
  const handleModal = (bool) => {
    setModal(bool);
  };

  /*Truncating the summary to 100 words*/
  const summary =
    props.summary.slice(0, 100).replace(/(<([^>]+)>)/gi, "") + "...";

  /*Upper case the first letter of the every word of title and limit the title name to 15 letters*/
  const title = props.title
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  const cardTitle = title.length > 15 ? title.slice(0, 15) + "..." : title;
  return (
    <>
      {modal && (
        <Modal
          handleModal={handleModal}
          title={title}
          image={props.image}
          summary={props.summary}
          vegetarian={props.vegetarian}
          popular={props.popular}
          readyInMinutes={props.readyInMinutes}
          servings={props.servings}
          healthScore={props.healthScore}
          likes={props.likes}
          analyzedInstructions={props.analyzedInstructions}
        />
      )}
      <Tilt
        tiltMaxAngleX={2}
        tiltMaxAngleY={2}
        style={{
          height: "max-content",
          width: "max-content",
        }}
      >
        <div
          className={classes.card__container}
          onClick={() => handleModal(true)}
        >
          {props.popular ? (
            <div className={classes.popular__tag}>
              <AiFillStar className={classes.star__icon} />
              <p>Popular</p>
            </div>
          ) : null}
          <div className={classes.card__image}>
            <img src={props.image} alt="" />
          </div>
          <div className={classes.card__content}>
            <div className={classes.card__title}>
              <h3>{cardTitle}</h3>

              {props.vegetarian ? (
                <BsCircleFill className={classes.diet__icon__veg} />
              ) : (
                <BsCircleFill className={classes.diet__icon__nonVeg} />
              )}
            </div>
            <div className={classes.card__description}>
              <p>{summary}</p>
            </div>
            <div className={classes.card__footer}>
              <div className={classes.card__footer__items}>
                <AiOutlineClockCircle className={classes.clock__icon} />
                <p>
                  {props.readyInMinutes > 60 ? (
                    <span>{props.readyInMinutes / 60} hours</span>
                  ) : (
                    <span>{props.readyInMinutes} minutes</span>
                  )}
                </p>
              </div>
              <div className={classes.card__footer__items}>
                <GiBowlOfRice className={classes.bowl__icon} />
                <p>
                  {props.servings > 1 ? (
                    <span>{props.servings} servings</span>
                  ) : (
                    <span>{props.servings} serving</span>
                  )}
                </p>
              </div>
              <div className={classes.card__footer__items}>
                <AiFillLike className={classes.like__icon} />
                <p>{props.likes}</p>
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </>
  );
};

export default Card;
