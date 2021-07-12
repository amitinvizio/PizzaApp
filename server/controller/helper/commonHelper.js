const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
module.exports = {
  getCurrentFinancialYear: (companyCode) => {
    try {
      let fiscalyear = ''
      let today = new Date()
      if (today.getMonth() + 1 <= 3) {
        currentYear = today.getFullYear() - 1
        lastYear = currentYear + 1
        fromDate = '01-04-' + currentYear
        lastDate = '31-03-' + lastYear
        fiscalyear = 'Apr ' + (today.getFullYear() - 1) + '-' + 'Mar ' + today.getFullYear()
      } else {
        currentYear = today.getFullYear()
        lastYear = currentYear + 1
        fromDate = '01-04-' + currentYear
        lastDate = '31-03-' + lastYear
        fiscalyear = 'Apr ' + today.getFullYear() + '-' + 'Mar ' + (today.getFullYear() + 1)
      }
      let returnObject = {
        companyId: companyCode,
        name: fiscalyear,
        currentYear: currentYear.toString(),
        fromDate: fromDate,
        toDate: lastDate,
        lastYear: lastYear.toString()
      }
      return returnObject
    } catch (exception) {
      log('commonHelper:getCurrentFinancialYear', exception)
      return false
    }
  },

  //group master list creation
  createGroupAccountMasterList: (companyCode) => {
    try {
      let unique1 = uuidv4()
      let unique2 = uuidv4()
      let unique3 = uuidv4()
      let unique4 = uuidv4()
      let unique5 = uuidv4()
      let unique6 = uuidv4()
      let unique7 = uuidv4()
      let unique8 = uuidv4()
      let unique9 = uuidv4()
      let unique10 = uuidv4()
      let unique11 = uuidv4()
      let unique12 = uuidv4()

      let groupMasterList = [
        { name: 'BANK & CASH', groupCode: '1', groupType: 'Trading Income', companyId: companyCode, uniqueId: unique1, cashBookPrintingSequence: null, balanceSheetSequence: null },
        { name: 'CAPITAL A/c', groupCode: '2', groupType: 'Liabilities', companyId: companyCode, uniqueId: unique2, cashBookPrintingSequence: null, balanceSheetSequence: null },
        { name: 'CUSTOMER', groupCode: '3', groupType: 'Assets', companyId: companyCode, uniqueId: unique3, cashBookPrintingSequence: null, balanceSheetSequence: null },
        { name: 'EXPENSES', groupCode: '4', groupType: 'P&L Expenses', companyId: companyCode, uniqueId: unique4, cashBookPrintingSequence: null, balanceSheetSequence: null },
        { name: 'KARIGAR', groupCode: '5', groupType: 'Liabilities', companyId: companyCode, uniqueId: unique5, cashBookPrintingSequence: null, balanceSheetSequence: null },
        { name: 'LOAN CREDITORS', groupCode: '6', groupType: 'Liabilities', companyId: companyCode, uniqueId: unique6, cashBookPrintingSequence: null, balanceSheetSequence: null },
        { name: 'LOAN DEBTORS', groupCode: '7', groupType: 'Assets', companyId: companyCode, uniqueId: unique7, cashBookPrintingSequence: null, balanceSheetSequence: null },
        { name: 'LOCAL', groupCode: '8', groupType: 'Assets', companyId: companyCode, uniqueId: unique8, cashBookPrintingSequence: null, balanceSheetSequence: null },
        { name: 'SOURCE OF OTHER INCOME', groupCode: '9', groupType: 'P&L Income', companyId: companyCode, uniqueId: unique9, cashBookPrintingSequence: null, balanceSheetSequence: null },
        { name: 'SUPPLIER', groupCode: '10', groupType: 'Liabilities', companyId: companyCode, uniqueId: unique10, cashBookPrintingSequence: null, balanceSheetSequence: null },
        { name: 'TRADING EXPENSE', groupCode: '11', groupType: 'Trading Expenses', companyId: companyCode, uniqueId: unique11, cashBookPrintingSequence: null, balanceSheetSequence: null },
        { name: 'TRADING INCOME', groupCode: '12', groupType: 'Trading Incomes', companyId: companyCode, uniqueId: unique12, cashBookPrintingSequence: null, balanceSheetSequence: null }
      ]

      let accountMaster = [
        { companyId: companyCode, groupCode: unique2, accountCode: 'CA', name: 'CAPITAL A/C' },
        { companyId: companyCode, groupCode: unique1, accountCode: 'CB', name: 'CASH BOOK' },
        { companyId: companyCode, groupCode: unique4, accountCode: 'DISC', name: 'DISCOUNT' },
        { companyId: companyCode, groupCode: unique4, accountCode: 'EXP', name: 'EXPENSES' },
        { companyId: companyCode, groupCode: unique9, accountCode: 'LAB', name: 'LABOUR A/C' },
        { companyId: companyCode, groupCode: unique11, accountCode: 'PURC', name: 'PURCHASE A/C' },
        { companyId: companyCode, groupCode: unique12, accountCode: 'SALE', name: 'SALE A/C' },
        { companyId: companyCode, groupCode: unique4, accountCode: 'GST', name: 'GST' }
      ]
      let data = { group: groupMasterList, account: accountMaster }
      return data
    } catch (exception) {
      log('commonHelper:createGroupMasterList', exception)
    }
  },

  createCategoryItemMasterList: (companyCode) => {
    let unique1 = uuidv4()
    let unique2 = uuidv4()
    let unique3 = uuidv4()

    let categoryMasterList = [
      { uniqueId: unique1, name: 'Metal', categoryCode: 'M1', companyId: companyCode, averageMelting: 100.0 },
      { uniqueId: unique2, name: 'Ornaments', categoryCode: 'O1', companyId: companyCode, averageMelting: 100.0 }
    ]

    let itemMasterList = [ { name: 'METAL', itemCode: 'M1', categoryCode: unique1, companyId: companyCode }, { name: 'Ornaments', itemCode: 'O1', categoryCode: unique2, companyId: companyCode } ]

    let data = { category: categoryMasterList, item: itemMasterList }
    return data
  },

  createMasterBook: (companyCode) => {
    let masterBook = [
      {
        companyId: companyCode,
        masterBookCode: 'CB',
        name: 'Meatal & Cash Book',
        pcs: 9999,
        pcsLabel: 'Pcs',
        grWt: 99999.999,
        grWtLabel: 'Gr. Wt.',
        isGrWtTotalRequired: 'Rojmel',
        netWt: 99999.999,
        netWtLabel: 'Net Wt.',
        melting: 999.99,
        meltingLabel: 'Melting',
        wastage: 99.99,
        wastageLabel: 'Wastage',
        fineWt: 99999.999,
        fineWtLabel: 'Fine Wt.',
        isFineWtLabelRequired: 'Ledger',
        amount: 999999.99,
        amountLabel: 'Amount',
        isAmountTotalRequired: 'Both',
        stnWt: 99999.99,
        stnWtLabel: 'Stn. Wt.',
        isStnWtTotalRequired: 'No Total',
        stnRate: 9999.99,
        stnRateLabel: 'Stn. Rate'
      }
    ]
    return masterBook
  },

  makeid: (length) => {
    let result = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  },

  numberToFixed: (numberValue, decimal) => {
    let fixedValue = numberValue.toFixed(decimal)

    return parseFloat(fixedValue)
  },

  checkDateValidation: (fromDate, toDate) => {
    let checkFromDate = moment(fromDate, 'DD-MM-YYY', true).isValid()
    if (!checkFromDate) return 'fromDate: Not a valid date, Valid Format is DD-MM-YYYY'

    let checkToDate = moment(toDate, 'DD-MM-YYY', true).isValid()
    if (!checkToDate) return 'toDate: Not a valid date, Valid Format is DD-MM-YYYY'

    formattedFromdate = moment.utc(fromDate, 'DD-MM-YYYY')
    let fromThan = Number(moment(formattedFromdate).format('YYYYMMDD'))

    formattedTodate = moment.utc(toDate, 'DD-MM-YYYY')
    let toThan = Number(moment(formattedTodate).format('YYYYMMDD'))

    if (fromThan > toThan) return 'fromDate greater than toDate'
    return null
  },

  checkLicenseValidity: (startDate, endDate) => {
    try {
      let formatStartDate = moment.utc(startDate, 'YYYY-MM-DD')
      startDate = Number(moment(formatStartDate).format('YYYYMMDD'))

      let formatEndDate = moment.utc(endDate, 'YYYY-MM-DD')
      endDate = Number(moment(formatEndDate).format('YYYYMMDD'))

      let now = moment()
      let formattedNow = moment.utc(now, 'YYYY-MM-DD')
      now = Number(moment(formattedNow).format('YYYYMMDD'))

      if (now < startDate) {
        return { status: false, message: 'License Validity Not Started' }
      }
      if (now > endDate) {
        return { status: false, message: 'License Expired' }
      }
      return { status: true }
    } catch (exception) {
      log('commonHelper:checkLicenseValidity', exception)
      return { status: false, message: 'Something went wrong while checking license validity' }
    }
  }
}
