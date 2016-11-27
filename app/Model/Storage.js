'use strict'

const Lucid = use('Lucid')

class Storage extends Lucid {
    departments () {
        return this.belongsToMany('App/Model/Department', 'department_storage')
    }

    items () {
        return this.hasManyThrough('App/Model/Item', 'App/Model/DepartmentStorage')
    }
}

module.exports = Storage
