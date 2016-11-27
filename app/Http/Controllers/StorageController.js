'use strict'

const Storage = use('App/Model/Storage')
const Item = use('App/Model/Item')
const Dep_Stor = use('App/Model/DepartmentStorage')
const Department = use('App/Model/Department')

const Validator = use('Validator')

class StorageController {
    * main (req, res) {
        const storages = yield Storage.all();

        for (const storage of storages) {

            //const departmentsOfStorage = yield storage.departments().fetch()

           // const itemsOfStorage = yield Department.query().whereIn('id', storage.id).fetch()

           const itemsOfStorage = yield storage.items().fetch();

           for (const item of itemsOfStorage) {
               const dep_stor = yield Dep_Stor.findBy('id', item.department_storage_id)
               const dep = yield Department.findBy('id', dep_stor.department_id)

               item.department_name = dep.name
           }
        

          //  storage.listOfDepartments = departments.toJSON()
            storage.listOfItems = itemsOfStorage.toJSON()
        }

        yield res.sendView('main', {
            storages: storages.toJSON()
        })
    }

    * create (req, res) {
        yield res.sendView('storageCreate')
    }

    * doCreate (req, res) {
        // 1. input
        const storageData = req.all()

        // 2. validáció
        const rules = {
            'name': 'required|min:5',
            'address': 'required'
        }

        const validation = yield Validator.validateAll(storageData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('/storage/create')
            return
        }

        // TODO: check category

        const storage = new Storage()
        storage.name = storageData.name
        storage.address = storageData.address

        yield storage.save()

        //res.redirect(`/recipe/${recipe.id}`)
        res.redirect('/')
    } 

    * addDepartment (req, res) {
        const storage = yield Storage.find(req.param('id'))

        const departmentsOfStorage = yield storage.departments().fetch()
        const indices = []
        for (const department of departmentsOfStorage) {
            indices.push(department.id)
        }

        const addableDepartments = yield Department.query().whereNotIn('id', indices).fetch()

        storage.addableDepartments = addableDepartments.toJSON()

        yield res.sendView('departmentToStorage', {
            storage: storage.toJSON()
        })
    }

    * doAddDepartment (req, res) {
    
        const dep_storData = req.all()

        const dep_stor = new Dep_Stor()
        dep_stor.storage_id = req.param('id')
        dep_stor.department_id = dep_storData.department
       
        yield dep_stor.save()

        res.redirect(`/`)
    }

    * addItem (req, res) {
        const storage = yield Storage.find(req.param('id'))

        const departments = yield storage.departments().fetch()
        console.log("OSSIAN")
        console.log(departments)
        storage.listOfDepartments = departments.toJSON()
        console.log("OSSIAN2")
        console.log(storage.departments)

        yield res.sendView('itemCreate', {
            storage: storage.toJSON()
        })
    }

    * doAddItem (req, res) {
        const itemData = req.all()

        const rules = {
            'name': 'required|min:5',
            'quantity': 'required'
        }

        const validation = yield Validator.validateAll(itemData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect(`/storage/${req.param('id')}/add_item`)
            return
        }

        const depStor = yield Dep_Stor.query().where('storage_id', req.param('id')).where('department_id', itemData.department).first()
        
        const item = new Item()
        item.name = itemData.name
        item.quantity = itemData.quantity
        item.department_storage_id = depStor.id

        yield item.save()

        res.redirect('/')
    }
}

module.exports = StorageController
