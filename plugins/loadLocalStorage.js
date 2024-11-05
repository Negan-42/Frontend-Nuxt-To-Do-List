// plugins/loadLocalStorage.js

export default ({ store }) => {
    if (process.client) {
        store.commit('LOAD_TASKS');
    }
};
