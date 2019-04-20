import React from "react";
import ReactDOM from "react-dom";
import Matter from 'matter-js';

import "./styles.css";

class App extends React.Component
{
  
  render()
  {
    var Engine = Matter.Engine;
    var Bodies=Matter.Bodies;
    var Render = Matter.Render;
    var World=Matter.World;
    var engine=Engine.create();
    var render = Render.create({
      element: document.body,
      engine: engine
    });
    var box=Bodies.rectangle(100, 590, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    World.add(engine.world,[box,ground]);
  
    Engine.run(engine)
    return(
      <div>
        {Render.run(render)}  
      </div>
    )
  }
}
export default App;