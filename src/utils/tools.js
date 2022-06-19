const { replace, isEmpty, isArray, find, findIndex, toLower, padStart, lowerCase, split, isNull, toString, includes, isUndefined } = require("lodash")
const CoreModel = require('../../cpre/model');
const uuid = require('uuid');



class tools {

    // date_format(reg_date, '%Y-%m-%d %H:%i:%s') 

    static dateQuarter(month) {
        let quarters = { first: [1, 2, 3], second: [4, 5, 6], third: [7, 8, 9], fourth: [10, 11, 12] }
        for (const key in quarters) {
            if (includes(quarters[key], month)) {
                return { quarter: key, months: quarters[key] }
            }
        }
        return null;
    }

    static generateRandomNumber(length) {
        return Math.random().toString().slice(2, length + 2);
    }

    static missingToNulls(payload, fields) {
        let newData = [];
        let isList = true;
        if (!isArray(payload)) { isList = false; payload = [payload]; }
        for (const data of payload) {
            let _newObj = {};
            for (const field of fields) _newObj[field] = data.hasOwnProperty(field) ? !isUndefined(data[field]) ? data[field] : null : null;
            newData.push(_newObj);
        }
        return isList ? newData : newData[0];
    }

    static deleteNulls(payload) {
        let isList = true;
        if (!isArray(payload)) { isList = false; payload = [payload]; }
        for (let index = 0; index < payload.length; index++) {
            for (const key in payload[index]) {
                if (isNull(payload[index][key])) delete payload[index][key];
            }
        }
        return isList ? payload : payload[0];
    }

    static emptyToNulls(payload) {
        let isList = true;
        if (!isArray(payload)) { isList = false; payload = [payload]; }
        for (let index = 0; index < payload.length; index++) {
            for (const key in payload[index]) {
                if (isNull(payload[index][key]) || payload[index][key] == '') payload[index][key] = null
            }
        }
        return isList ? payload : payload[0];
    }

    static formatDate(date, isObj = false) {

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]

        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        if (isObj) return {
            date: [year, month, day].join('-'),
            year: year,
            month: month,
            day: day,
            getMonth: (m) => {
                let x = 1;
                for (const month of monthNames) {
                    if (toLower(month) == toLower(m)) return padStart(x, 2, '0');
                    x++;
                }
            }
        };
        return [year, month, day].join('-');
    }

    /**
     *  merge array into string
     * @param {array} list 1d Array
     * @param {string} delimeter Character to merge the array. DEFAULT [ , ]
     * @returns {String} Value1,Value2,Value3
     */
    static implode(list, delimeter = ',') {
        let str = ''
        if (isArray(list)) {
            list.forEach(element => {
                str += `${element}${delimeter}`
            });
        } else {
            str += `${list}${delimeter}`
        }
        return str.substring(0, str.length - 1)
    }

    static insertQueryBuilder(table = '', values = []) {
        const columns = tools.implode(Object.keys(values[0]))
        let replacements = [], query = `insert into ${table} (${columns}) values `
        values.map(row => {
            query += `\n(`
            for (const key in row) {
                if (toString(row[key]).substring(0, 1).includes(':', 0)) {
                    query += `${row[key].substring(1)},`
                } else {
                    query += `?,`
                    replacements.push(row[key] == 'null' ? null : row[key])
                }
            }
            query = query.substring(0, query.length - 1)
            query += `),`
        })
        query = query.substring(0, query.length - 1)
        return { query: query, replacements: replacements }
    }

    static updateQueryBuilder(table = '', identifier = {}, values = []) {
        const keyIdentifier = Object.keys(identifier)[0], keyValue = identifier[Object.keys(identifier)[0]]
        let replacements = [], query = `update ${table} set`
        values.map(row => {
            query += `\n`
            for (const key in row) {
                if (toString(row[key]).substring(0, 1).includes(':', 0)) {
                    query += `${key} = ${row[key].substring(1)},`
                } else {
                    query += `${key} = ?,`
                    replacements.push(row[key] == 'null' ? null : row[key])
                }
            }
            query = query.substring(0, query.length - 1)
            query += `\nwhere ${keyIdentifier} in (?) `
            replacements.push(keyValue)
        })
        return { query: query, replacements: replacements }
    }

    static upsertQueryBuilder(table = '', primaryKey = '', columns = [], ids = [], values = []) {
        let replacements = []
        let query = `insert into ${table} (${primaryKey},${tools.implode(columns)}) values `
        let x = 0
        ids.map(id => {
            query += `\n(?,`
            replacements.push(id)
            columns.map(column => {
                if (values[x][column]) {
                    query += `?,`
                    replacements.push(values[x][column])
                }
            })
            query = query.substring(0, query.length - 1)
            query += `),`
            x++
        })
        query = query.substring(0, query.length - 1)
        query += `\non duplicate key update `
        columns.map(column => {
            query += `${column} = values(${column}),`
        })
        query = query.substring(0, query.length - 1)
        return { query: query, replacements: replacements }
    }


    static parseRecurringType(date, recurringType, recurringRange) {
        let queryString = ``
        switch (lowerCase(recurringType)) {
            case "monthly": queryString += `DATE_ADD("${date}", INTERVAL ${recurringRange} MONTH)`; break;
            case "weekly": queryString += `DATE_ADD("${date}", INTERVAL ${recurringRange} WEEK)`; break;
            case "annually": queryString += `DATE_ADD("${date}", INTERVAL ${recurringRange} YEAR)`; break;
            case "quarterly": queryString += `DATE_ADD("${date}", INTERVAL ${recurringRange} MONTH)`; break;
        }
        return queryString;
    }

    // DATE OF THE INVOICE - inv_date
    static parseBillingTerm(date, condition) {
        date = tools.formatDate(date, true);
        const year = date.year;
        const month = date.month;
        const day = date.day;
        const str = split(condition, ' ');
        let [pos] = str[1].match(/\d+/g);
        pos = padStart(pos, 2, '0');
        switch (str[0]) {
            case "every":
                if (str[3] == "month") {
                    return [year, month, pos].join('-');
                } else {
                    return [year, date.getMonth(str[3]), pos].join('-');
                }
                break;
            case "":
                break;
        }
    }

    // DUE DATE OF INVOICE - due_date
    static parsePaymentTerm(date, condition) {
        date = tools.formatDate(date, true);
        const year = date.year;
        const month = date.month;
        const day = date.day;
        condition = split(condition, ',');
        const str = split(condition[0], ' ');
        const payType = condition[1] ? lowerCase(condition[1]) : null;
        let [pos] = str[1].match(/\d+/g);
        pos = padStart(pos, 2, '0');
        switch (str[0]) {
            case "every":
                if (str[3] == "month") {
                    return [year, month, pos].join('-');
                } else {
                    return [year, date.getMonth(str[3]), pos].join('-');
                }
                break;
            case "":
                break;
        }
    }

    static filterUUID(id) {
        let validUUID = [""], invalidUUID = [""];
        function uuidValidateV4(uid) {
            return uuid.validate(uid) ? uuid.validate(uid) || uuid.version(uid) === 4 : false;
        }
        if (typeof id == 'object') {
            for (let index = 0; index < id.length; index++) {
                let data = id[index]
                if (uuidValidateV4(data)) validUUID.push(data);
                else invalidUUID.push(data);
            }
        } else {
            if (uuidValidateV4(id)) validUUID.push(id);
            else invalidUUID.push(id);
        }

        return { validUUID, invalidUUID }
    }
}

module.exports = tools