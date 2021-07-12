const bcrypt = require('bcrypt')
const saltRounds = 10
const userHelper = require('../database/helpers/userHelper')

var createHash = async function (password) {
  var hashPassword = await bcrypt.hash(password, saltRounds).catch(function (err) {
    return null
  })
  return hashPassword
}
module.exports = {
  defaultValueExport: async (req, res) => {
    try {
      //creating default roles
      let { client, admin, superAdmin, superSuperAdmin, adminPassword, superAdminPassword, superSuperAdminPassword } = req.body

      let superSuperAdminU = '669aa76b-d0a9-48da-bd51-eb7d3a706c66'
      let superAdminU = '4e445db7-c623-477f-b388-606b472bd0fe'
      let adminU = '4e445db7-c623-477f-b388-606b472bd0fd'

      let createdRole = [
        { name: 'SuperSuperAdmin', roleCode: 'SSA0001', uniqueId: superSuperAdminU },
        { name: 'SuperAdmin', roleCode: 'SA0001', uniqueId: superAdminU },
        { name: 'Admin', roleCode: 'A0001', uniqueId: adminU }
      ]

      let clientU = '4a095a7b-707a-4680-a3ef-a2d72303142a'
      let createdClient = { name: client, uniqueId: clientU, maxCompanies: 5 }

      let createdAdmin = [
        { userCode: 'SSA0001', email: superSuperAdmin, password: await createHash(superSuperAdminPassword), roleCode: superSuperAdminU, type: 'SuperSuperAdmin' },
        { userCode: 'SA0001', email: superAdmin, password: await createHash(superAdminPassword), roleCode: superAdminU, type: 'SuperAdmin', clientId: clientU },
        { userCode: 'A0001', email: admin, password: await createHash(adminPassword), roleCode: adminU, type: 'Admin', clientId: clientU }
      ]
      let roleCreated = await roleHelper.bulkCreateRole(createdRole)
      let clientCreated = await commonHelper.createClient(createdClient)
      let adminsCreated = await userHelper.createBulkUser(createdAdmin)

      return res.status(200).send(responseHelper.successWithUpdateMessage('Default values Created Successfully'))
    } catch (exception) {
      log('defaultController:defaultValueExport', exception)
      return res.status(500).send(responseHelper.error(500, exception))
    }
  }
}
