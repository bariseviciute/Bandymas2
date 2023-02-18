import * as React from "react";

import "./Window.css";

export interface WindowProps {
  title: string;
  position?: {
    x: string;
    y: string;
  };
  headerBackground?: string;
  bodyBackground?: string;
  zIndex?: number;
}

const Window: React.FC<WindowProps> = props => {
  const [position, setPosition] = React.useState({
    x: props.position.x || 0,
    y: props.position.y || 0
  });
  const [isMoving, setIsMoving] = React.useState(false);

  // Movement handler
  const handleHeaderDrag = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (isMoving) {
      console.log();

      const x =
        e.currentTarget.getBoundingClientRect().left +
        (e.pageX - e.currentTarget.getBoundingClientRect().left);
      const y =
        e.currentTarget.getBoundingClientRect().top +
        (e.pageY - e.currentTarget.getBoundingClientRect().top);

      setPosition({ x, y });
    }

    return false;
  };

  // Header grab handers
  const handleHeaderMouseDown = () => {
    setIsMoving(true);
  };
  const handleHeaderMouseUp = () => {
    setIsMoving(false);
  };

  // Control handlers
  const handleClose = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleMinimize = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className="Window"
      onMouseMove={handleHeaderDrag}
      style={{
        left: position.x,
        top: position.y,
        zIndex: props.zIndex
      }}
    >
      <div
        className={
          (isMoving ? "Window__header--grabbing" : "Window__header--grab") +
          " Window__header"
        }
        onMouseDown={handleHeaderMouseDown}
        onMouseUp={handleHeaderMouseUp}
        onDragStart={handleHeaderMouseDown}
        onDragEnd={handleHeaderMouseUp}
        // onMouseOut={handleHeaderMouseUp}
        style={{
          background: props.headerBackground
        }}
      >
        <span className="Window__title">{props.title}</span>
        <div className="Window__controls">
          <span className="Window__minimize" onMouseDown={handleMinimize} />
          <span className="Window__close" onMouseDown={handleClose} />
        </div>
      </div>
      <div
        className="Window__body"
        style={{
          background: props.bodyBackground
        }}
      >
        {props.children}
        {isMoving ? "moving" : ""}
      </div>
    </div>
  );
};

Window.defaultProps = {
  headerBackground: "#f3f3f3",
  bodyBackground: "#f3f3f3",
  position: {
    x: "15px",
    y: "15px"
  },
  zIndex: -1
};

export default Window;
