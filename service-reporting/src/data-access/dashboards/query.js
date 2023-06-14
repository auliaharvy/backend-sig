const query = ({ connects, models }) => {
    return Object.freeze({
      totalPallet,
      palletCondition,
      detailPallet,
      getPalletOut,
      getPalletIn,
      palletConditionCompany
    });
  
    async function totalPallet({}) {
      try {
        // Tambahkan kode di bawah ini untuk menjalankan permintaan Sequelize
        const res = await models.CompanyTypes.findAll({
          attributes: [
            'id',
            'name',
            [
              models.Sequelize.literal(`sum("Companies->CompaniesPallets"."quantity")`),
              'jumlah_pallet'
            ]
          ],
          include: [
            {
              model: models.Companies,
              attributes: [],
              where: {
                is_deleted: 0
              },
              include: [
                {
                  model: models.CompaniesPallet,
                  attributes: []
                }
              ],
            },
          ],
          where: { is_deleted: 0 },
          group: ['CompanyTypes.id'],
          order: [['created_at', 'DESC']]
        });

        return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }

    async function palletCondition({query}) {
      try {

        if (query.type == 'Transporter') {
          // Tambahkan kode di bawah ini untuk menjalankan permintaan Sequelize
          const res = await models.Pallets.findAll({
            attributes: [
              'name',
              [
                models.Sequelize.literal(`sum("CompaniesPallets"."quantity")`),
                'jumlah_pallet'
              ]
            ],
            include: [
              {
                model: models.CompaniesPallet,
                attributes: [],
                where: {
                  mst_companies_id: {
                    [models.Sequelize.Op.ne]: null
                  }
                },
                include: [
                  {
                    model: models.Companies,
                    attributes: [],
                    where: { is_deleted: 0 },
                    include: [
                      {
                        model: models.CompanyTypes,
                        attributes: [],
                        where: { 
                          name: 'Transporter'
                        },
                      }
                    ]
                  }
                ]
              },
            ],
            // where: { is_deleted: 0 },
            group: ['Pallets.id'],
            order: [['id', 'ASC']]
          });
          return res;
        } else {
          // Tambahkan kode di bawah ini untuk menjalankan permintaan Sequelize
          const res = await models.Pallets.findAll({
            attributes: [
              'name',
              [
                models.Sequelize.literal(`sum("CompaniesPallets"."quantity")`),
                'jumlah_pallet'
              ]
            ],
            include: [
              {
                model: models.CompaniesPallet,
                attributes: [],
                where: {
                  mst_companies_id: {
                    [models.Sequelize.Op.ne]: null
                  }
                },
                include: [
                  {
                    model: models.Companies,
                    attributes: [],
                    where: { is_deleted: 0 },
                    include: [
                      {
                        model: models.CompanyTypes,
                        attributes: [],
                        where: { 
                          name: {
                            [models.Sequelize.Op.not]: 'Transporter'
                          }
                        },
                      }
                    ]
                  }
                ]
              },
            ],
            // where: { is_deleted: 0 },
            group: ['Pallets.id'],
            order: [['id', 'ASC']]
          });
          return res;
        }
      } catch (e) {
        console.log("Error: ", e);
      }
    }

    async function detailPallet({query}) {
      try {
        // Tambahkan kode di bawah ini untuk menjalankan permintaan Sequelize
        const res = await models.Companies.findAll({
          attributes: [
            'id',
            'name',
            [
              models.Sequelize.literal(
                'array_agg("' + "CompaniesPallets" + '".quantity ORDER BY "' + "CompaniesPallets->Pallet" + '".name)'
              ), 
              'jumlah',
            ],
            [
              models.Sequelize.literal(`sum("CompaniesPallets"."quantity")`),
              'stock'
            ],
            [
              models.Sequelize.literal(
                'array_agg(DISTINCT "' +
                  "CompaniesPallets->Pallet" +
                  '".name ORDER BY "' +
                  "CompaniesPallets->Pallet" +
                  '".name)'
              ),
              'kondisi',
            ],
          ],
          include: [
            {
              model: models.CompanyTypes,
              attributes: [],
              where: {
                name: query.type
              },
            },
            {
              model: models.CompaniesPallet,
              attributes: [],
              include: {
                model: models.Pallets,
                attributes: [],
              },
              order: [['id', 'ASC']]
            },
          ],
          where: { is_deleted: 0 },
          group: ['Companies.id'],
          order: [['created_at', 'DESC']]
        });

        return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }

    async function palletConditionCompany({query}) {
      try {

          // Tambahkan kode di bawah ini untuk menjalankan permintaan Sequelize
          const res = await models.Pallets.findAll({
            attributes: [
              'name',
              [
                models.Sequelize.literal(`sum("CompaniesPallets"."quantity")`),
                'jumlah_pallet'
              ]
            ],
            include: [
              {
                model: models.CompaniesPallet,
                attributes: [],
                where: {
                  mst_companies_id: {
                    [models.Sequelize.Op.ne]: null
                  }
                },
                include: [
                  {
                    model: models.Companies,
                    attributes: [],
                    where: { id: query.id },
                  }
                ]
              },
            ],
            // where: { is_deleted: 0 },
            group: ['Pallets.id'],
            order: [['id', 'ASC']]
          });
          return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }

    async function getPalletOut(id) {
      try {
        // Tambahkan kode di bawah ini untuk menjalankan permintaan Sequelize
        const pool = await connects();
  
        const res = await new Promise((resolve) => {
          const sql = `SELECT a.name, sum(d.quantity) as total_out
          FROM "mst_companies" as a
          LEFT JOIN "trx_sjp" as b ON a."id" = b.id_departure_company
          left JOIN "trx_sjp_status" as c on b.id = c.id_sjp
          left join "trx_sjp_status_mst_pallet" as d on c.id = d.trx_sjp_status_id
          WHERE a.is_deleted = 0 and a.id = $1 and c.status = 0 and c.is_sendback = 0
          group by a.id
          ORDER BY a.created_at DESC`;
          const params = [id];
          pool.query(sql, params, (err, res) => {
            pool.end(); // end connection
  
            if (err) resolve(err);
            resolve(res);
          });
        });
  
        return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }

    async function getPalletIn(id) {
      try {
        // Tambahkan kode di bawah ini untuk menjalankan permintaan Sequelize
        const pool = await connects();
  
        const res = await new Promise((resolve) => {
          const sql = `SELECT a.name, sum(d.quantity) as total_in
          FROM "mst_companies" as a
          LEFT JOIN "trx_sjp" as b ON a."id" = b.id_departure_company
          left JOIN "trx_sjp_status" as c on b.id = c.id_sjp
          left join "trx_sjp_status_mst_pallet" as d on c.id = d.trx_sjp_status_id
          WHERE a.is_deleted = 0 and a.id = $1 and c.status = 0 and c.is_sendback = 1
          group by a.id
          ORDER BY a.created_at DESC`;
          const params = [id];
          pool.query(sql, params, (err, res) => {
            pool.end(); // end connection
  
            if (err) resolve(err);
            resolve(res);
          });
        });
  
        return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }
  };
  
  module.exports = query;