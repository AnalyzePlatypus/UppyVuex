import Uppy  from "@uppy/core";

const state = {
  uppyInstance: undefined
};

const getters = {
  isReady: (state, getters) => state.uppyInstance !== undefined,
  getFile: (state, getters) => fileID => {
    if(!getters.isReady) return;
    return state.uppyInstance.getFile(fileID);
  },
 getFiles: (state, getters) => {
  if(!getters.isReady) return;
    return state.uppyInstance.getFiles();
  },
 getID: (state, getters) => {
  if(!getters.isReady) return;
    return state.uppyInstance.getID();
  },
 getPlugin: (state, getters) => pluginID => {
  if(!getters.isReady) return;
    return state.uppyInstance.getPlugin(pluginID);
  },
 getState: (state, getters) => {
    if(!getters.isReady) return;
    return state.uppyInstance.getState();
  },
  getUppyInstance: state => state.uppyInstance
};

const actions = {
  init({state}, uppyOptions) {
    return state.uppyInstance =  Uppy(uppyOptions);
  },

  addFile({ state }, fileObject) {
    return state.uppyInstance.addFile(fileObject);
  },

  removeFile({ state }, fileID) {
    return state.uppyInstance.removeFile(fileID);
  },

  log({ state }, payload) {
    return state.uppyInstance.log(payload.message, payload.type);
  },
  info({ state }, payload) {
    return state.uppyInstance.info(payload.message, payload.type, payload.duration);
  },

 // Pause and resume

  pauseAll({ state }) {
    return state.uppyInstance.pauseAll();
  },
  resumeAll({ state }) {
    return state.uppyInstance.resumeAll();
  },
  pauseResume({ state }, fileID) {
    return state.uppyInstance.pauseResume(fileID);
  },

  reset({ state }) {
    return state.uppyInstance.reset();
  },

  close({ state }) {
    return state.uppyInstance.close();
  },
 
  // retry
 
  retryUpload({ state }, fileID) {
    return state.uppyInstance.retryUpload(fileID);
  },
  retryAll({ state }) {
    return state.uppyInstance.retryAll();
  },

  // Cancel

  cancelAll({ state }) {
    return state.uppyInstance.cancelAll();
  },

 setFileMeta({ state }, payload) {
    return state.uppyInstance.setFileMeta(payload.fileID, payload.data);
  },

  setFileState({ state }, payload) {
    return state.uppyInstance.setFileState(payload.fileID, payload.fileState);
  },
 setMeta({ state }, data) {
    return state.uppyInstance.setMeta(data);
  },

 setState({ state }, patch) {
    return state.uppyInstance.setState(patch);
  },

 upload({ state }) {
    return state.uppyInstance.upload();
  },

  // Plugins
  use({ state }, payload) {
    return state.uppyInstance.use(payload.plugin, payload.options);
  },
  removePlugin({ state }, instance) {
    return state.uppyInstance.removePlugin(instance);
  },

  // Uppy events
  on({ state }, payload) {
    return state.uppyInstance.on(payload.event, payload.callback);
  },
  off({ state }, {event, action}) {
    return state.uppyInstance.off(payload.event, payload.callback);
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions
}