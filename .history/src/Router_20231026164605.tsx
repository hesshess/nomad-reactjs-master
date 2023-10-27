import {BrowserRouter, Switch, Route} from 'react-router-dom';

function Router(){
    return(
        <BrowserRouter>
            <Switch>
                <Route>
                    <Coins/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;