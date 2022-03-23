import { memo, useEffect, useState } from "react";
import { Image, Carousel } from 'antd';


function onChange(a, b, c) {
    console.log(a, b, c);
  }
  
  const contentStyle = {
    height: '500px',
    color: '#fff',
    lineHeight: '500px',
    textAlign: 'center',
    background: '#364d79',
  };
  

export const Home = memo(() => {

    return <>
        <Carousel afterChange={onChange}>
            <div>
                <h3 style={contentStyle}>
                    <img src="https://www.it.kmitl.ac.th/wp-content/themes/itkmitl2017wp/img/itkmitl-panorama-1.jpg" style={{width: "100%", height: "500px"}}></img>
                    
                </h3>
            </div>
            <div>
                <h3 style={contentStyle}>2</h3>
            </div>
 
        </Carousel>
    </>

});