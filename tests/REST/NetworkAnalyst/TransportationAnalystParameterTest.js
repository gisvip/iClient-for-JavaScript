﻿module("TransportationAnalystParameter");

test("TestDefaultConstructor",function(){
    var analystParameter;
    analystParameter = new SuperMap.REST.TransportationAnalystParameter();
    ok(analystParameter.barrierEdgeIDs == null, "barrierEdgeIDs");
    ok(analystParameter.barrierNodeIDs == null, "barrierNodeIDs");
    ok(analystParameter.weightFieldName == null, "weightFieldName");
    ok(analystParameter.turnWeightField == null, "turnWeightField");
    ok(analystParameter.resultSetting instanceof SuperMap.REST.TransportationAnalystResultSetting, "resultSetting");
});
    
test("TestConstructor",function(){
    var analystParameter,
        barrierEdgeIDs = [1, 2, 3, 4],
        barrierNodeIDs = [3, 4],
        resultSetting = new SuperMap.REST.TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
    analystParameter = new SuperMap.REST.TransportationAnalystParameter({
        barrierEdgeIDs: barrierEdgeIDs,
        barrierNodeIDs: barrierNodeIDs,
        weightFieldName: "smID",
        turnWeightField: "length",
        resultSetting: resultSetting
    });
    equal(analystParameter.barrierEdgeIDs, barrierEdgeIDs, "barrierEdgeIDs");
    equal(analystParameter.barrierNodeIDs, barrierNodeIDs, "barrierNodeIDs");
    equal(analystParameter.weightFieldName, "smID", "weightFieldName");
    equal(analystParameter.turnWeightField, "length", "turnWeightField");
    equal(analystParameter.resultSetting, resultSetting, "turnWeightField");
});


test("TestDestructor",function(){
    var analystParameter,
        barrierEdgeIDs = [1, 2, 3, 4],
        barrierNodeIDs = [3, 4],
        resultSetting = new SuperMap.REST.TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
    analystParameter = new SuperMap.REST.TransportationAnalystParameter({
        barrierEdgeIDs: barrierEdgeIDs,
        barrierNodeIDs: barrierNodeIDs,
        weightFieldName: "smID",
        turnWeightField: "length",
        resultSetting: resultSetting
    });
    analystParameter.destroy();
    ok(analystParameter.barrierEdgeIDs == null, "barrierEdgeIDs");
    ok(analystParameter.barrierNodeIDs == null, "barrierNodeIDs");
    ok(analystParameter.weightFieldName == null, "weightFieldName");
    ok(analystParameter.turnWeightField == null, "turnWeightField");
    ok(analystParameter.resultSetting == null, "resultSetting");
});