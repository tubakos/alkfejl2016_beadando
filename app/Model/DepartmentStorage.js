'use strict'

const Lucid = use('Lucid')

class DepartmentStorage extends Lucid {
      
    static get table () {
        return 'department_storage'
    } 

    items () {
        return this.hasMany('App/Model/Item')
    }
}

module.exports = DepartmentStorage
