import { memo, useEffect, useState } from "react";
import { Image } from 'antd';

export const Home = memo(() => {

    return <>
        <p>hi home</p>
        <Image
            width={200}
            src="https://www.it.kmitl.ac.th/wp-content/themes/itkmitl2017wp/img/nav-thai.svg"
        />
    </>

});