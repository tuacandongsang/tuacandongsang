

import {createStore} from 'vuex'
import auth from './auth/auth'
import cart from './cart/cart'


const store = createStore({
    modules:{
        auth,
        cart,
    }
})

export {store}
