import * as moment from 'moment';
/**
 * Custom schema / mapping.
 */
const schema = (obj: any): unknown => ({
    poHeader: {
        poNumber: typeof(obj['PO Number']) == 'undefined' ? 'poNumber_value' : obj['PO Number'] ,
        tradingPoNumber: typeof(obj['Trading Co PO Number']) == 'undefined' ? 'tradingPoNumber_value' : obj['Trading Co PO Number'],
        partnerNumber: typeof(obj['Vendor']) == 'undefined' ? 'Vendor_value' : obj['Vendor'],
        poCreatedOn: typeof(obj['PO Create Date']) == 'undefined' ? 'poCreatedOn_value' : ((date: number): string => {
            const parsedDate = moment(new Date((date - (25567 + 1)) * 86400 * 1000), 'YYYY-MM-DD', true);
            if (!parsedDate.isValid()) throw new Error(`Date Parsing Error`);
            return parsedDate.subtract(1, 'days').format('YYYY-MM-DD');
        })(obj['PO Create Date']),
        createdBy: typeof(obj['Created by']) == 'undefined' ? 'createdBy_value' : obj['Created by'],
        poEffectiveFrom: typeof(obj['poEffectiveFrom']) == 'undefined' ? 'poEffectiveFrom_value' : ((date: number): string => {
            const parsedDate = moment(new Date((date - (25567 + 1)) * 86400 * 1000), 'YYYY-MM-DD', true);
            if (!parsedDate.isValid()) throw new Error(`Date Parsing Error`);
            return parsedDate.subtract(1, 'days').format('YYYY-MM-DD');
        })(obj['poEffectiveFrom']),
        partnerName: typeof(obj['partnerName']) == 'undefined' ? 'partnerName_value' : obj['partnerName'],
        poTypeCode: typeof(obj['poTypeCode']) == 'undefined' ? 'poTypeCode_value' : obj['poTypeCode'],
        type: typeof(obj['type']) == 'undefined' ? 'type_value' : obj['type'],
        purchaseOrganizationNumber: typeof(obj['Vendor Purchase Org']) == 'undefined' ? 'purchaseOrganizationNumber_value' : obj['Vendor Purchase Org'],
        purchaseOrganizationName: typeof(obj['Purchase Org']) == 'undefined' ? 'purchaseOrganizationName_value' : obj['Purchase Org'],
        purchaseGroupOrganizationNumber: typeof(obj['purchaseGroupOrganizationNumber']) == 'undefined' ? 'purchaseGroupOrganizationNumber_value' : obj['purchaseGroupOrganizationNumber'],
        purchaseGroupOrganizationName: typeof(obj['Purchase Group']) == 'undefined' ? 'purchaseGroupOrganizationName_value' : obj['Purchase Group'],
        titleTransferModelCode: typeof(obj['TTMI code']) == 'undefined' ? 'titleTransferModelCode_value' : obj['TTMI code'],
        titleTransferModelCodeDescription: typeof(obj['TTMI']) == 'undefined' ? 'titleTransferModelCodeDescription_value' : obj['TTMI'],
        manufacturingcountrysOrigin: typeof(obj['MCO']) == 'undefined' ? 'manufacturingCountryofOrigin_value' : obj['MCO'],
        purchaseOrderCompanyCodeNumber: typeof(obj['purchaseOrderCompanyCodeNumber']) == 'undefined' ? 'purchaseOrderCompanyCodeNumber_value' : obj['purchaseOrderCompanyCodeNumber'],
        purchaseOrderCompanyCodeName: typeof(obj['purchaseOrderCompanyCodeName']) == 'undefined' ? 'purchaseOrderCompanyCodeName_value' : obj['purchaseOrderCompanyCodeName'],
        tradingCompanyCode: typeof(obj['Trading Co Company code']) == 'undefined' ? 'tradingCompanyCode_value' : obj['Trading Co Company code'],
        tradingCompanyName: typeof(obj['tradingCompanyName']) == 'undefined' ? 'tradingCompanyName_value' : obj['tradingCompanyName'],
        referenceDocumentNumber: typeof(obj['referenceDocumentNumber']) == 'undefined' ? 'referenceDocumentNumber_value' : obj['referenceDocumentNumber'],
        poAcceptanceDate : typeof(obj['poAcceptanceDate']) == 'undefined' ? 'poAcceptanceDate_value' :((date: number): string => {
            const parsedDate = moment(new Date((date - (25567 + 1)) * 86400 * 1000), 'YYYY-MM-DD', true);
            if (!parsedDate.isValid()) throw new Error(`Date Parsing Error`);
            return parsedDate.subtract(1, 'days').format('YYYY-MM-DD');
        })(obj['poAcceptanceDate']),
    },
    poLineItem: {
        poLineItemNumber: typeof(obj['PO Item']) == 'undefined' ? 'poLineItemNumber_value' : obj['PO Item'],
        poLineStatus: typeof(obj['poLineStatus']) == 'undefined' ? 'poLineStatus_value' : obj['poLineStatus'],
        type: typeof(obj['type']) == 'undefined' ? 'type_value' : obj['type'],
        id: typeof(obj['id']) == 'undefined' ? 'id_value' : obj['id'],
        creationDate: typeof(obj['creationDate']) == 'undefined' ? 'creationDate_value' : ((date: number): string => {
            const parsedDate = moment(new Date((date - (25567 + 1)) * 86400 * 1000), 'YYYY-MM-DD', true);
            if (!parsedDate.isValid()) throw new Error(`Date Parsing Error`);
            return parsedDate.subtract(1, 'days').format('YYYY-MM-DD');
        })(obj['creationDate']),
        formatVersion: typeof(obj['formatVersion']) == 'undefined' ? 'formatVersion_value' : obj['formatVersion'],
        acceptanceDate: typeof(obj['acceptanceDate']) == 'undefined' ? 'acceptanceDate_value' : ((date: number): string => {
            const parsedDate = moment(new Date((date - (25567 + 1)) * 86400 * 1000), 'YYYY-MM-DD', true);
            if (!parsedDate.isValid()) throw new Error(`Date Parsing Error`);
            return parsedDate.subtract(1, 'days').format('YYYY-MM-DD');
        })(obj['acceptanceDate']),
        productCode: typeof(obj['productCode']) == 'undefined' ? 'productCode_value' : obj['productCode'],
        productName: typeof(obj['productName']) == 'undefined' ? 'productName_value' : obj['productName'],
        quantity: typeof(obj['Qty']) == 'undefined' ? 'quantity_value' : obj['Qty'],
        unitOfMeasure: typeof(obj['UOM']) == 'undefined' ? 'unitOfMeasure_value' : obj['UOM'],
        destinationCountry: typeof(obj['Destination Country']) == 'undefined' ? 'destinationCountry_value' : obj['Destination Country'],
        ogacDate: typeof(obj['OGAC Date']) == 'undefined' ? 'ogacDate_value' : ((date: number): string => {
            const parsedDate = moment(new Date((date - (25567 + 1)) * 86400 * 1000), 'YYYY-MM-DD', true);
            if (!parsedDate.isValid()) throw new Error(`Date Parsing Error`);
            return parsedDate.subtract(1, 'days').format('YYYY-MM-DD');
        })(obj['OGAC Date']),
        gacDate: typeof(obj['GAC Date']) == 'undefined' ? 'gacDate_value' : ((date: number): string => {
            const parsedDate = moment(new Date((date - (25567 + 1)) * 86400 * 1000), 'YYYY-MM-DD', true);
            if (!parsedDate.isValid()) throw new Error(`Date Parsing Error`);
            return parsedDate.subtract(1, 'days').format('YYYY-MM-DD');
        })(obj['GAC Date']),
        gacReasonCode: typeof(obj['GAC Reason Code']) == 'undefined' ? 'gacReasonCode_value' : obj['GAC Reason Code'],
        goodsAtConsolidatorReason: typeof(obj['goodsAtConsolidatorReason']) == 'undefined' ? 'goodsAtConsolidatorReason_value' : obj['goodsAtConsolidatorReason'],
        segmentationInventory: typeof(obj['AFS Category']) == 'undefined' ? 'segmentationInventory_value' : obj['AFS Category'],
        plantCode: typeof(obj['Plant']) == 'undefined' ? 'plantCode_value' : obj['Plant'],
        plantName: typeof(obj['plantName']) == 'undefined' ? 'plantName_value' : obj['plantName'],
        tradingCompanyPlantCode: typeof(obj['Trading Co Plant code']) == 'undefined' ? 'tradingCompanyPlantCode_value' : obj['Trading Co Plant code'],
        tradingCompanyPlantName: typeof(obj['Trading Co Plant name']) == 'undefined' ? 'tradingCompanyPlantName_value' : obj['Trading Co Plant name'],
        transportationMode: typeof(obj['Mode']) == 'undefined' ? 'transportationMode_value' : obj['Mode'],
        transportationModeCode: typeof(obj['transportationModeCode']) == 'undefined' ? 'transportationModeCode_value' : obj['transportationModeCode'],
        shippingType : typeof(obj['shippingType']) == 'undefined' ? 'shippingType_value' :obj['shippingType'],
        directshipSalesOrderNumber : typeof(obj['directshipSalesOrderNumber']) == 'undefined' ?'directshipSalesOrderNumber_value' : obj['directshipSalesOrderNumber'],
        number: typeof(obj['number']) == 'undefined' ? 'number_value' : obj['number'],
        orderItemNumber: typeof(obj['orderItemNumber']) == 'undefined' ? 'orderItemNumber_value' : obj['orderItemNumber'],
        itemDocumentType: typeof(obj['itemDocumentType']) == 'undefined' ? 'itemDocumentType_value' : obj['itemDocumentType'],
        purchaseOrderFob: typeof(obj['purchaseOrderFob']) == 'undefined' ? 'purchaseOrderFob_value' : obj['purchaseOrderFob'],
        tradingCompanyFob: typeof(obj['tradingCompanyFob']) == 'undefined' ? 'tradingCompanyFob_value' : obj['tradingCompanyFob'],
        poFxAdjustment: typeof(obj['poFxAdjustment']) == 'undefined' ? 'poFxAdjustment_value' : obj['poFxAdjustment'],
        tradingCompanyMarkup: typeof(obj['Trading Co Net Unit Price']) == 'undefined' ? 'tradingCompanyMarkup_value' : obj['Trading Co Net Unit Price'],
        tradingCompanyNetUnitPrice: typeof(obj['Trading Co Net Unit Price']) == 'undefined' ? 'tradingCompanyNetUnitPrice_value' : obj['Trading Co Net Unit Price'],
        totalAmount: typeof(obj['totalAmount']) == 'undefined' ? 'totalAmount_value' : obj['totalAmount'],
        markupAmount: typeof(obj['markupAmount']) == 'undefined' ? 'markupAmount_value' : obj['markupAmount'],
        tradingCompanyPoFxAdjustment: typeof(obj['tradingCompanyPoFxAdjustment']) == 'undefined' ? 'tradingCompanyPoFxAdjustment_value' : obj['tradingCompanyPoFxAdjustment'],
        tradingCompanyUnitMarkupAmount: typeof(obj['tradingCompanyUnitMarkupAmount']) == 'undefined' ? 'tradingCompanyUnitMarkupAmount_value' : obj['tradingCompanyUnitMarkupAmount'],
        netUnitPrice: typeof(obj['Net Unit Price']) == 'undefined' ? 'netUnitPrice_value' : obj['Net Unit Price'],
        tradingCompanyExtendedMarkupAmount: typeof(obj['tradingCompanyExtendedMarkupAmount']) == 'undefined' ? 'tradingCompanyExtendedMarkupAmount_value' : obj['tradingCompanyExtendedMarkupAmount'],
        tradingCompanyPoFxAdjustmentPercentage: typeof(obj['tradingCompanyPoFxAdjustmentPercentage']) == 'undefined' ? 'tradingCompanyPoFxAdjustmentPercentage_value' : obj['tradingCompanyPoFxAdjustmentPercentage'],
        grossUnitPrice: typeof(obj['Gross Unit Price']) == 'undefined' ? 'grossUnitPrice_value' : obj['Gross Unit Price'],
        tradingCompanyGrossUnitPrice: typeof(obj['Trading Co Gross Unit Price']) == 'undefined' ? 'tradingCompanyGrossUnitPrice_value' : obj['Trading Co Gross Unit Price'],
        factoryAirFreight: typeof(obj['factoryAirFreight']) == 'undefined' ? 'factoryAirFreight_value' : obj['factoryAirFreight'],
        netPrice: typeof(obj['netPrice']) == 'undefined' ? 'netPrice_value' : obj['netPrice'],
        netPriceCurrency: typeof(obj['netPriceCurrency']) == 'undefined' ? 'netPriceCurrency_value' : obj['netPriceCurrency'],
        grossPrice: typeof(obj['grossPrice']) == 'undefined' ? 'type_value' : obj['type'],
        grossPriceCurrency: typeof(obj['grossPriceCurrency']) == 'undefined' ? 'grossPriceCurrency_value' : obj['grossPriceCurrency'],
        netPriceWithMarkup: typeof(obj['netPriceWithMarkup']) == 'undefined' ? 'netPriceWithMarkup_value' : obj['netPriceWithMarkup'],
        grossNetPriceMarkupCurrency: typeof(obj['grossNetPriceMarkupCurrency']) == 'undefined' ? 'grossNetPriceMarkupCurrency_value' : obj['grossNetPriceMarkupCurrency'],
        planningYear: typeof(obj['planningYear']) == 'undefined' ? 'planningYear_value' : obj['planningYear'],
        year: typeof(obj['Year']) == 'undefined' ? 'year_value' : obj['Year'],
        customerShipTo: typeof(obj['Customer']) == 'undefined' ? 'customerShipTo_value' : obj['Customer'],
    },
    sizes: [{
        pricingType: typeof(obj['pricingType']) == 'undefined' ? 'pricingType_value' : obj['pricingType'],
        value: typeof(obj['Size Value']) == 'undefined' ? 'value_value' : obj['Size Value'],
        quantity: typeof(obj['Qty']) == 'undefined' ? 'quantity_value' : obj['Qty'],
        sizePricing: typeof(obj['sizePricing']) == 'undefined' ? 'sizePricing_value' : obj['sizePricing'],
    }],
    product: {
        productFob: typeof(obj['productFob']) == 'undefined' ? 'productFob_value' : obj['productFob'],
        divisionCode: typeof(obj['divisionCode']) == 'undefined' ? 'divisionCode_value' : obj['divisionCode'],
        developmentCode: typeof(obj['developmentCode']) == 'undefined' ? 'developmentCode_value' : obj['developmentCode'],
        launchCode: typeof(obj['Launch Code']) == 'undefined' ? 'launchCode_value' : obj['Launch Code'],
        launchDate: typeof(obj['Launch Date']) == 'undefined' ? 'launchDate_value' : obj['Launch Date'],
        categoryCode: typeof(obj['categoryCode']) == 'undefined' ? 'categoryCode_value' : obj['categoryCode'],
        categoryDescription: typeof(obj['Category']) == 'undefined' ? 'categoryDescription_value' : obj['Category'],
        subCategoryCode: typeof(obj['subCategoryCode']) == 'undefined' ? 'subCategoryCode_value' : obj['subCategoryCode'],
        subCategoryDescription: typeof(obj['Sub Category']) == 'undefined' ? 'subCategoryDescription_value' : obj['Sub Category'],
        globalCategoryCoreFocusCode: typeof(obj['Glbl Cat Core Focus']) == 'undefined' ? 'globalCategoryCoreFocusCode_value' : obj['Glbl Cat Core Focus'],
        globalCategoryCoreFocusDescription: typeof(obj['globalCategoryCoreFocusDescription']) == 'undefined' ? 'globalCategoryCoreFocusDescription_value' : obj['globalCategoryCoreFocusDescription'],
        globalCategorySummaryCode: typeof(obj['Glbl Cat Sum Cd']) == 'undefined' ? 'globalCategorySummaryCode_value' : obj['Glbl Cat Sum Cd'],
        globalCategorySummaryDescription: typeof(obj['globalCategorySummaryDescription']) == 'undefined' ? 'globalCategorySummaryDescription_value' : obj['globalCategorySummaryDescription'],
        genderAgeCode: typeof(obj['Gndr Age']) == 'undefined' ? 'genderAgeCode_value' : obj['Gndr Age'],
        segmentCode: typeof(obj['Segm']) == 'undefined' ? 'segmentCode_value' : obj['Segm'],
        segmentDescription: typeof(obj['segmentDescription']) == 'undefined' ? 'segmentDescription_value' : obj['segmentDescription'],
        sportLevelIdentifier: typeof(obj['sportLevelIdentifier']) == 'undefined' ? 'sportLevelIdentifier_value' : obj['sportLevelIdentifier'],
        colorDescription: typeof(obj['colorDescription']) == 'undefined' ? 'colorDescription_value' : obj['colorDescription'],
        familyCode: typeof(obj['familyCode']) == 'undefined' ? 'familyCode_value' : obj['familyCode'],
        midsoleCode: typeof(obj['Midsole 1 Cd']) == 'undefined' ? 'midsoleCode_value' : obj['Midsole 1 Cd'],
        outsoleCode: typeof(obj['Outsole 1 Cd']) == 'undefined' ? 'outsoleCode_value' : obj['Outsole 1 Cd'],
        primaryPlatformIdentifier: typeof(obj['primaryPlatformIdentifier']) == 'undefined' ? 'primaryPlatformIdentifier_value' : obj['primaryPlatformIdentifier'],
        primaryPlatformDescription: typeof(obj['primaryPlatformDescription']) == 'undefined' ? 'primaryPlatformDescription_value' : obj['primaryPlatformDescription'],
        silhouetteCode: typeof(obj['silhouetteCode']) == 'undefined' ? 'silhouetteCode_value' : obj['silhouetteCode'],
        dimensionCode: typeof(obj['Size Dim']) == 'undefined' ? 'dimensionCode_value' : obj['Size Dim'],
        sizeSortSequenceNumber: typeof(obj['sizeSortSequenceNumber']) == 'undefined' ? 'sizeSortSequenceNumber_value' : obj['sizeSortSequenceNumber'],
        sourceType: typeof(obj['Source Type']) == 'undefined' ? 'sourceType_value' : obj['Source Type'],
        toolId: typeof(obj['Tool ID']) == 'undefined' ? 'toolId_value' : obj['Tool ID'],
        athleteIdentifier: typeof(obj['Athlete ID']) == 'undefined' ? 'athleteIdentifier_value' : obj['Athlete ID'],
        athleteFirstName: typeof(obj['Athlete First Name']) == 'undefined' ? 'athleteFirstName_value' : obj['Athlete First Name'],
        athleteLastName: typeof(obj['Athlete Last Name']) == 'undefined' ? 'athleteLastName_value' : obj['Athlete Last Name'],
        teamIdentifier: typeof(obj['Team ID']) == 'undefined' ? 'quantity_value' : obj['Team ID'],
        teamName: typeof(obj['teamName']) == 'undefined' ? 'teamIdentifier_value' : obj['teamName'],
        teamSilhouetteId: typeof(obj['Team Silhouette id']) == 'undefined' ? 'teamSilhouetteId_value' : obj['Team Silhouette id'],
        teamSilhouetteDescription: typeof(obj['Team Silhouette description']) == 'undefined' ? 'teamSilhouetteDescription_value' : obj['Team Silhouette description'],
        blankColor: typeof(obj['Blank Color']) == 'undefined' ? 'blankColor_value' : obj['Blank Color'],
        blankProductCode: typeof(obj['Blank Product Cd']) == 'undefined' ? 'blankProductCode_value' : obj['Blank Product Cd'],
        blankUsageIndicator: typeof(obj['Blank ID']) == 'undefined' ? 'blankUsageIndicator_value' : obj['Blank ID'],
        sportActivityCode : typeof(obj['sportActivityCode']) == 'undefined' ? 'sportActivityCode_value' :obj['sportActivityCode'],
        blankStyle: typeof(obj['Blank Style (disp #)']) == 'undefined' ? 'blankStyle_value' : obj['Blank Style (disp #)'],
        styleNumber: typeof(obj['styleNumber']) == 'undefined' ? 'styleNumber_value' : obj['styleNumber'],
        productRefillClassCode: typeof(obj['Product Refill Class code']) == 'undefined' ? 'productRefillClassCode_value' : obj['Product Refill Class code'],
        productRefillClassDescription: typeof(obj['Product Refill Class description']) == 'undefined' ? 'productRefillClassDescription_value' : obj['Product Refill Class description'],
        promoIndicator: typeof(obj['promoIndicator']) == 'undefined' ? 'promoIndicator_value' : obj['promoIndicator'],
        mrpController: typeof(obj['MRP controller']) == 'undefined' ? 'mrpController_value' : obj['MRP controller'],
    },
    manufacturing: {
        poRejectionCode: typeof(obj['poRejectionCode']) == 'undefined' ? 'poRejectionCode_value' : obj['poRejectionCode'],
        issuanceExpectedDate: typeof(obj['issuanceExpectedDate']) == 'undefined' ? 'issuanceExpectedDate_value' : obj['issuanceExpectedDate'],
        IssuanceActualDate: typeof(obj['IssuanceActualDate']) == 'undefined' ? 'IssuanceActualDate_value' : obj['IssuanceActualDate'],
        poliAcceptanceExpectedDate: typeof(obj['poliAcceptanceExpectedDate']) == 'undefined' ? 'poliAcceptanceExpectedDate_value' : obj['poliAcceptanceExpectedDate'],
        productionStartExpectedDate: typeof(obj['productionStartExpectedDate']) == 'undefined' ? 'productionStartExpectedDate_value' : obj['productionStartExpectedDate'],
        productionStartActualDate: typeof(obj['productionStartActualDate']) == 'undefined' ? 'productionStartActualDate_value' : obj['productionStartActualDate'],
        materialOrderExpectedDate:typeof( obj['materialOrderExpectedDate']) == 'undefined' ? 'materialOrderExpectedDate_value' : obj['materialOrderExpectedDate'],
        materialOrderActualDate: typeof(obj['materialOrderActualDate']) == 'undefined' ? 'materialOrderActualDate_value' : obj['materialOrderActualDate'],
        materialTrimReceiptExpectedDate: typeof(obj['materialTrimReceiptExpectedDate']) == 'undefined' ? 'materialTrimReceiptExpectedDate_value' : obj['materialTrimReceiptExpectedDate'],
        materialTrimReceiptActualDate: typeof(obj['materialTrimReceiptActualDate']) == 'undefined' ? 'materialTrimReceiptActualDate_value' : obj['materialTrimReceiptActualDate'],
        qrsExpectedDate: typeof(obj['qrsExpectedDate']) == 'undefined' ? 'qrsExpectedDate_value' : obj['qrsExpectedDate'],
        qrsActualDate: typeof(obj['qrsActualDate']) == 'undefined' ? 'qrsActualDate_value' : obj['qrsActualDate'],
        productionEndExpectedDate: typeof(obj['productionEndExpectedDate']) == 'undefined' ? 'productionEndExpectedDate_value' : obj['productionEndExpectedDate'],
        productionEndActualDate: typeof(obj['productionEndActualDate']) == 'undefined' ? 'productionEndActualDate_value' : obj['productionEndActualDate'],
        exfactoryExpectedDate: typeof(obj['exfactoryExpectedDate']) == 'undefined' ? 'exfactoryExpectedDate_value' : obj['exfactoryExpectedDate'],
        exfactoryActualDate: typeof(obj['Ex Factory Date']) == 'undefined' ? 'exfactoryActualDate_value' : obj['Ex Factory Date'],
        originReceiptExpectedDate: typeof(obj['originReceiptExpectedDate']) == 'undefined' ? 'originReceiptExpectedDate_value' : obj['originReceiptExpectedDate'],
        asnExpectedDate: typeof(obj['asnExpectedDate']) == 'undefined' ? 'asnExpectedDate_value' : obj['asnExpectedDate'],
        currentEvent: typeof(obj['Current Event']) == 'undefined' ? 'currentEvent_value' : obj['Current Event'],
        currentEventDate: typeof(obj['currentEventDate']) == 'undefined' ? 'currentEventDate_value' : obj['currentEventDate'],
        nextEvent: typeof(obj['Next Event']) == 'undefined' ? 'nextEvent_value' : obj['Next Event'],
        nextEventDate: typeof(obj['nextEventDate']) == 'undefined' ? 'nextEventDate_value' : obj['nextEventDate'],
        pendingChanges: typeof(obj['pendingChanges']) == 'undefined' ? 'pendingChanges_value' : obj['pendingChanges'],
        initialGacDate: typeof(obj['Initial GAC Date']) == 'undefined' ? 'initialGacDate_value' : obj['Initial GAC Date'],
        initialGacReasonCode: typeof(obj['Initial GAC Reason Code']) == 'undefined' ? 'initialGacReasonCode_value' : obj['Initial GAC Reason Code'],
        previousGac: typeof(obj['Previous GAC']) == 'undefined' ? 'previousGac_value' : obj['Previous GAC'],
        previousGacReasonCode: typeof(obj['Previous GAC reason code']) == 'undefined' ? 'previousGacReasonCode_value' : obj['Previous GAC reason code'],
        fobMismatchIndicator: typeof(obj['fobMismatchIndicator']) == 'undefined' ? 'fobMismatchIndicator_value' : obj['fobMismatchIndicator'],
        sizeMismatchIndicator: typeof(obj['sizeMismatchIndicator']) == 'undefined' ? 'sizeMismatchIndicator_value' : obj['sizeMismatchIndicator'],
        overDueIndicator : typeof(obj['overDueIndicator']) == 'undefined' ? 'overDueIndicator_value' : obj['overDueIndicator']
    },
    planning: {
        mrgacDate: typeof(obj['mrgacDate']) == 'undefined' ? 'mrgacDate_value' : obj['mrgacDate'],
        targetIpd: typeof(obj['Target IPD']) == 'undefined' ? 'targetIpd_value' : obj['Target IPD'],
        initialCapacityConsumptionWeek: typeof(obj['initialCapacityConsumptionWeek']) == 'undefined' ? 'initialCapacityConsumptionWeek_value' : obj['initialCapacityConsumptionWeek'],
        initialProductionWeek: typeof(obj['initialProductionWeek']) == 'undefined' ? 'initialProductionWeek_value' : obj['initialProductionWeek'],
        planningPriorityCode: typeof(obj['anplningPriorityCode']) == 'undefined' ? 'anplningPriorityCode_value' : obj['anplningPriorityCode'],
        planningPriorityDescription: typeof(obj['planningPriorityDescription']) == 'undefined' ? 'planningPriorityDescription_value' : obj['planningPriorityDescription'],
        mrgacCapacityConsumptionWeek: typeof(obj['mrgacCapacityConsumptionWeek']) == 'undefined' ? 'mrgacCapacityConsumptionWeek_value' : obj['mrgacCapacityConsumptionWeek'],
        globalPlanningProductGroupCode: typeof(obj['globalPlanningProductGroupCode']) == 'undefined' ? 'globalPlanningProductGroupCode_value' : obj['globalPlanningProductGroupCode'],
        globalPlanningProductGroupDescription: typeof(obj['globalPlanningProductGroupDescription']) == 'undefined' ? 'globalPlanningProductGroupDescription_value' : obj['globalPlanningProductGroupDescription'],
        globalPlanningProductClassificationCode: typeof(obj['globalPlanningProductClassificationCode']) == 'undefined' ? 'globalPlanningProductClassificationCode_value' : obj['globalPlanningProductClassificationCode'],
        globalPlanningProductClassificationDescription: typeof(obj['globalPlanningProductClassificationDescription']) == 'undefined' ? 'globalPlanningProductClassificationDescription_value' : obj['globalPlanningProductClassificationDescription'],
        planningPriorityNumber:typeof( obj['planningPriorityNumber']) == 'undefined' ? 'planningPriorityNumber_value' : obj['planningPriorityNumber'],
        gacvsmrgac: typeof(obj['gacvsmrgac']) == 'undefined' ? 'gacvsmrgac_value' : obj['gacvsmrgac'],
        ogacvsmrgac: typeof(obj['ogacvsmrgac']) == 'undefined' ? 'ogacvsmrgac_value' : obj['ogacvsmrgac'],
        planningSeason: typeof(obj['Planning Season']) == 'undefined' ? 'planningSeason_value' : obj['Planning Season'],
    },
    logistics: {
        originReceiptActualDate: typeof(obj['originReceiptActualDate']) == 'undefined' ? 'originReceiptActualDate_value' : obj['originReceiptActualDate'],
        asnActualDate: typeof(obj['asnActualDate']) == 'undefined' ? 'asnActualDate_value' : obj['asnActualDate'],
        factoryProofOfDeliveryDate: typeof(obj['Delivery Date']) == 'undefined' ? 'factoryProofOfDeliveryDate_value' : obj['Delivery Date'],
        originReceiptSize: typeof(obj['originReceiptSize']) == 'undefined' ? 'originReceiptSize_value' : obj['originReceiptSize'],
        originReceiptQuantity: typeof(obj['originReceiptQuantity']) == 'undefined' ? 'originReceiptQuantity_value' : obj['originReceiptQuantity'],
        asnSize: typeof(obj['asnSize']) == 'undefined' ? 'asnSize_value' : obj['asnSize'],
        asnQuantity: typeof(obj['asnQuantity']) == 'undefined' ? 'asnQuantity_value' : obj['asnQuantity'],
    },
    salesOrder: {
        vasText: typeof(obj['VAS Ind text']) == 'undefined' ? 'vasText_value' : obj['VAS Ind text'],
        vasCodes: typeof(obj['VAS Ind code']) == 'undefined' ? 'vasCodes_value' : obj['VAS Ind code'],
        customerShipTo: typeof(obj['Customer']) == 'undefined' ? 'customerShipTo_value' : obj['Customer'],
        customerShipToName: typeof(obj['Customer Name']) == 'undefined' ? 'customerShipToName_value' : obj['Customer Name'],
        customerPO: typeof(obj['customerPO']) == 'undefined' ? 'customerPO_value' : obj['customerPO'],
    },
    vendorHeader: {
        pmoCode: typeof(obj['Liaison Office']) == 'undefined' ? 'pmoCode_value' : obj['Liaison Office'],
    },
    vendorLineItem: {
        fsp: typeof(obj['FSP Factory Mgmt Grp']) == 'undefined' ? 'fsp_value' : obj['FSP Factory Mgmt Grp'],
    },
});

export { schema };
