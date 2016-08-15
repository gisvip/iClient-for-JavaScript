/**
 * Class: SuperMap.REST.GetSMLInfosService
 * 获取态势图信息列表
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
SuperMap.REST.GetSMLInfosService = SuperMap.Class(SuperMap.ServiceBase,{

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     *
     * 此类支持的事件类型:
     * - *processCompleted* 服务端返回查询结果触发该事件。
     * - *processFailed* 服务端返回查询结果失败触发该事件。
     */
    EVENT_TYPES: ["processCompleted", "processFailed"],

    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 GetSMLInfosService 类中处理所有事件的对象，支持两种事件 processCompleted 、processFailed ，服务端成功返回查询结果时触发 processCompleted 事件，服务端返回查询结果失败时触发 processFailed 事件。
     *
     * 例如：
     *     (start code)
     * var myService = new SuperMap.REST.GetSMLInfosService(url);
     * myService.events.on({
     *     "processCompleted": getComplted,
     *       "processFailed": getFailed
     *       }
     * );
     * function getComplted(GetSMLInfosEventArgs){//todo};
     * function getFailed(GetSMLInfosEventArgs){//todo};
     * (end)
     */
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 GetSMLInfosService 支持的两个事件 processCompleted 、processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /**
     * Property: lastResult
     * {<SuperMap.REST.GetSMLInfosResult>} 服务端返回的结果数据。
     */
    lastResult: null,


    /**
     * Constructor：SuperMap.REST.GetSMLInfosService
     * 初始化 GetSMLInfosService 类的实例
     *
     * 例如：
     * (start code)
     * var myService = new SuperMap.REST.GetSMLInfosService(url, {eventListeners: {
     *     "processCompleted": getSMLInfosCompleted,
     *     "processFailed": getSMLInfosError }
     * });
     * (end)
     *
     * Parameters:
     * url - {String} 标绘服务地址，只需将url设为: http://localhost:8090/iserver/services/plot-jingyong/rest 即可。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function(url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, [url]);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
        var me = this,
            end;
        me.events = new SuperMap.Events(
            me, null, me.EVENT_TYPES, true
        );
        if (me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }

        end = me.url.substr(me.url.length - 1, 1);
        if (me.isInTheSameDomain) {
            me.url += (end == "/") ? "smlInfos": "/smlInfos";
            me.url  +=  ".json"
        } else {
            me.url += (end == "/") ? "smlInfos": "/smlInfos";
            me.url  +=  ".jsonp"
        }

    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function() {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        var me = this;
        if (me.events) {
            me.events.destroy();
            me.events = null;
        }
        if (me.eventListeners) {
            me.eventListeners = null;
        }
        if (me.lastResult) {
            me.lastResult.destroy();
            me.lastResult = null;
        }
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的更新参数传递到服务端。
     *
     */
    processAsync: function(params) {
        if(!params){
            return;
        }
        var me = this,
            jsonParameters = null;
        me.url += SuperMap.REST.GetSMLInfosParameters.toUrlParameters(params);
        me.request({
            method: "GET",
            data: jsonParameters,
            scope: me,
            success: me.getSMLInfosComplted,
            failure: me.getSMLInfosFailed
        });
    },

    /**
     * Method: getSMLInfosComplted
     * 编辑完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    getSMLInfosComplted: function(result) {
        var me = this,
            qe = null,
            smlInfosResult = null;

        result = SuperMap.Util.transformResult(result);

        smlInfosResult = SuperMap.REST.GetSMLInfosResult.fromJson(result);

        me.lastResult = smlInfosResult;
        qe = new SuperMap.REST.GetSMLInfosEventArgs(smlInfosResult, result);
        me.events.triggerEvent("processCompleted", qe);
    },

    /**
     * Method: getSMLInfosFailed
     * 获取库信息失败
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    getSMLInfosFailed: function(result) {
        var me = this,
            error = null,
            serviceException = null,
            qe = null;
        result = SuperMap.Util.transformResult(result);
        error = result.error;
        if (!error) {
            return;
        }
        serviceException = SuperMap.ServiceException.fromJson(error);
        qe = new SuperMap.ServiceFailedEventArgs(serviceException, result);
        me.events.triggerEvent("processFailed", qe);
    },

    CLASS_NAME: "SuperMap.REST.GetSMLInfosService"
});
