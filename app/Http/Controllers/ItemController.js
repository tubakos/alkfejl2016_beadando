'use strict'

const Item = use('App/Model/Item')
const DepStor = use('App/Model/DepartmentStorage')
const Storage = use('App/Model/Storage')
const Department = use('App/Model/Department')

class ItemController {

    * edit (req, res) {
        const item = yield Item.find(req.param('id'))

        const dep_stor = yield DepStor.find(item.department_storage_id)

        const storage = yield Storage.find(dep_stor.storage_id)
        const department = yield Department.find(dep_stor.department_id)

        const departmentsOfStorage = yield storage.departments().fetch()

        item.storage = storage.toJSON()
        item.department = department.toJSON()

        yield res.sendView('itemEdit', {
            item: item.toJSON(),
            departmentsOfStorage: departmentsOfStorage.toJSON()
        })
    }

    * doEdit (req, res) {
        const item = yield Item.find(req.param('id'))

        if (item === null) {
            res.notFound('Sorry, item not found.')
            return
        }

        // 1. input
        const itemData = req.all()


        const storage = yield Storage.findBy('name', itemData.storage)

        const newDepStor = yield DepStor.query().where('storage_id', storage.id).where('department_id', itemData.department).first()

        console.log("OSSIAN")
        console.log(storage)
        console.log(itemData.storage)
        console.log(newDepStor)
        console.log("OSSIAN2")

        item.department_storage_id = newDepStor.id
        item.quantity = itemData.quantity

        yield item.save()

        res.redirect(`/`)
    }

   * doDelete (req, res) {
        const item = yield Item.find(req.param('id'))

        yield item.delete()

        res.redirect('/')
    }

}

module.exports = ItemController
