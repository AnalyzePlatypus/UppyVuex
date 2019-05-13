# Uppy-Vuex [alpha]

A lightweight Vuex wrapper around the [Uppy](https://uppy.io/) file upload library.

## Installation

```bash
npm install uppy-vuex
```

## Import & Initialization

```javascript
import Vuex from 'vuex';
import UppyVuex from "uppy-vuex";


// Add UppyVuex as a Vuex module
// (for hot installation with code-splitting, see Appendix)
const store = new Vuex.Store({
    modules: {
        uppy: UppyVuex
    }
})

// Initialize Uppy
store.dispatch("uppy/init");

// You can now use uppy from anywhere in your app!
```

> You'll need to install one of Uppy's [uploader plugins](https://uppy.io/docs/plugins/) before Uppy can do any useful uploading. See their excellent [getting started](https://uppy.io/docs/) docs.

## Usage


`Uppy-Vuex` exposes the complete [Uppy Core API](https://uppy.io/docs/uppy/).
All methods are available by dispatching `uppy/<uppy method>`, or by calling the `uppy/<getter>` getters.

> Note: `Uppy-Vuex` is a [namespaced module](https://vuex.vuejs.org/guide/modules.html#namespacing). This means that all getters and actions must be prefaced with `uppy/`

### Getters

|Usage|Effect|Notes|Doc link|
|---|---|---|---|
|`getters["uppy/isReady"]`| Has the underlying Uppy instance been initialized yet? (If `false`, dispatch `uppy/init`)| None (`Uppy-Vuex` only)|
|`getters["uppy/getUppyInstance"]` | Access the underlying Uppy instance | None (`Uppy-Vuex` only)|
|`getters["uppy/getFile"](fileID)`| Get a specific file object by its ID. | [🔗 Docs](https://uppy.io/docs/uppy/#uppy-getFile-fileID)|
|`getters["uppy/getFiles"]`| Get an array of all file objects in Uppy.. | [🔗 Docs](https://uppy.io/docs/uppy/#uppy-getFiles)|
|`getters["uppy/getID"]`|Get the Uppy instance ID|[🔗 Docs](https://uppy.io/docs/uppy/#uppy-getID)|
|`getters["uppy/getPlugin"](pluginID)`|Get a plugin by its `id` to access its methods.|[🔗 Docs](https://uppy.io/docs/uppy/#uppy-getPlugin-id)|
|`getters["uppy/getState"]`|Returns the current state from the Store.|[🔗 Docs](https://uppy.io/docs/uppy/#uppy-setFileState-fileID-state)|

### Actions

> All Uppy active methods are [actions](https://vuex.vuejs.org/guide/actions.html), and *not* [mutations](https://vuex.vuejs.org/guide/mutations.html) for the sake of simplicity. `Uppy-Vuex` does not define any mutations.
> All actions return the result of the underlying Uppy method.

#### Basic

|Usage|Effect|Notes|Doc link|
|---|---|---|---|
|`dispatch("uppy/init", uppyOptions)`| Initialize the underlying `Uppy` instance | `uppyOptions` is what would be passed to the `Uppy()` constructor. |[🔗 Docs](https://uppy.io/docs/uppy/#Options)|
|`dispatch("uppy/addFile", fileObject)`| Add a new file to Uppy’s internal state. |  |[🔗 Docs](https://uppy.io/docs/uppy/#uppy-addFile-fileObject)|
|`dispatch("uppy/removeFile", fileID)`| Remove a file from Uppy. |  |[🔗 Docs](https://uppy.io/docs/uppy/#uppy-removeFile-fileID)|
|`dispatch("uppy/upload")`| Start uploading selected files. | Return a `Promise` that yields a results object `{successful: [], failed: []}`|[🔗 Docs](https://uppy.io/docs/uppy/#uppy-upload)|

#### Pause / Resume
> These will only work if the upload plugin supports resumable uploads, such as [Tus](https://uppy.io/docs/tus/). 

|Usage|Effect| Doc link|
|---|---|---|
|`dispatch("uppy/pauseResume", fileID)`| Toggle pause/resume on an upload. |[🔗 Docs](https://uppy.io/docs/uppy/#uppy-pauseResume-fileID)|
|`dispatch("uppy/pauseAll")`| Pause all uploads. |[🔗 Docs](https://uppy.io/docs/uppy/#uppy-pauseAll)|
|`dispatch("uppy/resumeAll")`| Resumes all uploads. |[🔗 Docs](https://uppy.io/docs/uppy/#uppy-resumeAll)|
  
#### Retry
|Usage|Effect|Doc link|
|---|---|---|
|`dispatch("uppy/retryUpload", fileID)`| Retry an upload (after an error, for example). |[🔗 Docs](https://uppy.io/docs/uppy/#uppy-retryUpload-fileID)|
|`dispatch("uppy/retryAll")`| Retry all uploads (after an error, for example).| [🔗 Docs](https://uppy.io/docs/uppy/#uppy-retryAll)| 

#### Cancellation and Teardown

|Usage|Effect|Notes|Doc link|
|---|---|---|---|
|`dispatch("uppy/cancelAll")`| Cancel all uploads, reset progress and remove all files. | |[🔗 Docs](https://uppy.io/docs/uppy/#uppy-cancelAll)| 
|`dispatch("uppy/reset")`| Stop all uploads in progress and clear file selection, set progress to 0.| Restores Uppy to pristine pre-interaction state.|[🔗 Docs](https://uppy.io/docs/uppy/#uppy-reset)| 
|`dispatch("uppy/close")`| Uninstall all plugins and close down this Uppy instance. Also runs `uppy/reset` before uninstalling.| **All subsequent actions will fail unless `uppy/init` is dispatched again**|[🔗 Docs](https://uppy.io/docs/uppy/#uppy-close)| 

#### Advanced
> ❗️Some of these actions have modified method signatures. 

|Usage|Effect|Notes|Doc link|
|---|---|---|---|
|`dispatch("uppy/setFileMeta", {fileID, data})`| Update metadata for a specific file. | |[🔗 Docs](https://uppy.io/docs/uppy/#uppy-setFileMeta-fileID-data)| 
|`dispatch("uppy/setMeta", data)`| Alters global meta object in state, the one that can be set in Uppy options and gets merged with all newly added files.. | |[🔗 Docs](https://uppy.io/docs/uppy/#uppy-setMeta-data)| 
|`dispatch("uppy/ setFileState", {fileID, fileState})`| Update the state for a single file. | |[🔗 Docs](https://uppy.io/docs/uppy/#uppy-setFileState-fileID-state)| 
|`dispatch("uppy/ setState", patch)`| Update Uppy’s internal state (See [docs](https://uppy.io/docs/uppy/#uppy-setState-patch)).  | See also: the `getState` getter |[🔗 Docs](https://uppy.io/docs/uppy/#uppy-setState-patch)| 

#### Plugins
> ❗️These actions have modified method signatures.

|Usage|Effect|Notes|Doc link|
|---|---|---|---|
|`dispatch("uppy/use", {plugin, options})`| Add a plugin to Uppy, with an optional plugin options object. | |[🔗 Docs](https://uppy.io/docs/uppy/#uppy-use-plugin-opts)| 
|`dispatch("uppy/removePlugin", instance)`| Uninstall and remove a plugin. | See also: the `getPlugin` getter|[🔗 Docs](https://uppy.io/docs/uppy/#uppy-removePlugin-instance)| 

#### Registering for Events
> ❗️These actions have modified method signatures. 

|Usage|Effect|Notes|Doc link|
|---|---|---|---|
|`dispatch("uppy/on", {event, callback})`| Subscribe to an uppy-event. | See the [full list of events](https://uppy.io/docs/uppy/#Events) |[🔗 Docs](https://uppy.io/docs/uppy/#uppy-on-39-event-39-action)| 
|`dispatch("uppy/off", {event, callback})`| Unsubscribe to an uppy-event. | See the [full list of events](https://uppy.io/docs/uppy/#Events) |[🔗 Docs](https://uppy.io/docs/uppy/#uppy-off-39-event-39-action)| 


#### Uppy Logging
> ❗️These actions have modified method signatures. 

|Usage|Effect|Notes|Doc link|
|---|---|---|---|
|`dispatch("uppy/log", {message, type})`| Logs to the console, **only if `uppy.opts.debug` is set to true.** | **❗️Silent in production**|[🔗 Docs](https://uppy.io/docs/uppy/#uppy-log)| 
|`dispatch("uppy/info", {message, type, duration})`|Sets a message in state, with optional details, that can be shown by notification UI plugins. | |[🔗 Docs](https://uppy.io/docs/uppy/#uppy-info)| 

## Limitations

* `UppyVuex` can only contain a single Uppy instance at a time. **If you need to have multiple seperate uploaders on a page, the `UppyVuex` will not meet your needs.**

## Bugs

`UppyVuex` contains practically no logic, so you're probably best off trying to repro your issues on Uppy itself.
Issues can be filed against this repo.

## Contributing

The current maintainer is [AnalyzePlatypus](https://github.com/AnalyzePlatypus).
