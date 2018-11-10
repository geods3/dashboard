import React, {  Suspense } from 'react';
import { Route, Redirect } from "react-router-dom";
import ErrorComponent  from "./Error";
import LoadingComponent  from "./Loader";

const LazyRoute = (props) => {

    const { component: Component, ...rest } = props
  
    return (
        <Route {...rest} render={props => (
            <Suspense fallback={props.error ?  <ErrorComponent {...props}/> : <LoadingComponent/>}>
                <Component {...props}/>
            </Suspense>    
        )}/>
    );
  
}

export default LazyRoute;