//import {cloneDeep} from 'lodash';

const store = {
    debug: true,
    state: {
        //favours: [],
        user: null,
    },
    //user functions
    storeUser(user) {
        this.debugMessage('storeUser', user);
        this.state.user = user;
    },
    deleteUser() {
        this.debugMessage('deleteUser');
        this.state.user = null;
    },
    /* isStaff() {
        this.debugMessage('isStaff');
        if (this.state.user !== null) {
            return this.state.user.is_staff;
        }
        return false;
    }, */
    isLogged() {
        this.debugMessage('isLogged');
        return this.state.user !== null;
    },

    debugMessage(method, value) {
        if (this.debug) {
            if (value !== undefined) {
                console.log(method + ' triggered with', value)
            } else {
                console.log(method + ' triggered')
            }
        }
    }
};

export default store;